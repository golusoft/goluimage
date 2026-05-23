"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function WatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("© GoluImages");
  const [opacity, setOpacity] = useState(40);
  const [size, setSize] = useState(48);
  const [tile, setTile] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const apply = async () => {
    if (!file) return;
    const img = await loadImage(file);
    const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = "white";
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 6;
    if (tile) {
      const step = size * 6;
      for (let y = step / 2; y < canvas.height; y += step) {
        for (let x = -step; x < canvas.width; x += step) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 6);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }
    } else {
      const m = ctx.measureText(text);
      ctx.fillText(text, canvas.width - m.width - 24, canvas.height - 24);
    }
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center min-h-[300px]">
            {resultUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="" className="max-h-[420px] rounded-xl" />
            ) : (
              <p className="text-sm text-muted-foreground">Configure and click Apply.</p>
            )}
          </div>
          <div className="rounded-2xl border bg-card p-5 space-y-4">
            <div>
              <Label>Watermark text</Label>
              <Input value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
              <div className="flex justify-between"><Label>Opacity</Label><span className="text-xs">{opacity}%</span></div>
              <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={5} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between"><Label>Size</Label><span className="text-xs">{size}px</span></div>
              <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={16} max={200} step={2} />
            </div>
            <label className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-sm">Tile across image</span>
              <input type="checkbox" checked={tile} onChange={(e) => setTile(e.target.checked)} />
            </label>
            <Button variant="gradient" className="w-full" onClick={apply}>Apply watermark</Button>
            {resultBlob && (
              <Button variant="outline" className="w-full" onClick={() => downloadBlob(resultBlob, "watermarked.png")}>
                <Download className="h-4 w-4" /> Download
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
