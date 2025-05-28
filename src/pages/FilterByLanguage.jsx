import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Row from '../components/Row/Row';
import styles from './Home/Home.module.css';
import { fetchMovies, fetchTrending } from '../api/tmdb';
import FilterLanguageForm from '../components/FilterLanguageForm';

export default function FilterByLanguage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'original', language: 'en' });
  const [sort, setSort] = useState('recommend');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // ดึงทั้งภาพยนตร์และทีวี
        const [resMovies, resTv] = await Promise.all([
          fetchMovies('/movie/popular'),
          fetchTrending() // ใช้ trending สำหรับ TV (หรือจะเปลี่ยนเป็น fetchTv ก็ได้ถ้ามี)
        ]);
        const movies = (resMovies.results || []).map(item => ({
          id: item.id,
          type: 'movie',
          name: item.title,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
          original_language: item.original_language,
          spoken_languages: item.spoken_languages || [],
          subtitle_languages: item.spoken_languages || [],
        }));
        const tvs = (resTv.results || []).filter(item => item.media_type === 'tv' || item.name).map(item => ({
          id: item.id,
          type: 'tv',
          name: item.name,
          poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
          original_language: item.original_language,
          spoken_languages: item.spoken_languages || [],
          subtitle_languages: item.spoken_languages || [],
        }));
        setItems([...movies, ...tvs]);
      } catch {
        setItems([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  // ฟิลเตอร์รายการตามประเภทภาษาและรหัสภาษา
  const filteredItems = items.filter(item => {
    if (!filter.language) return true;
    if (filter.type === 'original') {
      return item.original_language === filter.language;
    } else if (filter.type === 'audio') {
      return item.spoken_languages && item.spoken_languages.some(l => l.iso_639_1 === filter.language);
    } else if (filter.type === 'subtitle') {
      // ใช้ spoken_languages mock แทน subtitle_languages
      return item.spoken_languages && item.spoken_languages.some(l => l.iso_639_1 === filter.language);
    }
    return true;
  });

  return (
    <div className={styles.home} style={{background:'#111', minHeight:'100vh', width:'100vw', position:'relative'}}>
      <Navbar onFilterChange={setFilter} />
      <div style={{maxWidth:1280, margin:'0 auto', paddingTop:100, paddingBottom:60}}>
        <FilterLanguageForm filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        {loading ? (
          <div style={{color:'#fff', padding:40}}>Loading...</div>
        ) : (
          <Row
            title=""
            movies={(() => {
              let arr = filteredItems;
              arr = [...arr];
              if (sort === 'az') {
                arr.sort((a, b) => (a && a.name ? a.name : '').localeCompare(b && b.name ? b.name : ''));
              } else if (sort === 'za') {
                arr.sort((a, b) => (b && b.name ? b.name : '').localeCompare(a && a.name ? a.name : ''));
              } else if (sort === 'year') {
                arr.sort((a, b) => {
                  // ปีใหม่ -> เก่า (desc)
                  const ayear = a.release_date || a.first_air_date || '';
                  const byear = b.release_date || b.first_air_date || '';
                  return (byear || '').localeCompare(ayear || '');
                });
              }
              // recommend = ไม่เรียงพิเศษ
              return arr;
            })()}
          />
        )}
      </div>
    </div>
  );
}
