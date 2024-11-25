import { learnings } from "../../../../lib/learningData";
import { projectData } from "../../../../lib/projectData";
import { techCategories } from "../../../../lib/techCategories";
import { uniq } from "lodash";

export const CATEGORIES = {
  language: {
    name: "Languages",
    color: "rgba(79, 70, 229, 0.95)", // Deep indigo
    glow: "rgba(79, 70, 229, 0.4)",
  },
  framework: {
    name: "Frameworks",
    color: "rgba(16, 185, 129, 0.95)", // Deep emerald
    glow: "rgba(16, 185, 129, 0.4)",
  },
  tool: {
    name: "Tools",
    color: "rgba(239, 68, 68, 0.95)", // Deep red
    glow: "rgba(239, 68, 68, 0.4)",
  },
  concept: {
    name: "Concepts",
    color: "rgba(37, 99, 235, 0.95)", // Deep blue
    glow: "rgba(37, 99, 235, 0.4)",
  },
  project: {
    name: "Projects",
    color: "rgba(147, 51, 234, 0.95)", // Deep purple
    glow: "rgba(147, 51, 234, 0.4)",
  },
} as const;

export const SAMPLING_METHODS = {
  balanced: "Balanced distribution across categories",
  frequency: "Pure frequency-based sizing",
  importance: "Weighted by project impact",
} as const;

export const STOP_WORDS = new Set([
  // Common words
  "and",
  "with",
  "using",
  "for",
  "in",
  "to",
  "of",
  "the",
  "a",
  "an",
  "on",
  "at",
  "by",
  "from",
  "up",
  "down",
  "into",
  "over",
  "after",
  // Technical terms
  "implementation",
  "development",
  "integration",
  "usage",
  "use",
  "basic",
  "simple",
  "first",
  "time",
  "built",
  "building",
  "created",
  "includes",
  "features",
  "working",
  "learning",
  "learned",
  "based",
  "various",
  "multiple",
  "different",
  "new",
  "custom",
  "setup",
  "support",
  "enabled",
  "making",
  "done",
  "doing",
  "project",
  "application",
  "app",
  "system",
  "component",
  "function",
  "data",
  "code",
  "coding",
  "programming",
  "software",
  "developer",
  // Additional technical terms
  "implementation",
  "interface",
  "module",
  "service",
  "class",
  "method",
  "object",
  "instance",
  "version",
  "update",
  "process",
  "server",
  "client",
  "user",
  "admin",
  "config",
  "configuration",
  "deploy",
  "deployment",
  "build",
  "release",
  "test",
  "testing",
  "debug",
  "debugging",
  "fix",
  "fixed",
  "implement",
  "implemented",
  "develop",
  "developed",
  "create",
  "created",
  "design",
  "designed",
  "architecture",
  "structure",
  "pattern",
  "practice",
  "solution",
]);

function addRandomJitter(value: number, range = 0.3): number {
  const jitter = (Math.random() - 0.5) * range;
  return value * (1 + jitter);
}

function getRandomSubset<T>(array: T[], percentage: number): T[] {
  const count = Math.floor(array.length * percentage);
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function areSimilar(word1: string, word2: string): boolean {
  if (word1 === word2) return true;
  if (word1.includes(word2) || word2.includes(word1)) return true;

  // Check for plural forms
  if (word1.endsWith("s") && word1.slice(0, -1) === word2) return true;
  if (word2.endsWith("s") && word2.slice(0, -1) === word1) return true;

  // Check for common suffixes
  const suffixes = [
    "ing",
    "ed",
    "er",
    "est",
    "ly",
    "tion",
    "ment",
    "ness",
    "able",
    "ible",
  ];
  for (const suffix of suffixes) {
    if (word1.endsWith(suffix) && word1.slice(0, -suffix.length) === word2)
      return true;
    if (word2.endsWith(suffix) && word2.slice(0, -suffix.length) === word1)
      return true;
  }

  return false;
}

export interface FileBreakdown {
  components: number;
  styles: number;
  tests: number;
  config: number;
  utils: number;
  types: number;
}

export function generateDatasetStats() {
  const allTechs = projectData.reduce((acc, project) => {
    return [...acc, ...project.details.technologies];
  }, [] as string[]);

  const uniqueTechs = uniq(allTechs).length;

  const totalFeatures = projectData.reduce(
    (sum, p) => sum + p.details.features.length,
    0,
  );
  const totalChallenges = projectData.reduce(
    (sum, p) => sum + p.details.challenges.length,
    0,
  );
  const totalLearnings = projectData.reduce(
    (sum, p) => sum + p.details.learnings.length,
    0,
  );

  const fileBreakdown: FileBreakdown = {
    components: Math.round(totalFeatures * 2),
    styles: Math.round(totalFeatures),
    tests: Math.round(totalFeatures),
    utils: Math.round(totalFeatures * 0.5),
    config: projectData.length * 3,
    types: Math.round(totalFeatures * 0.5),
  };

  const filesAnalyzed = Object.values(fileBreakdown).reduce((a, b) => a + b, 0);
  const avgLinesPerFile = 175;
  const linesOfCode = filesAnalyzed * avgLinesPerFile;

  return {
    filesAnalyzed,
    fileBreakdown,
    linesOfCode,
    uniqueTechnologies: uniqueTechs,
    projectCount: projectData.length,
    learningCount: learnings.length,
  };
}

function determineCategory(word: string): keyof typeof CATEGORIES {
  const lowerWord = word.toLowerCase();

  for (const [category, techs] of Object.entries(techCategories)) {
    if (techs.some((tech) => tech.toLowerCase() === lowerWord)) {
      switch (category) {
        case "Languages":
          return "language";
        case "Frameworks":
        case "UI Libraries":
        case "Animation Libraries":
        case "Libraries":
          return "framework";
        case "Tools":
        case "Databases":
        case "APIs":
        case "Platforms":
        case "Others":
          return "tool";
        default:
          return "concept";
      }
    }
  }

  if (/(api|service|platform|tool|cli|sdk|db|database)$/i.test(word))
    return "tool";
  if (/(framework|library|component|app|ui)$/i.test(word)) return "framework";

  return "concept";
}

function calculateImportance(
  frequency: number,
  projectImpact: number,
  method: keyof typeof SAMPLING_METHODS = "balanced",
): number {
  let importance: number;

  switch (method) {
    case "frequency":
      // Pure frequency-based calculation with exponential scaling
      importance = Math.pow(frequency, 1.5) / 10;
      break;

    case "importance":
      // Heavily weighted by project impact
      importance = frequency * 0.3 + projectImpact * 0.7;
      importance = Math.pow(importance, 1.8) / 8;
      break;

    case "balanced":
    default:
      // Balanced approach using both metrics
      importance = frequency * 0.5 + projectImpact * 0.5;
      importance = Math.pow(importance + 1, 1.6) / 12;
      break;
  }

  // Apply stronger scaling for more size variation
  importance = Math.pow(importance, 1.2);

  // Ensure good range of sizes
  return Math.max(1, Math.min(8, importance * 8));
}

export function processWords(
  samplingMethod: keyof typeof SAMPLING_METHODS = "balanced",
) {
  const wordMap = new Map<
    string,
    {
      text: string;
      group: keyof typeof CATEGORIES;
      importance: number;
      frequency: number;
      projectImpact: number;
    }
  >();

  // Process all projects for better coverage
  projectData.forEach((project) => {
    // Calculate project impact based on features, challenges, and learnings
    const projectImpact =
      (project.details.features.length +
        project.details.challenges.length * 1.2 +
        project.details.learnings.length * 1.5) /
      10;

    // Process technologies with high weight
    project.details.technologies.forEach((tech) => {
      const word = tech.toLowerCase();
      const existing = wordMap.get(word);
      if (existing) {
        existing.frequency += 3;
        existing.projectImpact = Math.max(
          existing.projectImpact,
          projectImpact,
        );
      } else {
        wordMap.set(word, {
          text: tech,
          group: determineCategory(tech),
          importance: 1,
          frequency: 3,
          projectImpact,
        });
      }
    });

    // Process context text
    const contextText = [
      project.description,
      ...project.details.features.map((f) => f.text),
      ...project.details.challenges.map((c) => c.text),
      ...project.details.learnings.map((l) => l),
    ].join(" ");

    const words = contextText
      .split(/[\s,.!?()[\]{}'"]+/)
      .map((word) => word.trim().toLowerCase())
      .filter(
        (word) =>
          word.length > 2 &&
          !STOP_WORDS.has(word) &&
          !/^\d+$/.test(word) &&
          word.length < 20 &&
          !/[^a-z0-9\-\.]/i.test(word),
      );

    words.forEach((word) => {
      const existing = wordMap.get(word);
      if (existing) {
        existing.frequency += 1;
        existing.projectImpact = Math.max(
          existing.projectImpact,
          projectImpact * 0.8,
        );
      } else {
        wordMap.set(word, {
          text: word,
          group: determineCategory(word),
          importance: 1,
          frequency: 1,
          projectImpact: projectImpact * 0.8,
        });
      }
    });
  });

  // Process learnings with medium weight
  learnings.forEach((learning) => {
    const text = `${learning.title} ${learning.description}`;
    const words = text
      .split(/[\s,.!?()[\]{}'"]+/)
      .map((word) => word.trim().toLowerCase())
      .filter(
        (word) =>
          word.length > 2 &&
          !STOP_WORDS.has(word) &&
          !/^\d+$/.test(word) &&
          word.length < 20 &&
          !/[^a-z0-9\-\.]/i.test(word),
      );

    words.forEach((word) => {
      const existing = wordMap.get(word);
      if (existing) {
        existing.frequency += 0.5;
        existing.projectImpact = Math.max(existing.projectImpact, 1);
      } else {
        wordMap.set(word, {
          text: word,
          group: determineCategory(word),
          importance: 1,
          frequency: 0.5,
          projectImpact: 1,
        });
      }
    });
  });

  // Convert to array and calculate importance
  let words = Array.from(wordMap.values())
    .map((word) => ({
      ...word,
      importance: calculateImportance(
        word.frequency,
        word.projectImpact,
        samplingMethod,
      ),
    }))
    .filter((word) => word.importance >= 2.8)
    .sort((a, b) => b.importance - a.importance);

  // Filter out similar words, keeping the more important ones
  const filteredWords: typeof words = [];
  words.forEach((word) => {
    if (
      !filteredWords.some((existing) =>
        areSimilar(existing.text.toLowerCase(), word.text.toLowerCase()),
      )
    ) {
      filteredWords.push(word);
    }
  });

  // Return a balanced selection of words
  return filteredWords.slice(0, 40);
}
