import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-12 md:pt-16">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All writing
      </Link>

      <header className="mt-10 mb-12">
        <time
          dateTime={post.date}
          className="font-mono text-[12px] text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="display mt-4 text-[clamp(2.25rem,6vw,3.75rem)]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="prose-editorial">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
