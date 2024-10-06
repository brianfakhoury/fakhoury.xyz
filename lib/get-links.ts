import type { Links } from "@/lib/types";
import LINKS from "@/content/links.json";

const getLinks = (): Links => LINKS as Links;

export default getLinks;
