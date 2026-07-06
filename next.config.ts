import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Serve AVIF where the browser supports it (noticeably smaller than WebP
    // for the photo-heavy before/after and gallery sections).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
