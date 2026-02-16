import { getConcepts, getConcept } from "@/lib/get-concepts";
import { getBase64Image } from "@/lib/server-utils";
import { ImageResponse } from "next/og";
import path from "path";

export const alt = "Concept card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const concepts = await getConcepts();
  return concepts.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = await getConcept(slug);

  if (!concept) {
    return new ImageResponse(
      <div tw="flex items-center justify-center w-full h-full bg-black text-white text-4xl">
        Concept not found
      </div>,
      { ...size }
    );
  }

  const logoSrc = getBase64Image(path.join("app", "icon.png"));

  const textSize =
    concept.title.length > 60
      ? "text-5xl"
      : concept.title.length > 30
        ? "text-6xl"
        : "text-7xl";

  const connectionCount =
    concept.forwardLinks.length + concept.backlinks.length;

  return new ImageResponse(
    (
      /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
      <div tw="relative flex items-center justify-center h-full w-full bg-black">
        <div tw="relative flex items-center w-full h-full p-16">
          <img src={logoSrc} tw="w-52 h-52 mr-16 rounded-full" />
          <div tw="w-1.5 h-full bg-stone-600 rounded-lg" />
          <div tw="flex flex-col pl-16 flex-1">
            <div tw={`${textSize} text-white leading-tight`}>
              {concept.title}
            </div>
            <div tw="flex items-center mt-6 text-2xl text-stone-400">
              <span>Concept</span>
              {connectionCount > 0 && (
                <span tw="ml-4">
                  · {connectionCount} connection{connectionCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
