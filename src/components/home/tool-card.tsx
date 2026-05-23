"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";
import type { Tool } from "@/lib/tools";
import { getCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const cat = getCategory(tool.category);
  const Icon = (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[
    tool.icon
  ] || Icons.Image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 hover:border-foreground/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              cat.gradient
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex gap-1">
            {tool.trending && (
              <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                TRENDING
              </span>
            )}
            {tool.comingSoon && (
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                BETA
              </span>
            )}
          </div>
        </div>
        <h3 className="mt-4 text-base font-semibold tracking-tight">{tool.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {tool.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{cat.name}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1 inline-flex items-center gap-1 text-foreground font-medium">
            Open <Icons.ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
