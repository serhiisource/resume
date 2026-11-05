"use client";

import React, { useRef, useState, useCallback, type ReactNode } from "react";
import { calculateTilt3D } from "@/utils/liquidPhysics";

export interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum 3D tilt angle in degrees (default: 5.5) */
  maxTilt?: number;
  /** Enable 3D perspective tilt on pointer move (default: true) */
  enableTilt?: boolean;
  /** Accent tint for the specular spotlight ('emerald' | 'mint' | 'jade' | 'crimson' | 'indigo' | 'neutral') */
  glowVariant?: "emerald" | "mint" | "jade" | "crimson" | "indigo" | "neutral";
  /** Optional click handler */
  onClick?: () => void;
  /** HTML tag or semantic element */
  as?: "div" | "article" | "section";
  /** Optional test ID */
  dataTestId?: string;
}

interface RippleInstance {
  id: number;
  x: number;
  y: number;
}

const GLOW_COLORS: Record<
  NonNullable<LiquidGlassCardProps["glowVariant"]>,
  { inner: string; border: string; isRed: boolean }
> = {
  emerald: {
    inner: "rgba(16, 185, 129, 0.15)",
    border: "rgba(0, 255, 135, 0.55)",
    isRed: false,
  },
  mint: {
    inner: "rgba(0, 255, 135, 0.14)",
    border: "rgba(0, 255, 135, 0.58)",
    isRed: false,
  },
  jade: {
    inner: "rgba(255, 51, 85, 0.15)",
    border: "rgba(255, 51, 85, 0.58)",
    isRed: true,
  },
  crimson: {
    inner: "rgba(255, 51, 85, 0.16)",
    border: "rgba(255, 51, 85, 0.62)",
    isRed: true,
  },
  indigo: {
    inner: "rgba(255, 51, 85, 0.14)",
    border: "rgba(255, 51, 85, 0.52)",
    isRed: true,
  },
  neutral: {
    inner: "rgba(255, 255, 255, 0.12)",
    border: "rgba(0, 255, 135, 0.45)",
    isRed: false,
  },
};

/**
 * LiquidGlassCard
 * ---------------
 * Monochrome Black & White Liquid Glass surface with Dual Green (#00FF87 / #059669)
 * and Red (#FF3355 / #DC2626) chromatic dispersion & cursor spotlights.
 */
export default function LiquidGlassCard({
  children,
  className = "",
  maxTilt = 5.5,
  enableTilt = true,
  glowVariant = "emerald",
  onClick,
  as: Component = "div",
  dataTestId,
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<RippleInstance[]>([]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;

      if (
        e.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const tilt = calculateTilt3D(
        e.clientX,
        e.clientY,
        {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        enableTilt ? maxTilt : 0
      );

      el.style.setProperty("--spotlight-x", `${tilt.spotlightX}px`);
      el.style.setProperty("--spotlight-y", `${tilt.spotlightY}px`);
      el.style.setProperty("--glare-angle", `${tilt.glareAngle}deg`);
      el.style.setProperty("--dispersion-px", `${tilt.dispersionPx}px`);
      el.style.setProperty("--spotlight-opacity", "1");

      if (enableTilt) {
        el.style.transform = `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.008, 1.008, 1) translateZ(0)`;
      }
    },
    [enableTilt, maxTilt]
  );

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.setProperty("--spotlight-opacity", "0");
    el.style.setProperty("--dispersion-px", "0px");
    el.style.transform =
      "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)";
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();

      setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    },
    []
  );

  const palette = GLOW_COLORS[glowVariant] || GLOW_COLORS.emerald;

  return (
    <Component
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      data-testid={dataTestId}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "0%",
          "--spotlight-opacity": "0",
          "--glare-angle": "135deg",
          "--dispersion-px": "0px",
          "--glow-inner": palette.inner,
          "--glow-border": palette.border,
        } as React.CSSProperties
      }
      className={`liquid-glass-surface group/glass relative overflow-hidden rounded-2xl will-change-transform ${className}`}
    >
      {/* 1. Specular Top Edge Bevel & Green/Red Chromatic Dispersion Rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
        style={{
          boxShadow: `
            inset 0 1px 1px 0 var(--glass-bevel-top),
            inset 0 -1px 1px 0 var(--glass-bevel-bottom),
            inset 1px 0 0 0 rgba(255, 255, 255, 0.1),
            inset -1px 0 0 0 rgba(255, 255, 255, 0.06),
            inset 0 14px 28px -12px var(--glass-inner-glow),
            inset calc(var(--dispersion-px) * 1) 0 2px -1px rgba(0, 255, 135, 0.35),
            inset calc(var(--dispersion-px) * -1) 0 2px -1px rgba(255, 51, 85, 0.35)
          `,
        }}
      />

      {/* 2. Cursor-Following Green or Red Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity)",
          background: `
            radial-gradient(
              460px circle at var(--spotlight-x) var(--spotlight-y),
              var(--glow-inner),
              transparent 72%
            )
          `,
        }}
      />

      {/* 3. Specular Border Highlight Mask (Green or Red edge illumination) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity)",
          padding: "1px",
          background: `radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), var(--glow-border), transparent 72%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* 4. Fluid Ripple Waves on Click (Green or Red) */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          style={{ left: r.x, top: r.y }}
          className={`pointer-events-none absolute z-0 h-28 w-28 rounded-full animate-fluid-ripple ${
            palette.isRed
              ? "bg-red-500/20 dark:bg-[#FF3355]/20 border border-red-500/40 dark:border-[#FF3355]/45"
              : "bg-emerald-500/20 dark:bg-[#00FF87]/20 border border-emerald-500/40 dark:border-[#00FF87]/45"
          }`}
        />
      ))}

      {/* 5. Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </Component>
  );
}
