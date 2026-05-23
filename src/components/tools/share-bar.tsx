"use client";
import { Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useState } from "react";
import { absoluteUrl } from "@/lib/utils";

export function ShareBar({ tool }: { tool: Tool }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(`/tools/${tool.slug}`);
  const text = encodeURIComponent(`${tool.name} — ${tool.tagline}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const items = [
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: Linkedin,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: Facebook,
    },
  ];

  return (
    <div className="flex items-center gap-1 self-start">
      {items.map((i) => {
        const I = i.icon;
        return (
          <a
            key={i.label}
            href={i.href}
            aria-label={`Share on ${i.label}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent transition-colors"
          >
            <I className="h-4 w-4" />
          </a>
        );
      })}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
