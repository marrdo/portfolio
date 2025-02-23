import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Permite activar el modo oscuro con una clase
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // Verde Neón Hack The Box
        secondary: "var(--color-secondary)", // Gris oscuro
        background: {
          light: "var(--color-background-light)",
          dark: "var(--color-background-dark)",
        },
        text: {
          light: "var(--color-text-light)",
          dark: "var(--color-text-dark)",
        },
        accent: {
          light: "var(--color-accent-light)",
          dark: "var(--color-accent-dark)",
        },
        border: {
          light: "var(--color-border-light)",
          dark: "var(--color-border-dark)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
