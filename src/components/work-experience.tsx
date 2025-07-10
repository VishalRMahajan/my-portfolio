"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { DATA } from "@/data";
import { Badge } from "./retroui/Badge";
import Image from "next/image";

const WorkExperience = () => {
  const skillColors: Record<string, { bg: string; text: string }> = {
    nodejs: { bg: "bg-green-600", text: "text-white" },
    express: { bg: "bg-gray-700", text: "text-white" },
  };

  return (
    <div className="space-y-8">
      {DATA.work.map((job, index) => (
        <motion.div
          key={`${job.company}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="max-w-full"
        >
          <Card className="overflow-hidden border-2 border-black bg-black/30 backdrop-blur-sm hover:translate-y-[-2px] transition-all w-full">
            <div className="flex flex-col p-4 sm:hidden">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-md border-2 border-black p-2 shadow-md">
                  {job.logoUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={job.logoUrl}
                        alt={job.company}
                        width={500}
                        height={500}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-black font-bold">
                        {job.company.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center mb-3">
                <Text as="h4" className="font-bold text-2xl text-white mb-1">
                  {job.title}
                </Text>
                <a
                  href={job.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:underline"
                >
                  <Text className="text-yellow-400 font-medium text-lg">
                    @ {job.company}
                  </Text>
                </a>
              </div>

              <div className="flex flex-col items-center gap-2 mb-3">
                <div
                  className="px-3 py-1.5 bg-gray-800 border-2 border-black text-white text-sm font-bold rounded shadow-sm"
                  style={{ imageRendering: "pixelated" }}
                >
                  {job.start} - {job.end}
                </div>

                <Badge className="inline-flex items-center gap-1.5 bg-gray-700 text-white px-3 py-1 rounded border-2 border-black shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {job.location}
                </Badge>
              </div>

              <div className="mb-4">
                <Text className="text-gray-100 text-base text-center">
                  {job.description}
                </Text>
              </div>

              {job.Skills && job.Skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {job.Skills.map((skill, i) => {
                    const skillLower = skill.toLowerCase();
                    const colors = skillColors[skillLower] || {
                      bg: "bg-gray-600",
                      text: "text-white",
                    };

                    return (
                      <Badge
                        key={i}
                        className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} px-3 py-1.5 rounded border-2 border-black shadow-sm`}
                      >
                        <Image
                          src={`https://skillicons.dev/icons?i=${skillLower}`}
                          alt={skill}
                          width={16}
                          height={16}
                          className="w-5 h-5"
                          style={{ imageRendering: "pixelated" }}
                        />
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="hidden sm:flex sm:flex-row gap-4 p-6">
              <div className="w-24 h-24 flex-shrink-0 bg-white rounded-md border-2 border-black p-2 shadow-md">
                {job.logoUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={job.logoUrl}
                      alt={job.company}
                      width={500}
                      height={500}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-black font-bold">
                      {job.company.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <Text
                      as="h4"
                      className="font-bold text-2xl text-white mb-1"
                    >
                      {job.title}
                    </Text>
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block hover:underline"
                    >
                      <Text className="text-yellow-400 font-medium text-lg">
                        @ {job.company}
                      </Text>
                    </a>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div
                      className="px-3 py-1.5 bg-gray-800 border-2 border-black text-white text-sm font-bold rounded shadow-sm"
                      style={{ imageRendering: "pixelated" }}
                    >
                      {job.start} - {job.end}
                    </div>

                    <Badge className="inline-flex items-center gap-1.5 bg-gray-700 text-white px-3 py-1 rounded border-2 border-black shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                      </svg>
                      {job.location}
                    </Badge>
                  </div>
                </div>

                <div className="mb-5">
                  <Text className="text-gray-100 text-base">
                    {job.description}
                  </Text>
                </div>

                {job.Skills && job.Skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.Skills.map((skill, i) => {
                      const skillLower = skill.toLowerCase();
                      const colors = skillColors[skillLower] || {
                        bg: "bg-gray-600",
                        text: "text-white",
                      };

                      return (
                        <Badge
                          key={i}
                          className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} px-3 py-1.5 rounded border-2 border-black shadow-sm`}
                        >
                          <Image
                            src={`https://skillicons.dev/icons?i=${skillLower}`}
                            alt={skill}
                            width={500}
                            height={500}
                            className="w-5 h-5"
                            style={{ imageRendering: "pixelated" }}
                          />
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkExperience;
