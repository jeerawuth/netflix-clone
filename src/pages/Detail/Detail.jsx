import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchById } from '../../api/tmdb';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Detail.module.css';

export default function Detail() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchById(type, id);
        setData(res);
      } catch (e) {
        setError('ไม่พบข้อมูล');
      }
      setLoading(false);
    }
    load();
  }, [type, id]);

  if (loading) return <div className={styles.status}>Loading...</div>;
  if (error) return <div className={styles.status}>{error}</div>;
  if (!data) return null;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : ''}
            alt={data.title || data.name}
            className={styles.poster}
          />
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title || data.name}</h1>
            <div className={styles.tagline}>{data.tagline}</div>
            <p className={styles.overview}>{data.overview}</p>
            <div className={styles.meta}>
              <span>คะแนน: <b>{data.vote_average}</b> ({data.vote_count} โหวต)</span>
              <span>วันที่ออกฉาย: <b>{data.release_date || data.first_air_date}</b></span>
            </div>
            {data.genres && data.genres.length > 0 && (
              <div className={styles.meta}>ประเภท: {data.genres.map(g=>g.name).join(', ')}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
