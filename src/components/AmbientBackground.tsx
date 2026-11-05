"use client";

import React, { useEffect, useRef } from "react";
import { lerp, damp, calculateParticleRepulsion } from "@/utils/liquidPhysics";

type ParticleColorRole = "mono" | "green" | "red";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  z: number; // Depth [0.25 .. 1.0] for parallax & size
  radius: number;
  phase: number;
  pulseSpeed: number;
  colorRole: ParticleColorRole;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  isRed: boolean;
}

/**
 * AmbientBackground
 * -----------------
 * Monochrome Black & White Quantum Field with Green (#00FF87 / #059669)
 * and Red (#FF3355 / #DC2626) Dual Accent Particles:
 * - 108 particles on desktop (48 on mobile) with Z-axis parallax depth.
 * - Neural Web filaments connecting nearby nodes in Monochrome, Green, and Red.
 * - Cursor repulsion physics with exponential velocity damping.
 * - Alternating Green & Red click shockwave ripples.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbPrimaryRef = useRef<HTMLDivElement>(null);
  const orbSecondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const isMobile = width < 768;
    const particleCount = isMobile ? 48 : 108;
    const connectionDistance = isMobile ? 95 : 132;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const z = 0.25 + Math.random() * 0.75;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.14 + Math.random() * 0.32) * z;
      const baseVx = Math.cos(angle) * speed;
      const baseVy = Math.sin(angle) * speed;

      const colorRole: ParticleColorRole =
        i % 3 === 0 ? "green" : i % 3 === 1 ? "red" : "mono";

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        z,
        radius: (1.1 + z * 1.8) * (i % 5 === 0 ? 1.25 : 1),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        colorRole,
      };
    });

    const shockwaves: Shockwave[] = [];
    let shockwaveCounter = 0;

    const pointer = {
      x: -9999,
      y: -9999,
      targetX: width * 0.5,
      targetY: height * 0.35,
      smoothX: width * 0.5,
      smoothY: height * 0.35,
      scrollY: window.scrollY,
      lastScrollY: window.scrollY,
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
      shockwaveCounter++;
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: isMobile ? 180 : 280,
        alpha: 0.7,
        isRed: shockwaveCounter % 2 === 0,
      });

      // Apply immediate radial impulse to nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const impulse = calculateParticleRepulsion(
          p.x,
          p.y,
          e.clientX,
          e.clientY,
          isMobile ? 160 : 240,
          5.5 * p.z
        );
        p.vx += impulse.vx;
        p.vy += impulse.vy;
      }
    };

    const onScroll = () => {
      pointer.scrollY = window.scrollY;
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    let rafId = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const isDark = document.documentElement.classList.contains("dark");
      const scrollDelta = pointer.scrollY - pointer.lastScrollY;
      pointer.lastScrollY = pointer.scrollY;

      pointer.smoothX = damp(pointer.smoothX, pointer.targetX, 3.2, dt);
      pointer.smoothY = damp(pointer.smoothY, pointer.targetY, 3.2, dt);

      // Update ambient background orbs
      const normX = pointer.smoothX / Math.max(1, width) - 0.5;
      const normY = pointer.smoothY / Math.max(1, height) - 0.5;
      if (orbPrimaryRef.current) {
        orbPrimaryRef.current.style.transform = `translate3d(${(
          normX * 120
        ).toFixed(1)}px, ${(normY * 95 - pointer.scrollY * 0.08).toFixed(
          1
        )}px, 0)`;
      }
      if (orbSecondaryRef.current) {
        orbSecondaryRef.current.style.transform = `translate3d(${(
          -normX * 100
        ).toFixed(1)}px, ${(-normY * 80 - pointer.scrollY * 0.05).toFixed(
          1
        )}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Expanding Green / Red Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += (sw.maxRadius - sw.radius) * 0.12 + 2.5;
        sw.alpha *= 0.93;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        if (sw.isRed) {
          ctx.strokeStyle = isDark
            ? `rgba(255, 51, 85, ${sw.alpha.toFixed(3)})`
            : `rgba(220, 38, 38, ${sw.alpha.toFixed(3)})`;
        } else {
          ctx.strokeStyle = isDark
            ? `rgba(0, 255, 135, ${sw.alpha.toFixed(3)})`
            : `rgba(5, 150, 105, ${sw.alpha.toFixed(3)})`;
        }
        ctx.lineWidth = 1.6;
        ctx.stroke();

        if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // 2. Update Particles Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          if (pointer.x > -1000) {
            const rep = calculateParticleRepulsion(
              p.x,
              p.y,
              pointer.x,
              pointer.y,
              isMobile ? 95 : 140,
              0.85 * p.z
            );
            p.vx += rep.vx;
            p.vy += rep.vy;
          }

          p.vx = lerp(p.vx, p.baseVx, 0.045);
          p.vy = lerp(p.vy, p.baseVy, 0.045);

          p.x += p.vx;
          p.y += p.vy - scrollDelta * 0.18 * p.z;
          p.phase += p.pulseSpeed;
        }

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // 3. Draw Neural Constellation Filaments (Monochrome + Green + Red)
      const connDistSq = connectionDistance * connectionDistance;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            const proximity = 1 - Math.sqrt(distSq) / connectionDistance;
            const alpha = proximity * (isDark ? 0.22 : 0.18) * ((p1.z + p2.z) * 0.5);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.colorRole === "red" || p2.colorRole === "red") {
              ctx.strokeStyle = isDark
                ? `rgba(255, 51, 85, ${alpha.toFixed(3)})`
                : `rgba(220, 38, 38, ${alpha.toFixed(3)})`;
            } else if (p1.colorRole === "green" || p2.colorRole === "green") {
              ctx.strokeStyle = isDark
                ? `rgba(0, 255, 135, ${alpha.toFixed(3)})`
                : `rgba(5, 150, 105, ${alpha.toFixed(3)})`;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${(alpha * 0.75).toFixed(3)})`
                : `rgba(24, 24, 27, ${(alpha * 0.65).toFixed(3)})`;
            }
            ctx.stroke();
          }
        }
      }

      // 4. Draw Quantum Particles (Monochrome White/Black + Green + Red)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const twinkle = 0.65 + 0.35 * Math.sin(p.phase);
        const alpha = Math.min(1, (0.38 + p.z * 0.55) * twinkle);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.colorRole === "green") {
          ctx.fillStyle = isDark
            ? `rgba(0, 255, 135, ${alpha.toFixed(3)})`
            : `rgba(5, 150, 105, ${(alpha * 0.9).toFixed(3)})`;
        } else if (p.colorRole === "red") {
          ctx.fillStyle = isDark
            ? `rgba(255, 51, 85, ${alpha.toFixed(3)})`
            : `rgba(220, 38, 38, ${(alpha * 0.9).toFixed(3)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${(alpha * 0.85).toFixed(3)})`
            : `rgba(24, 24, 27, ${(alpha * 0.65).toFixed(3)})`;
        }
        ctx.fill();

        // Soft outer halo on foreground accent particles
        if (p.z > 0.68 && p.colorRole !== "mono") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.6, 0, Math.PI * 2);
          if (p.colorRole === "green") {
            ctx.fillStyle = isDark
              ? `rgba(0, 255, 135, ${(alpha * 0.15).toFixed(3)})`
              : `rgba(5, 150, 105, ${(alpha * 0.12).toFixed(3)})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(255, 51, 85, ${(alpha * 0.15).toFixed(3)})`
              : `rgba(220, 38, 38, ${(alpha * 0.12).toFixed(3)})`;
          }
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    // Draw initial frame immediately on mount
    render(performance.now());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <>
      {/* Hidden SVG Optical Filter Definitions for Liquid Glass */}
      <svg
        className="pointer-events-none fixed h-0 w-0 opacity-0"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="liquid-glass-refraction"
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.016"
              numOctaves="2"
              seed="7"
              result="turbulence"
            />
            <feGaussianBlur
              in="turbulence"
              stdDeviation="2"
              result="smoothedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="smoothedNoise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Fixed Deep Ambient Layer + Interactive Particle Canvas */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-500"
        aria-hidden="true"
      >
        {/* Orb 1: Subtle Green Accent Core (Top Left) */}
        <div
          ref={orbPrimaryRef}
          className="absolute -top-40 left-[4%] h-[520px] w-[520px] md:h-[740px] md:w-[740px] rounded-full opacity-50 dark:opacity-60 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.06) 38%, transparent 72%)",
          }}
        />

        {/* Orb 2: Subtle Red Accent Counter-Balance (Right) */}
        <div
          ref={orbSecondaryRef}
          className="absolute top-[22%] -right-32 h-[480px] w-[480px] md:h-[680px] md:w-[680px] rounded-full opacity-45 dark:opacity-55 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 51, 85, 0.15) 0%, rgba(220, 38, 38, 0.06) 40%, transparent 72%)",
          }}
        />

        {/* Monochrome Architectural Hairline Grid */}
        <div className="absolute inset-0 bg-grid-masked opacity-65" />

        {/* Interactive Quantum Particle Canvas */}
        <canvas
          ref={canvasRef}
          data-testid="particle-canvas"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* Subtle Tactile Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[990] opacity-[0.025] dark:opacity-[0.032] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
    </>
  );
}
