import { WalkGameClient } from '@walk-game';
import './walk.css';

export default function Home() {
  return (
    <main className="walk-page">
      <h1>Neon Grid Runner</h1>
      <WalkGameClient />
    </main>
  );
}
