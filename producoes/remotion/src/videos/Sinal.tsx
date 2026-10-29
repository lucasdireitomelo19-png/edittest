// Reel POV "Você é o primeiro humano a ouvir um sinal de OUTRA ESTRELA". Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #3, v1), aprovado pelo dono em 29/10. Post: sábado 31/10 (Halloween).
// Voz edge-tts (Antonio), decisão do dono em 29/10 ("Vai de edge"). "IMAGINE" no canto nas cenas hipotéticas, "NENHUM SINAL CONFIRMADO" no fim; sem BLC1.
// Reais: antenas de Goldstone (NASA/JPL) e centro da Via Láctea (Spitzer, NASA). Sala, tela, papel do Wow! e esquemas: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE} from '../comum';
import palavras from './sinal.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'o telescopio captou', 'e a primeira regra', 'nao conte a ninguem', 'imagina voce e', 'o astronomo de plantao', 'e madrugada', 'na tela aparece', 'que nao devia estar', 'vindo da direcao', 'a vontade e gritar',
  'mas existe um protocolo', 'antes de qualquer anuncio', 'ja aconteceu algo', 'um radiotelescopio americano', 'ele nunca mais apareceu', 'se o seu sinal', 'e desde 2026',
  'e responder', 'nenhum governo', 'nao sem uma consulta', 'a humanidade mandou', 'uma resposta levaria', 'quem mandou o sinal', 'ate hoje nenhum', 'mas se um dia',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('ate hoje nenhum');
export const DURACAO = TEMPO.FIM;
const VERDE_TELA = '#5dff9a';

// ---------- peças ----------
// selo "IMAGINE" no canto: deixa claro que a cena é hipotética
const Imagine: React.FC = () => (
  <div style={{position: 'absolute', top: 230, right: 50, padding: '8px 20px', border: `4px solid ${OURO}`, borderRadius: 14, fontFamily: FONTE, fontSize: 34, color: OURO,
    letterSpacing: 4, background: 'rgba(0,0,0,.55)'}}>IMAGINE</div>
);
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('sinal/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
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
// céu escuro com estrelas
const Ceu: React.FC<{children?: React.ReactNode; n?: number}> = ({children, n = 160}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0c1626, #02040a 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: n}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.8 + random('sr' + i) * 2.4} fill="#fff"
          opacity={0.3 + 0.6 * Math.abs(Math.sin(f * 0.05 + i))} />)}
      </svg>
      {children}
    </AbsoluteFill>
  );
};
// onda de rádio na tela verde
const Onda: React.FC<{y: number; pico?: number; cor?: string}> = ({y, pico = 1, cor = VERDE_TELA}) => {
  const f = useCurrentFrame();
  const pts = Array.from({length: 120}, (_, i) => {
    const x = 60 + i * 8;
    const ruido = (random('o' + i + (f >> 1)) - 0.5) * 30;
    const p = pico * 380 * Math.exp(-(((x - 540) / 50) ** 2));
    return `${x},${y + ruido - p}`;
  }).join(' ');
  return <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><polyline points={pts} fill="none" stroke={cor} strokeWidth={5} style={{filter: `drop-shadow(0 0 10px ${cor})`}} /></svg>;
};
const Monitor: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: '#020806'}}>
    <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(93,255,154,.05) 0 2px, transparent 2px 6px)'}} />
    {children}
  </AbsoluteFill>
);

// ---------- cenas ----------
const Captou: React.FC = () => (
  <Foto src="antena.jpg" etq="IMAGEM REAL · GOLDSTONE · NASA/JPL" z={[1.25, 1.05]} pos="50% 60%">
    <Onda y={1150} pico={useSpring(4)} />
    <Titulo texto="O TELESCÓPIO CAPTOU UM SINAL" y={300} size={96} />
    <Imagine />
  </Foto>
);
const Regra: React.FC = () => (
  <Ceu><Selo texto="REGRA Nº 1" y={760} size={130} cor="#fff" delay={0} /><Imagine /></Ceu>
);
const NaoConte: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{transform: shake(f, 4)}}><Glitch texto="NÃO CONTE A NINGUÉM" size={130} cor={VERMELHO} /><Imagine /></AbsoluteFill>;
};
const Plantao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #050a10, #0a1420)'}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 90 + i * 310, top: 760, width: 280, height: 200, borderRadius: 12, background: '#03140c', border: '6px solid #1c2a36',
          boxShadow: `0 0 60px rgba(93,255,154,${0.15 + 0.1 * Math.sin(f * 0.2 + i)})`}}>
          <svg width={280} height={200}><polyline points={Array.from({length: 30}, (_, k) => `${k * 10},${100 + (random('p' + i + k + (f >> 2)) - 0.5) * 60}`).join(' ')} fill="none" stroke={VERDE_TELA} strokeWidth={3} /></svg>
        </div>
      ))}
      <div style={{position: 'absolute', left: 0, right: 0, top: 960, height: 120, background: '#1c2a36'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1240} r={90} fill="#000" /><path d="M380 1600 Q540 1300 700 1600 Z" fill="#000" />
      </svg>
      <Titulo texto="VOCÊ É O ASTRÔNOMO DE PLANTÃO" y={300} size={92} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Imagine />
    </AbsoluteFill>
  );
};
const Imagina: React.FC = () => <AbsoluteFill><Glitch texto="IMAGINA…" size={170} cor={OURO} /><Imagine /></AbsoluteFill>;
const Madrugada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#020406', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 260, color: VERDE_TELA, letterSpacing: 6, opacity: f % 30 < 22 ? 1 : 0.85, textShadow: `0 0 40px ${VERDE_TELA}`}}>03:17</div>
      <Titulo texto="É MADRUGADA" y={500} size={110} />
      <Imagine />
    </AbsoluteFill>
  );
};
const NaTela: React.FC = () => {
  const p = useSpring(10, {damping: 8, mass: 0.5});
  return (
    <Monitor>
      <Onda y={1050} pico={p} />
      <Titulo texto="NA TELA, APARECE…" y={280} size={100} cor={VERDE_TELA} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Imagine />
    </Monitor>
  );
};
const NaoDevia: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Monitor>
      <AbsoluteFill style={{transform: `scale(${interpolate(f, [0, 40], [1.2, 1.5], clamp)})`}}><Onda y={1050} /></AbsoluteFill>
      <div style={{position: 'absolute', left: 540 - 170, top: 1050 - 640, width: 340, height: 700, border: `7px dashed ${VERMELHO}`, borderRadius: 20, opacity: f % 10 < 6 ? 1 : 0.4}} />
      <Titulo texto="UMA COISA QUE NÃO DEVIA ESTAR ALI" y={280} size={90} cor={VERDE_TELA} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Imagine />
    </Monitor>
  );
};
const Direcao: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 50], [1, 2.2], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <Ceu>
      <AbsoluteFill style={{transform: `scale(${z})`}}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <circle cx={540} cy={960} r={14} fill="#fff4d0" style={{filter: 'drop-shadow(0 0 20px #ffd27a)'}} />
          <circle cx={540} cy={960} r={70} fill="none" stroke={OURO} strokeWidth={4} />
          <path d="M540 860 V900 M540 1020 V1060 M440 960 H480 M600 960 H640" stroke={OURO} strokeWidth={4} />
        </svg>
      </AbsoluteFill>
      <Titulo texto="VINDO DE UMA ESTRELA" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Imagine />
    </Ceu>
  );
};
const Gritar: React.FC = () => <AbsoluteFill><Glitch texto="A VONTADE É GRITAR" size={130} cor="#fff" /><Imagine /></AbsoluteFill>;
const Protocolo: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a2230, #05070a 75%)'}}>
      <div style={{position: 'absolute', left: 190, top: 560, width: 700, height: 860, background: '#e8e4d8', borderRadius: 10, transform: `rotate(${-3 * s}deg) translateY(${(1 - s) * 300}px)`,
        boxShadow: '0 30px 80px rgba(0,0,0,.6)', padding: 50, boxSizing: 'border-box'}}>
        <div style={{fontFamily: FONTE, fontSize: 52, color: '#1a1a1a', textAlign: 'center'}}>PROTOCOLO</div>
        {Array.from({length: 9}, (_, i) => <div key={i} style={{height: 16, margin: '34px 0 0', background: '#b8b2a2', width: `${70 + random('l' + i) * 30}%`}} />)}
      </div>
      <Selo texto="REVISADO · 05/06/2026" y={1430} size={70} cor={OURO} delay={10} />
      <Titulo texto="EXISTE UM PROTOCOLO MUNDIAL" y={260} size={92} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Confirmar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={80}>
      {[0, 1, 2].map((i) => {
        const ok = f > 14 + i * 10;
        return (
          <div key={i} style={{position: 'absolute', left: 90 + i * 320, top: 760, width: 260, textAlign: 'center'}}>
            <svg width={260} height={260}><path d="M40 120 Q130 260 220 120 Z" fill="#cfd8e8" /><rect x={120} y={150} width={20} height={90} fill="#8a96a4" /><line x1={130} y1={180} x2={130} y2={60} stroke="#8a96a4" strokeWidth={6} /></svg>
            <div style={{fontFamily: FONTE, fontSize: 110, color: ok ? VERDE : '#3a4250'}}>{ok ? '✔' : '…'}</div>
          </div>
        );
      })}
      <Titulo texto="OUTROS OBSERVATÓRIOS PRECISAM CONFIRMAR" y={280} size={84} />
      <Etiqueta texto="ESQUEMA" />
    </Ceu>
  );
};
const JaAconteceu: React.FC = () => <Foto src="antena_via.jpg" etq="IMAGEM REAL · GOLDSTONE · NASA/JPL" z={[1.05, 1.2]}><Titulo texto="JÁ ACONTECEU ALGO PARECIDO" y={300} size={100} /></Foto>;
const Wow: React.FC = () => {
  const f = useCurrentFrame();
  const c = interpolate(f, [30, 60], [0, 1], clamp);
  const linhas = ['1  1  1  1', '1  1  1  1', '1  1  6  1', '1  1  E  1', '1  1  Q  1', '1  1  U  1', '1  1  J  1', '1  1  5  1', '1  1  1  1'];
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2418, #07060a 75%)'}}>
      <div style={{position: 'absolute', left: 230, top: 600, width: 620, height: 900, background: '#efe9d6', borderRadius: 6, transform: 'rotate(2deg)', boxShadow: '0 30px 80px rgba(0,0,0,.6)'}}>
        {linhas.map((l, i) => <div key={i} style={{fontFamily: 'monospace', fontSize: 56, color: '#333', letterSpacing: 8, textAlign: 'center', marginTop: i ? 14 : 60}}>{l}</div>)}
        <svg width={620} height={900} style={{position: 'absolute', inset: 0}}>
          <ellipse cx={330} cy={500} rx={70} ry={290} fill="none" stroke="#c0202a" strokeWidth={7} strokeDasharray={1900} strokeDashoffset={1900 * (1 - c)} />
        </svg>
        <div style={{position: 'absolute', left: 420, top: 330, fontFamily: 'cursive', fontSize: 110, color: '#c0202a', opacity: c, transform: 'rotate(-12deg)'}}>Wow!</div>
      </div>
      <Titulo texto="WOW! · 15/08/1977 · 72 S" y={280} size={92} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO DO PAPEL ORIGINAL" />
    </AbsoluteFill>
  );
};
const NuncaMais: React.FC = () => <Monitor><Onda y={1050} pico={0} cor="#2a6a46" /><Titulo texto="NUNCA MAIS APARECEU" y={300} size={110} cor={VERDE_TELA} /><Etiqueta texto="ILUSTRAÇÃO" /></Monitor>;
const OnuUai: React.FC = () => (
  <Ceu n={80}>
    <Titulo texto="SE FOR CONFIRMADO" y={300} size={110} />
    <Selo texto={'ONU\n+\nUNIÃO ASTRONÔMICA\nINTERNACIONAL'} y={620} size={80} cor={CIANO} />
    <Imagine />
  </Ceu>
);
const Descartado: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a2230, #05070a 75%)'}}>
    <Titulo texto="DESDE 2026" y={300} size={120} cor={OURO} />
    <Selo texto={'CANDIDATO\nDESCARTADO'} y={620} size={90} cor={VERMELHO} delay={2} />
    <Texto y={1000} size={60} cor="#fff" delay={14}>AVISO OBRIGATÓRIO</Texto>
    <Etiqueta texto="PROTOCOLO REVISADO" />
  </AbsoluteFill>
);
const Responder: React.FC = () => <AbsoluteFill><Glitch texto="E RESPONDER?" size={160} cor={CIANO} /><Imagine /></AbsoluteFill>;
const Ninguem: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05070a'}}>
      {['GOVERNO', 'INSTITUIÇÃO', 'PESSOA'].map((t, i) => {
        const on = f > i * 22;
        return (
          <div key={i} style={{position: 'absolute', top: 640 + i * 220, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: on ? '#fff' : '#222'}}>
            {t} <span style={{color: VERMELHO}}>{on ? '✕' : ''}</span>
          </div>
        );
      })}
      <Titulo texto="NENHUM" y={300} size={120} cor={VERMELHO} />
      <Imagine />
    </AbsoluteFill>
  );
};
const Consulta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c2034, #02060a 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={960} r={300} fill="#0d3a5c" stroke={CIANO} strokeWidth={4} />
        {[-200, -100, 0, 100, 200].map((k, i) => <ellipse key={i} cx={540} cy={960} rx={Math.abs(300 * Math.cos((k + f * 2) / 200))} ry={300} fill="none" stroke={CIANO} strokeWidth={2} opacity={0.5} />)}
        {[-150, 0, 150].map((k, i) => <line key={'l' + i} x1={540 - Math.sqrt(300 ** 2 - k ** 2)} x2={540 + Math.sqrt(300 ** 2 - k ** 2)} y1={960 + k} y2={960 + k} stroke={CIANO} strokeWidth={2} opacity={0.5} />)}
      </svg>
      <Titulo texto="SEM CONSULTA INTERNACIONAL" y={300} size={100} />
      <Etiqueta texto="ESQUEMA" />
      <Imagine />
    </AbsoluteFill>
  );
};
const Mensagem1974: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 70], [0, 1], clamp);
  return (
    <Foto src="via_lactea.jpg" etq="IMAGEM REAL · VIA LÁCTEA · SPITZER · NASA" z={[1.3, 1.4]}>
      <AbsoluteFill style={{background: 'rgba(0,0,0,.45)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={160} y1={1400} x2={160 + 760 * p} y2={1400 - 700 * p} stroke={OURO} strokeWidth={6} strokeDasharray="20 14" />
        <circle cx={160} cy={1400} r={14} fill={CIANO} /><circle cx={920} cy={700} r={40} fill="none" stroke="#fff" strokeWidth={4} />
      </svg>
      <Titulo texto="1974: UMA MENSAGEM DA TERRA" y={300} size={92} />
      <Selo texto="→ 25.000 ANOS-LUZ" y={1180} size={76} cor={OURO} delay={20} />
    </Foto>
  );
};
const Resposta: React.FC = () => (
  <Ceu n={120}>
    <Titulo texto="UMA RESPOSTA LEVARIA" y={300} size={100} />
    <Contador ate={50000} y={720} size={200} cor={OURO} dur={34} />
    <Texto y={980} size={80} cor="#fff" delay={6}>ANOS</Texto>
    <Etiqueta texto="CONTA" />
  </Ceu>
);
const NemExistir: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [10, 70], [1, 0], clamp);
  return (
    <Ceu n={120}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={960} r={30 + 50 * (1 - a)} fill="#ffe0a0" opacity={a} style={{filter: 'drop-shadow(0 0 40px #ffd27a)'}} />
      </svg>
      <Titulo texto="QUEM MANDOU PODE NEM EXISTIR MAIS" y={300} size={92} />
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Imagine />
    </Ceu>
  );
};
const NenhumConfirmado: React.FC = () => (
  <Foto src="antena.jpg" etq="IMAGEM REAL · GOLDSTONE · NASA/JPL" z={[1.1, 1.0]}>
    <AbsoluteFill style={{background: 'rgba(0,0,0,.5)'}} />
    <Selo texto={'NENHUM SINAL\nCONFIRMADO'} y={720} size={110} cor={VERDE} delay={0} />
  </Foto>
);
const Manual: React.FC = () => (
  <Foto src="antena_via.jpg" etq="IMAGEM REAL · GOLDSTONE · NASA/JPL" z={[1.0, 1.15]}>
    <Titulo texto="MAS JÁ EXISTE UM MANUAL" y={300} size={110} cor={OURO} />
    <Selo texto="NENHUM SINAL CONFIRMADO" y={1360} size={56} cor={VERDE} delay={0} />
  </Foto>
);

const CENAS = [Captou, Regra, NaoConte, Imagina, Plantao, Madrugada, NaTela, NaoDevia, Direcao, Gritar, Protocolo, Confirmar, JaAconteceu, Wow, NuncaMais, OnuUai, Descartado,
  Responder, Ninguem, Consulta, Mensagem1974, Resposta, NemExistir, NenhumConfirmado, Manual];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 4, src: 'sfx/tick.wav', volume: 0.5}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="sinal/narracao.mp3" calma={CALMA} sons={SONS} />;
