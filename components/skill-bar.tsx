"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";

export function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted">{skill.level}/5</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.level / 5) * 50}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
}