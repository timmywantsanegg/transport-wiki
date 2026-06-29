import { Link, useParams } from 'react-router-dom';
import manifest from '../data/manifest.json';

function CategoryPage() {
  const { category } = useParams();
  const articles = manifest.filter(a => a.category === category);

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2rem' }}>
      <h1>{category}</h1>
      <ul>
        {articles.map(a => (
          <li key={a.slug}>
            <Link to={`/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;