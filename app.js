(async function () {

var logBoxEl = document.getElementById('logBox');
function appendLog(m) { logBoxEl.textContent += '\n' + m; logBoxEl.scrollTop = logBoxEl.scrollHeight; }
['log', 'warn', 'error'].forEach(function (k) {
  var orig = console[k].bind(console);
  console[k] = function () { try { appendLog('[' + k + '] ' + Array.from(arguments).map(String).join(' ')); } catch (e) {} orig.apply(null, arguments); };
});
window.onerror = function (m, s, l, c, e) { appendLog('onerror: ' + m + (e && e.stack ? '\n' + e.stack : '')); };
window.addEventListener('unhandledrejection', function (ev) { appendLog('reject: ' + (ev.reason && ev.reason.message ? ev.reason.message : String(ev.reason))); });

var el = function (id) { return document.getElementById(id); };
var statusEl = el('status');
var loadingTimer = null, loadingStep = 0;

function setStatus(text) {
  if (text === 'Loading') {
    if (!loadingTimer) {
      loadingStep = 0;
      statusEl.textContent = 'Loading...';
      loadingTimer = setInterval(function () { loadingStep++; statusEl.textContent = 'Loading' + ['\\', '-', '/'][loadingStep % 3]; }, 160);
    }
    return;
  }
  if (loadingTimer) { clearInterval(loadingTimer); loadingTimer = null; }
  statusEl.textContent = text || '';
}

/* ====== File state ====== */
var folderFiles = [], modelEntries = [], motionEntries = [], cameraEntries = [], audioEntries = [];
var folderName = '', filePathMap = {}, fileBaseMap = {};
var runtimeUrls = [];
var characters = [], charSeq = 0, selectedCharId = -1, cameraSel = 'free', audioSel = -1;

/* ====== Babylon state ====== */
var engine, scene, arcCamera, canvas;
var hemi, dir, grid;
var mmdRuntime = null, mmdCamNode = null, audioPlayer = null, audioUrl = null;
var materialBuilder = null;
var wasmInstance = null, physicsRuntime = null, physicsReady = false;
var glowLayer = null, fxPipeline = null;

/* ====== Playback state ====== */
var ready = false, playing = false, duration = 0, currentFrameTime = 0, draggingSeek = false;
var fpsSampleTime = 0, fpsSampleFrames = 0;
var rendering = false;

const FPS = 30;
const STUDIO_DB = 'mmd-viewer-studio', STUDIO_STORE = 'studio', STUDIO_KEY = 'current';

/* ====== Babylon init ====== */
function init() {
  canvas = el('c');
  engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
  BABYLONMMD.SdefInjector.OverrideEngineCreateEffect(engine);
  scene = new BABYLON.Scene(engine);
  applyBackground();
  scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

  arcCamera = new BABYLON.ArcRotateCamera('cam', -Math.PI / 2, Math.PI / 2.2, 35, new BABYLON.Vector3(0, 12, 0), scene);
  arcCamera.attachControl(canvas, true);
  arcCamera.wheelDeltaPercentage = 0.01;
  arcCamera.minZ = 0.1;
  arcCamera.maxZ = 2000;

  hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene);
  hemi.intensity = currentAmbientLight();
  dir = new BABYLON.DirectionalLight('dir', new BABYLON.Vector3(0.5, -1, 1), scene);
  dir.intensity = currentDirectionalLight();

  buildGrid();
  new BABYLON.AxesViewer(scene, 8);

  materialBuilder = BABYLONMMD.MmdStandardMaterialBuilder ? new BABYLONMMD.MmdStandardMaterialBuilder() : null;
  if (materialBuilder && BABYLONMMD.MmdMaterialRenderMethod) materialBuilder.renderMethod = BABYLONMMD.MmdMaterialRenderMethod.DepthWriteAlphaBlending;

  initPhysics();

  engine.runRenderLoop(function () { if (rendering) return; scene.render(); updateFps(performance.now()); });
  window.addEventListener('resize', function () { engine.resize(); });
  engine.resize();
}

function buildGrid() {
  if (grid) { grid.dispose(); grid = null; }
  var lines = [];
  for (var i = -20; i <= 20; i += 2) {
    lines.push([new BABYLON.Vector3(-20, 0, i), new BABYLON.Vector3(20, 0, i)]);
    lines.push([new BABYLON.Vector3(i, 0, -20), new BABYLON.Vector3(i, 0, 20)]);
  }
  grid = BABYLON.CreateLineSystem('grid', { lines: lines }, scene);
  grid.color = new BABYLON.Color3(0.28, 0.28, 0.32);
  grid.isPickable = false;
  grid.isVisible = floorEnabled();
}

/* ====== Physics (Bullet SPR via WASM) ====== */
async function initPhysics() {
  appendLog('physics init start');
  appendLog('SAB=' + (typeof SharedArrayBuffer !== 'undefined') + ' isolated=' + (typeof crossOriginIsolated !== 'undefined' ? crossOriginIsolated : '?'));
  try {
    wasmInstance = await BABYLONMMD.GetMmdWasmInstance(new BABYLONMMD.MmdWasmInstanceTypeSPR(), navigator.hardwareConcurrency);
    appendLog('wasm loaded');
    physicsRuntime = new BABYLONMMD.MultiPhysicsRuntime(wasmInstance);
    physicsRuntime.setGravity(new BABYLON.Vector3(0, -98, 0));
    physicsRuntime.fixedTimeStep = 1 / 60;
    physicsRuntime.maxSubSteps = 3;
    physicsRuntime.register(scene);
    physicsReady = true;
    applyEvalType();
    applyUseDelta();
    appendLog('physics ready (Bullet SPR)');
  } catch (e) {
    physicsReady = false;
    appendLog('physics failed: ' + (e && e.message ? e.message : String(e)));
  }
}

function physicsModeEnabled() { var v = el('physicsMode'); return v ? v.value === 'on' : true; }
function currentPhysicsFps() { return parseInt((el('physicsFps') || {}).value, 10) || 60; }
function currentSubsteps() { return parseInt((el('substeps') || {}).value, 10) || 3; }

function applyPhysicsStep() {
  if (!physicsRuntime) return;
  physicsRuntime.fixedTimeStep = 1 / currentPhysicsFps();
  physicsRuntime.maxSubSteps = currentSubsteps();
}

function applyEvalType() {
  if (!physicsRuntime || !BABYLONMMD.PhysicsRuntimeEvaluationType) return;
  var v = (el('evalType') || {}).value;
  physicsRuntime.evaluationType = v === 'buffered'
    ? BABYLONMMD.PhysicsRuntimeEvaluationType.Buffered
    : BABYLONMMD.PhysicsRuntimeEvaluationType.Immediate;
}

function applyUseDelta() {
  if (!physicsRuntime) return;
  physicsRuntime.useDeltaForWorldStep = (el('useDelta') || {}).value === 'on';
}

/* ====== Physics toggle (Bullet対応) ====== */
function applyIkModeTo(ch) {
  if (!ch.model) return;
  var val = el('ikMode').value === 'on' ? 1 : 0;
  var states = ch.model.ikSolverStates;
  for (var i = 0; i < states.length; i++) states[i] = val;
}

function applyIkMode() {
  for (var i = 0; i < characters.length; i++) applyIkModeTo(characters[i]);
}

function applyPhysicsModeTo(ch) {
  if (!ch.model) return;
  var on = physicsModeEnabled();
  var states = ch.model.rigidBodyStates;
  if (!states || states.length === 0) return;
  for (var i = 0; i < states.length; i++) states[i] = on ? 1 : 0;
  if (on && mmdRuntime) mmdRuntime.initializeMmdModelPhysics(ch.model);
}

function applyPhysicsMode() {
  for (var i = 0; i < characters.length; i++) applyPhysicsModeTo(characters[i]);
}

function initAllPhysics() {
  if (!mmdRuntime) return;
  for (var i = 0; i < characters.length; i++) if (characters[i].model) mmdRuntime.initializeMmdModelPhysics(characters[i].model);
}

function resetPhysics() {
  if (!ready || !mmdRuntime) return;
  initAllPhysics();
}

/* ====== FX (Glow / Bloom / DOF) ====== */
function fxNum(id, fallback) { var v = parseFloat((el(id) || {}).value); return isFinite(v) ? v : fallback; }
function fxOn(id) { return (el(id) || {}).value === 'on'; }

function applyGlow() {
  if (!scene) return;
  if (fxOn('glowMode')) {
    if (!glowLayer) {
      glowLayer = new BABYLON.GlowLayer('glow', scene, { mainTextureRatio: 0.5, mainTextureSamples: 4 });
      glowLayer.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
        var sp = material && material.specularPower != null ? material.specularPower : 0;
        if (sp >= 100) {
          var d = material.diffuseColor || BABYLON.Color3.Black();
          var a = material.ambientColor || BABYLON.Color3.Black();
          result.set(Math.min(1, d.r + a.r), Math.min(1, d.g + a.g), Math.min(1, d.b + a.b), 1);
        } else {
          result.set(0, 0, 0, 0);
        }
      };
    }
    glowLayer.intensity = fxNum('glowIntensity', 1);
    glowLayer.blurKernelSize = fxNum('glowBlur', 32);
  } else if (glowLayer) {
    glowLayer.dispose();
    glowLayer = null;
  }
}

function ensurePipeline() {
  if (fxPipeline) return;
  fxPipeline = new BABYLON.DefaultRenderingPipeline('fxPipeline', true, scene, [scene.activeCamera]);
  fxPipeline.bloomEnabled = false;
  fxPipeline.depthOfFieldEnabled = false;
}

function applyBloom() {
  if (!scene) return;
  ensurePipeline();
  fxPipeline.bloomEnabled = fxOn('bloomMode');
  fxPipeline.bloomWeight = fxNum('bloomWeight', 0.6);
  fxPipeline.bloomThreshold = fxNum('bloomThreshold', 0.8);
}

function applyDof() {
  if (!scene) return;
  ensurePipeline();
  fxPipeline.depthOfFieldEnabled = fxOn('dofMode');
  fxPipeline.depthOfField.focusDistance = fxNum('dofFocus', 2000);
  fxPipeline.depthOfField.fStop = Math.max(0.1, fxNum('dofAperture', 0.1) * 10);
}

function reattachPipelineCamera() {
  if (fxPipeline && scene.activeCamera) {
    fxPipeline.dispose();
    fxPipeline = null;
    if (fxOn('bloomMode') || fxOn('dofMode')) { applyBloom(); applyDof(); }
  }
}

/* ====== Settings ====== */
function selectedModeOn(id, fallback) { var v = el(id); return v ? v.value === 'on' : fallback; }
function floorEnabled() { return selectedModeOn('floorMode', true); }
function fpsEnabled() { return selectedModeOn('fpsMode', true); }
function selectedFloat(id, fallback) { var v = el(id); var n = v ? parseFloat(v.value) : fallback; return n >= 0 ? n : fallback; }
function currentAmbientLight() { return selectedFloat('ambientLightLevel', 0.7); }
function currentDirectionalLight() { return selectedFloat('directionalLightLevel', 0.6); }
function currentPlaybackSpeed() { var v = parseFloat((el('playbackSpeed') || {}).value); return (v > 0 && v <= 10) ? v : 1; }
function currentAudioVolume() { var v = parseFloat((el('audioVolume') || {}).value); return isFinite(v) ? Math.max(0, Math.min(1, v)) : 1; }
function currentPixelRatio() { var v = (el('pixelRatio') || {}).value; if (v === 'device') return window.devicePixelRatio || 1; var n = parseFloat(v); return n > 0 ? n : 1; }

function applyBackground() {
  var hex = (el('backgroundColor') || {}).value || '#262b31';
  var r = parseInt(hex.slice(1, 3), 16) / 255;
  var g = parseInt(hex.slice(3, 5), 16) / 255;
  var b = parseInt(hex.slice(5, 7), 16) / 255;
  if (scene) scene.clearColor = new BABYLON.Color4(r, g, b, 1.0);
}

function applyView() {
  if (grid) grid.isVisible = floorEnabled();
  el('fps').style.display = fpsEnabled() ? 'block' : 'none';
  applyBackground();
}

function applyLighting() {
  if (hemi) hemi.intensity = currentAmbientLight();
  if (dir) dir.intensity = currentDirectionalLight();
}

function applyPixelRatio() {
  if (!engine) return;
  var ratio = currentPixelRatio();
  engine.setHardwareScalingLevel(1.0 / ratio);
  engine.resize();
}

function applyPlaybackSpeed() {
  if (mmdRuntime) mmdRuntime.timeScale = currentPlaybackSpeed();
  if (audioPlayer) audioPlayer.playbackRate = currentPlaybackSpeed();
}

function applyAudioVolume() {
  if (audioPlayer) audioPlayer.volume = currentAudioVolume();
}

/* ====== MP4 utilities ====== */
function byteLength(list) {
  var n = 0;
  for (var i = 0; i < list.length; i++) n += list[i].byteLength;
  return n;
}

function bytesJoin(list) {
  var out = new Uint8Array(byteLength(list));
  var o = 0;
  for (var i = 0; i < list.length; i++) { out.set(list[i], o); o += list[i].byteLength; }
  return out;
}

function u8(n) { return new Uint8Array([n & 255]); }
function u16(n) { return new Uint8Array([(n >>> 8) & 255, n & 255]); }
function i16(n) { return u16(n & 65535); }
function u24(n) { return new Uint8Array([(n >>> 16) & 255, (n >>> 8) & 255, n & 255]); }
function u32(n) { return new Uint8Array([(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]); }
function strBytes(s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; }
function zeros(n) { return new Uint8Array(n); }
function fixed1616(n) { return u32(Math.round(n * 65536)); }
function fixed0230(n) { return u32(Math.round(n * 1073741824)); }

function mp4Box(type) {
  var parts = [u32(0), strBytes(type)];
  for (var i = 1; i < arguments.length; i++) parts.push(arguments[i]);
  var out = bytesJoin(parts);
  var size = u32(out.byteLength);
  out.set(size, 0);
  return out;
}

function mp4FullBox(type, version, flags) {
  var parts = [u8(version), u24(flags)];
  for (var i = 3; i < arguments.length; i++) parts.push(arguments[i]);
  return mp4Box.apply(null, [type].concat(parts));
}

function mp4Ftyp() {
  return mp4Box('ftyp', strBytes('isom'), u32(512), strBytes('isom'), strBytes('iso2'), strBytes('avc1'), strBytes('mp41'));
}

function mp4Mvhd(timescale, duration) {
  return mp4FullBox('mvhd', 0, 0, u32(0), u32(0), u32(timescale), u32(duration), fixed1616(1), u16(256), zeros(10), fixed1616(1), fixed1616(0), fixed0230(0), fixed1616(0), fixed1616(1), fixed0230(0), fixed1616(0), fixed1616(0), fixed0230(1), zeros(24), u32(2));
}

function mp4Tkhd(width, height, duration) {
  return mp4FullBox('tkhd', 0, 7, u32(0), u32(0), u32(1), u32(0), u32(duration), zeros(8), u16(0), u16(0), u16(0), u16(0), fixed1616(1), fixed1616(0), fixed0230(0), fixed1616(0), fixed1616(1), fixed0230(0), fixed1616(0), fixed1616(0), fixed0230(1), fixed1616(width), fixed1616(height));
}

function mp4Mdhd(timescale, duration) {
  return mp4FullBox('mdhd', 0, 0, u32(0), u32(0), u32(timescale), u32(duration), u16(21956), u16(0));
}

function mp4Hdlr() {
  return mp4FullBox('hdlr', 0, 0, u32(0), strBytes('vide'), zeros(12), strBytes('VideoHandler'), u8(0));
}

function mp4Vmhd() { return mp4FullBox('vmhd', 0, 1, u16(0), u16(0), u16(0), u16(0)); }
function mp4Dinf() { return mp4Box('dinf', mp4FullBox('dref', 0, 0, u32(1), mp4FullBox('url ', 0, 1))); }

function mp4Avc1(width, height, avcC) {
  var compressor = zeros(32);
  return mp4Box('avc1', zeros(6), u16(1), zeros(16), u16(width), u16(height), fixed1616(72), fixed1616(72), u32(0), u16(1), compressor, u16(24), i16(-1), mp4Box('avcC', avcC));
}

function mp4Stsd(width, height, avcC) { return mp4FullBox('stsd', 0, 0, u32(1), mp4Avc1(width, height, avcC)); }
function mp4Stts(count) { return mp4FullBox('stts', 0, 0, u32(1), u32(count), u32(1)); }
function mp4Stsc() { return mp4FullBox('stsc', 0, 0, u32(1), u32(1), u32(1), u32(1)); }

function mp4Stss(samples) {
  var parts = [u32(samples.length)];
  for (var i = 0; i < samples.length; i++) parts.push(u32(samples[i]));
  return mp4FullBox.apply(null, ['stss', 0, 0].concat(parts));
}

function mp4Stsz(sizes) {
  var parts = [u32(0), u32(sizes.length)];
  for (var i = 0; i < sizes.length; i++) parts.push(u32(sizes[i]));
  return mp4FullBox.apply(null, ['stsz', 0, 0].concat(parts));
}

function mp4Stco(offsets) {
  var parts = [u32(offsets.length)];
  for (var i = 0; i < offsets.length; i++) parts.push(u32(offsets[i]));
  return mp4FullBox.apply(null, ['stco', 0, 0].concat(parts));
}

function buildMp4(chunks, samples, opt) {
  var ftyp = mp4Ftyp();
  var mdatPayload = bytesJoin(chunks);
  var mdat = mp4Box('mdat', mdatPayload);
  var offsets = [];
  var o = ftyp.byteLength + 8;
  var sizes = [];
  var sync = [];
  for (var i = 0; i < samples.length; i++) {
    offsets.push(o);
    sizes.push(samples[i].size);
    if (samples[i].key) sync.push(i + 1);
    o += samples[i].size;
  }
  if (sync.length === 0) sync.push(1);
  var stbl = mp4Box('stbl', mp4Stsd(opt.width, opt.height, opt.avcC), mp4Stts(samples.length), mp4Stss(sync), mp4Stsc(), mp4Stsz(sizes), mp4Stco(offsets));
  var minf = mp4Box('minf', mp4Vmhd(), mp4Dinf(), stbl);
  var mdia = mp4Box('mdia', mp4Mdhd(opt.timescale, samples.length), mp4Hdlr(), minf);
  var trak = mp4Box('trak', mp4Tkhd(opt.width, opt.height, samples.length), mdia);
  var moov = mp4Box('moov', mp4Mvhd(opt.timescale, samples.length), trak);
  return bytesJoin([ftyp, mdat, moov]);
}

function downloadBlob(blob, name) {
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}

function renderFileName(ext) {
  var d = new Date();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  return 'mmd_render_' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '_' + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds()) + ext;
}

function h264Codec(w, h) {
  var mbs = Math.ceil(w / 16) * Math.ceil(h / 16);
  var lvl = mbs <= 1620 ? 30 : mbs <= 3600 ? 31 : mbs <= 5120 ? 32 :
            mbs <= 8192 ? 40 : mbs <= 8704 ? 42 : mbs <= 22080 ? 50 :
            mbs <= 36864 ? 51 : 52;
  var ll = lvl.toString(16).toUpperCase();
  if (ll.length < 2) ll = '0' + ll;
  return 'avc1.6400' + ll;
}

async function renderMp4H264() {
  if (rendering) return;
  if (!ready || !mmdRuntime) { appendLog('[render] Not ready: ready=' + ready + ' mmdRuntime=' + !!mmdRuntime); setStatus('Not ready'); return; }
  if (!window.VideoEncoder || !window.VideoFrame) { appendLog('[render] VideoEncoder or VideoFrame not available'); setStatus('MP4 H.264 unsupported'); return; }
  rendering = true;
  var button = el('renderMp4');
  if (button) button.disabled = true;
  var savedFrame = currentFrameTime;
  var wasPlaying = playing;
  var fps = parseInt((el('renderFps') || {}).value, 10) || 30;
  var bitrate = parseInt((el('renderBitrate') || {}).value, 10) || 8000000;
  var frameDurationUs = Math.round(1000000 / fps);
  var frameCount = Math.max(1, Math.floor(duration / FPS * fps) + 1);
  var width = canvas.width & ~1;
  var height = canvas.height & ~1;
  var source = canvas;
  var encodeCanvas = canvas;
  var ctx = null;
  var chunks = [];
  var samples = [];
  var avcC = null;
  var encoderError = null;
  try {
    if (width <= 0 || height <= 0) { appendLog('[render] Size error: ' + width + 'x' + height); setStatus('Render size error'); return; }
    if (width !== canvas.width || height !== canvas.height) {
      encodeCanvas = document.createElement('canvas');
      encodeCanvas.width = width;
      encodeCanvas.height = height;
      ctx = encodeCanvas.getContext('2d', { alpha: false });
    }
    var config = { codec: h264Codec(width, height), width: width, height: height, bitrate: bitrate, framerate: fps, latencyMode: 'realtime', hardwareAcceleration: 'no-preference', avc: { format: 'avc' } };
    var support = await VideoEncoder.isConfigSupported(config).catch(function () { return null; });
    if (!support || !support.supported) {
      appendLog('[render] realtime config not supported, retry without latencyMode');
      delete config.latencyMode;
      support = await VideoEncoder.isConfigSupported(config).catch(function () { return null; });
    }
    if (!support || !support.supported) { appendLog('[render] H.264 config not supported: ' + JSON.stringify(config)); setStatus('MP4 H.264 unsupported'); return; }
    if (support.config) { support.config.avc = { format: 'avc' }; config = support.config; }
    var encoder = new VideoEncoder({
      output: function (chunk, metadata) {
        var data = new Uint8Array(chunk.byteLength);
        chunk.copyTo(data);
        chunks.push(data);
        samples.push({ size: data.byteLength, key: chunk.type === 'key' });
        if (metadata && metadata.decoderConfig && metadata.decoderConfig.description) avcC = new Uint8Array(metadata.decoderConfig.description);
      },
      error: function (e) {
        encoderError = e;
        appendLog('render encoder error: ' + (e && e.message ? e.message : String(e)));
      }
    });
    encoder.configure(config);
    if (wasPlaying) mmdRuntime.pauseAnimation();
    appendLog('[render] start ' + width + 'x' + height + ' ' + fps + 'fps ' + frameCount + 'frames ' + config.codec);
    setStatus('Rendering 0/' + frameCount);
    if (physicsReady && physicsModeEnabled()) initAllPhysics();
    for (var i = 0; i < frameCount; i++) {
      if (encoderError) throw encoderError;
      var frameTime = Math.min(duration, i * FPS / fps);
      currentFrameTime = frameTime;
      await mmdRuntime.seekAnimation(frameTime, true);
      scene.render();
      if (ctx) ctx.drawImage(source, 0, 0, width, height);
      var vf;
      try {
        vf = new VideoFrame(encodeCanvas, { timestamp: i * frameDurationUs, duration: frameDurationUs });
      } catch (e) {
        appendLog('[render] VideoFrame error at frame ' + i + ': ' + (e && e.message ? e.message : String(e)));
        throw e;
      }
      encoder.encode(vf, { keyFrame: i % fps === 0 });
      vf.close();
      while (encoder.encodeQueueSize > 2) {
        await new Promise(function (resolve) { setTimeout(resolve, 0); });
        if (encoderError) throw encoderError;
      }
      if (i % 10 === 0) {
        var pct = Math.round((i + 1) / frameCount * 100);
        appendLog('[render] ' + (i + 1) + '/' + frameCount + ' (' + pct + '%)');
        setStatus('Rendering ' + (i + 1) + '/' + frameCount);
        await new Promise(function (resolve) { setTimeout(resolve, 0); });
      }
    }
    appendLog('[render] flushing encoder (' + chunks.length + ' chunks)...');
    var flushDone = false;
    var flushPromise = encoder.flush().then(function () { flushDone = true; }).catch(function (e) { appendLog('[render] flush error: ' + (e && e.message ? e.message : String(e))); });
    var flushTimeout = new Promise(function (resolve) { setTimeout(resolve, 8000); });
    await Promise.race([flushPromise, flushTimeout]);
    if (!flushDone) appendLog('[render] flush timeout, proceeding with ' + chunks.length + ' chunks');
    try { encoder.close(); } catch (e) {}
    appendLog('[render] flush done, total ' + chunks.length + ' chunks');
    if (encoderError) throw encoderError;
    if (!avcC || chunks.length === 0) { appendLog('[render] MP4 build error: avcC=' + !!avcC + ' chunks=' + chunks.length); setStatus('MP4 build error'); return; }
    var mp4 = buildMp4(chunks, samples, { width: width, height: height, timescale: fps, avcC: avcC });
    try {
      downloadBlob(new Blob([mp4], { type: 'video/mp4' }), renderFileName('.mp4'));
    } catch (e) {
      appendLog('[render] download error (permission?): ' + (e && e.message ? e.message : String(e)));
      setStatus('Download error');
      return;
    }
    setStatus('Rendered MP4');
  } catch (e) {
    appendLog('render mp4 error: ' + (e && e.message ? e.message : String(e)) + (e && e.stack ? '\n' + e.stack : ''));
    setStatus('Render error');
  } finally {
    try {
      await mmdRuntime.seekAnimation(savedFrame, true);
      currentFrameTime = savedFrame;
      updateSeekUI(true);
      if (wasPlaying) await mmdRuntime.playAnimation();
    } catch (e) { appendLog('[render] restore error: ' + (e && e.message ? e.message : String(e))); }
    chunks.length = 0;
    samples.length = 0;
    if (button) button.disabled = false;
    rendering = false;
  }
}

function updateFps(now) {
  if (!fpsEnabled()) return;
  fpsSampleFrames++;
  if (!fpsSampleTime) { fpsSampleTime = now; return; }
  var elapsed = now - fpsSampleTime;
  if (elapsed >= 500) {
    el('fps').textContent = Math.round(fpsSampleFrames * 1000 / elapsed) + ' fps';
    fpsSampleTime = now;
    fpsSampleFrames = 0;
  }
}

/* ====== File utilities ====== */
function normPath(p) {
  var parts = String(p).replace(/\\/g, '/').split('/');
  var out = [];
  for (var i = 0; i < parts.length; i++) {
    var s = parts[i].trim();
    if (s === '' || s === '.') continue;
    if (s === '..') { out.pop(); continue; }
    out.push(s);
  }
  return out.join('/').toLowerCase();
}

function baseOf(name) { var n = String(name).replace(/\\/g, '/'); return n.substring(n.lastIndexOf('/') + 1).trim(); }
function stripExt(name) { var b = baseOf(name); var p = b.lastIndexOf('.'); return p > 0 ? b.substring(0, p) : b; }
function dirOf(p) { var n = normPath(p); var i = n.lastIndexOf('/'); return i < 0 ? '' : n.substring(0, i); }
function normName(s) { return String(s || '').replace(/\u0000/g, '').replace(/\s+/g, '').toLowerCase(); }
function extOk(name, exts) { var n = name.toLowerCase(); for (var i = 0; i < exts.length; i++) if (n.endsWith(exts[i])) return true; return false; }

function buildFileMaps(entries) {
  filePathMap = {}; fileBaseMap = {};
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var path = normPath(entry.path);
    var base = baseOf(path).toLowerCase();
    filePathMap[path] = entry;
    if (!fileBaseMap[base]) fileBaseMap[base] = [];
    fileBaseMap[base].push(entry);
  }
}

function sortEntries(entries) {
  entries.sort(function (a, b) { return normPath(a.path).localeCompare(normPath(b.path)); });
}

function removeFromFolder(entry) {
  var p = normPath(entry.path);
  for (var i = 0; i < folderFiles.length; i++) {
    if (normPath(folderFiles[i].path) === p) { folderFiles.splice(i, 1); break; }
  }
  buildFileMaps(folderFiles);
}

function revoke(list) {
  for (var i = 0; i < list.length; i++) URL.revokeObjectURL(list[i]);
  list.length = 0;
}

function readAscii(bytes, start, len) {
  var s = ''; var max = Math.min(bytes.length, start + len);
  for (var i = start; i < max; i++) { if (bytes[i] === 0) break; s += String.fromCharCode(bytes[i]); }
  return s;
}

function decodeName(bytes) {
  var sub = bytes.slice(); var end = sub.length;
  for (var i = 0; i < sub.length; i++) { if (sub[i] === 0) { end = i; break; } }
  sub = sub.slice(0, end);
  try { return new TextDecoder('shift_jis').decode(sub).trim(); } catch (e) {}
  var s = ''; for (var i = 0; i < sub.length; i++) s += String.fromCharCode(sub[i]); return s.trim();
}

function vmdLayout(view, offset) {
  if (offset + 4 > view.byteLength) return null;
  var bone = view.getUint32(offset, true); offset += 4;
  if (bone > 1000000) return null; offset += bone * 111;
  if (offset + 4 > view.byteLength) return null;
  var morph = view.getUint32(offset, true); offset += 4;
  if (morph > 1000000) return null; offset += morph * 23;
  if (offset + 4 > view.byteLength) return null;
  var camera = view.getUint32(offset, true); offset += 4;
  if (camera > 1000000) return null; offset += camera * 61;
  if (offset > view.byteLength) return null;
  return { bone: bone, morph: morph, camera: camera };
}

function analyzeVmd(buffer) {
  var bytes = new Uint8Array(buffer);
  var header = readAscii(bytes, 0, 30);
  if (header.indexOf('Vocaloid Motion Data') !== 0) return { valid: false, bone: 0, morph: 0, camera: 0, modelKey: '' };
  var modelName = decodeName(bytes.slice(30, 50));
  var view = new DataView(buffer);
  var layout = vmdLayout(view, 50) || vmdLayout(view, 40);
  if (!layout) return { valid: false, bone: 0, morph: 0, camera: 0, modelKey: normName(modelName) };
  return { valid: true, bone: layout.bone, morph: layout.morph, camera: layout.camera, modelKey: normName(modelName) };
}

async function inspectFolder(entries) {
  sortEntries(entries);
  buildFileMaps(entries);
  modelEntries = []; motionEntries = []; cameraEntries = []; audioEntries = [];
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (extOk(entry.name, ['.pmx'])) modelEntries.push(entry);
    else if (extOk(entry.name, ['.mp3', '.wav'])) audioEntries.push(entry);
  }
  modelEntries.sort(function (a, b) { return normPath(a.path).localeCompare(normPath(b.path)); });
  var vmds = entries.filter(function (e) { return extOk(e.name, ['.vmd']); });
  for (var i = 0; i < vmds.length; i++) {
    try {
      var result = analyzeVmd(await vmds[i].file.arrayBuffer());
      vmds[i].modelKey = result.modelKey;
      if (result.valid && result.camera > 0) cameraEntries.push(vmds[i]);
      if (result.valid && (result.bone > 0 || result.morph > 0)) motionEntries.push(vmds[i]);
    } catch (e) {}
  }
}

function mergeFiles(entries) {
  var seen = {};
  for (var i = 0; i < folderFiles.length; i++) {
    var e = folderFiles[i];
    seen[normPath(e.path) + ':' + e.file.size + ':' + e.file.lastModified] = true;
  }
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    var key = normPath(e.path) + ':' + e.file.size + ':' + e.file.lastModified;
    if (!seen[key]) { seen[key] = true; folderFiles.push(e); }
  }
}

async function addSelectedFiles(files) {
  var entries = [];
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    entries.push({ file: file, path: file.webkitRelativePath || file.name, name: file.name, url: '' });
  }
  if (entries.length === 0) return;
  clearScene();
  revoke(runtimeUrls);
  mergeFiles(entries);
  if (!folderName) folderName = 'Folder';
  await inspectFolder(folderFiles);
  renderAll();
  setStatus(modelEntries.length > 0 ? '' : 'No PMX found');
}

async function addZipFile(file) {
  if (!window.JSZip) return;
  var zip = await window.JSZip.loadAsync(file, { decodeFileName: function (bytes) {
    try { return new TextDecoder('shift_jis').decode(bytes); } catch (e) { return new TextDecoder('utf-8').decode(bytes); }
  }});
  var entries = [];
  var names = Object.keys(zip.files);
  for (var i = 0; i < names.length; i++) {
    var zipEntry = zip.files[names[i]];
    if (zipEntry.dir) continue;
    var blob = await zipEntry.async('blob');
    entries.push({ file: new File([blob], baseOf(zipEntry.name), { type: blob.type }), path: zipEntry.name, name: baseOf(zipEntry.name), url: '' });
  }
  if (entries.length === 0) return;
  clearScene();
  revoke(runtimeUrls);
  mergeFiles(entries);
  if (!folderName) folderName = file.name;
  await inspectFolder(folderFiles);
  renderAll();
  setStatus(modelEntries.length > 0 ? '' : 'No PMX found');
}

async function selectFolder() {
  if (!window.showDirectoryPicker) { el('fileInput').click(); return; }
  try {
    var dir = await window.showDirectoryPicker({ mode: 'read' });
    clearScene();
    revoke(runtimeUrls);
    resetDetected();
    folderName = dir.name;
    await walkDirectory(dir, '', folderFiles);
    await inspectFolder(folderFiles);
    renderAll();
    setStatus(modelEntries.length > 0 ? '' : 'No PMX found');
  } catch (e) { setStatus(''); }
}

async function walkDirectory(handle, prefix, out) {
  for await (var item of handle.values()) {
    var path = prefix ? prefix + '/' + item.name : item.name;
    if (item.kind === 'file') {
      var file = await item.getFile();
      out.push({ file: file, path: path, name: item.name, url: '' });
    } else if (item.kind === 'directory') {
      await walkDirectory(item, path, out);
    }
  }
}

function resetDetected() {
  folderName = ''; folderFiles = []; modelEntries = []; motionEntries = [];
  cameraEntries = []; audioEntries = [];
  filePathMap = {}; fileBaseMap = {};
  updateResetButton();
}

function currentChar() {
  for (var i = 0; i < characters.length; i++) if (characters[i].id === selectedCharId) return characters[i];
  return null;
}

/* ====== Build reference files for babylon-mmd ====== */
function buildReferenceFiles(modelEntry) {
  var modelPath = normPath(modelEntry.path);
  var modelDir = dirOf(modelPath);
  var out = [], rootFile = null;
  for (var i = 0; i < folderFiles.length; i++) {
    var entry = folderFiles[i];
    var entryPath = normPath(entry.path);
    var relPath;
    if (modelDir && entryPath.indexOf(modelDir + '/') === 0) {
      relPath = entryPath.substring(modelDir.length + 1);
    } else {
      relPath = entry.name;
    }
    var cloned = new File([entry.file], baseOf(relPath) || entry.name, { type: entry.file.type });
    Object.defineProperty(cloned, 'webkitRelativePath', { value: relPath, configurable: true });
    out.push(cloned);
    if (entryPath === modelPath) rootFile = cloned;
  }
  return { files: out, rootFile: rootFile };
}

/* ====== Scene management ====== */
function clearScene() {
  if (audioPlayer && mmdRuntime) { try { mmdRuntime.setAudioPlayer(null); } catch (e) {} }
  if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
  audioPlayer = null; audioSel = -1;
  if (mmdCamNode) {
    if (mmdRuntime) { try { mmdRuntime.removeAnimatable(mmdCamNode); } catch (e) {} }
    mmdCamNode.dispose();
    mmdCamNode = null;
  }
  cameraSel = 'free';
  scene.activeCamera = arcCamera;
  arcCamera.attachControl(canvas, true);
  for (var i = 0; i < characters.length; i++) {
    var c = characters[i];
    if (c.model && mmdRuntime) { try { mmdRuntime.destroyMmdModel(c.model); } catch (e) {} }
    if (c.container) { try { c.container.dispose(); } catch (e) {} }
  }
  characters = []; selectedCharId = -1; charSeq = 0;
  if (mmdRuntime) { mmdRuntime.dispose(scene); mmdRuntime = null; }
  reattachPipelineCamera();
  ready = false;
  playing = false;
  duration = 0;
  currentFrameTime = 0;
  el('play').disabled = true;
  updatePlayBtn();
  refreshSeekRange();
  updateResetButton();
}

function updateResetButton() {
  el('reset').disabled = folderFiles.length === 0 && characters.length === 0;
}

/* ====== Runtime / characters ====== */
function ensureRuntime() {
  if (mmdRuntime) return mmdRuntime;
  var mmdPhysics = physicsReady ? new BABYLONMMD.MmdBulletPhysics(physicsRuntime) : null;
  mmdRuntime = new BABYLONMMD.MmdRuntime(scene, mmdPhysics);
  mmdRuntime.register(scene);
  mmdRuntime.timeScale = currentPlaybackSpeed();
  mmdRuntime.onAnimationTickObservable.add(function () {
    if (!draggingSeek) {
      currentFrameTime = mmdRuntime.currentFrameTime;
      updateSeekUI(false);
    }
  });
  mmdRuntime.onPlayAnimationObservable.add(function () { playing = true; updatePlayBtn(); });
  mmdRuntime.onPauseAnimationObservable.add(function () { playing = false; updatePlayBtn(); });
  return mmdRuntime;
}

function refreshDuration() {
  duration = mmdRuntime ? mmdRuntime.animationFrameTimeDuration : 0;
  refreshSeekRange();
}

function updateReady() {
  ready = !!mmdRuntime && (characters.length > 0 || !!mmdCamNode);
  el('play').disabled = !ready;
  if (!ready) { playing = false; updatePlayBtn(); }
  updateResetButton();
}

async function addCharacter(entry) {
  ensureRuntime();
  buildFileMaps(folderFiles);
  setStatus('Loading');
  try {
    var refs = buildReferenceFiles(entry);
    if (!refs.rootFile) { setStatus('PMX normalize error'); return; }
    var loaderOpts = { loggingEnabled: false, referenceFiles: refs.files };
    if (materialBuilder) loaderOpts.materialBuilder = materialBuilder;
    var result = await BABYLON.LoadAssetContainerAsync(refs.rootFile, scene, {
      pluginExtension: '.pmx',
      pluginOptions: { mmdmodel: loaderOpts }
    });
    result.addAllToScene();
    var mesh = result.meshes.length > 0 ? result.meshes[0] : null;
    if (!mesh) { result.dispose(); setStatus('Load error'); return; }
    var modelOpts = {
      buildPhysics: physicsReady ? {
        disableBidirectionalTransformation: true,
        disableOffsetForConstraintFrame: true
      } : false
    };
    if (BABYLONMMD.MmdStandardMaterialProxy) modelOpts.materialProxyConstructor = BABYLONMMD.MmdStandardMaterialProxy;
    var model = mmdRuntime.createMmdModel(mesh, modelOpts);
    var ch = { id: ++charSeq, entry: entry, container: result, model: model, mesh: mesh, motions: [], animHandle: null };
    characters.push(ch);
    selectedCharId = ch.id;
    applyIkModeTo(ch);
    applyPhysicsModeTo(ch);
    if (characters.length === 1 && cameraSel === 'free') fitCamera(result.meshes);
    refreshDuration();
    updateReady();
    renderAll();
    setStatus('');
  } catch (e) {
    appendLog('addCharacter error: ' + (e && e.message ? e.message : String(e)) + (e && e.stack ? '\n' + e.stack : ''));
    setStatus('Load error');
  }
}

function removeCharacter(id) {
  var idx = -1;
  for (var i = 0; i < characters.length; i++) if (characters[i].id === id) { idx = i; break; }
  if (idx < 0) return;
  var ch = characters[idx];
  if (ch.model && mmdRuntime) { try { mmdRuntime.destroyMmdModel(ch.model); } catch (e) {} }
  if (ch.container) { try { ch.container.dispose(); } catch (e) {} }
  characters.splice(idx, 1);
  if (selectedCharId === id) selectedCharId = characters.length > 0 ? characters[0].id : -1;
  refreshDuration();
  updateReady();
  renderAll();
}

async function applyCharacterMotions(ch) {
  if (!ch.model) return;
  setStatus('Loading');
  try {
    if (ch.animHandle) { try { ch.model.destroyRuntimeAnimation(ch.animHandle); } catch (e) {} ch.animHandle = null; }
    if (ch.motions.length > 0) {
      var vmdLoader = new BABYLONMMD.VmdLoader(scene);
      var files = ch.motions.map(function (e) { return e.file; });
      var anim = await vmdLoader.loadAsync('motion_' + ch.id, files.length === 1 ? files[0] : files);
      ch.animHandle = ch.model.createRuntimeAnimation(anim);
      ch.model.setRuntimeAnimation(ch.animHandle);
    } else {
      ch.model.setRuntimeAnimation(null);
    }
    mmdRuntime.onAnimationDurationChangedObservable.notifyObservers();
    refreshDuration();
    if (mmdRuntime) {
      await mmdRuntime.seekAnimation(currentFrameTime, true);
      if (physicsReady && physicsModeEnabled() && ch.model) mmdRuntime.initializeMmdModelPhysics(ch.model);
    }
    setStatus('');
  } catch (e) {
    appendLog('applyCharacterMotions error: ' + (e && e.message ? e.message : String(e)));
    setStatus('Animation error');
  }
}

async function addMotionToSelected(entry) {
  var ch = currentChar();
  if (!ch) { setStatus('Select a character'); return; }
  ch.motions.push(entry);
  await applyCharacterMotions(ch);
  renderAll();
}

async function removeMotionFromChar(ch, idx) {
  ch.motions.splice(idx, 1);
  await applyCharacterMotions(ch);
  renderAll();
}

async function setCamera(sel) {
  ensureRuntime();
  if (mmdCamNode) {
    try { mmdRuntime.removeAnimatable(mmdCamNode); } catch (e) {}
    mmdCamNode.dispose();
    mmdCamNode = null;
  }
  if (sel === 'free') {
    cameraSel = 'free';
    scene.activeCamera = arcCamera;
    arcCamera.attachControl(canvas, true);
    reattachPipelineCamera();
    updateReady();
    return;
  }
  var idx = parseInt(sel, 10);
  if (!(idx >= 0 && idx < cameraEntries.length)) { cameraSel = 'free'; renderCameraSelect(); return; }
  cameraSel = idx;
  setStatus('Loading');
  try {
    var vmdLoader = new BABYLONMMD.VmdLoader(scene);
    var camAnim = await vmdLoader.loadAsync('camera', cameraEntries[idx].file);
    mmdCamNode = new BABYLONMMD.MmdCamera('mmdCam', new BABYLON.Vector3(0, 10, 0), scene);
    var camHandle = mmdCamNode.createRuntimeAnimation(camAnim);
    mmdCamNode.setRuntimeAnimation(camHandle);
    mmdRuntime.addAnimatable(mmdCamNode);
    arcCamera.detachControl();
    scene.activeCamera = mmdCamNode;
    reattachPipelineCamera();
    refreshDuration();
    updateReady();
    setStatus('');
  } catch (e) {
    appendLog('setCamera error: ' + (e && e.message ? e.message : String(e)));
    setStatus('Camera error');
    cameraSel = 'free';
    scene.activeCamera = arcCamera;
    arcCamera.attachControl(canvas, true);
    renderCameraSelect();
  }
}

async function setAudio(sel) {
  ensureRuntime();
  if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
  if (sel === 'none') {
    audioSel = -1;
    if (mmdRuntime) { try { await mmdRuntime.setAudioPlayer(null); } catch (e) {} }
    audioPlayer = null;
    return;
  }
  var idx = parseInt(sel, 10);
  if (!(idx >= 0 && idx < audioEntries.length)) { audioSel = -1; renderAudioSelect(); return; }
  audioSel = idx;
  setStatus('Loading');
  try {
    audioUrl = URL.createObjectURL(audioEntries[idx].file);
    audioPlayer = new BABYLONMMD.StreamAudioPlayer(scene);
    audioPlayer.source = audioUrl;
    audioPlayer.volume = currentAudioVolume();
    audioPlayer.playbackRate = currentPlaybackSpeed();
    await mmdRuntime.setAudioPlayer(audioPlayer);
    setStatus('');
  } catch (e) {
    appendLog('setAudio error: ' + (e && e.message ? e.message : String(e)));
    setStatus('Audio error');
    audioSel = -1;
    audioPlayer = null;
    renderAudioSelect();
  }
}

function fitCamera(meshes) {
  var min = null, max = null;
  for (var i = 0; i < meshes.length; i++) {
    var mesh = meshes[i];
    if (!mesh.getBoundingInfo) continue;
    mesh.computeWorldMatrix(true);
    var box = mesh.getBoundingInfo().boundingBox;
    var bmin = box.minimumWorld, bmax = box.maximumWorld;
    if (!isFinite(bmin.x) || !isFinite(bmax.x)) continue;
    if (!min) { min = bmin.clone(); max = bmax.clone(); } else {
      min = BABYLON.Vector3.Minimize(min, bmin);
      max = BABYLON.Vector3.Maximize(max, bmax);
    }
  }
  if (!min || !max) return;
  var center = min.add(max).scale(0.5);
  var size = max.subtract(min).length();
  var radius = Math.max(size * 1.2, 8);
  arcCamera.setTarget(center);
  arcCamera.radius = radius;
  arcCamera.alpha = -Math.PI / 2;
  arcCamera.beta = Math.PI / 2.2;
  arcCamera.maxZ = Math.max(radius * 20, 1000);
  arcCamera.lowerRadiusLimit = Math.max(radius * 0.02, 0.5);
  arcCamera.upperRadiusLimit = Math.max(radius * 8, 100);
}

/* ====== Playback ====== */
function refreshSeekRange() {
  var total = Math.max(0, Math.round(duration));
  el('seek').max = total; el('seek').disabled = total === 0;
  el('frame').max = total; el('frame').disabled = total === 0;
  el('frameTotal').textContent = '/ ' + total;
  updateSeekUI(true);
}

function updatePlayBtn() { el('play').textContent = playing ? 'Pause' : 'Play'; }

function updateSeekUI(force) {
  var fr = Math.round(currentFrameTime);
  if (!draggingSeek) el('seek').value = fr;
  if (force || document.activeElement !== el('frame')) el('frame').value = fr;
}

async function seekToFrame(fr) {
  if (!ready || !mmdRuntime) return;
  var total = Math.round(duration);
  fr = Math.max(0, Math.min(fr, total));
  var jumped = Math.abs(fr - currentFrameTime) > 60;
  currentFrameTime = fr;
  updateSeekUI(true);
  await mmdRuntime.seekAnimation(fr, true);
  if (jumped && physicsReady && physicsModeEnabled()) {
    initAllPhysics();
  }
}

async function togglePlay() {
  if (!ready || !mmdRuntime) return;
  if (playing) {
    mmdRuntime.pauseAnimation();
  } else {
    await mmdRuntime.playAnimation();
  }
}

/* ====== UI rendering ====== */
function makeItem(label, onSelect, onRemove, selected) {
  var item = document.createElement('span');
  item.className = selected ? 'item selected' : 'item';
  var name = document.createElement(onSelect ? 'button' : 'span');
  name.className = 'name'; name.textContent = label;
  if (onSelect) name.addEventListener('click', onSelect);
  item.appendChild(name);
  if (onRemove) {
    var rem = document.createElement('button');
    rem.className = 'remove'; rem.type = 'button'; rem.textContent = '×';
    rem.addEventListener('click', onRemove);
    item.appendChild(rem);
  }
  return item;
}

function renderFolder() {
  var box = el('folderList'); box.innerHTML = '';
  if (!folderName) return;
  box.appendChild(makeItem(folderName, null, function () {
    resetDetected(); clearScene(); revoke(runtimeUrls); renderAll(); setStatus('');
  }, false));
}

function renderModelPool() {
  var box = el('modelPool'); box.innerHTML = '';
  for (var i = 0; i < modelEntries.length; i++) {
    (function (entry, idx) {
      box.appendChild(makeItem(entry.name, function () {
        addCharacter(entry);
      }, function () {
        modelEntries.splice(idx, 1); removeFromFolder(entry); renderAll();
      }, false));
    })(modelEntries[i], i);
  }
}

function renderCharacters() {
  var box = el('characterList'); box.innerHTML = '';
  for (var i = 0; i < characters.length; i++) {
    (function (ch) {
      var wrap = document.createElement('div');
      wrap.className = ch.id === selectedCharId ? 'charRow selected' : 'charRow';
      var head = document.createElement('div'); head.className = 'charHead';
      var sel = document.createElement('button');
      sel.type = 'button'; sel.className = 'charName'; sel.textContent = ch.entry.name;
      sel.addEventListener('click', function () { selectedCharId = ch.id; renderCharacters(); });
      var rem = document.createElement('button');
      rem.type = 'button'; rem.className = 'charRemove'; rem.textContent = '×';
      rem.addEventListener('click', function () { removeCharacter(ch.id); });
      head.appendChild(sel); head.appendChild(rem);
      wrap.appendChild(head);
      var anims = document.createElement('div'); anims.className = 'charAnims';
      if (ch.motions.length === 0) {
        var none = document.createElement('span');
        none.className = 'charAnimEmpty'; none.textContent = '(no animation)';
        anims.appendChild(none);
      } else {
        for (var j = 0; j < ch.motions.length; j++) {
          (function (motion, mj) {
            var chip = document.createElement('span'); chip.className = 'animChip';
            var nm = document.createElement('span'); nm.textContent = motion.name;
            var x = document.createElement('button'); x.type = 'button'; x.textContent = '×';
            x.addEventListener('click', function () { removeMotionFromChar(ch, mj); });
            chip.appendChild(nm); chip.appendChild(x);
            anims.appendChild(chip);
          })(ch.motions[j], j);
        }
      }
      wrap.appendChild(anims);
      box.appendChild(wrap);
    })(characters[i]);
  }
}

function renderMotionPool() {
  var box = el('motionPool'); box.innerHTML = '';
  for (var i = 0; i < motionEntries.length; i++) {
    (function (entry, idx) {
      box.appendChild(makeItem(entry.name, function () {
        addMotionToSelected(entry);
      }, function () {
        motionEntries.splice(idx, 1); removeFromFolder(entry); renderAll();
      }, false));
    })(motionEntries[i], i);
  }
}

function renderCameraSelect() {
  var s = el('cameraSelect'); if (!s) return; s.innerHTML = '';
  var o0 = document.createElement('option'); o0.value = 'free'; o0.textContent = 'Free'; s.appendChild(o0);
  for (var i = 0; i < cameraEntries.length; i++) {
    var o = document.createElement('option'); o.value = String(i); o.textContent = cameraEntries[i].name; s.appendChild(o);
  }
  s.value = cameraSel === 'free' ? 'free' : (cameraSel < cameraEntries.length ? String(cameraSel) : 'free');
}

function renderAudioSelect() {
  var s = el('audioSelect'); if (!s) return; s.innerHTML = '';
  var o0 = document.createElement('option'); o0.value = 'none'; o0.textContent = 'None'; s.appendChild(o0);
  for (var i = 0; i < audioEntries.length; i++) {
    var o = document.createElement('option'); o.value = String(i); o.textContent = audioEntries[i].name; s.appendChild(o);
  }
  s.value = audioSel < 0 ? 'none' : (audioSel < audioEntries.length ? String(audioSel) : 'none');
}

function renderAll() {
  renderFolder(); renderModelPool(); renderCharacters(); renderMotionPool();
  renderCameraSelect(); renderAudioSelect(); updateResetButton();
}

/* ====== IndexedDB ====== */
function openStudioDb() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) { reject(new Error('No IndexedDB')); return; }
    var req = indexedDB.open(STUDIO_DB, 1);
    req.onupgradeneeded = function () { if (!req.result.objectStoreNames.contains(STUDIO_STORE)) req.result.createObjectStore(STUDIO_STORE); };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error); };
  });
}

function writeStudioRecord(record) {
  return openStudioDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(STUDIO_STORE, 'readwrite');
      tx.objectStore(STUDIO_STORE).put(record, STUDIO_KEY);
      tx.oncomplete = function () { db.close(); resolve(); };
      tx.onerror = function () { db.close(); reject(tx.error); };
    });
  });
}

function readStudioRecord() {
  return openStudioDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(STUDIO_STORE, 'readonly');
      var req = tx.objectStore(STUDIO_STORE).get(STUDIO_KEY);
      req.onsuccess = function () { resolve(req.result || null); };
      tx.oncomplete = function () { db.close(); };
      tx.onerror = function () { db.close(); reject(tx.error); };
    });
  });
}

async function saveStudio() {
  if (folderFiles.length === 0) { statusEl.textContent = 'No files'; return; }
  try {
    await writeStudioRecord({
      folderName: folderName || 'Studio',
      cameraFree: cameraSel === 'free',
      cameraPath: (cameraSel !== 'free' && cameraEntries[cameraSel]) ? normPath(cameraEntries[cameraSel].path) : '',
      audioPath: (audioSel >= 0 && audioEntries[audioSel]) ? normPath(audioEntries[audioSel].path) : '',
      entries: folderFiles.map(function (e) { return { file: e.file, path: e.path, name: e.name }; })
    });
    statusEl.textContent = 'Saved';
  } catch (e) { statusEl.textContent = 'Save failed'; }
}

async function restoreStudio() {
  var record;
  try { record = await readStudioRecord(); } catch (e) { statusEl.textContent = 'Restore failed'; return; }
  if (!record || !record.entries || record.entries.length === 0) { statusEl.textContent = 'No save'; return; }
  clearScene(); revoke(runtimeUrls); resetDetected();
  folderName = record.folderName || 'Studio';
  for (var i = 0; i < record.entries.length; i++) {
    var rec = record.entries[i];
    if (rec.file) folderFiles.push({ file: rec.file, path: rec.path, name: rec.name, url: '' });
  }
  await inspectFolder(folderFiles);
  renderAll();
  if (record.cameraFree === false && record.cameraPath) {
    var ci = -1;
    for (var i = 0; i < cameraEntries.length; i++) if (normPath(cameraEntries[i].path) === record.cameraPath) { ci = i; break; }
    if (ci >= 0) await setCamera(String(ci));
  }
  if (record.audioPath) {
    var ai = -1;
    for (var i = 0; i < audioEntries.length; i++) if (normPath(audioEntries[i].path) === record.audioPath) { ai = i; break; }
    if (ai >= 0) await setAudio(String(ai));
  }
  renderCameraSelect(); renderAudioSelect();
  statusEl.textContent = 'Restored';
}

/* ====== Settings panel ====== */
function openMenu(name) {
  var panel = el('settingsPanel');
  var same = panel.classList.contains('open') && panel.getAttribute('data-menu') === name;
  document.querySelectorAll('.menuPage').forEach(function (p) { p.classList.remove('active'); });
  if (same) { panel.classList.remove('open'); panel.removeAttribute('data-menu'); return; }
  el(name + 'Menu').classList.add('active');
  panel.setAttribute('data-menu', name);
  panel.classList.add('open');
}

function syncRangeNumber(rangeId, numberId, callback) {
  var range = el(rangeId), number = el(numberId);
  range.addEventListener('input', function () { number.value = range.value; callback(); });
  number.addEventListener('input', function () { range.value = number.value; callback(); });
  number.addEventListener('change', function () { range.value = number.value; callback(); });
}

/* ====== Event listeners ====== */
el('toggle').addEventListener('click', function () { el('panel').classList.toggle('open'); });
el('fullscreen').addEventListener('click', function () {
  var d = document, active = d.fullscreenElement || d.webkitFullscreenElement;
  if (active) { (d.exitFullscreen || d.webkitExitFullscreen).call(d); }
  else { var r = d.documentElement; (r.requestFullscreen || r.webkitRequestFullscreen).call(r); }
});
el('dataToggle').addEventListener('click', function () { openMenu('data'); });
el('viewToggle').addEventListener('click', function () { openMenu('view'); });
el('playbackToggle').addEventListener('click', function () { openMenu('playback'); });
el('physicsToggle').addEventListener('click', function () { openMenu('physics'); });
el('fxToggle').addEventListener('click', function () { openMenu('fx'); });
el('renderToggle').addEventListener('click', function () { openMenu('render'); });

el('folderBtn').addEventListener('click', selectFolder);
el('fileBtn').addEventListener('click', function () { el('fileInput').click(); });
el('zipBtn').addEventListener('click', function () { el('zipInput').click(); });
el('fileInput').addEventListener('change', function (e) {
  addSelectedFiles(Array.from(e.target.files)); e.target.value = '';
});
el('zipInput').addEventListener('change', function (e) {
  if (e.target.files[0]) addZipFile(e.target.files[0]); e.target.value = '';
});
el('cameraSelect').addEventListener('change', function (e) { setCamera(e.target.value); });
el('audioSelect').addEventListener('change', function (e) { setAudio(e.target.value); });
el('studioSave').addEventListener('click', saveStudio);
el('studioRestore').addEventListener('click', restoreStudio);
el('reset').addEventListener('click', function () { clearScene(); revoke(runtimeUrls); resetDetected(); renderAll(); setStatus(''); });

el('play').addEventListener('click', togglePlay);
el('seek').addEventListener('input', function (e) { draggingSeek = true; seekToFrame(parseInt(e.target.value, 10) || 0); });
el('seek').addEventListener('change', function (e) { draggingSeek = false; seekToFrame(parseInt(e.target.value, 10) || 0); });
el('seek').addEventListener('pointerup', function (e) { draggingSeek = false; seekToFrame(parseInt(e.target.value, 10) || 0); });
el('frame').addEventListener('input', function (e) { seekToFrame(parseInt(e.target.value, 10) || 0); });
el('frame').addEventListener('change', function (e) { seekToFrame(parseInt(e.target.value, 10) || 0); });

el('floorMode').addEventListener('change', applyView);
el('physicsMode').addEventListener('change', applyPhysicsMode);
el('backgroundColor').addEventListener('input', applyBackground);
el('fpsMode').addEventListener('change', applyView);
el('pixelRatio').addEventListener('change', applyPixelRatio);
syncRangeNumber('ambientLightLevelRange', 'ambientLightLevel', applyLighting);
syncRangeNumber('directionalLightLevelRange', 'directionalLightLevel', applyLighting);
syncRangeNumber('playbackSpeedRange', 'playbackSpeed', applyPlaybackSpeed);
syncRangeNumber('audioVolumeRange', 'audioVolume', applyAudioVolume);

el('logBtn').addEventListener('click', function () { el('logPanel').classList.toggle('open'); });
el('logCopy').addEventListener('click', function () {
  var t = document.createElement('textarea');
  t.value = logBoxEl.textContent; document.body.appendChild(t); t.select();
  document.execCommand('copy'); document.body.removeChild(t);
});
el('ikMode').addEventListener('change', applyIkMode);
el('physicsReset').addEventListener('click', resetPhysics);
el('physicsFps').addEventListener('change', applyPhysicsStep);
el('evalType').addEventListener('change', applyEvalType);
el('useDelta').addEventListener('change', applyUseDelta);
el('glowMode').addEventListener('change', applyGlow);
syncRangeNumber('glowIntensityRange', 'glowIntensity', applyGlow);
syncRangeNumber('glowBlurRange', 'glowBlur', applyGlow);
el('bloomMode').addEventListener('change', applyBloom);
syncRangeNumber('bloomWeightRange', 'bloomWeight', applyBloom);
syncRangeNumber('bloomThresholdRange', 'bloomThreshold', applyBloom);
el('dofMode').addEventListener('change', applyDof);
syncRangeNumber('dofFocusRange', 'dofFocus', applyDof);
syncRangeNumber('dofApertureRange', 'dofAperture', applyDof);
syncRangeNumber('substepsRange', 'substeps', applyPhysicsStep);
el('renderMp4').addEventListener('click', renderMp4H264);

/* ====== Start ====== */
init();
setStatus('');

})();
