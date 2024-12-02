import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "../../../utils/cn";
import { WordMapPreview } from "../../resources/_components/WordMapPreview";
import { MindMapPreview } from "../../resources/_components/MindMapPreview";
import { GitHubPreview } from "../../resources/_components/GitHubPreview";
import { PageTitle, PageDescription } from "../../../components/page-container";

interface CardProps {
  href: string;
  title: string;
  description: string;
  PreviewComponent?: React.ComponentType;
  className?: string;
}

function Card({
  href,
  title,
  description,
  PreviewComponent,
  className,
}: CardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href={href}
      className={cn(
        className || "",
        "group relative overflow-hidden rounded-xl",
        "border border-gray-200 dark:border-white/10",
        "bg-white dark:bg-white/5",
        "transition-all duration-300 hover:scale-[1.02]",
        "hover:border-gray-300 dark:hover:border-white/20",
        "hover:bg-gray-50 dark:hover:bg-white/10",
        "shadow-sm hover:shadow-md dark:shadow-none",
        "flex flex-col",
      )}
      prefetch={true}
    >
      {PreviewComponent && (
        <div className="relative h-[300px] w-full overflow-hidden border-b border-gray-100 dark:border-white/5">
          <PreviewComponent />
        </div>
      )}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white/95">
            {title}
          </h2>
          <p
            className={cn(
              "text-lg leading-relaxed",
              mounted && (theme === "dark" ? "text-white/80" : "text-gray-600"),
            )}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </Link>
  );
}

interface ResourcesSectionProps {
  isMobile: boolean;
}

export function ResourcesSection({ isMobile }: ResourcesSectionProps) {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 -mt-24 mb-12">
      <div className="relative mx-auto max-w-[90rem] py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left"
        >
          <PageTitle>Resources</PageTitle>
          <PageDescription>
            Interactive visualizations and insights into my development journey
          </PageDescription>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="w-full relative"
        >
          <div className="grid h-full place-items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 fill-available">
            {!isMobile && (
              <>
                <Card
                  href="/resources/wordmap"
                  title="Word Cloud - Tech Stack"
                  description="Interactive word cloud visualization of my tech stack, with size indicating usage frequency and colors representing different categories"
                  PreviewComponent={WordMapPreview}
                />
                <Card
                  href="/resources/learnings"
                  title="Mind Map - Learning Journey"
                  description="Structured overview of my programming knowledge, organized as an interactive mindmap with different categories and importance levels"
                  PreviewComponent={MindMapPreview}
                />
              </>
            )}
            <Card
              href="/resources/github"
              title="GitHub Activity"
              description="Visual representation of my GitHub contribution activity, showing commit frequency and development patterns over time"
              PreviewComponent={GitHubPreview}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
