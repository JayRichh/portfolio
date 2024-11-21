import { useCallback, useState, useEffect } from "react";
import { Project, projectData } from "../../../lib/projectData";
import { filterProjectsByTech, sortProjectsByDate } from "../../../lib/tech-utils";

export interface ProjectFilterState {
  selectedTech: string[];
  filteredProjects: Project[];
  sortByRecent: boolean;
  isLoading: boolean;
  toggleTechFilter: (tech: string) => void;
  setSortByRecent: (sort: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useProjectFiltering = (): ProjectFilterState => {
  const [mounted, setMounted] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectData);
  const [sortByRecent, setSortByRecent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
    setFilteredProjects(projectData);
    setIsLoading(false);
  }, []);

  const toggleTechFilter = useCallback((tech: string) => {
    if (!mounted) return;
    
    setSelectedTech((prev) => {
      const newTech = prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech];
      return newTech;
    });
  }, [mounted]);

  const updateFilteredProjects = useCallback(() => {
    if (!mounted) return;

    let filtered = filterProjectsByTech(projectData, selectedTech);
    if (sortByRecent) {
      filtered = sortProjectsByDate(filtered);
    }
    setFilteredProjects(filtered);
  }, [selectedTech, sortByRecent, mounted]);

  // Update filtered projects when filters change
  useEffect(() => {
    updateFilteredProjects();
  }, [updateFilteredProjects]);

  return {
    selectedTech,
    filteredProjects,
    sortByRecent,
    isLoading,
    toggleTechFilter,
    setSortByRecent,
    setIsLoading,
  };
};
