"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "../upload-zone";
import { downloadBlob } from "@/lib/utils";
import { Download, Trash2, MoveUp, MoveDown } from "lucide-react";
import { loadImage } from "@/lib/image";

interface Item {
  id: string;
  file: File;
  url: string;
}

export function ScreenshotToPdfTool() {
  const [items, setItems] = useState<Item[]>([]);

  const add = (files: File[]) => {
    setItems((prev) => [
      ...prev,
      ...files.map((f) => ({ id: `${Date.now()}-${Math.random()}`, file: f, url: URL.createObjectURL(f) })),
    ]);
  };

  const move = (i: number, dir: -1 | 1) => {
    setItems((prev) => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  // Tiny inline PDF writer (no external dep) — produces JPEG-embedded PDF.
  const exportPdf = async () => {
    const pages: { jpeg: ArrayBuffer; w: number; h: number }[] = [];
    for (const it of items) {
      const img = await loadImage(it.file);
      const c = document.createElement("canvas");
      const max = 2000;
      const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      c.width = Math.round(img.naturalWidth * ratio);
      c.height = Math.round(img.naturalHeight * ratio);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      const blob = await new Promise<Blob>((r) => c.toBlob((b) => r(b!), "image/jpeg", 0.85));
      pages.push({ jpeg: await blob.arrayBuffer(), w: c.width, h: c.height });
    }
    const pdf = buildPdf(pages);
    downloadBlob(pdf, "screenshots.pdf");
  };

  return (
    <div className="space-y-6">
      <UploadZone multiple onFiles={add} />
      {items.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {items.map((it, i) => (
              <div key={it.id} className="rounded-xl border bg-card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.url} alt="" className="aspect-video w-full object-cover" />
                <div className="flex items-center justify-between p-2 text-xs">
                  <span className="font-medium truncate flex-1">{i + 1}. {it.file.name}</span>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}><MoveUp className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => move(i, 1)} disabled={i === items.length - 1}><MoveDown className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(it.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="gradient" onClick={exportPdf} className="w-full">
            <Download className="h-4 w-4" /> Export PDF ({items.length} page{items.length === 1 ? "" : "s"})
          </Button>
        </>
      )}
    </div>
  );
}

// Minimal PDF builder for JPEG pages.
function buildPdf(pages: { jpeg: ArrayBuffer; w: number; h: number }[]): Blob {
  const enc = new TextEncoder();
  const objs: BlobPart[] = [];
  const offsets: number[] = [];
  let pos = 0;
  const push = (chunk: Uint8Array) => {
    objs.push(chunk as BlobPart);
    pos += chunk.byteLength;
  };
  push(enc.encode("%PDF-1.4\n%\xff\xff\xff\xff\n"));

  // 1: Catalog, 2: Pages, then per page: image XObject + page
  const objStart = (n: number) => {
    offsets[n] = pos;
    push(enc.encode(`${n} 0 obj\n`));
  };
  const objEnd = () => push(enc.encode("\nendobj\n"));

  const kids: number[] = [];
  let n = 3;
  const objsForPages: { img: number; page: number }[] = [];
  for (const _ of pages) {
    objsForPages.push({ img: n++, page: n++ });
  }

  // Catalog
  objStart(1);
  push(enc.encode("<< /Type /Catalog /Pages 2 0 R >>"));
  objEnd();
  // Pages
  objStart(2);
  push(
    enc.encode(
      `<< /Type /Pages /Count ${pages.length} /Kids [${objsForPages.map((p) => `${p.page} 0 R`).join(" ")}] >>`
    )
  );
  objEnd();
  // Per page
  pages.forEach((p, i) => {
    const ids = objsForPages[i];
    objStart(ids.img);
    push(
      enc.encode(
        `<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpeg.byteLength} >>\nstream\n`
      )
    );
    push(new Uint8Array(p.jpeg));
    push(enc.encode("\nendstream"));
    objEnd();
    objStart(ids.page);
    const contentObj = n++;
    push(
      enc.encode(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << /XObject << /Im0 ${ids.img} 0 R >> >> /Contents ${contentObj} 0 R >>`
      )
    );
    objEnd();
    const stream = `q ${p.w} 0 0 ${p.h} 0 0 cm /Im0 Do Q`;
    objStart(contentObj);
    push(enc.encode(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`));
    objEnd();
  });

  const xrefStart = pos;
  push(enc.encode(`xref\n0 ${n}\n0000000000 65535 f \n`));
  for (let i = 1; i < n; i++) {
    push(enc.encode(`${(offsets[i] || 0).toString().padStart(10, "0")} 00000 n \n`));
  }
  push(enc.encode(`trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`));

  return new Blob(objs, { type: "application/pdf" });
}
