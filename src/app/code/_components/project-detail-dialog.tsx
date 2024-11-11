import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { ExternalLink, Github } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

import {LoadingOverlay} from '../../../components/ui/loading-overlay';

import { Project } from '../../../lib/projectData';

interface ProjectDetailDialogProps {
  project: Project;
  onClose: () => void;
}

const Lightbox: React.FC<{
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-3xl text-white focus:outline-none"
      >
        &times;
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 text-3xl text-white focus:outline-none"
      >
        &#10094;
      </button>
      <div className="max-h-full max-w-full">
        <Image
          src={images[currentIndex]!.src}
          alt={images[currentIndex]!.alt}
          width={800}
          height={600}
          objectFit="contain"
        />
      </div>
      <button
        onClick={onNext}
        className="absolute right-4 text-3xl text-white focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  project,
  onClose,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const additionalImages = project.details.additionalImages.map((src) => ({
    src,
    alt: `${project.title} Additional Image`,
  }));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? additionalImages.length - 1 : prev - 1,
    );
  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === additionalImages.length - 1 ? 0 : prev + 1,
    );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-5xl overflow-y-auto p-4 sm:p-6 md:p-8">
        <DialogHeader>
          <div className="relative mb-4 h-40 w-full sm:mb-6 sm:h-48 md:mb-8 md:h-64">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingOverlay fullPage={false} displayLogo={false} />
              </div>
            )}
            <Image
              src={project.imgUrl}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className={`rounded-t-lg transition-opacity duration-500 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setIsImageLoading(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-black/60 p-2 sm:p-3 md:p-4">
              <DialogTitle className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                {project.details.title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
            {project.details.description}
          </p>
          <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

          <section>
            <h3 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
              Key Features
            </h3>
            <ul className="space-y-8 sm:space-y-10 md:space-y-12">
              {project.details.features.map((feature, index) => (
                <li key={index}>
                  <div className="mb-8 flex flex-col">
                    <div className="mb-4 w-full">
                      <h4 className="mb-2 text-xl font-bold">
                        {feature.title}
                      </h4>
                      <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                        {feature.text}
                      </p>
                    </div>
                    {feature.image && (
                      <div
                        className="mt-4 w-full cursor-pointer"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={600}
                          height={340}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded-lg shadow-lg"
                          onLoad={() => setIsImageLoading(false)}
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

          {project.details.challenges &&
            project.details.challenges.length > 0 && (
              <section>
                <h3 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
                  Challenges Encountered
                </h3>
                <ul className="space-y-8 sm:space-y-10 md:space-y-12">
                  {project.details.challenges.map((challenge, index) => (
                    <li key={index}>
                      <div className="mb-8 flex flex-col">
                        <div className="mb-4 w-full">
                          <h4 className="mb-2 text-xl font-bold">
                            {challenge.title}
                          </h4>
                          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                            {challenge.text}
                          </p>
                        </div>
                        {challenge.image && (
                          <div
                            className="mt-4 w-full cursor-pointer"
                            onClick={() => openLightbox(index)}
                          >
                            <Image
                              src={challenge.image}
                              alt={challenge.title}
                              width={600}
                              height={340}
                              layout="responsive"
                              objectFit="cover"
                              className="rounded-lg shadow-lg"
                              onLoad={() => setIsImageLoading(false)}
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

          {project.details.learnings &&
            project.details.learnings.length > 0 && (
              <section>
                <h3 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
                  Key Learnings
                </h3>
                {project.details.learnings.map((learning, index) => (
                  <div key={index} className="mb-6 sm:mb-8 md:mb-10">
                    <h4 className="mb-2 text-lg font-bold sm:mb-4 sm:text-xl">
                      {learning.title}
                    </h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:space-y-4 sm:text-base">
                      {learning.points.map((point, pointIndex) => (
                        <li key={pointIndex}>{point.text}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

          {project.details.additionalImages &&
            project.details.additionalImages.length > 0 && (
              <section>
                <h3 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
                  Additional Images
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {project.details.additionalImages.map((imageSrc, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="w-full"
                    >
                      <Image
                        src={imageSrc}
                        alt={`${project.title} Additional Image ${index + 1}`}
                        width={600}
                        height={400}
                        layout="responsive"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                      />
                    </button>
                  ))}
                </div>
                {lightboxOpen && (
                  <Lightbox
                    images={additionalImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onPrev={prevImage}
                    onNext={nextImage}
                  />
                )}
              </section>
            )}

          <hr className="border-t-2 border-gray-200 dark:border-gray-700" />

          <div className="mt-8 flex flex-col justify-end space-y-4 sm:mt-10 sm:flex-row sm:space-x-4 sm:space-y-0 md:mt-12">
            {project.liveUrl && (
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild className="w-full sm:w-auto">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} className="mr-2" />
                  Repository
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailDialog;