import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './Tv.module.css';
import Row from '../components/Row/Row';
import { fetchMovies } from '../api/tmdb';

export default function Tv() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchMovies('/tv/popular');
        setShows((res.results || []).map(item => ({
          id: item.id,
          type: 'tv',
          name: item.name,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
        })));
      } catch {
        setShows([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className={styles.tvContainer}>
      <Navbar />
      <div className={styles.tvContent}>
        <h2 className={styles.heading}>รายการทีวียอดนิยม</h2>
        {loading ? (
          <div className={styles.status}>Loading...</div>
        ) : (
          <Row title="" movies={shows} />
        )}
      </div>
    </div>
  );
}
