"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function MemeGeneratorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [top, setTop] = useState("WHEN YOU FINALLY");
  const [bottom, setBottom] = useState("FIND THE RIGHT TOOL");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      const img = await loadImage(file);
      const c = canvasRef.current!;
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const fontSize = Math.max(40, c.width / 14);
      ctx.font = `900 ${fontSize}px Impact, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = fontSize / 14;
      ctx.lineJoin = "round";
      const drawText = (txt: string, y: number) => {
        ctx.strokeText(txt.toUpperCase(), c.width / 2, y);
        ctx.fillText(txt.toUpperCase(), c.width / 2, y);
      };
      drawText(top, fontSize + 20);
      drawText(bottom, c.height - 30);
      const blob = await canvasToBlob(c, "image/jpeg", 0.92);
      setResultBlob(blob);
    })();
  }, [file, top, bottom]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center">
            <canvas ref={canvasRef} className="max-h-[480px] max-w-full rounded-lg" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div>
              <Label>Top text</Label>
              <Input value={top} onChange={(e) => setTop(e.target.value)} />
            </div>
            <div>
              <Label>Bottom text</Label>
              <Input value={bottom} onChange={(e) => setBottom(e.target.value)} />
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, "meme.jpg")}>
              <Download className="h-4 w-4" /> Download meme
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
