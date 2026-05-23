import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { POSTS } from "@/lib/blog";
import { PSEO_PAGES } from "@/lib/programmatic";
import { ArrowUpRight, TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";
import { TrafficChart } from "./_chart";

const STATS = [
  { label: "Visitors (30d)", value: "184,210", delta: "+18.4%", icon: Users },
  { label: "Page views", value: "612,455", delta: "+22.1%", icon: Eye },
  { label: "Tool runs", value: "1.2M", delta: "+34%", icon: MousePointerClick },
  { label: "Avg position", value: "8.4", delta: "+1.2", icon: TrendingUp },
];

const TOP_TOOLS: { slug: string; runs: number; trend: number }[] = [
  { slug: "image-compressor", runs: 84210, trend: 12 },
  { slug: "remove-background", runs: 41020, trend: 22 },
  { slug: "jpg-to-webp", runs: 38201, trend: 8 },
  { slug: "passport-photo-maker", runs: 28110, trend: 31 },
  { slug: "qr-code-generator", runs: 20050, trend: 4 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time snapshot of your image-tools empire.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => {
          const I = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <I className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">{s.delta} vs prev period</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Traffic — last 30 days</h2>
            <Link href="/admin/analytics" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Full report <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <TrafficChart />
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Top tools</h2>
          <ul className="space-y-3">
            {TOP_TOOLS.map((t) => {
              const tool = TOOLS.find((x) => x.slug === t.slug)!;
              return (
                <li key={t.slug} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{t.runs.toLocaleString()} runs</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+{t.trend}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Catalog</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat title="Tools" value={TOOLS.length} />
            <Stat title="Blog" value={POSTS.length} />
            <Stat title="pSEO pages" value={PSEO_PAGES.length} />
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Quick actions</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <Action href="/admin/blog" title="Write a new blog post" />
            <Action href="/admin/seo" title="Check SEO performance" />
            <Action href="/admin/adsense" title="Manage AdSense placements" />
            <Action href="/admin/feedback" title="Read user feedback" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted/40 p-4">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
    </div>
  );
}

function Action({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border p-3 text-sm font-medium hover:bg-accent inline-flex items-center justify-between"
    >
      {title} <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
