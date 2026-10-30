// Peças comuns dos vídeos longos horizontais (1920x1080) em Remotion e o motor que monta o vídeo.
// Molde do "Última pessoa": marcador fixo no canto, saturação por capítulo, cartão de capítulo, legenda por frase.
import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {ancoras, Palavra, fr, Titulo, Texto, orto, caminhoGlobo, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from './comum';
import mundo from './videos/dados/mundo.json';

export const LUA = '#e8e4da';
export const NOITE = '#04060d';
export const MUNDO = mundo as number[][][];

// ---------- peças horizontais ----------
export const Etq: React.FC<{t: string; real?: boolean}> = ({t, real}) => (
  <div style={{position: 'absolute', top: 44, right: 50, padding: '7px 18px', borderRadius: 24, background: real ? 'rgba(230,57,70,.9)' : 'rgba(0,0,0,.55)',
    color: real ? '#fff' : '#aab4cc', fontFamily: FONTE, fontSize: 22, letterSpacing: 3}}>{real ? '● ' : ''}{t}</div>
);
export const Tit: React.FC<{t: string; cor?: string; y?: number; s?: number; d?: number}> = ({t, cor, y = 120, s = 84, d = 0}) => <Titulo texto={t} cor={cor} y={y} size={s} delay={d} />;
export const Sub: React.FC<{children: React.ReactNode; y: number; s?: number; cor?: string; d?: number}> = ({children, y, s = 40, cor, d = 8}) => <Texto y={y} size={s} cor={cor} delay={d}>{children}</Texto>;
export const Escuro: React.FC = () => <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.5), transparent 30%, transparent 65%, rgba(0,0,0,.6))'}} />;
export const Clip: React.FC<{src: string; ini?: number; z?: [number, number]; etq: string; t?: string; cor?: string; sub?: string}> = ({src, ini = 0, z = [1.03, 1.12], etq, t, cor, sub}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <OffthreadVideo src={staticFile(src)} startFrom={fr(ini)} muted style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Escuro />
      <Etq t={etq} real={etq.startsWith('IMAGEM REAL')} />
      {t && <Tit t={t} cor={cor} />}
      {sub && <Sub y={250}>{sub}</Sub>}
    </AbsoluteFill>
  );
};
export const Foto: React.FC<{src: string; etq: string; t?: string; z?: [number, number]; pos?: string; sub?: string}> = ({src, etq, t, z = [1.02, 1.12], pos = 'center', sub}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Escuro />
      <Etq t={etq} real />
      {t && <Tit t={t} />}
      {sub && <Sub y={250}>{sub}</Sub>}
    </AbsoluteFill>
  );
};
export const Ceu: React.FC<{n?: number; cor?: string; children?: React.ReactNode}> = ({n = 160, cor = `radial-gradient(circle at 50% 120%, #0c1a33, ${NOITE} 70%)`, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: cor, overflow: 'hidden'}}>
      {Array.from({length: n}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: random('x' + i) * 1920, top: random('y' + i) * 1080, width: 3 + random('s' + i) * 3, height: 3 + random('s' + i) * 3, borderRadius: 3,
          background: '#fff', opacity: (0.3 + 0.7 * random('o' + i)) * (0.75 + 0.25 * Math.sin(f * 0.08 + i))}} />
      ))}
      {children}
    </AbsoluteFill>
  );
};
export const Contorno: React.FC<{x: number; y: number; r: number; o?: number}> = ({x, y, r, o = 1}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: o}}>
    <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,.85)" strokeWidth={5} strokeDasharray="14 14" />
  </svg>
);
export const Disco: React.FC<{x: number; y: number; r: number; cor?: string; o?: number; brilho?: boolean}> = ({x, y, r, cor = LUA, o = 1, brilho = true}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', opacity: o,
    background: `radial-gradient(circle at 38% 35%, #fffdf6, ${cor} 45%, #9a958a)`, boxShadow: brilho ? `0 0 ${r * 0.8}px rgba(255,250,230,.45)` : undefined}} />
);
export const Terra: React.FC<{x?: number; y?: number; R?: number; lon?: number; lat?: number; incl?: number; eixo?: boolean; mar?: string; chao?: string; borda?: string}> = ({x = 960, y = 560, R = 260, lon, lat = 10, incl = 0, eixo, mar = '#0b3a66', chao = '#3f7a56', borda = 'rgba(120,200,255,.5)'}) => {
  const f = useCurrentFrame();
  const g = orto(lon ?? f * 0.7, lat, R, R + 40, R + 40);
  const S = 2 * R + 80;
  return (
    <svg width={S} height={S} style={{position: 'absolute', left: x - S / 2, top: y - S / 2, overflow: 'visible', transform: `rotate(${incl}deg)`}}>
      {eixo && <line x1={R + 40} y1={-30} x2={R + 40} y2={S + 30} stroke={OURO} strokeWidth={6} strokeDasharray="16 10" />}
      <circle cx={R + 40} cy={R + 40} r={R} fill={mar} />
      <path d={caminhoGlobo(MUNDO, g)} fill={chao} />
      <circle cx={R + 40} cy={R + 40} r={R} fill="none" stroke={borda} strokeWidth={5} />
    </svg>
  );
};
export const Barra: React.FC<{x: number; y: number; w: number; h: number; p: number; cor: string; rot: string; val: string}> = ({x, y, w, h, p, cor, rot, val}) => (
  <>
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, background: 'rgba(255,255,255,.08)'}} />
    <div style={{position: 'absolute', left: x, top: y, width: w * p, height: h, borderRadius: 14, background: cor}} />
    <div style={{position: 'absolute', left: x, top: y - 58, fontFamily: FONTE, fontSize: 40, color: '#fff'}}>{rot}</div>
    <div style={{position: 'absolute', left: x + w + 30, top: y + h / 2 - 28, fontFamily: FONTE, fontSize: 50, color: cor}}>{val}</div>
  </>
);
export const Glitch: React.FC<{t: string; cor?: string; s?: number}> = ({t, cor = '#e8f4ff', s = 150}) => {
  const f = useCurrentFrame();
  const g = f < 9;
  return (
    <AbsoluteFill style={{background: NOITE, justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 7}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('gy' + f + i) * 1080, height: 14 + random('gh' + i + f) * 50,
          background: i % 2 ? 'rgba(255,210,63,.3)' : 'rgba(0,220,255,.3)', transform: `translateX(${(random('gx' + i + f) - 0.5) * 300}px)`}} />
      ))}
      <div style={{fontFamily: FONTE, fontSize: s, color: cor, textAlign: 'center', lineHeight: 1.05, padding: '0 80px', transform: `translateX(${g ? (random('d' + f) - 0.5) * 40 : 0}px)`}}>{t}</div>
    </AbsoluteFill>
  );
};
export const Card: React.FC<{topo: string; meio: string; rodape?: string; cor?: string}> = ({topo, meio, rodape, cor = CIANO}) => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      <div style={{position: 'absolute', left: 460, top: 260, width: 1000, padding: '60px 0', borderRadius: 30, background: 'rgba(8,14,30,.92)',
        border: `3px solid ${cor}`, opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 38, color: cor, letterSpacing: 4}}>{topo}</div>
        <div style={{marginTop: 30, fontSize: 86, color: '#fff', lineHeight: 1.05}}>{meio}</div>
        {rodape && <div style={{marginTop: 30, fontSize: 34, color: OURO}}>{rodape}</div>}
      </div>
    </AbsoluteFill>
  );
};
export const Grande: React.FC<{t: string; sub?: string; cor?: string; fundo?: string; s?: number}> = ({t, sub, cor = '#fff', fundo = `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`, s = 200}) => {
  const p = useSpring(0, {damping: 11, mass: 0.6});
  return (
    <AbsoluteFill style={{background: fundo}}>
      <div style={{position: 'absolute', top: 330, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: s, color: cor, letterSpacing: -4,
        transform: `scale(${0.8 + 0.2 * p})`, opacity: p, textShadow: '0 10px 50px rgba(0,0,0,.6)'}}>{t}</div>
      {sub && <Sub y={330 + s + 30} s={46}>{sub}</Sub>}
    </AbsoluteFill>
  );
};
export const Carimbo: React.FC<{alvo: string; d?: number}> = ({alvo, d = 10}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - d, fps: FPS, config: {damping: 9, mass: 0.7}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1414, #050404 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 140, color: '#cfd2da', opacity: 0.85}}>{alvo}</div>
      <div style={{position: 'absolute', top: 470, padding: '18px 60px', border: `12px solid ${VERMELHO}`, borderRadius: 20, fontFamily: FONTE, fontSize: 170, color: VERMELHO,
        transform: `rotate(-12deg) scale(${interpolate(s, [0, 1], [2.4, 1])})`, opacity: s, letterSpacing: 10}}>MITO</div>
    </AbsoluteFill>
  );
};
export const Relogio: React.FC<{x: number; y: number; r: number; rot?: string; h?: string; vel?: number}> = ({x, y, r, rot, h = '24 H', vel = 1}) => {
  const f = useCurrentFrame();
  const a = f * 3 * vel;
  return (
    <>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <circle cx={x} cy={y} r={r} fill="#0e1626" stroke="#cfd8e8" strokeWidth={10} />
        {Array.from({length: 24}, (_, i) => { const b = (i / 24) * Math.PI * 2; return <line key={i} x1={x + Math.cos(b) * r * 0.86} y1={y + Math.sin(b) * r * 0.86} x2={x + Math.cos(b) * r * 0.95} y2={y + Math.sin(b) * r * 0.95} stroke="#cfd8e8" strokeWidth={i % 6 ? 3 : 8} />; })}
        <line x1={x} y1={y} x2={x + Math.cos(((a - 90) * Math.PI) / 180) * r * 0.75} y2={y + Math.sin(((a - 90) * Math.PI) / 180) * r * 0.75} stroke={OURO} strokeWidth={10} strokeLinecap="round" />
        <circle cx={x} cy={y} r={14} fill={OURO} />
      </svg>
      <div style={{position: 'absolute', left: x - 200, width: 400, top: y + r + 24, textAlign: 'center', fontFamily: FONTE, fontSize: 56, color: '#fff'}}>{h}</div>
      {rot && <div style={{position: 'absolute', left: x - 260, width: 520, top: y - r - 80, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: OURO, whiteSpace: 'nowrap'}}>{rot}</div>}
    </>
  );
};


// ---------- motor ----------
export type Cap = {canto: string; sat: number; titulo?: string; sub?: string};
export type ConfigLongo = {
  W: Palavra[];
  plano: [string, React.FC][][];   // por capítulo: frase-âncora → cena
  caps: Cap[];
  audio: string; musica: string;
  volta: number;                    // capítulo do "Mas espera…": canto verde e trilha mais alta
  gap?: number;                     // silêncio (s) antes de cada capítulo, onde entra o cartão
  selos?: {texto: string; de: string; ate: string; linha?: number; cor?: string}[];
  cantos?: {frase: string; texto: string}[];   // troca do canto no meio de um capítulo
  hits?: {frase: string; off?: number; vol?: number}[];
  mudo?: {de: string; ate: string};   // trilha zerada nesse trecho (silêncio total)
  fim: React.FC;
};
export const criarLongo = (c: ConfigLongo) => {
  const {W, plano, caps} = c;
  const FRASES = plano.flat().map(([a]) => a);
  const CENAS = plano.flat().map(([, x]) => x);
  const CAP_DA_CENA = plano.flatMap((cap, k) => cap.map(() => k));
  const CORTES = ancoras(W, FRASES);
  const T = CORTES.map((i, k) => (k === 0 ? 0 : fr(W[i].t) - 1));
  const ULT = W[W.length - 1];
  const FALA = fr(ULT.t + ULT.d + 1.0);
  const FIM = FALA + fr(4);
  const GAP = fr(c.gap ?? 2.2);
  const INICIO_CAP = plano.map((_, k) => T[CAP_DA_CENA.indexOf(k)]);
  const em = (frase: string) => { const i = FRASES.indexOf(frase); if (i < 0) throw new Error('frase fora do plano: ' + frase); return T[i]; };
  const SELOS = (c.selos ?? []).map((s) => ({texto: s.texto, cor: s.cor ?? OURO, linha: s.linha ?? 0, ini: em(s.de), fim: em(s.ate) - (CAP_DA_CENA[FRASES.indexOf(s.ate)] !== CAP_DA_CENA[FRASES.indexOf(s.de)] ? GAP : 0)}));
  const CANTOS = (c.cantos ?? []).map((x) => ({t: em(x.frase), texto: x.texto}));

  const CartaoCap: React.FC<{k: number}> = ({k}) => {
    const f = useCurrentFrame();
    const {durationInFrames: d} = useVideoConfig();
    const cap = caps[k];
    const o = interpolate(f, [0, 6, d - 10, d], [0, 1, 1, 0], clamp);
    const s = spring({frame: f - 4, fps: FPS, config: {damping: 14}});
    return (
      <AbsoluteFill style={{background: NOITE, opacity: o, justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: 420 * s, height: 4, background: OURO, marginBottom: 40}} />
        <div style={{fontFamily: FONTE, fontSize: 130, color: '#fff', letterSpacing: 4, textAlign: 'center'}}>{cap.titulo}</div>
        {cap.sub && <div style={{fontFamily: FONTE, fontSize: 48, color: OURO, marginTop: 20, letterSpacing: 3, opacity: s}}>{cap.sub}</div>}
      </AbsoluteFill>
    );
  };
  // legenda por frase (no máximo ~9 palavras por bloco)
  const BLOCOS = (() => {
    const out: {ini: number; fim: number; txt: string}[] = [];
    let cur: number[] = [];
    const fecha = () => { if (cur.length) out.push({ini: fr(W[cur[0]].t), fim: fr(W[cur[cur.length - 1]].t + W[cur[cur.length - 1]].d) + 6, txt: cur.map((i) => W[i].w).join(' ')}); cur = []; };
    W.forEach((w, i) => {
      if (CORTES.includes(i) && cur.length) fecha();
      cur.push(i);
      const fimFrase = /[.?!…:]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 6) || cur.length >= 9;
      if (fimFrase) fecha();
    });
    fecha();
    out.forEach((b, k) => { if (k < out.length - 1) b.fim = Math.min(b.fim, out[k + 1].ini); });
    return out;
  })();
  const Legenda: React.FC = () => {
    const f = useCurrentFrame();
    const b = BLOCOS.find((x) => f >= x.ini && f < x.fim);
    if (!b) return null;
    return (
      <div style={{position: 'absolute', bottom: 60, left: 160, right: 160, textAlign: 'center'}}>
        <span style={{fontFamily: FONTE, fontSize: 50, color: '#fff', padding: '8px 22px', borderRadius: 12, background: 'rgba(0,0,0,.55)', lineHeight: 1.35,
          boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{b.txt}</span>
      </div>
    );
  };
  const Canto: React.FC = () => {
    const f = useCurrentFrame();
    const k = INICIO_CAP.reduce((acc, t, i) => (f >= t - GAP ? i : acc), 0);
    const extra = CANTOS.filter((x) => f >= x.t && CAP_DA_CENA[T.indexOf(x.t)] === k).pop();
    const volta = k === c.volta;
    return (
      <div style={{position: 'absolute', top: 44, left: 50, padding: '8px 20px', borderRadius: 12, background: 'rgba(0,0,0,.5)', border: `2px solid ${volta ? VERDE : OURO}`,
        fontFamily: FONTE, fontSize: 28, color: volta ? VERDE : OURO, letterSpacing: 3}}>{volta ? '● ' : ''}{extra ? extra.texto : caps[k].canto}</div>
    );
  };
  const Selo: React.FC<{t: string; l: number; cor: string}> = ({t, l, cor}) => (
    <div style={{position: 'absolute', bottom: 150 + l * 56, right: 50, padding: '6px 16px', borderRadius: 10, border: `3px solid ${cor}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 26, color: cor, letterSpacing: 3}}>{t}</div>
  );
  const Entrada: React.FC<{children: React.ReactNode}> = ({children}) => {
    const f = useCurrentFrame();
    const o = interpolate(f, [0, 6], [0, 1], clamp);
    return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
  };
  const Fim = c.fim;
  const V = INICIO_CAP[c.volta];
  const M = c.mudo ? [em(c.mudo.de), em(c.mudo.ate)] : null;
  const somMudo = (f: number) => (M ? interpolate(f, [M[0] - 15, M[0], M[1] - 10, M[1] + 20], [1, 0, 0, 1], clamp) : 1);
  const Video: React.FC = () => (
    <AbsoluteFill style={{background: '#000'}}>
      <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
      {CENAS.map((C, i) => {
        const ini = T[i];
        const fim = i < CENAS.length - 1 ? T[i + 1] : FALA;
        const sat = caps[CAP_DA_CENA[i]].sat;
        return (
          <Sequence key={i} from={ini} durationInFrames={fim - ini}>
            <AbsoluteFill style={{filter: sat < 1 ? `saturate(${sat})` : undefined}}><Entrada><C /></Entrada></AbsoluteFill>
          </Sequence>
        );
      })}
      <Sequence from={FALA} durationInFrames={FIM - FALA}><Fim /></Sequence>
      {INICIO_CAP.slice(1).map((t, k) => <Sequence key={'c' + k} from={t - GAP - 3} durationInFrames={GAP + 22}><CartaoCap k={k + 1} /></Sequence>)}
      <Sequence durationInFrames={FALA}><Canto /></Sequence>
      {SELOS.map((s, i) => <Sequence key={'s' + i} from={s.ini} durationInFrames={s.fim - s.ini}><Selo t={s.texto} l={s.linha} cor={s.cor} /></Sequence>)}
      <Legenda />
      <Audio src={staticFile(c.audio)} />
      <Audio src={staticFile(c.musica)} volume={(f) => interpolate(f, [0, 30, V - GAP, V, FIM - 60, FIM], [0, 0.16, 0.16, 0.24, 0.24, 0], clamp) * somMudo(f)} />
      {INICIO_CAP.slice(1).map((t, k) => <Sequence key={'w' + k} from={t - GAP - 8} durationInFrames={30}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.25} /></Sequence>)}
      {(c.hits ?? []).map((h, i) => <Sequence key={'h' + i} from={em(h.frase) + (h.off ?? 0)}><Audio src={staticFile('sfx/hit.wav')} volume={h.vol ?? 0.4} /></Sequence>)}
      <Sequence from={V}><Audio src={staticFile('sfx/hit.wav')} volume={0.4} /></Sequence>
    </AbsoluteFill>
  );
  return {Video, DURACAO: FIM, T, FRASES};
};
