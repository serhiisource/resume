"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA, type PainPointCard } from "@/data/cvData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";

gsap.registerPlugin(ScrollTrigger);

function PillarDiagram({ type }: { type: PainPointCard["diagramType"] }) {
  if (type === "nodes") {
    return (
      <div className="bg-black/[0.03] dark:bg-black/55 border border-black/10 dark:border-white/[0.08] rounded-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-black/10 dark:border-white/[0.06]">
          <span className="text-accent font-semibold">MULTI-AGENT SWARM</span>
          <span className="text-zinc-500">24/7 AUTONOMOUS</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-white/80 dark:bg-white/[0.04] p-2 rounded-lg border border-black/10 dark:border-white/[0.06]">
            <div className="text-accent font-semibold">NODE 01</div>
            <div className="text-zinc-950 dark:text-white font-medium mt-0.5">
              Web Crawler
            </div>
          </div>
          <div className="bg-white/80 dark:bg-white/[0.04] p-2 rounded-lg border border-black/10 dark:border-white/[0.06]">
            <div className="text-accentRed font-semibold">NODE 02</div>
            <div className="text-zinc-950 dark:text-white font-medium mt-0.5">
              LLM Semantic
            </div>
          </div>
          <div className="bg-white/80 dark:bg-white/[0.04] p-2 rounded-lg border border-black/10 dark:border-white/[0.06]">
            <div className="text-accent font-semibold">NODE 03</div>
            <div className="text-zinc-950 dark:text-white font-medium mt-0.5">
              DB Dispatch
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "latency") {
    return (
      <div className="bg-black/[0.03] dark:bg-black/55 border border-black/10 dark:border-white/[0.08] rounded-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2 tabular-nums">
        <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-black/10 dark:border-white/[0.06]">
          <span className="text-accentRed font-semibold">ARBFELD L2 ENGINE</span>
          <span className="text-accent font-semibold">Δ 1.2ms</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">SCAN MATRIX</span>
          <span className="text-zinc-950 dark:text-white font-semibold">
            31 PAIRS × 15 EXCHANGES
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">EXECUTION DEPTH</span>
          <span className="text-accent font-semibold">
            VOLUME + SLIPPAGE + FEES
          </span>
        </div>
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="bg-black/[0.03] dark:bg-black/55 border border-black/10 dark:border-white/[0.08] rounded-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
        <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-black/10 dark:border-white/[0.06]">
          <span className="text-accent font-semibold">ENTERPRISE IT STACK</span>
          <span className="text-zinc-500">HIGH AVAILABILITY</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">INFRASTRUCTURE</span>
          <span className="text-zinc-950 dark:text-white">
            Docker · Linux · Custom APIs
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">DATA INTEGRITY</span>
          <span className="text-accent font-semibold">
            Automated Live Health Checks
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/[0.03] dark:bg-black/55 border border-black/10 dark:border-white/[0.08] rounded-xl p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
      <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-black/10 dark:border-white/[0.06]">
        <span className="text-accentRed font-semibold">PRODUCT PIPELINE</span>
        <span className="text-zinc-500">END-TO-END</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">WORKFLOW</span>
        <span className="text-zinc-950 dark:text-white">
          CAD ▹ 3D Blender ▹ Next.js
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">DELIVERY</span>
        <span className="text-accent font-semibold">
          Fast Functional Production
        </span>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];
  const [activeDomain, setActiveDomain] = useState<string>("ALL");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActiveDomain("ALL");
  }, [lang]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pillar-card-item",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  const domains = [
    { id: "ALL", label: lang === "de" ? "ALLE" : lang === "ru" ? "ВСЕ" : "ALL" },
    { id: "AI", label: "AI & AGENTS", indices: [0] },
    { id: "L2", label: "L2 ARBITRAGE", indices: [1] },
    { id: "INFRA", label: "INFRA & 3D", indices: [2, 3] },
  ];

  const currentDomain = domains.find((d) => d.id === activeDomain);
  const visibleCards = t.problem.cards.filter((_, idx) =>
    !currentDomain || currentDomain.id === "ALL"
      ? true
      : currentDomain.indices?.includes(idx)
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="py-20 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]"
    >
      {/* Editorial Section Header + Interactive Filter */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-accentRed uppercase tracking-wider">
            02 · {cleanTag(t.problem.sectionTag.replace(/^01\s*\/\/\s*/, ""))}
          </div>
          <h2
            className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white max-w-4xl leading-[1.15]"
            style={{ textWrap: "balance" }}
          >
            {t.problem.scrollStatement}
          </h2>
        </div>

        <div
          role="group"
          aria-label="Filter Architecture Pillars"
          className="liquid-glass-nav inline-flex flex-wrap items-center gap-1 p-1 rounded-xl self-start"
        >
          {domains.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDomain(d.id)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeDomain === d.id
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 Liquid Glass Engineering Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleCards.map((card, index) => {
          const isRedCard = index % 2 === 1;
          return (
            <div key={card.id} className="pillar-card-item">
              <LiquidGlassCard
                glowVariant={isRedCard ? "crimson" : "emerald"}
                maxTilt={5}
                className="h-full p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/[0.07] mb-5">
                    <span
                      className={`text-xs font-mono font-bold tabular-nums ${
                        isRedCard ? "text-accentRed" : "text-accent"
                      }`}
                    >
                      {card.id}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">
                      {cleanTag(card.tag)}
                    </span>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <PillarDiagram type={card.diagramType} />
                </div>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
