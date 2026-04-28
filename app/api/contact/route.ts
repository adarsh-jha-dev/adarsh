import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid input" },
        { status: 400 }
      );
    }
    const { name, email, message } = parsed.data;

    if (!process.env.RESEND_API_KEY) {
      // graceful fallback while env isn't set yet
      console.warn("[contact] RESEND_API_KEY missing — would send:", { name, email });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? siteConfig.email,
      replyTo: email,
      subject: `[portfolio] new message from ${name}`,
      text: `name: ${name}\nemail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json(
      { error: "could not send" },
      { status: 500 }
    );
  }
}
