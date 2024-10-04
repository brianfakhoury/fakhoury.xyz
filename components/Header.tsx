"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { User, Link } from "@nextui-org/react";

import { Moon, Sun, SunMoon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = ["light", "system", "dark"];
  const currentThemeIndex = themes.indexOf(theme || "system");

  const handleThemeChange = () => {
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : SunMoon;

  return (
    <div className="flex items-center py-10 px-4">
      <User
        name="Brian Fakhoury"
        description={
          <Link href="https://x.com/brianfakhoury" isExternal size="sm">
            @brianfakhoury
          </Link>
        }
        avatarProps={{
          src: "/azuki.png",
        }}
        onClick={() => router.push("/")}
        className="hover:cursor-pointer"
      />
      <button onClick={handleThemeChange} className="ml-auto mr-5">
        <Icon />
      </button>
    </div>
  );
}
