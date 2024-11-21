"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Pen } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Project, projectData } from "../../lib/projectData";

import { FilterSection } from "./_components/filter-section";
import { ProjectGrid } from "./_components/project-grid";
import ProjectDetailDialog from "./_components/project-detail-dialog";
import { ImagePreloader } from "./_components/image-preloader";
import { useProjectFiltering } from "./_hooks/useProjectFiltering";
import { EXTERNAL_LINKS } from "./_constants";
import {
  PageSection,
  PageTitle,
  PageDescription,
} from "../../components/page-container";

const CodePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const {
    selectedTech,
    filteredProjects,
    sortByRecent,
    isLoading,
    toggleTechFilter,
    setSortByRecent,
    setIsLoading,
  } = useProjectFiltering();

  useEffect(() => {
    setMounted(true);
    // Prefetch about and learnings pages
    router.prefetch("/about");
    router.prefetch("/learnings");
  }, [router]);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (selectedProject) {
      router.push(
        `#${selectedProject.title.replace(/\s+/g, "-").toLowerCase()}`,
        { scroll: false },
      );
    } else {
      router.push("", { scroll: false });
    }
  }, [selectedProject, router, mounted]);

  if (!mounted) {
    return (
      <PageSection>
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <PageTitle>Projects</PageTitle>
            <PageDescription>
              Here's a look at the web development projects I've worked on, with
              a range of technologies and approaches.
            </PageDescription>
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <ImagePreloader
        projects={projectData}
        onLoadComplete={() => setIsLoading(false)}
      />
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12">
          <PageTitle>Projects</PageTitle>
          <PageDescription>
            Here's a look at the web development projects I've worked on, with a
            range of technologies and approaches.
          </PageDescription>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              className="group transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <Link
                href={EXTERNAL_LINKS.CODEPEN}
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
                href={EXTERNAL_LINKS.GITHUB}
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

        <FilterSection
          selectedTech={selectedTech}
          isDropdownOpen={isDropdownOpen}
          sortByRecent={sortByRecent}
          toggleTechFilter={toggleTechFilter}
          setIsDropdownOpen={setIsDropdownOpen}
          setSortByRecent={setSortByRecent}
        />

        <ProjectGrid
          isLoading={isLoading}
          filteredProjects={filteredProjects}
          onSelectProject={setSelectedProject}
        />
      </div>

      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </PageSection>
  );
};

export default CodePage;
