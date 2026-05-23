import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { ArrowRight, Clock } from "lucide-react";

export function BlogPreviews() {
  const recent = POSTS.slice(0, 3);
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">From the blog</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">SEO and image-tools insights</h2>
        </div>
        <Link href="/blog" className="text-sm font-medium hover:underline inline-flex items-center gap-1">
          All posts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {recent.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:border-foreground/20 transition-all"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 relative overflow-hidden">
              <div className="absolute inset-0 grid place-items-center text-white text-3xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                {p.tags[0]?.toUpperCase()}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="capitalize">{p.category}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.readingTime} min
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-tight line-clamp-2">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
