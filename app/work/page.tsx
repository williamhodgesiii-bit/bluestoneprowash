import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Transformations } from "@/components/sections/Transformations";
import { Gallery } from "@/components/sections/Gallery";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Before-and-after pressure washing and soft washing results from real homes around Greater Birmingham: driveways, roofs, siding, and glass.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Our work"
        title="Before, after, and the proof in between"
        intro="These are real Birmingham homes. No stock photos, no filters. Drag the slider to see the difference, then scroll through recent jobs."
      />
      <Transformations />
      <Gallery />
      <QuoteBand title="Want results like these?" />
    </>
  );
}
