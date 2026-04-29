import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204 || res.status >= 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();

    return NextResponse.json({
      isPlaying: data.is_playing ?? false,
      title: data.item?.name ?? null,
      artist: data.item?.artists?.map((a: { name: string }) => a.name).join(", ") ?? null,
      albumArt: data.item?.album?.images?.[0]?.url ?? null,
      songUrl: data.item?.external_urls?.spotify ?? null,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
