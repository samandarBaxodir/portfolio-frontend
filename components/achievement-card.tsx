"use client";

import { TiltCard } from "./tilt-card";
import { Award } from "lucide-react";
import type { Achievement } from "@/lib/types";

const oyNomlari = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const d = new Date(achievement.date_achieved);
  const date = `${d.getDate()}-${oyNomlari[d.getMonth()]}, ${d.getFullYear()}`;

  return (
    <TiltCard className="p-5">
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
          {achievement.image_url ? (
            <img
              src={`https://portfolio-backend-2rpn.onrender.com${achievement.image_url}`}
              alt={achievement.title}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Award size={20} className="text-accent" />
          )}
        </div>
        <div>
          <p className="text-xs text-muted mb-1">{date}</p>
          <h3 className="font-semibold mb-1">{achievement.title}</h3>
          {achievement.description && (
            <p className="text-sm text-muted">{achievement.description}</p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
