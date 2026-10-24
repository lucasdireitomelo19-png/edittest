// Short POV "Um meteoro vai explodir em cima da sua cidade" (Chelyabinsk 2013). Roteiro do Roteirista, pré-aprovado pelo dono.
// Chelyabinsk é reconstrução (ANIMAÇÃO); as imagens reais são de cidades ilustrativas.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {
  Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, Glitch, Contador, Pino, proj, caminho, orto, caminhoGlobo,
  useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS,
} from '../comum';
import palavras from './meteoro.palavras.json';
import russia from './dados/russia.json';
import mundo from './dados/mundo.json';

const W = palavras as Palavra[];
const FRASES = [
  'um meteoro vai explodir', 'em cima da sua cidade', 'e ninguem vai ver', 'primeiro um clarao', 'mais forte que o sol', 'voce tira o celular',
  'um dois minutos depois', 'a janela do seu lado', 'isso ja aconteceu', 'em quinze de fevereiro', 'em chelyabinsk', 'uma pedra de uns vinte',
  'entrou na atmosfera', 'e explodiu no ceu', 'a onda de choque', 'danificou mais de sete mil', 'mais de mil e quinhentas', 'a maioria com vidro',
  'e ninguem viu ela', 'e pior', 'bem mais do que se pensava', 'uma a cada trinta', 'em algum lugar do planeta', 'mas calma', 'quase todas caem',
  'ou em lugar vazio', 'a chance de ser', 'e minuscula', 'e e por isso', 'novos telescopios', 'pra proxima nao',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas calma');
export const DURACAO = TEMPO.FIM;

const CEU = 'linear-gradient(180deg, #0a1630, #2a3a66 55%, #e08a5a)';

// risco do meteoro atravessando o quadro
const Risco: React.FC<{p: number; x0?: number; y0?: number; x1?: number; y1?: number; brilho?: number}> = ({p, x0 = 1200, y0 = -100, x1 = 300, y1 = 900, brilho = 1}) => {
  const x = interpolate(p, [0, 1], [x0, x1]), y = interpolate(p, [0, 1], [y0, y1]);
  const ang = Math.atan2(y1 - y0, x1 - x0);
  const L = 520;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><linearGradient id={'rs' + Math.round(x0)} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff6d8" /></linearGradient></defs>
      <g transform={`translate(${x} ${y}) rotate(${(ang * 180) / Math.PI})`}>
        <rect x={-L} y={-9} width={L} height={18} rx={9} fill={`url(#rs${Math.round(x0)})`} />
        <circle r={22 * brilho} fill="#fff" style={{filter: 'drop-shadow(0 0 40px #ffd27a) drop-shadow(0 0 90px #ff9a4a)'}} />
      </g>
    </svg>
  );
};

const Abre: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Real src="meteoro/r303665.mp4" ini={1} />
      <Sombra />
      <Risco p={interpolate(f, [0, d], [0.15, 0.7], clamp)} />
      <Etiqueta texto="IMAGEM REAL · METEORO: ANIMAÇÃO" real />
      <Titulo texto="UM METEORO VAI EXPLODIR" y={330} size={96} delay={4} />
    </AbsoluteFill>
  );
};
const SuaCidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="meteoro/r303665.mp4" ini={5} zoom={[1.15, 1.3]} />
      <Sombra />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1].map((i) => { const q = ((f * 0.04 + i * 0.5) % 1); return <circle key={i} cx={540} cy={1000} r={60 + q * 380} fill="none" stroke={VERMELHO} strokeWidth={6} opacity={1 - q} />; })}
        <line x1={540} y1={940} x2={540} y2={1060} stroke={VERMELHO} strokeWidth={6} /><line x1={480} y1={1000} x2={600} y2={1000} stroke={VERMELHO} strokeWidth={6} />
      </svg>
      <Etiqueta texto="IMAGEM REAL · CIDADE ILUSTRATIVA" real />
      <Titulo texto="EM CIMA DA SUA CIDADE" y={330} size={96} cor={OURO} />
    </AbsoluteFill>
  );
};
const Ninguem: React.FC = () => (
  <AbsoluteFill>
    <Real src="meteoro/r2165.mp4" ini={2} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · ILUSTRATIVA" real />
    <Titulo texto="NINGUÉM VAI VER ELE CHEGANDO" y={330} size={90} />
  </AbsoluteFill>
);
const Clarao: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const b = interpolate(f, [0, d * 0.6, d], [0, 0.85, 0.6], clamp);
  return (
    <AbsoluteFill style={{transform: shake(f, 5, 'c')}}>
      <Real src="meteoro/r199.mp4" ini={3} filtro={`brightness(${1 + b * 1.4})`} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 70% 18%, rgba(255,255,240,${b}), rgba(255,220,160,${b * 0.5}) 40%, transparent 75%)`}} />
      <Etiqueta texto="IMAGEM REAL · CLARÃO: ANIMAÇÃO" real />
      <Titulo texto="UM CLARÃO" y={330} size={130} cor="#1a1206" />
    </AbsoluteFill>
  );
};
const Bolido: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: CEU, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 120, top: 1320, width: 160, height: 160, borderRadius: 80, background: '#ffe9a8', opacity: 0.55}} />
      <Risco p={interpolate(f, [0, d], [0.1, 0.8], clamp)} x0={1250} y0={150} x1={-200} y1={1250} brilho={1.8} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1500 L60 1380 L140 1380 L160 1300 L260 1300 L280 1420 L380 1420 L400 1250 L520 1250 L540 1400 L660 1400 L680 1330 L800 1330 L820 1450 L940 1450 L960 1360 L1080 1360 L1080 1920 L0 1920 Z" fill="#0a0d16" />
      </svg>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="MAIS FORTE QUE O SOL" y={330} size={96} />
      <Texto y={560} size={36} cor="#fff" delay={8}>O SOL ↙ PARECE FRACO PERTO DELE</Texto>
    </AbsoluteFill>
  );
};
const Celular: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, {damping: 14, mass: 0.8});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, #3a3a66, #070812 75%)'}}>
      <div style={{position: 'absolute', left: 290, top: 560, width: 500, height: 960, borderRadius: 70, background: '#111', border: '10px solid #2b2b33',
        transform: `translateY(${(1 - s) * 900}px) rotate(${(1 - s) * 12}deg)`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 14, borderRadius: 56, background: CEU, overflow: 'hidden'}}>
          <Risco p={interpolate(f, [0, 70], [0.3, 0.75], clamp)} x0={900} y0={-50} x1={-100} y1={700} />
        </div>
        <div style={{position: 'absolute', top: 60, left: 50, fontFamily: FONTE, fontSize: 34, color: '#fff', display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 24, height: 24, borderRadius: 12, background: VERMELHO, opacity: Math.floor(f / 10) % 2 ? 1 : 0.3}} /> REC 00:0{Math.floor(f / FPS)}
        </div>
      </div>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="VOCÊ VAI FILMAR" y={300} size={104} />
    </AbsoluteFill>
  );
};
const Minutos: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.min(150, Math.round(interpolate(f, [0, 40], [0, 120], clamp)));
  const mm = Math.floor(s / 60), ss = String(s % 60).padStart(2, '0');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #12182a, #030409 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={900} r={300} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={26} />
        <circle cx={540} cy={900} r={300} fill="none" stroke={OURO} strokeWidth={26} strokeLinecap="round"
          strokeDasharray={`${(s / 150) * 1885} 1885`} transform="rotate(-90 540 900)" />
      </svg>
      <div style={{position: 'absolute', top: 800, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 190, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{mm}:{ss}</div>
      <Titulo texto="1, 2 MINUTOS DEPOIS…" y={300} size={90} cor={OURO} />
    </AbsoluteFill>
  );
};
const Janela: React.FC = () => {
  const f = useCurrentFrame();
  const q = f >= 8;
  const p = interpolate(f, [8, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#0b0f18', transform: q ? shake(f, 18 * (1 - p * 0.7), 'j') : undefined}}>
      <div style={{position: 'absolute', left: 140, top: 560, width: 800, height: 900, background: CEU, border: '30px solid #d8d2c4', boxSizing: 'border-box'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 26}, (_, i) => {
          const a = random('a' + i) * Math.PI * 2;
          const r = 30 + random('r' + i) * 380;
          const cx = 540 + Math.cos(a) * r * 0.9, cy = 1010 + Math.sin(a) * r;
          const tx = Math.cos(a) * p * (500 + random('v' + i) * 500), ty = Math.sin(a) * p * 500 + p * p * 700;
          const s = 40 + random('s' + i) * 90;
          const pts = [0, 1, 2].map((k) => { const b = a + k * 2.1 + random('k' + i + k); return `${Math.cos(b) * s},${Math.sin(b) * s}`; }).join(' ');
          return <polygon key={i} points={pts} transform={`translate(${cx + (q ? tx : 0)} ${cy + (q ? ty : 0)}) rotate(${p * 400 * (random('w' + i) - 0.5)})`}
            fill="rgba(200,230,255,.35)" stroke="rgba(255,255,255,.85)" strokeWidth={3} opacity={q ? 1 - p * 0.4 : 0.9} />;
        })}
        {!q && <rect x={170} y={590} width={740} height={840} fill="rgba(200,230,255,.18)" />}
      </svg>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="A JANELA EXPLODE" y={300} size={110} cor={q ? VERMELHO : '#fff'} />
    </AbsoluteFill>
  );
};
const Aconteceu: React.FC = () => <Glitch texto="ISSO JÁ ACONTECEU." size={150} />;
const Data: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 600, width: 900, padding: '60px 0', borderRadius: 30, background: 'rgba(30,20,8,.9)',
        border: `4px solid ${OURO}`, opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 150, color: '#fff', letterSpacing: -4}}>15/02/2013</div>
        <div style={{fontSize: 56, color: OURO, marginTop: 20}}>CHELYABINSK, RÚSSIA</div>
      </div>
    </AbsoluteFill>
  );
};
const MapaRussia: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d * 0.7], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const k = Math.exp(interpolate(e, [0, 1], [Math.log(9), Math.log(34)]));
  const pr = proj(interpolate(e, [0, 1], [80, 61.4]), interpolate(e, [0, 1], [58, 55.15]), k);
  const [px, py] = pr(61.4, 55.15);
  const pin = spring({frame: f - Math.round(d * 0.3), fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: '#0b2a44'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={caminho(russia as number[][][], pr)} fill="#3d5a48" stroke="#7fa3c0" strokeWidth={2} />
      </svg>
      <Pino x={px} y={py} s={pin} />
      <div style={{position: 'absolute', left: 0, right: 0, top: py + 70, textAlign: 'center', fontFamily: FONTE, opacity: pin}}>
        <div style={{fontSize: 80, color: '#fff', textShadow: '0 4px 20px #000'}}>CHELYABINSK</div>
        <div style={{fontSize: 40, color: OURO}}>RÚSSIA</div>
      </div>
      <Etiqueta texto="MAPA REAL" />
    </AbsoluteFill>
  );
};
const Tamanho: React.FC = () => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 4, fps: FPS, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1020, #1a2238)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1420, height: 6, background: 'rgba(255,255,255,.3)'}} />
      {/* prédio de 6 andares (~20 m) e a pedra do mesmo tamanho */}
      <div style={{position: 'absolute', left: 170, top: 1420 - 600, width: 260, height: 600, background: '#2a3550', border: '4px solid #46557a'}}>
        {Array.from({length: 12}, (_, i) => <div key={i} style={{position: 'absolute', left: 30 + (i % 2) * 120, top: 30 + Math.floor(i / 2) * 95, width: 80, height: 55, background: '#ffd58a', opacity: 0.6}} />)}
      </div>
      <div style={{position: 'absolute', left: 560, top: 1420 - 600 * s, width: 600 * s, height: 600 * s, borderRadius: '46% 54% 50% 50% / 52% 44% 56% 48%',
        background: 'radial-gradient(circle at 35% 30%, #8a7a6a, #3a2e26 70%)', boxShadow: 'inset -30px -40px 60px rgba(0,0,0,.6)', maxWidth: 360}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: s}}>
        <line x1={980} y1={820} x2={980} y2={1420} stroke={OURO} strokeWidth={6} /><line x1={950} y1={820} x2={1010} y2={820} stroke={OURO} strokeWidth={6} /><line x1={950} y1={1420} x2={1010} y2={1420} stroke={OURO} strokeWidth={6} />
      </svg>
      <Titulo texto="~20 M" y={300} size={170} cor={OURO} />
      <Texto y={520} size={38} delay={10}>MAIS OU MENOS UM PRÉDIO DE 6 ANDARES</Texto>
      <Etiqueta texto="ILUSTRAÇÃO · ESCALA APROXIMADA" />
    </AbsoluteFill>
  );
};
const Entrada: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#02040a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -600, top: 1150, width: 2280, height: 2280, borderRadius: '50%', background: 'radial-gradient(circle at 50% 10%, #2a6a9a, #0b2a44 50%)',
        boxShadow: '0 0 0 40px rgba(76,201,240,.18), 0 0 160px rgba(76,201,240,.4)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(${interpolate(p, [0, 1], [900, 420])} ${interpolate(p, [0, 1], [500, 1080])})`}>
          <path d="M0 0 L240 -260" stroke={`rgba(255,${180 - p * 80},80,${0.4 + p * 0.6})`} strokeWidth={30 + p * 40} strokeLinecap="round" style={{filter: 'blur(6px)'}} />
          <circle r={24 + p * 20} fill="#ffe9b0" style={{filter: `drop-shadow(0 0 ${20 + p * 60}px #ff8a3a)`}} />
        </g>
      </svg>
      <Etiqueta texto="ANIMAÇÃO" />
      <Titulo texto="ENTROU NA ATMOSFERA" y={300} size={96} />
      <Texto y={520} size={40} cor={OURO} delay={8}>A ~19 KM POR SEGUNDO</Texto>
    </AbsoluteFill>
  );
};
const Explodiu: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 26], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: CEU, overflow: 'hidden', transform: shake(f, 10 * (1 - p), 'x')}}>
      <div style={{position: 'absolute', left: 540 - 700 * p, top: 700 - 700 * p, width: 1400 * p, height: 1400 * p, borderRadius: '50%',
        background: 'radial-gradient(circle, #fff, rgba(255,230,160,.9) 25%, rgba(255,140,60,.4) 50%, transparent 70%)'}} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [2, 6, 14], [0, 0.9, 0], clamp)}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1500 L60 1380 L140 1380 L160 1300 L260 1300 L280 1420 L380 1420 L400 1250 L520 1250 L540 1400 L660 1400 L680 1330 L800 1330 L820 1450 L940 1450 L960 1360 L1080 1360 L1080 1920 L0 1920 Z" fill="#0a0d16" />
      </svg>
      <Etiqueta texto="ANIMAÇÃO · RECONSTRUÇÃO" />
      <Titulo texto="EXPLODIU NO CÉU" y={300} size={110} cor="#1a1206" />
      <Texto y={520} size={40} cor="#1a1206" delay={14}>A ~30 KM DE ALTURA</Texto>
    </AbsoluteFill>
  );
};
const Onda: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3a66, #b07a5a)', overflow: 'hidden', transform: p > 0.55 ? shake(f, 14, 'o') : undefined}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M${-200} ${1300} Q540 ${-200 + p * 1700} 1280 1300`} stroke="rgba(255,255,255,.75)" strokeWidth={14} fill="none" style={{filter: 'blur(2px)'}} />
        <path d={`M${-200} ${1300} Q540 ${-260 + p * 1700} 1280 1300`} stroke="rgba(255,255,255,.3)" strokeWidth={40} fill="none" style={{filter: 'blur(8px)'}} />
        <path d="M0 1500 L60 1380 L140 1380 L160 1300 L260 1300 L280 1420 L380 1420 L400 1250 L520 1250 L540 1400 L660 1400 L680 1330 L800 1330 L820 1450 L940 1450 L960 1360 L1080 1360 L1080 1920 L0 1920 Z" fill="#0a0d16" />
      </svg>
      <Etiqueta texto="ANIMAÇÃO · RECONSTRUÇÃO" />
      <Titulo texto="A ONDA DE CHOQUE" y={300} size={104} />
    </AbsoluteFill>
  );
};
const Predios: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1b1a24, #050508 70%)'}}>
      <div style={{position: 'absolute', left: 120, top: 1060, width: 840, display: 'flex', flexWrap: 'wrap', gap: 10}}>
        {Array.from({length: 36}, (_, i) => {
          const s = spring({frame: f - 2 - i * 0.35, fps: FPS, config: {damping: 14}});
          return <div key={i} style={{width: 60, height: 40 + random('h' + i) * 50, background: '#3a4258', opacity: s, alignSelf: 'flex-end',
            borderTop: `5px solid ${s > 0.9 ? VERMELHO : '#3a4258'}`}} />;
        })}
      </div>
      <Contador ate={7200} y={560} size={210} suf="" />
      <Texto y={820} size={72} cor={OURO} delay={6}>PRÉDIOS DANIFICADOS</Texto>
    </AbsoluteFill>
  );
};
const Feridos: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #241818, #080505 70%)'}}>
    <Contador ate={1500} y={600} size={230} />
    <Texto y={880} size={80} cor={VERMELHO} delay={6}>FERIDOS</Texto>
    <Texto y={1000} size={36} delay={14}>NENHUMA MORTE</Texto>
  </AbsoluteFill>
);
const Vidro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0b0f18'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={190} y={560} width={700} height={820} fill="rgba(160,200,240,.12)" stroke="#d8d2c4" strokeWidth={24} />
        {Array.from({length: 14}, (_, i) => {
          const a = (i / 14) * Math.PI * 2 + random('t' + i) * 0.3;
          const len = interpolate(f, [0, 12], [0, 1], clamp) * (260 + random('l' + i) * 200);
          return <path key={i} d={`M540 970 L${540 + Math.cos(a) * len * 0.5 + 20} ${970 + Math.sin(a) * len * 0.5} L${540 + Math.cos(a) * len} ${970 + Math.sin(a) * len}`} stroke="#fff" strokeWidth={4} fill="none" />;
        })}
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="A MAIORIA POR VIDRO QUEBRADO" y={300} size={84} />
    </AbsoluteFill>
  );
};
const Radar: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 6;
  return (
    <AbsoluteFill style={{background: '#020a06'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[120, 240, 360].map((r) => <circle key={r} cx={540} cy={980} r={r} fill="none" stroke="rgba(61,220,132,.3)" strokeWidth={3} />)}
        <line x1={540} y1={980} x2={540 + Math.cos((a * Math.PI) / 180) * 360} y2={980 + Math.sin((a * Math.PI) / 180) * 360} stroke={VERDE} strokeWidth={6} />
        <path d={`M540 980 L${540 + Math.cos(((a - 40) * Math.PI) / 180) * 360} ${980 + Math.sin(((a - 40) * Math.PI) / 180) * 360} A360 360 0 0 1 ${540 + Math.cos((a * Math.PI) / 180) * 360} ${980 + Math.sin((a * Math.PI) / 180) * 360} Z`} fill="rgba(61,220,132,.18)" />
      </svg>
      <Titulo texto="0 AVISOS" y={300} size={150} cor={VERDE} />
      <Texto y={1400} size={40} delay={8}>NINGUÉM VIU ELA CHEGANDO</Texto>
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Pior: React.FC = () => <Glitch texto="E PIOR:" size={220} cor={VERMELHO} />;
const Grafico: React.FC = () => {
  const f = useCurrentFrame();
  const a = spring({frame: f - 2, fps: FPS, config: {damping: 14}}), b = spring({frame: f - 12, fps: FPS, config: {damping: 14}});
  const barra = (x: number, h: number, s: number, cor: string, rot: string, sub: string) => (
    <>
      <div style={{position: 'absolute', left: x, top: 1350 - h * s, width: 300, height: h * s, borderRadius: '20px 20px 0 0', background: cor}} />
      <div style={{position: 'absolute', left: x - 40, width: 380, top: 1380, textAlign: 'center', fontFamily: FONTE, fontSize: 44, color: '#fff'}}>{rot}</div>
      <div style={{position: 'absolute', left: x - 40, width: 380, top: 1440, textAlign: 'center', fontFamily: FONTE, fontSize: 30, color: '#9aa8c2'}}>{sub}</div>
    </>
  );
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1020, #050810)'}}>
      {barra(150, 160, a, '#46557a', 'ANTES', '1 A CADA 120–150 ANOS')}
      {barra(630, 560, b, VERMELHO, 'AGORA', '1 A CADA 30–40 ANOS')}
      <Titulo texto="CAEM BEM MAIS" y={300} size={110} cor={OURO} />
      <Texto y={460} size={36} delay={6}>DO QUE SE PENSAVA · PEDRAS DE ~20 M</Texto>
    </AbsoluteFill>
  );
};
const Globo: React.FC<{titulo?: string; sub?: string; pontos?: 'freq' | 'mar'}> = ({titulo, sub, pontos = 'freq'}) => {
  const f = useCurrentFrame();
  const g = orto(-30 + f * 0.6, 15, 380, 540, 980);
  const pts = Array.from({length: 18}, (_, i) => [random('lo' + i) * 360 - 180, random('la' + i) * 120 - 60] as [number, number]);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #07142a, #000 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={980} r={380} fill="#0b2a44" />
        <path d={caminhoGlobo(mundo as number[][][], g)} fill="#3d6a52" />
        <circle cx={540} cy={980} r={380} fill="none" stroke="rgba(76,201,240,.4)" strokeWidth={4} />
        {pts.map(([lo, la], i) => {
          const [x, y, v] = g(lo, la);
          const s = spring({frame: f - 4 - i * 2.5, fps: FPS, config: {damping: 10}});
          return v && s > 0.01 ? <circle key={i} cx={x} cy={y} r={14 * s} fill={pontos === 'mar' ? CIANO : OURO} style={{filter: 'drop-shadow(0 0 10px #fff)'}} /> : null;
        })}
      </svg>
      {titulo && <Titulo texto={titulo} y={300} size={96} cor={OURO} />}
      {sub && <Texto y={1420} size={44} cor="#fff" delay={8}>{sub}</Texto>}
      <Etiqueta texto={pontos === 'mar' ? 'ILUSTRAÇÃO · PONTOS ILUSTRATIVOS' : 'ILUSTRAÇÃO'} />
    </AbsoluteFill>
  );
};
const Frequencia: React.FC = () => <Globo titulo="1 A CADA 30–40 ANOS" />;
const Planeta: React.FC = () => <Globo titulo="NO MUNDO" sub="EM ALGUM LUGAR DO PLANETA" />;
const Calma: React.FC = () => <Glitch texto="CALMA." size={210} />;
const Mar: React.FC = () => <Globo titulo="QUASE TODAS CAEM NO MAR" pontos="mar" />;
const Vazio: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #d9b98a, #a8845a 55%, #5a4026)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d="M0 1200 Q300 1120 540 1180 T1080 1150 L1080 1920 L0 1920 Z" fill="#8a6a44" />
    </svg>
    <Etiqueta texto="ILUSTRAÇÃO" />
    <Titulo texto="OU EM LUGAR VAZIO" y={300} size={100} cor="#2a1a08" />
  </AbsoluteFill>
);
const Chance: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04060c'}}>
      {Array.from({length: 400}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 80 + (i % 20) * 46, top: 600 + Math.floor(i / 20) * 46, width: 30, height: 30, borderRadius: 6,
          background: i === 237 ? VERMELHO : 'rgba(255,255,255,.12)', boxShadow: i === 237 ? `0 0 ${20 + 10 * Math.sin(f * 0.3)}px ${VERMELHO}` : undefined}} />
      ))}
      <Titulo texto="A CHANCE DE SER AQUI" y={300} size={90} />
    </AbsoluteFill>
  );
};
const Minuscula: React.FC = () => {
  const s = useSpring(0, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #062a1a, #020806 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 150, color: VERDE, transform: `scale(${0.6 + 0.4 * s})`, opacity: s}}>MINÚSCULA</div>
      <div style={{position: 'absolute', top: 1100, width: 12, height: 12, borderRadius: 6, background: '#fff', opacity: s}} />
    </AbsoluteFill>
  );
};
const Porisso: React.FC = () => <Glitch texto="POR ISSO…" size={190} cor={CIANO} />;
const Telescopio: React.FC = () => {
  const f = useCurrentFrame();
  const abre = interpolate(f, [4, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #02040c, #0c1630 70%, #1a2240)', overflow: 'hidden'}}>
      {Array.from({length: 90}, (_, i) => <div key={i} style={{position: 'absolute', left: random('sx' + i) * 1080, top: random('sy' + i) * 1100, width: 4, height: 4, borderRadius: 2, background: '#fff', opacity: 0.3 + 0.7 * random('so' + i)}} />)}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={290} y={1180} width={500} height={420} fill="#c8ccd6" />
        <path d="M290 1180 A250 250 0 0 1 790 1180 Z" fill="#e4e7ee" />
        <rect x={540 - 50 * abre} y={930} width={100 * abre} height={250} fill="#0c1630" />
        <rect x={0} y={1600} width={1080} height={320} fill="#0a0d16" />
        <line x1={540} y1={1150} x2={540 + 160 * abre} y2={1150 - 260 * abre} stroke="#6a7288" strokeWidth={40} strokeLinecap="round" />
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="NOVOS TELESCÓPIOS" y={300} size={104} cor={CIANO} />
    </AbsoluteFill>
  );
};
const Surpresa: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #0c1a2e, #000 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1060} r={180} fill="none" stroke={CIANO} strokeWidth={6} />
        <circle cx={540 + Math.cos(f * 0.05) * 180} cy={1060 + Math.sin(f * 0.05) * 180} r={16} fill={OURO} />
        <line x1={540} y1={1060} x2={540 + Math.cos(f * 0.05) * 180} y2={1060 + Math.sin(f * 0.05) * 180} stroke="rgba(76,201,240,.5)" strokeWidth={3} strokeDasharray="10 8" />
      </svg>
      <Titulo texto="PRA PRÓXIMA NÃO CHEGAR DE SURPRESA" y={330} size={84} />
    </AbsoluteFill>
  );
};

const CENAS = [Abre, SuaCidade, Ninguem, Clarao, Bolido, Celular, Minutos, Janela, Aconteceu, Data, MapaRussia, Tamanho, Entrada, Explodiu, Onda, Predios,
  Feridos, Vidro, Radar, Pior, Grafico, Frequencia, Planeta, Calma, Mar, Vazio, Chance, Minuscula, Porisso, Telescopio, Surpresa];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const SONS = [
  {em: T[FRASES.indexOf('a janela do seu lado')] + 8, src: 'sfx/boom.wav', volume: 0.6},
  {em: T[FRASES.indexOf('e explodiu no ceu')] + 2, src: 'sfx/boom.wav', volume: 0.5},
  {em: T[FRASES.indexOf('a onda de choque')] + 14, src: 'sfx/boom.wav', volume: 0.35},
];

export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="meteoro/narracao.mp3" calma={CALMA} sons={SONS} />;
