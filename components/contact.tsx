"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Send, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "failed to send");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "unknown error");
    }
  }

  return (
    <section className="py-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12">
          <div>
            <div className="text-xs text-ink-mute mb-2">// section</div>
            <h2 className="text-2xl font-medium">
              <span className="text-ink-mute">$ </span>
              <span className="text-ink">connect</span>
              <span className="cursor" />
            </h2>
            <p className="mt-4 text-sm text-ink-dim leading-relaxed max-w-md">
              Open to full-time opportunities, freelance projects, or just a
              conversation about something you're building. The fastest way to
              reach me is below — I usually reply within a day.
            </p>

            <div className="mt-8 space-y-3 text-xs">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-ink-dim hover:text-accent group"
              >
                <Mail size={14} className="text-accent" />
                <span className="link-underline">{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-ink-dim hover:text-accent"
              >
                <GithubIcon size={14} className="text-accent" />
                <span className="link-underline">github.com/{siteConfig.handle}</span>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-ink-dim hover:text-accent"
              >
                <LinkedinIcon size={14} className="text-accent" />
                <span className="link-underline">linkedin.com/in/adarshjha0410</span>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-ink-dim hover:text-accent"
              >
                <TwitterIcon size={14} className="text-accent" />
                <span className="link-underline">@Adarsh_Jha_0410</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-bg-elev border border-line p-6 relative"
          >
            <div className="text-xs text-ink-mute mb-5"># send-message.sh</div>

            <div className="space-y-4">
              <Field name="name" label="name" placeholder="your name" required />
              <Field name="email" label="email" type="email" placeholder="you@domain.com" required />
              <Field
                name="message"
                label="message"
                placeholder="what are you building?"
                textarea
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full bg-accent text-bg py-2.5 text-sm font-medium hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse">▊</span> sending...
                </span>
              ) : (
                <>
                  <Send size={13} />
                  send message
                </>
              )}
            </button>

            {status === "success" && (
              <div className="mt-4 text-xs text-accent flex items-center gap-2">
                <span>✓</span> message sent. talk soon.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 text-xs text-err flex items-center gap-2">
                <span>✗</span> {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  textarea,
  required,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "w-full bg-transparent border border-line focus:border-accent outline-none px-3 py-2 text-sm text-ink placeholder:text-ink-mute transition-colors";
  return (
    <label className="block">
      <span className="text-[11px] text-ink-mute mb-1 inline-block">
        <span className="text-accent">→</span> {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
