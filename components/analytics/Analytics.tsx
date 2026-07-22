import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Google Analytics 4.
 *
 * Uses Next.js's official `@next/third-parties` integration — the method Google
 * and Next.js recommend for the App Router. It loads gtag.js with the
 * framework's script-loading optimizations and automatically reports a
 * `page_view` on client-side route changes, so navigations between pages are
 * counted without any manual wiring.
 *
 * The tag is injected only when BOTH conditions hold:
 *   1. This is a production build (`next build` / Vercel) — never `next dev`, so
 *      local development never sends hits to the live GA property.
 *   2. A Measurement ID is present in `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
 *
 * `NEXT_PUBLIC_*` values are inlined at build time, so set the variable in
 * Vercel → Project → Settings → Environment Variables (Production) with the
 * format `G-XXXXXXXXXX`, then redeploy. See `.env.example`.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (process.env.NODE_ENV !== "production" || !gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
