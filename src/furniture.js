import * as THREE from 'three';
import { M } from './materials.js';
import { box, cyl, rooms } from './primitives.js';
import { G } from './groups.js';
import { W, D, FY, SH } from './constants.js';

// ═══════════════════════════════════════════════════
// FURNITURE HELPER FUNCTIONS
// ═══════════════════════════════════════════════════

export function bed(x,z,y,w,d,group,mat=M.bedding) {
  box(w, 1.2, d, M.walnut, group, x, y+0.6, z);
  box(w-0.4, 0.6, d-0.3, mat, group, x, y+1.5, z);
  box(w, 3, 0.6, M.walnut, group, x, y+2.5, z+d/2-0.3);
  box(w*0.35, 0.4, 0.8, M.cream, group, x-w*0.2, y+2, z+d/2-1);
  box(w*0.35, 0.4, 0.8, M.cream, group, x+w*0.2, y+2, z+d/2-1);
}

export function cloudSectional(x,z,y,group) {
  const creamBase = new THREE.MeshStandardMaterial({color:0xF0E8E0, roughness:0.95});
  const creamSeat = new THREE.MeshStandardMaterial({color:0xEDE5DA, roughness:0.92});
  const creamBack = new THREE.MeshStandardMaterial({color:0xE8DDD0, roughness:0.95});
  const pillow1 = new THREE.MeshStandardMaterial({color:0x8B6B3A, roughness:0.9});
  const pillow2 = new THREE.MeshStandardMaterial({color:0xC4A265, roughness:0.9});

  function seatModule(sx,sz,sw,sd, backAxis) {
    box(sw, 1.2, sd, creamBase, group, sx, y+0.6, sz);
    box(sw-0.3, 0.6, sd-0.3, creamSeat, group, sx, y+1.5, sz);
    if(backAxis==='z-') box(sw-0.2, 1.6, 1.0, creamBack, group, sx, y+2.0, sz-sd/2+0.5);
    if(backAxis==='z+') box(sw-0.2, 1.6, 1.0, creamBack, group, sx, y+2.0, sz+sd/2-0.5);
    if(backAxis==='x-') box(1.0, 1.6, sd-0.2, creamBack, group, sx-sw/2+0.5, y+2.0, sz);
    if(backAxis==='x+') box(1.0, 1.6, sd-0.2, creamBack, group, sx+sw/2-0.5, y+2.0, sz);
  }

  seatModule(x-4.5, z-2, 4.2, 3.8, 'z-');
  seatModule(x,     z-2, 4.2, 3.8, 'z-');
  seatModule(x+4.5, z-2, 4.2, 3.8, 'z-');
  seatModule(x-6.5, z+1,  3.8, 3.5, 'x-');
  seatModule(x-6.5, z+4.5, 3.8, 3.5, 'x-');
  box(5, 1.2, 7, creamBase, group, x+6.5, y+0.6, z+2.5);
  box(4.7, 0.6, 6.7, creamSeat, group, x+6.5, y+1.5, z+2.5);
  box(1.0, 1.0, 6.5, creamBack, group, x+8.5, y+1.8, z+2.5);
  box(1.2,1.2,0.8, pillow1, group, x-4.5, y+2.8, z-1.5);
  box(1.2,1.2,0.8, pillow2, group, x+4, y+2.8, z-1.5);
  box(0.8,1.0,1.2, pillow1, group, x-6.5, y+2.8, z+4.5);
  box(1.2,1.0,1.2, pillow2, group, x+6, y+2.5, z+5);
  box(4.5, 0.5, 4.5, M.walnut, group, x, y+1.5, z+1.5);
  box(4.0, 1.0, 4.0, M.walnut, group, x, y+0.7, z+1.5);
  box(20, 0.05, 16, new THREE.MeshStandardMaterial({color:0xC8B8A0, roughness:1}), group, x, y+0.03, z+0.5);

  cyl(0.6, 0.5, 1.0, 8, new THREE.MeshStandardMaterial({color:0x8B7355,roughness:0.9}), group, x-8.5, y+0.5, z-3.5);
  cyl(0.15, 0.2, 3.5, 6, new THREE.MeshStandardMaterial({color:0x5C3A1E,roughness:0.8}), group, x-8.5, y+2.75, z-3.5);
  const figLeaf = new THREE.Mesh(new THREE.SphereGeometry(1.5, 8, 8),
    new THREE.MeshStandardMaterial({color:0x2D5A1E, roughness:0.8}));
  figLeaf.position.set(x-8.5, y+5.5, z-3.5);
  figLeaf.scale.set(1, 1.6, 1);
  figLeaf.castShadow = true;
  group.add(figLeaf);
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

export function adirondackChair(x, z, y, group, angle) {
  const g = new THREE.Group();
  box(2.2, 0.2, 2, M.walnut, g, 0, 1.2, 0);
  box(2.2, 2.2, 0.2, M.walnut, g, 0, 2.5, -0.9);
  for(let lx of [-0.9, 0.9]) for(let lz of [-0.7, 0.7])
    cyl(0.1, 0.1, 1.1, 6, M.walnut, g, lx, 0.55, lz);
  box(0.2, 0.15, 2, M.walnut, g, -1.1, 1.5, 0);
  box(0.2, 0.15, 2, M.walnut, g, 1.1, 1.5, 0);
  g.position.set(x, y, z);
  g.rotation.y = angle;
  group.add(g);
}

export function nightstand(x, z, y, group) {
  box(1.2, 2, 1.2, M.walnut, group, x, y+1, z);
  cyl(0.2, 0.25, 0.8, 8, M.metal, group, x, y+2.4, z);
  cyl(0.5, 0.3, 0.6, 8, M.cream, group, x, y+3, z);
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
  const fl = new THREE.PointLight(0xff6622, 1.2, 15);
  fl.position.set(x, y+2, z-1); group.add(fl);
  const fl2 = new THREE.PointLight(0xff4400, 0.6, 8);
  fl2.position.set(x, y+3.5, z-2); group.add(fl2);
  box(1.5,0.8,0.5, M.fire, group, x, y+0.8, z-0.3);
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

export function pineTree(x,z,y,group,scale=1) {
  const s=scale;
  cyl(0.3*s,0.4*s,5*s,6, M.walnut, group, x, y+2.5*s, z);
  const pineMat = new THREE.MeshStandardMaterial({color:new THREE.Color(0.05,0.22,0.08),roughness:0.9});
  for(let i=0; i<4; i++) {
    const r = (3.5-i*0.7)*s, h=2.5*s;
    cyl(0, r, h, 8, pineMat, group, x, y+5*s+i*2*s, z);
  }
}

export function flowerBed(x, z, y, w, d, group) {
  box(w, 0.4, d, new THREE.MeshStandardMaterial({color:0x3A2A1A,roughness:1}), group, x, y+0.2, z);
  const colors = [0xFF6B8A, 0xFFB347, 0xFF69B4, 0xDDA0DD, 0xFF4444, 0xFFD700];
  for(let i=0; i<8; i++) {
    const fx = x - w/2 + Math.random()*w, fz = z - d/2 + Math.random()*d;
    const col = colors[Math.floor(Math.random()*colors.length)];
    cyl(0.05, 0.05, 0.8, 4, new THREE.MeshStandardMaterial({color:0x2A6A1A,roughness:0.9}), group, fx, y+0.8, fz);
    cyl(0.25, 0.2, 0.3, 6, new THREE.MeshStandardMaterial({color:col,roughness:0.8}), group, fx, y+1.3, fz);
  }
}

// ═══════════════════════════════════════════════════
// PLACE ALL FURNITURE — called from main.js
// ═══════════════════════════════════════════════════
export function placeAllFurniture() {
  // ── BASEMENT ──
  for(let row=0; row<3; row++) {
    box(18, 0.4, 3, M.darkFabric, G.basement, -12, FY.B+1+row*1.2, -10+row*4);
    for(let s=-3; s<=3; s++)
      box(2, 1.2, 0.3, M.couchFabric, G.basement, -12+s*2.4, FY.B+1.6+row*1.2, -10+row*4-1);
  }
  box(16, 8, 0.2, new THREE.MeshStandardMaterial({color:0xEEEEEE,roughness:0.3}), G.basement, -12, FY.B+5, -D/2+1);
  box(10, 3.5, 1.5, M.oak, G.basement, 16, FY.B+1.75, -8);
  box(10.2, 0.3, 1.7, M.counter, G.basement, 16, FY.B+3.55, -8);
  for(let i=-2; i<=2; i++) {
    cyl(0.5,0.5,0.3,8, M.walnut, G.basement, 16+i*2, FY.B+2.2, -10);
    cyl(0.15,0.15,2,8, M.metal, G.basement, 16+i*2, FY.B+1.1, -10);
  }

  // ── FLOOR 1 ──
  cloudSectional(14, -6, FY.F1+0.15, G.floor1);
  fireplace(14, 2, FY.F1+0.15, G.floor1);
  // Staircase
  for(let i=0; i<10; i++) box(5, 0.3, 1, M.walnut, G.floor1, 0, FY.F1+0.3+i*1, -12+i*0.8);
  box(0.15, 10, 0.15, M.walnut, G.floor1, -2.5, FY.F1+5.3, -8);
  box(0.15, 10, 0.15, M.walnut, G.floor1, 2.5, FY.F1+5.3, -8);
  // Kitchen L-shape
  box(12, 3, 1.5, M.cabinet, G.floor1, -20, FY.F1+1.5, D/2-1.5);
  box(12.2, 0.3, 1.7, M.counter, G.floor1, -20, FY.F1+3.1, D/2-1.5);
  box(12, 2.5, 1, M.cabinet, G.floor1, -20, FY.F1+7, D/2-1);
  box(3, 3, 2, M.metal, G.floor1, -14, FY.F1+1.5, D/2-1.5);
  box(3.1, 0.1, 2.1, new THREE.MeshStandardMaterial({color:0x333333,roughness:0.3,metalness:0.7}), G.floor1, -14, FY.F1+3.05, D/2-1.5);
  for(let bx of [-0.6, 0.6]) for(let bz of [-0.4, 0.4])
    cyl(0.35, 0.35, 0.08, 12, new THREE.MeshStandardMaterial({color:0x222222,roughness:0.4,metalness:0.6}), G.floor1, -14+bx, FY.F1+3.12, D/2-1.5+bz);
  box(1.5, 3, 10, M.cabinet, G.floor1, -W/2+1.5, FY.F1+1.5, 10);
  box(1.7, 0.3, 10.2, M.counter, G.floor1, -W/2+1.5, FY.F1+3.1, 10);
  box(1, 2.5, 10, M.cabinet, G.floor1, -W/2+1, FY.F1+7, 10);
  box(2, 6.5, 2.5, new THREE.MeshStandardMaterial({color:0xE8E8E8,roughness:0.3,metalness:0.15}), G.floor1, -W/2+1.5, FY.F1+3.25, 4);
  box(0.15, 2.5, 0.1, M.metal, G.floor1, -W/2+0.4, FY.F1+4.5, 4);
  box(3, 3, 8, M.cabinet, G.floor1, -14, FY.F1+1.5, 8);
  box(3.2, 0.4, 8.2, M.counter, G.floor1, -14, FY.F1+3.1, 8);
  for(let i=-1; i<=1; i++) {
    cyl(0.5,0.5,0.3,8, M.walnut, G.floor1, -12, FY.F1+2, 8+i*2.5);
    cyl(0.15,0.15,2,8, M.metal, G.floor1, -12, FY.F1+1, 8+i*2.5);
  }
  // Dining
  box(14, 0.4, 5, M.oak, G.floor1, -16, FY.F1+2.95, -12);
  box(0.5,2.6,0.5, M.walnut, G.floor1, -22, FY.F1+1.3, -10.2);
  box(0.5,2.6,0.5, M.walnut, G.floor1, -10, FY.F1+1.3, -10.2);
  box(0.5,2.6,0.5, M.walnut, G.floor1, -22, FY.F1+1.3, -13.8);
  box(0.5,2.6,0.5, M.walnut, G.floor1, -10, FY.F1+1.3, -13.8);
  box(14, 1.5, 2.5, M.couchFabric, G.floor1, -16, FY.F1+0.75, -16);
  box(14, 2.5, 0.5, M.couchFabric, G.floor1, -16, FY.F1+2.5, -17.2);
  for(let i=-2; i<=2; i++) diningChair(-16+i*2.5, -9, FY.F1, G.floor1, Math.PI);
  // Office
  desk(12, 10, FY.F1+0.15, G.floor1);
  box(8, 1.5, 2.5, M.couchFabric, G.floor1, 12, FY.F1+0.75, D/2-2);
  // Main bathroom
  vanity(-4, 16, FY.F1+0.15, 4, G.floor1);
  toilet(-6, 12, FY.F1+0.15, G.floor1);

  // ── VEHICLES ──
  const gfY = FY.F1;
  const eBlu = new THREE.MeshStandardMaterial({color:0x1E90FF, roughness:0.2, metalness:0.65});
  const silv = new THREE.MeshStandardMaterial({color:0xC0C0C8, roughness:0.2, metalness:0.7});
  const tire = new THREE.MeshStandardMaterial({color:0x1A1A1A, roughness:0.9});
  const wind = new THREE.MeshStandardMaterial({color:0x88AACC, roughness:0.05, metalness:0.3, transparent:true, opacity:0.4});
  const blkA = new THREE.MeshStandardMaterial({color:0x1A1A1A, roughness:0.5, metalness:0.4});
  const hdlt = new THREE.MeshStandardMaterial({color:0xFFFFEE, emissive:0xFFFFCC, emissiveIntensity:0.4, roughness:0.1});
  const tllt = new THREE.MeshStandardMaterial({color:0xFF1111, emissive:0xFF0000, emissiveIntensity:0.3, roughness:0.2});
  const chrm = new THREE.MeshStandardMaterial({color:0xCCCCCC, roughness:0.1, metalness:0.9});
  const rim  = new THREE.MeshStandardMaterial({color:0x888888, roughness:0.15, metalness:0.85});
  // Elantra (bay 1)
  const cx=-33, cz=-2, cy=gfY;
  box(3.4,0.7,8.5,eBlu,G.floor1,cx,cy+0.7,cz); box(3.2,0.9,8,eBlu,G.floor1,cx,cy+1.35,cz);
  box(3.0,0.5,2.5,eBlu,G.floor1,cx,cy+1.6,cz+3); box(2.8,1.0,3.2,eBlu,G.floor1,cx,cy+2.3,cz+0.2);
  box(2.6,0.9,0.15,wind,G.floor1,cx,cy+2.5,cz+1.8); box(2.5,0.7,0.15,wind,G.floor1,cx,cy+2.4,cz-1.3);
  box(0.08,0.7,2.8,wind,G.floor1,cx+1.45,cy+2.35,cz+0.3); box(0.08,0.7,2.8,wind,G.floor1,cx-1.45,cy+2.35,cz+0.3);
  box(3.0,0.45,2.2,eBlu,G.floor1,cx,cy+1.65,cz-2.8); box(2.6,0.15,2.8,eBlu,G.floor1,cx,cy+2.88,cz+0.2);
  box(2.4,0.5,0.15,blkA,G.floor1,cx,cy+1.1,cz+4.3); box(2.6,0.08,0.2,chrm,G.floor1,cx,cy+1.4,cz+4.32);
  box(0.5,0.25,0.15,hdlt,G.floor1,cx+1.2,cy+1.4,cz+4.32); box(0.5,0.25,0.15,hdlt,G.floor1,cx-1.2,cy+1.4,cz+4.32);
  box(0.6,0.2,0.15,tllt,G.floor1,cx+1.2,cy+1.5,cz-3.9); box(0.6,0.2,0.15,tllt,G.floor1,cx-1.2,cy+1.5,cz-3.9);
  box(0.35,0.2,0.3,blkA,G.floor1,cx+1.7,cy+2.2,cz+1.5); box(0.35,0.2,0.3,blkA,G.floor1,cx-1.7,cy+2.2,cz+1.5);
  for(let wz of [-2.5,2.5]) for(let wx of [-1.55,1.55]) {
    cyl(0.5,0.5,0.35,12,tire,G.floor1,cx+wx,cy+0.5,cz+wz,0,0,Math.PI/2);
    cyl(0.3,0.3,0.37,8,rim,G.floor1,cx+wx,cy+0.5,cz+wz,0,0,Math.PI/2);
  }
  box(3.0,0.15,0.3,blkA,G.floor1,cx,cy+0.45,cz+4.2);
  // F-150 (bay 2)
  const tx=-42, tz=-2, ty=gfY;
  box(4.2,0.6,11,blkA,G.floor1,tx,ty+0.7,tz); box(4.2,2.0,4.5,silv,G.floor1,tx,ty+2.3,tz+3);
  box(3.8,0.2,4.0,silv,G.floor1,tx,ty+3.4,tz+3); box(3.5,1.5,0.12,wind,G.floor1,tx,ty+2.8,tz+5.2);
  box(3.4,1.2,0.12,wind,G.floor1,tx,ty+2.7,tz+0.8);
  box(0.1,1.2,3.5,wind,G.floor1,tx+2.1,ty+2.7,tz+3); box(0.1,1.2,3.5,wind,G.floor1,tx-2.1,ty+2.7,tz+3);
  box(4.0,1.4,5.5,silv,G.floor1,tx,ty+1.7,tz-3.5); box(3.6,0.1,5.0,blkA,G.floor1,tx,ty+1.1,tz-3.5);
  box(0.15,0.25,5.5,chrm,G.floor1,tx+2.0,ty+2.5,tz-3.5); box(0.15,0.25,5.5,chrm,G.floor1,tx-2.0,ty+2.5,tz-3.5);
  box(3.8,1.3,0.2,silv,G.floor1,tx,ty+1.75,tz-6.3); box(3.4,0.08,0.22,chrm,G.floor1,tx,ty+2.2,tz-6.32);
  box(3.6,1.2,0.2,blkA,G.floor1,tx,ty+1.8,tz+5.35); box(3.0,0.9,0.1,chrm,G.floor1,tx,ty+1.8,tz+5.4);
  box(0.6,0.4,0.15,hdlt,G.floor1,tx+1.7,ty+2.0,tz+5.4); box(0.6,0.4,0.15,hdlt,G.floor1,tx-1.7,ty+2.0,tz+5.4);
  box(0.5,0.5,0.15,tllt,G.floor1,tx+1.8,ty+1.8,tz-6.35); box(0.5,0.5,0.15,tllt,G.floor1,tx-1.8,ty+1.8,tz-6.35);
  box(4.4,0.5,0.4,blkA,G.floor1,tx,ty+0.7,tz+5.5); box(4.4,0.5,0.4,blkA,G.floor1,tx,ty+0.7,tz-6.5);
  box(1.0,0.5,1.8,blkA,G.floor1,tx+2.0,ty+1.2,tz+3.5); box(1.0,0.5,1.8,blkA,G.floor1,tx-2.0,ty+1.2,tz+3.5);
  box(1.0,0.5,1.8,blkA,G.floor1,tx+2.0,ty+1.2,tz-4.5); box(1.0,0.5,1.8,blkA,G.floor1,tx-2.0,ty+1.2,tz-4.5);
  box(0.5,0.15,5.5,blkA,G.floor1,tx+2.2,ty+0.7,tz+0.5); box(0.5,0.15,5.5,blkA,G.floor1,tx-2.2,ty+0.7,tz+0.5);
  box(0.4,0.3,0.35,blkA,G.floor1,tx+2.4,ty+2.8,tz+4.5); box(0.4,0.3,0.35,blkA,G.floor1,tx-2.4,ty+2.8,tz+4.5);
  for(let wz of [-4.5,3.5]) for(let wx of [-1.9,1.9]) {
    cyl(0.75,0.75,0.55,12,tire,G.floor1,tx+wx,ty+0.75,tz+wz,0,0,Math.PI/2);
    cyl(0.45,0.45,0.57,8,blkA,G.floor1,tx+wx,ty+0.75,tz+wz,0,0,Math.PI/2);
    cyl(0.2,0.2,0.58,6,chrm,G.floor1,tx+wx,ty+0.75,tz+wz,0,0,Math.PI/2);
  }

  // ── MUDROOM ──
  for(let i=-2; i<=2; i++) {
    box(0.4,0.4,0.15,M.metal,G.floor1,-24+i*1,FY.F1+5.5,0.8);
    const hook = cyl(0.06,0.06,0.8,6,M.metal,G.floor1,-24+i*1,FY.F1+5.3,0.4);
    hook.rotation.x = Math.PI*0.3;
  }
  box(5,0.3,1.8,M.walnut,G.floor1,-24,FY.F1+1.6,-4);
  box(5,0.3,1.8,M.walnut,G.floor1,-24,FY.F1+0.15,-4);
  box(0.3,1.3,1.8,M.walnut,G.floor1,-26.4,FY.F1+0.85,-4);
  box(0.3,1.3,1.8,M.walnut,G.floor1,-21.6,FY.F1+0.85,-4);
  box(0.15,1.3,1.8,M.walnut,G.floor1,-24,FY.F1+0.85,-4);
  box(4.6,0.4,1.5,new THREE.MeshStandardMaterial({color:0x7A6A5A,roughness:0.95}),G.floor1,-24,FY.F1+2,-4);
  box(4.4,0.1,1.5,new THREE.MeshStandardMaterial({color:0x1A1008,roughness:1}),G.floor1,-24,FY.F1+0.35,-4);

  // ── WORKSHOP ──
  const wsX=-51, wsZ=7, wsY=gfY;
  const rTool = new THREE.MeshStandardMaterial({color:0x8B1A1A,roughness:0.5,metalness:0.3});
  const pegb  = new THREE.MeshStandardMaterial({color:0xC8B898,roughness:0.9});
  const tMat  = new THREE.MeshStandardMaterial({color:0x555555,roughness:0.4,metalness:0.7});
  box(10,0.4,2.5,M.walnut,G.floor1,wsX,wsY+2.8,wsZ);
  box(0.4,2.6,2.3,M.walnut,G.floor1,wsX-4.8,wsY+1.3,wsZ);
  box(0.4,2.6,2.3,M.walnut,G.floor1,wsX+4.8,wsY+1.3,wsZ);
  box(9.2,0.3,2.0,M.walnut,G.floor1,wsX,wsY+0.5,wsZ);
  box(10,4,0.2,pegb,G.floor1,wsX,wsY+5.5,wsZ+1.1);
  box(0.3,1.8,0.15,tMat,G.floor1,wsX-3,wsY+5.8,wsZ+0.9);
  box(0.8,0.5,0.2,tMat,G.floor1,wsX-3,wsY+6.9,wsZ+0.9);
  box(0.25,2.0,0.15,tMat,G.floor1,wsX-1,wsY+5.5,wsZ+0.9);
  box(0.6,0.4,0.15,tMat,G.floor1,wsX-1,wsY+6.6,wsZ+0.9);
  cyl(0.08,0.08,2.0,6,tMat,G.floor1,wsX+1,wsY+5.6,wsZ+0.9);
  box(0.3,0.6,0.15,tMat,G.floor1,wsX+1,wsY+6.8,wsZ+0.9);
  box(0.2,1.2,0.15,tMat,G.floor1,wsX+2.8,wsY+5.2,wsZ+0.9);
  box(0.2,1.2,0.15,tMat,G.floor1,wsX+3.1,wsY+5.2,wsZ+0.9);
  box(0.5,0.5,0.2,tMat,G.floor1,wsX+2.95,wsY+6.0,wsZ+0.9);
  box(3,2.2,2.0,rTool,G.floor1,wsX+2,wsY+1.1,wsZ);
  for(let i=0; i<4; i++) {
    box(2.6,0.04,0.05,M.metal,G.floor1,wsX+2,wsY+0.4+i*0.5,wsZ-1.0);
    box(0.8,0.06,0.1,chrm,G.floor1,wsX+2,wsY+0.5+i*0.5,wsZ-1.05);
  }
  box(0.8,0.6,0.8,tMat,G.floor1,wsX-4,wsY+3.3,wsZ-0.5);
  box(0.6,0.8,0.15,tMat,G.floor1,wsX-4,wsY+3.6,wsZ-1.0);
  box(0.3,0.3,0.6,tMat,G.floor1,wsX-4,wsY+3.6,wsZ-0.2);

  // ── FLOOR 2 ──
  bed(-14,-11,FY.F2+0.15,6,7,G.floor2); nightstand(-18,-8.5,FY.F2+0.15,G.floor2); nightstand(-10,-8.5,FY.F2+0.15,G.floor2);
  bed(-14,6,FY.F2+0.15,6,7,G.floor2); nightstand(-18,8.5,FY.F2+0.15,G.floor2); nightstand(-10,8.5,FY.F2+0.15,G.floor2);
  vanity(6,-10,FY.F2+0.15,4,G.floor2); toilet(10,-6,FY.F2+0.15,G.floor2);
  box(2.5,3,2.5,M.porcelain,G.floor2,6,FY.F2+1.5,12); box(2.5,3,2.5,M.porcelain,G.floor2,9,FY.F2+1.5,12);

  // ── FLOOR 3 ──
  bed(6,-6,FY.F3+0.15,8,8,G.floor3,M.masterBedding); nightstand(1,-3,FY.F3+0.15,G.floor3); nightstand(11,-3,FY.F3+0.15,G.floor3);
  vanity(16,14,FY.F3+0.15,6,G.floor3); bathtub(12,10,FY.F3+0.15,G.floor3); shower(18,8,FY.F3+0.15,4,5,G.floor3);
  cyl(0.08,0.08,3,8,M.metal,G.floor3,19.5,FY.F3+4,14); cyl(0.08,0.08,3,8,M.metal,G.floor3,19.5,FY.F3+4.5,14);
  box(4,0.1,2,new THREE.MeshStandardMaterial({color:0x4A3A30,roughness:1}),G.floor3,16,FY.F3+0.2,12);
  bed(-16,-6,FY.F3+0.15,5,6,G.floor3); nightstand(-19.5,-4,FY.F3+0.15,G.floor3); nightstand(-12.5,-4,FY.F3+0.15,G.floor3);
  bed(-16,10,FY.F3+0.15,5,6,G.floor3); nightstand(-19.5,12,FY.F3+0.15,G.floor3); nightstand(-12.5,12,FY.F3+0.15,G.floor3);
  box(8,0.15,1.5,M.metal,G.floor3,6,FY.F3+6,11); box(8,0.15,1.5,M.metal,G.floor3,6,FY.F3+4,11);
  cyl(2.5,2.5,1.5,16,M.walnut,G.floor3,22,FY.F3+0.9,-10); cyl(2.2,2.2,0.5,16,M.water,G.floor3,22,FY.F3+1.5,-10);
  box(8,3,0.2,M.metal,G.floor3,22,FY.F3+1.5,-14); box(0.2,3,8,M.metal,G.floor3,26,FY.F3+1.5,-10);
}
