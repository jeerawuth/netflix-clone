import { useState } from 'react';
import styles from './Search.module.css';
import { searchMovies } from '../../api/tmdb';
import Row from '../../components/Row/Row';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const res = await searchMovies(query);
      setResults(
        (res.results || []).map(item => ({
          id: item.id,
          type: item.media_type || (item.title ? 'movie' : 'tv'),
          name: item.title || item.name,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
        }))
      );
    } catch {
      setError('เกิดข้อผิดพลาดในการค้นหา');
      setResults([]);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="ค้นหาหนังหรือซีรีส์..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>ค้นหา</button>
      </form>
      {loading && <div className={styles.status}>Loading...</div>}
      {error && <div className={`${styles.status} ${styles.error}`}>{error}</div>}
      {results.length > 0 && <Row title="ผลการค้นหา" movies={results} />}
    </div>
  );
}
