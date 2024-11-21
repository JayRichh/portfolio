"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "../../../lib/projectData";
import { ProjectCard } from "./project-card";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { GRID_BREAKPOINTS } from "../_constants";

interface ProjectGridProps {
  isLoading: boolean;
  filteredProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  isLoading,
  filteredProjects,
  onSelectProject,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading skeleton during SSR and initial mount
  if (!mounted || isLoading) {
    return (
      <div className="grid min-h-[800px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(GRID_BREAKPOINTS.DESKTOP * 2)].map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid min-h-[800px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      layout
    >
      {filteredProjects.length === 0 ? (
        <motion.div
          className="col-span-full flex flex-col items-center justify-center"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h3 className="text-xl font-semibold text-primary">No Projects Found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your filters to find more projects.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: { duration: 0.3 }
              }}
            >
              <ProjectCard
                project={project}
                index={0}
                onSelect={onSelectProject}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};
