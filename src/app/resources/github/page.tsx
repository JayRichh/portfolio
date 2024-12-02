"use client";

import React, { useEffect } from "react";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchGitHubContributions,
  fetchGitHubLanguages,
  fetchPreviousYear,
  useGitHubStore,
} from "../../../lib/github";
import { ProgressLoader } from "../../../components/ui/progress-loader";

export default function GitHubPage() {
  const {
    yearData,
    languageData,
    isLoading,
    loadingYears,
    error,
    setYearData,
    setLanguageData,
    reset,
  } = useGitHubStore();
  const [selectedYearIndex, setSelectedYearIndex] = React.useState(0);
  const [showContent, setShowContent] = React.useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Fetch year data
  useEffect(() => {
    let mounted = true;

    const loadYearData = async () => {
      try {
        const contributions = await fetchGitHubContributions();
        if (mounted && contributions.length > 0) {
          setYearData(contributions);
          setShowContent(true);
        }
      } catch (error) {
        console.error("Error fetching GitHub year data:", error);
      }
    };

    loadYearData();

    return () => {
      mounted = false;
    };
  }, [setYearData]);

  // Fetch language data only once on mount
  useEffect(() => {
    let mounted = true;

    const loadLanguageData = async () => {
      try {
        const languages = await fetchGitHubLanguages();
        if (mounted && languages) {
          setLanguageData(languages);
          setShowContent(true);
        }
      } catch (error) {
        console.error("Error fetching GitHub language data:", error);
      }
    };

    loadLanguageData();

    return () => {
      mounted = false;
    };
  }, [setLanguageData]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center">
        <ProgressLoader
          onComplete={() => {
            if (yearData.length > 0 || languageData) {
              setShowContent(true);
            }
          }}
          isDataReady={yearData.length > 0 || languageData !== null}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-destructive">Error Loading GitHub Data</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!yearData.length && !languageData) {
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
  const fromDate = selectedYear ? `${selectedYear.year}-01-01` : "";
  const toDate = selectedYear ? `${selectedYear.year}-12-31` : "";

  const lightColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const darkColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  const YearNavigation = () => {
    if (!selectedYear) return null;

    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i);
    const currentYearIndex = availableYears.indexOf(selectedYear.year);
    
    const handlePreviousYear = async () => {
      const prevYear = availableYears[currentYearIndex + 1];
      const yearIndex = yearData.findIndex(y => y.year === prevYear);
      
      if (yearIndex !== -1) {
        setSelectedYearIndex(yearIndex);
      } else {
        const newYearData = await fetchPreviousYear(prevYear);
        if (newYearData) {
          const newIndex = yearData.length;
          setSelectedYearIndex(newIndex);
        }
      }
    };
    
    return (
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePreviousYear}
          disabled={currentYearIndex === availableYears.length - 1 || loadingYears.has(availableYears[currentYearIndex + 1])}
          className={`flex min-w-[120px] items-center justify-center rounded-md px-4 py-2 transition-colors ${
            currentYearIndex === availableYears.length - 1
              ? "cursor-not-allowed opacity-50"
              : "bg-muted hover:bg-muted/80"
          }`}
          aria-label="Previous year"
        >
          {loadingYears.has(availableYears[currentYearIndex + 1]) ? (
            <ProgressLoader compact />
          ) : (
            "Previous Year"
          )}
        </button>
        <span className="text-lg font-semibold">{selectedYear.year}</span>
        <button
          onClick={() => {
            if (currentYearIndex > 0) {
              const nextYear = availableYears[currentYearIndex - 1];
              const yearIndex = yearData.findIndex(y => y.year === nextYear);
              if (yearIndex !== -1) {
                setSelectedYearIndex(yearIndex);
              }
            }
          }}
          disabled={currentYearIndex === 0}
          className={`flex min-w-[120px] items-center justify-center rounded-md px-4 py-2 transition-colors ${
            currentYearIndex === 0
              ? "cursor-not-allowed opacity-50"
              : "bg-muted hover:bg-muted/80"
          }`}
          aria-label="Next year"
        >
          Next Year
        </button>
      </div>
    );
  };

  const Calendar = ({
    direction,
  }: {
    direction: "vertical" | "horizontal";
  }) => {
    if (!selectedYear) return null;

    const contributionData = selectedYear.contributions.filter(c => c.value > 0);

    return (
      <ResponsiveCalendarCanvas
        data={contributionData}
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
  };

  const LanguageDistribution = () => {
    if (!languageData?.languages?.length) return null;

    const pieLanguages = languageData.languages.map(({ name, percentage, color }) => ({
      id: name,
      label: name,
      value: percentage,
      color: color || "#666",
    }));

    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Language Distribution</h2>
        <div className="rounded-xl border border-border/50 bg-background/30 backdrop-blur-sm p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[600px] relative order-2 lg:order-1">
              <ResponsivePie
                data={pieLanguages}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={{ datum: 'data.color' }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={isDark ? "#7d8590" : "#57606a"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#ffffff"
                motionConfig="gentle"
                transitionMode="pushIn"
                theme={{
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
            <div className="flex flex-col order-1 lg:order-2">
              <h3 className="text-xl font-semibold mb-4">Code Composition Analysis</h3>
              <div className="relative flex-1 min-h-0">
                <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    {languageData.languages.map((lang) => (
                      <div 
                        key={lang.name} 
                        className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium" style={{ color: lang.color }}>
                            {lang.name}
                          </span>
                          <span className="text-sm font-medium text-muted-foreground">
                            {lang.percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color,
                            }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {Math.round(lang.size / 1024)}KB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-sm text-muted-foreground border-t border-border/50 pt-4">
                <p>Total codebase size: {Math.round(languageData.totalSize / 1024)}KB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              A visualization of my repository activity, showing contribution patterns and language distribution across all repositories.
            </p>
          </div>

          {selectedYear && (
            <div className="mb-6 text-xl font-semibold text-center">
              {selectedYear.totalContributions.toLocaleString()} contributions in{" "}
              {selectedYear.year}
            </div>
          )}

          <YearNavigation />

          {selectedYear && (
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
          )}

          <LanguageDistribution />

          <div className="mt-12 text-sm text-muted-foreground border-t border-border/50 pt-4 w-full">
            <p className="text-center w-full mx-auto">
              Data sourced from GitHub's GraphQL API. Contribution data includes commits, issues, pull requests, and code reviews to distinct repositories. Language statistics are calculated from all public and private repositories.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
