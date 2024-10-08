import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Couldn't find it.</h1>
      <p>My website doesn't know what you're looking for.</p>
      <p>Here are some links, maybe you can find it elsewhere:</p>
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          {" "}
          <Link href="/writing">All writing</Link>
        </li>
        <li>
          <Link href="/robots.txt">Instructions for robots</Link>
        </li>
        <li>
          <Link href="/sitemap.xml">Sitemap (also for robots)</Link>
        </li>
      </ul>
    </div>
  );
}
