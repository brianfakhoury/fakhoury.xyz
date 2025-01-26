import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./theme-switcher";
import Icon from "@/app/icon.png";
import { Home } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10 pr-6">
      <div className="flex items-center">
        <Link href="/" className="relative group">
          <div className="absolute -left-0.5 -bottom-0.5 rounded-full bg-background p-0.5 shadow-xs">
            <Home size={14} className="text-muted-foreground group-hover:text-foreground" />
          </div>
          <Image
            src={Icon}
            width={40}
            height={40}
            alt="Headshot of Brian Fakhoury"
            className="rounded-full"
          />
        </Link>
        <div className="ml-2 flex flex-col text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Brian Fakhoury</Link>
          <Link
            href="https://x.com/brianfakhoury"
            className="py-0.5 text-sm hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            @brianfakhoury
          </Link>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
