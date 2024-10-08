"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

export interface HomeLinkProps extends Omit<LinkProps, "href"> {
  children: React.ReactNode;
}

const HomeLink = forwardRef<HTMLAnchorElement, HomeLinkProps>(
  ({ children, ...props }, ref) => (
    <Link href="/" {...props} ref={ref}>
      {children}
    </Link>
  )
);

HomeLink.displayName = "HomeLink";

export default HomeLink;
