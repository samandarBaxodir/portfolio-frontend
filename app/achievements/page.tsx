import { getAchievements } from "@/lib/api";
import { AchievementCard } from "@/components/achievement-card";
import type { Achievement } from "@/lib/types";

export default async function AchievementsPage() {
  const achievements: Achievement[] = await getAchievements();

  return (
    <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Yutuqlar
      </h1>
      {achievements.length === 0 ? (
        <p className="text-muted">Hozircha yutuqlar qo'shilmagan.</p>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </main>
  );
}