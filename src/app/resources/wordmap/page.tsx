"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "../../../app/wordmap/_components/ErrorBoundary";

// Import WordMapContainer dynamically with no SSR
const WordMapContainer = dynamic(
  () =>
    import("../../../app/wordmap/_components").then(
      (mod) => mod.WordMapContainer,
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

function LoadingSpinner() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export default function WordMapPage() {
  return (
    <main className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <WordMapContainer />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
