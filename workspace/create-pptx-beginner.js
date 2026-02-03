const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Avalanche Game Build Tool Kit';
    pptx.title = 'Avalanche + AI Development Hands-on Demo';
    pptx.subject = 'Gemini CLI を使った Avalanche ゲーム開発 - 初心者向け';

    // Colors
    const BG_DARK = '1A1A2E';
    const ACCENT_RED = 'E84142';
    const ACCENT_TEAL = '16A085';
    const ACCENT_YELLOW = 'F1C40F';
    const TEXT_WHITE = 'FFFFFF';
    const TEXT_GRAY = 'CCCCCC';
    const BOX_BG = '252540';
    const TIP_BG = '2D4A3E';

    let slide;

    // ========================================
    // Slide 1: Title
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Avalanche + AI Development', { x: 0.5, y: 1.8, w: 9, h: 0.8, fontSize: 42, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Hands-on Demo', { x: 0.5, y: 2.6, w: 9, h: 0.5, fontSize: 24, color: ACCENT_RED, align: 'center' });
    slide.addText('Gemini CLI を使って、Avalanche ブロックチェーン上で動く\nシンプルな 2D グリッドゲームを作成します', { x: 1, y: 3.3, w: 8, h: 0.8, fontSize: 16, color: TEXT_GRAY, align: 'center' });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 3.2, y: 4.3, w: 3.6, h: 0.5, fill: { color: ACCENT_TEAL }, rectRadius: 0.25 });
    slide.addText('初心者向け', { x: 3.2, y: 4.3, w: 3.6, h: 0.5, fontSize: 16, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Avalanche Game Build Tool Kit', { x: 0.5, y: 5, w: 9, h: 0.3, fontSize: 12, color: '666666', align: 'center' });

    // ========================================
    // Slide 2: What We'll Build (Visual)
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('今日作るもの', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Grid visualization
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.1, w: 4.5, h: 3.5, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('10x10 グリッドゲーム', { x: 0.5, y: 1.2, w: 4.5, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });

    // Draw mini grid
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const x = 1.4 + col * 0.45;
            const y = 1.8 + row * 0.45;
            const isPlayer = row === 2 && col === 2;
            slide.addShape(pptx.shapes.RECTANGLE, {
                x, y, w: 0.4, h: 0.4,
                fill: { color: isPlayer ? ACCENT_RED : '333355' },
                line: { color: '444466', width: 0.5 }
            });
        }
    }
    slide.addText('← → ↑ ↓ で移動', { x: 0.5, y: 4.1, w: 4.5, h: 0.3, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    // Arrow pointing to blockchain
    slide.addShape(pptx.shapes.RIGHT_ARROW, { x: 5.2, y: 2.5, w: 0.8, h: 0.5, fill: { color: ACCENT_TEAL } });

    // Blockchain visualization
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.2, y: 1.1, w: 3.4, h: 3.5, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('Avalanche Blockchain', { x: 6.2, y: 1.2, w: 3.4, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });

    // Blockchain blocks
    for (let i = 0; i < 3; i++) {
        const y = 1.8 + i * 0.7;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.7, y, w: 2.4, h: 0.55, fill: { color: ACCENT_RED }, rectRadius: 0.08 });
        slide.addText(i === 0 ? 'Block #123' : i === 1 ? 'x: 5, y: 3' : 'Tx: 0x...', { x: 6.7, y, w: 2.4, h: 0.55, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        if (i < 2) {
            slide.addShape(pptx.shapes.DOWN_ARROW, { x: 7.7, y: y + 0.5, w: 0.2, h: 0.2, fill: { color: TEXT_GRAY } });
        }
    }
    slide.addText('座標をブロックチェーンに保存！', { x: 6.2, y: 4.1, w: 3.4, h: 0.3, fontSize: 11, color: ACCENT_TEAL, align: 'center' });

    // ========================================
    // Slide 3: What is Gemini CLI?
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI とは？', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Main explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.2, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('Google の Gemini AI をターミナルから直接操作できるコマンドラインツール', { x: 0.5, y: 1.1, w: 9, h: 0.5, fontSize: 16, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('ChatGPT のターミナル版のようなもの。コードの読み書き、コマンド実行まで AI が代行！', { x: 0.5, y: 1.6, w: 9, h: 0.4, fontSize: 13, color: TEXT_GRAY, align: 'center' });

    // Features
    const features = [
        { icon: '📁', title: 'ファイル操作', desc: 'コードの読み書き・編集を\nAI が自動で実行' },
        { icon: '⚡', title: 'コマンド実行', desc: 'npm install など\nシェルコマンドも実行可能' },
        { icon: '🌐', title: 'Web アクセス', desc: 'ドキュメント取得や\nAPI 参照も OK' },
        { icon: '🎯', title: 'スキル機能', desc: '専門知識を追加して\n特定タスクに最適化' }
    ];

    features.forEach((f, i) => {
        const x = 0.4 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 2.4, w: 2.2, h: 2.2, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addText(f.icon, { x, y: 2.5, w: 2.2, h: 0.5, fontSize: 28, align: 'center' });
        slide.addText(f.title, { x, y: 3.0, w: 2.2, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true, align: 'center' });
        slide.addText(f.desc, { x, y: 3.4, w: 2.2, h: 0.9, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    });

    // Tip box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.7, w: 9.2, h: 0.6, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 Claude Code や Cursor と同じ「AIコーディングアシスタント」の仲間です', { x: 0.5, y: 4.8, w: 9, h: 0.4, fontSize: 12, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 4: What is Avalanche?
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Avalanche とは？', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // Main explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('高速・低コスト・エコな次世代ブロックチェーン', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 18, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Ethereum と互換性があり、同じツール（Solidity, ethers.js）が使えます', { x: 0.5, y: 1.5, w: 9, h: 0.35, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    // Comparison
    slide.addText('vs Ethereum', { x: 0.5, y: 2.2, w: 9, h: 0.4, fontSize: 14, color: ACCENT_TEAL, bold: true });

    const comparisons = [
        { label: '処理速度', eth: '12-15 秒', avax: '< 1 秒', winner: 'avax' },
        { label: 'ガス代', eth: '高い ($5-50+)', avax: '安い ($0.01-0.1)', winner: 'avax' },
        { label: '開発ツール', eth: 'Solidity, ethers.js', avax: '同じ！', winner: 'both' }
    ];

    comparisons.forEach((c, i) => {
        const y = 2.7 + i * 0.55;
        slide.addText(c.label, { x: 0.5, y, w: 2.0, h: 0.45, fontSize: 12, color: TEXT_WHITE, valign: 'middle' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 2.6, y, w: 3.0, h: 0.45, fill: { color: '333355' }, rectRadius: 0.05 });
        slide.addText(c.eth, { x: 2.6, y, w: 3.0, h: 0.45, fontSize: 11, color: TEXT_GRAY, align: 'center', valign: 'middle' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.8, y, w: 3.0, h: 0.45, fill: { color: c.winner === 'avax' || c.winner === 'both' ? ACCENT_RED : '333355' }, rectRadius: 0.05 });
        slide.addText(c.avax, { x: 5.8, y, w: 3.0, h: 0.45, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
    });

    // Tip box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.4, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 Fuji テストネット = 無料の練習環境', { x: 0.5, y: 4.5, w: 9, h: 0.35, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('本番と同じ仕組みで、テスト用 AVAX（無料）を使って開発できます', { x: 0.5, y: 4.85, w: 9, h: 0.3, fontSize: 11, color: TEXT_GRAY, align: 'center' });

    // ========================================
    // Slide 5: Demo Flow Overview
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('デモの流れ（約30分）', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    const phases = [
        { num: '0', title: '準備', desc: 'Codespaces\nWallet\nGemini CLI', time: '5分', color: ACCENT_TEAL },
        { num: '1', title: 'スキル導入', desc: 'AIに専門知識\nを追加', time: '2分', color: ACCENT_TEAL },
        { num: '2', title: 'コントラクト', desc: 'AIが Solidity\nコードを生成', time: '5分', color: ACCENT_RED },
        { num: '3', title: 'デプロイ', desc: 'Fuji テストネット\nに公開', time: '5分', color: ACCENT_RED },
        { num: '4', title: 'アプリ作成', desc: 'React ゲーム\nをAIが生成', time: '10分', color: ACCENT_YELLOW }
    ];

    phases.forEach((p, i) => {
        const x = 0.3 + i * 1.95;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 1.85, h: 3.8, fill: { color: BOX_BG }, rectRadius: 0.15 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.55, y: 1.3, w: 0.75, h: 0.75, fill: { color: p.color } });
        slide.addText(p.num, { x: x + 0.55, y: 1.3, w: 0.75, h: 0.75, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(p.title, { x, y: 2.2, w: 1.85, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addText(p.desc, { x, y: 2.7, w: 1.85, h: 1.2, fontSize: 11, color: TEXT_GRAY, align: 'center' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.35, y: 4.3, w: 1.15, h: 0.4, fill: { color: '333355' }, rectRadius: 0.2 });
        slide.addText(p.time, { x: x + 0.35, y: 4.3, w: 1.15, h: 0.4, fontSize: 11, color: ACCENT_TEAL, align: 'center', valign: 'middle' });

        if (i < 4) {
            slide.addShape(pptx.shapes.RIGHT_ARROW, { x: x + 1.85, y: 2.7, w: 0.15, h: 0.3, fill: { color: '666666' } });
        }
    });

    // ========================================
    // Slide 6: Phase 0 - Codespaces
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('GitHub Codespaces', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Explanation box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Codespaces とは？', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 14, color: ACCENT_YELLOW, bold: true });
    slide.addText('GitHub が提供するクラウド開発環境。ブラウザ上で VS Code が動作し、ローカル環境構築が不要！', { x: 0.5, y: 1.45, w: 9, h: 0.4, fontSize: 12, color: TEXT_WHITE });

    // Steps
    slide.addText('手順', { x: 0.4, y: 2.2, w: 9, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });

    const codespacesSteps = [
        { num: '1', text: 'リポジトリページで「Code」ボタンをクリック' },
        { num: '2', text: '「Codespaces」タブを選択' },
        { num: '3', text: '「Create codespace on main」をクリック' },
        { num: '4', text: 'ブラウザで VS Code が起動するまで待つ（1-2分）' }
    ];

    codespacesSteps.forEach((s, i) => {
        const y = 2.7 + i * 0.55;
        slide.addShape(pptx.shapes.OVAL, { x: 0.5, y, w: 0.4, h: 0.4, fill: { color: ACCENT_RED } });
        slide.addText(s.num, { x: 0.5, y, w: 0.4, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(s.text, { x: 1.0, y, w: 8.5, h: 0.4, fontSize: 13, color: TEXT_GRAY, valign: 'middle' });
    });

    // ========================================
    // Slide 7: Phase 0 - Core Wallet
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Core Wallet インストール', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Explanation box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.3, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Core Wallet とは？', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 14, color: ACCENT_YELLOW, bold: true });
    slide.addText('Avalanche 公式ウォレット。MetaMask より Avalanche に最適化されています。', { x: 0.5, y: 1.45, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE });
    slide.addText('C-Chain（EVM互換）と X-Chain/P-Chain の両方に対応！', { x: 0.5, y: 1.8, w: 9, h: 0.35, fontSize: 11, color: TEXT_GRAY });

    // Steps
    slide.addText('インストール手順', { x: 0.4, y: 2.5, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.95, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    const walletSteps = ['1. Chrome ブラウザを開く', '2. core.app/download にアクセス', '3. 「Chrome」を選択', '4. 拡張機能をインストール', '5. ウォレットを作成/復元'];
    walletSteps.forEach((s, i) => {
        slide.addText(s, { x: 0.5, y: 3.05 + i * 0.32, w: 4.3, h: 0.3, fontSize: 11, color: TEXT_GRAY });
    });

    // Why Core?
    slide.addText('MetaMask じゃダメ？', { x: 5.1, y: 2.5, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 2.95, w: 4.5, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('MetaMask でも OK！\n\nでも Core Wallet は：', { x: 5.2, y: 3.05, w: 4.3, h: 0.8, fontSize: 11, color: TEXT_GRAY });
    slide.addText('✓ Avalanche 専用設計\n✓ ネットワーク設定不要\n✓ Subnet 対応', { x: 5.2, y: 3.8, w: 4.3, h: 0.8, fontSize: 11, color: ACCENT_TEAL });

    // ========================================
    // Slide 8: Phase 0 - Gemini CLI Setup
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 0', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('Gemini CLI 認証', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Auth methods
    slide.addText('認証方法は3つ（今回は Google OAuth）', { x: 0.4, y: 1.0, w: 9, h: 0.4, fontSize: 14, color: TEXT_WHITE, bold: true });

    const authMethods = [
        { method: 'Google OAuth', desc: '無料枠あり、最も簡単', cmd: 'gemini → ブラウザ認証', recommended: true },
        { method: 'API Key', desc: 'モデル選択可能', cmd: 'export GEMINI_API_KEY="..."', recommended: false },
        { method: 'Vertex AI', desc: 'エンタープライズ向け', cmd: 'export GOOGLE_GENAI_USE_VERTEXAI=true', recommended: false }
    ];

    authMethods.forEach((a, i) => {
        const y = 1.5 + i * 0.7;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.6, fill: { color: a.recommended ? ACCENT_RED : BOX_BG }, rectRadius: 0.08 });
        if (a.recommended) {
            slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: y + 0.1, w: 1.0, h: 0.4, fill: { color: ACCENT_YELLOW }, rectRadius: 0.2 });
            slide.addText('推奨', { x: 8.5, y: y + 0.1, w: 1.0, h: 0.4, fontSize: 10, color: BG_DARK, bold: true, align: 'center', valign: 'middle' });
        }
        slide.addText(a.method, { x: 0.5, y, w: 2.0, h: 0.6, fontSize: 12, color: TEXT_WHITE, bold: true, valign: 'middle' });
        slide.addText(a.desc, { x: 2.5, y, w: 2.5, h: 0.6, fontSize: 11, color: TEXT_GRAY, valign: 'middle' });
        slide.addText(a.cmd, { x: 5.0, y, w: 3.4, h: 0.6, fontSize: 9, color: '88FF88', fontFace: 'Courier New', valign: 'middle' });
    });

    // Steps
    slide.addText('Google OAuth の手順', { x: 0.4, y: 3.7, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.1, w: 9.2, h: 1.2, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('$ gemini                           # ターミナルで実行\n\n# 1. マジックリンクが表示される → ブラウザで開く\n# 2. Google アカウントで認証\n# 3. トークンをコピー → ターミナルにペースト', { x: 0.5, y: 4.15, w: 9, h: 1.1, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    // ========================================
    // Slide 9: Gemini CLI Options
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI 便利オプション', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Options with explanations
    const options = [
        { cmd: 'gemini', desc: '対話モードで起動', detail: '基本の起動方法' },
        { cmd: 'gemini -m gemini-2.5-flash', desc: 'モデル指定', detail: '高速モデルを使用' },
        { cmd: 'gemini -i "このコードを説明して"', desc: '初期プロンプト付き', detail: '起動と同時に質問' },
        { cmd: 'gemini --resume latest', desc: '前回セッション再開', detail: '途中から続きを' },
        { cmd: 'gemini --yolo', desc: '全ツール自動承認', detail: '確認なしで実行（注意！）' }
    ];

    options.forEach((o, i) => {
        const y = 1.1 + i * 0.75;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.65, fill: { color: BOX_BG }, rectRadius: 0.08 });
        slide.addText(o.cmd, { x: 0.5, y: y + 0.05, w: 5.5, h: 0.3, fontSize: 11, color: '88FF88', fontFace: 'Courier New' });
        slide.addText(o.desc, { x: 6.1, y: y + 0.05, w: 2.0, h: 0.3, fontSize: 11, color: ACCENT_TEAL, bold: true });
        slide.addText(o.detail, { x: 0.5, y: y + 0.35, w: 9, h: 0.25, fontSize: 10, color: TEXT_GRAY });
    });

    // Warning for yolo
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.9, w: 9.2, h: 0.5, fill: { color: '4A2D2D' }, rectRadius: 0.08 });
    slide.addText('⚠️ --yolo は便利ですが、意図しないファイル変更に注意！初心者は通常モード推奨', { x: 0.5, y: 4.95, w: 9, h: 0.4, fontSize: 11, color: ACCENT_YELLOW, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 10: Phase 1 - What are Skills?
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 1', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スキル（Skills）とは？', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Main explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.2, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 スキル = AI に「専門知識」を追加する仕組み', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 15, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('例：ゲーム開発のスキルを追加 → ゲーム開発に詳しい AI に変身！', { x: 0.5, y: 1.55, w: 9, h: 0.5, fontSize: 12, color: TEXT_WHITE, align: 'center' });

    // Analogy
    slide.addText('イメージ', { x: 0.4, y: 2.4, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });

    // Before
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.85, w: 3.8, h: 1.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('スキルなし', { x: 0.4, y: 2.95, w: 3.8, h: 0.35, fontSize: 12, color: TEXT_GRAY, align: 'center' });
    slide.addText('🤖', { x: 0.4, y: 3.3, w: 3.8, h: 0.6, fontSize: 36, align: 'center' });
    slide.addText('「グリッドゲーム？\nえーと、どう作るかな...」', { x: 0.5, y: 3.9, w: 3.6, h: 0.6, fontSize: 10, color: TEXT_GRAY, align: 'center' });

    // Arrow
    slide.addShape(pptx.shapes.RIGHT_ARROW, { x: 4.4, y: 3.5, w: 0.6, h: 0.4, fill: { color: ACCENT_TEAL } });
    slide.addText('+ スキル', { x: 4.3, y: 3.95, w: 0.8, h: 0.3, fontSize: 9, color: ACCENT_TEAL, align: 'center' });

    // After
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 2.85, w: 4.3, h: 1.8, fill: { color: ACCENT_RED }, rectRadius: 0.1 });
    slide.addText('スキルあり', { x: 5.3, y: 2.95, w: 4.3, h: 0.35, fontSize: 12, color: TEXT_WHITE, align: 'center' });
    slide.addText('🎮🤖', { x: 5.3, y: 3.3, w: 4.3, h: 0.6, fontSize: 36, align: 'center' });
    slide.addText('「CSS Grid で10x10作って、\nキーボードイベントで...」', { x: 5.4, y: 3.9, w: 4.1, h: 0.6, fontSize: 10, color: TEXT_WHITE, align: 'center' });

    // Today's skills
    slide.addText('今日使うスキル', { x: 0.4, y: 4.8, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE, bold: true });
    slide.addText('• react-css-grid-game-rendering  →  グリッドゲーム開発の専門知識\n• avax-like-frontend-design  →  Avalanche 風デザインの知識', { x: 0.5, y: 5.1, w: 9, h: 0.5, fontSize: 10, color: TEXT_GRAY });

    // ========================================
    // Slide 11: Skill Installation
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 1', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スキルのインストール', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Install commands
    slide.addText('Step 1: ターミナルで実行（Gemini CLI の外で）', { x: 0.4, y: 1.0, w: 9, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 9.2, h: 1.4, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# グリッドゲームスキル\ngemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/react-css-grid-game-rendering.skill --scope workspace\n\n# Avalanche デザインスキル\ngemini skills install https://github.com/CobaltSato/react-grid-game-rendering-skill/blob/main/avax-like-frontend-design.skill --scope workspace', { x: 0.5, y: 1.5, w: 9, h: 1.2, fontSize: 8, color: '88FF88', fontFace: 'Courier New' });

    // Reload
    slide.addText('Step 2: Gemini CLI 内でリロード', { x: 0.4, y: 3.0, w: 9, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.4, w: 4.4, h: 0.8, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('/skills reload    # スキルを再読み込み\n/skills list      # インストール確認', { x: 0.5, y: 3.5, w: 4.2, h: 0.6, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    // Scope explanation
    slide.addText('--scope workspace って？', { x: 5.0, y: 3.0, w: 4.6, h: 0.35, fontSize: 13, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.0, y: 3.4, w: 4.6, h: 1.5, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('スキルの保存場所を指定\n\nworkspace: このプロジェクトのみ\nuser: 全プロジェクト共通\n\n今回は workspace を使用', { x: 5.1, y: 3.5, w: 4.4, h: 1.3, fontSize: 10, color: TEXT_GRAY });

    // ========================================
    // Slide 12: Phase 2 - Smart Contract
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 2', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('スマートコントラクト作成', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // What is smart contract
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 スマートコントラクト = ブロックチェーン上で動く「自動実行プログラム」', { x: 0.5, y: 1.1, w: 9, h: 0.3, fontSize: 12, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('データの保存・取得ルールを定義。一度デプロイすると改ざん不可能！', { x: 0.5, y: 1.45, w: 9, h: 0.25, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    // Prompt
    slide.addText('Gemini に依頼するプロンプト', { x: 0.4, y: 2.0, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.4, w: 5.5, h: 2.7, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('プレイヤーの 10x10 座標を保存・取得\nできるコントラクトを作成して。\n\n要件:\n- 位置を初期化する関数\n- 1歩移動する関数（上下左右）\n- 座標は 0-9 の範囲に制限\n\n出力先:\n- Solidity: contracts/PositionTracker.sol\n- ABI: .env.local.example に追記', { x: 0.5, y: 2.5, w: 5.3, h: 2.5, fontSize: 11, color: TEXT_GRAY });

    // What Gemini does
    slide.addText('Gemini がやること', { x: 6.1, y: 2.0, w: 3.5, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 6.1, y: 2.4, w: 3.5, h: 2.7, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const geminiDoes = [
        { icon: '📄', text: 'Solidity コードを生成' },
        { icon: '💾', text: 'ファイルに保存' },
        { icon: '📋', text: 'ABI を抽出' },
        { icon: '✅', text: '動作確認' }
    ];
    geminiDoes.forEach((g, i) => {
        slide.addText(g.icon + ' ' + g.text, { x: 6.2, y: 2.6 + i * 0.55, w: 3.3, h: 0.45, fontSize: 12, color: TEXT_WHITE, valign: 'middle' });
    });

    // ========================================
    // Slide 13: Gemini Tools
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('Gemini CLI のツール', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.6, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 Gemini は「ツール」を使ってファイル操作やコマンド実行ができます（実行前に確認あり）', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 12, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    const tools = [
        { name: 'read_file', desc: 'ファイル内容を読み取り', example: '既存コードの理解に使用' },
        { name: 'write_file', desc: 'ファイルを作成・上書き', example: '新規ファイル作成' },
        { name: 'edit_file', desc: 'ファイルの一部を編集', example: '既存コードの修正' },
        { name: 'run_shell_command', desc: 'シェルコマンドを実行', example: 'npm install など' },
        { name: 'web_fetch', desc: 'URL からコンテンツ取得', example: 'ドキュメント参照' }
    ];

    tools.forEach((t, i) => {
        const y = 1.8 + i * 0.65;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.55, fill: { color: BOX_BG }, rectRadius: 0.08 });
        slide.addText(t.name, { x: 0.5, y, w: 2.5, h: 0.55, fontSize: 11, color: ACCENT_TEAL, fontFace: 'Courier New', valign: 'middle', bold: true });
        slide.addText(t.desc, { x: 3.1, y, w: 2.8, h: 0.55, fontSize: 11, color: TEXT_WHITE, valign: 'middle' });
        slide.addText(t.example, { x: 6.0, y, w: 3.5, h: 0.55, fontSize: 10, color: TEXT_GRAY, valign: 'middle' });
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 5.0, w: 9.2, h: 0.45, fill: { color: '4A2D2D' }, rectRadius: 0.08 });
    slide.addText('⚠️ 実行前に「このツールを実行しますか？」と確認が出ます → y で承認', { x: 0.5, y: 5.05, w: 9, h: 0.35, fontSize: 11, color: ACCENT_YELLOW, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 14: Phase 3 - Deploy Intro
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 3', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_RED, bold: true, align: 'center', valign: 'middle' });
    slide.addText('コントラクトをデプロイ', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Fuji explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 1.0, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Fuji テストネット = Avalanche の「練習場」', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('本番（Mainnet）と同じ仕組み。無料のテスト AVAX を使って開発・テストできます', { x: 0.5, y: 1.5, w: 9, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    // 3 steps overview
    const deployOverview = [
        { num: '1', title: 'テスト AVAX 取得', desc: 'Faucet から\n無料で入手' },
        { num: '2', title: 'Remix でデプロイ', desc: 'ブラウザ IDE で\nコンパイル＆デプロイ' },
        { num: '3', title: '環境変数設定', desc: 'アドレスを\nアプリに設定' }
    ];

    deployOverview.forEach((d, i) => {
        const x = 0.5 + i * 3.2;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 2.3, w: 2.9, h: 2.4, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 1.05, y: 2.5, w: 0.8, h: 0.8, fill: { color: ACCENT_RED } });
        slide.addText(d.num, { x: x + 1.05, y: 2.5, w: 0.8, h: 0.8, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(d.title, { x, y: 3.5, w: 2.9, h: 0.4, fontSize: 13, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addText(d.desc, { x, y: 3.95, w: 2.9, h: 0.7, fontSize: 11, color: TEXT_GRAY, align: 'center' });

        if (i < 2) {
            slide.addShape(pptx.shapes.RIGHT_ARROW, { x: x + 2.9, y: 3.3, w: 0.35, h: 0.3, fill: { color: '666666' } });
        }
    });

    // ========================================
    // Slide 15: Phase 3 - Get Test AVAX
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Step 3-1: テスト AVAX を取得', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    // Faucet explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.7, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Faucet（フォーセット）= 蛇口。テスト用の仮想通貨を無料でもらえるサービス', { x: 0.5, y: 1.1, w: 9, h: 0.5, fontSize: 12, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    // Steps
    slide.addText('手順', { x: 0.4, y: 1.9, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });

    const faucetSteps = [
        '1. Faucet ページにアクセス',
        '2. Core Wallet からアドレスをコピー',
        '3. アドレスを入力',
        '4. 「Request 2 AVAX」をクリック',
        '5. 数秒でウォレットに届く！'
    ];

    faucetSteps.forEach((s, i) => {
        slide.addText(s, { x: 0.5, y: 2.3 + i * 0.45, w: 5, h: 0.4, fontSize: 12, color: TEXT_GRAY });
    });

    // URL
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.6, y: 2.3, w: 4.0, h: 1.0, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('Faucet URL', { x: 5.7, y: 2.4, w: 3.8, h: 0.3, fontSize: 10, color: ACCENT_TEAL });
    slide.addText('build.avax.network/console/\nprimary-network/faucet', { x: 5.7, y: 2.7, w: 3.8, h: 0.5, fontSize: 10, color: '88FF88', fontFace: 'Courier New' });

    // Note
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.6, y: 3.5, w: 4.0, h: 1.0, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('📝 AVAX が届かない場合', { x: 5.7, y: 3.6, w: 3.8, h: 0.3, fontSize: 11, color: ACCENT_YELLOW });
    slide.addText('ウォレットアドレスを共有\nいただければ送金します', { x: 5.7, y: 3.9, w: 3.8, h: 0.5, fontSize: 10, color: TEXT_GRAY });

    // ========================================
    // Slide 16: Phase 3 - Remix Deploy
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Step 3-2: Remix でデプロイ', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    // Remix explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.6, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 Remix = ブラウザで動く Solidity 開発環境。インストール不要で即使える！', { x: 0.5, y: 1.1, w: 9, h: 0.4, fontSize: 12, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    // Steps
    const remixSteps = [
        { num: '1', text: 'Remix を開く: remix.ethereum.org' },
        { num: '2', text: 'contracts/PositionTracker.sol の内容をコピー' },
        { num: '3', text: 'Remix で新規ファイル作成 → ペースト' },
        { num: '4', text: '左メニュー「Solidity Compiler」→ Compile' },
        { num: '5', text: '左メニュー「Deploy」→ Environment: Injected Provider - Core' },
        { num: '6', text: 'Core Wallet でネットワークを Fuji に変更' },
        { num: '7', text: '「Deploy」ボタン → トランザクション承認' },
        { num: '8', text: 'デプロイ完了！アドレスをコピー' }
    ];

    remixSteps.forEach((s, i) => {
        const y = 1.75 + i * 0.42;
        slide.addShape(pptx.shapes.OVAL, { x: 0.4, y, w: 0.35, h: 0.35, fill: { color: ACCENT_TEAL } });
        slide.addText(s.num, { x: 0.4, y, w: 0.35, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(s.text, { x: 0.85, y, w: 8.7, h: 0.35, fontSize: 11, color: TEXT_GRAY, valign: 'middle' });
    });

    // ========================================
    // Slide 17: Phase 3 - Environment Setup
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('Step 3-3: 環境変数を設定', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    // Why env vars
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 環境変数 = アプリの設定を外部ファイルに保存する仕組み', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 12, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('コントラクトアドレスをコードに直書きせず、設定ファイルで管理します', { x: 0.5, y: 1.45, w: 9, h: 0.25, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    // Commands
    slide.addText('手順', { x: 0.4, y: 2.0, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });

    slide.addText('1. 設定ファイルをコピー', { x: 0.4, y: 2.4, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.8, w: 9.2, h: 0.5, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('cp .env.local.example .env.local', { x: 0.5, y: 2.85, w: 9, h: 0.4, fontSize: 12, color: '88FF88', fontFace: 'Courier New' });

    slide.addText('2. コントラクトアドレスを設定', { x: 0.4, y: 3.5, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.9, w: 9.2, h: 0.7, fill: { color: '0D0D1A' }, rectRadius: 0.08 });
    slide.addText('# .env.local を編集\nNEXT_PUBLIC_CONTRACT_ADDRESS=0x...（デプロイしたアドレス）', { x: 0.5, y: 3.95, w: 9, h: 0.6, fontSize: 11, color: '88FF88', fontFace: 'Courier New' });

    // Note
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.8, w: 9.2, h: 0.6, fill: { color: BOX_BG }, rectRadius: 0.08 });
    slide.addText('📝 NEXT_PUBLIC_ で始まる変数はブラウザから見えます。秘密情報は入れないこと！', { x: 0.5, y: 4.9, w: 9, h: 0.4, fontSize: 11, color: TEXT_GRAY, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 18: Phase 4 - App Creation
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_YELLOW } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: BG_DARK }, rectRadius: 0.22 });
    slide.addText('Phase 4', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_YELLOW, bold: true, align: 'center', valign: 'middle' });
    slide.addText('アプリ作成（メイン！）', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: BG_DARK, bold: true });

    // Task management explanation
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.0, w: 9.2, h: 0.8, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 タスク管理を AI にさせる', { x: 0.5, y: 1.1, w: 9, h: 0.35, fontSize: 13, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('Gemini にフェーズ分割でタスクを管理させることで、段階的に検収しながら進められます', { x: 0.5, y: 1.45, w: 9, h: 0.25, fontSize: 11, color: TEXT_WHITE, align: 'center' });

    // Prompt
    slide.addText('Gemini に依頼するプロンプト', { x: 0.4, y: 2.0, w: 9, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 2.4, w: 9.2, h: 2.8, fill: { color: BOX_BG }, rectRadius: 0.1 });
    slide.addText('10x10 の 2D グリッドゲームを作成して。\n\n要件:\n- react-css-grid-game-rendering スキルを使用\n- 日本語で docs/task.md にタスクリストを生成（5フェーズ）\n- タスク完了ごとに task.md にチェックを入れる\n- フェーズごとにユーザー検収を促す\n- キーボード（↑↓←→）でプレイヤーを移動\n- 移動時にコントラクトに座標を書き込む\n\n参照ファイル:\n- contracts/PositionTracker.sol\n- .env.local（コントラクトアドレス・ABI）', { x: 0.5, y: 2.5, w: 9, h: 2.6, fontSize: 11, color: TEXT_GRAY });

    // ========================================
    // Slide 19: Generated Task List
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_YELLOW } });
    slide.addText('Gemini が生成するタスクリスト', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: BG_DARK, bold: true });

    // Task list
    const taskPhases = [
        { title: 'Phase 1: グリッド表示', tasks: ['10x10 の CSS Grid を作成', 'プレイヤーを表示'] },
        { title: 'Phase 2: キーボード操作', tasks: ['矢印キーでプレイヤー移動', '境界チェック（0-9 の範囲）'] },
        { title: 'Phase 3: コントラクト連携', tasks: ['ウォレット接続', '座標を読み込み'] },
        { title: 'Phase 4: 座標の書き込み', tasks: ['移動時にトランザクション送信', 'ローディング表示'] },
        { title: 'Phase 5: 仕上げ', tasks: ['デザイン調整（AVAX風）', 'エラーハンドリング'] }
    ];

    taskPhases.forEach((phase, pi) => {
        const x = 0.4 + (pi % 3) * 3.2;
        const y = pi < 3 ? 1.0 : 3.0;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.0, h: 1.7, fill: { color: BOX_BG }, rectRadius: 0.1 });
        slide.addText(phase.title, { x, y: y + 0.1, w: 3.0, h: 0.4, fontSize: 11, color: ACCENT_TEAL, bold: true, align: 'center' });

        phase.tasks.forEach((task, ti) => {
            slide.addShape(pptx.shapes.RECTANGLE, { x: x + 0.15, y: y + 0.55 + ti * 0.4, w: 0.15, h: 0.15, line: { color: TEXT_GRAY, width: 0.5 } });
            slide.addText(task, { x: x + 0.4, y: y + 0.5 + ti * 0.4, w: 2.5, h: 0.35, fontSize: 9, color: TEXT_GRAY });
        });
    });

    // Note
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.9, w: 9.2, h: 0.5, fill: { color: TIP_BG }, rectRadius: 0.08 });
    slide.addText('💡 各フェーズ完了後、Gemini が「確認してください」と促してくれます', { x: 0.5, y: 4.95, w: 9, h: 0.4, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });

    // ========================================
    // Slide 20: Phase 5 - Testing
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fill: { color: TEXT_WHITE }, rectRadius: 0.22 });
    slide.addText('Phase 5', { x: 0.4, y: 0.18, w: 1.2, h: 0.45, fontSize: 14, color: ACCENT_TEAL, bold: true, align: 'center', valign: 'middle' });
    slide.addText('動作確認', { x: 1.8, y: 0.2, w: 7, h: 0.5, fontSize: 26, color: TEXT_WHITE, bold: true });

    // Test steps
    const testSteps = [
        { num: '1', title: '開発サーバー起動', cmd: 'npm run dev', desc: 'ターミナルで実行' },
        { num: '2', title: 'ブラウザで開く', cmd: 'localhost:3000', desc: 'Core Wallet を接続' },
        { num: '3', title: 'ゲームをプレイ', cmd: '← → ↑ ↓', desc: '矢印キーで移動' },
        { num: '4', title: 'トランザクション', cmd: 'Approve', desc: 'Core Wallet で承認' }
    ];

    testSteps.forEach((s, i) => {
        const x = 0.3 + i * 2.4;
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x, y: 1.1, w: 2.2, h: 3.0, fill: { color: BOX_BG }, rectRadius: 0.12 });
        slide.addShape(pptx.shapes.OVAL, { x: x + 0.7, y: 1.3, w: 0.8, h: 0.8, fill: { color: ACCENT_RED } });
        slide.addText(s.num, { x: x + 0.7, y: 1.3, w: 0.8, h: 0.8, fontSize: 24, color: TEXT_WHITE, bold: true, align: 'center', valign: 'middle' });
        slide.addText(s.title, { x, y: 2.3, w: 2.2, h: 0.4, fontSize: 12, color: TEXT_WHITE, bold: true, align: 'center' });
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: x + 0.2, y: 2.8, w: 1.8, h: 0.45, fill: { color: '0D0D1A' }, rectRadius: 0.05 });
        slide.addText(s.cmd, { x: x + 0.2, y: 2.8, w: 1.8, h: 0.45, fontSize: 11, color: '88FF88', fontFace: 'Courier New', align: 'center', valign: 'middle' });
        slide.addText(s.desc, { x, y: 3.4, w: 2.2, h: 0.5, fontSize: 10, color: TEXT_GRAY, align: 'center' });
    });

    // Success message
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.3, w: 9.2, h: 1.0, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('🎉 座標がブロックチェーンに保存されることを確認！', { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 14, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('リロードしても位置が保持されていれば成功です', { x: 0.5, y: 4.8, w: 9, h: 0.35, fontSize: 12, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 21: Demo Complete - Summary
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_TEAL } });
    slide.addText('🎉 デモ完了！', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 28, color: TEXT_WHITE, bold: true });

    // What we built
    slide.addText('作ったもの', { x: 0.4, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.45, w: 4.5, h: 2.2, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const built = [
        { name: 'PositionTracker.sol', desc: '座標を保存するスマートコントラクト' },
        { name: 'Grid Game UI', desc: 'React + CSS Grid のゲーム画面' },
        { name: 'Wallet Integration', desc: 'Core Wallet でブロックチェーン連携' }
    ];
    built.forEach((b, i) => {
        const y = 1.6 + i * 0.65;
        slide.addText(b.name, { x: 0.5, y, w: 4.3, h: 0.3, fontSize: 12, color: ACCENT_TEAL, bold: true });
        slide.addText(b.desc, { x: 0.5, y: y + 0.28, w: 4.3, h: 0.3, fontSize: 10, color: TEXT_GRAY });
    });

    // What we learned
    slide.addText('学んだこと', { x: 5.1, y: 1.0, w: 4.5, h: 0.4, fontSize: 16, color: ACCENT_RED, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.45, w: 4.5, h: 2.2, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const learned = [
        'Gemini CLI で AI 駆動開発',
        'スキルで専門知識を AI に追加',
        'Avalanche Fuji でデプロイ',
        'フェーズ分割でタスク管理'
    ];
    learned.forEach((l, i) => {
        const y = 1.6 + i * 0.5;
        slide.addShape(pptx.shapes.OVAL, { x: 5.2, y, w: 0.35, h: 0.35, fill: { color: ACCENT_RED } });
        slide.addText(String(i + 1), { x: 5.2, y, w: 0.35, h: 0.35, fontSize: 11, color: TEXT_WHITE, align: 'center', valign: 'middle' });
        slide.addText(l, { x: 5.65, y, w: 3.8, h: 0.35, fontSize: 11, color: TEXT_WHITE, valign: 'middle' });
    });

    // Key takeaway
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 3.9, w: 9.2, h: 1.3, fill: { color: TIP_BG }, rectRadius: 0.1 });
    slide.addText('💡 ポイント', { x: 0.5, y: 4.0, w: 9, h: 0.35, fontSize: 14, color: ACCENT_YELLOW, bold: true, align: 'center' });
    slide.addText('AI（Gemini CLI）+ 専門知識（Skills）+ ブロックチェーン（Avalanche）\n= 短時間で本格的な dApp が作れる！', { x: 0.5, y: 4.4, w: 9, h: 0.7, fontSize: 13, color: TEXT_WHITE, align: 'center' });

    // ========================================
    // Slide 22: Quick Reference
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: ACCENT_RED } });
    slide.addText('📚 クイックリファレンス', { x: 0.5, y: 0.2, w: 9, h: 0.5, fontSize: 24, color: TEXT_WHITE, bold: true });

    // Gemini commands
    slide.addText('Gemini CLI コマンド', { x: 0.4, y: 1.0, w: 4.5, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.4, w: 4.5, h: 2.8, fill: { color: '0D0D1A' }, rectRadius: 0.1 });
    slide.addText('# 起動\ngemini\ngemini -m gemini-2.5-flash\ngemini --resume latest\ngemini --yolo\n\n# セッション内コマンド\n/skills list\n/skills reload\n/help\n\n# スキル管理\ngemini skills install <url>\ngemini skills uninstall <name>', { x: 0.5, y: 1.5, w: 4.3, h: 2.6, fontSize: 9, color: '88FF88', fontFace: 'Courier New' });

    // Links
    slide.addText('参考リンク', { x: 5.1, y: 1.0, w: 4.5, h: 0.35, fontSize: 14, color: ACCENT_TEAL, bold: true });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.1, y: 1.4, w: 4.5, h: 2.8, fill: { color: BOX_BG }, rectRadius: 0.1 });

    const links = [
        { name: 'Core Wallet', url: 'core.app/download' },
        { name: 'Fuji Faucet', url: 'build.avax.network/\nconsole/primary-network/faucet' },
        { name: 'Remix IDE', url: 'remix.ethereum.org' },
        { name: 'Gemini CLI', url: 'github.com/google-gemini/\ngemini-cli' },
        { name: 'スキルファイル', url: 'github.com/CobaltSato/\nreact-grid-game-rendering-skill' }
    ];
    links.forEach((l, i) => {
        const y = 1.5 + i * 0.52;
        slide.addText(l.name, { x: 5.2, y, w: 1.8, h: 0.25, fontSize: 10, color: ACCENT_RED, bold: true });
        slide.addText(l.url, { x: 7.0, y, w: 2.5, h: 0.45, fontSize: 8, color: TEXT_GRAY });
    });

    // ========================================
    // Slide 23: Thank You
    // ========================================
    slide = pptx.addSlide();
    slide.background = { color: BG_DARK };
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.44, w: '100%', h: 0.12, fill: { color: ACCENT_RED } });
    slide.addText('Thank You!', { x: 0.5, y: 1.6, w: 9, h: 1.0, fontSize: 48, color: TEXT_WHITE, bold: true, align: 'center' });
    slide.addText('Avalanche + AI Development Hands-on', { x: 0.5, y: 2.6, w: 9, h: 0.5, fontSize: 20, color: ACCENT_TEAL, align: 'center' });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 2.5, y: 3.4, w: 5, h: 1.4, fill: { color: BOX_BG }, rectRadius: 0.15 });
    slide.addText('Questions?', { x: 2.5, y: 3.5, w: 5, h: 0.5, fontSize: 18, color: TEXT_WHITE, align: 'center' });
    slide.addText('Avalanche Game Build Tool Kit\n\n#AvalancheAI #GeminiCLI', { x: 2.5, y: 4.0, w: 5, h: 0.7, fontSize: 12, color: TEXT_GRAY, align: 'center' });

    // Save
    const outputPath = '/Users/user/avalanche/avalanche-game-build-tool-kit/docs/hands-on/avalanche-ai-handson-demo.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
    console.log('Total slides: 23');
}

createPresentation().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
