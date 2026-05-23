"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, loadImage, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download, Sparkles } from "lucide-react";

export function RemoveBackgroundTool() {
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [tol, setTol] = useState(40);

  // Color-key based fast removal — for production, swap with an on-device model
  // (e.g., MODNet via WebGPU/ONNX). The UI is identical.
  const handle = async (files: File[]) => {
    const f = files[0];
    setOrigUrl(URL.createObjectURL(f));
    const img = await loadImage(f);
    const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Sample top-left pixel as background color
    const br = data.data[0];
    const bg = data.data[1];
    const bb = data.data[2];
    for (let i = 0; i < data.data.length; i += 4) {
      const dr = data.data[i] - br;
      const dg = data.data[i + 1] - bg;
      const db = data.data[i + 2] - bb;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      if (dist < tol) data.data[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
    const blob = await canvasToBlob(canvas, "image/png");
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} hint="Tip: subjects on a plain background work best" />
      {origUrl && (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border bg-[conic-gradient(at_50%_50%,#0001_25%,transparent_25%_50%,#0001_50%_75%,transparent_75%)] [background-size:24px_24px] p-3 grid place-items-center min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl ?? origUrl} alt="" className="max-h-[420px] rounded-xl" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 inline-block mr-1 text-fuchsia-500" />
              Fast on-device color-key removal. AI-based segmentation (MODNet) ships as an opt-in upgrade.
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <Label>Tolerance</Label>
                <span className="font-mono text-xs">{tol}</span>
              </div>
              <Slider value={[tol]} onValueChange={(v) => setTol(v[0])} min={10} max={120} step={2} />
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, "no-bg.png")}>
              <Download className="h-4 w-4" /> Download PNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
