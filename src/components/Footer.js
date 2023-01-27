import {
  Grid,
  Divider,
  Text,
  Button,
  Spacer,
  Tooltip,
  Link,
} from "@nextui-org/react";

import { Sentry } from "react-activity";
import "react-activity/dist/library.css";

export const Footer = ({ date }) => (
  <>
    <Grid.Container justify="flex-end">
      <Tooltip content="View Source" color="primary">
        <Link
          href="https://github.com/brianfakhoury/brianfakhoury.github.io"
          target="_blank"
        >
          <Button light auto>
            <Sentry speed="0.5" size="14" />
            <Text weight="thin" color="gray">
              Updated on{" "}
              {new Date(JSON.parse(date)).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                weekday: "short",
              })}
            </Text>
          </Button>
        </Link>
      </Tooltip>
    </Grid.Container>
  </>
);
