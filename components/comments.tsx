"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore } from "react";

const REPO = "brianfakhoury/fakhoury.xyz";

export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const utterancesTheme =
    resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Clear any existing utterances iframe
    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", REPO);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", utterancesTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);
  }, [mounted, utterancesTheme]);

  if (!mounted) return null;

  return <div ref={containerRef} className="mt-8" />;
}
