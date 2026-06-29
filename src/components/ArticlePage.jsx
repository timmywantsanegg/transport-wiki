import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ArticlePage() {
  const { category, slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/content/${category}/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.text();
      })
      .then(text => {
        // Strip frontmatter and grab title
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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2rem' }}>
      <h1>{title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default ArticlePage;