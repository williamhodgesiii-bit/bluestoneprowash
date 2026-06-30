import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { QuoteBand } from "@/components/sections/QuoteBand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Pressure washing, soft washing, roof washing, window cleaning, and gutter cleaning across Greater Birmingham — the right method matched to every surface.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Pressure washing, soft washing & everything between"
        intro="Five things we do well, each matched to the surface it's cleaning. Hard surfaces get pressure; roofs and siding get a gentle soft wash. Here's exactly what that means for your home."
      />
      <Services />
      <Process />
      <Faq bg="steel" />
      <QuoteBand />
    </>
  );
}
