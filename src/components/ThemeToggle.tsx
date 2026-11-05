"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle
 * -----------
 * Liquid droplet theme switcher button for Monochrome Black & White
 * with Dual Green (#00FF87) and Red (#FF3355) Accent Indicators.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      data-testid="theme-toggle"
      className={`liquid-glass-nav group relative inline-flex items-center gap-2 rounded-xl p-1 pr-3 text-xs font-mono font-semibold transition-all duration-500 ease-spring whitespace-nowrap shrink-0 ${className}`}
    >
      {/* Morphing Monochrome Liquid Droplet Indicator */}
      <span
        className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-500 ease-elastic ${
          isDark
            ? "bg-white text-zinc-950 shadow-[0_0_16px_rgba(255,255,255,0.35)]"
            : "bg-zinc-950 text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
        }`}
      >
        <Sun
          size={14}
          className={`absolute transition-all duration-500 ease-elastic ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          size={14}
          className={`absolute transition-all duration-500 ease-elastic ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>

      {/* Dual Green & Red Accent Dots + Theme Label */}
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="h-1.5 w-1.5 rounded-full bg-accentRed" />
        <span className="text-[11px] tracking-wider uppercase text-zinc-800 dark:text-zinc-100 group-hover:text-accent transition-colors">
          {isDark ? "MONO DARK" : "MONO LIGHT"}
        </span>
      </span>
    </button>
  );
}
