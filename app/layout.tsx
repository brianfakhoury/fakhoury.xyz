import { Raleway } from "next/font/google";
import { Providers } from "@/app/providers";
import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { PropsWithChildren } from "react";

import "@/app/styles/globals.css";

const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });

export const dynamic = "force-static";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <div className="container mx-auto px-4 sm:px-8 max-w-screen-xl">
            <Header />
            <main className="min-h-[85vh] p-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? `https://fakhoury.xyz`
    : `http://localhost:${process.env.PORT || 3000}`, // bug: i had to hardcode this myself even though theres a default
  title: {
    template: "%s | Brian Fakhoury",
    default: "Brian Fakhoury",
  },
  description: "My personal site and digital garden.",
  authors: [{ name: "Brian Fakhoury" }],
  openGraph: {
    url: "/",
    siteName: "Brian Fakhoury",
    locale: "en_US",
    type: "website",
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
    card: "summary_large_image",
    creator: "@brianfakhoury",
  },
  alternates: {
    canonical: "https://fakhoury.xyz",
    types: {
      "application/atom+xml": "/atom.xml",
      "application/rss+xml": "/feed.xml",
      "application/json": "/feed.json",
    },
  },
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
