import * as THREE from 'three';
import { M } from './materials.js';
import { box, cyl } from './primitives.js';

// ═══════════════════════════════════════════════════
// FURNITURE
// ═══════════════════════════════════════════════════

export function bed(x,z,y,w,d,group,mat=M.bedding) {
  box(w, 1.2, d, M.walnut, group, x, y+0.6, z);
  box(w-0.4, 0.6, d-0.3, mat, group, x, y+1.5, z);
  box(w, 3, 0.6, M.walnut, group, x, y+2.5, z+d/2-0.3);
  box(w*0.35, 0.4, 0.8, M.cream, group, x-w*0.2, y+2, z+d/2-1);
  box(w*0.35, 0.4, 0.8, M.cream, group, x+w*0.2, y+2, z+d/2-1);
}

export function cloudSectional(x,z,y,group) {
  // Cloud sectional — U-shaped modular, cream/off-white, deep plush cushions
  // Open side faces +z, chaise/ottoman on right arm
  const creamBase = new THREE.MeshStandardMaterial({color:0xF0E8E0, roughness:0.95});
  const creamSeat = new THREE.MeshStandardMaterial({color:0xEDE5DA, roughness:0.92});
  const creamBack = new THREE.MeshStandardMaterial({color:0xE8DDD0, roughness:0.95});
  const pillow1 = new THREE.MeshStandardMaterial({color:0x8B6B3A, roughness:0.9});
  const pillow2 = new THREE.MeshStandardMaterial({color:0xC4A265, roughness:0.9});

  // Helper: one modular seat module — base slab + raised seat cushion + back cushion
  function seatModule(sx,sz,sw,sd, backAxis) {
    box(sw, 1.2, sd, creamBase, group, sx, y+0.6, sz);
    box(sw-0.3, 0.6, sd-0.3, creamSeat, group, sx, y+1.5, sz);
    if(backAxis==='z-') box(sw-0.2, 1.6, 1.0, creamBack, group, sx, y+2.0, sz-sd/2+0.5);
    if(backAxis==='z+') box(sw-0.2, 1.6, 1.0, creamBack, group, sx, y+2.0, sz+sd/2-0.5);
    if(backAxis==='x-') box(1.0, 1.6, sd-0.2, creamBack, group, sx-sw/2+0.5, y+2.0, sz);
    if(backAxis==='x+') box(1.0, 1.6, sd-0.2, creamBack, group, sx+sw/2-0.5, y+2.0, sz);
  }

  // === BACK SECTION (3 seats along x-axis, backs toward -z) ===
  seatModule(x-4.5, z-2, 4.2, 3.8, 'z-');
  seatModule(x,     z-2, 4.2, 3.8, 'z-');
  seatModule(x+4.5, z-2, 4.2, 3.8, 'z-');

  // === LEFT ARM (2 seats along z-axis, backs toward -x) ===
  seatModule(x-6.5, z+1,  3.8, 3.5, 'x-');
  seatModule(x-6.5, z+4.5, 3.8, 3.5, 'x-');

  // === RIGHT ARM — chaise/ottoman (deeper, low bolster instead of full back) ===
  box(5, 1.2, 7, creamBase, group, x+6.5, y+0.6, z+2.5);
  box(4.7, 0.6, 6.7, creamSeat, group, x+6.5, y+1.5, z+2.5);
  box(1.0, 1.0, 6.5, creamBack, group, x+8.5, y+1.8, z+2.5);

  // === ACCENT THROW PILLOWS ===
  box(1.2,1.2,0.8, pillow1, group, x-4.5, y+2.8, z-1.5);
  box(1.2,1.2,0.8, pillow2, group, x+4, y+2.8, z-1.5);
  box(0.8,1.0,1.2, pillow1, group, x-6.5, y+2.8, z+4.5);
  box(1.2,1.0,1.2, pillow2, group, x+6, y+2.5, z+5);

  // === WALNUT COFFEE TABLE — low, chunky, square (centered in U) ===
  box(4.5, 0.5, 4.5, M.walnut, group, x, y+1.5, z+1.5);
  box(4.0, 1.0, 4.0, M.walnut, group, x, y+0.7, z+1.5);

  // === AREA RUG — warm beige underneath everything ===
  box(20, 0.05, 16, new THREE.MeshStandardMaterial({color:0xC8B8A0, roughness:1}), group, x, y+0.03, z+0.5);

  // === FIDDLE LEAF FIG — potted plant near left-back corner ===
  cyl(0.6, 0.5, 1.0, 8, new THREE.MeshStandardMaterial({color:0x8B7355,roughness:0.9}), group, x-8.5, y+0.5, z-3.5);
  cyl(0.15, 0.2, 3.5, 6, new THREE.MeshStandardMaterial({color:0x5C3A1E,roughness:0.8}), group, x-8.5, y+2.75, z-3.5);
  const figLeaf = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8),
    new THREE.MeshStandardMaterial({color:0x2D5A1E, roughness:0.8}));
  figLeaf.position.set(x-8.5, y+5.5, z-3.5);
  figLeaf.scale.set(1, 1.6, 1);
  figLeaf.castShadow = true;
  group.add(figLeaf);
}

export function diningTable(x,z,y,group) {
  box(14, 0.4, 5, M.oak, group, x, y+2.8, z);
  box(0.5,2.6,0.5, M.walnut, group, x-6, y+1.3, z-1.8);
  box(0.5,2.6,0.5, M.walnut, group, x+6, y+1.3, z-1.8);
  box(0.5,2.6,0.5, M.walnut, group, x-6, y+1.3, z+1.8);
  box(0.5,2.6,0.5, M.walnut, group, x+6, y+1.3, z+1.8);
  box(12, 1.5, 2, M.couchFabric, group, x, y+0.75, z+3.2);
  for(let i=-2; i<=2; i++) {
    box(1.2,0.3,1.2, M.walnut, group, x+i*2.5, y+1.5, z-3);
    box(1.2,2,0.3, M.walnut, group, x+i*2.5, y+2.5, z-3.5);
  }
}

export function kitchenIsland(x,z,y,group) {
  box(8, 3, 3, M.cabinet, group, x, y+1.5, z);
  box(8.2, 0.4, 3.2, M.counter, group, x, y+3.1, z);
  // Barstools on north side (toward living area)
  for(let i=-1; i<=1; i++) {
    cyl(0.5,0.5,0.3,8, M.walnut, group, x+i*2.5, y+2, z+2.2);
    cyl(0.15,0.15,2,8, M.metal, group, x+i*2.5, y+1, z+2.2);
  }
}

export function adirondackChair(x, z, y, group, angle) {
  const g = new THREE.Group();
  // Seat
  box(2.2, 0.2, 2, M.walnut, g, 0, 1.2, 0);
  // Back
  box(2.2, 2.2, 0.2, M.walnut, g, 0, 2.5, -0.9);
  // Legs
  for(let lx of [-0.9, 0.9]) for(let lz of [-0.7, 0.7])
    cyl(0.1, 0.1, 1.1, 6, M.walnut, g, lx, 0.55, lz);
  // Armrests
  box(0.2, 0.15, 2, M.walnut, g, -1.1, 1.5, 0);
  box(0.2, 0.15, 2, M.walnut, g, 1.1, 1.5, 0);
  g.position.set(x, y, z);
  g.rotation.y = angle;
  group.add(g);
}

export function nightstand(x, z, y, group) {
  box(1.2, 2, 1.2, M.walnut, group, x, y+1, z);
  // Lamp base
  cyl(0.2, 0.25, 0.8, 8, M.metal, group, x, y+2.4, z);
  // Lamp shade
  cyl(0.5, 0.3, 0.6, 8, M.cream, group, x, y+3, z);
}

export function diningChair(x, z, y, group, angle) {
  const g = new THREE.Group();
  box(1.4, 0.2, 1.4, M.walnut, g, 0, 1.5, 0);
  box(1.4, 2, 0.2, M.walnut, g, 0, 2.5, -0.6);
  for(let lx of [-0.55, 0.55]) for(let lz of [-0.55, 0.55])
    cyl(0.08, 0.08, 1.4, 6, M.walnut, g, lx, 0.7, lz);
  g.position.set(x, y, z);
  g.rotation.y = angle;
  group.add(g);
}

export function bathtub(x,z,y,group) {
  box(3, 2, 6, M.porcelain, group, x, y+1, z);
  box(2.4, 1, 5.4, M.water, group, x, y+1.5, z);
  for(let dx of [-1.2,1.2]) for(let dz of [-2.2,2.2])
    cyl(0.15,0.2,0.4,6, M.metal, group, x+dx, y+0.2, z+dz);
}

export function shower(x,z,y,w,d,group) {
  box(w, 7, 0.15, M.glass, group, x, y+3.5, z-d/2);
  box(0.15, 7, d, M.glass, group, x-w/2, y+3.5, z);
  cyl(0.3,0.3,0.1,8, M.metal, group, x-w/2+0.3, y+6, z);
  cyl(0.3,0.3,0.1,8, M.metal, group, x+w/2-0.3, y+6, z);
  box(1.5,0.1,1.5, M.metal, group, x, y+7.2, z);
  box(w-0.3, 0.15, d-0.3, M.tile, group, x, y+0.1, z);
}

export function fireplace(x,z,y,group) {
  box(8, 8, 2, M.stone, group, x, y+4, z);
  box(4, 5, 1.5, new THREE.MeshStandardMaterial({color:0x1A1008,roughness:1}), group, x, y+2.5, z-0.3);
  box(10, 0.6, 2.5, M.oak, group, x, y+7, z);
  // V3: More prominent fire glow
  const fl = new THREE.PointLight(0xff6622, 1.2, 15);
  fl.position.set(x, y+2, z-1);
  group.add(fl);
  // Secondary warm glow
  const fl2 = new THREE.PointLight(0xff4400, 0.6, 8);
  fl2.position.set(x, y+3.5, z-2);
  group.add(fl2);
  box(1.5,0.8,0.5, M.fire, group, x, y+0.8, z-0.3);
  // Ember glow on floor
  box(3, 0.1, 1, new THREE.MeshStandardMaterial({color:0xFF4400,emissive:0xFF2200,emissiveIntensity:0.5,transparent:true,opacity:0.4}), group, x, y+0.2, z-0.8);
}

export function desk(x,z,y,group) {
  box(6, 0.3, 3, M.oak, group, x, y+2.5, z);
  box(0.4,2.4,2.8, M.walnut, group, x-2.7, y+1.2, z);
  box(0.4,2.4,2.8, M.walnut, group, x+2.7, y+1.2, z);
  box(2.5, 1.8, 0.15, new THREE.MeshStandardMaterial({color:0x222222,roughness:0.3}), group, x, y+3.8, z+0.5);
  box(0.3, 0.8, 0.3, M.metal, group, x, y+3, z+0.5);
  box(2, 0.3, 2, M.couchFabric, group, x, y+1.8, z-2.5);
  box(2, 2, 0.3, M.couchFabric, group, x, y+2.8, z-3.3);
  cyl(0.15,0.15,1.6,8, M.metal, group, x, y+0.8, z-2.5);
}

export function toilet(x,z,y,group) {
  box(1.2,1.5,1.8, M.porcelain, group, x, y+0.75, z);
  box(1.2,1.8,0.6, M.porcelain, group, x, y+1.5, z+0.8);
}

export function vanity(x,z,y,w,group) {
  box(w, 2.8, 2, M.cabinet, group, x, y+1.4, z);
  box(w+0.2, 0.3, 2.2, M.counter, group, x, y+2.85, z);
  box(w-0.5, 3, 0.15, new THREE.MeshStandardMaterial({color:0xAABBCC,roughness:0.05,metalness:0.8}), group, x, y+4.5, z+1.05);
}

export function tree(x,z,y,group,scale=1) {
  const s=scale;
  cyl(0.4*s,0.5*s,4*s,6, M.walnut, group, x, y+2*s, z);
  const leafMat = new THREE.MeshStandardMaterial({color:new THREE.Color(0.1+Math.random()*0.1, 0.3+Math.random()*0.2, 0.05+Math.random()*0.1),roughness:0.9});
  cyl(3*s,4*s,3*s,8, leafMat, group, x, y+5.5*s, z);
  cyl(2.5*s,3*s,2.5*s,8, leafMat, group, x, y+7.5*s, z);
  cyl(1.5*s,2.5*s,2*s,8, leafMat, group, x, y+9*s, z);
}

// V3: Conifer/pine tree
export function pineTree(x,z,y,group,scale=1) {
  const s=scale;
  cyl(0.3*s,0.4*s,5*s,6, M.walnut, group, x, y+2.5*s, z);
  const pineMat = new THREE.MeshStandardMaterial({color:new THREE.Color(0.05,0.22,0.08),roughness:0.9});
  for(let i=0; i<4; i++) {
    const r = (3.5-i*0.7)*s, h=2.5*s;
    cyl(0, r, h, 8, pineMat, group, x, y+5*s+i*2*s, z);
  }
}

// V3: Flower cluster
export function flowerBed(x, z, y, w, d, group) {
  // Soil mound
  box(w, 0.4, d, new THREE.MeshStandardMaterial({color:0x3A2A1A,roughness:1}), group, x, y+0.2, z);
  // Flowers
  const colors = [0xFF6B8A, 0xFFB347, 0xFF69B4, 0xDDA0DD, 0xFF4444, 0xFFD700];
  for(let i=0; i<8; i++) {
    const fx = x - w/2 + Math.random()*w;
    const fz = z - d/2 + Math.random()*d;
    const col = colors[Math.floor(Math.random()*colors.length)];
    // Stem
    cyl(0.05, 0.05, 0.8, 4, new THREE.MeshStandardMaterial({color:0x2A6A1A,roughness:0.9}), group, fx, y+0.8, fz);
    // Bloom
    cyl(0.25, 0.2, 0.3, 6, new THREE.MeshStandardMaterial({color:col,roughness:0.8}), group, fx, y+1.3, fz);
  }
}
