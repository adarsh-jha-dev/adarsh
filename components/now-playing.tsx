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

function MusicBars() {
  return (
    <span className="flex items-end gap-[2px] h-3">
      {[0.4, 0.7, 1, 0.6, 0.9].map((delay, i) => (
        <span
          key={i}
          className="w-[3px] bg-accent rounded-sm"
          style={{
            height: "100%",
            animation: `music-bar 0.8s ease-in-out ${delay * 0.3}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes music-bar {
          from { transform: scaleY(0.2); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </span>
  );
}

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  const fetchTrack = async () => {
    try {
      const res = await fetch("/api/spotify");
      if (res.ok) setTrack(await res.json());
    } catch {}
  };

  useEffect(() => {
    fetchTrack();
    const id = setInterval(fetchTrack, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!track) return null;

  if (!track.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-[10px] text-ink-mute">
        <span className="w-1 h-1 rounded-full bg-ink-mute" />
        not playing
      </div>
    );
  }

  return (
    <a
      href={track.songUrl ?? "#"}
      target="_blank"
      rel="noopener"
      className="group flex items-center gap-2.5 hover:opacity-80 transition-opacity"
    >
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.title ?? "album art"}
          width={28}
          height={28}
          className="rounded-sm border border-line"
        />
      )}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] text-ink truncate max-w-[140px]">
          {track.title}
        </span>
        <span className="text-[9px] text-ink-mute truncate max-w-[140px]">
          {track.artist}
        </span>
      </div>
      <MusicBars />
    </a>
  );
}
