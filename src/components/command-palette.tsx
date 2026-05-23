"use client";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[15vh]"
      onClick={() => onOpenChange(false)}
    >
      <Command
        loop
        className="w-full max-w-xl rounded-2xl border bg-popover shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border/60 px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Command.Input
            value={value}
            onValueChange={setValue}
            placeholder="Search tools, categories, blog…"
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] text-muted-foreground rounded border px-1.5">ESC</kbd>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
            No results.
          </Command.Empty>

          <Command.Group heading="Trending tools" className="text-xs text-muted-foreground px-2 pt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            {TOOLS.filter((t) => t.trending)
              .slice(0, 5)
              .map((t) => (
                <Item
                  key={t.slug}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(`/tools/${t.slug}`);
                  }}
                  icon={<TrendingUp className="h-4 w-4 text-fuchsia-500" />}
                  title={t.name}
                  subtitle={t.tagline}
                />
              ))}
          </Command.Group>

          <Command.Group heading="All tools" className="text-xs text-muted-foreground px-2 pt-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            {TOOLS.map((t) => (
              <Item
                key={t.slug}
                onSelect={() => {
                  onOpenChange(false);
                  router.push(`/tools/${t.slug}`);
                }}
                title={t.name}
                subtitle={t.tagline}
              />
            ))}
          </Command.Group>

          <Command.Group heading="Categories" className="text-xs text-muted-foreground px-2 pt-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
            {CATEGORIES.map((c) => (
              <Item
                key={c.id}
                onSelect={() => {
                  onOpenChange(false);
                  router.push(`/categories/${c.slug}`);
                }}
                title={`${c.emoji} ${c.name}`}
                subtitle={c.description}
              />
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

function Item({
  title,
  subtitle,
  icon,
  onSelect,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-accent",
        className
      )}
    >
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted">
        {icon ?? <Search className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground truncate">{subtitle}</div>}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </Command.Item>
  );
}
