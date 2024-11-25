"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGitHubContributions, useGitHubStore, useContributions, YearContributions } from "../../../lib/github";
import { ProgressLoader } from "../../../components/ui/progress-loader";

export default function GitHubPage() {
  const [yearData, setYearData] = useState<YearContributions[]>([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const reset = useGitHubStore((state) => state.reset);
  const cachedData = useContributions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        // Check for cached data first
        if (cachedData && mounted) {
          console.log('Using cached data');
          setYearData(cachedData);
          setLoading(false);
          setShowContent(true);
          return;
        }

        // If no cached data, fetch new data
        console.log('Fetching GitHub data...');
        const contributions = await fetchGitHubContributions();
        
        if (mounted && contributions.length > 0) {
          console.log('Setting new contributions data');
          setYearData(contributions);
          setLoading(false);
          setShowContent(true);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Only reset and fetch if we don't have cached data
    if (!cachedData) {
      reset();
      loadData();
    } else {
      // If we have cached data, use it immediately
      setYearData(cachedData);
      setLoading(false);
      setShowContent(true);
    }

    return () => {
      mounted = false;
    };
  }, [reset, cachedData]);

  // Early return while loading with progress indicator
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ProgressLoader 
          onComplete={() => {
            if (yearData.length > 0) {
              setLoading(false);
              setShowContent(true);
            }
          }}
          isDataReady={yearData.length > 0}
        />
      </div>
    );
  }

  // Handle no data case
  if (!yearData.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">No GitHub Data Available</h1>
          <p className="text-muted-foreground">Unable to load GitHub contribution data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const selectedYear = yearData[selectedYearIndex];
  const fromDate = `${selectedYear.year}-01-01`;
  const toDate = `${selectedYear.year}-12-31`;

  // GitHub's exact color schemes
  const lightColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
  const darkColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-16"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">GitHub Activity</h1>
            <p className="text-lg text-muted-foreground">
              A visualization of my GitHub contribution activity, showing commit frequency and development patterns.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-xl font-semibold">
              {selectedYear.totalContributions.toLocaleString()} contributions in {selectedYear.year}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedYearIndex(prev => Math.min(prev + 1, yearData.length - 1))}
                disabled={selectedYearIndex === yearData.length - 1}
                className={`px-3 py-1 rounded-md ${
                  selectedYearIndex === yearData.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-label="Previous year"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedYearIndex(prev => Math.max(prev - 1, 0))}
                disabled={selectedYearIndex === 0}
                className={`px-3 py-1 rounded-md ${
                  selectedYearIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-label="Next year"
              >
                →
              </button>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-8"
          >
            <div className="h-[500px] w-full">
              <ResponsiveCalendarCanvas
                data={selectedYear.contributions}
                from={fromDate}
                to={toDate}
                emptyColor={isDark ? "#161b22" : "#ebedf0"}
                colors={isDark ? darkColors.slice(1) : lightColors.slice(1)}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                monthBorderColor={isDark ? "#30363d" : "#d0d7de"}
                dayBorderWidth={1}
                dayBorderColor={isDark ? "#1b1f23" : "#fff"}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "row",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left",
                    itemTextColor: isDark ? "#7d8590" : "#57606a"
                  }
                ]}
                theme={{
                  text: {
                    fontSize: 12,
                    fill: isDark ? "#7d8590" : "#57606a"
                  },
                  tooltip: {
                    container: {
                      background: isDark ? "#161b22" : "#ffffff",
                      color: isDark ? "#7d8590" : "#57606a",
                      fontSize: "12px",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }
                  }
                }}
              />
            </div>
          </motion.div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              Note: This visualization shows contributions to both public and private repositories and includes commits, pull requests, and issues.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
