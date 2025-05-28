import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
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
    <div style={{background:'#111',minHeight:'100vh',paddingTop:70}}>
      <Navbar />
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <h2 style={{color:'#fff',margin:'36px 0 18px'}}>ภาพยนตร์ยอดนิยม</h2>
        {loading ? (
          <div style={{color:'#fff',padding:40}}>Loading...</div>
        ) : (
          <Row title="" movies={movies} />
        )}
      </div>
    </div>
  );
}
