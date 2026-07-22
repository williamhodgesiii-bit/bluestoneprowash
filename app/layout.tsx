import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";
import { businessNode, graph, webSiteNode } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
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

// Site-wide entity graph: the business and the website it publishes. Individual
// pages add their own WebPage/BreadcrumbList/Service/FAQ nodes that reference
// these by @id. Reviews/ratings are derived from the verified Google reviews in
// lib/site.ts — keep that list in sync with the live profile so numbers stay honest.
const siteGraph = graph([businessNode(siteUrl), webSiteNode(siteUrl)]);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={siteGraph} />
        <Analytics />
      </body>
    </html>
  );
}
