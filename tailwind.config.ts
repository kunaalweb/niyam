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
        background: "#080808",
        surface: "#111111",
        "surface-elevated": "#171717",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "surface-border-subtle": "rgba(255, 255, 255, 0.04)",
        primary: "#F5F5F3",
        secondary: "#A3A3A3",
        muted: "#666666",
        accent: {
          warm: "#C47B49",
          amber: "#DDA15E",
          glow: "rgba(196, 123, 73, 0.2)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        heading: ["var(--font-anton)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        ultra: "0.3em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 1%)" },
          "30%": { transform: "translate(-1%, 2%)" },
          "40%": { transform: "translate(2%, -1%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(1%, 3%)" },
          "70%": { transform: "translate(3%, -2%)" },
          "80%": { transform: "translate(-2%, 1%)" },
          "90%": { transform: "translate(2%, 3%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
