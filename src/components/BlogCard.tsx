"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DATA } from "@/data";
import { SiMedium } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

const colorSchemes = [
  {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    accent: "text-blue-400",
    badge: "bg-blue-700",
  },
  {
    border: "border-green-500",
    bg: "bg-green-500/10",
    accent: "text-green-400",
    badge: "bg-green-700",
  },
  {
    border: "border-purple-500",
    bg: "bg-purple-500/10",
    accent: "text-purple-400",
    badge: "bg-purple-700",
  },
  {
    border: "border-orange-500",
    bg: "bg-orange-500/10",
    accent: "text-orange-400",
    badge: "bg-orange-700",
  },
  {
    border: "border-pink-500",
    bg: "bg-pink-500/10",
    accent: "text-pink-400",
    badge: "bg-pink-700",
  },
];

const BlogCard = () => {
  const blogs = DATA.blogs;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    if (blogs.length <= 1) return;
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, blogs.length]);

  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const blog = blogs[currentIndex];
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
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card
              className={`border-2 ${colors.border} ${colors.bg} backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:shadow-lg shadow-black relative overflow-hidden shadow-lg cursor-pointer`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${
                  colors.accent.split("-")[1]
                }-500 to-${colors.accent.split("-")[1]}-300`}
              ></div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <Text className={`font-bold text-base ${colors.accent}`}>
                    {blog.title}
                  </Text>
                  <Badge
                    className={`hidden sm:inline-flex items-center gap-1.5 ${colors.badge} text-white px-3 py-1 rounded border-2 border-black shadow-sm`}
                  >
                    <SiMedium className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold">
                      {blog.platform}
                    </span>
                  </Badge>
                </div>
                <Text className="text-gray-300 text-sm mb-2">
                  {blog.description}
                </Text>
                <Badge className="bg-gray-600 text-white px-3 py-1 rounded border-2 border-black shadow-sm text-xs w-fit">
                  Published: {new Date(blog.publishedAt).toLocaleDateString()}
                </Badge>
              </div>
            </Card>
          </a>
        </motion.div>
      </AnimatePresence>
      {blogs.length > 1 && (
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
            {blogs.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 border-2 border-white ${
                  idx === currentIndex ? "bg-white" : "bg-transparent"
                } rounded-none`}
                style={{
                  display: "inline-block",
                  boxShadow:
                    idx === currentIndex ? "2px 2px 0 #000" : undefined,
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
      )}
    </div>
  );
};

export default BlogCard;
