"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { CheckCircle2 } from "lucide-react";

export default function SolutionSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];

  return (
    <section id="solution" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      {/* Section Header */}
      <div className="mb-14 space-y-3">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.solution.sectionTag}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span>{t.solution.titlePlain} </span>
          <span className="text-accent">{t.solution.titleSerif}</span>
        </h2>
      </div>

      {/* Modern 2-column or 3-column capabilities grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.solution.steps.map((step) => (
          <div
            key={step.num}
            className="glass-card rounded-xl p-5 flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">
                {step.num}
              </span>
              <span className="text-[10px] font-mono uppercase bg-white/[0.04] text-zinc-400 px-2.5 py-0.5 rounded border border-white/[0.05] group-hover:border-accent/40 group-hover:text-accent transition-colors">
                {step.tag}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
