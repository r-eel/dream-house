import { W, D, FY, SH, WT } from './constants.js';
import { M } from './materials.js';
import { wall, wallWithDoor } from './primitives.js';
import { G } from './groups.js';

// ═══════════════════════════════════════════════════
// BASEMENT — walls
// ═══════════════════════════════════════════════════
// Outer walls
wall(-W/2+WT/2, 0, WT, D, SH, FY.B, M.creamWall, G.basement);
wall(W/2-WT/2, 0, WT, D, SH, FY.B, M.creamWall, G.basement);
wall(0, -D/2+WT/2, W, WT, SH, FY.B, M.creamWall, G.basement);
wall(0, D/2-WT/2, W, WT, SH, FY.B, M.creamWall, G.basement);

// Interior walls
// N-S divider at x=4 (theatre | bar)
wallWithDoor(4, -5.5, 25, 0.6, SH, FY.B, M.creamWall, G.basement, 0, 4);
// E-W divider at z=7 (front rooms | play area)
wallWithDoor(0, 7, W, WT, SH, FY.B, M.creamWall, G.basement, -10, 5);

// ═══════════════════════════════════════════════════
// FLOOR 1 — interior walls
// ═══════════════════════════════════════════════════
// N-S wall at x=-5: left boundary of foyer/hallway
wallWithDoor(-5, -7, 22, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 4);
wallWithDoor(-5, 7.5, 7, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 3.5);
// N-S wall at x=5: right boundary of foyer/hallway
wallWithDoor(5, -7, 22, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 4);
wallWithDoor(5, 11, 14, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 4);
// E-W wall at z=4: dining↔kitchen
wallWithDoor(-13, 4, 16, WT, SH, FY.F1, M.creamWall, G.floor1, 0, 4);
// E-W wall at z=4: living↔office
wallWithDoor(16, 4, 22, WT, SH, FY.F1, M.creamWall, G.floor1, 0, 3.5);
// Mudroom walls
wall(-24, -5, 6, WT, SH, FY.F1, M.creamWall, G.floor1);
wall(-24, 1, 6, WT, SH, FY.F1, M.creamWall, G.floor1);
wallWithDoor(-27, -2, 6, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 3);
wallWithDoor(-21, -2, 6, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 3);
// Bathroom walls
wall(-4, 11, 6, WT, SH, FY.F1, M.creamWall, G.floor1);
wall(-1, 14, WT, 6, SH, FY.F1, M.creamWall, G.floor1);
wallWithDoor(-7, 14, 6, 0.6, SH, FY.F1, M.creamWall, G.floor1, 0, 3);

// ═══════════════════════════════════════════════════
// FLOOR 2 — walls
// ═══════════════════════════════════════════════════
// Outer walls
wall(-24+WT/2, 0, WT, 32, SH, FY.F2, M.creamWall, G.floor2);
wall(20-WT/2, 0, WT, 32, SH, FY.F2, M.creamWall, G.floor2);
wall(-2, -16+WT/2, 44, WT, SH, FY.F2, M.creamWall, G.floor2);
wall(-2, 16-WT/2, 44, WT, SH, FY.F2, M.creamWall, G.floor2);
// Interior walls
wallWithDoor(-5, -10, 12, 0.6, SH, FY.F2, M.creamWall, G.floor2, 0, 3.5);
wallWithDoor(-5, 6, 20, 0.6, SH, FY.F2, M.creamWall, G.floor2, 0, 3.5);
wallWithDoor(-14.5, -4, 19, WT, SH, FY.F2, M.creamWall, G.floor2, 0, 3.5);
wallWithDoor(3, -10, 12, 0.6, SH, FY.F2, M.creamWall, G.floor2, 0, 3);
wallWithDoor(3, 1, 10, 0.6, SH, FY.F2, M.creamWall, G.floor2, 0, 3);
wallWithDoor(3, 11, 10, 0.6, SH, FY.F2, M.creamWall, G.floor2, 0, 3);
wallWithDoor(11.5, -4, 17, WT, SH, FY.F2, M.creamWall, G.floor2, 0, 3);
wallWithDoor(11.5, 6, 17, WT, SH, FY.F2, M.creamWall, G.floor2, 0, 3);

// ═══════════════════════════════════════════════════
// FLOOR 3 — MASTER SUITE — walls
// ═══════════════════════════════════════════════════
// Outer walls
wall(-24+WT/2, 0, WT, 32, SH+2, FY.F3, M.creamWall, G.floor3);
wall(20-WT/2, 0, WT, 32, SH+2, FY.F3, M.creamWall, G.floor3);
wall(-2, -16+WT/2, 44, WT, SH+2, FY.F3, M.creamWall, G.floor3);
wall(-2, 16-WT/2, 44, WT, SH+2, FY.F3, M.creamWall, G.floor3);
// Interior walls
wallWithDoor(-8, -6.5, 19, 0.6, SH+2, FY.F3, M.creamWall, G.floor3, 0, 4);
wallWithDoor(-8, 9.5, 13, 0.6, SH+2, FY.F3, M.creamWall, G.floor3, 0, 3.5);
wallWithDoor(-16, 3, 16, WT, SH+2, FY.F3, M.creamWall, G.floor3, 0, 3.5);
wallWithDoor(6, 7, 28, WT, SH+2, FY.F3, M.creamWall, G.floor3, -4, 4);
wallWithDoor(12, 11.5, 9, 0.6, SH+2, FY.F3, M.creamWall, G.floor3, 0, 3);
