import React from "react";
import Image from "next/image";
import { Badge } from "@/components/retroui/Badge";
import { DATA } from "@/data";

const SkillsGrid = () => {
  const skillColors: Record<string, { bg: string; text: string }> = {
    nodejs: { bg: "bg-green-600", text: "text-black" },
    express: { bg: "bg-gray-700", text: "text-white" },
    fastapi: { bg: "bg-teal-500", text: "text-black" },
    flask: { bg: "bg-gray-800", text: "text-white" },
    python: { bg: "bg-blue-600", text: "text-white" },
    javascript: { bg: "bg-yellow-400", text: "text-black" },
    cpp: { bg: "bg-blue-700", text: "text-white" },
    postgres: { bg: "bg-blue-500", text: "text-black" },
    mysql: { bg: "bg-gray-700", text: "text-white" },
    mongo: { bg: "bg-green-500", text: "text-black" },
    react: { bg: "bg-cyan-400", text: "text-black" },
    tailwindcss: { bg: "bg-cyan-500", text: "text-black" },
    git: { bg: "bg-orange-600", text: "text-black" },
    postman: { bg: "bg-orange-500", text: "text-black" },
    sklearn: { bg: "bg-blue-800", text: "text-white" },
  };

  return (
    <div className="flex flex-wrap gap-3">
      {DATA.skills.map((skill) => {
        const colors = skillColors[skill] || {
          bg: "bg-gray-600",
          text: "text-white",
        };

        return (
          <Badge
            key={skill}
            className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} px-3 py-1.5 rounded border-2 border-black shadow-sm hover:translate-y-0.5 hover:shadow-none transition-all`}
          >
            <Image
              src={`https://skillicons.dev/icons?i=${skill}`}
              alt={skill}
              width={20}
              height={20}
              style={{ imageRendering: "pixelated" }}
            />
            {skill === "cpp"
              ? "C++"
              : skill === "nodejs"
              ? "Node.js"
              : skill === "mongo"
              ? "MongoDB"
              : skill === "sklearn"
              ? "Scikit"
              : skill.charAt(0).toUpperCase() + skill.slice(1)}
          </Badge>
        );
      })}
    </div>
  );
};

export default SkillsGrid;
