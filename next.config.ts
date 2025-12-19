import type { NextConfig } from "next";

export default {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },
} satisfies NextConfig;
