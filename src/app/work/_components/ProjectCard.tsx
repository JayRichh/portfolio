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
    case "Checkpoint":
      return "group-[]/checkpoint:text-indigo-600 dark:group-[]/checkpoint:text-indigo-400 font-[650]";
    case "SteamShare":
      return "group-[]/steam:text-blue-600 dark:group-[]/steam:text-blue-400 font-[650]";
    case "CSS Battle":
      return "group-[]/css:text-purple-600 dark:group-[]/css:text-purple-400 font-[650]";
    case "Golf2Go":
      return "group-[]/golf:text-emerald-600 dark:group-[]/golf:text-emerald-400 font-[650]";
    case "Encompass Tours":
      return "group-[]/tours:text-teal-600 dark:group-[]/tours:text-teal-400 font-[650]";
    case "PomoDev":
      return "group-[]/pomo:text-red-600 dark:group-[]/pomo:text-red-400 font-[650]";
    case "The Work Waka":
      return "group-[]/waka:text-slate-600 dark:group-[]/waka:text-slate-400 font-[650]";
    default:
      return "text-gray-900 dark:text-gray-100 font-[650]";
  }
};

const getGroupName = (title: string): string => {
  switch (title) {
    case "Checkpoint": return "group/checkpoint";
    case "SteamShare": return "group/steam";
    case "CSS Battle": return "group/css";
    case "Golf2Go": return "group/golf";
    case "Encompass Tours": return "group/tours";
    case "PomoDev": return "group/pomo";
    case "The Work Waka": return "group/waka";
    default: return "";
  }
};

const getBackgroundStyle = (title: string): string => {
  switch (title) {
    case "Checkpoint":
      return "group-[]/checkpoint:bg-gradient-to-tr from-indigo-100/30 via-white to-transparent dark:from-indigo-950/30 dark:via-transparent";
    case "SteamShare":
      return "group-[]/steam:bg-gradient-to-br from-blue-100/30 via-sky-100/20 to-transparent dark:from-blue-950/30 dark:via-sky-950/20";
    case "CSS Battle":
      return "group-[]/css:bg-gradient-to-bl from-purple-100/30 via-fuchsia-100/20 to-transparent dark:from-purple-950/30 dark:via-fuchsia-950/20";
    case "Golf2Go":
      return "group-[]/golf:bg-gradient-to-tr from-emerald-100/30 via-green-100/20 to-transparent dark:from-emerald-950/30 dark:via-green-950/20";
    case "Encompass Tours":
      return "group-[]/tours:bg-gradient-to-br from-teal-100/30 via-cyan-100/20 to-transparent dark:from-teal-950/30 dark:via-cyan-950/20";
    case "PomoDev":
      return "group-[]/pomo:bg-gradient-to-bl from-red-100/30 via-rose-100/20 to-transparent dark:from-red-950/30 dark:via-rose-950/20";
    case "The Work Waka":
      return "group-[]/waka:bg-gradient-to-tr from-slate-100/30 via-gray-100/20 to-transparent dark:from-slate-950/30 dark:via-gray-950/20";
    default:
      return "bg-gradient-to-br from-gray-100/30 to-transparent dark:from-gray-950/30";
  }
};

const getDescriptionStyle = (title: string): string => {
  switch (title) {
    case "Checkpoint":
      return "group-[]/checkpoint:text-indigo-950 dark:group-[]/checkpoint:text-indigo-200 tracking-wide";
    case "SteamShare":
      return "group-[]/steam:text-blue-950 dark:group-[]/steam:text-blue-200 tracking-wide";
    case "CSS Battle":
      return "group-[]/css:text-purple-950 dark:group-[]/css:text-purple-200 tracking-wide";
    case "Golf2Go":
      return "group-[]/golf:text-emerald-950 dark:group-[]/golf:text-emerald-200 tracking-wide";
    case "Encompass Tours":
      return "group-[]/tours:text-teal-950 dark:group-[]/tours:text-teal-200 tracking-wide";
    case "PomoDev":
      return "group-[]/pomo:text-red-950 dark:group-[]/pomo:text-red-200 tracking-wide";
    case "The Work Waka":
      return "group-[]/waka:text-slate-950 dark:group-[]/waka:text-slate-200 tracking-wide";
    default:
      return "text-gray-800 dark:text-gray-200 tracking-wide";
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
      <div className={cn(
        "relative min-h-screen transition-colors duration-500",
        getBackgroundStyle(title)
      )}>
        <div className="mx-auto max-w-[90rem] p-4 sm:p-6 md:p-8 lg:p-16">
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
                      "text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight",
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
                    <p className={cn(
                      "text-base sm:text-lg md:text-2xl leading-relaxed font-medium",
                      getDescriptionStyle(title)
                    )}>
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
