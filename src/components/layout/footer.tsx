import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { Logo } from "./logo";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";

export function Footer() {
  const popularTools = TOOLS.filter((t) => t.featured || t.trending).slice(0, 6);

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Premium browser-based image tools for creators, marketers and developers. 100% free, no signup, no upload limits.
            </p>
            <div className="flex items-center gap-2">
              <Link href="https://twitter.com" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://github.com" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="/contact" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-accent">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Popular tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {popularTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="hover:text-foreground transition-colors">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-foreground transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/tutorials" className="hover:text-foreground">Tutorials</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GoluImages. All rights reserved.</p>
          <p className="text-center">
            Built with Next.js 15 · Hosted on Vercel · Made for creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
