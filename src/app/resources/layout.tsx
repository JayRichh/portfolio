"use client";

import React from "react";
import { ResourcesHeader } from "./_components/ResourcesHeader";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ResourcesHeader />
      <main className="pt-12">
        {children}
      </main>
    </>
  );
}
