"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Mail, Send, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../utils/cn";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Code", path: "/code" },
  { label: "Work", path: "/work" },
];

const workItems = [
  { label: "Checkpoint", path: "/work#checkpoint" },
  { label: "SteamShare", path: "/work#steamshare" },
  { label: "Golf2Go", path: "/work#golf2go" },
  { label: "CSS Battle", path: "/work#cssbattle" },
  { label: "Encompass Tours", path: "/work#encompasstours" },
  { label: "PomoDev", path: "/work#pomodev" },
  { label: "The Work Waka", path: "/work#theworkwaka" },
];

const resourceItems = [
  { label: "GitHub Activity", path: "/resources/github" },
  { label: "Word Map", path: "/resources/wordmap" },
  { label: "Learning Journey", path: "/resources/learnings" },
];

const socialLinks = [
  { label: "GitHub", icon: Github, path: "https://github.com/jayrichh", external: true },
  { label: "Contact", icon: Mail, path: "/#contact", external: false },
];

const themeOptions = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { clipPath: "circle(0% at 95% 5%)" },
  visible: {
    clipPath: "circle(150% at 95% 5%)",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  exit: {
    clipPath: "circle(0% at 95% 5%)",
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren",
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const scrollToHash = React.useCallback((hash: string, attempts = 10, delay = 100) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (attempts > 0) {
      setTimeout(() => scrollToHash(hash, attempts - 1, delay), delay);
    }
  }, []);

  const handleNavigation = React.useCallback(
    (path: string) => {
      const [basePath, hash] = path.split("#");
      const targetPath = basePath || "/";

      if (pathname === targetPath) {
        if (hash) {
          scrollToHash(hash);
          window.history.pushState(null, "", `#${hash}`);
        }
        onClose();
      } else {
        onClose();
        router.push(path);

        if (hash) {
          setTimeout(() => {
            scrollToHash(hash);
          }, 300);
        }
      }
    },
    [pathname, router, onClose, scrollToHash]
  );

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      if (menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length) focusableElements[0].focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={menuRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex min-h-screen w-screen flex-col bg-white dark:bg-gray-900 backdrop-blur-[8px]"
          >
            <motion.div
              variants={contentVariants}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4"
            >
              <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
                <motion.h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Menu
                </motion.h2>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={onClose}
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2"
                  aria-label="Close menu"
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={contentVariants}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-[calc(100vh-5rem)]">
                {/* Top Navigation Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Navigation
                    </h3>
                    <div className="space-y-4">
                      {mainLinks.map((item) => (
                        <motion.div
                          key={item.path}
                          variants={itemVariants}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        >
                          <button
                            onClick={() => handleNavigation(item.path)}
                            className={cn(
                              "block text-base font-medium transition-colors duration-300",
                              pathname === item.path 
                                ? "text-blue-500 dark:text-blue-400" 
                                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            )}
                          >
                            {item.label}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Projects
                    </h3>
                    <div className="space-y-4">
                      {workItems.map((item) => (
                        <motion.button
                          key={item.path}
                          variants={itemVariants}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          onClick={() => handleNavigation(item.path)}
                          className="block w-full text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                      Resources
                    </h3>
                    <div className="space-y-4">
                      {resourceItems.map((item) => (
                        <motion.button
                          key={item.path}
                          variants={itemVariants}
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                          onClick={() => handleNavigation(item.path)}
                          className="block w-full text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Utility Section - Centered */}
                <div className="mt-auto pt-12">
                  <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12">
                    {/* Theme Settings */}
                    <div className="flex flex-col items-center space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Appearance
                      </h3>
                      <div className="flex flex-wrap justify-center gap-3">
                        {themeOptions.map(({ label, value, icon: Icon }) => (
                          <motion.button
                            key={value}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setTheme(value)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                              theme === value
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col items-center space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Connect
                      </h3>
                      <div className="flex flex-wrap justify-center gap-3">
                        {socialLinks.map(({ label, icon: Icon, path, external }) => (
                          <motion.div
                            key={path}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                          >
                            {external ? (
                              <a
                                href={path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <Icon className="h-4 w-4" />
                                {label}
                              </a>
                            ) : (
                              <button
                                onClick={() => handleNavigation(path)}
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                <Icon className="h-4 w-4" />
                                {label}
                              </button>
                            )}
                          </motion.div>
                        ))}
                        <motion.button
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNavigation("/#contact")}
                          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Send className="h-4 w-4" />
                          Get in Touch
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
}
