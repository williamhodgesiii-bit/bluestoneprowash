import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/url";
import { services } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.id}`, priority: 0.7 })),
    { path: "/work", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
