"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import {
  ArrowUpRight,
  User,
  Code2,
  Globe,
  Briefcase,
  GraduationCap,
  Copy,
  Check,
} from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import MagneticButton from "@/components/MagneticButton";

export default function LebenslaufSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  return (
    <section
      id="cv"
      className="py-20 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]"
    >
      {/* Header */}
      <div className="mb-12 space-y-2.5">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          03 · {cleanTag(t.cv.sectionTag.replace(/^04\s*\/\/\s*/, ""))}
        </div>
        <h2
          className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
          style={{ textWrap: "balance" }}
        >
          <span>{t.cv.titlePlain} </span>
          <span className="font-serif italic font-semibold text-accentRed">
            {t.cv.titleSerif}
          </span>
        </h2>
      </div>

      {/* Two-Column Executive CV Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Career & Education Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* 1. Career Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
              <Briefcase size={15} className="text-accent" />
              <span>{t.cv.careerHeading}</span>
            </div>

            <div className="space-y-4">
              {t.cv.career.map((item, idx) => {
                const isRed = idx === 1;
                return (
                  <LiquidGlassCard
                    key={idx}
                    glowVariant={isRed ? "crimson" : "emerald"}
                    maxTilt={3.5}
                    className="p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-black/10 dark:border-white/[0.06]">
                        <span
                          className={`text-xs font-mono font-semibold tabular-nums ${
                            idx === 0
                              ? "text-accent"
                              : isRed
                              ? "text-accentRed"
                              : "text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          {item.period}
                        </span>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-accent hover:underline flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                          >
                            <span>ARBFELD LIVE</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                        {item.role}
                      </h3>

                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 mb-3">
                        {item.company}
                      </div>

                      <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5">
                              ▹
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </LiquidGlassCard>
                );
              })}
            </div>
          </div>

          {/* 2. Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
              <GraduationCap size={15} className="text-accentRed" />
              <span>{t.cv.educationHeading}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.cv.education.map((item, idx) => (
                <LiquidGlassCard
                  key={idx}
                  glowVariant={idx === 0 ? "crimson" : "emerald"}
                  maxTilt={4}
                  className="p-5"
                >
                  <div>
                    <div className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 tabular-nums">
                      {item.period}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white tracking-tight mb-1">
                      {item.role}
                    </h3>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
                      {item.company}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      {item.bullets[0]}
                    </p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Column: Personal Dossier (with 1-Click Copy), Stack & Languages (5 cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          {/* Personal Info Card */}
          <LiquidGlassCard glowVariant="mint" maxTilt={3.5} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/[0.07] text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <User size={15} className="text-accent" />
                  <span>{t.cv.personalHeading}</span>
                </span>
                <span className="text-accent">2026</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {t.cv.personal.map((p, i) => {
                  const isCopyable = Boolean(p.href);
                  return (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-black/10 dark:border-white/[0.05] pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                        {p.label}
                      </span>
                      <div className="flex items-center gap-2 sm:justify-end">
                        {p.href ? (
                          <a
                            href={p.href}
                            className="text-zinc-950 dark:text-white hover:text-accent font-medium transition-colors"
                          >
                            {p.value}
                          </a>
                        ) : (
                          <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                            {p.value}
                          </span>
                        )}
                        {isCopyable && (
                          <button
                            type="button"
                            onClick={() => handleCopy(p.value, p.label)}
                            aria-label={`Copy ${p.label}`}
                            className="text-zinc-400 hover:text-accent transition-colors"
                          >
                            {copiedKey === p.label ? (
                              <Check size={12} className="text-accent" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </LiquidGlassCard>

          {/* Skill Groups Card */}
          <LiquidGlassCard glowVariant="crimson" maxTilt={3.5} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-black/10 dark:border-white/[0.07] text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
                <Code2 size={15} className="text-accentRed" />
                <span>{t.cv.skillsHeading}</span>
              </div>

              <div className="space-y-3.5">
                {t.cv.skillGroups.map((group, idx) => (
                  <div
                    key={idx}
                    className="space-y-1 pb-2.5 border-b border-black/10 dark:border-white/[0.05] last:border-0 last:pb-0"
                  >
                    <div
                      className={`text-xs font-mono font-semibold ${
                        idx % 2 === 0 ? "text-accent" : "text-accentRed"
                      }`}
                    >
                      0{idx + 1}. {group.category}
                    </div>
                    <div className="text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed">
                      {group.items.join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </LiquidGlassCard>

          {/* Languages Card */}
          <LiquidGlassCard glowVariant="emerald" maxTilt={3.5} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-black/10 dark:border-white/[0.07] text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
                <Globe size={15} className="text-accent" />
                <span>{t.cv.languagesHeading}</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {t.cv.languages.map((l, i) => (
                  <div
                    key={i}
                    className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.06] p-3 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-zinc-950 dark:text-white">
                      {l.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-accent">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Integrated Collaboration Formats Row */}
      <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/[0.08]">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
            {t.whyMe.formatsTitle}
          </span>
          <span className="text-xs font-mono text-accentRed font-semibold">
            03 FORMATS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.whyMe.formats.map((f, i) => {
            const isRed = i === 1;
            return (
              <LiquidGlassCard
                key={i}
                glowVariant={isRed ? "crimson" : "emerald"}
                maxTilt={4.5}
                className="p-6"
              >
                <div className="space-y-2.5 mb-5">
                  <span
                    className={`text-[11px] font-mono font-semibold uppercase block ${
                      isRed ? "text-accentRed" : "text-accent"
                    }`}
                  >
                    {cleanTag(f.tag)}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 dark:border-white/[0.07]">
                  <MagneticButton
                    onClick={() => setIsDrawerOpen(true)}
                    strength={0.22}
                    className="text-xs font-semibold text-zinc-950 dark:text-white hover:text-accent transition-colors py-0.5"
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
