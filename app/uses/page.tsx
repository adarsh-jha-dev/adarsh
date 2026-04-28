import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and tools I use day-to-day.",
};

const sections = [
  {
    title: "editor",
    items: [
      ["VS Code", "main editor — JetBrains Mono, One Dark Pro"],
      ["Cursor", "for AI-assisted work on focused tasks"],
    ],
  },
  {
    title: "terminal",
    items: [
      ["Zsh", "with a few aliases and nothing fancy"],
    ],
  },
  {
    title: "stack i reach for",
    items: [
      ["Next.js + TypeScript", "default for almost any web app"],
      ["Tailwind CSS", "fast iteration, no naming arguments"],
      ["Node / Express", "backend when I need something straightforward"],
      ["Postgres or MongoDB", "depending on the shape of the data"],
      ["Vercel", "deploy-from-git, no config theatre"],
    ],
  },
  {
    title: "books / inputs that shaped how i work",
    items: [
      ["A Philosophy of Software Design", "Ousterhout — for thinking about complexity"],
      ["The Pragmatic Programmer", "for the basics done well"],
    ],
  },
];

export default function UsesPage() {
  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs text-ink-mute mb-2">// preferences</div>
        <h1 className="text-4xl font-medium">
          <span className="text-ink-mute">$ cat </span>
          <span className="text-ink">~/.config/uses.toml</span>
          <span className="cursor" />
        </h1>
        <p className="mt-4 text-sm text-ink-dim max-w-xl leading-relaxed">
          The hardware, software, and small choices that make my day-to-day
          flow. Inspired by{" "}
          <a
            href="https://uses.tech"
            className="text-accent link-underline"
            target="_blank"
            rel="noopener"
          >
            uses.tech
          </a>
          .
        </p>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs uppercase tracking-widest text-accent font-mono">
                // {section.title}
              </h2>
              <dl className="mt-4 divide-y divide-line border-t border-b border-line">
                {section.items.map(([name, desc]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[150px_1fr] gap-4 py-3 text-sm"
                  >
                    <dt className="text-ink font-mono">{name}</dt>
                    <dd className="text-ink-dim">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
