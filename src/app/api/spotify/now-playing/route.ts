import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  return res.json();
}

function getArtistNames(artists: unknown): string {
  if (Array.isArray(artists)) {
    return artists
      .map((a) =>
        typeof a === "object" && a && "name" in a
          ? (a as { name: string }).name
          : ""
      )
      .filter(Boolean)
      .join(", ");
  }
  return "";
}

type SpotifyTrack = {
  track?: {
    name?: string;
    artists?: unknown;
    album?: {
      name?: string;
      images?: { url?: string }[];
    };
    external_urls?: { spotify?: string };
    duration_ms?: number;
  };
  played_at?: string;
};

type SpotifySong = {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: unknown;
    album?: {
      name?: string;
      images?: { url?: string }[];
    };
    external_urls?: { spotify?: string };
    duration_ms?: number;
  };
  progress_ms?: number;
  device?: { name?: string };
};

export async function GET() {
  const { access_token } = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );

  if (res.status === 204 || res.status > 400) {
    const recent = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );
    const recentData: unknown = await recent.json();
    const last = (recentData as { items?: SpotifyTrack[] })?.items?.[0];
    return NextResponse.json({
      isPlaying: false,
      title: last?.track?.name ?? "",
      artist: getArtistNames(last?.track?.artists),
      album: last?.track?.album?.name ?? "",
      albumImageUrl: last?.track?.album?.images?.[0]?.url ?? "",
      songUrl: last?.track?.external_urls?.spotify ?? "",
      playedAt: last?.played_at ?? "",
      progressMs: 0,
      durationMs: last?.track?.duration_ms ?? 0,
      device: "",
    });
  }

  const song: SpotifySong = await res.json();

  return NextResponse.json({
    isPlaying: song.is_playing,
    title: song.item?.name ?? "",
    artist: getArtistNames(song.item?.artists),
    album: song.item?.album?.name ?? "",
    albumImageUrl: song.item?.album?.images?.[0]?.url ?? "",
    songUrl: song.item?.external_urls?.spotify ?? "",
    progressMs: song.progress_ms ?? 0,
    durationMs: song.item?.duration_ms ?? 0,
    device: song.device?.name ?? "",
    playedAt: undefined,
  });
}
