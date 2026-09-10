"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = navItems.filter((item) => !item.hidden);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 text-[15px] font-medium"
        >
          {siteConfig.name}
          <span className="hidden text-[13px] font-normal text-muted-foreground sm:inline">
            {siteConfig.role}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {visible.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[14px] transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <ThemeToggle />

          <Button asChild size="sm" className="ml-1.5">
            <a href={`mailto:${siteConfig.email}`}>Get in touch</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
