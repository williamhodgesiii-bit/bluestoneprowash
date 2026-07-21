import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { Transformations } from "@/components/sections/Transformations";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, webPageNode } from "@/lib/schema";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

const base = getSiteUrl();
const homeGraph = graph([
  webPageNode(base, {
    path: "/",
    name: `${site.name} · ${site.tagline}`,
    description: site.description,
  }),
]);

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph} />
      <Hero />
      <TrustBar />
      <ServicesTeaser />
      <Transformations />
      <Testimonials limit={3} />
      <ServiceArea />
      <QuoteBand />
    </>
  );
}
