import React from "react";
import {
  generatePersonSchema,
  generateWebsiteSchema,
  generatePortfolioSchema,
  generateBreadcrumbSchema,
  combineSchemas
} from "../utils/schema";

export function Schema() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: "Code", path: "/code" }
  ];

  const schema = combineSchemas(
    generatePersonSchema(),
    generateWebsiteSchema(),
    generatePortfolioSchema(),
    generateBreadcrumbSchema(undefined, breadcrumbItems)
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
