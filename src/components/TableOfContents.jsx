import { useMemo } from 'react';

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function TableOfContents({ content }) {
  const headings = useMemo(() => {
    const matches = [...content.matchAll(/^##\s+(.+)$/gm)];
    return matches.map(m => ({ text: m[1], id: slugify(m[1]) }));
  }, [content]);

  if (headings.length < 2) return null; // not worth showing for short articles

  return (
    <div className="toc">
      <div className="toc-title">Contents</div>
      {headings.map(h => (
        <a href={`#${h.id}`} className="toc-item" key={h.id}>{h.text}</a>
      ))}
    </div>
  );
}

export default TableOfContents;