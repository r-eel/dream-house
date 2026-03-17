import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { camera, renderer } from './scene.js';
import { M } from './materials.js';
import { G } from './groups.js';
import { FY, fpsSpeed, fpsEyeHeight, fpsSpawns, fpsBounds } from './constants.js';

// ═══════════════════════════════════════════════════
// ORBIT CONTROLS
// ═══════════════════════════════════════════════════
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 12;
controls.maxDistance = 130;
controls.maxPolarAngle = Math.PI / 2.05;
controls.target.set(0, 6, 0);

// ═══════════════════════════════════════════════════
// FIRST-PERSON WALKTHROUGH MODE
// ═══════════════════════════════════════════════════
export const fpsControls = new PointerLockControls(camera, renderer.domElement);
fpsControls.pointerSpeed = 2.0;

export let fpsMode = false;
const fpsKeys = { forward:false, backward:false, left:false, right:false };
let fpsCurrentFloor = 'floor1';
let savedCamPos, savedTarget;
let fpsPrevTime = performance.now();

function getFloorEyeY(floor) {
  const fy = { basement: FY.B, floor1: FY.F1, floor2: FY.F2, floor3: FY.F3, outdoor: FY.F1 };
  return (fy[floor] ?? 0) + fpsEyeHeight;
}

export function animateTo(obj, target, dur=1000) {
  const s={x:obj.x,y:obj.y,z:obj.z}, t0=performance.now();
  (function update(now){
    const p=Math.min((now-t0)/dur,1);
    const e=p<0.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
    obj.x=s.x+(target.x-s.x)*e;
    obj.y=s.y+(target.y-s.y)*e;
    obj.z=s.z+(target.z-s.z)*e;
    if(p<1)requestAnimationFrame(update);
  })(performance.now());
}

export function enterFPS() {
  const activeBtn = document.querySelector('.floor-btn.active');
  const floor = activeBtn?.dataset.floor;
  if (!floor || floor === 'all') {
    fpsCurrentFloor = 'floor1';
    document.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.floor-btn[data-floor="floor1"]').classList.add('active');
    Object.entries(G).forEach(([k,g]) => { g.visible = k === 'floor1'; });
    G.structure.visible = true;
    G.outdoor.visible = true;
  } else {
    fpsCurrentFloor = floor;
  }

  savedCamPos = camera.position.clone();
  savedTarget = controls.target.clone();
  controls.enabled = false;
  fpsMode = true;

  const spawn = fpsSpawns[fpsCurrentFloor] || fpsSpawns.floor1;
  camera.position.set(spawn.x, getFloorEyeY(fpsCurrentFloor), spawn.z);
  camera.lookAt(spawn.x, getFloorEyeY(fpsCurrentFloor), spawn.z - 1);

  M.creamWall.opacity = 1.0; M.creamWall.transparent = false; M.creamWall.depthWrite = true; M.creamWall.needsUpdate = true;
  M.brickTrans.opacity = 1.0; M.brickTrans.transparent = false; M.brickTrans.depthWrite = true; M.brickTrans.needsUpdate = true;

  document.getElementById('btn-fps').classList.add('active');
  document.getElementById('fps-crosshair').style.display = 'block';
  document.getElementById('fps-hints').classList.add('visible');
  document.getElementById('instructions').style.display = 'none';

  setTimeout(() => {
    document.getElementById('fps-hints').classList.remove('visible');
    fpsControls.lock();
  }, 1800);
}

export function exitFPS() {
  fpsMode = false;
  fpsControls.unlock();
  controls.enabled = true;
  fpsKeys.forward = fpsKeys.backward = fpsKeys.left = fpsKeys.right = false;

  M.creamWall.opacity = 0.45; M.creamWall.transparent = true; M.creamWall.depthWrite = false; M.creamWall.needsUpdate = true;
  M.brickTrans.opacity = 0.18; M.brickTrans.transparent = true; M.brickTrans.depthWrite = false; M.brickTrans.needsUpdate = true;

  if (savedCamPos) camera.position.copy(savedCamPos);
  if (savedTarget) controls.target.copy(savedTarget);

  document.getElementById('btn-fps').classList.remove('active');
  document.getElementById('fps-crosshair').style.display = 'none';
  document.getElementById('fps-hints').classList.remove('visible');
  document.getElementById('instructions').style.display = '';
}

export function fpsTeleportToFloor(floor) {
  fpsCurrentFloor = floor;
  const spawn = fpsSpawns[floor] || fpsSpawns.floor1;
  camera.position.set(spawn.x, getFloorEyeY(floor), spawn.z);
}

// Pointer lock events
fpsControls.addEventListener('unlock', () => {
  if (fpsMode) exitFPS();
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!fpsMode) return;
  switch(e.code) {
    case 'KeyW': case 'ArrowUp':    fpsKeys.forward = true; break;
    case 'KeyS': case 'ArrowDown':  fpsKeys.backward = true; break;
    case 'KeyA': case 'ArrowLeft':  fpsKeys.left = true; break;
    case 'KeyD': case 'ArrowRight': fpsKeys.right = true; break;
  }
});
document.addEventListener('keyup', (e) => {
  if (!fpsMode) return;
  switch(e.code) {
    case 'KeyW': case 'ArrowUp':    fpsKeys.forward = false; break;
    case 'KeyS': case 'ArrowDown':  fpsKeys.backward = false; break;
    case 'KeyA': case 'ArrowLeft':  fpsKeys.left = false; break;
    case 'KeyD': case 'ArrowRight': fpsKeys.right = false; break;
  }
});

// Click to re-lock
renderer.domElement.addEventListener('click', () => {
  if (fpsMode && !fpsControls.isLocked) fpsControls.lock();
});

export function updateFPS() {
  if (!fpsMode || !fpsControls.isLocked) return;
  const now = performance.now();
  const dt = (now - fpsPrevTime) / 1000;
  fpsPrevTime = now;

  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  dir.y = 0; dir.normalize();
  const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize();

  const move = new THREE.Vector3();
  if (fpsKeys.forward)  move.add(dir);
  if (fpsKeys.backward) move.sub(dir);
  if (fpsKeys.left)     move.sub(right);
  if (fpsKeys.right)    move.add(right);
  if (move.lengthSq() > 0) move.normalize();

  const bounds = fpsBounds[fpsCurrentFloor] || fpsBounds.floor1;
  camera.position.x = Math.max(bounds.xMin, Math.min(bounds.xMax, camera.position.x + move.x * fpsSpeed * dt));
  camera.position.z = Math.max(bounds.zMin, Math.min(bounds.zMax, camera.position.z + move.z * fpsSpeed * dt));
  camera.position.y = getFloorEyeY(fpsCurrentFloor);
}
