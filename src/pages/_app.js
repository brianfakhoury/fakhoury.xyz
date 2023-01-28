import { ThemeProvider } from "next-themes";
import { createTheme, globalCss, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Layout from "../components/layout";

import "../styles/globals.css";

const baseTheme = {
  colors: {
    gradient:
      "linear-gradient(112deg, $red100 -25%, $yellow500 -10%, $green500 80%)",
    link: "$green700",
  },
  letterSpacings: { tighter: "0.05em" },
  fontSizes: {
    base: "1.05rem",
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
