"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { downloadBlob } from "@/lib/utils";
import { Download } from "lucide-react";

export function QrGeneratorTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("https://goluimages.com");
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(512);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    QRCode.toCanvas(c, text || " ", {
      width: size,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: fg, light: bg },
    });
  }, [text, fg, bg, size]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((blob) => blob && downloadBlob(blob, "qr-code.png"));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border bg-muted/30 p-6 grid place-items-center">
        <canvas ref={canvasRef} className="rounded-xl bg-white max-w-full" />
      </div>
      <div className="space-y-4 rounded-2xl border bg-card p-5">
        <div>
          <Label>Text or URL</Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-1 h-24" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Foreground</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-9 w-12 p-1" />
              <Input value={fg} onChange={(e) => setFg(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Background</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-9 w-12 p-1" />
              <Input value={bg} onChange={(e) => setBg(e.target.value)} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <Label>Size</Label>
            <span className="font-mono text-xs text-muted-foreground">{size}px</span>
          </div>
          <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={128} max={1024} step={32} />
        </div>
        <Button variant="gradient" className="w-full" onClick={download}>
          <Download className="h-4 w-4" /> Download PNG
        </Button>
      </div>
    </div>
  );
}
