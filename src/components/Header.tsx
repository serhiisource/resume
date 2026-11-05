"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA, type Language } from "@/data/cvData";
import { Mail } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ThemeToggle from "@/components/ThemeToggle";

const LANGS: Language[] = ["de", "en", "ru"];

export default function Header() {
  const { lang, switchLanguage, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, pct)));

      const sections = ["intro", "showcase", "problem", "cv"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "intro", label: t.nav.intro },
    { id: "showcase", label: t.nav.showcase },
    { id: "problem", label: t.nav.problem },
    { id: "cv", label: t.nav.cv },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[800] liquid-glass-nav border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Dual Green & Red Signal Dots */}
        <a
          href="#intro"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("intro");
          }}
          className="text-sm sm:text-base font-bold tracking-tight text-zinc-950 dark:text-white hover:text-accent transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2.5"
        >
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-2 w-2 rounded-full bg-accentRed" />
          </span>
          <span>Serhii Rohovskyi</span>
        </a>

        {/* Zone 2: Clean Section Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 text-xs font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-black/5 dark:bg-white/10 text-zinc-950 dark:text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Unified Controls (Theme + Language + Contact CTA) */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />

          <div
            role="group"
            aria-label="Select Language"
            className="inline-flex items-center gap-0.5 rounded-xl bg-black/5 dark:bg-white/[0.06] p-1 border border-black/10 dark:border-white/10"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                className={`px-2.5 py-1 text-[11px] font-mono font-semibold uppercase rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  lang === l
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <MagneticButton
            onClick={() => setIsDrawerOpen(true)}
            className="btn-accent-red text-xs font-semibold px-3.5 py-2 rounded-xl"
          >
            <Mail size={13} />
            <span className="hidden sm:inline">{t.meta.ctaButton}</span>
          </MagneticButton>
        </div>
      </div>

      {/* Razor-Thin Scroll Progress Hairline */}
      <div className="h-[1.5px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00FF87] via-white to-[#FF3355] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
