import { TILE_TYPES, type GameMap, type Position } from './types';

export const GRID_SIZE = 10;

export const initialMap: GameMap = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 2],
];

export const tileClassName: Record<number, string> = {
  [TILE_TYPES.FLOOR]: 'floor',
  [TILE_TYPES.WALL]: 'wall',
  [TILE_TYPES.GOAL]: 'goal',
};

export function isValidMove(
  map: GameMap,
  from: Position,
  dx: number,
  dy: number,
): boolean {
  const newX = from.x + dx;
  const newY = from.y + dy;
  if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
    return false;
  }
  return map[newY][newX] !== TILE_TYPES.WALL;
}

export function isGoal(map: GameMap, pos: Position): boolean {
  return map[pos.y][pos.x] === TILE_TYPES.GOAL;
}
