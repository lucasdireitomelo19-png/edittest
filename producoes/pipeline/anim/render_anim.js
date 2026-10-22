// Renderiza cenas do anim.html em MP4 (1920x1080 ou o tamanho dado, 30 fps).
// Uso: node render_anim.js jobs.json [pagina.html largura altura]   (jobs: [{saida, cena, dur, p}])
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: +(process.argv[4] || 1920), height: +(process.argv[5] || 1080) } });
  await page.goto('file://' + path.join(__dirname, process.argv[3] || 'anim.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.fonts].map(f => f.load())));
  // a chave inclui a data da página: mudar o .html refaz as cenas
  const versao = fs.statSync(path.join(__dirname, process.argv[3] || 'anim.html')).mtimeMs;
  for (const j of jobs) {
    const chave = JSON.stringify(j) + '|' + versao;
    if (fs.existsSync(j.saida) && fs.existsSync(j.saida + '.key') && fs.readFileSync(j.saida + '.key', 'utf8') === chave) continue;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-i', '-',
      '-c:v', 'libx264', '-preset', 'fast', '-crf', '17', '-pix_fmt', 'yuv420p', j.saida]);
    const n = Math.round(j.dur * 30);
    for (let i = 0; i < n; i++) {
      const b64 = await page.evaluate(([c, t, d, p]) => { window.desenhar(c, t, d, p);
        return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, [j.cena, i / 30, j.dur, j.p || {}]);
      if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    fs.writeFileSync(j.saida + '.key', chave);
    console.log('ok', path.basename(j.saida), j.dur + 's');
  }
  await browser.close();
})();
