import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        surface: "#0c0c0e",
        surfaceHover: "#16161a",
        card: "#111114",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        cardBorderHover: "rgba(255, 255, 255, 0.2)",
        accent: "#ef4444",
        accentGlow: "rgba(239, 68, 68, 0.15)",
        offwhite: "#F5F5F7",
        muted: "#94949e",
        dim: "#52525b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(239, 68, 68, 0.25)",
        cardGlow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
