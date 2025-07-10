"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { Badge } from "@/components/retroui/Badge";
import { FileCode } from "lucide-react";
import { DATA } from "@/data";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      <AnimatePresence>
        {mounted && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 mb-6"
            >
              <Avatar className="w-32 h-32 overflow-hidden rounded-full border-4 border-black">
                <Avatar.Image
                  src="/VishalRMahajan.png"
                  alt={DATA.contact.name}
                />
                <Avatar.Fallback>VM</Avatar.Fallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Text as="h3" className="mb-1 text-lg font-medium text-white">
                Hey 👋, I'm
              </Text>
              <Text as="h2" className="text-4xl font-bold mb-6 text-white">
                {DATA.contact.name}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8"
            >
              <Text className="text-base text-justify text-white">
                i'm 20. final year dev. I build with{" "}
                <Badge className="inline-flex items-center gap-1.5 bg-yellow-400 text-black px-2 py-0.5 rounded border-2 border-black shadow-sm">
                  <img
                    src="https://skillicons.dev/icons?i=js"
                    alt="JavaScript"
                    className="w-4 h-4"
                    style={{ imageRendering: "pixelated" }}
                  />
                  JavaScript
                </Badge>{" "}
                and{" "}
                <Badge className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-2 py-0.5 rounded border-2 border-black shadow-sm">
                  <img
                    src="https://skillicons.dev/icons?i=py"
                    alt="Python"
                    className="w-4 h-4"
                    style={{ imageRendering: "pixelated" }}
                  />
                  Python
                </Badge>{" "}
                mostly backend systems, APIs, and full-stack apps that actually
                work.
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <a
                href={DATA.contact.social.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-gray-800"
              >
                <img
                  src="https://skillicons.dev/icons?i=github"
                  alt="GitHub"
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.contact.social.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-blue-600"
              >
                <img
                  src="https://skillicons.dev/icons?i=linkedin"
                  alt="LinkedIn"
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.contact.social.LeetCode}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-white"
              >
                <img
                  src="https://leetcode.com/favicon.ico"
                  alt="LeetCode"
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.contact.social.X}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-[#1d9bf0]"
              >
                <img
                  src="https://skillicons.dev/icons?i=twitter"
                  alt="Twitter"
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.contact.social.Email}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-[#242938]"
              >
                <img
                  src="https://skillicons.dev/icons?i=gmail"
                  alt="Gmail"
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4  w-full"
            >
              <a
                href={DATA.contact.social.Resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="flex-1 max-w-[180px] bg-white text-black border-2 border-black shadow-md font-bold flex items-center justify-center gap-2 py-2 px-4 hover:bg-white/75 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  <FileCode className="w-5 h-5" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
