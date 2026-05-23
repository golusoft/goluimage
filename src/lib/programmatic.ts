/**
 * Programmatic SEO engine — generates dynamic landing pages like:
 * /compress-image-to-20kb, /resize-image-for-instagram, /webp-vs-jpg, etc.
 */

export interface PSEOPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  toolSlug: string;
  intent: string; // SEO intent
  body: string; // semantic HTML
  faqs: { q: string; a: string }[];
}

const COMPRESS_SIZES = [10, 20, 50, 100, 200, 500, 1000];
const SOCIAL_PRESETS: { slug: string; name: string; size: string; tool: string }[] = [
  { slug: "instagram", name: "Instagram", size: "1080×1080", tool: "instagram-image-resizer" },
  { slug: "instagram-story", name: "Instagram Story", size: "1080×1920", tool: "instagram-image-resizer" },
  { slug: "instagram-reel", name: "Instagram Reel", size: "1080×1920", tool: "instagram-image-resizer" },
  { slug: "youtube", name: "YouTube Thumbnail", size: "1280×720", tool: "youtube-thumbnail-maker" },
  { slug: "facebook", name: "Facebook Post", size: "1200×630", tool: "image-resizer" },
  { slug: "twitter", name: "X / Twitter", size: "1600×900", tool: "image-resizer" },
  { slug: "linkedin", name: "LinkedIn Banner", size: "1584×396", tool: "image-resizer" },
  { slug: "pinterest", name: "Pinterest Pin", size: "1000×1500", tool: "image-resizer" },
];

const COMPARISONS: { slug: string; title: string; body: string }[] = [
  {
    slug: "webp-vs-jpg",
    title: "WebP vs JPG: Which is better in 2026?",
    body: "WebP files are typically 25-35% smaller than JPG at the same quality, with full browser support since 2020. JPG remains the most compatible format for legacy systems and email clients.",
  },
  {
    slug: "png-vs-webp",
    title: "PNG vs WebP: Which to use for transparency?",
    body: "Both PNG and WebP support transparency. WebP files are usually 50-70% smaller than equivalent PNGs, but PNG remains the safest choice for absolute compatibility.",
  },
  {
    slug: "heic-vs-jpg",
    title: "HEIC vs JPG: Why iPhones use HEIC",
    body: "HEIC files are roughly half the size of JPG at the same quality, but require conversion before sharing with non-Apple users. JPG remains the universal default.",
  },
];

const STANDALONE: { slug: string; title: string; tool: string; body: string }[] = [
  {
    slug: "best-image-compressor",
    title: "Best Image Compressor 2026 — Free, Online & Browser-Based",
    tool: "image-compressor",
    body: "We tested every popular free image compressor. Browser-based compressors with WebP output and target-KB mode delivered the best mix of size, quality and privacy.",
  },
  {
    slug: "convert-heic-to-jpg",
    title: "Convert HEIC to JPG Online — Free, Bulk Supported",
    tool: "heic-to-jpg",
    body: "Convert iPhone HEIC photos to JPG instantly. Drag a folder, hit convert, download a ZIP — no signup, no upload limits.",
  },
  {
    slug: "remove-background-online",
    title: "Remove Background from Image Online — Free Transparent PNG",
    tool: "remove-background",
    body: "Get a transparent PNG of any subject in seconds. Perfect for ecommerce, profile pictures and design assets.",
  },
  {
    slug: "passport-photo-maker",
    title: "Free Passport Photo Maker — All Country Sizes",
    tool: "passport-photo-maker",
    body: "Print-ready passport photos for the USA, UK, India, Schengen and 30+ other countries. Auto face alignment included.",
  },
];

export function generatePSEOPages(): PSEOPage[] {
  const pages: PSEOPage[] = [];

  // /compress-image-to-Nkb
  for (const size of COMPRESS_SIZES) {
    pages.push({
      slug: `compress-image-to-${size}kb`,
      title: `Compress Image to ${size} KB Online — Free, Instant`,
      h1: `Compress Image to ${size} KB`,
      description: `Reduce any JPG, PNG or WebP image to exactly ${size} KB or less. 100% browser-based, free and unlimited.`,
      toolSlug: "image-compressor",
      intent: `compress image to ${size}kb`,
      body: `<p>Need an image that is exactly ${size} KB or smaller for an upload form, ID submission or web page? Our free compressor iterates the JPG quality automatically until your file fits the ${size} KB target. Everything runs in your browser — your image never touches a server.</p>`,
      faqs: [
        {
          q: `How do I compress an image to ${size} KB?`,
          a: `Upload your image, set the target size to ${size} KB and download. We do the rest.`,
        },
        {
          q: "Is it really free and unlimited?",
          a: "Yes — no signup, no watermarks, unlimited compressions.",
        },
      ],
    });
  }

  // /resize-image-for-instagram, etc.
  for (const p of SOCIAL_PRESETS) {
    pages.push({
      slug: `resize-image-for-${p.slug}`,
      title: `Resize Image for ${p.name} — ${p.size} Free Online`,
      h1: `Resize Image for ${p.name}`,
      description: `Auto-resize any image to the perfect ${p.name} size (${p.size}). Free, browser-based, no signup.`,
      toolSlug: p.tool,
      intent: `resize image for ${p.name}`,
      body: `<p>Posting on ${p.name}? The optimal image size is <strong>${p.size}</strong>. Drop your image, we will resize and crop it perfectly while showing you the safe zone.</p>`,
      faqs: [
        {
          q: `What is the perfect image size for ${p.name}?`,
          a: `${p.size} is the recommended dimension to avoid compression artifacts.`,
        },
      ],
    });
  }

  // comparisons
  for (const c of COMPARISONS) {
    pages.push({
      slug: c.slug,
      title: c.title,
      h1: c.title,
      description: c.body.slice(0, 160),
      toolSlug: "bulk-image-converter",
      intent: c.slug,
      body: `<p>${c.body}</p>`,
      faqs: [
        {
          q: c.title,
          a: c.body,
        },
      ],
    });
  }

  // standalone
  for (const s of STANDALONE) {
    pages.push({
      slug: s.slug,
      title: s.title,
      h1: s.title,
      description: s.body,
      toolSlug: s.tool,
      intent: s.slug,
      body: `<p>${s.body}</p>`,
      faqs: [
        {
          q: s.title,
          a: s.body,
        },
      ],
    });
  }

  return pages;
}

export const PSEO_PAGES = generatePSEOPages();
export const PSEO_BY_SLUG = Object.fromEntries(PSEO_PAGES.map((p) => [p.slug, p]));
