// Reel POV "Você pisa em VÊNUS: o que te mata primeiro?". Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #2, v1), aprovado pelo dono em 29/10. Post: sexta 30/10.
// POV de propósito (teste do dono nos Reels). Nada de "mata em segundos" e nada de cidades flutuantes.
// Reais: Vênus nas nuvens (Mariner 10, NASA) e no radar (Magellan, NASA). Superfície, sonda e esquemas: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, LAVA, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import palavras from './venus.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce abre a escotilha', 'quase nao da tempo', 'pra chegar ate aqui', 'atraves de nuvens', 'abaixo delas o ar', 'no chao faz cerca', 'quente o bastante', 'e a pressao e',
  'e como estar', 'o estranho e o silencio', 'aqui embaixo quase', 'o vento no chao', 'o que te mata', 'e o calor', 'voce nao sobreviveria', 'em 1982 uma',
  'foi feita pra durar', 'mas suba cinquenta', 'la em cima a pressao', 'e o lugar mais parecido', 'logo acima do inferno',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas suba cinquenta');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
// superfície ilustrada de Vênus: céu laranja espesso, chão de lava rochosa
const Chao: React.FC<{calor?: number; children?: React.ReactNode}> = ({calor = 1, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #6a3a10 0%, #c87a2a 40%, #e8a040 55%, #5a3418 56%, #2a1608 100%)', overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 26}, (_, i) => <path key={i} d={`M${random('rx' + i) * 1080} ${1100 + random('ry' + i) * 800} l${40 + random('rw' + i) * 120} -${10 + random('rh' + i) * 30} l${30 + random('rw2' + i) * 60} ${15 + random('rh' + i) * 20} Z`} fill="#3a2010" opacity={0.8} />)}
      </svg>
      <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(255,120,40,.35), transparent 50%)', opacity: calor * (0.7 + 0.3 * Math.sin(f * 0.15))}} />
      <AbsoluteFill style={{backdropFilter: `blur(${1.5 * calor}px)`}} />
      {children}
    </AbsoluteFill>
  );
};
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('venus/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '22px 44px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Num: React.FC<{children: React.ReactNode; y?: number; size?: number; cor?: string}> = ({children, y = 700, size = 220, cor = '#fff'}) => (
  <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size, color: cor, letterSpacing: -4, textShadow: '0 8px 40px rgba(0,0,0,.7)', fontVariantNumeric: 'tabular-nums'}}>{children}</div>
);

// ---------- cenas ----------
const Escotilha: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 16], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#0a0c10', transform: shake(f, a > 0.8 ? 6 : 0)}}>
      <div style={{position: 'absolute', left: 540 - 420, top: 960 - 420, width: 840, height: 840, borderRadius: '50%', overflow: 'hidden', border: '40px solid #3a3e46'}}>
        <AbsoluteFill style={{background: 'radial-gradient(circle, #fff0c0, #ff9a3a 50%, #c85a10)'}} />
      </div>
      <div style={{position: 'absolute', left: 540 - 420 + 840 * a, top: 960 - 420, width: 840, height: 840, borderRadius: '50%', background: '#5a5e66', border: '40px solid #3a3e46', boxSizing: 'border-box'}} />
      <AbsoluteFill style={{background: '#ffb060', opacity: interpolate(f, [12, 18, 30], [0, 0.6, 0.15], clamp)}} />
      <Titulo texto="VOCÊ ABRE A ESCOTILHA EM VÊNUS" y={260} size={92} />
      <Etiqueta texto="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};
const Arrepender: React.FC = () => <Glitch texto="QUASE NÃO DÁ TEMPO DE SE ARREPENDER" size={110} cor={OURO} />;
const ChegarAqui: React.FC = () => <Foto src="venus_nuvens.jpg" etq="IMAGEM REAL · VÊNUS · MARINER 10 · NASA" z={[1.1, 1.3]} pos="22% 50%"><Titulo texto="PRA CHEGAR ATÉ AQUI" y={300} size={110} /></Foto>;
const Acido: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #e8d8a0, #c8a860 60%, #a87a30)', overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 10}, (_, i) => <ellipse key={i} cx={(random('nx' + i) * 1400 - 160 + f * (2 + i % 3)) % 1300 - 100} cy={300 + i * 160} rx={360} ry={90} fill="#f4ecc8" opacity={0.5} />)}
        {Array.from({length: 40}, (_, i) => <line key={'d' + i} x1={random('dx' + i) * 1080} y1={(random('dy' + i) * 1920 + f * 18) % 1920} x2={random('dx' + i) * 1080 - 6} y2={(random('dy' + i) * 1920 + f * 18) % 1920 + 40} stroke="#d0e040" strokeWidth={4} opacity={0.6} />)}
      </svg>
      <Titulo texto="NUVENS DE ÁCIDO SULFÚRICO" y={300} size={100} cor="#3a2a08" />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const CO2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #8a5a20, #4a2a10)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 18}, (_, i) => { const x = 120 + (i % 6) * 170 + Math.sin(f * 0.05 + i) * 20, y = 1100 + Math.floor(i / 6) * 200 + Math.cos(f * 0.05 + i) * 20;
          return <g key={i}><circle cx={x - 46} cy={y} r={26} fill="#e04040" /><circle cx={x} cy={y} r={32} fill="#3a3a3a" /><circle cx={x + 46} cy={y} r={26} fill="#e04040" /></g>; })}
      </svg>
      <Num y={560}>96,5%</Num>
      <Texto y={830} size={80} cor={OURO} delay={6}>GÁS CARBÔNICO</Texto>
      <Titulo texto="O AR É QUASE TODO" y={300} size={100} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Calor: React.FC = () => <Chao><Contador ate={465} y={620} size={240} pre="~" suf=" °C" cor="#fff" /><Titulo texto="NO CHÃO" y={300} size={120} cor="#fff" /><Etiqueta texto="ILUSTRAÇÃO" /></Chao>;
const Chumbo: React.FC = () => {
  const f = useCurrentFrame();
  const m = interpolate(f, [4, 40], [0, 1], clamp);
  return (
    <Chao>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M380 ${1000 + 200 * m} L700 ${1000 + 200 * m} L${700 + 120 * m} 1200 Q540 ${1230 + 20 * m} ${380 - 120 * m} 1200 Z`} fill="#8a96a4" />
        <rect x={380} y={1000 + 200 * m} width={320} height={Math.max(0, 200 - 200 * m)} fill="#9aa6b4" />
      </svg>
      <Titulo texto="QUENTE PRA DERRETER CHUMBO" y={300} size={100} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Chao>
  );
};
const Pressao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a1a08, #0a0402 70%)', transform: shake(f, 3)}}>
      <Contador ate={92} y={620} size={300} suf="×" cor={VERMELHO} />
      <Texto y={980} size={60} cor="#fff" delay={8}>A PRESSÃO DA TERRA</Texto>
      <Titulo texto="E O PESO DO AR" y={300} size={110} />
    </AbsoluteFill>
  );
};
const Fundo: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #1c6a8a, #04121c ${30 + 60 * p}%, #000)`}}>
      <div style={{position: 'absolute', left: 80, top: 560, width: 10, height: 1100, background: 'rgba(255,255,255,.3)'}} />
      <div style={{position: 'absolute', left: 60, top: 560 + 1000 * p, width: 50, height: 10, background: OURO}} />
      <Num y={760} size={190}>~{Math.round(900 * p)} M</Num>
      <Texto y={1000} size={56} cor={CIANO} delay={6}>DE PROFUNDIDADE NO MAR</Texto>
      <Titulo texto="É COMO ESTAR A" y={300} size={110} />
      <Etiqueta texto="COMPARAÇÃO" />
    </AbsoluteFill>
  );
};
const Silencio: React.FC = () => <Chao calor={0.6}><Titulo texto="O ESTRANHO É O SILÊNCIO" y={300} size={100} /><Etiqueta texto="ILUSTRAÇÃO" /></Chao>;
const QuaseNaoVenta: React.FC = () => <Chao calor={0.6}><Selo texto={'VENTO NO CHÃO:\n0,3–1 M/S'} y={700} size={80} cor="#fff" /><Titulo texto="QUASE NÃO VENTA" y={300} size={110} /><Etiqueta texto="ILUSTRAÇÃO" /></Chao>;
const Caminhada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a2210, #0a0402 70%)'}}>
      {[['VENTO EM VÊNUS', 0.6, OURO], ['UMA CAMINHADA', 1.4, CIANO]].map(([t, v, c], i) => (
        <React.Fragment key={i}>
          <div style={{position: 'absolute', left: 100, top: 720 + i * 320, fontFamily: FONTE, fontSize: 48, color: c as string}}>{t}</div>
          <div style={{position: 'absolute', left: 100 + ((f * (v as number) * 8) % 800), top: 800 + i * 320, width: 80, height: 80, borderRadius: 40, background: c as string}} />
        </React.Fragment>
      ))}
      <Titulo texto="MAIS LENTO QUE UMA CAMINHADA" y={300} size={96} />
      <Etiqueta texto="COMPARAÇÃO" />
    </AbsoluteFill>
  );
};
const NaoTempestade: React.FC = () => <Chao calor={0.8}><Titulo texto="O QUE TE MATA NÃO É TEMPESTADE" y={300} size={96} /><Etiqueta texto="ILUSTRAÇÃO" /></Chao>;
const CalorPeso: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{transform: shake(f, 5)}}><Chao calor={1.4}><Selo texto={'O CALOR\nE O PESO DO AR'} y={700} size={110} cor={VERMELHO} /><Etiqueta texto="ILUSTRAÇÃO" /></Chao></AbsoluteFill>;
};
const NaoSobreviveria: React.FC = () => <Glitch texto="VOCÊ NÃO SOBREVIVERIA" size={130} cor={VERMELHO} />;
const Venera: React.FC = () => {
  const s = useSpring(2);
  return (
    <Chao calor={0.9}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 ${1180 - 80 * (1 - s)})`}>
          <rect x={-170} y={-40} width={340} height={70} rx={10} fill="#8a8e96" /><path d="M-120 -40 Q0 -260 120 -40 Z" fill="#aab0ba" />
          <rect x={-20} y={-330} width={40} height={100} fill="#6a6e76" /><circle cy={-340} r={30} fill="#aab0ba" />
          <path d="M-200 30 L-150 80 L150 80 L200 30" stroke="#6a6e76" strokeWidth={14} fill="none" />
        </g>
      </svg>
      <Titulo texto="VENERA 13 · 01/03/1982" y={300} size={96} cor={OURO} />
      <Texto y={500} size={48} delay={8}>SONDA SOVIÉTICA</Texto>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Chao>
  );
};
const Durar: React.FC = () => {
  const f = useCurrentFrame();
  const m = Math.round(interpolate(f, [4, 50], [0, 127], {...clamp, easing: Easing.out(Easing.quad)}));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a2210, #0a0402 70%)'}}>
      <Texto y={620} size={56} cor="#cfd8e8">FEITA PRA DURAR ~30 MIN</Texto>
      <Num y={740} size={260} cor={m > 30 ? VERDE : '#fff'}>{m} MIN</Num>
      <Titulo texto="E AGUENTOU…" y={300} size={120} />
    </AbsoluteFill>
  );
};
const Suba: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const k = Math.round(interpolate(f, [0, d], [0, 50], clamp));
  return (
    <Foto src="venus_nuvens.jpg" etq="IMAGEM REAL · VÊNUS · MARINER 10 · NASA" z={[1.5, 1.1]} pos="22% 50%">
      <Num y={700} size={240}>{k} KM</Num>
      <Titulo texto="MAS SUBA" y={300} size={130} cor={CIANO} />
    </Foto>
  );
};
const LaEmCima: React.FC = () => (
  <Foto src="venus_nuvens.jpg" etq="IMAGEM REAL · VÊNUS · MARINER 10 · NASA" z={[1.15, 1.25]} pos="22% 50%">
    <AbsoluteFill style={{background: 'rgba(0,0,0,.4)'}} />
    <Selo texto={'A 50 KM:\n1 ATM · 30–75 °C'} y={720} size={90} cor={VERDE} />
  </Foto>
);
const Parecido: React.FC = () => (
  <Foto src="venus_nuvens.jpg" etq="IMAGEM REAL · VÊNUS · MARINER 10 · NASA" z={[1.0, 1.1]} pos="22% 50%">
    <Titulo texto="O LUGAR MAIS PARECIDO COM A TERRA" y={260} size={92} cor={VERDE} />
  </Foto>
);
const Inferno: React.FC = () => (
  <AbsoluteFill>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 960, overflow: 'hidden'}}>
      <Img src={staticFile('venus/venus_nuvens.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '22% 50%', transform: 'scale(2.2)', transformOrigin: '22% 50%'}} />
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 960, height: 960, overflow: 'hidden'}}><Chao /></div>
    <Titulo texto="LOGO ACIMA DO INFERNO" y={820} size={110} cor={OURO} />
    <Etiqueta texto="NUVENS: IMAGEM REAL (NASA) · CHÃO: ILUSTRAÇÃO" />
  </AbsoluteFill>
);

const CENAS = [Escotilha, Arrepender, ChegarAqui, Acido, CO2, Calor, Chumbo, Pressao, Fundo, Silencio, QuaseNaoVenta, Caminhada, NaoTempestade, CalorPeso,
  NaoSobreviveria, Venera, Durar, Suba, LaEmCima, Parecido, Inferno];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 12, src: 'sfx/boom.wav', volume: 0.4}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="venus/narracao.mp3" calma={CALMA} sons={SONS} />;
