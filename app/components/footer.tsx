import { Link } from "@nextui-org/react";
import Icon from "./dynamic-icon";
import React from "react";
import BuildInfo from "./build-info";

export default function Footer() {
  const build_date = new Date();
  return (
    <footer className="text-sm text-gray-500 flex items-center py-10 pr-6">
      <Link
        isExternal
        aria-label="Send me a direct message on X"
        href="https://x.com/messages/compose?recipient_id=987899418597879808"
      >
        <Icon name="mailbox" />
      </Link>
      <BuildInfo build_date={build_date} />
    </footer>
  );
}
