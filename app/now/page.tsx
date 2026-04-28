import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

export default function NowPage() {
  const updated = "April 2026";
  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-xs text-ink-mute mb-2">// snapshot</div>
        <h1 className="text-4xl font-medium">
          <span className="text-ink-mute">$ </span>
          <span className="text-ink">now</span>
          <span className="cursor" />
        </h1>
        <p className="mt-2 text-xs text-ink-mute font-mono">
          last updated: {updated}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-dim">
          <Block heading="working on">
            Final-year CS undergrad at HIT Kolkata, working at HumaneIntellingence.
            Building side projects which will scale to millions of users (some day)
          </Block>

          <Block heading="learning">
            Diving into AI/ML from the ground up. Trying to get my hands dirty with
            as many frameworks and tools as possible, while also trying to understand
            the underlying math and algorithms.
          </Block>

          <Block heading="looking for">
            Full-time SDE roles starting summer 2026. Frontend, full-stack, or
            anything that touches both product and infra. Bonus if there's
            applied-ML work in the same building. Though i am still learning.
          </Block>
        </div>
      </div>
    </section>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-accent font-mono mb-2">
        // {heading}
      </h2>
      <p>{children}</p>
    </div>
  );
}
