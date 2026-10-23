// Short "O supervulcão do Japão está RECARREGANDO" (Kikai). Roteiro do agente Roteirista, pré-aprovado pelo dono (v2).
// Feito a partir do modelo TodoMundoSumiu.tsx. Mapa com dados reais (Natural Earth 50m, recorte em dados/japao.json).
import React from 'react';
import {
  AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing,
} from 'remotion';
import {noise2D} from '@remotion/noise';
import palavras from './kikai.palavras.json';
import japao from './dados/japao.json';

const FPS = 30;
const W = palavras as {t: number; d: number; w: string}[];
const fr = (s: number) => Math.round(s * FPS);
const FALA = fr(W[W.length - 1].t + W[W.length - 1].d + 0.5);
const FIM = FALA + fr(2.4);
// índices das palavras onde cada cena começa
const CORTES = [0, 5, 14, 19, 23, 32, 38, 43, 49, 54, 64, 69, 75, 81, 85, 91, 97, 104, 110, 115, 119, 125, 127, 131, 137, 142, 150, 154];
const T = CORTES.map((i) => (i === 0 ? 0 : fr(W[i].t) - 1));
const CALMA = T[21];
export const DURACAO = FIM;

const OURO = '#FFD23F';
const LAVA = '#FF5A1F';
const MAR = '#0b2a44';
const VERDE = '#3ddc84';
const FONTE = 'Monts';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const useSpring = (delay = 0, cfg = {damping: 12, mass: 0.6}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: cfg});
};
const shake = (f: number, amp: number, seed = 'a') =>
  `translate(${noise2D(seed + 'x', f / 9, 0) * amp}px, ${noise2D(seed + 'y', 0, f / 9) * amp}px)`;

const Titulo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({
  texto, cor = '#fff', y = 260, size = 110, delay = 0,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size,
      color: cor, letterSpacing: -2, textShadow: '0 8px 40px rgba(0,0,0,.7)', padding: '0 40px', boxSizing: 'border-box', lineHeight: 1.05}}>
      {(() => { let n = 0; return texto.split(' ').map((pal, j) => (
        // quebra de linha só entre palavras; as letras entram uma a uma com mola
        <span key={j} style={{display: 'inline-block', whiteSpace: 'nowrap', margin: '0 0.14em'}}>
          {pal.split('').map((c, i) => {
            const s = spring({frame: f - delay - (n++) * 1.0, fps, config: {damping: 11, mass: 0.5}});
            return <span key={i} style={{display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 60}px) scale(${0.6 + 0.4 * s})`}}>{c}</span>;
          })}
        </span>
      )); })()}
    </div>
  );
};
const Texto: React.FC<{children: React.ReactNode; y: number; size?: number; cor?: string; delay?: number}> = ({children, y, size = 46, cor = '#cfd8e8', delay = 0}) => {
  const s = useSpring(delay);
  return <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size, color: cor,
    opacity: s, transform: `translateY(${(1 - s) * 30}px)`, letterSpacing: 2, padding: '0 50px', boxSizing: 'border-box'}}>{children}</div>;
};
// etiqueta honesta no topo (IMAGEM REAL / ANIMAÇÃO / ILUSTRAÇÃO / MAPA REAL)
const Etiqueta: React.FC<{texto: string; real?: boolean}> = ({texto, real}) => (
  <div style={{position: 'absolute', top: 150, width: '100%', display: 'flex', justifyContent: 'center'}}>
    <div style={{padding: '8px 22px', borderRadius: 30, background: real ? 'rgba(230,57,70,.92)' : 'rgba(0,0,0,.55)', color: real ? '#fff' : '#aab4cc',
      fontFamily: FONTE, fontSize: 28, letterSpacing: 3}}>{real ? '● ' : ''}{texto}</div>
  </div>
);
const Real: React.FC<{src: string; ini?: number; zoom?: [number, number]}> = ({src, ini = 0, zoom = [1.04, 1.14]}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <OffthreadVideo src={staticFile(src)} startFrom={fr(ini)} muted style={{width: '100%', height: '100%', objectFit: 'cover',
        transform: `scale(${interpolate(f, [0, d], zoom)})`}} />
    </AbsoluteFill>
  );
};

// ---------- corte da caldeira (mar, fundo, crosta e reservatório) ----------
const Corte: React.FC<{enche?: number; revela?: number; antigo?: number; sobe?: number}> = ({enche = 0.5, revela = 1, antigo = 0, sobe = 0}) => {
  const f = useCurrentFrame();
  const mar = 640, fundo = 860;
  const cald = `M0 ${fundo} L300 ${fundo} Q380 ${fundo + 10} 420 ${fundo + 120} L660 ${fundo + 120} Q700 ${fundo + 10} 780 ${fundo} L1080 ${fundo} L1080 1920 L0 1920 Z`;
  const ry = 150, cy = 1330, top = cy + ry - 2 * ry * enche;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d5f8f" /><stop offset="1" stopColor="#06182a" /></linearGradient>
        <linearGradient id="rocha" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2e28" /><stop offset="1" stopColor="#120c0a" /></linearGradient>
        <radialGradient id="magma" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stopColor="#ffd27a" /><stop offset="0.45" stopColor={LAVA} /><stop offset="1" stopColor="#7a1404" /></radialGradient>
        <clipPath id="res"><ellipse cx={540} cy={cy} rx={330} ry={ry} /></clipPath>
      </defs>
      <rect x={0} y={0} width={1080} height={mar} fill="#05070d" />
      <rect x={0} y={mar} width={1080} height={fundo - mar + 200} fill="url(#agua)" />
      {Array.from({length: 6}, (_, i) => <path key={i} d={`M0 ${mar + 4} ${Array.from({length: 28}, (_, k) => `L${k * 40} ${mar + 4 + Math.sin(k * 0.8 + f * 0.12 + i) * 5}`).join(' ')}`} stroke="rgba(160,210,255,.25)" strokeWidth={3} fill="none" />)}
      <path d={cald} fill="url(#rocha)" />
      {[0, 1, 2].map((i) => <path key={i} d={`M0 ${1040 + i * 120} Q540 ${1060 + i * 120} 1080 ${1030 + i * 120}`} stroke="rgba(255,255,255,.06)" strokeWidth={4} fill="none" />)}
      {antigo > 0 && <path d={`M420 ${fundo + 120} L660 ${fundo + 120}`} stroke={OURO} strokeWidth={10} strokeDasharray="22 14" opacity={antigo} />}
      <g opacity={revela}>
        <ellipse cx={540} cy={cy} rx={330} ry={ry} fill="rgba(40,10,5,.85)" stroke="rgba(255,140,80,.5)" strokeWidth={4} />
        <g clipPath="url(#res)">
          <rect x={200} y={top} width={680} height={400} fill="url(#magma)" />
          <path d={`M200 ${top} ${Array.from({length: 18}, (_, k) => `L${200 + k * 40} ${top + Math.sin(k + f * 0.2) * 8}`).join(' ')}`} stroke="#ffe0a0" strokeWidth={4} fill="none" />
        </g>
        <ellipse cx={540} cy={cy} rx={330} ry={ry} fill="none" stroke={LAVA} strokeWidth={6} opacity={0.4 + 0.3 * Math.sin(f * 0.25)} style={{filter: 'drop-shadow(0 0 30px #ff5a1f)'}} />
      </g>
      {sobe > 0 && Array.from({length: 7}, (_, i) => {
        const y = 1900 - ((f * 9 + i * 70) % 380);
        return <g key={i} opacity={sobe}><circle cx={540 + (i - 3) * 22} cy={y} r={14} fill={LAVA} style={{filter: 'drop-shadow(0 0 12px #ff5a1f)'}} /></g>;
      })}
      {sobe > 0 && <path d="M540 1900 L540 1490" stroke="rgba(255,90,31,.5)" strokeWidth={40} strokeLinecap="round" opacity={sobe} />}
    </svg>
  );
};

// ---------- cenas ----------
const Mar: React.FC = () => (
  <AbsoluteFill>
    <Real src="kikai/r217850.mp4" ini={2} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.35), transparent 30%, transparent 60%, rgba(0,0,0,.5))'}} />
    <Etiqueta texto="IMAGEM REAL · MAR ILUSTRATIVO" real />
    <Titulo texto="ESSE MAR ESCONDE UM MONSTRO" y={330} size={92} delay={6} />
  </AbsoluteFill>
);

const Recorde: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [4, d], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #160806, #3a1206 60%, #0c0503)', overflow: 'hidden', transform: shake(f, 6, 'r')}}>
      {Array.from({length: 26}, (_, i) => {
        const a = random('c' + i) * Math.PI - Math.PI;
        const r = 120 + p * (300 + random('cr' + i) * 520);
        const x = 540 + Math.cos(a) * r * 0.9, y = 1220 + Math.sin(a) * r * 1.2;
        const s = 140 + random('cs' + i) * 220 * (0.5 + p);
        return <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${120 + random('cc' + i) * 60},${80 + random('cd' + i) * 40},70,.85), transparent 70%)`}} />;
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1460 L380 1300 L460 1230 L620 1230 L700 1300 L1080 1460 L1080 1920 L0 1920 Z" fill="#0a0503" />
        <ellipse cx={540} cy={1235} rx={90} ry={22} fill={LAVA} style={{filter: 'drop-shadow(0 0 40px #ff5a1f)'}} />
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="A MAIOR EXPLOSÃO" y={300} size={104} cor={OURO} />
    </AbsoluteFill>
  );
};

const Recarga: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const n = interpolate(f, [2, d - 2], [0.08, 0.72], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a0c06, #050202 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'relative', width: 420, height: 760, borderRadius: 50, border: '14px solid #e8e0d0', padding: 16, boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 140, top: -56, width: 120, height: 42, borderRadius: 10, background: '#e8e0d0'}} />
        <div style={{position: 'absolute', left: 16, right: 16, bottom: 16, height: (760 - 60) * n, borderRadius: 26,
          background: 'linear-gradient(0deg, #8a1a04, #ff5a1f 60%, #ffc06a)', boxShadow: `0 0 ${60 + 30 * Math.sin(f * 0.3)}px rgba(255,90,31,.7)`}} />
      </div>
      <Titulo texto="RECARREGANDO" y={300} size={104} cor={LAVA} delay={4} />
    </AbsoluteFill>
  );
};

const proj = (lon0: number, lat0: number, k: number) => {
  const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * (180 / Math.PI);
  return (lon: number, lat: number): [number, number] => [540 + (lon - lon0) * k, 860 - (merc(lat) - merc(lat0)) * k];
};
const Mapa: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d * 0.75], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const k = Math.exp(interpolate(e, [0, 1], [Math.log(28), Math.log(170)]));
  const lon0 = interpolate(e, [0, 1], [136.5, 130.6]), lat0 = interpolate(e, [0, 1], [36.5, 31.3]);
  const pr = proj(lon0, lat0, k);
  const caminho = (japao as number[][][]).map((poly) => 'M' + poly.map(([lo, la]) => pr(lo, la).map((v) => v.toFixed(1)).join(' ')).join(' L') + ' Z').join(' ');
  const [px, py] = pr(130.31, 30.79);
  const pin = spring({frame: f - Math.round(d * 0.72), fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: MAR}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={caminho} fill="#2c4a5e" stroke="#7fa3c0" strokeWidth={2} />
        {pin > 0.01 && <>
          {[0, 1].map((i) => { const q = ((f * 0.03 + i * 0.5) % 1); return <circle key={i} cx={px} cy={py} r={20 + q * 110} fill="none" stroke={LAVA} strokeWidth={4} opacity={(1 - q) * pin} />; })}
          <circle cx={px} cy={py} r={18 * pin} fill={LAVA} /><circle cx={px} cy={py} r={7 * pin} fill="#fff" />
        </>}
      </svg>
      <div style={{position: 'absolute', left: px + 40, top: py - 120, fontFamily: FONTE, opacity: pin}}>
        <div style={{fontSize: 78, color: '#fff', textShadow: '0 4px 20px #000'}}>KIKAI</div>
        <div style={{fontSize: 40, color: OURO}}>JAPÃO</div>
      </div>
      <Texto y={pr(131.0, 32.6)[1] - 40} size={34} cor="#aac4dc" delay={10}>KYUSHU</Texto>
      <Etiqueta texto="MAPA REAL" />
    </AbsoluteFill>
  );
};

const Anos: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [2, 30], [0, 7300], {...clamp, easing: Easing.out(Easing.cubic)}));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1b1410, #050403 70%)'}}>
      <div style={{position: 'absolute', top: 600, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 230, color: '#fff', letterSpacing: -6,
        fontVariantNumeric: 'tabular-nums'}}>{n.toLocaleString('pt-BR')}</div>
      <Texto y={880} size={80} cor={OURO} delay={8}>ANOS ATRÁS</Texto>
      <Texto y={1010} size={38} delay={16}>A ÚLTIMA GRANDE ERUPÇÃO</Texto>
    </AbsoluteFill>
  );
};

const Volume: React.FC = () => {
  const f = useCurrentFrame();
  const cubos = Array.from({length: 30}, (_, i) => i);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #120705, #2a0c05)'}}>
      <div style={{position: 'absolute', left: 140, top: 520, width: 800, display: 'flex', flexWrap: 'wrap', gap: 14}}>
        {cubos.map((i) => {
          const s = spring({frame: f - 2 - i * 0.9, fps: FPS, config: {damping: 12}});
          return <div key={i} style={{width: 145, height: 120, borderRadius: 10, background: `linear-gradient(135deg, #ffb062, ${LAVA} 55%, #7a1404)`,
            opacity: s, transform: `translateY(${(1 - s) * -200}px)`, boxShadow: '0 0 30px rgba(255,90,31,.45)'}} />;
        })}
      </div>
      <Titulo texto="> 100 KM³" y={240} size={150} cor={OURO} />
      <Texto y={1330} size={40} delay={20}>DE ROCHA DERRETIDA, DE UMA VEZ</Texto>
    </AbsoluteFill>
  );
};

const Piroclastico: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #3b2a24 0%, #6a4a3a 45%, #0f2234 46%, #071422 100%)', overflow: 'hidden'}}>
      {Array.from({length: 34}, (_, i) => {
        const x = -400 + p * 1500 - random('px' + i) * 700;
        const y = 760 + random('py' + i) * 220 - Math.sin(p * 3 + i) * 20;
        const s = 220 + random('ps' + i) * 260;
        return <div key={i} style={{position: 'absolute', left: x, top: y - s / 2, width: s, height: s, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${150 + random('pc' + i) * 50},${120 + random('pd' + i) * 30},${100},.95), rgba(80,60,50,0) 70%)`}} />;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 870, height: 8, background: `linear-gradient(90deg, ${LAVA} ${p * 100}%, transparent ${p * 100}%)`, opacity: 0.8}} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="ATRAVESSOU O MAR" y={300} size={98} />
    </AbsoluteFill>
  );
};

const Area: React.FC = () => {
  const f = useCurrentFrame();
  const n = 100;
  const cheio = Math.round(interpolate(f, [2, 34], [0, n], clamp));
  const v = Math.round(interpolate(f, [2, 34], [0, 4500], clamp));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #14100e, #2a1e16)'}}>
      <div style={{position: 'absolute', left: 140, top: 560, width: 800, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8}}>
        {Array.from({length: n}, (_, i) => <div key={i} style={{height: 72, borderRadius: 6, background: i < cheio ? '#9a8a7a' : 'rgba(255,255,255,.06)'}} />)}
      </div>
      <div style={{position: 'absolute', top: 260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, fontVariantNumeric: 'tabular-nums'}}>
        {v.toLocaleString('pt-BR')} KM²</div>
      <Texto y={1400} size={40} delay={20}>COBERTOS PELOS DEPÓSITOS</Texto>
    </AbsoluteFill>
  );
};

const Kobe: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      <div style={{position: 'absolute', left: 110, top: 520, width: 860, height: 560, borderRadius: 30, background: 'rgba(8,14,30,.92)',
        border: '3px solid rgba(76,201,240,.7)', opacity: s, transform: `scale(${0.9 + 0.1 * s})`}}>
        <div style={{marginTop: 60, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: '#4cc9f0', letterSpacing: 4}}>2026 · NOVO ESTUDO</div>
        <div style={{marginTop: 50, textAlign: 'center', fontFamily: FONTE, fontSize: 84, color: '#fff', lineHeight: 1.05}}>UNIVERSIDADE<br />DE KOBE</div>
        <div style={{marginTop: 40, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: OURO}}>OLHARAM PRA DENTRO DO VULCÃO</div>
      </div>
    </AbsoluteFill>
  );
};

const Navio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="kikai/r237249.mp4" ini={1} zoom={[1.1, 1.18]} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3].map((i) => { const q = ((f * 0.04 + i * 0.25) % 1); return <ellipse key={i} cx={540} cy={1100} rx={60 + q * 700} ry={(60 + q * 700) * 0.25} fill="none" stroke="#4cc9f0" strokeWidth={5} opacity={(1 - q) * 0.9} />; })}
      </svg>
      <Etiqueta texto="IMAGEM REAL ILUSTRATIVA · ONDAS: ANIMAÇÃO" real />
      <Titulo texto="ONDAS SÍSMICAS" y={320} size={100} cor="#bfefff" />
    </AbsoluteFill>
  );
};

const Sensores: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a2a44, #031220)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1180, bottom: 0, background: 'linear-gradient(180deg, #2a221c, #0e0a08)'}} />
      {[0, 1, 2, 3, 4].map((i) => {
        const cai = spring({frame: f - i * 5, fps: FPS, config: {damping: 14, mass: 1}});
        const x = 150 + i * 195, y = interpolate(cai, [0, 1], [380, 1140]);
        const pisca = Math.floor(f / 8 + i) % 2 === 0;
        return <div key={i} style={{position: 'absolute', left: x - 40, top: y - 40, width: 80, height: 60, borderRadius: 14, background: '#e6c24a',
          boxShadow: pisca && cai > 0.95 ? '0 0 30px #4cc9f0' : 'none', border: '4px solid #6a5418'}} />;
      })}
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="SENSORES NO FUNDO DO MAR" y={300} size={80} />
    </AbsoluteFill>
  );
};

const Reservatorio: React.FC = () => {
  const f = useCurrentFrame();
  const scan = interpolate(f, [0, 40], [600, 1600], clamp);
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Corte enche={0.55} revela={interpolate(f, [10, 36], [0, 1], clamp)} />
      <div style={{position: 'absolute', left: 0, right: 0, top: scan, height: 6, background: '#4cc9f0', boxShadow: '0 0 30px #4cc9f0', opacity: f < 44 ? 1 : 0}} />
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="RESERVATÓRIO DE MAGMA" y={300} size={84} cor={OURO} delay={12} />
    </AbsoluteFill>
  );
};

const MesmoLugar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Corte enche={0.6} antigo={interpolate(f, [2, 14], [0, 1], clamp)} />
      <Texto y={930} size={34} cor={OURO} delay={4}>CRATERA DA ÚLTIMA ERUPÇÃO</Texto>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="NO MESMO LUGAR" y={300} size={100} />
    </AbsoluteFill>
  );
};

const MagmaNovo: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Corte enche={interpolate(f, [0, d], [0.6, 0.72], clamp)} sobe={interpolate(f, [0, 10], [0, 1], clamp)} />
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="MAGMA NOVO CHEGANDO" y={300} size={86} cor={LAVA} />
      <Texto y={520} size={34} delay={10}>PROVAVELMENTE RECÉM-INJETADO</Texto>
    </AbsoluteFill>
  );
};

const Enchendo: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const bate = 1 + 0.05 * Math.max(0, Math.sin(f * 0.35)) ** 8;
  return (
    <AbsoluteFill style={{background: '#05070d', transform: `scale(${bate}) ${shake(f, 4, 'e')}`}}>
      <Corte enche={interpolate(f, [0, d], [0.72, 0.9], clamp)} sobe={1} />
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="ENCHENDO DE NOVO" y={300} size={104} cor={LAVA} />
    </AbsoluteFill>
  );
};

const Calma: React.FC = () => {
  const f = useCurrentFrame();
  const g = f < 9;
  const dx = g ? (random('g' + f) - 0.5) * 50 : 0;
  return (
    <AbsoluteFill style={{background: '#05080d', justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 7}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('gy' + f + i) * 1920, height: 20 + random('gh' + i + f) * 80,
          background: i % 2 ? 'rgba(255,90,31,.35)' : 'rgba(0,220,255,.3)', transform: `translateX(${(random('gx' + i + f) - 0.5) * 260}px)`}} />
      ))}
      <div style={{fontFamily: FONTE, fontSize: 210, color: '#e8f4ff', transform: `translateX(${dx}px)`}}>CALMA.</div>
    </AbsoluteFill>
  );
};

const NaoExplodir: React.FC = () => {
  const s = useSpring(8);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #061420, #020609)'}}>
      <Titulo texto="RECARREGAR" y={560} size={120} cor="#bfefff" />
      <div style={{position: 'absolute', top: 730, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 160, color: '#ff3b3b', opacity: s, transform: `scale(${0.5 + 0.5 * s})`}}>≠</div>
      <Titulo texto="EXPLODIR" y={950} size={120} cor="#fff" delay={10} />
    </AbsoluteFill>
  );
};

const SemSinal: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(4, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #062a1a, #020806 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 300, height: 300, borderRadius: '50%', background: VERDE, opacity: s, transform: `scale(${s})`, position: 'absolute', top: 360,
        display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 ${80 + 20 * Math.sin(f * 0.2)}px rgba(61,220,132,.6)`}}>
        <svg width={170} height={170} viewBox="-60 -60 120 120"><path d="M-36 0 L-10 26 L38 -26" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
      </div>
      <div style={{position: 'absolute', top: 760, left: 60, right: 60, padding: '36px 20px', borderRadius: 30, background: 'rgba(0,0,0,.5)', border: `5px solid ${VERDE}`,
        textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05, opacity: s}}>SEM SINAL<br />DE ERUPÇÃO</div>
      <Texto y={1110} size={38} delay={16}>SEGUNDO OS CIENTISTAS · AGORA</Texto>
    </AbsoluteFill>
  );
};

const Vigiando: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({length: 120}, (_, i) => {
    const x = 60 + i * 8;
    const y = 940 + (i > 115 - (f % 120) && i < 118 - (f % 120) ? 0 : 0) + noise2D('s', i / 6, f / 20) * 14;
    return `${x},${y}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #071018, #02050a)'}}>
      <div style={{position: 'absolute', left: 50, top: 720, width: 980, height: 440, borderRadius: 24, background: '#08131e', border: '3px solid #1f3a52'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[780, 860, 940, 1020, 1100].map((y) => <line key={y} x1={60} y1={y} x2={1020} y2={y} stroke="rgba(255,255,255,.06)" strokeWidth={2} />)}
        <polyline points={pts} fill="none" stroke={VERDE} strokeWidth={5} />
      </svg>
      <div style={{position: 'absolute', left: 90, top: 750, fontFamily: FONTE, fontSize: 30, color: VERDE}}>● MONITORAMENTO</div>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="VIGIANDO" y={320} size={130} cor="#e8f4ff" />
    </AbsoluteFill>
  );
};

const Acordar: React.FC = () => (
  <AbsoluteFill>
    <Real src="kikai/r30142.mp4" ini={3} zoom={[1.0, 1.1]} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.45), transparent 35%, transparent 60%, rgba(0,0,0,.55))'}} />
    <Etiqueta texto="IMAGEM REAL · OUTRO VULCÃO DE KYUSHU" real />
    <Titulo texto="SE ELE ACORDAR…" y={320} size={100} />
  </AbsoluteFill>
);

const Final: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a0c06, #000 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 120, color: '#fff', opacity: s, transform: `scale(${0.8 + 0.2 * s})`, textAlign: 'center'}}>SIGA<br /><span style={{color: OURO}}>PARA MAIS</span></div>
    </AbsoluteFill>
  );
};


const Gelo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #cfe8f5, #6aa6c8 55%, #1c3b52)', overflow: 'hidden'}}>
      {Array.from({length: 40}, (_, i) => {
        const x = random('gx' + i) * 1080, y = ((f * (2 + random('gv' + i) * 4) + random('gy' + i) * 1920) % 1920);
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 10, height: 10, borderRadius: 5, background: '#fff', opacity: 0.8}} />;
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1300 L200 1150 L330 1240 L520 1080 L700 1220 L860 1120 L1080 1260 L1080 1920 L0 1920 Z" fill="#eef7fc" />
        <path d="M0 1380 L1080 1340 L1080 1920 L0 1920 Z" fill="#b9d9ea" />
      </svg>
      <Titulo texto="DESDE A" y={420} size={96} cor="#0b2a44" />
      <Titulo texto="ERA DO GELO" y={540} size={124} cor="#0b2a44" delay={6} />
      <Texto y={720} size={38} cor="#0b2a44" delay={14}>HÁ ~11.700 ANOS</Texto>
    </AbsoluteFill>
  );
};
const Ultima: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 60%, #2a0c06, #050202 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, transform: shake(f, 3, 'u')}}>
        <path d="M120 1350 L460 980 L620 980 L960 1350 Z" fill="#160a06" />
        <ellipse cx={540} cy={985} rx={80} ry={18} fill={LAVA} opacity={0.5 + 0.5 * Math.sin(f * 0.3)} style={{filter: 'drop-shadow(0 0 30px #ff5a1f)'}} />
      </svg>
      <Titulo texto="A ÚLTIMA GRANDE ERUPÇÃO" y={420} size={84} />
    </AbsoluteFill>
  );
};
const Derretida: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#1a0503', overflow: 'hidden'}}>
      {Array.from({length: 18}, (_, i) => {
        const x = noise2D('lx' + i, i, f / 60) * 300 + (i % 6) * 200;
        const y = (i / 18) * 1920 + noise2D('ly' + i, f / 50, i) * 80;
        const s = 360 + random('ls' + i) * 300;
        return <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%',
          background: `radial-gradient(circle, ${i % 3 ? '#ffb24a' : '#ffd890'}, ${LAVA} 40%, rgba(120,20,4,0) 70%)`, opacity: 0.8}} />;
      })}
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="ROCHA DERRETIDA" y={760} size={110} cor="#fff" />
    </AbsoluteFill>
  );
};
const Cinza: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a4440, #7a6e66 50%, #2a2622)', overflow: 'hidden'}}>
      {Array.from({length: 160}, (_, i) => {
        const x = (random('cx' + i) * 1200 + f * 3) % 1200 - 60, y = (random('cy' + i) * 1920 + f * (4 + random('cv' + i) * 6)) % 1920;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 5, height: 5, borderRadius: 3, background: '#d8d0c8', opacity: 0.7}} />;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: interpolate(f, [0, 70], [80, 380], clamp), background: 'linear-gradient(180deg, #a89c90, #6a5e54)'}} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="CINZA POR TODA PARTE" y={320} size={88} />
    </AbsoluteFill>
  );
};
const Dentro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Corte enche={0.55} revela={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => { const q = ((f * 0.035 + i / 3) % 1); return <path key={i} d={`M${540 - 80 - q * 380} ${640 + q * 760} Q540 ${700 + q * 900} ${540 + 80 + q * 380} ${640 + q * 760}`} stroke="#4cc9f0" strokeWidth={5} fill="none" opacity={1 - q} />; })}
      </svg>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="OLHARAM PRA DENTRO" y={320} size={94} cor="#bfefff" />
    </AbsoluteFill>
  );
};
const Indica: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Corte enche={0.6} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1060, textAlign: 'center', fontFamily: FONTE, fontSize: 220, color: OURO, opacity: 0.6 + 0.4 * Math.sin(f * 0.3)}}>?</div>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="PELO QUE TUDO INDICA…" y={320} size={84} />
    </AbsoluteFill>
  );
};
const Cientistas: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 230 + i * 220, top: 640, opacity: s, transform: `translateY(${(1 - s) * 60}px)`}}>
          <div style={{width: 120, height: 120, borderRadius: 60, background: '#c8d4ea', margin: '0 auto'}} />
          <div style={{width: 180, height: 260, borderRadius: '90px 90px 20px 20px', background: '#e8eef8', marginTop: 16}} />
        </div>
      ))}
      <Titulo texto="OS CIENTISTAS DIZEM:" y={330} size={84} cor="#bfefff" />
    </AbsoluteFill>
  );
};
const Mundo: React.FC = () => {
  const f = useCurrentFrame();
  const R = 340;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #07142a, #000 70%)'}}>
      <div style={{position: 'absolute', left: 540 - R, top: 820 - R, width: 2 * R, height: 2 * R, borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at 35% 30%, #2a6a9a, #0b2a44 60%, #020812)', boxShadow: '0 0 120px rgba(76,201,240,.3)'}}>
        <svg width={2 * R} height={2 * R}>
          {(japao as number[][][]).map((poly, i) => <path key={i} fill="#3d7a5a" d={'M' + poly.map(([lo, la]) => `${R + (lo - 135 + f * 0.05) * 9} ${R - (la - 33) * 11}`).join(' L') + ' Z'} />)}
        </svg>
      </div>
      {[0, 1, 2].map((i) => { const q = ((f * 0.03 + i / 3) % 1); return <div key={i} style={{position: 'absolute', left: 540 - (40 + q * 500), top: 820 - (40 + q * 500), width: 2 * (40 + q * 500), height: 2 * (40 + q * 500), borderRadius: '50%', border: `4px solid ${OURO}`, opacity: 1 - q}} />; })}
      <Titulo texto="O MUNDO QUER SABER ANTES" y={300} size={80} cor={OURO} />
    </AbsoluteFill>
  );
};

// ---------- camadas fixas ----------
const BLOCOS = (() => {
  const out: {ini: number; fim: number; ws: number[]}[] = [];
  let cur: number[] = [];
  W.forEach((w, i) => {
    const novaCena = CORTES.includes(i) && cur.length;
    if (novaCena || cur.length === 3) { out.push({ini: 0, fim: 0, ws: cur}); cur = []; }
    cur.push(i);
  });
  if (cur.length) out.push({ini: 0, fim: 0, ws: cur});
  out.forEach((b, k) => { b.ini = fr(W[b.ws[0]].t); b.fim = k < out.length - 1 ? fr(W[out[k + 1].ws[0]].t) : FALA; });
  return out;
})();
const Legenda: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = BLOCOS.find((x) => f >= x.ini && f < x.fim);
  if (!b) return null;
  return (
    <div style={{position: 'absolute', top: 1540, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 76, lineHeight: 1.1,
      textTransform: 'uppercase', padding: '0 60px', boxSizing: 'border-box'}}>
      {b.ws.map((i) => {
        const ini = fr(W[i].t);
        const ativo = f >= ini && f < ini + Math.max(fr(W[i].d), 6);
        const pop = spring({frame: f - ini, fps, config: {damping: 10, mass: 0.4}});
        return (
          <span key={i} style={{display: 'inline-block', margin: '0 12px', color: ativo ? OURO : '#fff',
            transform: `scale(${f >= ini ? 0.85 + 0.15 * pop + (ativo ? 0.08 : 0) : 0.85})`, opacity: f >= ini ? 1 : 0.35,
            textShadow: '0 0 6px #000, 0 6px 0 #000, 0 0 30px rgba(0,0,0,.9)', WebkitTextStroke: '3px #000', paintOrder: 'stroke fill'}}>
            {W[i].w.replace(/[.,]/g, '')}
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
const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const o = f >= CALMA && f < CALMA + 3 ? 0.9 - (f - CALMA) * 0.3 : 0;
  return <AbsoluteFill style={{background: '#fff', opacity: o, pointerEvents: 'none'}} />;
};

const CENAS = [Mar, Recorde, Gelo, Recarga, Mapa, Ultima, Anos, Volume, Derretida, Piroclastico, Cinza, Area, Kobe, Dentro, Navio, Sensores, Reservatorio, MesmoLugar, Indica, MagmaNovo, Enchendo, Calma, NaoExplodir, Cientistas, SemSinal, Vigiando, Acordar, Mundo];
export const INICIOS = T;

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
      {CENAS.map((C, i) => {
        const ini = T[i];
        const fim = i < CENAS.length - 1 ? T[i + 1] : FALA;
        return <Sequence key={i} from={ini} durationInFrames={fim - ini}><Entrada><C /></Entrada></Sequence>;
      })}
      <Sequence from={FALA} durationInFrames={FIM - FALA}><Entrada><Final /></Entrada></Sequence>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,.6))', pointerEvents: 'none'}} />
      <Grao />
      <Legenda />
      <Flash />
      <Audio src={staticFile('kikai/narracao.mp3')} />
      {T.slice(1).map((t, i) => (i + 1 === 21 ? null : (
        <Sequence key={i} from={Math.max(0, t - 6)} durationInFrames={21}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.2} /></Sequence>
      )))}
      <Sequence from={T[1]}><Audio src={staticFile('sfx/boom.wav')} volume={0.4} /></Sequence>
      <Sequence from={CALMA}><Audio src={staticFile('sfx/hit.wav')} volume={0.7} /></Sequence>
      <Sequence from={T[20] + 4}><Audio src={staticFile('sfx/boom.wav')} volume={0.3} /></Sequence>
    </AbsoluteFill>
  );
};
