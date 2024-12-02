"use client";

import React from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGitHubStore,
} from "../../../lib/github";
import { ProgressLoader } from "../../../components/ui/progress-loader";

export function GitHubPreview() {
  const { yearData: storeYearData, isLoading, error } = useGitHubStore();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isLoading || (!storeYearData.length && !error)) {
    return (
      <div className="flex h-full items-center justify-center">
        <ProgressLoader
          isDataReady={storeYearData.length > 0}
          className="scale-75"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-center">
          <p className="text-sm text-muted-foreground">Unable to load GitHub data</p>
        </div>
      </div>
    );
  }

  if (!storeYearData.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-4 text-center">
          <p className="text-sm text-muted-foreground">No contribution data available</p>
        </div>
      </div>
    );
  }

  const currentYear = storeYearData[0];
  const fromDate = `${currentYear.year}-01-01`;
  const toDate = `${currentYear.year}-12-31`;

  const contributionData = currentYear.contributions.filter((c) => c.value > 0);

  const lightColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const darkColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="github-preview"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        <div className="text-center text-sm text-muted-foreground mb-2">
          {currentYear.totalContributions.toLocaleString()} contributions in{" "}
          {currentYear.year}
        </div>
        <ResponsiveCalendarCanvas
          data={contributionData}
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
      </motion.div>
    </AnimatePresence>
  );
}
