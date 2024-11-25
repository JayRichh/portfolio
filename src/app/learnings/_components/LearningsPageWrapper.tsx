"use client";

import React from "react";
import { SidebarStateProvider } from "./SidebarStateContext";
import { LearningsSidebar } from "./LearningsSidebar";
import { LearningsContent } from "./LearningsContent";

export const LearningsPageWrapper: React.FC = () => {
  return (
    <SidebarStateProvider>
      <div className="relative flex min-h-[calc(100vh-7rem)] pt-16">
        <LearningsSidebar />
        <div className="flex-1 pl-[60px] transition-all duration-300">
          <LearningsContent />
        </div>
      </div>
    </SidebarStateProvider>
  );
};
