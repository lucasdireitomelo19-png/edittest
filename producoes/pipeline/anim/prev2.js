// Quadros de teste das animações verticais: node prev2.js pagina.html pasta_saida '[["cena",t,dur,{p}],...]'
const { chromium } = require('/opt/node-tools/node_modules/playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const lista = JSON.parse(process.argv[4]);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.goto('file://' + path.join(__dirname, process.argv[2])); await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  for (const [i, [c, t, d, p]] of lista.entries()) {
    const b64 = await pg.evaluate(([c, t, d, p]) => { window.desenhar(c, t, d, p); return document.getElementById('c').toDataURL('image/jpeg', 0.8).split(',')[1]; }, [c, t, d, p || {}]);
    fs.writeFileSync(path.join(process.argv[3], String(i).padStart(2, '0') + '.jpg'), Buffer.from(b64, 'base64'));
  }
  await b.close();
})();
