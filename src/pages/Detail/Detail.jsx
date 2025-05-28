import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchById } from '../../api/tmdb';
import Navbar from '../../components/Navbar/Navbar';

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

  if (loading) return <div style={{color:'#fff',padding:40}}>Loading...</div>;
  if (error) return <div style={{color:'#fff',padding:40}}>{error}</div>;
  if (!data) return null;

  return (
    <>
      <Navbar />
      <div style={{
        minHeight:'100dvh',
        width:'100vw',
        background:'linear-gradient(120deg,#181818 80%,#111 100%)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'0',
      }}>
        <div style={{
          color:'#fff',
          background:'rgba(20,20,20,0.92)',
          padding:'40px 32px',
          borderRadius: '16px',
          maxWidth: 900,
          width: '98%',
          margin:'32px 0',
          boxShadow:'0 4px 32px rgba(0,0,0,0.28)',
          display:'flex',
          flexWrap:'wrap',
          gap:'32px',
          alignItems:'flex-start',
        }}>
          <img
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : ''}
            alt={data.title || data.name}
            style={{maxWidth:220, width:'100%', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.32)'}}
          />
          <div style={{flex:'1 1 320px', minWidth:0}}>
            <h1 style={{fontSize:'2rem',marginBottom:8}}>{data.title || data.name}</h1>
            <div style={{fontWeight:'bold',color:'#e50914',marginBottom:14}}>
              {data.tagline}
            </div>
            <p style={{fontSize:'1.1rem',margin:'16px 0'}}>{data.overview}</p>
            <div style={{margin:'12px 0'}}>คะแนน: <b>{data.vote_average}</b> ({data.vote_count} โหวต)</div>
            <div style={{margin:'12px 0'}}>วันที่ออกฉาย: <b>{data.release_date || data.first_air_date}</b></div>
            {data.genres && data.genres.length > 0 && (
              <div style={{margin:'12px 0'}}>ประเภท: {data.genres.map(g=>g.name).join(', ')}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
