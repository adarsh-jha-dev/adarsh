import type { Metadata } from "next";

import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies on AI security tooling, retrieval systems, and data pipelines — with the decisions and measurements behind them.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-8 pt-20 md:pt-28">
      <span className="eyebrow">Projects</span>
      <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]">
        Selected work
      </h1>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
        Each one opens a case study: the problem, the decision worth defending,
        and what I&apos;d do differently. Where there&apos;s a number to report,
        it&apos;s measured rather than estimated.
      </p>

      <div className="mt-14 border-t">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
