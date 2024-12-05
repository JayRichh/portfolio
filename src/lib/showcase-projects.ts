export const projectsData = [
  {
    title: "Checkpoint",
    description: "GitHub analytics dashboard built with Next.js 15, featuring interactive contribution visualizations, language distribution analysis, and detailed activity metrics",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "GitHub GraphQL API",
      "Tailwind CSS",
      "Nivo Charts"
    ],
    mainImage: {
      src: "/images/_com4.png",
      alt: "Checkpoint Main",
    },
    subImages: [
      {
        src: "/images/_com2.png",
        alt: "Checkpoint Dashboard",
      },
      {
        src: "/images/_com3.png",
        alt: "Checkpoint Analytics",
      },
    ],
    links: {
      live: "https://checkpoint-demo.vercel.app",
      code: "https://github.com/JayRichh/checkpoint",
    },
    theme: {
      textColor: "text-gray-900 dark:text-[#60a5fa]",
      gradient: "bg-gradient-to-b from-white via-blue-50 to-gray-50 dark:from-blue-950 dark:via-[#172554] dark:to-gray-900",
    },
  },
  {
    title: "SteamShare",
    description: "Steam screenshot management platform with integrated gallery organization and canvas editing. Features seamless Steam authentication, real-time data fetch, and collage creation tools.",
    technologies: [
      "React 18",
      "TypeScript",
      "Steam Web API",
      "Fabric.js",
      "Framer Motion",
    ],
    mainImage: {
      src: "/images/steam4.png",
      alt: "SteamShare Main",
    },
    subImages: [
      {
        src: "/images/steam2.png",
        alt: "SteamShare Gallery",
      },
      {
        src: "/images/steam3.png",
        alt: "SteamShare Editor",
      },
    ],
    links: {
      live: "https://steamshare.net",
      code: "https://github.com/JayRichh/steamshare",
    },
    theme: {
      textColor: "text-gray-900 dark:text-[#66c0f4]",
      gradient: "bg-gradient-to-b from-gray-100 via-blue-50 to-white dark:from-[#1b2838] dark:via-[#213352] dark:to-gray-900",
    },
  },
  {
    title: "Golf2Go",
    description: "Modern business website for a portable miniature golf company, replacing legacy WordPress site with Next.js 15 for improved performance and user experience.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "reCAPTCHA",
      "Zod",
      "SMTP",
    ],
    mainImage: {
      src: "/images/golfhero.png",
      alt: "Golf2Go Hero",
    },
    subImages: [
      {
        src: "/images/golf4.png",
        alt: "Golf2Go Booking",
      },
      {
        src: "/images/golf2.png",
        alt: "Golf2Go Courses",
      },
    ],
    links: {
      live: "https://golf2go.vercel.app",
      code: "https://github.com/JayRichh/golf2go",
    },
    theme: {
      textColor: "text-gray-900 dark:text-[#4ade80]",
      gradient: "bg-gradient-to-b from-white via-green-50 to-gray-50 dark:from-green-950 dark:via-[#0f2c1d] dark:to-gray-900",
    },
  },
  {
    title: "CSS Battle",
    description: "A full-featured web app for recreating CSS battles with real-time previews, scoring based on accuracy and code efficiency, and interactive comparison tools.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Monaco Editor",
      "html2canvas",
    ],
    mainImage: {
      src: "/images/editor.png",
      alt: "CSS Battle Editor",
    },
    subImages: [
      {
        src: "/images/compare.png",
        alt: "CSS Battle Comparison",
      },
      {
        src: "/images/challenges.png",
        alt: "CSS Battle Challenges",
      },
    ],
    links: {
      live: "https://domination.vercel.app",
      code: "https://github.com/JayRichh/domination",
    },
    theme: {
      textColor: "text-gray-900 dark:text-primary",
      gradient: "bg-gradient-to-b from-white via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-800",
    },
  },
  {
    title: "Encompass Tours",
    description: "Digital platform for NZ motorcycle tours using Vue and Supabase. Features server-side caching, dynamic tour management, and interactive route visualization.",
    technologies: ["Vue.js", "Supabase", "Redis", "Node.js", "TypeScript"],
    mainImage: {
      src: "/images/encompass-hero.png",
      alt: "Encompass Tours Hero",
    },
    subImages: [
      {
        src: "/images/encompass-about.png",
        alt: "Encompass Tours About",
      },
      {
        src: "/images/encompass-contact.png",
        alt: "Encompass Tours Contact",
      },
    ],
    links: {
      live: "https://encompasstours.co.nz",
      code: "https://github.com/JayRichh",
    },
    theme: {
      textColor: "text-gray-900 dark:text-[#4CAF50]",
      gradient: "bg-gradient-to-b from-white via-green-50 to-gray-50 dark:from-emerald-950 dark:via-[#0c3a1d] dark:to-gray-900",
    },
  },
  {
    title: "PomoDev",
    description: "A Pomodoro Timer Chrome Extension designed to boost productivity. Features customizable timers, task management, and theme options, all built with modern web technologies.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Chrome Extension API",
      "Firefox Add-on API",
    ],
    mainImage: {
      src: "/images/pomodev-logo.png",
      alt: "PomoDev Logo",
    },
    subImages: [
      {
        src: "/images/pomodev1.png",
        alt: "PomoDev Timer",
      },
      {
        src: "/images/pomodev3.png",
        alt: "PomoDev Tasks",
      },
    ],
    links: {
      code: "https://github.com/JayRichh/pomodev",
    },
    theme: {
      textColor: "text-gray-900 dark:text-[#FF6B6B]",
      gradient: "bg-gradient-to-b from-white via-red-50 to-gray-50 dark:from-rose-950 dark:via-[#270a16] dark:to-gray-900",
    },
    reverse: true,
  },
  {
    title: "The Work Waka",
    description: "Job application and interview tracking platform with data visualization, calendar integration, dynamic forms, and Sankey diagram reports.",
    technologies: ["React", "TypeScript", "Next.js", "D3.js", "Tailwind CSS"],
    mainImage: {
      src: "/images/workwaka.png",
      alt: "Work Waka Main",
    },
    subImages: [
      {
        src: "/images/workmain.webp",
        alt: "Work Waka Dashboard",
      },
      {
        src: "/images/moitsBoat.png",
        alt: "Work Waka Features",
      },
    ],
    links: {
      live: "https://workwaka.vercel.app",
      code: "https://github.com/JayRichh/workwaka",
    },
    theme: {
      textColor: "text-gray-900 dark:text-zinc-200",
      gradient: "bg-gradient-to-b from-gray-50 via-zinc-100 to-white dark:from-zinc-900 dark:via-[#1a1a1f] dark:to-gray-900",
    },
    reverse: true,
  }
];
