import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },
} satisfies NextConfig;

const withMDX = createMDX();

export default withMDX(nextConfig);
