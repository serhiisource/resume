"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { CV_DATA, type ShowcaseProject } from "@/data/cvData";
import { ArrowUpRight, Activity, Terminal, Radio, ExternalLink } from "lucide-react";

// Live Order-Book Depth Simulator for Arbfeld
function LiveArbfeldTerminal({ project }: { project: ShowcaseProject }) {
  const [activePair, setActivePair] = useState("BTC/USDT");
  const [spread, setSpread] = useState("+0.84%");
  const [netProfit, setNetProfit] = useState("+$421.18");
  const [exchangeA, setExchangeA] = useState("BINANCE");
  const [exchangeB, setExchangeB] = useState("KRAKEN");
  const [bids, setBids] = useState([
    { px: "92,410.50", qty: "1.428", total: "$131,962" },
    { px: "92,408.20", qty: "3.104", total: "$286,835" },
    { px: "92,405.00", qty: "6.850", total: "$632,974" },
  ]);
  const [asks, setAsks] = useState([
    { px: "91,638.10", qty: "2.140", total: "$196,105" },
    { px: "91,642.40", qty: "4.520", total: "$414,223" },
    { px: "91,648.00", qty: "8.310", total: "$761,594" },
  ]);

  useEffect(() => {
    const pairs = [
      { name: "BTC/USDT", a: "BINANCE", b: "KRAKEN", basePx: 92400 },
      { name: "ETH/USDT", a: "BYBIT", b: "OKX", basePx: 3410 },
      { name: "SOL/USDT", a: "COINBASE", b: "BITGET", basePx: 218 },
    ];
    let idx = 0;

    const interval = setInterval(() => {
      idx = (idx + 1) % pairs.length;
      const current = pairs[idx];
      setActivePair(current.name);
      setExchangeA(current.a);
      setExchangeB(current.b);

      const randomSpread = (0.5 + Math.random() * 0.85).toFixed(2);
      setSpread(`+${randomSpread}%`);

      const profit = Math.round(210 + Math.random() * 380);
      setNetProfit(`+$${profit}.${Math.floor(Math.random() * 90 + 10)}`);

      const p = current.basePx;
      setBids([
        { px: (p * 1.003).toFixed(2), qty: (1.1 + Math.random() * 2).toFixed(3), total: `$${(p * 1.4).toFixed(0)}` },
        { px: (p * 1.001).toFixed(2), qty: (2.5 + Math.random() * 3).toFixed(3), total: `$${(p * 3.2).toFixed(0)}` },
        { px: (p * 0.999).toFixed(2), qty: (5.2 + Math.random() * 4).toFixed(3), total: `$${(p * 6.5).toFixed(0)}` },
      ]);
      setAsks([
        { px: (p * 0.995).toFixed(2), qty: (1.3 + Math.random() * 2).toFixed(3), total: `$${(p * 1.5).toFixed(0)}` },
        { px: (p * 0.993).toFixed(2), qty: (3.1 + Math.random() * 3).toFixed(3), total: `$${(p * 3.8).toFixed(0)}` },
        { px: (p * 0.990).toFixed(2), qty: (5.9 + Math.random() * 4).toFixed(3), total: `$${(p * 7.4).toFixed(0)}` },
      ]);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-950/80 border border-white/[0.08] rounded-xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-white/[0.04] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-zinc-200 font-semibold tracking-wide">
            {project.terminalHeader}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <Radio size={12} className="animate-spin" />
          <span>LIVE L2 DEPTH</span>
        </div>
      </div>

      {/* Realtime Route & Spread Ticker */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.02] border-b border-white/[0.06]">
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Pair &amp; Arbitrage Route</span>
          <div className="text-white font-bold text-xs flex items-center gap-1.5">
            <span className="text-accent">{activePair}</span>
            <span className="text-zinc-600">::</span>
            <span className="text-zinc-300">{exchangeA} ↔ {exchangeB}</span>
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Real Exec Spread</span>
          <div className="text-emerald-400 font-bold text-sm tracking-wide">
            {spread}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase">Net Post-Fee / Slippage</span>
          <div className="text-accent font-bold text-sm">
            {netProfit}
          </div>
        </div>
      </div>

      {/* Simulated Order-Book Depth Table */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
        {/* Asks (Buy side on Exchange A) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-500 pb-1 border-b border-white/[0.04] text-[10px]">
            <span>ASK PX ({exchangeA})</span>
            <span>QTY</span>
            <span>TOTAL</span>
          </div>
          {asks.map((row, i) => (
            <div key={i} className="flex justify-between text-emerald-400 font-medium">
              <span>{row.px}</span>
              <span className="text-zinc-300">{row.qty}</span>
              <span className="text-zinc-500">{row.total}</span>
            </div>
          ))}
        </div>

        {/* Bids (Sell side on Exchange B) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-500 pb-1 border-b border-white/[0.04] text-[10px]">
            <span>BID PX ({exchangeB})</span>
            <span>QTY</span>
            <span>TOTAL</span>
          </div>
          {bids.map((row, i) => (
            <div key={i} className="flex justify-between text-accent font-medium">
              <span>{row.px}</span>
              <span className="text-zinc-300">{row.qty}</span>
              <span className="text-zinc-500">{row.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Log Rows */}
      <div className="px-4 py-3 bg-black/60 border-t border-white/[0.06] space-y-1.5 text-[11px]">
        {project.terminalRows.map((row, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-zinc-500">{row.left}</span>
            <span
              className={`font-medium ${
                row.highlight
                  ? "text-accent"
                  : row.green
                  ? "text-emerald-400"
                  : "text-zinc-300"
              }`}
            >
              {row.right}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generic Terminal View for projects 2 and 3
function GenericProjectTerminal({ project }: { project: ShowcaseProject }) {
  return (
    <div className="bg-zinc-950/80 border border-white/[0.08] rounded-xl overflow-hidden font-mono text-xs">
      <div className="bg-white/[0.04] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-accent" />
          <span className="text-[11px] text-zinc-200 font-semibold tracking-wide">
            {project.terminalHeader}
          </span>
        </div>
        <div className="text-[10px] text-zinc-500">SYSTEM MONITOR</div>
      </div>
      <div className="p-4 space-y-3 bg-black/40 text-[11px]">
        {project.terminalRows.map((row, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0"
          >
            <span className="text-zinc-500 uppercase">{row.left}</span>
            <span
              className={`font-semibold ${
                row.highlight
                  ? "text-accent"
                  : row.green
                  ? "text-emerald-400"
                  : "text-zinc-200"
              }`}
            >
              {row.right}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Showcase3DSection() {
  const { lang } = useApp();
  const t = CV_DATA[lang];

  return (
    <section id="showcase" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto z-10 border-t border-white/[0.07]">
      {/* Section Header */}
      <div className="mb-14 space-y-3">
        <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
          {t.showcase.sectionTag}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span>{t.showcase.titlePlain} </span>
          <span className="text-accent">{t.showcase.titleSerif}</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          {t.showcase.subtitle}
        </p>
      </div>

      {/* Projects Stack */}
      <div className="space-y-8">
        {t.showcase.projects.map((project, idx) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 relative"
          >
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.06] mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
                  {project.badge}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                MODULE 0{idx + 1}
              </span>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                    {project.subtitle}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {project.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-center space-y-1"
                    >
                      <div className="text-sm font-bold text-accent font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-zinc-400 uppercase font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project Link */}
                {project.link && (
                  <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <span>{project.linkLabel || "OPEN ARBFELD"}</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Terminal */}
              <div className="lg:col-span-7">
                {project.featured ? (
                  <LiveArbfeldTerminal project={project} />
                ) : (
                  <GenericProjectTerminal project={project} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
