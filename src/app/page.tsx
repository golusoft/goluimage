import { Hero } from "@/components/home/hero";
import { FeaturedTools } from "@/components/home/featured-tools";
import { TrendingTools } from "@/components/home/trending-tools";
import { CategoriesSection } from "@/components/home/categories";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { FAQSection } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";
import { Newsletter } from "@/components/home/newsletter";
import { BlogPreviews } from "@/components/home/blog-previews";
import { InternalLinks } from "@/components/home/internal-links";
import { SEOContent } from "@/components/home/seo-content";
import { jsonLdScript, softwareApplicationLD } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          softwareApplicationLD({
            name: "GoluImages",
            description:
              "30+ free browser-based image tools — compress, resize, convert, watermark, remove background and more.",
            url: absoluteUrl("/"),
            ratingValue: 4.9,
            ratingCount: 12480,
          })
        )}
      />
      <Hero />
      <Stats />
      <FeaturedTools />
      <CategoriesSection />
      <TrendingTools />
      <SEOContent />
      <Testimonials />
      <BlogPreviews />
      <FAQSection />
      <Newsletter />
      <InternalLinks />
      <CTA />
    </>
  );
}
