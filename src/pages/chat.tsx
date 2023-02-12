import { InlineWidget } from "react-calendly";

export default function Chat({}) {
  return (
    <InlineWidget
      url="https://calendly.com/brianfakhoury/chat"
      styles={{ height: "800px", margin: "0", padding: "0" }}
      pageSettings={{
        hideGdprBanner: true,
        hideEventTypeDetails: true,
      }}
    />
  );
}
