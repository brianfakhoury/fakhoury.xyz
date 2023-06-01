export function filterOutImages(markdown) {
  // regular expression to match image components in markdown
  const imageRegex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
  // replace image components with an empty string
  const filteredMarkdown = markdown.replace(imageRegex, "").replace(/\n/g, "");

  return filteredMarkdown;
}
