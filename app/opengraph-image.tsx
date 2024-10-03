import { ImageResponse } from 'next/og'
import { headers } from 'next/headers' // Import headers function from Next.js

export const runtime = 'edge'

export const alt = 'Brian Fakhoury Website Header'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const title = params.slug ? params.slug.replace(/-/g, ' ') : 'Brian Fakhoury'
  const headersList = headers();
  const host = headersList.get('host') || process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const azukiUrl = `${protocol}://${host}/azuki.png`; // Construct absolute URL for the image

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0)",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%)",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "nowrap",
            padding: "100px",
            overflow: "hidden",
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
              src={azukiUrl}
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
              lineHeight: "11rem",
              whiteSpace: "nowrap",
            }}
          >
            {"//"}
          </div>
          <div
            style={{
              fontSize: title.length > 40 ? 60 : title.length > 30 ? 70 : 100,
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
      ...size,
    }
  )
}