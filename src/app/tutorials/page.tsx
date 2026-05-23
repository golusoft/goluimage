import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { Clock } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Tutorials — Step-by-step Image Tool Guides",
  description: "Step-by-step tutorials for image compression, conversion, social media sizing and more.",
  path: "/tutorials",
});

export default function TutorialsPage() {
  const tutorials = POSTS.filter((p) => p.category === "tutorials");
  return (
    <div className="container py-12">
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Tutorials</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Learn in 5 minutes</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Bite-size, hands-on tutorials for the most common image workflows.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border bg-card p-5 hover:shadow-xl hover:border-foreground/20 transition-all"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {p.readingTime} min
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-tight group-hover:text-primary">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
