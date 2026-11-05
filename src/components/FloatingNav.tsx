"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA, type Language } from "@/data/cvData";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_IDS = ["intro", "problem", "showcase", "solution", "cv", "why-me"] as const;
const LANGS: Language[] = ["de", "en", "ru"];

export default function FloatingNav() {
  const { lang, switchLanguage, theme, toggleTheme, preloaderDone } = useApp();
  const t = CV_DATA[lang];
  const [activeSection, setActiveSection] = useState("intro");
  const [isScrolled, setIsScrolled] = useState(false);

  const labels = [
    t.nav.intro,
    t.nav.problem,
    t.nav.showcase,
    t.nav.solution,
    t.nav.cv,
    t.nav.why,
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;

    const triggers: ScrollTrigger[] = [];
    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      );
    });

    return () => triggers.forEach((st) => st.kill());
  }, [preloaderDone, lang]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        transform:
          preloaderDone && isScrolled
            ? "translate3d(-50%, 0, 0)"
            : "translate3d(-50%, 28px, 0)",
      }}
      className={`fixed bottom-5 left-1/2 z-[700] max-w-[95vw] transition-[transform,opacity] duration-500 ease-spring ${
        preloaderDone && isScrolled
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <nav
        aria-label="Section & Language Navigation"
        className="liquid-glass-nav flex items-center gap-1.5 rounded-2xl p-1.5"
      >
        <div className="hidden sm:flex items-center gap-1">
          {NAV_IDS.map((id, i) => {
            const isActive = activeSection === id;
            const isRedItem = i % 2 === 1;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-300 ease-spring whitespace-nowrap shrink-0 ${
                  isActive
                    ? isRedItem
                      ? "bg-accentRed text-white font-semibold shadow-[0_0_20px_rgba(255,51,85,0.4)]"
                      : "bg-accent text-white dark:text-zinc-950 font-semibold shadow-[0_0_20px_rgba(0,255,135,0.4)]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {labels[i]}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:block h-4 w-[1px] bg-black/15 dark:bg-white/[0.12] mx-1" />

        {/* Language Segmented Selector */}
        <div
          role="group"
          aria-label="Language Switcher"
          className="flex items-center gap-0.5 bg-black/5 dark:bg-white/[0.06] rounded-xl p-0.5 border border-black/10 dark:border-white/[0.08]"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => switchLanguage(l)}
              aria-label={`Switch language to ${l.toUpperCase()}`}
              className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg uppercase transition-all whitespace-nowrap shrink-0 ${
                lang === l
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Compact Theme Toggle inside FloatingNav */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle Color Theme"
          className="flex h-7 w-7 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white hover:text-accent transition-colors shrink-0"
        >
          {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
        </button>
      </nav>
    </div>
  );
}
