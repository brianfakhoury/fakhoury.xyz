import { PropsWithChildren } from "react";

export default function ConceptsLayout({ children }: PropsWithChildren) {
  return <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>;
}
