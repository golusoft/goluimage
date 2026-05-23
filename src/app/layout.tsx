import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "sonner";
import { buildMetadata } from "@/lib/seo";
import { jsonLdScript, organizationLD } from "@/lib/seo";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = buildMetadata({
  title: "GoluImages — Free Online Image Tools (Compress, Resize, Convert)",
  description:
    "30+ powerful free image tools that run in your browser. Compress, resize, crop, convert, watermark and remove backgrounds — no signup, no upload limits.",
  path: "/",
  keywords: [
    "image tools",
    "image compressor",
    "image resizer",
    "free image tools",
    "online image converter",
    "remove background",
  ],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(organizationLD())} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteChrome>{children}</SiteChrome>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { send_page_view: true });`}
            </Script>
          </>
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}
