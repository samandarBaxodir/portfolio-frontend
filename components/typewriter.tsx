"use client";

import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {shown}
      <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle animate-pulse" />
    </span>
  );
}
