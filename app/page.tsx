import GameBoard from './components/game/GameBoard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>10x10 Grid Game</h1>
      </div>

      <div className={styles.center}>
        <GameBoard />
      </div>
    </main>
  );
}

