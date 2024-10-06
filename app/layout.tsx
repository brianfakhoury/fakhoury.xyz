import { Raleway } from "next/font/google";
import { Providers } from "@/app/providers";
import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { PropsWithChildren } from "react";

import "@/app/styles/globals.css";

const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={raleway.className}>
      <body>
        <Providers>
          <div className="container mx-auto px-4 sm:px-8 max-w-screen-xl">
            <Header />
            <div className="min-h-[80vh] p-0">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL("https://fakhoury.xyz"),
  title: {
    template: "%s | Max Leiter",
    default: "Brian Fakhoury",
  },
  description: "Brian Fakhoury's personal site and digital garden.",
  openGraph: {
    title: "Brian Fakhoury",
    url: "https://fakhoury.xyz",
    siteName: "Brian Fakhoury's website",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://fakhoury.xyz/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Brian Fakhoury's site",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: "Brian Fakhoury",
    card: "summary_large_image",
    creator: "@brianfakhoury",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://fakhoury.xyz/feed.xml",
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
