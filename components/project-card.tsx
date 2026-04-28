"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const statusColor = {
  live: "bg-accent",
  wip: "bg-warn",
  archived: "bg-ink-mute",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative bg-bg-elev border border-line hover:border-accent/40 transition-all duration-300">
      <span className="corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="corner-tr opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="corner-bl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 h-9 border-b border-line bg-bg-high text-xs">
        <div className="flex items-center gap-2 text-ink-mute font-mono">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColor[project.status]} ${project.status === "live" ? "animate-pulse" : ""}`} />
          <span>~/{project.slug}</span>
          <span className="text-ink-mute">·</span>
          <span>{project.year}</span>
        </div>
        <div className="flex items-center gap-3 text-ink-mute">
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener"
              aria-label="GitHub repository"
              className="hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={13} />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener"
              aria-label="Live site"
              className="hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>

      <Link href={`/projects/${project.slug}`} className="block p-5">
        <h3 className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-ink-mute mt-1">{project.tagline}</p>
        <p className="mt-4 text-sm text-ink-dim leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
              className="text-[10px] text-ink-dim border border-line px-1.5 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="text-[10px] text-ink-mute">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-[11px]">
          <span className="text-ink-mute">read case study</span>
          <span className="text-accent group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
