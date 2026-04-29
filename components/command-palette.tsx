"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { useTerminalMode } from "@/lib/terminal-mode-context";
import { EasterEggOverlay } from "@/components/easter-egg-overlay";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  action: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [crushMode, setCrushMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { enabled: termEnabled, toggle: termToggle } = useTerminalMode();

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const commands: Cmd[] = [
    { id: "home", label: "Go to home", hint: "/", group: "navigate", action: () => router.push("/") },
    { id: "projects", label: "Browse projects", hint: "/projects", group: "navigate", action: () => router.push("/projects") },
    { id: "blog", label: "Read the blog", hint: "/blog", group: "navigate", action: () => router.push("/blog") },
    { id: "uses", label: "What I use", hint: "/uses", group: "navigate", action: () => router.push("/uses") },
    { id: "now", label: "What I'm doing now", hint: "/now", group: "navigate", action: () => router.push("/now") },
    { id: "github", label: "Open GitHub", hint: "↗", group: "external", action: () => window.open(siteConfig.social.github) },
    { id: "linkedin", label: "Open LinkedIn", hint: "↗", group: "external", action: () => window.open(siteConfig.social.linkedin) },
    { id: "twitter", label: "Open Twitter / X", hint: "↗", group: "external", action: () => window.open(siteConfig.social.twitter) },
    { id: "email", label: `Email ${siteConfig.email}`, hint: "✉", group: "external", action: () => (window.location.href = `mailto:${siteConfig.email}`) },
    { id: "cv", label: "Download CV", hint: "↓", group: "external", action: () => window.open(siteConfig.cv) },
    {
      id: "terminal",
      label: termEnabled ? "Exit terminal mode" : "Enter terminal mode",
      hint: "⌥T",
      group: "theme",
      action: () => termToggle(),
    },
    {
      id: "crush",
      label: "crush mode 💚",
      hint: "✨",
      group: "secret",
      action: () => {
        closePalette();
        setCrushMode(true);
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const cmd = filtered[active];
        if (cmd) {
          cmd.action();
          setOpen(false);
          setQuery("");
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, filtered, closePalette]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else { setQuery(""); setActive(0); }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  return (
    <>
      <EasterEggOverlay open={crushMode} onClose={() => setCrushMode(false)} />

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-4"
          onClick={() => { setOpen(false); setQuery(""); }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-bg-elev border border-line rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 h-12 border-b border-line">
              <span className="text-accent">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command..."
                className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-mute"
              />
              <kbd className="text-[10px] text-ink-mute border border-line px-1.5 py-0.5 rounded">esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-xs text-ink-mute text-center">
                  no commands match &quot;{query}&quot;
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    cmd.action();
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center justify-between text-sm ${
                    i === active ? "bg-bg-high text-accent" : "text-ink-dim"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] uppercase text-ink-mute w-16">{cmd.group}</span>
                    {cmd.label}
                  </span>
                  <span className="text-xs text-ink-mute">{cmd.hint}</span>
                </button>
              ))}
            </div>

            <div className="px-4 h-10 border-t border-line flex items-center justify-between text-[10px] text-ink-mute">
              <span>↑↓ navigate · ↵ select</span>
              <span>
                <kbd className="border border-line px-1 rounded">⌘</kbd>{" "}
                <kbd className="border border-line px-1 rounded">k</kbd> to toggle
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
