# Avalanche Game Toolkit

Avalanche ネットワーク対応の dApp 開発を素早く始めるための Next.js スターターキット。
ウォレット接続やスマートコントラクト呼び出しといったブロックチェーン固有の複雑さを内部パッケージに吸収し、アプリケーション層はビジネスロジックだけに集中できる設計になっている。

## ソフトウェア構成

### アーキテクチャ概要

依存関係吸収パターン（Dependency Absorption）を採用したレイヤードアーキテクチャ。
外部ライブラリの直接参照をアプリケーション層から排除し、内部パッケージがそれらを吸収・抽象化する。

```
┌──────────────────────────────────────────────────┐
│  Application Layer (app/)                        │
│  Next.js 14 App Router                           │
│  - layout.tsx … WalletProvider で全体をラップ      │
│  - page.tsx  … ゲーム / dApp の UI                │
│                                                  │
│  ※ ethers への直接依存なし                          │
└────────────────────┬─────────────────────────────┘
                     │ import @avalanche-wallet
                     ▼
┌──────────────────────────────────────────────────┐
│  Wallet Package (packages/avalanche-wallet/)     │
│  ブロックチェーン操作を吸収する抽象化レイヤー            │
│                                                  │
│  WalletProvider.tsx … React Context による状態管理  │
│  useWallet.ts       … 型安全なカスタムフック         │
│  types.ts           … 公開型定義                   │
│  index.ts           … バレルエクスポート             │
│                                                  │
│  吸収する外部依存: ethers (BrowserProvider,         │
│                    Contract, Signer)             │
└────────────────────┬─────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────┐
│  External Dependencies                           │
│  ethers ^6  … Ethereum/Avalanche JSON-RPC        │
│  react ^18  … UI フレームワーク                     │
│  next 14    … SSR / ルーティング                    │
└──────────────────────────────────────────────────┘
```

### 依存関係吸収の仕組み

| 仕組み | 設定箇所 |
|--------|----------|
| TypeScript パスエイリアス | `tsconfig.json` → `@avalanche-wallet` / `@avalanche-wallet/*` |
| Next.js トランスパイル | `next.config.mjs` → `transpilePackages: ['@avalanche-wallet']` |
| バレルエクスポート | `packages/avalanche-wallet/index.ts` |

アプリケーション層は `@avalanche-wallet` だけを import し、`ethers` を直接 import することはない。
ブロックチェーンライブラリの差し替えやバージョンアップの影響範囲が Wallet Package 内に閉じるため、アプリケーション側の変更が不要になる。

### ディレクトリ構成

```
.
├── app/                            # Next.js App Router
│   ├── layout.tsx                  #   ルートレイアウト (WalletProvider)
│   ├── page.tsx                    #   ホームページ
│   ├── globals.css                 #   グローバルスタイル
│   └── page.module.css             #   ページスコープスタイル
├── packages/
│   └── avalanche-wallet/           # ウォレット抽象化パッケージ
│       ├── WalletProvider.tsx      #   Context Provider
│       ├── useWallet.ts            #   カスタムフック
│       ├── types.ts                #   型定義
│       └── index.ts                #   バレルエクスポート
├── types/
│   └── window.d.ts                 # EIP-1193 グローバル型拡張
├── next.config.mjs                 # Next.js 設定
├── tsconfig.json                   # TypeScript 設定 (パスエイリアス)
├── package.json                    # 依存関係 & スクリプト
└── .env.local.example              # 環境変数テンプレート
```

### 主要コンポーネント

#### WalletProvider

React Context API を使い、ウォレット状態をアプリケーション全体に提供する。

- MetaMask 検出とアカウント接続
- ネットワーク（Chain ID）の検証
- ethers `Contract` インスタンスの自動生成
- `accountsChanged` / `chainChanged` イベントのハンドリング

#### useWallet

`WalletProvider` 配下でウォレットの状態と操作にアクセスするためのカスタムフック。

```tsx
const { account, isConnected, connectWallet, sendTransaction } = useWallet();
```

#### sendTransaction

スマートコントラクトのメソッドをトランザクションとして実行する。
ネットワーク検証 → Tx 送信 → マイニング待機 → ステータス更新 のライフサイクルを内部で管理する。

### 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | Next.js 14 (App Router) |
| 言語 | TypeScript 5 |
| UI | React 18 |
| ブロックチェーン | ethers.js 6 |
| 対象ネットワーク | Avalanche C-Chain (デフォルト: Fuji Testnet `0xa869`) |
| ウォレット | MetaMask (EIP-1193) |

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local にコントラクトアドレスと ABI を設定
npm run dev
```

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | デプロイ済みスマートコントラクトのアドレス |
| `NEXT_PUBLIC_CONTRACT_ABI` | コントラクト ABI (JSON 文字列) |
