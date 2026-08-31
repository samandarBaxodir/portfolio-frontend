import { getProjects } from "@/lib/api";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/types";

export default async function CadPage() {
  const projects: Project[] = await getProjects("3d_cad");

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        3D &amp; CAD loyihalar
      </h1>
      <p className="text-muted mb-10">
        3ds Max va AutoCAD orqali yaratilgan modellashtirish va muhandislik ishlari.
      </p>
      {projects.length === 0 ? (
        <p className="text-muted">Hozircha 3D loyihalar qo'shilmagan.</p>
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
