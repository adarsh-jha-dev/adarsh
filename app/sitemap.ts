import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = ["", "/projects", "/blog"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
