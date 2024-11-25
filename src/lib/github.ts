import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_API = 'https://api.github.com/graphql';

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

// Cache expires after 1 hour
const CACHE_DURATION = 60 * 60 * 1000;

export const useGitHubStore = create<GitHubState>()(
  persist(
    (set) => ({
      progress: 0,
      contributionsCache: null,
      lastFetched: null,
      setProgress: (progress) => set({ progress }),
      setContributions: (data) => set({ 
        contributionsCache: data,
        lastFetched: Date.now()
      }),
      reset: () => set({ progress: 0 }),
    }),
    {
      name: 'github-storage',
    }
  )
);

export const useProgress = () => useGitHubStore((state) => state.progress);
export const useContributions = () => {
  const { contributionsCache, lastFetched } = useGitHubStore();
  if (!contributionsCache || !lastFetched || Date.now() - lastFetched > CACHE_DURATION) {
    return null;
  }
  return contributionsCache;
};

export async function fetchGitHubContributions(): Promise<YearContributions[]> {
  const { setProgress, setContributions, contributionsCache, lastFetched } = useGitHubStore.getState();

  // Check cache first
  if (contributionsCache && lastFetched && Date.now() - lastFetched < CACHE_DURATION) {
    console.log('Using cached GitHub data');
    setProgress(100);
    return contributionsCache;
  }

  setProgress(0);

  if (!GITHUB_TOKEN) {
    console.error('GitHub token not found');
    return [];
  }

  try {
    setProgress(10); // Start progress

    // First, get all contribution years
    const yearsQuery = `
      query {
        user(login: "jayrichh") {
          contributionsCollection {
            contributionYears
          }
        }
      }
    `;

    const yearsResponse = await axios.post(
      GITHUB_API,
      { query: yearsQuery },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const years = yearsResponse.data.data.user.contributionsCollection.contributionYears;
    console.log('Found contribution years:', years);

    setProgress(20); // Years fetched

    const allContributions: YearContributions[] = [];
    const progressPerYear = 70 / years.length; // Reserve 70% for processing years

    // Fetch each year's contributions
    for (const [index, year] of years.entries()) {
      const yearQuery = `
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

      const yearResponse = await axios.post(
        GITHUB_API,
        { query: yearQuery },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const calendar = yearResponse.data.data.user.contributionsCollection.contributionCalendar;
      const weeks: ContributionWeek[] = calendar.weeks;
      const totalContributions = calendar.totalContributions;

      console.log(`Processing year ${year}, total contributions: ${totalContributions}`);

      const yearContributions = weeks.flatMap(week => 
        week.contributionDays
          .filter(day => day.contributionCount > 0)
          .map(day => ({
            day: day.date,
            value: day.contributionCount
          }))
      );

      // Scale values to match GitHub's levels
      const values = yearContributions.map(c => c.value);
      const max = Math.max(...values, 1); // Ensure we don't divide by zero
      const quartiles = [
        Math.ceil(max * 0.25),
        Math.ceil(max * 0.5),
        Math.ceil(max * 0.75),
        max
      ];

      console.log(`Year ${year} quartiles:`, quartiles);

      const scaledContributions = yearContributions.map(contribution => ({
        day: contribution.day,
        value: contribution.value === 0 ? 0 :
          contribution.value <= quartiles[0] ? 1 :
          contribution.value <= quartiles[1] ? 2 :
          contribution.value <= quartiles[2] ? 3 : 4
      }));

      allContributions.push({
        year,
        contributions: scaledContributions,
        totalContributions
      });

      // Update progress for each year processed
      setProgress(20 + (index + 1) * progressPerYear);
    }

    const sortedContributions = allContributions.sort((a, b) => b.year - a.year);
    console.log('Processed all contributions:', sortedContributions);

    setProgress(100); // Complete
    setContributions(sortedContributions); // Cache the results
    return sortedContributions;

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}
