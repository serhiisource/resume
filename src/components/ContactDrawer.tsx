"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import {
  X,
  Copy,
  Check,
  Mail,
  Phone,
  ExternalLink,
  MapPin,
  Send,
} from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import MagneticButton from "@/components/MagneticButton";

export default function ContactDrawer() {
  const { lang, isDrawerOpen, setIsDrawerOpen } = useApp();
  const t = CV_DATA[lang];

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const email = "serhiirohovskyi444@gmail.com";
  const phone = "+49 176 31640779";
  const phoneClean = "+4917631640779";
  const address = "Fränkinger Straße 13, 85258 Weichs, Germany";

  const cleanTag = (raw: string) => raw.replace(/\s*\/\/\s*/g, " · ");

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[1000] bg-black/50 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Monochrome Liquid Glass Slide-Over Drawer */}
      <aside
        aria-label="Contact Drawer"
        aria-hidden={!isDrawerOpen}
        style={{
          transform: isDrawerOpen
            ? "translate3d(0%, 0, 0)"
            : "translate3d(105%, 0, 0)",
        }}
        className={`fixed top-0 right-0 bottom-0 z-[1001] w-[min(480px,100vw)] liquid-glass-surface border-l border-black/15 dark:border-white/15 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto transition-[transform,visibility] duration-500 ease-spring shadow-2xl ${
          isDrawerOpen
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/[0.08]">
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
              {cleanTag(t.drawer.header)}
            </span>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close Contact Drawer"
              className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-accentRed transition-colors px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/[0.05] border border-black/10 dark:border-white/[0.08]"
            >
              <span>{t.drawer.closeEsc}</span>
              <X size={15} />
            </button>
          </div>

          {/* Heading */}
          <div className="my-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight">
              {t.drawer.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t.drawer.subtitle}
            </p>
          </div>

          {/* Contact Fields */}
          <div className="space-y-4">
            {/* Email */}
            <LiquidGlassCard
              enableTilt={false}
              glowVariant="mint"
              className="p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5 uppercase font-mono text-[11px]">
                    <Mail size={13} className="text-accent" />
                    {t.drawer.emailLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(email, "email")}
                    className="flex items-center gap-1 text-accent hover:text-zinc-950 dark:hover:text-white transition-colors text-xs font-mono"
                  >
                    {copiedField === "email" ? (
                      <>
                        <Check size={12} />
                        <span>{t.drawer.copySuccess}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-mono text-zinc-950 dark:text-white hover:text-accent transition-colors break-all block font-medium"
                >
                  {email}
                </a>
              </div>
            </LiquidGlassCard>

            {/* Phone */}
            <LiquidGlassCard
              enableTilt={false}
              glowVariant="crimson"
              className="p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1.5 uppercase font-mono text-[11px]">
                    <Phone size={13} className="text-accentRed" />
                    {t.drawer.phoneLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(phone, "phone")}
                    className="flex items-center gap-1 text-accentRed hover:text-zinc-950 dark:hover:text-white transition-colors text-xs font-mono"
                  >
                    {copiedField === "phone" ? (
                      <>
                        <Check size={12} />
                        <span>{t.drawer.copySuccess}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`tel:${phoneClean}`}
                    className="text-sm font-mono text-zinc-950 dark:text-white hover:text-accentRed transition-colors font-medium tabular-nums"
                  >
                    {phone}
                  </a>
                  <a
                    href={`https://wa.me/${phoneClean.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline uppercase font-mono font-semibold"
                  >
                    WHATSAPP ↗
                  </a>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Flagship */}
            <LiquidGlassCard
              enableTilt={false}
              glowVariant="emerald"
              className="p-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase block">
                  {t.drawer.projectLabel}
                </span>
                <a
                  href="https://arbfeld.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-950 dark:text-white hover:text-accent transition-colors"
                >
                  <span className="font-semibold text-sm">
                    arbfeld.github.io
                  </span>
                  <ExternalLink size={14} className="text-accent" />
                </a>
              </div>
            </LiquidGlassCard>

            {/* Location */}
            <LiquidGlassCard
              enableTilt={false}
              glowVariant="crimson"
              className="p-4"
            >
              <div className="space-y-1.5">
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">
                  <MapPin size={13} className="text-accentRed" />
                  {t.drawer.addressLabel}
                </span>
                <div className="text-zinc-800 dark:text-zinc-200 text-xs">
                  {address}
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-black/10 dark:border-white/[0.08] mt-8">
          <MagneticButton
            href={`mailto:${email}?subject=Collaboration%20with%20Serhii%20Rohovskyi`}
            className="btn-accent w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
          >
            <Send size={15} />
            <span>Send Direct Message</span>
          </MagneticButton>
        </div>
      </aside>
    </>
  );
}
