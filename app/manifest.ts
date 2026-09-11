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
    // White mark on the brand blue — the same tile as the favicon, so the
    // installed icon matches the browser tab. "maskable" carries extra padding
    // because Android crops launcher icons to its own shape.
    icons: [
      { src: "/brand/app-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
