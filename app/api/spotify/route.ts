import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken(): Promise<{ token?: string; error?: string }> {
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
  if (!res.ok || !data.access_token) {
    return { error: data.error_description ?? data.error ?? "token exchange failed" };
  }
  return { token: data.access_token };
}

export async function GET() {
  if (
    !process.env.SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET ||
    !process.env.SPOTIFY_REFRESH_TOKEN
  ) {
    return NextResponse.json({ isPlaying: false, _debug: "missing env vars" });
  }

  const { token, error: tokenError } = await getAccessToken();

  if (!token) {
    return NextResponse.json({ isPlaying: false, _debug: `token error: ${tokenError}` });
  }

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) {
    return NextResponse.json({ isPlaying: false, _debug: "nothing playing (204)" });
  }

  if (res.status >= 400) {
    return NextResponse.json({ isPlaying: false, _debug: `spotify error: ${res.status}` });
  }

  const data = await res.json();

  return NextResponse.json({
    isPlaying: data.is_playing ?? false,
    title: data.item?.name ?? null,
    artist: data.item?.artists?.map((a: { name: string }) => a.name).join(", ") ?? null,
    albumArt: data.item?.album?.images?.[0]?.url ?? null,
    songUrl: data.item?.external_urls?.spotify ?? null,
  });
}
