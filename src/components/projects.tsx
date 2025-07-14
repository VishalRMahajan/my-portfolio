"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { DATA } from "@/data";
import {
  Github,
  ExternalLink,
  Play,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectType {
  readonly title: string;
  readonly description: string;
  readonly content: readonly string[];
  readonly githubLink: string;
  readonly videosrc?: string;
  readonly deployed?: boolean;
  readonly deployedlink?: string;
}

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const projects = DATA.projects;

  const openVideoDialog = (project: ProjectType) => {
    if (project.videosrc) {
      setSelectedProject(project);
      setIsDialogOpen(true);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&showinfo=1&modestbranding=1&fs=1`;
  };

  const colorSchemes = [
    {
      border: "border-blue-500",
      bg: "bg-blue-500/10",
      accent: "text-blue-400",
    },
    {
      border: "border-green-500",
      bg: "bg-green-500/10",
      accent: "text-green-400",
    },
    {
      border: "border-purple-500",
      bg: "bg-purple-500/10",
      accent: "text-purple-400",
    },
    {
      border: "border-orange-500",
      bg: "bg-orange-500/10",
      accent: "text-orange-400",
    },
    {
      border: "border-pink-500",
      bg: "bg-pink-500/10",
      accent: "text-pink-400",
    },
  ];

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const project = projects[currentIndex];
  const colors = colorSchemes[currentIndex % colorSchemes.length];

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={`border-2 ${colors.border} ${colors.bg} backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-lg shadow-black relative overflow-hidden shadow-xl`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${
                colors.accent.split("-")[1]
              }-500 to-${colors.accent.split("-")[1]}-300`}
            ></div>

            <div className="p-4">
              <Text
                as="h4"
                className={`font-bold text-lg ${colors.accent} font-mono tracking-wide`}
              >
                {project.title}
              </Text>
              <Text className="text-gray-300 text-sm mt-1 font-mono">
                {project.description}
              </Text>

              <ul className="space-y-2 text-sm text-gray-100 mt-2 font-mono">
                {project.content.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span
                      className={`${colors.accent} mr-2 mt-1 text-xs font-mono`}
                    >
                      ▸
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 flex-wrap mt-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gray-500 text-white px-2 py-1 text-xs border border-gray-500/30 hover:bg-gray-500/30 hover:text-white transition-colors cursor-pointer font-mono shadow-sm"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>

                {project.videosrc && (
                  <button
                    onClick={() => openVideoDialog(project)}
                    className="inline-flex items-center gap-1 bg-red-500 text-white px-2 py-1 text-xs border border-red-500/30 hover:bg-red-500/30 hover:text-red-300 transition-colors cursor-pointer font-mono shadow-sm"
                    aria-label="Watch Video"
                  >
                    <Play className="w-3 h-3" />
                    Video
                  </button>
                )}

                {project.deployed && (
                  <a
                    href={project.deployedlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-green-500 text-white px-2 py-1 text-xs border border-green-500/30 hover:bg-green-500/30 hover:text-green-300 transition-colors cursor-pointer font-mono shadow-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center items-center gap-4 mt-2">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="bg-white text-black border-white"
          aria-label="Previous Project"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          {projects.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 border-2 border-white ${
                idx === currentIndex ? "bg-white" : "bg-transparent"
              } rounded-none`}
              style={{
                display: "inline-block",
                boxShadow: idx === currentIndex ? "2px 2px 0 #000" : undefined,
              }}
            ></span>
          ))}
        </div>
        <Button
          onClick={goToNext}
          variant="outline"
          className="bg-white text-black border-white"
          aria-label="Next Project"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content
          size="2xl"
          className="bg-black border-2 border-white w-full max-w-none mx-0 md:max-w-7xl md:mx-auto h-auto max-h-[80vh] md:max-h-[90vh] overflow-hidden shadow-xl"
        >
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="text-white hover:text-red-400 transition-colors"
              aria-label="Close Video Dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-0 w-full">
            {selectedProject?.videosrc && (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(selectedProject.videosrc)}
                  title={selectedProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog>

      <div className="flex justify-center mt-8">
        <a
          href={`${DATA.hero.social.GitHub}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-green-600 text-white border-2 border-black shadow-md flex items-center justify-center gap-2 py-2 px-4 hover:bg-green-500 hover:translate-y-0.5 hover:shadow-none transition-all"
            aria-label="View More Projects"
            style={{ borderRadius: "0px" }}
          >
            View More Projects
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Projects;
