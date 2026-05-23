import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./_form";
import { Mail, Twitter } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Contact GoluImages",
  description: "Have feedback, bug reports or partnership ideas? Get in touch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Say hi 👋</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Bug reports, feature requests, partnerships, press — we read everything.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg border"><Mail className="h-4 w-4" /></div>
              <a href="mailto:hello@goluimages.com" className="hover:text-primary">hello@goluimages.com</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg border"><Twitter className="h-4 w-4" /></div>
              <a href="https://twitter.com/goluimages" className="hover:text-primary">@goluimages</a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
