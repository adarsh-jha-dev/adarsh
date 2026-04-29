import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(`Spotify auth error: ${error}`, { status: 400 });
  }

  if (!code) {
    return new NextResponse("No code in callback", { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return new NextResponse(
      "Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, or SPOTIFY_REDIRECT_URI env vars",
      { status: 500 }
    );
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new NextResponse(`Token exchange failed: ${JSON.stringify(data)}`, { status: 500 });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Spotify Token</title>
  <style>
    body { font-family: monospace; background: #0a0e0a; color: #d4d4cf; padding: 40px; }
    h2 { color: #5eff8a; }
    code { background: #141a14; border: 1px solid #1f2820; padding: 12px 16px; display: block;
           border-radius: 4px; word-break: break-all; margin: 8px 0; font-size: 13px; color: #5eff8a; }
    p { color: #8a9087; font-size: 13px; }
    .warn { color: #ffcc66; }
  </style>
</head>
<body>
  <h2>✓ Spotify tokens retrieved</h2>
  <p>Copy your refresh token into <code style="display:inline;padding:2px 6px">.env.local</code>:</p>
  <p><strong>SPOTIFY_REFRESH_TOKEN</strong></p>
  <code>${data.refresh_token}</code>
  <p class="warn">⚠ Delete /api/spotify/callback from your code after this — it exposes tokens.</p>
  <p>Access token (expires in 1h, you don't need this long-term):</p>
  <code style="color:#8a9087">${data.access_token}</code>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}