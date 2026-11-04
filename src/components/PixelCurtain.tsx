"use client";

import { useApp } from "@/context/AppContext";

export default function PixelCurtain() {
  const { isTransitioning } = useApp();

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9995] bg-black transition-opacity duration-200 ${
        isTransitioning ? "opacity-40" : "opacity-0"
      }`}
    />
  );
}
