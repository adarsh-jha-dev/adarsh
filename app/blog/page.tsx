import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, learnings, and the occasional opinion.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <section className="pt-16 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs text-ink-mute mb-2">// directory</div>
        <h1 className="text-4xl font-medium">
          <span className="text-ink-mute">$ ls </span>
          <span className="text-ink">~/blog</span>
          <span className="cursor" />
        </h1>
        <p className="mt-4 text-sm text-ink-dim max-w-xl leading-relaxed">
          Things I've learned the hard way, mostly. Short, occasional, no
          newsletter to subscribe to.{" "}
          <a href="/rss.xml" className="text-accent link-underline">
            RSS feed
          </a>{" "}
          if that's your thing.
        </p>

        {posts.length === 0 ? (
          <div className="mt-16 text-center text-xs text-ink-mute">
            <pre className="inline-block text-left">{`
$ ls
total 0
nothing here yet — first post coming soon.
`}</pre>
          </div>
        ) : (
          <ul className="mt-12 divide-y divide-line border-t border-b border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-5 hover:bg-bg-elev px-2 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-base text-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <time className="text-[11px] text-ink-mute font-mono shrink-0">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  {post.description && (
                    <p className="mt-1 text-xs text-ink-dim">{post.description}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-ink-mute"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
