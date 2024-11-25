interface LearningNode {
    id: string;
    title: string;
    description: string;
    group: string;
    importance: number;
  }
  
  interface Relation {
    source: string;
    target: string;
  }
  
  export const learnings: LearningNode[] = [

    // Languages and Programming Skills
    {
      id: "1",
      title: "JavaScript Mastery",
      description:
        "Advanced programming with JavaScript, including ES6+ features.",
      group: "language",
      importance: 5,
    },
    {
      id: "2",
      title: "TypeScript Integration",
      description:
        "Implementing type safety in JavaScript projects using TypeScript.",
      group: "language",
      importance: 5,
    },
    {
      id: "3",
      title: "SQL (T-SQL) Proficiency",
      description:
        "Writing complex SQL queries for data manipulation and retrieval.",
      group: "language",
      importance: 4,
    },
    {
      id: "4",
      title: "HTML5 and CSS3",
      description: "Building structured and styled web content.",
      group: "language",
      importance: 5,
    },
    {
      id: "5",
      title: "Sass Preprocessing",
      description: "Enhancing CSS with variables, mixins, and nesting.",
      group: "tool",
      importance: 4,
    },
  
    // Front-End Frameworks and Libraries
    {
      id: "6",
      title: "React Development",
      description: "Building dynamic user interfaces with React.",
      group: "framework",
      importance: 5,
    },
    {
      id: "7",
      title: "Vue.js Migration and Development",
      description:
        "Leading migration to Vue.js with code splitting and lazy loading.",
      group: "framework",
      importance: 5,
    },
    {
      id: "8",
      title: "Next.js for SSR and SSG",
      description:
        "Utilizing Next.js for server-side rendering and static site generation.",
      group: "framework",
      importance: 4,
    },
    {
      id: "9",
      title: "Tailwind CSS",
      description: "Rapid UI development using a utility-first CSS framework.",
      group: "tool",
      importance: 5,
    },
    {
      id: "10",
      title: "Bootstrap Grid System",
      description: "Implementing responsive layouts with Bootstrap.",
      group: "tool",
      importance: 4,
    },
    {
      id: "11",
      title: "Ionic Framework",
      description: "Developing hybrid mobile applications.",
      group: "framework",
      importance: 3,
    },
    {
      id: "12",
      title: "Three.js for 3D Graphics",
      description: "Creating 3D visuals and interactions in web applications.",
      group: "tool",
      importance: 4,
    },
    {
      id: "13",
      title: "p5.js for Creative Coding",
      description: "Developing interactive visuals and art projects.",
      group: "tool",
      importance: 3,
    },
    {
      id: "14",
      title: "Framer Motion and GSAP",
      description: "Implementing animations and transitions.",
      group: "tool",
      importance: 4,
    },
  
    // Back-End Development
    {
      id: "15",
      title: "Node.js and Express.js",
      description: "Building scalable server-side applications and APIs.",
      group: "framework",
      importance: 5,
    },
    {
      id: "16",
      title: "Supabase Integration",
      description:
        "Implementing Supabase for real-time CRUD operations and authentication.",
      group: "tool",
      importance: 4,
    },
    {
      id: "17",
      title: "Stripe API for Payments",
      description: "Integrating secure payment processing with Stripe.",
      group: "tool",
      importance: 3,
    },
  
    // Software Development Practices
    {
      id: "18",
      title: "Code Splitting and Lazy Loading",
      description: "Optimizing performance by loading code on demand.",
      group: "concept",
      importance: 5,
    },
    {
      id: "19",
      title: "Custom State Management",
      description: "Designing state management solutions in Vue.js applications.",
      group: "concept",
      importance: 5,
    },
    {
      id: "20",
      title: "Performance Optimization",
      description: "Profiling apps to reduce load times and network requests.",
      group: "concept",
      importance: 5,
    },
    {
      id: "21",
      title: "Modular Component Architecture",
      description: "Architecting reusable components for scalability.",
      group: "concept",
      importance: 5,
    },
    {
      id: "22",
      title: "Responsive Design",
      description: "Ensuring applications are responsive across devices.",
      group: "concept",
      importance: 5,
    },
    {
      id: "23",
      title: "Cross-Browser Optimization",
      description: "Maintaining consistent UI across browsers.",
      group: "concept",
      importance: 4,
    },
    {
      id: "24",
      title: "Accessibility Standards",
      description: "Adhering to accessibility guidelines in web apps.",
      group: "concept",
      importance: 4,
    },
    {
      id: "25",
      title: "Real-Time Data Visualization",
      description: "Creating dashboards with DevExpress and Highcharts.",
      group: "tool",
      importance: 4,
    },
    {
      id: "26",
      title: "Data Aggregation Techniques",
      description: "Efficiently aggregating data for reports.",
      group: "concept",
      importance: 4,
    },
    {
      id: "27",
      title: "Debugging and Problem Solving",
      description: "Resolving technical challenges efficiently.",
      group: "activity",
      importance: 5,
    },
  
    // UI/UX Design
    {
      id: "28",
      title: "Modern UI/UX Principles",
      description: "Implementing contemporary design practices.",
      group: "concept",
      importance: 5,
    },
    {
      id: "29",
      title: "Brand Identity Development",
      description: "Crafting brand identity through design.",
      group: "concept",
      importance: 3,
    },
    {
      id: "30",
      title: "Engaging Layout Design",
      description: "Designing layouts to enhance user engagement.",
      group: "concept",
      importance: 4,
    },
    {
      id: "31",
      title: "Responsive Image Galleries",
      description: "Implementing image galleries for visual appeal.",
      group: "feature",
      importance: 3,
    },
    {
      id: "32",
      title: "Interactive Map Visualizations",
      description: "Utilizing Mapbox GL for route visualization.",
      group: "tool",
      importance: 3,
    },
  
    // Project-Specific Learnings
    {
      id: "33",
      title: "WorkWaka Application",
      description: "Building a job tracking app with Next.js and Tailwind.",
      group: "project",
      importance: 5,
    },
    {
      id: "34",
      title: "Implementing Sankey Charts",
      description: "Visualizing data flows using Sankey diagrams.",
      group: "concept",
      importance: 3,
    },
    {
      id: "35",
      title: "Calendar Integration",
      description: "Embedding calendars for event management.",
      group: "feature",
      importance: 4,
    },
    {
      id: "36",
      title: "Dark Mode Implementation",
      description: "Adding theme support for dark mode.",
      group: "feature",
      importance: 3,
    },
    {
      id: "37",
      title: "Encompass Travel App",
      description: "Developing a travel app with Vue.js and Supabase.",
      group: "project",
      importance: 5,
    },
    {
      id: "38",
      title: "Tour Management System",
      description: "Implementing CRUD operations for tours.",
      group: "feature",
      importance: 4,
    },
    {
      id: "39",
      title: "Role-Based Authentication",
      description: "Securing apps with role-based access control.",
      group: "concept",
      importance: 4,
    },
    {
      id: "40",
      title: "Dynamic Content Updates",
      description: "Enabling real-time content updates.",
      group: "feature",
      importance: 3,
    },
    {
      id: "41",
      title: "Portfolio Website Development",
      description: "Creating a personal site with Next.js.",
      group: "project",
      importance: 4,
    },
    {
      id: "42",
      title: "OpenAI API Integration",
      description: "Incorporating AI features using OpenAI API.",
      group: "tool",
      importance: 3,
    },
    {
      id: "43",
      title: "Chrome Extension Development",
      description: "Building extensions with Chrome APIs.",
      group: "tool",
      importance: 3,
    },
    {
      id: "44",
      title: "Web Audio API Usage",
      description: "Implementing audio features in web apps.",
      group: "tool",
      importance: 2,
    },
    {
      id: "45",
      title: "Deployment with Vercel",
      description: "Deploying applications using Vercel.",
      group: "tool",
      importance: 4,
    },
    {
      id: "46",
      title: "WebGL and 3D Graphics",
      description: "Leveraging WebGL for advanced graphics.",
      group: "concept",
      importance: 4,
    },
  
    // Tools and Technologies
    {
      id: "47",
      title: "Git Version Control",
      description: "Using Git for source code management.",
      group: "tool",
      importance: 5,
    },
    {
      id: "48",
      title: "Webpack Configuration",
      description: "Optimizing builds with Webpack.",
      group: "tool",
      importance: 4,
    },
    {
      id: "49",
      title: "Agile Methodologies",
      description: "Applying Agile practices in development.",
      group: "concept",
      importance: 5,
    },
    {
      id: "50",
      title: "Team Collaboration",
      description: "Working effectively within a team.",
      group: "activity",
      importance: 5,
    },
    {
      id: "51",
      title: "Client Communication",
      description: "Managing client interactions and feedback.",
      group: "activity",
      importance: 5,
    },
  
    // Software Architecture and Design
    {
      id: "52",
      title: "Modular Architecture",
      description: "Designing scalable and maintainable code structures.",
      group: "concept",
      importance: 5,
    },
    {
      id: "53",
      title: "State Management Libraries",
      description: "Using Vuex and Redux for state management.",
      group: "tool",
      importance: 4,
    },
    {
      id: "54",
      title: "Server-Side Rendering (SSR)",
      description: "Implementing SSR for performance and SEO.",
      group: "concept",
      importance: 4,
    },
    {
      id: "55",
      title: "Static Site Generation (SSG)",
      description: "Generating static pages at build time.",
      group: "concept",
      importance: 4,
    },
    {
      id: "56",
      title: "Client-Side Caching Strategies",
      description: "Improving performance with caching.",
      group: "concept",
      importance: 4,
    },
  
    // Testing and Quality Assurance
    {
      id: "57",
      title: "Unit Testing and TDD",
      description: "Writing tests and following TDD practices.",
      group: "concept",
      importance: 4,
    },
    {
      id: "58",
      title: "Continuous Integration/Deployment",
      description: "Implementing CI/CD pipelines.",
      group: "concept",
      importance: 4,
    },
    {
      id: "59",
      title: "Linting and Code Formatting",
      description: "Maintaining code quality with ESLint and Prettier.",
      group: "tool",
      importance: 4,
    },
    {
      id: "60",
      title: "Error Handling and Logging",
      description: "Implementing robust error handling.",
      group: "concept",
      importance: 5,
    },
  
    // Additional Technical Skills
    {
      id: "61",
      title: "Mapbox GL Integration",
      description: "Adding interactive maps to applications.",
      group: "tool",
      importance: 3,
    },
    {
      id: "62",
      title: "Lodash Utility Library",
      description: "Using Lodash for data manipulation.",
      group: "tool",
      importance: 3,
    },
    {
      id: "63",
      title: "Highcharts Implementation",
      description: "Creating complex charts with Highcharts.",
      group: "tool",
      importance: 3,
    },
    {
      id: "64",
      title: "DevExpress Usage",
      description: "Building UI components with DevExpress.",
      group: "tool",
      importance: 3,
    },
    {
      id: "65",
      title: "Chrome DevTools Profiling",
      description: "Optimizing performance using DevTools.",
      group: "tool",
      importance: 4,
    },
  
    // Security and Compliance
    {
      id: "66",
      title: "Data Security and Compliance",
      description: "Ensuring applications meet security standards.",
      group: "concept",
      importance: 5,
    },
    {
      id: "67",
      title: "OAuth and OpenID Connect",
      description: "Implementing third-party authentication.",
      group: "concept",
      importance: 3,
    },
    {
      id: "68",
      title: "Payment Gateway Integration",
      description: "Adding payment processing capabilities.",
      group: "tool",
      importance: 3,
    },
  
    // DevOps and Deployment
    {
      id: "69",
      title: "Docker Containerization",
      description: "Using Docker for consistent environments.",
      group: "tool",
      importance: 3,
    },
    {
      id: "70",
      title: "Cloud Services Deployment",
      description: "Deploying applications to cloud platforms.",
      group: "tool",
      importance: 3,
    },
    {
      id: "71",
      title: "Continuous Performance Monitoring",
      description: "Tracking app performance over time.",
      group: "concept",
      importance: 3,
    },
  
    // Professional Development
    {
      id: "72",
      title: "Project Management Tools",
      description: "Using Jira and Trello for task management.",
      group: "tool",
      importance: 4,
    },
    {
      id: "73",
      title: "Time Management Techniques",
      description: "Improving productivity through effective time management.",
      group: "activity",
      importance: 5,
    },
    {
      id: "74",
      title: "Soft Skills Development",
      description: "Enhancing communication and teamwork.",
      group: "activity",
      importance: 5,
    },
    {
      id: "75",
      title: "Continuous Learning",
      description: "Keeping skills up-to-date with new technologies.",
      group: "activity",
      importance: 5,
    },
  
    // Additional Learnings
    {
      id: "76",
      title: "Error Tracking Tools",
      description: "Integrating tools like Sentry.",
      group: "tool",
      importance: 3,
    },
    {
      id: "77",
      title: "Data Visualization Techniques",
      description: "Presenting data effectively.",
      group: "concept",
      importance: 4,
    },
    {
      id: "78",
      title: "Progressive Web Apps (PWA)",
      description: "Creating apps with PWA capabilities.",
      group: "concept",
      importance: 3,
    },
    {
      id: "79",
      title: "Microservices Architecture",
      description: "Understanding microservices implementation.",
      group: "concept",
      importance: 3,
    },
    {
      id: "80",
      title: "Event-Driven Programming",
      description: "Implementing event-driven architectures.",
      group: "concept",
      importance: 3,
    },
    {
      id: "81",
      title: "Localization and Internationalization",
      description: "Preparing apps for multiple languages.",
      group: "concept",
      importance: 2,
    },
    {
      id: "82",
      title: "Mentoring and Training",
      description: "Guiding junior developers.",
      group: "activity",
      importance: 3,
    },
    {
      id: "83",
      title: "Public Speaking and Presentations",
      description: "Presenting technical concepts.",
      group: "activity",
      importance: 3,
    },
    {
      id: "84",
      title: "Open Source Contribution",
      description: "Contributing to community projects.",
      group: "activity",
      importance: 3,
    },
    {
      id: "85",
      title: "Design Systems",
      description: "Building design systems for consistency.",
      group: "concept",
      importance: 4,
    },
    {
      id: "86",
      title: "Webpack Optimization",
      description: "Customizing Webpack for builds.",
      group: "tool",
      importance: 3,
    },
    {
      id: "87",
      title: "State Management with Vuex",
      description: "Managing complex state in Vue.js.",
      group: "tool",
      importance: 4,
    },
    {
      id: "88",
      title: "Testing with Jest",
      description: "Writing tests using Jest framework.",
      group: "tool",
      importance: 4,
    },
    {
      id: "89",
      title: "CSS Grid and Flexbox",
      description: "Using modern CSS layout techniques.",
      group: "concept",
      importance: 5,
    },
    {
      id: "90",
      title: "Progressive Enhancement",
      description: "Building resilient web applications.",
      group: "concept",
      importance: 4,
    },
    {
      id: "91",
      title: "Command-Line Proficiency",
      description: "Navigating and using CLI tools.",
      group: "tool",
      importance: 4,
    },
    {
      id: "92",
      title: "Package Management with npm and yarn",
      description: "Managing project dependencies.",
      group: "tool",
      importance: 5,
    },
    {
      id: "93",
      title: "Version Control Best Practices",
      description: "Advanced usage of Git.",
      group: "tool",
      importance: 5,
    },
    {
      id: "94",
      title: "API Development",
      description: "Creating and consuming RESTful APIs.",
      group: "concept",
      importance: 5,
    },
    {
      id: "95",
      title: "GraphQL API Usage",
      description: "Integrating GraphQL in applications.",
      group: "concept",
      importance: 3,
    },
    {
      id: "96",
      title: "Database Management",
      description: "Optimizing databases and queries.",
      group: "concept",
      importance: 4,
    },
    {
      id: "97",
      title: "Security Best Practices",
      description: "Protecting applications from threats.",
      group: "concept",
      importance: 5,
    },
    {
      id: "98",
      title: "Error Handling in JavaScript",
      description: "Managing exceptions effectively.",
      group: "concept",
      importance: 5,
    },
    {
      id: "99",
      title: "Code Documentation",
      description: "Writing clear and maintainable code docs.",
      group: "activity",
      importance: 4,
    },
    {
      id: "100",
      title: "Data Structures and Algorithms",
      description: "Applying fundamental CS concepts.",
      group: "concept",
      importance: 4,
    },
  ];