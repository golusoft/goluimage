"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

const COUNTRIES = [
  { id: "us", name: "USA", w: 600, h: 600, label: "2×2 in" },
  { id: "uk", name: "UK", w: 450, h: 600, label: "35×45 mm" },
  { id: "in", name: "India", w: 600, h: 600, label: "2×2 in" },
  { id: "ca", name: "Canada", w: 700, h: 1000, label: "50×70 mm" },
  { id: "schengen", name: "Schengen / EU", w: 450, h: 600, label: "35×45 mm" },
  { id: "au", name: "Australia", w: 525, h: 675, label: "35×45 mm" },
];

export function PassportPhotoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const img = await loadImage(file);
      const c = canvasRef.current!;
      c.width = country.w;
      c.height = country.h;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, c.width, c.height);
      // cover-fit
      const scale = Math.max(country.w / img.naturalWidth, country.h / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (country.w - w) / 2;
      const y = (country.h - h) / 2;
      ctx.drawImage(img, x, y, w, h);
      const blob = await canvasToBlob(c, "image/jpeg", 0.95);
      setResultBlob(blob);
    })();
  }, [file, country, bg]);

  const printSheet = async () => {
    if (!resultBlob) return;
    const img = await loadImage(resultBlob);
    const sheetW = 1800;
    const sheetH = 1200;
    const { canvas, ctx } = makeCanvas(sheetW, sheetH);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, sheetW, sheetH);
    const cols = 3;
    const rows = 2;
    const padX = (sheetW - cols * country.w) / (cols + 1);
    const padY = (sheetH - rows * country.h) / (rows + 1);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = padX + c * (country.w + padX);
        const y = padY + r * (country.h + padY);
        ctx.drawImage(img, x, y, country.w, country.h);
        ctx.strokeStyle = "#e5e7eb";
        ctx.strokeRect(x, y, country.w, country.h);
      }
    }
    const blob = await canvasToBlob(canvas, "image/jpeg", 0.95);
    downloadBlob(blob, `passport-print-sheet-${country.id}.jpg`);
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="rounded-2xl border bg-muted/30 p-6 grid place-items-center">
            <canvas ref={canvasRef} className="max-h-[440px] w-auto rounded-lg shadow-lg border" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div>
              <Label>Country</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCountry(c)}
                    className={`rounded-lg border p-2 text-xs text-left ${
                      country.id === c.id ? "border-foreground bg-foreground text-background" : ""
                    }`}
                  >
                    <div className="font-medium">{c.name}</div>
                    <div className="opacity-70">{c.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Background</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-12 p-1" />
                <Input value={bg} onChange={(e) => setBg(e.target.value)} />
              </div>
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, `passport-${country.id}.jpg`)}>
              <Download className="h-4 w-4" /> Download single photo
            </Button>
            <Button variant="outline" className="w-full" onClick={printSheet}>
              <Download className="h-4 w-4" /> Print-ready sheet (6 photos)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
