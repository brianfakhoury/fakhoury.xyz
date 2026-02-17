import { getConcepts, getConcept } from "@/lib/get-concepts";
import StackedConcepts from "@/components/stacked-concepts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateStaticParams() {
  const concepts = await getConcepts();
  return concepts.map((c) => ({ slug: c.slug }));
}

interface ConceptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ConceptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = await getConcept(slug);
  if (!concept) return {};

  const description =
    concept.body.slice(0, 160).replace(/\n/g, " ").trim() + "...";

  return {
    title: concept.title,
    description,
    openGraph: {
      title: concept.title,
      description,
      url: `/concepts/${slug}`,
      siteName: "Brian Fakhoury",
      locale: "en_US",
      type: "article",
    },
    alternates: {
      canonical: `https://fakhoury.xyz/concepts/${slug}`,
    },
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { slug } = await params;
  const concept = await getConcept(slug);
  if (!concept) return notFound();

  const allConcepts = await getConcepts();
  const conceptMap = Object.fromEntries(
    allConcepts.map((c) => [c.slug, c])
  );

  return (
    <div className="flex flex-col md:overflow-hidden md:h-[calc(100dvh-8rem)]">
      <div className="shrink-0 px-4 sm:px-8 py-2">
        <Link
          href="/concepts"
          prefetch={false}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          All concepts
        </Link>
      </div>
      <Suspense>
        <StackedConcepts
          initialConcept={concept}
          allConcepts={new Map(Object.entries(conceptMap))}
        />
      </Suspense>
    </div>
  );
}
