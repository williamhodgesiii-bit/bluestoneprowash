import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { TrustBar } from "@/components/sections/TrustBar";
import { Faq } from "@/components/sections/Faq";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free, no-obligation pressure washing quote in Greater Birmingham. Call, text, or fill out the form and we'll send a clear, upfront price, usually the same day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Free quote"
        title="Let's get your place cleaned up"
        intro="The fastest way to a price is to call or text. Prefer to type it out? Use the form below and we'll get right back to you, usually the same day."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-xl font-extrabold text-brand-700 hover:text-brand-600"
          >
            <Icon name="Phone" className="h-6 w-6" /> {site.phoneDisplay}
          </a>
          <span className="hidden text-steel-300 sm:inline">•</span>
          <span className="text-sm font-medium text-ink-soft">{site.hours}</span>
        </div>
      </PageHero>
      <QuoteForm />
      <TrustBar />
      <Faq />
    </>
  );
}
