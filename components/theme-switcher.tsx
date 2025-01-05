"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleThemeChange = () => {
    setTheme(upcomingTheme);
  };

  const Icon =
    upcomingTheme === "light" ? Sun : upcomingTheme === "dark" ? Moon : SunMoon;
  return (
    <button
      onClick={handleThemeChange}
      className="ml-auto text-muted-foreground hover:text-foreground"
      aria-label="Switch theme"
    >
      <Icon />
    </button>
  );
}
