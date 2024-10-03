import { Raleway } from "next/font/google"
import { Providers } from "./providers"
import ClientLayout from "./components/ClientLayout"

import "./styles/globals.css"

const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${raleway.className}`}>
      <body>
        <Providers baseTheme={baseTheme}>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}