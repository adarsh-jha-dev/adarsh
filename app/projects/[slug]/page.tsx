import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="pt-12 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/projects"
          className="text-xs text-ink-dim hover:text-accent inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={12} /> back to projects
        </Link>

        <div className="mt-8">
          <div className="flex items-center gap-2 text-xs text-ink-mute font-mono">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.status === "live" ? "bg-accent animate-pulse" : "bg-warn"
              }`}
            />
            <span>{project.status}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-3 text-4xl md:text-5xl font-medium">
            <span className="text-ink-mute">~/</span>
            <span className="text-ink">{project.name}</span>
          </h1>
          <p className="mt-3 text-ink-dim">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-xs border border-line hover:border-accent hover:text-accent px-3 py-1.5 rounded transition-colors"
              >
                <ArrowUpRight size={12} /> live
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-xs border border-line hover:border-accent hover:text-accent px-3 py-1.5 rounded transition-colors"
              >
                <GithubIcon size={12} /> source
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] text-ink-dim border border-line px-2 py-0.5 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10 prose-terminal max-w-none">
          <Section heading="overview" body={project.description} />
          {project.problem && <Section heading="problem" body={project.problem} />}
          {project.approach && <Section heading="approach" body={project.approach} />}

          <div>
            <SectionHeading text="highlights" />
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="text-sm text-ink-dim flex gap-3">
                  <span className="text-accent shrink-0 mt-1">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.learnings && <Section heading="learnings" body={project.learnings} />}
        </div>

        {/* Bottom navigation */}
        <BottomNav slug={project.slug} />
      </div>
    </article>
  );
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <SectionHeading text={heading} />
      <p className="mt-4 text-sm text-ink-dim leading-relaxed">{body}</p>
    </div>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="text-xs uppercase tracking-widest text-accent font-mono">
      // {text}
    </h2>
  );
}

function BottomNav({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="mt-20 pt-8 border-t border-line grid grid-cols-2 gap-4 text-xs">
      <div>
        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="block group hover:text-accent text-ink-dim"
          >
            <div className="text-ink-mute">← previous</div>
            <div className="mt-1 group-hover:text-accent">{prev.name}</div>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="block group hover:text-accent text-ink-dim"
          >
            <div className="text-ink-mute">next →</div>
            <div className="mt-1 group-hover:text-accent">{next.name}</div>
          </Link>
        )}
      </div>
    </div>
  );
}
