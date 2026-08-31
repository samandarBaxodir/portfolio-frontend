"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

export function TiltCard({
  children,
  className = "",
  href,
  target,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const glowX = useTransform(x, (v) => `${v * 100}%`);
  const glowY = useTransform(y, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

const sharedProps = {
  onMouseMove: handleMouseMove,
  onMouseLeave: handleMouseLeave,
  style: { rotateX, rotateY, transformStyle: "preserve-3d" as const },
  className: `group relative block w-full bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors ${className}`,
};

  const inner = (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: glowBackground }}
      />
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </>
  );

  return (
    <div style={{ perspective: 800 }}>
      {href ? (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          {...sharedProps}
        >
          {inner}
        </motion.a>
      ) : (
        <motion.div ref={ref as React.Ref<HTMLDivElement>} {...sharedProps}>
          {inner}
        </motion.div>
      )}
    </div>
  );
}