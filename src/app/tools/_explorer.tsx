"use client";
import { useMemo, useState, useEffect, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Flame, Sparkles } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import { ToolCard } from "@/components/home/tool-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FilterId = "all" | "trending" | "featured" | CategoryId;

export function ToolsExplorer() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get("q") || "";
  const [q, setQ] = useState(initialQ);
  const [filter, setFilter] = useState<FilterId>("all");

  useEffect(() => {
    setQ(searchParams?.get("q") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = TOOLS;
    if (filter === "trending") list = list.filter((t) => t.trending);
    else if (filter === "featured") list = list.filter((t) => t.featured);
    else if (filter !== "all") list = list.filter((t) => t.category === filter);
    if (term) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.tagline.toLowerCase().includes(term) ||
          t.keywords.some((k) => k.toLowerCase().includes(term))
      );
    }
    return list;
  }, [q, filter]);

  const filterPills: { id: FilterId; label: string; icon?: ReactNode }[] = [
    { id: "all", label: "All" },
    { id: "trending", label: "Trending", icon: <Flame className="h-3 w-3" /> },
    { id: "featured", label: "Featured", icon: <Sparkles className="h-3 w-3" /> },
    ...CATEGORIES.map((c) => ({ id: c.id as FilterId, label: c.name })),
  ];

  return (
    <section className="container pb-20">
      <div className="sticky top-16 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus={!!initialQ}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools by name, format or keyword…"
              className="pl-11 h-12 text-base"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin -mx-1 px-1 pb-1">
            {filterPills.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === p.id
                    ? "border-foreground bg-foreground text-background"
                    : "hover:bg-accent text-muted-foreground"
                )}
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <p className="text-lg font-medium">No tools match “{q}”</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different keyword or browse all tools.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing <strong className="text-foreground">{filtered.length}</strong> tools
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
