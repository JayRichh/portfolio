export const universalRelaxation = (tech: string): string => {
  const techMap: Record<string, string[]> = {
    "Vue.js": ["Vue", "Vue3", "Vue 3", "VueJS", "Vue 2"],
    React: ["React.js", "ReactJS", "React 18"],
    "Next.js": ["NextJS", "Next.js", "Next.js 15"],
    "Tailwind CSS": ["Tailwind CSS", "TailwindCSS"],
    JavaScript: ["JS", "JavaScript", "ECMAScript"],
    TypeScript: ["TS", "TypeScript"],
    "Node.js": ["Node", "NodeJS", "Node.js"],
    Express: ["ExpressJS", "Express.js"],
    MongoDB: ["Mongo", "MongoDB", "Mongoose"],
    HTML5: ["HTML", "HTML5"],
    CSS3: ["CSS", "CSS3"],
    GSAP: ["GSAP"],
    Firebase: ["Firebase"],
    Vuex: ["Vuex"],
    Bootstrap: ["Bootstrap"],
    "Three.js": ["ThreeJS", "Three.js"],
    WebSockets: ["Socket.io", "WebSockets", "SocketIO", "WebSocket"],
    "Physics Engine": [
      "Rapier",
      "Rapier Physics Engine",
      "CANNON.js",
      "CannonJS",
      "Rapier Physics",
    ],
    AI: ["OpenAI", "OpenAI API", "Claude", "Stable Diffusion"],
    "Styled-Components": ["Styled-Components"],
    "Chrome Extension API": ["Chrome Extension API", "Chrome APIs"],
    "Vercel Analytics": ["Vercel Analytics"],
    WebGL: ["WebGL"],
    GLSL: ["GLSL"],
    WGSL: ["WGSL"],
    Ionic: ["Ionic"],
    Redis: ["Redis"],
    Supabase: ["Supabase"],
    Mapbox: ["Mapbox", "Mapbox GL JS"],
    jQuery: ["jQuery"],
    "Framer Motion": ["Framer Motion"],
    "Radix UI": ["Radix UI"],
    "Local Storage": ["Local Storage", "LocalStorage"],
    D3: ["D3.js", "D3"],
    "Canvas API": ["Canvas API"],
    "Web Audio API": ["Web Audio API"],
    PostgreSQL: ["PostgreSQL"],
    Recharts: ["Recharts"],
    Vite: ["Vite"],
    "Firefox Add-on API": ["Firefox Add-on API"],
    "React Three Fiber": ["React Three Fiber"],
    "Vue Router": ["Vue Router"],
    "Monaco Editor": ["Monaco Editor"],
    Ruby: ["Ruby"],
    Rails: ["Rails"],
    SQL: ["SQL"],
    Git: ["Git"],
    Jest: ["Jest"],
    Webpack: ["Webpack"],
    "p5.js": ["p5.js"],
    Vercel: ["Vercel"],
    "Adobe CS": ["Adobe CS"],
  };

  for (const [key, aliases] of Object.entries(techMap)) {
    if (aliases.includes(tech)) {
      return key;
    }
  }
  return tech;
};

export const sortProjectsByDate = <T extends { updatedAt: string }>(
  projects: T[],
  ascending: boolean = false
): T[] => {
  return [...projects].sort((a, b) => {
    const comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    return ascending ? -comparison : comparison;
  });
};

export const filterProjectsByTech = <T extends { details: { technologies: string[] } }>(
  projects: T[],
  selectedTech: string[]
): T[] => {
  if (!selectedTech.length) return projects;
  
  return projects.filter((project) =>
    selectedTech.every((tech) =>
      project.details.technologies
        .map(universalRelaxation)
        .includes(universalRelaxation(tech))
    )
  );
};
