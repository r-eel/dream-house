import * as THREE from 'three';
import { M } from './materials.js';

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════
export const rooms = [];

export function box(w,h,d,mat,group,x=0,y=0,z=0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), mat);
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true;
  group.add(m); return m;
}

export function cyl(rt,rb,h,seg,mat,group,x=0,y=0,z=0,rx=0,ry=0,rz=0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg), mat);
  m.position.set(x,y,z); m.rotation.set(rx,ry,rz);
  m.castShadow=true; m.receiveShadow=true;
  group.add(m); return m;
}

export function roomFloor(x,z,w,d,y,mat,name,desc,group,floorKey) {
  const m = box(w,0.15,d,mat,group,x,y+0.075,z);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(w,0.2,d)),
    new THREE.LineBasicMaterial({ color: 0xd4a574, transparent: true, opacity: 0.5 })
  );
  edges.position.set(x,y+0.1,z);
  group.add(edges);
  rooms.push({ name, desc, mesh: m, material: mat, line: edges, floor: floorKey });
  return m;
}

export function wall(x,z,w,d,h,y,mat,group) { return box(w,h,d,mat,group,x,y+h/2,z); }

export function addWindow(x,y,z,w,h,group,rotY=0) {
  const fmat = M.walnut;
  const bt = 0.25; // bar thickness
  const wg = new THREE.Group();
  wg.position.set(x, y, z);
  wg.rotation.y = rotY;
  group.add(wg);
  // Outer frame - 4 thin bars (local coords relative to group center)
  box(w+bt*2, bt, bt, fmat, wg, 0, h/2, 0);
  box(w+bt*2, bt, bt, fmat, wg, 0, -h/2, 0);
  box(bt, h, bt, fmat, wg, -w/2, 0, 0);
  box(bt, h, bt, fmat, wg, w/2, 0, 0);
  // Glass pane
  const glassMat = new THREE.MeshStandardMaterial({ color:0xAAD4EE, roughness:0.05, metalness:0.1, transparent:true, opacity:0.28, depthWrite:false, side:THREE.DoubleSide });
  box(w-bt, h-bt, 0.06, glassMat, wg, 0, 0, 0);
  return wg;
}

// V3: Arched doorway helper
export function archedDoorway(x, z, y, h, w, group, rotY=0) {
  const archH = h * 0.75;  // Straight part (taller to reduce gap)
  const archR = w / 2;     // Arch radius
  // Left post
  const lx = rotY ? x : x - w/2 + 0.2;
  const lz = rotY ? z - w/2 + 0.2 : z;
  box(0.4, archH, 0.5, M.creamWall, group, lx, y + archH/2, lz);
  // Right post
  const rx = rotY ? x : x + w/2 - 0.2;
  const rz = rotY ? z + w/2 - 0.2 : z;
  box(0.4, archH, 0.5, M.creamWall, group, rx, y + archH/2, rz);
  // Arch top — thicker torus to fill gap
  const archGeo = new THREE.TorusGeometry(archR, 0.35, 8, 16, Math.PI);
  const archMesh = new THREE.Mesh(archGeo, M.creamWall);
  archMesh.position.set(x, y + archH, z);
  if(rotY) archMesh.rotation.y = rotY;
  archMesh.rotation.z = 0;
  archMesh.castShadow = true;
  group.add(archMesh);
  // Fill block between arch crown and header
  if(!rotY) {
    box(w * 0.6, 0.5, 0.5, M.creamWall, group, x, y + archH + archR * 0.85, z);
  } else {
    box(0.5, 0.5, w * 0.6, M.creamWall, group, x, y + archH + archR * 0.85, z);
  }
}

// V3: Interior wall with doorway cutout
export function wallWithDoor(x, z, w, d, h, y, mat, group, doorPos=0, doorW=3.5, arched=true) {
  const leftW = (w/2 + doorPos) - doorW/2;
  const rightW = (w/2 - doorPos) - doorW/2;
  const headerFrac = 0.3; // taller header to fill gaps
  if(d <= 0.5) {
    // Wall runs along X axis
    if(leftW > 0.5) wall(x - w/2 + leftW/2, z, leftW, d, h, y, mat, group);
    if(rightW > 0.5) wall(x + w/2 - rightW/2, z, rightW, d, h, y, mat, group);
    // Header above door
    wall(x + doorPos, z, doorW, d, h*headerFrac, y + h*(1-headerFrac), mat, group);
    if(arched) archedDoorway(x + doorPos, z, y, h*(1-headerFrac), doorW, group, 0);
  } else {
    // Wall runs along Z axis
    if(leftW > 0.5) wall(x, z - w/2 + leftW/2, d, leftW, h, y, mat, group);
    if(rightW > 0.5) wall(x, z + w/2 - rightW/2, d, rightW, h, y, mat, group);
    wall(x, z + doorPos, d, doorW, h*headerFrac, y + h*(1-headerFrac), mat, group);
    if(arched) archedDoorway(x, z + doorPos, y, h*(1-headerFrac), doorW, group, Math.PI/2);
  }
}

// V3: Warm room light
export function roomLight(x, y, z, group, intensity=0.4, dist=12, color=0xFFE0A0) {
  const pl = new THREE.PointLight(color, intensity, dist);
  pl.position.set(x, y, z);
  group.add(pl);
  return pl;
}
