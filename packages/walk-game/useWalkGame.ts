'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@avalanche-wallet';
import { initialMap, isValidMove, isGoal } from './game/map';
import type { Position } from './game/types';

export function useWalkGame() {
  const {
    account,
    chainId,
    isConnected,
    txStatus,
    txMessage,
    connectWallet,
    sendTransaction,
    callView,
  } = useWallet();

  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const gameMap = initialMap;
  const isTxPending = txStatus === 'pending';

  // Fetch position from contract
  const fetchPosition = useCallback(async () => {
    if (!account) return;
    try {
      const result = await callView('getPosition', [account]);
      setPlayerPos({ x: Number(result[0]), y: Number(result[1]) });
      setIsInitialized(result[2]);
    } catch (error) {
      console.error('Failed to fetch position:', error);
    }
  }, [account, callView]);

  // Fetch position when connected
  useEffect(() => {
    if (isConnected && account) {
      fetchPosition();
    }
  }, [isConnected, account, fetchPosition]);

  // Initialize position on contract
  const initialize = useCallback(async () => {
    await sendTransaction('initialize');
    await fetchPosition();
  }, [sendTransaction, fetchPosition]);

  // Move player
  const move = useCallback(
    async (dx: number, dy: number) => {
      if (!isValidMove(gameMap, playerPos, dx, dy)) return;
      await sendTransaction('move', [dx, dy]);
      await fetchPosition();
    },
    [gameMap, playerPos, sendTransaction, fetchPosition],
  );

  // Check game clear
  useEffect(() => {
    if (isInitialized && isGoal(gameMap, playerPos)) {
      setIsCleared(true);
    }
  }, [playerPos, gameMap, isInitialized]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isCleared || !isInitialized || isTxPending) return;

      let dx = 0,
        dy = 0;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          dy = -1;
          break;
        case 'ArrowDown':
        case 's':
          dy = 1;
          break;
        case 'ArrowLeft':
        case 'a':
          dx = -1;
          break;
        case 'ArrowRight':
        case 'd':
          dx = 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      move(dx, dy);
    },
    [isCleared, isInitialized, isTxPending, move],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    gameMap,
    playerPos,
    isInitialized,
    isCleared,
    isTxPending,
    account,
    chainId,
    isConnected,
    txStatus,
    txMessage,
    connectWallet,
    initialize,
    move,
  };
}
