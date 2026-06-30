import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OurStory } from "@/components/sections/OurStory";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bluestone Pro Wash is a small, locally owned pressure washing crew serving Greater Birmingham since 2022. The people who answer the phone are the ones who do the work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Who we are"
        intro="We're a small, locally owned cleaning company in Birmingham. Anderson O'Neal and his crew do the work themselves."
      />
      <OurStory />
      <WhyUs />
      <ServiceArea />
      <QuoteBand />
    </>
  );
}
