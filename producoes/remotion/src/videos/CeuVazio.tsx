// Reel POV "Você olha o céu daqui a 100 BILHÕES de anos, e ele está vazio". Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #5, v1), aprovado pelo dono em 29/10. Post: domingo 01/11.
// Voz edge-tts Remy Multilingual, escolhida pelo dono em 29/10 no lugar da Antonio. "MODELO ATUAL" e "~100 BILHÕES" na tela; "VIA LÁCTEA + ANDRÔMEDA" no lugar de "Milkomeda" (opção do Roteirista).
// Reais: campo ultraprofundo do Hubble (NASA), Andrômeda (GALEX, NASA) e radiação cósmica de fundo (Planck, ESA/NASA). Céu do futuro e esquemas: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO} from '../comum';
import palavras from './ceuvazio.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce olha pro ceu', 'nao existe mais nenhuma', 'voce nasceu num futuro', 'daqui a uns cem', 'hoje o universo', 'cada vez mais rapido', 'a gente descobriu isso', 'no modelo atual',
  'e com o tempo', 'uma por uma', 'antes disso a via', 'e tudo o que sobra', 'e tem pior', 'hoje a gente sabe', 'no seu tempo ela', 'os seus cientistas',
  'eterno', 'eles nao teriam', 'nem que existiram', 'nos vivemos na epoca', 'uma civilizacao do futuro',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('nos vivemos na epoca');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('ceuvazio/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
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
// céu do futuro: só as estrelas da própria galáxia, nenhuma outra galáxia
const CeuFuturo: React.FC<{children?: React.ReactNode; galaxia?: boolean}> = ({children, galaxia = true}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #010103, #06060c 70%, #0c0a10)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {galaxia && <ellipse cx={540} cy={700} rx={700} ry={140} fill="rgba(200,190,255,.07)" transform="rotate(-25 540 700)" />}
        {Array.from({length: 140}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1500} r={0.7 + random('sr' + i) * 2}
          fill="#fff" opacity={0.2 + 0.5 * Math.abs(Math.sin(f * 0.04 + i))} />)}
        <path d={'M0 1500 ' + Array.from({length: 12}, (_, i) => `L${i * 100} ${1470 + random('h' + i) * 70}`).join(' ') + ' L1080 1490 L1080 1920 L0 1920 Z'} fill="#000" />
      </svg>
      {children}
    </AbsoluteFill>
  );
};
// galáxias de desenho espalhadas, que podem se afastar do centro (k > 1) ou sumir (fora)
const Galaxias: React.FC<{k?: number; fora?: number}> = ({k = 1, fora = 0}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: 46}, (_, i) => {
      const x0 = random('gx' + i) * 1080 - 540, y0 = random('gy' + i) * 1920 - 960, r = 10 + random('gr' + i) * 22;
      if (random('gf' + i) < fora) return null;
      return <ellipse key={i} cx={540 + x0 * k} cy={960 + y0 * k} rx={r} ry={r * 0.45} fill={random('gc' + i) > 0.5 ? '#ffd8a0' : '#b8c8ff'} opacity={0.85}
        transform={`rotate(${random('ga' + i) * 180} ${540 + x0 * k} ${960 + y0 * k})`} style={{filter: 'blur(1.5px)'}} />;
    })}
  </svg>
);

// ---------- cenas ----------
const OlhaCeu: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [6, 40], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <CeuFuturo />
      <AbsoluteFill style={{opacity: a}}>
        <Img src={staticFile('ceuvazio/xdf.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.3)'}} />
      </AbsoluteFill>
      <Titulo texto="VOCÊ OLHA PRO CÉU" y={300} size={120} />
      <Etiqueta texto={a > 0.5 ? 'HOJE: IMAGEM REAL · HUBBLE · NASA' : 'FUTURO: ILUSTRAÇÃO'} real={a > 0.5} />
    </AbsoluteFill>
  );
};
const Nenhuma: React.FC = () => <CeuFuturo><Selo texto={'NENHUMA\nOUTRA GALÁXIA'} y={620} size={110} cor="#fff" delay={0} /><Etiqueta texto="ILUSTRAÇÃO" /></CeuFuturo>;
const Futuro: React.FC = () => <Glitch texto="VOCÊ NASCEU NO FUTURO" size={130} cor={CIANO} fundo="#010103" />;
const CemBi: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [2, 34], [0, 100], {...clamp, easing: (t) => 1 - (1 - t) ** 3}));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #10142a, #010103 75%)'}}>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 250, color: OURO, letterSpacing: -4}}>+~{n}</div>
      <Texto y={960} size={70} cor="#fff" delay={4}>BILHÕES DE ANOS</Texto>
      <Selo texto="MODELO ATUAL" y={1120} size={60} cor="#cfd8e8" delay={14} />
    </AbsoluteFill>
  );
};
const Expandindo: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 70], [0.6, 1.4], {easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: '#020208'}}>
      <Galaxias k={k} />
      <Titulo texto="HOJE O UNIVERSO SE EXPANDE" y={300} size={96} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const MaisRapido: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#020208'}}>
      <Galaxias k={interpolate(f, [0, 30], [1.4, 3], {easing: Easing.in(Easing.cubic)})} />
      <Titulo texto="CADA VEZ MAIS RÁPIDO" y={300} size={110} cor={CIANO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Ano1998: React.FC = () => (
  <AbsoluteFill style={{background: '#020208'}}>
    <Galaxias k={1.4} />
    <AbsoluteFill style={{background: 'rgba(0,0,0,.55)'}} />
    <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 300, color: OURO}}>1998</div>
    <Texto y={1000} size={64} cor="#fff" delay={6}>EXPANSÃO ACELERADA</Texto>
  </AbsoluteFill>
);
const Modelo: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 50], [0, 1], clamp);
  const pts = Array.from({length: 40}, (_, i) => { const t = (i / 39) * p; return `${140 + t * 800},${1400 - 700 * t ** 2.4}`; }).join(' ');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #10142a, #010103 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M140 640 V1400 H960" stroke="#5a6478" strokeWidth={5} fill="none" />
        <polyline points={pts} fill="none" stroke={CIANO} strokeWidth={9} />
      </svg>
      <Texto y={1430} size={44} cor="#8a96aa">TEMPO →</Texto>
      <Titulo texto="A ACELERAÇÃO CONTINUA" y={300} size={100} />
      <Selo texto="MODELO ATUAL" y={500} size={56} cor="#cfd8e8" delay={0} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const SomemAlcance: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#020208'}}>
      <Galaxias k={interpolate(f, [0, 130], [1, 3.2])} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={540} cy={960} r={420} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={4} strokeDasharray="16 14" /></svg>
      <Texto y={1410} size={44} cor="#aab4cc">LIMITE DO QUE DÁ PRA VER</Texto>
      <Titulo texto="AS GALÁXIAS SOMEM DO ALCANCE" y={300} size={92} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const UmaPorUma: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#020208'}}>
      <Galaxias k={1} fora={interpolate(f, [0, 24], [0, 1], clamp)} />
      <Titulo texto="UMA POR UMA" y={300} size={130} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Andromeda: React.FC = () => (
  <Foto src="andromeda.jpg" etq="IMAGEM REAL · ANDRÔMEDA · GALEX · NASA" z={[1.1, 1.35]}>
    <Titulo texto="VIA LÁCTEA + ANDRÔMEDA" y={300} size={100} />
    <Selo texto={'VIRAM UMA SÓ\n(PROVÁVEL)'} y={1250} size={64} cor={OURO} delay={8} />
  </Foto>
);
const Ilha: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 110], [1.4, 0.45], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z})`}}>
        <Img src={staticFile('ceuvazio/andromeda.jpg')} style={{position: 'absolute', left: 140, top: 560, width: 800, height: 800, objectFit: 'cover', borderRadius: '50%',
          WebkitMaskImage: 'radial-gradient(circle, #000 45%, transparent 70%)'}} />
      </AbsoluteFill>
      <Titulo texto="UMA ILHA NO MEIO DO NADA" y={300} size={100} />
      <Etiqueta texto="ILUSTRAÇÃO COM IMAGEM REAL (GALEX · NASA)" />
    </AbsoluteFill>
  );
};
const Pior: React.FC = () => <Glitch texto="E TEM PIOR" size={170} cor={VERMELHO} fundo="#010103" />;
const Radiacao: React.FC = () => (
  <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
    <Img src={staticFile('ceuvazio/cmb.jpg')} style={{width: 1040, transform: 'translateY(40px)'}} />
    <Titulo texto="A RADIAÇÃO DO BIG BANG" y={300} size={100} />
    <Texto y={1300} size={52} cor="#fff" delay={8}>AINDA CHEGA DE TODAS AS DIREÇÕES</Texto>
    <Etiqueta texto="IMAGEM REAL · PLANCK · ESA/NASA" real />
  </AbsoluteFill>
);
const Fraca: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [4, 60], [1, 0.03], clamp);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <Img src={staticFile('ceuvazio/cmb.jpg')} style={{width: 1040, transform: 'translateY(40px)', opacity: a, filter: `saturate(${a})`}} />
      <Titulo texto="NO SEU TEMPO" y={300} size={120} />
      <Selo texto="INDETECTÁVEL" y={1260} size={84} cor={VERMELHO} delay={30} />
      <Etiqueta texto="SIMULAÇÃO DO APAGAMENTO" />
    </AbsoluteFill>
  );
};
const Parado: React.FC = () => <CeuFuturo><Titulo texto="UM UNIVERSO PARADO" y={300} size={120} /><Etiqueta texto="ILUSTRAÇÃO" /></CeuFuturo>;
const Eterno: React.FC = () => (
  <CeuFuturo>
    <Selo texto="ETERNO" y={600} size={130} cor="#fff" delay={0} />
    <Selo texto="SEM COMEÇO" y={900} size={110} cor={OURO} delay={18} />
  </CeuFuturo>
);
const SemProvas: React.FC = () => <Glitch texto="SEM PROVA DO BIG BANG" size={130} cor="#fff" fundo="#010103" />;
const Bilhoes: React.FC = () => (
  <Foto src="xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" z={[1.6, 1.2]}>
    <Titulo texto="BILHÕES DE OUTRAS GALÁXIAS" y={300} size={96} />
  </Foto>
);
const Provas: React.FC = () => (
  <Foto src="xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" z={[1.0, 1.1]}>
    <Titulo texto="NÓS AINDA VEMOS AS PROVAS" y={300} size={100} cor={OURO} />
  </Foto>
);
const Perdeu: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 30], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <CeuFuturo />
      <AbsoluteFill style={{opacity: a}}><Img src={staticFile('ceuvazio/xdf.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>
      <Titulo texto="NÃO SABERIA O QUE PERDEU" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

const CENAS = [OlhaCeu, Nenhuma, Futuro, CemBi, Expandindo, MaisRapido, Ano1998, Modelo, SomemAlcance, UmaPorUma, Andromeda, Ilha, Pior, Radiacao, Fraca, Parado,
  Eterno, SemProvas, Bilhoes, Provas, Perdeu];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="ceuvazio/narracao.mp3" calma={CALMA} sons={SONS} />;
