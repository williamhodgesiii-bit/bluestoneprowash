import { PageHero } from "@/components/ui/PageHero";
import { Transformations } from "@/components/sections/Transformations";
import { Gallery } from "@/components/sections/Gallery";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { getSiteUrl } from "@/lib/url";

const description =
  "Before-and-after pressure washing and soft washing results from real homes around Greater Birmingham: driveways, roofs, siding, and glass.";

export const metadata = pageMetadata({
  title: "Our Work",
  description,
  path: "/work",
});

const base = getSiteUrl();
const workGraph = graph([
  webPageNode(base, {
    path: "/work",
    name: "Our Work",
    description,
    type: "CollectionPage",
    hasBreadcrumb: true,
  }),
  breadcrumbNode(base, "/work", [{ name: "Our Work", path: "/work" }]),
]);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={workGraph} />
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
