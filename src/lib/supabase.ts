import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(url && anon);
}

export function createSupabaseBrowser() {
  if (!url || !anon) throw new Error("Supabase env vars missing");
  return createBrowserClient(url, anon);
}

export async function createSupabaseServer() {
  if (!url || !anon) throw new Error("Supabase env vars missing");
  const cookieStore = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: CookieOptions }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // server components cannot set cookies; ignore
        }
      },
    },
  });
}
