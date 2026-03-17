import * as THREE from 'three';
import { W, D, FY, SH, WT } from './constants.js';
import { M } from './materials.js';
import { box, cyl, wall, addWindow, roomLight } from './primitives.js';
import { woodTexture } from './textures.js';
import { G } from './groups.js';

// ═══════════════════════════════════════════════════
// EXTERIOR STRUCTURE
// ═══════════════════════════════════════════════════

// Brick exterior walls
wall(0, -D/2, W+2, 1, 33, FY.B, M.brickTrans, G.structure);
wall(0, D/2, W+2, 1, 33, FY.B, M.brickTrans, G.structure);
wall(-W/2, 0, 1, D, 33, FY.B, M.brickTrans, G.structure);
wall(W/2, 0, 1, D, 33, FY.B, M.brickTrans, G.structure);

// ROOF — gabled (two sloped panels meeting at ridge)
const roofY = FY.F3 + SH;
const ridgeH = 8;
const roofHalfW = W/2 + 2;
const slopeLen = Math.sqrt(roofHalfW*roofHalfW + ridgeH*ridgeH);
const slopeAngle = Math.atan2(ridgeH, roofHalfW);

// Left slope panel
const leftSlope = new THREE.Mesh(
  new THREE.BoxGeometry(slopeLen, 0.6, D + 4), M.roof
);
leftSlope.position.set(-roofHalfW/2, roofY + ridgeH/2, 0);
leftSlope.rotation.z = slopeAngle;
leftSlope.castShadow = true;
G.structure.add(leftSlope);

// Right slope panel
const rightSlope = new THREE.Mesh(
  new THREE.BoxGeometry(slopeLen, 0.6, D + 4), M.roof
);
rightSlope.position.set(roofHalfW/2, roofY + ridgeH/2, 0);
rightSlope.rotation.z = -slopeAngle;
rightSlope.castShadow = true;
G.structure.add(rightSlope);

// Ridge cap
const ridge = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 0.8, D + 4), M.walnut
);
ridge.position.set(0, roofY + ridgeH, 0);
G.structure.add(ridge);

// Front gable fill
const gableFrontGeo = new THREE.BufferGeometry();
const gfv = new Float32Array([
  -W/2-2, roofY, -D/2-2,
   W/2+2, roofY, -D/2-2,
   0,     roofY+ridgeH, -D/2-2,
]);
gableFrontGeo.setAttribute('position', new THREE.BufferAttribute(gfv, 3));
gableFrontGeo.setIndex([0,1,2]);
gableFrontGeo.computeVertexNormals();
G.structure.add(new THREE.Mesh(gableFrontGeo, M.brick));

// Back gable fill
const gableBackGeo = new THREE.BufferGeometry();
const gbv = new Float32Array([
   W/2+2, roofY, D/2+2,
  -W/2-2, roofY, D/2+2,
   0,     roofY+ridgeH, D/2+2,
]);
gableBackGeo.setAttribute('position', new THREE.BufferAttribute(gbv, 3));
gableBackGeo.setIndex([0,1,2]);
gableBackGeo.computeVertexNormals();
G.structure.add(new THREE.Mesh(gableBackGeo, M.brick));

// Chimney
box(3, 8, 3, M.chimney, G.structure, 14, FY.F3+SH+6, 2);
box(3.4, 0.4, 3.4, M.stone, G.structure, 14, FY.F3+SH+10.2, 2);

// ═══════════════════════════════════════════════════
// FRONT DOOR — double doors with panels
// ═══════════════════════════════════════════════════
const doorMat = new THREE.MeshStandardMaterial({ map: woodTexture(128,256,'#3A1A08'), roughness: 0.5 });
box(2.3, 8.5, 0.5, doorMat, G.structure, -1.3, FY.F1+4.25, -D/2);
box(2.3, 8.5, 0.5, doorMat, G.structure, 1.3, FY.F1+4.25, -D/2);
// Door panels (raised detail)
for(let dx of [-1.3, 1.3]) {
  box(1.6, 3, 0.15, new THREE.MeshStandardMaterial({color:0x4A2810,roughness:0.5}), G.structure, dx, FY.F1+2.5, -D/2-0.3);
  box(1.6, 3, 0.15, new THREE.MeshStandardMaterial({color:0x4A2810,roughness:0.5}), G.structure, dx, FY.F1+6.5, -D/2-0.3);
}
// Door handles
cyl(0.08, 0.08, 0.5, 6, M.metal, G.structure, -0.3, FY.F1+4.5, -D/2-0.4);
cyl(0.08, 0.08, 0.5, 6, M.metal, G.structure, 0.3, FY.F1+4.5, -D/2-0.4);
// Door arch
const archGeo = new THREE.TorusGeometry(2.5, 0.3, 8, 16, Math.PI);
const archMesh = new THREE.Mesh(archGeo, M.stone);
archMesh.position.set(0, FY.F1+9, -D/2);
G.structure.add(archMesh);

// ═══════════════════════════════════════════════════
// STAINED GLASS ROSE WINDOW
// ═══════════════════════════════════════════════════
const sgGroup = new THREE.Group();
sgGroup.position.set(0, FY.F1+9, -D/2-0.1);
G.structure.add(sgGroup);
const leadMat = new THREE.MeshStandardMaterial({color:0x2A2A2A, roughness:0.4, metalness:0.7});
const sgR = 2.0;

// Outer frame ring
const outerRing = new THREE.Mesh(new THREE.RingGeometry(sgR-0.12, sgR+0.12, 32), leadMat);
sgGroup.add(outerRing);

// Inner decorative ring
const innerRing = new THREE.Mesh(new THREE.RingGeometry(sgR*0.48-0.06, sgR*0.48+0.06, 24), leadMat);
sgGroup.add(innerRing);

// Jewel tone colors
const jewelColors = [
  {color:0x0B6623, emissive:0x0A4A1A},
  {color:0xC89A2C, emissive:0x8A6A10},
  {color:0x9B111E, emissive:0x6A0A12},
  {color:0x1A3A6A, emissive:0x0A2040},
  {color:0x0B6623, emissive:0x0A4A1A},
  {color:0xC89A2C, emissive:0x8A6A10},
];

// Center rosette — 6-petal flower
const centerR = sgR * 0.22;
const centerGeo = new THREE.CircleGeometry(centerR, 6);
const centerMat = new THREE.MeshStandardMaterial({color:0xC89A2C,emissive:0xAA7A10,emissiveIntensity:0.35,transparent:true,opacity:0.6});
sgGroup.add(new THREE.Mesh(centerGeo, centerMat));
// Petals around center
for(let i=0; i<6; i++) {
  const a = (i/6)*Math.PI*2;
  const px = Math.cos(a)*centerR*1.6, py = Math.sin(a)*centerR*1.6;
  const petal = new THREE.Mesh(new THREE.CircleGeometry(centerR*0.8, 8),
    new THREE.MeshStandardMaterial({color:0x9B111E,emissive:0x6A0A12,emissiveIntensity:0.25,transparent:true,opacity:0.55,side:THREE.DoubleSide}));
  petal.position.set(px, py, 0);
  sgGroup.add(petal);
}

// 6 radial lead lines (spokes)
for(let i=0; i<6; i++) {
  const a = (i/6)*Math.PI*2;
  const spoke = new THREE.Mesh(new THREE.PlaneGeometry(0.08, sgR), leadMat);
  spoke.rotation.z = a;
  spoke.position.set(Math.cos(a)*sgR/2, Math.sin(a)*sgR/2, 0.01);
  sgGroup.add(spoke);
}

// Inner petal panes — 6 segments
for(let i=0; i<6; i++) {
  const a0 = (i/6)*Math.PI*2 + Math.PI/6;
  const a1 = ((i+1)/6)*Math.PI*2 + Math.PI/6;
  const jc = jewelColors[i];
  const paneGeo = new THREE.RingGeometry(centerR*2.2, sgR*0.48-0.08, 12, 1, a0, (a1-a0));
  const paneMat = new THREE.MeshStandardMaterial({color:jc.color, emissive:jc.emissive, emissiveIntensity:0.2, transparent:true, opacity:0.5, side:THREE.DoubleSide});
  sgGroup.add(new THREE.Mesh(paneGeo, paneMat));
}

// Outer panes — 12 segments
const outerJewels = [0x0B6623, 0xC89A2C, 0x9B111E, 0x1A3A6A, 0x0B6623, 0xC89A2C, 0x9B111E, 0x1A3A6A, 0x0B6623, 0xC89A2C, 0x9B111E, 0x1A3A6A];
for(let i=0; i<12; i++) {
  const a0 = (i/12)*Math.PI*2;
  const paneGeo = new THREE.RingGeometry(sgR*0.48+0.08, sgR-0.14, 12, 1, a0, Math.PI/6);
  const paneMat = new THREE.MeshStandardMaterial({color:outerJewels[i], emissive:outerJewels[i], emissiveIntensity:0.15, transparent:true, opacity:0.45, side:THREE.DoubleSide});
  sgGroup.add(new THREE.Mesh(paneGeo, paneMat));
  // Additional lead divider
  const la = a0 + Math.PI/12;
  const leadLine = new THREE.Mesh(new THREE.PlaneGeometry(0.05, sgR*0.5), leadMat);
  leadLine.rotation.z = la;
  leadLine.position.set(Math.cos(la)*sgR*0.73, Math.sin(la)*sgR*0.73, 0.01);
  sgGroup.add(leadLine);
}

// Warm glow behind the window
const sgLight = new THREE.PointLight(0xFFDD88, 0.3, 6);
sgLight.position.set(0, FY.F1+9, -D/2+1.5);
G.structure.add(sgLight);

// ═══════════════════════════════════════════════════
// WELCOME MAT
// ═══════════════════════════════════════════════════
box(3, 0.1, 2, new THREE.MeshStandardMaterial({color:0x5A4030,roughness:1}), G.structure, 0, FY.F1+0.05, -D/2-1.5);
box(3.3, 0.08, 2.3, new THREE.MeshStandardMaterial({color:0x8A6A50,roughness:1}), G.structure, 0, FY.F1+0.02, -D/2-1.5);

// ═══════════════════════════════════════════════════
// FRONT PORCH
// ═══════════════════════════════════════════════════
box(16, 0.5, 6, M.stone, G.structure, 0, FY.F1-0.1, -D/2-3);
for(let x of [-6, 6]) {
  cyl(0.4, 0.4, 10, 12, M.cream, G.structure, x, FY.F1+5, -D/2-5.5);
}
box(18, 0.4, 7, M.walnut, G.structure, 0, FY.F1+10, -D/2-3);

// Steps
for(let i=0; i<3; i++) {
  box(8, 0.4, 1.2, M.stone, G.structure, 0, FY.F1-0.3-i*0.4, -D/2-6.5-i*1.2);
}

// ═══════════════════════════════════════════════════
// WINDOWS
// ═══════════════════════════════════════════════════
// Front
for(let x of [-18, -10, 10, 18]) {
  addWindow(x, FY.F1+5.5, -D/2+0.1, 3.5, 5, G.structure);
  addWindow(x, FY.F2+5.5, -D/2+0.1, 3, 4.5, G.structure);
  addWindow(x, FY.F3+5.5, -D/2+0.1, 3, 4.5, G.structure);
}
// Sides
for(let z of [-10, 0, 10]) {
  if(z === 10) addWindow(-W/2+0.1, FY.F1+5.5, z, 3.5, 5, G.structure, Math.PI/2);
  addWindow(W/2-0.1, FY.F1+5.5, z, 3.5, 5, G.structure, Math.PI/2);
  addWindow(-W/2+0.1, FY.F2+5.5, z, 3, 4.5, G.structure, Math.PI/2);
  addWindow(W/2-0.1, FY.F2+5.5, z, 3, 4.5, G.structure, Math.PI/2);
}
// Back
for(let x of [-18, -14, -10, 10, 18]) {
  addWindow(x, FY.F1+5.5, D/2-0.1, x===-14 ? 4.5 : 3.5, x===-14 ? 6 : 5, G.structure, Math.PI);
}
for(let x of [-18, -10, 10, 18]) {
  addWindow(x, FY.F2+5.5, D/2-0.1, 3, 4.5, G.structure, Math.PI);
  addWindow(x, FY.F3+5.5, D/2-0.1, 3, 4.5, G.structure, Math.PI);
}

// ═══════════════════════════════════════════════════
// GARAGE STRUCTURE — 3-car attached
// ═══════════════════════════════════════════════════
const garageFloorY = FY.F1;
const garageH = 9;

// Garage concrete floor
box(30, 0.3, 20, M.stoneFloor, G.floor1, -42, garageFloorY, -2);

// Garage walls
wall(-42, 8, 30, WT, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-57, -2, WT, 20, garageH, garageFloorY, M.brickTrans, G.floor1);
// Front wall segments with 3 garage door openings
wall(-56.25, -12, 1.5, WT, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-45.5, -12, 1.5, WT, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-36.5, -12, 1.5, WT, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-27.75, -12, 1.5, WT, garageH, garageFloorY, M.brickTrans, G.floor1);
// Headers above garage doors
wall(-50.5, -12, 8, WT, 1.5, garageFloorY+garageH-1.5, M.brickTrans, G.floor1);
wall(-41, -12, 8, WT, 1.5, garageFloorY+garageH-1.5, M.brickTrans, G.floor1);
wall(-32.5, -12, 8, WT, 1.5, garageFloorY+garageH-1.5, M.brickTrans, G.floor1);
// Right wall — shared with house
wall(-27, -9.5, WT, 5, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-27, 5.5, WT, 5, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-27, -2, WT, 6, 2, garageFloorY+garageH-2, M.brickTrans, G.floor1);
wall(-27, -4.5, WT, 1, garageH, garageFloorY, M.brickTrans, G.floor1);
wall(-27, 0.5, WT, 1, garageH, garageFloorY, M.brickTrans, G.floor1);

// Garage door panels
const garageDoorMat = new THREE.MeshStandardMaterial({color:0x3A3A3A, roughness:0.6, metalness:0.15, transparent:true, opacity:0.7});
for(let doorIdx=0; doorIdx<3; doorIdx++) {
  const doorCenterX = -50.5 + doorIdx * 9.5;
  box(8, 7.5, 0.3, garageDoorMat, G.floor1, doorCenterX, garageFloorY+3.75, -12);
  for(let seg=0; seg<5; seg++) {
    box(8, 0.08, 0.35, M.metal, G.floor1, doorCenterX, garageFloorY+0.5+seg*1.5, -12);
  }
  for(let pane=-2; pane<=2; pane++) {
    box(1.2, 1, 0.05, M.glass, G.floor1, doorCenterX+pane*1.6, garageFloorY+7, -12.2);
  }
}

// Garage roof
const garageRoofGeo = new THREE.BoxGeometry(32, 0.5, 22);
const garageRoof = new THREE.Mesh(garageRoofGeo, M.roof);
garageRoof.position.set(-42, garageFloorY+garageH, -2);
garageRoof.rotation.x = 0.03;
garageRoof.castShadow = true;
G.floor1.add(garageRoof);

// Garage interior light
roomLight(-42, garageFloorY+8, -2, G.floor1, 0.2, 18, 0xFFFFE0);
