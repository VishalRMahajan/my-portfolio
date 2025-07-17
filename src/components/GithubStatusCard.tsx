"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { DATA } from "@/data";
import {
  AiOutlineStar,
  AiOutlineFolder,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
  firstDay: string;
}

interface ContributionCalendar {
  colors: string[];
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubStats {
  totalStars: number;
  totalRepos: number;
  contributionCalendar: ContributionCalendar;
}

const GitHubStatsCard = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const githubUrl = DATA.hero.social.GitHub;
        const username = githubUrl.split("/").pop();

        const response = await fetch(`/api/github-stats?username=${username}`);

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "GitHub API access denied. Please check your authentication token or try again later."
            );
          } else if (response.status === 429) {
            throw new Error(
              "GitHub API rate limit exceeded. Please wait a moment and try again."
            );
          } else if (response.status === 404) {
            throw new Error(
              "GitHub user not found. Please check the username and try again."
            );
          } else if (response.status === 401) {
            throw new Error(
              "GitHub API authentication failed. Please check your access token."
            );
          } else if (response.status >= 500) {
            throw new Error(
              "GitHub servers are currently experiencing issues. Please try again later."
            );
          } else {
            throw new Error(
              "Unable to fetch GitHub stats. Please check your connection and try again."
            );
          }
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(
            "Due to high traffic, GitHub stats are temporarily unavailable. Please try again later."
          );
        }

        setStats(data);
        setError(null);
      } catch (error) {
        console.error("GitHub API Error:", error);
        setError(
          "Due to high traffic, GitHub stats are temporarily unavailable. Please try again later."
        );
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const renderHeatmap = () => {
    if (!stats?.contributionCalendar?.weeks) return null;

    return (
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {stats.contributionCalendar.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 rounded-sm transition-all hover:scale-110"
                style={{
                  backgroundColor:
                    day.color === "#161b22" ? "#2d3748" : day.color,
                }}
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-full"
      >
        <Card className="overflow-hidden border-2 border-black bg-black/30 backdrop-blur-sm w-full">
          <div className="p-3 sm:p-4">
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-700 rounded w-24"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                  <div className="h-8 bg-gray-700 rounded w-18"></div>
                </div>
              </div>
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-full"
      >
        <Card className="overflow-hidden border-2 border-black bg-black/30 backdrop-blur-sm w-full">
          <div className="p-3 sm:p-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <a
                href={DATA.hero.social.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:underline"
              >
                <Text className="text-yellow-400 font-bold text-sm sm:text-base">
                  @{DATA.hero.social.GitHub.split("/").pop()}
                </Text>
              </a>

              <div className="flex gap-1.5 sm:gap-2">
                <Badge className="inline-flex items-center gap-1 sm:gap-1.5 bg-gray-600 text-white px-2 sm:px-3 py-1 rounded border-2 border-black shadow-sm">
                  <span className="text-xs sm:text-sm font-bold">--</span>
                  <AiOutlineStar className="w-3 h-3 sm:w-4 sm:h-4" />
                </Badge>

                <Badge className="inline-flex items-center gap-1 sm:gap-1.5 bg-gray-600 text-white px-2 sm:px-3 py-1 rounded border-2 border-black shadow-sm">
                  <span className="text-xs sm:text-sm font-bold">--</span>
                  <AiOutlineFolder className="w-3 h-3 sm:w-4 sm:h-4" />
                </Badge>
              </div>
            </div>

            <div className="bg-red-900/20 border-2 border-red-800 rounded p-3 sm:p-4">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <AiOutlineExclamationCircle className="w-5 h-5" />
                <Text className="font-bold text-sm sm:text-base">
                  Service Temporarily Unavailable
                </Text>
              </div>
              <Text className="text-red-300 text-xs sm:text-sm">{error}</Text>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="max-w-full"
    >
      <Card className="overflow-hidden border-2 border-black bg-black/30 backdrop-blur-sm hover:translate-y-[-2px] transition-all w-full">
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <a
              href={DATA.hero.social.GitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:underline"
            >
              <Text className="text-yellow-400 font-bold text-sm sm:text-base">
                @{DATA.hero.social.GitHub.split("/").pop()}
              </Text>
            </a>

            <div className="flex gap-1.5 sm:gap-2">
              <Badge className="inline-flex items-center gap-1 sm:gap-1.5 bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded border-2 border-black shadow-sm">
                <span className="text-xs sm:text-sm font-bold">
                  {stats.totalStars}
                </span>
                <AiOutlineStar className="w-3 h-3 sm:w-4 sm:h-4" />
              </Badge>

              <Badge className="inline-flex items-center gap-1 sm:gap-1.5 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded border-2 border-black shadow-sm">
                <span className="text-xs sm:text-sm font-bold">
                  {stats.totalRepos}
                </span>
                <AiOutlineFolder className="w-3 h-3 sm:w-4 sm:h-4" />
              </Badge>
            </div>
          </div>

          <div className="mb-3">
            <Text className="text-gray-400 text-xs sm:text-sm">
              {stats.contributionCalendar?.totalContributions || 0}{" "}
              contributions in the last year
            </Text>
          </div>

          <div className="bg-gray-900/50 border-2 border-black rounded p-2 sm:p-3">
            {renderHeatmap()}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GitHubStatsCard;
