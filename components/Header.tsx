import { User, Link } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="flex items-center py-10 pr-6">
      <Link href="/" className="text-inherit">
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
        />
      </Link>

      <ThemeSwitcher />
    </header>
  );
}
