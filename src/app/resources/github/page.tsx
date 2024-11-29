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

  const YearNavigation = () => (
    <div className="flex items-center justify-center gap-4 mb-6">
      <button
        onClick={() => setSelectedYearIndex((prev) => Math.max(prev - 1, 0))}
        disabled={selectedYearIndex === 0}
        className={`rounded-md px-4 py-2 transition-colors ${
          selectedYearIndex === 0
            ? "cursor-not-allowed opacity-50"
            : "bg-muted hover:bg-muted/80"
        }`}
        aria-label="Previous year"
      >
        Previous Year
      </button>
      <span className="text-lg font-semibold">{selectedYear.year}</span>
      <button
        onClick={() =>
          setSelectedYearIndex((prev) =>
            Math.min(prev + 1, yearData.length - 1),
          )
        }
        disabled={selectedYearIndex === yearData.length - 1}
        className={`rounded-md px-4 py-2 transition-colors ${
          selectedYearIndex === yearData.length - 1
            ? "cursor-not-allowed opacity-50"
            : "bg-muted hover:bg-muted/80"
        }`}
        aria-label="Next year"
      >
        Next Year
      </button>
    </div>
  );

  const Calendar = ({
    direction,
  }: {
    direction: "vertical" | "horizontal";
  }) => (
    <ResponsiveCalendarCanvas
      data={selectedYear.contributions}
      from={fromDate}
      to={toDate}
      emptyColor={isDark ? "#161b22" : "#ebedf0"}
      colors={isDark ? darkColors.slice(1) : lightColors.slice(1)}
      margin={
        direction === "vertical"
          ? { top: 40, right: 20, bottom: 40, left: 20 }
          : { top: 40, right: 40, bottom: 40, left: 40 }
      }
      monthBorderColor={isDark ? "#30363d" : "#d0d7de"}
      dayBorderWidth={1}
      dayBorderColor={isDark ? "#1b1f23" : "#fff"}
      direction={direction}
      legends={[
        {
          anchor: direction === "vertical" ? "bottom" : "bottom-right",
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
              A visualization of my repository activity, showing the frequency of contributions across different projects and development patterns over time.
            </p>
          </div>

          <div className="mb-6 text-xl font-semibold text-center">
            {selectedYear.totalContributions.toLocaleString()} contributions in{" "}
            {selectedYear.year}
          </div>

          <YearNavigation />

          <motion.div
            key={selectedYear.year}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-4 md:p-8"
          >
            {/* Mobile View - Vertical Calendar */}
            <div className="h-[600px] md:hidden">
              <Calendar direction="vertical" />
            </div>

            {/* Desktop View - Horizontal Calendar */}
            <div className="hidden md:block h-[300px]">
              <Calendar direction="horizontal" />
            </div>
          </motion.div>

          <div className="mt-8 text-sm text-muted-foreground">
            <i>
              Note: This visualization reflects daily activity across distinct repositories, including public and private work through commits, pull requests, and issues.
            </i>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
