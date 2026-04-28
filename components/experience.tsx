import { experience } from "@/lib/config";

export function Experience() {
  return (
    <section className="py-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs text-ink-mute mb-2">// section</div>
        <h2 className="text-2xl font-medium mb-10">
          <span className="text-ink-mute">$ cat </span>
          <span className="text-ink">~/.work-history</span>
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-line md:left-[180px]" />

          <div className="space-y-10">
            {experience.map((job) => (
              <div key={job.company} className="relative md:grid md:grid-cols-[180px_1fr] md:gap-10">
                {/* Period + dot */}
                <div className="hidden md:flex flex-col items-end gap-1.5 pt-0.5">
                  <div className="flex items-center gap-2">
                    {job.current && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                    )}
                    {!job.current && (
                      <span className="w-2 h-2 rounded-full border border-line bg-bg" />
                    )}
                  </div>
                  <span className="text-[11px] text-ink-mute font-mono text-right leading-relaxed">
                    {job.period}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-6 md:pl-0 relative">
                  {/* Mobile dot */}
                  <div className="absolute -left-[4.5px] top-1 md:hidden">
                    {job.current ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full border border-line bg-bg block" />
                    )}
                  </div>

                  <div className="bg-bg-elev border border-line p-5 group hover:border-accent/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener"
                            className="text-sm font-medium text-ink hover:text-accent transition-colors"
                          >
                            {job.company}
                            <span className="ml-1 text-ink-mute text-[10px]">↗</span>
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-ink">{job.company}</span>
                        )}
                        <div className="text-xs text-accent mt-0.5">{job.role}</div>
                      </div>
                      <span className="md:hidden text-[11px] text-ink-mute font-mono">
                        {job.period}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {job.bullets.map((b) => (
                        <li key={b} className="text-xs text-ink-dim flex gap-2.5">
                          <span className="text-accent shrink-0 mt-px">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] text-ink-mute border border-line px-1.5 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
