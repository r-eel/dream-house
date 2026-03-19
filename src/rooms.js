import * as THREE from 'three';
import { W, D, FY, SH } from './constants.js';
import { M } from './materials.js';
import { box, cyl, roomFloor, roomLight, rooms } from './primitives.js';
import { G } from './groups.js';

// ═══════════════════════════════════════════════════
// BASEMENT — floor slab, rooms, lighting
// ═══════════════════════════════════════════════════
box(W, 0.3, D, M.stoneFloor, G.basement, 0, FY.B, 0);

roomFloor(-12, -4, 24, 17, FY.B+0.2, M.floorTheatre, 'Movie Theatre',
  'Surround sound, tiered seating, projector screen — movie nights with the kids 🎬', G.basement, 'basement');
roomFloor(16, -4, 18, 17, FY.B+0.2, M.floorBar, 'Bar & Lounge',
  'Drink station with stools, perfect for entertaining friends & family 🍸', G.basement, 'basement');
roomFloor(0, 12, 30, 10, FY.B+0.2, M.floorLiving, 'Kids Play Area',
  'Open play space — safe, fun, connected to the rest of the basement 🎮', G.basement, 'basement');

roomLight(-12, FY.B+8, -4, G.basement, 0.4, 15);
roomLight(16, FY.B+8, -4, G.basement, 0.3, 12, 0xFFD090);
roomLight(0, FY.B+8, 12, G.basement, 0.3, 12);

// Theatre ceiling — dark enclosed feel
box(24, 0.3, 17, new THREE.MeshStandardMaterial({color:0x1A1018,roughness:1}), G.basement, -12, FY.B+SH-0.15, -4);

// ═══════════════════════════════════════════════════
// FLOOR 1 — floor slab, rooms, lighting, beams
// ═══════════════════════════════════════════════════
box(W, 0.3, D, M.walnutFloor, G.floor1, 0, FY.F1, 0);

roomFloor(0, -14, 10, 8, FY.F1+0.2, M.floorLiving, 'Grand Foyer',
  'Double doors, soaring ceiling with staircase — the first thing you see 🚪', G.floor1, 'floor1');
roomFloor(-16, -10, 20, 14, FY.F1+0.2, M.floorKitchen, 'Dining Room',
  'Long estate table with built-in bench — backs up to front windows 🍽', G.floor1, 'floor1');
roomFloor(-16, 8, 20, 16, FY.F1+0.2, M.floorKitchen, 'Kitchen',
  'L-shaped layout, walnut cabinets, stone countertops, island with stools 🍳', G.floor1, 'floor1');
roomFloor(12, -6, 14, 16, FY.F1+0.2, M.floorLiving, 'Living Room',
  'High ceilings, stone fireplace, cloud sectional, fiddle leaf fig 🛋', G.floor1, 'floor1');
roomFloor(12, 12, 12, 8, FY.F1+0.2, M.floorLiving, 'Office',
  'Lots of windows, bay window seating — Rob\'s remote HQ 📚', G.floor1, 'floor1');
roomFloor(-24, -2, 6, 6, FY.F1+0.2, M.floorUtility, 'Mud Room',
  'Drop zone between garage and kitchen — hooks, bench, shoe storage 🧥', G.floor1, 'floor1');
roomFloor(-42, -2, 30, 20, FY.F1+0.2, M.floorUtility, 'Garage',
  'Three-car attached garage → mudroom → kitchen 🚗', G.floor1, 'floor1');
roomFloor(-4, 14, 6, 6, FY.F1+0.2, M.floorBath, 'Main Bathroom',
  'Full bath on the main floor — stone tile, walnut vanity 🚿', G.floor1, 'floor1');

// Cat Sunroom — glass conservatory bumped out from the house exterior
roomFloor(W/2+5, 6, 8, 8, FY.F1+0.2, M.floorLiving, 'Cat Sunroom',
  'Salem\'s sunny sanctuary — glass walls, warm light, and all the napping spots a cat could want 🐱☀️', G.floor1, 'floor1');
// Glass walls with wooden frame posts
box(8, 6, 0.2, M.glass, G.floor1, W/2+5, FY.F1+3, 2);
box(8, 6, 0.2, M.glass, G.floor1, W/2+5, FY.F1+3, 10);
box(0.2, 6, 8, M.glass, G.floor1, W/2+9, FY.F1+3, 6);
box(8, 0.2, 8, M.glass, G.floor1, W/2+5, FY.F1+6, 6);
box(0.3, 6, 0.3, M.walnut, G.floor1, W/2+1, FY.F1+3, 2);
box(0.3, 6, 0.3, M.walnut, G.floor1, W/2+9, FY.F1+3, 2);
box(0.3, 6, 0.3, M.walnut, G.floor1, W/2+9, FY.F1+3, 10);
box(0.3, 6, 0.3, M.walnut, G.floor1, W/2+1, FY.F1+3, 10);
roomLight(W/2+5, FY.F1+5, 6, G.floor1, 0.4, 10, 0xFFF4D0);
// Cat tree
cyl(0.4, 0.4, 5, 8, M.walnut, G.floor1, W/2+7, FY.F1+2.5, 8);
box(2.5, 0.3, 2.5, M.oak, G.floor1, W/2+7, FY.F1+2.5, 8);
box(2, 0.3, 2, M.oak, G.floor1, W/2+7, FY.F1+4.5, 8);
// Litter Robot
cyl(1.2, 1.2, 1.8, 12, new THREE.MeshStandardMaterial({color:0xE8E8E8,roughness:0.3}),
  G.floor1, W/2+3, FY.F1+0.9, 3);
// Food bowls + water fountain
cyl(0.4, 0.5, 0.3, 8, M.metal, G.floor1, W/2+4, FY.F1+0.15, 9);
cyl(0.4, 0.5, 0.3, 8, M.metal, G.floor1, W/2+5, FY.F1+0.15, 9);
cyl(0.5, 0.6, 0.5, 10, M.metal, G.floor1, W/2+6, FY.F1+0.25, 9);
// Mouse toys
box(0.3, 0.2, 0.5, new THREE.MeshStandardMaterial({color:0xFF6B8A,roughness:0.8}), G.floor1, W/2+5, FY.F1+0.3, 5);
box(0.3, 0.2, 0.5, new THREE.MeshStandardMaterial({color:0x66BBEE,roughness:0.8}), G.floor1, W/2+7.5, FY.F1+0.3, 4.5);

roomLight(-16, FY.F1+8, 8, G.floor1, 0.35, 14, 0xFFF0C0);
roomLight(12, FY.F1+8, -6, G.floor1, 0.5, 16, 0xFFE0A0);
roomLight(-16, FY.F1+8, -10, G.floor1, 0.35, 12, 0xFFE8B0);
roomLight(12, FY.F1+8, 12, G.floor1, 0.3, 12, 0xFFE0A0);
roomLight(0, FY.F1+8, -14, G.floor1, 0.3, 10, 0xFFE8C0);

// Exposed ceiling beams — Living Room & Kitchen
for(let i=-1; i<=1; i++) {
  box(14, 0.5, 0.7, M.walnut, G.floor1, 12, FY.F1+SH-0.5, -6+i*5);
  box(14.4, 0.15, 0.9, M.oak, G.floor1, 12, FY.F1+SH-0.1, -6+i*5);
}
for(let i=0; i<3; i++) {
  box(20, 0.5, 0.7, M.walnut, G.floor1, -16, FY.F1+SH-0.5, 2+i*5);
  box(20.4, 0.15, 0.9, M.oak, G.floor1, -16, FY.F1+SH-0.1, 2+i*5);
}

// ═══════════════════════════════════════════════════
// FLOOR 2 — floor slab, rooms, lighting
// ═══════════════════════════════════════════════════
box(44, 0.3, 32, M.walnutFloor, G.floor2, -2, FY.F2, 0);

roomLight(-14, FY.F2+8, -11, G.floor2, 0.3, 12);
roomLight(-14, FY.F2+8, 5, G.floor2, 0.3, 12);
roomLight(8, FY.F2+8, 11, G.floor2, 0.25, 10);

roomFloor(-14, -11, 18, 8, FY.F2+0.2, M.floorBedroom, 'Bedroom 1',
  'Spacious bedroom — earth tones, cozy, with closet 🛏', G.floor2, 'floor2');
roomFloor(-14, 5, 18, 14, FY.F2+0.2, M.floorBedroom, 'Bedroom 2',
  'Second bedroom with views — warm and inviting 🛏', G.floor2, 'floor2');
roomFloor(8, -8, 10, 8, FY.F2+0.2, M.floorBath, 'Full Bathroom',
  'Stone tile, walnut vanity, full tub 🛁', G.floor2, 'floor2');
roomFloor(8, 3, 8, 6, FY.F2+0.2, M.floorBath, 'Half Bath',
  'Half bath for floor 2 🚿', G.floor2, 'floor2');
roomFloor(8, 11, 10, 8, FY.F2+0.2, M.floorUtility, 'Laundry Room',
  'Washer, dryer, folding station 👕', G.floor2, 'floor2');

// ═══════════════════════════════════════════════════
// FLOOR 3 — MASTER SUITE — floor slab, rooms, lighting, beams
// ═══════════════════════════════════════════════════
box(44, 0.3, 32, M.walnutFloor, G.floor3, -2, FY.F3, 0);

roomLight(6, FY.F3+9, -4, G.floor3, 0.5, 18, 0xFFE0A0);
roomLight(16, FY.F3+8, 11, G.floor3, 0.3, 10, 0xFFF0D0);
roomLight(-16, FY.F3+8, -5, G.floor3, 0.3, 10);
roomLight(-16, FY.F3+8, 10, G.floor3, 0.25, 10);

roomFloor(-16, -5, 14, 16, FY.F3+0.2, M.floorBedroom, 'Bedroom 3',
  'Cozy retreat with vintage touches 🛏', G.floor3, 'floor3');
roomFloor(-16, 10, 14, 8, FY.F3+0.2, M.floorBedroom, 'Bedroom 4',
  'Warm lighting, exposed beams 🛏', G.floor3, 'floor3');
roomFloor(6, -4, 22, 18, FY.F3+0.2, M.floorMaster, 'Master Bedroom',
  'The sanctuary — king bed, exposed beams, warm walnut, the ultimate retreat 👑', G.floor3, 'floor3');
roomFloor(6, 11, 10, 6, FY.F3+0.2, M.floorMaster, 'Walk-in Closet',
  'Emma\'s dream closet — space for ALL the clothes 👗', G.floor3, 'floor3');
roomFloor(16, 11, 8, 8, FY.F3+0.2, M.floorBath, 'Master Bathroom',
  'Double vanity, clawfoot soaking tub, huge walk-in shower (dual heads + rain, 6\'4" approved) 🛁', G.floor3, 'floor3');

// Exposed beams in master — with bevel detail
for(let i=-2; i<=2; i++) {
  box(22, 0.6, 0.8, M.walnut, G.floor3, 6, FY.F3+SH+1.5, -4+i*4);
  box(22.4, 0.15, 1.0, M.oak, G.floor3, 6, FY.F3+SH+1.9, -4+i*4);
}
// Beams for bedrooms 3 & 4
for(let i=-1; i<=1; i++) {
  box(14, 0.5, 0.6, M.walnut, G.floor3, -16, FY.F3+SH+1.5, -5+i*5);
  box(14, 0.5, 0.6, M.walnut, G.floor3, -16, FY.F3+SH+1.5, 10+i*3);
}

// Balcony
const balcony = box(8, 0.3, 8, M.patio, G.floor3, 22, FY.F3+0.15, -10);
rooms.push({ name:'Balcony & Hot Tub', desc:'Private balcony — hot tub under the stars ♨️✨',
  mesh: balcony, material: M.patio, line: null, floor:'floor3' });

// ═══════════════════════════════════════════════════
// LABELS
// ═══════════════════════════════════════════════════
function label(text, pos, floor) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  c.width=512; c.height=64;
  ctx.font='500 26px Inter,sans-serif';
  ctx.fillStyle='#d4a574';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(text,256,32);
  const tex = new THREE.CanvasTexture(c);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,opacity:0.85}));
  s.position.copy(pos); s.scale.set(12,1.5,1);
  (G[floor]||G.floor1).add(s);
}

label('🎬 Theatre', new THREE.Vector3(-12,FY.B+7,-4), 'basement');
label('🍸 Bar', new THREE.Vector3(16,FY.B+7,-4), 'basement');
label('🎮 Play', new THREE.Vector3(0,FY.B+7,12), 'basement');
label('🚪 Foyer', new THREE.Vector3(0,FY.F1+8,-14), 'floor1');
label('🍳 Kitchen', new THREE.Vector3(-16,FY.F1+6,8), 'floor1');
label('🛋 Living', new THREE.Vector3(12,FY.F1+8,-6), 'floor1');
label('🍽 Dining', new THREE.Vector3(-16,FY.F1+6,-10), 'floor1');
label('📚 Office', new THREE.Vector3(12,FY.F1+6,12), 'floor1');
label('🚗 Garage', new THREE.Vector3(-42,FY.F1+6,-2), 'floor1');
label('🧥 Mudroom', new THREE.Vector3(-24,FY.F1+6,-2), 'floor1');
label('🛏 Bed 1', new THREE.Vector3(-14,FY.F2+6,-11), 'floor2');
label('🛏 Bed 2', new THREE.Vector3(-14,FY.F2+6,5), 'floor2');
label('👕 Laundry', new THREE.Vector3(8,FY.F2+6,11), 'floor2');
label('👑 Master', new THREE.Vector3(6,FY.F3+7,-4), 'floor3');
label('👗 Closet', new THREE.Vector3(6,FY.F3+6,11), 'floor3');
label('🛁 Bath', new THREE.Vector3(16,FY.F3+6,11), 'floor3');
label('♨️ Hot Tub', new THREE.Vector3(22,FY.F3+4,-10), 'floor3');
label('🔥 Fire Pit', new THREE.Vector3(-10,FY.F1+4,D/2+36), 'outdoor');
label('🪑 Patio', new THREE.Vector3(-8,FY.F1+4,D/2+12), 'outdoor');
label('🐱 Sunroom', new THREE.Vector3(W/2+5,FY.F1+6,6), 'floor1');
label('🏊 Pool', new THREE.Vector3(16,FY.F1+4,D/2+36), 'outdoor');
