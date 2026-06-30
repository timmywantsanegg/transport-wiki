import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import manifest from '../data/manifest.json';

const fuse = new Fuse(manifest, {
  keys: ['title', 'tags', 'excerpt'],
  threshold: 0.35,
});

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const found = fuse.search(query).slice(0, 6).map(r => r.item);
    setResults(found);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function goTo(slug) {
    navigate(`/${slug}`);
    setQuery('');
    setResults([]);
    setOpen(false);
  }

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        className="search-input"
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && results.length > 0 && (
        <div className="search-dropdown">
          {results.map(r => (
            <div
              className="search-result"
              key={r.slug}
              onClick={() => goTo(r.slug)}
            >
              <div className="search-result-title">{r.title}</div>
              <div className="search-result-meta">{r.category} · {r.excerpt}</div>
            </div>
          ))}
        </div>
      )}
      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="search-dropdown">
          <div className="search-empty">No results for "{query}"</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;