export type { TileType, GameMap, Position } from './game/types';

export interface WalkGameState {
  gameMap: import('./game/types').GameMap;
  playerPos: import('./game/types').Position;
  isInitialized: boolean;
  isCleared: boolean;
  isTxPending: boolean;
}

export interface WalkGameActions {
  initialize: () => Promise<void>;
  move: (dx: number, dy: number) => Promise<void>;
}
