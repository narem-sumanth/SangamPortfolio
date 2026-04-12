import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sangampazare.online/sitemap.xml",
    host: "https://sangampazare.online",
  };
}
