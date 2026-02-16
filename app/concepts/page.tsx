import { getConcepts, getConceptGraph } from "@/lib/get-concepts";
import ConceptIndex from "@/components/concept-index";

export const metadata = {
  title: "Concepts",
  description:
    "A Zettelkasten of interconnected concepts — explore ideas by clicking through the links.",
  openGraph: {
    url: "/concepts",
    siteName: "Brian Fakhoury",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://fakhoury.xyz/concepts",
  },
};

export default async function ConceptsPage() {
  const concepts = await getConcepts();
  const graph = await getConceptGraph();

  const conceptSummaries = concepts.map((c) => ({
    title: c.title,
    slug: c.slug,
    linkCount: c.forwardLinks.length + c.backlinks.length,
  }));

  return (
    <div className="max-w-(--breakpoint-lg) mx-auto py-8">
      <header className="mb-10 space-y-4 max-w-(--breakpoint-md)">
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Concepts</h1>
          <span className="text-sm text-muted-foreground">
            {concepts.length} notes &middot; {graph.links.length} connections
          </span>
        </div>
        <p className="text-lg text-muted-foreground">
          Interconnected notes on technology, philosophy, science, and life.
          Click any concept to explore — linked notes stack to the right.
        </p>
      </header>
      <ConceptIndex concepts={conceptSummaries} graph={graph} />
    </div>
  );
}
