import {
  Grid,
  User,
  Switch,
  useTheme,
  Container,
  Spacer,
  Divider,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { SunIcon } from "../components/SunIcon";
import { MoonIcon } from "../components/MoonIcon";
import Head from "next/head";

export default function Layout({ children }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const router = useRouter();
  return (
    <>
      {" "}
      <Head>
        <link rel="icon" type="image/x-icon" href="/azuki.png" />
        <meta
          name="”description”"
          content="Hey, I'm Brian 👋🏼. I hope you enjoy my writing."
        />
        <meta
          name="keywords"
          content="brian fakhoury, venture capital, machine learning, neuroscience, crypto, blockchain, defi, lifestyle, personal page"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <Container xs css={{ p: 0 }}>
        <Grid.Container gap={1} justify="space-between" alignItems="center">
          <Grid>
            <User
              bordered
              pointer
              src="/azuki.png"
              name="Brian Fakhoury"
              color="gradient"
              size="xl"
              onClick={() => router.push("/")}
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
              size="lg"
              iconOn={<MoonIcon filled />}
              iconOff={<SunIcon filled />}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Grid>
        </Grid.Container>
        <Divider />
        <Spacer />
        {children}
      </Container>
    </>
  );
}
