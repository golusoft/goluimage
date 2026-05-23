import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured, createSupabaseServer } from "@/lib/supabase";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!isSupabaseConfigured()) {
    // Soft-success in dev when Supabase is not yet configured.
    return NextResponse.json({ ok: true, note: "supabase-not-configured" });
  }
  try {
    const supabase = await createSupabaseServer();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email })
      .select()
      .maybeSingle();
    if (error && !error.message.includes("duplicate")) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Save failed" }, { status: 500 });
  }
}
