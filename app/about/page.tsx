import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OurStory } from "@/components/sections/OurStory";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bluestone Pro Wash is a locally owned, fully insured pressure washing crew serving Greater Birmingham since 2022 — the people who answer the phone are the ones who do the work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="The crew behind the wash"
        intro="We're a small, locally owned Birmingham outfit that treats your driveway, roof, and landscaping the way we'd treat our own."
      />
      <OurStory />
      <WhyUs />
      <ServiceArea />
      <QuoteBand />
    </>
  );
}
