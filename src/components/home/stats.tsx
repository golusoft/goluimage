"use client";
import { motion } from "framer-motion";

const STATS = [
  { value: "30+", label: "Free image tools" },
  { value: "10M+", label: "Images processed" },
  { value: "0¢", label: "Hosting cost per image" },
  { value: "100%", label: "Browser-based" },
];

export function Stats() {
  return (
    <section className="container py-16">
      <div className="rounded-3xl border bg-gradient-to-br from-background via-background to-primary/5 p-8 sm:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
