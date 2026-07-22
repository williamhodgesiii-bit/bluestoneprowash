import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Google Analytics 4.
 *
 * Uses Next.js's official `@next/third-parties` integration — the method Google
 * and Next.js recommend for the App Router. It loads gtag.js with the
 * framework's script-loading optimizations and automatically reports a
 * `page_view` on client-side route changes.
 *
 * The Measurement ID is read from `NEXT_PUBLIC_GA_MEASUREMENT_ID` first and
 * otherwise falls back to the live property ID below. A GA4 Measurement ID is
 * not a secret — it ships in the page HTML of every site that uses it (Google's
 * own setup has you paste it straight into the markup) — so committing it as the
 * default, exactly as `lib/site.ts` does for `web3formsKey`, is safe and keeps
 * tracking live on the production site without any extra host configuration.
 */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RFR5MEWBSX";

export function Analytics() {
  // Never load during local development (`next dev`).
  if (process.env.NODE_ENV !== "production") return null;

  // On Vercel, only the Production environment serves the live
  // www.bluestoneprowash.com domain — skip Preview deploys so they don't pollute
  // the GA property. When VERCEL_ENV isn't exposed this check is simply skipped,
  // so a plain production build (or a self-hosted deploy) is never missed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return null;

  if (!GA_MEASUREMENT_ID) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
