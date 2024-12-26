import React, { PropsWithChildren } from "react";
import { Raleway, Great_Vibes } from "next/font/google";
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

export async function generateMetadata() {
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
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": "https://fakhoury.xyz/opengraph-image.jpg",
      "fc:frame:button:1": "Visit",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": "https://fakhoury.xyz",
      ...(post && {
        "fc:frame:button:2": "My Latest Post",
        "fc:frame:button:2:action": "link",
        "fc:frame:button:2:target": `https://fakhoury.xyz/${post.slug}`,
      }),
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
