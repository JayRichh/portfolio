"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AtSign,
  Book,
  Code,
  Cpu,
  Github,
  Info,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../../components/ui/button";
import HobbiesSection from "./_components/about-hobbies";
import { useGitHubStore } from "../../lib/github";
import { ProgressLoader } from "../../components/ui/progress-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((mod) => mod.ResponsivePie),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center">
        <ProgressLoader isDataReady={false} />
      </div>
    ),
  },
);

const ScrollDownIndicator = dynamic(
  () => import("./_components/scroll-down-indicator"),
  { ssr: false },
);
const timelineData = [
  {
    year: "2022 - Present",
    title: "Software Developer",
    description:
      "Developing scalable software for project and operations management, collaborating with teams to deliver user-centric tools.",
    icon: Code,
  },
  {
    year: "2022",
    title: "Web Developer",
    description:
      "Built full-stack applications using HTML, CSS, JavaScript, and the MERN stack, focusing on best practices for robust solutions.",
    icon: Rocket,
  },
  {
    year: "2020 - 2022",
    title: "Estimator",
    description:
      "Quoted and designed control systems, improved internal processes, and delivered tailored solutions through strong client relationships.",
    icon: Cpu,
  },
  {
    year: "2020",
    title: "Industrial Electrician",
    description:
      "Led electrical installations in the dairy industry, mentoring apprentices and ensuring accurate equipment calibration.",
    icon: Zap,
  },
  {
    year: "2019",
    title: "Electrical Apprentice",
    description:
      "Certified in instrumentation while maintaining systems, with a focus on improving reliability and process efficiency.",
    icon: Server,
  },
  {
    year: "2013 - 2018",
    title: "Fire Systems Engineer",
    description:
      "Managed fire detection system installations, ensuring compliance with NZ codes and training apprentices on safety protocols.",
    icon: Book,
  },
];
const InfoTooltip = ({
  content,
  size = "md",
}: {
  content: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info
            className={`${sizeClasses[size]} text-muted-foreground/75 hover:text-muted-foreground cursor-help transition-colors`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[280px] leading-relaxed">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const TopSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { languageData, isLoading, error } = useGitHubStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLoading || (!languageData && !error)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <ProgressLoader isDataReady={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-muted-foreground">Unable to load GitHub data</p>
        </div>
      </div>
    );
  }

  const pieData =
    languageData?.languages.map(({ name, percentage, color }) => ({
      id: name,
      label: name,
      value: percentage,
      color: color || "#666",
    })) || [];

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center overflow-visible px-4 md:px-8">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-screen-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-8 pt-24">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
          >
            Technology
          </motion.h2>
          <InfoTooltip
            content="Data sourced from GitHub repositories, showing the distribution of programming languages across all projects. Includes both public and private repositories."
            size="lg"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 w-full overflow-visible"
        >
          {isMobile ? (
            <div className="space-y-4">
              {pieData.map((entry) => (
                <div key={entry.id} className="flex items-center">
                  <div
                    className="h-12"
                    style={{
                      width: `${entry.value}%`,
                      backgroundColor: entry.color,
                    }}
                  />
                  <span className="ml-4 text-lg font-semibold text-foreground">
                    {entry.label}: {entry.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative h-[600px] w-full">
              <ResponsivePie
                data={pieData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={{ datum: "data.color" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={isDark ? "#7d8590" : "#57606a"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#ffffff"
                motionConfig="gentle"
                transitionMode="pushIn"
                theme={{
                  labels: {
                    text: {
                      fontSize: 16,
                      fontWeight: 600,
                    },
                  },
                  tooltip: {
                    container: {
                      background: isDark ? "#161b22" : "#ffffff",
                      color: isDark ? "#7d8590" : "#57606a",
                      fontSize: "14px",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    },
                  },
                }}
              />
              <Link
                href="/resources/github"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-500 ease-in-out hover:text-primary hover:shadow-md active:shadow-lg"
              >
                View GitHub Stats
              </Link>
            </div>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
};

const SocialLinks: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="mt-12 flex justify-center space-x-6"
  >
    <motion.a
      href="https://github.com/jayrichh"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Github size={32} />
    </motion.a>
    <motion.a
      href="https://linkedin.com/in/jaydenrichardson"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Linkedin size={32} />
    </motion.a>
    <motion.a
      href="https://bsky.app/profile/jayrich.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AtSign size={32} />
    </motion.a>
    <motion.a
      href="mailto:web@jayrich.dev"
      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Mail size={32} />
    </motion.a>
  </motion.div>
);

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const updateLineProgress = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;

      let progress = 0;
      if (sectionTop <= viewportHeight * 0.95) {
        progress = Math.min(
          1,
          (viewportHeight * 0.95 - sectionTop) / (sectionHeight * 0.65),
        );

        progress = Math.pow(progress, 1.3);
      }

      setLineProgress(progress);
    };

    window.addEventListener("scroll", updateLineProgress);
    updateLineProgress();

    return () => window.removeEventListener("scroll", updateLineProgress);
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-[800px]">
      <motion.div
        className="absolute left-1/2 top-[150px] hidden h-full w-0.5 -translate-x-[0.125rem] transform rounded-full bg-gradient-to-b from-primary via-primary to-primary/50 md:block"
        style={{
          height: `calc(100% + 280px)`,
          maxHeight: `${lineProgress * 100}%`,
          transformOrigin: "top",
          opacity: smoothProgress.get(),
          transition: "all 0.2s ease-out",
        }}
        initial={{ height: "0%" }}
        animate={{ height: `${lineProgress * 100}%` }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.2,
        }}
      />
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          item={item}
          index={index}
          total={timelineData.length}
          lineProgress={lineProgress}
        />
      ))}
    </div>
  );
};

const TimelineCard: React.FC<{
  item: any;
  index: number;
  total: number;
  lineProgress: number;
}> = ({ item, index, total, lineProgress }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const progress = (index + 1) / total;
  const isVisible = lineProgress >= progress;

  const variants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`flex ${
        index % 2 === 0
          ? "justify-end md:justify-start"
          : "justify-start md:justify-end"
      } relative mb-12 w-full items-center`}
      variants={variants}
      initial="hidden"
      animate={isInView && isVisible ? "visible" : "hidden"}
    >
      <motion.div
        className={`w-full rounded-lg bg-card p-6 text-left text-card-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card dark:text-card-foreground md:w-5/12 ${
          index % 2 === 0
            ? "border-r-2 md:text-right"
            : "border-l-2 md:text-left"
        } border-primary`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="mb-4 flex items-center md:hidden">
          <item.icon className="mr-2 h-8 w-8 text-primary dark:text-primary" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground dark:text-foreground">
            {item.title}
          </h3>
        </div>
        <h3 className="hidden text-xl font-semibold tracking-tight text-foreground dark:text-foreground md:block">
          {item.title}
        </h3>
        <span className="mt-1 block text-sm font-medium text-muted-foreground dark:text-muted-foreground">
          {item.year}
        </span>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-muted-foreground">
          {item.description}
        </p>
      </motion.div>
      <div
        className="absolute left-1/2 hidden h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full bg-card shadow-lg dark:bg-card dark:shadow-primary/20 md:flex"
        style={{ top: "50%" }}
      >
        <motion.div
          className="absolute flex h-16 w-16 transform items-center justify-center rounded-full bg-card shadow-lg dark:bg-card dark:shadow-primary/20"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <item.icon className="h-8 w-8 text-primary dark:text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="min-h-screen overflow-x-hidden text-gray-900 dark:text-gray-100"
    >
      <div className="container mx-auto flex flex-col px-4 py-16 sm:px-6 lg:px-8">
        <TopSection />
        <motion.section className="relative mb-20 flex-grow">
          <HobbiesSection />
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative flex-grow"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-40 text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
          >
            Experience
          </motion.h2>
          <Timeline />
        </motion.section>
        <section className="relative z-10 mt-40 flex flex-col items-center justify-start">
          <motion.div
            ref={buttonRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="mb-60 text-center"
          >
            <p className="text-lg text-muted-foreground dark:text-muted-foreground">
              View more..
            </p>
            <div className="flex flex-row gap-4">
              <Link href="/code" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex"
                  aria-label="Projects"
                >
                  <Button className="relative bg-primary px-6 py-4 text-lg text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Projects
                  </Button>
                </motion.a>
              </Link>

              <Link href="/work" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex"
                  aria-label="Work"
                >
                  <Button className="relative bg-secondary px-6 py-4 text-lg text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
                    Work
                  </Button>
                </motion.a>
              </Link>
            </div>
          </motion.div>

          <SocialLinks />
        </section>
      </div>
      <ScrollDownIndicator />
    </div>
  );
};

export default AboutPage;
