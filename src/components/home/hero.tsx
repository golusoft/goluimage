"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOOLS } from "@/lib/tools";

const FLOATING = [
  { label: "Image Compressor", x: "8%", y: "20%", emoji: "🗜️" },
  { label: "Background Remover", x: "82%", y: "18%", emoji: "✨" },
  { label: "WebP Converter", x: "12%", y: "70%", emoji: "🔄" },
  { label: "QR Generator", x: "84%", y: "68%", emoji: "📱" },
  { label: "Passport Photo", x: "46%", y: "8%", emoji: "🪪" },
];

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim().toLowerCase();
    if (!term) {
      router.push("/tools");
      return;
    }
    const match = TOOLS.find(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.keywords.some((k) => k.toLowerCase().includes(term))
    );
    router.push(match ? `/tools/${match.slug}` : `/tools?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-mesh opacity-70" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-[0.07]" />

      <div className="container relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        {FLOATING.map((f, i) => (
          <motion.div
            key={i}
            className="hidden lg:flex absolute glass rounded-2xl px-3 py-2 text-xs font-medium gap-1.5 items-center shadow-lg"
            style={{ left: f.x, top: f.y }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.4 + i * 0.1, duration: 0.6 },
              y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </motion.div>
        ))}

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-3 py-1 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
            <span>30+ free image tools — running entirely in your browser</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            The complete <span className="gradient-text">image toolkit</span>
            <br />for the modern web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Compress, resize, convert, watermark and enhance any image — instantly, in your browser. No signup. No upload limits. No quality loss.
          </motion.p>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 mx-auto max-w-xl"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/40 via-fuchsia-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative flex items-center gap-2 rounded-2xl border bg-background/80 backdrop-blur p-2 pl-4 shadow-xl">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try ‘compress to 50kb’, ‘heic to jpg’, ‘remove background’…"
                  className="flex-1 bg-transparent py-2 text-sm sm:text-base outline-none placeholder:text-muted-foreground"
                />
                <Button type="submit" variant="gradient" size="lg" className="hidden sm:inline-flex">
                  Search <ArrowRight className="h-4 w-4" />
                </Button>
                <Button type="submit" variant="gradient" size="icon" className="sm:hidden">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Popular:</span>
              {["Image Compressor", "Remove Background", "JPG to WebP", "Passport Photo"].map((t) => {
                const tool = TOOLS.find((x) => x.name === t);
                if (!tool) return null;
                return (
                  <Link
                    key={t}
                    href={`/tools/${tool.slug}`}
                    className="rounded-full border px-2.5 py-1 hover:bg-accent transition-colors"
                  >
                    {t}
                  </Link>
                );
              })}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex items-center justify-center gap-3 flex-wrap"
          >
            <Button asChild size="xl" variant="gradient">
              <Link href="/tools">
                Explore all 30 tools <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/blog">Read the blog</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
