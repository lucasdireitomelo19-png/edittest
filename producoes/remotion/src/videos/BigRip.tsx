// Longo POV "Você viu o universo se RASGAR!" (Big Rip, 1920x1080). Roteiro do Roteirista (longo_big_rip.md, v1), aprovado pelo dono em 30/10.
// Mesmo molde e mesmo motor dos longos POV (../longo.tsx). Voz edge-tts Remy Multilingual (decisão do dono de 29/10, sem cota no ElevenLabs).
// Todos os tempos vêm de UM modelo (Caldwell, Kamionkowski e Weinberg 2003, w = −1,5): "HIPÓTESE" em todos os capítulos de T−.
// Reais (NASA, domínio público): supernova (Spitzer), aglomerado SMACS 0723 (Webb), Coma (NASA), Via Láctea (Great Observatories), Sol (SDO),
// Terra (Apollo 17), campo ultraprofundo (Hubble), Andrômeda (GALEX) e radiação de fundo (Planck, ESA/NASA). Mapa do DESI: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import {NOITE, Etq, Tit, Sub, Foto, Ceu, Terra, Barra, Glitch, Card, Grande, Relogio, criarLongo, Cap} from '../longo';
import palavras from './bigrip.palavras.json';

const W = palavras as Palavra[];
const ROXO = '#a98bff';
const C = 'CENÁRIO w = −1,5';

const CAPS: Cap[] = [
  {canto: C, sat: 1},
  {canto: 'HOJE', sat: 1, titulo: 'HOJE', sub: 'O UNIVERSO ACELERA'},
  {canto: C + ' · T−20 BI', sat: 0.85, titulo: 'T−20 BILHÕES DE ANOS', sub: 'A FORÇA QUE CRESCE'},
  {canto: C + ' · T−1 BI', sat: 0.7, titulo: 'T−1 BILHÃO DE ANOS', sub: 'O CÉU ESVAZIA'},
  {canto: C + ' · T−60 MI', sat: 0.55, titulo: 'T−60 MILHÕES DE ANOS', sub: 'A NOSSA GALÁXIA'},
  {canto: C + ' · T−3 MESES', sat: 0.45, titulo: 'T−3 MESES', sub: 'A TERRA SE SOLTA DO SOL'},
  {canto: C + ' · T−30 MIN', sat: 0.35, titulo: 'T−30 MINUTOS', sub: 'A TERRA SE DESFAZ'},
  {canto: C + ' · T−10⁻¹⁹ S', sat: 0.25, titulo: 'T−10⁻¹⁹ SEGUNDO', sub: 'OS SEUS ÁTOMOS'},
  {canto: C + ' · T−0', sat: 0.15, titulo: 'T−0', sub: ''},
  {canto: 'HOJE · MEDINDO w', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const Bola: React.FC<{x: number; y: number; r: number; bg: string; brilho?: string; o?: number}> = ({x, y, r, bg, brilho, o = 1}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: bg, opacity: o, boxShadow: brilho ? `0 0 ${r * 0.7}px ${brilho}` : undefined}} />
);
const SOL = 'radial-gradient(circle at 45% 40%, #fffbe0, #ffd34a 45%, #ff9a1a 80%)';
// galáxias de desenho: k > 1 afasta do centro, fora apaga uma fração, estica alonga na direção do afastamento
const Galaxias: React.FC<{k?: number; fora?: number; estica?: number; n?: number}> = ({k = 1, fora = 0, estica = 0, n = 70}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => {
      const x0 = random('gx' + i) * 1920 - 960, y0 = random('gy' + i) * 1080 - 540, r = 8 + random('gr' + i) * 20;
      if (random('gf' + i) < fora) return null;
      const x = 960 + x0 * k, y = 540 + y0 * k, ang = (Math.atan2(y0, x0) * 180) / Math.PI;
      return <ellipse key={i} cx={x} cy={y} rx={r * (1 + estica * 3)} ry={r * 0.45} fill={random('gc' + i) > 0.5 ? '#ffd8a0' : '#b8c8ff'} opacity={0.85}
        transform={`rotate(${estica > 0 ? ang : random('ga' + i) * 180} ${x} ${y})`} style={{filter: 'blur(1.5px)'}} />;
    })}
  </svg>
);
// foto real que se desfaz em pedaços (efeito): p de 0 a 1
const Estilhaco: React.FC<{src: string; p: number; cols?: number; rows?: number; fit?: 'cover' | 'contain'}> = ({src, p, cols = 12, rows = 7, fit = 'cover'}) => {
  const tw = 1920 / cols, th = 1080 / rows;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      {Array.from({length: cols * rows}, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const cx = c * tw + tw / 2 - 960, cy = r * th + th / 2 - 540;
        const v = 0.6 + random('v' + i) * 1.2;
        const dx = cx * p * v * 1.4, dy = cy * p * v * 1.4, rot = (random('rt' + i) - 0.5) * 60 * p;
        return (
          <div key={i} style={{position: 'absolute', left: c * tw, top: r * th, width: tw + 1, height: th + 1, overflow: 'hidden', opacity: 1 - p * 0.7,
            transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`}}>
            <Img src={staticFile('bigrip/' + src)} style={{position: 'absolute', left: -c * tw, top: -r * th, width: 1920, height: 1080, objectFit: fit}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
// rachaduras brancas com luz (o "rasgo")
const Rachas: React.FC<{p: number; cx?: number; cy?: number; esc?: number}> = ({p, cx = 960, cy = 540, esc = 1}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: 9}, (_, i) => {
      const a0 = (i / 9) * Math.PI * 2 + random('ra' + i);
      const pts = Array.from({length: 7}, (_, k) => {
        const rr = k * 70 * esc * p, a = a0 + (random('rj' + i + k) - 0.5) * 0.6;
        return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
      }).join(' ');
      return <polyline key={i} points={pts} fill="none" stroke="#fff" strokeWidth={6 + 4 * p} style={{filter: 'drop-shadow(0 0 14px #fff) drop-shadow(0 0 30px #cfe6ff)'}} />;
    })}
  </svg>
);
const TerraFoto: React.FC<{x: number; y: number; R: number; filtro?: string}> = ({x, y, R, filtro}) => {
  const E = (2 * R) / 0.666;   // o disco ocupa 66,6% da foto da Apollo 17
  return <Img src={staticFile('bigrip/terra.jpg')} style={{position: 'absolute', left: x - E * 0.501, top: y - E * 0.508, width: E, height: E, clipPath: `circle(${R}px at ${E * 0.501}px ${E * 0.508}px)`, filter: filtro}} />;
};
const Selo2: React.FC<{t: string; cor?: string}> = ({t, cor = OURO}) => (
  <div style={{position: 'absolute', top: 44, right: 50, padding: '7px 18px', borderRadius: 24, border: `2px solid ${cor}`, background: 'rgba(0,0,0,.55)', color: cor, fontFamily: FONTE, fontSize: 22, letterSpacing: 3}}>{t}</div>
);
// gráfico "força da energia escura × tempo"
const Curva: React.FC<{modo: 'normal' | 'fantasma' | 'infinita'; t: string; cor?: string}> = ({modo, t, cor = ROXO}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 60], [0, 1], clamp);
  const pts = Array.from({length: 60}, (_, i) => {
    const u = (i / 59) * p;
    const y = modo === 'normal' ? 380 + 420 * u ** 0.5 : modo === 'fantasma' ? 800 - 300 * u ** 2 : 800 - Math.min(560, 40 / Math.max(0.02, 1.05 - u) - 38);
    return `${360 + u * 1200},${y}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #12162a, ${NOITE} 75%)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M360 260 V820 H1600" stroke="#5a6478" strokeWidth={5} fill="none" />
        {modo === 'infinita' && <line x1={1620} y1={240} x2={1620} y2={820} stroke={VERMELHO} strokeWidth={4} strokeDasharray="14 12" />}
        <polyline points={pts} fill="none" stroke={modo === 'normal' ? CIANO : cor} strokeWidth={10} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', left: 380, top: 840, fontFamily: FONTE, fontSize: 30, color: '#8a96aa'}}>TEMPO →</div>
      <div style={{position: 'absolute', left: 120, top: 250, width: 220, fontFamily: FONTE, fontSize: 26, color: '#8a96aa', lineHeight: 1.2}}>FORÇA DA ENERGIA ESCURA</div>
      {modo === 'infinita' && <div style={{position: 'absolute', left: 1650, top: 230, fontFamily: FONTE, fontSize: 110, color: VERMELHO, opacity: p}}>∞</div>}
      <Tit t={t} s={74} />
      <Etq t={modo === 'normal' ? 'ESQUEMA' : 'ESQUEMA · HIPÓTESE'} />
    </AbsoluteFill>
  );
};
// régua do w: cenário −1,5, Planck ≈ −1, DESI > −1 (não confirmado)
const EscalaW: React.FC<{desi?: boolean; cenario?: boolean; t: string; medindo?: boolean}> = ({desi, cenario = true, t, medindo}) => {
  const f = useCurrentFrame();
  const X = (w: number) => 260 + ((w + 1.8) / 1.2) * 1400;
  const s1 = spring({frame: f - 4, fps: FPS, config: {damping: 12}}), s2 = spring({frame: f - 14, fps: FPS, config: {damping: 12}}), s3 = spring({frame: f - 24, fps: FPS, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #0e1a26, ${NOITE} 75%)`}}>
      <div style={{position: 'absolute', left: X(-1.8), width: X(-1) - X(-1.8), top: 470, height: 140, background: 'rgba(255,59,59,.12)'}} />
      <div style={{position: 'absolute', left: X(-1.8) + 20, top: 630, fontFamily: FONTE, fontSize: 26, color: '#ff8a8a'}}>FANTASMA (w &lt; −1) → RASGO</div>
      <div style={{position: 'absolute', left: X(-1) + 20, top: 630, fontFamily: FONTE, fontSize: 26, color: '#8ad8ff'}}>w &gt; −1 → ENFRAQUECE</div>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={X(-1.8)} y1={540} x2={X(-0.6)} y2={540} stroke="#cfd8e8" strokeWidth={6} />
        {[-1.5, -1, -0.6].map((w) => <line key={w} x1={X(w)} y1={520} x2={X(w)} y2={560} stroke="#cfd8e8" strokeWidth={4} />)}
        {cenario && <circle cx={X(-1.5)} cy={540} r={22 * s1} fill={ROXO} />}
        <rect x={X(-1.03 - 0.03)} y={515} width={X(-1) - X(-1.06) + 8} height={50} rx={10} fill={VERDE} opacity={s2} />
        {desi && <path d={`M${X(-1)} 440 H${X(-1) + 230 * s3} m-24 -18 l24 18 l-24 18`} stroke={CIANO} strokeWidth={8} fill="none" />}
      </svg>
      {cenario && <div style={{position: 'absolute', left: X(-1.5) - 160, width: 320, top: 380, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: ROXO, opacity: s1}}>CENÁRIO: −1,5</div>}
      <div style={{position: 'absolute', left: X(-1) - 160, width: 320, top: 690, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: VERDE, opacity: s2}}>PLANCK: w ≈ −1</div>
      {desi && <div style={{position: 'absolute', left: X(-1) + 30, width: 520, top: 330, fontFamily: FONTE, fontSize: 28, color: CIANO, opacity: s3, lineHeight: 1.2}}>DESI: SINAIS DE ENFRAQUECIMENTO<br />(NÃO CONFIRMADO)</div>}
      {medindo && <div style={{position: 'absolute', top: 800, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 90, color: OURO, opacity: 0.6 + 0.4 * Math.sin(f * 0.15)}}>w = ?</div>}
      <Tit t={t} s={70} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
// sistema Sol–Terra: solta = a Terra sai pela tangente
const SolTerra: React.FC<{solta?: number; abre?: number; t: string}> = ({solta = 0, abre = 0, t}) => {
  const f = useCurrentFrame();
  const a = f * 0.03;
  const R = 300 * (1 + abre * interpolate(f, [0, 120], [0, 1.2], clamp));
  const s = interpolate(f, [10, 90], [0, 1], {...clamp, easing: Easing.in(Easing.quad)}) * solta;
  const ex = 960 + Math.cos(a) * R * (1 - s) + s * 900, ey = 560 + Math.sin(a) * R * 0.36 * (1 - s) - s * 260;
  return (
    <Ceu n={110}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><ellipse cx={960} cy={560} rx={R} ry={R * 0.36} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={3} strokeDasharray="12 12" /></svg>
      <Bola x={960} y={560} r={70} bg={SOL} brilho="rgba(255,200,80,.6)" />
      <Bola x={ex} y={ey} r={22} bg="radial-gradient(circle at 35% 35%, #9fd4ff, #1a5ea8 60%, #0a2a50)" />
      <Tit t={t} s={80} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </Ceu>
  );
};
// átomo: núcleo + elétrons; rasga = o átomo se desfaz
const Atomo: React.FC<{rasga?: boolean; t: string}> = ({rasga, t}) => {
  const f = useCurrentFrame();
  const p = rasga ? interpolate(f, [6, 40], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)}) : 0;
  const flash = rasga ? interpolate(f, [4, 8, 20], [0, 0.9, 0], clamp) : 0;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #101a2e, ${NOITE} 70%)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 60, 120].map((r, i) => (
          <g key={i} transform={`translate(${960 + (i - 1) * 500 * p} ${560 + (i % 2 ? -1 : 1) * 260 * p}) rotate(${r + f * (rasga ? 3 : 0.5)})`} opacity={1 - p * 0.6}>
            <ellipse rx={360} ry={110} fill="none" stroke={CIANO} strokeWidth={4} />
            <circle cx={360 * Math.cos(f * 0.12 + i * 2)} cy={110 * Math.sin(f * 0.12 + i * 2)} r={16} fill="#cfefff" />
          </g>
        ))}
        {[-1, 1].map((d) => <circle key={d} cx={960 + d * (14 + 400 * p)} cy={560} r={44} fill={OURO} style={{filter: 'drop-shadow(0 0 20px #ffb030)'}} />)}
      </svg>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
      <Tit t={t} s={84} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// linha do tempo da contagem
const Escada: React.FC<{t: string; destaque?: boolean}> = ({t, destaque}) => {
  const f = useCurrentFrame();
  const marcas = ['T−20 BI', 'T−1 BI', 'T−60 MI', 'T−3 MESES', 'T−30 MIN', 'T−10⁻¹⁹ S', 'T−0'];
  const larg = [560, 320, 240, 170, 120, 80, 40];
  let x = 140;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      {marcas.map((m, i) => {
        const s = spring({frame: f - 4 - i * 5, fps: FPS, config: {damping: 12}});
        const w = destaque ? larg[i] * 1.0 : 1640 / 7 - 12;
        const el = (
          <React.Fragment key={m}>
            <div style={{position: 'absolute', left: x, top: 520, width: w * s, height: 60, borderRadius: 10, background: i < 6 ? `rgba(169,139,255,${0.9 - i * 0.1})` : VERMELHO}} />
            <div style={{position: 'absolute', left: x, width: Math.max(w, 150), top: i % 2 ? 610 : 450, fontFamily: FONTE, fontSize: 28, color: '#fff', opacity: s, whiteSpace: 'nowrap'}}>{m}</div>
          </React.Fragment>
        );
        x += w + 12;
        return el;
      })}
      <Tit t={t} s={76} />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </AbsoluteFill>
  );
};

// ---------- gancho ----------
const DataFim: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [10, 70], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Foto src="bigrip/xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" z={[1.15, 1.0]} />
      <Rachas p={p} />
      <Tit t="O UNIVERSO TEM UMA DATA PRA ACABAR" s={76} />
    </AbsoluteFill>
  );
};
const Contagem: React.FC = () => {
  const f = useCurrentFrame();
  const n = 20000000000 - f * 7654321;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #14102a, ${NOITE} 70%)`}}>
      <div style={{position: 'absolute', top: 400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: -2}}>T−{n.toLocaleString('pt-BR')}</div>
      <Sub y={600} s={46} cor={OURO}>ANOS · CONTAGEM REGRESSIVA</Sub>
      <Etq t="CENÁRIO" />
    </AbsoluteFill>
  );
};
const GalaxiasSomem: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias k={interpolate(f, [0, 60], [1, 3.2], {easing: Easing.in(Easing.quad)})} estica={interpolate(f, [0, 60], [0, 1], clamp)} /><Tit t="AS GALÁXIAS SOMEM" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const ViaSeDesfaz: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Estilhaco src="via_lactea.jpg" p={interpolate(f, [6, 60], [0, 0.7], clamp)} /><Tit t="A VIA LÁCTEA SE DESFAZ" /><Etq t="IMAGEM REAL (NASA) + EFEITO" /></AbsoluteFill>;
};
const TerraSoltaG: React.FC = () => <SolTerra solta={1} t="A TERRA SE SOLTA DO SOL" />;
const TerraRacha: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <TerraFoto x={960} y={580} R={330} />
      <Rachas p={interpolate(f, [4, 50], [0, 0.75], clamp)} cy={580} />
      <Tit t="A TERRA SE DESFAZ" />
      <Etq t="IMAGEM REAL (APOLLO 17) + EFEITO" />
    </AbsoluteFill>
  );
};
const AtomosG: React.FC = () => <Atomo rasga t="OS SEUS ÁTOMOS SE RASGAM" />;
const Nome: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Grande t="BIG RIP" sub="O GRANDE RASGO" s={230} />
      <Rachas p={interpolate(f, [8, 40], [0, 0.5], clamp)} cy={460} />
    </AbsoluteFill>
  );
};
const Estudo2003: React.FC = () => <Card topo="NÃO É FICÇÃO · ESTUDO DE 2003" meio="UM CENÁRIO CALCULADO" rodape="CALDWELL, KAMIONKOWSKI E WEINBERG" cor={ROXO} />;
const ONosso: React.FC = () => <Glitch t="SERÁ QUE É O NOSSO?" cor={OURO} />;

// ---------- hoje ----------
const CeuCalmo: React.FC = () => (
  <Ceu n={220}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><path d={'M0 900 ' + Array.from({length: 20}, (_, i) => `L${i * 101} ${880 + random('h' + i) * 50}`).join(' ') + ' L1920 900 L1920 1080 L0 1080 Z'} fill="#000" /></svg>
    <Tit t="TUDO PARECE CALMO" />
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const NaoEsta: React.FC = () => <Glitch t="MAS NÃO ESTÁ" cor={VERMELHO} s={170} />;
const Equipes: React.FC = () => <Foto src="bigrip/supernova.jpg" etq="IMAGEM REAL · SUPERNOVA · SPITZER · NASA" t="1998: EXPLOSÕES DE ESTRELAS DISTANTES" z={[1.0, 1.15]} />;
const MaisFracas: React.FC = () => {
  const s = useSpring(10);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #12162a, ${NOITE} 75%)`}}>
      <Bola x={620} y={560} r={70} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" brilho="rgba(255,230,150,.8)" />
      <Bola x={1300} y={560} r={70} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" o={1 - 0.65 * s} />
      <div style={{position: 'absolute', left: 470, top: 700, width: 300, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: '#cfd8e8'}}>ESPERADO</div>
      <div style={{position: 'absolute', left: 1150, top: 700, width: 300, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: OURO}}>OBSERVADO</div>
      <Tit t="MAIS FRACAS DO QUE DEVIAM" />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const MaisLonge: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [6, 50], [1100, 1650], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Ceu n={90}>
      <Bola x={200} y={600} r={30} bg="radial-gradient(circle at 35% 35%, #9fd4ff, #1a5ea8 60%, #0a2a50)" />
      <div style={{position: 'absolute', left: 240, top: 596, width: x - 240, height: 8, background: OURO}} />
      <Bola x={x} y={600} r={26} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" />
      <Tit t="ESTAVAM MAIS LONGE" />
      <Etq t="ESQUEMA" />
    </Ceu>
  );
};
const Choque: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias k={interpolate(f, [0, 120], [0.8, 1.5])} /><Tit t="O UNIVERSO ESTÁ SE EXPANDINDO" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const Acelera: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias k={interpolate(f, [0, 80], [1.2, 3], {easing: Easing.in(Easing.cubic)})} /><Tit t="CADA VEZ MAIS RÁPIDO" cor={CIANO} /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const Nobel: React.FC = () => <Card topo="NOBEL DE FÍSICA · 2011" meio="PERLMUTTER · SCHMIDT · RIESS" rodape="A EXPANSÃO ACELERADA" cor={OURO} />;
const EnergiaEscura: React.FC = () => (
  <AbsoluteFill>
    <Foto src="bigrip/xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" z={[1.2, 1.3]} />
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, rgba(20,8,40,.85), rgba(0,0,0,.4) 70%)'}} />
    <Grande t="ENERGIA ESCURA" s={150} cor={ROXO} fundo="transparent" />
  </AbsoluteFill>
);
const NinguemSabe: React.FC = () => <Grande t="?" sub="NINGUÉM SABE O QUE ELA É" s={300} cor={ROXO} />;
const Pergunta: React.FC = () => <Curva modo="fantasma" t="E SE ELA FICAR MAIS FORTE?" />;
const ORelogio: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #121a2c, ${NOITE} 70%)`}}><Relogio x={960} y={580} r={260} h="EXISTE UM RELÓGIO" /><Etq t="ILUSTRAÇÃO" /></AbsoluteFill>;
const JaCorrendo: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #1a1230, ${NOITE} 70%)`}}><Relogio x={960} y={580} r={260} h="JÁ ESTARIA CORRENDO" vel={4} /><Etq t="CENÁRIO DE 2003" /></AbsoluteFill>;

// ---------- T−20 bi ----------
const Fisicos: React.FC = () => <Card topo="PHYSICAL REVIEW LETTERS · 2003" meio="CALDWELL · KAMIONKOWSKI · WEINBERG" rodape="O QUE ACONTECERIA SE ELA CRESCESSE" cor={ROXO} />;
const Fantasma: React.FC = () => <Grande t="ENERGIA ESCURA FANTASMA" s={120} cor={ROXO} sub="O NOME QUE ELES DERAM" />;
const Normal: React.FC = () => <Curva modo="normal" t="NORMAL: CADA VEZ MAIS FRACA" />;
const Contrario: React.FC = () => <Curva modo="fantasma" t="FANTASMA: CADA VEZ MAIS FORTE" />;
const NaoPara: React.FC = () => <Curva modo="fantasma" t="ELA NÃO PARA DE CRESCER" />;
const Infinita: React.FC = () => <Curva modo="infinita" t="ATÉ FICAR INFINITA" cor={VERMELHO} />;
const VinteBi: React.FC = () => <Grande t="~20 BILHÕES DE ANOS" s={150} cor={OURO} sub="EXEMPLO DO ESTUDO · w = −1,5" />;
const ParecesMuito: React.FC = () => <Escada t="PARECE MUITO TEMPO" />;
const MaisCurto: React.FC = () => <Escada t="CADA CAPÍTULO É MAIS CURTO" destaque />;

// ---------- T−1 bi ----------
const Familias: React.FC = () => <Foto src="bigrip/webb_aglomerado.jpg" etq="IMAGEM REAL · AGLOMERADO SMACS 0723 · WEBB · NASA/ESA/CSA" t="AS FAMÍLIAS DE GALÁXIAS" z={[1.0, 1.2]} />;
const Coma: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Estilhaco src="coma.jpg" p={interpolate(f, [10, 110], [0, 0.6], clamp)} cols={10} rows={6} /><Tit t="OS AGLOMERADOS SE DESFAZEM" /><Etq t="IMAGEM REAL (AGLOMERADO DE COMA · NASA) + EFEITO" /></AbsoluteFill>;
};
const Afastam: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={50}><Galaxias k={interpolate(f, [0, 90], [1, 4], {easing: Easing.in(Easing.cubic)})} estica={interpolate(f, [0, 90], [0.2, 1.4], clamp)} /><Tit t="SOMEM DO CÉU" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const UmaPorUma: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={50}><Galaxias fora={interpolate(f, [0, 30], [0.2, 1], clamp)} /><Tit t="UMA POR UMA" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const DiaADia: React.FC = () => (
  <Ceu n={120}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><path d={'M0 880 ' + Array.from({length: 20}, (_, i) => `L${i * 101} ${860 + random('d' + i) * 60}`).join(' ') + ' L1920 880 L1920 1080 L0 1080 Z'} fill="#000" /></svg>
    <Tit t="NADA MUDA NO DIA A DIA" />
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const SomeDeVista: React.FC = () => <Ceu n={25}><Tit t="O RESTO SOME DE VISTA" /><Sub y={260} s={44} cor={OURO}>PRA SEMPRE</Sub><Etq t="ILUSTRAÇÃO" /></Ceu>;
const FotosHubble: React.FC = () => <Foto src="bigrip/xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" t="FOTOS COMO AS DO HUBBLE" z={[1.0, 1.15]} />;
const ViramPassado: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{opacity: interpolate(f, [4, 60], [1, 0.05], clamp)}}><Img src={staticFile('bigrip/xdf.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(.6)'}} /></AbsoluteFill>
      <Tit t="VIRAM COISA DO PASSADO" />
      <Etq t="IMAGEM REAL (HUBBLE) + EFEITO" />
    </AbsoluteFill>
  );
};
const Esvaziar: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={Math.max(8, 160 - f * 2)}><Tit t="O UNIVERSO ESVAZIA" /><Etq t="ILUSTRAÇÃO" /></Ceu>;
};

// ---------- T−60 mi ----------
const NossaCasa: React.FC = () => <Foto src="bigrip/via_lactea.jpg" etq="IMAGEM REAL · CENTRO DA VIA LÁCTEA · NASA" t="A NOSSA CASA" z={[1.0, 1.12]} />;
const ViaDesfaz: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Estilhaco src="via_lactea.jpg" p={interpolate(f, [8, 120], [0, 0.8], clamp)} cols={16} rows={9} /><Tit t="A VIA LÁCTEA COMEÇA A SE DESFAZER" s={72} /><Etq t="IMAGEM REAL (NASA) + EFEITO" /></AbsoluteFill>;
};
// estrelas se espalhando; sol = destaca uma estrela amarela
const Espalham: React.FC<{t: string; sol?: boolean}> = ({t, sol}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 400}, (_, i) => {
          const a = random('ea' + i) * Math.PI * 2, r0 = random('er' + i) ** 1.5 * 380, v = 0.5 + random('ev' + i);
          const r = r0 + f * v * 3;
          return <circle key={i} cx={960 + Math.cos(a) * r * 1.6} cy={560 + Math.sin(a) * r * 0.7} r={1.5 + random('es' + i) * 2} fill="#e8eeff" opacity={0.85} />;
        })}
        {sol && <circle cx={960 + 300 + f * 2.5} cy={600 - f * 0.6} r={10} fill={OURO} style={{filter: 'drop-shadow(0 0 12px #ffd23f)'}} />}
      </svg>
      {sol && <div style={{position: 'absolute', left: 960 + 330 + interpolate(f, [0, 200], [0, 500]), top: 560 - interpolate(f, [0, 200], [0, 120]), fontFamily: FONTE, fontSize: 30, color: OURO}}>O SOL</div>}
      <Tit t={t} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Soltam: React.FC = () => <Espalham t="AS ESTRELAS SE SOLTAM" />;
const Divergem: React.FC = () => <Card topo="FONTES DIVERGEM" meio="2003: T−60 MI × 2004: T−180 MI" rodape="NEM OS CIENTISTAS CONCORDAM NO RELÓGIO" cor={OURO} />;
const DoisRelogios: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #121a2c, ${NOITE} 70%)`}}>
    <Relogio x={620} y={600} r={200} h="2003" rot="T−60 MILHÕES" />
    <Relogio x={1300} y={600} r={200} h="2004" rot="T−180 MILHÕES" vel={1.6} />
    <Etq t="FONTES DIVERGEM" />
  </AbsoluteFill>
);
const Sozinhas: React.FC = () => <Espalham t="CADA UMA PRO SEU LADO" sol />;
const Faixa: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{opacity: interpolate(f, [30, 130], [1, 0], clamp)}}><Img src={staticFile('bigrip/via_lactea.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>
      <Tit t="A VIA LÁCTEA DEIXA DE EXISTIR" />
      <Etq t="IMAGEM REAL (NASA) + EFEITO" />
    </AbsoluteFill>
  );
};

// ---------- T−3 meses ----------
const TempoAcelera: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #1a1230, ${NOITE} 70%)`}}><Relogio x={960} y={580} r={260} h="O TEMPO ACELERA" vel={10} /><Etq t="ILUSTRAÇÃO" /></AbsoluteFill>;
const SistemaSolar: React.FC = () => <SolTerra abre={1} t="O SISTEMA SOLAR SE DESFAZ" />;
const Solta: React.FC = () => <SolTerra solta={1} t="E VAI EMBORA" />;
const Significa: React.FC = () => <Foto src="bigrip/terra.jpg" etq="IMAGEM REAL · A TERRA · APOLLO 17 · NASA" t="PENSA NO QUE ISSO SIGNIFICA" z={[1.0, 1.1]} />;
const SemAno: React.FC = () => <Grande t="SEM ANO" s={220} />;
const SemEstacao: React.FC = () => <Grande t="SEM VERÃO · SEM INVERNO" s={130} cor={CIANO} />;
const SolMenor: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 150], [0.9, 0.2], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <Img src={staticFile('bigrip/sol.jpg')} style={{width: 1000 * s, height: 1000 * s, borderRadius: '50%', filter: 'hue-rotate(190deg) saturate(1.4)'}} />
      <Tit t="O SOL FICA MENOR NO CÉU" />
      <Etq t="IMAGEM REAL (SDO · NASA) + EFEITO" />
    </AbsoluteFill>
  );
};
const Frio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c2a40, #02080e 75%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 90}, (_, i) => <circle key={i} cx={random('fx' + i) * 1920} cy={(random('fy' + i) * 1080 + f * (2 + random('fv' + i) * 4)) % 1080} r={3 + random('fr' + i) * 5} fill="#dff4ff" opacity={0.6} />)}
      </svg>
      <Grande t="E O FRIO CHEGA" s={150} cor={CIANO} fundo="transparent" />
    </AbsoluteFill>
  );
};
const NenhumVivo: React.FC = () => <Ceu n={80}><Terra x={960} y={600} R={260} mar="#1a2a3a" chao="#8aa0b0" borda="rgba(200,230,255,.6)" /><Tit t="NENHUM SER VIVO AGUENTARIA" /><Etq t="ILUSTRAÇÃO" /></Ceu>;
const NemChegou: React.FC = () => <Glitch t="E O FIM AINDA NEM CHEGOU" cor={OURO} s={120} />;

// ---------- T−30 min ----------
const NaoAguenta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE, transform: `translate(${(random('sx' + f) - 0.5) * 8}px, ${(random('sy' + f) - 0.5) * 8}px)`}}>
      <TerraFoto x={960} y={580} R={330} />
      <Tit t="A PRÓPRIA TERRA NÃO AGUENTA" />
      <Etq t="IMAGEM REAL · A TERRA · APOLLO 17 · NASA" />
    </AbsoluteFill>
  );
};
const ForcaGravidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #12162a, ${NOITE} 75%)`}}>
      <Barra x={300} y={420} w={1100} h={70} p={0.55} cor={CIANO} rot="GRAVIDADE DA TERRA" val="" />
      <Barra x={300} y={680} w={1100} h={70} p={interpolate(f, [6, 120], [0.1, 1], clamp)} cor={VERMELHO} rot="FORÇA DO RASGO" val="" />
      <Tit t="O RASGO VENCE A GRAVIDADE" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const TerraEstilhaca: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Estilhaco src="terra.jpg" p={interpolate(f, [4, 60], [0, 0.9], {...clamp, easing: Easing.in(Easing.quad)})} cols={14} rows={8} fit="contain" /><Tit t="E A TERRA SE DESFAZ" /><Etq t="IMAGEM REAL (APOLLO 17) + EFEITO" /></AbsoluteFill>;
};
const Chao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a0d18, #1a1410)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 26}, (_, i) => {
          const x = (i % 13) * 150, y = 720 + Math.floor(i / 13) * 170, up = f * (0.8 + random('cu' + i) * 2.2);
          return <path key={i} d={`M${x} ${y - up} l150 ${(random('c1' + i) - 0.5) * 30} l${(random('c2' + i) - 0.5) * 30} 160 l-150 ${(random('c3' + i) - 0.5) * 30} Z`} fill="#3a2c22" stroke="#fff" strokeWidth={3}
            transform={`rotate(${(random('cr' + i) - 0.5) * f * 0.4} ${x + 75} ${y - up + 80})`} style={{filter: 'drop-shadow(0 0 8px rgba(255,255,255,.6))'}} />;
        })}
      </svg>
      <Tit t="O CHÃO SE SOLTANDO" />
      <Etq t="IMAGINAÇÃO · SEM ESTUDO" />
    </AbsoluteFill>
  );
};
const Ar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #000, #0c2a50)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 140}, (_, i) => { const x = random('ax' + i) * 1920, y = 1080 - ((random('ay' + i) * 1080 + f * (6 + random('av' + i) * 10)) % 1200);
          return <line key={i} x1={x} y1={y} x2={x} y2={y + 40} stroke="#9fd4ff" strokeWidth={3} opacity={0.5} />; })}
      </svg>
      <Tit t="O AR ESCAPANDO PRO ESPAÇO" />
      <Etq t="IMAGINAÇÃO · SEM ESTUDO" />
    </AbsoluteFill>
  );
};
const NinguemSabe2: React.FC = () => <Grande t="NINGUÉM SABE COMO SERIA" s={110} />;
const Calculos: React.FC = () => <Card topo="OS CÁLCULOS SÓ DIZEM" meio="NESSE CENÁRIO, ACONTECE" cor={ROXO} />;
const Filme: React.FC = () => {
  const s = useSpring(14);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #12162a, ${NOITE} 75%)`}}>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 80, alignItems: 'center', fontFamily: FONTE}}>
        <div style={{textAlign: 'center'}}><div style={{fontSize: 130, color: CIANO}}>4,5 BI</div><div style={{fontSize: 36, color: '#fff'}}>ANOS DE TERRA</div></div>
        <div style={{fontSize: 110, color: '#fff'}}>→</div>
        <div style={{textAlign: 'center', opacity: s}}><div style={{fontSize: 130, color: VERMELHO}}>&lt; 30 MIN</div><div style={{fontSize: 36, color: '#fff'}}>MENOS QUE UM FILME</div></div>
      </div>
      <Etq t="HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Faltam30: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.max(0, 1800 - Math.floor(f / 3));
  return <Grande t={`T−${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`} sub="E AINDA FALTAM 30 MINUTOS" s={200} cor={VERMELHO} />;
};

// ---------- T−10⁻¹⁹ s ----------
const UltimoInstante: React.FC = () => <Grande t="O ÚLTIMO INSTANTE" s={140} />;
const DezMenos19: React.FC = () => <Grande t="10⁻¹⁹ S" s={240} cor={OURO} sub="UM DÉCIMO DE BILIONÉSIMO DE BILIONÉSIMO DE SEGUNDO" />;
const SeusAtomos: React.FC = () => <Atomo t="AOS SEUS ÁTOMOS" />;
const AtomoRasga: React.FC = () => <Atomo rasga t="ELES SE DESFAZEM" />;
const Regua: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, 50], [0, 1], clamp);
  const K = 16000;   // px por nm
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #12162a, ${NOITE} 75%)`}}>
      <div style={{position: 'absolute', left: 300, top: 430, width: 0.053 * K, height: 50, borderRadius: 10, background: 'rgba(76,201,240,.35)', border: `3px solid ${CIANO}`}} />
      <div style={{position: 'absolute', left: 300, top: 370, fontFamily: FONTE, fontSize: 32, color: CIANO}}>RAIO DO ÁTOMO DE HIDROGÊNIO ≈ 0,053 NM</div>
      <div style={{position: 'absolute', left: 300, top: 620, width: 0.03 * K * p, height: 50, borderRadius: 10, background: OURO}} />
      <div style={{position: 'absolute', left: 300, top: 690, fontFamily: FONTE, fontSize: 32, color: OURO}}>A LUZ EM 10⁻¹⁹ S ≈ 0,03 NM</div>
      <Tit t="MENOS QUE UM ÚNICO ÁTOMO" />
      <Etq t="CONTA" />
    </AbsoluteFill>
  );
};

// ---------- T−0 ----------
const TZero: React.FC = () => <Grande t="T−0" s={300} cor="#fff" fundo="#000" />;
const Rasga: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d * 0.8], [0, 1.6], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Rachas p={p} esc={2.2} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [d * 0.6, d], [0, 1], clamp)}} />
    </AbsoluteFill>
  );
};
const Branco: React.FC = () => <AbsoluteFill style={{background: '#fff'}} />;
const Preto: React.FC = () => <AbsoluteFill style={{background: '#000'}} />;

// ---------- mas espera ----------
const Espera: React.FC = () => <Foto src="bigrip/xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" t="MAS ESPERA…" z={[1.0, 1.08]} />;
const SoCenario: React.FC = () => <Card topo="TUDO ISSO É" meio="O CENÁRIO DE UM ESTUDO" rodape="E DEPENDE DE UM NÚMERO" cor={VERDE} />;
const UmNumero: React.FC = () => <Grande t="w" s={300} cor={OURO} sub="A FORÇA COM QUE A ENERGIA ESCURA EMPURRA" />;
const PraExistir: React.FC = () => <EscalaW t="PRA EXISTIR BIG RIP: w MENOR QUE −1" />;
const NaoBate: React.FC = () => <Glitch t="O NÚMERO NÃO BATE" cor={VERDE} />;
const Planck: React.FC = () => (
  <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
    <Img src={staticFile('bigrip/planck.jpg')} style={{width: 1500, marginTop: 80}} />
    <Tit t="PLANCK: ENERGIA ESCURA CONSTANTE" s={72} />
    <Etq t="IMAGEM REAL · PLANCK · ESA/NASA" real />
  </AbsoluteFill>
);
const MuitoLonge: React.FC = () => <EscalaW t="MUITO LONGE DO CENÁRIO FANTASMA" />;
const Constante: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias k={interpolate(f, [0, 150], [1, 2])} /><Tit t="AS GALÁXIAS DISTANTES SOMEM" /><Sub y={250} s={42} cor={OURO}>UM DIA, SIM</Sub><Etq t="ANIMAÇÃO" /></Ceu>;
};
const Inteiros: React.FC = () => <Foto src="bigrip/terra.jpg" etq="IMAGEM REAL · A TERRA · APOLLO 17 · NASA" t="CONTINUAM INTEIROS" z={[1.0, 1.1]} />;
const TemMais: React.FC = () => <Glitch t="E TEM MAIS" cor={CIANO} s={170} />;
const Desi: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 1400}, (_, i) => {
          const r = random('dr' + i) ** 0.6, a = -0.6 + random('da' + i) * 1.2 + Math.sin(r * 30 + i) * 0.02;
          if (r > interpolate(f, [0, 60], [0.05, 1], clamp)) return null;
          return <circle key={i} cx={260 + Math.cos(a) * r * 1450} cy={560 + Math.sin(a) * r * 1450 * 0.55} r={1.6} fill={r > 0.6 ? '#ff9a6a' : r > 0.3 ? '#ffe08a' : '#9fd4ff'} opacity={0.8} />;
        })}
        <circle cx={260} cy={560} r={10} fill={CIANO} />
      </svg>
      <Tit t="DESI · O MAIOR MAPA 3D DO UNIVERSO" s={72} />
      <Etq t="ILUSTRAÇÃO DE UM MAPA 3D" />
    </AbsoluteFill>
  );
};
const MaisFraca: React.FC = () => <EscalaW desi t="DESI: PODE ESTAR FICANDO MAIS FRACA" />;
const NaoConfirmado: React.FC = () => <Card topo="DESI · 2025" meio="AINDA NÃO CONFIRMADO" rodape="RESULTADOS COMPLETOS EM 2027" cor={CIANO} />;
const FimFrio: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={Math.max(10, 200 - Math.floor(f * 0.8))} cor="radial-gradient(circle at 50% 120%, #1a1426, #020205 70%)"><Tit t="UM FIM FRIO E LENTO" /><Sub y={250} s={42} cor={OURO}>ESTRELAS APAGANDO POR TRILHÕES DE ANOS</Sub><Etq t="ILUSTRAÇÃO" /></Ceu>;
};
const Encolher: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias k={interpolate(f, [0, 90], [1.6, 0.4], {...clamp, easing: Easing.in(Easing.quad)})} /><Tit t="OU VOLTAR A ENCOLHER" /><Etq t="ANIMAÇÃO · HIPÓTESE" /></Ceu>;
};
const NaoRasgo: React.FC = () => <Grande t="NÃO UM RASGO" s={170} cor={VERDE} />;
const NaoDescarta: React.FC = () => <Glitch t="NINGUÉM CONSEGUE DESCARTAR DE VEZ" cor={ROXO} s={110} />;
const Garantia: React.FC = () => <Card topo="MAIO DE 2026 · PRÉ-PUBLICAÇÃO" meio="O MÍNIMO QUE O SISTEMA SOLAR GARANTE" rodape="SCHERRER E TRIVEDI" cor={ROXO} />;
const Estranha: React.FC = () => <Grande t="FÍSICA MUITO ESTRANHA" s={140} cor={ROXO} sub="MESMO PRA ISSO" />;
const NaoRevisado: React.FC = () => <Grande t="AINDA NÃO REVISADO" s={130} cor={OURO} />;
const TresMeses: React.FC = () => <Foto src="bigrip/terra.jpg" etq="IMAGEM REAL · A TERRA · APOLLO 17 · NASA" t="NINGUÉM SOBREVIVERIA NEM 3 MESES" z={[1.1, 1.0]} />;
const Medindo: React.FC = () => <EscalaW desi medindo t="UM NÚMERO QUE AINDA ESTAMOS MEDINDO" />;

const Fim: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 500, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena ----------
const PLANO: [string, React.FC][][] = [
  [['imagina que o universo', DataFim], ['e voce esta vivendo', Contagem], ['primeiro as galaxias', GalaxiasSomem], ['depois a via lactea', ViaSeDesfaz], ['tres meses antes do fim', TerraSoltaG],
    ['meia hora antes a propria', TerraRacha], ['e na ultima fracao', AtomosG], ['esse fim tem nome', Nome], ['nao e ficcao', Estudo2003], ['a pergunta e se', ONosso]],
  [['hoje voce olha pro ceu', CeuCalmo], ['mas nao esta', NaoEsta], ['duas equipes de astronomos', Equipes], ['elas pareciam mais fracas', MaisFracas], ['estavam mais longe', MaisLonge],
    ['a conclusao foi um choque', Choque], ['ele esta se expandindo cada', Acelera], ['a descoberta rendeu', Nobel], ['os cientistas chamam', EnergiaEscura], ['ninguem sabe o que', NinguemSabe],
    ['e ai vem a pergunta', Pergunta], ['se ficar existe um relogio', ORelogio], ['e no cenario de 2003', JaCorrendo]],
  [['em 2003 tres fisicos', Fisicos], ['deram um nome assustador', Fantasma], ['normalmente quando o universo', Normal], ['essa energia faria o contrario', Contrario], ['no cenario deles essa forca', NaoPara],
    ['e num momento exato', Infinita], ['no exemplo que eles usaram', VinteBi], ['parece muito tempo', ParecesMuito], ['e cada capitulo e mais curto', MaisCurto]],
  [['faltando um bilhao de anos', Familias], ['os aglomerados que a gravidade', Coma], ['as galaxias vizinhas se afastam', Afastam], ['uma por uma', UmaPorUma], ['pra quem estiver vivo', DiaADia],
    ['mas o resto do universo', SomeDeVista], ['aquelas fotos do espaco', FotosHubble], ['viram coisa do passado', ViramPassado], ['se alguem estiver olhando', Esvaziar]],
  [['depois chega a vez', NossaCasa], ['faltando sessenta milhoes', ViaDesfaz], ['as estrelas se soltam', Soltam], ['um outro calculo de 2004', Divergem], ['nem os proprios cientistas', DoisRelogios],
    ['as centenas de bilhoes', Sozinhas], ['de um jeito ou de outro', Faixa]],
  [['agora o tempo acelera', TempoAcelera], ['faltando tres meses', SistemaSolar], ['a terra se solta do sol e', Solta], ['pensa no que isso', Significa], ['o ano deixa de existir', SemAno],
    ['nao tem mais verao', SemEstacao], ['o sol vai ficando menor', SolMenor], ['e o frio chega', Frio], ['nenhum ser vivo', NenhumVivo], ['e o fim ainda nem chegou', NemChegou]],
  [['meia hora antes do fim a propria', NaoAguenta], ['a forca que esta rasgando', ForcaGravidade], ['e a terra se desfaz', TerraEstilhaca], ['imagina o chao', Chao], ['o ar escapando', Ar],
    ['ninguem sabe exatamente', NinguemSabe2], ['os calculos so dizem', Calculos], ['um planeta que existiu', Filme], ['e ainda faltam trinta', Faltam30]],
  [['e entao chega o ultimo', UltimoInstante], ['faltando um decimo', DezMenos19], ['aos seus atomos', SeusAtomos], ['eles se desfazem', AtomoRasga], ['pra ter uma ideia', Regua]],
  [['t menos zero', TZero], ['o proprio espaco se rasga', Rasga], ['e o tempo acaba', Branco], ['nao existe um depois', Preto]],
  [['mas espera', Espera], ['tudo isso e o cenario', SoCenario], ['e ele depende de um numero', UmNumero], ['pra existir big rip', PraExistir], ['quando a gente mede', NaoBate],
    ['o satelite planck', Planck], ['muito longe do cenario', MuitoLonge], ['e com uma energia constante', Constante], ['mas a via lactea o sol', Inteiros], ['e tem mais', TemMais],
    ['o desi o maior', Desi], ['viu sinais de que', MaisFraca], ['ainda nao e uma descoberta', NaoConfirmado], ['mas se for isso', FimFrio], ['ou talvez ate um universo', Encolher],
    ['nao um rasgo', NaoRasgo], ['so que ninguem consegue', NaoDescarta], ['dois fisicos calcularam', Garantia], ['e mesmo isso exigiria', Estranha], ['o estudo ainda nao', NaoRevisado],
    ['ninguem sobreviveria', TresMeses], ['mas o que esse cenario', Medindo]],
];

const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'bigrip/narracao.mp3', musica: 'bigrip/musica.mp3', volta: 9, fim: Fim,
  selos: [
    {texto: 'HIPÓTESE', de: 'primeiro as galaxias', ate: 'a pergunta e se', linha: 0},
    {texto: 'HIPÓTESE', de: 'e no cenario de 2003', ate: 'mas espera', linha: 0},
    {texto: 'FONTES DIVERGEM', de: 'faltando sessenta milhoes', ate: 'as centenas de bilhoes', linha: 1},
    {texto: 'IMAGINAÇÃO · SEM ESTUDO', de: 'imagina o chao', ate: 'os calculos so dizem', linha: 1},
    {texto: 'NÃO CONFIRMADO', de: 'o desi o maior', ate: 'so que ninguem consegue', linha: 0, cor: CIANO},
    {texto: 'PRÉ-PUBLICAÇÃO', de: 'dois fisicos calcularam', ate: 'ninguem sobreviveria', linha: 0, cor: ROXO},
  ],
  hits: [{frase: 'esse fim tem nome', off: 4, vol: 0.5}, {frase: 'e a terra se desfaz', off: 4}, {frase: 'eles se desfazem', off: 2, vol: 0.5}, {frase: 't menos zero', off: 2, vol: 0.5}],
  mudo: {de: 'o proprio espaco se rasga', ate: 'mas espera'},
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail: Terra rachando com luz branca, galáxias esticadas ao fundo ----------
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 50%, #1a1036, #030208 70%)', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 60}, (_, i) => {
        const x = random('tx' + i) * 1920, y = random('ty' + i) * 1080, a = (Math.atan2(y - 540, x - 1250) * 180) / Math.PI;
        return <ellipse key={i} cx={x} cy={y} rx={40 + random('tr' + i) * 70} ry={4 + random('th' + i) * 6} fill={random('tc' + i) > 0.5 ? '#ffd8a0' : '#b8c8ff'} opacity={0.7} transform={`rotate(${a} ${x} ${y})`} style={{filter: 'blur(2px)'}} />;
      })}
    </svg>
    <div style={{position: 'absolute', left: 1250 - 520, top: 540 - 520, width: 1040, height: 1040, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,235,255,.45) 50%, rgba(220,235,255,0) 70%)'}} />
    <TerraFoto x={1250} y={540} R={400} filtro="contrast(1.2) brightness(.7)" />
    <Rachas p={0.85} cx={1250} cy={540} esc={0.9} />
    <Rachas p={0.85} cx={1250} cy={540} esc={0.9} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.35) 35%, rgba(0,0,0,0) 60%)'}} />
    <div style={{position: 'absolute', left: 70, top: 330, fontFamily: FONTE, fontSize: 210, lineHeight: 0.92, letterSpacing: -5, color: '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
      T−30<br /><span style={{color: OURO}}>MIN</span>
    </div>
    <div style={{position: 'absolute', left: 80, top: 210, padding: '10px 26px', borderRadius: 14, border: `4px solid ${ROXO}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 44, color: ROXO, letterSpacing: 4}}>CENÁRIO</div>
  </AbsoluteFill>
);
