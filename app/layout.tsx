import { Raleway } from "next/font/google";
import { Providers } from "@/app/providers";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "@/styles/globals.css";

const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.className}`}>
      <body>
        <Providers>
          <div className="container mx-auto px-4 max-w-screen-xl">
            <Header />
            <div className="p-0">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
