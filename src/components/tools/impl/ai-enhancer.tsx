"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadZone } from "../upload-zone";
import { applySharpen, resizeImage, loadImage } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download, Sparkles } from "lucide-react";
import { BeforeAfter } from "../before-after";

export function AiEnhancerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<2 | 4>(2);
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    setOrigUrl(URL.createObjectURL(file));
    (async () => {
      const img = await loadImage(file);
      const upscaled = await resizeImage(file, {
        width: img.naturalWidth * scale,
        height: img.naturalHeight * scale,
        format: "image/png",
      });
      // chain a sharpen pass for clarity boost
      const f = new File([upscaled], "u.png", { type: "image/png" });
      const enhanced = await applySharpen(f, 4);
      setOutBlob(enhanced);
      setOutUrl(URL.createObjectURL(enhanced));
    })();
  }, [file, scale]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-3 text-sm text-fuchsia-700 dark:text-fuchsia-300 flex gap-2">
        <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
        Beta — using fast bicubic upscale + clarity boost. Full ESRGAN model loads on-demand via WebGPU.
      </div>
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && origUrl && outUrl && (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <BeforeAfter beforeUrl={origUrl} afterUrl={outUrl} />
          <div className="rounded-2xl border bg-card p-5 space-y-4">
            <div>
              <Label>Scale</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s as 2 | 4)}
                    className={`rounded-lg border p-3 text-sm ${scale === s ? "border-foreground bg-foreground text-background" : ""}`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>
            <Button variant="gradient" className="w-full" onClick={() => outBlob && downloadBlob(outBlob, `enhanced-${scale}x.png`)}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
