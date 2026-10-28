// Short "Astronautas veem LUZES de olhos fechados" (clarões dos raios cósmicos). Roteiro do Roteirista (lote radiação #1, v2), aprovado pelo dono em 28/10.
// Entrega direta na versão final. Estratégia de 28/10: tela preta com clarões no 1º quadro, cortes de até 2 s nos primeiros 10 s.
// Mecanismo exato não entra (a fala diz "ninguém provou exatamente como"): na tela, "CAUSA EXATA: EM DEBATE".
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, FPS} from '../comum';
import palavras from './luzes.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'a radiacao do espaco', 'os olhos dos astronautas', 'e eles conseguem ver', 'eles fecham os olhos', 'aparecem claroes', 'particulas de estrelas', 'passando por dentro',
  'apollo 11', 'armstrong e aldrin', 'no escuro de olhos', 'viam flashes', 'na apollo 15', 'a tripulacao ficou', 'avisando em voz alta', 'nas apollo 16 e 17',
  'colocaram um detector', 'e algumas particulas', 'a explicacao mais aceita', 'raios cosmicos pesados', 'atravessam o olho', 'mas ate hoje', 'aqui na terra',
  'o campo magnetico', 'la fora a prova',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('aqui na terra');
export const DURACAO = TEMPO.FIM;

// clarões aleatórios no escuro (pontos, riscos e "nuvens" de luz, como os astronautas descrevem)
const Claroes: React.FC<{n?: number; seed?: string; forca?: number}> = ({n = 6, seed = 'c', forca = 1}) => {
  const f = useCurrentFrame();
  return (
    <>{Array.from({length: n}, (_, i) => {
      const per = 9 + Math.floor(random(seed + 'p' + i) * 14), fase = Math.floor(random(seed + 'f' + i) * per);
      const k = (f + fase) % per;
      if (k > 3) return null;
      const ciclo = Math.floor((f + fase) / per);
      const x = random(seed + 'x' + i + ciclo) * 1080, y = 300 + random(seed + 'y' + i + ciclo) * 1300;
      const o = (1 - k / 4) * forca;
      const tipo = Math.floor(random(seed + 't' + i + ciclo) * 3);
      if (tipo === 0) return <div key={i} style={{position: 'absolute', left: x - 6, top: y - 6, width: 12, height: 12, borderRadius: 6, background: '#fff', opacity: o, boxShadow: '0 0 30px 10px rgba(200,230,255,.8)'}} />;
      if (tipo === 1) { const a = random(seed + 'a' + i + ciclo) * 180; return <div key={i} style={{position: 'absolute', left: x - 120, top: y, width: 240, height: 4, background: '#e8f4ff', opacity: o, transform: `rotate(${a}deg)`, boxShadow: '0 0 18px rgba(200,230,255,.9)'}} />; }
      return <div key={i} style={{position: 'absolute', left: x - 110, top: y - 110, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,235,255,.55), transparent 70%)', opacity: o}} />;
    })}</>
  );
};
// olho estilizado; aberto=1 aberto, 0 fechado
const Olho: React.FC<{aberto: number; y?: number; flash?: number}> = ({aberto, y = 1000, flash = 0}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <defs><clipPath id="olho"><path d={`M140 ${y} Q540 ${y - 330 * aberto} 940 ${y} Q540 ${y + 330 * aberto} 140 ${y} Z`} /></clipPath></defs>
    <path d={`M140 ${y} Q540 ${y - 330 * aberto} 940 ${y} Q540 ${y + 330 * aberto} 140 ${y} Z`} fill="#f4eee6" />
    <g clipPath="url(#olho)">
      <circle cx={540} cy={y} r={170} fill="#2a6a8a" /><circle cx={540} cy={y} r={78} fill="#050608" />
      <circle cx={590} cy={y - 50} r={26} fill="#fff" opacity={0.8} />
      {flash > 0 && <circle cx={540} cy={y} r={300} fill="#fff" opacity={flash} />}
    </g>
    <path d={`M140 ${y} Q540 ${y - 330 * aberto} 940 ${y}`} fill="none" stroke="#2a1a14" strokeWidth={14} />
    {aberto < 0.15 && Array.from({length: 9}, (_, i) => <line key={i} x1={240 + i * 75} y1={y + 6} x2={230 + i * 78} y2={y + 46} stroke="#2a1a14" strokeWidth={8} strokeLinecap="round" />)}
  </svg>
);
const Particula: React.FC<{p: number; x0: number; y0: number; x1: number; y1: number; cor?: string}> = ({p, x0, y0, x1, y1, cor = '#bfefff'}) => {
  const x = interpolate(p, [0, 1], [x0, x1]), y = interpolate(p, [0, 1], [y0, y1]);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <line x1={x0} y1={y0} x2={x} y2={y} stroke={cor} strokeWidth={6} opacity={0.7} style={{filter: 'drop-shadow(0 0 10px #4cc9f0)'}} />
      <circle cx={x} cy={y} r={12} fill="#fff" style={{filter: 'drop-shadow(0 0 16px #4cc9f0)'}} />
    </svg>
  );
};
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('luzes/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Preto: React.FC<{titulo: string; cor?: string; n?: number}> = ({titulo, cor = '#fff', n = 7}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <Claroes n={n} />
    <Titulo texto={titulo} y={330} size={96} cor={cor} />
    <Etiqueta texto="EFEITO · COMO OS ASTRONAUTAS DESCREVEM" />
  </AbsoluteFill>
);

// ---------- cenas ----------
const Gancho: React.FC = () => <Preto titulo="A RADIAÇÃO ATRAVESSA OS OLHOS" n={9} />;
const OlhoAberto: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Olho aberto={1} flash={interpolate(f, [14, 18, 24], [0, 0.9, 0], clamp)} />
      <Particula p={interpolate(f, [0, 16], [0, 1], clamp)} x0={1080} y0={500} x1={540} y1={1000} />
      <Titulo texto="DOS ASTRONAUTAS" y={330} size={110} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const ConseguemVer: React.FC = () => <Preto titulo="E ELES CONSEGUEM VER" cor={CIANO} />;
const Fecham: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: '#05070d'}}><Olho aberto={interpolate(f, [0, 14], [1, 0.02], clamp)} /><Titulo texto="OLHOS FECHADOS…" y={330} size={110} /><Etiqueta texto="ANIMAÇÃO" /></AbsoluteFill>;
};
const Aparecem: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a0a0a, #000 70%)'}}>
    <Claroes n={10} seed="a" />
    <Titulo texto="CLARÕES DE LUZ" y={330} size={120} cor="#e8f4ff" />
    <Etiqueta texto="EFEITO · COMO OS ASTRONAUTAS DESCREVEM" />
  </AbsoluteFill>
);
const Supernova: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 540 - 900 * p, top: 900 - 900 * p, width: 1800 * p, height: 1800 * p, borderRadius: '50%', background: 'radial-gradient(circle, #fff, rgba(255,200,140,.8) 15%, rgba(255,90,60,.35) 40%, transparent 65%)'}} />
      {Array.from({length: 40}, (_, i) => { const a = random('s' + i) * Math.PI * 2, r = p * (300 + random('r' + i) * 700); return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * r, top: 900 + Math.sin(a) * r, width: 8, height: 8, borderRadius: 4, background: '#fff'}} />; })}
      <Titulo texto="PARTÍCULAS DE ESTRELAS QUE EXPLODIRAM" y={300} size={84} cor={OURO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Cabeca: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M380 1500 L380 1340 Q300 1300 300 1150 Q300 820 560 800 Q820 810 820 1100 Q860 1160 820 1200 L820 1300 Q780 1360 700 1360 L700 1500 Z" fill="#1a2030" stroke="#4a5a7a" strokeWidth={6} />
        <ellipse cx={740} cy={1060} rx={34} ry={20} fill="#f4eee6" />
      </svg>
      {[0, 1, 2].map((i) => <Particula key={i} p={interpolate((f + i * 12) % 36, [0, 30], [0, 1], clamp)} x0={1100} y0={500 + i * 220} x1={-40} y1={1300 + i * 80} />)}
      <Titulo texto="PASSANDO POR DENTRO DA CABEÇA" y={300} size={86} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Apollo11: React.FC = () => (
  <Foto src="nasa_as11-40-5903.jpg" etq="IMAGEM REAL · APOLLO 11 · NASA" z={[1.1, 1.25]}>
    <Titulo texto="APOLLO 11 · 1969" y={330} size={120} cor={OURO} />
  </Foto>
);
const Aldrin: React.FC = () => (
  <Foto src="nasa_as11-40-5903.jpg" etq="IMAGEM REAL · ALDRIN, FOTO DE ARMSTRONG · NASA" z={[1.35, 1.6]} pos="50% 30%">
    <Titulo texto="ARMSTRONG E ALDRIN CONTARAM" y={330} size={90} />
  </Foto>
);
const NoEscuro: React.FC = () => <Preto titulo="NO ESCURO, DE OLHOS FECHADOS" n={8} />;
const Ninguem: React.FC = () => {
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Claroes n={4} seed="n" forca={0.6} />
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 360, color: OURO, transform: `scale(${s})`}}>?</div>
      <Titulo texto="NINGUÉM SABIA EXPLICAR" y={330} size={100} />
    </AbsoluteFill>
  );
};
const Apollo15: React.FC = () => (
  <Foto src="nasa_S71-37963.jpg" etq="IMAGEM REAL · TRIPULAÇÃO DA APOLLO 15 · NASA" z={[1.15, 1.25]} pos="50% 80%">
    <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(0,0,0,.75), transparent 35%)"}} />
    <Titulo texto="APOLLO 15: UM TESTE" y={330} size={110} cor={OURO} />
  </Foto>
);
const Vendados: React.FC = () => {
  const f = useCurrentFrame();
  const m = Math.round(interpolate(f, [0, 40], [0, 60], clamp));
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => <g key={i} transform={`translate(${220 + i * 320} 1080)`}><circle r={110} fill="#e8e0d8" /><rect x={-118} y={-40} width={236} height={60} rx={20} fill="#1a1a22" /><rect x={-90} y={120} width={180} height={260} rx={70} fill="#e8eef8" /></g>)}
      </svg>
      <Titulo texto="1 HORA VENDADOS" y={330} size={120} cor={OURO} />
      <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{m} MIN</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const VozAlta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Claroes n={6} seed="v" />
      {Array.from({length: 6}, (_, i) => {
        const s = spring({frame: f - 4 - i * 7, fps: FPS, config: {damping: 10}});
        return <div key={i} style={{position: 'absolute', left: 120 + (i % 3) * 300, top: 820 + Math.floor(i / 3) * 170, padding: '14px 24px', borderRadius: 20, background: 'rgba(76,201,240,.2)', border: `3px solid ${CIANO}`, fontFamily: FONTE, fontSize: 44, color: '#fff', transform: `scale(${s})`}}>“FLASH!”</div>;
      })}
      <Titulo texto="AVISANDO A CADA CLARÃO" y={330} size={96} />
    </AbsoluteFill>
  );
};
const Apollo17: React.FC = () => (
  <Foto src="nasa_S72-50438.jpg" etq="IMAGEM REAL · TRIPULAÇÃO DA APOLLO 17 · NASA" z={[1.15, 1.25]}>
    <Titulo texto="APOLLO 16 E 17" y={330} size={120} cor={OURO} />
  </Foto>
);
const Capacete: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1040} r={300} fill="#e8eef4" /><ellipse cx={540} cy={1060} rx={210} ry={170} fill="#1a2a3a" />
        <rect x={420} y={720} width={240} height={90} rx={16} fill="#3a4a5a" stroke={OURO} strokeWidth={6} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={440 + i * 52} y={740} width={36} height={50} rx={6} fill={Math.floor(f / 6 + i) % 3 ? '#4a6a5a' : '#3ddc84'} />)}
      </svg>
      <Titulo texto="DETECTOR NO CAPACETE" y={330} size={104} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Bateram: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 760, height: 6, background: 'rgba(255,255,255,.25)'}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 1060, height: 6, background: 'rgba(255,255,255,.25)'}} />
      <div style={{position: 'absolute', left: 80, top: 690, fontFamily: FONTE, fontSize: 34, color: CIANO}}>PARTÍCULAS NO DETECTOR</div>
      <div style={{position: 'absolute', left: 80, top: 990, fontFamily: FONTE, fontSize: 34, color: OURO}}>CLARÕES QUE ELE VIU</div>
      {[180, 420, 610, 840].map((x, i) => <div key={'p' + i} style={{position: 'absolute', left: x, top: 730, width: 12, height: 66, background: CIANO, opacity: f > i * 6 ? 1 : 0}} />)}
      {[420, 840].map((x, i) => <React.Fragment key={'c' + i}><div style={{position: 'absolute', left: x, top: 1030, width: 12, height: 66, background: OURO, opacity: f > 20 + i * 6 ? 1 : 0}} /><div style={{position: 'absolute', left: x + 4, top: 800, width: 4, height: 230, background: 'rgba(255,255,255,.5)', opacity: f > 30 ? 1 : 0}} /></React.Fragment>)}
      <Titulo texto="ALGUMAS BATERAM" y={330} size={120} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Explicacao: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #121a2c, #03050c 70%)'}}><Titulo texto="A EXPLICAÇÃO MAIS ACEITA" y={760} size={110} cor={CIANO} /></AbsoluteFill>;
const Nave: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="luzes/iss_dentro.mp4" ini={2} />
      <Sombra />
      {[0, 1].map((i) => <Particula key={i} p={interpolate((f + i * 18) % 36, [0, 30], [0, 1], clamp)} x0={1100} y0={400 + i * 300} x1={-40} y1={1200 + i * 200} />)}
      <Etiqueta texto="ISS REAL · NASA · PARTÍCULAS: ANIMAÇÃO" real />
      <Titulo texto="RAIOS CÓSMICOS ATRAVESSAM A NAVE" y={330} size={86} />
    </AbsoluteFill>
  );
};
const Acende: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070d'}}>
      <Olho aberto={1} flash={interpolate(f, [16, 20, 30], [0, 1, 0], clamp)} />
      <Particula p={interpolate(f, [0, 18], [0, 1], clamp)} x0={1080} y0={1500} x1={540} y1={1000} cor="#ffd9a0" />
      <Titulo texto="ATRAVESSAM O OLHO… E ALGO ACENDE" y={300} size={84} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Debate: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1414, #050404 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '30px 50px', border: `8px solid ${OURO}`, borderRadius: 24, fontFamily: FONTE, fontSize: 92, color: OURO, textAlign: 'center', lineHeight: 1.1, opacity: s, transform: `scale(${0.8 + 0.2 * s})`}}>CAUSA EXATA:<br />EM DEBATE</div>
      <Texto y={1200} size={44} delay={8}>NINGUÉM PROVOU EXATAMENTE COMO</Texto>
    </AbsoluteFill>
  );
};
const NaTerra: React.FC = () => (
  <AbsoluteFill>
    <Real src="luzes/iss_terra.mp4" ini={3} zoom={[1, 1.06]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · A TERRA VISTA DA ISS · NASA" real />
    <Titulo texto="AQUI NA TERRA, NINGUÉM VÊ" y={330} size={96} />
  </AbsoluteFill>
);
const Campo: React.FC = () => (
  <AbsoluteFill>
    <Real src="luzes/sv_magnetosfera.mp4" zoom={[1, 1.08]} />
    <Sombra />
    <Etiqueta texto="VISUALIZAÇÃO NASA · CAMPO MAGNÉTICO DA TERRA" />
    <Titulo texto="O CAMPO MAGNÉTICO E O AR SEGURAM" y={330} size={86} cor={CIANO} />
  </AbsoluteFill>
);
const Prova: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Claroes n={12} seed="z" />
    <Titulo texto="A PROVA APARECE DENTRO DOS OLHOS" y={330} size={86} cor={VERMELHO} />
    <Etiqueta texto="EFEITO · COMO OS ASTRONAUTAS DESCREVEM" />
  </AbsoluteFill>
);

const CENAS = [Gancho, OlhoAberto, ConseguemVer, Fecham, Aparecem, Supernova, Cabeca, Apollo11, Aldrin, NoEscuro, Ninguem, Apollo15, Vendados, VozAlta, Apollo17,
  Capacete, Bateram, Explicacao, Nave, Acende, Debate, NaTerra, Campo, Prova];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/hit.wav', volume: 0.4}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="luzes/narracao.mp3" calma={CALMA} sons={SONS} />;
