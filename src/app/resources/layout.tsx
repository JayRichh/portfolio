"use client";

import React from "react";
import { ResourcesHeader } from "./_components/ResourcesHeader";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ResourcesHeader />
      {children}
    </main>
  );
}
