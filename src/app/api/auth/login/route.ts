import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, checkAdminCredentials, signAdminToken } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Tiny in-memory rate limiter (per-IP). Resets on cold start.
const attempts = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const r = attempts.get(ip);
  if (!r || now - r.ts > WINDOW_MS) {
    attempts.set(ip, { count: 1, ts: now });
    return false;
  }
  r.count++;
  if (r.count > MAX) return true;
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const { email, password } = parsed.data;
  const check = checkAdminCredentials(email, password);
  if (!check.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          check.reason === "admin-not-configured"
            ? "Admin not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in environment variables."
            : "Invalid email or password.",
      },
      { status: 401 }
    );
  }
  const token = await signAdminToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
