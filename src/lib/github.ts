import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com/graphql";
const CACHE_TIME = 3600; // 1 hour in seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Languages to exclude from stats
const EXCLUDED_LANGUAGES = new Set(["Roff"]);

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
    lineCount: number;
    fileCount: number;
  }>;
  totalSize: number;
  totalFiles: number;
  totalLines: number;
}

interface Repository {
  name: string;
  isPrivate: boolean;
  isFork: boolean;
  owner: {
    login: string;
  };
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
  updateLastFetched: () => void;
  reset: () => void;
}

const rateLimiter = {
  lastCall: 0,
  minInterval: 100,
  async waitForNext() {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    if (timeSinceLastCall < this.minInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minInterval - timeSinceLastCall));
    }
    this.lastCall = Date.now();
  }
};

async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    await rateLimiter.waitForNext();
    return await fn();
  } catch (error) {
    if (retries > 0 && error instanceof AxiosError && error.response?.status === 429) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
      return withRetry(fn, retries - 1);
    }
    throw error;
  }
}

function validateGitHubToken(): void {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token not found");
  }
}

// Estimate lines of code based on file size and language
function estimateLineCount(size: number, language: string): number {
  // Average bytes per line for different language categories
  const bytesPerLine: { [key: string]: number } = {
    // Markup/Style languages (more verbose)
    HTML: 40,
    CSS: 30,
    SCSS: 30,
    // Scripting languages (medium verbosity)
    JavaScript: 35,
    TypeScript: 35,
    Python: 25,
    // Compiled languages (more concise)
    Go: 20,
    Rust: 25,
    C: 20,
    "C++": 25,
    // Default for other languages
    default: 30,
  };

  const bpl = bytesPerLine[language] || bytesPerLine.default;
  return Math.round(size / bpl);
}

// Estimate file count based on total size and average file size for the language
function estimateFileCount(size: number, language: string): number {
  // Average bytes per file for different language categories
  const bytesPerFile: { [key: string]: number } = {
    // Markup/Style languages
    HTML: 8000,
    CSS: 5000,
    SCSS: 5000,
    // Scripting languages
    JavaScript: 10000,
    TypeScript: 12000,
    Python: 8000,
    // Compiled languages
    Go: 15000,
    Rust: 12000,
    C: 10000,
    "C++": 12000,
    // Default for other languages
    default: 10000,
  };

  const bpf = bytesPerFile[language] || bytesPerFile.default;
  return Math.max(1, Math.round(size / bpf));
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
      setProgress: (progress) =>
        set((state) => ({
          progress: Math.max(state.progress, progress),
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
      updateLastFetched: () => set({ lastFetched: Date.now() }),
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

  const response = await withRetry(() => 
    axios.post(
      GITHUB_API,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    )
  );

  const contributionsCollection =
    response.data.data.user.contributionsCollection;
  const calendar = contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  const weeks: ContributionWeek[] = calendar.weeks;
  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);
  const allDays = new Map();

  for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    allDays.set(dateStr, { day: dateStr, value: 0 });
  }

  weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const value = day.contributionCount;
      allDays.set(day.date, { day: day.date, value });
    });
  });

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
          ownerAffiliations: [OWNER, COLLABORATOR],
          orderBy: {field: PUSHED_AT, direction: DESC}
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            isPrivate
            isFork
            owner {
              login
            }
            languages(first: 20, orderBy: {field: SIZE, direction: DESC}) {
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

      const response = await withRetry(() =>
        axios.post(
          GITHUB_API,
          { query, variables },
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              "Content-Type": "application/json",
            },
            timeout: 30000,
          },
        )
      );

      const { nodes, pageInfo } = (response as any).data.data.user.repositories;
      
      // Filter repositories to include only those you own or have significant contributions to
      const filteredNodes = nodes.filter((repo: Repository) => {
        return repo.owner.login === "jayrichh" || !repo.isFork;
      });
      
      repositories.push(...filteredNodes);

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
  const languageMap = new Map<
    string,
    { size: number; color: string; lineCount: number; fileCount: number }
  >();
  let totalSize = 0;
  let totalFiles = 0;
  let totalLines = 0;

  const chunkSize = 50;
  for (let i = 0; i < repos.length; i += chunkSize) {
    const chunk = repos.slice(i, i + chunkSize);

    chunk.forEach((repo) => {
      if (!repo.languages?.edges) return;

      repo.languages.edges.forEach((edge) => {
        const { name, color } = edge.node;
        if (EXCLUDED_LANGUAGES.has(name)) return;
        
        const size = edge.size;
        const lineCount = estimateLineCount(size, name);
        const fileCount = estimateFileCount(size, name);

        const current = languageMap.get(name) || { 
          size: 0, 
          color, 
          lineCount: 0,
          fileCount: 0
        };
        
        languageMap.set(name, {
          size: current.size + size,
          color,
          lineCount: current.lineCount + lineCount,
          fileCount: current.fileCount + fileCount
        });
        
        totalSize += size;
        totalFiles += fileCount;
        totalLines += lineCount;
      });
    });
  }

  const languages = Array.from(languageMap.entries())
    .map(([name, { size, color, lineCount, fileCount }]) => ({
      name,
      size,
      color: color || "#666",
      percentage: Math.round((size / totalSize) * 100 * 10) / 10,
      lineCount,
      fileCount
    }))
    .sort((a, b) => b.size - a.size);

  return {
    languages,
    totalSize,
    totalFiles,
    totalLines
  };
}

export async function fetchGitHubContributions(): Promise<YearContributions[]> {
  const store = useGitHubStore.getState();
  const { setProgress, setError, setYearData, setLoading, updateLastFetched } = store;

  try {
    validateGitHubToken();
    setLoading(true);
    store.reset();

    setProgress(10);

    const currentYear = new Date().getFullYear();
    const yearsToFetch = [currentYear, currentYear - 1];

    const yearResults = await Promise.all(
      yearsToFetch.map(async (year) => {
        const result = await fetchYearContributions(year);
        setProgress(25);
        return result;
      }),
    );

    setProgress(40);

    const allContributions = yearResults.filter(
      (result): result is YearContributions => result !== null,
    );

    const sortedContributions = allContributions.sort(
      (a, b) => b.year - a.year,
    );
    setProgress(60);

    const languageStats = await fetchLanguageStats();
    setProgress(90);

    setYearData(sortedContributions);
    updateLastFetched();
    setProgress(100);

    return sortedContributions;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error fetching GitHub data";
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
  const { setError, setLoadingYear, yearData, setYearData, updateLastFetched } = store;

  try {
    validateGitHubToken();
    setLoadingYear(year, true);
    const yearContributions = await fetchYearContributions(year);

    if (yearContributions) {
      const updatedYearData = [...yearData, yearContributions].sort(
        (a, b) => b.year - a.year,
      );
      setYearData(updatedYearData);
      updateLastFetched();
    }

    return yearContributions;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error fetching GitHub data";
    setError(message);
    return null;
  } finally {
    setLoadingYear(year, false);
  }
}

export async function fetchGitHubLanguages(): Promise<LanguageStats | null> {
  const store = useGitHubStore.getState();
  const { setProgress, setError, setLanguageData, setLoading, updateLastFetched } = store;

  try {
    validateGitHubToken();
    setLoading(true);
    store.reset();

    setProgress(20);

    const repos = await fetchAllRepositories();
    setProgress(50);

    const stats = await fetchLanguageStats();
    setProgress(80);

    setLanguageData(stats);
    updateLastFetched();
    setProgress(100);

    return stats;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error fetching GitHub language data";
    setError(message);
    return null;
  } finally {
    setLoading(false);
  }
}
