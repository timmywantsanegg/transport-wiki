import manifest from '../data/manifest.json';

// Builds a lookup: "flying scotsman" -> "rail/flying-scotsman"
const titleToSlug = {};
manifest.forEach(article => {
  titleToSlug[article.title.toLowerCase()] = article.slug;
});

export function resolveWikiLinks(markdown) {
  return markdown.replace(/\[\[(.+?)\]\]/g, (match, title) => {
    const slug = titleToSlug[title.toLowerCase()];
    if (slug) {
      return `[${title}](/${slug})`;
    }
    // No match found — render as plain text with a marker class via span
    return `*${title}*`;
  });
}