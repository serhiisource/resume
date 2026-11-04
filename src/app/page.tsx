import Preloader from "@/components/Preloader";
import PixelCurtain from "@/components/PixelCurtain";
import Header from "@/components/Header";
import FloatingNav from "@/components/FloatingNav";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import Showcase3DSection from "@/components/Showcase3DSection";
import SolutionSection from "@/components/SolutionSection";
import LebenslaufSection from "@/components/LebenslaufSection";
import WhyMeSection from "@/components/WhyMeSection";
import FooterSection from "@/components/FooterSection";
import ContactDrawer from "@/components/ContactDrawer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian text-offwhite selection:bg-gpRed selection:text-obsidian overflow-x-hidden">
      {/* 1. Preloader with count 000% - 100% and 60-tile dissolve */}
      <Preloader />

      {/* 2. Pixel Curtain Language Switcher overlay */}
      <PixelCurtain />

      {/* 3. Global Fixed Header with language selector and drawer trigger */}
      <Header />

      {/* 5. Floating Bottom Navigation Pill */}
      <FloatingNav />

      {/* 6. Hero Section */}
      <HeroSection />

      {/* 7. Problem Section (01 // DAS PROBLEM) with word illumination & tilted cards */}
      <ProblemSection />

      {/* 8. 3D Project Showcase (02 // 3D-PROJEKT-SEQUENZ) with Arbfeld Live Terminal */}
      <Showcase3DSection />

      {/* 9. Solution Section (03 // DIE LÖSUNG) with 001-012 interactive list */}
      <SolutionSection />

      {/* 10. Official Lebenslauf / CV Timeline (04 // OFFIZIELLER LEBENSLAUF) */}
      <LebenslaufSection />

      {/* 11. Why Me & Formats (05 // WARUM ICH) */}
      <WhyMeSection />

      {/* 12. Monumental Footer (06 // STARTEN WIR) */}
      <FooterSection />

      {/* 13. Slide-over Contact Drawer */}
      <ContactDrawer />
    </main>
  );
}
