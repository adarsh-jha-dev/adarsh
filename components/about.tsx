import { siteConfig } from "@/lib/config";

const stack = {
  languages: ["TypeScript", "JavaScript", "Python"],
  frontend: ["React", "Next.js", "Tailwind", "Framer Motion", "shadcn/ui"],
  backend: ["Node.js", "Express", "tRPC", "Convex", "Prisma"],
  database: ["PostgreSQL", "MongoDB", "Redis"],
  tools: ["Git", "Docker", "Vercel", "GitHub Actions", "Linux"],
  learning: ["PyTorch", "Transformers", "LangChain"],
};

export function About() {
  return (
    <section className="py-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div>
            <div className="text-xs text-ink-mute mb-2">// section</div>
            <h2 className="text-2xl font-medium">about.md</h2>
            <p className="mt-4 text-xs text-ink-mute leading-relaxed">
              {siteConfig.education.degree}
              <br />
              {siteConfig.education.school}
              <br />
              {siteConfig.education.period} · CGPA {siteConfig.education.cgpa}
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-ink-dim">
            <p>
              I started writing code because I liked the feeling of making
              something appear on a screen out of nothing. Two years and
              maybe a hundred late nights later, that feeling hasn't left.
            </p>
            <p>
              I work primarily across the TypeScript ecosystem — Next.js for
              UIs, Node for services, Postgres or Mongo depending on the shape
              of the data. I care about <span className="text-accent">shipping</span>:
              taking a fuzzy idea, picking a stack that fits the constraints,
              and getting a working version in front of someone fast enough
              to learn from it.
            </p>
            <p>
              In 2026 I'm widening the lens. The application layer is
              familiar territory; the model layer isn't yet. I've started
              working through PyTorch fundamentals and the math underneath,
              and I'm building small projects that put models behind APIs I
              already know how to write.
            </p>

            {/* Stack grid */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-5 text-xs">
              {Object.entries(stack).map(([key, items]) => (
                <div key={key}>
                  <div className="text-ink-mute mb-2">
                    <span className="text-accent">▸</span> {key}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-ink border border-line px-2 py-0.5 rounded text-[11px] hover:border-accent hover:text-accent transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
