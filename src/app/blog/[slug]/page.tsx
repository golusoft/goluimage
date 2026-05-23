import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, POSTS_BY_SLUG, relatedPosts } from "@/lib/blog";
import { buildMetadata, articleLD, breadcrumbLD, jsonLdScript } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { ShareBar } from "@/components/tools/share-bar";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS_BY_SLUG[slug];
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    keywords: p.tags,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const p = POSTS_BY_SLUG[slug];
  if (!p) notFound();
  const related = relatedPosts(slug);
  const url = absoluteUrl(`/blog/${p.slug}`);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleLD({
            title: p.title,
            description: p.description,
            url,
            image: absoluteUrl(p.cover),
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            authorName: p.author.name,
          })
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLD([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Blog", url: absoluteUrl("/blog") },
            { name: p.title, url },
          ])
        )}
      />

      <div className="container py-10">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="capitalize rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                {p.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(p.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {p.readingTime} min read
              </span>
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">{p.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.description}</p>

            <div className="mt-8 flex items-center justify-between gap-4 border-y py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-semibold">
                  {p.author.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{p.author.name}</p>
                  <p className="text-xs text-muted-foreground">{p.author.bio}</p>
                </div>
              </div>
              <ShareBar tool={{ slug: p.slug, name: p.title, tagline: p.description } as never} />
            </div>

            <div
              className="mt-10 prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl prose-h3:mt-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: p.body }}
            />

            <div className="mt-10 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>

            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">Keep reading</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="rounded-2xl border bg-card p-5 hover:shadow-lg hover:border-foreground/20 transition-all"
                    >
                      <p className="text-xs text-muted-foreground capitalize">{r.category}</p>
                      <h3 className="mt-1 font-semibold leading-tight line-clamp-2">{r.title}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border bg-card p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">On this page</p>
                <ul className="space-y-2">
                  {p.toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-5 text-white">
                <h3 className="text-base font-semibold">Try the tools mentioned</h3>
                <p className="mt-1 text-sm text-white/80">All free, browser-based, no signup.</p>
                <Link
                  href="/tools"
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-white text-black px-3 py-1.5 text-sm font-medium"
                >
                  Browse all tools <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
