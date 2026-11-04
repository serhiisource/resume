"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type Language } from "@/data/cvData";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AppContextType {
  lang: Language;
  switchLanguage: (newLang: Language) => void;
  isTransitioning: boolean;
  scrollVelocity: number;
  lenisRef: React.MutableRefObject<Lenis | null>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preloaderDone: boolean;
  setPreloaderDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("de");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  /* ───── Lenis smooth scroll ───── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { velocity: number }) => {
      setScrollVelocity(e.velocity);
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ───── Lock scroll when drawer open ───── */
  useEffect(() => {
    if (isDrawerOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isDrawerOpen]);

  /* ───── ESC key closes drawer ───── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ───── Language switcher with pixel curtain ───── */
  const switchLanguage = useCallback(
    (newLang: Language) => {
      if (newLang === lang || isTransitioning) return;
      setIsTransitioning(true);
      // After 350ms (curtain covers screen), swap lang
      setTimeout(() => {
        setLang(newLang);
        // After another 100ms, refresh ScrollTrigger and dismiss curtain
        setTimeout(() => {
          ScrollTrigger.refresh(true);
          setIsTransitioning(false);
        }, 100);
      }, 350);
    },
    [lang, isTransitioning]
  );

  return (
    <AppContext.Provider
      value={{
        lang,
        switchLanguage,
        isTransitioning,
        scrollVelocity,
        lenisRef,
        isDrawerOpen,
        setIsDrawerOpen,
        preloaderDone,
        setPreloaderDone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
