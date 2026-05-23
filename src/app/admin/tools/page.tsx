import { TOOLS } from "@/lib/tools";
import { CATEGORIES, getCategory } from "@/lib/categories";
import Link from "next/link";

export default function AdminToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground mt-1">All {TOOLS.length} image tools and their configuration.</p>
      </div>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Tool</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {TOOLS.map((t) => {
              const c = getCategory(t.category);
              return (
                <tr key={t.slug}>
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.name}</td>
                  <td className="px-4 py-3">
                    {t.comingSoon ? (
                      <span className="rounded-full bg-amber-500/10 text-amber-600 px-2 py-0.5 text-xs">Beta</span>
                    ) : (
                      <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-0.5 text-xs">Live</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/tools/${t.slug}`} target="_blank" className="text-primary hover:underline">
                      Open ↗
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground">
        Categories: {CATEGORIES.map((c) => c.name).join(" · ")}
      </div>
    </div>
  );
}
