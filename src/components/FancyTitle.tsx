import { Great_Vibes } from "@next/font/google";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function FancyTitle({ text }: { text: String }) {
  return (
    <>
      <span className={greatVibes.className}>{text[0]}</span>
      {text.slice(1)}
    </>
  );
}
