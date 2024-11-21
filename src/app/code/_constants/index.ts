export const EXTERNAL_LINKS = {
  CODEPEN: "https://codepen.io/jayrichh",
  GITHUB: "https://github.com/JayRichh",
} as const;

export const LOADING_CONFIG = {
  INITIAL_LOAD_DELAY: 300,
  PRELOAD_IMAGE_COUNT: 6,
} as const;

export const GRID_BREAKPOINTS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
} as const;

export const PAGE_METADATA = {
  TITLE: "Projects | Jayden Richardson",
  DESCRIPTION:
    "Web development projects showcasing various technologies and approaches",
} as const;

export const TECH_DISPLAY_LIMIT = 5;

export const ANIMATION_CONFIG = {
  INITIAL_OPACITY: 0,
  FINAL_OPACITY: 1,
  DURATION: 0.3,
  STAGGER_DELAY: 0.05,
} as const;

export const BUTTON_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  GHOST: "ghost",
} as const;

export const IMAGE_CONFIG = {
  QUALITY: 90,
  SIZES: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
} as const;
