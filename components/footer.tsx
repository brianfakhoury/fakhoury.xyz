import { Mailbox } from "lucide-react";
import BuildInfo from "./build-info";
import Link from "next/link";

export default function Footer() {
  const build_date = new Date();
  return (
    <footer className="text-sm flex items-center py-10 pr-2">
      <Link
        aria-label="Send me a direct message on X"
        href="https://x.com/messages/compose?recipient_id=987899418597879808"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground"
      >
        <Mailbox />
      </Link>
      <BuildInfo build_date={build_date} />
    </footer>
  );
}
