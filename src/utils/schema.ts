type SchemaContext = {
  siteUrl: string;
  siteName: string;
  siteImage: string;
};

const defaultContext: SchemaContext = {
  siteUrl: "https://jayrich.dev",
  siteName: "Jayden Richardson Portfolio",
  siteImage: "/logo_bg_remove.png",
};

export function generatePersonSchema(context: SchemaContext = defaultContext) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jayden Richardson",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Web Developer specializing in React, TypeScript, and modern web technologies",
    url: context.siteUrl,
    image: `${context.siteUrl}${context.siteImage}`,
    sameAs: [
      "https://github.com/jayrichh",
      "https://linkedin.com/in/jaydenrichardson",
      "https://bsky.app/profile/jayrich.dev",
    ],
    knowsAbout: [
      "React Development",
      "TypeScript Programming",
      "Next.js Applications",
      "Frontend Development",
      "Web Accessibility",
      "Responsive Design",
      "API Integration",
      "User Interface Design",
      "Full Stack Development",
      "Web Performance Optimization",
      "DevOps Practices",
      "Cloud Services",
    ],
  };
}

export function generateWebsiteSchema(context: SchemaContext = defaultContext) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: context.siteName,
    url: context.siteUrl,
    description:
      "Full Stack Web Developer specializing in React, TypeScript, and modern web technologies. Explore my portfolio of interactive web applications, development tools, and technical resources.",
    image: [
      `${context.siteUrl}${context.siteImage}`,
      `${context.siteUrl}/logo_bg_remove.png`,
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: `${context.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    applicationCategory: "Portfolio",
    keywords: [
      "web development",
      "full stack development",
      "react development",
      "typescript",
      "javascript",
      "next.js",
      "portfolio",
      "web applications",
    ].join(", "),
    creator: {
      "@type": "Person",
      name: "Jayden Richardson",
      url: context.siteUrl,
    },
  };
}

export function generatePortfolioSchema(
  context: SchemaContext = defaultContext,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: context.siteName,
    applicationCategory: "WebApplication",
    applicationSubCategory: "Portfolio",
    operatingSystem: "Web Browser",
    url: context.siteUrl,
    image: [
      `${context.siteUrl}${context.siteImage}`,
      `${context.siteUrl}/logo_bg_remove.png`,
    ],
    screenshot: [
      {
        "@type": "ImageObject",
        url: `${context.siteUrl}/logo_bg_remove.png`,
        caption: "Portfolio Project Showcase",
      },
    ],
    description:
      "Interactive portfolio showcasing web development projects, code examples, and technical resources",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Interactive Project Showcase",
      "Code Examples & Snippets",
      "Technical Blog & Resources",
      "Development Tools & Utilities",
      "Learning Resources",
      "Contact & Collaboration",
      "Project Documentation",
      "Live Demos",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateBreadcrumbSchema(
  context: SchemaContext = defaultContext,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${context.siteUrl}${item.path}`,
    })),
  };
}

export function generateProjectSchema(
  context: SchemaContext = defaultContext,
  project: {
    name: string;
    description: string;
    path: string;
    technologies: string[];
    image?: string;
    features?: string[];
    demoUrl?: string;
    sourceUrl?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: `${context.siteUrl}${project.path}`,
    image: project.image
      ? `${context.siteUrl}${project.image}`
      : `${context.siteUrl}${context.siteImage}`,
    programmingLanguage: project.technologies,
    ...(project.features && {
      featureList: project.features,
    }),
    ...(project.demoUrl && {
      workExample: {
        "@type": "WebApplication",
        url: project.demoUrl,
      },
    }),
    ...(project.sourceUrl && {
      codeRepository: project.sourceUrl,
    }),
    author: {
      "@type": "Person",
      name: "Jayden Richardson",
      url: context.siteUrl,
    },
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas: any[]) {
  return schemas.map((schema) => ({
    ...schema,
    "@context": "https://schema.org",
  }));
}
