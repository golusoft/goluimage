"use client";
import { useState } from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { compressImage, compressToTargetSize } from "@/lib/image";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CompressedItem {
  id: string;
  name: string;
  originalSize: number;
  blob: Blob;
  beforeUrl: string;
  afterUrl: string;
}

export function ImageCompressorTool() {
  const [items, setItems] = useState<CompressedItem[]>([]);
  const [quality, setQuality] = useState(75);
  const [useTarget, setUseTarget] = useState(false);
  const [targetKB, setTargetKB] = useState(100);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">("image/jpeg");
  const [busy, setBusy] = useState(false);

  const handle = async (files: File[]) => {
    setBusy(true);
    const results: CompressedItem[] = [];
    for (const f of files) {
      try {
        let blob: Blob;
        if (useTarget) {
          blob = await compressToTargetSize(f, targetKB * 1024, format);
        } else {
          blob = (await compressImage(f, { quality: quality / 100, format })).blob;
        }
        results.push({
          id: `${Date.now()}-${f.name}`,
          name: f.name,
          originalSize: f.size,
          blob,
          beforeUrl: URL.createObjectURL(f),
          afterUrl: URL.createObjectURL(blob),
        });
      } catch (err) {
        console.error(err);
        toast.error(`Failed to compress ${f.name}`);
      }
    }
    setItems((prev) => [...results, ...prev]);
    setBusy(false);
  };

  const downloadAll = async () => {
    if (items.length === 0) return;
    if (items.length === 1) {
      const ext = format.split("/")[1];
      downloadBlob(items[0].blob, `compressed-${items[0].name.replace(/\.[^.]+$/, `.${ext}`)}`);
      return;
    }
    const zip = new JSZip();
    items.forEach((it) => {
      const ext = format.split("/")[1];
      zip.file(`compressed-${it.name.replace(/\.[^.]+$/, `.${ext}`)}`, it.blob);
    });
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, "compressed.zip");
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clearAll = () => setItems([]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Compression mode</Label>
          <div className="flex items-center justify-between">
            <span className="text-sm">Target file size mode</span>
            <Switch checked={useTarget} onCheckedChange={setUseTarget} />
          </div>
          {useTarget ? (
            <div>
              <Label className="text-xs">Target size (KB)</Label>
              <Input
                type="number"
                value={targetKB}
                min={5}
                max={5000}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Quality</span>
                <span className="font-mono text-muted-foreground">{quality}%</span>
              </div>
              <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={5} max={100} step={1} />
            </div>
          )}
        </div>

        <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Output format</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["image/jpeg", "image/webp"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  format === f ? "border-foreground bg-foreground text-background" : "hover:bg-accent"
                }`}
              >
                {f === "image/jpeg" ? "JPG" : "WebP"}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            WebP is ~30% smaller than JPG at the same quality and is supported by all modern browsers.
          </p>
        </div>
      </div>

      <UploadZone
        multiple
        onFiles={handle}
        loading={busy}
        hint="JPG, PNG, WebP — single or batch, no size limit"
      />

      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {items.length} image{items.length === 1 ? "" : "s"} compressed
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4" /> Clear
              </Button>
              <Button variant="gradient" size="sm" onClick={downloadAll}>
                <Download className="h-4 w-4" />
                {items.length > 1 ? "Download ZIP" : "Download"}
              </Button>
            </div>
          </div>
          <div className="grid gap-3">
            {items.map((it) => {
              const saved = Math.max(0, 1 - it.blob.size / it.originalSize);
              return (
                <div key={it.id} className="rounded-2xl border bg-card p-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.afterUrl} alt={it.name} className="h-16 w-16 rounded-lg object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{it.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(it.originalSize)} → <strong className="text-emerald-600 dark:text-emerald-400">{formatBytes(it.blob.size)}</strong>
                      {" · "}
                      <span className="text-emerald-600 dark:text-emerald-400">−{Math.round(saved * 100)}%</span>
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => downloadBlob(it.blob, `compressed-${it.name}`)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(it.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {busy && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Compressing in your browser…
        </div>
      )}
    </div>
  );
}
