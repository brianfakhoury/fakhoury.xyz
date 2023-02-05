import { Link, Text } from "@nextui-org/react";
import { getPosts } from "lib";

export default function Writing({ posts }) {
  return (
    <ul>
      {Object.keys(posts).map((post, i) => (
        <li key={i}>
          <Link href={post}>{posts[post].content.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
