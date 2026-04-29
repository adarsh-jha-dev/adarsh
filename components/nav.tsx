"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 text-sm">
          <span className="text-accent">$</span>
          <span className="text-ink-dim group-hover:text-ink transition-colors">
            {siteConfig.handle}
          </span>
          <span className="text-ink-mute">~</span>
          <span className="text-ink group-hover:text-accent transition-colors">
            {pathname === "/" ? "" : pathname.replace(/^\//, "")}
          </span>
          <span className="cursor" />
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1 text-xs overflow-x-auto">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2 sm:px-3 py-1.5 rounded transition-colors whitespace-nowrap",
                  active
                    ? "text-accent bg-bg-elev"
                    : "text-ink-dim hover:text-ink hover:bg-bg-elev"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
