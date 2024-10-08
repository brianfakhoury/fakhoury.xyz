"use client";

import { Link } from "@nextui-org/react";
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
      isExternal
      className="ml-auto text-inherit text-xs"
      href="https://github.com/brianfakhoury/personal-website"
    >
      <span className="inline-block m-1 w-2 h-2 bg-primary rounded-full" />
      <p>{timeAgoText && <span>{timeAgoText}</span>}</p>
    </Link>
  );
}
