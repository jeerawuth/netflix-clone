import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './Trending.module.css';
import Row from '../components/Row/Row';
import { fetchTrending } from '../api/tmdb';

export default function Trending() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchTrending();
        setItems((res.results || []).map(item => ({
          id: item.id,
          type: item.media_type || (item.title ? 'movie' : 'tv'),
          name: item.title || item.name,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
        })));
      } catch {
        setItems([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className={styles.trendingContainer}>
      <Navbar />
      <div className={styles.trendingContent}>
        <h2 className={styles.heading}>มาใหม่และกำลังฮิต</h2>
        {loading ? (
          <div className={styles.status}>Loading...</div>
        ) : (
          <Row title="" movies={items} />
        )}
      </div>
    </div>
  );
}
