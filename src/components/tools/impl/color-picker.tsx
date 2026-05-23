"use client";
import { useEffect, useRef, useState } from "react";
import { UploadZone } from "../upload-zone";
import { dominantColors, loadImage, pickPixelColor, rgbToHex, rgbToHsl } from "@/lib/image";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function ImageColorPickerTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<{ r: number; g: number; b: number } | null>(null);
  const [palette, setPalette] = useState<{ r: number; g: number; b: number }[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const handle = async (files: File[]) => {
    const img = await loadImage(files[0]);
    const c = canvasRef.current!;
    const max = 800;
    const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    c.width = img.naturalWidth * ratio;
    c.height = img.naturalHeight * ratio;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    setPalette(dominantColors(c, 6));
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    pick(e);
  };

  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * c.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * c.height);
    const p = pickPixelColor(c, x, y);
    if (p) setColor({ r: p.r, g: p.g, b: p.b });
  };

  const copy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
    toast.success("Copied");
  };

  useEffect(() => {
    if (palette.length > 0) setColor(palette[0]);
  }, [palette]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center min-h-[300px]">
          <canvas
            ref={canvasRef}
            className="max-w-full rounded-lg cursor-crosshair"
            onClick={pick}
            onMouseMove={onMove}
          />
        </div>
        <div className="space-y-4">
          {color && (
            <div className="rounded-2xl border bg-card p-4 space-y-3">
              <div
                className="aspect-video w-full rounded-lg border"
                style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
              />
              {[
                { k: "HEX", v: rgbToHex(color.r, color.g, color.b) },
                { k: "RGB", v: `rgb(${color.r}, ${color.g}, ${color.b})` },
                {
                  k: "HSL",
                  v: (() => {
                    const h = rgbToHsl(color.r, color.g, color.b);
                    return `hsl(${h.h}, ${h.s}%, ${h.l}%)`;
                  })(),
                },
              ].map((c) => (
                <div key={c.k} className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">{c.k}</div>
                    <div className="text-sm font-mono">{c.v}</div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => copy(c.k, c.v)}>
                    {copied === c.k ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          )}
          {palette.length > 0 && (
            <div className="rounded-2xl border bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Palette</p>
              <div className="grid grid-cols-6 gap-2">
                {palette.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(p)}
                    className="aspect-square rounded-lg border"
                    style={{ background: `rgb(${p.r}, ${p.g}, ${p.b})` }}
                    aria-label={rgbToHex(p.r, p.g, p.b)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
