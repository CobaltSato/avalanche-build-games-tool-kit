'use client';

import React from 'react';
import styles from './GameBoard.module.css';

const GameBoard: React.FC = () => {
  const cells = Array.from({ length: 100 });

  return (
    <div className={styles.gameBoard}>
      {cells.map((_, i) => (
        <div key={i} className={styles.cell} />
      ))}
    </div>
  );
};

export default GameBoard;
