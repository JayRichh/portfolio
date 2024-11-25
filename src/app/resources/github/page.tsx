"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchGitHubContributions,
  useGitHubStore,
  useContributions,
  YearContributions,
} from "../../../lib/github";
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
        if (cachedData && mounted) {
          console.log("Using cached data");
          setYearData(cachedData);
          setLoading(false);
          setShowContent(true);
          return;
        }

        console.log("Fetching GitHub data...");
        const contributions = await fetchGitHubContributions();

        if (mounted && contributions.length > 0) {
          console.log("Setting new contributions data");
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

    if (!cachedData) {
      reset();
      loadData();
    } else {
      setYearData(cachedData);
      setLoading(false);
      setShowContent(true);
    }

    return () => {
      mounted = false;
    };
  }, [reset, cachedData]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center">
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

  if (!yearData.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-primary">
            No GitHub Data Available
          </h1>
          <p className="text-muted-foreground">
            Unable to load GitHub contribution data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const selectedYear = yearData[selectedYearIndex];
  const fromDate = `${selectedYear.year}-01-01`;
  const toDate = `${selectedYear.year}-12-31`;

  const lightColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const darkColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  const YearTabs = () => (
    <div className="mb-4 flex flex-wrap gap-2 md:hidden">
      {yearData.map((year, index) => (
        <button
          key={year.year}
          onClick={() => setSelectedYearIndex(index)}
          className={`rounded-md px-4 py-2 text-sm transition-colors ${
            selectedYearIndex === index
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          {year.year}
        </button>
      ))}
    </div>
  );

  const DesktopYearNavigation = () => (
    <div className="hidden md:flex gap-2">
      <button
        onClick={() => setSelectedYearIndex((prev) => Math.min(prev + 1, yearData.length - 1))}
        disabled={selectedYearIndex === yearData.length - 1}
        className={`rounded-md px-3 py-1 ${
          selectedYearIndex === yearData.length - 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="Previous year"
      >
        ←
      </button>
      <button
        onClick={() => setSelectedYearIndex((prev) => Math.max(prev - 1, 0))}
        disabled={selectedYearIndex === 0}
        className={`rounded-md px-3 py-1 ${
          selectedYearIndex === 0
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="Next year"
      >
        →
      </button>
    </div>
  );

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
            <h1 className="mb-4 text-4xl font-bold text-primary">
              GitHub Activity
            </h1>
            <p className="text-lg text-muted-foreground">
              A visualization of my GitHub contribution activity, showing commit
              frequency and development patterns.
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-xl font-semibold">
              {selectedYear.totalContributions.toLocaleString()} contributions
              in {selectedYear.year}
            </div>
            <DesktopYearNavigation />
          </div>

          <YearTabs />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-4 md:p-8"
          >
            <div className="h-[600px] md:h-[500px] w-full">
              <ResponsiveCalendarCanvas
                data={selectedYear.contributions}
                from={fromDate}
                to={toDate}
                emptyColor={isDark ? "#161b22" : "#ebedf0"}
                colors={isDark ? darkColors.slice(1) : lightColors.slice(1)}
                margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
                monthBorderColor={isDark ? "#30363d" : "#d0d7de"}
                dayBorderWidth={1}
                dayBorderColor={isDark ? "#1b1f23" : "#fff"}
                direction="vertical"
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: "right-to-left",
                    itemTextColor: isDark ? "#7d8590" : "#57606a",
                  },
                ]}
                theme={{
                  text: {
                    fontSize: 12,
                    fill: isDark ? "#7d8590" : "#57606a",
                  },
                  tooltip: {
                    container: {
                      background: isDark ? "#161b22" : "#ffffff",
                      color: isDark ? "#7d8590" : "#57606a",
                      fontSize: "12px",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          <div className="mt-8 text-sm text-muted-foreground">
            <i>
              Note: This visualization reflects daily contributions across
              distinct repositories, including public and private work through
              commits, pull requests, and issues.
            </i>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
