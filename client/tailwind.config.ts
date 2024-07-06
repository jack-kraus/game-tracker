import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "white-md" : ["0 10px 8px rgba(255, 255, 255, 0.08)", "0 4px 3px rgba(255, 255, 255, 0.2)"],
        "white-xl" : ["0 20px 13px rgba(255, 255, 255, 0.06)", "0 8px 5px rgba(255, 255, 255, 0.16)"]
      },
      colors: {
        primary: '#8960FF',
        secondary: "#ca80ff",
        scale: {
          0: "#e8f5fa",
          100: "#d4dfe6",
          200: "#c0c9d2",
          300: "#acb3bd",
          400: "#989da9",
          500: "#848795",
          600: "#6f7081",
          700: "#5b5a6d",
          800: "#474458",
          900: "#332e44",
          1000: "#1f1830"
        },
      },
      filter: ['hover', 'focus'],
    },
  },
  plugins: [],
};
export default config;
