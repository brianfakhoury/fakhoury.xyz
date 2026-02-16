"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type MouseEvent,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { X, Link2 } from "lucide-react";
import type { Concept } from "@/lib/types";
import { titleToSlug } from "@/lib/utils";

const PANE_WIDTH = 520;
const STICKY_OFFSET = 40;
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export default function StackedConcepts({
  initialConcept,
  allConcepts,
}: {
  initialConcept: Concept;
  allConcepts: Map<string, Concept>;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileConcept concept={initialConcept} allConcepts={allConcepts} />
    );
  }

  return (
    <DesktopStackedConcepts
      initialConcept={initialConcept}
      allConcepts={allConcepts}
    />
  );
}

/* ─── Mobile: single full-width note, wiki-links navigate normally ─── */

function MobileConcept({
  concept,
  allConcepts,
}: {
  concept: Concept;
  allConcepts: Map<string, Concept>;
}) {
  const backlinkConcepts = concept.backlinks
    .map((slug) => allConcepts.get(slug))
    .filter(Boolean) as Concept[];

  return (
    <div className="px-4 pb-8">
      <h1 className="text-2xl font-semibold leading-tight text-pretty mb-4">
        {concept.title}
      </h1>

      <div className="prose prose-stone dark:prose-invert prose-sm text-pretty max-w-none">
        <MobileConceptMarkdown body={concept.body} allConcepts={allConcepts} />
      </div>

      {backlinkConcepts.length > 0 && (
        <div className="mt-8 pt-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Link2 className="h-3 w-3" />
            Referenced by
          </h3>
          <div className="space-y-1.5">
            {backlinkConcepts.map((bl) => (
              <Link
                key={bl.slug}
                href={`/concepts/${bl.slug}`}
                className="block text-sm underline decoration-dotted underline-offset-3 hover:decoration-solid text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {bl.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Replace [[wiki-links]] with markdown links to /concepts/[slug] */
function resolveWikiLinks(body: string, allConcepts: Map<string, Concept>) {
  return body.replace(/\[\[([^\]]+)\]\]/g, (_, title: string) => {
    const slug = titleToSlug(title);
    if (allConcepts.has(slug)) {
      return `[${title}](/concepts/${slug})`;
    }
    return title;
  });
}

function MobileConceptMarkdown({
  body,
  allConcepts,
}: {
  body: string;
  allConcepts: Map<string, Concept>;
}) {
  const processed = resolveWikiLinks(body, allConcepts);

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("/concepts/")) {
            return (
              <Link
                href={href}
                className="text-foreground underline decoration-dotted underline-offset-3 hover:decoration-solid"
              >
                {children}
              </Link>
            );
          }
          return (
            <a href={href || "#"} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}

/* ─── Desktop: stacked panes ─── */

function DesktopStackedConcepts({
  initialConcept,
  allConcepts,
}: {
  initialConcept: Concept;
  allConcepts: Map<string, Concept>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [stack, setStack] = useState<Concept[]>(() => {
    const panes: Concept[] = [initialConcept];

    const stackParam = searchParams.get("stack");
    if (stackParam) {
      const slugs = stackParam.split(",").filter(Boolean);
      for (const slug of slugs) {
        const concept = allConcepts.get(slug);
        if (concept) panes.push(concept);
      }
    }

    return panes;
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const updateUrl = useCallback(
    (newStack: Concept[]) => {
      if (newStack.length <= 1) {
        router.replace(pathname, { scroll: false });
      } else {
        const stackSlugs = newStack
          .slice(1)
          .map((c) => c.slug)
          .join(",");
        router.replace(`${pathname}?stack=${stackSlugs}`, { scroll: false });
      }
    },
    [pathname, router]
  );

  const scrollToPane = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const targetLeft = Math.max(0, index * PANE_WIDTH - STICKY_OFFSET);
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, []);

  const pushConcept = useCallback(
    (slug: string, fromIndex: number) => {
      const concept = allConcepts.get(slug);
      if (!concept) return;

      const existingIndex = stack.findIndex((c) => c.slug === slug);
      if (existingIndex !== -1) {
        scrollToPane(existingIndex);
        return;
      }

      const newStack = [...stack.slice(0, fromIndex + 1), concept];
      setStack(newStack);
      updateUrl(newStack);

      requestAnimationFrame(() => {
        scrollToPane(newStack.length - 1);
      });
    },
    [stack, allConcepts, updateUrl, scrollToPane]
  );

  const closePane = useCallback(
    (index: number) => {
      if (index === 0) return;
      const newStack = stack.slice(0, index);
      setStack(newStack);
      updateUrl(newStack);
    },
    [stack, updateUrl]
  );

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 overflow-x-auto min-h-0 scrollbar-hide"
    >
      {stack.map((concept, i) => (
        <DesktopConceptPane
          key={concept.slug}
          concept={concept}
          index={i}
          allConcepts={allConcepts}
          onNavigate={(slug) => pushConcept(slug, i)}
          onClose={() => closePane(i)}
        />
      ))}
      <div className="shrink-0" style={{ width: `calc(100vw - ${PANE_WIDTH}px)` }} />
    </div>
  );
}

function DesktopConceptPane({
  concept,
  index,
  allConcepts,
  onNavigate,
  onClose,
}: {
  concept: Concept;
  index: number;
  allConcepts: Map<string, Concept>;
  onNavigate: (slug: string) => void;
  onClose: () => void;
}) {
  const handleWikiLink = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      onNavigate(slug);
    },
    [onNavigate]
  );

  const backlinkConcepts = concept.backlinks
    .map((slug) => allConcepts.get(slug))
    .filter(Boolean) as Concept[];

  return (
    <div
      className={`shrink-0 bg-background border-r border-border ${
        index > 0 ? "border-l-2 border-l-stone-300 dark:border-l-stone-600" : ""
      }`}
      style={{
        width: PANE_WIDTH,
        position: "sticky",
        left: index * STICKY_OFFSET,
        zIndex: index,
        height: "100%",
      }}
    >
      <div className="h-full overflow-y-auto">
        <div className="px-6 pt-5 pb-10">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold leading-tight text-pretty">
              {index > 0 ? (
                <Link
                  href={`/concepts/${concept.slug}`}
                  className="hover:underline decoration-dotted underline-offset-3"
                  title="Open as main concept"
                >
                  {concept.title}
                </Link>
              ) : (
                concept.title
              )}
            </h2>
            {index > 0 && (
              <button
                onClick={onClose}
                className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close pane"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="prose prose-stone dark:prose-invert prose-sm text-pretty max-w-none">
            <DesktopConceptMarkdown
              body={concept.body}
              allConcepts={allConcepts}
              onLinkClick={handleWikiLink}
            />
          </div>

          {backlinkConcepts.length > 0 && (
            <div className="mt-8 pt-4 border-t border-border">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Link2 className="h-3 w-3" />
                Referenced by
              </h3>
              <div className="space-y-1.5">
                {backlinkConcepts.map((bl) => (
                  <a
                    key={bl.slug}
                    href={`/concepts/${bl.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(bl.slug);
                    }}
                    className="block text-sm underline decoration-dotted underline-offset-3 hover:decoration-solid text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {bl.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopConceptMarkdown({
  body,
  allConcepts,
  onLinkClick,
}: {
  body: string;
  allConcepts: Map<string, Concept>;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) {
  const processed = body.replace(/\[\[([^\]]+)\]\]/g, (_, title: string) => {
    const slug = titleToSlug(title);
    if (allConcepts.has(slug)) {
      return `[${title}](/concepts/${slug} "wikilink::${slug}")`;
    }
    return title;
  });

  return (
    <ReactMarkdown
      components={{
        a: ({ href, title, children }) => {
          if (title?.startsWith("wikilink::")) {
            const slug = title.replace("wikilink::", "");
            return (
              <a
                href={href || "#"}
                onClick={(e) => onLinkClick(e, slug)}
                className="text-foreground underline decoration-dotted underline-offset-3 hover:decoration-solid cursor-pointer"
              >
                {children}
              </a>
            );
          }
          return (
            <a href={href || "#"} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}
