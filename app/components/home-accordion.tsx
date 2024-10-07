"use client";

// This components uses client because nextui Accordion is not
// exporting a server ready component for whatever reason

import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import Icon from "@/app/components/dynamic-icon";
import { Links } from "@/lib/types";

export default function HomeAccordion({ links }: { links: Links }) {
  return (
    <Accordion defaultExpandedKeys={["list"]}>
      {links.map((category) => (
        <AccordionItem
          key={category.emoji}
          aria-label={category.title}
          indicator={<Icon name={category.emoji} />}
          title={
            <h3 className="first-letter:font-greatVibes">{category.title}</h3>
          }
        >
          <ul className="list-disc pl-5">
            {category.items.map((item, j) => (
              <li key={j}>
                <Link href={item.link} isExternal>
                  <p className="text-pretty">{item.content}</p>
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
