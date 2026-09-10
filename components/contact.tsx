"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";

import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

const elsewhere = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "X / Twitter", href: siteConfig.social.twitter, Icon: TwitterIcon },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");

    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="rule" />

      <div className="grid grid-cols-1 gap-12 pt-14 md:grid-cols-2 md:gap-16">
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="display mt-3 text-4xl md:text-5xl">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            {siteConfig.availability}, and available for contract work on AI
            products — LLM features, evals, agentic systems, developer tools.
            The fastest way to reach me is email.
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group mt-8 inline-flex items-center gap-2.5 text-[15px]"
          >
            <Mail className="size-4 text-primary" />
            <span className="link-grow">{siteConfig.email}</span>
          </a>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {elsewhere.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon size={15} />
                {label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 md:p-8">
          <div className="space-y-5">
            <Field name="name" label="Name" placeholder="Your name" required />
            <Field
              name="email"
              label="Email"
              type="email"
              placeholder="you@company.com"
              required
            />
            <Field
              name="message"
              label="Message"
              placeholder="What are you building?"
              textarea
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-6 w-full"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" && "Sending…"}
            {status === "success" && (
              <>
                <Check /> Message sent
              </>
            )}
            {(status === "idle" || status === "error") && "Send message"}
          </Button>

          {/* Reserve the line so the form doesn't jump when a status
              appears, without putting filler text in the accessibility
              tree. */}
          <p
            aria-live="polite"
            className={cn(
              "mt-3 min-h-[1.25rem] text-[13px]",
              status === "success" && "text-[hsl(var(--success))]",
              status === "error" && "text-destructive"
            )}
          >
            {status === "success" && "Thanks — I'll get back to you soon."}
            {status === "error" && error}
          </p>
        </form>
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
  const className =
    "mt-2 w-full rounded-xl border bg-background px-3.5 py-2.5 text-[14px] outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary";

  return (
    <label className="block">
      <span className="text-[13px] font-medium">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={cn(className, "resize-none")}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
