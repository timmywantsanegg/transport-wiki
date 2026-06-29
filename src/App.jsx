import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;