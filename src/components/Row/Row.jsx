import styles from './Row.module.css';
import { Link } from 'react-router-dom';

// movie ต้องมี id, type, name, poster
export default function Row({ title, movies }) {
  return (
    <section className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rowPosters}>
        {movies.map((movie, idx) => (
          movie.id && movie.type && movie.poster ? (
            <Link
              key={movie.id + '-' + movie.type}
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
                  <span className={styles.playButton}>
                    ▶
                  </span>
                </div>
              </div>
            </Link>
          ) : null
        ))}
      </div>
    </section>
  );
}
