"use client";

import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function BuildInfo({ buildTime }: { buildTime: string }) {
  const [age, setAge] = useState("");

  useEffect(() => {
    setAge(timeAgo(new Date(buildTime)));
  }, [buildTime]);

  return (
    <Link
      className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
      href="https://github.com/brianfakhoury/fakhoury.xyz"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="inline-block w-1.5 h-1.5 bg-stone-500 dark:bg-stone-300 rounded-full" />
      {age && <span>{age}</span>}
    </Link>
  );
}
