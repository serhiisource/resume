import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serhii Rohovskyi — AI Agent Engineer, System Architect & Founder of Arbfeld",
  description:
    "Portfolio & CV of Serhii Rohovskyi. Autonomous AI Agents, Multi-Agent Data Mining, Serverless Order-Book Engine & Enterprise Architecture.",
  metadataBase: new URL("https://arbfeld.github.io/"),
  openGraph: {
    title: "Serhii Rohovskyi — Portfolio & CV",
    description: "AI Agent Engineer, System Architect & Solo Founder of Arbfeld.",
    url: "https://arbfeld.github.io/",
    siteName: "Serhii Rohovskyi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="bg-obsidian text-offwhite antialiased font-sans bg-grid min-h-screen">
        {/* Soft Ambient Glow in background */}
        <div className="ambient-glow" />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
