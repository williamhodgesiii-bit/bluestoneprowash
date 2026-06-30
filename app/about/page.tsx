import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OurStory } from "@/components/sections/OurStory";
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
        title="Meet the crew"
        intro="A small, locally owned cleaning company in Greater Birmingham. Anderson O'Neal and his crew do every job themselves."
      />
      <OurStory />
      <QuoteBand />
    </>
  );
}
