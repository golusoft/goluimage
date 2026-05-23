import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured, createSupabaseServer } from "@/lib/supabase";

const schema = z.object({
  event: z.string().min(1).max(80),
  path: z.string().min(1).max(500),
  meta: z.record(z.unknown()).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true });
  }
  try {
    const supabase = await createSupabaseServer();
    await supabase.from("events").insert({
      event: parsed.data.event,
      path: parsed.data.path,
      meta: parsed.data.meta ?? {},
      ts: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
