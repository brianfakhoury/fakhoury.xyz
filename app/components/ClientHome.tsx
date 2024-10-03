'use client'

import {
  Grid,
  Container,
  Text,
  Spacer,
  Collapse,
  Card,
  Badge,
} from "@nextui-org/react"
import CircumIcon from "@klarr-agency/circum-icons-react"
import Link from "next/link"
import FancyTitle from "./FancyTitle"

export default function ClientHome({ links, latestPost }) {
  return (
    <Container fluid css={{ maxW: "600px" }}>
      <Spacer y={2} />
      <Card isHoverable isPressable disableRipple variant="bordered">
        <Card.Body css={{ padding: "0 20px" }}>
          <Text>
            <Badge color="primary" variant="dot" /> New writing:{" "}
            {latestPost && (
              <Link href={latestPost.slug}>
                <FancyTitle text={latestPost.title} />
              </Link>
            )}
          </Text>
        </Card.Body>
      </Card>

      <Spacer y={2} />

      <Card css={{ background: "$gradient", p: 0 }} variant="flat">
        <Card.Body css={{ padding: "25px 15px" }}>
          <Container css={{ background: "$background", borderRadius: "$md" }}>
            <Spacer />
            <Text>
              👋🏼 <span className="great-vibes">H</span>ey, I&apos;m
              Brian.
            </Text>
            <Text size="$sm">
              You can continue down to my links or see my writing archive{" "}
              <Link href="writing">here</Link>.
            </Text>
            <Text size="$sm">
              My days are currently occupied investing in and researching
              blockchain networks and crypto assets.
            </Text>
            <Text size="$sm">
              My primary motivation is a strong will to work with hard
              problems and use new technology. I&apos;m a student of first
              principles and rationality.
            </Text>
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
                    <span className="great-vibes">
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

      <Spacer y={1} />
    </Container>
  )
}