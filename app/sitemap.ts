import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/url";
import { services, locations, contentUpdated } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  // Stable, accurate date (see lib/site.ts) rather than build-time "now", so
  // <lastmod> stays a signal Google trusts instead of churning on every deploy.
  const lastModified = new Date(contentUpdated);
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.id}`, priority: 0.7 })),
    { path: "/work", priority: 0.8 },
    { path: "/service-areas", priority: 0.8 },
    ...locations.map((l) => ({ path: `/service-areas/${l.slug}`, priority: 0.7 })),
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
