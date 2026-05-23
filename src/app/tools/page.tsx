import type { Metadata } from "next";
import { Suspense } from "react";
import { ToolsExplorer } from "./_explorer";
import { buildMetadata, breadcrumbLD, jsonLdScript } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "All Image Tools — 30+ Free Browser-Based Tools",
  description:
    "Browse all 30+ free image tools on GoluImages: compress, resize, crop, convert, watermark, remove background, generate QR codes and more.",
  path: "/tools",
  keywords: ["image tools", "free image tools", "online image editor", "browser image tools"],
});

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbLD([
            { name: "Home", url: absoluteUrl("/") },
            { name: "All Tools", url: absoluteUrl("/tools") },
          ])
        )}
      />
      <section className="container pt-12 pb-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">All tools</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Every image tool, in one place.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            30+ blazing-fast, privacy-first image utilities. Compress, convert, edit and optimize — without ever leaving your browser.
          </p>
        </div>
      </section>
      <Suspense>
        <ToolsExplorer />
      </Suspense>
    </>
  );
}
