"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^.+@.+\..+$/)) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error("Failed");
      setDone(true);
      toast.success("Subscribed — check your inbox.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-10 sm:p-14 text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
              Newsletter
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              The Image Tools weekly — best new tools, SEO tips and tutorials.
            </h2>
            <p className="mt-3 text-white/80 max-w-md">
              One email every Friday. No spam. Unsubscribe in one click.
            </p>
          </div>

          <form onSubmit={onSubmit} className="md:justify-self-end w-full md:max-w-md">
            <div className="flex gap-2 rounded-xl bg-white/15 backdrop-blur p-1.5 border border-white/20">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={done}
                placeholder="you@company.com"
                className="border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 h-11"
              />
              <Button
                type="submit"
                disabled={loading || done}
                className="h-10 bg-white text-black hover:bg-white/90"
              >
                {done ? <><Check className="h-4 w-4" /> Subscribed</> : <>Subscribe <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </div>
            <p className="mt-2 text-xs text-white/70">By subscribing you agree to our Privacy Policy.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
