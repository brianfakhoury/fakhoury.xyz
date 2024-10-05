"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = ["light", "system", "dark"];
  const currentThemeIndex = themes.indexOf(theme || "system");

  const handleThemeChange = () => {
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : SunMoon;

  return (
    <button onClick={handleThemeChange} className="ml-auto">
      <Icon />
    </button>
  );
}
