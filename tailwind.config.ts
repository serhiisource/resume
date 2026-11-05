import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        surfaceHover: "var(--bg-surface-hover)",
        card: "var(--bg-card)",
        cardBorder: "var(--border-subtle)",
        cardBorderHover: "var(--border-hover)",
        accent: "var(--accent-primary)",
        accentBright: "var(--accent-bright)",
        accentGlow: "var(--accent-glow)",
        accentRed: "var(--accent-red)",
        gpRed: "var(--accent-red)",
        offwhite: "var(--text-primary)",
        muted: "var(--text-muted)",
        dim: "var(--text-dim)",
      },
      fontFamily: {
        sans: [
          "var(--font-manrope)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["var(--font-manrope)", "-apple-system", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: [
          "var(--font-jetbrains)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 55px -10px var(--accent-glow)",
        cardGlow: "0 20px 50px -15px rgba(0, 0, 0, 0.45)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        elastic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
