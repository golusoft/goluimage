"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function YoutubeThumbnailTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("MUST WATCH");
  const [color, setColor] = useState("#ff3b3b");
  const [size, setSize] = useState(120);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    (async () => {
      const W = 1280;
      const H = 720;
      const c = canvasRef.current;
      if (!c) return;
      c.width = W;
      c.height = H;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#0f172a");
      grad.addColorStop(1, "#312e81");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      if (file) {
        const img = await loadImage(file);
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
        const v = ctx.createLinearGradient(0, 0, 0, H);
        v.addColorStop(0, "rgba(0,0,0,0.0)");
        v.addColorStop(1, "rgba(0,0,0,0.7)");
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.font = `900 ${size}px Inter, sans-serif`;
      ctx.fillStyle = color;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.textBaseline = "alphabetic";
      const textY = H - 60;
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 14;
      ctx.strokeText(text, 60, textY);
      ctx.shadowBlur = 0;
      ctx.fillText(text, 60, textY);
      const blob = await canvasToBlob(c, "image/jpeg", 0.92);
      setResultBlob(blob);
    })();
  }, [file, text, color, size]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} hint="Background image — optional" />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center">
          <canvas ref={canvasRef} className="w-full max-h-[420px] object-contain rounded-lg" />
        </div>
        <div className="space-y-4 rounded-2xl border bg-card p-5">
          <div>
            <Label>Title text</Label>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <Label>Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-12 p-1" />
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1"><Label>Font size</Label><span className="font-mono text-xs">{size}px</span></div>
            <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={48} max={220} step={2} />
          </div>
          <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, "thumbnail.jpg")}>
            <Download className="h-4 w-4" /> Download HD (1280×720)
          </Button>
        </div>
      </div>
    </div>
  );
}
