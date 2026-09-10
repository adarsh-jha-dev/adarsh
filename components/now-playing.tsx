"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Track = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
};

function Bars() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden>
      {[0, 0.15, 0.3, 0.45].map((delay) => (
        <span
          key={delay}
          className="w-[2px] rounded-full bg-primary"
          style={{
            height: "100%",
            animation: `now-playing-bar 0.9s ease-in-out ${delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes now-playing-bar {
          from { transform: scaleY(0.25); }
          to   { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes now-playing-bar {
            from { transform: scaleY(0.6); }
            to   { transform: scaleY(0.6); }
          }
        }
      `}</style>
    </span>
  );
}

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (res.ok) setTrack(await res.json());
      } catch {
        /* offline or rate-limited — the widget just stays hidden */
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!track?.isPlaying) return null;

  return (
    <a
      href={track.songUrl ?? "#"}
      target="_blank"
      rel="noopener"
      className="group inline-flex items-center gap-3 text-[13px]"
    >
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt=""
          width={32}
          height={32}
          className="rounded-md border"
          unoptimized
        />
      )}
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-medium transition-colors group-hover:text-primary">
          {track.title}
        </span>
        <span className="truncate text-[12px] text-muted-foreground">
          {track.artist}
        </span>
      </span>
      <Bars />
    </a>
  );
}
