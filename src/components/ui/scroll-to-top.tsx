"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const Tooltip = ({ isVisible, children, className }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className={`absolute right-full flex items-center top-1/2 transform -translate-y-1/2 mr-2 ${className}`}
      >
        <div className="bg-background/90 text-foreground px-3 py-1.5 rounded-md text-sm shadow-lg backdrop-blur-sm border border-border whitespace-nowrap">
          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringScroll, setIsHoveringScroll] = useState(false);
  const [isHoveringProjects, setIsHoveringProjects] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isVisible && (
          <div className="relative group">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              onMouseEnter={() => setIsHoveringScroll(true)}
              onMouseLeave={() => setIsHoveringScroll(false)}
              className="p-3 rounded-full bg-background/80 hover:bg-background border border-border shadow-lg backdrop-blur-sm transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp 
                size={24} 
                className="text-foreground transition-transform duration-300 transform group-hover:translate-y-[-2px]" 
              />
                {isHoveringScroll && (
                  <Tooltip isVisible={isHoveringScroll} className="mr-3">
                    Scroll to top
                  </Tooltip>
                )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
      
      <div className="relative group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/code">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHoveringProjects(true)}
              onMouseLeave={() => setIsHoveringProjects(false)}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-background/80 hover:bg-background text-foreground border border-border font-medium shadow-lg text-sm sm:text-base backdrop-blur-sm transition-all duration-300"
            >
              View All Projects
                  {isHoveringProjects && (
                    <Tooltip isVisible={isHoveringProjects} className="ml-3">
                      View all projects
                    </Tooltip>
                  )}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
