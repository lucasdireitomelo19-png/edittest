// Exporta cada slide (.s) de <pasta>/carrossel.html em PNG 1080x1350 (renderiza em 2x e reduz).
// Uso: NODE_PATH=$(npm root -g) node render.js <pasta> [nome-da-saida]
// Saída: output/<nome-da-saida>/01.png, 02.png… (padrão: o nome da pasta)
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pasta = path.resolve(process.argv[2] || '.');
const saida = path.join(__dirname, '../../output', process.argv[3] || path.basename(pasta));

(async () => {
  fs.mkdirSync(saida, { recursive: true });
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(pasta, 'carrossel.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  const slides = await page.locator('.s').count();
  for (let i = 0; i < slides; i++) {
    const png = path.join(saida, String(i + 1).padStart(2, '0') + '.png');
    await page.locator('.s').nth(i).screenshot({ path: png });
    execFileSync('python3', ['-c', 'import sys;from PIL import Image;p=sys.argv[1];Image.open(p).resize((1080,1350),Image.LANCZOS).save(p,optimize=True)', png]);
  }
  console.log(`${slides} slides → ${saida}`);
  await browser.close();
})();
