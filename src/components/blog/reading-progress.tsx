"use client";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-16 z-40 h-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 transition-[width]" style={{ width: `${p}%` }} />
  );
}
