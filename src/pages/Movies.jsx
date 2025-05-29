import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './Movies.module.css';
import Row from '../components/Row/Row';
import { fetchMovies } from '../api/tmdb';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchMovies('/movie/popular');
        setMovies((res.results || []).map(item => ({
          id: item.id,
          type: 'movie',
          name: item.title,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
        })));
      } catch {
        setMovies([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className={styles.moviesContainer}>
      <Navbar />
      <div className={styles.moviesContent}>
        <h2 className={styles.heading}>ภาพยนตร์ยอดนิยม</h2>
        {loading ? (
          <div className={styles.status}>Loading...</div>
        ) : (
          <Row title="" movies={movies} />
        )}
      </div>
    </div>
  );
}
