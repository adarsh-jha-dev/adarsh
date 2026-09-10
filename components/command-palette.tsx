"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Download,
  FileText,
  FolderOpen,
  Home,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
      close();
    };
    const openTab = (href: string) => () => {
      window.open(href, "_blank", "noopener");
      close();
    };

    return [
      {
        id: "home",
        label: "Home",
        group: "Navigate",
        icon: <Home className="size-4" />,
        run: go("/"),
      },
      {
        id: "projects",
        label: "All projects",
        group: "Navigate",
        icon: <FolderOpen className="size-4" />,
        run: go("/projects"),
      },
      {
        id: "blog",
        label: "Writing",
        group: "Navigate",
        icon: <FileText className="size-4" />,
        run: go("/blog"),
      },
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        label: project.name,
        group: "Case studies",
        icon: <FolderOpen className="size-4" />,
        keywords: `${project.tagline} ${project.stack.join(" ")}`,
        run: go(`/projects/${project.slug}`),
      })),
      {
        id: "email",
        label: `Email ${siteConfig.email}`,
        group: "Contact",
        icon: <Mail className="size-4" />,
        keywords: "contact hire reach out",
        run: () => {
          window.location.href = `mailto:${siteConfig.email}`;
          close();
        },
      },
      {
        id: "cv",
        label: "Download résumé",
        group: "Contact",
        icon: <Download className="size-4" />,
        keywords: "cv resume pdf",
        run: openTab(siteConfig.cv),
      },
      {
        id: "github",
        label: "GitHub",
        group: "Elsewhere",
        icon: <ArrowUpRight className="size-4" />,
        run: openTab(siteConfig.social.github),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Elsewhere",
        icon: <ArrowUpRight className="size-4" />,
        run: openTab(siteConfig.social.linkedin),
      },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light" : "Switch to dark",
        group: "Preferences",
        icon:
          resolvedTheme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          ),
        keywords: "theme dark light mode appearance",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          close();
        },
      },
    ];
  }, [router, close, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Open/close on ⌘K, and drive the list from the keyboard while open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[active]?.run();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, close]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Lock background scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border bg-popover shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, pages, links…"
                className="h-12 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-[13px] text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {filtered.map((command, i) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <div key={command.id}>
                    {showGroup && (
                      <p className="eyebrow px-3 pb-1.5 pt-3 first:pt-1">
                        {command.group}
                      </p>
                    )}
                    <button
                      data-active={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={command.run}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[14px] transition-colors",
                        i === active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span className="shrink-0 text-muted-foreground">
                        {command.icon}
                      </span>
                      <span className="truncate">{command.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>↑↓ to navigate · ↵ to select</span>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
