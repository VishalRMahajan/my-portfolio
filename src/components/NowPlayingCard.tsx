"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import Image from "next/image";
import clsx from "clsx";

interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs?: number;
  durationMs?: number;
  device?: string;
  playedAt?: string;
}

function msToTime(ms: number) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString();
}

export default function NowPlayingCard() {
  const [track, setTrack] = useState<NowPlaying | null>(null);
  const [progressMs, setProgressMs] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/spotify/now-playing")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          setTrack({
            isPlaying: false,
            title: "Not Playing",
            artist: "Spotify",
            album: "",
            albumImageUrl: "",
            songUrl: "#",
            progressMs: 0,
            durationMs: 0,
            device: "",
            playedAt: "",
          });
          setProgressMs(0);
        } else {
          setTrack(data);
          setProgressMs(data.progressMs ?? 0);
        }
      })
      .catch(() => {
        setTrack({
          isPlaying: false,
          title: "Not Playing",
          artist: "Spotify",
          album: "",
          albumImageUrl: "",
          songUrl: "#",
          progressMs: 0,
          durationMs: 0,
          device: "",
          playedAt: "",
        });
        setProgressMs(0);
      });
  }, []);

  useEffect(() => {
    if (
      track?.isPlaying &&
      track.progressMs !== undefined &&
      track.durationMs !== undefined
    ) {
      setProgressMs(track.progressMs);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setProgressMs((prev) => {
          if (!track.durationMs) return prev;
          if (prev + 1000 >= track.durationMs) {
            clearInterval(intervalRef.current!);
            return track.durationMs;
          }
          return prev + 1000;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [track?.isPlaying, track?.progressMs, track?.durationMs]);

  const progress =
    track?.isPlaying && track.durationMs
      ? Math.min(Math.round((progressMs / track.durationMs) * 100), 100)
      : 0;

  return (
    <Card className="flex flex-col md:flex-row items-center gap-4 bg-black/70 border-green-400 border-2 shadow-lg px-4 py-5 w-full max-w-md md:max-w-2xl mx-auto">
      <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-full bg-gray-900 border-4 border-black overflow-hidden flex items-center justify-center">
        <div
          className={clsx(
            "w-full h-full rounded-full p-2 flex items-center justify-center",
            track?.isPlaying && "animate-spin-slow"
          )}
        >
          {track?.albumImageUrl ? (
            <Image
              src={track.albumImageUrl}
              alt={track.title}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl">
              ♪
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-black z-10" />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1 w-full text-center md:text-left">
        <Text
          as="h4"
          className="font-bold text-green-400 text-lg md:text-xl truncate"
        >
          {track?.isPlaying || track?.title ? (
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {track.title}
            </a>
          ) : (
            "Not Playing"
          )}
        </Text>
        <Text className="text-white text-base truncate">
          {track?.artist || "Spotify"}
        </Text>
        {track?.album && (
          <Text className="text-green-200 text-xs truncate">
            Album: {track.album}
          </Text>
        )}
        {track?.device && (
          <Text className="text-green-400 text-xs truncate">
            Device: {track.device}
          </Text>
        )}
        {!track?.isPlaying && track?.playedAt && (
          <Text className="text-green-300 text-xs truncate mt-1">
            Last played: {formatDate(track.playedAt)}
          </Text>
        )}
        <div className="mt-2">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-green-400">
            <div
              className="h-full bg-green-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          {track?.isPlaying && track.durationMs !== undefined && (
            <div className="flex justify-between text-xs text-green-200 mt-1 font-mono">
              <span>{msToTime(progressMs)}</span>
              <span>{msToTime(track.durationMs)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0 w-full md:w-auto flex justify-center">
        <span className="inline-block bg-green-400 text-black font-bold border-2 border-black px-4 py-2 rounded-none shadow-md">
          {track?.isPlaying ? "LIVE" : "OFF"}
        </span>
      </div>
    </Card>
  );
}
