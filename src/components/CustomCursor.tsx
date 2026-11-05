"use client";

import React, { useEffect, useRef, useState } from "react";
import { damp } from "@/utils/liquidPhysics";

/**
 * CustomCursor
 * ------------
 * Dual-layer smooth cursor with:
 * - Instant inner precision core
 * - Exponentially damped outer ring with mix-blend-mode: difference
 * - Elastic expansion when hovering interactive elements (a, button, [data-magnetic])
 * - Automatically disabled on touch devices and prefers-reduced-motion
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const state = {
      targetX: -100,
      targetY: -100,
      ringX: -100,
      ringY: -100,
      scale: 1,
      targetScale: 1,
      visible: false,
    };

    const onPointerMove = (e: PointerEvent) => {
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      if (!state.visible) {
        state.ringX = e.clientX;
        state.ringY = e.clientY;
        state.visible = true;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, [data-magnetic], input, select, textarea, [role='button']")
      );
      state.targetScale = isInteractive ? 1.65 : 1;
    };

    const onPointerLeave = () => {
      state.visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    let rafId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (state.visible && ringRef.current) {
        state.ringX = damp(state.ringX, state.targetX, 14, dt);
        state.ringY = damp(state.ringY, state.targetY, 14, dt);
        state.scale = damp(state.scale, state.targetScale, 12, dt);

        ringRef.current.style.opacity = "1";
        ringRef.current.style.transform = `translate3d(${state.ringX.toFixed(
          1
        )}px, ${state.ringY.toFixed(
          1
        )}px, 0) translate(-50%, -50%) scale3d(${state.scale.toFixed(
          3
        )}, ${state.scale.toFixed(3)}, 1)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer Spring Ring with mix-blend-mode: difference */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-7 w-7 rounded-full border border-white/45 bg-white/[0.03] mix-blend-difference opacity-0 will-change-transform transition-colors duration-200"
      />
      {/* Inner Precision Core */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 will-change-transform"
      />
    </div>
  );
}
