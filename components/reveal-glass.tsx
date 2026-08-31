"use client";

import type { ReactNode } from "react";

export function RevealGlass({ children }: { children: ReactNode }) {
  return (
    <div className="group relative rounded-3xl border border-border overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-2xl bg-background/40 transition-all duration-500 group-hover:backdrop-blur-md group-hover:bg-background/10" />
      <div className="relative p-8 md:p-10 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-none">
        {children}
      </div>
    </div>
  );
}
