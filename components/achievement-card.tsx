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
    <TiltCard>
      {achievement.image_url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={`https://portfolio-backend-2rpn.onrender.com${achievement.image_url}`}
            alt={achievement.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      ) : (
        <div className="h-48 bg-border flex items-center justify-center">
          <Award size={32} className="text-accent" />
        </div>
      )}
      <div className="p-5">
        <p className="text-xs text-muted mb-1">{date}</p>
        <h3 className="font-semibold mb-2">{achievement.title}</h3>
        {achievement.description && (
          <p className="text-sm text-muted">{achievement.description}</p>
        )}
      </div>
    </TiltCard>
  );
}
