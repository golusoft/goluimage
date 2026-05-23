export type CategoryId =
  | "compress"
  | "resize-crop"
  | "convert"
  | "edit"
  | "ai-effects"
  | "social"
  | "utilities";

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "compress",
    name: "Compress",
    slug: "compress",
    description: "Reduce image file size without losing quality.",
    emoji: "🗜️",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "resize-crop",
    name: "Resize & Crop",
    slug: "resize-crop",
    description: "Resize, crop, rotate and flip images precisely.",
    emoji: "📐",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "convert",
    name: "Convert",
    slug: "convert",
    description: "Convert between JPG, PNG, WebP, HEIC, SVG and more.",
    emoji: "🔄",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "edit",
    name: "Edit",
    slug: "edit",
    description: "Watermark, blur, sharpen, crop and enhance images.",
    emoji: "🎨",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    id: "ai-effects",
    name: "AI & Effects",
    slug: "ai-effects",
    description: "Background removal, enhancement and AI-powered effects.",
    emoji: "✨",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "social",
    name: "Social Media",
    slug: "social",
    description: "Resize and design images for Instagram, YouTube, TikTok.",
    emoji: "📱",
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "utilities",
    name: "Utilities",
    slug: "utilities",
    description: "Color picker, metadata viewer, QR codes and more.",
    emoji: "🛠️",
    gradient: "from-amber-500 to-yellow-500",
  },
];

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!;
}
