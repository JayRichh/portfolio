import React from "react";

export function Schema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jayden Richardson",
    jobTitle: "Full Stack Developer",
    description: "Web developer working with React, TypeScript, and modern web technologies",
    url: "https://jayrich.dev",
    sameAs: [
      "https://github.com/jayrichh"
    ],
    knowsAbout: [
      "React Development",
      "TypeScript Programming",
      "Next.js Applications",
      "Frontend Development",
      "Web Accessibility",
      "Responsive Design",
      "API Integration",
      "User Interface Design"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jayden Richardson Portfolio",
    url: "https://jayrich.dev",
    description: "Personal website showcasing web development projects and learning resources",
    potentialAction: {
      "@type": "ViewAction",
      target: [
        "https://jayrich.dev/code",
        "https://jayrich.dev/work",
        "https://jayrich.dev/about",
        "https://jayrich.dev/learnings",
        "https://jayrich.dev/resources",
        "https://jayrich.dev/showcase",
        "https://jayrich.dev/wordmap"
      ]
    }
  };

  const schema = [personSchema, websiteSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
