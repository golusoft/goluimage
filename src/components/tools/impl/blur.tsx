"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { UploadZone } from "../upload-zone";
import { applyBlur } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function BlurImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [px, setPx] = useState(8);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    applyBlur(file, px).then((b) => {
      setResultBlob(b);
      setResultUrl(URL.createObjectURL(b));
    });
  }, [file, px]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => setFile(f[0])} />
      {file && (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl ?? ""} alt="" className="max-h-[420px] rounded-xl" />
          </div>
          <div className="rounded-2xl border bg-card p-5 space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label>Blur intensity</Label>
                <span className="font-mono text-xs text-muted-foreground">{px}px</span>
              </div>
              <Slider value={[px]} onValueChange={(v) => setPx(v[0])} min={0} max={40} step={1} />
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, "blurred.png")}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
