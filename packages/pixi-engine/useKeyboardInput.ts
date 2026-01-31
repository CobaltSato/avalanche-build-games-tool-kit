'use client';

import { useEffect } from 'react';
import type { InputHandler } from './types';

export function useKeyboardInput(handler: InputHandler | null): void {
  useEffect(() => {
    if (!handler) return;

    const onKeyDown = handler.onKeyDown?.bind(handler);
    const onKeyUp = handler.onKeyUp?.bind(handler);

    if (onKeyDown) window.addEventListener('keydown', onKeyDown);
    if (onKeyUp) window.addEventListener('keyup', onKeyUp);

    return () => {
      if (onKeyDown) window.removeEventListener('keydown', onKeyDown);
      if (onKeyUp) window.removeEventListener('keyup', onKeyUp);
    };
  }, [handler]);
}
