import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export function InternalLinks() {
  return (
    <section className="container py-16">
      <div className="rounded-3xl border bg-muted/30 p-8 sm:p-12">
        <h2 className="text-xl font-semibold tracking-tight mb-6">Quick links to every tool</h2>
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="rounded-full border bg-background px-3 py-1.5 text-xs hover:bg-accent transition-colors"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
