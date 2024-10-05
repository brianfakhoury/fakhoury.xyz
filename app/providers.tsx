"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="system" attribute="class" enableSystem>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
