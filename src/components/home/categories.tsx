"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section className="container py-20">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Browse by category
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Find the right tool in seconds
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => {
          const count = TOOLS.filter((t) => t.category === c.id).length;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/categories/${c.slug}`}
                className="group relative flex h-full flex-col rounded-2xl border bg-card p-6 hover:border-foreground/20 hover:shadow-xl transition-all overflow-hidden"
              >
                <div
                  className={cn(
                    "absolute inset-0 -z-10 opacity-0 group-hover:opacity-10 bg-gradient-to-br transition-opacity",
                    c.gradient
                  )}
                />
                <div className="text-3xl">{c.emoji}</div>
                <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-4 text-xs text-muted-foreground">{count} tools</div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
