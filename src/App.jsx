import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import Home from './components/Home';

const categories = [
  { slug: 'rail', label: 'Rail' },
  { slug: 'aviation', label: 'Aviation' },
  { slug: 'maritime', label: 'Maritime' },
  { slug: 'road', label: 'Road' },
  { slug: 'space', label: 'Space' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="header">
        <Link to="/" className="wordmark">
          Terminus<span>Transport Encyclopaedia</span>
        </Link>
      </div>
      <div className="layout">
        <div className="sidebar">
          <div className="sidebar-label">Categories</div>
          <Link to="/" className="sidebar-item">Home</Link>
          {categories.map(cat => (
            <Link to={`/${cat.slug}`} className="sidebar-item" key={cat.slug}>
              {cat.label}
            </Link>
          ))}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:slug" element={<ArticlePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;