'use client';

import { useRef, useMemo } from 'react';
import { PixiStage } from '@pixi-engine';
import { createWalkGameScene, BOARD_SIZE } from '../scenes';
import type { GameMap, Position } from '../game/types';

interface PixiGameBoardProps {
  gameMap: GameMap;
  playerPos: Position;
  isInitialized: boolean;
}

export function PixiGameBoard({ gameMap, playerPos, isInitialized }: PixiGameBoardProps) {
  const stateRef = useRef({ gameMap, playerPos, isInitialized });
  stateRef.current = { gameMap, playerPos, isInitialized };

  const scene = useMemo(() => createWalkGameScene(stateRef), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PixiStage
      config={{ width: BOARD_SIZE, height: BOARD_SIZE }}
      scene={scene}
      className="pixi-board"
      style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
    />
  );
}
