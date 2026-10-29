// Reel POV "Você está num planeta SEM SOL, e ele não é raro". Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #4, v1), aprovado pelo dono em 29/10. Post: sábado 31/10 (Halloween).
// Voz edge-tts Remy Multilingual, escolhida pelo dono em 29/10 no lugar da Antonio. "ESTIMATIVA" nos números, "SIMULAÇÕES" no dado da Terra; a tela não mostra oceano nem vida.
// Reais: centro da Via Láctea (Spitzer, NASA), campo profundo do Hubble (NASA) e lançamento do Roman (NASA, 30/08/2026). Planeta errante e esquemas: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, LAVA, CIANO, VERMELHO, VERDE} from '../comum';
import palavras from './semsol.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce olha pra cima', 'nao existe sol', 'nunca existiu', 'voce esta num planeta', 'que nao gira', 'nao tem dia', 'nao tem noite', 'so escuro', 'parece ficcao',
  'mas segundo uma pesquisa', 'podem existir cerca', 'pela estimativa uns', 'a maioria provavelmente', 'e foi arremessada', 'e alguns continuam', 'telescopios flagraram',
  'engolindo uns seis', 'da pra existir vida', 'uma hipotese diz', 'ninguem sabe', 'a nasa lancou', 'a previsao e que', 'e a terra', 'nas simulacoes a chance',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('e a terra');
export const DURACAO = TEMPO.FIM;
const ROXO = '#9b7bff';

// ---------- peças ----------
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('semsol/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
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
const Ceu: React.FC<{children?: React.ReactNode; n?: number; fundo?: string}> = ({children, n = 170, fundo = 'radial-gradient(circle at 50% 40%, #0a0c18, #010104 75%)'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: fundo}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: n}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.7 + random('sr' + i) * 2.2} fill="#fff"
          opacity={0.25 + 0.55 * Math.abs(Math.sin(f * 0.04 + i))} />)}
      </svg>
      {children}
    </AbsoluteFill>
  );
};
// planeta errante: esfera escura com borda iluminada só pelas estrelas
const Errante: React.FC<{x?: number; y?: number; r?: number}> = ({x = 540, y = 1000, r = 330}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <defs>
      <radialGradient id="pe" cx="35%" cy="30%" r="75%"><stop offset="0%" stopColor="#2a2e48" /><stop offset="60%" stopColor="#0c0e1a" /><stop offset="100%" stopColor="#030308" /></radialGradient>
    </defs>
    <circle cx={x} cy={y} r={r} fill="url(#pe)" stroke="rgba(155,123,255,.35)" strokeWidth={3} />
  </svg>
);
// horizonte escuro visto do chão do planeta
const Chao: React.FC = () => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <path d={'M0 1300 ' + Array.from({length: 12}, (_, i) => `L${i * 100} ${1260 + random('h' + i) * 90}`).join(' ') + ' L1080 1290 L1080 1920 L0 1920 Z'} fill="#030305" />
  </svg>
);

// ---------- cenas ----------
const OlhaPraCima: React.FC = () => {
  const f = useCurrentFrame();
  const y = interpolate(f, [0, 30], [500, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Ceu>
      <AbsoluteFill style={{transform: `translateY(${y}px)`}}><Chao /></AbsoluteFill>
      <Titulo texto="VOCÊ OLHA PRA CIMA" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO · POV" />
    </Ceu>
  );
};
const NaoExisteSol: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{transform: shake(f, 4)}}><Glitch texto="NÃO EXISTE SOL" size={160} cor={ROXO} fundo="#010104" /></AbsoluteFill>;
};
const NuncaExistiu: React.FC = () => <Ceu n={90}><Chao /><Titulo texto="NUNCA EXISTIU" y={700} size={140} cor="#fff" /></Ceu>;
const NumPlaneta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu>
      <AbsoluteFill style={{transform: `scale(${interpolate(f, [0, 40], [0.4, 1], {...clamp, easing: Easing.out(Easing.cubic)})})`}}><Errante /></AbsoluteFill>
      <Titulo texto="VOCÊ ESTÁ NUM PLANETA" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const Planeta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu>
      <AbsoluteFill style={{transform: `translateX(${interpolate(f, [0, 90], [120, -120])}px)`}}><Errante /></AbsoluteFill>
      <Titulo texto="SEM NENHUMA ESTRELA PRA ORBITAR" y={300} size={96} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const SemDia: React.FC = () => <Ceu n={60}><Chao /><Selo texto="SEM DIA" y={700} size={140} cor="#fff" delay={0} /></Ceu>;
const SemNoite: React.FC = () => <Ceu n={60}><Chao /><Selo texto="SEM NOITE" y={700} size={140} cor={ROXO} delay={0} /></Ceu>;
const SoEscuro: React.FC = () => <Ceu n={240}><Chao /><Titulo texto="SÓ ESCURO E ESTRELAS DISTANTES" y={300} size={96} /><Etiqueta texto="ILUSTRAÇÃO · POV" /></Ceu>;
const Ficcao: React.FC = () => <Glitch texto="PARECE FICÇÃO" size={150} cor="#fff" fundo="#010104" />;
const Pesquisa: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(9, Math.floor(interpolate(f, [4, 50], [0, 9.99], clamp)));
  return (
    <Ceu n={80}>
      <Titulo texto="UMA PESQUISA DE" y={300} size={100} />
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 280, color: OURO}}>{n}</div>
      <Texto y={980} size={80} cor="#fff" delay={4}>ANOS</Texto>
      <div style={{position: 'absolute', top: 1130, left: 140, right: 140, display: 'flex', gap: 10}}>
        {Array.from({length: 9}, (_, i) => <div key={i} style={{flex: 1, height: 30, borderRadius: 8, background: i < n ? OURO : '#222'}} />)}
      </div>
    </Ceu>
  );
};
const PorEstrela: React.FC = () => (
  <Foto src="via_lactea.jpg" etq="IMAGEM REAL · VIA LÁCTEA · SPITZER · NASA" z={[1.2, 1.35]}>
    <AbsoluteFill style={{background: 'rgba(0,0,0,.4)'}} />
    <Contador ate={21} y={640} size={300} pre="~" cor={OURO} />
    <Texto y={980} size={64} cor="#fff" delay={6}>PLANETAS ASSIM POR ESTRELA</Texto>
    <Selo texto="ESTIMATIVA" y={1120} size={60} cor="#cfd8e8" delay={14} />
  </Foto>
);
const Trilhoes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={60}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 400}, (_, i) => <circle key={i} cx={random('tx' + i) * 1080} cy={random('ty' + i) * 1920} r={4 + random('tr' + i) * 6} fill="#1a1c2c" stroke={ROXO} strokeWidth={1.5}
          opacity={f > random('tt' + i) * 40 ? 0.9 : 0} />)}
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(circle, rgba(0,0,0,.85) 30%, transparent 70%)'}} />
      <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 170, lineHeight: 1, color: '#fff'}}>~2<br />TRILHÕES</div>
      <Texto y={940} size={60} cor={ROXO} delay={6}>DE MUNDOS SOZINHOS</Texto>
      <Selo texto="ESTIMATIVA" y={1060} size={60} cor="#cfd8e8" delay={12} />
    </Ceu>
  );
};
// sistema com estrela; o planeta orbita e depois é arremessado
const Sistema: React.FC<{expulsa?: boolean}> = ({expulsa}) => {
  const f = useCurrentFrame();
  const a = f * 0.08;
  const t = expulsa ? interpolate(f, [8, 60], [0, 1], {...clamp, easing: Easing.in(Easing.quad)}) : 0;
  const x = 540 + Math.cos(a) * 300 * (1 - t) + t * 900, y = 960 + Math.sin(a) * 120 * (1 - t) - t * 700;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <ellipse cx={540} cy={960} rx={300} ry={120} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={3} strokeDasharray="10 10" />
      <circle cx={540} cy={960} r={70} fill="#ffd27a" style={{filter: 'drop-shadow(0 0 50px #ffb030)'}} />
      <circle cx={420} cy={960} r={30} fill="#c88a4a" transform={`rotate(${f * 2} 540 960)`} />
      <circle cx={x} cy={y} r={36} fill="#3a4060" stroke={ROXO} strokeWidth={3} />
    </svg>
  );
};
const NasceuEstrela: React.FC = () => <Ceu n={100}><Sistema /><Titulo texto="NASCEU AO LADO DE UMA ESTRELA" y={300} size={92} /><Texto y={1300} size={52} delay={6}>PROVAVELMENTE</Texto><Etiqueta texto="ESQUEMA" /></Ceu>;
const Arremessada: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{transform: shake(f, f > 10 && f < 24 ? 8 : 0)}}><Ceu n={100}><Sistema expulsa /><Titulo texto="ARREMESSADA PRA FORA DE CASA" y={300} size={92} cor={LAVA} /><Etiqueta texto="ESQUEMA" /></Ceu></AbsoluteFill>;
};
// planeta jovem com disco de gás caindo nele
const Disco: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 6}, (_, i) => <ellipse key={i} cx={540} cy={1000} rx={480 - i * 60} ry={110 - i * 12} fill="none" stroke={LAVA} strokeWidth={6} opacity={0.15 + i * 0.08}
        strokeDasharray="40 30" strokeDashoffset={-f * (3 + i)} />)}
      <circle cx={540} cy={1000} r={150} fill="#2a1a20" stroke="#ff8a50" strokeWidth={4} style={{filter: 'drop-shadow(0 0 40px rgba(255,90,31,.6))'}} />
    </svg>
  );
};
const Crescendo: React.FC = () => <Ceu n={100}><Disco /><Titulo texto="ALGUNS CONTINUAM CRESCENDO" y={300} size={96} /><Etiqueta texto="ILUSTRAÇÃO" /></Ceu>;
const Cha: React.FC = () => (
  <Ceu n={100}>
    <Disco />
    <Titulo texto="CHA 1107-7626" y={300} size={110} cor={OURO} />
    <Selo texto={'5–10 × JÚPITER · 2025'} y={1300} size={70} cor="#fff" delay={6} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </Ceu>
);
const Engolindo: React.FC = () => (
  <Ceu n={100}>
    <Disco />
    <Titulo texto="ENGOLINDO GÁS" y={300} size={110} />
    <Contador ate={6} y={560} size={200} pre="~" suf=" BI" cor={LAVA} dur={20} />
    <Texto y={1340} size={64} cor="#fff" delay={6}>DE TONELADAS POR SEGUNDO</Texto>
    <Etiqueta texto="ILUSTRAÇÃO" />
  </Ceu>
);
const Vida: React.FC = () => <Glitch texto="DÁ PRA EXISTIR VIDA?" size={140} cor={VERDE} fundo="#010104" />;
const Hipotese: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={80}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={380} fill="rgba(155,123,255,.18)" stroke={ROXO} strokeWidth={4} />
        <circle cx={540} cy={1000} r={300} fill="#1a1626" />
        <circle cx={540} cy={1000} r={120} fill="#ff6a30" opacity={0.7 + 0.3 * Math.sin(f * 0.2)} style={{filter: 'drop-shadow(0 0 40px #ff5a1f)'}} />
        {Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2, k = ((f * 4 + i * 20) % 200) / 200;
          return <line key={i} x1={540 + Math.cos(a) * (140 + 150 * k)} y1={1000 + Math.sin(a) * (140 + 150 * k)} x2={540 + Math.cos(a) * (180 + 150 * k)} y2={1000 + Math.sin(a) * (180 + 150 * k)} stroke={OURO} strokeWidth={8} opacity={1 - k} />; })}
      </svg>
      <Titulo texto="ATMOSFERA GROSSA SEGURA O CALOR" y={260} size={88} />
      <Selo texto="HIPÓTESE" y={480} size={64} cor={OURO} delay={6} />
      <Etiqueta texto="ESQUEMA" />
    </Ceu>
  );
};
const NinguemSabe: React.FC = () => <Glitch texto="NINGUÉM SABE" size={160} cor="#fff" fundo="#010104" />;
const Roman: React.FC = () => (
  <Foto src="roman.jpg" etq="IMAGEM REAL · LANÇAMENTO DO ROMAN · NASA" z={[1.0, 1.15]} pos="50% 40%">
    <Titulo texto="TELESCÓPIO ROMAN" y={300} size={110} />
    <Selo texto="LANÇADO EM 30/08/2026" y={1300} size={64} cor={OURO} delay={6} />
  </Foto>
);
const Centenas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Foto src="xdf.jpg" etq="IMAGEM REAL · HUBBLE · NASA" z={[1.3, 1.5]}>
      <AbsoluteFill style={{background: 'rgba(0,0,0,.55)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 40}, (_, i) => <circle key={i} cx={100 + random('cx' + i) * 880} cy={600 + random('cy' + i) * 900} r={24} fill="none" stroke={ROXO} strokeWidth={4}
          opacity={f > i * 1.2 ? 1 : 0} />)}
      </svg>
      <div style={{position: 'absolute', top: 820, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 170, color: '#fff', textShadow: '0 8px 40px #000'}}>CENTENAS</div>
      <Selo texto="PREVISÃO" y={1060} size={64} cor={OURO} delay={6} />
    </Foto>
  );
};
const Terra: React.FC = () => {
  const s = useSpring(0);
  return (
    <Ceu>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="tg" cx="35%" cy="30%" r="80%"><stop offset="0%" stopColor="#6ac0ff" /><stop offset="55%" stopColor="#1a5ea8" /><stop offset="100%" stopColor="#04142c" /></radialGradient></defs>
        <circle cx={540} cy={960} r={260 * s} fill="url(#tg)" />
      </svg>
      <Titulo texto="E A TERRA?" y={300} size={140} cor={CIANO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const DoisEmMil: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#030308'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 1000}, (_, i) => { const x = 90 + (i % 40) * 23, y = 560 + Math.floor(i / 40) * 23, alvo = i === 417 || i === 702;
          return <circle key={i} cx={x} cy={y} r={alvo ? 11 : 7} fill={alvo && f > 20 ? VERMELHO : '#2a3a5a'} />; })}
      </svg>
      <Titulo texto="NOS PRÓXIMOS 5 BILHÕES DE ANOS" y={260} size={84} />
      <Selo texto="~2 EM 1.000 (SIMULAÇÕES)" y={1180} size={64} cor={VERMELHO} delay={20} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};

const CENAS = [OlhaPraCima, NaoExisteSol, NuncaExistiu, NumPlaneta, Planeta, SemDia, SemNoite, SoEscuro, Ficcao, Pesquisa, PorEstrela, Trilhoes, NasceuEstrela, Arremessada,
  Crescendo, Cha, Engolindo, Vida, Hipotese, NinguemSabe, Roman, Centenas, Terra, DoisEmMil];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="semsol/narracao.mp3" calma={CALMA} sons={SONS} />;
