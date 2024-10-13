// components/header.tsx
import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./theme-switcher";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10 pr-6">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/icon.png"
            width={40}
            height={40}
            alt="Brian Fakhoury's headshot"
            className="rounded-full"
          />
        </Link>
        <div className="ml-2 flex flex-col">
          <Link href="/" className="text-inherit">
            Brian Fakhoury
          </Link>
          <Link
            href="https://x.com/brianfakhoury"
            className="py-0.5 text-sm text-gray-500"
          >
            @brianfakhoury
          </Link>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
