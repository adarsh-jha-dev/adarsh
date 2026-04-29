"use client";

import { useEffect, useState } from "react";

function spawnConfetti() {
  const colors = ["#5eff8a", "#ff6b9d", "#ffd700", "#87ceeb", "#ff9f43", "#c084fc"];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 9 + 4;
    const isCircle = Math.random() > 0.5;
    el.style.cssText = `
      position:fixed;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}vw;
      top:-${size}px;
      z-index:9998;
      border-radius:${isCircle ? "50%" : "2px"};
      pointer-events:none;
      animation:confetti-fall ${1.2 + Math.random() * 2}s ease-in ${Math.random() * 0.8}s forwards,
                confetti-drift ${0.8 + Math.random() * 0.6}s ease-in-out ${Math.random() * 0.5}s infinite alternate;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function EasterEggOverlay({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      spawnConfetti();
      const t = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 4500);
      return () => clearTimeout(t);
    }
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9997] flex items-center justify-center"
      onClick={() => { setVisible(false); onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative text-center space-y-3 animate-fade-up px-8">
        <p className="text-5xl">💚</p>
        <p className="font-mono text-accent text-xl tracking-tight">
          you found a secret
        </p>
        <p className="text-ink-dim text-sm font-mono max-w-xs">
          this page was made with care.<br />
          hope it made you smile :)
        </p>
        <p className="text-ink-mute text-[10px] font-mono mt-4">
          — adarsh
        </p>
      </div>
    </div>
  );
}
