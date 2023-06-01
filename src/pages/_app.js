import { ThemeProvider } from "next-themes";
import { createTheme, globalCss, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Layout from "../components/layout";
import { Raleway } from "next/font/google";

import "../styles/globals.css";

const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });

const baseTheme = {
  colors: {
    gradient:
      "linear-gradient(112deg, $red100 -25%, $yellow500 -10%, $green500 80%)",
    link: "$green800",
    primary: "$green600",
    secondary: "$yellow600",
  },
  fonts: {
    sans: raleway.style.fontFamily,
  },
  letterSpacings: { tighter: "0.05em" },
  fontSizes: {
    base: "1.05rem",
    xl: "1.1rem",
    "2xl": "1.2rem",
    "3xl": "1.3rem",
    "4xl": "1.5rem",
    "5xl": "2rem",
  },
};

const lightTheme = createTheme({
  type: "light",
  theme: {
    ...baseTheme,
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    ...baseTheme,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
