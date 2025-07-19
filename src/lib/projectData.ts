export interface FeatureDetail {
  title: string;
  text: string;
  image?: string;
}

export interface ChallengeDetail {
  title: string;
  text: string;
  image?: string;
}

export interface LearningPoint {
  text: string;
  image?: string;
}

export interface LearningDetail {
  title: string;
  points: LearningPoint[];
}

export interface ProjectDetail {
  title: string;
  description: string;
  technologies: string[];
  features: FeatureDetail[];
  challenges: ChallengeDetail[];
  learnings: LearningDetail[];
  additionalImages: string[];
}

export interface Project {
  title: string;
  description: string;
  imgUrl: string;
  repoUrl: string;
  liveUrl: string;
  details: ProjectDetail;
  updatedAt: string;
}

export const projectData: Project[] = [
  {
  title: "Riddlit",
  description: "Team-based riddle platform for daily brain challenges and friendly competition.",
  imgUrl: "/images/riddlittext.png",
  repoUrl: "https://github.com/jayrichh/riddlit", 
  liveUrl: "https://riddl.it",
  updatedAt: "2025-07-18",
  details: {
    title: "Riddlit - Team Riddle Platform",
    description: "A riddle-solving platform where teams tackle daily challenges together. Features one-shot answers, live leaderboards, and streak tracking to keep teams engaged and competitive.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS", 
      "Clerk Auth",
      "Supabase",
      "Drizzle ORM",
      "Framer Motion",
      "Shadcn/ui"
    ],
    features: [
      {
        title: "Daily Riddles",
        text: "New challenges every day, available for 24 hours. Miss one and wait for tomorrow. Keeps teams coming back with fresh content and time pressure.",
        image: "/images/riddlit1.png"
      },
      {
        title: "Team Competition", 
        text: "Create teams, invite members, and compete together. Track collective progress while individual contributions count toward team success.",
        image: "/images/riddlit3.png"
      },
      {
        title: "Live Leaderboards",
        text: "Rankings update instantly as answers come in. See where your team stands and watch the competition unfold in real-time.",
        image: "/images/riddlit2.png"  
      },
      {
        title: "One-Shot Answers",
        text: "Submit once per riddle - no do-overs. Creates genuine pressure and rewards careful thinking over quick guessing.",
        image: "/images/riddlit0.png"
      },
      {
        title: "Multiple Answer Types",
        text: "Text responses, multiple choice, numbers, or true/false. Riddle creators pick the format that best fits their puzzle.",
      },
      {
        title: "Admin Tools",
        text: "Manage users, approve riddles, and track engagement. Clean dashboard shows what's working and what needs attention."
      }
    ],
    challenges: [
      {
        title: "Real-time Updates",
        text: "Getting leaderboards to update instantly across all users without lag. Used Supabase real-time features with smart client-side caching."
      },
      {
        title: "Team Permissions", 
        text: "Managing who can see what riddles based on team membership and roles. Built flexible permission system using Clerk with database checks."
      },
      {
        title: "Global Timing",
        text: "Making riddles available fairly across time zones while keeping 24-hour windows consistent. Solved with UTC storage and client-side conversion."
      }
    ],
    learnings: [
      {
        title: "Next.js 15 Performance",
        points: [
          {
            text: "Server components for data fetching, client components only when needed for interactivity"
          },
          {
            text: "App router patterns for clean URL structure and efficient page organization"
          }
        ]
      },
      {
        title: "Database Design", 
        points: [
          {
            text: "Efficient queries for leaderboard calculations that scale with user growth"
          },
          {
            text: "Smart indexing strategy for fast riddle lookups and submission handling"
          }
        ]
      },
      {
        title: "User Experience",
        points: [
          {
            text: "Simple interfaces that work on mobile and desktop without complexity"
          },
          {
            text: "Smooth animations that enhance rather than distract from core functionality"
          }
        ]
      }
    ],
    additionalImages: []
  }
}
,
  {
  "title": "Elite Garage Screens",
  "description": "Business website for garage screen door installation with interactive gallery, form handling, and SEO optimizations built with Next.js 15.",
  "imgUrl": "/images/eweb4.png",
  "repoUrl": "https://github.com/jsric/elitescreens",
  "liveUrl": "https://elitescreens.co.nz",
  "updatedAt": "2025-06-04",
  "details": {
    "title": "Elite Garage Screens - NZ Business Website",
    "description": "Complete business website for a garage screen installation company serving New Zealand's North Island. Built with Next.js 15 App Router and modern web technologies.",
    "technologies": [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Mailer (SMTP)",
      "Mapbox GL",
      "reCAPTCHA",
      "Zod",
      "Framer Motion"
    ],
    "features": [
      {
        "title": "Email System",
        "text": "SMTP2GO integration with custom HTML email templates. Includes conditional sections based on form type, error handling with timeouts, and responsive design for email clients.",
        "image": "/images/eweb1.png"
      },
      {
        "title": "Interactive Gallery",
        "text": "Category-filtered image gallery with modal view and keyboard navigation. Features optimized image loading, transition effects, and responsive grid layout.",
        "image": "/images/eweb4.png"
      },
      {
        "title": "Form Handling",
        "text": "TypeScript-powered form system with Zod validation and reCAPTCHA integration. Supports multiple form types with conditional fields and real-time validation.",
        "image": "/images/eweb2.png"
      },
      {
        "title": "SEO Implementation",
        "text": "Next.js 15 metadata API with dynamic sitemap generation. Server-side structured data implementation for better search engine visibility.",
      }
    ],
    "challenges": [
      {
        "title": "Server/Client Hydration",
        "text": "Resolved Next.js 15 hydration mismatches between server and client rendering, particularly with date values and structured data generation."
      },
      {
        "title": "Form Validation System",
        "text": "Created type-safe form handling with runtime validation, error state management, and cross-browser compatibility for all form components."
      },
      {
        "title": "Email Template Design",
        "text": "Designed responsive HTML email templates with conditional sections based on form type while maintaining compatibility across email clients."
      }
    ],
    "learnings": [
      {
        "title": "Next.js 15 App Router",
        "points": [
          {
            "text": "Server component architecture and data flow optimization"
          },
          {
            "text": "Metadata API implementation for dynamic page metadata"
          },
          {
            "text": "Middleware configuration for route handling and security"
          }
        ]
      },
      {
        "title": "TypeScript Form System",
        "points": [
          {
            "text": "Strong typing for form fields and validation states"
          },
          {
            "text": "Integration with server-side validation patterns"
          },
          {
            "text": "Type-safe API response handling"
          }
        ]
      },
      {
        "title": "Image Optimization",
        "points": [
          {
            "text": "Next.js Image component usage for performance"
          },
          {
            "text": "Responsive sizing and art direction"
          },
          {
            "text": "Modal navigation and transition effects"
          }
        ]
      }
    ],
    "additionalImages": [
    ]
  }
  },
  {
    title: "Web Tools",
    description:
      "Collection of developer utilities built with vanilla Web Components, showcasing modern web development without framework dependencies",
    imgUrl: "/images/toolimg2.png",
    repoUrl: "https://github.com/JayRichh/tools",
    liveUrl: "https://jayrichh.github.io/",
    updatedAt: "2025-02-21",
    details: {
      title: "Web Tools - Developer Utilities",
      description:
        "A suite of web-based developer tools built using native Web Components, demonstrating modern web development patterns without framework overhead. Features clipboard handling, emoji picking, and theme management.",
      technologies: [
        "JavaScript",
        "Web Components",
        "Shadow DOM",
        "Custom Elements",
        "CSS Variables",
        "CSS Grid",
        "Clipboard API",
        "File API",
      ],
      features: [
        {
          title: "Web Component Architecture",
          text: "Utilizes native Web Components with Shadow DOM for true encapsulation. Each tool is a self-contained component with isolated styles and functionality.",
          image: "/images/toolimg1.png",
        },
        {
          title: "Clipboard Handler",
          text: "Advanced clipboard management with drag-drop support, file handling, and image processing. Features real-time preview and download capabilities.",
          image: "/images/toolimg2.png",
        },
        {
          title: "Emoji Picker",
          text: "Unicode emoji browser with search, filtering, and category management. Implements efficient data parsing and real-time updates.",
          image: "/images/toolimg4.png",
        },
        {
          title: "Theme System",
          text: "Dynamic theme switching with CSS variables, supporting both light and dark modes with smooth transitions.",
          image: "/images/toolimg3.png",
        },
      ],
      challenges: [
        {
          title: "Component Isolation",
          text: "Implementing fully isolated components using Shadow DOM while maintaining consistent theming and styles across the application. Required careful planning of CSS variable scope and component boundaries.",
        },
        {
          title: "State Management",
          text: "Managing component state and interactions without framework assistance, using native DOM events and custom element lifecycle methods. Solved through clean event delegation and state encapsulation.",
        },
        {
          title: "Performance",
          text: "Optimizing performance with vanilla JS, including efficient DOM updates and smooth animations without framework overhead. Implemented efficient event handling and DOM manipulation strategies.",
        },
      ],
      learnings: [
        {
          title: "Web Components Architecture",
          points: [
            {
              text: "Effective use of Shadow DOM for style encapsulation and component isolation",
            },
            {
              text: "Custom element lifecycle management for clean component initialization and cleanup",
            },
          ],
        },
        {
          title: "Modern CSS Patterns",
          points: [
            {
              text: "CSS variable system for dynamic theming and consistent styling across shadow boundaries",
            },
            {
              text: "Advanced grid and flexbox layouts for responsive design without framework dependencies",
            },
          ],
        },
        {
          title: "Vanilla JavaScript Patterns",
          points: [
            {
              text: "Clean event handling and DOM manipulation without framework abstractions",
            },
            {
              text: "Efficient state management using native JavaScript patterns and custom events",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "Trekk",
    description:
      "Interactive 3D hiking trail platform with topographical mapping, trail details, and community features built with Vue 3, .NET Core, and Mapbox GL",
    imgUrl: "/images/trek1.png",
    repoUrl: "https://github.com/jsric/trekk",
    liveUrl: "https://trekk-seven.vercel.app",
    updatedAt: "2025-04-10",
    details: {
      title: "Trekk - Interactive Hiking Trail Platform",
      description:
        "A comprehensive hiking trail application featuring interactive 3D topographical mapping, detailed trail information, and community features. Built with Vue 3 and .NET Core, it provides hikers with immersive trail visualization and planning tools.",
      technologies: [
        "Vue 3",
        "TypeScript",
        "Tailwind CSS",
        "Mapbox GL",
        ".NET Core",
        "SignalR",
        "Supabase",
        "Pinia",
        "Vite",
      ],
      features: [
        {
          title: "3D Terrain Visualization",
          text: "Interactive 3D maps with terrain visualization powered by Mapbox GL. Features multiple view modes including 3D terrain, satellite, topographical, and contour views with dynamic trail path rendering.",
          image: "/images/trek3.png",
        },
        {
          title: "Comprehensive Trail Information",
          text: "Detailed trail data including length, elevation gain, difficulty ratings, terrain type, and estimated completion time. Features interactive elevation profiles and trail condition reports.",
          image: "/images/trek2.png",
        },
        {
          title: "User Reviews & Community",
          text: "Community-driven trail ratings and reviews with photo sharing capabilities. Includes hiking tips from experienced users and real-time updates on trail conditions.",
          image: "/images/trek5.png",
        },
        {
          title: "User Profiles & Trail Management",
          text: "Personalized user profiles with favorite, completed, and planned trail tracking. Secure authentication through Supabase with profile customization options.",
          image: "/images/trek4.png",
        },
      ],
      challenges: [
        {
          title: "Real-time Data Synchronization",
          text: "Implementing SignalR for real-time updates across multiple clients while maintaining performance. Solved through efficient hub design and client-side state management with Pinia.",
        },
        {
          title: "3D Map Performance",
          text: "Optimizing 3D terrain rendering for smooth performance across devices with varying capabilities. Implemented progressive loading strategies and view mode options to balance visual quality and performance.",
        },
        {
          title: "Data Integration Architecture",
          text: "Creating a unified data layer that integrates external API data (DOC API) with user-generated content from Supabase. Developed a caching system with automatic refresh mechanisms to reduce API calls while maintaining data freshness.",
        },
      ],
      learnings: [
        {
          title: "Modern Vue 3 Patterns",
          points: [
            {
              text: "Leveraging Vue 3 Composition API with TypeScript for type-safe, reusable component logic",
            },
            {
              text: "Implementing efficient state management with Pinia for reactive, modular stores",
            },
          ],
        },
        {
          title: "Geospatial Visualization",
          points: [
            {
              text: "Advanced Mapbox GL integration techniques for 3D terrain visualization and custom styling",
            },
            {
              text: "Optimizing map performance through efficient data loading and rendering strategies",
            },
          ],
        },
        {
          title: "Full-Stack Architecture",
          points: [
            {
              text: "Designing a clean, maintainable architecture with clear separation of concerns",
            },
            {
              text: "Implementing real-time communication between frontend and backend using SignalR",
            },
            {
              text: "Integrating Supabase for authentication, database, and storage solutions",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "ASCII Art Generator",
    description:
      "Interactive GIF to ASCII art converter with real-time preview, zoom controls, and multiple export formats. Features smooth animation handling and color mode support.",
    imgUrl: "/images/ascii1.png",
    repoUrl: "https://github.com/jsric/ascii",
    liveUrl: "https://jayrichh.github.io/ascii/",
    updatedAt: "2025-01-26",
    details: {
      title: "ASCII Art Generator",
      description:
        "A web application that transforms GIFs into ASCII art animations with real-time preview. Features interactive zoom/pan controls, multiple export formats, and integrated GIF browsing.",
      technologies: [
        "JavaScript",
        "p5.js",
        "GSAP",
        "gif.js",
        "CSS",
        "Canvas API",
      ],
      features: [
        {
          title: "Real-time ASCII Conversion",
          text: "Dynamic GIF to ASCII conversion with instant preview and adjustable character mapping. Supports color mode and maintains animation timing.",
          image: "/images/asciipreview.png",
        },
        {
          title: "Interactive Controls",
          text: "Zoom and pan functionality with GSAP animations. Features smooth transitions, grab-to-zoom, and precise slider controls.",
          image: "/images/ascii2.png",
        },
        {
          title: "Multi-format Export",
          text: "Export options including animated GIF, ASCII text, JSON data, CSV format, and canvas snapshots. Preserves animation frames and timing (..sometimes - WIP).",
          image: "/images/ascii3.png",
        },
        {
          title: "GIF Browser Integration",
          text: "Built-in GIF browser with category filtering, pagination, and preview functionality.",
        },
      ],
      challenges: [
        {
          title: "Performance Optimization",
          text: "Implementing real-time ASCII conversion while maintaining smooth animations and responsive controls.",
        },
        {
          title: "Interactive UI",
          text: "Building zoom/pan system with GSAP animations while ensuring performance and intuitive user experience.",
        },
        {
          title: "Export System",
          text: "Creating export functionality for multiple formats while handling animations and preserving quality.",
        },
      ],
      learnings: [
        {
          title: "Animation Techniques",
          points: [
            {
              text: "GSAP animation patterns for smooth UI transitions and controls",
            },
            {
              text: "Canvas manipulation strategies for real-time rendering and scaling",
            },
          ],
        },
        {
          title: "Performance Patterns",
          points: [
            {
              text: "Efficient ASCII conversion algorithms with frame caching",
            },
            {
              text: "Optimized canvas rendering with hardware acceleration",
            },
          ],
        },
        {
          title: "User Experience",
          points: [
            {
              text: "Intuitive zoom/pan controls with smooth animations",
            },
            {
              text: "Accessible UI design with keyboard navigation support",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "Encompass Travel",
    description:
      "Digital platform for NZ motorcycle tours using Vue, Supabase and server-side caching. Focused on performance and progressive enhancement.",
    imgUrl: "/images/encompass-hero.png",
    repoUrl: "https://github.com/JayRichh",
    liveUrl: "https://encompasstours.co.nz",
    updatedAt: "2024-11-19",
    details: {
      title: "Encompass Tours",
      description:
        "A Vue-based tourism platform with server-side caching and Supabase backend. Handles tour bookings, user auth, and content management for a NZ motorcycle tour company.",
      technologies: [
        "Vue.js",
        "Supabase",
        "Redis",
        "Node.js",
        "TypeScript",
        "TailwindCSS",
        "Vercel",
        "Adobe CS",
      ],
      features: [
        {
          title: "Supabase Integration",
          text: "Full auth system with email/social login, role-based access, and secure session management. Uses Supabase tables with RLS policies for tour data, bookings and user profiles.",
          image: "/images/encompass-about.png",
        },
        {
          title: "Server-side Caching",
          text: "Implemented Redis caching layer for tour data and static content. Significantly reduced database loads and improved response times from ~800ms to <100ms.",
        },
        {
          title: "Tour Management",
          text: "Dynamic tour catalog with real-time availability, booking system, and admin dashboard for managing schedules and capacity.",
          image: "/images/encompass.webp",
        },
        {
          title: "Content Pipeline",
          text: "Image optimization pipeline using Sharp.js, automated WebP conversion, and CDN delivery. Lazy loading and progressive enhancement for fast initial loads.",
          image: "/images/encompass-contact.png",
        },
        {
          title: "Interactive Maps",
          text: "Tour route visualization using Mapbox GL JS with custom styling. Cached route data and vector tiles for offline support.",
        },
      ],
      challenges: [
        {
          title: "Performance at Scale",
          text: "Optimizing for high-traffic periods with potentially thousands of concurrent users checking tour availability. Solved through aggressive caching and DB query optimization.",
        },
        {
          title: "Complex Data Relations",
          text: "Managing relationships between tours, bookings, users and availability calendars. Used Supabase foreign keys and views for data integrity.",
        },
        {
          title: "Image Performance",
          text: "Handling large volumes of high-res tour photos while maintaining fast page loads. Implemented responsive images, WebP conversion and CDN caching.",
        },
      ],
      learnings: [
        {
          title: "Backend Architecture",
          points: [
            {
              text: "Designed scalable data models with Supabase, including complex relations and RLS policies",
            },
            {
              text: "Implemented efficient caching strategies using Redis and CDN edge caching",
            },
          ],
        },
        {
          title: "Frontend Optimization",
          points: [
            {
              text: "Built responsive components with Vue Composition API and TypeScript",
            },
            {
              text: "Learned advanced image optimization techniques for large media libraries",
            },
          ],
        },
        {
          title: "DevOps & Monitoring",
          points: [
            {
              text: "Set up CI/CD pipelines with automated testing and deployment",
            },
            {
              text: "Implemented error tracking and performance monitoring",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/encLogoNewColorsAndStars.png",
        "/images/encompass-about.png",
      ],
    },
  },
  {
    title: "POE2 Tools",
    description:
      "Next.js toolkit for Path of Exile 2 featuring skill tree visualization, build planning, and DPS calculations. Uses Supabase for auth/data and integrates with POE API for character syncing.",
    imgUrl: "/images/poe.png",
    repoUrl: "https://github.com/JayRichh/poe2",
    liveUrl: "https://poe2.dev",
    updatedAt: "2024-12-19",
    details: {
      title: "POE2 Tools",
      description:
        "Next.js application providing essential tools for Path of Exile 2 players. Features skill tree planning with node visualization, build management with POE account integration, and detailed DPS calculations.",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Python (Tree Scanner)",
        "Framer Motion",
        "POE OAuth",
      ],
      features: [
        {
          title: "Skill Tree Visualization",
          text: "Interactive skill tree with node filtering, regex search, and ascendancy selection. Uses custom Python scanner for node detection and includes undo/redo for allocation history. Features detailed stat tracking and node highlighting options.",
          image: "/images/poe1.png",
        },
        {
          title: "DPS Calculator",
          text: "Dual weapon damage calculator supporting physical, elemental and chaos damage types. Includes global modifiers, real-time updates, and calculation history tracking. Visualizes damage type distribution for build analysis.",
          image: "/images/poe2.png",
        },
        {
          title: "Build Management",
          text: "Build planning system with template support and build sharing. Integrates with POE accounts for character data syncing. Uses server-side rendering for optimal performance and includes public/private visibility options.",
          image: "/images/poe3.png",
        },
        {
          title: "Authentication System",
          text: "Supabase authentication with email verification and password reset. Includes POE OAuth for account linking and protected routes. Features seamless session management and auth state syncing.",
        },
      ],
      challenges: [
        {
          title: "Tree Data Structure",
          text: "Building an efficient skill tree system that handles node relationships, path finding, and stat calculations while maintaining smooth performance with large datasets. Required careful optimization of node operations and state management.",
        },
        {
          title: "Damage Calculations",
          text: "Creating a flexible DPS system handling multiple damage types and weapon configurations. Solved through modular calculation engine and efficient state updates for real-time number crunching.",
        },
        {
          title: "State Management",
          text: "Coordinating complex state across skill tree allocation, build configurations, and live calculations. Implemented robust state management patterns while ensuring consistent data flow between components.",
        },
      ],
      learnings: [
        {
          title: "Next.js Architecture",
          points: [
            {
              text: "Designed app router structure with mix of server and client components for optimal performance",
            },
            {
              text: "Implemented dynamic routes with proper loading states and metadata handling",
            },
          ],
        },
        {
          title: "Authentication Patterns",
          points: [
            {
              text: "Built secure auth flows with Supabase including email verification and session management",
            },
            {
              text: "Integrated POE OAuth with proper token refresh and error handling",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "Developed efficient rendering strategies for large skill tree visualization",
            },
            {
              text: "Implemented optimized calculation engine for real-time DPS updates",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "Golf2Go",
    description:
      "Modern business website for a portable miniature golf company, replacing legacy WordPress site with Next.js 15 for improved performance and user experience",
    imgUrl: "/images/golfhero.png",
    repoUrl: "https://github.com/JayRichh/golf2go",
    liveUrl: "https://golf2go.co.nz",
    updatedAt: "2024-12-04",
    details: {
      title: "Golf2Go - Professional Mini Golf Services",
      description:
        "A business platform for a portable miniature golf company, migrated from WordPress to Next.js for better performance and user engagement. Features streamlined booking, course Works, and responsive design.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "reCAPTCHA",
        "Zod",
        "SMTP",
      ],
      features: [
        {
          title: "Streamlined Booking System",
          text: "Professional booking flow with integrated calendar, course selection, and automated email confirmations. Replaced manual WordPress forms for better reliability.",
          image: "/images/golf4.png",
        },
        {
          title: "Course Work",
          text: "High-performance gallery system featuring professional course photography, detailed specifications, and filterable layouts. Optimized images for fast loading.",
        },
        {
          title: "Business Information",
          text: "Comprehensive company information, services overview, and contact options. Improved from WordPress with better organization and accessibility.",
        },
        {
          title: "Contact Integration",
          text: "Modern contact system with automated responses and inquiry tracking. Replaced unreliable WordPress plugins with robust server-side handling.",
        },
      ],
      challenges: [
        {
          title: "WordPress Migration",
          text: "Carefully migrating content and SEO value from existing WordPress site while improving structure and performance.",
        },
        {
          title: "Booking Integration",
          text: "Building a reliable booking system that handles complex scheduling and automated communications.",
        },
        {
          title: "Mobile Optimization",
          text: "Ensuring perfect mobile experience for customers browsing courses and making bookings on any device.",
        },
      ],
      learnings: [
        {
          title: "Business Requirements",
          points: [
            {
              text: "Balancing modern tech with practical business needs",
            },
            {
              text: "Maintaining SEO during platform migration",
            },
          ],
        },
        {
          title: "Customer Experience",
          points: [
            {
              text: "Streamlining booking process for better conversion",
            },
            {
              text: "Optimizing mobile experience for busy customers",
            },
          ],
        },
        {
          title: "System Integration",
          points: [
            {
              text: "Connecting booking system with business operations",
            },
            {
              text: "Implementing reliable email and notification systems",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/golf3.png",
        "/images/golf4.png",
        "/images/golf2.png",
      ],
    },
  },
  {
    title: "SteamShare",
    description:
      "Steam screenshot management platform with integrated gallery organization and canvas editing. Features seamless Steam authentication, real-time data fetch, and collage creation tools.",
    imgUrl: "/images/steam4.png",
    repoUrl: "https://github.com/JayRichh/steamshare",
    liveUrl: "https://steamshare.net",
    updatedAt: "2024-11-22",
    details: {
      title: "SteamShare - Steam Screenshot Platform",
      description:
        "A comprehensive platform for managing and editing Steam screenshots, featuring seamless Steam integration, real-time friend activity tracking, and a professional-grade canvas editor for creating gaming collages.",
      technologies: [
        "Steam Web API",
        "React 18",
        "TypeScript",
        "Fabric.js",
        "Tailwind CSS",
        "Framer Motion",
        "Next.js",
        "Vercel",
      ],
      features: [
        {
          title: "Steam Integration",
          text: "Seamless Steam authentication and real-time data synchronization. Features secure session management and friend activity tracking.",
          image: "/images/steam2.png",
        },
        {
          title: "Screenshot Gallery",
          text: "Advanced screenshot management with filtering, pagination, and friend view capabilities. Supports real-time updates and efficient image loading.",
          image: "/images/steam3.png",
        },
        {
          title: "Canvas Editor",
          text: "Professional-grade editing tools powered by Fabric.js. Includes drawing tools, filters, and advanced image manipulation features for creating gaming collages.",
          image: "/images/steam4.png",
        },
        {
          title: "Friend System",
          text: "Real-time friend activity tracking and screenshot sharing. Includes friend status updates and screenshot privacy controls.",
          image: "/images/steam5.png",
        },
      ],
      challenges: [
        {
          title: "Steam Authentication",
          text: "Implementing secure Steam authentication with proper session management and API key handling across development and production environments.",
        },
        {
          title: "Real-time Updates",
          text: "Managing real-time friend status updates and screenshot synchronization while maintaining performance and data consistency.",
        },
        {
          title: "Canvas Performance",
          text: "Optimizing canvas operations for large images and complex editing features while ensuring smooth user experience.",
        },
      ],
      learnings: [
        {
          title: "Authentication Patterns",
          points: [
            {
              text: "Steam OpenID authentication implementation and session management",
            },
            {
              text: "Secure API key handling and environment-specific configurations",
            },
          ],
        },
        {
          title: "Image Processing",
          points: [
            {
              text: "Efficient image loading and processing strategies using Fabric.js",
            },
            {
              text: "Canvas-based editing tools and filter implementations",
            },
          ],
        },
        {
          title: "API Integration",
          points: [
            {
              text: "Steam Web API integration patterns and rate limiting",
            },
            {
              text: "Real-time data synchronization and state management",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/steam6.png",
        "/images/steam7.png",
        "/images/steam8.png",
      ],
    },
  },
  {
    title: "Tiki Tours",
    description:
      "Trip planning app built with Next.js. Handles timelines, budgets, and activity tracking.",
    imgUrl: "/images/tiki1.png",
    repoUrl: "https://github.com/jsric/trippa",
    liveUrl: "https://tiki.tours",
    updatedAt: "2025-01-10",
    details: {
      title: "Tiki Tours",
      description:
        "Next.js app for organizing trips and tracking activities. Named after the NZ term for exploration.",
      technologies: [
        "Next.js 14",
        "TypeScript",
        "Three.js",
        "Tailwind CSS",
        "Framer Motion",
      ],
      features: [
        {
          title: "Timeline View",
          text: "Timeline for organizing trip activities. Uses drag-drop for quick rescheduling.",
        },
        {
          title: "Budget Tools",
          text: "Basic expense tracking with category breakdowns.",
        },
        {
          title: "Activity System",
          text: "Form-based activity creation with status tracking.",
        },
      ],
      challenges: [
        {
          title: "Timeline Logic",
          text: "Building a responsive timeline that handles overlapping activities and date changes.",
        },
        {
          title: "Data Structure",
          text: "Setting up trip data for efficient updates and filtering.",
        },
      ],
      learnings: [
        {
          title: "App Structure",
          points: [
            {
              text: "Next.js app router patterns",
            },
            {
              text: "TypeScript with complex data types",
            },
          ],
        },
        {
          title: "UI Patterns",
          points: [
            {
              text: "Timeline component optimization",
            },
            {
              text: "Form state management",
            },
          ],
        },
      ],
      additionalImages: ["/images/tiki2.png", "/images/tiki3.png"],
    },
  },
  {
    title: "Gift List",
    description:
      "Next.js gift management app with Supabase integration, featuring hierarchical group organization, CSV import capabilities, and real-time analytics. Implements secure auth, automated CRUD operations, and persistent storage.",
    imgUrl: "/images/gift1.png",
    repoUrl: "https://github.com/JayRichh/gift-list",
    liveUrl: "https://gifters.vercel.app",
    updatedAt: "2024-12-12",
    details: {
      title: "Gift List",
      description:
        "Next.js application with Supabase backend for gift tracking and analytics. Features secure authentication, CSV data import, and hierarchical group management with real-time visualization of spending patterns.",
      technologies: [
        "Next.js 15",
        "React 18",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Framer Motion",
        "Nivo Charts",
        "Zod",
      ],
      features: [
        {
          title: "Supabase Integration",
          text: "Full-featured authentication and database integration with row-level security. Implements secure data persistence and real-time updates across sessions.",
          image: "/images/gift3.png",
        },
        {
          title: "Data Management",
          text: "CSV import functionality supporting various formats, hierarchical group organization with descriptions, and automated CRUD operations with optimistic updates.",
          image: "/images/gift4.png",
        },
        {
          title: "Analytics Visualization",
          text: "Integration of Nivo charts with custom theming for gift distribution and spending patterns. Features responsive visualizations and budget analysis.",
          image: "/images/gift2.png",
        },
        {
          title: "Group Management",
          text: "Multi-level group system with TypeScript generics for type-safe calculations. Includes description fields and member management capabilities.",
        },
      ],
      challenges: [
        {
          title: "Data Integration",
          text: "Implementing robust CSV parsing with support for various formats while maintaining data integrity and type safety.",
        },
        {
          title: "State Management",
          text: "Optimizing real-time updates and state synchronization across components while maintaining consistent UI/UX.",
        },
        {
          title: "Performance",
          text: "Balancing responsive analytics with efficient data processing for large gift lists and group hierarchies.",
        },
      ],
      learnings: [
        {
          title: "Backend Integration",
          points: [
            {
              text: "Supabase authentication and database patterns with row-level security",
            },
            {
              text: "Efficient data synchronization and storage strategies",
            },
          ],
        },
        {
          title: "Data Processing",
          points: [
            {
              text: "CSV parsing and validation with error handling",
            },
            {
              text: "Type-safe data transformations with Zod schemas",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "React component optimization for real-time updates",
            },
            {
              text: "Efficient data transformation for analytics calculations",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "Checkpoint",
    description:
      "GitHub analytics dashboard built with Next.js 15, featuring interactive contribution visualizations, language distribution analysis, and detailed activity metrics",
    imgUrl: "/images/_com4.png",
    repoUrl: "https://https://github.com/JayRichh/checkpoint",
    liveUrl: "https://checkpoint-self.vercel.app/",
    updatedAt: "2024-12-01",
    details: {
      title: "Checkpoint - GitHub Analytics Platform",
      description:
        "A comprehensive GitHub analytics dashboard providing detailed insights into development activity, contribution patterns, and code distribution. Built with Next.js 15 and modern web technologies for optimal performance and interactivity.",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "GitHub GraphQL API",
        "Tailwind CSS",
        "Nivo Charts",
        "Authentication",
      ],
      features: [
        {
          title: "Contribution Analytics",
          text: "Interactive GitHub contribution calendar with detailed activity metrics, filtering capabilities, and year-based navigation. Features responsive design and real-time data updates.",
          image: "/images/_com2.png",
        },
        {
          title: "Language Distribution",
          text: "Advanced visualization of programming language usage across repositories, with detailed percentage breakdowns and interactive tooltips.",
        },
        {
          title: "Authentication System",
          text: "Secure GitHub OAuth integration with automatic token refresh and device flow support for seamless user authentication.",
        },
        {
          title: "Performance Optimization",
          text: "Implemented efficient data caching, lazy loading, and server-side rendering for optimal dashboard performance with large datasets.",
        },
      ],
      challenges: [
        {
          title: "API Rate Limiting",
          text: "Implementing efficient caching and request batching to handle GitHub API rate limits while maintaining data freshness.",
        },
        {
          title: "Data Visualization",
          text: "Creating responsive, interactive visualizations that handle varying amounts of contribution data and screen sizes.",
        },
        {
          title: "Authentication Flow",
          text: "Building a robust authentication system with token management and device flow support for various login scenarios.",
        },
      ],
      learnings: [
        {
          title: "API Integration",
          points: [
            {
              text: "Advanced GitHub API integration patterns and rate limit handling",
            },
            {
              text: "Efficient data fetching and caching strategies",
            },
          ],
        },
        {
          title: "Data Visualization",
          points: [
            {
              text: "Complex data visualization techniques with D3.js",
            },
            {
              text: "Interactive calendar and chart implementations",
            },
          ],
        },
        {
          title: "Authentication",
          points: [
            {
              text: "OAuth implementation with device flow support",
            },
            {
              text: "Secure token management and refresh strategies",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/_com2.png",
        "/images/_com3.png",
        "/images/_com4.png",
      ],
    },
  },
  {
    title: "DOMination (CSS Battle)",
    description:
      "A full-featured web app for recreating CSS battles. Test your Web Dev skills by replicating target designs using HTML/CSS, with real-time previews, scoring based on accuracy and code efficiency, and interactive comparison tools.",
    imgUrl: "/images/domination.png",
    repoUrl: "https://github.com/JayRichh/domination",
    liveUrl: "https://domination.vercel.app",
    updatedAt: "2024-11-28",
    details: {
      title: "CSS Battle - Web Development Challenge Platform",
      description:
        "A comprehensive platform for testing and improving CSS skills through creative challenges. Features include real-time preview, pixel-perfect comparison tools, and detailed scoring analytics.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Monaco Editor",
        "html2canvas",
      ],
      features: [
        {
          title: "Code Editor Integration",
          text: "Professional-grade Monaco editor with syntax highlighting, autocomplete, and real-time error detection. Includes custom CSS snippets and live validation.",
          image: "/images/editor.png",
        },
        {
          title: "Real-time Preview",
          text: "Instant visual feedback with split-screen preview showing your output alongside the target design. Features pixel-perfect comparison tools and difference highlighting.",
          image: "/images/compare.png",
        },
        {
          title: "Advanced Scoring System",
          text: "Sophisticated scoring algorithm considering both code efficiency and visual accuracy. Includes character count optimization and pixel-perfect matching with anti-aliasing tolerance.",
          image: "/images/stats.png",
        },
        {
          title: "Interactive Comparison",
          text: "Dynamic comparison slider with x-ray mode for precise visual debugging. Helps identify pixel-level differences between your solution and the target.",
          image: "/images/challenges.png",
        },
      ],
      challenges: [
        {
          title: "Visual Comparison Engine",
          text: "Implementing accurate pixel-by-pixel comparison with tolerance for anti-aliasing and browser rendering differences.",
        },
        {
          title: "Real-time Performance",
          text: "Optimizing preview updates and score calculations for smooth user experience with complex CSS.",
        },
        {
          title: "Code Analysis",
          text: "Developing efficient algorithms for analyzing and scoring CSS code while accounting for various optimization techniques.",
        },
      ],
      learnings: [
        {
          title: "Frontend Architecture",
          points: [
            {
              text: "Building scalable Next.js applications with TypeScript and modern React patterns",
            },
            {
              text: "Implementing efficient state management for real-time updates",
            },
          ],
        },
        {
          title: "Visual Processing",
          points: [
            {
              text: "Advanced image comparison techniques using canvas and pixel data",
            },
            {
              text: "Handling browser-specific rendering variations",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "Optimizing real-time preview and comparison operations",
            },
            {
              text: "Implementing efficient code analysis and scoring algorithms",
            },
          ],
        },
      ],
      additionalImages: ["/images/editor.png", "/images/domination.png"],
    },
  },
  {
    title: "Holiday House Map",
    description:
      "Interactive map visualization of holiday houses using Mapbox GL and custom UI components",
    imgUrl: "/images/map3.png",
    repoUrl: "https://codepen.io/JayRichh/pen/xxNRWpK",
    liveUrl: "https://codepen.io/JayRichh/full/xxNRWpK",
    updatedAt: "2024-11-17",
    details: {
      title: "Interactive Destination Map",
      description:
        "Global visualization tool for Omega's holiday properties. Built with Mapbox GL JS and custom components for location browsing.",
      technologies: [
        "Mapbox GL JS",
        "JavaScript",
        "Bootstrap",
        "CSS3",
        "HTML5",
        "jQuery",
      ],
      features: [
        {
          title: "Interactive Globe",
          text: "3D globe visualization with custom fog effects and satellite imagery. Includes smooth camera transitions and custom markers.",
          image: "/images/map2.png",
        },
        {
          title: "Location Browser",
          text: "Collapsible sidebar with country-based categorization. Features lazy-loaded images and responsive layout adaptation.",
          image: "/images/map1.png",
        },
        {
          title: "Custom Markers",
          text: "Dynamic markers using location images with custom popups. Implements error checking for coordinate validation.",
        },
        {
          title: "Responsive Design",
          text: "Adaptive layout with collapsible sidebar and dynamic map resizing. Uses CSS variables for consistent theming.",
        },
      ],
      challenges: [
        {
          title: "Map Performance",
          text: "Optimizing marker rendering and image loading for smooth globe interaction. Implemented lazy loading and marker clustering.",
        },
        {
          title: "Responsive Layout",
          text: "Managing map resizing and sidebar transitions across devices. Built custom resize handler for map reflow.",
        },
        {
          title: "Data Validation",
          text: "Implementing robust coordinate validation and error handling for location data. Added bounds checking and type validation.",
        },
      ],
      learnings: [
        {
          title: "Mapbox Integration",
          points: [
            {
              text: "Globe projection setup and custom fog configuration",
            },
            {
              text: "Custom marker implementation with image integration",
            },
          ],
        },
        {
          title: "UI Architecture",
          points: [
            {
              text: "Responsive sidebar design with dynamic content loading",
            },
            {
              text: "CSS variable system for consistent theming",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "Image lazy loading and marker clustering strategies",
            },
            {
              text: "Efficient DOM updates for location filtering",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "Off The Floor",
    description:
      "Simple business website built while learning Vue3 and TypeScript fundamentals",
    imgUrl: "/images/otf-vue1.png",
    repoUrl: "https://github.com/JayRichh/otf-vue",
    liveUrl: "http://otf-vue.vercel.app",
    updatedAt: "2024-01-25",
    details: {
      title: "Off The Floor - Vue Learning Project",
      description:
        "A basic business website for an aerial arts studio. Built to practice Vue3, TypeScript, and responsive design.",
      technologies: ["Vue3", "TypeScript", "Bootstrap", "Vue Router"],
      features: [
        {
          title: "Basic Routing",
          text: "Simple page navigation using Vue Router. First time implementing route guards and transitions.",
          image: "/images/otf-vue3.png",
        },
        {
          title: "Responsive Layout",
          text: "Basic responsive design using Bootstrap. Learning mobile-first approach.",
          image: "/images/otf-vue4.png",
        },
        {
          title: "Content Sections",
          text: "Simple content components using Vue3 composition API. Needs better component organization.",
          image: "/images/otf-vue1.png",
        },
        {
          title: "Image Sliders",
          text: "Basic image carousels using Vue3-carousel. Still working on performance with larger images.",
          image: "/images/otf-vue2.png",
        },
      ],
      challenges: [
        {
          title: "TypeScript Learning",
          text: "First time using TypeScript with Vue. Struggled with proper typing of props and events.",
        },
        {
          title: "Component Structure",
          text: "Learning to organize components effectively. Current structure needs improvement.",
        },
        {
          title: "Image Optimization",
          text: "Working on better image loading strategies. Current implementation is basic.",
        },
      ],
      learnings: [
        {
          title: "Vue3 Basics",
          points: [
            {
              text: "First project using Vue3 composition API",
            },
            {
              text: "Learning about reactive refs and computed properties",
            },
          ],
        },
        {
          title: "TypeScript Integration",
          points: [
            {
              text: "Basic TypeScript usage in Vue components",
            },
            {
              text: "Learning about interfaces and type definitions",
            },
          ],
        },
        {
          title: "CSS Framework Usage",
          points: [
            {
              text: "First time using Bootstrap with Vue",
            },
            {
              text: "Learning about responsive breakpoints and grid system",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/otf-vue1.png",
        "/images/otf-vue2.png",
        "/images/otf-vue3.png",
      ],
    },
  },
  {
    title: "Next.js Template",
    description:
      "A comprehensive Next.js template with UI components, 3D capabilities, and example implementations",
    imgUrl: "/images/temp1.png",
    liveUrl: "https://next-temploot.vercel.app/",
    repoUrl: "https://github.com/JayRichh/next-temploot",
    updatedAt: "2024-11-19",
    details: {
      title: "Modern Next.js Development Template",
      description:
        "A feature-rich Next.js template that combines modern web technologies, UI components, and 3D capabilities to provide a solid foundation for web applications",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "React",
      ],
      features: [
        {
          title: "UI Component Library",
          text: "Extensive collection of reusable UI components including Accordion, Badge, Button, Card, Modal, Progress, Select, Slider, Spinner, Tabs, Toast, and Tooltip",
          image: "/images/temp2.png",
        },
        {
          title: "3D Capabilities",
          text: "Integrated Three.js setup with example scenes, material examples, morph targets, and physics simulations",
          image: "/images/temp3.png",
        },
        {
          title: "Custom Hooks",
          text: "Utility hooks for animation controls, async operations, persistent state management, and resizable elements",
          image: "",
        },
        {
          title: "Example Implementations",
          text: "Comprehensive examples showcasing UI components, data handling, Next.js features, and 3D capabilities",
          image: "/images/temp4.png",
        },
      ],
      challenges: [
        {
          title: "Component Organization",
          text: "Structured UI components into logical categories: data-display, effects, feedback, inputs, layout, and overlay",
        },
        {
          title: "Type Safety",
          text: "Implemented comprehensive TypeScript types and interfaces for components, hooks, and services",
        },
        {
          title: "3D Integration",
          text: "Seamlessly integrated Three.js with Next.js, including scene management and component lifecycle handling",
        },
      ],
      learnings: [
        {
          title: "Next.js Architecture",
          points: [
            {
              text: "Organized project structure following Next.js 13+ app directory conventions",
            },
            {
              text: "Implemented efficient routing and layout management",
            },
          ],
        },
        {
          title: "Component Design",
          points: [
            {
              text: "Created modular and reusable UI components with consistent styling using Tailwind CSS",
            },
            {
              text: "Implemented accessible and responsive design patterns",
            },
          ],
        },
        {
          title: "3D Development",
          points: [
            {
              text: "Integrated Three.js scenes and components within the Next.js framework",
            },
            {
              text: "Developed example implementations for materials, morphing, and physics",
            },
          ],
        },
      ],
      additionalImages: ["/images/temp6.png"],
    },
  },
  {
    title: "Rack 'n' Bag",
    description:
      "Simple tournament tracker built while learning Next.js app router and TypeScript",
    imgUrl: "/images/corn-main.png",
    repoUrl: "https://github.com/JayRichh/rack-n-bag",
    liveUrl: "https://rack-n-bag.vercel.app",
    updatedAt: "2024-11-17",
    details: {
      title: "Rack 'n' Bag - Tournament Manager",
      description:
        "Basic tournament management tool for cornhole games. Built to learn state management and data visualization in Next.js.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Radix UI",
        "Local Storage",
      ],
      features: [
        {
          title: "Tournament Setup",
          text: "Basic tournament creation with customizable formats. Uses local storage for data persistence.",
          image: "/images/corn-settings.png",
        },
        {
          title: "Results Grid",
          text: "Simple match matrix showing game outcomes. Includes basic sorting and filtering.",
          image: "/images/corn-overview.png",
        },
        {
          title: "Player Stats",
          text: "Basic statistics tracking including wins, losses and points difference.",
          image: "/images/corn-stats.png",
        },
        {
          title: "Match Updates",
          text: "Real-time score entry and standings updates using React state management.",
          image: "/images/corn-matches.png",
        },
      ],
      challenges: [
        {
          title: "State Management",
          text: "Managing tournament data consistently across components. Implemented context-based state.",
        },
        {
          title: "Data Persistence",
          text: "Handling data storage and recovery with local storage. Added state migration handling.",
        },
        {
          title: "UI Updates",
          text: "Keeping all stats and standings in sync after score updates. Improved render optimization.",
        },
      ],
      learnings: [
        {
          title: "React Patterns",
          points: [
            {
              text: "State management with context and reducers",
            },
            {
              text: "Component optimization and render control",
            },
          ],
        },
        {
          title: "TypeScript Usage",
          points: [
            {
              text: "Type definitions for complex tournament data",
            },
            {
              text: "Generic components and utility types",
            },
          ],
        },
        {
          title: "UI Components",
          points: [
            {
              text: "Accessible component patterns with Radix UI",
            },
            {
              text: "Animation implementation with Framer Motion",
            },
          ],
        },
      ],
      additionalImages: ["/images/corn-logo.png", "/images/corn-mobile.png"],
    },
  },
  {
    title: "The Work Waka",
    description:
      "Job application and interview tracking platform with data visualization, built with Next.js and TypeScript. Features include calendar integration, dynamic forms, and Sankey diagram reports.",
    imgUrl: "/images/workwaka.png",
    repoUrl: "https://github.com/JayRichh/workwaka",
    liveUrl: "https://workwaka.vercel.app",
    updatedAt: "2024-11-10",
    details: {
      title: "The Work Waka - Job Application Tracker",
      description:
        "A streamlined platform for managing job applications and interviews, featuring local storage for data persistence and D3.js visualizations for insights.",
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "LocalStorage",
        "D3.js",
      ],
      features: [
        {
          title: "Responsive Job List",
          text: "Mobile-first job application management with advanced filtering, sorting, and search capabilities.",
          image: "",
        },
        {
          title: "Calendar Integration",
          text: "ICS file generation for events and interviews, enabling easy addition to any calendar app.",
          image: "",
        },
        {
          title: "Dynamic Forms",
          text: "Comprehensive forms for job applications, events, and interviews with real-time validation.",
          image: "",
        },
        {
          title: "Data Visualization",
          text: "Sankey diagrams and reports showing application flow and status transitions.",
          image: "",
        },
        {
          title: "Offline Capability",
          text: "Local storage integration for data persistence and offline access.",
          image: "",
        },
      ],
      challenges: [
        {
          title: "Data Management",
          text: "Implementing efficient local storage patterns for large datasets while maintaining performance.",
        },
        {
          title: "Complex Visualizations",
          text: "Creating interactive D3.js visualizations that work seamlessly with React and TypeScript.",
        },
        {
          title: "Form Architecture",
          text: "Designing a flexible form system that handles various data types and validation requirements.",
        },
      ],
      learnings: [
        {
          title: "State Management",
          points: [
            {
              text: "Efficient local storage patterns for data persistence.",
            },
            {
              text: "React context optimization for global state.",
            },
          ],
        },
        {
          title: "Data Visualization",
          points: [
            {
              text: "D3.js integration with React components.",
            },
            {
              text: "Complex data transformations for Sankey diagrams.",
            },
          ],
        },
        {
          title: "TypeScript Integration",
          points: [
            {
              text: "Type-safe component development.",
            },
            {
              text: "Advanced TypeScript patterns for form handling.",
            },
          ],
        },
      ],
      additionalImages: [
        "/logo_bg_remove.png",
        "/images/workwaka.png",
        "/images/moitsBoat.png",
      ],
    },
  },
  {
    title: "Restyled 2.0",
    description:
      "Wardrobe management app exploring AI integration and multi-tenant architecture",
    imgUrl: "/images/restyled1.png",
    repoUrl: "https://github.com/JayRichh/",
    liveUrl: "https://restyled.app",
    updatedAt: "2024-10-13",
    details: {
      title: "Restyled 2.0 - AI and Auth Learning Project",
      description:
        "Practice project combining Supabase Auth, AI integration, and payment processing. Focus on security patterns and multi-tenant architecture.",
      technologies: [
        "Next.js",
        "Supabase",
        "Lemon Squeezy",
        "TypeScript",
        "OpenAI API",
        "Tailwind CSS",
      ],
      features: [
        {
          title: "Auth System",
          text: "Supabase authentication with social logins and MFA. Focused on security patterns and session management.",
          image: "/images/restyled-logo.png",
        },
        {
          title: "Multi-tenant System",
          text: "Organization management using Supabase RLS policies. Implemented role-based access and data isolation.",
        },
        {
          title: "Subscription Handling",
          text: "Basic payment processing with Lemon Squeezy. Includes webhook handling and usage tracking.",
        },
        {
          title: "AI Integration",
          text: "Simple outfit visualization using Stable Diffusion. Implemented request queuing and basic caching.",
        },
      ],
      challenges: [
        {
          title: "Multi-tenant Data",
          text: "Building efficient data isolation while maintaining good query performance. Implemented row-level security.",
        },
        {
          title: "Payment Processing",
          text: "Managing subscription states and usage limits across organizations. Added webhook validation.",
        },
        {
          title: "AI Performance",
          text: "Balancing image quality with generation speed. Working on better request batching.",
        },
      ],
      learnings: [
        {
          title: "Auth Patterns",
          points: [
            {
              text: "Multi-tenant authentication patterns and security practices",
            },
            {
              text: "Session management and access control implementation",
            },
          ],
        },
        {
          title: "Database Design",
          points: [
            {
              text: "Efficient data modeling for multi-tenant applications",
            },
            {
              text: "Row-level security and query optimization",
            },
          ],
        },
        {
          title: "API Integration",
          points: [
            {
              text: "Payment provider integration and webhook handling",
            },
            {
              text: "AI service queuing and response caching",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/restyled1.png",
        "/images/restyled2.png",
        "/images/restyled3.png",
        "/images/restyled4.png",
      ],
    },
  },
  {
    title: "V2 - Audio Visualizer",
    description:
      "Basic audio visualization experiments built while learning Web Audio API and Vue3",
    imgUrl: "/images/v2.webp",
    repoUrl: "https://github.com/JayRichh/v-2",
    liveUrl: "",
    updatedAt: "2024-09-10",
    details: {
      title: "V2 - Audio Visualization Testing",
      description:
        "A learning project exploring Web Audio API fundamentals and real-time visualization techniques. Helped understand audio processing basics and Canvas rendering.",
      technologies: [
        "Vue3",
        "Web Audio API",
        "Canvas API",
        "TypeScript",
        "GLSL",
        "Ionic",
      ],
      features: [
        {
          title: "Basic Visualizations",
          text: "Simple frequency bars and waveform displays using Canvas. Includes basic color and shape variations.",
          image: "/images/test1.png",
        },
        {
          title: "Audio Processing",
          text: "Basic audio analysis using Web Audio API's analyzer node. Still learning optimal FFT sizes and smoothing.",
          image: "/images/test3.png",
        },
        {
          title: "Simple Controls",
          text: "Basic audio controls and visualization adjustments. First attempt at real-time parameter updates.",
          image: "/images/test2.png",
        },
      ],
      challenges: [
        {
          title: "Performance Issues",
          text: "Learning to handle audio processing and visualization without frame drops. Still needs optimization.",
        },
        {
          title: "Audio Timing",
          text: "Understanding audio buffering and synchronization. Lots of room for improvement.",
        },
        {
          title: "Browser Support",
          text: "Dealing with different browser implementations of Web Audio API. Currently only fully tested in Chrome.",
        },
      ],
      learnings: [
        {
          title: "Audio Processing",
          points: [
            {
              text: "Learned basics of digital audio processing and real-time analysis",
            },
            {
              text: "Started understanding FFT and frequency analysis concepts",
            },
          ],
        },
        {
          title: "Vue3 State Management",
          points: [
            {
              text: "First time using Vue3's Composition API for real-time updates",
            },
            {
              text: "Basic reactive state management for audio parameters",
            },
          ],
        },
        {
          title: "Canvas Performance",
          points: [
            {
              text: "Learning about efficient Canvas rendering and animation",
            },
            {
              text: "Basic understanding of requestAnimationFrame timing",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/test1.png",
        "/images/test2.png",
        "/images/test3.png",
      ],
    },
  },

  {
    title: "PomoDev",
    description:
      "A Pomodoro Timer Chrome Extension built with React, TypeScript, and Vite to help manage time effectively. Featuring customizable timers, task management, and theme options.",
    imgUrl: "/images/pomodev-logo.png",
    repoUrl: "https://github.com/JayRichh/pomodev",
    liveUrl: "",
    updatedAt: "2024-09-01",
    details: {
      title: "PomoDev - Pomodoro Timer Extension",
      description:
        "PomoDev is a Chrome extension designed to boost productivity using the Pomodoro Technique. It offers a customizable timer, task management, and theme customization, all built with modern web technologies.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "TailwindCSS",
        "Chrome Extension API",
        "Firefox Add-on API",
      ],
      features: [
        {
          title: "Customizable Pomodoro Timer",
          text: "Allows users to start, stop, and reset the timer. Time can be customized by clicking on the display.",
          image: "/images/pomodev-timer.png",
        },
        {
          title: "Task Management",
          text: "Users can add, complete, and delete tasks. All tasks persist in local storage for continuity across sessions.",
          image: "/images/pomodev-tasks.png",
        },
        {
          title: "Theme Customization",
          text: "Offers both light and dark themes to suit user preferences and reduce eye strain.",
          image: "/images/pomodev-themes.png",
        },
        {
          title: "Cross-Browser Compatibility",
          text: "Designed to work seamlessly on both Chrome and Firefox browsers.",
          image: "/images/pomodev-browsers.png",
        },
      ],
      challenges: [
        {
          title: "Browser Extension Development",
          text: "Adapting to the specific requirements and limitations of browser extension development, including manifest v3 for Chrome.",
        },
        {
          title: "Cross-Browser Compatibility",
          text: "Ensuring the extension works consistently across different browsers, particularly Chrome and Firefox.",
        },
        {
          title: "State Persistence",
          text: "Implementing persistent storage to maintain timer state and tasks across browser sessions.",
        },
      ],
      learnings: [
        {
          title: "Modern Web Development Stack",
          points: [
            {
              text: "Gained hands-on experience with React 18, TypeScript, and Vite for building efficient and type-safe applications.",
            },
            {
              text: "Learned to leverage TailwindCSS for rapid UI development and consistent styling.",
            },
          ],
        },
        {
          title: "Browser Extension Development",
          points: [
            {
              text: "Mastered the intricacies of developing extensions for Chrome and Firefox, including manifest differences and API usage.",
            },
            {
              text: "Implemented persistent storage solutions specific to browser extensions.",
            },
          ],
        },
        {
          title: "Project Structure and Build Process",
          points: [
            {
              text: "Developed a clean and maintainable project structure suitable for browser extension development.",
            },
            {
              text: "Set up an efficient build process using Vite, including custom plugins for Hot Module Replacement in extension context.",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/pomodev-overview.png",
        "/images/pomodev-settings.png",
        "/images/pomodev-mobile.png",
      ],
    },
  },
  {
    title: "DevMap",
    description:
      "Basic time tracking tool built while learning React hooks and charts. Helps track coding time and project progress.",
    imgUrl: "/images/devmap-logo.webp",
    repoUrl: "",
    liveUrl: "https://devmap.me",
    updatedAt: "2024-08-10",
    details: {
      title: "DevMap - Time Tracking Tool",
      description:
        "Simple development time tracker built to learn React and data visualization. Tracks time spent coding and basic project progress metrics.",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Recharts",
      ],
      features: [
        {
          title: "Time Logging",
          text: "Basic time tracking for coding sessions. Uses local storage with PostgreSQL backup. Still working on sync reliability.",
          image: "/images/devmap-time-tracking.png",
        },
        {
          title: "Project Lists",
          text: "Simple project and task organization with drag-drop sorting. Needs better state management.",
          image: "/images/devmap-project-management.png",
        },
        {
          title: "Progress Charts",
          text: "Basic charts showing time spent on different technologies. First attempt at using Recharts.",
          image: "/images/devmap-learning-progress.png",
        },
        {
          title: "Time Estimates",
          text: "Basic comparison of estimated vs actual time spent. Helps learn estimation skills.",
          image: "/images/devmap-estimation-insights.png",
        },
      ],
      challenges: [
        {
          title: "Data Syncing",
          text: "Learning to handle offline-first data with eventual server sync. Still working on conflict resolution.",
        },
        {
          title: "State Management",
          text: "First time managing complex state with React hooks. Needs refactoring for better organization.",
        },
        {
          title: "Performance",
          text: "Learning to optimize React renders with large datasets. Currently has issues with larger project lists.",
        },
      ],
      learnings: [
        {
          title: "React Patterns",
          points: [
            {
              text: "First deep dive into React hooks and context",
            },
            {
              text: "Learning about component optimization and memo usage",
            },
          ],
        },
        {
          title: "Data Visualization",
          points: [
            {
              text: "Basic usage of Recharts for time series data",
            },
            {
              text: "Learning about chart performance with live updates",
            },
          ],
        },
        {
          title: "Backend Integration",
          points: [
            {
              text: "First attempt at building a REST API with Express",
            },
            {
              text: "Basic PostgreSQL queries and relationships",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/devmap-dashboard.png",
        "/images/devmap-project-view.png",
        "/images/devmap-analytics.png",
      ],
    },
  },
  {
    title: "Axiom",
    description:
      "3D graphics and game dev testing environment built with Three.js",
    repoUrl: "https://github.com/JayRichh/axiom",
    imgUrl: "/images/axiom-1.png",
    liveUrl: "",
    updatedAt: "2024-11-15",
    details: {
      title: "Axiom - Dev Testing Ground",
      description:
        "Personal sandbox for experimenting with 3D graphics, shaders, and game mechanics",
      technologies: [
        "Next.js",
        "Three.js",
        "TypeScript",
        "GLSL",
        "WGSL",
        "React Three Fiber",
        "Rapier Physics",
        "Tailwind CSS",
      ],
      features: [
        {
          title: "Particles",
          text: "GPU-accelerated particle system with configurable emitters and custom shaders",
        },
        {
          title: "Weapons",
          text: "Test implementations of FPS mechanics including sights, scopes and effects",
        },
        {
          title: "Shaders",
          text: "Collection of custom GLSL/WGSL shaders for various visual effects",
        },
        {
          title: "Physics",
          text: "Basic player controller and physics interactions using Rapier",
        },
      ],
      challenges: [
        {
          title: "Performance",
          text: "Optimizing particle and shader systems for smooth framerates",
        },
        {
          title: "Physics",
          text: "Balancing physical accuracy with playable mechanics",
        },
        {
          title: "Shaders",
          text: "Cross-platform shader development and optimization",
        },
      ],
      learnings: [
        {
          title: "Graphics",
          points: [
            {
              text: "GPU particle systems and shader programming",
            },
            {
              text: "Real-time graphics and post-processing",
            },
          ],
        },
        {
          title: "Architecture",
          points: [
            {
              text: "Modular systems for weapons, particles and physics",
            },
            {
              text: "Game state management patterns",
            },
          ],
        },
        {
          title: "Optimization",
          points: [
            {
              text: "GPU-efficient rendering and physics",
            },
            {
              text: "Batched rendering and shader optimization",
            },
          ],
        },
      ],
      additionalImages: ["/images/axiom-2.png", "/images/axiom-3.png"],
    },
  },
  {
    title: "Aim Trainer",
    description:
      "A basic FPS training prototype built while learning Three.js and React",
    imgUrl: "/images/a11.png",
    repoUrl: "https://github.com/JayRichh/aimtrainer",
    liveUrl: "https://aimtrainer-zeta.vercel.app/",
    updatedAt: "2024-09-27",
    details: {
      title: "FPS Aim Trainer",
      description:
        "A simple aim training project I made to learn React and Three.js basics. It helped me understand 3D environments and basic game mechanics.",
      technologies: [
        "Next.js",
        "React",
        "Three.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      features: [
        {
          title: "Basic Weapon System",
          text: "Simple weapon mechanics including basic bullet behavior and fire rates. Still needs work on recoil patterns and accuracy.",
          image: "/images/a12.png",
        },
        {
          title: "Target Practice",
          text: "Basic static and moving targets to shoot at. Nothing fancy, just helps practice aim.",
          image: "/images/a1.png",
        },
        {
          title: "Player Movement",
          text: "Basic WASD controls with mouse look. Added simple jumping and crouching, though the physics need improvement.",
          image: "/images/a2.png",
        },
        {
          title: "Simple 3D Space",
          text: "Basic training area built with Three.js. Pretty bare-bones but works for practice.",
          image: "/images/a3.png",
        },
        {
          title: "Score Tracking",
          text: "Basic hit/miss counter and timer. Shows you how you did after each session.",
        },
        {
          title: "Basic Settings",
          text: "Added some simple options like mouse sensitivity and graphics quality toggles.",
        },
        {
          title: "Basic UI",
          text: "Simple menu system and in-game HUD. Nothing special, just the essentials.",
        },
      ],
      challenges: [
        {
          title: "Performance Issues",
          text: "Struggled with keeping framerates stable while learning Three.js optimization basics.",
        },
        {
          title: "Basic Physics",
          text: "Implementing even simple bullet and movement mechanics was trickier than expected.",
        },
        {
          title: "React State",
          text: "Learning to manage game state in React without everything breaking was challenging.",
        },
        {
          title: "UI Design",
          text: "First attempt at combining 3D gameplay with basic UI elements - lots of room for improvement.",
        },
      ],
      learnings: [
        {
          title: "3D Basics",
          points: [
            {
              text: "First time using Three.js with React - learned basic 3D rendering concepts.",
            },
            {
              text: "Started understanding 3D math and camera controls, though still lots to learn.",
            },
            {
              text: "Learned about basic performance optimization the hard way.",
            },
          ],
        },
        {
          title: "Game Dev Fundamentals",
          points: [
            {
              text: "Got my hands dirty with basic game loops and collision detection.",
            },
            {
              text: "Implemented simple shooting mechanics - needs refinement but works.",
            },
          ],
        },
        {
          title: "Performance",
          points: [
            {
              text: "Learned some basic React and Three.js optimization techniques.",
            },
            {
              text: "Started using dev tools to find major performance issues.",
            },
          ],
        },
        {
          title: "Code Structure",
          points: [
            {
              text: "Attempted to keep code organized, though it needs cleanup.",
            },
            {
              text: "Made some reusable components, but could be more efficient.",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/a11.png",
        "/images/a12.png",
        "/images/a7.png",
        "/images/a6.png",
        "/images/a5.png",
      ],
    },
  },

  {
    title: "AF Buddy",
    description:
      "Chrome DevTools extension for Appframe development. Built with Vue3 and Monaco editor.",
    imgUrl: "/images/afbuddy2.png",
    repoUrl: "https://github.com/JayRichh/afbuddy",
    updatedAt: "2023-09-14",
    liveUrl: "",
    details: {
      title: "AF Buddy - Appframe Dev Toolkit",
      description:
        "Chrome extension providing development tools for Appframe web development. Built with Vue3, TypeScript, and Chrome Extension APIs.",
      technologies: [
        "Vue3",
        "TypeScript",
        "Monaco Editor",
        "Chrome APIs",
        "GSAP",
        "Vuex",
        "Parcel",
      ],
      features: [
        {
          title: "Code Management",
          text: "Monaco-based code editor with theme support and auto-formatting. Includes snippet saving and history tracking.",
          image: "/images/afbuddy2.png",
        },
        {
          title: "Tab Management",
          text: "Chrome tab control with configurable limits and auto-close features. Supports tab exclusion and custom filters.",
          image: "/images/afbuddy4.png",
        },
        {
          title: "Development Tools",
          text: "Geolocation spoofing, user agent switching, and JSON editing with Monaco integration.",
          image: "/images/afbuddy7.png",
        },
        {
          title: "UI Customization",
          text: "Theme switching with 50+ Monaco themes, custom layouts, and font selection. GSAP-powered animations.",
          image: "/images/afbuddy5.png",
        },
      ],
      challenges: [
        {
          title: "Extension Architecture",
          text: "Building multi-context extension with background scripts, content scripts, and devtools integration.",
        },
        {
          title: "Build Process",
          text: "Setting up Parcel bundling for multiple extension entry points while maintaining hot reload.",
        },
        {
          title: "Editor Integration",
          text: "Integrating Monaco editor with Vue components and handling theme/font dynamic loading.",
        },
      ],
      learnings: [
        {
          title: "Extension Development",
          points: [
            {
              text: "Chrome extension architecture and messaging systems",
            },
            {
              text: "DevTools panel integration and debugging protocols",
            },
          ],
        },
        {
          title: "Vue Patterns",
          points: [
            {
              text: "Vuex store management across extension contexts",
            },
            {
              text: "Component organization with lazy loading",
            },
          ],
        },
        {
          title: "Build Systems",
          points: [
            {
              text: "Multi-target Parcel configuration for extension builds",
            },
            {
              text: "Hot module replacement in extension context",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/afbuddy1.png",
        "/images/afbuddy3.png",
        "/images/afbuddy4.png",
      ],
    },
  },

  {
    title: "Chat with DALL-E",
    description:
      "Chat app with image generation features. Built to explore OpenAI's API and real-time messaging.",
    imgUrl: "/images/chat1.png",
    repoUrl: "https://github.com/JayRichh/chat",
    liveUrl: "https://jaychat.onrender.com/",
    updatedAt: "2023-07-15",
    details: {
      title: "Chat + DALL-E Integration",
      description:
        "Real-time chat application with integrated image generation. Explores WebSocket communication and OpenAI API integration.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "OpenAI API",
        "WebSocket",
        "Styled-Components",
      ],
      features: [
        {
          title: "Real-time Chat",
          text: "WebSocket-based messaging with typing indicators and presence tracking.",
          image: "/images/chat2.png",
        },
        {
          title: "Image Generation",
          text: "Text-to-image generation using DALL-E API with prompt optimization.",
          image: "/images/chat1.png",
        },
        {
          title: "Image Editing",
          text: "Basic image manipulation using DALL-E's edit and variation endpoints.",
          image: "/images/chat3.png",
        },
        {
          title: "Message History",
          text: "Local storage-based chat history with image context preservation.",
          image: "/images/chat4.png",
        },
      ],
      challenges: [
        {
          title: "API Management",
          text: "Handling rate limits and costs while maintaining responsive image generation.",
        },
        {
          title: "Real-time Sync",
          text: "Syncing message and image states across multiple clients reliably.",
        },
        {
          title: "Error Handling",
          text: "Graceful handling of API failures and network issues during generation.",
        },
      ],
      learnings: [
        {
          title: "WebSocket Implementation",
          points: [
            {
              text: "Real-time communication patterns and state synchronization",
            },
            {
              text: "Connection management and reconnection strategies",
            },
          ],
        },
        {
          title: "AI Integration",
          points: [
            {
              text: "OpenAI API usage patterns and error handling",
            },
            {
              text: "Image generation optimization and prompt engineering",
            },
          ],
        },
        {
          title: "UX Patterns",
          points: [
            {
              text: "Loading state management for async operations",
            },
            {
              text: "Error feedback and recovery flows",
            },
          ],
        },
      ],
      additionalImages: ["/images/chat1.png", "/images/chat2.png"],
    },
  },
  {
    title: "The Odin Project",
    description:
      "Collection of learning projects completed through The Odin Project's full-stack curriculum. From basic HTML to full-stack applications.",
    imgUrl: "/images/top10.png",
    repoUrl: "https://github.com/JayRichh/the-odin-project",
    liveUrl: "",
    updatedAt: "2023-01-01",
    details: {
      title: "The Odin Project - Learning Journey",
      description:
        "Projects and exercises completed while working through TOP's curriculum. Progressed from basic web fundamentals to full-stack development using JavaScript and Ruby.",
      technologies: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Ruby",
        "Rails",
        "SQL",
        "Git",
        "Jest",
        "Webpack",
      ],
      features: [
        {
          title: "Foundations Projects",
          text: "First HTML/CSS projects including recipes site, landing page, and rock-paper-scissors. Learned flexbox, grid, and basic DOM manipulation.",
          image: "/images/top3.png",
        },
        {
          title: "JavaScript Basics",
          text: "Built calculator, etch-a-sketch, and basic library app. Learned core JS concepts like closures, prototypes, and event handling.",
          image: "/images/project-img5.png",
        },
        {
          title: "Advanced JavaScript",
          text: "Todo list, restaurant page, and weather app. Focused on modules, async/await, APIs, and local storage.",
          image: "/images/project-img4.png",
        },
        {
          title: "React Journey",
          text: "CV application, memory game, and shopping cart. Learning React hooks, state management, and component lifecycle.",
          image: "/images/project-img10.png",
        },
        {
          title: "Backend Basics",
          text: "Basic Express and Node.js projects including message board and inventory app. First steps with servers and databases.",
          image: "/images/top9.png",
        },
      ],
      challenges: [
        {
          title: "Learning Curve",
          text: "Transitioning from HTML/CSS to JavaScript was challenging. Struggled particularly with asynchronous programming concepts.",
        },
        {
          title: "Git Workflow",
          text: "Learning proper Git workflow was difficult. Made many mistakes with branching and merging before understanding proper practices.",
        },
        {
          title: "Testing Implementation",
          text: "First exposure to testing with Jest was confusing. Still working on writing better test coverage.",
        },
      ],
      learnings: [
        {
          title: "Web Fundamentals",
          points: [
            {
              text: "HTML semantics and accessibility best practices",
            },
            {
              text: "CSS flexbox, grid, and responsive design principles",
            },
            {
              text: "Browser dev tools and debugging techniques",
            },
          ],
        },
        {
          title: "JavaScript Core",
          points: [
            {
              text: "ES6+ features including arrow functions, destructuring, and modules",
            },
            {
              text: "Asynchronous programming with promises and async/await",
            },
            {
              text: "DOM manipulation and event handling patterns",
            },
          ],
        },
        {
          title: "React Framework",
          points: [
            {
              text: "Component-based architecture and JSX syntax",
            },
            {
              text: "Hooks system including useState, useEffect, and custom hooks",
            },
            {
              text: "React Router and basic state management",
            },
          ],
        },
        {
          title: "Backend Development",
          points: [
            {
              text: "Node.js and Express server basics",
            },
            {
              text: "RESTful API design principles",
            },
            {
              text: "Basic database operations with MongoDB",
            },
          ],
        },
        {
          title: "Development Practices",
          points: [
            {
              text: "Git version control and GitHub collaboration",
            },
            {
              text: "Test-driven development basics with Jest",
            },
            {
              text: "Webpack configuration and build processes",
            },
          ],
        },
        {
          title: "Computer Science",
          points: [
            {
              text: "Basic data structures and algorithms",
            },
            {
              text: "Time complexity and code optimization",
            },
            {
              text: "Clean code principles and documentation",
            },
          ],
        },
        {
          title: "Project Planning",
          points: [
            {
              text: "Breaking down projects into manageable tasks",
            },
            {
              text: "Using design patterns for better code organization",
            },
            {
              text: "Reading documentation and solving problems independently",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/top8.png",
        "/images/top7.png",
        "/images/project-img4.png",
      ],
    },
  },
  {
    title: "CodePens",
    description:
      "A collection of interactive and visually captivating sketches created with p5.js and three.js. These sketches explore mathematical patterns, physics simulations, and interactive elements.",
    imgUrl: "/images/fib.png",
    repoUrl: "https://codepen.io/jayrichh",
    liveUrl: "https://codepen.io/JayRichh/pen/QWRvEQd",
    updatedAt: "2024-11-01",
    details: {
      title: "CodePen Visualizations",
      description:
        "A series of CodePen projects showcasing interactive visualizations and animations using p5.js and three.js.",
      technologies: ["p5.js", "three.js", "JavaScript", "WebGL"],
      features: [
        {
          title: "Fibonacci Spiral",
          text: "A mesmerizing visual representation of a Fibonacci spiral in a galaxy-like formation. Includes adjustable parameters for node size, distance, color, and zoom speed.",
          image: "/images/path/to/fib_spiral_image.png",
        },
        {
          title: "Matrix Rainfall Effect",
          text: "An animated Matrix-style rainfall effect with customizable parameters including character density, replacement probability, color, and font.",
          image: "/images/path/to/matrix_rainfall_image.png",
        },
        {
          title: "Plane Curves Visualization",
          text: "Interactive visualization of various plane curves including Hypotrochoid, Epitrochoid, Lissajous, Rose Curve, and Spirograph. Customize parameters like radii, frequencies, and number of circles, with real-time updates through a GUI.",
          image: "/images/path/to/plane_curves_image.png",
        },
        {
          title: "Third Person Controls",
          text: "An example of third-person controls in the three.js JavaScript library, featuring a 3D model that can be controlled interactively.",
          image: "/images/path/to/third_person_controls_image.png",
        },
        {
          title: "Interactive Map Visualization",
          text: "An interactive map visualization of Omega 365 Advantage holiday house locations worldwide, using jQuery, Bootstrap, and WebGL Earth.",
          image: "/images/path/to/interactive_map_image.png",
        },
        {
          title: "Coulomb’s Law Simulation",
          text: "A Coulomb’s law simulation that visualizes the forces between charged particles. Includes features like teleportation, bounds enforcement, and various physics principles.",
          image: "/images/path/to/coulombs_law_image.png",
        },
      ],
      challenges: [
        {
          title: "Performance Optimization",
          text: "Ensuring smooth performance for interactive and computationally intensive sketches, particularly when rendering large numbers of particles or complex animations.",
        },
        {
          title: "Cross-Browser Compatibility",
          text: "Ensuring that all visualizations work consistently across different browsers and devices.",
        },
        {
          title: "Dynamic Parameter Adjustments",
          text: "Implementing real-time parameter adjustments via GUI without causing performance degradation or crashes.",
        },
      ],
      learnings: [
        {
          title: "Advanced p5.js Techniques",
          points: [
            {
              text: "Learned to create complex and interactive visualizations using p5.js, leveraging its capabilities for real-time graphics and animations.",
            },
            {
              text: "Gained expertise in handling user inputs and dynamically adjusting visualization parameters.",
            },
          ],
        },
        {
          title: "Three.js and 3D Graphics",
          points: [
            {
              text: "Developed skills in three.js for creating 3D graphics and animations, including implementing controls and physics simulations.",
            },
            {
              text: "Learned to optimize 3D scenes for performance and responsiveness.",
            },
          ],
        },
        {
          title: "Interactive GUI Implementation",
          points: [
            {
              text: "Gained experience in integrating interactive GUI elements for real-time parameter adjustments using libraries like dat.GUI.",
            },
          ],
        },
      ],
      additionalImages: [
        // '/images/fib_spiral_image.png',
        // '/images/matrix_rainfall_image.png',
        // '/images/plane_curves_image.png',
        // '/images/third_person_controls_image.png',
        // '/images/interactive_map_image.png',
        // '/images/coulombs_law_image.png',
      ],
    },
  },

  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with Next.js 15, featuring interactive mindmap visualization and dynamic project Works",
    imgUrl: "/images/main1.png",
    repoUrl: "https://github.com/JayRichh/portfolio",
    liveUrl: "https://jayrich.dev",
    updatedAt: "2024-11-18",
    details: {
      title: "Portfolio Website",
      description:
        "Modern portfolio site showcasing development journey through interactive visualizations. Built with Next.js 15 app router and server components, featuring D3-based mindmap, dynamic filtering, and responsive design.",
      technologies: [
        "Next.js 15",
        "React 18",
        "TypeScript",
        "D3.js",
        "Framer Motion",
        "Radix UI",
        "Tailwind CSS",
        "Vercel Analytics",
      ],
      features: [
        {
          title: "Interactive Learning Mindmap",
          text: "D3-based force-directed graph visualizing web development concepts and their relationships. Features dynamic node positioning, zoom interactions, and responsive layout.",
          image: "/images/main2.png",
        },
        {
          title: "Project Work",
          text: "Dynamic project grid with technology-based filtering and detailed modal views. Uses Radix UI primitives with Framer Motion animations for smooth transitions.",
          image: "/images/main3.png",
        },
        {
          title: "Advanced Image Handling",
          text: "Custom image lightbox with keyboard navigation and touch support. Implements progressive loading, blur placeholders, and fallback states.",
          image: "/images/main4.png",
        },
        {
          title: "Responsive Design",
          text: "Mobile-first approach using Tailwind CSS with dynamic layouts and optimized interactions. Includes dark mode support and system preference detection.",
          image: "/images/main1.png",
        },
      ],
      challenges: [
        {
          title: "D3 Integration",
          text: "Implementing complex force-directed graph with React while maintaining smooth performance. Required careful state management and render optimization.",
        },
        {
          title: "Type Safety",
          text: "Maintaining strict TypeScript types across components, especially for project data structures and D3 visualization props.",
        },
        {
          title: "Performance Optimization",
          text: "Balancing rich interactions with performance, particularly for the mindmap visualization and image galleries. Implemented code splitting and lazy loading.",
        },
      ],
      learnings: [
        {
          title: "Data Visualization",
          points: [
            {
              text: "D3.js integration with React for complex interactive visualizations",
            },
            {
              text: "Force-directed graph algorithms and physics simulations",
            },
          ],
        },
        {
          title: "Modern React Patterns",
          points: [
            {
              text: "Server and client component architecture with Next.js 15",
            },
            {
              text: "Advanced animation patterns using Framer Motion",
            },
          ],
        },
        {
          title: "Component Design",
          points: [
            {
              text: "Building accessible components with Radix UI primitives",
            },
            {
              text: "Implementing compound components for complex features",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/main1.png",
        "/images/main2.png",
        "/images/main3.png",
        "/images/main4.png",
      ],
    },
  },
];
