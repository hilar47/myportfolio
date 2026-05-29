import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["var(--font-barlow)", "sans-serif"],
        bebas: ["var(--font-bebas)", "cursive"],
      },
      colors: {
        red: {
          brand: "#cc0000",
          bright: "#ff1a1a",
        },
        dark: {
          DEFAULT: "#111111",
          card: "#1a1a1a",
          hover: "#222222",
        },
      },
    },
  },
  plugins: [],
};

export default config;
