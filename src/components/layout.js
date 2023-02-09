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
import Image from "next/image";

export default function Layout({ children }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const router = useRouter();
  return (
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
      <main>{children}</main>
    </Container>
  );
}
