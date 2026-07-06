import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site, testimonials } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileCallBar } from "@/components/sections/MobileCallBar";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "pressure washing Birmingham",
    "soft washing Birmingham AL",
    "roof cleaning Birmingham",
    "window cleaning Birmingham",
    "gutter cleaning",
    "house washing Hoover Vestavia Mountain Brook",
    "driveway cleaning Alabama",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0561bb",
  colorScheme: "light",
};

// LocalBusiness structured data. The rating block below is derived from the
// verified Google reviews in lib/site.ts — keep that list in sync with the
// live profile so these numbers stay honest.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": siteUrl,
  name: site.name,
  image: `${siteUrl}/og.png`,
  url: siteUrl,
  telephone: site.phoneE164,
  email: site.email,
  priceRange: "$$",
  foundingDate: String(site.established),
  areaServed: {
    "@type": "City",
    name: "Birmingham",
    containedInPlace: { "@type": "State", name: "Alabama" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Birmingham",
    addressRegion: "AL",
    addressCountry: "US",
  },
  openingHours: "Mo-Sa 07:00-19:00",
  makesOffer: ["Pressure Washing", "Soft Washing", "Roof Cleaning", "Window Cleaning", "Gutter Cleaning"].map(
    (s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })
  ),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <script
          type="application/ld+json"
          // Escape "<" so review text can never terminate the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
