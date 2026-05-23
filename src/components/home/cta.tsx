import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-3xl border bg-card p-10 sm:p-16 text-center">
        <div className="absolute inset-0 -z-10 gradient-mesh opacity-50" />
        <Sparkles className="mx-auto h-8 w-8 text-fuchsia-500" />
        <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight">
          Ready to <span className="gradient-text">ship faster images</span>?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Join millions of creators using GoluImages every day. No signup, no upload limits, no nonsense.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Button asChild size="xl" variant="gradient">
            <Link href="/tools">
              Start with any tool <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/blog">Learn the playbook</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
