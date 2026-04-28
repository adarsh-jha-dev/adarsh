import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    "full stack developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "MERN",
    "Kolkata",
    "Heritage Institute of Technology",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${inter.variable}`}>
      <body className="crt antialiased">
        <div className="fixed inset-0 grid-bg pointer-events-none -z-10" />
        <Nav />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
