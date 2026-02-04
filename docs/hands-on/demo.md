# Avalanche + AI 開発 Hands-on Demo

> **概要**: Gemini CLI を使って、Avalanche ブロックチェーン上で動くシンプルな 2D グリッドゲームを作成します。

---

## 🎯 デモのゴール

- **10x10 グリッド**上でプレイヤーを移動
- **キーボード操作**で上下左右に移動
- **Avalanche Fuji テストネット**に座標を保存・取得

---

## 📋 デモ手順

---

### Phase 0: 事前準備（5分）

---

#### 0-1. GitHub Codespaces を開く

> 💡 **Codespaces とは**: GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要です。

1. リポジトリで「Code」→「Codespaces」→「Create codespace on main」
2. VS Code がブラウザで起動するまで待つ

https://github.com/CobaltSato/aたalanche-build-games-tool-kit/tree/main

#### 0-2. 環境の動作確認

Codespaces が起動したら、開発サーバーを起動して環境が正しくセットアップされているか確認します。

```bash
npm run dev
```

- ターミナルに `Local: http://localhost:3000` と表示されれば OK
- ポップアップで「Open in Browser」が表示されたらクリックして確認
- 問題があれば `npm ci` を実行して依存関係を再インストール

#### 0-3. Core Wallet 拡張機能をインストール

> 💡 **Core Wallet とは**: Avalanche 公式ウォレット。MetaMask より Avalanche に最適化されており、C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応しています。

- ダウンロード: https://core.app/download
- Chrome 拡張機能としてインストール

#### 0-4. Gemini CLI を起動・認証

> 💡 **Gemini CLI とは**: Google の Gemini AI をターミナルから直接操作できるコマンドラインツール。ファイル編集、シェルコマンド実行、Web アクセスなどの機能を備えています。

**認証方法は3つ:**

| 方法 | 特徴 | コマンド |
|------|------|---------|
| **Google OAuth** | 無料枠あり、簡単 | `gemini` → ブラウザ認証 |
| **API Key** | モデル選択可能 | `export GEMINI_API_KEY="..."` |
| **Vertex AI** | エンタープライズ向け | `export GOOGLE_GENAI_USE_VERTEXAI=true` |

**今回は Google OAuth（最も簡単）:**

```bash
gemini
```

1. 表示されるマジックリンクをブラウザで開く
2. Google アカウントで認証
3. 認証トークンをコピー → ターミナルにペースト

**便利なオプション:**

```bash
# 初期プロンプト付きで起動
gemini -i "このコードベースを説明して"

# 前回のセッションを再開
gemini --resume latest

# 全ツール実行を自動承認（YOLO モード）
gemini --yolo
```

---

### Phase 1: スキルファイルの導入（2分）

---

> 💡 **スキル（Skills）とは**: Gemini CLI に専門知識をオンデマンドで適用する仕組み。スキルを使うことで、特定のタスク（ゲーム開発、API 設計など）に最適化された振る舞いを AI に与えられます。

#### スキルの仕組み

**スキルファイルの構造（SKILL.md）:**

```markdown
---
name: my-skill-name
description: スキルの説明（Gemini がいつ使うか判断する材料）
---

# 詳細な指示

このスキルが有効な時、あなたは以下のように振る舞います：
1. ...
2. ...
```

**スキルの発見優先順位:**

| 優先度 | 場所 | 用途 |
|-------|------|------|
| **高** | `.gemini/skills/`（Workspace） | プロジェクト固有、チーム共有 |
| **中** | `~/.gemini/skills/`（User） | 個人用、全プロジェクト共通 |
| **低** | Extension Skills | 拡張機能にバンドル |

---

#### 方法 A: URL から直接インストール（推奨）

```bash
gemini skills install--scope workspace

gemini extensions install https://github.com/ankitchiplunkar/frontend-design
```

**インストール後、スキルをリロード:**

```bash
# Gemini CLI 内で実行
/skills reload

# インストール確認
/skills list
```

---

#### 方法 B: ローカルファイルからインストール

こちらよりダウロード
https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill 

```bash
mv docs/hands-on/react-css-grid-game-rendering.skill .

gemini 

# ダウンロード後
gemini skills install ./react-css-grid-game-rendering.skill --scope workspace
```

---

#### スキル管理コマンド一覧

```bash
# スキル一覧
gemini skills list

# Git リポジトリからインストール
gemini skills install https://github.com/user/repo.git

# モノレポの特定パスからインストール
gemini skills install https://github.com/org/skills.git --path skills/frontend

# アンインストール
gemini skills uninstall my-skill --scope workspace

# 有効化/無効化
gemini skills enable my-skill
gemini skills disable my-skill --scope workspace
```

> 📝 **Tips**: `.skill` ファイルは `.zip` に拡張子を変えると解凍可能。Claude のスキルも Gemini の skill creator で変換できます。

---

### Phase 2: スマートコントラクト作成（5分）

---

> 💡 **Gemini CLI のツール**: Gemini はファイル読み書き、シェルコマンド実行、Web アクセスなどのツールを持っています。ユーザーの確認を得てから実行されます。

**主要ツール:**

| ツール | 機能 |
|--------|------|
| `read_file` | ファイル内容を読み取り |
| `write_file` | ファイルを作成・上書き |
| `edit_file` | ファイルの一部を編集 |
| `run_shell_command` | シェルコマンドを実行 |
| `web_fetch` | URL からコンテンツを取得 |

---

#### Gemini に依頼

```
プレイヤーの 10x10 座標を保存・取得できるコントラクトを作成して。

要件:
- 位置を初期化する関数
- 1歩移動する関数（上下左右）
- 座標は 0-9 の範囲に制限

出力先:
- Solidity: contracts/PositionTracker.sol
- ABI: .env.local.example に追記
```

---

#### 出力されるファイル

| ファイル | 内容 |
|---------|------|
| `contracts/PositionTracker.sol` | Solidity コントラクト |
| `.env.local.example` | ABI（JSON 形式） |

> 📝 **参考**: [Solidity ベストプラクティス](https://cursor.directory/solidity-development-best-practices)

---

### Phase 3: テスト AVAX 取得 & デプロイ（5分）

---

> 💡 **Fuji テストネット**: Avalanche のテスト環境。本番（Mainnet）と同じ仕組みで、無料のテスト AVAX を使ってテスト可能。C-Chain は EVM 互換なので、Remix や ethers.js がそのまま使えます。

---

#### 3-1. テスト AVAX を取得

- **Faucet**: https://build.avax.network/console/primary-network/faucet
- ウォレットアドレスを入力 → 「Request」

> 📝 AVAX が届かない場合は、ウォレットアドレスを共有いただければ送金します。

---

#### 3-2. Remix でデプロイ

1. **Remix** を開く: https://remix.ethereum.org/
2. `contracts/PositionTracker.sol` をコピー
3. コンパイル（Solidity 0.8.x）
4. 「Deploy」→ 「Injected Provider - Core」を選択
5. ネットワークを **Fuji (C-Chain)** に変更
6. デプロイ → コントラクトアドレスをコピー

---

#### 3-3. 環境変数を設定

```bash
# .env.local を作成（.env.local.example をコピー）
cp .env.local.example .env.local
```

**コントラクトアドレスを設定:**

`.env.local` をエディタで開き、`NEXT_PUBLIC_CONTRACT_ADDRESS` にデプロイしたコントラクトアドレスを設定します。

```bash
# .env.local の例
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1234567890abcdef...  # ← Remix でコピーしたアドレスをペースト
NEXT_PUBLIC_CONTRACT_ABI=[...]  # ← .env.local.example から既にコピー済み
```

> 📝 **重要**: コントラクトアドレスは Remix の「Deployed Contracts」セクションからコピーできます。

---

### Phase 4: アプリ作成（10分）

---

> 💡 **タスク管理**: Gemini にフェーズ分割でタスクを管理させることで、段階的に検収しながら進められます。

---

#### Gemini に依頼

```
10x10 の 2D グリッドゲームを作成して。

要件:
- react-css-grid-game-rendering スキルを使用
- 日本語で docs/task.md にタスクリストを生成（5フェーズ）
- タスク完了ごとに task.md にチェックを入れる
- フェーズごとにユーザーの確認を促す
- キーボード（↑↓←→）でプレイヤーを移動
- 移動時にコントラクトに座標を書き込む

参照ファイル:
- contracts/PositionTracker.sol
- env.local.example（コントラクトアドレス・ABI）
```

---

#### 生成されるタスクリスト（例）

```markdown
# task.md

## Phase 1: グリッド表示
- [ ] 10x10 の CSS Grid を作成
- [ ] プレイヤーを表示

## Phase 2: キーボード操作
- [ ] 矢印キーでプレイヤー移動
- [ ] 境界チェック（0-9 の範囲）

## Phase 3: コントラクト連携
- [ ] ウォレット接続
- [ ] 座標を読み込み

## Phase 4: 座標の書き込み
- [ ] 移動時にトランザクション送信
- [ ] ローディング表示

## Phase 5: 仕上げ
- [ ] デザイン調整（AVAX風）
- [ ] エラーハンドリング
```

---

### Phase 5: 動作確認（3分）

---

#### 5-1. 開発サーバー起動

```bash
npm run dev
```

---

#### 5-2. ブラウザで確認

1. `localhost:3000` を開く
2. Core Wallet を接続
3. 矢印キーでプレイヤーを移s
4. トランザクションを承認
5. 座標がブロックチェーンに保存されることを確認

---

## 🎉 デモ完了

### 作ったもの

| 成果物 | 説明 |
|--------|------|
| `PositionTracker.sol` | 座標保存コントラクト |
| グリッドゲーム UI | React + CSS Grid |
| ウォレット連携 | Core Wallet + ethers.js |

---

## 📚 Gemini CLI クイックリファレンス

### 起動オプション

```bash
gemini                          # 対話モードで起動
gemini -m gemini-2.5-flash      # モデル指定
gemini -i "プロンプト"           # 初期プロンプト付き
gemini --resume latest          # 前回セッション再開
gemini --yolo                   # 全ツール自動承認
gemini -p "質問" --output-format json  # 非対話・JSON出力
```

### スラッシュコマンド（対話モード内）

```bash
/skills list      # スキル一覧
/skills reload    # スキル再読み込み
/help             # ヘルプ表示
```

### スキル管理（ターミナル）

```bash
gemini skills list                              # 一覧
gemini skills install <url/path> --scope workspace  # インストール
gemini skills uninstall <name>                  # アンインストール
gemini skills enable <name>                     # 有効化
gemini skills disable <name>                    # 無効化
```

---

## 📚 参考リンク

| リソース | URL |
|---------|-----|
| Core Wallet | https://core.app/download |
| Fuji Faucet | https://build.avax.network/console/primary-network/faucet |
| Remix IDE | https://remix.ethereum.org/ |
| スキルファイル | https://github.com/CobaltSato/react-grid-game-rendering-skill |
| Solidity ベストプラクティス | https://cursor.directory/solidity-development-best-practices |
| Gemini CLI ドキュメント | https://github.com/google-gemini/gemini-cli |
| Cursor Directory | https://cursor.directory/ |

> 💡 **Cursor Directory** は AI コーディングアシスタント向けのプロンプト・ルール集。Solidity、React、Python など様々な言語のベストプラクティスが公開されています。

anthropics公式スキル集
- https://github.com/anthropics/claude-code/tree/main/plugins

gemini extensions
https://geminicli.com/extensions/

Anthropicハッカソン優勝者の設定
- https://github.com/affaan-m/everything-claude-code

🎮 Phaser 2D GameDev (Oak Woods Platformer) + Agent Skills
- https://www.youtube.com/watch?v=QPZCMd5REP8
- https://github.com/chongdashu/phaserjs-oakwoods

---

## 🎨 Bonus: Gemini + frontend-design によるデザイン仕上げ

> 💡 **frontend-design スキル**: プロダクション品質のフロントエンドデザインを生成するためのスキル。カラーパレット、タイポグラフィ、レイアウト、アニメーションなどの設計原則に基づいて UI を洗練させます。

---

### 事前準備: frontend-design スキルの有効化

```bash
# Extension をインストール（既にインストール済みならスキップ）
gemini extensions install https://github.com/ankitchiplunkar/frontend-design

# スキルを有効化
gemini skills enable frontend-design

# 確認
/skills list
```

---

### Gemini にデザイン仕上げを依頼

```
frontend-design スキルを使って、グリッドゲームのUIをプロ品質に仕上げて。

要件:
- Avalanche ブランドカラー（#E84142 レッド、#000000 ブラック）を活用
- グリッドセルにホバーエフェクトを追加
- プレイヤーアイコンにアニメーション（パルス or バウンス）
- ウォレット接続ボタンをモダンなデザインに
- トランザクション状態のローディングインジケーター
- レスポンシブ対応（モバイルでも操作可能）
- ダークモード基調

参照:
- 現在の UI コンポーネント（app/ 配下）
- Avalanche 公式サイトのデザイン: https://www.avax.network/
```

---

### 期待される出力

| 改善項目 | Before | After |
|---------|--------|-------|
| カラー | デフォルト | Avalanche ブランドカラー |
| グリッド | 単純な border | グラデーション + ホバー効果 |
| プレイヤー | 静的な表示 | パルスアニメーション |
| ボタン | 基本的なスタイル | グラス morphism / ネオン効果 |
| 状態表示 | テキストのみ | スピナー + プログレスバー |

---

### デザインのカスタマイズ例

```
# 別のテーマを試す
「サイバーパンク風のネオンテーマに変更して」

# アクセシビリティ強化
「WCAG AA 準拠のコントラスト比を確保して」

# ミニマリスト
「余計な装飾を削除してミニマルなデザインに」
```

---

### Tips

- **段階的に適用**: 一度に全てを変更せず、コンポーネントごとに確認
- **スクリーンショット比較**: 変更前後を比較して意図通りか確認
- **Tailwind CSS との相性**: frontend-design は Tailwind クラスを活用した出力が得意
- **フィードバックループ**: 「もっとコントラストを上げて」など具体的に指示

---

## 📎 付録

---

### 付録 A: Gemini CLI Extensions とは

> 💡 **Extensions（拡張機能）** は Gemini CLI の機能を拡張するアドオンシステムです。お気に入りのツールを接続し、AI コマンドラインをカスタマイズできます。

#### Extensions の種類

| 種類 | 説明 | 例 |
|------|------|-----|
| **Database/MCP Servers** | データベースやデータサービスへの接続 | PostgreSQL, MongoDB |
| **Context Tools** | 専門知識やドキュメントの追加 | ライブラリドキュメント |
| **Skills** | 特定タスクの実行機能 | Web スクレイピング、画像生成、TTS |
| **Terminal Commands** | カスタム CLI コマンド | 独自ワークフロー |
| **Hooks** | 開発ワークフローへの統合 | 自動フォーマット、検証 |

#### インストール方法

```bash
# リポジトリ URL から直接インストール
gemini extensions install [repository-url]

# 例: frontend-design Extension
gemini extensions install https://github.com/ankitchiplunkar/frontend-design
```

#### Extensions エコシステム

公式サイト（https://geminicli.com/extensions/）には **342 以上** のコミュニティ製 Extension が公開されています：

- **クラウドプラットフォーム**: Google Cloud, AWS サービス
- **開発ツール**: GitHub, Kubernetes, Terraform
- **データサービス**: データベース、ベクターストア、API
- **AI/ML 機能**: 画像生成、音声合成
- **生産性ツール**: Slack, Jira, Monday.com

> ⚠️ **注意**: Extensions はサードパーティ開発者によって作成されており、Google による公式検証はありません。セキュリティを確認してから使用してください。

**参照**: https://geminicli.com/extensions/

---

### 付録 B: Anthropic ハッカソン優勝者の Claude Code 設定集

> 💡 2025年9月の **Anthropic x Forum Ventures ハッカソン**で優勝した @affaanmustafa 氏と @DRodriguezFX 氏による、10ヶ月以上の本番運用経験に基づく Claude Code 設定集です。

#### リソース

| リソース | URL |
|---------|-----|
| **GitHub リポジトリ** | https://github.com/affaan-m/everything-claude-code |
| **解説記事（Zenn）** | https://zenn.dev/ttks/articles/a54c7520f827be |

#### ディレクトリ構成（6つの主要コンポーネント）

```
~/.claude/
├── agents/      # 特化型サブエージェント（計画、設計、レビュー、セキュリティ、テスト）
├── skills/      # 再利用可能なワークフロー定義とドメイン知識
├── commands/    # スラッシュコマンド（/tdd, /plan, /code-review など）
├── rules/       # プロジェクト全体のガイドライン（セキュリティ、テスト、Git、パフォーマンス）
├── hooks/       # イベント駆動の自動化（PreToolUse, PostToolUse, Stop）
└── mcp-configs/ # 外部サービス連携（GitHub, Supabase, Vercel, Railway）
```

#### 重要な推奨事項

**1. コンテキストウィンドウ管理**

> ⚠️ MCP を有効化しすぎると、コンテキストウィンドウが **200k → 70k トークン** に縮小する可能性があります。

- **合計**: 20-30 MCP まで設定可能
- **プロジェクト毎**: 10 以下を有効化
- **ツール数**: 80 以下を推奨

**2. エージェント設計**

サブエージェントには必要最小限のツールのみを提供することで、より高速で集中した実行が可能になります。

**3. テスト哲学（TDD）**

```
RED → GREEN → REFACTOR サイクル
80%+ テストカバレッジを必須化
```

**4. セキュリティ要件**

コミット前に以下をチェック：
- [ ] ハードコードされた秘密情報がないか
- [ ] 入力バリデーションが実装されているか
- [ ] エラーハンドリングが適切か
- [ ] 依存関係の脆弱性スキャン

#### 活用のヒント

- **段階的に導入**: 一度に全てをコピーせず、必要なコンポーネントから始める
- **プロジェクトに合わせてカスタマイズ**: ルールやスキルは自分のプロジェクトに最適化
- **MCP の選定**: 本当に必要な MCP のみを有効化してコンテキストを節約

---

### 付録 C: Hooks（フック）システム詳解

> 💡 **Hooks** は Claude Code のツール実行前後に自動実行されるイベント駆動スクリプトです。セキュリティチェック、自動フォーマット、ログ記録などを自動化できます。

#### Hook の種類

| Hook タイプ | 発火タイミング | 主な用途 |
|------------|--------------|---------|
| **PreToolUse** | ツール実行**前** | バリデーション、パラメータ修正、実行ブロック |
| **PostToolUse** | ツール実行**後** | 自動フォーマット、品質チェック、通知 |
| **Notification** | 通知発生時 | 外部サービス連携、ログ記録 |
| **Stop** | セッション終了時 | 最終検証、クリーンアップ |

#### 設定ファイルの場所

```
~/.claude/settings.json       # グローバル設定（全プロジェクト共通）
.claude/settings.json         # プロジェクト固有設定
```

#### 設定例

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Running: $TOOL_INPUT'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
          }
        ]
      }
    ]
  }
}
```

#### 実用的な Hook 例

**1. TypeScript 型チェック（PostToolUse）**
```json
{
  "matcher": "Edit",
  "hooks": [{
    "type": "command",
    "command": "if [[ \"$TOOL_INPUT_FILE_PATH\" == *.ts ]]; then npx tsc --noEmit; fi"
  }]
}
```

**2. console.log 警告（PostToolUse）**
```json
{
  "matcher": "Edit",
  "hooks": [{
    "type": "command",
    "command": "grep -n 'console.log' \"$TOOL_INPUT_FILE_PATH\" && echo '⚠️ console.log found!'"
  }]
}
```

**3. Git Push 前レビュー（PreToolUse）**
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "if echo \"$TOOL_INPUT\" | grep -q 'git push'; then echo '確認: push しますか？'; fi"
  }]
}
```

**4. 長時間コマンドの tmux 提案（PreToolUse）**
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "if echo \"$TOOL_INPUT\" | grep -qE '^(npm|pnpm|yarn|cargo)'; then echo '💡 tmux での実行を推奨'; fi"
  }]
}
```

#### 環境変数

Hook 内で使用できる環境変数：

| 変数 | 説明 |
|------|------|
| `$TOOL_NAME` | 実行されるツール名 |
| `$TOOL_INPUT` | ツールへの入力 |
| `$TOOL_INPUT_FILE_PATH` | 対象ファイルパス（Edit/Write時） |
| `$TOOL_OUTPUT` | ツールの出力（PostToolUse時のみ） |

> ⚠️ **注意**: Hook のエラーはツール実行をブロックする可能性があります。本番環境では慎重にテストしてください。

---

### 付録 D: Agents（エージェント）システム詳解

> 💡 **Agents** は特定タスクに特化したサブエージェントです。メインの Claude とは別のコンテキストで動作し、専門的な作業を効率的に処理します。

#### エージェント vs スキル の違い

| 特性 | エージェント (Agents) | スキル (Skills) |
|------|---------------------|----------------|
| **実行主体** | 別のサブプロセス | メインの Claude |
| **コンテキスト** | 独立（親から継承可能） | 共有 |
| **ツールアクセス** | 制限可能 | 全ツール |
| **用途** | 並列処理、専門タスク | ワークフロー定義 |
| **定義場所** | `~/.claude/agents/` | `~/.claude/skills/` |

#### 利用可能なエージェント例

| エージェント | 用途 | 起動タイミング |
|------------|------|--------------|
| **planner** | 実装計画・要件分析 | 複雑な機能実装時 |
| **architect** | システム設計・アーキテクチャレビュー | 設計判断時 |
| **tdd-guide** | テスト駆動開発ガイダンス | 新機能・バグ修正時 |
| **code-reviewer** | コード品質・セキュリティレビュー | コード作成後 |
| **security-reviewer** | 脆弱性分析 | 認証・API実装時 |
| **build-error-resolver** | ビルドエラー診断・修正 | ビルド失敗時 |
| **e2e-runner** | Playwright E2Eテスト | 重要フロー検証時 |
| **refactor-cleaner** | デッドコード削除 | コードメンテナンス時 |

#### エージェント定義ファイル（例: planner.md）

```markdown
---
name: planner
description: 実装計画を作成し、リスクを特定するエージェント
tools:
  - Read
  - Glob
  - Grep
  - WebFetch
---

# Planner Agent

あなたは実装計画の専門家です。

## 責務
1. 要件を分析し、実装ステップを特定
2. 依存関係とリスクを洗い出し
3. 段階的な実装計画を提案

## 出力フォーマット
- フェーズ分割（各フェーズ 2-3 タスク）
- リスクと対策
- 推奨アプローチ
```

#### エージェント設計のベストプラクティス

**1. 最小限のツール**
```yaml
# 良い例：必要なツールのみ
tools:
  - Read
  - Grep

# 悪い例：全ツール
tools: "*"
```

**2. 明確な責務**
- 1エージェント = 1責務
- 複数タスクは複数エージェントに分割

**3. 並列実行の活用**
```
# 独立したタスクは並列で実行
Task 1: セキュリティレビュー (security-reviewer)
Task 2: パフォーマンス分析 (architect)
Task 3: テストカバレッジ確認 (tdd-guide)
```

**4. コンテキスト継承**

エージェントは親コンテキストを継承できます。詳細な指示を省略し、簡潔なプロンプトで起動可能：

```
「上記のコードをレビューして」
→ code-reviewer エージェントが会話履歴を参照
```

---

### 付録 E: カスタムコマンド（スラッシュコマンド）詳解

> 💡 **カスタムコマンド** は `/` で始まるショートカットです。よく使うワークフローを1コマンドで実行できます。

#### コマンドの配置場所

```
~/.claude/commands/          # グローバル（全プロジェクト共通）
.claude/commands/            # プロジェクト固有
```

#### コマンドファイルの構造

ファイル名がコマンド名になります（例: `tdd.md` → `/tdd`）

```markdown
---
name: tdd
description: テスト駆動開発ワークフローを実行
allowed_tools:
  - Read
  - Write
  - Edit
  - Bash
---

# TDD ワークフロー

以下の手順でテスト駆動開発を実行してください：

## 1. RED（テスト作成）
- 失敗するテストを先に書く
- テストを実行して失敗を確認

## 2. GREEN（実装）
- テストが通る最小限の実装
- テストを実行して成功を確認

## 3. REFACTOR（改善）
- コードの品質を改善
- テストが通ることを再確認

## 4. カバレッジ確認
- 80% 以上のカバレッジを目標
```

#### 主要なコマンド例

| コマンド | 説明 | 使用例 |
|---------|------|-------|
| `/plan` | 実装計画を作成 | `/plan ログイン機能を追加` |
| `/tdd` | テスト駆動開発 | `/tdd calculateTotal関数を実装` |
| `/code-review` | コードレビュー | `/code-review src/auth/` |
| `/commit` | コミット作成 | `/commit` |
| `/e2e` | E2Eテスト生成・実行 | `/e2e ログインフロー` |
| `/build-fix` | ビルドエラー修正 | `/build-fix` |
| `/refactor-clean` | デッドコード削除 | `/refactor-clean` |

#### 引数付きコマンド

コマンドには引数を渡せます：

```bash
# 引数なし
/plan

# 引数あり
/plan ユーザー認証機能をJWTで実装

# 複数引数
/code-review src/components/ --focus security
```

コマンドファイル内で `$ARGUMENTS` として参照：

```markdown
---
name: plan
description: 実装計画を作成
---

# 実装計画

対象: $ARGUMENTS

以下の観点で計画を作成してください...
```

#### 実用的なカスタムコマンド例

**1. /quick-fix（簡易バグ修正）**

```markdown
---
name: quick-fix
description: 簡易バグ修正
---

# Quick Fix

$ARGUMENTS のバグを修正してください。

手順:
1. 問題のコードを特定
2. 最小限の修正を実施
3. 関連テストを実行
4. 修正内容を簡潔に報告
```

**2. /security-check（セキュリティチェック）**

```markdown
---
name: security-check
description: セキュリティ脆弱性をチェック
---

# Security Check

以下の観点でセキュリティをチェック:

- [ ] ハードコードされた秘密情報
- [ ] SQLインジェクション
- [ ] XSS脆弱性
- [ ] 認証・認可の問題
- [ ] 依存関係の脆弱性
```

**3. /explain（コード解説）**

```markdown
---
name: explain
description: コードを解説
---

# コード解説

$ARGUMENTS について、以下の観点で解説:

1. **目的**: このコードは何をしているか
2. **仕組み**: どのように動作するか
3. **依存関係**: 何に依存しているか
4. **改善点**: 潜在的な問題や改善案
```

#### コマンドのベストプラクティス

- **命名**: 動詞で始める（`/check-`, `/create-`, `/fix-`）
- **粒度**: 1コマンド = 1ワークフロー
- **ドキュメント**: description を必ず記載
- **ツール制限**: 必要なツールのみ allowed_tools に指定

---

### 付録 F: Claude Code vs Gemini CLI 機能比較詳細

| 機能カテゴリ | Claude Code | Gemini CLI |
|------------|-------------|------------|
| **コンテキストファイル** | CLAUDE.md | GEMINI.md |
| **カスタムコマンド** | .claude/commands/ | スラッシュコマンド |
| **エージェント** | .claude/agents/ | Extensions |
| **スキル** | .claude/skills/ | .gemini/skills/ |
| **フック** | hooks (settings.json) | Hooks (Extensions) |
| **MCP連携** | 対応 | 対応 |
| **自動承認** | allowedTools 設定 | --yolo オプション |
| **セッション再開** | /resume | --resume latest |

#### 相互運用のヒント

- スキルファイルは **相互変換可能**（Skill-Creator / /skill-create）
- MCP サーバーは **共通** で使用可能
- プロンプトのベストプラクティスは **共通**