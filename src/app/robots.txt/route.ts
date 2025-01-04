import { MetadataRoute } from "next";

export async function GET(): Promise<Response> {
  const robotsTxt = generateRobotsTxt();
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

function generateRobotsTxt(): string {
  const rules = {
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

  let content = '';
  
  // Add User-agent rules
  rules.rules.forEach(rule => {
    content += `User-agent: ${rule.userAgent}\n`;
    if (rule.allow) {
      (Array.isArray(rule.allow) ? rule.allow : [rule.allow]).forEach(path => {
        content += `Allow: ${path}\n`;
      });
    }
    if (rule.disallow) {
      rule.disallow.forEach(path => {
        content += `Disallow: ${path}\n`;
      });
    }
    if (rule.crawlDelay) {
      content += `Crawl-delay: ${rule.crawlDelay}\n`;
    }
    content += '\n';
  });

  // Add Sitemap and Host
  content += `Sitemap: ${rules.sitemap}\n`;
  content += `Host: ${rules.host}\n`;

  return content;
}
