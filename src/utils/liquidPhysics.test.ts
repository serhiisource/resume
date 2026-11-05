import test from "node:test";
import assert from "node:assert/strict";
import {
  lerp,
  damp,
  calculateTilt3D,
  calculateMagneticOffset,
  calculateParticleRepulsion,
  calculateOrderBookArbitrage,
} from "./liquidPhysics";

test("lerp interpolates accurately and clamps factor t to [0, 1]", () => {
  assert.equal(lerp(0, 100, 0.5), 50);
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 1), 20);
  assert.equal(lerp(10, 20, 1.5), 20);
  assert.equal(lerp(10, 20, -0.5), 10);
});

test("damp moves value smoothly towards target", () => {
  const next = damp(0, 100, 10, 0.016);
  assert.ok(next > 0 && next < 100);
  assert.equal(damp(25, 100, 10, 0), 25);
});

test("calculateTilt3D returns neutral state when cursor is at center", () => {
  const rect = { left: 100, top: 100, width: 200, height: 100 };
  const res = calculateTilt3D(200, 150, rect, 8);
  assert.equal(res.rotateX, 0);
  assert.equal(res.rotateY, 0);
  assert.equal(res.spotlightX, 100);
  assert.equal(res.spotlightY, 50);
  assert.equal(res.normX, 0);
  assert.equal(res.normY, 0);
  assert.equal(res.dispersionPx, 0);
});

test("calculateTilt3D computes max tilt and dispersion at top-right corner", () => {
  const rect = { left: 0, top: 0, width: 300, height: 200 };
  const res = calculateTilt3D(300, 0, rect, 6);
  assert.equal(res.rotateX, 6);
  assert.equal(res.rotateY, 6);
  assert.equal(res.spotlightX, 300);
  assert.equal(res.spotlightY, 0);
  assert.equal(res.normX, 1);
  assert.equal(res.normY, -1);
  assert.equal(res.dispersionPx, 1.6);
});

test("calculateMagneticOffset pulls button toward nearby cursor and resets outside radius", () => {
  const rect = { left: 100, top: 100, width: 120, height: 48 };
  const inside = calculateMagneticOffset(180, 130, rect, 0.4, 15);
  assert.equal(inside.active, true);
  assert.ok(inside.x > 0);
  assert.ok(inside.y > 0);

  const outside = calculateMagneticOffset(500, 500, rect, 0.4, 15);
  assert.equal(outside.active, false);
  assert.equal(outside.x, 0);
  assert.equal(outside.y, 0);
});

test("calculateParticleRepulsion pushes particle away from cursor within radius", () => {
  const rep = calculateParticleRepulsion(150, 100, 100, 100, 100, 4);
  assert.ok(rep.vx > 0);
  assert.equal(rep.vy, 0);

  const outside = calculateParticleRepulsion(300, 100, 100, 100, 100, 4);
  assert.equal(outside.vx, 0);
  assert.equal(outside.vy, 0);
});

test("calculateOrderBookArbitrage computes L2 slippage, net spread, and profit accurately", () => {
  const smallTrade = calculateOrderBookArbitrage(92400, 0.95, 10000, 0.14);
  const largeTrade = calculateOrderBookArbitrage(92400, 0.95, 100000, 0.14);

  assert.ok(largeTrade.slippagePct > smallTrade.slippagePct);
  assert.ok(smallTrade.netSpreadPct > largeTrade.netSpreadPct);
  assert.ok(largeTrade.netProfitUsd > smallTrade.netProfitUsd);
  assert.ok(smallTrade.effectiveSellPx > smallTrade.effectiveBuyPx);
});

