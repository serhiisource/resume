"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA } from "@/data/cvData";
import { X, Copy, Check, Mail, Phone, ExternalLink, MapPin, Send } from "lucide-react";

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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[1001] w-[min(500px,100vw)] bg-[#0d0d10] border-l border-white/[0.08] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out shadow-2xl ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
              {t.drawer.header}
            </span>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors p-1"
            >
              <span>{t.drawer.closeEsc}</span>
              <X size={16} />
            </button>
          </div>

          {/* Heading */}
          <div className="my-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.drawer.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {t.drawer.subtitle}
            </p>
          </div>

          {/* Contact Fields */}
          <div className="space-y-4">
            {/* Email */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-2 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 uppercase font-mono text-[11px]">
                  <Mail size={13} className="text-accent" />
                  {t.drawer.emailLabel}
                </span>
                <button
                  onClick={() => handleCopy(email, "email")}
                  className="flex items-center gap-1 text-accent hover:text-white transition-colors text-xs font-mono"
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
                className="text-sm font-mono text-white hover:text-accent transition-colors break-all block font-medium"
              >
                {email}
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-2 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 uppercase font-mono text-[11px]">
                  <Phone size={13} className="text-accent" />
                  {t.drawer.phoneLabel}
                </span>
                <button
                  onClick={() => handleCopy(phone, "phone")}
                  className="flex items-center gap-1 text-accent hover:text-white transition-colors text-xs font-mono"
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
                  className="text-sm font-mono text-white hover:text-accent transition-colors font-medium"
                >
                  {phone}
                </a>
                <a
                  href={`https://wa.me/${phoneClean.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline uppercase font-mono font-medium"
                >
                  WHATSAPP ↗
                </a>
              </div>
            </div>

            {/* Flagship */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-mono text-zinc-500 uppercase block">
                {t.drawer.projectLabel}
              </span>
              <a
                href="https://arbfeld.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-white hover:text-accent transition-colors"
              >
                <span className="font-semibold text-sm">arbfeld.github.io</span>
                <ExternalLink size={14} className="text-accent" />
              </a>
            </div>

            {/* Location */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-1.5">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 uppercase">
                <MapPin size={13} className="text-accent" />
                {t.drawer.addressLabel}
              </span>
              <div className="text-zinc-200 text-xs">
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-white/[0.08] mt-8">
          <a
            href={`mailto:${email}?subject=Collaboration%20with%20Serhii%20Rohovskyi`}
            className="btn-accent w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Send size={15} />
            <span>Send Direct Message</span>
          </a>
        </div>
      </aside>
    </>
  );
}
