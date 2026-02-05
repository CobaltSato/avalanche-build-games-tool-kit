'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import Player from './Player';
import { useWallet } from '@avalanche-wallet';

const CELL_LIMIT = 9; // 0-9 for a 10x10 grid

const Game: React.FC = () => {
  const { isConnected, account, connectWallet, txStatus, txMessage } = useWallet();
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 }); // Initial position

  // Handle keyboard input for player movement
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setPlayerPosition((prevPos) => {
      let newX = prevPos.x;
      let newY = prevPos.y;

      switch (event.key) {
        case 'ArrowUp':
          newY = Math.max(0, prevPos.y - 1);
          break;
        case 'ArrowDown':
          newY = Math.min(CELL_LIMIT, prevPos.y + 1);
          break;
        case 'ArrowLeft':
          newX = Math.max(0, prevPos.x - 1);
          break;
        case 'ArrowRight':
          newX = Math.min(CELL_LIMIT, prevPos.x + 1);
          break;
        default:
          return prevPos; // No change for other keys
      }

      return { x: newX, y: newY };
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <h1>Avalanche Grid Game</h1>
      {!isConnected && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {isConnected && <p>Connected: {account}</p>}
      <Grid>
        <Player x={playerPosition.x} y={playerPosition.y} />
      </Grid>
      <p>Player Position: ({playerPosition.x}, {playerPosition.y})</p>
      {/* Transaction status feedback */}
      {txStatus === 'pending' && <p>Transaction Status: Pending...</p>}
      {txStatus === 'error' && <p>Transaction Error: {txMessage}</p>}
      {txStatus === 'success' && <p>Transaction Status: Success!</p>}
      <p>Use arrow keys to move the player.</p>
    </div>
  );
};

export default Game;
