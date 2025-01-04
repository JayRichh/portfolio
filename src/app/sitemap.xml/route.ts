import { MetadataRoute } from "next";

export async function GET(): Promise<Response> {
  const sitemap = generateSitemap();
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

function generateSitemap(): string {
  const lastModified = new Date().toISOString();
  
  const entries = [
    {
      url: "https://jayrich.dev",
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jayrich.dev/work",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jayrich.dev/code",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jayrich.dev/showcase",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jayrich.dev/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://jayrich.dev/learnings",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://jayrich.dev/resources",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://jayrich.dev/wordmap",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.map(entry => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      <changefreq>${entry.changeFrequency}</changefreq>
      <priority>${entry.priority}</priority>
    </url>
  `).join('')}
</urlset>`;
}
