"use client";
import { useState } from "react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { UploadZone } from "../upload-zone";
import { convertImage } from "@/lib/image";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function FormatConverterTool({
  to,
  acceptHint,
  showQuality = true,
  showBackground = false,
}: {
  to: "image/jpeg" | "image/png" | "image/webp";
  acceptHint: string;
  showQuality?: boolean;
  showBackground?: boolean;
}) {
  const [items, setItems] = useState<{ name: string; blob: Blob; url: string; size: number }[]>([]);
  const [quality, setQuality] = useState(90);
  const [bg, setBg] = useState("#ffffff");
  const [busy, setBusy] = useState(false);

  const ext = to.split("/")[1].replace("jpeg", "jpg");

  const handle = async (files: File[]) => {
    setBusy(true);
    const out: typeof items = [];
    for (const f of files) {
      try {
        const blob = await convertImage(f, to, { quality: quality / 100, background: showBackground ? bg : undefined });
        out.push({
          name: f.name.replace(/\.[^.]+$/, `.${ext}`),
          blob,
          url: URL.createObjectURL(blob),
          size: blob.size,
        });
      } catch (e) {
        console.error(e);
        toast.error(`Failed to convert ${f.name}`);
      }
    }
    setItems((prev) => [...out, ...prev]);
    setBusy(false);
  };

  const downloadAll = async () => {
    if (items.length === 0) return;
    if (items.length === 1) {
      downloadBlob(items[0].blob, items[0].name);
      return;
    }
    const zip = new JSZip();
    items.forEach((it) => zip.file(it.name, it.blob));
    const out = await zip.generateAsync({ type: "blob" });
    downloadBlob(out, `converted-${ext}.zip`);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2">
        {showQuality && (
          <div className="rounded-2xl border bg-muted/30 p-4">
            <div className="flex justify-between mb-1">
              <Label>Quality</Label>
              <span className="font-mono text-xs text-muted-foreground">{quality}%</span>
            </div>
            <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={5} max={100} step={1} />
          </div>
        )}
        {showBackground && (
          <div className="rounded-2xl border bg-muted/30 p-4">
            <Label>Background color (for transparent areas)</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-12 p-1" />
              <Input value={bg} onChange={(e) => setBg(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <UploadZone multiple onFiles={handle} loading={busy} hint={acceptHint} />

      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{items.length} file{items.length === 1 ? "" : "s"} converted</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setItems([])}><Trash2 className="h-4 w-4" /></Button>
              <Button variant="gradient" size="sm" onClick={downloadAll}>
                <Download className="h-4 w-4" /> {items.length > 1 ? "ZIP" : "Download"}
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            {items.map((it) => (
              <div key={it.name + it.size} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt="" className="h-12 w-12 rounded-lg object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{it.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(it.size)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => downloadBlob(it.blob, it.name)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
