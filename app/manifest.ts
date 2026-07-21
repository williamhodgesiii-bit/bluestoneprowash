import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web app manifest — branding/PWA metadata only. Does not alter the visible UI.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0561bb",
    icons: [
      { src: "/brand/icon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/brand/logo-square.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
