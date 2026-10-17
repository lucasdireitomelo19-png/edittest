// Renderiza tomadas do rua3d.html em MP4 vertical (1080x1920, 30 fps), com borrão de movimento
// (cada quadro final é a média de 3 subquadros).
// Uso: node render_rua.js jobs.json   (jobs: [{saida, cam, t0, dur}] ; t0 = instante da simulação no início)
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SUB = 3;
(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.error('erro na página:', e.message));
  await page.goto('file://' + path.join(__dirname, 'rua3d.html'));
  await page.waitForFunction(() => window.pronto === true, null, { timeout: 120000 });
  for (const j of jobs) {
    if (fs.existsSync(j.saida) && fs.existsSync(j.saida + '.key') && fs.readFileSync(j.saida + '.key', 'utf8') === JSON.stringify(j)) continue;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(30 * SUB), '-i', '-',
      '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/30/TB`, '-r', '30',
      '-c:v', 'libx264', '-preset', 'fast', '-crf', '17', '-pix_fmt', 'yuv420p', j.saida]);
    const n = Math.round(j.dur * 30 * SUB);
    for (let i = 0; i < n; i++) {
      const b64 = await page.evaluate(([c, t]) => { window.desenhar(c, t);
        return document.getElementById('c').toDataURL('image/jpeg', 0.92).split(',')[1]; }, [j.cam, j.t0 + i / (30 * SUB)]);
      if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    fs.writeFileSync(j.saida + '.key', JSON.stringify(j));
    console.log('ok', path.basename(j.saida), j.dur + 's');
  }
  await browser.close();
})();
