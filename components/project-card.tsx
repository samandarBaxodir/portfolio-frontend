"use client";

import { TiltCard } from "./tilt-card";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard>
      <div
        style={{ transform: "translateZ(30px)" }}
        className="h-40 bg-border flex items-center justify-center text-muted text-sm"
      >
        {project.media_url ? (
          <img
            src={`https://portfolio-backend-2rpn.onrender.com${project.media_url}`}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          "Rasm yo'q"
        )}
      </div>

      <div className="p-5" style={{ transformStyle: "preserve-3d" }}>
        <h3
          style={{ transform: "translateZ(20px)" }}
          className="font-semibold mb-1"
        >
          {project.title}
        </h3>
        <p
          style={{ transform: "translateZ(15px)" }}
          className="text-sm text-muted mb-3 line-clamp-2"
        >
          {project.description}
        </p>
        {project.tech_stack && (
          <div
            style={{ transform: "translateZ(15px)" }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {project.tech_stack.split(",").map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="flex items-center gap-4 text-sm text-muted"
        >
          {project.github_url && (
            <a href={project.github_url} target="_blank" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <LinkIcon size={14} /> GitHub
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
