import { TOOLS } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedTools() {
  const tools = TOOLS.filter((t) => t.featured).slice(0, 8);
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Featured</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Most-loved image tools</h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Hand-picked tools used by millions of creators and developers every month.
          </p>
        </div>
        <Link href="/tools" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>
    </section>
  );
}
