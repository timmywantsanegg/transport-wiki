import { Link } from 'react-router-dom';
import manifest from '../data/manifest.json';

function Home() {
  const categories = [...new Set(manifest.map(a => a.category))];

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2rem' }}>
      <h1>Transport Encyclopaedia</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat}>
            <Link to={`/${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;