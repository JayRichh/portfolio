"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGitHubContributions, useGitHubStore, useContributions, YearContributions } from "../../lib/github";
import { ProgressLoader } from "../../components/ui/progress-loader";

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
    const loadData = async () => {
      try {
        console.log('Fetching GitHub data...');
        if (cachedData) {
          console.log('Using cached data');
          setYearData(cachedData);
          setLoading(false);
          setShowContent(true);
          return;
        }

        const contributions = await fetchGitHubContributions();
        console.log('Received contributions:', contributions);
        if (contributions.length > 0) {
          setYearData(contributions);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    reset();
    loadData();
  }, [reset, cachedData]);

  // Show loader until data is ready
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ProgressLoader 
          onComplete={() => {
            console.log('Progress complete, showing content');
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

  if (!yearData.length) {
    console.log('No year data available');
    return null;
  }

  const selectedYear = yearData[selectedYearIndex];
  console.log('Rendering year:', selectedYear);

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
              Note: This visualization shows contributions to public repositories and includes commits, pull requests, and issues.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
