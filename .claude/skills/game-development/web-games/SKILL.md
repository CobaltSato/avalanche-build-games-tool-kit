---
name: web-games
description: PixiJS v8 + Next.js 14 integration patterns for Neon Grid Runner.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Web Games - PixiJS + Next.js Integration

> Rendering, React integration, and browser-specific patterns for this project.

---

## 1. Current Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Renderer** | PixiJS v8 (vanilla) | WebGL, `preference: 'webgl'` |
| **React integration** | Ref-based (`useRef` + `useEffect`) | NOT `@pixi/react` |
| **Framework** | Next.js 14 App Router | All game components are `'use client'` |
| **Styling** | CSS3 (walk.css) | Neon theme, canvas has transparent background |

---

## 2. PixiJS v8 API Reference

### Application Lifecycle

```typescript
// v8 uses async init (NOT constructor options like v7)
const app = new Application();
await app.init({
  width, height,
  backgroundAlpha: 0,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  preference: 'webgl',
});
container.appendChild(app.canvas);  // v8: app.canvas (NOT app.view)

// Cleanup
app.destroy(true, { children: true });
```

### Graphics API (v8 method chaining)

```typescript
const g = new Graphics();

// Shapes
g.roundRect(x, y, w, h, radius);
g.circle(cx, cy, radius);
g.rect(x, y, w, h);

// Fill (call after shape)
g.fill({ color: 0xff00ff, alpha: 1 });

// Clear and redraw
g.clear();

// Transform
g.pivot.set(cx, cy);
g.position.set(cx, cy);
g.scale.set(1.05);
```

### Ticker (Animation Loop)

```typescript
app.ticker.add((ticker) => {
  const deltaMS = ticker.deltaMS;  // ms since last frame
  // animation logic here
});
```

---

## 3. React Integration Pattern

The game board is a **leaf component** -- props flow in, nothing flows out. This pattern works:

```
React State (useWalkGame)
    │
    ├── playerPos, isInitialized, gameMap
    │
    ▼
PixiGameBoard (useEffect syncs props → PixiJS)
    │
    ├── useEffect([]) -- create Application, draw tiles, start ticker
    ├── useEffect([gameMap]) -- redraw tiles
    ├── useEffect([playerPos, isInitialized]) -- redraw player
    │
    ▼
Canvas Element (managed by PixiJS, appended to ref div)
```

### Key Files

| File | Role |
|------|------|
| `packages/walk-game/components/PixiGameBoard.tsx` | Canvas renderer |
| `packages/walk-game/useWalkGame.ts` | Game state + input + wallet |
| `packages/walk-game/WalkGameClient.tsx` | Composes UI chrome + GameBoard |
| `app/walk.css` | Neon theme (background, modal, buttons only) |

### Critical Rules

1. **Always `'use client'`** -- PixiJS accesses `window`, `document`, WebGL
2. **Create Application in `useEffect`** -- never in render or at module level
3. **Handle React 18 Strict Mode** -- use `destroyed` flag in async init:
   ```typescript
   let destroyed = false;
   (async () => {
     await app.init({...});
     if (destroyed) { app.destroy(true); return; }
     // proceed
   })();
   return () => { destroyed = true; app.destroy(true, { children: true }); };
   ```
4. **Separate static and dynamic layers** -- tiles drawn once, player redrawn on state change
5. **Use refs for ticker access** -- store latest props in `useRef` so ticker callbacks read fresh values without re-registering

### SSR Fallback

If Next.js SSR errors occur with PixiJS imports:

```typescript
import dynamic from 'next/dynamic';
const GameBoard = dynamic(() => import('./components/PixiGameBoard').then(m => m.PixiGameBoard), {
  ssr: false,
});
```

---

## 4. Performance Considerations

### Current Budget

| Component | Draw Calls | Notes |
|-----------|-----------|-------|
| Tile layer | 1 Graphics object | 100 roundRects batched in one Graphics |
| Player layer | 1 Graphics object | 1 circle, redrawn on move |
| Ticker | 1 callback | Pulse animation (scale sin wave) |
| **Total** | ~2 draw calls | Extremely lightweight |

### When to Upgrade

| Trigger | Action |
|---------|--------|
| Need sprites/textures | Use `Sprite` + `Texture` instead of Graphics |
| Need many entities (>100) | Use `Container` + object pooling |
| Need particles | Use `@pixi/particle-emitter` |
| Need text on canvas | Use `Text` or `BitmapText` |
| Performance issues | Profile with `app.ticker.FPS`, Chrome DevTools |

### HiDPI Rendering

Already configured: `resolution: window.devicePixelRatio` + `autoDensity: true`. The canvas internal buffer is scaled up while CSS size stays logical. No additional handling needed.

---

## 5. Visual Style Constants

Extracted from the original CSS, now in `PixiGameBoard.tsx`:

| Element | Color | Alpha |
|---------|-------|-------|
| Floor tile | `0xffffff` | 0.1 |
| Wall tile | `0x646478` | 0.5 |
| Goal tile | `0xffd700` (gold) | 1.0 |
| Player | `0xff00ff` (magenta) | 1.0 |
| Canvas background | transparent | 0 |

Tile size: 50px, gap: 2px, board: 518px x 518px, border radius: 4px.

---

## 6. Anti-Patterns

| Don't | Do |
|-------|-----|
| Use `@pixi/react` for simple leaf components | Vanilla PixiJS with ref-based integration |
| Create Application synchronously (v8 is async) | `await app.init()` in useEffect |
| Redraw tiles on every player move | Separate Graphics layers (static vs dynamic) |
| Forget cleanup on unmount | `app.destroy(true, { children: true })` |
| Import PixiJS at module top-level in SSR | Guard with `'use client'` or dynamic import |
| Register new ticker callbacks on every render | Register once in init useEffect, read props via refs |

---

> **Remember:** PixiJS handles the render loop. React handles the state. The bridge is `useEffect`.
