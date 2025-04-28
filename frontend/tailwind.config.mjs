import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6600', // Bright orange
        lightAccent: '#136f63', // Dark green
        lightShades: '#000f08', // Deep black
        darkAccent: '#e0ca3c', // Mustard yellow
        darkShades: '#3e2f5b', // Deep purple
        
        // Light mode
        light: {
          background: '#f8f9fa',
          text: '#212529',
        },
        
        // Dark mode (hacker style)
        dark: {
          background: '#0a0a0a',
          text: '#e0e0e0',
          codeBackground: '#1a1a1a',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.darkAccent'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.darkAccent'),
              },
            },
            h1: {
              color: theme('colors.dark.text'),
            },
            h2: {
              color: theme('colors.dark.text'),
            },
            h3: {
              color: theme('colors.dark.text'),
            },
            h4: {
              color: theme('colors.dark.text'),
            },
            code: {
              color: theme('colors.darkAccent'),
              backgroundColor: theme('colors.dark.codeBackground'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};