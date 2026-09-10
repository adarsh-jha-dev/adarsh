"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Bento grid with an Aceternity-style hover effect: a soft highlight
 * slides between tiles (shared `layoutId`), and a faint spotlight
 * tracks the cursor inside whichever tile is hovered.
 *
 * The hovered index lives on the grid rather than on each card, so the
 * highlight animates *between* cards instead of fading in place.
 */

type BentoCtx = {
  hovered: number | null;
  setHovered: (i: number | null) => void;
};

const BentoContext = React.createContext<BentoCtx>({
  hovered: null,
  setHovered: () => {},
});

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <BentoContext.Provider value={{ hovered, setHovered }}>
      <div
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(15rem,auto)]",
          className
        )}
      >
        {children}
      </div>
    </BentoContext.Provider>
  );
}

export function BentoCard({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { hovered, setHovered } = React.useContext(BentoContext);
  const isHovered = hovered === index;
  const surfaceRef = React.useRef<HTMLDivElement>(null);

  // Write cursor position straight to CSS custom properties. Going
  // through state here would re-render the card on every mousemove.
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseMove={onMouseMove}
      className={cn("group relative", className)}
    >
      {/* Sliding highlight — the shared layoutId animates between tiles */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            layoutId="bento-highlight"
            className="absolute -inset-2 -z-10 rounded-[1.75rem] bg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div
        ref={surfaceRef}
        style={
          {
            "--spot-x": "50%",
            "--spot-y": "50%",
          } as React.CSSProperties
        }
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-6 md:p-7",
          "transition-[transform,border-color,box-shadow] duration-500 ease-smooth",
          "group-hover:-translate-y-1 group-hover:border-foreground/15",
          "group-hover:shadow-[0_16px_50px_-24px_hsl(var(--foreground)/0.28)]"
        )}
      >
        {/* Cursor-tracking spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--spot-x) var(--spot-y), hsl(var(--primary) / 0.07), transparent 70%)",
          }}
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
