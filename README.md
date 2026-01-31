# Avalanche Game Toolkit

Avalanche ネットワーク対応のブロックチェーンゲームを素早く開発するための Next.js モノレポスターターキット。

ウォレット接続・コントラクト呼び出し・2D ゲームレンダリングといった横断的関心事を内部パッケージに吸収し、**ゲーム固有のロジックだけに集中**できる設計になっている。

## アーキテクチャ

依存関係吸収パターン（Dependency Absorption）を採用した 3 層レイヤードアーキテクチャ。

```
┌─────────────────────────────────────────────────────────┐
│  Application Layer  (app/)                              │
│  Next.js 14 App Router                                  │
│                                                         │
│  ゲーム固有の UI・ページ構成                                │
│  ※ ethers / pixi.js への直接依存なし                       │
└──────────┬──────────────────────┬───────────────────────┘
           │                      │
           ▼                      ▼
┌────────────────────┐  ┌─────────────────────────────────┐
│  @avalanche-wallet │  │  @pixi-engine                   │
│                    │  │                                 │
│  ウォレット接続      │  │  Pixi.js Application 管理       │
│  Tx 送信 / View 呼出│  │  Scene ライフサイクル             │
│  チェーン設定        │  │  キーボード入力                   │
│                    │  │                                 │
│  吸収: ethers ^6   │  │  吸収: pixi.js ^8               │
└────────────────────┘  └─────────────────────────────────┘
```

各パッケージは TypeScript パスエイリアス (`@avalanche-wallet`, `@pixi-engine`) で参照され、Next.js の `transpilePackages` でビルドに組み込まれる。外部ライブラリの差し替え・バージョンアップの影響範囲がパッケージ内に閉じるため、アプリケーション層の変更が不要になる。

## ディレクトリ構成

```
.
├── app/                                # Next.js App Router
│   ├── layout.tsx                      #   ルートレイアウト (Provider)
│   ├── page.tsx                        #   ホームページ
│   └── *.css                           #   スタイル
│
├── packages/
│   ├── avalanche-wallet/               # ウォレット抽象化
│   │   ├── WalletProvider.tsx          #   React Context Provider
│   │   ├── useWallet.ts               #   カスタムフック
│   │   ├── service/WalletService.ts   #   コアロジック (Observer)
│   │   ├── adapters/metamask.ts       #   MetaMask アダプタ
│   │   ├── chains/                    #   チェーン定義 (Fuji / Mainnet)
│   │   └── types.ts                   #   公開型定義
│   │
│   └── pixi-engine/                    # 汎用 2D ゲームエンジン
│       ├── types.ts                   #   Scene / EngineConfig 等
│       ├── usePixiEngine.ts           #   Application ライフサイクルフック
│       ├── useKeyboardInput.ts        #   キーボード入力フック
│       └── PixiStage.tsx              #   React コンポーネント
│
├── types/window.d.ts                   # EIP-1193 グローバル型拡張
├── tsconfig.json                       # パスエイリアス設定
├── next.config.mjs                     # transpilePackages 設定
└── .env.local.example                  # 環境変数テンプレート
```

## パッケージ詳細

### @avalanche-wallet

ブロックチェーン操作を React アプリから簡潔に利用するための抽象化レイヤー。

```tsx
// Provider でラップ
<WalletProvider chain={avalancheFuji} adapter={metamaskAdapter} contractAddress={addr} contractABI={abi}>
  <App />
</WalletProvider>

// フックで利用
const { account, isConnected, connectWallet, sendTransaction, callView } = useWallet();
```

**主な機能:**
- MetaMask 検出・アカウント接続
- チェーン ID 検証・自動切り替え
- `sendTransaction(method, args)` — コントラクトへの書き込み（Tx 送信 → マイニング待機 → ステータス管理）
- `callView(method, args)` — コントラクトの読み取り（ガス不要）
- アカウント / チェーン変更の自動検知

**アダプタパターン:** `WalletAdapter` インターフェースを実装すれば MetaMask 以外のウォレットにも対応可能。

### @pixi-engine

Pixi.js の Application ライフサイクルを React と統合する薄い汎用レイヤー。

```tsx
import { PixiStage, type Scene } from '@pixi-engine';

const scene: Scene = {
  setup(app, stage) { /* Graphics / Sprite を stage に追加 */ },
  update(deltaMS)   { /* 毎フレーム呼ばれる */ },
  destroy()         { /* クリーンアップ */ },
};

<PixiStage config={{ width: 800, height: 600 }} scene={scene} />
```

**公開 API:**

| エクスポート | 種類 | 説明 |
|---|---|---|
| `Scene` | interface | `setup` / `update` / `destroy` を実装するゲームシーン |
| `EngineConfig` | interface | Application の初期化設定 (width, height, antialias 等) |
| `InputHandler` | interface | `onKeyDown` / `onKeyUp` コールバック |
| `usePixiEngine(config, scene)` | hook | Application 管理 + Scene オーケストレーション |
| `useKeyboardInput(handler)` | hook | キーボードイベントリスナー管理 |
| `PixiStage` | component | usePixiEngine の宣言的ラッパー |

**新しいゲームを作るには:** `Scene` インターフェースを実装するだけ。エンジンが Application の初期化・Ticker 管理・DOM マウント・破棄を自動で行う。

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local にコントラクトアドレスと ABI を設定
npm run dev
```

## 環境変数

| 変数名 | 説明 |
|---|---|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | デプロイ済みスマートコントラクトのアドレス |
| `NEXT_PUBLIC_CONTRACT_ABI` | コントラクト ABI (JSON 文字列) |

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript 5 |
| UI | React 18 |
| 2D レンダリング | Pixi.js 8 |
| ブロックチェーン | ethers.js 6 |
| 対象ネットワーク | Avalanche C-Chain (Fuji Testnet / Mainnet) |
| ウォレット | MetaMask (EIP-1193) |
