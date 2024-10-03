'use client'

import { Grid, User, Switch, useTheme } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { SunIcon } from "./SunIcon"
import { MoonIcon } from "./MoonIcon"

export default function ClientHeader() {
  const { setTheme, isDark } = useTheme()
  const router = useRouter()

  return (
    <Grid.Container
      justify="space-between"
      alignItems="center"
      style={{ padding: "40px 20px" }}
    >
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
            css={{ color: "$accents8" }}
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
          style={{ marginRight: "20px" }}
        />
      </Grid>
    </Grid.Container>
  )
}