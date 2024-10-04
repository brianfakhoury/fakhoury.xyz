'use client'

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      enableSystem
    >
      <NextUIProvider>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
