"use client";

import React from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGitHubStore,
} from "../../../lib/github";
import { ProgressLoader } from "../../../components/ui/progress-loader";

// GitHub's exact color schemes
const COLORS = {
  light: {
    empty: "#ebedf0",
    scale: ["#9be9a8", "#40c463", "#30a14e", "#216e39"],
    border: "#d0d7de",
    text: "#57606a",
    background: "#ffffff",
  },
  dark: {
    empty: "#161b22",
    scale: ["#0e4429", "#006d32", "#26a641", "#39d353"],
    border: "#30363d",
    text: "#7d8590",
    background: "#161b22",
  },
};

const Calendar: React.FC<{
  direction: "vertical" | "horizontal";
  data: any[];
  fromDate: string;
  toDate: string;
  isDark: boolean;
}> = ({ direction, data, fromDate, toDate, isDark }) => {
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <ResponsiveCalendarCanvas
      data={data}
      from={fromDate}
      to={toDate}
      emptyColor={colors.empty}
      colors={colors.scale}
      margin={
        direction === "vertical"
          ? { top: 40, right: 20, bottom: 40, left: 20 }
          : { top: 40, right: 40, bottom: 40, left: 40 }
      }
      monthBorderColor={colors.border}
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
          itemTextColor: colors.text,
        },
      ]}
      theme={{
        text: {
          fontSize: 12,
          fill: colors.text,
        },
        tooltip: {
          container: {
            background: colors.background,
            color: colors.text,
            fontSize: "12px",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        },
      }}
    />
  );
};

export default function GitHubPage() {
  const { yearData, isLoading, error } = useGitHubStore();
  const [selectedYearIndex, setSelectedYearIndex] = React.useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center">
        <ProgressLoader isDataReady={yearData.length > 0} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-destructive">
            Error Loading GitHub Data
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!yearData.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-primary">
            No GitHub Data Available
          </h1>
          <p className="text-muted-foreground">
            Unable to load GitHub data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const selectedYear = yearData[selectedYearIndex];
  const fromDate = `${selectedYear.year}-01-01`;
  const toDate = `${selectedYear.year}-12-31`;

  return (
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

      <div className="mb-6 text-xl font-semibold text-center">
        {selectedYear.totalContributions.toLocaleString()} contributions in{" "}
        {selectedYear.year}
      </div>

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
          <Calendar
            direction="vertical"
            data={selectedYear.contributions}
            fromDate={fromDate}
            toDate={toDate}
            isDark={isDark}
          />
        </div>

        {/* Desktop View - Horizontal Calendar */}
        <div className="hidden md:block h-[300px]">
          <Calendar
            direction="horizontal"
            data={selectedYear.contributions}
            fromDate={fromDate}
            toDate={toDate}
            isDark={isDark}
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
  );
}
