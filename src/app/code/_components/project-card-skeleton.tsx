"use client";

import React from "react";
import { Card } from "../../../components/ui/card";

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <Card className="group relative flex h-full cursor-pointer flex-col overflow-hidden">
      <div className="p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted animate-pulse" />
      </div>
      <div className="flex-grow p-6">
        <div className="mb-2 h-8 w-3/4 bg-muted animate-pulse rounded" />
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-muted/80 p-4 backdrop-blur-sm">
        <div className="flex justify-between">
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </Card>
  );
};
