import fs from "fs/promises";
import path from "path";
import type { Concept, ConceptGraph } from "@/lib/types";
import { titleToSlug } from "@/lib/utils";

const CONCEPTS_DIRECTORY = path.join(process.cwd(), "content/concepts");

/** Extract all [[wiki-links]] from raw markdown, returning the raw link text */
function extractWikiLinks(content: string): string[] {
  const matches = content.match(/\[\[([^\]]+)\]\]/g);
  if (!matches) return [];
  return matches.map((m) => m.slice(2, -2));
}

/** Parse a concept markdown file into structured data (without backlinks) */
function parseConcept(
  filename: string,
  content: string
): Omit<Concept, "backlinks"> {
  const title = filename.replace(/\.md$/, "");
  const slug = titleToSlug(title);

  const body = content.replace(/^#\s+.+\n*/m, "").trim();

  const rawLinks = extractWikiLinks(content);
  const forwardLinks = [...new Set(rawLinks.map(titleToSlug))];

  return { title, slug, body, forwardLinks };
}

/** Load all concepts, build backlink map, and return the full dataset */
export async function getConcepts(): Promise<Concept[]> {
  "use cache";

  const files = await fs.readdir(CONCEPTS_DIRECTORY);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const partials = await Promise.all(
    mdFiles.map(async (file) => {
      const content = await fs.readFile(
        path.join(CONCEPTS_DIRECTORY, file),
        "utf8"
      );
      return parseConcept(file, content);
    })
  );

  const slugSet = new Set(partials.map((p) => p.slug));
  const backlinkMap = new Map<string, string[]>();

  for (const concept of partials) {
    for (const target of concept.forwardLinks) {
      if (!slugSet.has(target)) continue;
      const existing = backlinkMap.get(target) || [];
      existing.push(concept.slug);
      backlinkMap.set(target, existing);
    }
  }

  return partials
    .map((p) => ({
      ...p,
      forwardLinks: p.forwardLinks.filter((l) => slugSet.has(l)),
      backlinks: [...new Set(backlinkMap.get(p.slug) || [])],
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getConcept(slug: string): Promise<Concept | undefined> {
  const concepts = await getConcepts();
  return concepts.find((c) => c.slug === slug);
}

/** Build a graph of all concepts and their connections */
export async function getConceptGraph(): Promise<ConceptGraph> {
  const concepts = await getConcepts();
  const slugSet = new Set(concepts.map((c) => c.slug));

  const nodes = concepts.map((c) => ({ id: c.slug, title: c.title }));

  const linkSet = new Set<string>();
  const links: ConceptGraph["links"] = [];

  for (const concept of concepts) {
    for (const target of concept.forwardLinks) {
      if (!slugSet.has(target)) continue;
      const key = [concept.slug, target].sort().join("::");
      if (linkSet.has(key)) continue;
      linkSet.add(key);
      links.push({ source: concept.slug, target });
    }
  }

  return { nodes, links };
}
