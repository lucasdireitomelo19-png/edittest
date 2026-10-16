// Gera quadros de teste: node preview.js saida.jpg '[["cena",t,dur,{p}],...]'
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const lista = JSON.parse(process.argv[3]);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await pg.goto('file://' + path.join(__dirname, 'anim.html')); await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  for (let i = 0; i < lista.length; i++) { const [c, t, d, p] = lista[i];
    const b64 = await pg.evaluate(([c, t, d, p]) => { window.desenhar(c, t, d, p); return document.getElementById('c').toDataURL('image/jpeg', 0.85).split(',')[1]; }, [c, t, d, p || {}]);
    fs.writeFileSync(process.argv[2].replace('.jpg', `_${String(i).padStart(2, '0')}.jpg`), Buffer.from(b64, 'base64')); }
  await b.close();
})();
