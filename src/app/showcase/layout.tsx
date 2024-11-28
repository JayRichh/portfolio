"use client";

import React from "react";
import { ResourcesHeader as ShowcasesHeader } from "./_components/ResourcesHeader";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col">
      <ShowcasesHeader />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
