"use client";

import React from "react";
import { ResourcesHeader as WorksHeader } from "./_components/ResourcesHeader";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col">
      <WorksHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
