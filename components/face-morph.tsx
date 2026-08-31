"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FaceMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 0 -> 0.5 -> 1 oralig'ida uchta rasm crossfade bo'ladi
  const opacity1 = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 1], [0, 1]);

  // Oxirida rasm sekin aylanib "narigi tomonga" o'tadi
  const rotateY = useTransform(scrollYProgress, [0.65, 1], [0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, rotateY, transformPerspective: 1200 }}
          className="relative w-[280px] h-[380px] md:w-[340px] md:h-[460px] rounded-3xl overflow-hidden glow-accent"
        >
          <motion.img
            src="/images/portrait-1-human.png"
            alt="Salom"
            style={{ opacity: opacity1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img
            src="/images/portrait-2-blend.png"
            alt="Salom - inson va texnologiya"
            style={{ opacity: opacity2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img
            src="/images/portrait-3-robot.png"
            alt="Salom - kelajak"
            style={{ opacity: opacity3 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
