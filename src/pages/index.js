import Head from "next/head";
import {
  Grid,
  Container,
  Divider,
  Link,
  Text,
  Spacer,
  Collapse,
  Card,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CircumIcon from "@klarr-agency/circum-icons-react";
import Heart from "../components/heart";
import { Footer } from "../components/footer";
import { getLinks } from "lib";

export default function Home({ renderDate, links }) {
  useEffect(() => {
    setMounted(true);
    let x = JSON.parse(localStorage.getItem("count"));
    let y = JSON.parse(localStorage.getItem("clicked"));
    x && setCount(x);
    y && setClick(y);
  }, []);
  const [mounted, setMounted] = useState(false);
  const [isclicked, setClick] = useState(false);
  const [count, setCount] = useState(141);

  return (
    <>
      <Head>
        <title>Brian Fakhoury - Homepage</title>
        <link rel="icon" type="image/x-icon" href="/azuki.png" />
        <meta
          name="”description”"
          content="Hey, I'm Brian 👋🏼. This is my personal website, a list of all things relevant to me."
        />
        <meta
          name="keywords"
          content="brian fakhoury, venture capital, machine learning, neuroscience, crypto, blockchain, defi, lifestyle, personal page"
        />
        <meta property="og:title" content="Brian Fakhoury - Homepage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fakhoury.xyz" />
        <meta property="og:image" content="/header.png" />
        <meta property="og:description" content="Ad astra per aspera." />
      </Head>

      <Container fluid>
        <Card css={{ background: "$gradient", p: 0 }} variant="flat">
          <Card.Body css={{ p: "25px 15px" }}>
            <Container css={{ background: "$background", borderRadius: "$md" }}>
              <Spacer />
              <Text>👋🏼 Hey, I&apos;m Brian.</Text>
              <Text size="$sm">
                My days are currently occupied investing in and researching
                blockchain networks and crypto assets.
              </Text>
              <Text size="$sm">
                My primary motivation is a strong will to work with hard
                problems and use new technology.
              </Text>
              <Text size="$sm">
                I&apos;m a student of first principles and rationality. You can
                continue down to my links or see my writings{" "}
                <Link href="writing">here</Link>.
              </Text>
              {/* <Grid.Container justify="flex-end" alignItems="center">
                <Heart
                  isclicked={isclicked}
                  onClick={() => {
                    if (isclicked) {
                      setClick(false);
                      setCount(count - 1);
                      localStorage.setItem("count", JSON.stringify(count - 1));
                      localStorage.setItem("clicked", JSON.stringify(false));
                    } else {
                      setClick(true);
                      setCount(count + 1);
                      localStorage.setItem("count", JSON.stringify(count + 1));
                      localStorage.setItem("clicked", JSON.stringify(true));
                    }
                  }}
                />
                <Text small color="gray">
                  {count}
                </Text>
              </Grid.Container> */}
            </Container>
          </Card.Body>
        </Card>

        <Spacer y={2} />

        <Grid.Container gap={2} css={{ p: 0 }}>
          <Grid css={{ p: 0 }}>
            <Collapse.Group css={{ p: 0 }}>
              {links.map((category, i) => (
                <Collapse
                  title={category.title}
                  key={i}
                  arrowIcon={<CircumIcon name={category.emoji} />}
                  expanded={category.emoji === "view_list"}
                >
                  <ul>
                    {category.items.map((item, j) => (
                      <li key={j}>
                        <Link isExternal href={item.link} target="_blank">
                          {item.content}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              ))}
            </Collapse.Group>
          </Grid>
        </Grid.Container>
      </Container>

      <Spacer y={1} />

      <Footer date={renderDate} />
      <Spacer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      renderDate: JSON.stringify(new Date()),
      links: getLinks(),
    },
  };
}
