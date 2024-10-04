import { Link } from "@nextui-org/react"

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500">
      <Link href="https://x.com/messages/compose?recipient_id=987899418597879808">DM</Link>
      <p>© 2021, All Rights Reserved</p>
      <span className="inline-block w-2 h-2 bg-primary rounded-full">Latest Build</span>
    </footer>
  );
}
