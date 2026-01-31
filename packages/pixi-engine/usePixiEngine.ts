'use client';

import { useRef, useState, useEffect } from 'react';
import { Application } from 'pixi.js';
import type { EngineConfig, Scene, EngineHandle } from './types';

export function usePixiEngine(
  config: EngineConfig,
  scene: Scene | null,
): [React.RefObject<HTMLDivElement | null>, EngineHandle] {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !scene) return;

    let destroyed = false;
    const app = new Application();

    (async () => {
      await app.init({
        width: config.width,
        height: config.height,
        backgroundAlpha: config.backgroundAlpha ?? 0,
        antialias: config.antialias ?? true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        preference: config.preference ?? 'webgl',
      });

      if (destroyed) {
        app.destroy(true);
        return;
      }

      container.appendChild(app.canvas);
      appRef.current = app;
      setIsReady(true);

      scene.setup(app, app.stage);

      app.ticker.add((ticker) => {
        scene.update(ticker.deltaMS);
      });
    })();

    return () => {
      destroyed = true;
      scene.destroy?.();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
      setIsReady(false);
    };
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  return [containerRef, { app: appRef.current, isReady }];
}
