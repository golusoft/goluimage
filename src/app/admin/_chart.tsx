"use client";
import { useMemo } from "react";

export function TrafficChart() {
  const data = useMemo(() => {
    // Deterministic synthetic traffic curve until real GA data wires in.
    const days = 30;
    const points: { d: number; v: number }[] = [];
    for (let i = 0; i < days; i++) {
      const trend = 1500 + i * 75;
      const noise = Math.sin(i * 0.7) * 320 + Math.cos(i * 0.3) * 180;
      const dow = i % 7 < 5 ? 1.0 : 0.65;
      points.push({ d: i, v: Math.max(400, Math.round((trend + noise) * dow)) });
    }
    return points;
  }, []);
  const max = Math.max(...data.map((p) => p.v));
  const w = 600;
  const h = 200;
  const path = data
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (data.length - 1)) * w} ${h - (p.v / max) * (h - 20) - 10}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#grad)" />
        <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
