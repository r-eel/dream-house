import * as THREE from 'three';

// ═══════════════════════════════════════════════════
// SCENE, CAMERA, RENDERER
// ═══════════════════════════════════════════════════
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.FogExp2(0xC8D8E8, 0.004);

export const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 500);
camera.position.set(55, 50, 55);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ═══════════════════════════════════════════════════
// LIGHTING — warm golden hour + interior
// ═══════════════════════════════════════════════════
scene.add(new THREE.AmbientLight(0xffeedd, 0.5));

const sun = new THREE.DirectionalLight(0xfff0d0, 1.5);
sun.position.set(40, 60, 30);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.camera.far = 200;
sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;
sun.shadow.bias = -0.0005;
scene.add(sun);

scene.add(new THREE.DirectionalLight(0xd4a574, 0.3).translateX(-30).translateY(20).translateZ(-15));
scene.add(new THREE.HemisphereLight(0x87CEEB, 0x3a5a1a, 0.4));
