"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Milestone,
} from "lucide-react";

export default function HeroSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="intro" className="relative pt-32 pb-20 px-5 sm:px-8 max-w-7xl mx-auto z-10">
      {/* 1. TOP HERO BADGE & TITLE */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-xs font-semibold px-3 py-1 rounded-full">
          <Sparkles size={13} />
          <span>{t.hero.badge}</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            {t.hero.name}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-300 font-medium tracking-tight">
            {t.hero.roles}
          </p>
        </div>

        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-3xl">
          {t.hero.lead}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="https://arbfeld.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowUpRight size={16} />
          </a>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.18] transition-all"
          >
            <Mail size={16} />
            <span>{t.hero.secondaryCta}</span>
          </button>

          <button
            onClick={() => scrollTo("cv")}
            className="inline-flex items-center gap-1.5 px-4 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <span>Lebenslauf / CV</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 2. BENTO DOSSIER: WHO I AM + STACK + PATH */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Identity & Profile (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t.hero.dossierTitle}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">2026</span>
            </div>

            <div className="space-y-3 text-xs">
              {t.hero.profileMeta.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-white/[0.04] pb-2 last:border-0"
                >
                  <span className="text-zinc-500 font-mono text-[11px]">{item.label}</span>
                  <span
                    className={`font-medium text-right ${
                      item.highlight ? "text-accent font-semibold" : "text-zinc-200"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>RESIDENCY</span>
            <span className="text-emerald-400 font-medium">Bavaria / Munich Area</span>
          </div>
        </div>

        {/* Card 2: Core Engineering Stack (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu size={14} className="text-accent" />
                {t.hero.skillsTitle}
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">CORE CAPABILITIES</span>
            </div>

            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Specialized in autonomous AI agents, multi-agent pipelines, low-latency edge systems,
              and full-stack execution.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {t.hero.coreSkillChips.map((chip, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-lg text-zinc-300 hover:text-white hover:border-white/20 transition-all cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] text-zinc-500 font-mono flex items-center justify-between">
            <span>STACK</span>
            <span className="text-zinc-300 font-medium">Python · Docker · Next.js · TS</span>
          </div>
        </div>

        {/* Card 3: The Journey / Story (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
              <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Milestone size={14} className="text-accent" />
                {t.hero.journeyTitle}
              </span>
              <span className="text-[11px] text-accent font-mono font-medium">
                {t.hero.journeyBadge}
              </span>
            </div>

            <div className="space-y-3.5">
              {t.hero.journeyMilestones.map((m, i) => (
                <div key={i} className="group/item relative pl-3.5 border-l border-zinc-800 hover:border-accent transition-colors">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-0.5">
                    <span className="text-accent font-semibold">{m.year}</span>
                    <span className="text-zinc-500 text-[10px] uppercase bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05]">
                      {m.tag}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 group-hover/item:text-white transition-colors">
                    {m.role}
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                    {m.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] text-zinc-500 font-mono flex items-center justify-between">
            <span>CAREER</span>
            <button
              onClick={() => scrollTo("cv")}
              className="text-white hover:text-accent font-medium transition-colors"
            >
              Full Timeline ▹
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
