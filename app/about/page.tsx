import { PageHero } from "@/components/ui/PageHero";
import { OurStory } from "@/components/sections/OurStory";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { getSiteUrl } from "@/lib/url";

const description =
  "Bluestone Pro Wash is a small, locally owned pressure washing crew serving Greater Birmingham since 2022. The people who answer the phone are the ones who do the work.";

export const metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

const base = getSiteUrl();
const aboutGraph = graph([
  webPageNode(base, {
    path: "/about",
    name: "About",
    description,
    type: "AboutPage",
    hasBreadcrumb: true,
  }),
  breadcrumbNode(base, "/about", [{ name: "About", path: "/about" }]),
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutGraph} />
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
