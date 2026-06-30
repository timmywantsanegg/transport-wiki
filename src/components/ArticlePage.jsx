import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import manifest from '../data/manifest.json';
import { resolveWikiLinks } from '../utils/wikiLinks';
import { extractHeadings } from '../utils/toc';

const statusLabels = {
  complete: { label: 'Complete', color: '#5dcaa5' },
  stub: { label: 'Stub', color: '#f0a040' },
  draft: { label: 'Draft', color: '#7a9cc8' },
};

function ArticlePage() {
  const { category, slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const meta = manifest.find(a => a.slug === `${category}/${slug}`);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`/content/${category}/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.text();
      })
      .then(text => {
        const titleMatch = text.match(/^title:\s*(.+)$/m);
        if (titleMatch) setTitle(titleMatch[1]);

        const body = text.replace(/^---[\s\S]*?---/, '').trim();
        const linked = resolveWikiLinks(body);

        setHeadings(extractHeadings(linked));
        setContent(linked);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [category, slug]);

  if (loading) return <div className="main"><p className="prose">Loading...</p></div>;

  if (notFound) {
    return (
      <div className