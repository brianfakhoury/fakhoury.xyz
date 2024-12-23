"use client";

import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { useState, useEffect } from "react";

interface BuildInfoProps {
  build_date: Date;
}

export default function BuildInfo({ build_date }: BuildInfoProps) {
  const [timeAgoText, setTimeAgoText] = useState("");

  useEffect(() => {
    setTimeAgoText(timeAgo(build_date));
  }, [build_date]);

  return (
    <Link
      className="ml-auto text-xs"
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
