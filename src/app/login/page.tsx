import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoginForm } from "./_form";
import { Logo } from "@/components/layout/logo";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Admin Login",
  description: "Restricted access.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-xl">
          <div className="text-center mb-6">
            <Sparkles className="mx-auto h-6 w-6 text-fuchsia-500" />
            <h1 className="mt-3 text-xl font-semibold">Admin sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">Restricted area. Authorized users only.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
