import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PSEO_BY_SLUG, PSEO_PAGES } from "@/lib/programmatic";
import { TOOLS_BY_SLUG } from "@/lib/tools";
import { ToolRenderer } from "@/components/tools/registry";
import { ToolCard } from "@/components/home/tool-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildMetadata, breadcrumbLD, faqLD, jsonLdScript } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return PSEO_PAGES.map((p) => ({ pseo: p.slug }));
}

export const dynamicParams = false;

interface Params {
  params: Promise<{ pseo: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { pseo } = await params;
  const page = PSEO_BY_SLUG[pseo];
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: [page.intent],
  });
}

export default async function ProgrammaticSeoPage({ params }: Params) {
  const { pseo } = await params;
  const page = PSEO_BY_SLUG[pseo];
  if (!page) notFound();
  const tool = TOOLS_BY_SLUG[page.toolSlug];
  const sibling = PSEO_PAGES.filter((p) => p.toolSlug === page.toolSlug && p.slug !== page.slug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLD(page.faqs))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLD([
            { name: "Home", url: absoluteUrl("/") },
            { name: page.h1, url: absoluteUrl(`/${page.slug}`) },
          ])
        )}
      />

      <div className="container py-10">
        <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> All tools
        </Link>

        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Free online tool</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">{page.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: page.body }} />
        </div>

        <div className="rounded-3xl border bg-card p-4 sm:p-6 lg:p-8 shadow-sm">
          {tool ? <ToolRenderer slug={tool.slug} /> : <p>Tool unavailable.</p>}
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">FAQs</h2>
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
            {page.faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="last:border-b-0">
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {sibling.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">More like this</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sibling.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="rounded-xl border bg-card p-4 hover:bg-accent transition-colors"
                >
                  <p className="text-sm font-medium">{s.h1}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{s.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {tool && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Related image tools</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(tool.related || [])
                .map((s) => TOOLS_BY_SLUG[s])
                .filter(Boolean)
                .map((t, i) => (
                  <ToolCard key={t.slug} tool={t} index={i} />
                ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
