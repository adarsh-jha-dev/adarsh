import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { DraggableProjectsGrid } from "@/components/draggable-projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects, side projects, and experiments.",
};

export default function ProjectsPage() {
  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs text-ink-mute mb-2">// directory</div>
        <h1 className="text-4xl font-medium">
          <span className="text-ink-mute">$ ls </span>
          <span className="text-ink">~/projects</span>
          <span className="cursor" />
        </h1>
        <p className="mt-4 text-sm text-ink-dim max-w-xl leading-relaxed">
          A few things I&apos;ve built. Each card opens a case study with the
          problem, my approach, and what I&apos;d do differently next time.
        </p>

        <div className="mt-10">
          <DraggableProjectsGrid initialProjects={projects} />
        </div>
      </div>
    </section>
  );
}
