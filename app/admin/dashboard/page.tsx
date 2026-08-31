"use client";

import { useEffect, useState } from "react";
import { getProjects, getSkills, getBlogPosts, getAchievements } from "@/lib/api";

export default function DashboardPage() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, blog: 0, achievements: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getSkills(), getBlogPosts(), getAchievements()]).then(
      ([projects, skills, blog, achievements]) => {
        setCounts({
          projects: projects.length,
          skills: skills.length,
          blog: blog.length,
          achievements: achievements.length,
        });
      }
    );
  }, []);

  const stats = [
    { label: "Loyihalar", value: counts.projects },
    { label: "Ko'nikmalar", value: counts.skills },
    { label: "Blog postlar", value: counts.blog },
    { label: "Yutuqlar", value: counts.achievements },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-8">Boshqaruv paneli</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
            <p className="text-3xl font-semibold mb-1">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
