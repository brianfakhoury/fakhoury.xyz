import { getPost } from "@/lib/get-posts";
import getLinks from "@/lib/get-links";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FadeInImage from "@/components/fade-in-image";
import cover from "./opengraph-image.jpg";
import Icon from "@/components/dynamic-icon";
import { ExternalLink, ChevronRight } from "lucide-react";

export default async function Home() {
  const links = getLinks();
  const post = await getPost();

  return (
    <div className="max-w-screen-sm mx-auto space-y-6">
      {post && (
        <Card className="bg-muted/50 hover:bg-muted transition-colors">
          <CardContent className="px-5 py-4">
            <Link
              href={post.slug}
              className="group flex items-center justify-between text-pretty"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-stone-500 dark:bg-stone-300 rounded-full"></span>
                <span>
                  New writing:{" "}
                  <span className="text-stone-500 dark:text-stone-300">
                    <span className="font-greatVibes">{post.title.charAt(0)}</span>
                    {post.title.slice(1)}
                  </span>
                </span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="relative p-0 overflow-hidden bg-transparent border-0 sm:mx-0 -mx-4">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/90 to-background" />
        <FadeInImage
          src={cover}
          alt="..."
          className="absolute inset-0 w-full h-full object-cover object-center"
          priority
        />
        <CardContent className="relative z-10 prose dark:prose-invert text-pretty backdrop-blur-sm bg-background/40 rounded-lg sm:mx-8 sm:my-8 px-4 py-8 sm:p-8">
          <p className="leading-relaxed">
            Dearest web surfer, you&apos;ve come knocking on my digital door.
            Welcome. I built this website for you to enjoy, if you will, and for
            myself to play with the latest web technologies. You can continue
            down to my links or see my{" "}
            <Link href="/writing" className="font-medium hover:text-foreground/90 transition-colors">
              writing archive
            </Link>
            .
          </p>
          <p className="leading-relaxed">
            These days, my time is spent contributing to the growth of Mach
            Industries, a defense tech company. However, I deeply appreciate
            time taken to think, create, and invite serendipity. It&apos;s why I
            built this site by hand and painstakingly optimized it. So, spend as
            long as you wish here, and if I may, I suggest you view my thoughts
            through a few lenses:
          </p>
          <ol className="space-y-2 leading-relaxed">
            <li>
              My primary motivation is to work on things that are uncomfortably
              hard for my skillset.
            </li>
            <li>I view the world through rationality.</li>
            <li>
              Technology is engraved in who I am, I appreciate beautiful
              technology for its existence.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Accordion 
        type="single" 
        collapsible 
        defaultValue="list" 
        className="space-y-2"
      >
        {links.map((category) => (
          <AccordionItem 
            key={category.emoji} 
            value={category.emoji}
            className="border-0 bg-card hover:bg-muted/50 data-[state=open]:bg-muted/50 rounded-lg transition-colors"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-3 [&[data-state=open]]:pb-2">
              <div className="flex items-center gap-2">
                <span className="first-letter:font-greatVibes text-lg">{category.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-1.5">
                {category.items.map((item, j) => (
                  <Link
                    key={j}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="text-pretty">{item.content}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
