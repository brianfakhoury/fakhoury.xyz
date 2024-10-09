import { User, Link } from "@nextui-org/react";
import ThemeSwitcher from "./theme-switcher";
import Image from "next/image";
import HomeLink from "./home-link";

export default function Header() {
  return (
    <header className="flex items-center py-10 pr-6">
      <User
        name={
          <Link href="/" className="text-inherit">
            Brian Fakhoury
          </Link>
        }
        description={
          <Link
            href="https://x.com/brianfakhoury"
            isExternal
            size="sm"
            className="py-0.5"
          >
            @brianfakhoury
          </Link>
        }
        avatarProps={{
          as: HomeLink,
          src: "/icon.png",
          ImgComponent: Image,
          imgProps: {
            width: 256,
            height: 256,
            alt: "Brian Fakhoury's headshot",
          },
        }}
      />

      <ThemeSwitcher />
    </header>
  );
}
