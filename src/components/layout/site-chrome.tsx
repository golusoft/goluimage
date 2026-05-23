"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const hide = pathname.startsWith("/admin") || pathname.startsWith("/login");
  return (
    <>
      {!hide && <Navbar />}
      <main className="min-h-[60vh]">{children}</main>
      {!hide && <Footer />}
    </>
  );
}
