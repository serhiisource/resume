"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA, type PainPointCard } from "@/data/cvData";
import { Cpu, Activity, ShieldCheck, Layers, ArrowUpRight } from "lucide-react";

function PillarDiagram({ type }: { type: PainPointCard["diagramType"] }) {
  if (type === "nodes") {
    return (
      <div className="bg-black/40 border border-white/[0.06] rounded-xl p-4 font-mono text-xs text-zinc-400 space-y-2">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.05]">
          <span className="text-accent font-semibold">MULTI-AGENT SWARM v3.2</span>
          <span className="text-emerald-400">● 24/7 ACTIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-white/[0.04] p-2 rounded border border-white/[0.04]">
            <div className="text-zinc-500">AGENT 01</div>
            <div className="text-white font-medium">Web Crawler</div>
          </div>
          <div className="bg-white/[0.04] p-2 rounded border border-white/[0.04]">
            <div className="text-zinc-500">AGENT 02</div>
            <div className="text-white font-medium">LLM Semantic</div>
          </div>
          <div className="bg-white/[0.04] p-2 rounded border border-white/[0.04]">
            <div className="text-zinc-500">AGENT 03</div>
            <div className="text-white font-medium">DB Dispatch</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "latency") {
    return (
      <div className="bg-black/40 border border-white/[0.06] rounded-xl p-4 font-mono text-xs text-zinc-400 space-y-2">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.05]">
          <span className="text-accent font-semibold">ARBFELD REAL-TIME L2 ENGINE</span>
          <span className="text-zinc-400">Δ 1.2ms</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">SCAN MATRIX</span>
          <span className="text-white font-semibold">31 PAIRS × 15 EXCHANGES</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">EXECUTION DEPTH</span>
          <span className="text-emerald-400 font-semibold">VOLUME + SLIPPAGE + FEES</span>
        </div>
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="bg-black/40 border border-white/[0.06] rounded-xl p-4 font-mono text-xs text-zinc-400 space-y-2">
        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.05]">
          <span className="text-accent font-semibold">ENTERPRISE IT STACK</span>
          <span className="text-emerald-400">100% UPTIME</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">INFRASTRUCTURE</span>
          <span className="text-white">Docker · Linux · Custom APIs</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-zinc-500">DATA INTEGRITY</span>
          <span className="text-zinc-300">Automated Live Health Checks</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 border border-white/[0.06] rounded-xl p-4 font-mono text-xs text-zinc-400 space-y-2">
      <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.05]">
        <span className="text-accent font-semibold">PRODUCT PIPELINE</span>
        <span className="text-zinc-400">END-TO-END</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">WORKFLOW</span>
        <span className="text-white">CAD ▹ 3D Blender ▹ Next.js</span>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">SPEED</span>
        <span className="text-emerald-400 font-semibold">Fast Functional Production</span>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];

  return (
    <section id="problem" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      {/* Header Tag */}
      <div className="mb-12 space-y-3">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.problem.sectionTag}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-4xl">
          {t.problem.scrollStatement}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl pt-2">
          {t.problem.subhead}
        </p>
      </div>

      {/* 2x2 Clean Modern Engineering Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.problem.cards.map((card) => (
          <div
            key={card.id}
            className="glass-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-6"
          >
            {/* Top row */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <span className="text-xs font-mono font-bold text-accent">[{card.id}]</span>
              <span className="text-[11px] font-mono uppercase bg-white/[0.04] text-zinc-300 px-3 py-1 rounded-full border border-white/[0.06]">
                {card.tag}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2.5">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>

            {/* High-tech Diagram / Telemetry */}
            <div className="pt-2">
              <PillarDiagram type={card.diagramType} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
