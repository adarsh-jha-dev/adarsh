import { skills } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="rule" />

      <div className="grid grid-cols-1 gap-10 pt-14 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-16">
        <div>
          <span className="eyebrow">About</span>
        </div>

        <div>
          <p className="display max-w-2xl text-3xl md:text-[2.6rem]">
            The interesting problems live in the gap between{" "}
            <em className="not-italic text-muted-foreground">
              &ldquo;the model returned something&rdquo;
            </em>{" "}
            and{" "}
            <em className="not-italic text-primary">
              &ldquo;the user got value.&rdquo;
            </em>
          </p>

          <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Most of what I do sits between application code and AI models —
              wiring LLMs into product workflows, building evaluation
              pipelines, designing multi-provider abstractions, and shipping
              the interface that makes any of it useful.
            </p>
            <p>
              I care about shipping things that hold up: taking a fuzzy idea,
              picking a stack that fits the constraints, and getting a working
              version in front of someone fast enough to learn from it. Where a
              result can be measured, I&apos;d rather measure it than argue
              about it — most of my recent projects ship with a labelled test
              set and a number attached.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="eyebrow">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
