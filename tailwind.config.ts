import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        obsidian: {
          950: "#050505",
          900: "#090909",
          800: "#101010",
          700: "#161616",
          600: "#222222",
          500: "#2d2d2d",
        },
        foreground: {
          DEFAULT: "#f4f4f6",
          muted: "#8a8a93",
          dim: "#52525b",
          dark: "#27272a",
        },
        financial: {
          positive: "#10b981", // emerald
          warning: "#f59e0b",  // amber
          danger: "#ef4444",   // crimson
          accent: "#6366f1",   // indigo
          gold: "#eab308",     // gold
          cyan: "#06b6d4",     // cyan
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'SF Mono'",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        widest: "0.2em",
        mega: "0.3em",
      },
      backgroundImage: {
        "radial-subtle": "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        "radial-accent": "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
