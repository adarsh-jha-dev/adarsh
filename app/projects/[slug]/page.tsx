import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${siteConfig.name}`,
      description: project.tagline,
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-12 md:pt-16">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <header className="mt-10">
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
            {project.kind} · {project.year}
          </span>
        </div>

        <h1 className="display mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">
          {project.name}
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <Button asChild size="sm" variant="primary">
              <a href={project.links.live} target="_blank" rel="noopener">
                Visit live site
                <ArrowUpRight />
              </a>
            </Button>
          )}
          {project.links.code && (
            <Button asChild size="sm" variant="outline">
              <a href={project.links.code} target="_blank" rel="noopener">
                <GithubIcon size={14} />
                Source
              </a>
            </Button>
          )}
        </div>

        {project.metric && (
          <div className="mt-10 rounded-2xl border bg-card px-6 py-5">
            <p className="display text-4xl text-primary md:text-5xl">
              {project.metric.value}
            </p>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              {project.metric.label}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
        </div>
      </header>

      <div className="mt-16 space-y-14">
        <Section heading="Overview" body={project.description} />
        {project.problem && (
          <Section heading="The problem" body={project.problem} />
        )}
        {project.approach && (
          <Section heading="Approach" body={project.approach} />
        )}

        <section>
          <h2 className="eyebrow">What it does</h2>
          <ul className="mt-5 space-y-3.5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="relative pl-6 text-[15px] leading-relaxed text-muted-foreground"
              >
                <span className="absolute left-0 top-[0.65em] size-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {project.learnings && (
          <Section heading="What I learned" body={project.learnings} />
        )}
      </div>

      <nav className="mt-20 grid grid-cols-2 gap-4 border-t pt-8">
        <div>
          {prev && (
            <Link href={`/projects/${prev.slug}`} className="group block">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Previous
              </span>
              <p className="mt-1.5 text-[15px] font-medium transition-colors group-hover:text-primary">
                {prev.name}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link href={`/projects/${next.slug}`} className="group block">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                Next
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              <p className="mt-1.5 text-[15px] font-medium transition-colors group-hover:text-primary">
                {next.name}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <section>
      <h2 className="eyebrow">{heading}</h2>
      <p className="mt-5 text-[15px] leading-[1.75] text-muted-foreground">
        {body}
      </p>
    </section>
  );
}
