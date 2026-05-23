import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  // Admin-only — never expose UptimeRobot key publicly.
  const session = await verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.UPTIMEROBOT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "UPTIMEROBOT_API_KEY not configured" }, { status: 500 });
  }
  try {
    const r = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-cache" },
      body: new URLSearchParams({ api_key: apiKey, format: "json", logs: "0" }).toString(),
      next: { revalidate: 60 },
    });
    const data = await r.json();
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "UptimeRobot request failed" }, { status: 502 });
  }
}
