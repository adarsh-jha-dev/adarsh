import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0e0a",
          elev: "#0f1410",
          high: "#141a14",
        },
        ink: {
          DEFAULT: "#d4d4cf",
          dim: "#8a9087",
          mute: "#5a6058",
        },
        line: "#1f2820",
        accent: {
          DEFAULT: "#5eff8a",
          dim: "#3da868",
          glow: "rgba(94, 255, 138, 0.15)",
        },
        warn: "#ffcc66",
        err: "#ff6b6b",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        scan: "scan 8s linear infinite",
        flicker: "flicker 6s infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.92" },
          "97%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
