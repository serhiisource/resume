"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { ArrowUpRight, Mail } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function FooterSection() {
  const { lang, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  return (
    <footer className="py-24 pb-32 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-black/10 dark:border-white/[0.08]">
      <div className="space-y-8">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          04 · {cleanTag(t.footer.sectionTag.replace(/^06\s*\/\/\s*/, ""))}
        </div>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white max-w-4xl leading-[1.08]"
          style={{ textWrap: "balance" }}
        >
          <span>{t.footer.titleLine1} </span>
          <span className="font-serif italic font-semibold text-accent">
            {t.footer.titleSerif}{" "}
          </span>
          <span className="text-accentRed font-mono text-[0.78em]">
            {t.footer.titlePixel}
          </span>
        </h2>

        {/* Magnetic CTAs: Green Primary + Red Secondary */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <MagneticButton
            onClick={() => setIsDrawerOpen(true)}
            className="btn-accent px-6 py-4 rounded-xl text-sm font-semibold"
          >
            <Mail size={16} />
            <span>{t.footer.ctaPrimary}</span>
          </MagneticButton>

          <MagneticButton
            href="https://arbfeld.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent-red px-6 py-4 rounded-xl text-sm font-semibold"
          >
            <span>{t.footer.ctaSecondary.replace(/\s*↗\s*$/, "")}</span>
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        {/* Quiet Copyright & Location Row */}
        <div className="pt-16 mt-16 border-t border-black/10 dark:border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <div>SERHII ROHOVSKYI · WEICHS (85258) / MUNICH, GERMANY</div>
          <div>ARBFELD.GITHUB.IO · © 2026</div>
        </div>
      </div>
    </footer>
  );
}
