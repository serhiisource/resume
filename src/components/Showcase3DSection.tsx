"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA, type ShowcaseProject } from "@/data/cvData";
import { ArrowUpRight, Terminal, Activity } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import MagneticButton from "@/components/MagneticButton";
import { calculateOrderBookArbitrage } from "@/utils/liquidPhysics";

gsap.registerPlugin(ScrollTrigger);

const PAIR_CONFIGS = [
  {
    name: "BTC/USDT",
    a: "BINANCE",
    b: "KRAKEN",
    basePx: 92410,
    grossSpreadPct: 0.96,
  },
  {
    name: "ETH/USDT",
    a: "BYBIT",
    b: "OKX",
    basePx: 3412,
    grossSpreadPct: 1.08,
  },
  {
    name: "SOL/USDT",
    a: "COINBASE",
    b: "BITGET",
    basePx: 218.4,
    grossSpreadPct: 1.24,
  },
];

const TRADE_VOLUMES = [
  { label: "$10K", value: 10000 },
  { label: "$25K", value: 25000 },
  { label: "$50K", value: 50000 },
  { label: "$100K", value: 100000 },
];

// Interactive L2 Order-Book Depth & Arbitrage Simulator for Arbfeld
function LiveArbfeldTerminal({ project }: { project: ShowcaseProject }) {
  const [pairIdx, setPairIdx] = useState(0);
  const [tradeVol, setTradeVol] = useState(25000);
  const [jitterPct, setJitterPct] = useState(0);

  const currentPair = PAIR_CONFIGS[pairIdx];
  const activeGrossSpread = Math.max(
    0.45,
    currentPair.grossSpreadPct + jitterPct
  );

  const exec = calculateOrderBookArbitrage(
    currentPair.basePx,
    activeGrossSpread,
    tradeVol,
    0.14
  );

  const p = currentPair.basePx;
  const asks = [
    {
      px: (p * 0.9952).toFixed(2),
      qty: "2.140",
      total: `$${Math.round(p * 2.13).toLocaleString("en-US")}`,
      depthPct: 42,
    },
    {
      px: (p * 0.9964).toFixed(2),
      qty: "4.520",
      total: `$${Math.round(p * 4.5).toLocaleString("en-US")}`,
      depthPct: 68,
    },
    {
      px: (p * 0.9978).toFixed(2),
      qty: "8.310",
      total: `$${Math.round(p * 8.29).toLocaleString("en-US")}`,
      depthPct: 94,
    },
  ];

  const bids = [
    {
      px: (p * 1.0048).toFixed(2),
      qty: "1.820",
      total: `$${Math.round(p * 1.83).toLocaleString("en-US")}`,
      depthPct: 38,
    },
    {
      px: (p * 1.0034).toFixed(2),
      qty: "3.940",
      total: `$${Math.round(p * 3.95).toLocaleString("en-US")}`,
      depthPct: 64,
    },
    {
      px: (p * 1.0019).toFixed(2),
      qty: "7.450",
      total: `$${Math.round(p * 7.46).toLocaleString("en-US")}`,
      depthPct: 92,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setJitterPct(Number(((Math.random() - 0.45) * 0.14).toFixed(2)));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/95 dark:bg-black/80 border border-black/15 dark:border-white/15 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl tabular-nums">
      {/* Terminal Top Bar: Pair Selector + Trade Volume Simulator */}
      <div className="bg-black/[0.04] dark:bg-white/[0.04] px-4 py-3 border-b border-black/10 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-accent" />
          <span className="text-[11px] text-zinc-950 dark:text-zinc-100 font-semibold tracking-wide">
            {project.terminalHeader.replace(/\s*\/\/\s*/g, " · ")}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Interactive Pair Selector */}
          <div
            role="group"
            aria-label="Select Arbitrage Trading Pair"
            className="flex items-center gap-1 bg-black/5 dark:bg-black/60 p-0.5 rounded-lg border border-black/10 dark:border-white/[0.08]"
          >
            {PAIR_CONFIGS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setPairIdx(i)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  pairIdx === i
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Interactive L2 Volume Size Selector */}
          <div
            role="group"
            aria-label="Simulate Order Volume"
            className="flex items-center gap-1 bg-black/5 dark:bg-black/60 p-0.5 rounded-lg border border-black/10 dark:border-white/[0.08]"
          >
            {TRADE_VOLUMES.map((vol) => (
              <button
                key={vol.label}
                type="button"
                onClick={() => setTradeVol(vol.value)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  tradeVol === vol.value
                    ? "bg-accent text-white dark:text-zinc-950"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {vol.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Realtime L2 Execution Telemetry Strip */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/10 dark:border-white/[0.07]">
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase block">
            Route (A ↔ B)
          </span>
          <div className="text-zinc-950 dark:text-white font-bold text-xs">
            {currentPair.a} ↔ {currentPair.b}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase block">
            L2 Slippage + Fees
          </span>
          <div className="text-accentRed font-bold text-xs">
            -{(exec.slippagePct + exec.feePct).toFixed(2)}%
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase block">
            Net Exec Spread
          </span>
          <div className="text-accent font-bold text-sm">
            +{exec.netSpreadPct.toFixed(2)}%
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase block">
            Net Profit (${(tradeVol / 1000).toFixed(0)}K)
          </span>
          <div className="text-accent font-bold text-sm">
            +${exec.netProfitUsd.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Simulated Order-Book Depth Table: RED ASKS vs GREEN BIDS with Depth Bars */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
        {/* Asks (Buy on Exchange A — Crimson Red) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-500 pb-1 border-b border-black/10 dark:border-white/[0.06] text-[10px]">
            <span className="text-accentRed font-semibold">
              ASK PX ({currentPair.a})
            </span>
            <span>QTY</span>
            <span>CUMULATIVE</span>
          </div>
          {asks.map((row, i) => (
            <div
              key={i}
              className="relative flex justify-between items-center py-1 px-1.5 rounded overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 bg-red-500/10 dark:bg-[#FF3355]/12"
                style={{ width: `${row.depthPct}%` }}
              />
              <span className="relative z-10 text-accentRed font-semibold">
                {row.px}
              </span>
              <span className="relative z-10 text-zinc-900 dark:text-zinc-200">
                {row.qty}
              </span>
              <span className="relative z-10 text-zinc-500 dark:text-zinc-400">
                {row.total}
              </span>
            </div>
          ))}
        </div>

        {/* Bids (Sell on Exchange B — Emerald Green) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-500 pb-1 border-b border-black/10 dark:border-white/[0.06] text-[10px]">
            <span className="text-accent font-semibold">
              BID PX ({currentPair.b})
            </span>
            <span>QTY</span>
            <span>CUMULATIVE</span>
          </div>
          {bids.map((row, i) => (
            <div
              key={i}
              className="relative flex justify-between items-center py-1 px-1.5 rounded overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 bg-emerald-500/10 dark:bg-[#00FF87]/12"
                style={{ width: `${row.depthPct}%` }}
              />
              <span className="relative z-10 text-accent font-semibold">
                {row.px}
              </span>
              <span className="relative z-10 text-zinc-900 dark:text-zinc-200">
                {row.qty}
              </span>
              <span className="relative z-10 text-zinc-500 dark:text-zinc-400">
                {row.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Architecture Footer */}
      <div className="px-4 py-2.5 bg-black/[0.04] dark:bg-black/65 border-t border-black/10 dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-500">
        <span>MATRIX: 31 PAIRS × 15 EXCHANGES</span>
        <span className="text-zinc-800 dark:text-zinc-300 font-semibold">
          SERVERLESS EDGE · ZERO API KEYS · FULL L2 DEPTH
        </span>
      </div>
    </div>
  );
}

export default function Showcase3DSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-project-card",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");
  const flagship = t.showcase.projects[0];
  const secondaryProjects = t.showcase.projects.slice(1);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-20 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
            01 · PRODUCTION SYSTEMS &amp; ARBFELD ENGINE
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white"
            style={{ textWrap: "balance" }}
          >
            <span>{t.showcase.titlePlain} </span>
            <span className="font-serif italic font-semibold text-accentRed">
              {t.showcase.titleSerif}
            </span>
          </h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
          {t.showcase.subtitle}
        </p>
      </div>

      {/* 1. Flagship Featured System: Arbfeld */}
      {flagship && (
        <div className="showcase-project-card mb-6">
          <LiquidGlassCard
            glowVariant="emerald"
            maxTilt={3}
            className="p-6 sm:p-9 lg:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-black/10 dark:border-white/[0.08] mb-7">
              <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                {cleanTag(flagship.badge)}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                FLAGSHIP 01 / 03
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Narrative + Metrics + CTA */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight">
                    {flagship.title}
                  </h3>
                  <div className="text-xs font-mono text-accentRed font-semibold mt-1 uppercase">
                    {flagship.subtitle}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {flagship.description}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-black/10 dark:border-white/[0.08]">
                  {flagship.metrics.map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div
                        className={`text-sm sm:text-base font-bold font-mono tabular-nums ${
                          i === 1 ? "text-accentRed" : "text-accent"
                        }`}
                      >
                        {m.value}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {flagship.link && (
                  <div className="pt-2">
                    <MagneticButton
                      href={flagship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
                    >
                      <span>
                        {(flagship.linkLabel || "OPEN ARBFELD").replace(
                          /\s*↗\s*$/,
                          ""
                        )}
                      </span>
                      <ArrowUpRight size={15} />
                    </MagneticButton>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Order-Book Simulator */}
              <div className="lg:col-span-7">
                <LiveArbfeldTerminal project={flagship} />
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      )}

      {/* 2. Side-by-Side Secondary Systems (Projects 02 & 03) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {secondaryProjects.map((project, idx) => {
          const isRed = idx === 0;
          return (
            <div key={project.id} className="showcase-project-card">
              <LiquidGlassCard
                glowVariant={isRed ? "crimson" : "emerald"}
                maxTilt={4}
                className="h-full p-6 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-black/10 dark:border-white/[0.08] mb-5">
                    <span
                      className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isRed ? "text-accentRed" : "text-accent"
                      }`}
                    >
                      {cleanTag(project.badge)}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                      0{idx + 2} / 03
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1 mb-4 uppercase">
                    {project.subtitle}
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Compact Architecture Telemetry Box */}
                <div className="bg-black/[0.03] dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-xl p-4 font-mono text-[11px] space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/[0.06]">
                    <span className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-semibold">
                      <Terminal
                        size={12}
                        className={isRed ? "text-accentRed" : "text-accent"}
                      />
                      {project.terminalHeader.replace(/\s*\/\/\s*/g, " · ")}
                    </span>
                  </div>
                  {project.terminalRows.map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-center justify-between gap-2 pt-0.5"
                    >
                      <span className="text-zinc-500">{row.left}</span>
                      <span
                        className={`font-semibold text-right ${
                          row.green
                            ? "text-accent"
                            : row.highlight
                            ? "text-accentRed"
                            : "text-zinc-800 dark:text-zinc-200"
                        }`}
                      >
                        {row.right}
                      </span>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
