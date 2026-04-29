"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Download, ArrowRight } from "lucide-react";

const lines = [
  { prompt: "$", cmd: "whoami", out: siteConfig.name.toLowerCase().replace(" ", "_") },
  { prompt: "$", cmd: "cat role.txt", out: siteConfig.role },
  { prompt: "$", cmd: "uname -a", out: `linux ${siteConfig.location.toLowerCase().replace(", ", "-")} 6.1.0` },
  { prompt: "$", cmd: "echo $STATUS", out: "open to opportunities · always shipping" },
];

export function Hero() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (step >= lines.length) return;
    const cmd = lines[step].cmd;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(t);
        setTimeout(() => {
          setStep((s) => s + 1);
          setTyped("");
        }, 600);
      }
    }, 45);
    return () => clearInterval(t);
  }, [step]);

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs text-ink-dim border border-line rounded-full px-3 py-1 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          available for full-time roles · summer 2026
        </motion.div>

        {/* Massive name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-none"
        >
          <span className="text-ink-mute">&gt; </span>
          <span className="text-ink">adarsh</span>
          <span className="text-accent">.</span>
          <span className="text-ink">jha</span>
          <span className="cursor inline-block ml-1" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 max-w-2xl text-ink-dim leading-relaxed text-sm md:text-base"
        >
          {siteConfig.bio}
        </motion.p>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 relative bg-bg-elev border border-line rounded overflow-hidden max-w-2xl"
        >
          <span className="corner-tl" />
          <span className="corner-tr" />
          <span className="corner-bl" />
          <span className="corner-br" />

          {/* Title bar */}
          <div className="h-8 px-4 border-b border-line flex items-center gap-2 text-xs text-ink-mute bg-bg-high">
            <span className="w-2.5 h-2.5 rounded-full bg-err/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warn/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <span className="ml-3 font-mono">~/adarsh — zsh</span>
          </div>

          <div className="p-4 md:p-5 font-mono text-xs md:text-sm space-y-1.5 min-h-[180px]">
            {lines.slice(0, step).map((line, i) => (
              <div key={i}>
                <div>
                  <span className="text-accent">{line.prompt}</span>{" "}
                  <span className="text-ink">{line.cmd}</span>
                </div>
                <div className="text-ink-dim pl-4">{line.out}</div>
              </div>
            ))}
            {step < lines.length && (
              <div>
                <span className="text-accent">$</span>{" "}
                <span className="text-ink">{typed}</span>
                <span className="cursor" />
              </div>
            )}
            {step >= lines.length && (
              <div>
                <span className="text-accent">$</span>
                <span className="cursor" />
              </div>
            )}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 bg-accent text-bg px-5 py-2.5 rounded text-sm font-medium hover:bg-accent-dim transition-colors"
          >
            view projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href={siteConfig.cv}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 border border-line text-ink hover:border-accent hover:text-accent transition-colors px-5 py-2.5 rounded text-sm"
          >
            <Download size={14} />
            download cv
          </a>
          <kbd className="hidden md:inline-flex items-center gap-1 text-[10px] text-ink-mute ml-2">
            press{" "}
            <span className="border border-line px-1.5 py-0.5 rounded font-mono">⌘K</span>{" "}
            anywhere
          </kbd>
        </motion.div>
      </div>
    </section>
  );
}
