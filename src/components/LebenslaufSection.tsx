"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { ArrowUpRight, User, Code2, Globe, Briefcase, GraduationCap } from "lucide-react";

export default function LebenslaufSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];

  return (
    <section id="cv" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      {/* Header */}
      <div className="mb-14 space-y-3">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.cv.sectionTag}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span>{t.cv.titlePlain} </span>
          <span className="text-accent">{t.cv.titleSerif}</span>
        </h2>
      </div>

      {/* Two-Column Master Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Career & Education Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          {/* 1. Career Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white uppercase tracking-wider">
              <Briefcase size={16} className="text-accent" />
              <span>{t.cv.careerHeading}</span>
            </div>

            <div className="space-y-6 pl-4 border-l border-zinc-800">
              {t.cv.career.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-6 relative group"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[23px] top-6 w-3 h-3 rounded-full bg-zinc-900 border-2 border-accent group-hover:bg-accent transition-colors" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-accent">
                      {item.period}
                    </span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-accent flex items-center gap-1 transition-colors"
                      >
                        <span>LIVE</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.role}
                  </h3>

                  <div className="text-xs font-medium text-zinc-400 mb-4">
                    {item.company}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300/90 leading-relaxed">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent shrink-0 mt-1">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white uppercase tracking-wider">
              <GraduationCap size={16} className="text-accent" />
              <span>{t.cv.educationHeading}</span>
            </div>

            <div className="space-y-6 pl-4 border-l border-zinc-800">
              {t.cv.education.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-6 relative group"
                >
                  <div className="absolute -left-[23px] top-6 w-3 h-3 rounded-full bg-zinc-900 border-2 border-accent group-hover:bg-accent transition-colors" />

                  <div className="text-xs font-mono font-semibold text-accent mb-2">
                    {item.period}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mb-1">
                    {item.role}
                  </h3>

                  <div className="text-xs text-zinc-400 mb-3">
                    {item.company}
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300/90">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent shrink-0 mt-1">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Personal Data & Skills (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Personal Info Card */}
          <div className="glass-card rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06] text-sm font-semibold text-white uppercase tracking-wider">
              <User size={16} className="text-accent" />
              <span>{t.cv.personalHeading}</span>
            </div>

            <div className="space-y-3 text-xs">
              {t.cv.personal.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-white/[0.04] pb-2 last:border-0"
                >
                  <span className="text-zinc-500 font-mono text-[11px]">{p.label}</span>
                  {p.href ? (
                    <a
                      href={p.href}
                      className="text-white hover:text-accent font-medium transition-colors"
                    >
                      {p.value}
                    </a>
                  ) : (
                    <span className="text-zinc-200 font-medium">{p.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skill Groups Card */}
          <div className="glass-card rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06] text-sm font-semibold text-white uppercase tracking-wider">
              <Code2 size={16} className="text-accent" />
              <span>{t.cv.skillsHeading}</span>
            </div>

            <div className="space-y-4">
              {t.cv.skillGroups.map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-[11px] font-mono font-medium text-accent">
                    // {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded text-zinc-300 hover:border-white/20 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Card */}
          <div className="glass-card rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06] text-sm font-semibold text-white uppercase tracking-wider">
              <Globe size={16} className="text-accent" />
              <span>{t.cv.languagesHeading}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {t.cv.languages.map((l, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-lg flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-white">{l.name}</span>
                  <span className="text-[11px] text-accent font-mono mt-1 font-medium">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
