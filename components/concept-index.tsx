"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search } from "lucide-react";
import type { ConceptGraph } from "@/lib/types";

const ConceptGraphView = dynamic(
  () => import("@/components/concept-graph"),
  { ssr: false }
);

interface ConceptSummary {
  title: string;
  slug: string;
  linkCount: number;
}

export default function ConceptIndex({
  concepts,
  graph,
}: {
  concepts: ConceptSummary[];
  graph: ConceptGraph;
}) {
  const [query, setQuery] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return concepts;
    const q = query.toLowerCase();
    return concepts.filter((c) => c.title.toLowerCase().includes(q));
  }, [query, concepts]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={() => setShowGraph((v) => !v)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md bg-muted/50 hover:bg-muted"
        >
          {showGraph ? "List view" : "Graph view"}
        </button>
      </div>

      {showGraph ? (
        <ConceptGraphView graph={graph} />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((concept) => (
            <Link
              key={concept.slug}
              href={`/concepts/${concept.slug}`}
              prefetch={false}
              className="block break-inside-avoid mb-2 px-3 py-2 rounded-md hover:bg-muted/50 transition-colors group"
            >
              <span className="text-foreground/90 group-hover:text-foreground text-sm">
                {concept.title}
              </span>
              {concept.linkCount > 0 && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {concept.linkCount}
                </span>
              )}
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm col-span-full">
              No concepts match &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
