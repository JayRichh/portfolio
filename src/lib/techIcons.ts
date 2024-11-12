import { ReactNode } from "react";

import {
  Box,
  Brain,
  CheckCircle,
  Chrome,
  Code,
  Cpu,
  CreditCard,
  Database,
  Figma,
  FileText,
  Flame,
  GitBranch,
  Layout,
  LucideIcon,
  Package,
  Paintbrush,
  Server,
  Wand,
} from "lucide-react";

export interface TechIcon {
  icon: (props: { size?: number; color?: string }) => ReactNode;
  color: string;
  docLink: string;
}

export interface TechIcons {
  [key: string]: TechIcon;
}

export const techIcons: TechIcons = {
  "Vue.js": { icon: Code, color: "#4FC08D", docLink: "https://vuejs.org" },
  Vue3: { icon: Code, color: "#4FC08D", docLink: "https://vuejs.org" },
  TypeScript: {
    icon: Code,
    color: "#3178C6",
    docLink: "https://www.typescriptlang.org",
  },
  "Node.js": { icon: Cpu, color: "#339933", docLink: "https://nodejs.org" },
  Express: { icon: Server, color: "#000000", docLink: "https://expressjs.com" },
  MongoDB: {
    icon: Database,
    color: "#47A248",
    docLink: "https://www.mongodb.com",
  },
  HTML5: {
    icon: FileText,
    color: "#E34F26",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
  },
  CSS3: {
    icon: Layout,
    color: "#1572B6",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  "Next.js": { icon: Code, color: "#000000", docLink: "https://nextjs.org" },
  React: { icon: Code, color: "#61DAFB", docLink: "https://reactjs.org" },
  "Tailwind CSS": {
    icon: Wand,
    color: "#38B2AC",
    docLink: "https://tailwindcss.com",
  },
  Sass: {
    icon: Paintbrush,
    color: "#CC6699",
    docLink: "https://sass-lang.com",
  },
  JavaScript: {
    icon: Code,
    color: "#F7DF1E",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  Git: { icon: GitBranch, color: "#F05032", docLink: "https://git-scm.com" },
  "VS Code": {
    icon: Code,
    color: "#007ACC",
    docLink: "https://code.visualstudio.com",
  },
  "Chrome DevTools": {
    icon: Chrome,
    color: "#4285F4",
    docLink: "https://developer.chrome.com/docs/devtools/",
  },
  Firebase: {
    icon: Flame,
    color: "#FFCA28",
    docLink: "https://firebase.google.com",
  },
  Bootstrap: {
    icon: Package,
    color: "#7952B3",
    docLink: "https://getbootstrap.com",
  },
  Jest: { icon: CheckCircle, color: "#C21325", docLink: "https://jestjs.io/" },
  Stripe: {
    icon: CreditCard,
    color: "#008CDD",
    docLink: "https://stripe.com/",
  },
  Figma: { icon: Figma, color: "#F24E1E", docLink: "https://www.figma.com/" },
  WebGL: {
    icon: Box,
    color: "#990000",
    docLink: "https://www.khronos.org/webgl/",
  },
  OpenAI: { icon: Brain, color: "#412991", docLink: "https://openai.com" },
  "Styled-Components": {
    icon: Paintbrush,
    color: "#DB7093",
    docLink: "https://styled-components.com",
  },
};
