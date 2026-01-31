---
name: game-development
description: Game development orchestrator for Neon Grid Runner. Routes to sub-skills based on task context.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Game Development - Neon Grid Runner

> **Orchestrator skill** for the blockchain-integrated 2D maze game built with Next.js + PixiJS + Avalanche.

---

## When to Use This Skill

Any task involving the Walk Game (Neon Grid Runner) -- rendering, game logic, blockchain integration, level design, or new feature development.

---

## Project Overview

| Aspect | Detail |
|--------|--------|
| **Game** | Neon Grid Runner -- 2D grid-based maze |
| **Renderer** | PixiJS v8 (vanilla, ref-based React integration) |
| **Framework** | Next.js 14 (App Router) + React 18 |
| **Language** | TypeScript 5 |
| **Blockchain** | Avalanche C-Chain (Fuji Testnet), Solidity |
| **Web3** | ethers.js v6, MetaMask |
| **Contract** | `PositionTracker.sol` -- stores player (x,y) on-chain |

---

## Sub-Skill Routing

| If you need... | Use Sub-Skill |
|----------------|---------------|
| PixiJS rendering, canvas, Next.js integration | `game-development/web-games` |
| Tilemap, sprites, player graphics, animation | `game-development/2d-games` |
| Level design, core loop, progression, balancing | `game-development/game-design` |

---

## Project Architecture

```
tool-kit/
├── app/
│   ├── page.tsx              # Mounts <WalkGameClient />
│   ├── layout.tsx            # <WalletProvider> wraps app
│   └── walk.css              # Neon theme (background, modal, buttons)
├── packages/
│   ├── walk-game/            # Game package
│   │   ├── game/
│   │   │   ├── types.ts      # Position, GameMap, TileType
│   │   │   └── map.ts        # 10x10 maze, isValidMove(), isGoal()
│   │   ├── components/
│   │   │   ├── PixiGameBoard.tsx  # PixiJS canvas renderer
│   │   │   └── GameBoard.tsx      # Legacy CSS Grid renderer (unused)
│   │   ├── useWalkGame.ts    # Game state hook (input, wallet, state)
│   │   └── WalkGameClient.tsx # Main UI (wallet chrome + game board)
│   └── avalanche-wallet/     # Wallet abstraction (WalletProvider, useWallet)
├── PositionTracker.sol       # Solidity contract
└── package.json
```

---

## Game Loop Architecture

This game uses a **hybrid event-driven + ticker** model, not a traditional fixed-timestep loop:

```
KEYBOARD EVENT
  → useWalkGame validates move (isValidMove)
  → sendTransaction('move', [dx, dy]) to blockchain
  → fetchPosition() reads new (x, y) from contract
  → React state update triggers useEffect
  → PixiJS Graphics redraws player at new position

PIXI TICKER (60fps)
  → Player pulse animation (scale oscillation via sin wave)
  → PixiJS internal render pass
```

**Key constraint:** Every move is an on-chain transaction (~2-5s latency). Game logic is event-driven, not frame-driven.

---

## State Flow

```
Disconnected → [connectWallet] → Connected
Connected    → [initialize]    → Playing
Playing      → [move dx,dy]    → Playing (position updated)
Playing      → [reach goal]    → Cleared (modal shown)
```

Currently managed via React booleans (`isConnected`, `isInitialized`, `isCleared`). Consider migrating to a state machine for robustness.

---

## Rendering Architecture

| Layer | Implementation | Updates |
|-------|---------------|---------|
| **Background** | CSS animated gradient (walk.css) | Never |
| **Tiles** | PixiJS Graphics (roundRect) | Once on mount |
| **Player** | PixiJS Graphics (circle) | On position change |
| **Pulse animation** | PixiJS Ticker (scale sin wave) | Every frame |
| **UI chrome** | React DOM (buttons, text, modal) | On state change |

The canvas has `backgroundAlpha: 0` so the CSS neon background shows through.

---

## Blockchain Integration Pattern

```
useWalkGame hook
  ├── useWallet() → { sendTransaction, callView, account, ... }
  ├── move(dx, dy)
  │     1. isValidMove() -- client-side validation
  │     2. sendTransaction('move', [dx, dy]) -- on-chain tx
  │     3. fetchPosition() -- read updated state from contract
  └── initialize()
        1. sendTransaction('initialize') -- register player at (0,0)
        2. fetchPosition() -- confirm
```

Contract: `PositionTracker.sol`
- `initialize()` -- set player to (0,0), once per address
- `move(dx, dy)` -- delta must be -1/0/1, no diagonals
- `getPosition(addr)` -- returns (x, y, hasInitialized)

---

## Key Patterns in This Codebase

| Pattern | Where Used |
|---------|------------|
| **React Context** | WalletProvider wraps app |
| **Custom Hooks** | useWalkGame, useWallet |
| **Barrel Exports** | Each package has index.ts |
| **Ref-based Canvas** | PixiGameBoard uses useRef + useEffect |
| **Props-driven Rendering** | React state drives PixiJS via useEffect sync |

---

## Anti-Patterns to Avoid

| Don't | Do |
|-------|-----|
| Import PixiJS in SSR context | Always use `'use client'`, guard with `typeof window` |
| Create PixiJS Application in render | Create in `useEffect`, destroy in cleanup |
| Redraw tiles on every position change | Separate tile layer (static) from player layer |
| Send raw key events to blockchain | Validate with `isValidMove()` first |
| Skip cleanup on unmount | `app.destroy(true, { children: true })` to release WebGL context |

---

## Routing Examples

### "Add a new tile type (e.g., trap)"
→ `game-development/2d-games` for tilemap patterns
→ Update `game/types.ts` (add TRAP to TILE_TYPES)
→ Update `game/map.ts` (add to layout)
→ Update `PixiGameBoard.tsx` (add drawing logic)
→ Update `PositionTracker.sol` if on-chain validation needed

### "Improve the visual effects"
→ `game-development/web-games` for PixiJS rendering techniques
→ `game-development/2d-games` for animation and sprite systems

### "Add level progression"
→ `game-development/game-design` for progression and pacing
→ Multiple maps, unlock conditions, difficulty curve

---

> **Remember:** Every move is an on-chain transaction. Optimize for perceived responsiveness -- consider optimistic local updates with blockchain reconciliation.
