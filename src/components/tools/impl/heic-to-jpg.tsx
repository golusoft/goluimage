"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { convertImage, loadImage } from "@/lib/image";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

export function HeicToJpgTool() {
  const [items, setItems] = useState<{ name: string; blob: Blob }[]>([]);
  const [quality, setQuality] = useState(90);
  const [unsupported, setUnsupported] = useState(false);

  const handle = async (files: File[]) => {
    const out: typeof items = [];
    for (const f of files) {
      try {
        // Try to decode natively (Safari can decode HEIC).
        await loadImage(f);
        const blob = await convertImage(f, "image/jpeg", { quality: quality / 100 });
        out.push({ name: f.name.replace(/\.heic$|\.heif$/i, ".jpg"), blob });
      } catch {
        setUnsupported(true);
        toast.error("Your browser cannot decode HEIC. Try Safari, or convert in the iOS Photos app first.");
      }
    }
    setItems((prev) => [...out, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-muted/30 p-4 max-w-md">
        <div className="flex justify-between mb-1">
          <Label>JPG quality</Label>
          <span className="font-mono text-xs">{quality}%</span>
        </div>
        <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={5} max={100} step={1} />
      </div>
      {unsupported && (
        <div className="flex gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <p>
            Some browsers (Chrome / Firefox on Windows/Linux) cannot natively decode HEIC. Use Safari, Edge on macOS, or open the photo in iOS Photos and share as JPG.
          </p>
        </div>
      )}
      <UploadZone multiple accept="image/heic,image/heif,.heic,.heif,image/*" onFiles={handle} hint="iPhone HEIC photos" />
      {items.length > 0 && (
        <div className="grid gap-2">
          {items.map((it) => (
            <div key={it.name + it.blob.size} className="flex items-center gap-3 rounded-xl border p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(it.blob.size)}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => downloadBlob(it.blob, it.name)}>
                <Download className="h-4 w-4" /> JPG
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
