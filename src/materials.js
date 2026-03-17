import * as THREE from 'three';
import { brickTexture, woodTexture, walnutFloorTexture, stoneTileTexture, carpetTexture, roofTexture, stoneTexture } from './textures.js';

// ═══════════════════════════════════════════════════
// MATERIALS
// ═══════════════════════════════════════════════════
export const M = {
  brick: new THREE.MeshStandardMaterial({ map: brickTexture(), roughness: 0.85, metalness: 0 }),
  brickTrans: new THREE.MeshStandardMaterial({ map: brickTexture(), roughness: 0.85, transparent: true, opacity: 0.18, depthWrite: false }),
  walnut: new THREE.MeshStandardMaterial({ map: woodTexture(256,256,'#5C3A1E'), roughness: 0.6, metalness: 0.05 }),
  walnutFloor: new THREE.MeshStandardMaterial({ map: walnutFloorTexture(), roughness: 0.5, metalness: 0.05 }),
  oak: new THREE.MeshStandardMaterial({ map: woodTexture(256,256,'#8B7355'), roughness: 0.55, metalness: 0.05 }),
  cream: new THREE.MeshStandardMaterial({ color: 0xF0E6D6, roughness: 0.9 }),
  creamWall: new THREE.MeshStandardMaterial({ color: 0xEDE4D4, roughness: 0.85, transparent: true, opacity: 0.45, depthWrite: false }),
  stone: new THREE.MeshStandardMaterial({ map: stoneTexture(), roughness: 0.8 }),
  stoneFloor: new THREE.MeshStandardMaterial({ color: 0x7A7060, roughness: 0.8 }),
  roof: new THREE.MeshStandardMaterial({ map: roofTexture(), roughness: 0.85 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x99CCEE, roughness: 0.05, metalness: 0.3, transparent: true, opacity: 0.25 }),
  stainedGlass: new THREE.MeshStandardMaterial({ color: 0x338855, roughness: 0.2, transparent: true, opacity: 0.5, emissive: 0x224422, emissiveIntensity: 0.3 }),
  grass: new THREE.MeshStandardMaterial({ color: 0x4A7A35, roughness: 0.95 }),
  patio: new THREE.MeshStandardMaterial({ map: stoneTexture(), color: 0x9A8A78, roughness: 0.8 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.3, metalness: 0.8 }),
  darkFabric: new THREE.MeshStandardMaterial({ color: 0x3A3530, roughness: 0.95 }),
  couchFabric: new THREE.MeshStandardMaterial({ color: 0x6B5A48, roughness: 0.9 }),
  bedding: new THREE.MeshStandardMaterial({ color: 0xE8DDD0, roughness: 0.95 }),
  masterBedding: new THREE.MeshStandardMaterial({ color: 0xC8B8A0, roughness: 0.9 }),
  counter: new THREE.MeshStandardMaterial({ color: 0xD0C8B8, roughness: 0.3, metalness: 0.1 }),
  cabinet: new THREE.MeshStandardMaterial({ map: woodTexture(256,256,'#6B4A2A'), roughness: 0.6 }),
  tile: new THREE.MeshStandardMaterial({ color: 0xE8E0D8, roughness: 0.4, metalness: 0.05 }),
  porcelain: new THREE.MeshStandardMaterial({ color: 0xF5F0EB, roughness: 0.2, metalness: 0.05 }),
  chimney: new THREE.MeshStandardMaterial({ color: 0x6B4020, roughness: 0.9 }),
  door: new THREE.MeshStandardMaterial({ map: woodTexture(128,256,'#4A2A10'), roughness: 0.6 }),
  water: new THREE.MeshStandardMaterial({ color: 0x6699BB, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.7 }),
  fire: new THREE.MeshStandardMaterial({ color: 0xFF6600, emissive: 0xFF4400, emissiveIntensity: 0.8, transparent: true, opacity: 0.8 }),
  // V3: Textured floor materials with subtle color tint
  floorLiving: new THREE.MeshStandardMaterial({ map: walnutFloorTexture(), color: 0xB09070, roughness: 0.5, transparent: true, opacity: 0.85 }),
  floorKitchen: new THREE.MeshStandardMaterial({ map: stoneTileTexture(), color: 0x8A9A7A, roughness: 0.5, transparent: true, opacity: 0.85 }),
  floorBedroom: new THREE.MeshStandardMaterial({ map: carpetTexture(256,256,'#4A3A4A'), color: 0x8A7B9A, roughness: 0.95, transparent: true, opacity: 0.85 }),
  floorBath: new THREE.MeshStandardMaterial({ map: stoneTileTexture(), color: 0x7A9A9A, roughness: 0.4, transparent: true, opacity: 0.85 }),
  floorUtility: new THREE.MeshStandardMaterial({ map: stoneTileTexture(), color: 0xAA9B7A, roughness: 0.6, transparent: true, opacity: 0.85 }),
  floorTheatre: new THREE.MeshStandardMaterial({ map: carpetTexture(256,256,'#1A1020'), color: 0x2A1A2A, roughness: 0.95 }),
  floorBar: new THREE.MeshStandardMaterial({ map: walnutFloorTexture(), color: 0x6A4A3A, roughness: 0.6 }),
  floorMaster: new THREE.MeshStandardMaterial({ map: carpetTexture(256,256,'#5A4A5A'), color: 0x9A7B8A, roughness: 0.9, transparent: true, opacity: 0.85 }),
  windowGlow: new THREE.MeshStandardMaterial({ color: 0xFFE0A0, emissive: 0xFFD080, emissiveIntensity: 0.6, transparent: true, opacity: 0.35 }),
};

export const highlightMat = new THREE.MeshStandardMaterial({
  color: 0xd4a574, roughness: 0.5, transparent: true, opacity: 0.85,
  emissive: 0xd4a574, emissiveIntensity: 0.2
});
