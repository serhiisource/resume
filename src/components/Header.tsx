"use client";

import { useApp } from "@/context/AppContext";
import { CV_DATA, type Language } from "@/data/cvData";
import { Mail, ArrowUpRight } from "lucide-react";

const LANGS: Language[] = ["de", "en", "ru"];

export default function Header() {
  const { lang, switchLanguage, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[800] bg-obsidian/85 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo / Name & Status */}
        <div className="flex items-center gap-4">
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("intro");
            }}
            className="text-sm font-semibold tracking-tight text-white hover:text-accent transition-colors"
          >
            Serhii Rohovskyi
          </a>
          <span className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline">{t.meta.locationShort}</span>
            <span className="text-zinc-500 hidden md:inline">·</span>
            <span className="text-emerald-400 font-medium">Available</span>
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.07] rounded-full px-3 py-1">
          <button
            onClick={() => scrollTo("intro")}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1 transition-colors"
          >
            {t.nav.intro}
          </button>
          <button
            onClick={() => scrollTo("showcase")}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1 transition-colors"
          >
            {t.nav.showcase}
          </button>
          <button
            onClick={() => scrollTo("solution")}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1 transition-colors"
          >
            {t.nav.solution}
          </button>
          <button
            onClick={() => scrollTo("cv")}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1 transition-colors"
          >
            {t.nav.cv}
          </button>
          <button
            onClick={() => scrollTo("why-me")}
            className="text-xs text-zinc-400 hover:text-white px-3 py-1 transition-colors"
          >
            {t.nav.why}
          </button>
        </nav>

        {/* Right side: Language Switcher + Contact Button */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full uppercase transition-all ${
                  lang === l
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium bg-accent text-white px-3.5 py-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm"
          >
            <Mail size={13} />
            <span className="hidden sm:inline">{t.meta.ctaButton}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
