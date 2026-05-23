"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadZone } from "../upload-zone";
import { fileToDataURL, dataURLToBlob } from "@/lib/image";
import { downloadBlob } from "@/lib/utils";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "sonner";

export function ImageToBase64Tool() {
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState<"raw" | "html" | "css" | null>(null);

  const handle = async (files: File[]) => {
    const url = await fileToDataURL(files[0]);
    setDataUrl(url);
  };

  const copy = async (kind: "raw" | "html" | "css", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <UploadZone onFiles={handle} />
      {dataUrl && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <div className="rounded-2xl border bg-muted/30 p-3 grid place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dataUrl} alt="" className="max-h-40 rounded-lg" />
            </div>
            <div className="space-y-3">
              {[
                { id: "raw" as const, label: "Raw data URI", value: dataUrl },
                { id: "html" as const, label: "HTML <img>", value: `<img src="${dataUrl}" alt="" />` },
                {
                  id: "css" as const,
                  label: "CSS background",
                  value: `background-image: url("${dataUrl}");`,
                },
              ].map((t) => (
                <div key={t.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.label}</span>
                    <Button size="sm" variant="ghost" onClick={() => copy(t.id, t.value)}>
                      {copied === t.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      Copy
                    </Button>
                  </div>
                  <Textarea readOnly value={t.value} className="font-mono text-xs h-20 resize-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Base64ToImageTool() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const decode = async () => {
    try {
      const t = text.trim().startsWith("data:") ? text.trim() : `data:image/png;base64,${text.trim()}`;
      const b = await dataURLToBlob(t);
      setBlob(b);
      setUrl(URL.createObjectURL(b));
    } catch {
      toast.error("Invalid Base64 string");
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste a data URI (data:image/...;base64,...) or raw Base64 string"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="font-mono text-xs h-40"
      />
      <Button variant="gradient" onClick={decode} disabled={!text.trim()}>
        Decode
      </Button>
      {url && (
        <div className="rounded-2xl border bg-muted/30 p-4 space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="decoded" className="max-h-80 mx-auto rounded-lg" />
          <div className="text-center">
            <Button variant="outline" onClick={() => blob && downloadBlob(blob, "decoded.png")}>
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
