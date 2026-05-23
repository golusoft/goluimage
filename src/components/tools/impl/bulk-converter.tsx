"use client";
import { useState } from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { convertImage } from "@/lib/image";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { Download, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FORMATS: { id: "image/jpeg" | "image/png" | "image/webp"; label: string; ext: string }[] = [
  { id: "image/webp", label: "WebP", ext: "webp" },
  { id: "image/jpeg", label: "JPG", ext: "jpg" },
  { id: "image/png", label: "PNG", ext: "png" },
];

export function BulkConverterTool() {
  const [target, setTarget] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [items, setItems] = useState<{ name: string; blob: Blob }[]>([]);

  const handle = async (files: File[]) => {
    setBusy(true);
    setProgress(0);
    setItems([]);
    const results: { name: string; blob: Blob }[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      try {
        const blob = await convertImage(f, target.id, { quality: 0.9 });
        results.push({ name: f.name.replace(/\.[^.]+$/, `.${target.ext}`), blob });
      } catch {}
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setItems(results);
    setBusy(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    items.forEach((it) => zip.file(it.name, it.blob));
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, `bulk-${target.ext}.zip`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-muted/30 p-4">
        <Label>Target format</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setTarget(f)}
              className={`rounded-lg border p-3 text-sm ${target.id === f.id ? "border-foreground bg-foreground text-background" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <UploadZone multiple onFiles={handle} loading={busy} hint="Drop dozens or hundreds of images at once" />
      {busy && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> {progress}% complete
          </div>
          <Progress value={progress} />
        </div>
      )}
      {items.length > 0 && !busy && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm">{items.length} files converted · {formatBytes(items.reduce((s, i) => s + i.blob.size, 0))}</p>
            <Button variant="gradient" onClick={downloadZip}>
              <Download className="h-4 w-4" /> Download ZIP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
