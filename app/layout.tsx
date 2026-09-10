import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import { siteConfig } from "@/lib/config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/ui/ambient-background";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Adarsh Jha",
    "AI product engineer",
    "software engineer",
    "LLM",
    "Next.js",
    "TypeScript",
    "React",
    "full stack developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteConfig.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    creator: "@Adarsh_Jha_0410",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <AmbientBackground />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
