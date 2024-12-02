import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../../../components/ui/spotlight";
import { TechTag } from "./TechTag";
import { ProjectButtons } from "../../../components/ui/project-buttons";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  mainImage: {
    src: string;
    alt: string;
  };
  subImages: Array<{
    src: string;
    alt: string;
  }>;
  links: {
    live?: string;
    code?: string;
  };
  theme: {
    textColor: string;
    gradient: string;
  };
  reverse?: boolean;
}

export function ProjectCard({
  title,
  description,
  technologies,
  mainImage,
  subImages,
  links,
  theme,
  reverse = false,
}: ProjectCardProps) {
  // Create ID from title for scroll navigation
  const id = title.toLowerCase().replace(/\s+/g, "");

  return (
    <section id={id} className={`w-full ${theme.gradient} scroll-mt-[100px]`}>
      <div className="mx-auto max-w-[90rem] min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="w-full relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={`lg:col-span-7 space-y-6 md:space-y-8 ${
                reverse ? "order-2" : "order-2 lg:order-1"
              }`}
            >
              <Spotlight
                src={mainImage.src}
                alt={mainImage.alt}
                className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
              />
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {subImages.map((img, index) => (
                  <Spotlight
                    key={index}
                    src={img.src}
                    alt={img.alt}
                    className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                  />
                ))}
              </div>
            </motion.div>
            <div
              className={`lg:col-span-5 space-y-6 sm:space-y-8 md:space-y-10 ${
                reverse ? "order-1" : "order-1 lg:order-2"
              }`}
            >
              <motion.h2
                initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight ${theme.textColor}`}
              >
                {title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6 md:space-y-8"
              >
                <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-gray-200 leading-relaxed tracking-wide">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </div>
                <ProjectButtons liveUrl={links.live} codeUrl={links.code} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
