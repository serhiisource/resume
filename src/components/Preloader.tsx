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
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.02,
          duration: 0.45,
          ease: "power2.inOut",
          onComplete: () => {
            setVisible(false);
            setPreloaderDone(true);
          },
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: () => setPercent(Math.round(obj.val)),
    });

    return () => {
      tl.kill();
    };
  }, [setPreloaderDone]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 bg-obsidian text-offwhite"
    >
      {/* Top row */}
      <div className="flex items-center justify-between text-xs font-mono text-muted">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          SERHII ROHOVSKYI // PORTFOLIO 2026
        </span>
        <span>WEICHS / MUNICH, DE</span>
      </div>

      {/* Center percentage */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-mono text-white flex items-baseline">
          <span>{String(percent).padStart(3, "0")}</span>
          <span className="text-accent text-3xl md:text-5xl ml-1">%</span>
        </div>
        <div className="mt-4 text-xs font-mono text-muted tracking-widest uppercase">
          Initializing Engine &amp; Visuals
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full">
        <div className="h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-accent to-red-500 transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
