import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";
import { ToolCard } from "@/components/home/tool-card";
import { buildMetadata, breadcrumbLD, jsonLdScript } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} Tools — Free Online Image ${cat.name} Tools`,
    description: cat.description,
    path: `/categories/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const tools = TOOLS.filter((t) => t.category === cat.id);

  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLD([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Categories", url: absoluteUrl("/tools") },
            { name: cat.name, url: absoluteUrl(`/categories/${cat.slug}`) },
          ])
        )}
      />
      <div className="max-w-3xl mb-12">
        <span className="text-5xl">{cat.emoji}</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
          {cat.name} <span className="gradient-text">tools</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{cat.description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>
    </div>
  );
}
