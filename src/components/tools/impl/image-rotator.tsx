"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { UploadZone } from "../upload-zone";
import { rotateImage } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download, RotateCw } from "lucide-react";

export function ImageRotatorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(0);
  const [bg, setBg] = useState("#ffffff");
  const [transparent, setTransparent] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    rotateImage(file, angle, transparent ? "transparent" : bg).then((b) => {
      if (cancelled) return;
      setResultBlob(b);
      setResultUrl(URL.createObjectURL(b));
    });
    return () => {
      cancelled = true;
    };
  }, [file, angle, bg, transparent]);

  const handle = (files: File[]) => {
    setFile(files[0]);
    setPreviewUrl(URL.createObjectURL(files[0]));
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} />
      {file && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center min-h-[300px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl ?? previewUrl ?? ""} alt="" className="max-h-[420px] rounded-xl" />
          </div>
          <div className="space-y-4 rounded-2xl border bg-card p-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <Label>Angle</Label>
                <span className="font-mono text-muted-foreground">{angle}°</span>
              </div>
              <Slider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={-180} max={180} step={1} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 90, 180, 270].map((d) => (
                <Button key={d} variant="outline" size="sm" onClick={() => setAngle(d)}>
                  {d}°
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Background</Label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTransparent(!transparent)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs ${transparent ? "border-foreground bg-foreground text-background" : ""}`}
                >
                  Transparent
                </button>
                <Input
                  type="color"
                  value={bg}
                  onChange={(e) => {
                    setBg(e.target.value);
                    setTransparent(false);
                  }}
                  className="h-9 w-12 p-1"
                />
              </div>
            </div>
            <Button variant="gradient" className="w-full" onClick={() => resultBlob && downloadBlob(resultBlob, "rotated.png")}>
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setAngle((angle + 90) % 360)}>
              <RotateCw className="h-4 w-4" /> Rotate 90°
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
