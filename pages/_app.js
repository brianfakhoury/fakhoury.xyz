import { ThemeProvider } from "next-themes";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "../styles/globals.css";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      gradient:
        "linear-gradient(112deg, $red100 -25%, $yellow500 -10%, $green500 80%)",
      link: "$green700",
    }, // optional
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      gradient:
        "linear-gradient(112deg, $red100 -25%, $yellow500 -10%, $green500 80%)",
      link: "$green700",
    }, // optional
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
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
