"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

const RATIOS: { name: string; r: number | null }[] = [
  { name: "Free", r: null },
  { name: "1:1", r: 1 },
  { name: "4:3", r: 4 / 3 },
  { name: "16:9", r: 16 / 9 },
  { name: "9:16", r: 9 / 16 },
  { name: "3:4", r: 3 / 4 },
];

export function CropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [box, setBox] = useState({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
  const [ratio, setRatio] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ kind: string; start: { x: number; y: number }; box: typeof box } | null>(null);

  useEffect(() => {
    if (!file) return;
    loadImage(file).then((i) => {
      setImg(i);
      setBox({ x: 0.1, y: 0.1, w: 0.8, h: 0.8 });
    });
  }, [file]);

  useEffect(() => {
    if (ratio === null) return;
    setBox((b) => {
      const w = b.w;
      const h = w / ratio;
      return { ...b, h };
    });
  }, [ratio]);

  const onPointerDown = (kind: string) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { kind, start: { x: e.clientX, y: e.clientY }, box };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = (e.clientX - drag.current.start.x) / rect.width;
    const dy = (e.clientY - drag.current.start.y) / rect.height;
    const b = { ...drag.current.box };
    if (drag.current.kind === "move") {
      b.x = Math.max(0, Math.min(1 - b.w, b.x + dx));
      b.y = Math.max(0, Math.min(1 - b.h, b.y + dy));
    } else if (drag.current.kind === "br") {
      b.w = Math.max(0.05, Math.min(1 - b.x, b.w + dx));
      if (ratio !== null) b.h = b.w / ratio;
      else b.h = Math.max(0.05, Math.min(1 - b.y, b.h + dy));
    }
    setBox(b);
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const cropAndDownload = async () => {
    if (!img) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const sx = Math.round(box.x * w);
    const sy = Math.round(box.y * h);
    const sw = Math.round(box.w * w);
    const sh = Math.round(box.h * h);
    const { canvas, ctx } = makeCanvas(sw, sh);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    const blob = await canvasToBlob(canvas, "image/png");
    downloadBlob(blob, "cropped.png");
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {img && (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div
            ref={wrapRef}
            className="relative rounded-2xl border bg-muted/30 overflow-hidden select-none touch-none"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt="" className="block w-full" />
            <div
              onPointerDown={onPointerDown("move")}
              className="absolute border-2 border-primary bg-primary/10 cursor-move"
              style={{
                left: `${box.x * 100}%`,
                top: `${box.y * 100}%`,
                width: `${box.w * 100}%`,
                height: `${box.h * 100}%`,
              }}
            >
              <span
                onPointerDown={onPointerDown("br")}
                className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-primary cursor-se-resize"
              />
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div>
              <Label>Aspect ratio</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {RATIOS.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => setRatio(r.r)}
                    className={`rounded-lg border p-2 text-xs ${
                      ratio === r.r ? "border-foreground bg-foreground text-background" : ""
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="gradient" className="w-full" onClick={cropAndDownload}>
              <Download className="h-4 w-4" /> Crop &amp; Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
