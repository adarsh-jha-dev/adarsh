import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-12 pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href="/blog"
          className="text-xs text-ink-dim hover:text-accent inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={12} /> back to blog
        </Link>

        <header className="mt-8 mb-10">
          <time className="text-xs text-ink-mute font-mono">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-3xl md:text-4xl font-medium leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-3 text-ink-dim">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-ink-mute border border-line px-1.5 py-0.5 rounded"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose-terminal max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
