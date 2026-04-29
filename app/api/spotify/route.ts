import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json({ isPlaying: false, _debug: "missing LASTFM_API_KEY or LASTFM_USERNAME" });
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    return NextResponse.json({ isPlaying: false, _debug: `lastfm error: ${res.status}` });
  }

  const data = await res.json();
  const track = data.recenttracks?.track?.[0];

  if (!track) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = track["@attr"]?.nowplaying === "true";
  const title = track.name ?? null;
  const artist = track.artist?.["#text"] ?? null;
  const albumArt = track.image?.find((i: { size: string }) => i.size === "large")?.["#text"] || null;
  const songUrl = track.url ?? null;

  return NextResponse.json({ isPlaying, title, artist, albumArt, songUrl });
}
