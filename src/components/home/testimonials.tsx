"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Frontend Engineer @ Linear",
    quote:
      "I replaced three paid tools and a Photoshop step with GoluImages. The compressor alone saves me an hour a week.",
    avatar: "SC",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "David Patel",
    role: "Founder, Indie Hacker",
    quote:
      "Bulk WebP conversion before deploys is a game changer. My Lighthouse score jumped from 78 to 96 overnight.",
    avatar: "DP",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Maya Rodríguez",
    role: "Content Creator",
    quote:
      "The Instagram resizer with safe-zone preview is the only tool I trust for client deliverables. So fast.",
    avatar: "MR",
    color: "from-pink-500 to-orange-500",
  },
  {
    name: "James Wong",
    role: "SEO Lead @ B2B SaaS",
    quote:
      "Their programmatic SEO pages rank for hundreds of long-tail keywords. The product just works.",
    avatar: "JW",
    color: "from-emerald-500 to-teal-500",
  },
];

export function Testimonials() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Loved worldwide
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Built for serious creators
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed">{t.quote}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${t.color} text-white text-xs font-semibold`}>
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
