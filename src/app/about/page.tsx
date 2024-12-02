"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Book,
  Code,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Zap,
} from "lucide-react";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "next-themes";

import { Button } from "../../components/ui/button";
import HobbiesSection from "./_components/about-hobbies";
import { useGitHubStore } from "../../lib/github";

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

const TopSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { languageData } = useGitHubStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pieData =
    languageData?.languages.map(({ name, percentage, color }) => ({
      id: name,
      label: name,
      value: percentage,
      color: color || "#666",
    })) || [];

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center overflow-visible px-4 md:px-8">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-screen-xl"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 pt-24 text-center text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl"
        >
          Technology
        </motion.h2>
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
  const [containerHeight, setContainerHeight] = useState("auto");
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getLineHeightProgress = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return [0.1, 0.9];
      } else if (window.innerWidth < 1024) {
        return [0.12, 0.95];
      } else {
        return [0.15, 0.95];
      }
    }
    return [0.15, 0.95];
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, getLineHeightProgress(), [
    "0%",
    "100%",
  ]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ minHeight: containerHeight }}
    >
      <motion.div
        className="absolute left-1/2 top-0 hidden w-0.5 rounded-full bg-gray-300 dark:bg-gray-600 md:block"
        style={{
          height: lineHeight,
          transformOrigin: "top",
          left: "calc(50% - 1px)",
          top: "150px",
          bottom: "150px",
        }}
      />
      {timelineData.map((item, index) => (
        <TimelineCard
          key={index}
          item={item}
          index={index}
          total={timelineData.length}
        />
      ))}
    </div>
  );
};

const TimelineCard: React.FC<{ item: any; index: number; total: number }> = ({
  item,
  index,
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className={`flex ${index % 2 === 0 ? "justify-end md:justify-start" : "justify-start md:justify-end"} relative mb-12 w-full items-center`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`w-full rounded-lg bg-card p-6 text-left text-card-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card dark:text-card-foreground md:w-5/12 ${index % 2 === 0 ? "border-r-2 md:text-right" : "border-l-2 md:text-left"} border-primary`}
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
      </div>
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="mb-60 text-center"
          >
            <Link href="/code" passHref legacyBehavior>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-primary px-6 py-6 text-lg text-primary-foreground hover:bg-primary/90">
                  View Projects
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <SocialLinks />
        </section>
      </div>
      <ScrollDownIndicator />
    </div>
  );
};

export default AboutPage;
