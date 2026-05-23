import type { CategoryId } from "./categories";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  category: CategoryId;
  icon: string; // lucide-react icon name
  keywords: string[];
  trending?: boolean;
  featured?: boolean;
  comingSoon?: boolean;
  features: string[];
  howTo: string[];
  faqs: ToolFAQ[];
  related?: string[]; // slugs
}

export const TOOLS: Tool[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    tagline: "Compress JPG, PNG and WebP up to 90% smaller",
    description:
      "Reduce image file size while preserving sharpness. Smart compression, target file size, bulk mode and ZIP export — all in your browser.",
    category: "compress",
    icon: "Archive",
    keywords: ["image compressor", "compress jpg", "compress png", "reduce image size"],
    trending: true,
    featured: true,
    features: [
      "Smart compression levels",
      "Target file size mode",
      "Bulk compression",
      "Drag-and-drop upload",
      "Before/after preview",
      "Quality slider",
      "WebP optimization",
      "Real-time preview",
      "Download all as ZIP",
    ],
    howTo: [
      "Drop one or many images into the upload area.",
      "Pick a quality level or set a target file size in KB.",
      "Preview the before/after instantly in your browser.",
      "Download a single image or all of them as a ZIP.",
    ],
    faqs: [
      {
        q: "Is image compression done online?",
        a: "All processing runs locally in your browser using the Canvas API. Your images never leave your device, which is faster and more private.",
      },
      {
        q: "How much can I compress without losing quality?",
        a: "For most photos a quality of 70-80% reduces size by 60-80% with no visible loss. Use the slider to find your sweet spot.",
      },
      {
        q: "Can I compress to a specific KB size?",
        a: "Yes. Enable target file size mode and enter the desired KB — we will iterate the quality automatically.",
      },
      {
        q: "Is it free?",
        a: "Yes, the image compressor is 100% free with no signup, watermarks or limits.",
      },
    ],
    related: ["image-resizer", "jpg-to-webp", "bulk-image-converter"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    tagline: "Resize images to exact pixel dimensions or social presets",
    description:
      "Resize one or thousands of images to any dimension. Aspect ratio lock, social media presets, smart crop and HD upscaling.",
    category: "resize-crop",
    icon: "Maximize2",
    keywords: ["image resizer", "resize image", "resize photo online"],
    trending: true,
    featured: true,
    features: [
      "Exact pixel dimensions",
      "Aspect ratio lock",
      "Social media presets",
      "Batch resize",
      "Smart crop",
      "HD resize mode",
    ],
    howTo: [
      "Upload your image(s).",
      "Enter target width and height, or pick a preset.",
      "Toggle aspect ratio lock if needed.",
      "Download the resized image.",
    ],
    faqs: [
      {
        q: "Will resizing reduce quality?",
        a: "Downscaling preserves quality. Upscaling uses bilinear interpolation — for best AI upscaling try the AI Image Enhancer.",
      },
      {
        q: "Can I resize multiple images at once?",
        a: "Yes — drop a folder of images and we will resize them all and offer a ZIP download.",
      },
    ],
    related: ["image-cropper", "instagram-image-resizer", "image-compressor"],
  },
  {
    slug: "image-cropper",
    name: "Image Cropper",
    tagline: "Crop images with pixel-perfect precision",
    description:
      "Crop any image to a free shape, fixed aspect ratio or face-centered region. Rotate, zoom and crop together in a single tool.",
    category: "resize-crop",
    icon: "Crop",
    keywords: ["image cropper", "crop image online", "free crop tool"],
    trending: true,
    features: [
      "Free crop",
      "Aspect ratio presets",
      "Rotate while cropping",
      "Zoom support",
      "Face-centered crop",
    ],
    howTo: [
      "Upload your image.",
      "Drag the crop handles or pick a preset ratio.",
      "Rotate and zoom as needed.",
      "Click Apply, then download.",
    ],
    faqs: [
      {
        q: "Can I crop to a specific aspect ratio?",
        a: "Yes — pick from 1:1, 4:3, 16:9, 9:16 or enter a custom ratio.",
      },
    ],
    related: ["image-resizer", "passport-photo-maker", "instagram-image-resizer"],
  },
  {
    slug: "image-rotator",
    name: "Image Rotator",
    tagline: "Rotate images by any angle, instantly",
    description:
      "Rotate by 90°, 180°, 270° or any custom angle. Auto-straighten tilted photos and choose any background fill color.",
    category: "resize-crop",
    icon: "RotateCw",
    keywords: ["image rotator", "rotate image", "straighten photo"],
    features: [
      "Custom angle rotation",
      "Auto straighten",
      "Flip options",
      "Background fill color",
    ],
    howTo: [
      "Upload your image.",
      "Slide the angle slider or pick a preset rotation.",
      "Pick a background color for the empty corners.",
      "Download.",
    ],
    faqs: [
      {
        q: "Can I rotate by a custom angle?",
        a: "Yes, any angle from -180° to 180° with 0.1° precision.",
      },
    ],
    related: ["image-cropper", "image-flip", "image-resizer"],
  },
  {
    slug: "image-flip",
    name: "Image Flip Tool",
    tagline: "Mirror images horizontally or vertically",
    description:
      "Flip an image left-right or top-bottom. Preview the original next to the result before downloading.",
    category: "resize-crop",
    icon: "FlipHorizontal2",
    keywords: ["flip image", "mirror image", "image flip"],
    features: ["Horizontal flip", "Vertical flip", "Mirror mode", "Preview comparison"],
    howTo: [
      "Upload your image.",
      "Choose horizontal or vertical flip.",
      "Compare in the side-by-side preview.",
      "Download.",
    ],
    faqs: [
      {
        q: "Will flipping reduce image quality?",
        a: "No, flipping is lossless — pixels are simply mirrored.",
      },
    ],
    related: ["image-rotator", "image-cropper", "image-resizer"],
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG Converter",
    tagline: "Convert JPG to PNG with transparency support",
    description:
      "Turn JPG photos into lossless PNG images. Bulk conversion, HD export and full transparency preservation.",
    category: "convert",
    icon: "FileImage",
    keywords: ["jpg to png", "convert jpg to png", "jpeg to png"],
    featured: true,
    features: ["Transparency preservation", "Bulk conversion", "HD export"],
    howTo: ["Upload JPG file(s).", "Click Convert.", "Download PNG output."],
    faqs: [
      {
        q: "Does the converted PNG support transparency?",
        a: "JPGs do not contain transparency, but the resulting PNG is in the format that supports it for further editing.",
      },
    ],
    related: ["png-to-jpg", "jpg-to-webp", "bulk-image-converter"],
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG Converter",
    tagline: "Convert PNG to JPG with custom background",
    description:
      "Convert PNG images (including transparent ones) to JPG. Pick the background color, set quality and compress in one step.",
    category: "convert",
    icon: "FileImage",
    keywords: ["png to jpg", "convert png to jpg", "png to jpeg"],
    featured: true,
    features: ["Background color selector", "Quality control", "Compression support"],
    howTo: [
      "Upload PNG file(s).",
      "Pick a background color for transparent areas.",
      "Adjust JPG quality.",
      "Download.",
    ],
    faqs: [
      {
        q: "What happens to transparent PNGs?",
        a: "JPG does not support transparency, so transparent pixels are filled with your chosen background color.",
      },
    ],
    related: ["jpg-to-png", "png-to-webp", "image-compressor"],
  },
  {
    slug: "jpg-to-webp",
    name: "JPG to WebP Converter",
    tagline: "Convert JPG to lightweight WebP",
    description:
      "Convert JPG images to modern WebP format for 25-40% smaller file sizes with the same quality. Perfect for web performance.",
    category: "convert",
    icon: "FileImage",
    keywords: ["jpg to webp", "convert jpg to webp", "jpeg to webp"],
    trending: true,
    features: ["Modern web optimization", "Quality presets", "Lightweight export"],
    howTo: ["Upload JPG file(s).", "Pick a quality preset.", "Download WebP."],
    faqs: [
      {
        q: "Why convert to WebP?",
        a: "WebP files are 25-40% smaller than JPG at the same quality, dramatically improving page speed and Core Web Vitals.",
      },
    ],
    related: ["webp-to-jpg", "png-to-webp", "image-compressor"],
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG Converter",
    tagline: "Convert WebP to universally supported JPG",
    description:
      "Convert WebP images to JPG when you need maximum compatibility. Bulk supported with quality optimization.",
    category: "convert",
    icon: "FileImage",
    keywords: ["webp to jpg", "convert webp to jpg", "webp to jpeg"],
    features: ["Fast decoding", "Bulk support", "Quality optimization"],
    howTo: ["Upload WebP file(s).", "Adjust JPG quality.", "Download."],
    faqs: [
      {
        q: "Why convert WebP to JPG?",
        a: "Some older platforms and email clients still do not support WebP. JPG is universally supported.",
      },
    ],
    related: ["jpg-to-webp", "webp-to-png", "image-compressor"],
  },
  {
    slug: "webp-to-png",
    name: "WebP to PNG Converter",
    tagline: "Convert WebP to lossless PNG",
    description:
      "Convert WebP images to lossless PNG with transparent background support.",
    category: "convert",
    icon: "FileImage",
    keywords: ["webp to png", "convert webp to png"],
    features: ["Transparent PNG export", "Lossless conversion"],
    howTo: ["Upload WebP file(s).", "Click Convert.", "Download PNG."],
    faqs: [
      {
        q: "Is the conversion lossless?",
        a: "Yes — PNG is a lossless format, so quality is preserved exactly.",
      },
    ],
    related: ["png-to-webp", "webp-to-jpg", "jpg-to-png"],
  },
  {
    slug: "png-to-webp",
    name: "PNG to WebP Converter",
    tagline: "Convert PNG to WebP for ~70% smaller files",
    description:
      "Replace bulky PNG images with modern WebP. Aggressive optimization, transparent background support and lightweight mode.",
    category: "convert",
    icon: "FileImage",
    keywords: ["png to webp", "convert png to webp"],
    trending: true,
    features: ["Aggressive optimization", "Quality preview", "Lightweight mode"],
    howTo: ["Upload PNG file(s).", "Pick quality.", "Download WebP."],
    faqs: [
      {
        q: "Will transparency be preserved?",
        a: "Yes — WebP supports transparency just like PNG.",
      },
    ],
    related: ["webp-to-png", "jpg-to-webp", "image-compressor"],
  },
  {
    slug: "image-to-base64",
    name: "Image to Base64 Encoder",
    tagline: "Convert images to Base64 strings instantly",
    description:
      "Encode any image to a Base64 data URI for inline HTML or CSS. One-click copy and live preview.",
    category: "utilities",
    icon: "Code2",
    keywords: ["image to base64", "base64 encoder", "data uri"],
    features: ["Instant encoding", "Code copy button", "HTML/CSS output"],
    howTo: ["Upload your image.", "Copy the Base64 data URI.", "Paste into HTML or CSS."],
    faqs: [
      {
        q: "When should I use Base64 images?",
        a: "Inline Base64 is great for tiny icons or emails, but slows down large images. Keep encoded images small.",
      },
    ],
    related: ["base64-to-image", "image-compressor"],
  },
  {
    slug: "base64-to-image",
    name: "Base64 to Image Decoder",
    tagline: "Decode any Base64 string back to an image",
    description:
      "Paste a Base64 data URI or raw string and get a downloadable image with live preview and auto format detection.",
    category: "utilities",
    icon: "Code2",
    keywords: ["base64 to image", "base64 decoder"],
    features: ["Live preview", "Auto file detection", "Export formats"],
    howTo: [
      "Paste your Base64 string or data URI.",
      "Preview the decoded image.",
      "Download as PNG, JPG or WebP.",
    ],
    faqs: [
      {
        q: "What formats are supported?",
        a: "Anything a browser can decode: PNG, JPG, WebP, GIF, SVG and BMP.",
      },
    ],
    related: ["image-to-base64", "image-compressor"],
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG Converter",
    tagline: "Convert iPhone HEIC photos to JPG",
    description:
      "iPhones save photos as HEIC by default — convert them to universally readable JPG with full quality.",
    category: "convert",
    icon: "Smartphone",
    keywords: ["heic to jpg", "iphone heic", "convert heic"],
    trending: true,
    features: ["iPhone HEIC support", "Batch conversion", "Quality optimization"],
    howTo: ["Upload your HEIC photos.", "Adjust JPG quality.", "Download."],
    faqs: [
      {
        q: "Why are iPhone photos HEIC?",
        a: "HEIC is more efficient than JPG, but most non-Apple devices cannot read it natively. Converting to JPG fixes that.",
      },
    ],
    related: ["jpg-to-png", "image-compressor", "bulk-image-converter"],
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG Converter",
    tagline: "Convert SVG vectors to high-resolution PNG",
    description:
      "Rasterize SVG files to crisp PNG at any resolution. Transparent background and custom dimensions supported.",
    category: "convert",
    icon: "Shapes",
    keywords: ["svg to png", "convert svg", "rasterize svg"],
    features: ["Transparent background", "Scalable export", "Custom dimensions"],
    howTo: ["Upload SVG file.", "Choose output size.", "Download PNG."],
    faqs: [
      {
        q: "Does the PNG keep transparency?",
        a: "Yes — the SVG transparent background becomes a transparent PNG.",
      },
    ],
    related: ["png-to-jpg", "image-resizer", "bulk-image-converter"],
  },
  {
    slug: "gif-maker",
    name: "GIF Maker",
    tagline: "Turn images into animated GIFs",
    description:
      "Combine multiple images into an animated GIF. Control frame timing, speed, captions and stickers.",
    category: "edit",
    icon: "Film",
    keywords: ["gif maker", "create gif", "image to gif"],
    features: [
      "Image-to-GIF",
      "Frame timing control",
      "Speed adjustment",
      "Stickers support",
      "Captions",
    ],
    howTo: [
      "Upload images in order.",
      "Set frame delay and speed.",
      "Add captions or stickers.",
      "Export GIF.",
    ],
    faqs: [
      {
        q: "How many frames can I add?",
        a: "Up to 100 frames. For best performance keep dimensions under 800px.",
      },
    ],
    related: ["meme-generator", "image-compressor", "image-resizer"],
  },
  {
    slug: "image-watermark",
    name: "Image Watermark Tool",
    tagline: "Add text or image watermarks at scale",
    description:
      "Protect your photos with text or logo watermarks. Adjust opacity, tile across the image and bulk apply.",
    category: "edit",
    icon: "Stamp",
    keywords: ["watermark image", "add watermark", "image watermark"],
    features: [
      "Text watermark",
      "Image watermark",
      "Opacity control",
      "Tiled watermark",
      "Bulk watermarking",
    ],
    howTo: [
      "Upload your image(s).",
      "Add text or upload a logo.",
      "Position, size and opacity.",
      "Download watermarked image(s).",
    ],
    faqs: [
      {
        q: "Can I batch watermark photos?",
        a: "Yes — apply the same watermark to dozens of images and download a ZIP.",
      },
    ],
    related: ["image-compressor", "image-resizer", "bulk-image-converter"],
  },
  {
    slug: "blur-image",
    name: "Blur Image Tool",
    tagline: "Apply selective or full blur to any image",
    description:
      "Blur backgrounds, faces or any region of an image. Adjustable intensity and selective masking.",
    category: "edit",
    icon: "Droplets",
    keywords: ["blur image", "blur photo", "face blur"],
    features: [
      "Selective blur",
      "Background blur",
      "Adjustable intensity",
      "Face blur mode",
    ],
    howTo: [
      "Upload your image.",
      "Pick blur mode and intensity.",
      "Optionally mask the area to blur.",
      "Download.",
    ],
    faqs: [
      {
        q: "Can I blur faces automatically?",
        a: "Face blur uses on-device detection. For best results, upload high-resolution photos.",
      },
    ],
    related: ["sharpen-image", "remove-background", "image-watermark"],
  },
  {
    slug: "sharpen-image",
    name: "Sharpen Image Tool",
    tagline: "Boost detail and clarity in any photo",
    description:
      "Make blurry images crisp with smart sharpening. Detail enhancement and clarity boost.",
    category: "edit",
    icon: "Sparkles",
    keywords: ["sharpen image", "unblur photo", "increase sharpness"],
    features: [
      "AI-style sharpening",
      "Detail enhancement",
      "Clarity boost",
    ],
    howTo: [
      "Upload your image.",
      "Adjust the sharpening intensity.",
      "Preview and download.",
    ],
    faqs: [
      {
        q: "Will it fix completely blurry photos?",
        a: "Sharpening enhances detail but cannot recover information that is not in the image. For heavy blur use the AI Image Enhancer.",
      },
    ],
    related: ["blur-image", "ai-image-enhancer", "image-compressor"],
  },
  {
    slug: "remove-background",
    name: "Remove Background",
    tagline: "Remove image backgrounds in one click",
    description:
      "Generate a transparent PNG of any subject. Edge smoothing and bulk mode included.",
    category: "ai-effects",
    icon: "Eraser",
    keywords: ["remove background", "transparent png", "background remover"],
    trending: true,
    featured: true,
    features: [
      "Instant background removal",
      "Transparent PNG export",
      "Edge smoothing",
      "Bulk mode",
    ],
    howTo: [
      "Upload your image.",
      "Wait a moment while we isolate the subject.",
      "Download the transparent PNG.",
    ],
    faqs: [
      {
        q: "Is background removal free?",
        a: "Yes, free and unlimited.",
      },
    ],
    related: ["passport-photo-maker", "image-cropper", "image-watermark"],
  },
  {
    slug: "passport-photo-maker",
    name: "Passport Photo Maker",
    tagline: "Print-ready passport and visa photos",
    description:
      "Create regulation passport photos for any country. Auto face alignment, print-ready 4x6 layouts and background color picker.",
    category: "ai-effects",
    icon: "IdCard",
    keywords: ["passport photo", "visa photo", "passport photo maker"],
    featured: true,
    features: [
      "Country presets",
      "Auto face alignment",
      "Print-ready layout",
      "Background color selection",
    ],
    howTo: [
      "Upload a clear front-facing photo.",
      "Pick your country preset.",
      "Adjust the alignment and background.",
      "Download print-ready PDF or PNG.",
    ],
    faqs: [
      {
        q: "Which countries are supported?",
        a: "USA, UK, India, Canada, Australia, Schengen and 30+ others, with the correct dimensions and background rules.",
      },
    ],
    related: ["image-cropper", "remove-background", "image-resizer"],
  },
  {
    slug: "instagram-image-resizer",
    name: "Instagram Image Resizer",
    tagline: "Perfect sizes for posts, reels and stories",
    description:
      "Auto-resize images for Instagram posts (1:1), reels (9:16), stories and carousels with safe-zone overlays.",
    category: "social",
    icon: "Instagram",
    keywords: ["instagram image resizer", "instagram size", "ig post size"],
    trending: true,
    features: [
      "Reels size",
      "Post size",
      "Story size",
      "Auto-fit",
      "Safe zone preview",
    ],
    howTo: [
      "Upload your image.",
      "Pick reel, post or story.",
      "Position the safe zone.",
      "Download.",
    ],
    faqs: [
      {
        q: "What is the perfect Instagram post size?",
        a: "1080×1080 for square, 1080×1350 for portrait, 1080×1920 for stories and reels.",
      },
    ],
    related: ["image-resizer", "image-cropper", "youtube-thumbnail-maker"],
  },
  {
    slug: "youtube-thumbnail-maker",
    name: "YouTube Thumbnail Maker",
    tagline: "Design HD 1280×720 YouTube thumbnails",
    description:
      "Create high-CTR YouTube thumbnails with templates, text overlays and aspect ratio guides.",
    category: "social",
    icon: "Youtube",
    keywords: ["youtube thumbnail maker", "thumbnail size", "youtube banner"],
    features: [
      "Thumbnail templates",
      "Text overlays",
      "Aspect ratio guides",
      "HD export",
    ],
    howTo: [
      "Upload a background image.",
      "Pick a template or start blank.",
      "Add bold text and stickers.",
      "Export 1280×720 HD.",
    ],
    faqs: [
      {
        q: "What size should a YouTube thumbnail be?",
        a: "1280×720 pixels with a 16:9 aspect ratio, under 2 MB.",
      },
    ],
    related: ["instagram-image-resizer", "image-resizer", "meme-generator"],
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    tagline: "Create classic and modern memes in seconds",
    description:
      "Top/bottom captions, popular meme templates, drag-and-drop text and stickers — all in your browser.",
    category: "social",
    icon: "Smile",
    keywords: ["meme generator", "make memes", "meme maker"],
    features: [
      "Top/bottom captions",
      "Meme templates",
      "Stickers",
      "Drag-and-drop text",
    ],
    howTo: [
      "Pick a template or upload a photo.",
      "Add caption text.",
      "Drag stickers around.",
      "Download.",
    ],
    faqs: [
      {
        q: "Are the meme templates free to use?",
        a: "Yes, the bundled templates are free for personal and commercial use.",
      },
    ],
    related: ["youtube-thumbnail-maker", "image-watermark", "gif-maker"],
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    tagline: "Branded QR codes with logos and gradients",
    description:
      "Generate QR codes for URLs, Wi-Fi, vCards and more. Embed your logo, customize colors and export at any resolution.",
    category: "utilities",
    icon: "QrCode",
    keywords: ["qr code generator", "free qr code", "custom qr code"],
    trending: true,
    features: [
      "Logo embedding",
      "Custom colors",
      "Gradients",
      "High-resolution export",
    ],
    howTo: [
      "Enter a URL or text.",
      "Pick colors and (optionally) a logo.",
      "Download PNG or SVG.",
    ],
    faqs: [
      {
        q: "Do generated QR codes expire?",
        a: "No — all codes are static, generated locally, and never expire.",
      },
    ],
    related: ["image-to-base64", "image-watermark", "image-resizer"],
  },
  {
    slug: "screenshot-to-pdf",
    name: "Screenshot to PDF",
    tagline: "Combine screenshots into a single PDF",
    description:
      "Drop screenshots in any order and merge them into one multi-page PDF instantly.",
    category: "utilities",
    icon: "FileStack",
    keywords: ["screenshot to pdf", "images to pdf", "merge images pdf"],
    features: ["Image ordering", "Multi-page PDF", "Instant export"],
    howTo: [
      "Drop your screenshots.",
      "Drag to reorder.",
      "Click Export PDF.",
    ],
    faqs: [
      {
        q: "Is there a page limit?",
        a: "Up to 200 pages. Larger sets may slow your browser depending on resolution.",
      },
    ],
    related: ["bulk-image-converter", "image-compressor", "image-resizer"],
  },
  {
    slug: "bulk-image-converter",
    name: "Bulk Image Converter",
    tagline: "Convert hundreds of images in one click",
    description:
      "Drop a folder of mixed JPG/PNG/WebP/HEIC and convert them all to one target format with ZIP export.",
    category: "convert",
    icon: "Layers",
    keywords: ["bulk image converter", "batch convert images", "zip image converter"],
    featured: true,
    features: [
      "Multiple formats",
      "Batch processing",
      "ZIP export",
      "Drag-and-drop workflow",
    ],
    howTo: [
      "Drop a batch of images.",
      "Pick the target format.",
      "Download ZIP.",
    ],
    faqs: [
      {
        q: "How many images can I convert at once?",
        a: "There is no hard limit, but browsers handle 100-500 images comfortably depending on RAM.",
      },
    ],
    related: ["jpg-to-webp", "png-to-webp", "image-compressor"],
  },
  {
    slug: "image-color-picker",
    name: "Image Color Picker",
    tagline: "Extract colors and palettes from any image",
    description:
      "Pick exact pixel colors as HEX/RGB/HSL, generate a 5-color palette, and extract gradients.",
    category: "utilities",
    icon: "Palette",
    keywords: ["color picker", "image color picker", "palette generator"],
    features: [
      "HEX/RGB/HSL output",
      "Live picker",
      "Palette generation",
      "Gradient extraction",
    ],
    howTo: [
      "Upload your image.",
      "Click anywhere to pick a color.",
      "Copy the value or save the palette.",
    ],
    faqs: [
      {
        q: "Can I extract a full palette?",
        a: "Yes — click Generate Palette and we will sample five dominant colors.",
      },
    ],
    related: ["image-metadata-viewer", "image-to-base64", "qr-code-generator"],
  },
  {
    slug: "image-metadata-viewer",
    name: "Image Metadata Viewer",
    tagline: "Inspect EXIF, GPS and camera metadata",
    description:
      "View EXIF data including camera, lens, GPS coordinates and timestamps. Strip metadata in one click for privacy.",
    category: "utilities",
    icon: "Info",
    keywords: ["exif viewer", "image metadata", "remove exif"],
    features: [
      "EXIF data viewer",
      "Camera info",
      "GPS metadata detection",
      "Metadata removal",
    ],
    howTo: [
      "Upload your photo.",
      "Inspect the metadata table.",
      "Optionally click Remove Metadata to download a clean copy.",
    ],
    faqs: [
      {
        q: "Why remove metadata?",
        a: "EXIF data can leak GPS location, device serial numbers and timestamps. Stripping it before sharing protects your privacy.",
      },
    ],
    related: ["image-color-picker", "image-compressor", "image-watermark"],
  },
  {
    slug: "ai-image-enhancer",
    name: "AI Image Enhancer",
    tagline: "Upscale and enhance with AI (preview)",
    description:
      "Future-ready AI upscaling and enhancement. Before/after comparison and 2x/4x output. Backed by ESRGAN-style models.",
    category: "ai-effects",
    icon: "Wand2",
    keywords: ["ai image enhancer", "image upscaler", "enhance image"],
    comingSoon: true,
    features: [
      "AI-ready architecture",
      "Upscale UI",
      "Enhancement preview",
      "Before/after comparison",
    ],
    howTo: [
      "Upload your image.",
      "Pick 2x or 4x upscale.",
      "Compare before/after.",
      "Download enhanced output.",
    ],
    faqs: [
      {
        q: "Is the AI enhancer free?",
        a: "Yes, with a daily fair-use limit. The model runs in your browser using WebGPU when available.",
      },
    ],
    related: ["sharpen-image", "remove-background", "image-resizer"],
  },
];

export const TOOLS_BY_SLUG: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t])
);

export function getTool(slug: string) {
  return TOOLS_BY_SLUG[slug];
}

export function toolsByCategory(category: CategoryId) {
  return TOOLS.filter((t) => t.category === category);
}

export function trendingTools(limit = 8) {
  return TOOLS.filter((t) => t.trending).slice(0, limit);
}

export function featuredTools(limit = 8) {
  return TOOLS.filter((t) => t.featured).slice(0, limit);
}
