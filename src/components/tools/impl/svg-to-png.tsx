"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { canvasToBlob, makeCanvas } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";
import { toast } from "sonner";

export function SvgToPngTool() {
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1200);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const handle = async (files: File[]) => {
    const f = files[0];
    if (!f.type.includes("svg") && !f.name.endsWith(".svg")) {
      toast.error("Upload an .svg file");
      return;
    }
    const text = await f.text();
    const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const { canvas, ctx } = makeCanvas(width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const out = await canvasToBlob(canvas, "image/png");
      setResultBlob(out);
      setResultUrl(URL.createObjectURL(out));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <div>
          <Label>Width</Label>
          <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </div>
        <div>
          <Label>Height</Label>
          <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </div>
      </div>
      <UploadZone accept=".svg,image/svg+xml" onFiles={handle} hint="Pick an SVG file" />
      {resultUrl && (
        <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resultUrl} alt="" className="max-h-80 rounded-lg" />
          <Button variant="gradient" className="mt-3" onClick={() => resultBlob && downloadBlob(resultBlob, "rasterized.png")}>
            <Download className="h-4 w-4" /> Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}
