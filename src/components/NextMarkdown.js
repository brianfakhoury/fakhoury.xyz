import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import { Text, Link, Container } from "@nextui-org/react";
import Image from "next/image";

export const NextMarkdown = ({ children }) => {
  const getRemoteImage = (src) => {
    let image = fetch(src);
    console.log(image);
    return image;
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkUnwrapImages]}
      components={{
        h1: ({ node, ...props }) => <Text h1 {...props} />,
        h2: ({ node, ...props }) => <Text h2 {...props} />,
        h3: ({ node, ...props }) => <Text h3 {...props} />,
        p: ({ node, ...props }) => <Text {...props} />,
        a: ({ node, ...props }) => (
          <Link target="_blank" css={{ display: "inline" }} {...props} />
        ),
        strong: ({ node, ...props }) => <Text b {...props} />,
        blockquote: ({ node, ...props }) => <Text blockquote {...props} />,
        code: ({ node, ...props }) => <Text code {...props} />,
        img: ({ node, ...props }) => {
          let imageURL = new URL(props.src);
          return (
            <Image
              {...props}
              width={imageURL.searchParams.get("width")}
              height={imageURL.searchParams.get("height")}
              layout="responsive"
              style={{ borderRadius: "10px" }}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
