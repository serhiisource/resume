"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSelectedFilter("ALL");
  }, [lang]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solution-step-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, selectedFilter]);

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  const allLabel = lang === "de" ? "ALLE (12)" : lang === "ru" ? "ВСЕ (12)" : "ALL (12)";

  const filterGroups = [
    { id: "ALL", label: allLabel },
    {
      id: "AI",
      label: lang === "de" ? "KI & Agenten" : lang === "ru" ? "ИИ и Агенты" : "AI & Agents",
      match: [0, 1, 2, 3, 4],
    },
    {
      id: "ARCH",
      label:
        lang === "de"
          ? "Edge & Architektur"
          : lang === "ru"
          ? "Edge и Архитектура"
          : "Edge & Architecture",
      match: [0, 5, 6, 7, 8],
    },
    {
      id: "DESIGN",
      label:
        lang === "de"
          ? "3D, Media & Ops"
          : lang === "ru"
          ? "3D, Медиа и Операции"
          : "3D, Media & Ops",
      match: [9, 10, 11],
    },
  ];

  const activeGroup = filterGroups.find((g) => g.id === selectedFilter);
  const filteredSteps = t.solution.steps.filter((_, idx) =>
    !activeGroup || activeGroup.id === "ALL"
      ? true
      : activeGroup.match?.includes(idx)
  );

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]"
    >
      {/* Section Header + Interactive Filter Controls */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-accentRed uppercase tracking-wider">
            {cleanTag(t.solution.sectionTag)}
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
            style={{ textWrap: "balance" }}
          >
            <span>{t.solution.titlePlain} </span>
            <span className="font-serif italic font-semibold text-accent">
              {t.solution.titleSerif}
            </span>
          </h2>
        </div>

        {/* Interactive Capability Filter Tabs */}
        <div
          role="group"
          aria-label="Filter Capabilities"
          className="liquid-glass-nav inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl self-start"
        >
          {filterGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setSelectedFilter(group.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedFilter === group.id
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capabilities Liquid Glass Grid (Alternating Green & Red Accents) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSteps.map((step, i) => {
          const isRed = i % 2 === 1;
          return (
            <div key={step.num} className="solution-step-card">
              <LiquidGlassCard
                glowVariant={isRed ? "crimson" : "emerald"}
                maxTilt={5.5}
                className="h-full p-6"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/[0.06]">
                  <span
                    className={`font-mono text-xs font-bold tabular-nums ${
                      isRed ? "text-accentRed" : "text-accent"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">
                    {step.tag}
                  </span>
                </div>

                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                  {step.text}
                </p>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
