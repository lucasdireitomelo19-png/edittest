// Renderiza logo e capa em PNG com o Chromium do Playwright.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(() => chromium.launch());
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const url = f => 'file://' + path.join(__dirname, f);

  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto(url('logo.html'));
  await page.locator('#logo').screenshot({ path: 'logo_800.png' });

  await page.setViewportSize({ width: 2560, height: 1440 });
  await page.goto(url('capa.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#capa').screenshot({ path: 'capa_2560x1440.png' });
  await page.goto(url('capa.html#guias'));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('#capa').screenshot({ path: 'capa_guias.png' });

  await browser.close();
})();
