const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await pg.goto('file://' + path.join(__dirname, 'anim.html')); await pg.evaluate(() => document.fonts.ready);
  await pg.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  for (const [nome, l1, l2] of [['thumb_a', 'NÃO FAÇA', 'BARULHO'], ['thumb_b', 'ELES ESTÃO', 'ESCONDIDOS']]) {
    await pg.evaluate(([l1, l2]) => {
      window.desenhar('floresta', 6, 8, { olhos: 0, fogueira: 1 });
      const c = document.getElementById('c').getContext('2d');
      // olhos grandes e próximos
      for (const [x, y, s] of [[1460, 610, 1.9], [1700, 700, 1.3], [1250, 760, 1.0], [300, 690, 1.2], [520, 800, 0.9]])
        for (const ox of [-16 * s, 16 * s]) { const g = c.createRadialGradient(x + ox, y, 0, x + ox, y, 22 * s);
          g.addColorStop(0, 'rgba(255,215,120,1)'); g.addColorStop(0.35, 'rgba(255,140,40,.8)'); g.addColorStop(1, 'rgba(255,90,0,0)'); c.fillStyle = g; c.fillRect(x + ox - 30 * s, y - 30 * s, 60 * s, 60 * s); }
      const g = c.createLinearGradient(0, 0, 1100, 0); g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, 1100, 1080);
      c.textAlign = 'left'; c.textBaseline = 'alphabetic'; c.shadowColor = 'rgba(0,0,0,.9)'; c.shadowBlur = 30;
      c.font = '170px MX'; c.fillStyle = '#fff'; c.fillText(l1, 90, 420);
      c.font = '210px MX'; c.fillStyle = '#ff8a2a'; c.fillText(l2, 90, 640);
      c.shadowBlur = 0; c.font = '54px MM'; c.fillStyle = 'rgba(255,255,255,.9)'; c.fillText('A teoria da Floresta Negra', 96, 760);
    }, [l1, l2]);
    await pg.locator('#c').screenshot({ path: `../v4_floresta/${nome}.png` });
  }
  await b.close(); })();
