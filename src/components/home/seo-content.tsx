export function SEOContent() {
  return (
    <section className="container py-20">
      <div className="prose prose-slate dark:prose-invert mx-auto max-w-3xl text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h3]:text-foreground [&_h2]:tracking-tight [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2">
        <h2>Why creators choose GoluImages</h2>
        <p>
          GoluImages is a privacy-first, browser-based image tools platform built for creators, marketers, designers and developers who care about speed and quality. Every operation — from compression to background removal — runs locally on your device, which means no upload limits, no waiting on a queue and absolutely zero data leaving your browser.
        </p>
        <h3>Built for SEO and Core Web Vitals</h3>
        <p>
          Modern image formats like WebP and AVIF can shrink page weight by 30-70% with no perceptible quality loss. Our converters and compressors make it easy to ship optimized assets that score 95+ on Lighthouse — a proven driver of higher Google rankings.
        </p>
        <h3>Made to scale with your workflow</h3>
        <p>
          Whether you are resizing one Instagram cover or batch-watermarking 500 e-commerce photos, our tools handle large jobs gracefully with web workers and streaming downloads. ZIP export is built in.
        </p>
        <h3>Private by design</h3>
        <p>
          Photos can carry GPS coordinates, device serials and timestamps inside their EXIF metadata. Use our metadata viewer to inspect what is hidden in your images, and our compressor to strip it cleanly before sharing.
        </p>
      </div>
    </section>
  );
}
