// Exporta cada slide do carrossel em PNG 1080x1350 (renderiza em 2x e reduz).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const saida = path.join(__dirname, '../../../output/5-maneiras-do-mundo-acabar');

(async () => {
  fs.mkdirSync(saida, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(__dirname, 'carrossel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  const slides = await page.locator('.s').count();
  for (let i = 0; i < slides; i++) {
    const png = path.join(saida, String(i + 1).padStart(2, '0') + '.png');
    await page.locator('.s').nth(i).screenshot({ path: png });
    execFileSync('python3', ['-c', `from PIL import Image;im=Image.open('${png}');im.resize((1080,1350),Image.LANCZOS).save('${png}',optimize=True)`]);
    console.log(png);
  }
  await browser.close();
})();
