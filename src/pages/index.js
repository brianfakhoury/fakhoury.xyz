import Head from "next/head";
import {
  Grid,
  Switch,
  useTheme,
  User,
  Container,
  Divider,
  Link,
  Text,
  Spacer,
  Collapse,
  Card,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

import { SunIcon } from "../components/SunIcon";
import { MoonIcon } from "../components/MoonIcon";
import Heart from "../components/Heart";
import { Footer } from "../components/Footer";

import content from "../data/content.json";

export default function Home({ renderDate }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
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
    <Container xs css={{ p: 0 }}>
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

      <Spacer />
      <Grid.Container gap={1} justify="space-between" alignItems="center">
        <Grid>
          <User
            bordered
            pointer="true"
            src="/azuki.png"
            name="Brian Fakhoury"
            color="gradient"
            size="xl"
          >
            <User.Link
              href="https://twitter.com/brianfakhoury"
              css={{ color: "$link" }}
            >
              @brianfakhoury
            </User.Link>
          </User>
        </Grid>

        <Grid>
          <Switch
            checked={isDark}
            size="xl"
            shadow
            iconOn={<MoonIcon filled />}
            iconOff={<SunIcon filled />}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </Grid>
      </Grid.Container>
      <Divider />

      <Spacer />

      <Container fluid>
        <Card css={{ background: "$gradient", p: 0 }} variant="flat">
          <Card.Body css={{ p: "25px 15px" }}>
            <Container css={{ background: "$background", borderRadius: "$md" }}>
              <Spacer />
              <Text>👋🏼 Hey, I&apos;m Brian</Text>
              <Text>
                My days are currently occupied investing in and researching
                blockchain networks and crypto assets.
              </Text>
              <Text>
                My primary motivation is a strong will to work with hard
                problems and use new technology.
              </Text>
              <Text>
                I&apos;m a student of first principles and rationality.
              </Text>
              <Grid.Container justify="flex-end" alignItems="center">
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
              </Grid.Container>
            </Container>
          </Card.Body>
        </Card>

        <Spacer y={2} />

        <Grid.Container gap={2} css={{ p: 0 }}>
          <Grid css={{ p: 0 }}>
            <Collapse.Group css={{ p: 0 }}>
              {content.map((category, i) => (
                <Collapse
                  title={category.emoji + " " + category.title}
                  key={i}
                  arrowIcon={<SunIcon />}
                  expanded={category.emoji === "🗞"}
                >
                  <ul>
                    {category.items.map((item, j) => (
                      <li key={j}>
                        <Link icon href={item.link} target="_blank">
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

      <Spacer y={3} />

      <Footer date={renderDate} />
      <Spacer />
    </Container>
  );
}

export async function getStaticProps() {
  return {
    props: {
      renderDate: JSON.stringify(new Date()),
    },
  };
}
