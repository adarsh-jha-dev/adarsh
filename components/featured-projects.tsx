import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { featuredProjects, type Project } from "@/lib/projects";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Tile sizes for the 6-column grid. The first project gets a tall,
 * wide tile; the rest fill in around it. Index-keyed so the layout
 * stays deliberate rather than reflowing when a project is added.
 */
const SPANS = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

export function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-10 md:pb-24 md:pt-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2 className="display mt-3 text-4xl md:text-5xl">
            Things I&apos;ve built
          </h2>
        </div>
        <Link
          href="/projects"
          className="group hidden shrink-0 items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
        >
          All projects
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <BentoGrid className="mt-10">
        {featuredProjects.map((project, i) => (
          <BentoCard
            key={project.slug}
            index={i}
            className={SPANS[i] ?? "md:col-span-3"}
          >
            <TileContent project={project} large={i === 0} />
          </BentoCard>
        ))}
      </BentoGrid>

      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground sm:hidden"
      >
        All projects
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}

function TileContent({
  project,
  large,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <>
      {/* Stretched link — the whole tile is the click target for the
          case study. The external links below sit above it on z-10. */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0 rounded-3xl"
        aria-label={`${project.name} — read the case study`}
      />

      <div className="flex items-start justify-between gap-4">
        <span className="eyebrow">
          {project.kind} · {project.year}
        </span>
        <div className="relative z-10 flex items-center gap-2.5 text-muted-foreground">
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener"
              aria-label={`${project.name} source on GitHub`}
              className="transition-colors hover:text-foreground"
            >
              <GithubIcon size={15} />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener"
              aria-label={`${project.name} live site`}
              className="transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>

      <h3
        className={cn(
          "display mt-4",
          large ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl",
        )}
      >
        {project.name}
      </h3>

      <p
        className={cn(
          "mt-2.5 text-muted-foreground",
          large
            ? "max-w-md text-[15px] leading-relaxed"
            : "text-[13.5px] leading-snug",
        )}
      >
        {project.tagline}
      </p>

      {large && (
        <ul className="mt-6 hidden space-y-2.5 md:block">
          {project.highlights.slice(0, 3).map((item) => (
            <li
              key={item}
              className="relative max-w-md pl-5 text-[13px] leading-relaxed text-muted-foreground"
            >
              <span className="absolute left-0 top-[0.6em] size-1 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Everything below is pinned to the bottom of the tile */}
      <div className="mt-auto pt-6">
        {project.metric && (
          <div className="mb-5 flex items-baseline gap-2.5">
            <span
              className={cn(
                "display text-primary",
                large ? "text-4xl" : "text-2xl",
              )}
            >
              {project.metric.value}
            </span>
            <span className="text-[12px] leading-tight text-muted-foreground">
              {project.metric.label}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, large ? 6 : 3).map((s) => (
            <Badge key={s} variant="muted" size="sm">
              {s}
            </Badge>
          ))}
          {project.stack.length > (large ? 6 : 3) && (
            <Badge variant="muted" size="sm">
              +{project.stack.length - (large ? 6 : 3)}
            </Badge>
          )}
        </div>
      </div>
    </>
  );
}
