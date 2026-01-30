export { WalkGameClient } from './WalkGameClient';
export { useWalkGame } from './useWalkGame';
export { GameBoard } from './components';

// game logic
export {
  TILE_TYPES,
  GRID_SIZE,
  initialMap,
  tileClassName,
  isValidMove,
  isGoal,
} from './game';
export type { TileType, GameMap, Position } from './game';

// public types
export type { WalkGameState, WalkGameActions } from './types';
