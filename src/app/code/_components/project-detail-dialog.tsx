import React, { useEffect, useState, useCallback, MouseEvent } from "react";
import Image from "next/image";
import { ExternalLink, Github, X, ImageIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { LoadingOverlay } from "../../../components/ui/loading-overlay";
import { Project } from "../../../lib/projectData";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
  priority?: boolean;
  onLoadingComplete?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
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
    <Image src={src} alt={alt} onError={() => setError(true)} {...props} />
  );
};

const Lightbox: React.FC<{
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none"
          style={{ zIndex: 100000 }}
        >
          <X size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none"
          style={{ zIndex: 100000 }}
        >
          &#10094;
        </button>
        <div 
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageWithFallback
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={1200}
            height={800}
            className="h-auto w-auto object-contain"
            priority
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none"
          style={{ zIndex: 100000 }}
        >
          &#10095;
        </button>
      </div>
    </div>,
    document.body,
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

  // Collect all valid images from the project
  const allImages = [
    // Hero image
    { src: project.imgUrl, alt: project.title },
    // Feature images
    ...project.details.features
      .filter((feature) => feature.image && typeof feature.image === "string")
      .map((feature) => ({
        src: feature.image!,
        alt: feature.title,
      })),
    // Challenge images
    ...(project.details.challenges || [])
      .filter(
        (challenge) => challenge.image && typeof challenge.image === "string",
      )
      .map((challenge) => ({
        src: challenge.image!,
        alt: challenge.title,
      })),
    // Additional images
    ...(project.details.additionalImages || [])
      .filter((src) => src && typeof src === "string")
      .map((src) => ({
        src,
        alt: `${project.title} Additional Image`,
      })),
  ].filter((img) => img && img.src);

  const openLightbox = (index: number) => {
    if (index >= 0 && index < allImages.length) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  }, [allImages.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1,
    );
  }, [allImages.length]);

  // Calculate image indices
  const getFeatureImageIndex = (featureIndex: number) => {
    return 1 + featureIndex; // Offset by 1 for hero image
  };

  const getChallengeImageIndex = (challengeIndex: number) => {
    const featureImagesCount = project.details.features.filter(
      (f) => f.image,
    ).length;
    return 1 + featureImagesCount + challengeIndex;
  };

  const getGalleryImageIndex = (galleryIndex: number) => {
    const featureImagesCount = project.details.features.filter(
      (f) => f.image,
    ).length;
    const challengeImagesCount = (project.details.challenges || []).filter(
      (c) => c.image,
    ).length;
    return 1 + featureImagesCount + challengeImagesCount + galleryIndex;
  };

  return (
    <>
      <Dialog 
        open 
        onOpenChange={(open) => {
          if (!open && !lightboxOpen) {
            onClose();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto bg-white p-0 dark:bg-gray-900">
          <DialogHeader className="relative mb-6">
            <div
              className="relative min-h-[50vh] w-full cursor-pointer overflow-hidden"
              onClick={() => openLightbox(0)}
            >
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <LoadingOverlay fullPage={false} displayLogo={false} />
                </div>
              )}
              <ImageWithFallback
                src={project.imgUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className={`transition-opacity duration-500 ${
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
                        className="relative mt-4 cursor-pointer overflow-hidden rounded-lg"
                        onClick={() =>
                          openLightbox(getFeatureImageIndex(index))
                        }
                      >
                        <ImageWithFallback
                          src={feature.image}
                          alt={feature.title}
                          width={600}
                          height={340}
                          className="transform transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {project.details.challenges &&
              project.details.challenges.length > 0 && (
                <section className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
                  <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Challenges Encountered
                  </h3>
                  <div className="space-y-6">
                    {project.details.challenges.map((challenge, index) => (
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
                            className="relative mt-4 cursor-pointer overflow-hidden rounded-lg"
                            onClick={() =>
                              openLightbox(getChallengeImageIndex(index))
                            }
                          >
                            <ImageWithFallback
                              src={challenge.image}
                              alt={challenge.title}
                              width={600}
                              height={340}
                              className="transform transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {project.details.learnings &&
              project.details.learnings.length > 0 && (
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

            {project.details.additionalImages &&
              project.details.additionalImages.length > 0 && (
                <section>
                  <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {project.details.additionalImages.map((imageSrc, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          openLightbox(getGalleryImageIndex(index))
                        }
                        className="group relative aspect-video overflow-hidden rounded-lg"
                      >
                        <ImageWithFallback
                          src={imageSrc}
                          alt={`${project.title} Gallery Image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transform transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      </button>
                    ))}
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
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
};

export default ProjectDetailDialog;
