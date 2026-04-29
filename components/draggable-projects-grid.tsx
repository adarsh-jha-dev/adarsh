"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { GripVertical } from "lucide-react";

function DraggableCard({ project }: { project: Project }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      className="relative group"
      whileDrag={{ scale: 1.02, zIndex: 10, boxShadow: "0 0 24px rgba(94,255,138,0.15)" }}
    >
      <button
        onPointerDown={(e) => controls.start(e)}
        className="absolute top-3 right-3 z-10 p-1 text-ink-mute opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </button>
      <ProjectCard project={project} />
    </Reorder.Item>
  );
}

export function DraggableProjectsGrid({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div>
      <p className="mb-6 text-[10px] text-ink-mute">
        {projects.length} entries · sorted by recency ·{" "}
        <span className="text-accent">drag to reorder</span>
      </p>
      <Reorder.Group
        axis="y"
        values={projects}
        onReorder={setProjects}
        className="flex flex-col gap-5"
        as="div"
      >
        {projects.map((p) => (
          <DraggableCard key={p.slug} project={p} />
        ))}
      </Reorder.Group>
    </div>
  );
}
