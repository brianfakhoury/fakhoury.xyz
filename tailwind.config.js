import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config['content']} */
export const content = [
  "./node_modules/@nextui-org/theme/dist/components/(accordion|card).js",
  "./app/**/*.{js,ts,jsx,tsx}",
];

/** @type {import('tailwindcss').Config['theme']} */
export const theme = {
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
};

/** @type {import('tailwindcss').Config['darkMode']} */
export const darkMode = "class";

/** @type {import('tailwindcss').Config['plugins']} */
export const plugins = [typography, nextui()];
