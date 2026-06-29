import { site } from "./site";

/** Production domain if configured, else the Vercel deploy URL, else the fallback. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : site.url)
  );
}
