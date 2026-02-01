Github Codespaceを開く

Gemini CLI Companionのインストール

npm インストールの完了を待つ

スキルファイルのダウンロード
gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill  --scope workspace

プレイヤーの10x10の座標を保存・取得できるコントラクトを作成
- プレイヤーの位置を初期化する関数
- 1歩移動する関数
ABIは .env.local.example に保存、Solidityは contracts/ に出力。

ガス代を配布

Remixにデプロイ

10x10の簡単な2Dグリッドゲームを作成してください

react-css-grid-game-renderingを有効化

日本語で、docs以下にtask.mdファイルを生成してフェーズを5つに分け、タスクリストを作成
タスク完了次第、task.mdにチェックマークを入れて保存する
フェーズごとにユーザに検収を促してから次のフェーズに進める

プレイヤーをキーボードで移動し、コントラクトに座標を書き込む
参照: PositionTracker.sol / .env.local (コントラクトアドレス・ABI)

gemini skills install https://github.com/buildatscale-tv/gemini-skills --path skills/frontend-design