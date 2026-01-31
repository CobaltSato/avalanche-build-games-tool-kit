import type { Application, Container } from 'pixi.js';

export interface EngineConfig {
  width: number;
  height: number;
  backgroundAlpha?: number;
  antialias?: boolean;
  preference?: 'webgl' | 'webgpu';
}

export interface Scene {
  setup(app: Application, stage: Container): void;
  update(deltaMS: number): void;
  destroy?(): void;
}

export interface EngineHandle {
  app: Application | null;
  isReady: boolean;
}

export interface InputHandler {
  onKeyDown?(event: KeyboardEvent): void;
  onKeyUp?(event: KeyboardEvent): void;
}
