'use client'

import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children, baseTheme }) {
  const lightTheme = createTheme({
    type: "light",
    theme: {
      ...baseTheme,
    },
  })

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      ...baseTheme,
    },
  })

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  )
}