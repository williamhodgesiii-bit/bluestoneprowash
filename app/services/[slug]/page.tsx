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

      <section className="bg-white py-8 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
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
              Surfaces we handle: {service.surfaces}. We match the right method to every material — no
              roof-blasting, no split siding.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {service.name} for homes across {serviceAreas.slice(0, 8).join(", ")}, and the rest of
              Greater Birmingham.
            </p>
          </div>

          <aside className="lg:col-span-5">
            {service.image && (
              <figure className="relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 440px"
                  className="object-cover"
                />
              </figure>
            )}
            <div className="rounded-2xl border border-steel-200 bg-steel-50 p-6">
              <h2 className="text-lg font-extrabold text-ink">Other services</h2>
              <ul className="mt-4 flex flex-col gap-1">
                {others.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.id}`}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-white hover:text-brand-700"
                    >
                      <Icon name={s.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="mt-1 flex items-center gap-2.5 rounded-lg border-t border-steel-200 px-2 pt-3 text-sm font-bold text-brand-700 transition-colors hover:text-brand-600"
                  >
                    <Icon name="ArrowRight" className="h-4 w-4 shrink-0" />
                    All services
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <QuoteBand />
    </>
  );
}
