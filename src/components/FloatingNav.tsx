"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_IDS = ["intro", "problem", "showcase", "solution", "cv", "why-me"] as const;

export default function FloatingNav() {
  const { lang, preloaderDone } = useApp();
  const t = CV_DATA[lang];
  const navRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("intro");

  const labels = [t.nav.intro, t.nav.problem, t.nav.showcase, t.nav.solution, t.nav.cv, t.nav.why];

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

  useEffect(() => {
    if (!preloaderDone || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );
  }, [preloaderDone]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[700] opacity-0"
    >
      <nav className="flex items-center gap-1 bg-[#121216]/80 backdrop-blur-xl border border-white/[0.1] rounded-full p-1.5 shadow-2xl">
        {NAV_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
              activeSection === id
                ? "bg-accent text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {labels[i]}
          </button>
        ))}
      </nav>
    </div>
  );
}
