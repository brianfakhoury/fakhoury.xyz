import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./theme-switcher";
import Icon from "@/app/icon.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="flex items-center gap-2.5 group">
        <Image
          src={Icon}
          width={32}
          height={32}
          alt="Brian Fakhoury"
          className="rounded-full"
        />
        <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Brian Fakhoury
        </span>
      </Link>

      <nav className="flex items-center gap-5">
        <Link
          href="/writing"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Writing
        </Link>
        <Link
          href="/concepts"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Concepts
        </Link>
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
