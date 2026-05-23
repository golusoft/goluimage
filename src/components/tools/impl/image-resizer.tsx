"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UploadZone } from "../upload-zone";
import { resizeImage, loadImage } from "@/lib/image";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { Download } from "lucide-react";

const PRESETS = [
  { name: "Instagram Square", w: 1080, h: 1080 },
  { name: "Instagram Story / Reel", w: 1080, h: 1920 },
  { name: "YouTube Thumbnail", w: 1280, h: 720 },
  { name: "Facebook Post", w: 1200, h: 630 },
  { name: "Twitter Card", w: 1600, h: 900 },
  { name: "Pinterest Pin", w: 1000, h: 1500 },
];

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [orig, setOrig] = useState<{ w: number; h: number } | null>(null);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const [lock, setLock] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handle = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
    const img = await loadImage(f);
    setOrig({ w: img.naturalWidth, h: img.naturalHeight });
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (lock && orig) setHeight(Math.round((orig.h / orig.w) * w));
  };
  const updateHeight = (h: number) => {
    setHeight(h);
    if (lock && orig) setWidth(Math.round((orig.w / orig.h) * h));
  };

  const run = async () => {
    if (!file) return;
    const blob = await resizeImage(file, { width, height, format: "image/png" });
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} hint="Drop a JPG, PNG, WebP — original dimensions auto-detected" />

      {file && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl ?? preview ?? ""} alt="" className="max-h-[400px] rounded-xl" />
          </div>

          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">Original</Label>
              <p className="text-sm font-mono mt-1">{orig?.w} × {orig?.h} px</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="w">Width (px)</Label>
                <Input id="w" type="number" value={width} onChange={(e) => updateWidth(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="h">Height (px)</Label>
                <Input id="h" type="number" value={height} onChange={(e) => updateHeight(Number(e.target.value))} />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <Label className="text-sm">Lock aspect ratio</Label>
              <Switch checked={lock} onCheckedChange={setLock} />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">Social presets</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setLock(false);
                      setWidth(p.w);
                      setHeight(p.h);
                    }}
                    className="rounded-lg border p-2 text-xs hover:bg-accent text-left"
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-muted-foreground">{p.w}×{p.h}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button variant="gradient" className="w-full" onClick={run}>
              Resize
            </Button>
            {resultBlob && (
              <Button variant="outline" className="w-full" onClick={() => downloadBlob(resultBlob, "resized.png")}>
                <Download className="h-4 w-4" /> Download {formatBytes(resultBlob.size)}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
