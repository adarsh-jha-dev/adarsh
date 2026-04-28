import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center max-w-md">
        <pre className="text-accent text-xs md:text-sm leading-tight inline-block text-left">
{`  _  _    ___  _  _
 | || |  / _ \\| || |
 | || |_| | | | || |_
 |__   _| |_| |__   _|
    |_|  \\___/   |_|`}
        </pre>
        <h1 className="mt-6 text-2xl font-medium">
          <span className="text-ink-mute">$ </span>
          <span className="text-ink">404 — page not found</span>
        </h1>
        <p className="mt-3 text-xs text-ink-dim">
          either it moved, never existed, or you typed it weird. happens.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-xs text-accent link-underline"
        >
          ← back to ~/
        </Link>
      </div>
    </section>
  );
}
