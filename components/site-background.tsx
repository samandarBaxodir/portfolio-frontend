"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CosmicBackground } from "./cosmic-background";
import { InkBackground } from "./ink-background";

export function SiteBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return resolvedTheme === "dark" ? <CosmicBackground /> : <InkBackground />;
}
