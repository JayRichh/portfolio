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

export function GitHubPreview() {
  const { yearData: storeYearData, setYearData } = useGitHubStore();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const cachedData = useContributions();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        if (cachedData && mounted) {
          setYearData(cachedData);
          setLoading(false);
          setShowContent(true);
          return;
        }

        const contributions = await fetchGitHubContributions();
        if (mounted && contributions.length > 0) {
          setYearData(contributions);
          setLoading(false);
          setShowContent(true);
        }
      } catch (error) {
        console.error("Preview: Error fetching GitHub data:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (!storeYearData.length) {
      loadData();
    } else {
      setLoading(false);
      setShowContent(true);
    }

    return () => {
      mounted = false;
    };
  }, [cachedData, setYearData, storeYearData]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ProgressLoader
          onComplete={() => {
            if (storeYearData.length > 0) {
              setShowContent(true);
            }
          }}
          isDataReady={storeYearData.length > 0}
          className="scale-75"
        />
      </div>
    );
  }

  if (!storeYearData.length) {
    return null;
  }

  const currentYear = storeYearData[0];
  const fromDate = `${currentYear.year}-01-01`;
  const toDate = `${currentYear.year}-12-31`;

  const contributionData = currentYear.contributions.filter((c) => c.value > 0);

  const lightColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const darkColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

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
      )}
    </AnimatePresence>
  );
}
