"use client";

import React, { useRef, useState, useCallback, type ReactNode } from "react";
import { calculateMagneticOffset } from "@/utils/liquidPhysics";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  maxDisplacement?: number;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface RippleWave {
  id: number;
  x: number;
  y: number;
}

/**
 * MagneticButton
 * --------------
 * Wraps a <button> or <a> element with:
 * - Elastic spring physics pulling the control toward the cursor within 30-50px
 * - Translucent Emerald Fluid Ripple wave on click
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  strength = 0.36,
  maxDisplacement = 12,
  ariaLabel,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<RippleWave[]>([]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (
        disabled ||
        e.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const offset = calculateMagneticOffset(
        e.clientX,
        e.clientY,
        {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        strength,
        maxDisplacement
      );

      el.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${(
          offset.x * 0.35
        ).toFixed(2)}px, ${(offset.y * 0.35).toFixed(2)}px, 0)`;
      }
    },
    [disabled, strength, maxDisplacement]
  );

  const handlePointerLeave = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = "translate3d(0px, 0px, 0)";
    }
    if (innerRef.current) {
      innerRef.current.style.transform = "translate3d(0px, 0px, 0)";
    }
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const el = wrapperRef.current;
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
    [disabled]
  );

  const sharedClasses = `magnetic-interactive relative overflow-hidden inline-flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform whitespace-nowrap shrink-0 ${className}`;

  if (href) {
    return (
      <a
        ref={wrapperRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-magnetic="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        className={sharedClasses}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden="true"
            style={{ left: r.x, top: r.y }}
            className="pointer-events-none absolute z-0 h-16 w-16 rounded-full bg-white/35 dark:bg-[#00FF87]/35 animate-fluid-ripple"
          />
        ))}
        <span
          ref={innerRef}
          className="relative z-10 inline-flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        >
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={wrapperRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-magnetic="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={sharedClasses}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          style={{ left: r.x, top: r.y }}
          className="pointer-events-none absolute z-0 h-16 w-16 rounded-full bg-emerald-500/30 dark:bg-[#00FF87]/35 animate-fluid-ripple"
        />
      ))}
      <span
        ref={innerRef}
        className="relative z-10 inline-flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      >
        {children}
      </span>
    </button>
  );
}
