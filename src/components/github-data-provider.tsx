"use client";

import React, { useEffect, useRef } from "react";
import {
  fetchGitHubContributions,
  fetchGitHubLanguages,
  useGitHubStore,
} from "../lib/github";

export function GitHubDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initRef = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (initRef.current) return;
    initRef.current = true;

    const store = useGitHubStore.getState();
    const { yearData, languageData, isLoading } = store;

    // Only fetch if we don't have the data and not currently loading
    if ((!yearData.length || !languageData) && !isLoading) {
      store.setLoading(true);
      store.setError(null);

      Promise.all([
        yearData.length === 0
          ? fetchGitHubContributions()
          : Promise.resolve(),
        !languageData ? fetchGitHubLanguages() : Promise.resolve(),
      ]).catch((error) => {
        console.error("Error loading GitHub data:", error);
      });
    }
  }, []);

  return <>{children}</>;
}
