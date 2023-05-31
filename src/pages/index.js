import Head from "next/head";
import {
  Grid,
  Container,
  Text,
  Spacer,
  Collapse,
  Card,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CircumIcon from "@klarr-agency/circum-icons-react";
import { Footer } from "../components/Footer";
import { getLinks } from "lib";
import { Great_Vibes } from "next/font/google";
import Link from "next/link";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function Home({ renderDate, links }) {
  useEffect(() => {
    setMounted(true);
    let x = JSON.parse(localStorage.getItem("count"));
    let y = JSON.parse(localStorage.getItem("clicked"));
    x && setCount(x);
    y && setClick(y);
  }, []);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <Head>
        <title>Brian Fakhoury - Homepage</title>
        <meta property="og:title" content="Brian Fakhoury - Homepage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fakhoury.xyz" />
        <meta property="og:description" content="Ad astra per aspera." />
        <meta
          property="og:image"
          content={`https://fakhoury.xyz/api/og?title=Homepage`}
        />
      </Head>

      <Container fluid>
        <Spacer y={2} />
        <Card css={{ background: "$gradient", p: 0 }} variant="flat">
          <Card.Body css={{ p: "25px 15px" }}>
            <Container css={{ background: "$background", borderRadius: "$md" }}>
              <Spacer />
              <Text>
                👋🏼 <span className={greatVibes.className}>H</span>ey, I&apos;m
                Brian.
              </Text>
              <Text size="$sm">
                You can continue down to my links or see my writings{" "}
                <Link href="writing">here</Link>.
              </Text>
              <Text size="$sm">
                My days are currently occupied investing in and researching
                blockchain networks and crypto assets.
              </Text>
              <Text size="$sm">
                My primary motivation is a strong will to work with hard
                problems and use new technology. I&apos;m a student of first
                principles and rationality. .
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
                  title={
                    <Text h3>
                      <span className={greatVibes.className}>
                        {category.title[0]}
                      </span>
                      {category.title.slice(1)}
                    </Text>
                  }
                  key={i}
                  arrowIcon={<CircumIcon name={category.emoji} />}
                  expanded={category.emoji === "view_list"}
                >
                  <ul>
                    {category.items.map((item, j) => (
                      <li key={j}>
                        <Link href={item.link} target="_blank">
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
