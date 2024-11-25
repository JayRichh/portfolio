"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGitHubContributions, useGitHubStore, useContributions, YearContributions } from "../../../lib/github";
import { ProgressLoader } from "../../../components/ui/progress-loader";

export function GitHubPreview() {
  const [yearData, setYearData] = useState<YearContributions[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const reset = useGitHubStore((state) => state.reset);
  const cachedData = useContributions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Preview: Fetching GitHub data...');
        if (cachedData) {
          console.log('Preview: Using cached data');
          setYearData(cachedData);
          setLoading(false);
          setShowContent(true);
          return;
        }

        const contributions = await fetchGitHubContributions();
        console.log('Preview: Received contributions:', contributions);
        if (contributions.length > 0) {
          setYearData(contributions);
        }
      } catch (error) {
        console.error("Preview: Error fetching GitHub data:", error);
      }
    };

    reset();
    loadData();
  }, [reset, cachedData]);

  // Show loader until data is ready
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ProgressLoader 
          onComplete={() => {
            console.log('Preview: Progress complete, showing content');
            if (yearData.length > 0) {
              setLoading(false);
              setShowContent(true);
            }
          }}
          isDataReady={yearData.length > 0}
          className="scale-75"
        />
      </div>
    );
  }

  if (!yearData.length) {
    console.log('Preview: No year data available');
    return null;
  }

  // Use most recent year's data for preview
  const mostRecentYear = yearData[0];
  console.log('Preview: Rendering year:', mostRecentYear);

  const currentDate = new Date();
  const fromDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 5,
    1
  ).toISOString().split("T")[0];
  const toDate = currentDate.toISOString().split("T")[0];

  // GitHub's exact color schemes
  const lightColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
  const darkColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <ResponsiveCalendarCanvas
            data={mostRecentYear.contributions}
            from={fromDate}
            to={toDate}
            emptyColor={isDark ? "#161b22" : "#ebedf0"}
            colors={isDark ? darkColors.slice(1) : lightColors.slice(1)}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            monthBorderColor={isDark ? "#30363d" : "#d0d7de"}
            dayBorderWidth={1}
            dayBorderColor={isDark ? "#1b1f23" : "#fff"}
            theme={{
              text: {
                fontSize: 10,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
