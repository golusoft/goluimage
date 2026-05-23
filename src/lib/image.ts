/**
 * Browser-side image helpers built on Canvas + ImageBitmap.
 * Everything stays client-side — no server round-trips.
 */

export async function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    // revoke after image is decoded; the image keeps its bitmap in memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, mime = "image/png", quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed"))),
      mime,
      quality
    );
  });
}

export function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D not available");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return { canvas: c, ctx };
}

export async function compressImage(
  file: File,
  options: { quality: number; format?: "image/jpeg" | "image/webp" | "image/png"; maxWidth?: number }
): Promise<{ blob: Blob; canvas: HTMLCanvasElement }> {
  const img = await loadImage(file);
  const max = options.maxWidth ?? Math.max(img.naturalWidth, img.naturalHeight);
  const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * ratio);
  const h = Math.round(img.naturalHeight * ratio);
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await canvasToBlob(canvas, options.format ?? "image/jpeg", options.quality);
  return { blob, canvas };
}

export async function compressToTargetSize(
  file: File,
  targetBytes: number,
  format: "image/jpeg" | "image/webp" = "image/jpeg"
): Promise<Blob> {
  let lo = 0.05;
  let hi = 0.98;
  let best: Blob | null = null;
  for (let i = 0; i < 8; i++) {
    const q = (lo + hi) / 2;
    const { blob } = await compressImage(file, { quality: q, format });
    if (blob.size > targetBytes) {
      hi = q;
    } else {
      best = blob;
      lo = q;
    }
  }
  return best ?? (await compressImage(file, { quality: 0.6, format })).blob;
}

export async function resizeImage(
  file: File,
  opts: { width?: number; height?: number; lockAspect?: boolean; format?: string; quality?: number }
): Promise<Blob> {
  const img = await loadImage(file);
  let w = opts.width ?? img.naturalWidth;
  let h = opts.height ?? img.naturalHeight;
  if (opts.lockAspect && opts.width && !opts.height) h = Math.round((img.naturalHeight / img.naturalWidth) * w);
  if (opts.lockAspect && opts.height && !opts.width) w = Math.round((img.naturalWidth / img.naturalHeight) * h);
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvasToBlob(canvas, opts.format ?? "image/png", opts.quality ?? 0.92);
}

export async function rotateImage(
  file: File,
  angleDeg: number,
  bgColor = "transparent"
): Promise<Blob> {
  const img = await loadImage(file);
  const angle = (angleDeg * Math.PI) / 180;
  const sin = Math.abs(Math.sin(angle));
  const cos = Math.abs(Math.cos(angle));
  const w = img.naturalWidth * cos + img.naturalHeight * sin;
  const h = img.naturalWidth * sin + img.naturalHeight * cos;
  const { canvas, ctx } = makeCanvas(w, h);
  if (bgColor !== "transparent") {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  return canvasToBlob(canvas, "image/png");
}

export async function flipImage(file: File, axis: "h" | "v"): Promise<Blob> {
  const img = await loadImage(file);
  const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
  ctx.translate(axis === "h" ? canvas.width : 0, axis === "v" ? canvas.height : 0);
  ctx.scale(axis === "h" ? -1 : 1, axis === "v" ? -1 : 1);
  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, "image/png");
}

export async function convertImage(
  file: File,
  to: "image/jpeg" | "image/png" | "image/webp",
  options: { quality?: number; background?: string } = {}
): Promise<Blob> {
  const img = await loadImage(file);
  const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
  if (to === "image/jpeg" && options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, to, options.quality ?? 0.92);
}

export async function applyBlur(file: File, px: number): Promise<Blob> {
  const img = await loadImage(file);
  const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
  ctx.filter = `blur(${px}px)`;
  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, "image/png");
}

export async function applySharpen(file: File, intensity: number): Promise<Blob> {
  const img = await loadImage(file);
  const { canvas, ctx } = makeCanvas(img.naturalWidth, img.naturalHeight);
  // Use CSS contrast/saturation as a fast on-device sharpen approximation.
  ctx.filter = `contrast(${100 + intensity * 12}%) saturate(${100 + intensity * 6}%)`;
  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, "image/png");
}

export async function fileToDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export async function dataURLToBlob(dataUrl: string): Promise<Blob> {
  const r = await fetch(dataUrl);
  return r.blob();
}

export function pickPixelColor(canvas: HTMLCanvasElement, x: number, y: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const data = ctx.getImageData(x, y, 1, 1).data;
  return { r: data[0], g: data[1], b: data[2], a: data[3] };
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function dominantColors(canvas: HTMLCanvasElement, count = 5) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  const sample = 64;
  const off = document.createElement("canvas");
  off.width = sample;
  off.height = sample;
  const offCtx = off.getContext("2d")!;
  offCtx.drawImage(canvas, 0, 0, sample, sample);
  const { data } = offCtx.getImageData(0, 0, sample, sample);
  const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] & 0xf0;
    const g = data[i + 1] & 0xf0;
    const b = data[i + 2] & 0xf0;
    const key = `${r}-${g}-${b}`;
    const cur = buckets.get(key);
    if (cur) {
      cur.r += data[i];
      cur.g += data[i + 1];
      cur.b += data[i + 2];
      cur.n += 1;
    } else {
      buckets.set(key, { r: data[i], g: data[i + 1], b: data[i + 2], n: 1 });
    }
  }
  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map((c) => ({
      r: Math.round(c.r / c.n),
      g: Math.round(c.g / c.n),
      b: Math.round(c.b / c.n),
    }));
}
