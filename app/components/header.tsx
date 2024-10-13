import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./theme-switcher";
import Icon from "@/app/icon.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10 pr-6">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={Icon}
            width={40}
            height={40}
            alt="Headshot of Brian Fakhoury"
            className="rounded-full"
          />
        </Link>
        <div className="ml-2 flex flex-col">
          <Link href="/">Brian Fakhoury</Link>
          <Link
            href="https://x.com/brianfakhoury"
            className="py-0.5 text-sm text-primary"
          >
            @brianfakhoury
          </Link>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
