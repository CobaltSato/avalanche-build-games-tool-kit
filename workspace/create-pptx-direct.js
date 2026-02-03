const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Avalanche Game Build Tool Kit';
    pptx.title = 'Avalanche + AI Development Hands-on Demo';
    pptx.subject = 'Gemini CLI を使った Avalanche ゲーム開発';

    // Colors
    const BG_DARK = '1A1A2E';
    const ACCENT_RED = 'E84142';
    const ACCENT_TEAL = '16A085';
    const TEXT_WHITE = 'FFFFFF';
    const TEXT_GRAY = 'CCCCCC';
    const BOX_BG = '252540';

    // Slide 1: Title
    let slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Avalanche + AI Development', { x: 0.5, y: 2, w: 9, h: 0.8, fontSize: 42, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Hands-on Demo', { x: 0.5, y: 2.8, w: 9, h: 0.5, fontSize: 24, color: ACCENT_RED, align: 'center' });
    slide.addText('Gemini CLI を使って、Avalanche ブロックチェーン上で動く\nシンプルな 2D グリッドゲームを作成します', { x: 1, y: 3.5, w: 8, h: 0.8, fontSize: 16, color: TEXT_GRAY, align: 'center' });
    slide.addText('Avalanche Game Build Tool Kit', { x: 0.5, y: 5, w: 9, h: 0.3, fontSize: 12, color: '666666', align: 'center' });

    // Slide 2: Demo Goals
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Demo Goals', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const goals = [
        { num: '1', title: '10x10 Grid Game', desc: 'グリッド上でプレイヤーを表示・移動' },
        { num: '2', title: 'Keyboard Controls', desc: '矢印キーで上下左右に移動' },
        { num: '3', title: 'Blockchain Integration', desc: 'Avalanche Fuji テストネットに座標を保存・取得' }
    ];

    goals.forEach((goal, i) => {
        const y = 1.2 + i * 1.1;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y, w: 0.6, h: 0.6, fill: { color: ACCENT_TEAL }, rectRadius: 0.1 });
        slide.addText(goal.num, { x: 0.5, y, w: 0.6, h: 0.6, fontSize: 20, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(goal.title, { x: 1.3, y, w: 8, h: 0.35, fontSize: 18, color: TEXT_WHITE, bold: true });
        slide.addText(goal.desc, { x: 1.3, y: y + 0.35, w: 8, h: 0.25, fontSize: 14, color: TEXT_GRAY });
    });

    // Slide 3: Demo Flow Overview
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Demo Flow Overview', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const phases = [
        { num: 'Phase 0', title: 'Setup', items: 'Codespaces\nCore Wallet\nGemini CLI', time: '5 min' },
        { num: 'Phase 1', title: 'Skills', items: 'Skill Files\nInstall\nReload', time: '2 min' },
        { num: 'Phase 2', title: 'Contract', items: 'Solidity\nPosition\nTracker', time: '5 min' },
        { num: 'Phase 3', title: 'Deploy', items: 'Test AVAX\nRemix IDE\nFuji', time: '5 min' },
        { num: 'Phase 4', title: 'App', items: 'React Grid\nWallet\nIntegration', time: '10 min' }
    ];

    phases.forEach((phase, i) => {
        const x = 0.3 + i * 1.9;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 1.8, h: 3.6, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: 1.3, w: 1.2, h: 0.35, fill: { color: ACCENT_RED }, rectRadius: 0.17 });
        slide.addText(phase.num, { x: x + 0.3, y: 1.3, w: 1.2, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(phase.title, { x, y: 1.8, w: 1.8, h: 0.4, fontSize: 13, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addText(phase.items, { x, y: 2.3, w: 1.8, h: 1.5, fontSize: 10, color: TEXT_GRAY, align: 'center' });
        slide.addText(phase.time, { x, y: 4.2, w: 1.8, h: 0.3, fontSize: 10, color: ACCENT_TEAL, align: 'center' });
    });

    // Slide 4: Phase 0 - Setup
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 0', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Setup', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const setupSteps = [
        { step: 'Step 0-1', title: 'GitHub Codespaces', desc: 'Code > Codespaces > Create codespace on main', tip: 'ブラウザ上で VS Code が動作' },
        { step: 'Step 0-2', title: 'Core Wallet', desc: 'Chrome 拡張機能をインストール\ncore.app/download', tip: 'Avalanche 公式ウォレット' },
        { step: 'Step 0-3/4', title: 'npm + Gemini CLI', desc: 'npm install を実行\ngemini コマンドで起動', tip: 'Google OAuth で認証' }
    ];

    setupSteps.forEach((s, i) => {
        const x = 0.4 + i * 3.1;
        slide.addShape(pptx.shapes.RECTANGLE, { x, y: 1.0, w: 0.06, h: 3.5, fill: { color: ACCENT_TEAL } });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.15, y: 1.0, w: 2.85, h: 3.5, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addText(s.step, { x: x + 0.25, y: 1.1, w: 2.6, h: 0.3, fontSize: 10, color: ACCENT_TEAL });
        slide.addText(s.title, { x: x + 0.25, y: 1.4, w: 2.6, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true });
        slide.addText(s.desc, { x: x + 0.25, y: 1.9, w: 2.6, h: 1.2, fontSize: 11, color: TEXT_GRAY });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: 3.6, w: 2.6, h: 0.7, fill: { color: BG_DARK }, rectRadius: 0.08 });
        slide.addText(s.tip, { x: x + 0.3, y: 3.7, w: 2.5, h: 0.5, fontSize: 10, color: ACCENT_RED });
    });

    // Slide 5: Gemini CLI
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left column - Auth
    slide.addText('Authentication Methods', { x: 0.4, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 4.5, h: 1.3, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('Google OAuth     無料枠あり、簡単\nAPI Key          モデル選択可能\nVertex AI        エンタープライズ向け', { x: 0.5, y: 1.5, w: 4.3, h: 1.1, fontSize: 11, color: TEXT_GRAY, fontFace: 'Arial' });

    slide.addText('Authentication Flow', { x: 0.4, y: 2.9, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 3.3, w: 0.04, h: 1.4, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.3, w: 4.4, h: 1.4, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('$ gemini\n# マジックリンクをブラウザで開く\n# Google アカウントで認証\n# トークンをペースト', { x: 0.6, y: 3.4, w: 4.2, h: 1.2, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    // Right column - Options
    slide.addText('Useful Options', { x: 5.1, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.1, y: 1.4, w: 0.04, h: 3.3, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 1.4, w: 4.4, h: 3.3, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# モデル指定\ngemini -m gemini-2.5-flash\n\n# 初期プロンプト付き\ngemini -i "説明して"\n\n# 前回セッション再開\ngemini --resume latest\n\n# 全ツール自動承認\ngemini --yolo', { x: 5.3, y: 1.5, w: 4.2, h: 3.1, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    // Slide 6: Phase 1 - Skills Introduction
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 1', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Skills Introduction', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left
    slide.addText('What are Skills?', { x: 0.4, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addText('Gemini CLI に専門知識をオンデマンドで適用する仕組み\n\n特定のタスク（ゲーム開発、API 設計など）に最適化された振る舞いを AI に与えられます', { x: 0.4, y: 1.4, w: 4.5, h: 1.0, fontSize: 12, color: TEXT_GRAY });

    slide.addText('Skill File Structure', { x: 0.4, y: 2.5, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.9, w: 4.5, h: 1.6, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('---\nname: my-skill-name\ndescription: スキルの説明\n---\n# 詳細な指示...', { x: 0.5, y: 3.0, w: 4.3, h: 1.4, fontSize: 11, color: TEXT_GRAY, fontFace: 'Courier New' });

    // Right
    slide.addText('Discovery Priority', { x: 5.1, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.4, w: 4.5, h: 1.5, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const priorities = [
        { badge: 'High', text: '.gemini/skills/ (Workspace)' },
        { badge: 'Mid', text: '~/.gemini/skills/ (User)' },
        { badge: 'Low', text: 'Extension Skills' }
    ];
    priorities.forEach((p, i) => {
        const y = 1.55 + i * 0.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.2, y, w: 0.6, h: 0.3, fill: { color: ACCENT_RED }, rectRadius: 0.15 });
        slide.addText(p.badge, { x: 5.2, y, w: 0.6, h: 0.3, fontSize: 9, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(p.text, { x: 5.9, y, w: 3.6, h: 0.3, fontSize: 11, color: TEXT_GRAY, valign: 'middle' });
    });

    slide.addText('Install Commands', { x: 5.1, y: 3.1, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 3.5, w: 4.5, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('/skills reload\n/skills list', { x: 5.2, y: 3.6, w: 4.3, h: 0.8, fontSize: 12, color: TEXT_GRAY, fontFace: 'Courier New' });

    // Slide 7: Skill Installation
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Skill Installation', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    slide.addText('Method A: Install from URL (Recommended)', { x: 0.4, y: 1.0, w: 9, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.4, w: 0.04, h: 1.2, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.4, w: 9.1, h: 1.2, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('gemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill --scope workspace\n\ngemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/avax-like-frontend-design.skill --scope workspace', { x: 0.6, y: 1.5, w: 8.9, h: 1.0, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    // Two columns below
    slide.addText('Reload Skills', { x: 0.4, y: 2.8, w: 4.5, h: 0.35, fontSize: 14, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 3.15, w: 0.04, h: 1.0, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.15, w: 4.4, h: 1.0, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# Gemini CLI 内で実行\n/skills reload\n/skills list', { x: 0.6, y: 3.25, w: 4.2, h: 0.8, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    slide.addText('Management Commands', { x: 5.1, y: 2.8, w: 4.5, h: 0.35, fontSize: 14, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 3.15, w: 4.5, h: 1.5, fill: { color: BOX_BG }, rectRadius: 0.1 });
    const cmds = ['skills list        スキル一覧', 'skills enable      有効化', 'skills disable     無効化', 'skills uninstall   削除'];
    cmds.forEach((cmd, i) => {
        slide.addText(cmd, { x: 5.2, y: 3.25 + i * 0.35, w: 4.3, h: 0.3, fontSize: 10, color: TEXT_GRAY, fontFace: 'Courier New' });
    });

    // Slide 8: Phase 2 - Smart Contract
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 2', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Smart Contract Creation', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left - Prompt
    slide.addText('Prompt to Gemini', { x: 0.4, y: 1.0, w: 5.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.4, w: 0.06, h: 3.2, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.4, w: 5.4, h: 3.2, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('プレイヤーの 10x10 座標を保存・取得できる\nコントラクトを作成して。\n\n要件:\n- 位置を初期化する関数\n- 1歩移動する関数（上下左右）\n- 座標は 0-9 の範囲に制限\n\n出力先:\n- Solidity: contracts/PositionTracker.sol\n- ABI: .env.local.example に追記', { x: 0.6, y: 1.5, w: 5.2, h: 3.0, fontSize: 11, color: TEXT_GRAY });

    // Right - Tools
    slide.addText('Gemini Tools', { x: 6.1, y: 1.0, w: 3.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 1.4, w: 3.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    const tools = [
        { name: 'read_file', desc: 'ファイル読み取り' },
        { name: 'write_file', desc: 'ファイル作成' },
        { name: 'edit_file', desc: '部分編集' },
        { name: 'run_shell', desc: 'シェル実行' },
        { name: 'web_fetch', desc: 'URL取得' }
    ];
    tools.forEach((t, i) => {
        slide.addText(t.name, { x: 6.2, y: 1.5 + i * 0.32, w: 1.2, h: 0.3, fontSize: 10, color: ACCENT_TEAL, fontFace: 'Courier New' });
        slide.addText(t.desc, { x: 7.5, y: 1.5 + i * 0.32, w: 2.0, h: 0.3, fontSize: 10, color: TEXT_GRAY });
    });

    slide.addText('Output Files', { x: 6.1, y: 3.4, w: 3.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 3.8, w: 3.5, h: 0.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('contracts/PositionTracker.sol\n.env.local.example (ABI)', { x: 6.2, y: 3.9, w: 3.3, h: 0.6, fontSize: 10, color: TEXT_GRAY });

    // Slide 9: Phase 3 - Deploy
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 3', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Test AVAX and Deploy', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const deploySteps = [
        { step: 'Step 3-1', title: 'Get Test AVAX', content: 'Fuji Faucet からテスト AVAX を取得\nウォレットアドレスを入力\nRequest をクリック', code: 'build.avax.network/console/primary-network/faucet' },
        { step: 'Step 3-2', title: 'Deploy with Remix', content: '1. Remix IDE を開く\n2. PositionTracker.sol をコピー\n3. コンパイル (Solidity 0.8.x)\n4. Injected Provider - Core\n5. ネットワーク: Fuji (C-Chain)\n6. デプロイ > アドレスをコピー', code: '' },
        { step: 'Step 3-3', title: 'Environment Setup', content: '.env.local を作成', code: 'cp .env.local.example .env.local\n\nNEXT_PUBLIC_CONTRACT_ADDRESS=0x...' }
    ];

    deploySteps.forEach((s, i) => {
        const x = 0.3 + i * 3.2;
        slide.addShape(pptx.shapes.RECTANGLE, { x, y: 1.0, w: 3.0, h: 0.06, fill: { color: ACCENT_TEAL } });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 3.0, h: 3.6, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addText(s.step, { x: x + 0.1, y: 1.2, w: 2.8, h: 0.3, fontSize: 10, color: ACCENT_TEAL });
        slide.addText(s.title, { x: x + 0.1, y: 1.5, w: 2.8, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true });
        slide.addText(s.content, { x: x + 0.1, y: 2.0, w: 2.8, h: 1.6, fontSize: 10, color: TEXT_GRAY });
        if (s.code) {
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.1, y: 3.7, w: 2.8, h: 0.85, fill: { color: '0D0D1A' }, rectRadius: 0.06 });
            slide.addText(s.code, { x: x + 0.15, y: 3.75, w: 2.7, h: 0.75, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });
        }
    });

    // Slide 10: Phase 4 - App Creation
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 4', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('App Creation', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left - Prompt
    slide.addText('Prompt to Gemini', { x: 0.4, y: 1.0, w: 5.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.4, y: 1.4, w: 0.06, h: 3.3, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.4, w: 5.4, h: 3.3, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('10x10 の 2D グリッドゲームを作成して。\n\n要件:\n- react-css-grid-game-rendering スキルを使用\n- 日本語で docs/task.md にタスクリスト生成（5フェーズ）\n- タスク完了ごとに task.md にチェック\n- フェーズごとにユーザー検収を促す\n- キーボード（矢印キー）でプレイヤー移動\n- 移動時にコントラクトに座標を書き込む\n\n参照ファイル:\n- contracts/PositionTracker.sol\n- .env.local（コントラクトアドレス・ABI）', { x: 0.6, y: 1.5, w: 5.2, h: 3.1, fontSize: 10, color: TEXT_GRAY });

    // Right - Task list
    slide.addText('Generated Task List', { x: 6.1, y: 1.0, w: 3.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 1.4, w: 3.5, h: 3.3, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const taskPhases = [
        { title: 'Phase 1: グリッド表示', tasks: ['10x10 CSS Grid を作成', 'プレイヤーを表示'] },
        { title: 'Phase 2: キーボード操作', tasks: ['矢印キーで移動', '境界チェック (0-9)'] },
        { title: 'Phase 3: コントラクト連携', tasks: ['ウォレット接続', '座標を読み込み'] },
        { title: 'Phase 4: 座標の書き込み', tasks: ['トランザクション送信'] }
    ];

    let ty = 1.5;
    taskPhases.forEach(phase => {
        slide.addText(phase.title, { x: 6.2, y: ty, w: 3.3, h: 0.25, fontSize: 9, color: ACCENT_TEAL, bold: true });
        ty += 0.28;
        phase.tasks.forEach(task => {
            slide.addShape(pptx.shapes.RECTANGLE, { x: 6.25, y: ty + 0.05, w: 0.12, h: 0.12, line: { color: '666666', width: 0.5 } });
            slide.addText(task, { x: 6.45, y: ty, w: 3.1, h: 0.22, fontSize: 9, color: TEXT_GRAY });
            ty += 0.25;
        });
        ty += 0.15;
    });

    // Slide 11: Phase 5 - Testing
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fill: { color: TEXT_WHITE }, rectRadius: 0.2 });
    slide.addText('Phase 5', { x: 0.5, y: 0.2, w: 1.0, h: 0.4, fontSize: 12, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Testing', { x: 1.7, y: 0.2, w: 7, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const testSteps = [
        { num: '1', title: 'Start Dev Server', content: 'npm run dev', desc: '開発サーバーを起動' },
        { num: '2', title: 'Open Browser', content: 'localhost:3000', desc: 'Core Wallet を接続' },
        { num: '3', title: 'Play the Game', content: '矢印キー', desc: 'でプレイヤーを移動\nトランザクションを承認' },
        { num: '4', title: 'Verify', content: '座標が保存', desc: 'ブロックチェーンに\n保存されることを確認' }
    ];

    testSteps.forEach((s, i) => {
        const x = 0.4 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.2, w: 2.2, h: 3.2, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.7, y: 1.4, w: 0.8, h: 0.8, fill: { color: ACCENT_TEAL } });
        slide.addText(s.num, { x: x + 0.7, y: 1.4, w: 0.8, h: 0.8, fontSize: 24, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(s.title, { x, y: 2.4, w: 2.2, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.2, y: 2.9, w: 1.8, h: 0.4, fill: { color: '0D0D1A' }, rectRadius: 0.05 });
        slide.addText(s.content, { x: x + 0.2, y: 2.9, w: 1.8, h: 0.4, fontSize: 11, color: '88FF88', fontFace: 'Courier New', align: 'center', valign: 'middle' });
        slide.addText(s.desc, { x, y: 3.5, w: 2.2, h: 0.8, fontSize: 11, color: TEXT_GRAY, align: 'center' });
    });

    // Slide 12: Summary
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Demo Complete!', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left - What We Built
    slide.addText('What We Built', { x: 0.4, y: 1.0, w: 4.5, h: 0.4, fontSize: 18, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.5, w: 4.5, h: 2.5, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const built = [
        { name: 'PositionTracker.sol', desc: '座標保存コントラクト' },
        { name: 'Grid Game UI', desc: 'React + CSS Grid' },
        { name: 'Wallet Integration', desc: 'Core Wallet + ethers.js' }
    ];
    built.forEach((b, i) => {
        const y = 1.7 + i * 0.7;
        slide.addText(b.name, { x: 0.5, y, w: 2.0, h: 0.3, fontSize: 12, color: ACCENT_TEAL });
        slide.addText(b.desc, { x: 2.6, y, w: 2.2, h: 0.3, fontSize: 12, color: TEXT_GRAY });
        if (i < 2) slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: y + 0.45, w: 4.3, h: 0.01, fill: { color: '333355' } });
    });

    // Right - What We Learned
    slide.addText('What We Learned', { x: 5.1, y: 1.0, w: 4.5, h: 0.4, fontSize: 18, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.5, w: 4.5, h: 2.5, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const learned = [
        'Gemini CLI で AI 駆動開発',
        'Skills で専門知識を適用',
        'Avalanche Fuji でデプロイ',
        'フェーズ分割でタスク管理'
    ];
    learned.forEach((l, i) => {
        const y = 1.7 + i * 0.55;
        slide.addShape(pptx.shapes.OVAL, { x: 5.2, y, w: 0.35, h: 0.35, fill: { color: ACCENT_RED } });
        slide.addText(String(i + 1), { x: 5.2, y, w: 0.35, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(l, { x: 5.65, y, w: 3.8, h: 0.35, fontSize: 12, color: TEXT_GRAY, valign: 'middle' });
    });

    // Slide 13: Quick Reference
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Quick Reference', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Left - Commands
    slide.addText('Gemini CLI Commands', { x: 0.4, y: 1.0, w: 4.5, h: 0.35, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 4.5, h: 1.1, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# Launch\ngemini\ngemini -m gemini-2.5-flash\ngemini --resume latest', { x: 0.5, y: 1.45, w: 4.3, h: 1.0, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.6, w: 4.5, h: 0.8, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# In-session commands\n/skills list\n/skills reload', { x: 0.5, y: 2.65, w: 4.3, h: 0.7, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.5, w: 4.5, h: 1.0, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# Skill management\ngemini skills install <url> --scope workspace\ngemini skills uninstall <name>\ngemini skills enable/disable <name>', { x: 0.5, y: 3.55, w: 4.3, h: 0.9, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    // Right - Links
    slide.addText('Useful Links', { x: 5.1, y: 1.0, w: 4.5, h: 0.35, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.4, w: 4.5, h: 3.1, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const links = [
        { name: 'Core Wallet', url: 'core.app/download' },
        { name: 'Fuji Faucet', url: 'build.avax.network/console/primary-network/faucet' },
        { name: 'Remix IDE', url: 'remix.ethereum.org' },
        { name: 'Skill Files', url: 'github.com/CobaltSato/react-grid-game-rendering-skill' },
        { name: 'Gemini CLI', url: 'github.com/google-gemini/gemini-cli' },
        { name: 'Solidity Best', url: 'cursor.directory/solidity-development-best-practices' }
    ];
    links.forEach((l, i) => {
        const y = 1.55 + i * 0.48;
        slide.addText(l.name, { x: 5.2, y, w: 1.5, h: 0.25, fontSize: 11, color: ACCENT_RED });
        slide.addText(l.url, { x: 5.2, y: y + 0.22, w: 4.3, h: 0.2, fontSize: 8, color: TEXT_GRAY });
        if (i < 5) slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: y + 0.45, w: 4.3, h: 0.01, fill: { color: '333355' } });
    });

    // Slide 14: Thank You
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.44, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Thank You!', { x: 0.5, y: 1.8, w: 9, h: 1.0, fontSize: 48, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Avalanche + AI Development Hands-on', { x: 0.5, y: 2.8, w: 9, h: 0.5, fontSize: 20, color: ACCENT_TEAL, align: 'center' });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 3, y: 3.6, w: 4, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('Questions?\nAvalanche Game Build Tool Kit', { x: 3, y: 3.7, w: 4, h: 0.8, fontSize: 14, color: TEXT_GRAY, align: 'center' });

    // Save
    const outputPath = '/Users/user/avalanche/avalanche-game-build-tool-kit/workspace/avalanche-ai-handson-demo.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
