import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Search,
  DollarSign,
  Wrench,
  MessageSquare,
  LogOut,
  Activity,
} from "lucide-react";
import { LogoutButton } from "./_logout";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/adsense", label: "AdSense", icon: DollarSign },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/health", label: "Health", icon: Activity },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:flex flex-col border-r bg-background min-h-screen sticky top-0 h-screen">
          <div className="px-5 py-5 border-b">
            <Logo />
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">Admin</p>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            {NAV.map((n) => {
              const I = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <I className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-3">
            <div className="px-3 py-2 text-xs">
              <p className="font-medium truncate">{session.email}</p>
              <p className="text-muted-foreground">Administrator</p>
            </div>
            <LogoutButton />
          </div>
        </aside>

        <div className="flex flex-col min-h-screen">
          <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:hidden">
            <Logo />
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View site →
            </Link>
          </header>
          <main className="p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
