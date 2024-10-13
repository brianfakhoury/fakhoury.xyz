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
        raleway: ["var(--font-raleway)"],
        greatVibes: ["var(--font-greatVibes)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#57534e",
          },
        },
        dark: {
          colors: {
            primary: "#a8a29e",
          },
        },
      },
    }),
  ],
};
