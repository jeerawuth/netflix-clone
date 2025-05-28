import styles from './Banner.module.css';

import { useState } from 'react';

export default function Banner() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const bannerUrl = 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg';

  return (
    <header className={styles.banner}>
      <img
        src={bannerUrl}
        alt="Banner"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 0,
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        onLoad={() => setImgLoaded(true)}
        draggable={false}
      />
      <div className={styles.content} style={{position:'relative',zIndex:2}}>
        <h1 className={styles.title}>Stranger Things</h1>
        <p className={styles.description}>
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
        </p>
        <div className={styles.buttons}>
          <button className={styles.play}>Play</button>
          <button className={styles.more}>More Info</button>
        </div>
      </div>
      <div className={styles.fadeBottom}></div>
    </header>
  );
}
