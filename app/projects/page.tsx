import { getProjects } from "@/lib/api";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/types";

export default async function ProjectsPage() {
  const projects: Project[] = await getProjects("software");

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Loyihalar
      </h1>
      {projects.length === 0 ? (
        <p className="text-muted">Hozircha loyihalar qo'shilmagan.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}