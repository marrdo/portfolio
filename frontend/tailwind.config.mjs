import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff6600', // Ecstasy | Este color debe ser llamativo, pero no estridente. Puede aplicarse generosamente al diseño como su identidad principal.
        lightAccent: '#136f63', // Genoa | Los colores de acento se pueden utilizar para llamar la atención sobre los elementos de diseño contrastando con el resto de la paleta.
        lightShades: '#f7f7f6', // Desert Storm |Utilice este color como fondo para sus diseños oscuros sobre claros, o como color de texto de un diseño invertido.
        darkAccent: '#ad6640', // Brown Rust | Otro color de acento a considerar. No es necesario usar todos los colores; a veces, una paleta de colores sencilla funciona mejor.
        darkShades: '#1f1d23', // Baltic Sea | Úselo como color de texto para diseños oscuros sobre claros o como fondo para diseños invertidos.
        
        // Light mode
        light: {
          background: '#e7e3db',
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
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};