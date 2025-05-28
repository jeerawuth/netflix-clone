import styles from './Row.module.css';
import { Link } from 'react-router-dom';

// movie ต้องมี id, type, name, poster
import { useEffect, useState } from 'react';

export default function Row({ title, movies, onMyListChange }) {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('mylist');
    setMyList(saved ? JSON.parse(saved) : []);
  }, [movies]);

  const isInMyList = (movie) =>
    myList.some((item) => item.id === movie.id && item.type === movie.type);

  const handleToggle = (movie) => {
    let updated;
    if (isInMyList(movie)) {
      updated = myList.filter((item) => !(item.id === movie.id && item.type === movie.type));
    } else {
      updated = [...myList, movie];
    }
    setMyList(updated);
    localStorage.setItem('mylist', JSON.stringify(updated));
    if (typeof onMyListChange === 'function') {
      onMyListChange(updated);
    }
  };


  return (
    <section className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rowPosters}>
        {movies.map((movie, idx) => (
          movie.id && movie.type && movie.poster ? (
            <div key={movie.id + '-' + movie.type} style={{position:'relative',display:'inline-block'}}>
              <Link
                to={`/detail/${movie.type}/${movie.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className={styles.posterWrap}>
                  <img
                    className={styles.poster}
                    src={movie.poster}
                    alt={movie.name}
                  />
                  <div className={styles.playOverlay}>
                    <span className={styles.playButton}>▶</span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => handleToggle(movie)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  color: isInMyList(movie) ? '#e50914' : '#fff',
                  fontSize: 20,
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'color 0.2s',
                }}
                aria-label={isInMyList(movie) ? 'ลบออกจากรายการของฉัน' : 'เพิ่มในรายการของฉัน'}
                title={isInMyList(movie) ? 'ลบออกจากรายการของฉัน' : 'เพิ่มในรายการของฉัน'}
              >
                {isInMyList(movie) ? '♥' : '♡'}
              </button>
            </div>
          ) : null
        ))}
      </div>
    </section>
  );
}
