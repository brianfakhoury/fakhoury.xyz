import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import { nextui } from "@nextui-org/react";

export const content = [
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];

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

export const darkMode = "class";

export const plugins = [typography, nextui()];
