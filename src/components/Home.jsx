import { Link } from 'react-router-dom';
import manifest from '../data/manifest.json';

const categoryMeta = {
  rail: { icon: '🚂', label: 'Rail' },
  aviation: { icon: '✈️', label: 'Aviation' },
  maritime: { icon: '🚢', label: 'Maritime' },
  road: { icon: '🚗', label: 'Road' },
  space: { icon: '🚀', label: 'Space' },
};

function Home() {
  const categories = [...new Set(manifest.map(a => a.category))];

  return (
    <div className="main">
      <h1 className="page-title">Welcome to Terminus</h1>
      <p className="page-sub">
        The transport encyclopaedia. Deep coverage of rail, aviation, maritime, road, and space.
      </p>

      <div className="cat-grid">
        {categories.map(cat => {
          const count = manifest.filter(a => a.category === cat).length;
          const meta = categoryMeta[cat] || { icon: '📄', label: cat };
          return (
            <Link to={`/${cat}`} className="cat-card" key={cat}>
              <div style={{ fontSize: '22px' }}>{meta.icon}</div>
              <div className="cat-name">{meta.label}</div>
              <div className="cat-count">{count} article{count !== 1 ? 's' : ''}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;