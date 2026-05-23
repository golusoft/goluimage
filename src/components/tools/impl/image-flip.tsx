"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "../upload-zone";
import { flipImage } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Download, FlipHorizontal2, FlipVertical2 } from "lucide-react";

export function ImageFlipTool() {
  const [file, setFile] = useState<File | null>(null);
  const [axis, setAxis] = useState<"h" | "v">("h");
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    flipImage(file, axis).then((b) => {
      setResultBlob(b);
      setResultUrl(URL.createObjectURL(b));
    });
  }, [file, axis]);

  return (
    <div className="space-y-6">
      <UploadZone onFiles={(f) => { setFile(f[0]); setOrigUrl(URL.createObjectURL(f[0])); }} />
      {file && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-2 text-center">ORIGINAL</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origUrl ?? ""} alt="" className="w-full max-h-[320px] rounded-xl object-contain mx-auto" />
            </div>
            <div className="rounded-2xl border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground mb-2 text-center">FLIPPED</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl ?? ""} alt="" className="w-full max-h-[320px] rounded-xl object-contain mx-auto" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <Button variant={axis === "h" ? "default" : "outline"} onClick={() => setAxis("h")}>
              <FlipHorizontal2 className="h-4 w-4" /> Horizontal
            </Button>
            <Button variant={axis === "v" ? "default" : "outline"} onClick={() => setAxis("v")}>
              <FlipVertical2 className="h-4 w-4" /> Vertical
            </Button>
            <Button variant="gradient" onClick={() => resultBlob && downloadBlob(resultBlob, "flipped.png")}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
