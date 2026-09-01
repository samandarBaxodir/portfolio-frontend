"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/lib/types";

export function SkillBar({ skill }: { skill: Skill }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percent = (skill.level / 5) * 100;

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted">{skill.level}/5</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
}
