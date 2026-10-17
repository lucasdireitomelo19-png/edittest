// Renderiza cenas de uma página three.js (que exponha window.desenhar(cena, t, dur, p) e window.pronto)
// em MP4 vertical 1080x1920 a 30 fps. "sub" > 1 faz borrão de movimento (média de subquadros).
// Uso: node render_3d.js jobs.json pagina.html   (jobs: [{saida, cena, dur, p, sub}])
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const pagina = path.join(__dirname, process.argv[3]);
  const versao = fs.statSync(pagina).mtimeMs;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.error('erro na página:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
  await page.goto('file://' + pagina);
  await page.waitForFunction(() => window.pronto === true, null, { timeout: 180000 });
  for (const j of jobs) {
    const chave = JSON.stringify(j) + '|' + versao;
    if (fs.existsSync(j.saida) && fs.existsSync(j.saida + '.key') && fs.readFileSync(j.saida + '.key', 'utf8') === chave) continue;
    const sub = j.sub || 1;
    const vf = sub > 1 ? ['-vf', `tmix=frames=${sub},select='not(mod(n\\,${sub}))',setpts=N/30/TB`, '-r', '30'] : [];
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(30 * sub), '-i', '-', ...vf,
      '-c:v', 'libx264', '-preset', 'fast', '-crf', '17', '-pix_fmt', 'yuv420p', j.saida]);
    const n = Math.round(j.dur * 30 * sub);
    for (let i = 0; i < n; i++) {
      const b64 = await page.evaluate(([c, t, d, p]) => { window.desenhar(c, t, d, p);
        return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, [j.cena, i / (30 * sub), j.dur, j.p || {}]);
      if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    fs.writeFileSync(j.saida + '.key', chave);
    console.log('ok', path.basename(j.saida), j.dur + 's');
  }
  await browser.close();
})();
