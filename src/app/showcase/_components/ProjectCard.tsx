import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Spotlight } from "../../../components/ui/spotlight";
import { TechTag } from "./TechTag";
import { ProjectButtons } from "../../../components/ui/project-buttons";
import { cn } from "../../../utils/cn";

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

const getProjectStyles = (title: string): string => {
  switch (title) {
    case "SteamShare":
      return "group-[]/steam:text-blue-600 dark:group-[]/steam:text-blue-300";
    case "CSS Battle":
      return "group-[]/css:text-purple-600 dark:group-[]/css:text-purple-300";
    case "Golf2Go":
      return "group-[]/golf:text-emerald-600 dark:group-[]/golf:text-emerald-300";
    case "Encompass Tours":
      return "group-[]/tours:text-teal-600 dark:group-[]/tours:text-teal-300";
    case "PomoDev":
      return "group-[]/pomo:text-red-600 dark:group-[]/pomo:text-red-300";
    case "The Work Waka":
      return "group-[]/waka:text-slate-600 dark:group-[]/waka:text-slate-300";
    default:
      return "text-gray-900 dark:text-gray-100";
  }
};

const getGroupName = (title: string): string => {
  switch (title) {
    case "SteamShare": return "group/steam";
    case "CSS Battle": return "group/css";
    case "Golf2Go": return "group/golf";
    case "Encompass Tours": return "group/tours";
    case "PomoDev": return "group/pomo";
    case "The Work Waka": return "group/waka";
    default: return "";
  }
};

const getPatternClass = (title: string): string => {
  switch (title) {
    case "SteamShare":
      return "bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-500/5 animate-steam";
    case "CSS Battle":
      return "bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-500/5";
    case "Encompass Tours":
      return "bg-gradient-to-br from-emerald-500/10 to-transparent dark:from-emerald-500/5";
    case "PomoDev":
      return "bg-gradient-to-br from-red-500/10 to-transparent dark:from-red-500/5 animate-pomo";
    case "The Work Waka":
      return "bg-gradient-to-br from-gray-500/10 to-transparent dark:from-gray-500/5";
    default:
      return "bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-500/5";
  }
};

export function ProjectCard({
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
  const groupName = getGroupName(title);

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section id={id} className={cn(
      "w-full scroll-mt-[100px] relative overflow-hidden",
      groupName
    )}>
      <div className={theme.gradient}>
        <div className={cn(
          "absolute inset-0 opacity-20 mix-blend-soft-light",
          getPatternClass(title)
        )} />
        <div className="mx-auto max-w-[90rem] min-h-screen p-4 sm:p-6 md:p-8 lg:p-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariant}
            transition={{ duration: 0.5 }}
            className="w-full relative"
          >
            <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-12 lg:gap-16">
              <div className={cn(
                "lg:col-span-7",
                reverse ? "order-2" : "order-2 lg:order-1"
              )}>
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

              <div className={cn(
                "lg:col-span-5",
                reverse ? "order-1" : "order-1 lg:order-2"
              )}>
                <div className="space-y-6 md:space-y-8">
                  <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariant}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight",
                      getProjectStyles(title)
                    )}
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
                    <p className="text-base sm:text-lg md:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed tracking-wide font-medium">
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
