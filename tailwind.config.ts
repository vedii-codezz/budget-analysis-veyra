import type { Config } from "tailwindcss";

const token = (name: string) => ({ opacityValue }: { opacityValue?: string }) =>
  opacityValue === undefined ? `var(--${name})`
    : `color-mix(in srgb, var(--${name}) calc(${opacityValue} * 100%), transparent)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: token("bg"),
        surface: token("surface"),
        line: token("line"),
        foreground: {
          DEFAULT: token("text"),
          muted: token("text-secondary"),
          dim: token("text-muted"),
        },
        danger: token("danger"),
        warn: token("warn"),
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
        "radial-subtle": "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--text-secondary) 3%, transparent) 0%, transparent 70%)",
        "radial-accent": "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--text-secondary) 8%, transparent) 0%, transparent 60%)",
        "gradient-glass": "linear-gradient(135deg, color-mix(in srgb, var(--text-secondary) 4%, transparent) 0%, color-mix(in srgb, var(--text-secondary) 1%, transparent) 100%)",
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
