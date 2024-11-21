"use client";

import React from "react";
import { cn } from "../utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 text-foreground pt-16 ${className}`}
    >
      <div className="bg-gradient-radial absolute inset-0 from-transparent to-background/20 dark:to-background/40" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export const PageSection: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={cn(
        "m-0 flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center p-0",
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export const PageTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h1 className="mb-4 mt-16 text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
      {children}
    </h1>
  );
};

export const PageDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl pb-8">
      {children}
    </p>
  );
};
