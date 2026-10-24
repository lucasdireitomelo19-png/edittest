// Peças comuns dos Shorts verticais em Remotion (tiradas do Kikai.tsx).
// Cada vídeo só define as cenas e as frases-âncora onde cada cena começa.
import React from 'react';
import {
  AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random,
} from 'remotion';
import {noise2D} from '@remotion/noise';

export type Palavra = {t: number; d: number; w: string};
export const FPS = 30;
export const fr = (s: number) => Math.round(s * FPS);
export const OURO = '#FFD23F';
export const LAVA = '#FF5A1F';
export const CIANO = '#4cc9f0';
export const VERDE = '#3ddc84';
export const VERMELHO = '#ff3b3b';
export const FONTE = 'Monts';
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- sincronia por frase-âncora ----------
// Acha a palavra onde começa cada frase do roteiro. Funciona com qualquer narração
// (edge-tts ou ElevenLabs), mesmo quando a voz junta duas palavras num token só.
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
export const ancoras = (W: Palavra[], frases: string[]) => {
  let texto = '';
  const dono: number[] = [];
  W.forEach((w, i) => {
    const n = norm(w.w);
    if (!n) return;
    if (texto) { texto += ' '; dono.push(i); }
    for (const _ of n) dono.push(i);
    texto += n;
  });
  let de = 0;
  return frases.map((fr0) => {
    const alvo = norm(fr0);
    const p = texto.indexOf(alvo, de);
    if (p < 0) throw new Error('âncora não achada: ' + fr0);
    de = p + 1;
    return dono[p];
  });
};

export const useSpring = (delay = 0, cfg = {damping: 12, mass: 0.6}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: cfg});
};
export const shake = (f: number, amp: number, seed = 'a') =>
  `translate(${noise2D(seed + 'x', f / 9, 0) * amp}px, ${noise2D(seed + 'y', 0, f / 9) * amp}px)`;

export const Titulo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({
  texto, cor = '#fff', y = 260, size = 110, delay = 0,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size,
      color: cor, letterSpacing: -2, textShadow: '0 8px 40px rgba(0,0,0,.7)', padding: '0 40px', boxSizing: 'border-box', lineHeight: 1.05}}>
      {(() => { let n = 0; return texto.split(' ').map((pal, j) => (
        <span key={j} style={{display: 'inline-block', whiteSpace: 'nowrap', margin: '0 0.14em'}}>
          {pal.split('').map((c, i) => {
            const s = spring({frame: f - delay - (n++) * 0.35, fps, config: {damping: 13, mass: 0.4}});
            return <span key={i} style={{display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 60}px) scale(${0.6 + 0.4 * s})`}}>{c}</span>;
          })}
        </span>
      )); })()}
    </div>
  );
};
export const Texto: React.FC<{children: React.ReactNode; y: number; size?: number; cor?: string; delay?: number}> = ({children, y, size = 46, cor = '#cfd8e8', delay = 0}) => {
  const s = useSpring(delay);
  return <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size, color: cor,
    opacity: s, transform: `translateY(${(1 - s) * 30}px)`, letterSpacing: 2, padding: '0 50px', boxSizing: 'border-box', textShadow: '0 4px 20px rgba(0,0,0,.8)'}}>{children}</div>;
};
// etiqueta honesta no topo (IMAGEM REAL / ANIMAÇÃO / ILUSTRAÇÃO / MAPA REAL / SIMULAÇÃO)
export const Etiqueta: React.FC<{texto: string; real?: boolean}> = ({texto, real}) => (
  <div style={{position: 'absolute', top: 150, width: '100%', display: 'flex', justifyContent: 'center'}}>
    <div style={{padding: '8px 22px', borderRadius: 30, background: real ? 'rgba(230,57,70,.92)' : 'rgba(0,0,0,.55)', color: real ? '#fff' : '#aab4cc',
      fontFamily: FONTE, fontSize: 28, letterSpacing: 3}}>{real ? '● ' : ''}{texto}</div>
  </div>
);
export const Real: React.FC<{src: string; ini?: number; zoom?: [number, number]; filtro?: string}> = ({src, ini = 0, zoom = [1.04, 1.14], filtro}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <OffthreadVideo src={staticFile(src)} startFrom={fr(ini)} muted style={{width: '100%', height: '100%', objectFit: 'cover',
        transform: `scale(${interpolate(f, [0, d], zoom)})`, filter: filtro}} />
    </AbsoluteFill>
  );
};
export const Sombra: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.45), transparent 32%, transparent 62%, rgba(0,0,0,.55))'}} />
);

// projeção de Mercator centrada em (lon0, lat0), k px por grau
export const proj = (lon0: number, lat0: number, k: number, cy = 860) => {
  const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * (180 / Math.PI);
  return (lon: number, lat: number): [number, number] => [540 + (lon - lon0) * k, cy - (merc(lat) - merc(lat0)) * k];
};
export const caminho = (polys: number[][][], pr: (lo: number, la: number) => [number, number]) =>
  polys.map((poly) => 'M' + poly.map(([lo, la]) => pr(lo, la).map((v) => v.toFixed(1)).join(' ')).join(' L') + ' Z').join(' ');
// globo ortográfico: devolve [x, y, visível]
export const orto = (lon0: number, lat0: number, R: number, cx = 540, cy = 860) => {
  const r = Math.PI / 180, c0 = Math.cos(lat0 * r), s0 = Math.sin(lat0 * r);
  return (lon: number, lat: number): [number, number, boolean] => {
    const l = (lon - lon0) * r, p = lat * r;
    const x = Math.cos(p) * Math.sin(l);
    const y = c0 * Math.sin(p) - s0 * Math.cos(p) * Math.cos(l);
    const z = s0 * Math.sin(p) + c0 * Math.cos(p) * Math.cos(l);
    return [cx + R * x, cy - R * y, z > 0];
  };
};
export const caminhoGlobo = (polys: number[][][], g: ReturnType<typeof orto>) =>
  polys.map((poly) => {
    const pts = poly.map(([lo, la]) => g(lo, la));
    if (!pts.some((p) => p[2])) return '';
    return 'M' + pts.filter((p) => p[2]).map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L') + ' Z';
  }).join(' ');

export const Pino: React.FC<{x: number; y: number; s: number; cor?: string}> = ({x, y, s, cor = LAVA}) => {
  const f = useCurrentFrame();
  if (s < 0.01) return null;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {[0, 1].map((i) => { const q = ((f * 0.03 + i * 0.5) % 1); return <circle key={i} cx={x} cy={y} r={20 + q * 110} fill="none" stroke={cor} strokeWidth={4} opacity={(1 - q) * s} />; })}
      <circle cx={x} cy={y} r={18 * s} fill={cor} /><circle cx={x} cy={y} r={7 * s} fill="#fff" />
    </svg>
  );
};

export const Contador: React.FC<{ate: number; y: number; size?: number; cor?: string; pre?: string; suf?: string; ini?: number; dur?: number}> = ({
  ate, y, size = 200, cor = '#fff', pre = '', suf = '', ini = 2, dur = 26,
}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [ini, ini + dur], [0, ate], {...clamp, easing: (t) => 1 - (1 - t) ** 3}));
  return <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size, color: cor, letterSpacing: -4,
    fontVariantNumeric: 'tabular-nums', textShadow: '0 8px 40px rgba(0,0,0,.7)'}}>{pre}{n.toLocaleString('pt-BR')}{suf}</div>;
};

export const Glitch: React.FC<{texto: string; size?: number; cor?: string; fundo?: string}> = ({texto, size = 200, cor = '#e8f4ff', fundo = '#05080d'}) => {
  const f = useCurrentFrame();
  const g = f < 9;
  const dx = g ? (random('g' + f) - 0.5) * 50 : 0;
  return (
    <AbsoluteFill style={{background: fundo, justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 7}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('gy' + f + i) * 1920, height: 20 + random('gh' + i + f) * 80,
          background: i % 2 ? 'rgba(255,90,31,.35)' : 'rgba(0,220,255,.3)', transform: `translateX(${(random('gx' + i + f) - 0.5) * 260}px)`}} />
      ))}
      <div style={{fontFamily: FONTE, fontSize: size, color: cor, transform: `translateX(${dx}px)`, textAlign: 'center', lineHeight: 1.05, padding: '0 40px'}}>{texto}</div>
    </AbsoluteFill>
  );
};

export const Final: React.FC<{fundo?: string}> = ({fundo = 'radial-gradient(circle at 50% 50%, #0c1a2e, #000 70%)'}) => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: fundo, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 120, color: '#fff', opacity: s, transform: `scale(${0.8 + 0.2 * s})`, textAlign: 'center'}}>SIGA<br /><span style={{color: OURO}}>PARA MAIS</span></div>
    </AbsoluteFill>
  );
};

// ---------- camadas fixas ----------
const blocos = (W: Palavra[], cortes: number[], fala: number) => {
  const out: {ini: number; fim: number; ws: number[]}[] = [];
  let cur: number[] = [];
  W.forEach((w, i) => {
    const novaCena = cortes.includes(i) && cur.length;
    if (novaCena || cur.length === 3) { out.push({ini: 0, fim: 0, ws: cur}); cur = []; }
    cur.push(i);
  });
  if (cur.length) out.push({ini: 0, fim: 0, ws: cur});
  out.forEach((b, k) => { b.ini = fr(W[b.ws[0]].t); b.fim = k < out.length - 1 ? fr(W[out[k + 1].ws[0]].t) : fala; });
  return out;
};
const Legenda: React.FC<{W: Palavra[]; B: ReturnType<typeof blocos>}> = ({W, B}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = B.find((x) => f >= x.ini && f < x.fim);
  if (!b) return null;
  return (
    <div style={{position: 'absolute', top: 1540, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 76, lineHeight: 1.1,
      textTransform: 'uppercase', padding: '0 60px', boxSizing: 'border-box'}}>
      {b.ws.map((i) => {
        const ini = fr(W[i].t);
        const ativo = f >= ini && f < ini + Math.max(fr(W[i].d), 6);
        const pop = spring({frame: f - ini, fps, config: {damping: 10, mass: 0.4}});
        return (
          <span key={i} style={{display: 'inline-block', margin: '0 16px', color: ativo ? OURO : '#fff',
            transform: `scale(${f >= ini ? 0.85 + 0.15 * pop + (ativo ? 0.08 : 0) : 0.85})`, opacity: f >= ini ? 1 : 0.35,
            textShadow: '0 0 6px #000, 0 6px 0 #000, 0 0 30px rgba(0,0,0,.9)', WebkitTextStroke: '3px #000', paintOrder: 'stroke fill'}}>
            {W[i].w.replace(/[.,:;!?]/g, '')}
          </span>
        );
      })}
    </div>
  );
};
const Grao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={f % 12} /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  );
};
const Entrada: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 5], [1, 0], clamp);
  return <AbsoluteFill style={{transform: `scale(${1 + k * 0.08})`, filter: k > 0 ? `blur(${k * 10}px)` : undefined}}>{children}</AbsoluteFill>;
};
const Flash: React.FC<{em: number}> = ({em}) => {
  const f = useCurrentFrame();
  const o = f >= em && f < em + 3 ? 0.9 - (f - em) * 0.3 : 0;
  return <AbsoluteFill style={{background: '#fff', opacity: o, pointerEvents: 'none'}} />;
};

// Monta o tempo do vídeo: cada cena começa na sua frase-âncora.
export const montar = (W: Palavra[], frases: string[]) => {
  const cortes = ancoras(W, frases);
  const T = cortes.map((i, k) => (k === 0 ? 0 : fr(W[i].t) - 1));
  const fim = W[W.length - 1];
  const FALA = fr(fim.t + fim.d + 0.5);
  return {cortes, T, FALA, FIM: FALA + fr(2.4)};
};

// Short completo: cenas + legenda + grão + sons de corte. `sons` são extras {em (frame), src, volume}.
export const Short: React.FC<{
  W: Palavra[]; tempo: ReturnType<typeof montar>; cenas: React.FC[]; audio?: string; calma: number;
  sons?: {em: number; src: string; volume: number}[]; fundoFinal?: string;
}> = ({W, tempo, cenas, audio, calma, sons = [], fundoFinal}) => {
  const {T, FALA, FIM, cortes} = tempo;
  const B = React.useMemo(() => blocos(W, cortes, FALA), [W, cortes, FALA]);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
      {cenas.map((C, i) => {
        const ini = T[i];
        const fim = i < cenas.length - 1 ? T[i + 1] : FALA;
        return <Sequence key={i} from={ini} durationInFrames={fim - ini}><Entrada><C /></Entrada></Sequence>;
      })}
      <Sequence from={FALA} durationInFrames={FIM - FALA}><Entrada><Final fundo={fundoFinal} /></Entrada></Sequence>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,.6))', pointerEvents: 'none'}} />
      <Grao />
      <Legenda W={W} B={B} />
      <Flash em={T[calma]} />
      {audio && <Audio src={staticFile(audio)} />}
      {T.slice(1).map((t, i) => (i + 1 === calma ? null : (
        <Sequence key={i} from={Math.max(0, t - 6)} durationInFrames={21}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.2} /></Sequence>
      )))}
      <Sequence from={T[calma]}><Audio src={staticFile('sfx/hit.wav')} volume={0.7} /></Sequence>
      {sons.map((s, i) => <Sequence key={'s' + i} from={s.em}><Audio src={staticFile(s.src)} volume={s.volume} /></Sequence>)}
    </AbsoluteFill>
  );
};
