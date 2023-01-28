import { Grid, Text, Button, Tooltip, Link } from "@nextui-org/react";

import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

export const Footer = ({ date }) => (
  <>
    <Grid.Container justify="flex-end">
      <Link
        href="https://github.com/brianfakhoury/brianfakhoury.github.io"
        target="_blank"
      >
        <Button light auto>
          <Sentry speed="0.5" size="14" />
          <Text weight="thin" color="gray">
            Updated on{" "}
            {new Date(JSON.parse(date)).toLocaleString("en", {
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </Text>
        </Button>
      </Link>
    </Grid.Container>
  </>
);
