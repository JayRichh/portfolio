import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Spotlight } from "../../../components/ui/spotlight";
import { TechTag } from "./TechTag";
import { ProjectButtons } from "../../../components/ui/project-buttons";
import styles from "./ProjectCard.module.css";

interface ProjectImage {
  src: string;
  alt: string;
}

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  mainImage: ProjectImage;
  subImages: ProjectImage[];
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

const getPatternClass = (title: string): string => {
  switch (title) {
    case "SteamShare":
      return styles.steamPattern;
    case "CSS Battle":
      return styles.codePattern;
    case "Encompass Tours":
      return styles.mapPattern;
    case "PomoDev":
      return styles.timerPattern;
    case "The Work Waka":
      return styles.dataPattern;
    default:
      return "";
  }
};

export function ProjectCardVariant({
  title,
  description,
  technologies,
  mainImage,
  subImages,
  links,
  theme,
  reverse = false,
}: ProjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const id = title.toLowerCase().replace(/\s+/g, "");

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section id={id} className={styles.card}>
      <div className={theme.gradient}>
        <div className={`${styles.pattern} ${getPatternClass(title)}`} />
        <div className={styles.cardInner}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.5 }}
            className={styles.content}
          >
            <div className={styles.grid}>
              <div
                className={`lg:col-span-7 ${reverse ? "order-2" : "order-2 lg:order-1"}`}
              >
                <div className="relative">
                  <Spotlight
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className="h-[30vh] sm:h-[35vh] md:h-[45vh] rounded-2xl md:rounded-3xl shadow-2xl bg-background/5 backdrop-blur-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
                  {subImages.map((img, index) => (
                    <div key={index}>
                      <Spotlight
                        src={img.src}
                        alt={img.alt}
                        className="h-[15vh] sm:h-[18vh] md:h-[22vh] rounded-xl md:rounded-2xl shadow-xl bg-background/5 backdrop-blur-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`lg:col-span-5 ${reverse ? "order-1" : "order-1 lg:order-2"}`}
              >
                <div className="space-y-6 md:space-y-8">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariant}
                    transition={{ duration: 0.4 }}
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight ${theme.textColor}`}
                  >
                    {title}
                  </motion.h2>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariant}
                    transition={{ duration: 0.4, delay: 0.1 }}
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
