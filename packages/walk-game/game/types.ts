export const TILE_TYPES = { FLOOR: 0, WALL: 1, GOAL: 2 } as const;

export type TileType = (typeof TILE_TYPES)[keyof typeof TILE_TYPES];

export type GameMap = TileType[][];

export interface Position {
  x: number;
  y: number;
}
