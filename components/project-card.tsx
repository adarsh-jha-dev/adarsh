import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  wip: "Prototype",
  archived: "Archived",
};

/**
 * Full-width row used on the projects index. Reads top-to-bottom on
 * mobile and as a three-column record on desktop.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative border-b">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`${project.name} — read the case study`}
      />

      <div className="grid grid-cols-1 gap-5 py-9 transition-opacity md:grid-cols-[minmax(0,16rem)_1fr] md:gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "size-1.5 rounded-full",
                project.status === "live"
                  ? "bg-[hsl(var(--success))]"
                  : "bg-muted-foreground/50"
              )}
            />
            <span className="eyebrow">
              {STATUS_LABEL[project.status]} · {project.year}
            </span>
          </div>

          <h2 className="display mt-3 text-3xl transition-colors group-hover:text-primary md:text-4xl">
            {project.name}
          </h2>

          <p className="mt-2 text-[13px] text-muted-foreground">
            {project.kind}
          </p>

          <div className="relative z-10 mt-4 flex items-center gap-4 text-[13px] text-muted-foreground">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                Live <ArrowUpRight className="size-3.5" />
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <GithubIcon size={13} /> Source
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.metric && (
            <p className="mt-5 flex items-baseline gap-2.5">
              <span className="display text-3xl text-primary">
                {project.metric.value}
              </span>
              <span className="text-[13px] text-muted-foreground">
                {project.metric.label}
              </span>
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
