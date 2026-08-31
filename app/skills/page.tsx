import { getSkills } from "@/lib/api";
import { SkillBar } from "@/components/skill-bar";
import type { Skill } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  backend: "Backend",
  frontend: "Frontend",
  mobile: "Mobil",
  "3d_cad": "3D & CAD",
  ai: "AI / Avtomatlashtirish",
};

export default async function SkillsPage() {
  const skills: Skill[] = await getSkills();

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Ko'nikmalar
      </h1>
      {Object.keys(grouped).length === 0 ? (
        <p className="text-muted">Hozircha ko'nikmalar qo'shilmagan.</p>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-medium text-muted uppercase tracking-wide mb-4">
                {categoryLabels[category] || category}
              </h2>
              <div className="space-y-4">
                {items.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
