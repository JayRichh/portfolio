"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import {
  Code as CodeIcon,
  ExternalLink,
  Filter,
  Github,
  Pen,
  X,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Project, projectData } from "../../lib/projectData";
import { techIcons } from "../../lib/techIcons";

import ProjectDetailDialog from "./_components/project-detail-dialog";

// Universal relaxation function
export const universalRelaxation = (tech: string): string => {
  const techMap: Record<string, string[]> = {
    "Vue.js": ["Vue", "Vue3", "Vue 3", "VueJS", "Vue 2"],
    React: ["React.js", "ReactJS", "React 18"],
    "CSS Framework": ["CSS", "Tailwind CSS", "Bootstrap", "Styled-Components"],
    JavaScript: ["JS", "JavaScript", "ECMAScript"],
    TypeScript: ["TS", "TypeScript"],
    "Node.js": ["Node", "NodeJS", "Node.js"],
    Express: ["ExpressJS", "Express.js"],
    MongoDB: ["Mongo", "MongoDB", "Mongoose"],
    HTML5: ["HTML", "HTML5"],
    CSS3: ["CSS", "CSS3"],
    "Next.js": ["NextJS", "Next.js"],
    GSAP: ["GSAP"],
    Firebase: ["Firebase"],
    Vuex: ["Vuex"],
    Bootstrap: ["Bootstrap"],
    "Three.js": ["ThreeJS", "Three.js"],
    WebSockets: ["Socket.io", "WebSockets", "SocketIO"],
    "Physics Engine": [
      "Rapier",
      "Rapier Physics Engine",
      "CANNON.js",
      "CannonJS",
    ],
    AI: ["OpenAI", "Claude"],
    "Styled-Components": ["Styled-Components"],
  };

  for (const [key, aliases] of Object.entries(techMap)) {
    if (aliases.includes(tech)) {
      return key;
    }
  }
  return tech;
};

const techCategories: Record<string, string[]> = {
  Frameworks: ["Vue.js", "TypeScript", "Node.js", "React", "Next.js"],
  Other: ["Three.js", "CSS Framework", "Physics Engine", "AI"],
};

const CodePage: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projectData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleTechFilter = (tech: string) => {
    const normalizedTech = universalRelaxation(tech);
    setSelectedTech((prev) =>
      prev.includes(normalizedTech)
        ? prev.filter((t) => t !== normalizedTech)
        : [...prev, normalizedTech],
    );
  };

  const filterProjects = useCallback(() => {
    const filtered = selectedTech.length
      ? projectData.filter((project) =>
          selectedTech.every((tech) =>
            project.details.technologies
              .map(universalRelaxation)
              .includes(universalRelaxation(tech)),
          ),
        )
      : projectData;
    setFilteredProjects(filtered);
  }, [selectedTech]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const projectTitle = hash.replace(/-/g, " ");
      const project = projectData.find(
        (proj) => proj.title.toLowerCase() === projectTitle.toLowerCase(),
      );
      if (project) {
        setSelectedProject(project);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      router.push(
        `#${selectedProject.title.replace(/\s+/g, "-").toLowerCase()}`,
        { scroll: false },
      );
    } else {
      router.push("", { scroll: false });
    }
  }, [selectedProject, router]);
  const renderTechBadge = (
    tech: string,
    isActive: boolean = false,
    isClickable: boolean = true,
  ) => {
    const Icon = techIcons[tech]?.icon;
    const color = techIcons[tech]?.color || "#888";
    return (
      <Button
        key={tech}
        onClick={isClickable ? () => toggleTechFilter(tech) : undefined}
        className={`group relative m-1 flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? "dark:text-primary-light bg-primary/10 text-primary dark:bg-primary/20"
            : "dark:hover:text-primary-light hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10"
        }`}
        variant={isActive ? "secondary" : "ghost"}
      >
        <span className="flex w-full items-center justify-center">
          {Icon && (
            <span className="mr-2">
              <Icon size={14} />
            </span>
          )}
          <span className="truncate">{tech}</span>
        </span>
        {isActive && isClickable && (
          <span className="absolute -right-2 top-1/2 ml-2 -translate-y-1/2 rounded-full bg-red-400/70 px-2 py-1 text-sm text-xs font-bold font-semibold text-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100">
            X
          </span>
        )}
      </Button>
    );
  };

  const activeFilters = useMemo(() => {
    return selectedTech.map((tech) => renderTechBadge(tech, true));
  }, [selectedTech]);

  return (
    <div className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="mb-4 mt-16 text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl pb-8">
            Here’s a look at the web development projects I’ve worked on, with a
            range of technologies and approaches.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              className="group transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <Link
                href="https://codepen.io/jayrichh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Pen className="mr-2 h-5 w-5 transition-transform group-hover:rotate-45" />
                Explore CodePen
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <Link
                href="https://github.com/JayRichh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Browse GitHub
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="relative mb-4 w-full sm:w-[22rem]" ref={dropdownRef}>
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:bg-primary-dark inline-flex w-full items-center justify-between bg-primary px-6 py-3 text-lg text-white transition-all duration-300"
            >
              <span className="flex items-center">
                <Filter size={20} className="mr-2" />
                Filter by Technology
              </span>
              {selectedTech.length > 0 && (
                <span className="ml-2 rounded-full bg-white px-2 py-1 text-sm font-medium text-primary">
                  {selectedTech.length}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute left-0 z-10 mt-2 w-full rounded-lg border border-primary/10 bg-background p-6 shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {Object.entries(techCategories).map(([category, techs]) => (
                    <div key={category} className="mb-4">
                      <h3 className="mb-2 text-sm font-semibold text-primary">
                        {category}
                      </h3>
                      <div className="flex flex-wrap">
                        {techs.map((tech) =>
                          renderTechBadge(
                            tech,
                            selectedTech.includes(universalRelaxation(tech)),
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap sm:mt-0">{activeFilters}</div>
          )}
        </div>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div key={project.title} layout>
                <Card
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.imgUrl}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="mb-2 text-2xl">
                      {project.title}
                    </CardTitle>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap">
                      {project.details.technologies
                        .slice(0, 5)
                        .map((tech) => renderTechBadge(tech, false, false))}
                    </div>
                  </CardContent>
                  <CardFooter className="absolute bottom-0 left-0 right-0 flex justify-between bg-muted/80 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} className="mr-2" />
                          Repository
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <CodeIcon size={16} className="mr-2" />
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default CodePage;
