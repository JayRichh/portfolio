"use client";

import React, { useEffect } from "react";
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
  const { yearData, languageData, setLoading, setError } = useGitHubStore();

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;

      // Only fetch if we don't have the data already
      if (!yearData.length || !languageData) {
        setLoading(true);
        setError(null); // Reset any previous errors
        try {
          // Fetch both contributions and language data concurrently
          await Promise.all([
            yearData.length === 0
              ? fetchGitHubContributions()
              : Promise.resolve(),
            !languageData ? fetchGitHubLanguages() : Promise.resolve(),
          ]);
        } catch (error) {
          // Error handling is done in the individual fetch functions
          // They will set the error in the store appropriately
          console.error("Error loading GitHub data:", error);
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [yearData.length, languageData, setLoading, setError]);

  return <>{children}</>;
}
