import * as THREE from 'three';
import { scene } from './scene.js';

// ═══════════════════════════════════════════════════
// FLOOR GROUPS
// ═══════════════════════════════════════════════════
export const G = {
  basement: new THREE.Group(),
  floor1: new THREE.Group(),
  floor2: new THREE.Group(),
  floor3: new THREE.Group(),
  outdoor: new THREE.Group(),
  structure: new THREE.Group(),
};
Object.values(G).forEach(g => scene.add(g));
