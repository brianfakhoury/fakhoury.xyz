import { Card, Col, Row, Button, Text } from "@nextui-org/react";

export const FrontCard = () => (
  <Card cover css={{ w: "100%" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Writing
        </Text>
        <Text h3 color="black">
          Title
        </Text>
      </Col>
    </Card.Header>
    <Card.Body>
      <Card.Image
        src="https://nextui.org/images/card-example-6.jpeg"
        height={250}
        width="100%"
        alt="Card background"
      />
    </Card.Body>
    <Card.Footer
      blur
      css={{
        position: "absolute",
        bgBlur: "#ffffff",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        {/* <Col>
          <Text color="#000" size={12}>
            Check it out.
          </Text>
        </Col> */}
        <Col>
          <Row justify="center">
            <Button flat auto rounded color="secondary">
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                More
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);
