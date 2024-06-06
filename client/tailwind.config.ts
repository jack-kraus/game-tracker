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
      colors: {
        primary: '#8960FF',
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
