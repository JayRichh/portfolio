"use client";

import React from "react";
import { ResourcesHeader } from "./_components/ResourcesHeader";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col">
      <ResourcesHeader />
      <div className="flex-1 overflow-hidden pt-14">
        {children}
      </div>
    </main>
  );
}
