import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { POSTS } from "@/lib/blog";
import { PSEO_PAGES } from "@/lib/programmatic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://goluimages.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tools",
    "/blog",
    "/tutorials",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1.0 : 0.7,
  }));

  const tools = TOOLS.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: t.featured || t.trending ? 0.9 : 0.8,
  }));

  const cats = CATEGORIES.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blog = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.6,
  }));

  const pseo = PSEO_PAGES.map((p) => ({
    url: `${base}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...tools, ...cats, ...blog, ...pseo];
}
