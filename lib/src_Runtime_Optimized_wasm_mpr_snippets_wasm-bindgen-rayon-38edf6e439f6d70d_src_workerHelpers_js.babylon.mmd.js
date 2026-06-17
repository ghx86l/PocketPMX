(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("babylon-mmd", [], factory);
	else if(typeof exports === 'object')
		exports["babylon-mmd"] = factory();
	else
		root["BABYLONMMD"] = factory();
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Runtime/Optimized/wasm/mpr/index_bg.wasm"
/*!******************************************************!*\
  !*** ./src/Runtime/Optimized/wasm/mpr/index_bg.wasm ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "43d66f64deee27b19d3d.wasm";

/***/ },

/***/ "./src/Runtime/Optimized/wasm/mpr/index.js"
/*!*************************************************!*\
  !*** ./src/Runtime/Optimized/wasm/mpr/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationPool: () => (/* binding */ AnimationPool),
/* harmony export */   MmdRuntime: () => (/* binding */ MmdRuntime),
/* harmony export */   allocateBuffer: () => (/* binding */ allocateBuffer),
/* harmony export */   constraintEnableSpring: () => (/* binding */ constraintEnableSpring),
/* harmony export */   constraintSetAngularLowerLimit: () => (/* binding */ constraintSetAngularLowerLimit),
/* harmony export */   constraintSetAngularUpperLimit: () => (/* binding */ constraintSetAngularUpperLimit),
/* harmony export */   constraintSetDamping: () => (/* binding */ constraintSetDamping),
/* harmony export */   constraintSetLinearLowerLimit: () => (/* binding */ constraintSetLinearLowerLimit),
/* harmony export */   constraintSetLinearUpperLimit: () => (/* binding */ constraintSetLinearUpperLimit),
/* harmony export */   constraintSetParam: () => (/* binding */ constraintSetParam),
/* harmony export */   constraintSetStiffness: () => (/* binding */ constraintSetStiffness),
/* harmony export */   constraintUseFrameOffset: () => (/* binding */ constraintUseFrameOffset),
/* harmony export */   createAnimationPool: () => (/* binding */ createAnimationPool),
/* harmony export */   createBoxShape: () => (/* binding */ createBoxShape),
/* harmony export */   createCapsuleShape: () => (/* binding */ createCapsuleShape),
/* harmony export */   createGeneric6DofConstraint: () => (/* binding */ createGeneric6DofConstraint),
/* harmony export */   createGeneric6DofConstraintFromBundle: () => (/* binding */ createGeneric6DofConstraintFromBundle),
/* harmony export */   createGeneric6DofSpringConstraint: () => (/* binding */ createGeneric6DofSpringConstraint),
/* harmony export */   createGeneric6DofSpringConstraintFromBundle: () => (/* binding */ createGeneric6DofSpringConstraintFromBundle),
/* harmony export */   createMmdRuntime: () => (/* binding */ createMmdRuntime),
/* harmony export */   createMultiPhysicsRuntime: () => (/* binding */ createMultiPhysicsRuntime),
/* harmony export */   createMultiPhysicsWorld: () => (/* binding */ createMultiPhysicsWorld),
/* harmony export */   createPhysicsRuntime: () => (/* binding */ createPhysicsRuntime),
/* harmony export */   createPhysicsWorld: () => (/* binding */ createPhysicsWorld),
/* harmony export */   createRigidBody: () => (/* binding */ createRigidBody),
/* harmony export */   createRigidBodyBundle: () => (/* binding */ createRigidBodyBundle),
/* harmony export */   createSphereShape: () => (/* binding */ createSphereShape),
/* harmony export */   createStaticPlaneShape: () => (/* binding */ createStaticPlaneShape),
/* harmony export */   deallocateBuffer: () => (/* binding */ deallocateBuffer),
/* harmony export */   "default": () => (/* binding */ __wbg_init),
/* harmony export */   destroyConstraint: () => (/* binding */ destroyConstraint),
/* harmony export */   destroyMultiPhysicsRuntime: () => (/* binding */ destroyMultiPhysicsRuntime),
/* harmony export */   destroyMultiPhysicsWorld: () => (/* binding */ destroyMultiPhysicsWorld),
/* harmony export */   destroyPhysicsRuntime: () => (/* binding */ destroyPhysicsRuntime),
/* harmony export */   destroyPhysicsWorld: () => (/* binding */ destroyPhysicsWorld),
/* harmony export */   destroyRigidBody: () => (/* binding */ destroyRigidBody),
/* harmony export */   destroyRigidBodyBundle: () => (/* binding */ destroyRigidBodyBundle),
/* harmony export */   destroyShape: () => (/* binding */ destroyShape),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   initSync: () => (/* binding */ initSync),
/* harmony export */   initThreadPool: () => (/* binding */ initThreadPool),
/* harmony export */   multiPhysicsRuntimeBufferedStepSimulation: () => (/* binding */ multiPhysicsRuntimeBufferedStepSimulation),
/* harmony export */   multiPhysicsRuntimeGetLockStatePtr: () => (/* binding */ multiPhysicsRuntimeGetLockStatePtr),
/* harmony export */   multiPhysicsWorldAddConstraint: () => (/* binding */ multiPhysicsWorldAddConstraint),
/* harmony export */   multiPhysicsWorldAddRigidBody: () => (/* binding */ multiPhysicsWorldAddRigidBody),
/* harmony export */   multiPhysicsWorldAddRigidBodyBundle: () => (/* binding */ multiPhysicsWorldAddRigidBodyBundle),
/* harmony export */   multiPhysicsWorldAddRigidBodyBundleShadow: () => (/* binding */ multiPhysicsWorldAddRigidBodyBundleShadow),
/* harmony export */   multiPhysicsWorldAddRigidBodyBundleToGlobal: () => (/* binding */ multiPhysicsWorldAddRigidBodyBundleToGlobal),
/* harmony export */   multiPhysicsWorldAddRigidBodyShadow: () => (/* binding */ multiPhysicsWorldAddRigidBodyShadow),
/* harmony export */   multiPhysicsWorldAddRigidBodyToGlobal: () => (/* binding */ multiPhysicsWorldAddRigidBodyToGlobal),
/* harmony export */   multiPhysicsWorldRemoveConstraint: () => (/* binding */ multiPhysicsWorldRemoveConstraint),
/* harmony export */   multiPhysicsWorldRemoveRigidBody: () => (/* binding */ multiPhysicsWorldRemoveRigidBody),
/* harmony export */   multiPhysicsWorldRemoveRigidBodyBundle: () => (/* binding */ multiPhysicsWorldRemoveRigidBodyBundle),
/* harmony export */   multiPhysicsWorldRemoveRigidBodyBundleFromGlobal: () => (/* binding */ multiPhysicsWorldRemoveRigidBodyBundleFromGlobal),
/* harmony export */   multiPhysicsWorldRemoveRigidBodyBundleShadow: () => (/* binding */ multiPhysicsWorldRemoveRigidBodyBundleShadow),
/* harmony export */   multiPhysicsWorldRemoveRigidBodyFromGlobal: () => (/* binding */ multiPhysicsWorldRemoveRigidBodyFromGlobal),
/* harmony export */   multiPhysicsWorldRemoveRigidBodyShadow: () => (/* binding */ multiPhysicsWorldRemoveRigidBodyShadow),
/* harmony export */   multiPhysicsWorldSetGravity: () => (/* binding */ multiPhysicsWorldSetGravity),
/* harmony export */   multiPhysicsWorldStepSimulation: () => (/* binding */ multiPhysicsWorldStepSimulation),
/* harmony export */   multiPhysicsWorldUseMotionStateBuffer: () => (/* binding */ multiPhysicsWorldUseMotionStateBuffer),
/* harmony export */   physicsRuntimeBufferedStepSimulation: () => (/* binding */ physicsRuntimeBufferedStepSimulation),
/* harmony export */   physicsRuntimeGetLockStatePtr: () => (/* binding */ physicsRuntimeGetLockStatePtr),
/* harmony export */   physicsWorldAddConstraint: () => (/* binding */ physicsWorldAddConstraint),
/* harmony export */   physicsWorldAddRigidBody: () => (/* binding */ physicsWorldAddRigidBody),
/* harmony export */   physicsWorldAddRigidBodyBundle: () => (/* binding */ physicsWorldAddRigidBodyBundle),
/* harmony export */   physicsWorldRemoveConstraint: () => (/* binding */ physicsWorldRemoveConstraint),
/* harmony export */   physicsWorldRemoveRigidBody: () => (/* binding */ physicsWorldRemoveRigidBody),
/* harmony export */   physicsWorldRemoveRigidBodyBundle: () => (/* binding */ physicsWorldRemoveRigidBodyBundle),
/* harmony export */   physicsWorldSetGravity: () => (/* binding */ physicsWorldSetGravity),
/* harmony export */   physicsWorldStepSimulation: () => (/* binding */ physicsWorldStepSimulation),
/* harmony export */   physicsWorldUseMotionStateBuffer: () => (/* binding */ physicsWorldUseMotionStateBuffer),
/* harmony export */   rigidBodyApplyCentralForce: () => (/* binding */ rigidBodyApplyCentralForce),
/* harmony export */   rigidBodyApplyCentralImpulse: () => (/* binding */ rigidBodyApplyCentralImpulse),
/* harmony export */   rigidBodyApplyCentralPushImpulse: () => (/* binding */ rigidBodyApplyCentralPushImpulse),
/* harmony export */   rigidBodyApplyForce: () => (/* binding */ rigidBodyApplyForce),
/* harmony export */   rigidBodyApplyImpulse: () => (/* binding */ rigidBodyApplyImpulse),
/* harmony export */   rigidBodyApplyPushImpulse: () => (/* binding */ rigidBodyApplyPushImpulse),
/* harmony export */   rigidBodyApplyTorque: () => (/* binding */ rigidBodyApplyTorque),
/* harmony export */   rigidBodyApplyTorqueImpulse: () => (/* binding */ rigidBodyApplyTorqueImpulse),
/* harmony export */   rigidBodyApplyTorqueTurnImpulse: () => (/* binding */ rigidBodyApplyTorqueTurnImpulse),
/* harmony export */   rigidBodyBundleApplyCentralForce: () => (/* binding */ rigidBodyBundleApplyCentralForce),
/* harmony export */   rigidBodyBundleApplyCentralImpulse: () => (/* binding */ rigidBodyBundleApplyCentralImpulse),
/* harmony export */   rigidBodyBundleApplyCentralPushImpulse: () => (/* binding */ rigidBodyBundleApplyCentralPushImpulse),
/* harmony export */   rigidBodyBundleApplyForce: () => (/* binding */ rigidBodyBundleApplyForce),
/* harmony export */   rigidBodyBundleApplyImpulse: () => (/* binding */ rigidBodyBundleApplyImpulse),
/* harmony export */   rigidBodyBundleApplyPushImpulse: () => (/* binding */ rigidBodyBundleApplyPushImpulse),
/* harmony export */   rigidBodyBundleApplyTorque: () => (/* binding */ rigidBodyBundleApplyTorque),
/* harmony export */   rigidBodyBundleApplyTorqueImpulse: () => (/* binding */ rigidBodyBundleApplyTorqueImpulse),
/* harmony export */   rigidBodyBundleApplyTorqueTurnImpulse: () => (/* binding */ rigidBodyBundleApplyTorqueTurnImpulse),
/* harmony export */   rigidBodyBundleClearForces: () => (/* binding */ rigidBodyBundleClearForces),
/* harmony export */   rigidBodyBundleGetAngularDamping: () => (/* binding */ rigidBodyBundleGetAngularDamping),
/* harmony export */   rigidBodyBundleGetAngularVelocity: () => (/* binding */ rigidBodyBundleGetAngularVelocity),
/* harmony export */   rigidBodyBundleGetBufferedMotionStatesPtr: () => (/* binding */ rigidBodyBundleGetBufferedMotionStatesPtr),
/* harmony export */   rigidBodyBundleGetKinematicStatesPtr: () => (/* binding */ rigidBodyBundleGetKinematicStatesPtr),
/* harmony export */   rigidBodyBundleGetLinearDamping: () => (/* binding */ rigidBodyBundleGetLinearDamping),
/* harmony export */   rigidBodyBundleGetLinearVelocity: () => (/* binding */ rigidBodyBundleGetLinearVelocity),
/* harmony export */   rigidBodyBundleGetLocalInertia: () => (/* binding */ rigidBodyBundleGetLocalInertia),
/* harmony export */   rigidBodyBundleGetMass: () => (/* binding */ rigidBodyBundleGetMass),
/* harmony export */   rigidBodyBundleGetMotionStatesPtr: () => (/* binding */ rigidBodyBundleGetMotionStatesPtr),
/* harmony export */   rigidBodyBundleGetPushVelocity: () => (/* binding */ rigidBodyBundleGetPushVelocity),
/* harmony export */   rigidBodyBundleGetPushVelocityInLocalPoint: () => (/* binding */ rigidBodyBundleGetPushVelocityInLocalPoint),
/* harmony export */   rigidBodyBundleGetTotalForce: () => (/* binding */ rigidBodyBundleGetTotalForce),
/* harmony export */   rigidBodyBundleGetTotalTorque: () => (/* binding */ rigidBodyBundleGetTotalTorque),
/* harmony export */   rigidBodyBundleGetTurnVelocity: () => (/* binding */ rigidBodyBundleGetTurnVelocity),
/* harmony export */   rigidBodyBundleGetVelocityInLocalPoint: () => (/* binding */ rigidBodyBundleGetVelocityInLocalPoint),
/* harmony export */   rigidBodyBundleGetWorldTransformPtr: () => (/* binding */ rigidBodyBundleGetWorldTransformPtr),
/* harmony export */   rigidBodyBundleSetAngularVelocity: () => (/* binding */ rigidBodyBundleSetAngularVelocity),
/* harmony export */   rigidBodyBundleSetDamping: () => (/* binding */ rigidBodyBundleSetDamping),
/* harmony export */   rigidBodyBundleSetLinearVelocity: () => (/* binding */ rigidBodyBundleSetLinearVelocity),
/* harmony export */   rigidBodyBundleSetMassProps: () => (/* binding */ rigidBodyBundleSetMassProps),
/* harmony export */   rigidBodyBundleSetPushVelocity: () => (/* binding */ rigidBodyBundleSetPushVelocity),
/* harmony export */   rigidBodyBundleSetShape: () => (/* binding */ rigidBodyBundleSetShape),
/* harmony export */   rigidBodyBundleSetTurnVelocity: () => (/* binding */ rigidBodyBundleSetTurnVelocity),
/* harmony export */   rigidBodyBundleTranslate: () => (/* binding */ rigidBodyBundleTranslate),
/* harmony export */   rigidBodyClearForces: () => (/* binding */ rigidBodyClearForces),
/* harmony export */   rigidBodyGetAngularDamping: () => (/* binding */ rigidBodyGetAngularDamping),
/* harmony export */   rigidBodyGetAngularVelocity: () => (/* binding */ rigidBodyGetAngularVelocity),
/* harmony export */   rigidBodyGetBufferedMotionStatePtr: () => (/* binding */ rigidBodyGetBufferedMotionStatePtr),
/* harmony export */   rigidBodyGetKinematicStatePtr: () => (/* binding */ rigidBodyGetKinematicStatePtr),
/* harmony export */   rigidBodyGetLinearDamping: () => (/* binding */ rigidBodyGetLinearDamping),
/* harmony export */   rigidBodyGetLinearVelocity: () => (/* binding */ rigidBodyGetLinearVelocity),
/* harmony export */   rigidBodyGetLocalInertia: () => (/* binding */ rigidBodyGetLocalInertia),
/* harmony export */   rigidBodyGetMass: () => (/* binding */ rigidBodyGetMass),
/* harmony export */   rigidBodyGetMotionStatePtr: () => (/* binding */ rigidBodyGetMotionStatePtr),
/* harmony export */   rigidBodyGetPushVelocity: () => (/* binding */ rigidBodyGetPushVelocity),
/* harmony export */   rigidBodyGetPushVelocityInLocalPoint: () => (/* binding */ rigidBodyGetPushVelocityInLocalPoint),
/* harmony export */   rigidBodyGetTotalForce: () => (/* binding */ rigidBodyGetTotalForce),
/* harmony export */   rigidBodyGetTotalTorque: () => (/* binding */ rigidBodyGetTotalTorque),
/* harmony export */   rigidBodyGetTurnVelocity: () => (/* binding */ rigidBodyGetTurnVelocity),
/* harmony export */   rigidBodyGetVelocityInLocalPoint: () => (/* binding */ rigidBodyGetVelocityInLocalPoint),
/* harmony export */   rigidBodyGetWorldTransformPtr: () => (/* binding */ rigidBodyGetWorldTransformPtr),
/* harmony export */   rigidBodySetAngularVelocity: () => (/* binding */ rigidBodySetAngularVelocity),
/* harmony export */   rigidBodySetDamping: () => (/* binding */ rigidBodySetDamping),
/* harmony export */   rigidBodySetLinearVelocity: () => (/* binding */ rigidBodySetLinearVelocity),
/* harmony export */   rigidBodySetMassProps: () => (/* binding */ rigidBodySetMassProps),
/* harmony export */   rigidBodySetPushVelocity: () => (/* binding */ rigidBodySetPushVelocity),
/* harmony export */   rigidBodySetShape: () => (/* binding */ rigidBodySetShape),
/* harmony export */   rigidBodySetTurnVelocity: () => (/* binding */ rigidBodySetTurnVelocity),
/* harmony export */   rigidBodyTranslate: () => (/* binding */ rigidBodyTranslate),
/* harmony export */   wbg_rayon_PoolBuilder: () => (/* binding */ wbg_rayon_PoolBuilder),
/* harmony export */   wbg_rayon_start_worker: () => (/* binding */ wbg_rayon_start_worker)
/* harmony export */ });
/* harmony import */ var _snippets_wasm_bindgen_rayon_38edf6e439f6d70d_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js */ "./src/Runtime/Optimized/wasm/mpr/snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js");
/* @ts-self-types="./index.d.ts" */



class AnimationPool {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AnimationPool.prototype);
        obj.__wbg_ptr = ptr;
        AnimationPoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AnimationPoolFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_animationpool_free(ptr, 0);
    }
    /**
     * @param {number} count
     * @returns {number}
     */
    allocateLengthsBuffer(count) {
        const ret = wasm.animationpool_allocateLengthsBuffer(this.__wbg_ptr, count);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @param {number} mmd_model_ptr
     * @param {number} frame_time
     */
    animateMmdModel(animation_ptr, mmd_model_ptr, frame_time) {
        wasm.animationpool_animateMmdModel(this.__wbg_ptr, animation_ptr, mmd_model_ptr, frame_time);
    }
    /**
     * @param {number} bone_tracks_ptr
     * @param {number} bone_track_count
     * @param {number} movable_bone_tracks_ptr
     * @param {number} movable_bone_track_count
     * @param {number} morph_tracks_ptr
     * @param {number} morph_track_count
     * @param {number} property_track_length
     * @param {number} property_track_ik_count
     * @returns {number}
     */
    createAnimation(bone_tracks_ptr, bone_track_count, movable_bone_tracks_ptr, movable_bone_track_count, morph_tracks_ptr, morph_track_count, property_track_length, property_track_ik_count) {
        const ret = wasm.animationpool_createAnimation(this.__wbg_ptr, bone_tracks_ptr, bone_track_count, movable_bone_tracks_ptr, movable_bone_track_count, morph_tracks_ptr, morph_track_count, property_track_length, property_track_ik_count);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @returns {number}
     */
    createBoneBindIndexMap(animation_ptr) {
        const ret = wasm.animationpool_createBoneBindIndexMap(this.__wbg_ptr, animation_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @param {number} body_lengths
     * @returns {number}
     */
    createBoneToBodyBindIndexMap(animation_ptr, body_lengths) {
        const ret = wasm.animationpool_createBoneToBodyBindIndexMap(this.__wbg_ptr, animation_ptr, body_lengths);
        return ret >>> 0;
    }
    /**
     * @param {number} track_lengths
     * @param {number} track_count
     * @returns {number}
     */
    createBoneTracks(track_lengths, track_count) {
        const ret = wasm.animationpool_createBoneTracks(this.__wbg_ptr, track_lengths, track_count);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @returns {number}
     */
    createIkSolverBindIndexMap(animation_ptr) {
        const ret = wasm.animationpool_createIkSolverBindIndexMap(this.__wbg_ptr, animation_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @param {number} morph_lengths
     * @returns {number}
     */
    createMorphBindIndexMap(animation_ptr, morph_lengths) {
        const ret = wasm.animationpool_createMorphBindIndexMap(this.__wbg_ptr, animation_ptr, morph_lengths);
        return ret >>> 0;
    }
    /**
     * @param {number} track_lengths
     * @param {number} track_count
     * @returns {number}
     */
    createMorphTracks(track_lengths, track_count) {
        const ret = wasm.animationpool_createMorphTracks(this.__wbg_ptr, track_lengths, track_count);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @returns {number}
     */
    createMovableBoneBindIndexMap(animation_ptr) {
        const ret = wasm.animationpool_createMovableBoneBindIndexMap(this.__wbg_ptr, animation_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} track_lengths
     * @param {number} track_count
     * @returns {number}
     */
    createMovableBoneTracks(track_lengths, track_count) {
        const ret = wasm.animationpool_createMovableBoneTracks(this.__wbg_ptr, track_lengths, track_count);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @param {number} bone_bind_index_map
     * @param {number} movable_bone_bind_index_map
     * @param {number} morph_bind_index_map
     * @param {number} ik_solver_bind_index_map
     * @param {number} bone_to_body_bind_index_map
     * @returns {number}
     */
    createRuntimeAnimation(animation_ptr, bone_bind_index_map, movable_bone_bind_index_map, morph_bind_index_map, ik_solver_bind_index_map, bone_to_body_bind_index_map) {
        const ret = wasm.animationpool_createRuntimeAnimation(this.__wbg_ptr, animation_ptr, bone_bind_index_map, movable_bone_bind_index_map, morph_bind_index_map, ik_solver_bind_index_map, bone_to_body_bind_index_map);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @param {number} count
     */
    deallocateLengthsBuffer(ptr, count) {
        wasm.animationpool_deallocateLengthsBuffer(this.__wbg_ptr, ptr, count);
    }
    /**
     * @param {number} animation_ptr
     */
    destroyAnimation(animation_ptr) {
        wasm.animationpool_destroyAnimation(this.__wbg_ptr, animation_ptr);
    }
    /**
     * @param {number} runtime_animation_ptr
     */
    destroyRuntimeAnimation(runtime_animation_ptr) {
        wasm.animationpool_destroyRuntimeAnimation(this.__wbg_ptr, runtime_animation_ptr);
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getBoneTrackFrameNumbers(tracks, index) {
        const ret = wasm.animationpool_getBoneTrackFrameNumbers(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getBoneTrackPhysicsToggles(tracks, index) {
        const ret = wasm.animationpool_getBoneTrackPhysicsToggles(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getBoneTrackRotationInterpolations(tracks, index) {
        const ret = wasm.animationpool_getBoneTrackRotationInterpolations(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getBoneTrackRotations(tracks, index) {
        const ret = wasm.animationpool_getBoneTrackRotations(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMorphTrackFrameNumbers(tracks, index) {
        const ret = wasm.animationpool_getMorphTrackFrameNumbers(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMorphTrackWeights(tracks, index) {
        const ret = wasm.animationpool_getMorphTrackWeights(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackFrameNumbers(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackFrameNumbers(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackPhysicsToggles(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackPhysicsToggles(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackPositionInterpolations(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackPositionInterpolations(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackPositions(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackPositions(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackRotationInterpolations(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackRotationInterpolations(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} tracks
     * @param {number} index
     * @returns {number}
     */
    getMovableBoneTrackRotations(tracks, index) {
        const ret = wasm.animationpool_getMovableBoneTrackRotations(this.__wbg_ptr, tracks, index);
        return ret >>> 0;
    }
    /**
     * @param {number} bone_to_body_bind_index_map
     * @param {number} index
     * @returns {number}
     */
    getNthBoneToBodyBindIndexMap(bone_to_body_bind_index_map, index) {
        const ret = wasm.animationpool_getNthBoneToBodyBindIndexMap(this.__wbg_ptr, bone_to_body_bind_index_map, index);
        return ret >>> 0;
    }
    /**
     * @param {number} morph_bind_index_map
     * @param {number} index
     * @returns {number}
     */
    getNthMorphBindIndexMap(morph_bind_index_map, index) {
        const ret = wasm.animationpool_getNthMorphBindIndexMap(this.__wbg_ptr, morph_bind_index_map, index);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @returns {number}
     */
    getPropertyTrackFrameNumbers(animation_ptr) {
        const ret = wasm.animationpool_getPropertyTrackFrameNumbers(this.__wbg_ptr, animation_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} animation_ptr
     * @param {number} index
     * @returns {number}
     */
    getPropertyTrackIkStates(animation_ptr, index) {
        const ret = wasm.animationpool_getPropertyTrackIkStates(this.__wbg_ptr, animation_ptr, index);
        return ret >>> 0;
    }
}
if (Symbol.dispose) AnimationPool.prototype[Symbol.dispose] = AnimationPool.prototype.free;

class MmdRuntime {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MmdRuntime.prototype);
        obj.__wbg_ptr = ptr;
        MmdRuntimeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MmdRuntimeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mmdruntime_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    acquireDiagnosticErrorResult() {
        const ret = wasm.mmdruntime_acquireDiagnosticErrorResult(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    acquireDiagnosticInfoResult() {
        const ret = wasm.mmdruntime_acquireDiagnosticInfoResult(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    acquireDiagnosticWarningResult() {
        const ret = wasm.mmdruntime_acquireDiagnosticWarningResult(this.__wbg_ptr);
        return ret >>> 0;
    }
    afterPhysics() {
        wasm.mmdruntime_afterPhysics(this.__wbg_ptr);
    }
    /**
     * @param {number | null} [frame_time]
     * @param {number | null} [time_step]
     */
    beforePhysics(frame_time, time_step) {
        wasm.mmdruntime_beforePhysics(this.__wbg_ptr, isLikeNone(frame_time) ? 0x100000001 : Math.fround(frame_time), isLikeNone(time_step) ? 0x100000001 : Math.fround(time_step));
    }
    /**
     * @param {MmdRuntime} mmd_runtime
     * @param {number | null} [frame_time]
     * @param {number | null} [time_step]
     */
    static bufferedBeforePhysics(mmd_runtime, frame_time, time_step) {
        _assertClass(mmd_runtime, MmdRuntime);
        wasm.mmdruntime_bufferedBeforePhysics(mmd_runtime.__wbg_ptr, isLikeNone(frame_time) ? 0x100000001 : Math.fround(frame_time), isLikeNone(time_step) ? 0x100000001 : Math.fround(time_step));
    }
    /**
     * @param {MmdRuntime} mmd_runtime
     * @param {number | null} [frame_time]
     * @param {number | null} [time_step]
     */
    static bufferedUpdate(mmd_runtime, frame_time, time_step) {
        _assertClass(mmd_runtime, MmdRuntime);
        wasm.mmdruntime_bufferedUpdate(mmd_runtime.__wbg_ptr, isLikeNone(frame_time) ? 0x100000001 : Math.fround(frame_time), isLikeNone(time_step) ? 0x100000001 : Math.fround(time_step));
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    createBoneWorldMatrixBackBuffer(ptr) {
        const ret = wasm.mmdruntime_createBoneWorldMatrixBackBuffer(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} serialized_metadata_ptr
     * @param {number} serialized_metadata_size
     * @returns {number}
     */
    createMmdModel(serialized_metadata_ptr, serialized_metadata_size) {
        const ret = wasm.mmdruntime_createMmdModel(this.__wbg_ptr, serialized_metadata_ptr, serialized_metadata_size);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     */
    destroyMmdModel(ptr) {
        wasm.mmdruntime_destroyMmdModel(this.__wbg_ptr, ptr);
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getAnimationArena(ptr) {
        const ret = wasm.mmdruntime_getAnimationArena(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getAnimationIkSolverStateArena(ptr) {
        const ret = wasm.mmdruntime_getAnimationIkSolverStateArena(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getAnimationMorphArena(ptr) {
        const ret = wasm.mmdruntime_getAnimationMorphArena(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getAnimationRigidBodyStateArena(ptr) {
        const ret = wasm.mmdruntime_getAnimationRigidBodyStateArena(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getAnimationRigidBodyStateArenaSize(ptr) {
        const ret = wasm.mmdruntime_getAnimationRigidBodyStateArenaSize(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     * @returns {number}
     */
    getBoneWorldMatrixArena(ptr) {
        const ret = wasm.mmdruntime_getBoneWorldMatrixArena(this.__wbg_ptr, ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    getLockStatePtr() {
        const ret = wasm.mmdruntime_getLockStatePtr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    getMultiPhysicsWorld() {
        const ret = wasm.mmdruntime_getMultiPhysicsWorld(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} ptr
     */
    markMmdModelPhysicsAsNeedInit(ptr) {
        wasm.mmdruntime_markMmdModelPhysicsAsNeedInit(this.__wbg_ptr, ptr);
    }
    releaseDiagnosticResult() {
        wasm.mmdruntime_releaseDiagnosticResult(this.__wbg_ptr);
    }
    /**
     * @param {number} ptr
     * @param {number} world_matrix
     */
    setMmdModelWorldMatrix(ptr, world_matrix) {
        wasm.mmdruntime_setMmdModelWorldMatrix(this.__wbg_ptr, ptr, world_matrix);
    }
    /**
     * @param {number} fixed_time_step
     */
    setPhysicsFixedTimeStep(fixed_time_step) {
        wasm.mmdruntime_setPhysicsFixedTimeStep(this.__wbg_ptr, fixed_time_step);
    }
    /**
     * @param {number} max_sub_steps
     */
    setPhysicsMaxSubSteps(max_sub_steps) {
        wasm.mmdruntime_setPhysicsMaxSubSteps(this.__wbg_ptr, max_sub_steps);
    }
    /**
     * @param {number} ptr
     * @param {number} runtime_animation
     */
    setRuntimeAnimation(ptr, runtime_animation) {
        wasm.mmdruntime_setRuntimeAnimation(this.__wbg_ptr, ptr, runtime_animation);
    }
    swapWorldMatrixBuffer() {
        wasm.mmdruntime_swapWorldMatrixBuffer(this.__wbg_ptr);
    }
    /**
     * @param {number} ptr
     * @param {number} rigidbody_state_size
     */
    useExternalPhysics(ptr, rigidbody_state_size) {
        wasm.mmdruntime_useExternalPhysics(this.__wbg_ptr, ptr, rigidbody_state_size);
    }
}
if (Symbol.dispose) MmdRuntime.prototype[Symbol.dispose] = MmdRuntime.prototype.free;

/**
 * @param {number} size
 * @returns {number}
 */
function allocateBuffer(size) {
    const ret = wasm.allocateBuffer(size);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {boolean} on_off
 */
function constraintEnableSpring(ptr, index, on_off) {
    wasm.constraintEnableSpring(ptr, index, on_off);
}

/**
 * @param {number} ptr
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function constraintSetAngularLowerLimit(ptr, x, y, z) {
    wasm.constraintSetAngularLowerLimit(ptr, x, y, z);
}

/**
 * @param {number} ptr
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function constraintSetAngularUpperLimit(ptr, x, y, z) {
    wasm.constraintSetAngularUpperLimit(ptr, x, y, z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} damping
 */
function constraintSetDamping(ptr, index, damping) {
    wasm.constraintSetDamping(ptr, index, damping);
}

/**
 * @param {number} ptr
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function constraintSetLinearLowerLimit(ptr, x, y, z) {
    wasm.constraintSetLinearLowerLimit(ptr, x, y, z);
}

/**
 * @param {number} ptr
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function constraintSetLinearUpperLimit(ptr, x, y, z) {
    wasm.constraintSetLinearUpperLimit(ptr, x, y, z);
}

/**
 * @param {number} ptr
 * @param {number} num
 * @param {number} value
 * @param {number} axis
 */
function constraintSetParam(ptr, num, value, axis) {
    wasm.constraintSetParam(ptr, num, value, axis);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} stiffness
 */
function constraintSetStiffness(ptr, index, stiffness) {
    wasm.constraintSetStiffness(ptr, index, stiffness);
}

/**
 * @param {number} ptr
 * @param {boolean} frame_offset_on_off
 */
function constraintUseFrameOffset(ptr, frame_offset_on_off) {
    wasm.constraintUseFrameOffset(ptr, frame_offset_on_off);
}

/**
 * @returns {AnimationPool}
 */
function createAnimationPool() {
    const ret = wasm.createAnimationPool();
    return AnimationPool.__wrap(ret);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number}
 */
function createBoxShape(x, y, z) {
    const ret = wasm.createBoxShape(x, y, z);
    return ret >>> 0;
}

/**
 * @param {number} radius
 * @param {number} height
 * @returns {number}
 */
function createCapsuleShape(radius, height) {
    const ret = wasm.createCapsuleShape(radius, height);
    return ret >>> 0;
}

/**
 * @param {number} body_a
 * @param {number} body_b
 * @param {number} frame_a
 * @param {number} frame_b
 * @param {boolean} use_linear_reference_frame_a
 * @returns {number}
 */
function createGeneric6DofConstraint(body_a, body_b, frame_a, frame_b, use_linear_reference_frame_a) {
    const ret = wasm.createGeneric6DofConstraint(body_a, body_b, frame_a, frame_b, use_linear_reference_frame_a);
    return ret >>> 0;
}

/**
 * @param {number} body_bundle
 * @param {number} body_a_index
 * @param {number} body_b_index
 * @param {number} frame_a
 * @param {number} frame_b
 * @param {boolean} use_linear_reference_frame_a
 * @returns {number}
 */
function createGeneric6DofConstraintFromBundle(body_bundle, body_a_index, body_b_index, frame_a, frame_b, use_linear_reference_frame_a) {
    const ret = wasm.createGeneric6DofConstraintFromBundle(body_bundle, body_a_index, body_b_index, frame_a, frame_b, use_linear_reference_frame_a);
    return ret >>> 0;
}

/**
 * @param {number} body_a
 * @param {number} body_b
 * @param {number} frame_a
 * @param {number} frame_b
 * @param {boolean} use_linear_reference_frame_a
 * @returns {number}
 */
function createGeneric6DofSpringConstraint(body_a, body_b, frame_a, frame_b, use_linear_reference_frame_a) {
    const ret = wasm.createGeneric6DofSpringConstraint(body_a, body_b, frame_a, frame_b, use_linear_reference_frame_a);
    return ret >>> 0;
}

/**
 * @param {number} body_bundle
 * @param {number} body_a_index
 * @param {number} body_b_index
 * @param {number} frame_a
 * @param {number} frame_b
 * @param {boolean} use_linear_reference_frame_a
 * @returns {number}
 */
function createGeneric6DofSpringConstraintFromBundle(body_bundle, body_a_index, body_b_index, frame_a, frame_b, use_linear_reference_frame_a) {
    const ret = wasm.createGeneric6DofSpringConstraintFromBundle(body_bundle, body_a_index, body_b_index, frame_a, frame_b, use_linear_reference_frame_a);
    return ret >>> 0;
}

/**
 * @returns {MmdRuntime}
 */
function createMmdRuntime() {
    const ret = wasm.createMmdRuntime();
    return MmdRuntime.__wrap(ret);
}

/**
 * @param {number} physics_world
 * @returns {number}
 */
function createMultiPhysicsRuntime(physics_world) {
    const ret = wasm.createMultiPhysicsRuntime(physics_world);
    return ret >>> 0;
}

/**
 * @param {boolean} allow_dynamic_shadow
 * @returns {number}
 */
function createMultiPhysicsWorld(allow_dynamic_shadow) {
    const ret = wasm.createMultiPhysicsWorld(allow_dynamic_shadow);
    return ret >>> 0;
}

/**
 * @param {number} physics_world
 * @returns {number}
 */
function createPhysicsRuntime(physics_world) {
    const ret = wasm.createPhysicsRuntime(physics_world);
    return ret >>> 0;
}

/**
 * @returns {number}
 */
function createPhysicsWorld() {
    const ret = wasm.createPhysicsWorld();
    return ret >>> 0;
}

/**
 * @param {number} info
 * @returns {number}
 */
function createRigidBody(info) {
    const ret = wasm.createRigidBody(info);
    return ret >>> 0;
}

/**
 * @param {number} info_list
 * @param {number} len
 * @returns {number}
 */
function createRigidBodyBundle(info_list, len) {
    const ret = wasm.createRigidBodyBundle(info_list, len);
    return ret >>> 0;
}

/**
 * @param {number} radius
 * @returns {number}
 */
function createSphereShape(radius) {
    const ret = wasm.createSphereShape(radius);
    return ret >>> 0;
}

/**
 * @param {number} normal_x
 * @param {number} normal_y
 * @param {number} normal_z
 * @param {number} plane_constant
 * @returns {number}
 */
function createStaticPlaneShape(normal_x, normal_y, normal_z, plane_constant) {
    const ret = wasm.createStaticPlaneShape(normal_x, normal_y, normal_z, plane_constant);
    return ret >>> 0;
}

/**
 * Deallocate a buffer allocated by `allocateBuffer`.
 * # Safety
 * `ptr` must be a pointer to a buffer allocated by `allocateBuffer`.
 * @param {number} ptr
 * @param {number} size
 */
function deallocateBuffer(ptr, size) {
    wasm.deallocateBuffer(ptr, size);
}

/**
 * @param {number} ptr
 */
function destroyConstraint(ptr) {
    wasm.destroyConstraint(ptr);
}

/**
 * @param {number} physics_runtime
 */
function destroyMultiPhysicsRuntime(physics_runtime) {
    wasm.destroyMultiPhysicsRuntime(physics_runtime);
}

/**
 * @param {number} world
 */
function destroyMultiPhysicsWorld(world) {
    wasm.destroyMultiPhysicsWorld(world);
}

/**
 * @param {number} physics_runtime
 */
function destroyPhysicsRuntime(physics_runtime) {
    wasm.destroyPhysicsRuntime(physics_runtime);
}

/**
 * @param {number} world
 */
function destroyPhysicsWorld(world) {
    wasm.destroyPhysicsWorld(world);
}

/**
 * @param {number} ptr
 */
function destroyRigidBody(ptr) {
    wasm.destroyRigidBody(ptr);
}

/**
 * @param {number} ptr
 */
function destroyRigidBodyBundle(ptr) {
    wasm.destroyRigidBodyBundle(ptr);
}

/**
 * @param {number} ptr
 */
function destroyShape(ptr) {
    wasm.destroyShape(ptr);
}

function init() {
    wasm.init();
}

/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
function initThreadPool(num_threads) {
    const ret = wasm.initThreadPool(num_threads);
    return ret;
}

/**
 * @param {number} physics_runtime
 * @param {number} time_step
 * @param {number} max_sub_steps
 * @param {number} fixed_time_step
 */
function multiPhysicsRuntimeBufferedStepSimulation(physics_runtime, time_step, max_sub_steps, fixed_time_step) {
    wasm.multiPhysicsRuntimeBufferedStepSimulation(physics_runtime, time_step, max_sub_steps, fixed_time_step);
}

/**
 * @param {number} runtime
 * @returns {number}
 */
function multiPhysicsRuntimeGetLockStatePtr(runtime) {
    const ret = wasm.multiPhysicsRuntimeGetLockStatePtr(runtime);
    return ret >>> 0;
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} constraint
 * @param {boolean} disable_collisions_between_linked_bodies
 */
function multiPhysicsWorldAddConstraint(world, world_id, constraint, disable_collisions_between_linked_bodies) {
    wasm.multiPhysicsWorldAddConstraint(world, world_id, constraint, disable_collisions_between_linked_bodies);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} rigidbody
 */
function multiPhysicsWorldAddRigidBody(world, world_id, rigidbody) {
    wasm.multiPhysicsWorldAddRigidBody(world, world_id, rigidbody);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} bundle
 */
function multiPhysicsWorldAddRigidBodyBundle(world, world_id, bundle) {
    wasm.multiPhysicsWorldAddRigidBodyBundle(world, world_id, bundle);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} bundle
 */
function multiPhysicsWorldAddRigidBodyBundleShadow(world, world_id, bundle) {
    wasm.multiPhysicsWorldAddRigidBodyBundleShadow(world, world_id, bundle);
}

/**
 * @param {number} world
 * @param {number} bundle
 */
function multiPhysicsWorldAddRigidBodyBundleToGlobal(world, bundle) {
    wasm.multiPhysicsWorldAddRigidBodyBundleToGlobal(world, bundle);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} rigidbody
 */
function multiPhysicsWorldAddRigidBodyShadow(world, world_id, rigidbody) {
    wasm.multiPhysicsWorldAddRigidBodyShadow(world, world_id, rigidbody);
}

/**
 * @param {number} world
 * @param {number} rigidbody
 */
function multiPhysicsWorldAddRigidBodyToGlobal(world, rigidbody) {
    wasm.multiPhysicsWorldAddRigidBodyToGlobal(world, rigidbody);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} constraint
 */
function multiPhysicsWorldRemoveConstraint(world, world_id, constraint) {
    wasm.multiPhysicsWorldRemoveConstraint(world, world_id, constraint);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} rigidbody
 */
function multiPhysicsWorldRemoveRigidBody(world, world_id, rigidbody) {
    wasm.multiPhysicsWorldRemoveRigidBody(world, world_id, rigidbody);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} bundle
 */
function multiPhysicsWorldRemoveRigidBodyBundle(world, world_id, bundle) {
    wasm.multiPhysicsWorldRemoveRigidBodyBundle(world, world_id, bundle);
}

/**
 * @param {number} world
 * @param {number} bundle
 */
function multiPhysicsWorldRemoveRigidBodyBundleFromGlobal(world, bundle) {
    wasm.multiPhysicsWorldRemoveRigidBodyBundleFromGlobal(world, bundle);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} bundle
 */
function multiPhysicsWorldRemoveRigidBodyBundleShadow(world, world_id, bundle) {
    wasm.multiPhysicsWorldRemoveRigidBodyBundleShadow(world, world_id, bundle);
}

/**
 * @param {number} world
 * @param {number} rigidbody
 */
function multiPhysicsWorldRemoveRigidBodyFromGlobal(world, rigidbody) {
    wasm.multiPhysicsWorldRemoveRigidBodyFromGlobal(world, rigidbody);
}

/**
 * @param {number} world
 * @param {number} world_id
 * @param {number} rigidbody
 */
function multiPhysicsWorldRemoveRigidBodyShadow(world, world_id, rigidbody) {
    wasm.multiPhysicsWorldRemoveRigidBodyShadow(world, world_id, rigidbody);
}

/**
 * @param {number} world
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function multiPhysicsWorldSetGravity(world, x, y, z) {
    wasm.multiPhysicsWorldSetGravity(world, x, y, z);
}

/**
 * @param {number} world
 * @param {number} time_step
 * @param {number} max_sub_steps
 * @param {number} fixed_time_step
 */
function multiPhysicsWorldStepSimulation(world, time_step, max_sub_steps, fixed_time_step) {
    wasm.multiPhysicsWorldStepSimulation(world, time_step, max_sub_steps, fixed_time_step);
}

/**
 * @param {number} world
 * @param {boolean} use_buffer
 */
function multiPhysicsWorldUseMotionStateBuffer(world, use_buffer) {
    wasm.multiPhysicsWorldUseMotionStateBuffer(world, use_buffer);
}

/**
 * @param {number} physics_runtime
 * @param {number} time_step
 * @param {number} max_sub_steps
 * @param {number} fixed_time_step
 */
function physicsRuntimeBufferedStepSimulation(physics_runtime, time_step, max_sub_steps, fixed_time_step) {
    wasm.physicsRuntimeBufferedStepSimulation(physics_runtime, time_step, max_sub_steps, fixed_time_step);
}

/**
 * @param {number} physics_runtime
 * @returns {number}
 */
function physicsRuntimeGetLockStatePtr(physics_runtime) {
    const ret = wasm.physicsRuntimeGetLockStatePtr(physics_runtime);
    return ret >>> 0;
}

/**
 * @param {number} world
 * @param {number} constraint
 * @param {boolean} disable_collisions_between_linked_bodies
 */
function physicsWorldAddConstraint(world, constraint, disable_collisions_between_linked_bodies) {
    wasm.physicsWorldAddConstraint(world, constraint, disable_collisions_between_linked_bodies);
}

/**
 * @param {number} world
 * @param {number} rigidbody
 */
function physicsWorldAddRigidBody(world, rigidbody) {
    wasm.physicsWorldAddRigidBody(world, rigidbody);
}

/**
 * @param {number} world
 * @param {number} bundle
 */
function physicsWorldAddRigidBodyBundle(world, bundle) {
    wasm.physicsWorldAddRigidBodyBundle(world, bundle);
}

/**
 * @param {number} world
 * @param {number} constraint
 */
function physicsWorldRemoveConstraint(world, constraint) {
    wasm.physicsWorldRemoveConstraint(world, constraint);
}

/**
 * @param {number} world
 * @param {number} rigidbody
 */
function physicsWorldRemoveRigidBody(world, rigidbody) {
    wasm.physicsWorldRemoveRigidBody(world, rigidbody);
}

/**
 * @param {number} world
 * @param {number} bundle
 */
function physicsWorldRemoveRigidBodyBundle(world, bundle) {
    wasm.physicsWorldRemoveRigidBodyBundle(world, bundle);
}

/**
 * @param {number} world
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function physicsWorldSetGravity(world, x, y, z) {
    wasm.physicsWorldSetGravity(world, x, y, z);
}

/**
 * @param {number} world
 * @param {number} time_step
 * @param {number} max_sub_steps
 * @param {number} fixed_time_step
 */
function physicsWorldStepSimulation(world, time_step, max_sub_steps, fixed_time_step) {
    wasm.physicsWorldStepSimulation(world, time_step, max_sub_steps, fixed_time_step);
}

/**
 * @param {number} world
 * @param {boolean} use_buffer
 */
function physicsWorldUseMotionStateBuffer(world, use_buffer) {
    wasm.physicsWorldUseMotionStateBuffer(world, use_buffer);
}

/**
 * @param {number} ptr
 * @param {number} force_x
 * @param {number} force_y
 * @param {number} force_z
 */
function rigidBodyApplyCentralForce(ptr, force_x, force_y, force_z) {
    wasm.rigidBodyApplyCentralForce(ptr, force_x, force_y, force_z);
}

/**
 * @param {number} ptr
 * @param {number} impulse_x
 * @param {number} impulse_y
 * @param {number} impulse_z
 */
function rigidBodyApplyCentralImpulse(ptr, impulse_x, impulse_y, impulse_z) {
    wasm.rigidBodyApplyCentralImpulse(ptr, impulse_x, impulse_y, impulse_z);
}

/**
 * @param {number} ptr
 * @param {number} impulse_x
 * @param {number} impulse_y
 * @param {number} impulse_z
 */
function rigidBodyApplyCentralPushImpulse(ptr, impulse_x, impulse_y, impulse_z) {
    wasm.rigidBodyApplyCentralPushImpulse(ptr, impulse_x, impulse_y, impulse_z);
}

/**
 * @param {number} ptr
 * @param {number} force_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyApplyForce(ptr, force_ptr, relative_position_ptr) {
    wasm.rigidBodyApplyForce(ptr, force_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} impulse_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyApplyImpulse(ptr, impulse_ptr, relative_position_ptr) {
    wasm.rigidBodyApplyImpulse(ptr, impulse_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} impulse_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyApplyPushImpulse(ptr, impulse_ptr, relative_position_ptr) {
    wasm.rigidBodyApplyPushImpulse(ptr, impulse_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyApplyTorque(ptr, torque_x, torque_y, torque_z) {
    wasm.rigidBodyApplyTorque(ptr, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyApplyTorqueImpulse(ptr, torque_x, torque_y, torque_z) {
    wasm.rigidBodyApplyTorqueImpulse(ptr, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyApplyTorqueTurnImpulse(ptr, torque_x, torque_y, torque_z) {
    wasm.rigidBodyApplyTorqueTurnImpulse(ptr, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} force_x
 * @param {number} force_y
 * @param {number} force_z
 */
function rigidBodyBundleApplyCentralForce(ptr, index, force_x, force_y, force_z) {
    wasm.rigidBodyBundleApplyCentralForce(ptr, index, force_x, force_y, force_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} impulse_x
 * @param {number} impulse_y
 * @param {number} impulse_z
 */
function rigidBodyBundleApplyCentralImpulse(ptr, index, impulse_x, impulse_y, impulse_z) {
    wasm.rigidBodyBundleApplyCentralImpulse(ptr, index, impulse_x, impulse_y, impulse_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} impulse_x
 * @param {number} impulse_y
 * @param {number} impulse_z
 */
function rigidBodyBundleApplyCentralPushImpulse(ptr, index, impulse_x, impulse_y, impulse_z) {
    wasm.rigidBodyBundleApplyCentralPushImpulse(ptr, index, impulse_x, impulse_y, impulse_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} force_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyBundleApplyForce(ptr, index, force_ptr, relative_position_ptr) {
    wasm.rigidBodyBundleApplyForce(ptr, index, force_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} impulse_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyBundleApplyImpulse(ptr, index, impulse_ptr, relative_position_ptr) {
    wasm.rigidBodyBundleApplyImpulse(ptr, index, impulse_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} impulse_ptr
 * @param {number} relative_position_ptr
 */
function rigidBodyBundleApplyPushImpulse(ptr, index, impulse_ptr, relative_position_ptr) {
    wasm.rigidBodyBundleApplyPushImpulse(ptr, index, impulse_ptr, relative_position_ptr);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyBundleApplyTorque(ptr, index, torque_x, torque_y, torque_z) {
    wasm.rigidBodyBundleApplyTorque(ptr, index, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyBundleApplyTorqueImpulse(ptr, index, torque_x, torque_y, torque_z) {
    wasm.rigidBodyBundleApplyTorqueImpulse(ptr, index, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} torque_x
 * @param {number} torque_y
 * @param {number} torque_z
 */
function rigidBodyBundleApplyTorqueTurnImpulse(ptr, index, torque_x, torque_y, torque_z) {
    wasm.rigidBodyBundleApplyTorqueTurnImpulse(ptr, index, torque_x, torque_y, torque_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 */
function rigidBodyBundleClearForces(ptr, index) {
    wasm.rigidBodyBundleClearForces(ptr, index);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @returns {number}
 */
function rigidBodyBundleGetAngularDamping(ptr, index) {
    const ret = wasm.rigidBodyBundleGetAngularDamping(ptr, index);
    return ret;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetAngularVelocity(ptr, index, out) {
    wasm.rigidBodyBundleGetAngularVelocity(ptr, index, out);
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyBundleGetBufferedMotionStatesPtr(ptr) {
    const ret = wasm.rigidBodyBundleGetBufferedMotionStatesPtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyBundleGetKinematicStatesPtr(ptr) {
    const ret = wasm.rigidBodyBundleGetKinematicStatesPtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @returns {number}
 */
function rigidBodyBundleGetLinearDamping(ptr, index) {
    const ret = wasm.rigidBodyBundleGetLinearDamping(ptr, index);
    return ret;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetLinearVelocity(ptr, index, out) {
    wasm.rigidBodyBundleGetLinearVelocity(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetLocalInertia(ptr, index, out) {
    wasm.rigidBodyBundleGetLocalInertia(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @returns {number}
 */
function rigidBodyBundleGetMass(ptr, index) {
    const ret = wasm.rigidBodyBundleGetMass(ptr, index);
    return ret;
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyBundleGetMotionStatesPtr(ptr) {
    const ret = wasm.rigidBodyBundleGetMotionStatesPtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetPushVelocity(ptr, index, out) {
    wasm.rigidBodyBundleGetPushVelocity(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} relative_position_ptr
 * @param {number} out
 */
function rigidBodyBundleGetPushVelocityInLocalPoint(ptr, index, relative_position_ptr, out) {
    wasm.rigidBodyBundleGetPushVelocityInLocalPoint(ptr, index, relative_position_ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetTotalForce(ptr, index, out) {
    wasm.rigidBodyBundleGetTotalForce(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetTotalTorque(ptr, index, out) {
    wasm.rigidBodyBundleGetTotalTorque(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} out
 */
function rigidBodyBundleGetTurnVelocity(ptr, index, out) {
    wasm.rigidBodyBundleGetTurnVelocity(ptr, index, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} relative_position_ptr
 * @param {number} out
 */
function rigidBodyBundleGetVelocityInLocalPoint(ptr, index, relative_position_ptr, out) {
    wasm.rigidBodyBundleGetVelocityInLocalPoint(ptr, index, relative_position_ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @returns {number}
 */
function rigidBodyBundleGetWorldTransformPtr(ptr, index) {
    const ret = wasm.rigidBodyBundleGetWorldTransformPtr(ptr, index);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodyBundleSetAngularVelocity(ptr, index, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodyBundleSetAngularVelocity(ptr, index, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} linear_damping
 * @param {number} angular_damping
 */
function rigidBodyBundleSetDamping(ptr, index, linear_damping, angular_damping) {
    wasm.rigidBodyBundleSetDamping(ptr, index, linear_damping, angular_damping);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodyBundleSetLinearVelocity(ptr, index, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodyBundleSetLinearVelocity(ptr, index, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} mass
 * @param {number} local_inertia_x
 * @param {number} local_inertia_y
 * @param {number} local_inertia_z
 */
function rigidBodyBundleSetMassProps(ptr, index, mass, local_inertia_x, local_inertia_y, local_inertia_z) {
    wasm.rigidBodyBundleSetMassProps(ptr, index, mass, local_inertia_x, local_inertia_y, local_inertia_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodyBundleSetPushVelocity(ptr, index, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodyBundleSetPushVelocity(ptr, index, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} shape
 */
function rigidBodyBundleSetShape(ptr, index, shape) {
    wasm.rigidBodyBundleSetShape(ptr, index, shape);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodyBundleSetTurnVelocity(ptr, index, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodyBundleSetTurnVelocity(ptr, index, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} index
 * @param {number} translation_x
 * @param {number} translation_y
 * @param {number} translation_z
 */
function rigidBodyBundleTranslate(ptr, index, translation_x, translation_y, translation_z) {
    wasm.rigidBodyBundleTranslate(ptr, index, translation_x, translation_y, translation_z);
}

/**
 * @param {number} ptr
 */
function rigidBodyClearForces(ptr) {
    wasm.rigidBodyClearForces(ptr);
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetAngularDamping(ptr) {
    const ret = wasm.rigidBodyGetAngularDamping(ptr);
    return ret;
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetAngularVelocity(ptr, out) {
    wasm.rigidBodyGetAngularVelocity(ptr, out);
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetBufferedMotionStatePtr(ptr) {
    const ret = wasm.rigidBodyGetBufferedMotionStatePtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetKinematicStatePtr(ptr) {
    const ret = wasm.rigidBodyGetKinematicStatePtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetLinearDamping(ptr) {
    const ret = wasm.rigidBodyGetLinearDamping(ptr);
    return ret;
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetLinearVelocity(ptr, out) {
    wasm.rigidBodyGetLinearVelocity(ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetLocalInertia(ptr, out) {
    wasm.rigidBodyGetLocalInertia(ptr, out);
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetMass(ptr) {
    const ret = wasm.rigidBodyGetMass(ptr);
    return ret;
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetMotionStatePtr(ptr) {
    const ret = wasm.rigidBodyGetMotionStatePtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetPushVelocity(ptr, out) {
    wasm.rigidBodyGetPushVelocity(ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} relative_position_ptr
 * @param {number} out
 */
function rigidBodyGetPushVelocityInLocalPoint(ptr, relative_position_ptr, out) {
    wasm.rigidBodyGetPushVelocityInLocalPoint(ptr, relative_position_ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetTotalForce(ptr, out) {
    wasm.rigidBodyGetTotalForce(ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetTotalTorque(ptr, out) {
    wasm.rigidBodyGetTotalTorque(ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} out
 */
function rigidBodyGetTurnVelocity(ptr, out) {
    wasm.rigidBodyGetTurnVelocity(ptr, out);
}

/**
 * @param {number} ptr
 * @param {number} relative_position_ptr
 * @param {number} out
 */
function rigidBodyGetVelocityInLocalPoint(ptr, relative_position_ptr, out) {
    wasm.rigidBodyGetVelocityInLocalPoint(ptr, relative_position_ptr, out);
}

/**
 * @param {number} ptr
 * @returns {number}
 */
function rigidBodyGetWorldTransformPtr(ptr) {
    const ret = wasm.rigidBodyGetWorldTransformPtr(ptr);
    return ret >>> 0;
}

/**
 * @param {number} ptr
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodySetAngularVelocity(ptr, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodySetAngularVelocity(ptr, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} linear_damping
 * @param {number} angular_damping
 */
function rigidBodySetDamping(ptr, linear_damping, angular_damping) {
    wasm.rigidBodySetDamping(ptr, linear_damping, angular_damping);
}

/**
 * @param {number} ptr
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodySetLinearVelocity(ptr, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodySetLinearVelocity(ptr, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} mass
 * @param {number} local_inertia_x
 * @param {number} local_inertia_y
 * @param {number} local_inertia_z
 */
function rigidBodySetMassProps(ptr, mass, local_inertia_x, local_inertia_y, local_inertia_z) {
    wasm.rigidBodySetMassProps(ptr, mass, local_inertia_x, local_inertia_y, local_inertia_z);
}

/**
 * @param {number} ptr
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodySetPushVelocity(ptr, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodySetPushVelocity(ptr, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} shape
 */
function rigidBodySetShape(ptr, shape) {
    wasm.rigidBodySetShape(ptr, shape);
}

/**
 * @param {number} ptr
 * @param {number} velocity_x
 * @param {number} velocity_y
 * @param {number} velocity_z
 */
function rigidBodySetTurnVelocity(ptr, velocity_x, velocity_y, velocity_z) {
    wasm.rigidBodySetTurnVelocity(ptr, velocity_x, velocity_y, velocity_z);
}

/**
 * @param {number} ptr
 * @param {number} translation_x
 * @param {number} translation_y
 * @param {number} translation_z
 */
function rigidBodyTranslate(ptr, translation_x, translation_y, translation_z) {
    wasm.rigidBodyTranslate(ptr, translation_x, translation_y, translation_z);
}

class wbg_rayon_PoolBuilder {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.__wbg_ptr = ptr;
        wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        wbg_rayon_PoolBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
    }
    build() {
        wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
    }
    /**
     * @returns {number}
     */
    numThreads() {
        const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    receiver() {
        const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) wbg_rayon_PoolBuilder.prototype[Symbol.dispose] = wbg_rayon_PoolBuilder.prototype.free;

/**
 * @param {number} receiver
 */
function wbg_rayon_start_worker(receiver) {
    wasm.wbg_rayon_start_worker(receiver);
}
function __wbg_get_imports(memory) {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_is_undefined_29a43b4d42920abd: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_memory_dfa12096f400c9bd: function() {
            const ret = wasm.memory;
            return ret;
        },
        __wbg___wbindgen_module_b5e6fb95dbdb7d7e: function() {
            const ret = wasmModule;
            return ret;
        },
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_instanceof_Window_cc64c86c8ef9e02b: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_startWorkers_8b582d57e92bd2d4: function(arg0, arg1, arg2) {
            const ret = (0,_snippets_wasm_bindgen_rayon_38edf6e439f6d70d_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__.startWorkers)(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
            return ret;
        },
        __wbg_static_accessor_GLOBAL_8cfadc87a297ca02: function() {
            const ret = typeof __webpack_require__.g === 'undefined' ? null : __webpack_require__.g;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_e445c1c7484aecc3: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_f20e8576ef1e0f17: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
        memory: memory || new WebAssembly.Memory({initial:18,maximum:65536,shared:true}),
    };
    return {
        __proto__: null,
        "./index_bg.js": import0,
    };
}

const AnimationPoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_animationpool_free(ptr >>> 0, 1));
const MmdRuntimeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_mmdruntime_free(ptr >>> 0, 1));
const wbg_rayon_PoolBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : undefined);
if (cachedTextDecoder) cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}

let wasmModule, wasm;
function __wbg_finalize_init(instance, module, thread_stack_size) {
    wasm = instance.exports;
    wasmModule = module;
    cachedUint8ArrayMemory0 = null;
    if (typeof thread_stack_size !== 'undefined' && (typeof thread_stack_size !== 'number' || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
        throw new Error('invalid stack size');
    }

    wasm.__wbindgen_start(thread_stack_size);
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module, memory, thread_stack_size} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports(memory);
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module, thread_stack_size);
}

async function __wbg_init(module_or_path, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path, memory, thread_stack_size} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL(/* asset import */ __webpack_require__(/*! index_bg.wasm */ "./src/Runtime/Optimized/wasm/mpr/index_bg.wasm"), __webpack_require__.b);
    }
    const imports = __wbg_get_imports(memory);

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}




/***/ },

/***/ "./src/Runtime/Optimized/wasm/mpr/snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js"
/*!**********************************************************************************************************!*\
  !*** ./src/Runtime/Optimized/wasm/mpr/snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js ***!
  \**********************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startWorkers: () => (/* binding */ startWorkers)
/* harmony export */ });
/*
 * Copyright 2022 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: we use `wasm_bindgen_worker_`-prefixed message types to make sure
// we can handle bundling into other files, which might happen to have their
// own `postMessage`/`onmessage` communication channels.
//
// If we didn't take that into the account, we could send much simpler signals
// like just `0` or whatever, but the code would be less resilient.

function waitForMsgType(target, type) {
  return new Promise(resolve => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data?.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

waitForMsgType(self, 'wasm_bindgen_worker_init').then(async ({ init, receiver }) => {
  // # Note 1
  // Our JS should have been generated in
  // `[out-dir]/snippets/wasm-bindgen-rayon-[hash]/workerHelpers.js`,
  // resolve the main module via `../../..`.
  //
  // This might need updating if the generated structure changes on wasm-bindgen
  // side ever in the future, but works well with bundlers today. The whole
  // point of this crate, after all, is to abstract away unstable features
  // and temporary bugs so that you don't need to deal with them in your code.
  //
  // # Note 2
  // This could be a regular import, but then some bundlers complain about
  // circular deps.
  //
  // Dynamic import could be cheap if this file was inlined into the parent,
  // which would require us just using `../../..` in `new Worker` below,
  // but that doesn't work because wasm-pack unconditionally adds
  // "sideEffects":false (see below).
  //
  // OTOH, even though it can't be inlined, it should be still reasonably
  // cheap since the requested file is already in cache (it was loaded by
  // the main thread).
  const pkg = await Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ../../.. */ "./src/Runtime/Optimized/wasm/mpr/index.js"));
  await pkg.default(init);
  postMessage({ type: 'wasm_bindgen_worker_ready' });
  pkg.wbg_rayon_start_worker(receiver);
});

// Note: this is never used, but necessary to prevent a bug in Firefox
// (https://bugzilla.mozilla.org/show_bug.cgi?id=1702191) where it collects
// Web Workers that have a shared WebAssembly memory with the main thread,
// but are not explicitly rooted via a `Worker` instance.
//
// By storing them in a variable, we can keep `Worker` objects around and
// prevent them from getting GC-d.
let _workers;

async function startWorkers(module, memory, builder) {
  if (builder.numThreads() === 0) {
    throw new Error(`num_threads must be > 0.`);
  }

  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    init: { module_or_path: module, memory },
    receiver: builder.receiver()
  };

  _workers = await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      // Self-spawn into a new Worker.
      //
      // TODO: while `new URL('...', import.meta.url) becomes a semi-standard
      // way to get asset URLs relative to the module across various bundlers
      // and browser, ideally we should switch to `import.meta.resolve`
      // once it becomes a standard.
      //
      // Note: we could use `../../..` as the URL here to inline workerHelpers.js
      // into the parent entry instead of creating another split point -
      // this would be preferable from optimization perspective -
      // however, Webpack then eliminates all message handler code
      // because wasm-pack produces "sideEffects":false in package.json
      // unconditionally.
      //
      // The only way to work around that is to have side effect code
      // in an entry point such as Worker file itself.
      const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_Runtime_Optimized_wasm_mpr_snippets_wasm-bindgen-rayon-38edf6e439f6d70d_src_workerHelpers_js"), __webpack_require__.b), {
        type: undefined
      });
      worker.postMessage(workerInit);
      await waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      return worker;
    })
  );
  builder.build();
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_Runtime_Optimized_wasm_mpr_snippets_wasm-bindgen-rayon-38edf6e439f6d70d_src_workerHelpers_js": 1
/******/ 		};
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Runtime/Optimized/wasm/mpr/snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=src_Runtime_Optimized_wasm_mpr_snippets_wasm-bindgen-rayon-38edf6e439f6d70d_src_workerHelpers_js.babylon.mmd.js.map