"use client";

import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function BuildInfo() {
  const [timeAgoText, setTimeAgoText] = useState("");

  useEffect(() => {
    setTimeAgoText(timeAgo(new Date()));
  }, []);

  return (
    <Link
      className="ml-auto text-xs text-muted-foreground hover:text-foreground"
      href="https://github.com/brianfakhoury/personal-website"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>
        <span className="inline-block w-2 h-2 mr-1 bg-stone-500 dark:bg-stone-300 rounded-full" />
        {timeAgoText && <span>{timeAgoText}</span>}
      </p>
    </Link>
  );
}
