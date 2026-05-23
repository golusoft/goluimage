import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-bold tracking-tight", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/30">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </span>
      <span className="text-lg">
        Golu<span className="gradient-text">Images</span>
      </span>
    </Link>
  );
}
