import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of using GoluImages.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container py-16">
      <article className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
        <h2>Acceptance</h2>
        <p>By using GoluImages you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>Use of the service</h2>
        <p>The tools are provided free of charge for personal and commercial use. You agree not to use the service for unlawful purposes or to upload content that violates third-party rights.</p>
        <h2>No warranty</h2>
        <p>The service is provided &quot;as is&quot; without warranty of any kind. We do our best to keep tools accurate, but you are responsible for verifying outputs before using them in production.</p>
        <h2>Liability</h2>
        <p>We are not liable for any indirect, incidental or consequential damages arising from your use of the site.</p>
        <h2>Changes</h2>
        <p>We may update these terms occasionally. Continued use of the service constitutes acceptance of the new terms.</p>
      </article>
    </div>
  );
}
