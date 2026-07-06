import { site } from "./site";

/** Production domain if configured, else the Vercel URL, else the fallback. */
export function getSiteUrl(): string {
  // Prefer the stable production alias over the per-deployment VERCEL_URL so
  // canonicals and OG links don't point at hashed preview hostnames.
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : site.url);
}
