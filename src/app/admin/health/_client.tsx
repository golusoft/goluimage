"use client";
import { useEffect, useState } from "react";

interface Monitor {
  id: number;
  friendly_name: string;
  url: string;
  status: number;
  all_time_uptime_ratio: string;
}

const STATUS_LABEL: Record<number, { label: string; color: string }> = {
  0: { label: "Paused", color: "bg-muted text-muted-foreground" },
  1: { label: "Not checked yet", color: "bg-muted text-muted-foreground" },
  2: { label: "Up", color: "bg-emerald-500/10 text-emerald-600" },
  8: { label: "Seems down", color: "bg-amber-500/10 text-amber-600" },
  9: { label: "Down", color: "bg-rose-500/10 text-rose-600" },
};

export function HealthClient() {
  const [monitors, setMonitors] = useState<Monitor[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/uptime");
        const data = await r.json();
        if (!r.ok || !data.ok) {
          setError(data.error || "Failed to load");
          return;
        }
        setMonitors(data.data?.monitors || []);
      } catch {
        setError("Network error");
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
        {error}
        <p className="mt-2 text-xs">
          Set <code>UPTIMEROBOT_API_KEY</code> in environment variables to enable live status.
        </p>
      </div>
    );
  }
  if (!monitors) {
    return <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">Loading…</div>;
  }
  if (monitors.length === 0) {
    return <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">No monitors configured.</div>;
  }

  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3">Monitor</th>
            <th className="text-left px-4 py-3">URL</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-right px-4 py-3">Uptime</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {monitors.map((m) => {
            const s = STATUS_LABEL[m.status] || STATUS_LABEL[0];
            return (
              <tr key={m.id}>
                <td className="px-4 py-3 font-medium">{m.friendly_name}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono truncate max-w-xs">{m.url}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${s.color}`}>{s.label}</span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{Number(m.all_time_uptime_ratio).toFixed(3)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
