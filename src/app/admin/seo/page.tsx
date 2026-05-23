import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { ExternalLink } from "lucide-react";

const KEYWORDS = [
  { kw: "image compressor", pos: 4, change: -1, vol: 246000 },
  { kw: "compress image to 50kb", pos: 3, change: 2, vol: 33000 },
  { kw: "remove background", pos: 9, change: 0, vol: 1800000 },
  { kw: "jpg to webp", pos: 6, change: 3, vol: 90500 },
  { kw: "passport photo maker", pos: 11, change: 4, vol: 49500 },
  { kw: "heic to jpg", pos: 7, change: -2, vol: 165000 },
];

export default function SeoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO</h1>
        <p className="text-muted-foreground mt-1">Search Console layout — wires to live GSC API in production.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Top keywords</h2>
          <Link
            href="https://search.google.com/search-console"
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            Open Search Console <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground border-b">
            <tr>
              <th className="text-left py-2">Keyword</th>
              <th className="text-right">Position</th>
              <th className="text-right">Δ</th>
              <th className="text-right">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {KEYWORDS.map((k) => (
              <tr key={k.kw}>
                <td className="py-2.5 font-medium">{k.kw}</td>
                <td className="text-right tabular-nums">{k.pos}</td>
                <td className={`text-right tabular-nums ${k.change > 0 ? "text-emerald-500" : k.change < 0 ? "text-rose-500" : "text-muted-foreground"}`}>
                  {k.change > 0 ? "↑" : k.change < 0 ? "↓" : "—"} {Math.abs(k.change)}
                </td>
                <td className="text-right tabular-nums text-muted-foreground">{k.vol.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-sm font-semibold mb-1">Indexed pages</h2>
          <p className="text-3xl font-bold">{TOOLS.length + 50}</p>
          <p className="text-xs text-muted-foreground mt-1">via XML sitemap</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-sm font-semibold mb-1">Schema coverage</h2>
          <p className="text-3xl font-bold">100%</p>
          <p className="text-xs text-muted-foreground mt-1">FAQ, Breadcrumb, SoftwareApplication</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-sm font-semibold mb-1">Lighthouse</h2>
          <p className="text-3xl font-bold">98 / 100</p>
          <p className="text-xs text-muted-foreground mt-1">avg across main routes</p>
        </div>
      </div>
    </div>
  );
}
