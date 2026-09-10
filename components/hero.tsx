import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

import { siteConfig, experience } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function Hero() {
  const current = experience.find((job) => job.current);

  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 md:pb-10 md:pt-24">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_minmax(0,16rem)] md:gap-14">
          {/* Portrait — first on mobile, beside the headline on desktop */}
          <div className="order-first animate-fade-up opacity-0 [animation-delay:60ms] md:order-last md:pt-2">
            <div className="relative w-32 overflow-hidden rounded-3xl border bg-card shadow-[0_18px_50px_-24px_hsl(var(--foreground)/0.35)] sm:w-40 md:w-full">
              <Image
                src="/adarsh.png"
                alt={`${siteConfig.name}, ${siteConfig.role}`}
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 768px) 16rem, 10rem"
                className="aspect-square h-auto w-full object-cover"
              />
              {/* Warms the photo into the page rather than letting it
                  sit on the layout as a hard-edged rectangle. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/10"
              />
            </div>
          </div>

          <div className="md:order-first">
            <h1 className="display animate-fade-up text-[clamp(2.5rem,6.6vw,4.75rem)] opacity-0 [animation-delay:120ms]">
              I build AI products
              <br className="hidden md:block" /> that make it to{" "}
              <em className="not-italic text-primary">production</em>.
            </h1>

            <p className="mt-7 max-w-xl animate-fade-up text-[17px] leading-relaxed text-muted-foreground opacity-0 [animation-delay:200ms]">
              {siteConfig.bio}
            </p>

            <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 opacity-0 [animation-delay:280ms]">
              <Button asChild size="lg">
                <Link href="/projects">
                  View work
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={siteConfig.cv} target="_blank" rel="noopener">
                  <Download />
                  Résumé
                </a>
              </Button>
              <kbd className="ml-1 hidden items-center gap-1.5 text-[13px] text-muted-foreground md:inline-flex">
                or press
                <span className="rounded-md border bg-card px-1.5 py-0.5 font-mono text-[11px]">
                  ⌘K
                </span>
              </kbd>
            </div>
          </div>
        </div>

        {/* Current role — the single fact a recruiter is scanning for.
            Left-aligned rather than spread edge-to-edge, which left a
            dead gap across the middle of the container. */}
        {current && (
          <div className="mt-10 animate-fade-up opacity-0 [animation-delay:360ms]">
            <div className="rule" />
            <div className="pt-5">
              <span className="eyebrow">Currently</span>
              <p className="mt-2 text-[15px]">
                <span className="font-medium">{current.role}</span>
                <span className="text-muted-foreground"> at </span>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener"
                  className="link-grow font-medium"
                >
                  {current.company}
                  <ArrowUpRight className="ml-0.5 inline size-3.5 text-muted-foreground" />
                </a>
                <span className="text-muted-foreground">
                  {" "}
                  — shipping red-teaming infrastructure used by{" "}
                  {current.clients.join(", ")}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
