import { ArrowUpRight } from "lucide-react";

import { experience } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="rule" />

      <div className="grid grid-cols-1 gap-10 pt-14 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <span className="eyebrow">Experience</span>
        </div>

        <div className="space-y-14">
          {experience.map((job) => (
            <article key={job.company}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="display text-2xl md:text-3xl">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener"
                      className="link-grow"
                    >
                      {job.company}
                      <ArrowUpRight className="ml-0.5 inline size-4 text-muted-foreground" />
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <span className="shrink-0 font-mono text-[12px] text-muted-foreground">
                  {job.period}
                </span>
              </div>

              <p className="mt-1.5 flex items-center gap-2.5 text-[15px] font-medium">
                {job.role}
                {job.current && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-normal text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-[hsl(var(--success))]" />
                    Current
                  </span>
                )}
              </p>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {job.summary}
              </p>

              <ul className="mt-5 max-w-xl space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-5 text-[14px] leading-relaxed text-muted-foreground"
                  >
                    <span className="absolute left-0 top-[0.6em] size-1 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {job.clients.length > 0 && (
                <p className="mt-5 text-[13px] text-muted-foreground">
                  <span className="eyebrow">Clients</span>{" "}
                  <span className="ml-1">{job.clients.join(" · ")}</span>
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <Badge key={tech} variant="muted">
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
