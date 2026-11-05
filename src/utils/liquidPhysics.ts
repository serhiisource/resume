/**
 * Pure mathematical & physics utilities for 60FPS Liquid Glass optics,
 * 3D perspective tilt, specular spotlight coordinates, magnetic pull,
 * particle repulsion / shockwave dynamics, and frame-rate independent inertia.
 */

export interface RectBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Tilt3DResult {
  /** Rotation around X axis in degrees (pitch) */
  rotateX: number;
  /** Rotation around Y axis in degrees (yaw) */
  rotateY: number;
  /** Cursor X position in pixels relative to element */
  spotlightX: number;
  /** Cursor Y position in pixels relative to element */
  spotlightY: number;
  /** Normalized X in range [-1, 1] */
  normX: number;
  /** Normalized Y in range [-1, 1] */
  normY: number;
  /** Specular glare angle in degrees */
  glareAngle: number;
  /** Chromatic dispersion shift in pixels */
  dispersionPx: number;
}

/**
 * Linear interpolation between start and end by factor t in [0, 1].
 */
export function lerp(start: number, end: number, t: number): number {
  const clampedT = Math.max(0, Math.min(1, t));
  return start + (end - start) * clampedT;
}

/**
 * Frame-rate independent damping using exponential decay.
 */
export function damp(
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number
): number {
  if (deltaSeconds <= 0) return current;
  return lerp(current, target, 1 - Math.exp(-lambda * deltaSeconds));
}

/**
 * Computes 3D tilt angles, spotlight coordinates, glare angle, and chromatic aberration
 * offset based on cursor client coordinates and element bounding box.
 */
export function calculateTilt3D(
  clientX: number,
  clientY: number,
  rect: RectBounds,
  maxTiltDeg = 7
): Tilt3DResult {
  if (rect.width <= 0 || rect.height <= 0) {
    return {
      rotateX: 0,
      rotateY: 0,
      spotlightX: 0,
      spotlightY: 0,
      normX: 0,
      normY: 0,
      glareAngle: 135,
      dispersionPx: 0,
    };
  }

  const spotlightX = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const spotlightY = Math.max(0, Math.min(rect.height, clientY - rect.top));

  // Normalized coordinates from -1 (left/top) to +1 (right/bottom)
  const rawNormX = (spotlightX / rect.width - 0.5) * 2;
  const rawNormY = (spotlightY / rect.height - 0.5) * 2;

  const normX = Math.max(-1, Math.min(1, rawNormX));
  const normY = Math.max(-1, Math.min(1, rawNormY));

  const rotateX = Number((-normY * maxTiltDeg).toFixed(3));
  const rotateY = Number((normX * maxTiltDeg).toFixed(3));

  const angleRad = Math.atan2(normY, normX);
  const glareAngle = Number(((angleRad * 180) / Math.PI + 90).toFixed(2));

  const distanceFromCenter = Math.min(1, Math.hypot(normX, normY));
  const dispersionPx = Number((distanceFromCenter * 1.6).toFixed(2));

  return {
    rotateX,
    rotateY,
    spotlightX: Math.round(spotlightX),
    spotlightY: Math.round(spotlightY),
    normX: Number(normX.toFixed(4)),
    normY: Number(normY.toFixed(4)),
    glareAngle,
    dispersionPx,
  };
}

export interface MagneticOffset {
  x: number;
  y: number;
  distance: number;
  active: boolean;
}

/**
 * Calculates magnetic attraction displacement for interactive buttons/links.
 */
export function calculateMagneticOffset(
  clientX: number,
  clientY: number,
  rect: RectBounds,
  strength = 0.35,
  maxDisplacement = 14
): MagneticOffset {
  if (rect.width <= 0 || rect.height <= 0) {
    return { x: 0, y: 0, distance: Infinity, active: false };
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;
  const distance = Math.hypot(deltaX, deltaY);

  const triggerRadius = Math.max(rect.width, rect.height) * 0.85;
  if (distance > triggerRadius) {
    return { x: 0, y: 0, distance: Number(distance.toFixed(2)), active: false };
  }

  const falloff = 1 - distance / (triggerRadius * 1.15);
  const rawX = deltaX * strength * falloff;
  const rawY = deltaY * strength * falloff;

  const x = Number(
    Math.max(-maxDisplacement, Math.min(maxDisplacement, rawX)).toFixed(2)
  );
  const y = Number(
    Math.max(-maxDisplacement, Math.min(maxDisplacement, rawY)).toFixed(2)
  );

  return {
    x,
    y,
    distance: Number(distance.toFixed(2)),
    active: true,
  };
}

export interface RepulsionVector {
  vx: number;
  vy: number;
}

/**
 * Computes radial repulsion velocity impulse when a particle at (px, py)
 * interacts with a cursor or expanding shockwave at (cx, cy).
 */
export function calculateParticleRepulsion(
  px: number,
  py: number,
  cx: number,
  cy: number,
  radius: number,
  forceStrength: number
): RepulsionVector {
  if (radius <= 0) return { vx: 0, vy: 0 };

  const dx = px - cx;
  const dy = py - cy;
  const distSq = dx * dx + dy * dy;
  const radiusSq = radius * radius;

  if (distSq >= radiusSq || distSq === 0) {
    return { vx: 0, vy: 0 };
  }

  const dist = Math.sqrt(distSq);
  const normDx = dx / dist;
  const normDy = dy / dist;
  // Quadratic falloff for smooth organic repulsion
  const factor = Math.pow(1 - dist / radius, 2) * forceStrength;

  return {
    vx: Number((normDx * factor).toFixed(4)),
    vy: Number((normDy * factor).toFixed(4)),
  };
}

export interface OrderBookExecutionResult {
  grossSpreadPct: number;
  slippagePct: number;
  feePct: number;
  netSpreadPct: number;
  netProfitUsd: number;
  effectiveBuyPx: number;
  effectiveSellPx: number;
}

/**
 * Pure L2 Order-Book Arbitrage execution calculator.
 * Computes volume-dependent slippage, exchange fees, net spread, and net profit in USD.
 */
export function calculateOrderBookArbitrage(
  basePrice: number,
  grossSpreadPct: number,
  tradeVolumeUsd: number,
  feePct = 0.14
): OrderBookExecutionResult {
  const safeVol = Math.max(1000, tradeVolumeUsd);
  // Nonlinear L2 order-book depth slippage model: scales with trade volume
  const slippagePct = Number(
    (0.03 + (safeVol / 100000) * 0.22).toFixed(2)
  );
  const netSpreadPct = Number(
    Math.max(0.05, grossSpreadPct - slippagePct - feePct).toFixed(2)
  );
  const netProfitUsd = Number(
    ((safeVol * netSpreadPct) / 100).toFixed(2)
  );

  const effectiveBuyPx = Number(
    (basePrice * (1 - grossSpreadPct / 200 + slippagePct / 200)).toFixed(2)
  );
  const effectiveSellPx = Number(
    (basePrice * (1 + grossSpreadPct / 200 - slippagePct / 200)).toFixed(2)
  );

  return {
    grossSpreadPct: Number(grossSpreadPct.toFixed(2)),
    slippagePct,
    feePct: Number(feePct.toFixed(2)),
    netSpreadPct,
    netProfitUsd,
    effectiveBuyPx,
    effectiveSellPx,
  };
}

