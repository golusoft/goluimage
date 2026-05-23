import { TOOLS } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Flame } from "lucide-react";

export function TrendingTools() {
  const tools = TOOLS.filter((t) => t.trending).slice(0, 8);
  return (
    <section className="container py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-500 mb-2 inline-flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5" /> Trending now
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What people are using this week</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>
    </section>
  );
}
