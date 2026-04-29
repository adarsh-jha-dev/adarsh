import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function countryToFlag(code: string): string {
  if (code.length !== 2) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") ?? "UN";
  const flag = countryToFlag(country);

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ count: null, flag });
  }

  try {
    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/incr/portfolio_visitors`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
    const data = await res.json();
    return NextResponse.json({ count: data.result as number, flag });
  } catch {
    return NextResponse.json({ count: null, flag });
  }
}
