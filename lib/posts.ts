import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? new Date().toISOString(),
      tags: data.tags ?? [],
      content,
    } satisfies Post;
  });
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
