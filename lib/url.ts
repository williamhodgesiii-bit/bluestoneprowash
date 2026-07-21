import { site } from "./site";

/**
 * The single absolute origin used for every canonical URL, sitemap entry,
 * robots host, Open Graph tag, and JSON-LD `@id`.
 *
 * Precedence:
 *   1. NEXT_PUBLIC_SITE_URL — set this in the host/environment to point the
 *      whole SEO layer at the live domain (or a temporary domain) at launch.
 *   2. site.url — the confirmed production domain in lib/site.ts.
 *
 * We deliberately do NOT fall back to VERCEL_URL / VERCEL_PROJECT_PRODUCTION_URL:
 * per-deployment preview hosts (and hashed URLs) must never leak into indexable
 * SEO output. Preview builds still emit the production domain, which is the
 * desired canonical target.
 */
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || site.url).trim();
  // Strip any trailing slash so `${base}/path` never doubles up.
  return raw.replace(/\/+$/, "");
}
