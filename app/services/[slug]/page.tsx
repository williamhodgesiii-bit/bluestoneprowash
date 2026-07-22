import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteBand } from "@/components/sections/QuoteBand";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbNode, graph, serviceNode, webPageNode } from "@/lib/schema";
import { serviceAreas, services, site } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

// Only the five known services are valid slugs; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

const findService = (slug: string) => services.find((s) => s.id === slug);

function seoFor(slug: string) {
  const service = findService(slug);
  if (!service) return null;
  const title = `${service.name} in Birmingham, AL`;
  const description = `${service.blurb} Serving ${serviceAreas
    .slice(0, 4)
    .join(", ")} and Greater Birmingham. Free quotes — call ${site.phoneDisplay}.`;
  return { service, title, description };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = seoFor(slug);
  if (!seo) return {};
  return pageMetadata({ title: seo.title, description: seo.description, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = seoFor(slug);
  if (!seo) notFound();
  const { service, title, description } = seo;

  const base = getSiteUrl();
  const path = `/services/${service.id}`;
  const others = services.filter((s) => s.id !== service.id);

  const jsonLd = graph([
    webPageNode(base, { path, name: title, description, hasBreadcrumb: true }),
    breadcrumbNode(base, path, [
      { name: "Services", path: "/services" },
      { name: service.name, path },
    ]),
    serviceNode(base, service),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero kicker="Service" title={title} intro={service.blurb}>
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
          {/*
           * Copy on the left, crew photo on the right. Vertical centering keeps
           * the shorter copy balanced against the taller portrait photo instead
           * of leaving a big gap beneath it. Services without a photo just let
           * the copy span the row at a comfortable reading width. On mobile the
           * two stack, and the photo is capped so it stays a modest support shot.
           */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className={service.image ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-3xl"}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.7rem]">
                {service.name} done right
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[0.95rem] font-medium text-ink">
                    <Icon name="Check" className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-ink-soft">
                Surfaces we handle: {service.surfaces}. We match the right method to every material —
                no roof-blasting, no split siding.
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {service.name} for homes across {serviceAreas.slice(0, 8).join(", ")}, and the rest of
                Greater Birmingham.
              </p>
            </div>

            {service.image && (
              <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-lift ring-1 ring-black/5 lg:col-span-5 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 1023px) 384px, 40vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            )}
          </div>

          {/* Other services — one tidy row of links that reads the same on every
              service page, photo or not. */}
          <div className="mt-10 border-t border-steel-200 pt-8 sm:mt-14 sm:pt-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink-soft">
              Explore our other services
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-steel-200 bg-steel-50 px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand-300 hover:bg-white hover:text-brand-700"
                >
                  <Icon name={s.icon} className="h-4 w-4 text-brand-600" />
                  {s.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-100"
              >
                All services
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}
