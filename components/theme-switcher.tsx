"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useSyncExternalStore } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  // The user expects the theme to switch when they tap.
  // If the system theme changes to match the forced theme,
  // the next theme should be forced opposite. Otherwise,
  // the next theme should be the system theme for convenience
  const upcomingTheme =
    theme === "system" || theme === systemTheme
      ? resolvedTheme === "light"
        ? "dark"
        : "light"
      : "system";

  const Icon =
    upcomingTheme === "light" ? Sun : upcomingTheme === "dark" ? Moon : SunMoon;

  return (
    <button
      onClick={() => setTheme(upcomingTheme)}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Switch theme"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
