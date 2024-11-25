import { ReactNode } from "react";
import {
  Activity,
  Atom,
  BarChart,
  Box,
  Brain,
  Brush,
  CheckCircle,
  Chrome,
  Cloud,
  Code,
  Cpu,
  CreditCard,
  Database,
  Edit,
  ExternalLink,
  FileText,
  Flame,
  Gamepad,
  Gem,
  GitBranch,
  Grid,
  HardDrive,
  Hexagon,
  Image,
  Layers,
  Layout,
  Map,
  Package,
  Paintbrush,
  Pen,
  PenTool,
  PieChart,
  Puzzle,
  RefreshCw,
  Route,
  Server,
  ShoppingCart,
  Square,
  Sun,
  Train,
  Triangle,
  Volume2,
  Wand,
  Wifi,
  Zap,
  Phone,
  Scissors,
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
  // Frameworks and Libraries
  "Vue.js": { icon: Code, color: "#4FC08D", docLink: "https://vuejs.org" },
  Vue3: { icon: Code, color: "#4FC08D", docLink: "https://vuejs.org" },
  React: { icon: Atom, color: "#61DAFB", docLink: "https://reactjs.org" },
  "React 18": { icon: Atom, color: "#61DAFB", docLink: "https://reactjs.org" },
  "Next.js": {
    icon: Triangle,
    color: "#000000",
    docLink: "https://nextjs.org",
  },
  "Next.js 15": {
    icon: Triangle,
    color: "#000000",
    docLink: "https://nextjs.org",
  },
  "Node.js": { icon: Cpu, color: "#339933", docLink: "https://nodejs.org" },
  Express: { icon: Server, color: "#000000", docLink: "https://expressjs.com" },
  Rails: {
    icon: Train,
    color: "#CC0000",
    docLink: "https://rubyonrails.org",
  },
  "Three.js": {
    icon: Box,
    color: "#000000",
    docLink: "https://threejs.org",
  },
  "React Three Fiber": {
    icon: Box,
    color: "#000000",
    docLink: "https://docs.pmnd.rs/react-three-fiber",
  },
  Vuex: {
    icon: Layers,
    color: "#41b883",
    docLink: "https://vuex.vuejs.org",
  },
  "Vue Router": {
    icon: Route,
    color: "#42b883",
    docLink: "https://router.vuejs.org",
  },
  jQuery: {
    icon: Code,
    color: "#0769AD",
    docLink: "https://jquery.com",
  },
  Bootstrap: {
    icon: Package,
    color: "#7952B3",
    docLink: "https://getbootstrap.com",
  },
  "Radix UI": {
    icon: Grid,
    color: "#000000",
    docLink: "https://www.radix-ui.com/",
  },
  "Styled-Components": {
    icon: Paintbrush,
    color: "#DB7093",
    docLink: "https://styled-components.com",
  },
  "Framer Motion": {
    icon: Zap,
    color: "#000000",
    docLink: "https://www.framer.com/motion/",
  },
  GSAP: {
    icon: RefreshCw,
    color: "#88CE02",
    docLink: "https://greensock.com/gsap/",
  },
  "Mapbox GL JS": {
    icon: Map,
    color: "#4264FB",
    docLink: "https://www.mapbox.com/mapbox-gljs",
  },
  D3: {
    icon: BarChart,
    color: "#F9A03C",
    docLink: "https://d3js.org",
  },
  Recharts: {
    icon: PieChart,
    color: "#00C49F",
    docLink: "https://recharts.org",
  },
  "p5.js": {
    icon: Pen,
    color: "#ED225D",
    docLink: "https://p5js.org",
  },
  "Fabric.js": {
    icon: Scissors,
    color: "#ff5722",
    docLink: "http://fabricjs.com/",
  },

  // Languages
  TypeScript: {
    icon: Code,
    color: "#3178C6",
    docLink: "https://www.typescriptlang.org",
  },
  JavaScript: {
    icon: Code,
    color: "#F7DF1E",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
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
  Ruby: {
    icon: Gem,
    color: "#CC342D",
    docLink: "https://www.ruby-lang.org",
  },
  SQL: {
    icon: Database,
    color: "#e38c00",
    docLink: "https://en.wikipedia.org/wiki/SQL",
  },
  GLSL: {
    icon: Sun,
    color: "#000000",
    docLink: "https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)",
  },
  WGSL: {
    icon: Sun,
    color: "#000000",
    docLink: "https://gpuweb.github.io/gpuweb/wgsl.html",
  },

  // Databases and Backend Services
  MongoDB: {
    icon: Database,
    color: "#47A248",
    docLink: "https://www.mongodb.com",
  },
  PostgreSQL: {
    icon: Database,
    color: "#336791",
    docLink: "https://www.postgresql.org",
  },
  Redis: {
    icon: Layers,
    color: "#DC382D",
    docLink: "https://redis.io",
  },
  Supabase: {
    icon: Cloud,
    color: "#3ECF8E",
    docLink: "https://supabase.io",
  },

  // UI Libraries and Styling
  "Tailwind CSS": {
    icon: Wand,
    color: "#38B2AC",
    docLink: "https://tailwindcss.com",
  },
  "Local Storage": {
    icon: HardDrive,
    color: "#FFA500",
    docLink:
      "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
  },

  // Tools and Platforms
  Git: { icon: GitBranch, color: "#F05032", docLink: "https://git-scm.com" },
  Webpack: {
    icon: Hexagon,
    color: "#8DD6F9",
    docLink: "https://webpack.js.org",
  },
  Vite: {
    icon: Zap,
    color: "#646CFF",
    docLink: "https://vitejs.dev",
  },
  Parcel: {
    icon: Box,
    color: "#e07b24",
    docLink: "https://parceljs.org",
  },
  Jest: { icon: CheckCircle, color: "#C21325", docLink: "https://jestjs.io/" },
  "Chrome Extension API": {
    icon: Puzzle,
    color: "#4285F4",
    docLink: "https://developer.chrome.com/docs/extensions/",
  },
  "Firefox Add-on API": {
    icon: Puzzle,
    color: "#FF7139",
    docLink: "https://extensionworkshop.com/",
  },
  Vercel: {
    icon: Triangle,
    color: "#000000",
    docLink: "https://vercel.com",
  },
  "Vercel Analytics": {
    icon: BarChart,
    color: "#000000",
    docLink: "https://vercel.com/analytics",
  },
  Netlify: {
    icon: Triangle,
    color: "#00C7B7",
    docLink: "https://www.netlify.com",
  },
  Heroku: {
    icon: Cloud,
    color: "#430098",
    docLink: "https://www.heroku.com",
  },
  "Adobe CS": {
    icon: PenTool,
    color: "#FF0000",
    docLink: "https://www.adobe.com/creativecloud.html",
  },
  "Lemon Squeezy": {
    icon: ShoppingCart,
    color: "#FFDD00",
    docLink: "https://www.lemonsqueezy.com",
  },

  // APIs and Services
  "OpenAI API": {
    icon: Brain,
    color: "#412991",
    docLink: "https://openai.com",
  },
  "Steam Web API": {
    icon: Gamepad,
    color: "#1b2838",
    docLink: "https://partner.steamgames.com/doc/webapi",
  },
  "Stable Diffusion": {
    icon: Image,
    color: "#000000",
    docLink: "https://stability.ai",
  },
  WebSocket: {
    icon: Wifi,
    color: "#000000",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  },
  WebGL: {
    icon: Box,
    color: "#990000",
    docLink: "https://www.khronos.org/webgl/",
  },
  "Canvas API": {
    icon: Brush,
    color: "#000000",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
  },
  "Web Audio API": {
    icon: Volume2,
    color: "#000000",
    docLink: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
  },
  "Chrome APIs": {
    icon: Chrome,
    color: "#4285F4",
    docLink: "https://developer.chrome.com/docs/extensions/reference/",
  },
  "Monaco Editor": {
    icon: Edit,
    color: "#0E70C0",
    docLink: "https://microsoft.github.io/monaco-editor/",
  },

  // Others
  Ionic: {
    icon: Phone,
    color: "#3880FF",
    docLink: "https://ionicframework.com",
  },
  "Rapier Physics": {
    icon: Activity,
    color: "#FF6D00",
    docLink: "https://rapier.rs",
  },
};
