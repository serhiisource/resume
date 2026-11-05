"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import {
  ArrowUpRight,
  Mail,
  ChevronRight,
  Activity,
  Cpu,
  Layers,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import MagneticButton from "@/components/MagneticButton";

export default function HeroSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".kinetic-word",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-metric-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const formatCleanLabel = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  const icons = [Activity, Layers, Cpu, ShieldCheck];

  return (
    <section
      ref={heroRef}
      id="intro"
      className="relative pt-28 sm:pt-36 pb-16 px-5 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Status Kicker */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div className="inline-flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-accent font-semibold tracking-wider uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{formatCleanLabel(t.hero.badge)}</span>
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            {t.meta.locationShort}
          </span>
        </div>

        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:flex items-center gap-2">
          <span className="text-accent font-semibold">● LIVE</span>
          <span>ARBFELD.GITHUB.IO</span>
        </div>
      </div>

      {/* Main Kinetic Display Headline & Editorial Lead */}
      <div className="max-w-5xl space-y-6">
        <div className="space-y-3">
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.02]"
            style={{ textWrap: "balance" }}
          >
            {t.hero.name.split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block overflow-hidden mr-4 pb-1 align-bottom"
              >
                <span className="kinetic-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-800 dark:text-zinc-200 font-semibold tracking-tight">
            <span>{t.hero.roles}</span>
          </p>
        </div>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed max-w-3xl">
          {t.hero.lead}
        </p>

        {/* Magnetic Action Controls: Green Primary + Red Secondary + Monochrome CV Anchor */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          <MagneticButton
            href="https://arbfeld.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent px-6 py-3.5 rounded-xl text-sm font-semibold"
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowUpRight size={16} />
          </MagneticButton>

          <MagneticButton
            onClick={() => setIsDrawerOpen(true)}
            className="btn-accent-red px-6 py-3.5 rounded-xl text-sm font-semibold"
          >
            <Mail size={16} />
            <span>{t.hero.secondaryCta}</span>
          </MagneticButton>

          <MagneticButton
            onClick={() => scrollTo("showcase")}
            strength={0.22}
            className="liquid-glass-nav px-5 py-3.5 rounded-xl text-sm font-medium text-zinc-900 dark:text-white hover:border-black/30 dark:hover:border-white/35 transition-colors"
          >
            <span>{t.nav.showcase}</span>
            <ChevronRight size={16} className="text-accent" />
          </MagneticButton>
        </div>
      </div>

      {/* Streamlined 4-Column Quantitative Architecture Bar */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.whyMe.stats.map((stat, i) => {
          const Icon = icons[i % icons.length];
          const isRed = i % 2 === 1;
          return (
            <div key={i} className="hero-metric-card">
              <LiquidGlassCard
                glowVariant={isRed ? "crimson" : "emerald"}
                maxTilt={4.5}
                className="h-full p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono tabular-nums text-zinc-950 dark:text-white">
                    {stat.number}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                      isRed
                        ? "border-red-500/25 bg-red-500/10 text-accentRed"
                        : "border-emerald-500/25 bg-emerald-500/10 text-accent"
                    }`}
                  >
                    <Icon size={15} />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                  {stat.label}
                </p>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
