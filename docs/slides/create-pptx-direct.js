const pptxgen = require('pptxgenjs');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Claude Code';
    pptx.title = 'Claude Code 機能ガイド';

    // Slide 1: Title
    let slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: '1C2833' } });
    slide.addText('Claude Code 機能ガイド', { x: 0.5, y: 2, w: 9, h: 1, fontSize: 42, color: 'FFFFFF', align: 'center', bold: true });
    slide.addText('AI駆動開発のベストプラクティス', { x: 0.5, y: 3.2, w: 9, h: 0.6, fontSize: 24, color: '5DADE2', align: 'center' });
    slide.addText('everything-claude-code のベストプラクティスを取り入れた開発環境', { x: 0.5, y: 4.2, w: 9, h: 0.4, fontSize: 14, color: 'AAB7B8', align: 'center' });

    // Slide 2: Quick Start
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: '1C2833' } });
    slide.addText('クイックスタート', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });
    slide.addText('最初の3つのコマンド', { x: 0.5, y: 1.4, w: 4, h: 0.4, fontSize: 18, color: '1C2833', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 4.2, h: 1.6, fill: { color: '2E4053' }, rectRadius: 0.1 });
    slide.addText([
        { text: '/plan ログイン機能を追加したい\n', options: { color: '5DADE2', fontFace: 'Courier New', fontSize: 11 } },
        { text: '/tdd ユーザー認証を実装\n', options: { color: '5DADE2', fontFace: 'Courier New', fontSize: 11 } },
        { text: '/code-review', options: { color: '5DADE2', fontFace: 'Courier New', fontSize: 11 } }
    ], { x: 0.7, y: 2.1, w: 3.8, h: 1.3 });
    slide.addText('ディレクトリ構成', { x: 5.2, y: 1.4, w: 4, h: 0.4, fontSize: 18, color: '5DADE2', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 1.9, w: 4.2, h: 2.6, fill: { color: '2E4053' }, rectRadius: 0.1 });
    slide.addText([
        { text: '.claude/\n', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } },
        { text: '├── agents/\n', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } },
        { text: '├── commands/\n', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } },
        { text: '├── rules/\n', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } },
        { text: '├── skills/\n', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } },
        { text: '└── settings.local.json', options: { color: 'AAB7B8', fontFace: 'Courier New', fontSize: 10 } }
    ], { x: 5.4, y: 2.1, w: 3.8, h: 2.2 });

    // Slide 3: 5 Concepts
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: '1C2833' } });
    slide.addText('5つの基本概念', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    const concepts = [
        { title: 'スラッシュコマンド', desc: 'よく使う作業のショートカット', ex: '/plan, /tdd, /code-review' },
        { title: 'エージェント', desc: '特定分野の専門家', ex: 'planner, code-reviewer' },
        { title: 'ルール', desc: '常に守られるガイドライン', ex: 'シークレット禁止' }
    ];
    const concepts2 = [
        { title: 'スキル', desc: '深い知識ベース', ex: 'frontend-patterns, tdd-workflow' },
        { title: 'MCP', desc: '外部サービス連携', ex: 'Playwright, Context7' }
    ];

    let yPos = 1.4;
    concepts.forEach((c, i) => {
        const x = 0.5 + i * 3.1;
        slide.addShape(pptx.shapes.RECTANGLE, { x, y: yPos, w: 2.9, h: 1.3, fill: { color: 'FFFFFF' }, line: { color: '5DADE2', width: 2, dashType: 'solid' } });
        slide.addText(c.title, { x: x + 0.1, y: yPos + 0.1, w: 2.7, h: 0.35, fontSize: 12, color: '1C2833', bold: true });
        slide.addText(c.desc, { x: x + 0.1, y: yPos + 0.45, w: 2.7, h: 0.3, fontSize: 9, color: '5D6D7E' });
        slide.addText(c.ex, { x: x + 0.1, y: yPos + 0.8, w: 2.7, h: 0.3, fontSize: 8, color: '5DADE2', fontFace: 'Courier New' });
    });

    yPos = 2.9;
    concepts2.forEach((c, i) => {
        const x = 0.5 + i * 3.1;
        slide.addShape(pptx.shapes.RECTANGLE, { x, y: yPos, w: 2.9, h: 1.3, fill: { color: 'FFFFFF' }, line: { color: '5DADE2', width: 2, dashType: 'solid' } });
        slide.addText(c.title, { x: x + 0.1, y: yPos + 0.1, w: 2.7, h: 0.35, fontSize: 12, color: '1C2833', bold: true });
        slide.addText(c.desc, { x: x + 0.1, y: yPos + 0.45, w: 2.7, h: 0.3, fontSize: 9, color: '5D6D7E' });
        slide.addText(c.ex, { x: x + 0.1, y: yPos + 0.8, w: 2.7, h: 0.3, fontSize: 8, color: '5DADE2', fontFace: 'Courier New' });
    });

    // Warning box
    slide.addShape(pptx.shapes.RECTANGLE, { x: 6.7, y: 2.9, w: 2.9, h: 1.3, fill: { color: '2E4053' }, line: { color: 'F39C12', width: 2 } });
    slide.addText('ポイント', { x: 6.8, y: 3.0, w: 2.7, h: 0.35, fontSize: 12, color: 'F39C12', bold: true });
    slide.addText('MCP は 10個以下に抑える', { x: 6.8, y: 3.4, w: 2.7, h: 0.4, fontSize: 9, color: 'AAB7B8' });

    // Slide 4: TDD
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: '1C2833' } });
    slide.addText('TDD ワークフロー', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    // TDD circles
    const tddSteps = [
        { label: 'RED', color: 'E74C3C', title: 'テストを書く', desc: '失敗することを確認' },
        { label: 'GREEN', color: '27AE60', title: '最小限の実装', desc: 'テストを通す' },
        { label: 'REFACTOR', color: '3498DB', title: 'コードを改善', desc: '品質を上げる' }
    ];
    tddSteps.forEach((step, i) => {
        slide.addShape(pptx.shapes.OVAL, { x: 0.5, y: 1.4 + i * 1.1, w: 0.8, h: 0.8, fill: { color: step.color } });
        slide.addText(step.label, { x: 0.5, y: 1.55 + i * 1.1, w: 0.8, h: 0.5, fontSize: 8, color: 'FFFFFF', align: 'center', bold: true });
        slide.addText(step.title, { x: 1.5, y: 1.45 + i * 1.1, w: 2, h: 0.3, fontSize: 12, color: '1C2833', bold: true });
        slide.addText(step.desc, { x: 1.5, y: 1.75 + i * 1.1, w: 2, h: 0.3, fontSize: 10, color: '5D6D7E' });
    });

    // Code examples
    slide.addText('実践例：-10ボタンの追加', { x: 4.5, y: 1.3, w: 5, h: 0.4, fontSize: 14, color: '1C2833', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 4.5, y: 1.75, w: 5, h: 0.9, fill: { color: '2E4053' }, rectRadius: 0.05 });
    slide.addText('// 1. RED - テストを先に書く\ntest("should decrement by 10", ...)\n→ 失敗（ボタンがない）',
        { x: 4.6, y: 1.8, w: 4.8, h: 0.8, fontSize: 9, color: '5DADE2', fontFace: 'Courier New' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 4.5, y: 2.75, w: 5, h: 0.9, fill: { color: '2E4053' }, rectRadius: 0.05 });
    slide.addText('// 2. GREEN - 実装\nonClick={() => setCount(c => Math.max(0, c-10))}\n→ 成功',
        { x: 4.6, y: 2.8, w: 4.8, h: 0.8, fontSize: 9, color: '5DADE2', fontFace: 'Courier New' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 4.5, y: 3.75, w: 5, h: 0.7, fill: { color: '2E4053' }, rectRadius: 0.05 });
    slide.addText('// 3. REFACTOR - 改善\nセレクタを { exact: true } で厳密化',
        { x: 4.6, y: 3.8, w: 4.8, h: 0.6, fontSize: 9, color: '5DADE2', fontFace: 'Courier New' });

    // Slide 5: Playwright MCP
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: '27AE60' } });
    slide.addText('Playwright MCP', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    slide.addText('ブラウザ自動操作', { x: 0.5, y: 1.4, w: 4.2, h: 0.4, fontSize: 16, color: '1C2833', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 4.2, h: 0.8, fill: { color: 'FFFFFF' }, line: { color: '27AE60', width: 2 } });
    slide.addText('localhost:3000 を開いて、+10ボタンを3回クリックして、値が30になることを確認して',
        { x: 0.6, y: 1.95, w: 4, h: 0.6, fontSize: 10, color: '5D6D7E' });

    const steps = ['browser_navigate でページを開く', 'browser_snapshot で要素を取得', 'browser_click でクリック', '結果を報告'];
    steps.forEach((s, i) => {
        slide.addText(`${i + 1}. ${s}`, { x: 0.5, y: 2.8 + i * 0.35, w: 4.2, h: 0.3, fontSize: 10, color: '27AE60' });
    });

    slide.addText('活用シーン', { x: 5.2, y: 1.4, w: 4, h: 0.4, fontSize: 16, color: '1C2833', bold: true });
    const useCases = ['E2Eテスト生成: /e2e コマンドと連携', 'バグ再現: 問題のある操作を自動実行', '動作確認: 実装後のブラウザ確認'];
    useCases.forEach((uc, i) => {
        slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 1.85 + i * 0.55, w: 4.3, h: 0.45, fill: { color: 'E8F8F5' }, rectRadius: 0.05 });
        slide.addText(uc, { x: 5.3, y: 1.93 + i * 0.55, w: 4.1, h: 0.3, fontSize: 10, color: '1E8449' });
    });

    // Slide 6: Context7 MCP
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: '8E44AD' } });
    slide.addText('Context7 MCP', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    slide.addText('最新ドキュメント検索', { x: 0.5, y: 1.4, w: 4.2, h: 0.4, fontSize: 16, color: '1C2833', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 4.2, h: 0.7, fill: { color: 'FFFFFF' }, line: { color: '8E44AD', width: 2 } });
    slide.addText('ethers.js v6 でコントラクトを呼び出す方法を、Context7 で調べて教えて',
        { x: 0.6, y: 1.95, w: 4, h: 0.5, fontSize: 10, color: '5D6D7E' });

    const c7steps = ['resolve-library-id → /websites/ethers_v6', 'query-docs → 公式ドキュメントから取得', 'v6 の正しい書き方を回答'];
    c7steps.forEach((s, i) => {
        slide.addText(`${i + 1}. ${s}`, { x: 0.5, y: 2.7 + i * 0.35, w: 4.2, h: 0.3, fontSize: 10, color: '8E44AD' });
    });

    // Comparison
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.8, w: 2, h: 0.9, fill: { color: 'F5EEF8' }, rectRadius: 0.05 });
    slide.addText('Context7', { x: 0.6, y: 3.85, w: 1.8, h: 0.3, fontSize: 11, color: '8E44AD', bold: true });
    slide.addText('公式ドキュメントのみ\n高精度', { x: 0.6, y: 4.15, w: 1.8, h: 0.5, fontSize: 9, color: '5D6D7E' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 2.7, y: 3.8, w: 2, h: 0.9, fill: { color: 'EBEDEF' }, rectRadius: 0.05 });
    slide.addText('WebSearch', { x: 2.8, y: 3.85, w: 1.8, h: 0.3, fontSize: 11, color: '5D6D7E', bold: true });
    slide.addText('ブログ、SO等\n古い情報も混在', { x: 2.8, y: 4.15, w: 1.8, h: 0.5, fontSize: 9, color: '5D6D7E' });

    // Code example
    slide.addText('取得結果の例（ethers.js v6）', { x: 5.2, y: 1.4, w: 4, h: 0.4, fontSize: 14, color: '1C2833', bold: true });
    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 1.85, w: 4.3, h: 1.4, fill: { color: '2E4053' }, rectRadius: 0.05 });
    slide.addText('// Read - Provider で OK\nconst contract = new ethers.Contract(\n  address, abi, provider);\nconst balance = await contract.balanceOf(addr);',
        { x: 5.3, y: 1.9, w: 4.1, h: 1.3, fontSize: 9, color: '5DADE2', fontFace: 'Courier New' });

    slide.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 3.4, w: 4.3, h: 1.3, fill: { color: '2E4053' }, rectRadius: 0.05 });
    slide.addText('// Write - Signer が必要\nconst contract = new ethers.Contract(\n  address, abi, signer);\nconst tx = await contract.transfer(to, amount);\nawait tx.wait();',
        { x: 5.3, y: 3.45, w: 4.1, h: 1.2, fontSize: 9, color: '5DADE2', fontFace: 'Courier New' });

    // Slide 7: Best Practices
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: '1C2833' } });
    slide.addText('ベストプラクティス', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    const practices = [
        { title: '1. TDD中心', items: ['/tdd → テスト → 実装', 'テストを先に書いてから実装', '80%+ カバレッジを維持'] },
        { title: '2. エージェント活用', items: ['複雑なタスクは専門家に委任', 'planner, code-reviewer', 'security-reviewer'] },
        { title: '3. MCP は控えめに', items: ['有効化は 10個以下', '多すぎるとコンテキスト縮小', '200k → 70k になる可能性'] },
        { title: '4. Context7 活用', items: ['ライブラリの使い方で迷ったら', '○○を Context7 で調べて', '公式ドキュメントから取得'] }
    ];

    practices.forEach((p, i) => {
        const x = 0.4 + (i % 2) * 4.8;
        const y = 1.1 + Math.floor(i / 2) * 2;
        slide.addShape(pptx.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.8, fill: { color: '2E4053' }, rectRadius: 0.1 });
        slide.addText(p.title, { x: x + 0.15, y: y + 0.1, w: 4.2, h: 0.35, fontSize: 14, color: 'F39C12', bold: true });
        p.items.forEach((item, j) => {
            const isCode = item.includes('/') || item.includes('→') || item.includes('planner') || item.includes('Context7');
            slide.addText(item, { x: x + 0.15, y: y + 0.5 + j * 0.35, w: 4.2, h: 0.3, fontSize: 10, color: isCode ? '5DADE2' : 'AAB7B8', fontFace: isCode ? 'Courier New' : 'Arial' });
        });
    });

    // Slide 8: Works
    slide = pptx.addSlide();
    slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: 'E74C3C' } });
    slide.addText('実践ワーク (work.md)', { x: 0.5, y: 0.3, w: 9, h: 0.6, fontSize: 28, color: 'FFFFFF', bold: true });

    const works = [
        { num: '1', title: '/plan', desc: '実装計画を作成する', done: false },
        { num: '2', title: '/tdd', desc: 'ユニットテストでTDD', done: false },
        { num: '3', title: '/code-review', desc: 'コード品質をチェック', done: false },
        { num: '4', title: 'Playwright + TDD', desc: 'E2Eテストで TDD（実践済み）', done: true },
        { num: '5', title: 'Playwright MCP', desc: 'ブラウザを直接操作（実践済み）', done: true },
        { num: '6', title: 'Context7', desc: '最新ドキュメント検索（実践済み）', done: true }
    ];

    works.forEach((w, i) => {
        const x = 0.5 + (i % 3) * 3.1;
        const y = 1.4 + Math.floor(i / 3) * 1.5;
        const bgColor = w.done ? 'E8F8F5' : 'FFFFFF';
        const borderColor = w.done ? '27AE60' : '3498DB';
        const titleColor = w.done ? '1E8449' : '1C2833';

        slide.addShape(pptx.shapes.RECTANGLE, { x, y, w: 2.9, h: 1.2, fill: { color: bgColor }, line: { color: borderColor, width: 2 } });
        slide.addText(`Work ${w.num}: ${w.title}`, { x: x + 0.1, y: y + 0.15, w: 2.7, h: 0.35, fontSize: 11, color: titleColor, bold: true });
        slide.addText(w.desc, { x: x + 0.1, y: y + 0.55, w: 2.7, h: 0.5, fontSize: 9, color: '5D6D7E' });
    });

    // Save
    const outputPath = path.join(__dirname, '..', 'Claude-Code-Guide.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\n✅ Presentation saved: ${outputPath}`);
}

createPresentation().catch(console.error);
