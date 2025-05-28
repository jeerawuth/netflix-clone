import { useState } from 'react';
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
    <div style={{background:'#111',minHeight:'100vh',paddingTop:70}}>
      <form onSubmit={handleSearch} style={{display:'flex',justifyContent:'center',padding:24}}>
        <input
          type="text"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="ค้นหาหนังหรือซีรีส์..."
          style={{width:320,padding:10,borderRadius:4,border:'none',marginRight:12}}
        />
        <button type="submit" style={{padding:'10px 28px',background:'#e50914',color:'#fff',border:'none',borderRadius:4}}>ค้นหา</button>
      </form>
      {loading && <div style={{color:'#fff',padding:40}}>Loading...</div>}
      {error && <div style={{color:'#e50914',padding:40}}>{error}</div>}
      {results.length > 0 && <Row title="ผลการค้นหา" movies={results} />}
    </div>
  );
}
