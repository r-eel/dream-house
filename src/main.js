import { scene, camera, renderer } from './scene.js';
import './groups.js';
import './building.js';
import './interiors.js';
import './rooms.js';
import { placeAllFurniture } from './furniture.js';
import { buildOutdoor, fireLight } from './outdoor.js';
import { controls, fpsMode, updateFPS } from './controls.js';
import { renderFrame } from './options.js';
import './ui.js';

// ═══════════════════════════════════════════════════
// BUILD WORLD
// ═══════════════════════════════════════════════════
placeAllFurniture();
buildOutdoor();

// ═══════════════════════════════════════════════════
// RENDER LOOP
// ═══════════════════════════════════════════════════
(function animate(){
  requestAnimationFrame(animate);
  if (fpsMode) { updateFPS(); } else { controls.update(); }
  if (fireLight) fireLight.intensity = 0.7+Math.sin(Date.now()*0.005)*0.4;
  if (!renderFrame()) renderer.render(scene,camera);
})();

window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
