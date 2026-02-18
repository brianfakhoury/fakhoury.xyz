import BuildInfo from "./build-info";
import Link from "next/link";
import { CreativeCommons } from "lucide-react";

const BUILD_TIME = new Date().toISOString();

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-6 pb-10 flex items-center justify-between text-xs text-muted-foreground">
      <Link
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="license noopener noreferrer"
        className="hover:text-foreground transition-colors"
        title="CC BY 4.0"
      >
        <CreativeCommons className="h-4 w-4" />
      </Link>
      <BuildInfo buildTime={BUILD_TIME} />
    </footer>
  );
}
