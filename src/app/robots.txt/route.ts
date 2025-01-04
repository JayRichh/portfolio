import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/work", "/code", "/showcase", "/learnings", "/resources", "/wordmap"],
        disallow: [
          "/api/",
          "/_next/",
          "/_vercel/",
          "/*?",
          "/*.json$",
          "/*.xml$",
          "/private/",
        ],
        crawlDelay: 2,
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/_vercel/", "/private/"],
      },
    ],
    sitemap: "https://jayrich.dev/sitemap.xml",
    host: "https://jayrich.dev",
  };
}
