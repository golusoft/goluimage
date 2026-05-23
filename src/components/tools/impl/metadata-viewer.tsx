"use client";
import { useState } from "react";
import { UploadZone } from "../upload-zone";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { convertImage, loadImage } from "@/lib/image";
import { Download, ShieldCheck } from "lucide-react";

interface Meta {
  fileName: string;
  size: number;
  type: string;
  width: number;
  height: number;
  lastModified: string;
  exif?: Record<string, string>;
}

export function MetadataViewerTool() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handle = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    const img = await loadImage(f);
    const exif = await readBasicExif(f);
    setMeta({
      fileName: f.name,
      size: f.size,
      type: f.type || "unknown",
      width: img.naturalWidth,
      height: img.naturalHeight,
      lastModified: new Date(f.lastModified).toLocaleString(),
      exif,
    });
  };

  const stripMeta = async () => {
    if (!file) return;
    const blob = await convertImage(file, "image/jpeg", { quality: 0.95 });
    downloadBlob(blob, file.name.replace(/\.[^.]+$/, "-clean.jpg"));
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} hint="JPG with EXIF metadata reveals the most data" />
      {meta && (
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{meta.fileName}</h3>
            <p className="text-xs text-muted-foreground">
              {meta.type} · {formatBytes(meta.size)} · {meta.width}×{meta.height}px
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Row label="File name" value={meta.fileName} />
            <Row label="Type" value={meta.type} />
            <Row label="Size" value={formatBytes(meta.size)} />
            <Row label="Dimensions" value={`${meta.width} × ${meta.height} px`} />
            <Row label="Last modified" value={meta.lastModified} />
            {Object.entries(meta.exif || {}).map(([k, v]) => (
              <Row key={k} label={k} value={v} />
            ))}
          </div>
          <Button variant="gradient" onClick={stripMeta}>
            <ShieldCheck className="h-4 w-4" /> Download privacy-cleaned copy
            <Download className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-xs truncate max-w-[60%]">{value}</span>
    </div>
  );
}

async function readBasicExif(file: File): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  try {
    const buf = await file.slice(0, 65535).arrayBuffer();
    const view = new DataView(buf);
    if (view.getUint16(0) !== 0xffd8) return out;
    let offset = 2;
    while (offset < view.byteLength) {
      const marker = view.getUint16(offset);
      offset += 2;
      if (marker === 0xffe1) {
        const size = view.getUint16(offset);
        const exifHeader = String.fromCharCode(
          view.getUint8(offset + 2),
          view.getUint8(offset + 3),
          view.getUint8(offset + 4),
          view.getUint8(offset + 5)
        );
        if (exifHeader === "Exif") {
          out["EXIF block size"] = String(size) + " bytes";
          out["EXIF detected"] = "Yes";
          // For full EXIF parsing, ship a dedicated lib. We surface presence + size here.
        }
        break;
      } else if ((marker & 0xff00) !== 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset);
      }
    }
  } catch {
    /* ignore */
  }
  if (!out["EXIF detected"]) out["EXIF detected"] = "No / stripped";
  return out;
}
