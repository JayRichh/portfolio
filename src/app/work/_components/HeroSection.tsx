import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onScrollClick: () => void;
}

export function HeroSection({ onScrollClick }: HeroSectionProps) {
  return (
    <div className="relative h-screen flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 text-center"
      >
        <motion.span
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-white/90 mb-6 md:mb-8 block tracking-[0.02em] [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to my
        </motion.span>
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-white dark:via-white/90 dark:to-white/80 tracking-[0.01em] leading-[1.1] [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Project Showcase
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-3xl text-gray-600 dark:text-white/85 mb-12 md:mb-16 max-w-4xl mx-auto leading-[1.6] tracking-[0.01em] [text-rendering:optimizeLegibility]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Take a look at some of the projects I've developed, each reflecting
          unique facets of web development.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="animate-bounce mt-16 sm:mt-20 md:mt-24 cursor-pointer"
          onClick={onScrollClick}
        >
          <span className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 tracking-[0.02em] [text-rendering:geometricPrecision]">
            Scroll to explore
          </span>
          <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-gray-300 dark:border-gray-700 rounded-full mx-auto mt-3 md:mt-4 relative">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 dark:bg-gray-700 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
          </div>
          <div className="absolute bottom-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 dark:text-gray-500 -rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
