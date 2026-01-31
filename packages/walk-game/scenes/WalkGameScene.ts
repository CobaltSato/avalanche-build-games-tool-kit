import { Graphics } from 'pixi.js';
import type { Application, Container } from 'pixi.js';
import type { Scene } from '@pixi-engine';
import { GRID_SIZE } from '../game/map';
import { TILE_TYPES, type GameMap, type Position } from '../game/types';

const TILE_SIZE = 50;
const GRID_GAP = 2;

const COLORS = {
  floor: 0xffffff,
  floorAlpha: 0.1,
  wall: 0x646478,
  wallAlpha: 0.5,
  goal: 0xffd700,
  player: 0xff00ff,
  borderRadius: 4,
};

export const BOARD_SIZE = TILE_SIZE * GRID_SIZE + GRID_GAP * (GRID_SIZE - 1);

export interface WalkGameSceneState {
  gameMap: GameMap;
  playerPos: Position;
  isInitialized: boolean;
}

function tilePos(col: number, row: number) {
  return {
    x: col * (TILE_SIZE + GRID_GAP),
    y: row * (TILE_SIZE + GRID_GAP),
  };
}

function drawTiles(g: Graphics, gameMap: GameMap) {
  g.clear();
  for (let y = 0; y < gameMap.length; y++) {
    for (let x = 0; x < gameMap[y].length; x++) {
      const { x: px, y: py } = tilePos(x, y);
      const tile = gameMap[y][x];

      if (tile === TILE_TYPES.WALL) {
        g.roundRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.borderRadius);
        g.fill({ color: COLORS.wall, alpha: COLORS.wallAlpha });
      } else if (tile === TILE_TYPES.GOAL) {
        g.roundRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.borderRadius);
        g.fill({ color: COLORS.goal, alpha: 1 });
      } else {
        g.roundRect(px, py, TILE_SIZE, TILE_SIZE, COLORS.borderRadius);
        g.fill({ color: COLORS.floor, alpha: COLORS.floorAlpha });
      }
    }
  }
}

function drawPlayer(g: Graphics, pos: Position, isInitialized: boolean) {
  g.clear();
  if (!isInitialized) return;

  const { x: px, y: py } = tilePos(pos.x, pos.y);
  const cx = px + TILE_SIZE / 2;
  const cy = py + TILE_SIZE / 2;
  const radius = TILE_SIZE * 0.35;

  g.circle(cx, cy, radius);
  g.fill({ color: COLORS.player, alpha: 1 });

  g.pivot.set(cx, cy);
  g.position.set(cx, cy);
}

export function createWalkGameScene(
  stateRef: { readonly current: WalkGameSceneState },
): Scene {
  let tileLayer: Graphics | null = null;
  let playerGraphic: Graphics | null = null;
  let elapsed = 0;
  let lastPos: Position = { ...stateRef.current.playerPos };
  let lastInit: boolean = stateRef.current.isInitialized;
  let lastMap: GameMap = stateRef.current.gameMap;

  return {
    setup(_app: Application, stage: Container) {
      tileLayer = new Graphics();
      stage.addChild(tileLayer);

      playerGraphic = new Graphics();
      stage.addChild(playerGraphic);

      drawTiles(tileLayer, stateRef.current.gameMap);
      drawPlayer(playerGraphic, stateRef.current.playerPos, stateRef.current.isInitialized);
    },

    update(deltaMS: number) {
      elapsed += deltaMS;
      const state = stateRef.current;

      if (tileLayer && state.gameMap !== lastMap) {
        drawTiles(tileLayer, state.gameMap);
        lastMap = state.gameMap;
      }

      if (playerGraphic && (state.playerPos !== lastPos || state.isInitialized !== lastInit)) {
        drawPlayer(playerGraphic, state.playerPos, state.isInitialized);
        lastPos = state.playerPos;
        lastInit = state.isInitialized;
      }

      if (playerGraphic && state.isInitialized) {
        const scale = 1 + 0.05 * Math.sin((elapsed / 1500) * Math.PI * 2);
        playerGraphic.scale.set(scale);
      }
    },

    destroy() {
      tileLayer = null;
      playerGraphic = null;
    },
  };
}
