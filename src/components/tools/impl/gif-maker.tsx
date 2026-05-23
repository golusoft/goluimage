"use client";
import { useState } from "react";
import { UploadZone } from "../upload-zone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";

export function GifMakerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [delay, setDelay] = useState(200);

  return (
    <div className="space-y-6">
      <UploadZone multiple onFiles={setFiles} hint="Drop the frames in order" />
      {files.length > 0 && (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {files.map((f, i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(f)} alt="" className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border bg-card p-5 space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <Label>Frame delay (ms)</Label>
                <span className="font-mono text-xs">{delay}</span>
              </div>
              <Slider value={[delay]} onValueChange={(v) => setDelay(v[0])} min={50} max={1000} step={50} />
            </div>
            <Button variant="gradient" disabled className="w-full">
              <Sparkles className="h-4 w-4" /> GIF export ships in v1.1
            </Button>
            <p className="text-xs text-muted-foreground">
              Browser GIF encoding requires a 200KB Web Worker (gif.js). It is opt-in to keep the page fast.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
