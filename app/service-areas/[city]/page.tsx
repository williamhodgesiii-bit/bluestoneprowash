import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/sections/Services";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, locationServiceNodes, webPageNode } from "@/lib/schema";
import { locations, services, site } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

// Only the known towns are valid slugs; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

const findLocation = (slug: string) => locations.find((l) => l.slug === slug);

function seoFor(slug: string) {
  const loc = findLocation(slug);
  if (!loc) return null;
  const title = `Pressure Washing in ${loc.name}, AL`;
  const description = `Pressure washing, soft washing, roof, window & gutter cleaning in ${loc.name}, AL. Serving ${loc.neighborhoods
    .slice(0, 3)
    .join(", ")} and nearby. Free same-day quotes — call ${site.phoneDisplay}.`;
  return { loc, title, description };
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const seo = seoFor(city);
  if (!seo) return {};
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/service-areas/${city}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const seo = seoFor(city);
  if (!seo) notFound();
  const { loc, title, description } = seo;

  const base = getSiteUrl();
  const path = `/service-areas/${loc.slug}`;
  const nearby = loc.adjacent
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const jsonLd = graph([
    webPageNode(base, { path, name: title, description, type: "CollectionPage", hasBreadcrumb: true }),
    breadcrumbNode(base, path, [
      { name: "Service Areas", path: "/service-areas" },
      { name: loc.name, path },
    ]),
    ...locationServiceNodes(base, loc),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        kicker={`Service area · ${loc.county}`}
        title={`Pressure Washing & Exterior Cleaning in ${loc.name}, AL`}
        intro={loc.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contact" arrow>
            Get a free quote
          </Button>
          <Button href={site.phoneHref} variant="outline" iconLeft="Phone">
            {site.phoneDisplay}
          </Button>
        </div>
      </PageHero>

      <section className="bg-white py-10 sm:py-16">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.7rem]">
              Exterior cleaning services in {loc.name}
            </h2>
            <Link
              href="/service-areas"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-600 sm:inline-flex"
            >
              <Icon name="ChevronLeft" className="h-4 w-4" /> All service areas
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          {/* Local detail — real and unique per town */}
          <div className="mt-10 grid gap-8 border-t border-steel-200 pt-8 sm:mt-14 sm:pt-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
                Neighborhoods we serve in {loc.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {loc.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-steel-200 bg-steel-50 px-3 py-1.5 text-sm font-semibold text-ink"
                  >
                    <Icon name="MapPin" className="h-3.5 w-3.5 text-brand-600" />
                    {n}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Serving {loc.name} and the surrounding {loc.county}
                {loc.zips.length > 0 && ` · ZIP codes ${loc.zips.join(", ")}`}.
              </p>
            </div>

            {nearby.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
                  Nearby areas we cover
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {nearby.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/service-areas/${n.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-steel-200 bg-white px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <Icon name="MapPin" className="h-4 w-4 text-brand-600" />
                      {n.name}
                    </Link>
                  ))}
                  <Link
                    href="/service-areas"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    All areas <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <QuoteBand
        title={`Free quotes in ${loc.name}`}
        blurb="Tell us what needs cleaning and we'll send a clear, upfront price, usually the same day."
      />
    </>
  );
}
