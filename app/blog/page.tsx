import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building AI products, mostly learned the hard way.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-20 md:pt-28">
      <span className="eyebrow">Writing</span>
      <h1 className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]">Notes</h1>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
        Things I&apos;ve learned the hard way, mostly. Short and occasional —
        no newsletter to subscribe to, but there&apos;s an{" "}
        <a href="/rss.xml" className="link-grow text-foreground">
          RSS feed
        </a>{" "}
        if that&apos;s your thing.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 text-[15px] text-muted-foreground">
          Nothing published yet.
        </p>
      ) : (
        <div className="mt-14 border-t">
          {posts.map((post) => (
            <article key={post.slug} className="group border-b">
              <Link href={`/blog/${post.slug}`} className="block py-7">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="display text-2xl transition-colors group-hover:text-primary md:text-3xl">
                    {post.title}
                  </h2>
                  <time
                    dateTime={post.date}
                    className="shrink-0 font-mono text-[12px] text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>

                {post.description && (
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
