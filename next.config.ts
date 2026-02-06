import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default createMDX()(nextConfig);
