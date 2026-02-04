'use client';

import React from 'react';
import styles from './Player.module.css';

interface PlayerProps {
  x: number;
  y: number;
}

const Player: React.FC<PlayerProps> = ({ x, y }) => {
  const style = {
    '--x': x,
    '--y': y,
  } as React.CSSProperties;

  return <div className={styles.player} style={style} />;
};

export default Player;
