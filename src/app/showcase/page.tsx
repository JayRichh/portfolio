"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ScrollProgress } from "../../components/ui/scroll-progress";
import { ScrollToTop } from "../../components/ui/scroll-to-top";
import { HeroSection } from "./_components/HeroSection";
import { ResourcesSection } from "./_components/ResourcesSection";
import { ProjectCard } from "./_components/ProjectCard";
import { projectsData } from "../../lib/work-projects";

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

const handleScroll = () => {
  window.scroll({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

export default function WorkPage() {
  const isMobile = useScreenSize();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 40,
  });

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <ScrollProgress />
      <ScrollToTop />

      <div className="relative min-h-screen">
        <HeroSection onScrollClick={handleScroll} />
      </div>

      <div className="relative">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="sticky top-0 min-h-screen"
            style={{
              zIndex: projectsData.length - index,
              willChange: "transform",
            }}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true, margin: "-20%" }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      <div className="relative min-h-screen">
        <ResourcesSection isMobile={isMobile} />
      </div>
    </div>
  );
}
