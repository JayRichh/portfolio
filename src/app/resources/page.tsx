"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { WordMapPreview } from "./_components/WordMapPreview";
import { MindMapPreview } from "./_components/MindMapPreview";
import { GitHubPreview } from "./_components/GitHubPreview";
import {
  PageSection,
  PageTitle,
  PageDescription,
} from "../../components/page-container";

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640); // Matches Tailwind's `sm` breakpoint
    };
    updateSize(); // Check initial size
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
};

const Card = ({
  href,
  title,
  description,
  PreviewComponent,
  className,
}: {
  href: string;
  title: string;
  description: string;
  PreviewComponent?: React.ComponentType;
  className?: string;
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={href}
      className={cn(
        className || "",
        "group relative overflow-hidden rounded-xl",
        "border border-border/50",
        "bg-background/30 backdrop-blur-sm",
        "transition-all duration-300 hover:scale-[1.02]",
        "hover:border-primary/50 hover:bg-background/50",
        "flex flex-col",
      )}
      prefetch={true}
    >
      {PreviewComponent && (
        <div className="relative h-[300px] w-full overflow-hidden border-b border-border/50">
          <PreviewComponent />
        </div>
      )}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-primary">{title}</h2>
          <p
            className={cn(
              "text-lg",
              mounted && (theme === "dark" ? "text-gray-300" : "text-gray-600"),
            )}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </Link>
  );
};

export default function ResourcesPage() {
  const isMobile = useScreenSize();

  return (
    <PageSection>
      <div className="">
        <PageTitle>Resources</PageTitle>
        <PageDescription>
          Explore interactive visualizations of my tech journey, built while
          learning various APIs and libraries. These tools provide insights into
          my development progress and tech preferences.
        </PageDescription>
      </div>

      <div className="grid h-full place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {!isMobile && ( // Render these cards only if the screen size is not mobile
          <>
            <Card
              href="/resources/wordmap"
              title="Tech Stack Visualization"
              description="Interactive word cloud visualization of my tech stack, with size indicating usage frequency and colors representing different categories"
              PreviewComponent={WordMapPreview}
            />
            <Card
              href="/resources/learnings"
              title="Learning Journey"
              description="Structured overview of my programming knowledge, organized as an interactive mindmap with different categories and importance levels"
              PreviewComponent={MindMapPreview}
            />
          </>
        )}
        {/* Always show this card */}
        <Card
          href="/resources/github"
          title="GitHub Activity"
          description="Visual representation of my repository activity, showing the frequency of contributions across different projects and development patterns over time"
          PreviewComponent={GitHubPreview}
        />
      </div>
    </PageSection>
  );
}
