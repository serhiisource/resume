"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { ArrowUpRight } from "lucide-react";

export default function WhyMeSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  return (
    <section id="why-me" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      {/* Header */}
      <div className="mb-14 space-y-3">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.whyMe.sectionTag}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span>{t.whyMe.titlePlain} </span>
          <span className="text-accent">{t.whyMe.titleSerif}</span>
        </h2>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {t.whyMe.stats.map((stat, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-mono">
              {stat.number}
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Formats Section */}
      <div className="space-y-6">
        <div className="text-sm font-semibold text-white uppercase tracking-wider pb-3 border-b border-white/[0.06] flex items-center justify-between">
          <span>{t.whyMe.formatsTitle}</span>
          <span className="text-accent font-mono text-xs">[3 OPTIONS]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.whyMe.formats.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-accent font-semibold uppercase block">
                  {f.tag}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-accent transition-colors pt-4 border-t border-white/[0.06] text-left"
              >
                <span>Request This Format</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
