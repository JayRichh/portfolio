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
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      onClick={() => onSelect(project)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={project.imgUrl}
            alt={project.title}
            fill
            priority={index < 6}
            sizes={IMAGE_CONFIG.SIZES}
            className={`
              object-cover transition-transform duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              ${imageLoaded ? "group-hover:scale-105" : ""}
            `}
            quality={IMAGE_CONFIG.QUALITY}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 text-2xl line-clamp-1">
          {project.title}
        </CardTitle>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.details.technologies
            .slice(0, TECH_DISPLAY_LIMIT)
            .map((tech) => (
              <TechBadge key={tech} tech={tech} isClickable={false} />
            ))}
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 bg-muted/80 p-4 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex justify-between">
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
        </div>
      </div>
    </Card>
  );
};
