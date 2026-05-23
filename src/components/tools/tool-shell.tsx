import Link from "next/link";
import * as Icons from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { Tool } from "@/lib/tools";
import { TOOLS_BY_SLUG } from "@/lib/tools";
import { getCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShareBar } from "./share-bar";
import { AdSlot } from "./ad-slot";

export function ToolShell({ tool, children }: { tool: Tool; children: ReactNode }) {
  const cat = getCategory(tool.category);
  const Icon =
    (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[tool.icon] ||
    Icons.Image;
  const related = (tool.related || [])
    .map((s) => TOOLS_BY_SLUG[s])
    .filter(Boolean) as Tool[];

  return (
    <div className="container py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li><Icons.ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href="/tools" className="hover:text-foreground">Tools</Link></li>
          <li><Icons.ChevronRight className="h-3.5 w-3.5" /></li>
          <li>
            <Link href={`/categories/${cat.slug}`} className="hover:text-foreground">
              {cat.name}
            </Link>
          </li>
          <li><Icons.ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="text-foreground font-medium">{tool.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] items-start mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                cat.gradient
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {cat.name}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{tool.name}</h1>
            </div>
          </div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {tool.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.features.slice(0, 4).map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                <Icons.Check className="h-3 w-3 text-emerald-500" /> {f}
              </span>
            ))}
          </div>
        </div>
        <ShareBar tool={tool} />
      </div>

      {/* Tool */}
      <div className="rounded-3xl border bg-card p-4 sm:p-6 lg:p-8 shadow-sm">{children}</div>

      <AdSlot id="below-tool" className="my-10" />

      {/* Layout: two columns from md+ */}
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* How to */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">How to use the {tool.name}</h2>
            <ol className="space-y-3">
              {tool.howTo.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* All features */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Features</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {tool.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <Icons.CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
              {tool.faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="last:border-b-0">
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          <AdSlot id="sidebar" className="rounded-2xl" />

          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold mb-3">Related tools</h3>
            <div className="space-y-2">
              {related.map((r) => {
                const RIcon =
                  (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[
                    r.icon
                  ] || Icons.Image;
                return (
                  <Link
                    key={r.slug}
                    href={`/tools/${r.slug}`}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors"
                  >
                    <div className={cn("grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br text-white", getCategory(r.category).gradient)}>
                      <RIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{r.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-5 text-white">
            <h3 className="text-base font-semibold">Why GoluImages?</h3>
            <ul className="mt-3 space-y-2 text-sm/relaxed text-white/90">
              <li className="flex gap-2"><Icons.Check className="h-4 w-4 mt-0.5 shrink-0" /> 100% browser-based — your photos stay private</li>
              <li className="flex gap-2"><Icons.Check className="h-4 w-4 mt-0.5 shrink-0" /> No signup, no upload limits</li>
              <li className="flex gap-2"><Icons.Check className="h-4 w-4 mt-0.5 shrink-0" /> Mobile-first, fast on every device</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
