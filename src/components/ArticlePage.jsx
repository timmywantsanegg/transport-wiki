import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import manifest from '../data/manifest.json';
import { resolveWikiLinks } from '../utils/wikiLinks';
import TableOfContents from './TableOfContents';

function ArticlePage() {
  const { category, slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const meta = manifest.find(a => a.slug === `${category}/${slug}`);

  useEffect(() => {
    setLoading(true);
    fetch(`/content/${category}/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.text();
      })
      .then(text => {
        const titleMatch = text.match(/^title:\s*(.+)$/m);
        if (titleMatch) setTitle(titleMatch[1]);
        const body = text.replace(/^---[\s\S]*?---/, '').trim();
        setContent(body);
        setLoading(false);
      })
      .catch(() => {
        setContent('Article not found.');
        setLoading(false);
      });
  }, [category, slug]);

  if (loading) {
    return (
      <div className="main">
        <p className="prose">Loading...</p>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="sep">›</span>
        <Link to={`/${category}`} style={{ textTransform: 'capitalize' }}>{category}</Link>
        <span className="sep">›</span>
        {title}
      </div>

      <h1 className="article-title">
        {title}
        {meta && meta.status && meta.status !== 'complete' && (
          <span className={`status-badge status-${meta.status}`}>{meta.status}</span>
        )}
      </h1>

      {meta && (
        <div className="article-meta">
          <span style={{ textTransform: 'capitalize' }}>{category}</span>
        </div>
      )}

      {meta && meta.tags && meta.tags.map(tag => (
        <span className="tag" key={tag}>{tag}</span>
      ))}

      <hr className="divider" />

      <TableOfContents content={content} />

      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {resolveWikiLinks(content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticlePage;