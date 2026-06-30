import { Link, useParams } from 'react-router-dom';
import manifest from '../data/manifest.json';

function CategoryPage() {
  const { category } = useParams();
  const articles = manifest.filter(a => a.category === category);

  return (
    <div className="main">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="sep">›</span>
        {category}
      </div>

      <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{category}</h1>
      <p className="page-sub">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>

      <hr className="divider" />

      <div className="prose">
        {articles.map(a => (
          <p key={a.slug}>
            <Link to={`/${a.slug}`} style={{ color: '#f0e8d8', fontFamily: 'Playfair Display, serif', fontSize: '18px', textDecoration: 'none' }}>
              {a.title}
            </Link>
            <br />
            <span style={{ color: '#8aaccc', fontSize: '14px' }}>{a.excerpt}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;