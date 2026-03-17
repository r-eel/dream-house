import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { scene, camera, renderer } from './scene.js';

// ═══════════════════════════════════════════════════
// OPTIONS STATE
// ═══════════════════════════════════════════════════
export const options = { ao: false };

// ═══════════════════════════════════════════════════
// POSTPROCESSING — SSAO
// ═══════════════════════════════════════════════════
let composer = null;

function getComposer() {
  if (composer) return composer;
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const ssao = new SSAOPass(scene, camera, innerWidth, innerHeight);
  ssao.kernelRadius = 0.6;
  ssao.minDistance = 0.001;
  ssao.maxDistance = 0.15;
  ssao.output = SSAOPass.OUTPUT.Default;
  composer.addPass(ssao);

  composer.addPass(new OutputPass());
  return composer;
}

/** Call from render loop: returns true if composer handled the frame */
export function renderFrame() {
  if (!options.ao) return false;
  getComposer().render();
  return true;
}

// ═══════════════════════════════════════════════════
// UI WIRING
// ═══════════════════════════════════════════════════
document.getElementById('toggle-options').addEventListener('click', () => {
  document.getElementById('options-content').classList.toggle('collapsed');
});

document.getElementById('opt-ao').addEventListener('change', (e) => {
  options.ao = e.target.checked;
  if (options.ao) {
    const c = getComposer();
    c.setSize(innerWidth, innerHeight);
  }
});

// Keep composer in sync with window size
window.addEventListener('resize', () => {
  if (composer) composer.setSize(innerWidth, innerHeight);
});
