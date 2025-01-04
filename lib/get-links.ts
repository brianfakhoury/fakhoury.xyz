import type { Links } from "@/lib/types";
import LINKS from "@/content/links.json";

/**
 * Retrieves the configured links from the content directory
 * @returns {Links} Array of link groups with their titles, emojis, and items
 */
const getLinks = () => LINKS as Links;

export default getLinks;
