import { Text } from "@nextui-org/react";

import posts from "../data/posts.json";

export default function Writing() {
  return <>{Object.keys(posts)}</>;
}
