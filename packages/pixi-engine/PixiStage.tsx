'use client';

import { usePixiEngine } from './usePixiEngine';
import type { EngineConfig, Scene } from './types';

interface PixiStageProps {
  config: EngineConfig;
  scene: Scene | null;
  className?: string;
  style?: React.CSSProperties;
}

export function PixiStage({ config, scene, className, style }: PixiStageProps) {
  const [containerRef] = usePixiEngine(config, scene);

  return <div ref={containerRef} className={className} style={style} />;
}
