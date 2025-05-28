import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './Home/Home.module.css';
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
    <div className={styles.home} style={{background:'#111',minHeight:'100vh',width:'100vw',position:'relative'}}>
      <Navbar />
      <div style={{maxWidth:1280,margin:'0 auto',paddingTop:100,paddingBottom:60}}>
        <h2 style={{color:'#fff',margin:'80px 0 18px',textAlign:'left'}}>มาใหม่และกำลังฮิต</h2>
        {loading ? (
          <div style={{color:'#fff',padding:40}}>Loading...</div>
        ) : (
          <Row title="" movies={items} />
        )}
      </div>
    </div>
  );
}
