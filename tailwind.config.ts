import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#1C1E26",
        light: "#FFE2E2",
        "primary-btn-color": "#FF92FA",
        "primary-title-text-color": "#FFFFFF",
        "primary-desc-text-color": "#DEDEDE",
        "primary-desc-strong-text-color": "#DEDEDE",
        "primary-card-color": "#FF92FA",
        "primary-card-color-hover": "#FF72CA",
        "primary-card-color-active": "#FF52AA",
        "primary-card-text-color": "#10181B",
        "secondary-card-color": "#1C1E26",
        "secondary-card-color-hover": "#0C0E16",
        "secondary-card-color-active": "#060804",
        "secondary-card-text-color": "#B86EB7",
      },
      fontSize: {
        sm: "14px",
        md: "16px",
        base: "18px",
        xl: "25px",
        "2xl": "38px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
