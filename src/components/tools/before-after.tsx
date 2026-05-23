"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function BeforeAfter({
  beforeUrl,
  afterUrl,
  className,
}: {
  beforeUrl: string;
  afterUrl: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const v = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setPos(v);
    };
    const mouse = (e: MouseEvent) => {
      if (e.buttons === 1) onMove(e.clientX);
    };
    const touch = (e: TouchEvent) => onMove(e.touches[0].clientX);
    el.addEventListener("mousemove", mouse);
    el.addEventListener("touchmove", touch);
    return () => {
      el.removeEventListener("mousemove", mouse);
      el.removeEventListener("touchmove", touch);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border bg-muted select-none touch-none",
        className
      )}
      onClick={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setPos(((e.clientX - rect.left) / rect.width) * 100);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={beforeUrl} alt="before" className="block w-full h-auto" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterUrl}
          alt="after"
          className="block w-full h-auto"
          style={{ minWidth: `${10000 / pos}%` }}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">BEFORE</span>
      <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">AFTER</span>
    </div>
  );
}
