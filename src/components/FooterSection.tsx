"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { ArrowUpRight, Mail } from "lucide-react";

export default function FooterSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  return (
    <footer className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      <div className="space-y-8">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.footer.sectionTag}
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
          <span>{t.footer.titleLine1} </span>
          <span className="text-accent">{t.footer.titleSerif} </span>
          <span className="text-zinc-400 font-mono text-[0.8em]">{t.footer.titlePixel}</span>
        </h2>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn-accent inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-all"
          >
            <Mail size={16} />
            <span>{t.footer.ctaPrimary}</span>
          </button>

          <a
            href="https://arbfeld.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.18] transition-all"
          >
            <span>{t.footer.ctaSecondary}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Bottom row */}
        <div className="pt-16 mt-16 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            SERHII ROHOVSKYI · WEICHS (85258) / MUNICH, GERMANY
          </div>
          <div>
            NEXT.JS · TYPESCRIPT · DOCKER · TAILWIND
          </div>
        </div>
      </div>
    </footer>
  );
}
