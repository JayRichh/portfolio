"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageSection } from "../../components/page-container";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { ScrollToTop } from "../../components/ui/scroll-to-top";
import { ProjectButtons } from "../../components/ui/project-buttons";
import { Spotlight } from "../../components/ui/spotlight";
import { WordMapPreview } from "../resources/_components/WordMapPreview";
import { MindMapPreview } from "../resources/_components/MindMapPreview";
import { GitHubPreview } from "../resources/_components/GitHubPreview";
import { fetchGitHubContributions } from "../../lib/github";
import { useTheme } from "next-themes";
import { cn } from "../../utils/cn";

const TechTag = ({ children }) => (
  <span className="inline-block px-2.5 sm:px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 mr-1.5 mb-1.5 md:mr-2 md:mb-2 transition-all border border-primary/10 dark:border-primary/20">
    {children}
  </span>
);

const handleClick = () => {
  window.scroll({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
};

const Card = ({ href, title, description, PreviewComponent, className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (href === "/resources/github") {
      fetchGitHubContributions().catch(console.error);
    }
  }, [href]);

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

export default function ShowcasePage() {
  const isMobile = useScreenSize();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <ScrollProgress />
      <ScrollToTop />

      {/* Combined Hero and Resources Section */}
      <section className="relative w-full overflow-x-hidden bg-gradient-to-b from-background via-background/95 to-background py-16 sm:py-24 md:py-32">
        {/* Hero Content */}
        <div className="relative h-[50vh] flex items-center justify-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center"
          >
            <motion.span
              className="text-lg sm:text-xl md:text-2xl text-primary mb-4 md:mb-6 block font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to my
            </motion.span>
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Project Showcase
            </motion.h1>
            <motion.p
              className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Take a look at some of the projects I've developed, each
              reflecting unique facets of web development.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="animate-bounce mt-12 sm:mt-16 md:mt-24 cursor-pointer"
              onClick={handleClick}
            >
              <span className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Scroll to explore
              </span>
              <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-primary/50 dark:border-primary rounded-full mx-auto mt-2 md:mt-3 relative">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary/50 dark:bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Resources Content */}
        <div className="relative  mx-16 py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-background/50 to-background">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid h-full place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              {!isMobile && (
                <>
                  <Card
                    href="/resources/wordmap"
                    title="Word Cloud - Tech Stack"
                    description="Interactive word cloud visualization of my tech stack, with size indicating usage frequency and colors representing different categories"
                    PreviewComponent={WordMapPreview}
                    className={undefined}
                  />
                  <Card
                    href="/resources/learnings"
                    title="Mind Map - Learning Journey"
                    description="Structured overview of my programming knowledge, organized as an interactive mindmap with different categories and importance levels"
                    PreviewComponent={MindMapPreview}
                    className={undefined}
                  />
                </>
              )}
              <Card
                href="/resources/github"
                title="Calendar - GitHub Activity"
                description="Visual representation of my GitHub contribution activity, showing commit frequency and development patterns over time"
                PreviewComponent={GitHubPreview}
                className={undefined}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Container */}
      <div className="relative">
        {/* SteamShare Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-[#1b2838] dark:bg-[#1b2838] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <Spotlight
                  src="/images/steam4.png"
                  alt="SteamShare Main"
                  className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
                />
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <Spotlight
                    src="/images/steam2.png"
                    alt="SteamShare Gallery"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                  <Spotlight
                    src="/images/steam3.png"
                    alt="SteamShare Editor"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#66c0f4] dark:text-[#66c0f4]"
                >
                  SteamShare
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-zinc-200 dark:text-zinc-200 leading-relaxed">
                    Steam screenshot management platform with integrated gallery
                    organization and canvas editing. Features seamless Steam
                    authentication, real-time data fetch, and collage creation
                    tools.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>React 18</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Steam Web API</TechTag>
                    <TechTag>Fabric.js</TechTag>
                    <TechTag>Framer Motion</TechTag>
                  </div>
                  <ProjectButtons
                    liveUrl="https://steamshare.net"
                    codeUrl="https://github.com/JayRichh/steamshare"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>

        {/* CSS Battle Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-background/50 to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary dark:text-primary"
                >
                  CSS Battle
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed">
                    A full-featured web app for recreating CSS battles with
                    real-time previews, scoring based on accuracy and code
                    efficiency, and interactive comparison tools.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>Next.js</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Tailwind CSS</TechTag>
                    <TechTag>Monaco Editor</TechTag>
                    <TechTag>html2canvas</TechTag>
                  </div>
                  <ProjectButtons
                    liveUrl="https://domination.vercel.app"
                    codeUrl="https://github.com/JayRichh/domination"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8"
              >
                <Spotlight
                  src="/images/editor.png"
                  alt="CSS Battle Editor"
                  className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
                />
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <Spotlight
                    src="/images/compare.png"
                    alt="CSS Battle Comparison"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                  <Spotlight
                    src="/images/challenges.png"
                    alt="CSS Battle Challenges"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </PageSection>

        {/* Encompass Tours Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-emerald-950 to-background dark:from-emerald-950 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#4CAF50] dark:text-[#4CAF50]"
                >
                  Encompass Tours
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-emerald-100 dark:text-emerald-100 leading-relaxed">
                    Digital platform for NZ motorcycle tours using Vue and
                    Supabase. Features server-side caching, dynamic tour
                    management, and interactive route visualization.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>Vue.js</TechTag>
                    <TechTag>Supabase</TechTag>
                    <TechTag>Redis</TechTag>
                    <TechTag>Node.js</TechTag>
                    <TechTag>TypeScript</TechTag>
                  </div>
                  <ProjectButtons
                    liveUrl="https://encompasstours.co.nz"
                    codeUrl="https://github.com/JayRichh"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8"
              >
                <Spotlight
                  src="/images/encompass-hero.png"
                  alt="Encompass Tours Hero"
                  className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
                />
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <Spotlight
                    src="/images/encompass-about.png"
                    alt="Encompass Tours About"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                  <Spotlight
                    src="/images/encompass-contact.png"
                    alt="Encompass Tours Contact"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </PageSection>

        {/* PomoDev Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-rose-950 to-background dark:from-rose-950 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <Spotlight
                  src="/images/pomodev-logo.png"
                  alt="PomoDev Logo"
                  className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-zinc-900 p-8 md:p-12"
                />
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <Spotlight
                    src="/images/pomodev1.png"
                    alt="PomoDev Timer"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                  <Spotlight
                    src="/images/pomodev3.png"
                    alt="PomoDev Tasks"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#FF6B6B] dark:text-[#FF6B6B]"
                >
                  PomoDev
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-rose-100 dark:text-rose-100 leading-relaxed">
                    A Pomodoro Timer Chrome Extension designed to boost
                    productivity. Features customizable timers, task management,
                    and theme options, all built with modern web technologies.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>React</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Vite</TechTag>
                    <TechTag>Chrome Extension API</TechTag>
                    <TechTag>Firefox Add-on API</TechTag>
                  </div>
                  <ProjectButtons codeUrl="https://github.com/JayRichh/pomodev" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>

        {/* Aim Trainer Section */}
        <PageSection className="min-h-screen py-16 sm:py-24 md:py-32 flex items-center bg-gradient-to-b from-zinc-900 to-background dark:from-zinc-900 dark:to-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-10 dark:opacity-0" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-6 md:px-0 relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                <Spotlight
                  src="/images/workwaka.png"
                  alt="Work Waka Main"
                  className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
                />
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <Spotlight
                    src="/images/workmain.webp"
                    alt="Work Waka Dashboard"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                  <Spotlight
                    src="/images/moitsBoat.png"
                    alt="Work Waka Features"
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
              <div className="lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 order-1 lg:order-2">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-zinc-200 dark:text-zinc-200"
                >
                  The Work Waka
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4 md:space-y-6"
                >
                  <p className="text-base sm:text-lg md:text-2xl text-zinc-300 dark:text-zinc-300 leading-relaxed">
                    Job application and interview tracking platform with data
                    visualization, calendar integration, dynamic forms, and
                    Sankey diagram reports.
                  </p>
                  <div className="flex flex-wrap">
                    <TechTag>React</TechTag>
                    <TechTag>TypeScript</TechTag>
                    <TechTag>Next.js</TechTag>
                    <TechTag>D3.js</TechTag>
                    <TechTag>Tailwind CSS</TechTag>
                  </div>
                  <ProjectButtons
                    liveUrl="https://workwaka.vercel.app"
                    codeUrl="https://github.com/JayRichh/workwaka"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </PageSection>
      </div>
    </div>
  );
}
