"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { ArrowUpRight } from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import MagneticButton from "@/components/MagneticButton";

export default function WhyMeSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  return (
    <section
      id="why-me"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]"
    >
      {/* Header */}
      <div className="mb-14 space-y-3">
        <div className="text-xs font-mono font-semibold text-accentRed uppercase tracking-wider">
          {cleanTag(t.whyMe.sectionTag)}
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
          style={{ textWrap: "balance" }}
        >
          <span>{t.whyMe.titlePlain} </span>
          <span className="font-serif italic font-semibold text-accent">
            {t.whyMe.titleSerif}
          </span>
        </h2>
      </div>

      {/* 4 Quantitative Stats Cards (Alternating Green & Red Spotlights) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {t.whyMe.stats.map((stat, i) => {
          const isRed = i % 2 === 1;
          return (
            <LiquidGlassCard
              key={i}
              glowVariant={isRed ? "crimson" : "emerald"}
              maxTilt={6}
              className="p-6 sm:p-7"
            >
              <div
                className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-mono tabular-nums mb-4 ${
                  isRed ? "text-accentRed" : "text-accent"
                }`}
              >
                {stat.number}
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {stat.label}
              </p>
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Formats Section */}
      <div className="space-y-6">
        <div className="text-sm font-semibold text-zinc-950 dark:text-white uppercase tracking-wider pb-3 border-b border-black/10 dark:border-white/[0.08] flex items-center justify-between">
          <span>{t.whyMe.formatsTitle}</span>
          <span className="text-accentRed font-mono text-xs tabular-nums">
            03 FORMATS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.whyMe.formats.map((f, i) => {
            const isRed = i === 1;
            return (
              <LiquidGlassCard
                key={i}
                glowVariant={isRed ? "crimson" : "emerald"}
                maxTilt={5.5}
                className="p-6 sm:p-7"
              >
                <div className="space-y-3 mb-6">
                  <span
                    className={`text-[11px] font-mono font-semibold uppercase block ${
                      isRed ? "text-accentRed" : "text-accent"
                    }`}
                  >
                    {cleanTag(f.tag)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/[0.07]">
                  <MagneticButton
                    onClick={() => setIsDrawerOpen(true)}
                    strength={0.25}
                    className="text-xs font-semibold text-zinc-950 dark:text-white hover:text-accent transition-colors py-1"
                  >
                    <span>
                      {lang === "de"
                        ? "Format anfragen"
                        : lang === "ru"
                        ? "Запросить формат"
                        : "Request Format"}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className={isRed ? "text-accentRed" : "text-accent"}
                    />
                  </MagneticButton>
                </div>
              </LiquidGlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
