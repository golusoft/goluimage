import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, TOOLS_BY_SLUG } from "@/lib/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { ToolRenderer } from "@/components/tools/registry";
import { buildMetadata, faqLD, breadcrumbLD, softwareApplicationLD, jsonLdScript } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { getCategory } from "@/lib/categories";

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_BY_SLUG[slug];
  if (!tool) return {};
  return buildMetadata({
    title: `${tool.name} — ${tool.tagline}`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function ToolPage({ params }: Params) {
  const { slug } = await params;
  const tool = TOOLS_BY_SLUG[slug];
  if (!tool) notFound();
  const cat = getCategory(tool.category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          softwareApplicationLD({
            name: tool.name,
            description: tool.description,
            url: absoluteUrl(`/tools/${tool.slug}`),
            ratingValue: 4.9,
            ratingCount: 5240,
          })
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLD(tool.faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLD([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Tools", url: absoluteUrl("/tools") },
            { name: cat.name, url: absoluteUrl(`/categories/${cat.slug}`) },
            { name: tool.name, url: absoluteUrl(`/tools/${tool.slug}`) },
          ])
        )}
      />
      <ToolShell tool={tool}>
        <ToolRenderer slug={tool.slug} />
      </ToolShell>
    </>
  );
}
