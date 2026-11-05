import PixelCurtain from "@/components/PixelCurtain";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Showcase3DSection from "@/components/Showcase3DSection";
import ProblemSection from "@/components/ProblemSection";
import LebenslaufSection from "@/components/LebenslaufSection";
import FooterSection from "@/components/FooterSection";
import ContactDrawer from "@/components/ContactDrawer";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen bg-transparent text-offwhite selection:bg-emerald-400 selection:text-zinc-950 overflow-x-hidden">
      {/* Language Switcher Transition Veil */}
      <PixelCurtain />

      {/* Unified Fixed Architectural Header (Nav + Language + Theme + Contact + Scroll Progress) */}
      <Header />

      {/* 00 // Hero Section & Quantitative Telemetry Strip */}
      <HeroSection />

      {/* 01 // Flagship Arbfeld Interactive L2 Order-Book Engine & Core Systems */}
      <Showcase3DSection />

      {/* 02 // Engineering Pillars & Architecture Matrix */}
      <ProblemSection />

      {/* 03 // Official Executive Lebenslauf (CV) & Collaboration Formats */}
      <LebenslaufSection />

      {/* 04 // Monumental Closing CTA */}
      <FooterSection />

      {/* Slide-Over Contact Drawer */}
      <ContactDrawer />
    </main>
  );
}
