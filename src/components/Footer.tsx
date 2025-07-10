"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_TIME) {
      setLastUpdated(
        new Date(
          Number(process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_TIME)
        ).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    } else {
      setLastUpdated(
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }
  }, []);

  return (
    <footer className="w-full mt-12 flex flex-col justify-center items-center py-4 font-mono text-base tracking-wide select-none text-white">
      <span
        className="flex items-center gap-2 font-bold"
        style={{ textShadow: "2px 2px 0 #000" }}
      >
        Made with
        <span
          className="text-red-600 text-xl"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          ♥
        </span>
        <a href="https://vishalrmahajan.in">by Vishal Rajesh Mahajan</a>
      </span>
      <span
        className="text-xs mt-1 opacity-70"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        Last updated: {lastUpdated || "—"}
      </span>
    </footer>
  );
}
