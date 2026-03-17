import * as THREE from 'three';
import { camera, renderer } from './scene.js';
import { rooms } from './primitives.js';
import { highlightMat, M } from './materials.js';
import { G } from './groups.js';
import { controls, fpsMode, enterFPS, exitFPS, fpsTeleportToFloor, animateTo } from './controls.js';

// ═══════════════════════════════════════════════════
// ROOM CLICK INTERACTION
// ═══════════════════════════════════════════════════
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedRoom = null;
const roomInfoEl = document.getElementById('room-info');
const roomNameEl = document.getElementById('room-name');
const roomDescEl = document.getElementById('room-desc');

renderer.domElement.addEventListener('pointerdown', e => {
  const rect = renderer.domElement.getBoundingClientRect();
  if (fpsMode) return;
  mouse.x = ((e.clientX-rect.left)/rect.width)*2-1;
  mouse.y = -((e.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(rooms.map(r=>r.mesh));
  if(selectedRoom) selectedRoom.mesh.material = selectedRoom.material;
  if(hits.length) {
    const room = rooms.find(r=>r.mesh===hits[0].object);
    if(room) {
      selectedRoom = room;
      room.mesh.material = highlightMat;
      roomNameEl.textContent = room.name;
      roomDescEl.textContent = room.desc;
      roomInfoEl.classList.add('visible');
    }
  } else { selectedRoom=null; roomInfoEl.classList.remove('visible'); }
});

// ═══════════════════════════════════════════════════
// FLOOR TOGGLE
// ═══════════════════════════════════════════════════
document.querySelectorAll('.floor-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.floor-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.floor;
    if(f==='all') {
      if (fpsMode) exitFPS();
      Object.values(G).forEach(g=>{g.visible=true});
      M.brickTrans.opacity = 0.25;
      animateTo(camera.position,{x:55,y:50,z:55});
      animateTo(controls.target,{x:0,y:6,z:0});
    } else {
      Object.entries(G).forEach(([k,g])=>{
        g.visible = k===f;
      });
      G.structure.visible = fpsMode;
      if (fpsMode) G.outdoor.visible = true;
      if (fpsMode) {
        fpsTeleportToFloor(f);
      } else {
        const camY = {basement:-2, floor1:18, floor2:28, floor3:38, outdoor:20};
        const targY = {basement:-5, floor1:2, floor2:12, floor3:22, outdoor:1};
        animateTo(camera.position,{x:40,y:camY[f]||20,z:40});
        animateTo(controls.target,{x:0,y:targY[f]||6,z:0});
      }
      if(f==='basement') {
        G.outdoor.visible = false;
      } else {
        G.outdoor.visible = true;
      }
    }
    if(selectedRoom){selectedRoom.mesh.material=selectedRoom.material;selectedRoom=null;roomInfoEl.classList.remove('visible');}
  });
});

// ═══════════════════════════════════════════════════
// VIEW CONTROLS
// ═══════════════════════════════════════════════════
document.getElementById('btn-top').onclick=()=>{
  animateTo(camera.position,{x:0,y:75,z:0.1});animateTo(controls.target,{x:0,y:6,z:0});
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-top').classList.add('active');
};
document.getElementById('btn-3d').onclick=()=>{
  animateTo(camera.position,{x:55,y:50,z:55});animateTo(controls.target,{x:0,y:6,z:0});
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-3d').classList.add('active');
};
document.getElementById('btn-front').onclick=()=>{
  animateTo(camera.position,{x:0,y:18,z:-80});animateTo(controls.target,{x:0,y:10,z:0});
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-front').classList.add('active');
};

// FPS button
document.getElementById('btn-fps').onclick = () => {
  if (fpsMode) exitFPS();
  else enterFPS();
};

// ═══════════════════════════════════════════════════
// COLLAPSE PANELS
// ═══════════════════════════════════════════════════
document.getElementById('toggle-floors').onclick=()=>document.getElementById('floor-buttons').classList.toggle('collapsed');
document.getElementById('toggle-views').onclick=()=>document.getElementById('view-buttons').classList.toggle('collapsed');
document.getElementById('toggle-legend').onclick=()=>document.getElementById('legend').classList.toggle('collapsed');
if(innerWidth<=768){document.getElementById('view-buttons').classList.add('collapsed');document.getElementById('legend')?.classList.add('collapsed');}
