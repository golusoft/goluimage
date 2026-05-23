"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

const PRESETS = [
  { id: "post", name: "Post (1:1)", w: 1080, h: 1080 },
  { id: "portrait", name: "Portrait (4:5)", w: 1080, h: 1350 },
  { id: "story", name: "Story / Reel (9:16)", w: 1080, h: 1920 },
  { id: "landscape", name: "Landscape (1.91:1)", w: 1080, h: 566 },
];

export function InstagramResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState(PRESETS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const img = await loadImage(file);
      const c = canvasRef.current!;
      c.width = preset.w;
      c.height = preset.h;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, c.width, c.height);
      const scale = Math.max(preset.w / img.naturalWidth, preset.h / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (preset.w - w) / 2, (preset.h - h) / 2, w, h);
      // Safe-zone overlay (visual only — not encoded)
      const blob = await canvasToBlob(c, "image/jpeg", 0.92);
      setResultBlob(blob);
    })();
  }, [file, preset]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border bg-muted/30 p-6 grid place-items-center relative">
            <canvas ref={canvasRef} className="max-h-[460px] max-w-full rounded-lg shadow-lg" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[80%] h-[80%] border-2 border-white/40 border-dashed rounded-lg" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <Label>Preset</Label>
            <div className="grid gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p)}
                  className={`rounded-lg border p-3 text-left text-sm ${preset.id === p.id ? "border-foreground bg-foreground text-background" : ""}`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs opacity-70">{p.w}×{p.h}</div>
                </button>
              ))}
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, `ig-${preset.id}.jpg`)}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
