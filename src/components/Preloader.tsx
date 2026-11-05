"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import gsap from "gsap";

export default function Preloader() {
  const { setPreloaderDone } = useApp();
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (params.get("autostart") === "1" || reducedMotion) {
      setPercent(100);
      setVisible(false);
      setPreloaderDone(true);
      return;
    }

    const failsafe = window.setTimeout(() => {
      setPercent(100);
      setVisible(false);
      setPreloaderDone(true);
    }, 650);

    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            window.clearTimeout(failsafe);
            setVisible(false);
            setPreloaderDone(true);
          },
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => setPercent(Math.round(obj.val)),
    });

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
    };
  }, [setPreloaderDone]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 bg-obsidian text-offwhite"
    >
      {/* Top row */}
      <div className="flex items-center justify-between text-xs font-mono text-muted">
        <span>SERHII ROHOVSKYI · PORTFOLIO 2026</span>
        <span>WEICHS / MUNICH, DE</span>
      </div>

      {/* Center percentage */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-mono tabular-nums text-zinc-950 dark:text-white flex items-baseline">
          <span>{String(percent).padStart(3, "0")}</span>
          <span className="text-accentRed text-3xl md:text-5xl ml-1">%</span>
        </div>
        <div className="mt-4 text-xs font-mono text-muted tracking-widest uppercase">
          Monochrome Quantum Field · Green &amp; Red Optics
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full">
        <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#FF3355] via-white to-[#00FF87] transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
