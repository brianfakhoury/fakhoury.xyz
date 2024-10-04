// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "100ms",
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        greatVibes: ['Great Vibes', 'cursive'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#34d399",
          },
        },
        dark: {
          colors: {
            primary: "#34d399",
          },
        },
      },
    }),
  ],
};
