import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds a consistent Metadata object for a route so titles, descriptions,
 * canonicals, and social cards never drift apart.
 *
 * Why this exists: when a route sets its own `openGraph`/`twitter`, Next.js
 * replaces the parent object rather than deep-merging it. Without re-declaring
 * them here, every inner page would inherit the homepage's OG title and share
 * as "Bluestone Pro Wash · …" instead of its own page title. This helper
 * re-emits them (including the default OG image) so each shared link is right.
 *
 * `path` is a canonical, root-relative path (e.g. "/services"). It is resolved
 * to an absolute URL against metadataBase (set in app/layout.tsx).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Override the social-card title; defaults to "<title> · <brand>". */
  ogTitle?: string;
}): Metadata {
  const socialTitle =
    ogTitle ?? (path === "/" ? `${site.name} · ${site.tagline}` : `${title} · ${site.name}`);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: site.name,
      title: socialTitle,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og.png"],
    },
  };
}
