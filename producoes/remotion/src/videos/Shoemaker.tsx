// Reel "Existe uma pessoa ENTERRADA na Lua" (Eugene Shoemaker, Lunar Prospector, 1999). Roteiro do Roteirista (reels_2026-11-02_03.md #1, v1), aprovado pelo dono em 29/10. Post: 02/11 (Finados).
// Entrega direta na versão final. Tom respeitoso. "Enterrada" é figura de linguagem: a fala diz "provavelmente virou pó".
// Reais: Lua (NASA SVS 5587) e o Vulcan com a Peregrine na plataforma (NASA/KSC, jan/2024). Lunar Prospector: ilustração da NASA. O resto é animação própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, FPS} from '../comum';
import palavras from './shoemaker.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'existe uma pessoa enterrada', 'e ninguem nunca vai', 'o tumulo dela', 'o nome dele era', 'um geologo apaixonado', 'o sonho dele era', 'foi barrado por um', 'nunca saiu da terra',
  'ate 1999', 'naquele ano a nasa', 'de proposito contra', 'e dentro dela ia', 'com cerca de vinte', 'a sonda bateu', 'o frasco provavelmente', 'mas ele chegou',
  'uma colega disse', 'e ate onde se sabe', 'mas isso pode mudar', 'em 2024 a nave', 'o dna de cerca', 'falhou e queimou', 'e nem todo mundo', 'a nacao navajo',
  'hoje mandar cinzas', 'entao neste dia de finados', 'quem decide se',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas isso pode mudar');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const Estrelas: React.FC<{n?: number}> = ({n = 150}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.8 + random('sr' + i) * 2.2} fill="#fff" opacity={0.3 + random('so' + i) * 0.6} />)}
  </svg>
);
// Lua real (NASA SVS) com zoom; `polo` desloca o zoom para o polo sul
const Lua: React.FC<{z?: [number, number]; polo?: number; brilho?: number; children?: React.ReactNode; etq?: string}> = ({z = [1, 1.12], polo = 0, brilho = 1, children, etq = 'IMAGEM REAL · LUA · NASA'}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const k = interpolate(f, [0, d], z);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Estrelas n={60} />
      <Img src={staticFile('shoemaker/lua_cheia.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${k})`,
        transformOrigin: `50% ${50 + polo * 22}%`, filter: `brightness(${brilho})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Foto: React.FC<{src: string; etq: string; real?: boolean; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, real, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('shoemaker/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real={real} />
      {children}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number; rot?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3, rot = 0}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '22px 44px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.55)', opacity: s, transform: `rotate(${rot}deg) scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Vela: React.FC<{y?: number}> = ({y = 1050}) => {
  const f = useCurrentFrame();
  const fl = 1 + 0.08 * Math.sin(f * 0.7) + 0.05 * Math.sin(f * 1.9);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="luz"><stop offset="0" stopColor="#ffd27a" stopOpacity={0.55} /><stop offset="1" stopColor="#ffd27a" stopOpacity={0} /></radialGradient></defs>
      <circle cx={540} cy={y - 60} r={360 * fl} fill="url(#luz)" />
      <rect x={480} y={y} width={120} height={340} rx={14} fill="#efe6d2" />
      <line x1={540} y1={y} x2={540} y2={y - 26} stroke="#2a2018" strokeWidth={5} />
      <path d={`M540 ${y - 120 * fl} Q575 ${y - 50} 540 ${y - 22} Q505 ${y - 50} 540 ${y - 120 * fl} Z`} fill="#ffb347" />
      <path d={`M540 ${y - 80 * fl} Q556 ${y - 44} 540 ${y - 26} Q524 ${y - 44} 540 ${y - 80 * fl} Z`} fill="#fff4c0" />
    </svg>
  );
};

// ---------- cenas ----------
const Gancho: React.FC = () => <Lua z={[1.05, 1.25]}><Titulo texto="EXISTE UMA PESSOA ENTERRADA NA LUA" y={260} size={92} /></Lua>;
const Ninguem: React.FC = () => <Lua z={[1.25, 1.45]} brilho={0.7}><Titulo texto="NINGUÉM VAI PODER VISITAR" y={260} size={96} cor={OURO} /></Lua>;
const Tumulo: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 70%, #24242a, #050507 70%)'}}>
      <Estrelas />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect y={1300} width={1080} height={620} fill="#8a8a8e" />
        {Array.from({length: 18}, (_, i) => <ellipse key={i} cx={random('cx' + i) * 1080} cy={1340 + random('cy' + i) * 500} rx={20 + random('cr' + i) * 60} ry={8 + random('cr' + i) * 20} fill="#6a6a6e" />)}
        <path d={`M400 1320 L400 ${1320 - 420 * s} Q540 ${1320 - 520 * s} 680 ${1320 - 420 * s} L680 1320 Z`} fill="#4a4a50" stroke="#2a2a2e" strokeWidth={6} />
        <text x={540} y={1320 - 300 * s} textAnchor="middle" fontFamily={FONTE} fontSize={50} fill="#cfd2da" opacity={s}>?</text>
      </svg>
      <Titulo texto="O TÚMULO DELA" y={330} size={120} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Nome: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1a22, #050507 70%)'}}>
      <Estrelas n={80} />
      <div style={{position: 'absolute', top: 720, width: '100%', textAlign: 'center', fontFamily: FONTE, opacity: s, transform: `scale(${0.9 + 0.1 * s})`}}>
        <div style={{fontSize: 70, color: '#cfd2da', letterSpacing: 6}}>EUGENE</div>
        <div style={{fontSize: 150, color: '#fff', letterSpacing: -2}}>SHOEMAKER</div>
        <div style={{fontSize: 50, color: OURO, marginTop: 20}}>GEÓLOGO</div>
      </div>
    </AbsoluteFill>
  );
};
const Geologo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Lua z={[1.4, 1.6]}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[[420, 820, 90], [650, 1060, 60], [380, 1180, 50]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r * interpolate(f, [i * 6, i * 6 + 14], [0, 1], clamp)} fill="none" stroke={OURO} strokeWidth={5} strokeDasharray="14 10" />)}
      </svg>
      <Titulo texto="UM GEÓLOGO APAIXONADO PELA LUA" y={260} size={88} />
    </Lua>
  );
};
const Sonho: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1426, #02040a 70%)'}}>
    <Estrelas />
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <circle cx={540} cy={1000} r={300} fill="#e8eef4" /><ellipse cx={540} cy={1020} rx={210} ry={170} fill="#1a2a3a" />
      <ellipse cx={470} cy={960} rx={60} ry={30} fill="#fff" opacity={0.25} />
    </svg>
    <Titulo texto="O SONHO: SER ASTRONAUTA" y={330} size={100} cor={CIANO} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Barrado: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1426, #02040a 70%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <circle cx={540} cy={1000} r={300} fill="#e8eef4" opacity={0.35} /><ellipse cx={540} cy={1020} rx={210} ry={170} fill="#1a2a3a" opacity={0.5} />
    </svg>
    <Selo texto="BARRADO" cor={VERMELHO} y={880} size={150} rot={-10} />
    <Texto y={1180} size={50} delay={10}>POR UM PROBLEMA DE SAÚDE</Texto>
  </AbsoluteFill>
);
const NuncaSaiu: React.FC = () => (
  <AbsoluteFill style={{background: '#02040a'}}>
    <Estrelas />
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="terra" cx="40%" cy="35%"><stop offset="0" stopColor="#5aa0e0" /><stop offset="1" stopColor="#0b2a5a" /></radialGradient></defs>
      <circle cx={540} cy={1000} r={280} fill="url(#terra)" />
      <path d="M400 900 Q470 860 520 920 Q560 980 500 1040 Q440 1060 420 1000 Z M600 1050 Q680 1000 720 1080 Q700 1160 640 1150 Z" fill="#3f7a56" />
      <circle cx={540} cy={1000} r={280} fill="none" stroke="rgba(150,210,255,.5)" strokeWidth={6} />
    </svg>
    <Titulo texto="NUNCA SAIU DA TERRA" y={330} size={110} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Ate1999: React.FC = () => <Glitch texto="ATÉ 1999." size={190} cor={OURO} />;
const Prospector: React.FC = () => (
  <Foto src="prospector.jpg" etq="ILUSTRAÇÃO · NASA · LUNAR PROSPECTOR" z={[1.1, 1.25]} pos="45% 40%">
    <Titulo texto="1999 · LUNAR PROSPECTOR" y={280} size={100} cor={OURO} />
  </Foto>
);
const Rota: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <Lua z={[1, 1.05]} etq="IMAGEM REAL · LUA · NASA · ROTA: ANIMAÇÃO">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M1000 300 Q900 900 560 1330" fill="none" stroke={OURO} strokeWidth={6} strokeDasharray="20 14" />
        <circle cx={1000 - 440 * p} cy={300 + 1030 * p} r={16} fill="#fff" style={{filter: 'drop-shadow(0 0 14px #fff)'}} />
        <circle cx={560} cy={1330} r={40} fill="none" stroke={VERMELHO} strokeWidth={5} />
      </svg>
      <Titulo texto="DE PROPÓSITO, CONTRA O POLO SUL" y={260} size={88} />
    </Lua>
  );
};
const Frasco: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #1c1a16, #050404 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 1000) scale(${0.7 + 0.3 * s})`} opacity={s}>
          <rect x={-70} y={-200} width={140} height={60} rx={10} fill="#8a8e96" />
          <rect x={-90} y={-140} width={180} height={340} rx={40} fill="rgba(220,230,240,.25)" stroke="#cfd8e8" strokeWidth={6} />
          <rect x={-76} y={40} width={152} height={146} rx={30} fill="#6a6660" />
        </g>
      </svg>
      <Titulo texto="UM FRASCO PEQUENO" y={330} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Cinzas: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #1c1a16, #050404 70%)'}}>
    <Contador ate={28} y={700} size={260} pre="~" suf=" G" />
    <Texto y={1000} size={70} cor={OURO} delay={8}>DE CINZAS</Texto>
    <Titulo texto="DE SHOEMAKER" y={330} size={110} />
  </AbsoluteFill>
);
const Impacto: React.FC = () => {
  const f = useCurrentFrame();
  const fl = interpolate(f, [10, 13, 30], [0, 1, 0], clamp);
  const p = interpolate(f, [12, 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{transform: shake(f, f > 10 && f < 24 ? 14 : 0)}}>
      <Lua z={[1.6, 1.75]} polo={1} etq="IMAGEM REAL · LUA · NASA · IMPACTO: ANIMAÇÃO">
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {f < 12 && <line x1={900} y1={200} x2={900 - (360 * f) / 12} y2={200 + (900 * f) / 12} stroke="#fff" strokeWidth={6} />}
          <circle cx={540} cy={1100} r={60 + 500 * p} fill="none" stroke="#e8e4da" strokeWidth={14} opacity={1 - p} />
          {Array.from({length: 30}, (_, i) => { const a = -Math.PI * random('ia' + i), r = p * (100 + random('ir' + i) * 400); return <circle key={i} cx={540 + Math.cos(a) * r} cy={1100 + Math.sin(a) * r * 0.6} r={6} fill="#e8e4da" opacity={1 - p} />; })}
        </svg>
        <AbsoluteFill style={{background: '#fff', opacity: fl * 0.8}} />
        <Contador ate={6100} y={560} size={150} pre="~" suf=" KM/H" ini={4} dur={20} />
        <Titulo texto="A SONDA BATEU" y={300} size={110} cor={OURO} />
      </Lua>
    </AbsoluteFill>
  );
};
const Po: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Lua z={[1.75, 1.85]} polo={1} brilho={0.8}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 60}, (_, i) => <circle key={i} cx={540 + (random('px' + i) - 0.5) * 800 + Math.sin(f * 0.05 + i) * 20} cy={1100 - ((f * 0.8 + random('py' + i) * 500) % 600)} r={3} fill="#e8e4da" opacity={0.5} />)}
      </svg>
      <Titulo texto="PROVAVELMENTE VIROU PÓ" y={300} size={100} />
    </Lua>
  );
};
const Chegou: React.FC = () => <Lua z={[1.1, 1.0]}><Titulo texto="MAS ELE CHEGOU." y={300} size={130} cor={OURO} /></Lua>;
const Colega: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #141a26, #03050a 70%)'}}>
      <Estrelas n={60} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 600, fontFamily: FONTE, fontSize: 78, color: '#fff', lineHeight: 1.15, opacity: s, textAlign: 'center'}}>
        <span style={{color: OURO, fontSize: 160, lineHeight: 0.5}}>“</span><br />O PRIMEIRO HABITANTE DA TERRA SEPULTADO EM OUTRO CORPO CELESTE
      </div>
      <Titulo texto="UMA COLEGA DISSE" y={330} size={96} />
    </AbsoluteFill>
  );
};
const Unico: React.FC = () => <Lua z={[1.2, 1.3]} brilho={0.8}><Selo texto={'ATÉ ONDE SE SABE:\nO ÚNICO'} y={760} size={90} /></Lua>;
const Mudar: React.FC = () => <Glitch texto="MAS ISSO PODE MUDAR" size={130} cor={VERMELHO} />;
const Peregrine: React.FC = () => (
  <Foto src="vulcan_peregrine.jpg" etq="IMAGEM REAL · FOGUETE COM A PEREGRINE · NASA/KSC · JAN 2024" real z={[1.05, 1.15]} pos="50% 30%">
    <Titulo texto="2024 · PEREGRINE" y={300} size={120} cor={OURO} />
  </Foto>
);
const Setenta: React.FC = () => (
  <Foto src="vulcan_peregrine.jpg" etq="IMAGEM REAL · FOGUETE COM A PEREGRINE · NASA/KSC · JAN 2024" real z={[1.25, 1.35]} pos="50% 40%">
    <AbsoluteFill style={{background: 'rgba(0,0,0,.45)'}} />
    <Contador ate={70} y={700} size={260} pre="~" />
    <Texto y={1000} size={60} cor={OURO} delay={6}>PESSOAS: CINZAS E DNA</Texto>
  </Foto>
);
const Queimou: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #02040a, #0b1a3a 60%, #1a4a8a)'}}>
      <Estrelas n={80} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={540} cy={2400} rx={1500} ry={900} fill="#1d4a8a" />
        <g transform={`translate(${300 + f * 6} ${500 + f * 12})`}>
          <path d="M0 0 L-180 -260 L-40 -20 Z" fill="#ff8a1f" opacity={0.7} /><circle r={30} fill="#fff4c0" /><circle r={60} fill="#ff6a1f" opacity={0.4} />
        </g>
      </svg>
      <Titulo texto="FALHOU. QUEIMOU NA VOLTA À TERRA" y={300} size={88} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Deserto: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1440 0%, #6a3a6a 35%, #e0784a 55%, #3a1e14 56%, #1a0e08 100%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d="M0 1080 L120 1080 L160 860 L300 860 L330 1080 L620 1080 L660 920 L760 920 L790 1080 L1080 1080 L1080 1100 L0 1100 Z" fill="#2a140c" />
      <circle cx={850} cy={640} r={60} fill="#f4eee0" opacity={0.9} />
    </svg>
    <Etiqueta texto="ILUSTRAÇÃO" />
    {children}
  </AbsoluteFill>
);
const NemTodo: React.FC = () => <Deserto><Titulo texto="NEM TODO MUNDO ACHOU BONITO" y={260} size={92} /></Deserto>;
const Navajo: React.FC = () => (
  <Deserto>
    <Titulo texto="NAÇÃO NAVAJO" y={260} size={110} cor={OURO} />
    <Selo texto={'“PROFANAÇÃO DE UM\nLUGAR SAGRADO”'} y={1250} size={64} cor="#fff" delay={8} />
  </Deserto>
);
const Preco: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1a14, #050504 70%)'}}>
    <Titulo texto="MANDAR CINZAS PRA LUA HOJE" y={300} size={92} />
    <Texto y={640} size={56} cor={CIANO}>A PARTIR DE</Texto>
    <div style={{position: 'absolute', top: 730, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 190, color: OURO}}>US$ 12.995</div>
  </AbsoluteFill>
);
const Finados: React.FC = () => (
  <AbsoluteFill style={{background: '#030304'}}>
    <Vela />
    <Titulo texto="NESTE DIA DE FINADOS" y={330} size={100} cor={OURO} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const QuemDecide: React.FC = () => (
  <Lua z={[1, 1.08]} brilho={0.55}>
    <Vela y={1250} />
    <Titulo texto="QUEM DECIDE SE A LUA PODE VIRAR UM CEMITÉRIO?" y={240} size={84} />
  </Lua>
);

const CENAS = [Gancho, Ninguem, Tumulo, Nome, Geologo, Sonho, Barrado, NuncaSaiu, Ate1999, Prospector, Rota, Frasco, Cinzas, Impacto, Po, Chegou,
  Colega, Unico, Mudar, Peregrine, Setenta, Queimou, NemTodo, Navajo, Preco, Finados, QuemDecide];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/hit.wav', volume: 0.35}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="shoemaker/narracao.mp3" calma={CALMA} sons={SONS} />;
