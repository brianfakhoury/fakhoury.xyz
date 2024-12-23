import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/components/(accordion|card).js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      stone: colors.stone,
    },
    transitionDuration: {
      DEFAULT: "100ms",
    },
    extend: {
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        greatVibes: ["var(--font-greatVibes)"],
      },
    },
  },
  darkMode: "class",
  plugins: [typography, nextui()],
} satisfies Config;