import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github, ImageIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { LoadingOverlay } from "../../../components/ui/loading-overlay";
import { Project } from "../../../lib/projectData";
import { Lightbox } from "./lightbox";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoadingComplete?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  ...props
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};

interface ProjectDetailDialogProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  project,
  onClose,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Collect all images
  const allImages = [
    { src: project.imgUrl, alt: project.title },
    ...project.details.features
      .filter((f) => f.image)
      .map((f) => ({ src: f.image!, alt: f.title })),
    ...(project.details.challenges || [])
      .filter((c) => c.image)
      .map((c) => ({ src: c.image!, alt: c.title })),
    ...(project.details.additionalImages || []).map((src) => ({
      src,
      alt: `${project.title} Gallery Image`,
    })),
  ].filter((img) => img.src);

  const handleImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto bg-white p-0 dark:bg-gray-900">
          <DialogHeader className="relative mb-6">
            <div
              className="relative aspect-video w-full cursor-pointer overflow-hidden"
              onClick={() => handleImageClick(0)}
            >
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <LoadingOverlay fullPage={false} displayLogo={false} />
                </div>
              )}
              <Image
                src={project.imgUrl}
                alt={project.title}
                fill
                sizes="100vw"
                className={`object-cover transition-opacity duration-500 ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoadingComplete={() => setIsImageLoading(false)}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <DialogTitle className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  {project.details.title}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8 px-4 sm:px-6 md:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {project.details.description}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
              <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.details.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Key Features
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {project.details.features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {feature.text}
                    </p>
                    {feature.image && (
                      <div
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => handleImageClick(index + 1)}
                      >
                        <ImageWithFallback
                          src={feature.image}
                          alt={feature.title}
                          className="transform transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {project.details.challenges?.length > 0 && (
              <section className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
                <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Challenges Encountered
                </h3>
                <div className="space-y-6">
                  {project.details.challenges.map((challenge, index) => {
                    const imageIndex =
                      project.details.features.filter((f) => f.image).length +
                      index +
                      1;
                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {challenge.text}
                        </p>
                        {challenge.image && (
                          <div
                            className="mt-4 cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => handleImageClick(imageIndex)}
                          >
                            <ImageWithFallback
                              src={challenge.image}
                              alt={challenge.title}
                              className="transform transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {project.details.learnings?.length > 0 && (
              <section className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
                <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Key Learnings
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {project.details.learnings.map((learning, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                        {learning.title}
                      </h4>
                      <ul className="space-y-3">
                        {learning.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="flex items-start space-x-2 text-gray-600 dark:text-gray-400"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                            <span>{point.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.details.additionalImages?.length > 0 && (
              <section>
                <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Project Gallery
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {project.details.additionalImages.map((imageSrc, index) => {
                    const galleryIndex =
                      1 +
                      project.details.features.filter((f) => f.image).length +
                      (project.details.challenges?.filter((c) => c.image)
                        .length || 0) +
                      index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleImageClick(galleryIndex)}
                        className="group relative aspect-video overflow-hidden rounded-lg"
                      >
                        <Image
                          src={imageSrc}
                          alt={`${project.title} Gallery Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <div className="flex flex-col justify-end space-y-4 pb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
              {project.liveUrl && (
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  asChild
                  className="w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 sm:w-auto"
                >
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    <Github size={16} className="mr-2" />
                    View Repository
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() =>
            setCurrentImageIndex((prev) =>
              prev === 0 ? allImages.length - 1 : prev - 1,
            )
          }
          onNext={() =>
            setCurrentImageIndex((prev) =>
              prev === allImages.length - 1 ? 0 : prev + 1,
            )
          }
        />
      )}
    </>
  );
};

export default ProjectDetailDialog;
