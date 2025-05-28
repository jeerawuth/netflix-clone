import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Row from '../../components/Row/Row';
import styles from './Home.module.css';
import { fetchTrending, fetchTopRated } from '../../api/tmdb';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const trendingRes = await fetchTrending();
        const topRatedRes = await fetchTopRated();
        setTrending(
          (trendingRes.results || []).map((item) => ({
            id: item.id,
            type: item.media_type || (item.title ? 'movie' : 'tv'),
            name: item.title || item.name,
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
          }))
        );
        setTopRated(
          (topRatedRes.results || []).map((item) => ({
            id: item.id,
            type: 'movie',
            name: item.title || item.name,
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
          }))
        );
      } catch (e) {
        setTrending([]);
        setTopRated([]);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className={styles.home}>
      <Navbar />
      <Banner />
      {loading ? (
        <div style={{ color: '#fff', padding: 40 }}>Loading...</div>
      ) : (
        <>
          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
        </>
      )}
    </div>
  );
}
