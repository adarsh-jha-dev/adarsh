import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ["", "/projects", "/blog", "/uses", "/now"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
