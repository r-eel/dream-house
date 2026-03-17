// ═══════════════════════════════════════════════════
// HOUSE DIMENSIONS & SHARED CONFIG
// ═══════════════════════════════════════════════════
export const W = 54, D = 36;
export const FY = { B: -10, F1: 0, F2: 10.5, F3: 21 };
export const SH = 10;
export const WT = 0.5;

// FPS walkthrough config
export const fpsSpeed = 18;
export const fpsEyeHeight = 5.5;

export const fpsSpawns = {
  basement: { x: 0, z: 0 },
  floor1:   { x: 0, z: -14 },
  floor2:   { x: -2, z: 0 },
  floor3:   { x: 6, z: -4 },
  outdoor:  { x: -8, z: 30 },
};

export const fpsBounds = {
  basement: { xMin: -27, xMax: 27, zMin: -18, zMax: 18 },
  floor1:   { xMin: -57, xMax: 27, zMin: -18, zMax: 18 },
  floor2:   { xMin: -24, xMax: 20, zMin: -16, zMax: 16 },
  floor3:   { xMin: -24, xMax: 27, zMin: -16, zMax: 16 },
  outdoor:  { xMin: -70, xMax: 45, zMin: -50, zMax: 50 },
};
