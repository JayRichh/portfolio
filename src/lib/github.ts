import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com/graphql";
const CACHE_TIME = 3600; // 1 hour in seconds

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface YearContributions {
  year: number;
  contributions: Array<{ day: string; value: number }>;
  totalContributions: number;
}

export interface LanguageStats {
  languages: Array<{
    name: string;
    percentage: number;
    color: string;
    size: number;
  }>;
  totalSize: number;
}

interface Repository {
  name: string;
  isPrivate: boolean;
  languages?: {
    edges?: Array<{
      size: number;
      node: {
        name: string;
        color: string;
      };
    }>;
    totalSize?: number;
  };
}

interface GitHubState {
  progress: number;
  error: string | null;
  isLoading: boolean;
  loadingYears: Set<number>;
  yearData: YearContributions[];
  languageData: LanguageStats | null;
  lastFetched: number | null;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingYear: (year: number, loading: boolean) => void;
  setYearData: (data: YearContributions[]) => void;
  setLanguageData: (data: LanguageStats | null) => void;
  reset: () => void;
}

export const useGitHubStore = create<GitHubState>()(
  persist(
    (set) => ({
      progress: 0,
      error: null,
      isLoading: false,
      loadingYears: new Set(),
      yearData: [],
      languageData: null,
      lastFetched: null,
      setProgress: (progress) => set((state) => ({
        progress: Math.max(state.progress, progress) // Ensure progress never goes backwards
      })),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      setLoadingYear: (year, loading) =>
        set((state) => {
          const newLoadingYears = new Set(state.loadingYears);
          if (loading) {
            newLoadingYears.add(year);
          } else {
            newLoadingYears.delete(year);
          }
          return { loadingYears: newLoadingYears };
        }),
      setYearData: (yearData) => set({ yearData }),
      setLanguageData: (languageData) => set({ languageData }),
      reset: () =>
        set({
          progress: 0,
          error: null,
          isLoading: false,
          loadingYears: new Set(),
        }),
    }),
    {
      name: "github-storage",
      partialize: (state) => ({
        yearData: state.yearData,
        languageData: state.languageData,
        lastFetched: state.lastFetched,
      }),
    },
  ),
);

export const useContributions = () => {
  const yearData = useGitHubStore((state) => state.yearData);
  const lastFetched = useGitHubStore((state) => state.lastFetched);

  if (!lastFetched || Date.now() - lastFetched > CACHE_TIME * 1000) {
    return null;
  }

  return yearData.length > 0 ? yearData : null;
};

async function fetchYearContributions(
  year: number,
): Promise<YearContributions | null> {
  const query = `
    query ContributionsQuery($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          commitContributionsByRepository {
            contributions {
              totalCount
            }
          }
        }
      }
    }
  `;

  const variables = {
    username: "jayrichh",
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };

  const response = await axios.post(
    GITHUB_API,
    { query, variables },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  const contributionsCollection =
    response.data.data.user.contributionsCollection;
  const calendar = contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  const weeks: ContributionWeek[] = calendar.weeks;

  // Create a map of all days in the year with zero contributions
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);
  const allDays = new Map();

  for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    allDays.set(dateStr, { day: dateStr, value: 0 });
  }

  // Update the map with actual contributions
  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const value = day.contributionCount;
      allDays.set(day.date, { day: day.date, value });
    });
  });

  // Convert the map to an array and calculate quartiles for non-zero values
  const contributions = Array.from(allDays.values());
  const nonZeroValues = contributions.map((c) => c.value).filter((v) => v > 0);
  nonZeroValues.sort((a, b) => a - b);

  const getQuartile = (arr: number[], quartile: number) => {
    const pos = (arr.length - 1) * quartile;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (arr[base + 1] !== undefined) {
      return arr[base] + rest * (arr[base + 1] - arr[base]);
    } else {
      return arr[base];
    }
  };

  const q1 = getQuartile(nonZeroValues, 0.25);
  const q2 = getQuartile(nonZeroValues, 0.5);
  const q3 = getQuartile(nonZeroValues, 0.75);
  const max = Math.max(...nonZeroValues);

  // Scale the contributions using quartile-based thresholds
  const scaledContributions = contributions.map((contribution) => ({
    day: contribution.day,
    value:
      contribution.value === 0
        ? 0
        : contribution.value <= q1
          ? 1
          : contribution.value <= q2
            ? 2
            : contribution.value <= q3
              ? 3
              : 4,
  }));

  return {
    year,
    contributions: scaledContributions,
    totalContributions: calendar.totalContributions,
  };
}

async function fetchAllRepositories(): Promise<Repository[]> {
  const query = `
    query RepositoriesQuery($username: String!, $cursor: String) {
      user(login: $username) {
        repositories(
          first: 100,
          after: $cursor,
          ownerAffiliations: OWNER,
          isFork: false,
          orderBy: {field: UPDATED_AT, direction: DESC}
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            isPrivate
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
              totalSize
            }
          }
        }
      }
    }
  `;

  const repositories: Repository[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  try {
    while (hasNextPage) {
      const variables = {
        username: "jayrichh",
        cursor,
      };

      const response = await axios.post(
        GITHUB_API,
        { query, variables },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      const { nodes, pageInfo } = response.data.data.user.repositories;
      repositories.push(...nodes);

      hasNextPage = pageInfo.hasNextPage;
      cursor = pageInfo.endCursor;
    }

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

async function fetchLanguageStats(): Promise<LanguageStats> {
  const repos = await fetchAllRepositories();
  const languageMap = new Map<string, { size: number; color: string }>();
  let totalSize = 0;

  // Process repositories in chunks to avoid memory issues with large datasets
  const chunkSize = 50;
  for (let i = 0; i < repos.length; i += chunkSize) {
    const chunk = repos.slice(i, i + chunkSize);

    chunk.forEach((repo) => {
      if (!repo.languages?.edges) return;

      repo.languages.edges.forEach((edge) => {
        const { name, color } = edge.node;
        const size = edge.size;

        const current = languageMap.get(name) || { size: 0, color };
        languageMap.set(name, {
          size: current.size + size,
          color,
        });
        totalSize += size;
      });
    });
  }

  const languages = Array.from(languageMap.entries())
    .map(([name, { size, color }]) => ({
      name,
      size,
      color: color || "#666",
      percentage: Math.round((size / totalSize) * 100 * 10) / 10,
    }))
    .filter((lang) => lang.percentage >= 0.1)
    .sort((a, b) => b.size - a.size)
    .slice(0, 8);

  return {
    languages,
    totalSize,
  };
}

export async function fetchGitHubContributions(): Promise<YearContributions[]> {
  const store = useGitHubStore.getState();
  const { setProgress, setError, setYearData, setLoading } = store;

  if (!GITHUB_TOKEN) {
    setError("GitHub token not found");
    return [];
  }

  try {
    setLoading(true);
    store.reset(); // Reset progress to 0

    // Phase 1: Initialize (0-10%)
    setProgress(10);

    // Phase 2: Fetch contributions (10-40%)
    const currentYear = new Date().getFullYear();
    const yearsToFetch = [currentYear, currentYear - 1];
    
    const yearResults = await Promise.all(
      yearsToFetch.map(async (year) => {
        const result = await fetchYearContributions(year);
        setProgress(25); // Increment progress after each year
        return result;
      })
    );
    
    setProgress(40);

    // Phase 3: Process contributions (40-60%)
    const allContributions = yearResults.filter(
      (result): result is YearContributions => result !== null,
    );
    
    const sortedContributions = allContributions.sort(
      (a, b) => b.year - a.year,
    );
    setProgress(60);

    // Phase 4: Fetch and process language data (60-90%)
    const languageStats = await fetchLanguageStats();
    setProgress(90);

    // Phase 5: Finalize (90-100%)
    setYearData(sortedContributions);
    setProgress(100);

    return sortedContributions;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error fetching GitHub data";
    setError(message);
    return [];
  } finally {
    setLoading(false);
  }
}

export async function fetchPreviousYear(
  year: number,
): Promise<YearContributions | null> {
  const store = useGitHubStore.getState();
  const { setError, setLoadingYear, yearData, setYearData } = store;

  if (!GITHUB_TOKEN) {
    setError("GitHub token not found");
    return null;
  }

  try {
    setLoadingYear(year, true);
    const yearContributions = await fetchYearContributions(year);

    if (yearContributions) {
      const updatedYearData = [...yearData, yearContributions].sort(
        (a, b) => b.year - a.year,
      );
      setYearData(updatedYearData);
    }

    return yearContributions;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error fetching GitHub data";
    setError(message);
    return null;
  } finally {
    setLoadingYear(year, false);
  }
}

export async function fetchGitHubLanguages(): Promise<LanguageStats | null> {
  const store = useGitHubStore.getState();
  const { setProgress, setError, setLanguageData, setLoading } = store;

  if (!GITHUB_TOKEN) {
    setError("GitHub token not found");
    return null;
  }

  try {
    setLoading(true);
    store.reset(); // Reset progress to 0

    // Phase 1: Initialize (0-20%)
    setProgress(20);

    // Phase 2: Fetch repositories (20-50%)
    const repos = await fetchAllRepositories();
    setProgress(50);

    // Phase 3: Process language data (50-80%)
    const stats = await fetchLanguageStats();
    setProgress(80);

    // Phase 4: Finalize (80-100%)
    setLanguageData(stats);
    setProgress(100);
    
    return stats;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Error fetching GitHub language data";
    setError(message);
    return null;
  } finally {
    setLoading(false);
  }
}
