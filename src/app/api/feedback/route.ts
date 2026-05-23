import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured, createSupabaseServer } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, note: "supabase-not-configured" });
  }
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.from("feedback").insert(parsed.data);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Save failed" }, { status: 500 });
  }
}
