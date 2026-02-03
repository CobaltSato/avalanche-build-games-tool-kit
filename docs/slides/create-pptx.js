const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/user/.claude/plugins/cache/anthropic-agent-skills/document-skills/69c0b1a06741/skills/pptx/scripts/html2pptx');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Claude Code';
    pptx.title = 'Claude Code 機能ガイド';
    pptx.subject = 'AI駆動開発のベストプラクティス';

    const slidesDir = __dirname;
    const slides = [
        'slide1-title.html',
        'slide2-quickstart.html',
        'slide3-concepts.html',
        'slide4-tdd.html',
        'slide5-playwright.html',
        'slide6-context7.html',
        'slide7-bestpractices.html',
        'slide8-works.html'
    ];

    for (const slideFile of slides) {
        const htmlPath = path.join(slidesDir, slideFile);
        console.log(`Processing: ${slideFile}`);
        try {
            await html2pptx(htmlPath, pptx);
            console.log(`  ✓ Done`);
        } catch (err) {
            console.error(`  ✗ Error: ${err.message}`);
        }
    }

    const outputPath = path.join(slidesDir, '..', 'Claude-Code-Guide.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved: ${outputPath}`);
}

createPresentation().catch(console.error);
