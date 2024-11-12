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
}

export const projectData: Project[] = [
  {
    title: "Encompass Travel",
    description:
      "Delivered a comprehensive digital transformation for Encompass Travel, a premier motorcycle tour company in New Zealand, with a focus on stunning design, responsive development, and brand identity.",
    imgUrl: "/images/encompass-hero.png",
    repoUrl: "https://github.com/JayRichh",
    liveUrl: "https://encompasstours.co.nz",
    details: {
      title: "Encompass Tours - RideWithUs",
      description:
        "Encompass Tours required a complete digital overhaul to showcase their New Zealand motorcycle tours. Our agency provided end-to-end services, including rebranding, UX/UI design, and full-stack development to create an immersive and informative web experience.",
      technologies: [
        "Vue.js",
        "Supabase",
        "Tailwind CSS",
        "Node.js",
        "TypeScript",
        "Adobe Creative Suite",
      ],
      features: [
        {
          title: "Responsive Design",
          text: "Implemented a mobile-first, fully responsive design ensuring seamless user experience across all devices, from smartphones to large desktop screens, crucial for on-the-go travelers.",
          image: "/images/encompass-responsive.png",
        },
        {
          title: "Dynamic Tour Showcase",
          text: "Developed an interactive tour showcase allowing users to explore different routes, view high-quality images, and get detailed information about each tour option.",
          image: "/images/encompass-tour-showcase.png",
        },
        {
          title: "Brand Identity Redesign",
          text: "Created a new visual identity including logo, color palette, and typography that captures the spirit of motorcycle adventure in New Zealand.",
          image: "/images/encompass-branding.png",
        },
        {
          title: "Content Management System (CMS)",
          text: "Implemented a user-friendly CMS allowing Encompass staff to easily update tour information, blog posts, and dynamic content without technical expertise.",
          image: "/images/encompass-cms.png",
        },
        {
          title: "Immersive Imagery Integration",
          text: "Integrated high-quality, immersive imagery and videos showcasing New Zealand's breathtaking landscapes, optimized for fast loading without compromising visual impact.",
          image: "/images/encompass-imagery.png",
        },
        {
          title: "SEO Optimization",
          text: "Implemented comprehensive SEO strategies, including schema markup, optimized meta tags, and a content strategy to improve organic search rankings for New Zealand tourism-related keywords.",
          image: "/images/encompass-seo.png",
        },
      ],
      challenges: [
        {
          title: "Performance with Rich Media",
          text: "Balancing the use of high-quality images and videos to showcase New Zealand's beauty while ensuring fast loading times and smooth performance across devices.",
        },
        {
          title: "Intuitive Information Architecture",
          text: "Designing an intuitive navigation and information structure to help users easily find tour information, destinations, and company details without overwhelming them.",
        },
        {
          title: "Capturing Brand Essence",
          text: "Translating the excitement and freedom of motorcycle touring in New Zealand into a cohesive digital brand identity that resonates with the target audience.",
        },
        {
          title: "Responsive Interactive Elements",
          text: "Creating interactive elements like the tour showcase that remain engaging and functional across all device sizes and orientations.",
        },
      ],
      learnings: [
        {
          title: "Brand Identity Development",
          points: [
            {
              text: "Created a cohesive visual language that captures the spirit of New Zealand motorcycle tours, balancing ruggedness with sophistication.",
            },
            {
              text: "Developed a flexible design system that extends from digital to print materials, ensuring brand consistency across all touchpoints.",
            },
          ],
        },
        {
          title: "Performance Optimization Techniques",
          points: [
            {
              text: "Mastered advanced image optimization techniques to deliver high-quality visuals with minimal load times.",
            },
            {
              text: "Implemented lazy loading and code splitting to improve initial page load performance and user experience.",
            },
          ],
        },
        {
          title: "Responsive Design Best Practices",
          points: [
            {
              text: "Refined our approach to mobile-first design, ensuring a seamless experience from small screens to large displays.",
            },
            {
              text: "Developed custom responsive components that adapt not just in size, but in functionality to suit different device capabilities.",
            },
          ],
        },
        {
          title: "Content Strategy for Tourism",
          points: [
            {
              text: "Crafted a content strategy that balances inspirational imagery with practical tour information to drive user engagement and conversions.",
            },
            {
              text: "Integrated SEO best practices specific to the tourism industry, improving visibility for location-based searches.",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/encompass-home.png",
        "/images/encompass-tours.png",
        "/images/encompass-about.png",
        "/images/encompass-blog.png",
        "/images/encompass-contact.png",
      ],
    },
  },

  {
    title: "Restyled 2.0",
    description:
      "An AI-enhanced wardrobe platform built with Next.js, Supabase, and Lemon Squeezy. Focused on advanced AI integration, streamlined digital exploration, branding, and user experience for a personalized fashion experience.",
    imgUrl: "/images/restyled-logo.png",
    repoUrl: "https://github.com/JayRichh/",
    liveUrl: "https://restyled.app",
    details: {
      title: "Restyled 2.0 - AI-Powered Style Management",
      description:
        "Restyled 2.0 reimagines wardrobe management and style inspiration by leveraging cutting-edge technologies and AI integration. This platform offers a seamless, secure, and highly personalized experience for individuals and organizations in the fashion industry.",
      technologies: [
        "Next.js",
        "Supabase",
        "Lemon Squeezy",
        "Stripe",
        "TypeScript",
        "Tailwind CSS",
        "Stable Diffusion",
        "OpenAI",
      ],
      features: [
        {
          title: "Advanced Authentication",
          text: "Secure sign-up, sign-in, and sign-out processes with forgot password functionality and Multi-Factor Authentication (MFA) for enhanced security.",
          image: "/images/restyled-auth.png",
        },
        {
          title: "Flexible Account Management",
          text: "Support for both personal and organization accounts with role-based access control and invitation system for seamless collaboration.",
          image: "/images/restyled-accounts.png",
        },
        {
          title: "Comprehensive Billing System",
          text: "Robust billing management for personal and organization accounts, supporting various subscription models and multiple payment providers including Stripe, Lemon Squeezy, and Paddle.",
          image: "/images/restyled-billing.png",
        },
        {
          title: "AI-Powered Style Recommendations",
          text: "Integration of advanced AI models to provide personalized style recommendations based on user preferences, body type, and current fashion trends.",
          image: "/images/restyled-ai-recommendations.png",
        },
        {
          title: "Virtual Try-On with Stable Diffusion",
          text: "Utilizes Stable Diffusion to generate images of users wearing recommended outfits, providing a virtual try-on experience for inspiration.",
          image: "/images/restyled-virtual-tryon.png",
        },
        {
          title: "Mood and Context-Based Styling",
          text: "AI-driven outfit suggestions based on mood, color preferences, seasons, and weather conditions, ensuring users always have the perfect outfit for any occasion.",
          image: "/images/restyled-context-styling.png",
        },
        {
          title: "Wardrobe Digitization and Management",
          text: "Tools for users to easily digitize and categorize their existing wardrobe, with AI assistance for automatic item recognition and categorization.",
          image: "/images/restyled-wardrobe-management.png",
        },
        {
          title: "Social Sharing and Inspiration",
          text: "A platform for users to share their outfits, get feedback from the community, and find inspiration from other users and fashion influencers.",
          image: "/images/restyled-social.png",
        },
        {
          title: "Sustainability Insights",
          text: "AI-powered analysis of wardrobe usage patterns and suggestions for more sustainable fashion choices and outfit combinations.",
          image: "/images/restyled-sustainability.png",
        },
      ],
      challenges: [
        {
          title: "AI Model Integration and Training",
          text: "Integrating and fine-tuning AI models for accurate style recommendations and virtual try-on functionality, ensuring high-quality and realistic results.",
        },
        {
          title: "Data Privacy and Security",
          text: "Implementing robust security measures to protect user data, especially with the integration of AI and image processing technologies.",
        },
        {
          title: "Scalability and Performance",
          text: "Ensuring the platform remains responsive and fast, even with complex AI operations and a growing user base.",
        },
        {
          title: "User Experience Design",
          text: "Creating an intuitive and engaging user interface that seamlessly integrates advanced features without overwhelming users.",
        },
      ],
      learnings: [
        {
          title: "AI and Machine Learning in Fashion Tech",
          points: [
            {
              text: "Gained expertise in applying AI and machine learning technologies specifically to fashion and style recommendations.",
            },
            {
              text: "Developed skills in training and fine-tuning AI models on fashion-related datasets for improved accuracy and relevance.",
            },
          ],
        },
        {
          title: "Advanced Next.js and Supabase Integration",
          points: [
            {
              text: "Mastered complex state management and server-side rendering techniques in Next.js for optimal performance.",
            },
            {
              text: "Leveraged Supabase's real-time capabilities for dynamic content updates and collaborative features.",
            },
          ],
        },
        {
          title: "Multi-Tenant Architecture",
          points: [
            {
              text: "Implemented a sophisticated multi-tenant system supporting both individual users and organizations with varying permission levels.",
            },
            {
              text: "Developed strategies for efficient data isolation and sharing within the multi-tenant environment.",
            },
          ],
        },
        {
          title: "Integration of Multiple Payment Systems",
          points: [
            {
              text: "Gained experience in integrating and managing multiple payment providers, ensuring a smooth and flexible billing experience for users.",
            },
            {
              text: "Implemented complex subscription models including tiered and per-seat pricing structures.",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/restyled-dashboard.png",
        "/images/restyled-ai-engine.png",
        "/images/restyled-organization-view.png",
        "/images/restyled-mobile-app.png",
      ],
    },
  },
  {
    title: "V2 - Audio Visualizer",
    description:
      "An interactive music player with advanced audio visualization capabilities, built using Vue.js and Web Audio API. This app transforms the listening experience by providing a rich, visual representation of audio in real-time.",
    imgUrl: "/images/v2.webp",
    repoUrl: "https://github.com/JayRichh/v-2",
    liveUrl: "",
    details: {
      title: "V2 - Audio Visualizer - Interactive Music Player",
      description:
        "This application combines a feature-rich music player with real-time audio visualization, offering users an immersive audio-visual experience. It supports multiple visualization effects, playlist management, and advanced audio controls.",
      technologies: [
        "Vue.js",
        "TypeScript",
        "Web Audio API",
        "HTML5 Canvas",
        "Ionic Framework",
        "GLSL",
      ],
      features: [
        {
          title: "Multiple Visualization Effects",
          text: "Offers a variety of audio visualization effects including Waveform, Bars, Circle, Particles, Spectrum, Terrain, Grid, Flow, Ripple, and Fractal. Users can switch between these effects in real-time.",
          image: "/images/test1.png",
        },
        {
          title: "Customizable Visualization Settings",
          text: "Allows users to adjust visualization parameters such as detail level, movement speed, color intensity, and BPM. Includes options for randomization and reset to default settings.",
          image: "/images/test3.png",
        },
        {
          title: "Playlist Management",
          text: "Supports creating and managing playlists with features to add, remove, and reorder tracks. Users can easily navigate between tracks in the playlist.",
          image: "/images/test2.png",
        },
        {
          title: "Advanced Audio Controls",
          text: "Provides comprehensive audio controls including play, pause, stop, next, previous, volume adjustment, and seek functionality. Also includes a mute toggle for quick audio management.",
          image: "/images/test1.png",
        },
        {
          title: "Real-time BPM Detection",
          text: "Features automatic BPM (Beats Per Minute) detection, allowing the visualization to sync with the rhythm of the music. Users can also manually set the BPM if desired.",
          image: "",
        },
        {
          title: "Responsive Design",
          text: "Built with a responsive layout using Ionic Framework, ensuring a consistent and user-friendly experience across various device sizes and orientations.",
          image: "",
        },
      ],
      challenges: [
        {
          title: "Real-time Audio Processing",
          text: "Implementing efficient audio data processing and visualization rendering to ensure smooth performance, especially for complex effects and high detail levels.",
        },
        {
          title: "Cross-browser Compatibility",
          text: "Ensuring consistent functionality and appearance across different web browsers, particularly for advanced Web Audio API features and Canvas rendering.",
        },
        {
          title: "Performance Optimization",
          text: "Balancing visual complexity with performance, especially on mobile devices, to provide a smooth experience without overwhelming system resources.",
        },
        {
          title: "User Experience Design",
          text: "Creating an intuitive interface that allows users to easily control both the music playback and visualization settings without cluttering the UI.",
        },
      ],
      learnings: [
        {
          title: "Web Audio API Mastery",
          points: [
            {
              text: "Gained deep understanding of Web Audio API, including creating and manipulating audio contexts, nodes, and analyzers for real-time audio processing.",
            },
            {
              text: "Implemented advanced audio features such as gain control, seeking, and audio buffering for smooth playback and visualization.",
            },
          ],
        },
        {
          title: "Canvas-based Visualizations",
          points: [
            {
              text: "Developed skills in creating various audio visualization techniques using HTML5 Canvas, including optimizing render loops for smooth animations.",
            },
            {
              text: "Explored different approaches to translate audio data into visually appealing and responsive graphics.",
            },
          ],
        },
        {
          title: "State Management in Vue.js",
          points: [
            {
              text: "Implemented efficient state management practices in Vue.js to handle complex application state, including audio playback, visualization settings, and playlist data.",
            },
            {
              text: "Utilized Vue.js composition API for better code organization and reusability across components.",
            },
          ],
        },
        {
          title: "Audio Analysis Algorithms",
          points: [
            {
              text: "Implemented algorithms for audio analysis, including real-time BPM detection and frequency data extraction for visualization.",
            },
            {
              text: "Gained insights into digital signal processing concepts and their application in web-based audio applications.",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
  {
    title: "DevMap",
    description:
      "A comprehensive project management and personal growth tracking application designed to help developers improve their time estimation skills, track learning progress, and gain insights into their development process.",
    imgUrl: "/images/devmap-logo.webp",
    repoUrl: "",
    liveUrl: "https://devmap.me",
    details: {
      title: "DevMap - Developer Growth Tracker",
      description:
        "DevMap is an all-in-one solution for developers to manage projects, track time, visualize learning progress, and gain insights into their development process. It focuses on improving estimation accuracy, identifying skill growth, and providing meaningful analytics to enhance productivity and personal development.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Tailwind CSS",
        "Redis",
        "Recharts",
        "WebSockets",
      ],
      features: [
        {
          title: "Comprehensive Time Tracking",
          text: "Real-time and manual time tracking for tasks and projects, with comparison between estimated and actual time spent.",
          image: "/images/devmap-time-tracking.png",
        },
        {
          title: "Project and Task Management",
          text: "Hierarchical project structure with tasks and subtasks, featuring drag-and-drop reordering and component tagging.",
          image: "/images/devmap-project-management.png",
        },
        {
          title: "Learning Progress Visualization",
          text: "Track and visualize time spent on different skills, with customizable categories and progress charts using Recharts.",
          image: "/images/devmap-learning-progress.png",
        },
        {
          title: "Estimation Accuracy Insights",
          text: "Advanced analytics on estimation accuracy, including historical trends and pattern recognition for improved future estimates.",
          image: "/images/devmap-estimation-insights.png",
        },
        {
          title: "Personal Growth Tracking",
          text: "Self-assessment tools for skill levels, efficiency metrics, and visualization of improvements over time.",
          image: "/images/devmap-growth-tracking.png",
        },
        {
          title: "Customizable Dashboard",
          text: "A clean, user-friendly interface built with Tailwind CSS, featuring customizable widgets for at-a-glance information on current projects, tasks, and personal growth.",
          image: "/images/devmap-dashboard.png",
        },
      ],
      challenges: [
        {
          title: "Real-time Data Synchronization",
          text: "Implementing efficient real-time updates using WebSockets across multiple clients while maintaining data consistency and minimizing server load.",
          image: "",
        },
        {
          title: "Complex Data Relationships",
          text: "Designing and managing intricate data relationships between projects, tasks, time entries, and learning activities in PostgreSQL while ensuring optimal query performance.",
          image: "",
        },
        {
          title: "Scalable Analytics Processing",
          text: "Developing a system to process and analyze large volumes of time and project data in real-time without impacting application performance, utilizing Redis for caching frequently accessed data.",
          image: "",
        },
        {
          title: "Intuitive UI for Complex Features",
          text: "Creating a simple and intuitive user interface with Tailwind CSS that effectively presents complex data and features without overwhelming the user.",
          image: "",
        },
        {
          title: "TypeScript Integration",
          text: "Ensuring type safety and improved developer experience across the full stack by integrating TypeScript with React, Next.js, and Node.js/Express backend.",
          image: "",
        },
      ],
      learnings: [
        {
          title: "Full-Stack TypeScript Development",
          points: [
            {
              text: "Mastered end-to-end TypeScript development, creating type-safe interfaces between frontend and backend, improving code quality and reducing runtime errors.",
              image: "",
            },
            {
              text: "Leveraged TypeScript's advanced features to create robust data models and type-safe API interactions.",
              image: "",
            },
          ],
        },
        {
          title: "Real-time Data Visualization with Recharts",
          points: [
            {
              text: "Utilized Recharts to create dynamic, real-time data visualizations that update seamlessly as new data becomes available.",
              image: "",
            },
            {
              text: "Optimized rendering performance for large datasets through efficient use of Recharts components and data aggregation techniques.",
              image: "",
            },
          ],
        },
        {
          title: "Scalable Backend Architecture",
          points: [
            {
              text: "Designed and implemented a scalable backend architecture using Node.js, Express, and PostgreSQL, with Redis for caching to handle high-volume data processing and real-time updates.",
              image: "",
            },
            {
              text: "Implemented advanced database optimization techniques in PostgreSQL, including indexing strategies and query optimization, to ensure fast data retrieval for complex analytics.",
              image: "",
            },
          ],
        },
        {
          title: "Next.js and React Optimization",
          points: [
            {
              text: "Leveraged Next.js features like Static Site Generation (SSG) and Incremental Static Regeneration (ISR) to optimize page load times and improve SEO.",
              image: "",
            },
            {
              text: "Implemented efficient state management and data fetching strategies in React, utilizing hooks and context for a more maintainable and performant application structure.",
              image: "",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/devmap-dashboard.png",
        "/images/devmap-project-view.png",
        "/images/devmap-analytics.png",
        "/images/devmap-learning-tracker.png",
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
    title: "Aim Trainer",
    description:
      "While learning Three.js and React, I built a first-person shooter training game to enhance aiming skills and improve reaction times.",
    imgUrl: "/images/a11.png",
    repoUrl: "https://github.com/JayRichh/aimtrainer",
    liveUrl: "https://aimtrainer-zeta.vercel.app/",
    details: {
      title: "FPS Aim Trainer",
      description:
        "I developed this Aim Trainer as a project to deepen my understanding of React and Three.js. It allowed me to create an immersive 3D environment where players can practice and refine their aiming abilities. Working on this project helped me explore various aspects of game development, such as implementing different weapon types and target systems to simulate realistic shooting scenarios.",
      technologies: [
        "Next.js",
        "React",
        "Three.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      features: [
        {
          title: "Weapon System",
          text: "Implemented multiple weapon types, each with distinct characteristics like bullet speed, fire rate, and recoil patterns. This ensured varied and realistic shooting experiences, allowing players to adapt to different weapon mechanics.",
          image: "/images/a12.png",
        },
        {
          title: "Target System",
          text: "Developed both static and dynamic targets with diverse movement patterns and sizes. This provided a range of challenges to improve accuracy and reaction times under varying conditions.",
          image: "/images/a1.png",
        },
        {
          title: "Player Controls",
          text: "Designed smooth and responsive player movement and aiming controls, including adjustable mouse sensitivity, sprinting, crouching, and jumping mechanics. These controls enhanced the realism and fluidity of the gameplay.",
          image: "/images/a2.png",
        },
        {
          title: "3D Environment",
          text: "Created an engaging 3D training environment using Three.js, featuring customizable layouts and obstacle placements. This offered varied training scenarios to simulate different combat situations.",
          image: "/images/a3.png",
        },
        {
          title: "Performance Tracking",
          text: "Implemented a performance tracking system that monitors accuracy, reaction time, and overall scores. Players receive real-time feedback and post-session summaries to track their progress.",
        },
        {
          title: "Customizable Settings",
          text: "Added customization options, including graphics settings, control sensitivity, and training mode selection. These settings allow players to tailor the training experience to their preferences.",
        },
        {
          title: "HUD and User Interface",
          text: "Designed an intuitive Heads-Up Display (HUD) and user interface elements, such as main menus and pause menus. These interfaces ensure seamless navigation without disrupting gameplay.",
        },
      ],
      challenges: [
        {
          title: "3D Rendering and Performance",
          text: "Optimizing 3D rendering to maintain smooth performance across devices and browsers. I experimented with different Three.js features and React optimization techniques to balance visual fidelity with frame rates.",
        },
        {
          title: "Realistic Physics",
          text: "Implementing accurate bullet physics and player movement required balancing realism with playability. Fine-tuning physics parameters to achieve lifelike interactions without compromising responsiveness was a significant challenge.",
        },
        {
          title: "State Management",
          text: "Managing the state of multiple game elements, including players, weapons, and targets, in real-time. I explored efficient state management approaches in React to ensure synchronization and consistency across components.",
        },
        {
          title: "User Interface Design",
          text: "Creating an intuitive and non-intrusive UI that complements the 3D gameplay. I experimented with various layouts and information displays to strike the right balance between functionality and minimalism.",
        },
      ],
      learnings: [
        {
          title: "3D Web Development",
          points: [
            {
              text: "Mastered the use of Three.js with React to create interactive and immersive 3D environments directly in the browser.",
            },
            {
              text: "Gained a deep understanding of 3D mathematics and camera controls, enhancing the realism and responsiveness of in-game movements.",
            },
            {
              text: "Learned to optimize 3D rendering performance through techniques like level of detail (LOD) and efficient asset management.",
            },
          ],
        },
        {
          title: "Game Development Concepts",
          points: [
            {
              text: "Explored fundamental game development principles, including game loops, delta time, collision detection, and simple AI for target behaviors.",
            },
            {
              text: "Implemented shooting mechanics, including recoil patterns and weapon switching, to enhance gameplay depth and engagement.",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "Developed techniques to optimize React components and Three.js renders, ensuring smooth performance with complex visual effects.",
            },
            {
              text: "Used profiling tools to identify and address performance bottlenecks, improving overall efficiency.",
            },
          ],
        },
        {
          title: "Project Architecture",
          points: [
            {
              text: "Designed a scalable and maintainable project architecture that effectively separates concerns and promotes modularity.",
            },
            {
              text: "Implemented reusable components and utility functions to streamline development and facilitate future expansions.",
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
    title: "Off The Floor",
    description:
      "A modern and dynamic business website created using Vue3 and TypeScript, featuring responsive design and tailored functionalities to promote aerial arts classes.",
    imgUrl: "/images/otf-vue1.png",
    repoUrl: "https://github.com/JayRichh/otf-vue",
    liveUrl: "http://otf-vue.vercel.app",
    details: {
      title: "OffTheFloor",
      description:
        "OffTheFloor is a custom business website showcasing services like aerial arts classes and sessions. It integrates advanced web technologies and dynamic content management to deliver a seamless user experience.",
      technologies: [
        "Vue3",
        "TypeScript",
        "CSS3",
        "HTML5",
        "Bootstrap",
        "Vue Router",
      ],
      features: [
        {
          title: "Dynamic Routing with Vue Router",
          text: "Dynamic routing with Vue Router enabling seamless page transitions and state management without reloading the page.",
          image: "/images/otf-vue3.png",
        },
        {
          title: "Responsive Web Design",
          text: "Responsive web design implemented using Bootstrap for consistent user experience across various devices and screen sizes.",
          image: "/images/otf-vue4.png",
        },
        {
          title: "Vue3 Composition API",
          text: "Advanced use of Vue3 composition API for managing component logic and state in a more readable and maintainable way.",
          image: "/images/otf-vue1.png",
        },
        {
          title: "Interactive Carousels",
          text: "Interactive elements like carousels for testimonials and classes, implemented with Vue3-carousel and customized with detailed CSS for a unique look.",
          image: "/images/otf-vue2.png",
        },
      ],
      challenges: [
        {
          title: "Cross-Browser and Cross-Device Compatibility",
          text: "Ensuring cross-browser and cross-device compatibility, particularly with dynamic content and animations.",
          image: "",
        },
        {
          title: "Performance Optimization",
          text: "Optimizing the loading times and performance of high-quality images and video content without sacrificing the visual quality.",
          image: "",
        },
        {
          title: "Vue3 Carousel Plugin Integration",
          text: "Integrating the Vue3 Carousel plugin with custom styling and responsive design parameters to display content effectively.",
          image: "",
        },
        {
          title: "Flexible Layout Development",
          text: "Developing a flexible layout that adjusts perfectly on different devices while maintaining a high-quality user interface.",
          image: "",
        },
      ],
      learnings: [
        {
          title: "Vue3 Composition API",
          points: [
            {
              text: "Embraced the power of the Vue3 Composition API to create more flexible and reusable code by encapsulating related logic into composable functions.",
              image: "",
            },
            {
              text: "Leveraged Vue3's reactive and ref APIs to create dynamic and responsive data bindings, enabling real-time updates and seamless synchronization between components.",
              image: "",
            },
            {
              text: "Implemented watchers and computed properties using the Composition API to handle complex data dependencies and perform efficient calculations.",
              image: "",
            },
          ],
        },
        {
          title: "TypeScript Integration",
          points: [
            {
              text: "Integrated TypeScript into the Vue3 project to enhance code quality, maintainability, and scalability by adding static typing and type checking.",
              image: "",
            },
            {
              text: "Defined clear interfaces and types for component props, emits, and state to improve code readability and catch potential type-related bugs during development.",
              image: "",
            },
            {
              text: "Utilized TypeScript features like enums, type aliases, and type assertions to create more expressive and self-documenting code.",
              image: "",
            },
          ],
        },
        {
          title: "Responsive Web Design",
          points: [
            {
              text: "Implemented responsive web design principles using CSS media queries and flexible layouts to ensure optimal viewing experience across various devices and screen sizes.",
              image: "",
            },
            {
              text: "Utilized Bootstrap's responsive grid system and utility classes to create a consistent and responsive layout structure throughout the website.",
              image: "",
            },
            {
              text: "Optimized images and assets for different device resolutions to minimize load times and enhance performance on mobile devices.",
              image: "/images/otf-vue1.png",
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
    title: "The Work Waka",
    description:
      "Job application and interview tracking platform with data visualization, built with Next.js and TypeScript. Features include calendar integration, dynamic forms, and Sankey diagram reports.",
    imgUrl: "/images/workwaka.png",
    repoUrl: "https://github.com/JayRichh/workwaka",
    liveUrl: "https://workwaka.vercel.app",
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
        "/images/workmain.webp",
        "/images/workwaka.png",
        "/images/moitsBoat.png",
      ],
    },
  },
  {
    title: "AF Buddy",
    description:
      "AF Buddy is a feature-rich Chrome extension that provides developers with tools like geolocation spoofing, user agent emulation, and JSON editing, enhancing the web development process.",
    imgUrl: "/images/afbuddy2.png",
    repoUrl: "https://github.com/JayRichh/afbuddy",
    liveUrl: "",
    details: {
      title: "AF Buddy",
      description:
        "AF Buddy integrates a suite of tools into a single Chrome extension to assist developers in testing and developing web applications. It features dynamic UI components built with Vue.js, leveraging Vuex for state management and GSAP for smooth animations.",
      technologies: ["Vue3", "JavaScript", "CSS", "GSAP"],
      features: [
        {
          title: "Dynamic Navigation Bar",
          text: "Dynamic navigation bar that allows users to switch between tools using GSAP-driven animations, enhancing the user experience with smooth transitions.",
          image: "/images/afbuddy2.png",
        },
        {
          title: "Code Snippet Management",
          text: "Code snippet management which utilizes Vue's reactivity system to provide live search results as the user types, backed by local storage to persist data across sessions.",
          image: "/images/afbuddy4.png",
        },
        {
          title: "Geolocation Spoofing",
          text: "Geolocation spoofing implemented with a dedicated Vue component that binds input fields to Vuex store, enabling instant updates across the extension without page reloads.",
          image: "/images/afbuddy7.png",
        },
        {
          title: "User Agent Switching",
          text: "User agent switching functionality that allows users to emulate different devices by selecting from a pre-populated list of user agents stored in Vuex state, facilitating quick testing of responsive designs.",
          image: "/images/afbuddy5.png",
        },
        {
          title: "JSON Editor",
          text: "A robust JSON editor built with the Monaco editor integrated into a Vue component, offering features like syntax highlighting, auto-formatting, and error detection to facilitate easy manipulation of JSON data.",
          image: "/images/afbuddy6.png",
        },
        {
          title: "Theme Selector",
          text: "Theme selector that applies selected themes dynamically to the Monaco editor and other parts of the UI, using CSS variables and Vuex for state management to ensure theme preferences are maintained across the extension.",
          image: "/images/afbuddy3.png",
        },
      ],
      challenges: [
        {
          title: "UI Responsiveness and Intuitiveness",
          text: "Designing a user interface that remains responsive and intuitive despite the heavy feature set, requiring careful management of Vue components and Vuex state.",
          image: "",
        },
        {
          title: "Monaco Editor Integration",
          text: "Implementing a seamless integration of the Monaco editor within a Vue component, addressing challenges related to component lifecycle and editor instantiation.",
          image: "",
        },
        {
          title: "Efficient Data Binding and State Updates",
          text: "Ensuring efficient data binding and state updates without performance degradation, particularly for features like the dynamic navigation bar and live search functionality in the code snippet manager.",
          image: "",
        },
        {
          title: "Extension Load Balancing",
          text: "Balancing the load of the extension to prevent high memory usage, especially when handling large datasets in the JSON editor and maintaining a smooth user experience.",
          image: "",
        },
      ],
      learnings: [
        {
          title: "Vue.js Mastery",
          points: [
            {
              text: "Developed a deep understanding of Vue.js component design patterns and best practices for building scalable and maintainable applications.",
              image: "",
            },
            {
              text: "Mastered the use of Vuex for efficient state management, ensuring a single source of truth and predictable state mutations throughout the application.",
              image: "",
            },
            {
              text: "Leveraged Vue.js reactivity system to create dynamic and responsive user interfaces that update in real-time based on user interactions and data changes.",
              image: "",
            },
          ],
        },
        {
          title: "Browser Extension Development",
          points: [
            {
              text: "Gained expertise in developing browser extensions, adhering to the specific requirements and constraints of the extension environment.",
              image: "",
            },
            {
              text: "Implemented secure communication between the extension and web pages, ensuring data privacy and protection against cross-site scripting attacks.",
              image: "",
            },
            {
              text: "Utilized browser APIs effectively to access and manipulate web page content, storage, and user preferences.",
              image: "",
            },
          ],
        },
        {
          title: "Performance Optimization",
          points: [
            {
              text: "Implemented code splitting and lazy loading techniques to reduce initial bundle size and improve load times.",
              image: "",
            },
            {
              text: "Optimized Vue.js components and Vuex store to minimize unnecessary re-renders and computations, resulting in better performance.",
              image: "",
            },
            {
              text: "Conducted thorough performance profiling and applied memoization and caching strategies to eliminate performance bottlenecks.",
              image: "/images/afbuddy1.png",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/afbuddy1.png",
        "/images/afbuddy3.png",
        "/images/afbuddy4.png",
        "/images/afbuddy5.png",
      ],
    },
  },

  {
    title: "Chat with DALL-E Integration",
    description:
      "Chat application that combines real-time messaging with the ability to generate and manipulate images directly in the chat using OpenAI's DALL-E.",
    imgUrl: "/images/chat1.png",
    repoUrl: "https://github.com/JayRichh/chat",
    liveUrl: "https://jaychat.onrender.com/",
    details: {
      title: "Chat with DALL-E Integration",
      description:
        "This application leverages the capabilities of OpenAI's DALL-E to provide a unique chat experience where users can not only communicate in real-time but also create, edit, and vary images based on textual prompts. It integrates cutting-edge AI technology into a seamless chat interface.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "OpenAI",
        "Styled-Components",
      ],
      features: [
        {
          title: "Real-Time Chat",
          text: "Allows users to send and receive messages instantaneously, enhancing interaction within the chat application.",
          image: "/images/chat2.png",
        },
        {
          title: "DALL-E Image Generation",
          text: "Integrates with OpenAI's DALL-E to generate images from textual descriptions provided by users in the chat.",
          image: "/images/chat1.png",
        },
        {
          title: "Image Editing and Variation",
          text: "Supports advanced image manipulation features, including editing specific parts of an image and generating variations of an existing image.",
          image: "",
        },
        {
          title: "Responsive Design",
          text: "Ensures that the chat application is accessible and functional on various devices, providing a consistent user experience across platforms.",
          image: "",
        },
        {
          title: "Seamless Mode Switching",
          text: "Users can seamlessly switch between standard chat mode and DALL-E mode to generate or edit images, enhancing the interactive experience.",
          image: "",
        },
      ],
      challenges: [
        {
          title: "Integrating AI with Real-Time Systems",
          text: "Balancing the load between real-time chat functionalities and computationally intensive AI operations for image generation.",
          image: "",
        },
        {
          title: "API Rate Limiting",
          text: "Managing API usage to stay within the rate limits imposed by OpenAI.",
          image: "",
        },
        {
          title: "Data Privacy",
          text: "Ensuring that all user data, especially the images generated and manipulated through DALL-E, are handled securely to protect user privacy.",
          image: "",
        },
        {
          title: "User Experience Design",
          text: "Designing a user-friendly interface that accommodates both chat and advanced AI features without overwhelming the user.",
          image: "",
        },
      ],
      learnings: [
        {
          title: "Real-Time Web Technologies",
          points: [
            {
              text: "Gained profound knowledge in WebSocket and other real-time technologies that facilitate live, bidirectional communication between clients and servers.",
              image: "",
            },
            {
              text: "Learned to implement efficient message broadcasting to synchronize state across clients instantly.",
              image: "",
            },
          ],
        },
        {
          title: "AI Integration in Web Applications",
          points: [
            {
              text: "Acquired skills in integrating AI APIs, specifically OpenAI's DALL-E, into web applications to enhance functionality.",
              image: "",
            },
            {
              text: "Developed proficiency in handling AI-driven tasks such as image generation and editing within a real-time chat application context.",
              image: "",
            },
          ],
        },
        {
          title: "Advanced Frontend Techniques",
          points: [
            {
              text: "Mastered advanced React patterns and state management strategies to handle complex stateful interactions in a scalable way.",
              image: "",
            },
            {
              text: "Enhanced skills in Styled-Components for dynamically generating CSS based on application state.",
              image: "",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/chat1.png",
        "/images/chat2.png",
        "/images/chat1.png",
        "/images/chat2.png",
      ],
    },
  },
  {
    title: "The Odin Project",
    description:
      "A collection of projects and learnings from my journey through The Odin Project curriculum, showcasing my growth and skill development as a web developer.",
    imgUrl: "/images/top10.png",
    repoUrl: "https://github.com/JayRichh/the-odin-project",
    liveUrl: "",
    details: {
      title: "The Odin Project - Learning Journey",
      description:
        "This project represents my learning journey through The Odin Project curriculum, encompassing a wide range of projects and exercises that have helped me develop my web development skills.",
      technologies: [
        "React",
        "JavaScript",
        "Node.js",
        "HTML",
        "CSS",
        "Express",
        "MongoDB",
        "Firebase",
        "Jest",
        "Webpack",
      ],
      features: [
        {
          title: "Todo App",
          text: "A feature-rich todo application built with React and Firebase. Utilizes Firebase Realtime Database for data persistence and synchronization. Implements task creation, editing, deletion, and categorization. Includes user authentication and authorization using Firebase Authentication.",
          image: "/images/top3.png",
        },
        {
          title: "Calculator App",
          text: "A fully functional calculator application developed using HTML, CSS, and JavaScript. Supports basic arithmetic operations, decimal handling, and keyboard input. Implements a responsive design and follows accessibility best practices.",
          image: "/images/project-img5.png",
        },
        {
          title: "Restaurant Website",
          text: "A dynamic restaurant website built with HTML, CSS, and JavaScript. Features tabbed browsing for easy navigation and a responsive layout that adapts to different screen sizes. Incorporates interactive elements such as image sliders and smooth scrolling.",
          image: "/images/project-img4.png",
        },
        {
          title: "Tic-Tac-Toe Game",
          text: "A classic tic-tac-toe game implemented using HTML, CSS, and JavaScript. Utilizes a modular architecture with separate files for game logic and UI rendering. Includes a responsive grid layout and supports both human vs. human and human vs. computer gameplay.",
          image: "/images/project-img10.png",
        },
        {
          title: "Etch-a-Sketch",
          text: "An interactive drawing application built with HTML, CSS, and JavaScript. Allows users to create pixelated art by hovering over a dynamically generated grid. Provides options for adjusting grid size, color, and eraser functionality. Utilizes DOM manipulation and event handling.",
          image: "/images/top9.png",
        },
        {
          title: "Elf Game",
          text: "An interactive game built with Vue.js and Node.js, where players search for elves in a virtual environment. Utilizes MongoDB for real-time score updates and leaderboard management. Features a responsive game design that adapts to different screen sizes and devices.",
          image: "",
        },
        {
          title: "Blog Application",
          text: "A full-stack blog application developed using React, Node.js, Express, and MongoDB. Implements CRUD functionality for blog posts and user management. Utilizes RESTful API architecture and JWT-based authentication. Incorporates rich text editing capabilities and markdown support.",
          image: "/images/project-img7.png",
        },
        {
          title: "CV Builder",
          text: "A CV builder application built with React and TypeScript. Allows users to input their personal information, work experience, education, and skills. Generates a professional-looking CV in PDF format. Utilizes React hooks and context API for state management.",
          image: "/images/top7.png",
        },
        {
          title: "Weather App",
          text: "A weather application developed using HTML, CSS, JavaScript, and the OpenWeatherMap API. Retrieves and displays real-time weather data based on user location or search input. Implements error handling and loading states. Utilizes Promises and Fetch API for asynchronous data fetching.",
          image: "/images/top10.png",
        },
      ],
      challenges: [
        {
          title: "State Management in React",
          text: "Managing state efficiently in larger React applications, ensuring proper data flow and synchronization between components. Solved by utilizing state management libraries like Redux or the Context API.",
          image: "",
        },
        {
          title: "Asynchronous Data Fetching",
          text: "Handling asynchronous data fetching and managing loading states effectively. Addressed by using Promises, async/await, and libraries like Axios for making API requests.",
          image: "",
        },
        {
          title: "CSS Layout and Responsiveness",
          text: "Creating responsive layouts that adapt to different screen sizes and devices. Overcame by leveraging CSS flexbox, grid, and media queries, along with responsive design principles.",
          image: "",
        },
        {
          title: "Backend API Development",
          text: "Designing and implementing robust backend APIs using Node.js and Express. Tackled by following RESTful principles, handling authentication and authorization, and utilizing middleware for request validation and error handling.",
          image: "",
        },
        {
          title: "Testing and Debugging",
          text: "Writing comprehensive unit tests and debugging complex issues. Addressed by using testing frameworks like Jest and Mocha, and utilizing browser developer tools and debugging techniques.",
          image: "",
        },
      ],
      learnings: [
        {
          title: "Front-end Development",
          points: [
            {
              text: "Mastered HTML5 semantic elements and accessibility best practices.",
              image: "",
            },
            {
              text: "Gained proficiency in CSS3 layout techniques, responsive design, and CSS preprocessors like Sass.",
              image: "",
            },
            {
              text: "Became skilled in JavaScript ES6+ features, DOM manipulation, and asynchronous programming.",
              image: "",
            },
            {
              text: "Acquired expertise in React, including component lifecycle, hooks, and state management.",
              image: "",
            },
          ],
        },
        {
          title: "Back-end Development",
          points: [
            {
              text: "Learned server-side development with Node.js and Express, creating RESTful APIs and handling database integration.",
              image: "",
            },
            {
              text: "Gained knowledge of database design, data modeling, and querying using MongoDB and Mongoose.",
              image: "",
            },
            {
              text: "Implemented authentication and authorization mechanisms, including JWT and session-based authentication.",
              image: "",
            },
            {
              text: "Acquired experience in server deployment, scaling, and performance optimization.",
              image: "",
            },
          ],
        },
        {
          title: "Testing and Debugging",
          points: [
            {
              text: "Developed skills in writing unit tests using frameworks like Jest and Mocha.",
              image: "",
            },
            {
              text: "Learned debugging techniques using browser developer tools and Node.js debugging tools.",
              image: "",
            },
            {
              text: "Gained knowledge of test-driven development (TDD) and integration testing.",
              image: "",
            },
          ],
        },
        {
          title: "Version Control and Collaboration",
          points: [
            {
              text: "Mastered Git version control, including branching, merging, and resolving conflicts.",
              image: "",
            },
            {
              text: "Collaborated with other developers using GitHub, participating in code reviews and pull requests.",
              image: "",
            },
            {
              text: "Learned agile development methodologies and project management tools like Trello and Jira.",
              image: "",
            },
          ],
        },
        {
          title: "Web Performance and Optimization",
          points: [
            {
              text: "Acquired knowledge of web performance optimization techniques, including minification, bundling, and lazy loading.",
              image: "",
            },
            {
              text: "Learned about browser rendering optimization, critical rendering path, and performance metrics.",
              image: "",
            },
            {
              text: "Implemented caching strategies and content delivery networks (CDNs) for faster content delivery.",
              image: "",
            },
          ],
        },
        {
          title: "Continuous Learning and Problem Solving",
          points: [
            {
              text: "Developed a growth mindset and embraced continuous learning throughout the curriculum.",
              image: "",
            },
            {
              text: "Enhanced problem-solving skills by tackling complex coding challenges and seeking optimal solutions.",
              image: "",
            },
            {
              text: "Learned to break down large problems into smaller, manageable tasks and iterate on solutions.",
              image: "",
            },
          ],
        },
      ],
      additionalImages: [
        "/images/top8.png",
        "/images/afbuddy7.png",
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
    title: "New Portfolio Website",
    description:
      "A modern, responsive portfolio website built with the latest Next.js 15 and TypeScript, featuring interactive visualizations, dark mode support, and dynamic animations. Showcases professional growth and technical expertise through an intuitive user interface.",
    imgUrl: "/images/main1.png",
    repoUrl: "https://github.com/JayRichh/portfolio",
    liveUrl: "https://jayrich.dev",
    details: {
      title: "Portfolio Website",
      description:
        "A comprehensive portfolio platform built using Next.js 15's app router and server components. Features include interactive data visualizations, dynamic animations, and responsive design. The site serves as both a showcase of work and a demonstration of modern web development practices.",
      technologies: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Radix UI",
        "D3.js",
        "Recharts",
      ],
      features: [
        {
          title: "Interactive Learning Mindmap",
          text: "Dynamic visualization of web development concepts using D3.js, providing an interactive way to explore technical knowledge and skills. The mindmap features smooth animations and responsive design, adapting to different screen sizes.",
        },
        {
          title: "Project Showcase",
          text: "Comprehensive project display system with filtering by technology, detailed project information, and interactive image galleries. Built using Radix UI components and Framer Motion animations for smooth transitions.",
        },
        {
          title: "Dynamic Experience Timeline",
          text: "Animated timeline showcasing professional experience with scroll-based animations and responsive design. Implements Framer Motion for smooth transitions and intersection observers for scroll-based animations.",
        },
        {
          title: "Technology Distribution Chart",
          text: "Interactive pie chart built with Recharts showing technology usage distribution. Features custom animations, tooltips, and responsive design for optimal viewing across devices.",
        },
      ],
      challenges: [
        {
          title: "Performance Optimization",
          text: "Implementing efficient data visualization and animations while maintaining smooth performance. Solved through careful optimization of D3.js renders, code splitting, and lazy loading of components.",
        },
        {
          title: "Responsive Design Implementation",
          text: "Creating a consistent experience across devices while maintaining complex interactive features. Addressed through mobile-first design approach and responsive breakpoints using Tailwind CSS.",
        },
        {
          title: "Accessibility and SEO",
          text: "Ensuring the site remains accessible while incorporating rich interactive features. Implemented proper ARIA attributes, semantic HTML, and SEO best practices while maintaining visual appeal.",
        },
      ],
      learnings: [
        {
          title: "Modern React Development",
          points: [
            {
              text: "Mastered Next.js 13 app router and server components, implementing efficient rendering strategies and optimizing performance.",
            },
            {
              text: "Developed expertise in TypeScript for type-safe development and improved code maintainability.",
            },
          ],
        },
        {
          title: "Data Visualization",
          points: [
            {
              text: "Implemented complex data visualizations using D3.js and Recharts, creating interactive and informative user experiences.",
            },
            {
              text: "Optimized rendering performance for smooth animations and transitions in data-heavy visualizations.",
            },
          ],
        },
        {
          title: "UI/UX Design",
          points: [
            {
              text: "Created an intuitive and accessible user interface using Radix UI primitives and custom components.",
            },
            {
              text: "Implemented responsive design patterns and animations using Tailwind CSS and Framer Motion.",
            },
          ],
        },
      ],
      additionalImages: [],
    },
  },
];
