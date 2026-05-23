import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About GoluImages",
  description: "Why we build privacy-first, browser-based image tools — and where we are headed.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">About</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Building the <span className="gradient-text">last image toolkit</span> you will ever need.
        </h1>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            GoluImages started with a simple frustration: every &quot;free&quot; image tool on the web wanted my email, throttled my files, and quietly uploaded everything I touched. Modern browsers can do all of this work locally — so we built a product that does.
          </p>
          <p>
            Today, GoluImages is 30+ blazing-fast image utilities running entirely in your browser. No signup. No upload limits. No data leaving your device. Funded by tasteful ads and optional affiliate links so the product can stay free, forever.
          </p>
          <p>
            We are a small, focused team obsessed with three things: <strong>speed</strong>, <strong>privacy</strong> and <strong>quality</strong>. Everything we ship has to make those three numbers go up.
          </p>
        </div>
        <Link href="/tools" className="mt-10 inline-flex items-center gap-1 font-medium text-primary">
          Try the tools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
