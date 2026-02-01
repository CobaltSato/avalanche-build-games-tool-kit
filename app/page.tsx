'use client';

import { useState } from 'react';

export default function Home() {
  const gridSize = 10;
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);

  const gridItems = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      gridItems.push(
        <div key={`${x}-${y}`} className="grid-item" data-x={x} data-y={y} />
      );
    }
  }

  return (
    <main>
      <h1>Avalanche Game Toolkit</h1>
      <p>Move the player using keyboard arrows (once wallet is connected).</p>
      <div className="grid-container">
        {gridItems}
        <div
          className="player"
          style={{
            gridColumnStart: playerX + 1,
            gridRowStart: playerY + 1,
            transform: `translate(
              calc(var(--grid-gap) * ${playerX}),
              calc(var(--grid-gap) * ${playerY})
            )`,
          }}
        >
          P
        </div>
      </div>
    </main>
  );
}


