import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: "Important disclaimers regarding GoluImages tools and content.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="container py-16">
      <article className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
        <h1>Disclaimer</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
        <p>
          The tools and content on GoluImages are provided for informational and personal/commercial use. While we strive for accuracy and quality, we make no warranty regarding the suitability of any tool for a specific purpose.
        </p>
        <h2>Passport photos</h2>
        <p>
          The Passport Photo Maker generates photos that follow published government specifications. You are responsible for confirming acceptance with the issuing authority before submission.
        </p>
        <h2>Affiliate links</h2>
        <p>
          Some links on the site may be affiliate links. If you click and purchase, we may earn a small commission at no cost to you. This does not affect our editorial recommendations.
        </p>
        <h2>External links</h2>
        <p>
          We are not responsible for the content of third-party websites linked from GoluImages.
        </p>
      </article>
    </div>
  );
}
