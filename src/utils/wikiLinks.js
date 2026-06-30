import manifest from '../data/manifest.json';

// Converts [[Article Title]] into a markdown link, resolved against the manifest.
// Falls back to a styled "missing link" if no matching article exists.
export function resolveWikiLinks(content) {
  return content.replace(/\[\[(.+?)\]\]/g, (match, title) => {
    const found = manifest.find(
      a => a.title.toLowerCase() === title.trim().toLowerCase()
    );
    if (found) {
      return `[${title}](/${found.slug})`;
    }
    return `*${title}*`; // no matching article yet — render as italic plain text
  });
}