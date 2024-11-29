import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com/graphql";

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

interface GitHubState {
  progress: number;
  contributionsCache: YearContributions[] | null;
  lastFetched: number | null;
  setProgress: (progress: number) => void;
  setContributions: (data: YearContributions[]) => void;
  reset: () => void;
}

const CACHE_DURATION = 60 * 60 * 1000;

export const useGitHubStore = create<GitHubState>()(
  persist(
    (set) => ({
      progress: 0,
      contributionsCache: null,
      lastFetched: null,
      setProgress: (progress) => set({ progress }),
      setContributions: (data) =>
        set({
          contributionsCache: data,
          lastFetched: Date.now(),
        }),
      reset: () => set({ progress: 0 }),
    }),
    {
      name: "github-storage",
    },
  ),
);

export const useProgress = () => useGitHubStore((state) => state.progress);
export const useContributions = () => {
  const { contributionsCache, lastFetched } = useGitHubStore();
  if (
    !contributionsCache ||
    !lastFetched ||
    Date.now() - lastFetched > CACHE_DURATION
  ) {
    return null;
  }
  return contributionsCache;
};

async function fetchYearContributions(year: number): Promise<YearContributions | null> {
  const query = `
    query {
      user(login: "jayrichh") {
        contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await axios.post(
    GITHUB_API,
    { query },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  const calendar = response.data.data.user.contributionsCollection.contributionCalendar;
  if (!calendar) return null;

  const weeks: ContributionWeek[] = calendar.weeks;
  const contributions = weeks.flatMap((week) =>
    week.contributionDays
      .filter((day) => day.contributionCount > 0)
      .map((day) => ({
        day: day.date,
        value: day.contributionCount,
      })),
  );

  const values = contributions.map((c) => c.value);
  const max = Math.max(...values, 1);
  const quartiles = [
    Math.ceil(max * 0.25),
    Math.ceil(max * 0.5),
    Math.ceil(max * 0.75),
    max,
  ];

  const scaledContributions = contributions.map((contribution) => ({
    day: contribution.day,
    value:
      contribution.value === 0
        ? 0
        : contribution.value <= quartiles[0]
          ? 1
          : contribution.value <= quartiles[1]
            ? 2
            : contribution.value <= quartiles[2]
              ? 3
              : 4,
  }));

  return {
    year,
    contributions: scaledContributions,
    totalContributions: calendar.totalContributions,
  };
}

export async function fetchGitHubContributions(): Promise<YearContributions[]> {
  const { setProgress, setContributions, contributionsCache, lastFetched } =
    useGitHubStore.getState();

  if (
    contributionsCache &&
    lastFetched &&
    Date.now() - lastFetched < CACHE_DURATION
  ) {
    setProgress(100);
    return contributionsCache;
  }

  if (!GITHUB_TOKEN) {
    console.error("GitHub token not found");
    return [];
  }

  try {
    setProgress(10);

    const currentYear = new Date().getFullYear();
    const yearsToFetch = [currentYear, currentYear - 1];
    const progressPerYear = 80 / yearsToFetch.length;

    const allContributions: YearContributions[] = [];
    
    for (const [index, year] of yearsToFetch.entries()) {
      const yearData = await fetchYearContributions(year);
      if (yearData) {
        allContributions.push(yearData);
      }
      setProgress(20 + (index + 1) * progressPerYear);
    }

    const sortedContributions = allContributions.sort((a, b) => b.year - a.year);
    
    setProgress(100);
    setContributions(sortedContributions);
    return sortedContributions;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
}
