import React, { PropsWithChildren } from "react";
import { Raleway, Great_Vibes } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getPost } from "@/lib/get-posts";

import "@/styles/globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});
const great_vibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-greatVibes",
  weight: "400",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${raleway.variable} ${great_vibes.variable}`}>
        <Providers>
          <div className="mx-auto px-4 sm:px-8 max-w-screen-xl font-raleway">
            <Header />
            <main className="min-h-[85vh] p-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost();
  return {
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? 'https://fakhoury.xyz'
        : `http://localhost:${process.env.PORT || 3000}`
    ),
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
    archives: ["https://fakhoury.xyz/writing"],
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: "https://fakhoury.xyz/opengraph-image.jpg",
        button: {
          title: post ? "Read Latest Post" : "Visit Site",
          action: {
            type: "launch_frame",
            name: "Brian Fakhoury",
            url: post ? `https://fakhoury.xyz/${post.slug}` : "https://fakhoury.xyz"
          }
        }
      })
    },
  };
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
