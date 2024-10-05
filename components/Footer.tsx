import { Link } from "@nextui-org/react";
import Icon from "./Icon";
import React from "react";
import { timeAgo } from "@/lib/utils";


export default function Footer() {
  const buildDate = new Date(); // Using the current date at runtime
  const timeAgoText = timeAgo(buildDate);

  return (
    <footer className="text-sm text-gray-500 flex items-center py-10 pr-6">
      <Link
        isExternal
        href="https://x.com/messages/compose?recipient_id=987899418597879808"
      >
        <Icon name="mailbox" />
      </Link>
      <Link
        isExternal
        className="ml-auto text-inherit text-xs"
        href="https://github.com/brianfakhoury/personal-website"
      >
        <span className="inline-block m-1 w-2 h-2 bg-primary rounded-full" />
        <p>
          {timeAgoText && <span>{timeAgoText}</span>}
        </p>
      </Link>
    </footer>
  );
}
