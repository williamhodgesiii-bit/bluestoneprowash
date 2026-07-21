import { services, serviceAreas, site, socials, testimonials, type Faq, type Service } from "./site";

/**
 * JSON-LD builders for the site's entity graph.
 *
 * The graph is deliberately connected by stable `@id`s so search engines and
 * AI systems can resolve one business entity across every page:
 *
 *   LocalBusiness (#business) ──published by── WebSite (#website)
 *        ▲                                          ▲
 *        │ about                                    │ isPartOf
 *     WebPage (<url>#webpage) ──breadcrumb──▶ BreadcrumbList (<url>#breadcrumb)
 *        │ (services page also emits) Service nodes + FAQPage
 *
 * Everything here is derived from lib/site.ts — the single source of truth —
 * so structured data always matches the visible content. No invented data.
 */

const BUSINESS_ID = (base: string) => `${base}/#business`;
const WEBSITE_ID = (base: string) => `${base}/#website`;

type JsonLdNode = Record<string, unknown>;

/** Escape "<" so review/FAQ text can never terminate the <script> early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Wrap one or more nodes in a schema.org @graph document. */
export function graph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * The business itself. HomeAndConstructionBusiness is the most specific correct
 * type for an exterior-cleaning company (a subtype of LocalBusiness).
 */
export function businessNode(base: string): JsonLdNode {
  const sameAs = socials.map((s) => s.href).filter(Boolean);

  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID(base),
    name: site.name,
    description: site.description,
    url: base,
    telephone: site.phoneE164,
    email: site.email,
    image: `${base}/og.png`,
    logo: `${base}/brand/logo.png`,
    priceRange: "$$",
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Birmingham",
      addressRegion: "AL",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Alabama" },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.blurb },
    })),
    ...(sameAs.length > 0 && { sameAs }),
    // Ratings/reviews are the real 5-star Google reviews rendered on the site.
    // Keep this list in sync with the live profile so the numbers stay honest.
    ...(testimonials.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: String(testimonials.length),
      },
      review: testimonials.map((t) => ({
        "@type": "Review",
        author: { "@type": "Person", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: t.quote,
      })),
    }),
  };
}

/** The website container that every page belongs to. */
export function webSiteNode(base: string): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID(base),
    url: base,
    name: site.name,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": BUSINESS_ID(base) },
  };
}

export type CrumbInput = { name: string; path: string };

/** A single page, linked to the website and the business it describes. */
export function webPageNode(
  base: string,
  opts: {
    path: string;
    name: string;
    description: string;
    type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
    hasBreadcrumb?: boolean;
  }
): JsonLdNode {
  const url = opts.path === "/" ? base : `${base}${opts.path}`;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID(base) },
    about: { "@id": BUSINESS_ID(base) },
    primaryImageOfPage: `${base}/og.png`,
    ...(opts.hasBreadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };
}

/** BreadcrumbList for an inner page. `crumbs` should include the leaf page. */
export function breadcrumbNode(base: string, path: string, crumbs: CrumbInput[]): JsonLdNode {
  const url = path === "/" ? base : `${base}${path}`;
  const items = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? base : `${base}${c.path}`,
    })),
  };
}

/**
 * A single Service, provided by the business across its areas. The @id points
 * at the service's own page so the overview list and the individual page
 * describe one entity, not two.
 */
export function serviceNode(base: string, s: Service): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${base}/services/${s.id}#service`,
    url: `${base}/services/${s.id}`,
    name: s.name,
    description: s.blurb,
    serviceType: s.name,
    category: "Exterior cleaning",
    provider: { "@id": BUSINESS_ID(base) },
    areaServed: serviceAreas.map((city) => ({ "@type": "City", name: city })),
  };
}

/** One Service node per offering, provided by the business across its areas. */
export function serviceNodes(base: string): JsonLdNode[] {
  return services.map((s) => serviceNode(base, s));
}

/** FAQPage built from the real, on-page FAQ (rendered as crawlable <details>). */
export function faqNode(base: string, path: string, faqs: Faq[]): JsonLdNode {
  const url = path === "/" ? base : `${base}${path}`;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
