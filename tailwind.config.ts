import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0070f3",
          lightBlue: "#00b5cc",
          green: "#97ce4c",
          dark: "#202329",
        },
      },
      maxWidth: {
        grid: "1020px",
        hero: "600px",
      },
      spacing: {
        section: "61px",
        "hero-top": "26px",
        card: "20px",
      },
      height: {
        card: "246px",
        "card-image": "168px",
        footer: "60px",
      },
      width: {
        "load-more": "154px",
      },
    },
  },
  plugins: [],
};
export default config;
