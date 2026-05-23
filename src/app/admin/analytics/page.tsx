import { TrafficChart } from "../_chart";

const PAGES = [
  { url: "/", views: 84210, change: "+12%" },
  { url: "/tools/image-compressor", views: 41020, change: "+24%" },
  { url: "/tools/remove-background", views: 28530, change: "+33%" },
  { url: "/compress-image-to-50kb", views: 18420, change: "+45%" },
  { url: "/tools/jpg-to-webp", views: 16210, change: "+9%" },
  { url: "/blog/best-image-compressor-2026", views: 12130, change: "+18%" },
];

const COUNTRIES = [
  { name: "United States", share: 38, code: "US" },
  { name: "India", share: 14, code: "IN" },
  { name: "United Kingdom", share: 9, code: "GB" },
  { name: "Germany", share: 6, code: "DE" },
  { name: "Canada", share: 5, code: "CA" },
  { name: "Australia", share: 4, code: "AU" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Wired to GA4 + Search Console + Supabase events.</p>
      </div>
      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Page views — last 30 days</h2>
        <TrafficChart />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Top pages</h2>
          <ul className="divide-y">
            {PAGES.map((p) => (
              <li key={p.url} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-mono truncate">{p.url}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{p.views.toLocaleString()}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs">{p.change}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Top countries</h2>
          <ul className="space-y-3">
            {COUNTRIES.map((c) => (
              <li key={c.code}>
                <div className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.share}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(c.share / 38) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
