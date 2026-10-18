// PNG transparente de uma cena: node png2.js pagina.html cena saida.png '{"p":1}'
const { chromium } = require('/opt/node-tools/node_modules/playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.goto('file://' + path.join(__dirname, process.argv[2]));
  const b64 = await pg.evaluate(([c, p]) => { window.desenhar(c, 0, 1, p); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, [process.argv[3], JSON.parse(process.argv[5] || '{}')]);
  fs.writeFileSync(process.argv[4], Buffer.from(b64, 'base64')); await b.close();
})();
