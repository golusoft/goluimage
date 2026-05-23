import { isSupabaseConfigured, createSupabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  let items: { id: string; name: string; email: string; message: string; source?: string; created_at?: string }[] = [];
  let configured = isSupabaseConfigured();
  if (configured) {
    try {
      const supabase = await createSupabaseServer();
      const { data } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      items = data || [];
    } catch {
      configured = false;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground mt-1">User messages from the contact form.</p>
      </div>
      {!configured && (
        <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
          Supabase not configured. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to fetch live feedback.
        </div>
      )}
      {configured && items.length === 0 && (
        <div className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">No feedback yet.</div>
      )}
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border bg-card p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold">{it.name}</p>
                <p className="text-xs text-muted-foreground">{it.email} · {it.source || "contact"}</p>
              </div>
              {it.created_at && (
                <p className="text-xs text-muted-foreground">{new Date(it.created_at).toLocaleString()}</p>
              )}
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{it.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
