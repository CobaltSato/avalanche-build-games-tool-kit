'use client';

import { useRef, useEffect } from 'react';
import { Application, Graphics } from 'pixi.js';
import { GRID_SIZE } from '../game/map';
import { TILE_TYPES, type GameMap, type Position } from '../game/types';

const TILE_SIZE = 50;
const GRID_GAP = 2;
const BOARD_SIZE = TILE_SIZE * GRID_SIZE + GRID_GAP * (GRID_SIZE - 1);

const COLORS = {
  floor: 0xffffff,
  floorAlpha: 0.1,
  wall: 0x646478,
  wallAlpha: 0.5,
  goal: 0xffd700,
  player: 0xff00ff,
  borderRadius: 4,
};

interface PixiGameBoardProps {
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

  // Set pivot to center for scale animation
  g.pivot.set(cx, cy);
  g.position.set(cx, cy);
}

export function PixiGameBoard({ gameMap, playerPos, isInitialized }: PixiGameBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const tilesRef = useRef<Graphics | null>(null);
  const playerRef = useRef<Graphics | null>(null);

  // Store latest props in refs so the ticker callback always reads fresh values
  const posRef = useRef(playerPos);
  const initRef = useRef(isInitialized);
  posRef.current = playerPos;
  initRef.current = isInitialized;

  // Initialize PixiJS application
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    const app = new Application();

    (async () => {
      await app.init({
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        backgroundAlpha: 0,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        preference: 'webgl',
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      container.appendChild(app.canvas);
      appRef.current = app;

      const tileLayer = new Graphics();
      app.stage.addChild(tileLayer);
      tilesRef.current = tileLayer;

      const playerGraphic = new Graphics();
      app.stage.addChild(playerGraphic);
      playerRef.current = playerGraphic;

      drawTiles(tileLayer, gameMap);
      drawPlayer(playerGraphic, posRef.current, initRef.current);

      // Pulse animation via ticker
      let elapsed = 0;
      app.ticker.add((ticker) => {
        elapsed += ticker.deltaMS;
        if (playerRef.current && initRef.current) {
          const scale = 1 + 0.05 * Math.sin((elapsed / 1500) * Math.PI * 2);
          playerRef.current.scale.set(scale);
        }
      });
    })();

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync tiles when gameMap changes
  useEffect(() => {
    if (tilesRef.current) {
      drawTiles(tilesRef.current, gameMap);
    }
  }, [gameMap]);

  // Sync player when position or initialization changes
  useEffect(() => {
    if (playerRef.current) {
      drawPlayer(playerRef.current, playerPos, isInitialized);
    }
  }, [playerPos, isInitialized]);

  return (
    <div
      ref={containerRef}
      className="pixi-board"
      style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
    />
  );
}
