"use client";

import React, { useState } from "react";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Dialog } from "@/components/retroui/Dialog";
import { DATA } from "@/data";
import { Github, ExternalLink, Play, X } from "lucide-react";

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

  const openVideoDialog = (project: ProjectType) => {
    if (project.videosrc) {
      setSelectedProject(project);
      setIsDialogOpen(true);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&showinfo=1&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`;
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

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {DATA.projects.map((project: ProjectType, index) => {
          const colors = colorSchemes[index % colorSchemes.length];

          return (
            <Card
              key={index}
              className={`border-2 ${colors.border} ${colors.bg} backdrop-blur-sm hover:translate-y-[-2px] transition-all hover:shadow-lg shadow-black relative overflow-hidden shadow-xl`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${
                  colors.accent.split("-")[1]
                }-500 to-${colors.accent.split("-")[1]}-300`}
              ></div>

              <div className="p-4">
                <div className="block md:hidden">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <Text
                          as="h4"
                          className={`font-bold text-lg ${colors.accent} font-mono tracking-wide`}
                        >
                          {project.title}
                        </Text>
                        <Text className="text-gray-300 text-sm mt-1 font-mono">
                          {project.description}
                        </Text>
                      </div>
                    </div>

                    <div className="text-gray-100 text-sm leading-relaxed font-mono">
                      <ul className="space-y-2">
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
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
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
                </div>
                <div className="hidden md:flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <Text
                      as="h4"
                      className={`font-bold text-lg ${colors.accent} font-mono tracking-wide`}
                    >
                      {project.title}
                    </Text>
                    <Text className="text-gray-300 text-sm mt-1 font-mono">
                      {project.description}
                    </Text>

                    <div className="text-gray-100 text-sm leading-relaxed mt-2 font-mono">
                      <ul className="space-y-2">
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
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
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
              </div>
            </Card>
          );
        })}
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
    </div>
  );
};

export default Projects;
