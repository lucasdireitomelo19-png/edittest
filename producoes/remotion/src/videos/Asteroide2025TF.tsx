// Short "Um asteroide passou na ALTURA da Estação Espacial" (2025 TF). Roteiro do Roteirista (v2), aprovado pelo dono em 28/10.
// Estratégia de 28/10: gancho visível no 1º segundo, cortes de até 2 s nos primeiros 10 s, sem cena de "respiro" antes da escalada.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {
  Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, Glitch, Contador, orto, caminhoGlobo, Pino,
  useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS,
} from '../comum';
import palavras from './tf.palavras.json';
import mundo from './dados/mundo.json';

const W = palavras as Palavra[];
const MUNDO = mundo as number[][][];
const FRASES = [
  'um asteroide passou', 'da estacao espacial', 'e ninguem viu chegar', 'primeiro de outubro', 'uma rocha chamada', '2025 tf', 'passou a cerca de', 'da superficie',
  'em cima da antartida', 'a mais de vinte', 'foi a segunda passagem', 'e a primeira vez que', 'foi poucas horas depois', 'calma', 'ela tinha de um a tres',
  'se tivesse entrado', 'sem perigo', 'uma pedra cruzou a altura', 'e nenhum telescopio', 'em 2013 outra pedra', 'vinha da direcao do sol', 'essa tinha uns vinte',
  'explodiu sobre chelyabinsk', 'mais de sete mil', 'mil e quinhentos feridos', 'as pequenas a gente', 'e por isso que novos', 'pra cacar justamente',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('calma');
export const DURACAO = TEMPO.FIM;
const ESPACO = 'radial-gradient(circle at 50% 120%, #0c1a33, #02040a 70%)';

const Estrelas: React.FC<{n?: number}> = ({n = 140}) => (
  <>{Array.from({length: n}, (_, i) => <div key={i} style={{position: 'absolute', left: random('x' + i) * 1080, top: random('y' + i) * 1920, width: 3 + random('s' + i) * 3, height: 3 + random('s' + i) * 3, borderRadius: 3, background: '#fff', opacity: 0.3 + 0.6 * random('o' + i)}} />)}</>
);
// risco de uma rocha cruzando o quadro
const Rocha: React.FC<{p: number; x0: number; y0: number; x1: number; y1: number; r?: number}> = ({p, x0, y0, x1, y1, r = 18}) => {
  const x = interpolate(p, [0, 1], [x0, x1]), y = interpolate(p, [0, 1], [y0, y1]);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><linearGradient id={`rr${x0}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#ffd9a0" /></linearGradient></defs>
      <g transform={`translate(${x} ${y}) rotate(${ang})`}>
        <rect x={-420} y={-r * 0.45} width={420} height={r * 0.9} rx={r * 0.45} fill={`url(#rr${x0})`} />
        <circle r={r} fill="#d8c8b0" style={{filter: 'drop-shadow(0 0 24px #ffb060)'}} />
      </g>
    </svg>
  );
};

// ---------- 0–10 s: gancho e fatos, cortes curtos ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 0.04;
  return (
    <AbsoluteFill style={{background: ESPACO, overflow: 'hidden'}}>
      <Estrelas />
      <div style={{position: 'absolute', left: 540 - 420, top: 1180 - 420, width: 840, height: 840, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #2a7ac0, #0b2a50 60%, #020812)', boxShadow: '0 0 90px rgba(76,201,240,.45)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={540} cy={1180} rx={500} ry={170} fill="none" stroke="rgba(76,201,240,.7)" strokeWidth={4} strokeDasharray="14 10" />
      </svg>
      <div style={{position: 'absolute', left: 540 + Math.cos(a) * 500 - 22, top: 1180 + Math.sin(a) * 170 - 10, width: 44, height: 20, background: '#e8eef8', borderRadius: 3, boxShadow: '0 0 14px #fff'}} />
      <Rocha p={interpolate(f, [0, 40], [0.05, 0.95], clamp)} x0={1250} y0={600} x1={-200} y1={1140} r={20} />
      <Etiqueta texto="ANIMAÇÃO · FORA DE ESCALA" />
      <Titulo texto="UM ASTEROIDE PASSOU" y={300} size={104} delay={0} />
    </AbsoluteFill>
  );
};
const Estacao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="tf/iss_terra.mp4" zoom={[1.0, 1.08]} />
      <Sombra />
      <Rocha p={interpolate(f, [0, 30], [0.1, 0.9], clamp)} x0={1200} y0={500} x1={-150} y1={900} r={14} />
      <Etiqueta texto="IMAGEM REAL · VISTA DA ISS · NASA · PEDRA: ANIMAÇÃO" real />
      <Titulo texto="NA ALTURA DA ESTAÇÃO ESPACIAL" y={330} size={88} cor={OURO} />
    </AbsoluteFill>
  );
};
const Ninguem: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/estrelas.mp4" ini={2} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · CÉU NOTURNO" real />
    <Titulo texto="NINGUÉM VIU CHEGAR" y={330} size={110} cor={VERMELHO} />
  </AbsoluteFill>
);
const Data: React.FC = () => {
  const s = useSpring(0, {damping: 11, mass: 0.5});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #10182c, #03050c 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 640, width: 900, padding: '60px 0', borderRadius: 30, background: 'rgba(10,16,30,.92)', border: `4px solid ${OURO}`,
        opacity: s, transform: `scale(${0.85 + 0.15 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 150, color: '#fff', letterSpacing: -4}}>01/10/2025</div>
        <div style={{fontSize: 60, color: OURO, marginTop: 10}}>2025 TF</div>
      </div>
    </AbsoluteFill>
  );
};
const Rocha1: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/asteroide.mp4" ini={6} zoom={[1.2, 1.3]} />
    <Sombra />
    <Etiqueta texto="ANIMAÇÃO · ASTEROIDE ILUSTRATIVO" />
    <Titulo texto="UMA ROCHA CHAMADA…" y={330} size={100} />
  </AbsoluteFill>
);
const Nome: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/asteroide.mp4" ini={1} />
    <Sombra />
    <Etiqueta texto="ANIMAÇÃO · ASTEROIDE ILUSTRATIVO" />
    <Titulo texto="2025 TF" y={330} size={200} cor={OURO} />
  </AbsoluteFill>
);
const Altura: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: ESPACO, overflow: 'hidden'}}>
      <Estrelas n={90} />
      <div style={{position: 'absolute', left: -900, top: 1340, width: 2880, height: 2880, borderRadius: '50%', background: 'radial-gradient(circle at 50% 8%, #3a8ad0, #0b2a50 40%)', boxShadow: '0 0 0 30px rgba(76,201,240,.15)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M-50 1060 Q540 900 1130 1060" fill="none" stroke={CIANO} strokeWidth={5} strokeDasharray="16 12" />
        <line x1={540} y1={1338} x2={540} y2={1338 - 330 * p} stroke={OURO} strokeWidth={8} />
      </svg>
      <div style={{position: 'absolute', left: 120, top: 1070, fontFamily: FONTE, fontSize: 34, color: CIANO}}>ÓRBITA DA ISS</div>
      <Rocha p={0.55} x0={1200} y0={960} x1={-120} y1={1040} r={16} />
      <Titulo texto="~400 KM" y={330} size={200} cor={OURO} />
      <Etiqueta texto="ANIMAÇÃO · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const Superficie: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/iss_terra.mp4" ini={5} zoom={[1.1, 1.2]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · VISTA DA ISS · NASA" real />
    <Titulo texto="400 KM DA SUPERFÍCIE" y={330} size={100} />
  </AbsoluteFill>
);
const Antartida: React.FC = () => {
  const f = useCurrentFrame();
  const g = orto(f * 0.15, -72, 420, 540, 1060);
  const [px, py, v] = g(40, -75);
  const pin = spring({frame: f - 8, fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: ESPACO}}>
      <Estrelas n={80} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1060} r={420} fill="#0b2a50" />
        <path d={caminhoGlobo(MUNDO, g)} fill="#e8eef4" />
        <circle cx={540} cy={1060} r={420} fill="none" stroke="rgba(120,200,255,.5)" strokeWidth={5} />
      </svg>
      {v && <Pino x={px} y={py} s={pin} cor={VERMELHO} />}
      <Titulo texto="EM CIMA DA ANTÁRTIDA" y={330} size={96} />
      <Etiqueta texto="MAPA REAL · PONTO APROXIMADO" />
    </AbsoluteFill>
  );
};
const Velocidade: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1206, #050302 70%)'}}>
    <Contador ate={20} y={660} size={300} cor={OURO} pre="+" ini={0} dur={16} />
    <Texto y={980} size={80} cor="#fff" delay={4}>KM POR SEGUNDO</Texto>
  </AbsoluteFill>
);
const Segunda: React.FC = () => {
  const s = useSpring(4, {damping: 10, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #121a2c, #03050c 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 380, color: OURO, transform: `scale(${0.6 + 0.4 * s})`, opacity: s, lineHeight: 1}}>#2</div>
      <Texto y={1160} size={52} cor="#fff" delay={8}>PASSAGEM MAIS PRÓXIMA JÁ REGISTRADA</Texto>
    </AbsoluteFill>
  );
};
const Telescopio: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/radio.mp4" ini={2} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · RADIOTELESCÓPIO ILUSTRATIVO" real />
    <Titulo texto="O PRIMEIRO A VER…" y={330} size={104} />
  </AbsoluteFill>
);
const Depois: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a0a0a, #050202 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={260} fill="#0e1626" stroke="#cfd8e8" strokeWidth={10} />
        <line x1={540} y1={1000} x2={540 + Math.cos(f * 0.25) * 200} y2={1000 + Math.sin(f * 0.25) * 200} stroke={VERMELHO} strokeWidth={10} strokeLinecap="round" />
        <line x1={540} y1={1000} x2={540 + Math.cos(f * 0.02 - 1.5) * 140} y2={1000 + Math.sin(f * 0.02 - 1.5) * 140} stroke="#fff" strokeWidth={12} strokeLinecap="round" />
      </svg>
      <Titulo texto="VISTO HORAS DEPOIS" y={330} size={110} cor={VERMELHO} />
      <Texto y={1330} size={44} delay={6}>ELA JÁ TINHA PASSADO</Texto>
    </AbsoluteFill>
  );
};
const Calma: React.FC = () => <Glitch texto="CALMA." size={220} />;
const Tamanho: React.FC = () => {
  const s = useSpring(4, {damping: 12, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1020, #1a2238)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1420, height: 6, background: 'rgba(255,255,255,.3)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={300} cy={1080} r={34} fill="#cfd8e8" /><rect x={268} y={1120} width={64} height={300} rx={26} fill="#cfd8e8" />
      </svg>
      <div style={{position: 'absolute', left: 560, top: 1420 - 330 * s, width: 330 * s, height: 330 * s, borderRadius: '46% 54% 50% 50% / 52% 44% 56% 48%', background: 'radial-gradient(circle at 35% 30%, #8a7a6a, #3a2e26 70%)'}} />
      <Titulo texto="1–3 M" y={330} size={220} cor={VERDE} />
      <Texto y={600} size={44} delay={8}>UMA PEDRA PEQUENA</Texto>
      <Etiqueta texto="ILUSTRAÇÃO · ESCALA APROXIMADA" />
    </AbsoluteFill>
  );
};
const Desfaz: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/meteoro.mp4" />
    <Sombra />
    <Etiqueta texto="ANIMAÇÃO" />
    <Titulo texto="IA SE DESFAZER LÁ EM CIMA" y={330} size={92} />
  </AbsoluteFill>
);
const SemPerigo: React.FC = () => {
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #062a1a, #020806 70%)'}}>
      <div style={{position: 'absolute', left: 390, top: 560, width: 300, height: 300, borderRadius: '50%', background: VERDE, transform: `scale(${s})`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 90px rgba(61,220,132,.6)'}}>
        <svg width={170} height={170} viewBox="-60 -60 120 120"><path d="M-36 0 L-10 26 L38 -26" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
      </div>
      <Titulo texto="SEM PERIGO" y={960} size={140} cor={VERDE} />
    </AbsoluteFill>
  );
};
const Astronautas: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/iss_dentro.mp4" ini={1} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · DENTRO DA ISS · NASA" real />
    <Titulo texto="NA ALTURA DOS ASTRONAUTAS" y={330} size={96} />
  </AbsoluteFill>
);
const NenhumViu: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/radio.mp4" ini={7} zoom={[1.15, 1.25]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · RADIOTELESCÓPIO ILUSTRATIVO" real />
    <Titulo texto="NENHUM TELESCÓPIO VIU ANTES" y={330} size={92} cor={VERMELHO} />
  </AbsoluteFill>
);
const Em2013: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 640, width: 900, padding: '60px 0', borderRadius: 30, background: 'rgba(30,20,8,.9)', border: `4px solid ${VERMELHO}`, opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 170, color: '#fff'}}>2013</div>
        <div style={{fontSize: 52, color: VERMELHO}}>OUTRA PEDRA. SEM AVISO.</div>
      </div>
    </AbsoluteFill>
  );
};
const DoSol: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1630, #2a3a66 60%, #e08a5a)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 820 - 260, top: 420 - 260, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, #fffbe0, rgba(255,220,120,.6) 30%, transparent 70%)'}} />
      <Rocha p={interpolate(f, [0, 45], [0.1, 0.8], clamp)} x0={820} y0={420} x1={200} y1={1300} r={16} />
      <Titulo texto="VINDO DA DIREÇÃO DO SOL" y={1360} size={84} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Vinte: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #241818, #080505 70%)'}}><Titulo texto="~20 M" y={720} size={260} cor={OURO} /><Texto y={1040} size={52} delay={6}>BEM MAIOR</Texto></AbsoluteFill>;
const Explodiu: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 26], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1630, #2a3a66 55%, #e08a5a)', overflow: 'hidden', transform: shake(f, 12 * (1 - p), 'x')}}>
      <div style={{position: 'absolute', left: 540 - 700 * p, top: 700 - 700 * p, width: 1400 * p, height: 1400 * p, borderRadius: '50%', background: 'radial-gradient(circle, #fff, rgba(255,230,160,.9) 25%, rgba(255,140,60,.4) 50%, transparent 70%)'}} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [2, 6, 14], [0, 0.9, 0], clamp)}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1500 L60 1380 L140 1380 L160 1300 L260 1300 L280 1420 L380 1420 L400 1250 L520 1250 L540 1400 L660 1400 L680 1330 L800 1330 L820 1450 L940 1450 L960 1360 L1080 1360 L1080 1920 L0 1920 Z" fill="#0a0d16" />
      </svg>
      <Etiqueta texto="ANIMAÇÃO · RECONSTRUÇÃO" />
      <Titulo texto="CHELYABINSK, RÚSSIA" y={300} size={96} cor="#1a1206" />
    </AbsoluteFill>
  );
};
const Predios: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1b1a24, #050508 70%)'}}><Contador ate={7200} y={680} size={230} ini={0} dur={18} /><Texto y={960} size={72} cor={OURO} delay={4}>PRÉDIOS DANIFICADOS</Texto></AbsoluteFill>;
const Feridos: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #241818, #080505 70%)'}}><Contador ate={1500} y={680} size={250} ini={0} dur={18} /><Texto y={980} size={80} cor={VERMELHO} delay={4}>FERIDOS</Texto></AbsoluteFill>;
const Pequenas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: ESPACO, overflow: 'hidden'}}>
      <Estrelas n={60} />
      <div style={{position: 'absolute', left: 540 - 260, top: 1050 - 260, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #2a7ac0, #0b2a50 60%, #020812)'}} />
      {Array.from({length: 30}, (_, i) => {
        const a = random('pa' + i) * Math.PI * 2 + f * (0.01 + random('pv' + i) * 0.02), r = 330 + random('pr' + i) * 260;
        return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * r, top: 1050 + Math.sin(a) * r * 0.8, width: 9, height: 9, borderRadius: 5, background: '#d8c8b0'}} />;
      })}
      <Titulo texto="AS PEQUENAS A GENTE AINDA PERDE" y={300} size={86} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Novos: React.FC = () => (
  <AbsoluteFill>
    <Real src="tf/vlt.mp4" />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · CÉU VISTO DO VLT · ESO" real />
    <Titulo texto="NOVOS TELESCÓPIOS" y={330} size={110} cor={CIANO} />
  </AbsoluteFill>
);
const Cacar: React.FC = () => {
  const f = useCurrentFrame();
  const a = -1.2 + Math.sin(f * 0.05) * 0.5;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #02040c, #0c1630 70%)', overflow: 'hidden'}}>
      <Estrelas n={120} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M540 1500 L${540 + Math.cos(a - 0.12) * 1500} ${1500 + Math.sin(a - 0.12) * 1500} L${540 + Math.cos(a + 0.12) * 1500} ${1500 + Math.sin(a + 0.12) * 1500} Z`} fill="rgba(76,201,240,.12)" />
        <rect x={340} y={1500} width={400} height={420} fill="#c8ccd6" /><path d="M340 1500 A200 200 0 0 1 740 1500 Z" fill="#e4e7ee" />
      </svg>
      <Rocha p={interpolate(f, [0, 60], [0.2, 0.6], clamp)} x0={1100} y0={500} x1={-100} y1={800} r={10} />
      <Titulo texto="PRA CAÇAR JUSTAMENTE ESSAS" y={300} size={90} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

const CENAS = [Gancho, Estacao, Ninguem, Data, Rocha1, Nome, Altura, Superficie, Antartida, Velocidade, Segunda, Telescopio, Depois, Calma, Tamanho, Desfaz, SemPerigo,
  Astronautas, NenhumViu, Em2013, DoSol, Vinte, Explodiu, Predios, Feridos, Pequenas, Novos, Cacar];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const SONS = [
  {em: 0, src: 'sfx/whoosh.wav', volume: 0.5},
  {em: T[FRASES.indexOf('explodiu sobre chelyabinsk')] + 2, src: 'sfx/boom.wav', volume: 0.55},
];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="tf/narracao.mp3" calma={CALMA} sons={SONS} />;
