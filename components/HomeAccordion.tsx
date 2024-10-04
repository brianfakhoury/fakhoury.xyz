"use client";

import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import Icon from "@/components/Icon";

export default function HomeAccordion({links}) {

  return (
    <Accordion defaultExpandedKeys={["list"]}>
    {links.map((category, i) => (
      <AccordionItem
        key={category.emoji}
        aria-label={category.title}
        indicator={
          <Icon name={category.emoji} />
        }
        title={
          <h3 className="first-letter:font-greatVibes">{category.title}</h3>
        }
      >
        <ul className="list-disc pl-5">
          {category.items.map((item, j) => (
            <li key={j}>
              <Link href={item.link} isExternal className="inline">
                {item.content}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionItem>
    ))}
  </Accordion>
  );
}