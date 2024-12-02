"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CodeIcon, ExternalLink, Github } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Project } from "../../../lib/projectData";
import { IMAGE_CONFIG, TECH_DISPLAY_LIMIT } from "../_constants";
import { TechBadge } from "./tech-badge";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-[1px] border-border/40 bg-card/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-lg hover:shadow-primary/5"
      onClick={() => onSelect(project)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
          <Image
            src={project.imgUrl}
            alt={project.title}
            fill
            priority={index < 6}
            sizes={IMAGE_CONFIG.SIZES}
            className={`
              object-cover transition-all duration-500 ease-in-out
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              ${imageLoaded ? "group-hover:scale-110" : ""}
            `}
            quality={IMAGE_CONFIG.QUALITY}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col p-6 xs:p-4">
        <CardTitle className="mb-3 text-2xl xs:text-xl line-clamp-1">
          {project.title}
        </CardTitle>
        <p className="mb-4 text-sm xs:text-xs text-muted-foreground/90 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.details.technologies
            .slice(0, TECH_DISPLAY_LIMIT)
            .map((tech) => (
              <TechBadge key={tech} tech={tech} isClickable={false} />
            ))}
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-4 xs:p-2 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="flex justify-between gap-2 xs:gap-1">
          {project.liveUrl && (
            <Button variant="secondary" size="sm" className="flex-1" asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="mr-2 xs:mr-0" />
                <span className="xs:hidden">Live Demo</span>
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="secondary" size="sm" className="flex-1" asChild>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} className="mr-2 xs:mr-0" />
                <span className="xs:hidden">Repository</span>
              </Link>
            </Button>
          )}
          <Button variant="secondary" size="sm" className="flex-1">
            <CodeIcon size={16} className="mr-2 xs:mr-0" />
            <span className="xs:hidden">Details</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
