import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Grid,
  Switch,
  useTheme,
  User,
  Container,
  Divider,
  Tooltip,
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

import { FrontCard } from "../components/FrontCard";

import content from "../public/content.json";
import { Footer } from "../components/Footer";

export default function Home({ renderDate }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  useEffect(() => setMounted(true), []);
  const [mounted, setMounted] = useState(false);

  return (
    <Container xs css={{ p: 0 }}>
      <Head>
        <title>Brian Fakhoury - Homepage</title>
        {/* <link rel="icon" type="image/x-icon" href={favicon} /> */}
        <meta name="”description”" content="Brian Fakhoury personal webpage!" />
        <meta
          name="keywords"
          content="brian fakhoury, venture capital, machine learning, neuroscience, lifestyle, personal page"
        />
        <meta property="og:title" content="Brian Fakhoury - Homepage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brianfakhoury.com" />
        {/* <meta property="og:image" content={profile} /> */}
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
              <Spacer />
            </Container>
          </Card.Body>
        </Card>

        {/* <Spacer y={2} />

        <Text h1 color="secondary">
          Highlights
        </Text>
        <Spacer />
        <Grid.Container gap={2} justify="center" css={{ p: 0 }}>
          <Grid xs={12} sm={7}>
            <FrontCard />
          </Grid>
          <Grid xs={12} sm={5}>
            <FrontCard />
          </Grid>
          <Grid xs={12} sm={5}>
            <FrontCard />
          </Grid>
          <Grid xs={12} sm={7}>
            <FrontCard />
          </Grid>
        </Grid.Container> */}

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
