"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type FilterOption = "category" | "tag" | "date" | "topics";

interface SidebarState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapsedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  openCategories: string[];
  toggleCategory: (category: string) => void;
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
  isContentCollapsed: boolean;
  toggleContentCollapse: (value: boolean) => void;
  // New state for mindmap integration
  highlightedGroups: string[];
  setHighlightedGroups: (groups: string[]) => void;
  toggleHighlightedGroup: (group: string) => void;
  highlightedImportance: number[];
  setHighlightedImportance: (importance: number[]) => void;
  toggleHighlightedImportance: (level: number) => void;
  resetHighlights: () => void;
}

const SidebarStateContext = createContext<SidebarState | undefined>(undefined);

export const useSidebarState = () => {
  const context = useContext(SidebarStateContext);
  if (!context) {
    throw new Error(
      "useSidebarState must be used within a SidebarStateProvider",
    );
  }
  return context;
};

export const SidebarStateProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Existing state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarCollapsed");
      return savedState === null ? true : savedState === "true";
    }
    return true;
  });
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("collapsedSections");
      return savedSections ? JSON.parse(savedSections) : {};
    }
    return {};
  });
  const [openCategories, setOpenCategories] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedCategories = localStorage.getItem("openCategories");
      return savedCategories ? JSON.parse(savedCategories) : [];
    }
    return [];
  });
  const [filterOption, setFilterOption] = useState<FilterOption>("date");
  const [isContentCollapsed, setIsContentCollapsed] = useState<boolean>(false);

  // New state for mindmap integration
  const [highlightedGroups, setHighlightedGroups] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("highlightedGroups");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [highlightedImportance, setHighlightedImportance] = useState<number[]>(
    () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("highlightedImportance");
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    },
  );

  // Existing callbacks
  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebarCollapsed", newValue.toString());
      return newValue;
    });
  }, []);

  const toggleSection = useCallback((section: string) => {
    setCollapsedSections((prev) => {
      const newState = {
        ...prev,
        [section]: !prev[section],
      };
      localStorage.setItem("collapsedSections", JSON.stringify(newState));
      return newState;
    });
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setOpenCategories((prev) => {
      const newState = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      localStorage.setItem("openCategories", JSON.stringify(newState));
      return newState;
    });
  }, []);

  const toggleContentCollapse = useCallback((value: boolean) => {
    setIsContentCollapsed(value);
  }, []);

  // New callbacks for mindmap integration
  const toggleHighlightedGroup = useCallback((group: string) => {
    setHighlightedGroups((prev) => {
      const newState = prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group];
      localStorage.setItem("highlightedGroups", JSON.stringify(newState));
      return newState;
    });
  }, []);

  const toggleHighlightedImportance = useCallback((level: number) => {
    setHighlightedImportance((prev) => {
      const newState = prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level];
      localStorage.setItem("highlightedImportance", JSON.stringify(newState));
      return newState;
    });
  }, []);

  const resetHighlights = useCallback(() => {
    setHighlightedGroups([]);
    setHighlightedImportance([]);
    localStorage.removeItem("highlightedGroups");
    localStorage.removeItem("highlightedImportance");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load existing state from localStorage
      const savedCollapsed = localStorage.getItem("sidebarCollapsed");
      if (savedCollapsed !== null) {
        setIsCollapsed(savedCollapsed === "true");
      }

      const savedSections = localStorage.getItem("collapsedSections");
      if (savedSections) {
        setCollapsedSections(JSON.parse(savedSections));
      }

      const savedCategories = localStorage.getItem("openCategories");
      if (savedCategories) {
        setOpenCategories(JSON.parse(savedCategories));
      }

      // Load new state from localStorage
      const savedHighlightedGroups = localStorage.getItem("highlightedGroups");
      if (savedHighlightedGroups) {
        setHighlightedGroups(JSON.parse(savedHighlightedGroups));
      }

      const savedHighlightedImportance = localStorage.getItem(
        "highlightedImportance",
      );
      if (savedHighlightedImportance) {
        setHighlightedImportance(JSON.parse(savedHighlightedImportance));
      }
    }
  }, []);

  const value = {
    isCollapsed,
    toggleSidebar,
    collapsedSections,
    toggleSection,
    openCategories,
    toggleCategory,
    filterOption,
    setFilterOption,
    isContentCollapsed,
    toggleContentCollapse,
    // New values
    highlightedGroups,
    setHighlightedGroups,
    toggleHighlightedGroup,
    highlightedImportance,
    setHighlightedImportance,
    toggleHighlightedImportance,
    resetHighlights,
  };

  return (
    <SidebarStateContext.Provider value={value}>
      {children}
    </SidebarStateContext.Provider>
  );
};
