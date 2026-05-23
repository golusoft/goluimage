"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqLD, jsonLdScript } from "@/lib/seo";

const FAQS = [
  {
    q: "Are your image tools really free?",
    a: "Yes — every tool on GoluImages is 100% free with no signup, watermarks or upload limits. We are funded by ads and optional affiliate links.",
  },
  {
    q: "Do you upload my images to a server?",
    a: "No. Every tool runs entirely in your browser using the Canvas and File APIs. Your photos never leave your device, which is faster and far more private.",
  },
  {
    q: "What is the maximum file size?",
    a: "There is no hard limit. Modern browsers handle 100 MB+ images comfortably. Performance depends on your device's RAM.",
  },
  {
    q: "Can I batch process hundreds of images?",
    a: "Yes — the Image Compressor, Bulk Image Converter and Watermark tools all support drag-and-drop batches with ZIP export.",
  },
  {
    q: "Do the tools work on mobile?",
    a: "Absolutely. Every tool is mobile-first and tested on iOS Safari and Android Chrome.",
  },
  {
    q: "How do you make money?",
    a: "We display unobtrusive ads and earn affiliate commissions when you upgrade to compatible third-party tools. The product itself remains free.",
  },
];

export function FAQSection() {
  return (
    <section className="container py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLD(FAQS))}
      />
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Common questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="last:border-b-0">
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
