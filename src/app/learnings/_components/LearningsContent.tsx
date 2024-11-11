'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MindMap from './MindMap';
import { useSidebarState } from './SidebarStateContext';




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

const learnings: LearningNode[] = [
  {
    id: '1',
    title: 'HTML Basics',
    description: 'Structuring web content.',
    group: 'language',
    importance: 5,
  },
  {
    id: '2',
    title: 'CSS Fundamentals',
    description: 'Styling web pages.',
    group: 'language',
    importance: 5,
  },
  {
    id: '3',
    title: 'Responsive Design',
    description: 'Mobile-friendly layouts.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '4',
    title: 'JavaScript Syntax',
    description: 'Basics of JS programming.',
    group: 'language',
    importance: 5,
  },
  {
    id: '5',
    title: 'DOM Manipulation',
    description: 'Interacting with the DOM.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '6',
    title: 'Event Handling',
    description: 'Responding to user actions.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '7',
    title: 'ES6 Features',
    description: 'Modern JavaScript enhancements.',
    group: 'language',
    importance: 5,
  },
  {
    id: '8',
    title: 'Fetch API',
    description: 'Making network requests.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '9',
    title: 'Asynchronous JS',
    description: 'Handling async operations.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '10',
    title: 'Promises',
    description: 'Managing asynchronous code.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '11',
    title: 'TypeScript',
    description: 'Typed superset of JavaScript.',
    group: 'language',
    importance: 4,
  },
  {
    id: '12',
    title: 'Type Safety',
    description: 'Reducing errors with types.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '13',
    title: 'Interfaces',
    description: 'Defining object shapes.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '14',
    title: 'Generics',
    description: 'Reusable code components.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '15',
    title: 'React Basics',
    description: 'Building UIs with React.',
    group: 'framework',
    importance: 5,
  },
  {
    id: '16',
    title: 'React Hooks',
    description: 'State and side effects.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '17',
    title: 'Functional Components',
    description: 'Stateless React components.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '18',
    title: 'State Management',
    description: 'Managing application state.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '19',
    title: 'React Router',
    description: 'Navigation in React apps.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '20',
    title: 'Vue.js',
    description: 'Progressive JavaScript framework.',
    group: 'framework',
    importance: 4,
  },
  {
    id: '21',
    title: 'Vue Components',
    description: 'Reusable UI elements.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '22',
    title: 'Vuex',
    description: 'State management for Vue.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '23',
    title: 'Composition API',
    description: 'Modern Vue.js API.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '24',
    title: 'Nuxt.js',
    description: 'Vue.js framework for SSR.',
    group: 'framework',
    importance: 3,
  },
  {
    id: '25',
    title: 'Node.js',
    description: 'JavaScript runtime environment.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '26',
    title: 'Express.js',
    description: 'Web framework for Node.',
    group: 'framework',
    importance: 5,
  },
  {
    id: '27',
    title: 'REST APIs',
    description: 'Building API endpoints.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '28',
    title: 'MongoDB',
    description: 'NoSQL database.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '29',
    title: 'Mongoose',
    description: 'ODM for MongoDB.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '30',
    title: 'Authentication',
    description: 'User login systems.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '31',
    title: 'JWT',
    description: 'Token-based authentication.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '32',
    title: 'Bcrypt',
    description: 'Password hashing.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '33',
    title: 'Stripe API',
    description: 'Payment processing.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '34',
    title: 'E-commerce',
    description: 'Online transaction systems.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '35',
    title: 'Git Basics',
    description: 'Version control essentials.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '36',
    title: 'GitHub',
    description: 'Collaborative coding platform.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '37',
    title: 'Branching and Merging',
    description: 'Managing code versions.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '38',
    title: 'Open Source',
    description: 'Contributing to community projects.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '39',
    title: 'Docker Basics',
    description: 'Containerizing applications.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '40',
    title: 'Webpack',
    description: 'Module bundler.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '41',
    title: 'Babel',
    description: 'JavaScript compiler.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '42',
    title: 'NPM',
    description: 'Package management.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '43',
    title: 'Yarn',
    description: 'Alternative package manager.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '44',
    title: 'ESLint',
    description: 'JavaScript linting.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '45',
    title: 'Prettier',
    description: 'Code formatting.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '46',
    title: 'Jest',
    description: 'Testing framework.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '47',
    title: 'TDD',
    description: 'Test-driven development.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '48',
    title: 'Unit Testing',
    description: 'Testing individual units.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '49',
    title: 'Integration Testing',
    description: 'Testing combined modules.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '50',
    title: 'Continuous Integration',
    description: 'Automated testing pipelines.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '51',
    title: 'Continuous Deployment',
    description: 'Automated releases.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '52',
    title: 'GitHub Actions',
    description: 'CI/CD workflows.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '53',
    title: 'Firebase',
    description: 'Backend as a service.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '54',
    title: 'Hosting',
    description: 'Deploying applications.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '55',
    title: 'Netlify',
    description: 'Static site hosting.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '56',
    title: 'Heroku',
    description: 'Cloud application platform.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '57',
    title: 'Three.js',
    description: '3D graphics library.',
    group: 'tool',
    importance: 2,
  },
  {
    id: '58',
    title: 'WebGL',
    description: 'Rendering 3D graphics.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '59',
    title: 'GLSL',
    description: 'Shader language.',
    group: 'language',
    importance: 2,
  },
  {
    id: '60',
    title: 'Shaders',
    description: 'Graphics programming.',
    group: 'concept',
    importance: 2,
  },
  {
    id: '61',
    title: 'Physics Simulations',
    description: 'Realistic motion in games.',
    group: 'concept',
    importance: 2,
  },
  {
    id: '62',
    title: 'Cannon.js',
    description: 'Physics engine.',
    group: 'tool',
    importance: 2,
  },
  {
    id: '63',
    title: 'Game Development',
    description: 'Creating interactive games.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '64',
    title: 'Socket.io',
    description: 'Real-time communication.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '65',
    title: 'WebSockets',
    description: 'Bi-directional communication.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '66',
    title: 'Multiplayer Logic',
    description: 'Syncing multiple users.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '67',
    title: 'OpenAI API',
    description: 'Integrating AI features.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '68',
    title: 'Chatbots',
    description: 'Automated conversations.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '69',
    title: 'AI Integration',
    description: 'Implementing AI in apps.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '70',
    title: 'Python Basics',
    description: 'Intro to Python programming.',
    group: 'language',
    importance: 3,
  },
  {
    id: '71',
    title: 'Data Structures',
    description: 'Organizing data efficiently.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '72',
    title: 'Algorithms',
    description: 'Problem-solving methods.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '73',
    title: 'LeetCode Challenges',
    description: 'Practicing coding problems.',
    group: 'activity',
    importance: 3,
  },
  {
    id: '74',
    title: 'Array Functions',
    description: 'Manipulating arrays in JS.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '75',
    title: 'OOP in JavaScript',
    description: 'Object-oriented programming.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '76',
    title: 'Asynchronous Programming',
    description: 'Handling async operations.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '77',
    title: 'Promises',
    description: 'Managing asynchronous code.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '78',
    title: 'Async/Await',
    description: 'Simplifying async code.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '79',
    title: 'APIs',
    description: 'Interacting with external data.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '80',
    title: 'Fetch API',
    description: 'Making network requests.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '81',
    title: 'JSON',
    description: 'Data interchange format.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '82',
    title: 'CSS Preprocessors',
    description: 'Enhanced CSS features.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '83',
    title: 'SCSS/SASS',
    description: 'Sass syntax for stylesheets.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '84',
    title: 'Stylus',
    description: 'Dynamic CSS preprocessor.',
    group: 'tool',
    importance: 2,
  },
  {
    id: '85',
    title: 'Responsive Images',
    description: 'Optimizing media for devices.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '86',
    title: 'Webpack Configuration',
    description: 'Setting up build tools.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '87',
    title: 'Babel Transpiling',
    description: 'Converting JS versions.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '88',
    title: 'Code Splitting',
    description: 'Optimizing app performance.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '89',
    title: 'Lazy Loading',
    description: 'Deferring resource loading.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '90',
    title: 'Monaco Editor',
    description: 'Code editor component.',
    group: 'tool',
    importance: 2,
  },
  {
    id: '91',
    title: 'Linting',
    description: 'Ensuring code quality.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '92',
    title: 'Pre-commit Hooks',
    description: 'Automate checks before commits.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '93',
    title: 'Continuous Testing',
    description: 'Testing in CI/CD.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '94',
    title: 'Debugging',
    description: 'Finding and fixing errors.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '95',
    title: 'Chrome DevTools',
    description: 'Browser debugging tools.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '96',
    title: 'VSCode',
    description: 'Code editor.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '97',
    title: 'Package Management',
    description: 'Handling dependencies.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '98',
    title: 'NPM Scripts',
    description: 'Automating tasks.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '99',
    title: 'CLI Tools',
    description: 'Command-line utilities.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '100',
    title: 'Data Parsing',
    description: 'Processing data formats.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '101',
    title: 'Regular Expressions',
    description: 'Pattern matching.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '102',
    title: 'Markdown',
    description: 'Formatting text files.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '103',
    title: 'Documentation',
    description: 'Writing project docs.',
    group: 'activity',
    importance: 4,
  },
  {
    id: '104',
    title: 'Project Deployment',
    description: 'Publishing applications.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '105',
    title: 'CI/CD Pipelines',
    description: 'Automating build and deploy.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '106',
    title: 'Code Reviews',
    description: 'Peer code evaluation.',
    group: 'activity',
    importance: 4,
  },
  {
    id: '107',
    title: 'Merge Conflicts',
    description: 'Resolving code issues.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '108',
    title: 'Version Control',
    description: 'Tracking code changes.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '109',
    title: 'Command Line',
    description: 'Terminal navigation.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '110',
    title: 'Data Structures',
    description: 'Organizing data.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '111',
    title: 'Problem-Solving',
    description: 'Algorithmic thinking.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '112',
    title: 'Functional Programming',
    description: 'Programming paradigm.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '113',
    title: 'Game Logic',
    description: 'Programming game mechanics.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '114',
    title: 'AI Implementations',
    description: 'Applying AI in projects.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '115',
    title: 'WebGL Shaders',
    description: 'Graphics programming.',
    group: 'concept',
    importance: 2,
  },
  {
    id: '116',
    title: 'Collaboration Tools',
    description: 'Working with teams.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '117',
    title: 'Kanban Boards',
    description: 'Task management.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '118',
    title: 'Agile Methodologies',
    description: 'Iterative development.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '119',
    title: 'Time Management',
    description: 'Efficient workflow.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '120',
    title: 'Pomodoro Technique',
    description: 'Productivity method.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '121',
    title: 'User Authentication',
    description: 'Securing applications.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '122',
    title: 'Session Management',
    description: 'Maintaining user state.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '123',
    title: 'Cookies',
    description: 'Client-side storage.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '124',
    title: 'Local Storage',
    description: 'Storing data in browser.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '125',
    title: 'Responsive Navigation',
    description: 'Mobile-friendly menus.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '126',
    title: 'CSS Animations',
    description: 'Adding motion to UI.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '127',
    title: 'Flexbox',
    description: 'Flexible layouts.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '128',
    title: 'Grid Layout',
    description: 'Advanced CSS grids.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '129',
    title: 'Media Queries',
    description: 'Responsive design.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '130',
    title: 'SASS Variables',
    description: 'Dynamic styling.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '131',
    title: 'Webpack Plugins',
    description: 'Extending Webpack.',
    group: 'tool',
    importance: 3,
  },
  {
    id: '132',
    title: 'Build Automation',
    description: 'Automating tasks.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '133',
    title: 'Accessibility',
    description: 'Inclusive web design.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '134',
    title: 'ARIA Attributes',
    description: 'Enhancing accessibility.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '135',
    title: 'Performance Optimization',
    description: 'Improving speed.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '136',
    title: 'Code Minification',
    description: 'Reducing file sizes.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '137',
    title: 'Image Optimization',
    description: 'Compressing images.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '138',
    title: 'Caching Strategies',
    description: 'Improving load times.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '139',
    title: 'Service Workers',
    description: 'Offline capabilities.',
    group: 'concept',
    importance: 3,
  },
  {
    id: '140',
    title: 'Progressive Web Apps',
    description: 'Enhancing web apps.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '141',
    title: 'Debugging Tools',
    description: 'Fixing code issues.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '142',
    title: 'Error Handling',
    description: 'Managing exceptions.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '143',
    title: 'Logging',
    description: 'Recording app activity.',
    group: 'concept',
    importance: 4,
  },
  {
    id: '144',
    title: 'Command Line Tools',
    description: 'CLI utilities.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '145',
    title: 'IDE Usage',
    description: 'Integrated development environments.',
    group: 'tool',
    importance: 5,
  },
  {
    id: '146',
    title: 'VSCode Extensions',
    description: 'Enhancing the editor.',
    group: 'tool',
    importance: 4,
  },
  {
    id: '147',
    title: 'Data Fetching',
    description: 'Retrieving data.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '148',
    title: 'API Integration',
    description: 'Connecting to services.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '149',
    title: 'Code Refactoring',
    description: 'Improving code structure.',
    group: 'concept',
    importance: 5,
  },
  {
    id: '150',
    title: 'Best Practices',
    description: 'Writing quality code.',
    group: 'concept',
    importance: 5,
  },
];

export const LearningsContent: React.FC = () => {
  const { isContentCollapsed, toggleContentCollapse } = useSidebarState();

  useEffect(() => {
    const savedCollapsed = localStorage.getItem('contentCollapsed');
    if (savedCollapsed === null) {
      localStorage.setItem('contentCollapsed', 'false');
      toggleContentCollapse(false);
    } else {
      toggleContentCollapse(savedCollapsed === 'true');
    }
  }, [toggleContentCollapse]);

  const handleToggleCollapse = () => {
    const newState = !isContentCollapsed;
    toggleContentCollapse(newState);
    localStorage.setItem('contentCollapsed', newState.toString());
  };

  return (
    <div className="relative h-screen w-full">
      <div className="fixed inset-0 z-0">
        <MindMap learnings={learnings} />
      </div>

      <div className="relative w-auto z-10 flex flex-col items-center px-4">
        <motion.div
          initial={false}
          animate={{ height: isContentCollapsed ? 'auto' : 'auto' }}
          className="w-full max-w-lg mt-16"
        >
          <AnimatePresence>
            {!isContentCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-auto mt-10 max-w-3xl transform rounded-2xl bg-card p-8 shadow-2xl transition-transform duration-300 hover:scale-105"
              >
                <h2 className="mb-6 text-4xl font-extrabold text-primary">
                  Mindmap
                </h2>

                <p className="prose lg:prose-xl mb-4 leading-relaxed text-foreground">
                  This is my attempt to visualize small facets of web
                  development I've encountered during my learning, making them
                  more navigable and measurable.
                </p>

                <p className="prose mb-6 max-w-xl leading-relaxed text-foreground">
                  For a more detailed look at how I have applied these topics
                  along the way, visit some{' '}
                  <a
                    href="/code"
                    className="rounded text-primary hover:text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    projects
                  </a>
                  .
                </p>

                <div className="flex justify-end">
                  <small className="italic text-muted-foreground">
                    Work in progress...
                  </small>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <button
          onClick={handleToggleCollapse}
          className="focus-ring mt-4 flex items-center rounded-full bg-card px-4 py-2 text-primary shadow-md hover:text-accent focus:outline-none"
        >
          {isContentCollapsed ? (
            <>
              <ChevronDown size={20} className="mr-1" />
              Show More
            </>
          ) : (
            <>
              <ChevronUp size={20} className="mr-1" />
              Show Less
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LearningsContent;

