import * as THREE from 'three';
import { D, FY, W } from './constants.js';
import { M } from './materials.js';
import { box, cyl, roomFloor, rooms } from './primitives.js';
import { G } from './groups.js';
import { tree, pineTree, flowerBed, diningChair, adirondackChair } from './furniture.js';

// ═══════════════════════════════════════════════════
// OUTDOOR — ground, patio, fire pit, trees, etc.
// ═══════════════════════════════════════════════════

export let fireLight; // exported for flicker in render loop

export function buildOutdoor() {
  // Ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(250,250), M.grass);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = FY.F1-0.2;
  ground.receiveShadow = true;
  G.outdoor.add(ground);

  // Patio
  roomFloor(-8, D/2+12, 20, 10, FY.F1-0.1, M.patio, 'Patio',
    'Outdoor entertaining — grill, seating area, umbrellas 🪑', G.outdoor, 'outdoor');

  // Patio furniture
  box(6, 2, 6, M.oak, G.outdoor, -8, FY.F1+1, D/2+14);
  for(let dx of [-4, 4]) for(let dz of [-4, 4]) {
    const chairAngle = Math.atan2(-dx, -dz);
    diningChair(-8+dx, D/2+14+dz, FY.F1, G.outdoor, chairAngle);
  }
  // Umbrella
  cyl(0.15,0.15,6,8, M.metal, G.outdoor, -8, FY.F1+4, D/2+14);
  const umbMesh = new THREE.Mesh(new THREE.ConeGeometry(4, 1.5, 8, 1, true),
    new THREE.MeshStandardMaterial({color:0xCC8844,roughness:0.9,side:THREE.DoubleSide}));
  umbMesh.position.set(-8, FY.F1+7, D/2+14);
  G.outdoor.add(umbMesh);

  // String lights triangle
  tree(-20, D/2+22, FY.F1, G.outdoor, 1.3);
  const triPts = [
    {x: -14, y: FY.F1+9, z: D/2},
    {x: -2,  y: FY.F1+9, z: D/2},
    {x: -20, y: FY.F1+8, z: D/2+22},
  ];
  const bulbMat = new THREE.MeshStandardMaterial({color:0xFFDD88,emissive:0xFFCC66,emissiveIntensity:0.8});
  for(let edge=0; edge<3; edge++) {
    const p0 = triPts[edge], p1 = triPts[(edge+1)%3];
    const segCount = 14;
    const dist = Math.sqrt((p1.x-p0.x)**2 + (p1.z-p0.z)**2);
    const sag = dist * 0.06;
    for(let i=0; i<=segCount; i++) {
      const t = i/segCount;
      const lx = p0.x + (p1.x-p0.x)*t;
      const lz = p0.z + (p1.z-p0.z)*t;
      const ly = p0.y + (p1.y-p0.y)*t - sag*Math.sin(t*Math.PI);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), bulbMat);
      bulb.position.set(lx, ly, lz);
      G.outdoor.add(bulb);
      if(i < segCount) {
        const nt = (i+1)/segCount;
        const nx = p0.x + (p1.x-p0.x)*nt;
        const nz = p0.z + (p1.z-p0.z)*nt;
        const ny = p0.y + (p1.y-p0.y)*nt - sag*Math.sin(nt*Math.PI);
        const mx = (lx+nx)/2, my = (ly+ny)/2, mz = (lz+nz)/2;
        const wLen = Math.sqrt((nx-lx)**2+(ny-ly)**2+(nz-lz)**2);
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,wLen,4), M.metal);
        wire.position.set(mx, my, mz);
        wire.lookAt(nx, ny, nz);
        wire.rotateX(Math.PI/2);
        G.outdoor.add(wire);
      }
      if(i%4===0) {
        const sl = new THREE.PointLight(0xFFDD88, 0.12, 6);
        sl.position.set(lx, ly, lz);
        G.outdoor.add(sl);
      }
    }
  }

  // Grill
  box(3, 3, 2, M.metal, G.outdoor, 4, FY.F1+1.5, D/2+12);

  // Fire pit
  const fp = cyl(3.5, 4, 1.5, 16, M.stone, G.outdoor, -8, FY.F1+0.75, D/2+26);
  rooms.push({ name:'Fire Pit', desc:'Gather around — s\'mores, stargazing, and good conversations 🔥',
    mesh: fp, material: M.stone, line: null, floor:'outdoor' });
  cyl(2.5, 2.5, 0.5, 16, M.fire, G.outdoor, -8, FY.F1+1.5, D/2+26);
  fireLight = new THREE.PointLight(0xff6622, 1, 20);
  fireLight.position.set(-8, FY.F1+3, D/2+26);
  G.outdoor.add(fireLight);

  // Adirondack chairs around fire pit
  for(let angle=0; angle<Math.PI*2; angle+=Math.PI/3) {
    const chairX=-8+Math.cos(angle)*6.5, chairZ=D/2+26+Math.sin(angle)*6.5;
    adirondackChair(chairX, chairZ, FY.F1, G.outdoor, -angle - Math.PI/2);
  }

  // Swimming Pool — positioned next to patio
  // Pool deck surround
  box(20, 0.5, 14, M.patio, G.outdoor, 10, FY.F1+0.1, D/2+28);
  // Pool walls (stone coping raised above ground)
  box(16, 1.2, 10, M.stone, G.outdoor, 10, FY.F1+0.5, D/2+28);
  // Pool interior (dark blue basin)
  box(14.5, 1, 8.5, new THREE.MeshStandardMaterial({color:0x1A4A6A, roughness:0.3}),
    G.outdoor, 10, FY.F1+0.4, D/2+28);
  // Water surface — clearly above ground
  const poolWater = box(14, 0.2, 8, M.water, G.outdoor, 10, FY.F1+1.0, D/2+28);
  rooms.push({ name:'Swimming Pool', desc:'Cannonballs, Marco Polo, and lazy summer afternoons 🏊',
    mesh: poolWater, material: M.water, line: null, floor:'outdoor' });
  // Pool glow
  const poolLight = new THREE.PointLight(0x66CCEE, 0.6, 20);
  poolLight.position.set(10, FY.F1+2, D/2+28);
  G.outdoor.add(poolLight);
  // Lounge chairs along the pool
  for(let i=-2; i<=2; i++) {
    adirondackChair(10+i*3.5, D/2+36, FY.F1, G.outdoor, Math.PI);
  }

  // Stone pathway
  for(let i=0; i<8; i++) {
    box(4, 0.15, 1.5, M.stone, G.outdoor, 0, FY.F1-0.1, -D/2-9-i*3);
  }

  // Driveway
  const driveGeo = new THREE.PlaneGeometry(32, 30);
  const driveMat = new THREE.MeshStandardMaterial({color:0x6A6058,roughness:0.9});
  const driveMesh = new THREE.Mesh(driveGeo, driveMat);
  driveMesh.rotation.x = -Math.PI/2;
  driveMesh.position.set(-42, FY.F1-0.05, -D/2-12);
  driveMesh.receiveShadow = true;
  G.outdoor.add(driveMesh);

  // Trees
  tree(-18, -20, FY.F1, G.outdoor, 1.2);
  tree(-65, 5, FY.F1, G.outdoor, 1);
  tree(-32, 15, FY.F1, G.outdoor, 1.4);
  tree(35, -25, FY.F1, G.outdoor, 1.1);
  tree(38, 10, FY.F1, G.outdoor, 1.3);
  tree(32, -5, FY.F1, G.outdoor, 0.9);
  tree(-15, -38, FY.F1, G.outdoor, 1);
  tree(20, -40, FY.F1, G.outdoor, 1.2);
  tree(-65, -30, FY.F1, G.outdoor, 0.8);
  pineTree(-42, 18, FY.F1, G.outdoor, 1.3);
  pineTree(42, -15, FY.F1, G.outdoor, 1.1);
  pineTree(-30, 25, FY.F1, G.outdoor, 0.9);
  tree(30, 20, FY.F1, G.outdoor, 0.6);
  tree(-20, -42, FY.F1, G.outdoor, 0.5);
  tree(15, -45, FY.F1, G.outdoor, 1.5);
  pineTree(-65, -10, FY.F1, G.outdoor, 1.4);

  // Bushes
  for(let i=-20; i<=20; i+=5) {
    const bMat = new THREE.MeshStandardMaterial({color:new THREE.Color(0.12+Math.random()*0.08, 0.28+Math.random()*0.12, 0.06+Math.random()*0.04),roughness:0.9});
    if(i < -7 || i > 7) cyl(1.5, 1.5, 2, 8, bMat, G.outdoor, i, FY.F1+1, -D/2-2.5);
    if(Math.abs(i)<18) cyl(1.5, 1.5, 2, 8, bMat, G.outdoor, i, FY.F1+1, D/2+2.5);
  }

  // Birdhouse — right outside the cat sunroom for Salem's entertainment
  cyl(0.15, 0.15, 5, 6, M.walnut, G.outdoor, W/2+6, FY.F1+2.5, 6);  // post
  box(1.5, 1.2, 1.5, new THREE.MeshStandardMaterial({color:0xCC4444, roughness:0.8}),
    G.outdoor, W/2+6, FY.F1+5.3, 6);                                   // house body
  // Roof — little peaked top
  const bhRoof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 0.8, 4),
    new THREE.MeshStandardMaterial({color:0x5A3A1A, roughness:0.7}));
  bhRoof.position.set(W/2+6, FY.F1+6.3, 6);
  bhRoof.rotation.y = Math.PI/4;
  G.outdoor.add(bhRoof);
  // Entry hole
  cyl(0.2, 0.2, 0.1, 8, new THREE.MeshStandardMaterial({color:0x1A1A1A}),
    G.outdoor, W/2+5.24, FY.F1+5.4, 6);
  // Little perch
  cyl(0.05, 0.05, 0.4, 4, M.walnut, G.outdoor, W/2+5.15, FY.F1+5.1, 6);

  // Flower beds
  flowerBed(-20, -D/2-1, FY.F1, 8, 2, G.outdoor);
  flowerBed(-8, -D/2-1, FY.F1, 6, 2, G.outdoor);
  flowerBed(8, -D/2-1, FY.F1, 6, 2, G.outdoor);
  flowerBed(20, -D/2-1, FY.F1, 8, 2, G.outdoor);
  flowerBed(W/2+1, -6, FY.F1, 2, 6, G.outdoor);
  flowerBed(W/2+1, 8, FY.F1, 2, 6, G.outdoor);
}
