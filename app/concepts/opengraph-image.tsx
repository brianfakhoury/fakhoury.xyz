import { getConcepts, getConceptGraph } from "@/lib/get-concepts";
import { getBase64Image } from "@/lib/server-utils";
import { ImageResponse } from "next/og";
import path from "path";

export const alt = "Concepts — a personal Zettelkasten";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const concepts = await getConcepts();
  const graph = await getConceptGraph();
  const logoSrc = getBase64Image(path.join("app", "icon.png"));

  return new ImageResponse(
    (
      /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
      <div tw="relative flex items-center justify-center h-full w-full bg-black">
        <div tw="relative flex items-center w-full h-full p-16">
          <img src={logoSrc} tw="w-52 h-52 mr-16 rounded-full" />
          <div tw="w-1.5 h-full bg-stone-600 rounded-lg" />
          <div tw="flex flex-col pl-16 flex-1">
            <div tw="text-8xl text-white leading-tight">Concepts</div>
            <div tw="flex items-center mt-6 text-2xl text-stone-400">
              <span>{concepts.length} notes</span>
              <span tw="ml-4">· {graph.links.length} connections</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
