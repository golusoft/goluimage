import { HealthClient } from "./_client";

export default function HealthPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Website health</h1>
        <p className="text-muted-foreground mt-1">Live UptimeRobot status and Web Vitals.</p>
      </div>
      <HealthClient />
    </div>
  );
}
