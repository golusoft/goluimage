import type { Metadata } from "next";
import { absoluteUrl } from "./utils";

interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-default.png",
  noindex,
  keywords,
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "GoluImages";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://goluimages.com"),
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@goluimages",
    },
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function softwareApplicationLD(opts: {
  name: string;
  description: string;
  url: string;
  ratingValue?: number;
  ratingCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating:
      opts.ratingValue && opts.ratingCount
        ? {
            "@type": "AggregateRating",
            ratingValue: opts.ratingValue,
            ratingCount: opts.ratingCount,
          }
        : undefined,
  };
}

export function breadcrumbLD(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqLD(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLD(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: { "@type": "Person", name: opts.authorName },
    publisher: {
      "@type": "Organization",
      name: process.env.NEXT_PUBLIC_SITE_NAME || "GoluImages",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: opts.url,
  };
}

export function organizationLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: process.env.NEXT_PUBLIC_SITE_NAME || "GoluImages",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    sameAs: [
      "https://twitter.com/goluimages",
      "https://github.com/goluimages",
    ],
  };
}
