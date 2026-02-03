const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/user/.claude/plugins/cache/anthropic-agent-skills/example-skills/69c0b1a06741/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Avalanche Game Build Tool Kit';
    pptx.title = 'Avalanche + AI Development Hands-on Demo';
    pptx.subject = 'Gemini CLI を使った Avalanche ゲーム開発';

    const slidesDir = path.join(__dirname, 'slides');
    const slides = [
        'slide01-title.html',
        'slide02-goal.html',
        'slide03-overview.html',
        'slide04-phase0.html',
        'slide05-gemini-cli.html',
        'slide06-phase1.html',
        'slide07-skills-install.html',
        'slide08-phase2.html',
        'slide09-phase3.html',
        'slide10-phase4.html',
        'slide11-phase5.html',
        'slide12-summary.html',
        'slide13-reference.html',
        'slide14-thanks.html'
    ];

    console.log('Creating presentation...');

    for (let i = 0; i < slides.length; i++) {
        const slidePath = path.join(slidesDir, slides[i]);
        console.log(`Processing slide ${i + 1}/${slides.length}: ${slides[i]}`);

        try {
            await html2pptx(slidePath, pptx);
        } catch (error) {
            console.error(`Error processing ${slides[i]}:`, error.message);
            throw error;
        }
    }

    const outputPath = path.join(__dirname, 'avalanche-ai-handson-demo.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved to: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Failed to create presentation:', err);
    process.exit(1);
});
