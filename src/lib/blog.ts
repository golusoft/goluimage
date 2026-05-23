export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: { name: string; avatar: string; bio: string };
  publishedAt: string;
  updatedAt?: string;
  cover: string;
  readingTime: number;
  toc: { id: string; text: string; level: number }[];
  body: string; // simple markdown-ish HTML
  featured?: boolean;
}

export const POSTS: BlogPost[] = [
  {
    slug: "best-image-compressor-2026",
    title: "Best Image Compressor in 2026: 7 Free Tools Tested",
    description:
      "We compressed the same 10 MB photo through every major free image compressor. Here is the ranking, file sizes and quality scores.",
    category: "guides",
    tags: ["compression", "performance", "seo"],
    author: {
      name: "Golu Kumar",
      avatar: "https://avatars.githubusercontent.com/u/9919?v=4",
      bio: "Founder of GoluImages. Building the next generation of image tools.",
    },
    publishedAt: "2026-04-12",
    cover: "/blog/best-image-compressor.svg",
    readingTime: 8,
    featured: true,
    toc: [
      { id: "why-compress", text: "Why compress images?", level: 2 },
      { id: "test-setup", text: "How we tested", level: 2 },
      { id: "results", text: "Results", level: 2 },
      { id: "winner", text: "Our pick", level: 2 },
    ],
    body: `<h2 id="why-compress">Why compress images?</h2>
<p>Images account for roughly 50% of total bytes on the average web page. Compressing them is the single biggest performance win you can ship — it improves Core Web Vitals, search rankings and bounce rate.</p>
<h2 id="test-setup">How we tested</h2>
<p>We took a 10.4 MB DSLR landscape photo and ran it through every major free compressor at the default settings, then again at "max compression". We compared file size, SSIM (structural similarity) and visual artifacts.</p>
<h2 id="results">Results</h2>
<p>The browser-based compressors won on speed and privacy. Server-based ones occasionally produced smaller files but added latency.</p>
<h2 id="winner">Our pick</h2>
<p>For most users, a browser-based compressor with WebP output and a target-KB mode is the best balance of size, quality and privacy. <a href="/tools/image-compressor">Try ours here</a>.</p>`,
  },
  {
    slug: "webp-vs-jpg-which-is-better",
    title: "WebP vs JPG: Which Format Should You Use in 2026?",
    description:
      "WebP claims 30% smaller files at the same quality as JPG. Is it true? We break down the numbers, browser support and SEO impact.",
    category: "tutorials",
    tags: ["webp", "jpg", "formats"],
    author: {
      name: "Golu Kumar",
      avatar: "https://avatars.githubusercontent.com/u/9919?v=4",
      bio: "Founder of GoluImages.",
    },
    publishedAt: "2026-03-21",
    cover: "/blog/webp-vs-jpg.svg",
    readingTime: 6,
    featured: true,
    toc: [
      { id: "what-is-webp", text: "What is WebP?", level: 2 },
      { id: "size-comparison", text: "Size comparison", level: 2 },
      { id: "browser-support", text: "Browser support", level: 2 },
    ],
    body: `<h2 id="what-is-webp">What is WebP?</h2>
<p>WebP is a modern image format developed by Google. It supports both lossy and lossless compression, transparency and animation.</p>
<h2 id="size-comparison">Size comparison</h2>
<p>On average WebP files are 25-35% smaller than JPG at the same perceptual quality.</p>
<h2 id="browser-support">Browser support</h2>
<p>All modern browsers support WebP since 2020. Safari added support in version 14.</p>
<p><a href="/tools/jpg-to-webp">Convert JPG to WebP →</a></p>`,
  },
  {
    slug: "how-to-make-passport-photo-online",
    title: "How to Make a Passport Photo Online (Free, in 60 Seconds)",
    description:
      "A step-by-step guide to creating a regulation-compliant passport photo from your phone or laptop, completely free.",
    category: "tutorials",
    tags: ["passport", "photo", "tutorial"],
    author: {
      name: "Golu Kumar",
      avatar: "https://avatars.githubusercontent.com/u/9919?v=4",
      bio: "Founder of GoluImages.",
    },
    publishedAt: "2026-02-10",
    cover: "/blog/passport-photo.svg",
    readingTime: 5,
    toc: [
      { id: "requirements", text: "Photo requirements", level: 2 },
      { id: "steps", text: "Steps", level: 2 },
    ],
    body: `<h2 id="requirements">Photo requirements</h2>
<p>Most countries require a 2x2 inch photo with a plain white background and your face centered.</p>
<h2 id="steps">Steps</h2>
<ol><li>Take a clear front-facing photo in good lighting.</li><li>Open our <a href="/tools/passport-photo-maker">passport photo maker</a>.</li><li>Pick your country preset.</li><li>Download the print-ready PDF.</li></ol>`,
  },
  {
    slug: "core-web-vitals-image-optimization",
    title: "Image Optimization for Core Web Vitals: The Complete 2026 Guide",
    description:
      "How to use modern formats, lazy loading and aspect ratios to score 95+ on Lighthouse and rank higher on Google.",
    category: "guides",
    tags: ["seo", "performance", "core-web-vitals"],
    author: {
      name: "Golu Kumar",
      avatar: "https://avatars.githubusercontent.com/u/9919?v=4",
      bio: "Founder of GoluImages.",
    },
    publishedAt: "2026-01-08",
    cover: "/blog/core-web-vitals.svg",
    readingTime: 10,
    toc: [
      { id: "lcp", text: "Largest Contentful Paint", level: 2 },
      { id: "cls", text: "Cumulative Layout Shift", level: 2 },
    ],
    body: `<h2 id="lcp">Largest Contentful Paint</h2><p>LCP is dominated by images. Use modern formats, set proper width/height and prioritize above-the-fold images.</p><h2 id="cls">Cumulative Layout Shift</h2><p>Always reserve space for images using width and height attributes or aspect-ratio CSS.</p>`,
  },
];

export const POSTS_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]));

export function getPost(slug: string) {
  return POSTS_BY_SLUG[slug];
}

export function relatedPosts(slug: string, limit = 3) {
  const current = POSTS_BY_SLUG[slug];
  if (!current) return [];
  return POSTS.filter(
    (p) => p.slug !== slug && p.tags.some((t) => current.tags.includes(t))
  ).slice(0, limit);
}
