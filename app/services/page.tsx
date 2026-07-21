import { PageHero } from "@/components/ui/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, graph, serviceNodes, webPageNode } from "@/lib/schema";
import { faqs } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

const description =
  "Pressure washing, soft washing, roof washing, window cleaning, and gutter cleaning across Greater Birmingham — the right method matched to every surface.";

export const metadata = pageMetadata({
  title: "Services",
  description,
  path: "/services",
});

const base = getSiteUrl();
const servicesGraph = graph([
  webPageNode(base, {
    path: "/services",
    name: "Services",
    description,
    type: "CollectionPage",
    hasBreadcrumb: true,
  }),
  breadcrumbNode(base, "/services", [{ name: "Services", path: "/services" }]),
  ...serviceNodes(base),
  faqNode(base, "/services", faqs),
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesGraph} />
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
