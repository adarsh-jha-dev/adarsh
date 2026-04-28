import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="py-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs text-ink-mute mb-2">// section</div>
            <h2 className="text-2xl font-medium">
              <span className="text-ink-mute">$ ls </span>
              <span className="text-ink">~/projects/featured</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs text-ink-dim hover:text-accent inline-flex items-center gap-1.5"
          >
            view all
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
