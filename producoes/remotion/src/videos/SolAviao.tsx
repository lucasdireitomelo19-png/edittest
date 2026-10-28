// Short "O SOL pode bagunçar os comandos de um avião" (alerta da Airbus, nov/2025). Roteiro do Roteirista (v1), aprovado pelo dono em 28/10.
// Nunca afirmar que o Sol causou a queda do JetBlue 1230: a fala diz "a imprensa ligou", e a tela marca "LIGAÇÃO NÃO CONFIRMADA".
// Sem logo da JetBlue: avião genérico desenhado e footage real só de asa e céu.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import palavras from './aviao.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'o sol pode baguncar', 'os comandos de um aviao', 'e a airbus teve', 'corrigir seis mil', 'trinta de outubro', 'de 2025 um a320', 'um a320 da jetblue', 'perde altitude',
  'pouso de emergencia', 'mais de quinze', 'um mes depois', 'a radiacao intensa', 'a imprensa ligou', 'a reacao foi imediata', 'a agencia europeia',
  'cerca de seis mil', 'como o sol faz isso', 'ele dispara particulas', 'algumas atravessam', 'um unico dado trocado', 'pode virar uma informacao',
  'o problema foi corrigido', 'o seu proximo voo', 'mas o ceu nao e vazio', 'e agora os avioes',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('o problema foi corrigido');
export const DURACAO = TEMPO.FIM;
const CEU = 'linear-gradient(180deg, #1c5a9a, #5aa0d8 55%, #a8d4f4)';

// avião genérico visto de lado (sem logo)
const Aviao: React.FC<{x: number; y: number; s?: number; rot?: number; cor?: string}> = ({x, y, s = 1, rot = 0, cor = '#eef2f6'}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-300 0 Q-300 -38 -240 -40 L240 -40 Q330 -36 360 0 Q330 30 240 34 L-240 34 Q-300 34 -300 0 Z" fill={cor} />
      <path d="M-40 0 L-150 150 L-90 150 L80 6 Z" fill="#c8d0da" />
      <path d="M-240 -36 L-300 -140 L-250 -140 L-170 -36 Z" fill="#c8d0da" />
      {Array.from({length: 12}, (_, i) => <rect key={i} x={-180 + i * 34} y={-18} width={14} height={14} rx={4} fill="#5a6a80" />)}
    </g>
  </svg>
);
const Sol: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Real src="aviao/sdo.mp4" zoom={[1.15, 1.25]} />
  </AbsoluteFill>
);
const Card: React.FC<{topo: string; meio: string; rodape?: string; cor?: string; y?: number}> = ({topo, meio, rodape, cor = OURO, y = 640}) => {
  const s = useSpring(0, {damping: 11, mass: 0.5});
  return (
    <div style={{position: 'absolute', left: 90, top: y, width: 900, padding: '54px 30px', boxSizing: 'border-box', borderRadius: 30, background: 'rgba(10,16,30,.92)', border: `4px solid ${cor}`,
      opacity: s, transform: `scale(${0.85 + 0.15 * s})`, textAlign: 'center', fontFamily: FONTE}}>
      <div style={{fontSize: 42, color: cor, letterSpacing: 3}}>{topo}</div>
      <div style={{fontSize: 96, color: '#fff', marginTop: 16, lineHeight: 1.05}}>{meio}</div>
      {rodape && <div style={{fontSize: 40, color: '#cfd8e8', marginTop: 16}}>{rodape}</div>}
    </div>
  );
};

// ---------- gancho: o Sol e o avião já no 1º quadro ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 6, 'g')}}>
      <Sol />
      <Aviao x={interpolate(f, [0, 40], [700, 420])} y={1350 + Math.sin(f * 0.6) * 18} s={1.1} rot={Math.sin(f * 0.5) * 6} />
      {f % 9 < 3 && <AbsoluteFill style={{background: 'rgba(255,60,60,.18)'}} />}
      <Etiqueta texto="IMAGEM REAL · SOL VISTO PELO SDO · NASA · AVIÃO: ILUSTRAÇÃO" real />
      <Titulo texto="O SOL PODE BAGUNÇAR" y={330} size={104} cor={OURO} />
    </AbsoluteFill>
  );
};
const Comandos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 8, 'c')}}>
      <Real src="aviao/asa.mp4" zoom={[1.05, 1.12]} />
      <Sombra />
      {f % 7 < 2 && <AbsoluteFill style={{background: 'rgba(0,220,255,.15)', transform: `translateX(${(random('t' + f) - 0.5) * 60}px)`}} />}
      <Etiqueta texto="IMAGEM REAL · ILUSTRATIVA" real />
      <Titulo texto="OS COMANDOS DE UM AVIÃO" y={330} size={96} />
    </AbsoluteFill>
  );
};
const Airbus: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #10182c, #03050c 75%)'}}><Card topo="A FABRICANTE" meio="AIRBUS" rodape="TEVE QUE CORRIGIR…" /></AbsoluteFill>;
const Grade: React.FC<{n: number; titulo: string; sub?: string}> = ({n, titulo, sub}) => {
  const f = useCurrentFrame();
  const vis = Math.round(interpolate(f, [0, 30], [0, n], clamp));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #10182c, #03050c 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: n}, (_, i) => {
          if (i >= vis) return null;
          const x = 60 + (i % 24) * 40, y = 640 + Math.floor(i / 24) * 26;
          return <path key={i} d={`M${x} ${y} l26 0 l6 -4 l-6 -4 l-26 0 z M${x + 10} ${y - 4} l-6 -10 l6 0 l10 10 z M${x + 10} ${y} l-6 10 l6 0 l10 -10 z`} fill={i % 13 === 0 ? OURO : '#cfd8e8'} />;
        })}
      </svg>
      <Titulo texto={titulo} y={330} size={170} cor={OURO} />
      {sub && <Texto y={540} size={48} cor="#fff" delay={4}>{sub}</Texto>}
      <Etiqueta texto="ILUSTRAÇÃO · CADA ÍCONE ≈ 25 AVIÕES" />
    </AbsoluteFill>
  );
};
const SeisMil: React.FC = () => <Grade n={240} titulo="~6.000" sub="AVIÕES PRA CORRIGIR" />;
const Data: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}><Titulo texto="30/10/2025" y={760} size={190} cor={VERMELHO} /></AbsoluteFill>;
const Voo: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}><Card topo="30/10/2025" meio="JETBLUE 1230" rodape="CANCÚN → NEWARK" cor={VERMELHO} /></AbsoluteFill>;
const A320: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: CEU, overflow: 'hidden'}}>
      {Array.from({length: 6}, (_, i) => <div key={i} style={{position: 'absolute', left: ((random('nx' + i) * 1400 - f * 8) % 1400) - 200, top: 300 + random('ny' + i) * 1300, width: 420, height: 120, borderRadius: 60, background: 'rgba(255,255,255,.7)', filter: 'blur(6px)'}} />)}
      <Aviao x={540} y={980} s={1.3} />
      <Titulo texto="UM AIRBUS A320" y={330} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO · AVIÃO GENÉRICO" />
    </AbsoluteFill>
  );
};
const Perde: React.FC = () => {
  const f = useCurrentFrame();
  const y = interpolate(f, [6, 22], [760, 1180], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: CEU, overflow: 'hidden', transform: f > 6 ? shake(f, 14, 'p') : undefined}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M0 760 L${interpolate(f, [0, 6], [0, 540], clamp)} 760 ${f > 6 ? `L540 760 L${540 + (y - 760) * 0.9} ${y}` : ''}`} stroke={VERMELHO} strokeWidth={10} fill="none" strokeDasharray="20 10" />
      </svg>
      <Aviao x={f > 6 ? 540 + (y - 760) * 0.9 : interpolate(f, [0, 6], [0, 540], clamp)} y={f > 6 ? y : 760} s={0.7} rot={f > 6 ? 24 : 0} />
      <Titulo texto="PERDE ALTITUDE DE REPENTE" y={330} size={96} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Pouso: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3a5a, #6a7a9a 55%, #1a1e26)', overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M340 1920 L500 1240 L580 1240 L740 1920 Z" fill="#2a2e36" />
        {Array.from({length: 8}, (_, i) => <rect key={i} x={536} y={1260 + i * 80} width={8} height={40} fill="#fff" />)}
        {Array.from({length: 6}, (_, i) => <circle key={i} cx={420 + (i % 2) * 240} cy={1300 + Math.floor(i / 2) * 200} r={14} fill={Math.floor(f / 6 + i) % 2 ? VERMELHO : '#4a1010'} />)}
      </svg>
      <Aviao x={540} y={interpolate(f, [0, 40], [900, 1120], clamp)} s={0.55} rot={-4} />
      <Titulo texto="POUSO DE EMERGÊNCIA" y={330} size={104} />
      <Texto y={560} size={48} delay={4}>NA FLÓRIDA</Texto>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Hospital: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #241818, #080505 70%)'}}>
      <div style={{position: 'absolute', left: 140, top: 900, width: 800, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14}}>
        {Array.from({length: 16}, (_, i) => {
          const s = spring({frame: f - i * 1.2, fps: FPS, config: {damping: 12}});
          return <svg key={i} width={80} height={120} viewBox="0 0 80 120" style={{opacity: s, transform: `scale(${s})`}}><circle cx={40} cy={24} r={20} fill="#e8e0d8" /><rect x={14} y={50} width={52} height={68} rx={20} fill="#e8e0d8" /></svg>;
        })}
      </div>
      <Titulo texto="+15 NO HOSPITAL" y={420} size={130} cor={VERMELHO} />
      <Texto y={1260} size={40} delay={8}>NENHUM CASO GRAVE</Texto>
    </AbsoluteFill>
  );
};
const MesDepois: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #10182c, #03050c 75%)'}}><Card topo="UM MÊS DEPOIS" meio="28/11/2025" rodape="ALERTA DA AIRBUS" /></AbsoluteFill>;
const Alerta: React.FC = () => (
  <AbsoluteFill>
    <Sol />
    <AbsoluteFill style={{background: 'rgba(0,0,0,.35)'}} />
    <Card topo="AIRBUS:" meio="“PODE CORROMPER DADOS”" rodape="ESSENCIAIS PROS COMANDOS DE VOO" cor={VERMELHO} y={1060} />
    <Etiqueta texto="IMAGEM REAL · SOL VISTO PELO SDO · NASA" real />
  </AbsoluteFill>
);
const Imprensa: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1a24, #050508 70%)'}}>
      <div style={{position: 'absolute', left: 140, top: 520, width: 800, height: 760, borderRadius: 12, background: '#f0ece2', opacity: s, transform: `rotate(-3deg) translateY(${(1 - s) * 60}px)`}}>
        <div style={{margin: '50px 50px 0', height: 70, background: '#222'}} />
        {Array.from({length: 9}, (_, i) => <div key={i} style={{margin: '34px 50px 0', height: 16, borderRadius: 8, background: '#b8b2a6', width: 560 + (i % 3) * 60}} />)}
      </div>
      <Titulo texto="A IMPRENSA LIGOU O ALERTA ÀQUELE VOO" y={240} size={78} />
      <div style={{position: 'absolute', left: 160, right: 160, top: 1340, padding: '14px 0', borderRadius: 14, border: `4px solid ${OURO}`, background: 'rgba(0,0,0,.6)', textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: OURO}}>LIGAÇÃO NÃO CONFIRMADA</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Imediata: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: f % 10 < 5 ? '#3a0606' : '#120202', justifyContent: 'center', alignItems: 'center'}}>
      <svg width={420} height={380} viewBox="0 0 120 110"><path d="M60 6 L114 104 L6 104 Z" fill="none" stroke={OURO} strokeWidth={8} strokeLinejoin="round" /><rect x={55} y={38} width={10} height={36} fill={OURO} /><rect x={55} y={82} width={10} height={10} fill={OURO} /></svg>
      <Titulo texto="REAÇÃO IMEDIATA" y={360} size={110} cor={OURO} />
    </AbsoluteFill>
  );
};
const Easa: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #10182c, #03050c 75%)'}}><Card topo="EASA · AGÊNCIA EUROPEIA DE AVIAÇÃO" meio="DIRETIVA DE EMERGÊNCIA" cor={CIANO} /></AbsoluteFill>;
const Familia: React.FC = () => <Grade n={240} titulo="~6.000" sub="AVIÕES DA FAMÍLIA A320" />;
const Como: React.FC = () => (
  <AbsoluteFill>
    <Sol />
    <Etiqueta texto="IMAGEM REAL · SOL VISTO PELO SDO · NASA" real />
    <Titulo texto="COMO O SOL FAZ ISSO?" y={330} size={104} cor={OURO} />
  </AbsoluteFill>
);
const Particulas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#02040a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -420, top: 600, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle at 60% 45%, #fffbe0, #ffd34a 45%, #ff9a1a 80%)', boxShadow: '0 0 160px rgba(255,180,60,.6)'}} />
      {Array.from({length: 60}, (_, i) => {
        const x = ((f * (14 + random('v' + i) * 14) + random('o' + i) * 1100) % 1300) + 100, y = 600 + random('y' + i) * 700 + (x - 300) * (random('d' + i) - 0.5) * 0.4;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 26, height: 4, borderRadius: 2, background: '#ffe9a0', boxShadow: '0 0 10px #ffd34a'}} />;
      })}
      <Titulo texto="PARTÍCULAS CHEIAS DE ENERGIA" y={300} size={88} cor={OURO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Atravessa: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: CEU}}>
      <Aviao x={540} y={1000} s={1.25} />
      <div style={{position: 'absolute', left: 520, top: 980, width: 50, height: 40, borderRadius: 6, background: '#1a2a1a', border: `3px solid ${p > 0.95 ? VERMELHO : VERDE}`, boxShadow: p > 0.95 ? `0 0 30px ${VERMELHO}` : undefined}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={900} y1={300} x2={900 - 360 * p} y2={300 + 700 * p} stroke="#ffe9a0" strokeWidth={8} style={{filter: 'drop-shadow(0 0 10px #ffd34a)'}} />
      </svg>
      <Titulo texto="ATRAVESSA O AVIÃO E ACERTA UM CHIP" y={300} size={80} />
      <Etiqueta texto="ANIMAÇÃO · ESQUEMA" />
    </AbsoluteFill>
  );
};
const Bit: React.FC = () => {
  const f = useCurrentFrame();
  const troca = f > 14;
  const bits = '0110100101110010'.split('');
  return (
    <AbsoluteFill style={{background: '#020806'}}>
      <Real src="aviao/circuito.mp4" zoom={[1, 1.05]} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,.5)'}} />
      <div style={{position: 'absolute', top: 800, width: '100%', textAlign: 'center', fontFamily: 'monospace', fontSize: 70, color: VERDE, letterSpacing: 6}}>
        {bits.map((b, i) => <span key={i} style={{color: i === 9 && troca ? VERMELHO : VERDE, fontSize: i === 9 ? 110 : 70}}>{i === 9 ? (troca ? '1' : '0') : b}</span>)}
      </div>
      <Titulo texto="UM ÚNICO DADO TROCADO" y={330} size={96} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Errada: React.FC = () => (
  <AbsoluteFill>
    <Real src="aviao/codigo.mp4" />
    <Sombra />
    <Etiqueta texto="ANIMAÇÃO" />
    <Titulo texto="INFORMAÇÃO ERRADA" y={330} size={120} cor={VERMELHO} />
  </AbsoluteFill>
);
const Corrigido: React.FC = () => {
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #062a1a, #020806 70%)'}}>
      <div style={{position: 'absolute', left: 390, top: 560, width: 300, height: 300, borderRadius: '50%', background: VERDE, transform: `scale(${s})`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 90px rgba(61,220,132,.6)'}}>
        <svg width={170} height={170} viewBox="-60 -60 120 120"><path d="M-36 0 L-10 26 L38 -26" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
      </div>
      <Titulo texto="CORRIGIDO" y={960} size={150} cor={VERDE} />
      <Texto y={1140} size={44} delay={6}>A IMENSA MAIORIA ATÉ 01/12/2025</Texto>
    </AbsoluteFill>
  );
};
const ProximoVoo: React.FC = () => (
  <AbsoluteFill>
    <Real src="aviao/asa.mp4" ini={6} zoom={[1.1, 1.15]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · ILUSTRATIVA" real />
    <Titulo texto="SEU PRÓXIMO VOO NÃO ESTÁ EM RISCO" y={330} size={86} cor={VERDE} />
    <Texto y={560} size={42} cor="#fff" delay={6}>POR ISSO</Texto>
  </AbsoluteFill>
);
const CeuVazio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="aviao/ceu.mp4" />
      {Array.from({length: 26}, (_, i) => {
        const x = ((f * (10 + random('cv' + i) * 10) + random('co' + i) * 1100) % 1300) - 100;
        return <div key={i} style={{position: 'absolute', left: x, top: random('cy' + i) * 1920, width: 30, height: 4, borderRadius: 2, background: '#fff6c0', opacity: 0.8}} />;
      })}
      <Sombra />
      <Etiqueta texto="IMAGEM REAL · PARTÍCULAS: ANIMAÇÃO" real />
      <Titulo texto="O CÉU NÃO É VAZIO" y={330} size={120} />
    </AbsoluteFill>
  );
};
const Projetados: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a2a4a'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 28}, (_, i) => <line key={i} x1={0} y1={i * 70} x2={1080} y2={i * 70} stroke="rgba(255,255,255,.08)" strokeWidth={2} />)}
        {Array.from({length: 16}, (_, i) => <line key={'v' + i} x1={i * 70} y1={0} x2={i * 70} y2={1920} stroke="rgba(255,255,255,.08)" strokeWidth={2} />)}
        <path d="M540 700 A560 560 0 0 1 1100 1260" fill="none" stroke={OURO} strokeWidth={8} strokeDasharray="20 12" strokeDashoffset={-f * 2} />
      </svg>
      <Aviao x={540} y={1100} s={1.2} cor="rgba(255,255,255,.12)" />
      <Titulo texto="PROJETADOS PENSANDO NO SOL" y={330} size={92} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

const CENAS = [Gancho, Comandos, Airbus, SeisMil, Data, Voo, A320, Perde, Pouso, Hospital, MesDepois, Alerta, Imprensa, Imediata, Easa, Familia, Como, Particulas,
  Atravessa, Bit, Errada, Corrigido, ProximoVoo, CeuVazio, Projetados];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const SONS = [
  {em: 0, src: 'sfx/whoosh.wav', volume: 0.5},
  {em: T[FRASES.indexOf('perde altitude')] + 6, src: 'sfx/boom.wav', volume: 0.4},
];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="aviao/narracao.mp3" calma={CALMA} sons={SONS} />;
