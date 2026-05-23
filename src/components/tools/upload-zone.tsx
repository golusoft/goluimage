"use client";
import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadZone({
  onFiles,
  multiple = false,
  accept = "image/*",
  hint,
  className,
  loading,
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  hint?: string;
  className?: string;
  loading?: boolean;
}) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const arr = Array.from(files).filter((f) => {
        if (accept === "image/*") return f.type.startsWith("image/");
        return true;
      });
      if (arr.length === 0) return;
      onFiles(multiple ? arr : [arr[0]]);
    },
    [accept, multiple, onFiles]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") inputRef.current?.click();
      }}
      className={cn(
        "relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-10 text-center",
        drag
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-border hover:border-foreground/30 bg-muted/20",
        loading && "pointer-events-none opacity-60",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/30">
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
      </div>
      <p className="mt-4 text-base font-medium">
        {loading ? "Processing…" : "Drop image here"}
        <span className="text-muted-foreground font-normal"> or click to browse</span>
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <p className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <ImageIcon className="h-3 w-3" /> Files never leave your browser
      </p>
    </div>
  );
}
