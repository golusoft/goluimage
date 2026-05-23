import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How GoluImages handles your data — short answer: we don't.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container py-16">
      <article className="prose prose-slate dark:prose-invert mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: April 2026</p>
        <h2>TL;DR</h2>
        <p>
          Every image tool on GoluImages runs entirely in your browser using the Canvas and File APIs. Your photos are never uploaded to our servers.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>Anonymous analytics via Google Analytics 4 (page views, country, device).</li>
          <li>Newsletter email if you choose to subscribe.</li>
          <li>Contact form submissions you send us.</li>
        </ul>
        <h2>What we do not collect</h2>
        <ul>
          <li>Your image files. They never leave your browser.</li>
          <li>EXIF metadata, GPS coordinates, or any image content.</li>
        </ul>
        <h2>Cookies</h2>
        <p>We use first-party cookies for theme preference and (optionally) Google Analytics. You can disable them in your browser settings.</p>
        <h2>Advertising</h2>
        <p>We display ads via Google AdSense. AdSense may use cookies to serve ads based on your visit to our site and other sites on the Internet. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings.</p>
        <h2>Your rights</h2>
        <p>You can email <a href="mailto:privacy@goluimages.com">privacy@goluimages.com</a> at any time to request deletion of any data we have about you.</p>
      </article>
    </div>
  );
}
