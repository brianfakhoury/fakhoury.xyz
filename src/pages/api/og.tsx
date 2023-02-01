import { ImageResponse } from "@vercel/og";
import { url } from "inspector";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            background: "rgb(255, 255, 255)",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgb(0, 0, 0)",
              height: "98%",
              width: "99%",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "nowrap",
              padding: "50px",
              borderRadius: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <img
                alt="Brian F"
                height={200}
                src="http://localhost:3000/azuki.png"
                style={{
                  margin: "0",
                  borderRadius: "50%",
                }}
                width={200}
              />
            </div>
            <div
              style={{
                fontSize: 160,
                fontStyle: "normal",
                color: "white",
                padding: "0 80px 0 30px",
                whiteSpace: "nowrap",
              }}
            >
              ::
            </div>
            <div
              style={{
                fontSize: 75,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "white",
                padding: "0 0 0 50px",
                lineHeight: 1.4,
              }}
            >
              {title.toUpperCase()}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
