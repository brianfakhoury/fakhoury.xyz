import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import { Text, Link, Container, Spacer } from "@nextui-org/react";

export const NextMarkdown = ({ children }) => {
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
        code: ({ node, ...props }) => <code {...props} />,
        pre: ({ node, ...props }) => <pre {...props} />,
        strong: ({ node, ...props }) => <Text b {...props} />,
        blockquote: ({ node, ...props }) => <Text blockquote {...props} />,
        img: ({ node, alt, ...props }) => {
          return (
            <>
              <Spacer />
              <img {...props} alt={alt} style={{ borderRadius: "10px" }} />
              {alt && (
                <Container display="flex" justify="center">
                  <Text small color="$gray800">
                    {alt}
                  </Text>
                </Container>
              )}
            </>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
