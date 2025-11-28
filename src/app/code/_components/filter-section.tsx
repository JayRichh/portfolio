"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Filter, RotateCcw } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { techCategories } from "../../../lib/techCategories";
import { TechBadge } from "./tech-badge";
import { ANIMATION_CONFIG } from "../_constants";

interface FilterSectionProps {
  selectedTech: string[];
  isDropdownOpen: boolean;
  sortByRecent: boolean;
  toggleTechFilter: (tech: string) => void;
  setIsDropdownOpen: (isOpen: boolean) => void;
  setSortByRecent: (sort: boolean) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedTech,
  isDropdownOpen,
  sortByRecent,
  toggleTechFilter,
  setIsDropdownOpen,
  setSortByRecent,
}) => {
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted, setIsDropdownOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div
          className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[100px] sm:max-w-[280px]"
          ref={dropdownRef}
        >
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:bg-primary-dark inline-flex w-full items-center justify-between bg-primary px-6 py-3 text-lg text-white dark:text-green-900 transition-all duration-300"
          >
            <span className="flex items-center">
              <Filter size={20} className="mr-2" />
              Filter by Technology
            </span>
            {selectedTech.length > 0 && (
              <span className="ml-2 rounded-full bg-white px-2 py-1 text-sm font-medium text-primary">
                {selectedTech.length}
              </span>
            )}
          </Button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="absolute left-0 z-10 mt-2 w-[calc(100vw-2rem)] max-w-[60rem] rounded-lg border border-primary/10 bg-background shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: ANIMATION_CONFIG.DURATION,
                  ease: "easeInOut",
                }}
              >
                <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(techCategories).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="mb-3 text-sm font-semibold text-primary">
                        {category}
                      </h3>
                      <div className="flex flex-col gap-1">
                        {techs.map((tech) => (
                          <TechBadge
                            key={tech}
                            tech={tech}
                            isActive={selectedTech.includes(tech)}
                            onClick={toggleTechFilter}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={() => setSortByRecent(!sortByRecent)}
          className={`inline-flex w-full sm:w-auto items-center justify-center ${
            sortByRecent
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-secondary hover:bg-secondary/80"
          }`}
          variant={sortByRecent ? "default" : "secondary"}
        >
          {sortByRecent ? (
            <RotateCcw size={20} className="mr-2" />
          ) : (
            <Clock size={20} className="mr-2" />
          )}
          {sortByRecent ? "Clear Sort" : "Sort Recent"}
        </Button>
      </div>

      <AnimatePresence>
        {selectedTech.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            {selectedTech.map((tech) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <TechBadge
                  tech={tech}
                  isActive={true}
                  onClick={toggleTechFilter}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
