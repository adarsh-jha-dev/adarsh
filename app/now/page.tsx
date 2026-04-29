import type { Metadata } from "next";
import { NowPlaying } from "@/components/now-playing";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; // lofi hip hop radio — change to your current vibe

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

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-dim">
          <Block heading="working on">
            Final-year CS undergrad at HIT Kolkata, working at Humane Intelligence.
            Building side projects which will scale to millions of users (some day).
          </Block>

          <Block heading="learning">
            Diving into AI/ML from the ground up. Trying to get my hands dirty with
            as many frameworks and tools as possible, while also understanding the
            underlying math and algorithms.
          </Block>

          <Block heading="looking for">
            Full-time SDE roles starting summer 2026. Frontend, full-stack, or
            anything that touches both product and infra. Bonus if there&apos;s
            applied-ML work in the same building.
          </Block>

          <Block heading="reading">
            <em>The Pragmatic Programmer</em> by Hunt & Thomas — re-reading it now
            that I have enough real-world experience for it to actually land.
          </Block>

          <Block heading="watching">
            <em>Severance</em> S2. Also going deep on 3Blue1Brown&apos;s neural
            network series when I need to feel smarter than I am.
          </Block>

          <Block heading="now playing">
            <div className="mt-2">
              <NowPlaying />
              <p className="mt-2 text-xs text-ink-mute">
                live from Spotify · updates every 30s
              </p>
            </div>
          </Block>

          <div>
            <h2 className="text-xs uppercase tracking-widest text-accent font-mono mb-3">
              // currently vibing to
            </h2>
            <div className="relative rounded overflow-hidden border border-line aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&rel=0`}
                title="Currently vibing to"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="mt-2 text-xs text-ink-mute">
              what&apos;s been on repeat lately
            </p>
          </div>
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
      <div>{children}</div>
    </div>
  );
}
