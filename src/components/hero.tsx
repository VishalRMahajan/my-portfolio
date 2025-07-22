"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import { Badge } from "@/components/retroui/Badge";
import { FileCode, Clock, MapPin } from "lucide-react";
import { DATA } from "@/data";
import { getCalApi } from "@calcom/embed-react";
import Image from "next/image";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [localTime, setLocalTime] = useState("");

  const location = DATA.hero.location;
  const timezone = DATA.hero.Timezone;
  const avatarSrc = DATA.hero.avatarSrc;
  const name = DATA.hero.name;

  useEffect(() => {
    setIsMounted(true);

    const updateLocalTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(formattedTime);
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  function getAgeString() {
    const birth = new Date(Date.UTC(2004, 8, 5, 22, 0, 0));
    const now = new Date();

    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;
    const days = differenceInDays(
      now,
      new Date(
        birth.getFullYear() + years,
        birth.getMonth() + months,
        birth.getDate(),
        birth.getHours(),
        birth.getMinutes(),
        birth.getSeconds()
      )
    );
    let hours =
      differenceInHours(
        now,
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          birth.getHours(),
          birth.getMinutes(),
          birth.getSeconds()
        )
      ) % 24;
    let minutes =
      differenceInMinutes(
        now,
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          birth.getMinutes(),
          birth.getSeconds()
        )
      ) % 60;
    let seconds =
      differenceInSeconds(
        now,
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          birth.getSeconds()
        )
      ) % 60;
    let d = days;

    if (seconds < 0) seconds += 60;
    if (minutes < 0) minutes += 60;
    if (hours < 0) hours += 24;
    if (d < 0) d += 30;

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(years)}y ${pad(months)}m ${pad(d)}d ${pad(hours)}h ${pad(
      minutes
    )}m ${pad(seconds)}s`;
  }

  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      <AnimatePresence>
        {isMounted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex justify-between items-center mb-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <Badge
                  className="inline-flex items-center gap-1.5 bg-blue-500 text-white px-2 py-0.5 border-2 border-black shadow-sm font-mono"
                  style={{ borderRadius: "0px" }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{localTime}</span>
                </Badge>
                <Badge
                  className="inline-flex items-center gap-1.5 bg-purple-500 text-white px-2 py-0.5 border-2 border-black shadow-sm font-mono"
                  style={{ borderRadius: "0px" }}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-xs text-gray-400 font-mono"
              >
                {timezone}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-32 h-32 mb-6"
            >
              <Avatar className="w-32 h-32 overflow-hidden rounded-full border-4 border-black">
                <Avatar.Image src={avatarSrc} alt={name} />
                <Avatar.Fallback>
                  {DATA.hero.name
                    .split(" ")
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
                </Avatar.Fallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Text
                as="h2"
                className="mb-1 text-lg font-medium text-white flex items-center justify-center gap-2"
              >
                Hey
                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{
                    rotate: [0, 20, -10, 20, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                >
                  👋
                </motion.span>
                , I&apos;m
              </Text>
              <Text as="h2" className="text-4xl font-bold mb-6 text-white">
                {name}
              </Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-8"
            >
              <Text className="text-base text-justify text-white">
                i&apos;m{" "}
                <span className="font-bold text-green-400">
                  {getAgeString()}
                </span>
                . final year dev. I build with{" "}
                <Badge
                  className="inline-flex items-center gap-1.5 bg-yellow-400 text-black px-2 py-0.5 border-2 border-black shadow-sm font-mono"
                  style={{ borderRadius: "0px" }}
                >
                  <Image
                    src="https://skillicons.dev/icons?i=js"
                    alt="JavaScript"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    style={{ imageRendering: "pixelated" }}
                  />
                  JavaScript
                </Badge>{" "}
                and{" "}
                <Badge
                  className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-2 py-0.5 border-2 border-black shadow-sm font-mono"
                  style={{ borderRadius: "0px" }}
                >
                  <Image
                    src="https://skillicons.dev/icons?i=py"
                    alt="Python"
                    width={16}
                    height={16}
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
                href={DATA.hero.social.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-gray-800"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://skillicons.dev/icons?i=github"
                  alt="GitHub"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.hero.social.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-blue-600"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://skillicons.dev/icons?i=linkedin"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.hero.social.LeetCode}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-white"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://leetcode.com/favicon.ico"
                  alt="LeetCode"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.hero.social.X}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-[#1d9bf0]"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://skillicons.dev/icons?i=twitter"
                  alt="Twitter"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.hero.social.Email}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-[#242938]"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://skillicons.dev/icons?i=gmail"
                  alt="Gmail"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
              <a
                href={DATA.hero.social.Blog}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black p-1.5 shadow-md hover:translate-y-0.5 hover:shadow-none transition-all bg-[#15191c]"
                style={{ borderRadius: "0px" }}
              >
                <Image
                  src="https://skillicons.dev/icons?i=md"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="w-7 h-7"
                  style={{ imageRendering: "pixelated" }}
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 w-full"
            >
              <a
                href={DATA.hero.social.Resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-white text-black border-2 border-black shadow-md font-bold flex items-center justify-center gap-2 py-2 px-4 hover:bg-white/75 hover:translate-y-0.5 hover:shadow-none transition-all"
                  style={{ borderRadius: "0px" }}
                  aria-label="Resume"
                >
                  <FileCode className="w-5 h-5" />
                  Resume
                </Button>
              </a>

              <Button
                size="lg"
                className="bg-green-500 text-white border-2 border-black shadow-md font-bold flex items-center justify-center gap-2 py-2 px-4 hover:bg-green-400 hover:translate-y-0.5 hover:shadow-none transition-all"
                style={{ borderRadius: "0px" }}
                data-cal-namespace="30min"
                data-cal-link="vishalrmahajan/30min"
                data-cal-config='{"layout":"month_view","theme":"dark"}'
                aria-label="Get in Touch"
              >
                Get in Touch
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
