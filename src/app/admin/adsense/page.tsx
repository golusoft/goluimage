export default function AdsensePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AdSense</h1>
        <p className="text-muted-foreground mt-1">Revenue overview and ad placement health.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Revenue (30d)", v: "$3,842.16" },
          { l: "Impressions", v: "1.4M" },
          { l: "RPM", v: "$2.71" },
          { l: "CTR", v: "1.84%" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border bg-card p-5">
            <p className="text-xs text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-2">Ad placements</h2>
        <ul className="text-sm divide-y">
          {[
            { id: "below-tool", area: "Below tool", health: "OK" },
            { id: "sidebar", area: "Sidebar", health: "OK" },
            { id: "blog-inline", area: "Blog inline", health: "Pending" },
          ].map((p) => (
            <li key={p.id} className="flex justify-between py-2.5">
              <span className="font-mono">{p.id}</span>
              <span className="text-muted-foreground">{p.area}</span>
              <span className={p.health === "OK" ? "text-emerald-500" : "text-amber-500"}>{p.health}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          Set <code>NEXT_PUBLIC_ADSENSE_CLIENT</code> in environment to activate live ads.
        </p>
      </div>
    </div>
  );
}
