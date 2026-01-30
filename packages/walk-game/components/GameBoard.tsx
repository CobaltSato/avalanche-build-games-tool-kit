'use client';

import { tileClassName } from '../game/map';
import type { GameMap, Position } from '../game/types';

interface GameBoardProps {
  gameMap: GameMap;
  playerPos: Position;
  isInitialized: boolean;
}

export function GameBoard({ gameMap, playerPos, isInitialized }: GameBoardProps) {
  return (
    <div className="game-board">
      {gameMap.map((row, y) =>
        row.map((tileType, x) => (
          <div key={`${y}-${x}`} className={`tile ${tileClassName[tileType]}`} />
        )),
      )}
      {isInitialized && (
        <div
          className="player"
          style={{
            gridColumnStart: playerPos.x + 1,
            gridRowStart: playerPos.y + 1,
          }}
        />
      )}
    </div>
  );
}
