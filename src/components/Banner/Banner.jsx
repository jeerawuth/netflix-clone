import styles from './Banner.module.css';

export default function Banner() {
  return (
    <header className={styles.banner}>
      <div className={styles.content}>
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
