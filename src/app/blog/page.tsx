import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { Clock, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "GoluImages Blog — Image Tools, SEO and Performance",
  description:
    "Tutorials and guides on image compression, format conversion, Core Web Vitals and SEO. Hand-written by the GoluImages team.",
  path: "/blog",
});

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured) || POSTS[0];
  const rest = POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <div className="container py-12">
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Blog</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          The GoluImages <span className="gradient-text">Journal</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Image tools, SEO playbooks, performance deep-dives. Subscribe to never miss an issue.
        </p>
      </div>

      <Link
        href={`/blog/${featured.slug}`}
        className="group grid lg:grid-cols-2 gap-8 rounded-3xl border bg-card overflow-hidden hover:shadow-xl transition-shadow mb-16"
      >
        <div className="aspect-[16/10] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 grid place-items-center">
          <span className="text-white text-6xl font-bold opacity-30 group-hover:opacity-60 transition-opacity uppercase tracking-tight">
            {featured.tags[0]}
          </span>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="capitalize">{featured.category}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readingTime} min read</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
            {featured.title}
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{featured.description}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-medium text-primary">
            Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 grid place-items-center">
              <span className="text-white text-3xl font-bold opacity-30 uppercase">{p.tags[0]}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="capitalize">{p.category}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readingTime} min</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
