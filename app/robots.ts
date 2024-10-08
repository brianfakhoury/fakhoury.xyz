import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fakhoury.xyz/sitemap.xml",
    host: "https://fakhoury.xyz",
  };
}
