"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = () => (
  <div className="grid place-items-center py-20 text-sm text-muted-foreground">Loading tool…</div>
);

const ImageCompressorTool = dynamic(() => import("./impl/image-compressor").then((m) => m.ImageCompressorTool), { ssr: false, loading });
const ImageResizerTool = dynamic(() => import("./impl/image-resizer").then((m) => m.ImageResizerTool), { ssr: false, loading });
const CropperTool = dynamic(() => import("./impl/cropper").then((m) => m.CropperTool), { ssr: false, loading });
const ImageRotatorTool = dynamic(() => import("./impl/image-rotator").then((m) => m.ImageRotatorTool), { ssr: false, loading });
const ImageFlipTool = dynamic(() => import("./impl/image-flip").then((m) => m.ImageFlipTool), { ssr: false, loading });
const FormatConverterTool = dynamic(() => import("./impl/format-converter").then((m) => m.FormatConverterTool), { ssr: false, loading });
const ImageToBase64Tool = dynamic(() => import("./impl/base64").then((m) => m.ImageToBase64Tool), { ssr: false, loading });
const Base64ToImageTool = dynamic(() => import("./impl/base64").then((m) => m.Base64ToImageTool), { ssr: false, loading });
const HeicToJpgTool = dynamic(() => import("./impl/heic-to-jpg").then((m) => m.HeicToJpgTool), { ssr: false, loading });
const SvgToPngTool = dynamic(() => import("./impl/svg-to-png").then((m) => m.SvgToPngTool), { ssr: false, loading });
const GifMakerTool = dynamic(() => import("./impl/gif-maker").then((m) => m.GifMakerTool), { ssr: false, loading });
const WatermarkTool = dynamic(() => import("./impl/watermark").then((m) => m.WatermarkTool), { ssr: false, loading });
const BlurImageTool = dynamic(() => import("./impl/blur").then((m) => m.BlurImageTool), { ssr: false, loading });
const SharpenImageTool = dynamic(() => import("./impl/sharpen").then((m) => m.SharpenImageTool), { ssr: false, loading });
const RemoveBackgroundTool = dynamic(() => import("./impl/remove-bg").then((m) => m.RemoveBackgroundTool), { ssr: false, loading });
const PassportPhotoTool = dynamic(() => import("./impl/passport-photo").then((m) => m.PassportPhotoTool), { ssr: false, loading });
const InstagramResizerTool = dynamic(() => import("./impl/instagram-resizer").then((m) => m.InstagramResizerTool), { ssr: false, loading });
const YoutubeThumbnailTool = dynamic(() => import("./impl/youtube-thumbnail").then((m) => m.YoutubeThumbnailTool), { ssr: false, loading });
const MemeGeneratorTool = dynamic(() => import("./impl/meme-generator").then((m) => m.MemeGeneratorTool), { ssr: false, loading });
const QrGeneratorTool = dynamic(() => import("./impl/qr-generator").then((m) => m.QrGeneratorTool), { ssr: false, loading });
const ScreenshotToPdfTool = dynamic(() => import("./impl/screenshot-to-pdf").then((m) => m.ScreenshotToPdfTool), { ssr: false, loading });
const BulkConverterTool = dynamic(() => import("./impl/bulk-converter").then((m) => m.BulkConverterTool), { ssr: false, loading });
const ImageColorPickerTool = dynamic(() => import("./impl/color-picker").then((m) => m.ImageColorPickerTool), { ssr: false, loading });
const MetadataViewerTool = dynamic(() => import("./impl/metadata-viewer").then((m) => m.MetadataViewerTool), { ssr: false, loading });
const AiEnhancerTool = dynamic(() => import("./impl/ai-enhancer").then((m) => m.AiEnhancerTool), { ssr: false, loading });

// Wrappers around FormatConverterTool to share its component for many slugs.
const JpgToPng = () => <FormatConverterTool to="image/png" acceptHint="JPG / JPEG files" />;
const PngToJpg = () => <FormatConverterTool to="image/jpeg" acceptHint="PNG files (transparent areas will be filled)" showBackground />;
const JpgToWebp = () => <FormatConverterTool to="image/webp" acceptHint="JPG / JPEG files" />;
const WebpToJpg = () => <FormatConverterTool to="image/jpeg" acceptHint="WebP files" showBackground />;
const WebpToPng = () => <FormatConverterTool to="image/png" acceptHint="WebP files (transparency preserved)" showQuality={false} />;
const PngToWebp = () => <FormatConverterTool to="image/webp" acceptHint="PNG files (transparency preserved)" />;

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "image-compressor": ImageCompressorTool,
  "image-resizer": ImageResizerTool,
  "image-cropper": CropperTool,
  "image-rotator": ImageRotatorTool,
  "image-flip": ImageFlipTool,
  "jpg-to-png": JpgToPng,
  "png-to-jpg": PngToJpg,
  "jpg-to-webp": JpgToWebp,
  "webp-to-jpg": WebpToJpg,
  "webp-to-png": WebpToPng,
  "png-to-webp": PngToWebp,
  "image-to-base64": ImageToBase64Tool,
  "base64-to-image": Base64ToImageTool,
  "heic-to-jpg": HeicToJpgTool,
  "svg-to-png": SvgToPngTool,
  "gif-maker": GifMakerTool,
  "image-watermark": WatermarkTool,
  "blur-image": BlurImageTool,
  "sharpen-image": SharpenImageTool,
  "remove-background": RemoveBackgroundTool,
  "passport-photo-maker": PassportPhotoTool,
  "instagram-image-resizer": InstagramResizerTool,
  "youtube-thumbnail-maker": YoutubeThumbnailTool,
  "meme-generator": MemeGeneratorTool,
  "qr-code-generator": QrGeneratorTool,
  "screenshot-to-pdf": ScreenshotToPdfTool,
  "bulk-image-converter": BulkConverterTool,
  "image-color-picker": ImageColorPickerTool,
  "image-metadata-viewer": MetadataViewerTool,
  "ai-image-enhancer": AiEnhancerTool,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Comp = TOOL_COMPONENTS[slug];
  if (!Comp) {
    return (
      <div className="grid place-items-center py-16 text-center">
        <p className="text-lg font-semibold">Tool coming soon</p>
        <p className="text-sm text-muted-foreground mt-1">
          We&apos;re polishing the final touches. Check back shortly.
        </p>
      </div>
    );
  }
  return <Comp />;
}
