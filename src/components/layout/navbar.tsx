"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/tools", label: "All Tools" },
  { href: "/categories/compress", label: "Compress" },
  { href: "/categories/convert", label: "Convert" },
  { href: "/categories/social", label: "Social" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all",
          scrolled ? "border-b border-border/60 bg-background/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const active = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors min-w-56"
              aria-label="Search tools"
            >
              <Search className="h-4 w-4" />
              <span>Search 30+ tools…</span>
              <kbd className="ml-auto hidden lg:inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="sm:hidden rounded-xl border border-border/60 p-2 text-muted-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <Button asChild size="sm" variant="gradient" className="hidden md:inline-flex">
              <Link href="/tools">
                <Sparkles className="h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <button
              className="md:hidden rounded-xl border border-border/60 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
            <nav className="container py-3 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="gradient" className="mt-2">
                <Link href="/tools">Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
