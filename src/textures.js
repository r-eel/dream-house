import * as THREE from 'three';

// ═══════════════════════════════════════════════════
// TEXTURE HELPERS
// ═══════════════════════════════════════════════════
export function brickTexture(w=512, h=512) {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  const colors = ['#8B4513','#7A3A10','#9B5523','#6B3410','#8B5533','#7B4520'];
  const bw=48, bh=20, gap=3;
  ctx.fillStyle = '#5A3A20'; ctx.fillRect(0,0,w,h);
  for(let row=0; row<h/bh+1; row++) {
    const offset = row%2 ? bw/2 : 0;
    for(let col=-1; col<w/bw+1; col++) {
      ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
      const x=col*bw+offset+gap/2, y=row*bh+gap/2;
      ctx.fillRect(x, y, bw-gap, bh-gap);
      ctx.fillStyle = `rgba(0,0,0,${Math.random()*0.15})`;
      ctx.fillRect(x, y, bw-gap, bh-gap);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4,4);
  return tex;
}

export function woodTexture(w=256, h=256, baseColor='#5C3A1E') {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = baseColor; ctx.fillRect(0,0,w,h);
  for(let i=0; i<60; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${0.03+Math.random()*0.06})`;
    ctx.lineWidth = 1+Math.random()*2;
    ctx.beginPath();
    const y = Math.random()*h;
    ctx.moveTo(0, y+Math.random()*3);
    for(let x=0; x<w; x+=20) ctx.lineTo(x, y+Math.random()*4-2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function walnutFloorTexture(w=512, h=512) {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#6B4A2A'; ctx.fillRect(0,0,w,h);
  const plankW=64, plankH=h;
  for(let col=0; col<w/plankW+1; col++) {
    const shade = Math.random()*0.15;
    ctx.fillStyle = `rgba(${80+Math.random()*30},${50+Math.random()*20},${25+Math.random()*15},1)`;
    ctx.fillRect(col*plankW+1, 0, plankW-2, plankH);
    // Wood grain lines
    for(let i=0; i<30; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${0.04+Math.random()*0.06})`;
      ctx.lineWidth = 0.5+Math.random()*1.5;
      ctx.beginPath();
      const y = Math.random()*h;
      ctx.moveTo(col*plankW+2, y);
      ctx.lineTo(col*plankW+plankW-2, y+Math.random()*6-3);
      ctx.stroke();
    }
    // Plank divider
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(col*plankW, 0, 1, plankH);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3,3);
  return tex;
}

export function stoneTileTexture(w=512, h=512) {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#9A9080'; ctx.fillRect(0,0,w,h);
  const tileS=64, gap=3;
  for(let row=0; row<h/tileS+1; row++) {
    const off = row%2 ? tileS/2 : 0;
    for(let col=-1; col<w/tileS+1; col++) {
      const v = 130+Math.floor(Math.random()*30);
      ctx.fillStyle = `rgb(${v+10},${v+5},${v-5})`;
      ctx.fillRect(col*tileS+off+gap/2, row*tileS+gap/2, tileS-gap, tileS-gap);
      // Subtle speckle
      for(let s=0; s<8; s++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random()*0.08})`;
        const sx=col*tileS+off+Math.random()*tileS, sy=row*tileS+Math.random()*tileS;
        ctx.fillRect(sx,sy,2+Math.random()*3,2+Math.random()*3);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2,2);
  return tex;
}

export function carpetTexture(w=256, h=256, base='#4A3A3A') {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = base; ctx.fillRect(0,0,w,h);
  for(let i=0; i<3000; i++) {
    const r=parseInt(base.slice(1,3),16), g=parseInt(base.slice(3,5),16), b=parseInt(base.slice(5,7),16);
    ctx.fillStyle = `rgba(${r+Math.random()*30-15},${g+Math.random()*30-15},${b+Math.random()*30-15},0.3)`;
    ctx.fillRect(Math.random()*w, Math.random()*h, 1, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2,2);
  return tex;
}

export function roofTexture(w=512, h=512) {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#2A1A0A'; ctx.fillRect(0,0,w,h);
  const sw=40, sh=15;
  for(let row=0; row<h/sh+1; row++) {
    const offset = row%2 ? sw/2 : 0;
    for(let col=-1; col<w/sw+1; col++) {
      const shade = 25 + Math.floor(Math.random()*20);
      ctx.fillStyle = `rgb(${shade+15},${shade+5},${shade})`;
      ctx.beginPath();
      const x=col*sw+offset, y=row*sh;
      ctx.moveTo(x,y+sh); ctx.lineTo(x+sw/2,y); ctx.lineTo(x+sw,y+sh); ctx.closePath();
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3,3);
  return tex;
}

export function stoneTexture(w=256, h=256) {
  const c = document.createElement('canvas'); c.width=w; c.height=h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8A8070'; ctx.fillRect(0,0,w,h);
  for(let i=0; i<200; i++) {
    ctx.fillStyle = `rgba(${Math.random()>0.5?0:255},${Math.random()>0.5?0:255},${Math.random()>0.5?0:255},${Math.random()*0.04})`;
    ctx.fillRect(Math.random()*w, Math.random()*h, 3+Math.random()*8, 3+Math.random()*8);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
