import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { areasItemListNode, breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { locations } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

const description =
  "Pressure washing, soft washing, and exterior cleaning across Greater Birmingham — Hoover, Vestavia Hills, Mountain Brook, Homewood, Pelham, and more. Find your town.";

export const metadata = pageMetadata({
  title: "Service Areas",
  description,
  path: "/service-areas",
});

const base = getSiteUrl();
const areasGraph = graph([
  webPageNode(base, {
    path: "/service-areas",
    name: "Service Areas",
    description,
    type: "CollectionPage",
    hasBreadcrumb: true,
  }),
  breadcrumbNode(base, "/service-areas", [{ name: "Service Areas", path: "/service-areas" }]),
  areasItemListNode(base, locations),
]);

// Keep the region order they first appear in the data.
const regions = Array.from(new Set(locations.map((l) => l.region)));

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={areasGraph} />
      <PageHero
        kicker="Service areas"
        title="Where we work around Birmingham"
        intro="We're a mobile crew — we come to you. Pick your town for the local details, or just call and we'll confirm we cover you in about a minute."
      />

      <section className="bg-white py-8 sm:py-14">
        <Container className="flex flex-col gap-10">
          {regions.map((region) => (
            <div key={region}>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">{region}</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {locations
                  .filter((l) => l.region === region)
                  .map((l) => (
                    <Link
                      key={l.slug}
                      href={`/service-areas/${l.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-steel-200 bg-white p-5 transition-colors hover:border-brand-300"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name="MapPin" className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-extrabold leading-tight text-ink">
                          {l.name}, AL
                        </span>
                        <span className="mt-1 block text-xs text-ink-soft">{l.county}</span>
                        <span className="mt-1.5 block text-sm text-ink-soft">
                          {l.neighborhoods.slice(0, 3).join(" · ")}
                        </span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <QuoteBand
        title="Don't see your town?"
        blurb="We probably cover it. Call or send the quick form and we'll confirm in minutes."
      />
    </>
  );
}
