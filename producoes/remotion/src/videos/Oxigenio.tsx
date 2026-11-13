// Short "E SE O OXIGÊNIO SUMISSE POR 5 SEGUNDOS? ⏱️" (aprovado pelo dono em 13/11/2026, postar no mesmo dia).
// ESTILO GRINGO (Modelo C, decisão do dono): bonequinho desenhado de rosto exagerado sobre FUNDOS REAIS (exceção liberada à regra do 3D).
// Fundos: fotos CC0 (StockSnap e WordPress Photos, via Openverse), lista em public/oxigenio/fundos/creditos_cc0.json. Cada foto numa cena só.
// Na tela: relógio de 5 s (5…1 junto com a voz; no "nível dois" reinicia em vermelho), legenda grande 1 palavra por vez. Sem selos.
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE, montar, Final} from '../comum';
import palavras from './oxigenio.palavras.json';

const W = palavras as Palavra[];
const FPS = 30;
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pr = (f: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...cl, easing: e});
type Expr = 'choque' | 'susto' | 'alivio' | 'bochecha' | 'ue' | 'panico' | 'tranquilo' | 'aponta' | 'engasga';

// ---------- bonequinho ----------
const Boneco: React.FC<{expr: Expr; x?: number; y?: number; s?: number; maos?: 'ouvido' | 'cima' | 'lado' | 'joinha' | 'aponta' | 'olha'; transp?: number; tremor?: number}> = ({expr, x = 540, y = 930, s = 0.92, maos = 'lado', transp = 0, tremor = 0}) => {
  const f = useCurrentFrame();
  const sq = spring({frame: f, fps: FPS, config: {damping: 9, mass: 0.6}});
  const bob = Math.sin(f * 0.18) * 6;
  const tx = tremor ? Math.sin(f * 2.1) * tremor : 0;
  const olhoR = expr === 'choque' || expr === 'panico' || expr === 'susto' ? 34 : expr === 'alivio' ? 6 : 26;
  const pup = expr === 'ue' ? -14 : 0;
  const boca = {
    choque: <ellipse cx={0} cy={70} rx={30} ry={42} fill="#2a0a0a" />,
    panico: <ellipse cx={0} cy={72} rx={44} ry={36} fill="#2a0a0a" />,
    susto: <ellipse cx={0} cy={70} rx={22} ry={26} fill="#2a0a0a" />,
    alivio: <path d="M-40 60 Q0 100 40 60" stroke="#111" strokeWidth={9} fill="none" strokeLinecap="round" />,
    tranquilo: <path d="M-36 58 Q0 92 36 58" stroke="#111" strokeWidth={9} fill="none" strokeLinecap="round" />,
    bochecha: <circle cx={0} cy={70} r={8} fill="#111" />,
    ue: <path d="M-30 74 Q-5 60 30 78" stroke="#111" strokeWidth={9} fill="none" strokeLinecap="round" />,
    aponta: <path d="M-30 62 Q0 86 30 62" stroke="#111" strokeWidth={9} fill="none" strokeLinecap="round" />,
    engasga: <path d="M-36 70 L-18 60 L0 72 L18 60 L36 70" stroke="#111" strokeWidth={8} fill="none" strokeLinejoin="round" />,
  }[expr];
  const braco = (lado: number) => {
    const ombro = [lado * 70, 230];
    const mao = maos === 'ouvido' ? [lado * 172, 10] : maos === 'cima' ? [lado * 240, -120 - Math.sin(f * 0.4) * 20] : maos === 'joinha' && lado > 0 ? [170, 170] : maos === 'aponta' && lado > 0 ? [210, 120] : maos === 'olha' ? [lado * 60, 330] : [lado * 120, 400 + Math.sin(f * 0.2 + lado) * 8];
    return <g key={lado}><path d={`M${ombro[0]} ${ombro[1]} Q${lado * 140} ${(ombro[1] + mao[1]) / 2 + 30} ${mao[0]} ${mao[1]}`} stroke="#111" strokeWidth={16} fill="none" strokeLinecap="round" />
      <circle cx={mao[0]} cy={mao[1]} r={26} fill={transp ? `rgba(160,230,255,${1 - transp * 0.7})` : '#fff'} stroke="#111" strokeWidth={8} />
      {maos === 'joinha' && lado > 0 && <rect x={mao[0] - 8} y={mao[1] - 60} width={18} height={40} rx={9} fill="#fff" stroke="#111" strokeWidth={7} />}</g>;
  };
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <defs><filter id="sombra"><feDropShadow dx="0" dy="14" stdDeviation="12" floodOpacity="0.45" /></filter><filter id="glow"><feGaussianBlur stdDeviation="10" /></filter></defs>
    <g transform={`translate(${x + tx} ${y + bob}) scale(${s * (0.85 + 0.15 * sq)} ${s * (1.12 - 0.12 * sq)})`} filter="url(#sombra)">
      <path d="M0 160 L0 420" stroke="#111" strokeWidth={18} strokeLinecap="round" />
      <path d="M0 420 L-70 600 M0 420 L70 600" stroke="#111" strokeWidth={18} strokeLinecap="round" />
      <circle cx={0} cy={0} r={170} fill="#fff" stroke="#111" strokeWidth={10} />
      {expr === 'bochecha' && <><circle cx={-110} cy={50} r={62} fill="#ffb8b0" stroke="#111" strokeWidth={6} /><circle cx={110} cy={50} r={62} fill="#ffb8b0" stroke="#111" strokeWidth={6} /></>}
      {[-1, 1].map((l) => <g key={l}><ellipse cx={l * 62} cy={-30} rx={olhoR + 8} ry={expr === 'alivio' ? 8 : olhoR + 14} fill="#fff" stroke="#111" strokeWidth={7} />
        {expr !== 'alivio' && <circle cx={l * 62 + (expr === 'ue' ? 6 : 0)} cy={-30 + pup} r={olhoR * 0.45} fill="#111" />}
        <path d={expr === 'ue' && l > 0 ? `M${l * 62 - 40} -110 L${l * 62 + 40} -96` : `M${l * 62 - 40} ${expr === 'panico' || expr === 'choque' ? -118 : -100} Q${l * 62} ${expr === 'panico' || expr === 'choque' ? -140 : -112} ${l * 62 + 40} ${expr === 'panico' || expr === 'choque' ? -118 : -100}`} stroke="#111" strokeWidth={9} fill="none" strokeLinecap="round" /></g>)}
      {boca}
      {braco(-1)}{braco(1)}
      {(expr === 'susto' || expr === 'panico') && <path d="M150 -80 q18 30 0 46 q-18 -16 0 -46" fill="#7ad0ff" stroke="#111" strokeWidth={4} />}
    </g>
  </svg>;
};
// ---------- peças ----------
const Fundo: React.FC<{src: string; z?: [number, number]; escuro?: number; filtro?: string; pos?: string; tremor?: number}> = ({src, z = [1.04, 1.12], escuro = 0.15, filtro, pos = 'center', tremor = 0}) => {
  const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig();
  const k = interpolate(f, [0, d], z, {...cl, easing: Easing.inOut(Easing.sin)});
  const t = tremor ? `translate(${Math.sin(f * 1.7) * tremor}px, ${Math.cos(f * 2.3) * tremor}px)` : '';
  return <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
    <Img src={staticFile('oxigenio/fundos/' + src + '.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${k}) ${t}`, filter: filtro}} />
    <AbsoluteFill style={{background: `rgba(0,0,0,${escuro})`}} />
  </AbsoluteFill>;
};
const Bolinhas: React.FC<{n: number; cor: string; some?: number; sem: number; r?: number; y0?: number; y1?: number}> = ({n, cor, some = 0, sem, r = 18, y0 = 300, y1 = 1500}) => {
  const f = useCurrentFrame();
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{Array.from({length: n}, (_, i) => {
    const rx = ((i * 97 + sem * 31) % 100) / 100, ry = ((i * 61 + sem * 17) % 100) / 100;
    const o = some > 0 && i % 5 === 0 ? 1 - some : 1;
    return <circle key={i} cx={60 + rx * 960 + Math.sin(f * 0.05 + i) * 20} cy={y0 + ry * (y1 - y0) + Math.cos(f * 0.04 + i) * 20} r={r} fill={cor} opacity={0.85 * o} stroke="#fff" strokeWidth={3} />;
  })}</svg>;
};
const Ondas: React.FC<{x: number; y: number; cor?: string}> = ({x, y, cor = '#ffe14a'}) => {
  const f = useCurrentFrame();
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{[0, 1, 2].map((i) => { const t = ((f + i * 8) % 24) / 24; return [-1, 1].map((l) => <path key={i + '' + l} d={`M${x + l * (200 + t * 120)} ${y - 60 - t * 30} q${l * 30} 60 0 120`} stroke={cor} strokeWidth={12} fill="none" opacity={1 - t} strokeLinecap="round" />); })}</svg>;
};
const Fumaca: React.FC<{x: number; y: number; n?: number}> = ({x, y, n = 8}) => {
  const f = useCurrentFrame();
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{Array.from({length: n}, (_, i) => { const t = ((f * 0.6 + i * 9) % 60) / 60; return <circle key={i} cx={x + Math.sin(i * 2 + f * 0.05) * 40 * t} cy={y - t * 300} r={20 + t * 70} fill="#d8d8d8" opacity={0.55 * (1 - t)} />; })}</svg>;
};
const Aviao: React.FC<{k: number}> = ({k}) => <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
  <g transform={`translate(${interpolate(k, [0, 1], [-200, 1200])} ${interpolate(k, [0, 1], [420, 640])}) rotate(8) scale(1.3)`}>
    <path d="M-120 0 Q-130 -18 -100 -20 L110 -14 Q150 -8 150 0 Q150 8 110 14 L-100 20 Q-130 18 -120 0Z" fill="#f4f4f4" stroke="#111" strokeWidth={6} />
    <path d="M-10 -10 L-60 -90 L-20 -90 L40 -10Z M-10 10 L-60 90 L-20 90 L40 10Z M-100 -14 L-130 -60 L-108 -60 L-80 -14Z" fill="#dfe4ea" stroke="#111" strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={70 - i * 26} cy={-4} r={6} fill="#5aa8e8" />)}
    <path d="M-20 60 q-30 20 -60 10" stroke="#fff" strokeWidth={4} opacity={0.6} fill="none" />
  </g>
</svg>;
const Gota: React.FC<{x: number; y: number}> = ({x, y}) => { const f = useCurrentFrame(); return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
  <g transform={`translate(${x} ${y + Math.sin(f * 0.1) * 10}) scale(${0.9 + 0.1 * spring({frame: f, fps: FPS, config: {damping: 8, mass: 0.5}})})`}>
    <path d="M0 -150 C 60 -60 110 -10 110 50 A110 110 0 0 1 -110 50 C -110 -10 -60 -60 0 -150Z" fill="#d8323a" stroke="#111" strokeWidth={8} />
    {[[-40, 30], [30, 60], [10, -10], [-20, 90], [50, 10]].map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={16 + Math.sin(f * 0.2 + i) * 3} fill="#7ad0ff" opacity={0.9} /><circle cx={a} cy={b} r={26} fill="#7ad0ff" opacity={0.25 + 0.15 * Math.sin(f * 0.2 + i)} /></g>)}
    <path d="M-60 -10 q-10 30 0 60" stroke="#fff" strokeWidth={10} opacity={0.5} fill="none" strokeLinecap="round" />
  </g></svg>; };
const Copo: React.FC<{x: number; y: number; k: number}> = ({x, y, k}) => { const f = useCurrentFrame(); const nivel = 1 - k; return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
  <g transform={`translate(${x} ${y})`}>
    <path d={`M-70 ${-160 + 220 * (1 - nivel)} L-60 ${60} L60 60 L70 ${-160 + 220 * (1 - nivel)}Z`} fill="#5ab4ff" opacity={0.8} />
    <path d="M-80 -170 L-62 66 L62 66 L80 -170" stroke="#111" strokeWidth={8} fill="rgba(255,255,255,.25)" />
    {Array.from({length: 10}, (_, i) => { const t = ((f * 0.8 + i * 12) % 80) / 80; return <circle key={i} cx={Math.sin(i * 3) * 50 + Math.sin(f * 0.1 + i) * 20} cy={-180 - t * 300} r={10 + t * 20} fill="#e8f6ff" opacity={(1 - t) * k} />; })}
  </g></svg>; };
const Rachas: React.FC<{k: number}> = ({k}) => <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
  {[['M540 1500 L470 1620 L520 1720 L430 1920', 0], ['M540 1500 L640 1590 L610 1700 L720 1920', 0.15], ['M540 1500 L320 1560 L180 1700', 0.3], ['M540 1500 L780 1530 L960 1640', 0.45], ['M470 1620 L300 1800', 0.6]].map(([d, a], i) => <path key={i} d={d as string} stroke="#0a0604" strokeWidth={18} fill="none" strokeDasharray={1000} strokeDashoffset={1000 * (1 - Math.min(1, Math.max(0, (k - (a as number)) * 2.2)))} strokeLinecap="round" />)}
</svg>;

// ---------- cenas ----------
const S1: React.FC = () => <><Fundo src="street_1" /><Boneco expr="choque" maos="cima" /></>;
const S2: React.FC = () => <><Fundo src="clouds_0" /><Bolinhas n={25} cor="#7ad0ff" sem={1} /><Bolinhas n={6} cor="#ff7a5a" sem={2} r={20} /><Boneco expr="aponta" maos="aponta" x={430} /></>;
const S3: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 4, d - 6); return <><Fundo src="clouds_2" escuro={0.05} filtro={`contrast(${1 + k * 0.3}) saturate(${1 - k * 0.4})`} /><AbsoluteFill style={{background: `rgba(255,255,255,${0.35 * (1 - k)})`}} /><Bolinhas n={25} cor="#ff7a5a" sem={3} some={k} /><Boneco expr="susto" maos="lado" y={1060} /></>; };
const S4: React.FC = () => { const f = useCurrentFrame(); const k = pr(f, 0, 14, Easing.out(Easing.back(2))); return <><Fundo src="sunny_sky_0" />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><g transform="translate(540 330)"><circle r={150} fill="rgba(255,255,255,.9)" stroke="#111" strokeWidth={10} />
    {Array.from({length: 11}, (_, i) => { const a = (-130 + i * 26) * Math.PI / 180; return <line key={i} x1={Math.sin(a) * 120} y1={-Math.cos(a) * 120} x2={Math.sin(a) * 140} y2={-Math.cos(a) * 140} stroke="#111" strokeWidth={6} />; })}
    <line x1={0} y1={0} x2={Math.sin((90 - k * 80) * Math.PI / 180) * 115} y2={-Math.cos((90 - k * 80) * Math.PI / 180) * 115} stroke="#e0180c" strokeWidth={12} strokeLinecap="round" /><circle r={16} fill="#111" /></g></svg>
  <Boneco expr="susto" maos="lado" y={1100} s={1 - k * 0.08} /></>; };
const S5: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const y = interpolate(f, [0, d], [1250, 980], {...cl, easing: Easing.out(Easing.cubic)}); return <><Fundo src="clouds_3" z={[1.15, 1.02]} pos="40% center" />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M880 1700 L880 420" stroke="#fff" strokeWidth={10} strokeDasharray="30 20" /><path d="M850 440 L880 380 L910 440Z" fill="#fff" />
    {Array.from({length: 10}, (_, i) => <line key={i} x1={860} x2={900} y1={1700 - i * 128} y2={1700 - i * 128} stroke="#fff" strokeWidth={6} />)}</svg>
  <Boneco expr="choque" maos="lado" x={450} y={y} s={0.85} /></>; };
const S6: React.FC = () => <><Fundo src="sunny_sky_3" filtro="blur(6px)" z={[1.1, 1.18]} /><Boneco expr="choque" maos="ouvido" s={1.25} y={980} /><Ondas x={540} y={980} /></>;
const S7: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 6, d - 4); return <><Fundo src="stove_fire_1" filtro={`brightness(${1 - k * 0.8}) saturate(${1 - k})`} escuro={0} /><Fumaca x={540} y={1100} n={10} /><Boneco expr="susto" maos="lado" x={800} y={1180} s={0.7} /></>; };
const S8: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 4, d - 4); return <><Fundo src="stove_fire_0" filtro={`brightness(${1 - k * 0.85}) hue-rotate(${k * 20}deg)`} escuro={0} /><Fumaca x={540} y={900} n={6} /></>; };
const S9: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 2, d - 4, Easing.in(Easing.quad)); return <><Fundo src="candles_2" filtro={`brightness(${1 - k * 0.9})`} escuro={0} /><Fumaca x={420} y={800} n={5} /><Fumaca x={660} y={820} n={5} /><Boneco expr="choque" maos="cima" x={540} y={1250} s={0.7} /></>; };
const S10: React.FC = () => <><Fundo src="highway_cars_1" tremor={4} /><Fumaca x={520} y={1100} n={12} /><Boneco expr="engasga" maos="lado" x={800} y={1200} s={0.7} tremor={8} /></>;
const S11: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); return <><Fundo src="clouds_1" /><Aviao k={pr(f, 0, d, Easing.inOut(Easing.sin))} /><Boneco expr="susto" maos="aponta" x={360} y={1260} s={0.75} /></>; };
const S12: React.FC = () => <><Fundo src="kitchen_interior_1" escuro={0.1} /><Boneco expr="tranquilo" maos="joinha" /></>;
const S13: React.FC = () => <><Fundo src="park_1" escuro={0.25} /><Boneco expr="bochecha" maos="lado" x={360} y={1100} s={0.85} /><Gota x={800} y={900} /></>;
const S14: React.FC = () => <><Fundo src="sunny_sky_2" pos="center top" /><Boneco expr="ue" maos="olha" y={1250} /></>;
const S15: React.FC = () => <><Fundo src="park_2" /><Bolinhas n={34} cor="#3a7aff" sem={5} y0={200} y1={1100} r={16} /><Boneco expr="ue" maos="cima" y={1220} s={0.85} /></>;
const S16: React.FC = () => { const f = useCurrentFrame(); return <><Fundo src="forest_2" />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{Array.from({length: 18}, (_, i) => { const x = ((f * 30 + i * 140) % 1600) - 300; return <path key={i} d={`M${x} ${300 + i * 80} q120 -30 240 0`} stroke="#fff" strokeWidth={8} opacity={0.6} fill="none" strokeLinecap="round" />; })}</svg>
  <Boneco expr="alivio" maos="lado" /></>; };
const S17: React.FC = () => <><Fundo src="park_3" filtro="blur(3px)" /><Boneco expr="alivio" maos="ouvido" s={1.15} y={1000} /><Ondas x={540} y={1000} cor="#7ad0ff" /></>;
const S18: React.FC = () => { const f = useCurrentFrame(); return <><Fundo src="beach_0" z={[1.2, 1.04]} /><AbsoluteFill style={{background: `rgba(255,0,0,${0.18 + 0.1 * Math.sin(f * 0.4)})`}} /><Boneco expr="panico" maos="cima" tremor={6} /></>; };
const S19: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 0, d); return <><Fundo src="ocean_3" filtro={`saturate(${1 - k * 0.6}) brightness(${1 + k * 0.2})`} />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{Array.from({length: 40}, (_, i) => { const t = ((f * 0.7 + i * 7) % 90) / 90; return <circle key={i} cx={(i * 131) % 1080} cy={1350 - t * 1100} r={30 + t * 90} fill="#f4fbff" opacity={0.5 * (1 - t) * (0.4 + k)} />; })}</svg>
  <Boneco expr="choque" maos="lado" x={760} y={1250} s={0.7} /></>; };
const S20: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); return <><Fundo src="ocean_0" /><Copo x={700} y={1000} k={pr(f, 4, d - 4)} /><Boneco expr="susto" maos="lado" x={330} y={1150} s={0.8} /></>; };
const S21: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); return <><Fundo src="cracked_earth_2" tremor={3} /><Rachas k={pr(f, 0, d)} /><Boneco expr="susto" maos="lado" y={880} s={0.9} /></>; };
const S22: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 0, d * 0.6); return <><Fundo src="forest_3" tremor={6 * (1 - k * 0.5)} z={[1.08, 1.0]} />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{Array.from({length: 60}, (_, i) => { const t = ((f * 0.9 + i * 5) % 50) / 50; return <rect key={i} x={(i * 173) % 1080} y={1300 + t * 600} width={14 + (i % 4) * 8} height={14 + (i % 3) * 8} fill="#5a4a3a" opacity={(1 - t) * k} transform={`rotate(${t * 200} ${(i * 173) % 1080} ${1300 + t * 600})`} />; })}</svg>
  <Boneco expr="panico" maos="cima" y={1000 + k * 120} s={0.85} tremor={5} /></>; };
const S23: React.FC = () => { const f = useCurrentFrame(); const {durationInFrames: d} = useVideoConfig(); const k = pr(f, 4, d * 0.6); return <><Fundo src="forest_1" escuro={0.35} />
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><defs><filter id="bl"><feGaussianBlur stdDeviation="22" /></filter></defs>{[-1, 1].map((l) => <circle key={l} cx={540 + l * 120} cy={1010} r={60 + k * 30} fill="#7ad8ff" opacity={0.6 * k} filter="url(#bl)" />)}</svg>
  <Boneco expr="choque" maos="olha" transp={k} y={720} s={1.1} /></>; };
const S24: React.FC = () => <><Fundo src="beach_3" z={[1.12, 1.0]} /><Boneco expr="alivio" maos="lado" /></>;

const PLANO: [string, React.FC][] = [
  ['e se o oxigenio', S1], ['primeiro so o', S2], ['o ar perde um', S3], ['a pressao cai', S4], ['pelas nossas contas', S5], ['seus ouvidos estalam', S6],
  ['quatro todo fogo', S7], ['o fogao da sua', S8], ['as velas', S9], ['tres todo motor', S10], ['carro moto aviao', S11], ['dois e voce', S12],
  ['da pra segurar', S13], ['e o ceu', S14], ['quem deixa o ceu', S15], ['um o oxigenio volta', S16], ['outro estalo', S17], ['agora o nivel dois', S18],
  ['se fosse assim', S19], ['os oceanos os rios', S20], ['quase metade do', S21], ['sem ele o chao', S22], ['uns sessenta e cinco', S23], ['ainda bem que', S24],
];
const tempo = montar(W, PLANO.map((p) => p[0]));
const {T, FALA, FIM} = tempo;
const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
const nn = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
const tW = (palavra: string, depois = 0) => { const i = W.findIndex((w) => nn(w.w) === palavra && w.t >= depois); return Math.round(W[i].t * FPS); };
const CONTA = [tW('cinco', 3), tW('quatro'), tW('tres', 17), tW('dois', 22), tW('um', 33)];
const N2 = at('agora o nivel dois');
const N2FIM = at('ainda bem que');

// relógio de 5 s
const Relogio: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 30) return null;
  const verm = f >= N2;
  let n: number; let frac: number; let tIni: number;
  if (!verm) { const k = CONTA.reduce((acc, t, i) => (f >= t ? i : acc), -1); n = k < 0 ? 5 : 5 - k; tIni = k < 0 ? 30 : CONTA[k]; const prox = k < 0 ? CONTA[0] : CONTA[k + 1] ?? N2; frac = k < 0 ? 0 : Math.min(1, (f - tIni) / Math.max(1, prox - tIni)); }
  else { const p = Math.min(1, (f - N2) / (N2FIM - N2)); n = Math.max(0, 5 - Math.floor(p * 5)); frac = (p * 5) % 1; tIni = N2 + Math.floor(p * 5) * (N2FIM - N2) / 5; if (f >= N2FIM) { n = 0; frac = 1; } }
  const cor = verm ? '#ff2a1a' : '#ffe000';
  const pop = interpolate(f - tIni, [0, 5, 12], [1.25, 0.95, 1], cl);
  const ent = spring({frame: f - 30, fps: FPS, config: {damping: 10, mass: 0.6}});
  const R = 120; const L = 2 * Math.PI * R;
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <g transform={`translate(540 300) scale(${ent * pop})`}>
      <circle r={R + 26} fill="rgba(0,0,0,.6)" stroke="#111" strokeWidth={8} />
      <circle r={R} fill="none" stroke="#ffffff33" strokeWidth={22} />
      <circle r={R} fill="none" stroke={cor} strokeWidth={22} strokeDasharray={L} strokeDashoffset={L * frac} transform="rotate(-90)" strokeLinecap="round" />
      <text y={52} textAnchor="middle" fontFamily={FONTE} fontSize={150} fill="#fff" stroke="#111" strokeWidth={8} paintOrder="stroke">{n}</text>
      <rect x={-22} y={-R - 62} width={44} height={30} rx={6} fill={cor} stroke="#111" strokeWidth={6} />
    </g></svg>;
};
// legenda: 1 palavra por vez, grande, no meio
const Legenda: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const i = W.findIndex((w, k) => t >= w.t && t < (W[k + 1]?.t ?? w.t + w.d + 0.3));
  if (i < 0 || f >= FALA) return null;
  const w = W[i]; const ini = Math.round(w.t * FPS); const s = spring({frame: f - ini, fps: FPS, config: {damping: 9, mass: 0.4}});
  const destaque = /^(cinco|quatro|tr[eê]s|dois|um|zero|n[ií]vel|oxig[eê]nio|apaga|gás|desmorona|nitrog[eê]nio)/i.test(w.w);
  return <div style={{position: 'absolute', top: 1570, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 118, color: destaque ? '#ffe000' : '#fff', transform: `scale(${0.7 + 0.3 * s})`,
    WebkitTextStroke: '12px #000', paintOrder: 'stroke fill', textShadow: '0 10px 30px rgba(0,0,0,.6)', textTransform: 'uppercase'}}>{w.w.replace(/[.,?!:]$/, '')}</div>;
};
export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {PLANO.map(([, C], i) => { const ini = T[i]; const fim = i < PLANO.length - 1 ? T[i + 1] : FALA; return <Sequence key={i} from={ini} durationInFrames={fim - ini}><C /></Sequence>; })}
    <Sequence from={FALA} durationInFrames={FIM - FALA}><Final /></Sequence>
    <Relogio />
    <Legenda />
    <Audio src={staticFile('oxigenio/narracao.mp3')} />
    <Audio src={staticFile('oxigenio/musica.mp3')} volume={(f) => interpolate(f, [0, 20, FIM - 30, FIM], [0, 0.14, 0.14, 0], cl)} />
    {T.slice(1).map((t, i) => <Sequence key={'w' + i} from={Math.max(0, t - 6)} durationInFrames={21}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.18} /></Sequence>)}
    {CONTA.map((t, i) => <Sequence key={'t' + i} from={t}><Audio src={staticFile('sfx/tick.wav')} volume={0.6} /></Sequence>)}
    <Sequence from={N2}><Audio src={staticFile('sfx/hit.wav')} volume={0.6} /></Sequence>
    <Sequence from={at('seus ouvidos estalam') + 8}><Audio src={staticFile('sfx/hit.wav')} volume={0.25} /></Sequence>
  </AbsoluteFill>
);
export const DURACAO = FIM;
void Easing;
