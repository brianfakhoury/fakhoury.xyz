import type { Links } from "@/lib/types";
import LINKS from "@/content/links.json";

const getLinks = () => LINKS as Links;

export default getLinks;
