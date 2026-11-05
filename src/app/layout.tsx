import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AmbientBackground from "@/components/AmbientBackground";
import CustomCursor from "@/components/CustomCursor";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="de"
      className={`dark ${manrope.variable} ${cormorant.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-obsidian text-offwhite antialiased font-sans min-h-screen relative transition-colors duration-500">
        <AmbientBackground />
        <CustomCursor />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
