// Longo POV "A Terra PERDEU a Lua: hora por hora, até milhões de anos" (1920x1080). Roteiro do Roteirista, aprovado pelo dono (25/10, v1).
// Molde do "Última pessoa": marcador fixo no canto, saturação caindo por capítulo e voltando inteira em "Mas espera…".
// O dono pediu este vídeo sem storyboard nem prévia: entregar já pronto para postar.
import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {
  ancoras, Palavra, fr, Titulo, Texto, orto, caminhoGlobo, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS,
} from '../comum';
import palavras from './semlua.palavras.json';

const W = palavras as Palavra[];
import {LUA, NOITE, MUNDO, Etq, Tit, Sub, Escuro, Clip, Foto, Ceu, Contorno, Disco, Terra, Barra, Glitch, Card, Grande, Carimbo, Relogio, criarLongo, Cap} from '../longo';

// ---------- capítulos ----------
const CAPS: Cap[] = [
  {canto: 'SEM LUA · HORA 0', sat: 1},
  {canto: 'SEM LUA · HORA 1', sat: 0.85, titulo: 'HORA 1', sub: 'O MAR PARA DE RESPIRAR'},
  {canto: 'SEM LUA · NOITE 1', sat: 0.7, titulo: 'NOITE 1', sub: 'O ESCURO DE VERDADE'},
  {canto: 'SEM LUA · SEMANA 3', sat: 0.55, titulo: 'SEMANAS', sub: 'A VIDA QUE SEGUE A LUA'},
  {canto: 'SEM LUA · ANO 1', sat: 0.45, titulo: 'ANO 1', sub: 'O MITO DO DIA DE SEIS HORAS'},
  {canto: 'SEM LUA · SÉCULO 10', sat: 0.35, titulo: 'SÉCULOS', sub: 'O ÚLTIMO ECLIPSE'},
  {canto: 'SEM LUA · +1 MILHÃO DE ANOS', sat: 0.35, titulo: 'MILHÕES DE ANOS', sub: 'O EIXO DA TERRA'},
  {canto: 'A LUA ESTÁ AQUI', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- cenas: gancho ----------
const Some: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const o = interpolate(f, [d * 0.35, d * 0.85], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <OffthreadVideo src={staticFile('semlua/r7093.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover', opacity: o}} />
      <Contorno x={960} y={540} r={120} o={1 - o} />
      <Etq t="IMAGEM REAL · SUMIÇO: EFEITO" real />
      <Tit t="VOCÊ OLHA PRO CÉU…" />
    </AbsoluteFill>
  );
};
const NaoEsta: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile('semlua/r31569.mp4')} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <Escuro />
    <Contorno x={1300} y={300} r={90} />
    <Etq t="IMAGEM REAL · CONTORNO: EFEITO" real />
    <Tit t="E A LUA NÃO ESTÁ LÁ" />
  </AbsoluteFill>
);
const Nuvem: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [8, 20], [0, 1], clamp);
  return (
    <Ceu>
      <div style={{position: 'absolute', left: 660, top: 380, width: 600, height: 220, borderRadius: 110, background: 'rgba(160,170,190,.55)', filter: 'blur(6px)'}} />
      <Contorno x={960} y={470} r={110} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={660} y1={300} x2={660 + 600 * r} y2={300 + 400 * r} stroke={VERMELHO} strokeWidth={22} strokeLinecap="round" />
      </svg>
      <Tit t="NÃO É UMA NUVEM" />
    </Ceu>
  );
};
const LuaNova: React.FC = () => (
  <Ceu>
    <div style={{position: 'absolute', left: 840, top: 360, width: 240, height: 240, borderRadius: '50%', background: '#111522', boxShadow: 'inset -10px -10px 30px rgba(0,0,0,.8), 0 0 4px rgba(255,255,255,.2)'}} />
    <Tit t="NÃO É LUA NOVA" />
    <Sub y={680}>A LUA NOVA CONTINUA LÁ, SÓ NÃO APARECE</Sub>
  </Ceu>
);
const Sumiu: React.FC = () => <Ceu><Contorno x={960} y={520} r={180} /><Titulo texto="SUMIU." y={440} size={150} /></Ceu>;
const Imagina: React.FC = () => <Glitch t="ISSO NUNCA VAI ACONTECER. MAS IMAGINA." s={110} />;
const Nasce: React.FC = () => <Clip src="semlua/r128118.mp4" etq="IMAGEM REAL · LUA" t="O QUE VEM DEPOIS" />;
const Distancia: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Ceu n={90}>
      <Terra x={300} y={600} R={150} />
      <Disco x={1640} y={600} r={42} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={480} y1={600} x2={480 + 1110 * p} y2={600} stroke={OURO} strokeWidth={6} strokeDasharray="20 12" />
      </svg>
      <div style={{position: 'absolute', top: 650, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: OURO}}>{Math.round(384400 * p).toLocaleString('pt-BR')} KM</div>
      <Tit t="UMA BOLA DE PEDRA" />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Ceu>
  );
};
const Linha: React.FC = () => {
  const f = useCurrentFrame();
  const marcas = ['HORA 1', 'NOITE 1', 'SEMANAS', 'ANO 1', 'SÉCULOS', 'MILHÕES DE ANOS'];
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 140, right: 140, top: 560, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.2)'}} />
      {marcas.map((m, i) => {
        const s = spring({frame: f - 4 - i * 6, fps: FPS, config: {damping: 12}});
        const x = 140 + (i / (marcas.length - 1)) * 1640;
        return <React.Fragment key={m}>
          <div style={{position: 'absolute', left: x - 18, top: 546, width: 36, height: 36, borderRadius: 18, background: i < 5 ? CIANO : OURO, transform: `scale(${s})`}} />
          <div style={{position: 'absolute', left: x - 160, width: 320, top: i % 2 ? 620 : 450, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: '#fff', opacity: s}}>{m}</div>
        </React.Fragment>;
      })}
      <Tit t="NA HORA… OU EM MILHÕES DE ANOS" s={76} />
    </AbsoluteFill>
  );
};
const Mentira: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1414, #050404 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 130, color: '#cfd2da', filter: `blur(${interpolate(f, [0, 30], [14, 4], clamp)}px)`}}>DIA DE 6 HORAS?</div>
      <Tit t="UMA DELAS É MENTIRA" cor={VERMELHO} y={160} />
    </AbsoluteFill>
  );
};

// ---------- hora 1: marés ----------
const Mar: React.FC = () => <Clip src="semlua/r50784.mp4" etq="IMAGEM REAL · MAR" t="NÃO ESTÁ NO CÉU. ESTÁ NO MAR." />;
const Mares: React.FC = () => <Clip src="semlua/sv_mares.mp4" etq="VISUALIZAÇÃO NASA · MODELO DE MARÉS" t="DUAS VEZES POR DIA" />;
const Bojo: React.FC<{lua?: number; titulo: string}> = ({lua = 1, titulo}) => {
  const f = useCurrentFrame();
  const e = 1 + 0.32 * lua + 0.04 * Math.sin(f * 0.1);
  return (
    <Ceu n={90}>
      <div style={{position: 'absolute', left: 760 - 230 * e, top: 560 - 230 / Math.sqrt(e), width: 460 * e, height: 460 / Math.sqrt(e), borderRadius: '50%', background: 'rgba(76,201,240,.45)', border: `3px solid ${CIANO}`}} />
      <Terra x={760} y={560} R={200} />
      <Disco x={1620} y={560} r={60} o={lua} />
      {lua < 1 && <Contorno x={1620} y={560} r={60} o={1 - lua} />}
      <Tit t={titulo} />
      <Etq t="ILUSTRAÇÃO · MARÉ EXAGERADA" />
    </Ceu>
  );
};
const Puxa: React.FC = () => <Bojo titulo="QUEM PUXA É A LUA" />;
const SolPuxa: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [4, 26], [0, 1], clamp), b = interpolate(f, [14, 36], [0, 0.46], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <Barra x={360} y={460} w={1000} h={80} p={a} cor={CIANO} rot="LUA" val="100%" />
      <Barra x={360} y={700} w={1000} h={80} p={b} cor={OURO} rot="SOL" val="~46%" />
      <Tit t="O SOL PUXA SÓ METADE" />
      <Etq t="FORÇA DE MARÉ" />
    </AbsoluteFill>
  );
};
const SoSol: React.FC = () => {
  const f = useCurrentFrame();
  return <Bojo lua={interpolate(f, [0, 30], [1, 0], clamp)} titulo="SOBRA SÓ O SOL" />;
};
const Regua: React.FC = () => {
  const f = useCurrentFrame();
  const h = interpolate(f, [8, 40], [1, 0.33], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1626, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 700, top: 980 - 600 * h, width: 520, height: 600 * h, background: 'linear-gradient(180deg, #4cc9f0, #0b3a66)', borderRadius: '10px 10px 0 0'}} />
      <div style={{position: 'absolute', left: 700, top: 380, width: 520, height: 600, border: '4px dashed rgba(255,255,255,.4)'}} />
      <div style={{position: 'absolute', left: 1260, top: 360, fontFamily: FONTE, fontSize: 40, color: '#9aa8c2'}}>HOJE · 100%</div>
      <div style={{position: 'absolute', left: 1260, top: 980 - 600 * h - 26, fontFamily: FONTE, fontSize: 56, color: OURO}}>{Math.round(h * 100)}%</div>
      <Tit t="CERCA DE 1/3 DA MARÉ" />
      <Etq t="ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Praia: React.FC = () => <Clip src="semlua/r218828.mp4" etq="IMAGEM REAL · MARÉ BAIXA" t="O MAR PARECE… PARADO" />;
const Lama: React.FC = () => <Clip src="semlua/r308390.mp4" etq="IMAGEM REAL · FAIXA DE MARÉ" t="SOBE UM POUCO, DESCE UM POUCO" />;
const Faixa: React.FC<{p?: number; titulo: string}> = ({p = 1, titulo}) => {
  const f = useCurrentFrame();
  const k = p < 1 ? interpolate(f, [6, 36], [1, p], clamp) : 1;
  return (
    <AbsoluteFill style={{background: '#0b2a44'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 1080, background: 'linear-gradient(90deg, #0b3a66 0%, #1d6f99 40%, #d9c79a 40%, #c8b27e 100%)'}} />
      <div style={{position: 'absolute', left: 1920 * 0.4 - 500 * k, top: 0, width: 500 * k, height: 1080, background: 'repeating-linear-gradient(45deg, rgba(255,210,63,.35) 0 20px, rgba(255,210,63,.15) 20px 40px)', borderLeft: `4px solid ${OURO}`}} />
      <div style={{position: 'absolute', left: 1920 * 0.4 - 500 * k, width: 500 * k, top: 560, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: '#fff'}}>ZONA ENTRE MARÉS</div>
      <Tit t={titulo} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Areia: React.FC = () => <Faixa titulo="A FAIXA QUE APARECIA E SUMIA" />;
const Caranguejo: React.FC = () => <Clip src="semlua/r314737.mp4" etq="IMAGEM REAL · ILUSTRATIVA" t="CARANGUEJOS, MEXILHÕES, ESTRELAS-DO-MAR" />;
const Encolhe: React.FC = () => <Faixa p={0.33} titulo="ENCOLHE PARA 1/3" />;
const Fundo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0b3a66, #031020 60%, #01060c)', overflow: 'hidden'}}>
      {Array.from({length: 70}, (_, i) => <div key={i} style={{position: 'absolute', left: random('fx' + i) * 1920, top: (random('fy' + i) * 1080 + f * (0.5 + random('fv' + i))) % 1080, width: 4, height: 4, borderRadius: 2, background: 'rgba(180,220,255,.5)'}} />)}
      <Tit t="LÁ EMBAIXO, NO FUNDO DO MAR" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Jamstec: React.FC = () => <Card topo="JAMSTEC · JAPÃO · 2018" meio="PACÍFICO PROFUNDO" rodape="A MARÉ AJUDA A MISTURAR A ÁGUA" />;
const Mistura: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1d5f8f, #0a2a4a 50%, #031424)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 6}, (_, i) => {
          const y = 380 + i * 90;
          return <path key={i} d={`M0 ${y} ${Array.from({length: 33}, (_, k) => `L${k * 60} ${y + Math.sin(k * 0.5 + f * 0.06 + i) * (30 + i * 6)}`).join(' ')}`} stroke={i < 3 ? 'rgba(255,180,100,.6)' : 'rgba(120,200,255,.6)'} strokeWidth={8} fill="none" />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 80, top: 330, fontFamily: FONTE, fontSize: 36, color: '#ffb46a'}}>ÁGUA DE CIMA</div>
      <div style={{position: 'absolute', left: 80, top: 900, fontFamily: FONTE, fontSize: 36, color: '#9ad8ff'}}>ÁGUA GELADA DE BAIXO</div>
      <Tit t="A MARÉ MISTURA O OCEANO" />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Esteira: React.FC = () => {
  const f = useCurrentFrame();
  const pr = (lo: number, la: number): [number, number] => [960 + lo * 5, 560 - la * 5];
  const d = MUNDO.map((p) => 'M' + p.map(([lo, la]) => pr(lo, la).map((v) => v.toFixed(0)).join(' ')).join(' L') + ' Z').join(' ');
  const rota = [[-30, 60], [-40, 20], [-30, -40], [20, -50], [80, -45], [150, -40], [170, 0], [-160, 30], [-120, 10], [-80, -50], [-50, -55], [-20, 0], [-30, 60]];
  const pth = 'M' + rota.map(([lo, la]) => pr(lo, la).join(' ')).join(' L');
  return (
    <AbsoluteFill style={{background: '#0b2a44'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d={d} fill="#2c4a5e" stroke="#7fa3c0" strokeWidth={1.5} />
        <path d={pth} stroke={OURO} strokeWidth={10} fill="none" strokeDasharray="30 24" strokeDashoffset={-f * 3} opacity={0.9} />
      </svg>
      <Tit t="LEVA CALOR PELO PLANETA" />
      <Etq t="MAPA REAL · CIRCULAÇÃO: ESQUEMA" />
    </AbsoluteFill>
  );
};
const Motor: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [4, 40], [60, -20], clamp);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 60%, #12182a, ${NOITE} 70%)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M560 760 A400 400 0 0 1 1360 760" stroke="rgba(255,255,255,.15)" strokeWidth={50} fill="none" />
        <path d="M560 760 A400 400 0 0 1 1360 760" stroke={CIANO} strokeWidth={50} fill="none" strokeDasharray={`${((a + 90) / 180) * 1257} 1257`} />
        <line x1={960} y1={760} x2={960 + Math.cos(((a - 90) * Math.PI) / 180) * 340} y2={760 + Math.sin(((a - 90) * Math.PI) / 180) * 340} stroke="#fff" strokeWidth={12} strokeLinecap="round" />
      </svg>
      <Tit t="O MOTOR ESCONDIDO PERDE FORÇA" s={76} />
    </AbsoluteFill>
  );
};
const Ninguem: React.FC = () => <Grande t="QUANTO?" sub="NINGUÉM SABE DIZER" cor={OURO} s={180} />;
const Respira: React.FC = () => <Clip src="semlua/r50784.mp4" ini={7} etq="IMAGEM REAL · MAR" t="PAROU DE RESPIRAR FUNDO" />;

// ---------- noite 1 ----------
const PorDoSol: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const y = interpolate(f, [0, d], [560, 820], clamp);
  const k = interpolate(f, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, rgb(${30 - k * 26},${40 - k * 34},${90 - k * 78}), rgb(${220 - k * 200},${110 - k * 100},${60 - k * 50}))`}}>
      <div style={{position: 'absolute', left: 860, top: y - 100, width: 200, height: 200, borderRadius: 100, background: '#ffb347', boxShadow: '0 0 120px #ff8a3a'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 800, bottom: 0, background: '#07080c'}} />
      <Tit t="O SOL SE PÕE" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Paisagem: React.FC<{luz: number; titulo: string; sub?: string}> = ({luz, titulo, sub}) => (
  <Ceu n={luz > 0.5 ? 60 : 260} cor={`linear-gradient(180deg, rgb(${8 + 30 * luz},${12 + 40 * luz},${30 + 70 * luz}), #020308)`}>
    {luz > 0.5 && <Disco x={1640} y={420} r={70} />}
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <path d="M0 760 Q300 680 640 740 T1280 720 T1920 750 L1920 1080 L0 1080 Z" fill={`rgb(${10 + 40 * luz},${14 + 46 * luz},${18 + 50 * luz})`} />
      <path d="M860 1080 Q930 900 960 760" stroke={`rgba(220,210,180,${0.05 + 0.5 * luz})`} strokeWidth={60} fill="none" />
      <circle cx={600} cy={700} r={30} fill={`rgba(200,190,170,${0.03 + 0.6 * luz})`} />
      <rect x={576} y={730} width={48} height={110} rx={20} fill={`rgba(200,190,170,${0.03 + 0.6 * luz})`} />
    </svg>
    <Tit t={titulo} />
    {sub && <Sub y={250}>{sub}</Sub>}
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const LuaCheia: React.FC = () => <Paisagem luz={1} titulo="A LUZ DA LUA CHEIA" sub="DÁ PRA VER O CAMINHO E O ROSTO DE QUEM ESTÁ DO LADO" />;
const Suficiente: React.FC = () => <Clip src="semlua/r50784.mp4" ini={3} etq="IMAGEM REAL · LUA SOBRE O MAR" t="FRACA, MAS SUFICIENTE" />;
const SoEstrelas: React.FC = () => <Clip src="semlua/r31569.mp4" ini={4} etq="IMAGEM REAL · SÓ ESTRELAS" t="SOBRAM SÓ AS ESTRELAS" />;
const Lux: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [2, 20], [0, 1], clamp), b = interpolate(f, [16, 30], [0, 0.02], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <Barra x={300} y={440} w={1100} h={80} p={a} cor={LUA} rot="LUA CHEIA" val="≈ 0,25 LUX" />
      <Barra x={300} y={680} w={1100} h={80} p={b} cor={CIANO} rot="SÓ ESTRELAS" val="≈ 0,002 LUX OU MENOS" />
      <Tit t="DEZENAS A MILHARES DE VEZES MAIS ESCURO" s={64} />
      <Etq t="VALORES APROXIMADOS" />
    </AbsoluteFill>
  );
};
const PraSempre: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <div style={{position: 'absolute', left: 310, top: 330, width: 1300, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 22}}>
        {Array.from({length: 30}, (_, i) => {
          const s = spring({frame: f - i * 0.8, fps: FPS, config: {damping: 14}});
          return <div key={i} style={{height: 108, borderRadius: '50%', background: '#121622', border: '2px solid rgba(255,255,255,.15)', opacity: s, transform: `scale(${s})`}} />;
        })}
      </div>
      <Tit t="TODA NOITE É LUA NOVA" />
      <Sub y={830} s={50} cor={OURO}>PRA SEMPRE</Sub>
    </AbsoluteFill>
  );
};
const DeDia: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a90d0, #a8d4f4)'}}>
      <Disco x={1300} y={330} r={80} o={interpolate(f, [10, 50], [0.6, 0], clamp)} brilho={false} />
      <Contorno x={1300} y={330} r={80} o={interpolate(f, [30, 50], [0, 0.8], clamp)} />
      <Tit t="A LUA DE DIA, PÁLIDA" cor="#0b2a44" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Laranja: React.FC = () => <Clip src="semlua/r128118.mp4" ini={3} etq="IMAGEM REAL · LUA NASCENDO" t="ENORME E LARANJA NO HORIZONTE" />;
const Vazio: React.FC = () => (
  <Ceu>
    <div style={{position: 'absolute', left: 160, top: 700, width: 160, height: 160, borderRadius: 80, background: '#ffb347', boxShadow: '0 0 100px #ff8a3a'}} />
    <Contorno x={1400} y={360} r={110} />
    <Tit t="ACABOU." s={120} />
    <Sub y={290}>O SOL, AS ESTRELAS… E UM VAZIO</Sub>
  </Ceu>
);
const Osso: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2014, #080604 70%)'}}>
      <div style={{position: 'absolute', left: 360, top: 470, width: 1200, height: 140, borderRadius: 70, background: 'linear-gradient(180deg, #e8dcc0, #b8a888)'}} />
      {Array.from({length: 29}, (_, i) => <div key={i} style={{position: 'absolute', left: 420 + i * 38, top: 470, width: 6, height: i % 7 ? 60 : 100, background: '#5a4a32', opacity: f > i * 1.2 ? 1 : 0}} />)}
      <Tit t="O TEMPO CONTADO PELA LUA" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Fases: React.FC = () => <Clip src="semlua/sv_fases.mp4" etq="VISUALIZAÇÃO NASA · DADOS DO LRO" t="29,5 DIAS" z={[1, 1.05]} />;
const Calendario: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #121a2c, ${NOITE} 70%)`}}>
      {Array.from({length: 12}, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2 + f * 0.004;
        const x = 960 + Math.cos(a) * 320, y = 600 + Math.sin(a) * 320;
        const k = i / 12;
        return <div key={i} style={{position: 'absolute', left: x - 40, top: y - 40, width: 80, height: 80, borderRadius: '50%',
          background: `linear-gradient(90deg, ${LUA} ${k * 100}%, #1a1e2a ${k * 100}%)`, boxShadow: '0 0 10px rgba(255,255,255,.2)'}} />;
      })}
      <Tit t="O CALENDÁRIO DE MUITOS POVOS" s={76} />
    </AbsoluteFill>
  );
};
const Parou: React.FC = () => (
  <AbsoluteFill style={{background: NOITE}}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <circle cx={960} cy={600} r={260} fill="#0e1626" stroke="#cfd8e8" strokeWidth={10} />
      <line x1={960} y1={600} x2={960} y2={380} stroke={OURO} strokeWidth={10} strokeLinecap="round" />
      <line x1={960} y1={600} x2={1110} y2={600} stroke={OURO} strokeWidth={10} strokeLinecap="round" />
      <Contorno x={960} y={600} r={290} />
    </svg>
    <Tit t="O RELÓGIO MAIS ANTIGO PAROU" s={76} />
  </AbsoluteFill>
);

// ---------- semanas: corais ----------
const Coral1: React.FC = () => <Clip src="semlua/r263235.mp4" etq="IMAGEM REAL · RECIFE DE CORAL" t="QUEM MAIS VAI SENTIR FALTA" />;
const Coral2: React.FC = () => <Clip src="semlua/r263244.mp4" etq="IMAGEM REAL · RECIFE DE CORAL" t="UMA VEZ POR ANO" />;
const NoiteCerta: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
    <div style={{position: 'absolute', left: 560, top: 330, width: 500, height: 540, borderRadius: 30, background: '#f4f1ea', overflow: 'hidden'}}>
      <div style={{height: 150, background: '#1d6f99', color: '#fff', fontFamily: FONTE, fontSize: 70, textAlign: 'center', lineHeight: '150px'}}>1 NOITE</div>
      <div style={{fontFamily: FONTE, fontSize: 200, color: '#1a1a1a', textAlign: 'center', lineHeight: '380px'}}>?</div>
    </div>
    <Disco x={1300} y={590} r={110} />
    <Tit t="NOITE CERTA, FASE CERTA DA LUA" s={76} />
  </AbsoluteFill>
);
const Desova: React.FC<{n: number; titulo: string}> = ({n, titulo}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #06182c, #0a2a40 60%, #1a2a2a)', overflow: 'hidden'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 14}, (_, i) => <ellipse key={i} cx={80 + i * 140} cy={1010 + (i % 3) * 20} rx={90} ry={50} fill={i % 2 ? '#7a4a5a' : '#8a6a3a'} />)}
      </svg>
      {Array.from({length: n}, (_, i) => {
        const x = random('dx' + i) * 1920 + Math.sin(f / 15 + i) * 12;
        const y = 1000 - ((f * (2 + random('dv' + i) * 3) + random('dy' + i) * 900) % 1000);
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 10, height: 10, borderRadius: 5, background: '#ffb0c8', opacity: 0.85}} />;
      })}
      <Tit t={titulo} />
      <Etq t="ILUSTRAÇÃO · DESOVA DOS CORAIS" />
    </AbsoluteFill>
  );
};
const Soltam: React.FC = () => <Desova n={140} titulo="MILHÕES DE CORAIS AO MESMO TEMPO" />;
const Nevasca: React.FC = () => <Desova n={420} titulo="UMA NEVASCA DE BAIXO PRA CIMA" />;
const Janela: React.FC = () => <Grande t="10–30 MIN" sub="A JANELA DA DESOVA" cor={OURO} />;
const ComoSabem: React.FC = () => <Clip src="semlua/r263244.mp4" ini={7} etq="IMAGEM REAL · RECIFE DE CORAL" t="COMO ELES SABEM A HORA?" />;
const Arco: React.FC<{some?: boolean}> = ({some}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 44], [0, 1], clamp);
  const o = some ? interpolate(f, [10, 40], [1, 0], clamp) : 1;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M360 820 A600 420 0 0 1 1560 820" stroke="rgba(255,255,255,.2)" strokeWidth={8} fill="none" />
        <path d="M360 820 A600 420 0 0 1 1560 820" stroke={CIANO} strokeWidth={14} fill="none" strokeDasharray={`${p * 1700} 3000`} opacity={o} />
        <line x1={200} y1={820} x2={1720} y2={820} stroke="rgba(255,255,255,.4)" strokeWidth={4} />
      </svg>
      <div style={{position: 'absolute', left: 290, top: 760, width: 140, height: 70, borderRadius: '70px 70px 0 0', background: '#ffb347'}} />
      <div style={{position: 'absolute', left: 250, top: 850, fontFamily: FONTE, fontSize: 32, color: '#ffb347'}}>PÔR DO SOL</div>
      <Disco x={1560} y={790} r={50} o={o} />
      {some && <Contorno x={1560} y={790} r={50} o={1 - o} />}
      <div style={{position: 'absolute', left: 1440, top: 850, fontFamily: FONTE, fontSize: 32, color: LUA}}>NASCER DA LUA</div>
      <Tit t={some ? 'SEM A LUA, O SINAL SOME' : 'ELES MEDEM O ESCURO'} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Medem: React.FC = () => <Arco />;
const Sinal: React.FC = () => <Arco some />;
const HoraErrada: React.FC = () => {
  const f = useCurrentFrame();
  const a = (k: number, ini: number) => Array.from({length: 40}, (_, i) => {
    const t = f - ini;
    if (t < 0) return null;
    const y = 900 - t * (3 + random('h' + k + i) * 2);
    return <div key={k + '-' + i} style={{position: 'absolute', left: (k ? 1200 : 400) + (random('hx' + k + i) - 0.5) * 300, top: y, width: 10, height: 10, borderRadius: 5, background: '#ffb0c8', opacity: Math.max(0, 1 - t / 80)}} />;
  });
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #06182c, #0a2a40)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={400} cy={960} rx={180} ry={70} fill="#7a4a5a" /><ellipse cx={1200} cy={960} rx={180} ry={70} fill="#8a6a3a" />
      </svg>
      {a(0, 0)}{a(1, 50)}
      <Tit t="NA HORA ERRADA, NINGUÉM SE ENCONTRA" s={70} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Festa: React.FC = () => <Grande t="UMA NOITE QUE NUNCA MAIS CHEGA" cor={OURO} s={96} />;

// ---------- ano 1: o mito ----------
const Post: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1a24, #050508 70%)'}}>
      <div style={{position: 'absolute', left: 560, top: 230, width: 800, padding: 40, borderRadius: 28, background: '#fff', opacity: s, transform: `translateY(${(1 - s) * 60}px)`, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <div style={{width: 80, height: 80, borderRadius: 40, background: '#c0c4cc'}} />
          <div style={{fontFamily: FONTE, fontSize: 32, color: '#333'}}>CURIOSIDADES 🔥</div>
        </div>
        <div style={{marginTop: 30, fontFamily: FONTE, fontSize: 56, color: '#111', lineHeight: 1.1}}>SEM A LUA, O DIA TERIA SÓ 6 HORAS!! 😱</div>
        <div style={{marginTop: 24, fontFamily: FONTE, fontSize: 30, color: '#888'}}>♥ 2,1 MIL · ↻ 900</div>
      </div>
      <Etq t="ILUSTRAÇÃO · POST FICTÍCIO" />
    </AbsoluteFill>
  );
};
const Gira: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={90}><Terra lon={f * 9} R={300} y={600} /><Tit t="GIRANDO LOUCAMENTE?" /><Etq t="ILUSTRAÇÃO" /></Ceu>;
};
const Mito1: React.FC = () => <Carimbo alvo="DIA DE 6 HORAS" />;
const Freio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={90}>
      <div style={{position: 'absolute', left: 700 - 300, top: 600 - 200, width: 600, height: 400, borderRadius: '50%', background: 'rgba(76,201,240,.35)', transform: 'rotate(-12deg)'}} />
      <Terra x={700} y={600} R={220} />
      <Disco x={1640} y={600} r={60} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M520 300 A300 300 0 0 1 880 300" stroke={OURO} strokeWidth={10} fill="none" markerEnd="url(#s)" />
        <line x1={1560} y1={600} x2={1000} y2={540} stroke={VERMELHO} strokeWidth={8} strokeDasharray="20 12" strokeDashoffset={f * 2} />
      </svg>
      <Tit t="A LUA É UM FREIO" />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Ceu>
  );
};
const DoisMs: React.FC = () => <Grande t="≈ 2 MS" sub="MAIS LONGO A CADA SÉCULO (MILÉSIMOS DE SEGUNDO)" cor={OURO} />;
const SemFreio: React.FC = () => <Grande t="SEM FREIO" sub="O DIA SÓ PARA DE FICAR MAIS LONGO" cor={CIANO} s={170} />;
const NaoAcelera: React.FC = () => <AbsoluteFill style={{background: NOITE}}><Relogio x={960} y={560} r={260} /><Tit t="O DIA NÃO ACELERA" /></AbsoluteFill>;
const Tres: React.FC = () => (
  <AbsoluteFill style={{background: NOITE}}>
    <Relogio x={420} y={540} r={170} rot="AMANHÃ" />
    <Relogio x={960} y={540} r={170} rot="DAQUI A 1 ANO" />
    <Relogio x={1500} y={540} r={170} rot="DAQUI A 1.000 ANOS" />
  </AbsoluteFill>
);
const Mito2: React.FC = () => <Carimbo alvo="HISTÓRIA DE INTERNET" d={4} />;
const Contrario: React.FC = () => <Grande t="É O CONTRÁRIO" sub="A LUA DEIXA O DIA MAIS LONGO" cor={OURO} s={150} />;
const Guarda: React.FC = () => <Grande t="GUARDA ESSA." sub="ELA VOLTA NO FINAL" cor={CIANO} s={150} />;

// ---------- séculos: eclipse ----------
const Eclipse1: React.FC = () => <Foto src="semlua/nasa_GRC-2024-C-02640.jpg" etq="IMAGEM REAL · ECLIPSE TOTAL · 08/04/2024 · NASA" t="COISAS QUE SOMEM PRA SEMPRE" />;
const Eclipse2: React.FC = () => <Foto src="semlua/nasa_GRC-2024-C-02616.jpg" etq="IMAGEM REAL · ECLIPSE TOTAL · 08/04/2024 · NASA" t="UMA COINCIDÊNCIA ABSURDA" z={[1.1, 1.25]} />;
const Largo: React.FC = () => {
  const s = useSpring(4, {damping: 14, mass: 0.6});
  return (
    <AbsoluteFill style={{background: NOITE, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 1000, top: 540 - 1400 * s, width: 2800 * s, height: 2800 * s, borderRadius: '50%', background: 'radial-gradient(circle, #fff3c0, #ffb347 60%, #ff7a1a)'}} />
      <Disco x={300} y={600} r={7} />
      <div style={{position: 'absolute', left: 230, top: 630, fontFamily: FONTE, fontSize: 30, color: LUA}}>LUA</div>
      <Tit t="SOL: ~400× MAIS LARGO" />
      <Etq t="ILUSTRAÇÃO · ESCALA APROXIMADA" />
    </AbsoluteFill>
  );
};
const Longe: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 40], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <div style={{position: 'absolute', left: 60, top: 560, width: 40, height: 40, borderRadius: 20, background: '#3f7a56'}} />
      <Disco x={110 + 4} y={580} r={4} />
      <div style={{position: 'absolute', left: 80 + 1700 * p, top: 500, width: 160, height: 160, borderRadius: 80, background: 'radial-gradient(circle, #fff3c0, #ffb347 60%, #ff7a1a)', opacity: p}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={100} y1={700} x2={120} y2={700} stroke={CIANO} strokeWidth={6} />
        <line x1={100} y1={740} x2={100 + 1700 * p} y2={740} stroke={OURO} strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: 60, top: 770, fontFamily: FONTE, fontSize: 30, color: CIANO}}>TERRA–LUA</div>
      <div style={{position: 'absolute', left: 60 + 1500 * p, top: 770, fontFamily: FONTE, fontSize: 30, color: OURO}}>TERRA–SOL</div>
      <Tit t="E ~400× MAIS LONGE" />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const MesmoTamanho: React.FC = () => (
  <Ceu n={60} cor="linear-gradient(180deg, #2a5a8a, #8ac0e8)">
    <div style={{position: 'absolute', left: 520, top: 420, width: 220, height: 220, borderRadius: 110, background: 'radial-gradient(circle, #fff3c0, #ffb347)', boxShadow: '0 0 80px #ffd27a'}} />
    <Disco x={1290} y={530} r={110} brilho={false} />
    <div style={{position: 'absolute', left: 560, top: 680, fontFamily: FONTE, fontSize: 40, color: '#0b2a44'}}>SOL</div>
    <div style={{position: 'absolute', left: 1240, top: 680, fontFamily: FONTE, fontSize: 40, color: '#0b2a44'}}>LUA</div>
    <Tit t="NO CÉU, O MESMO TAMANHO" cor="#0b2a44" />
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const Cobre: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const x = interpolate(f, [0, d * 0.7], [1250, 960], {...clamp, easing: Easing.out(Easing.cubic)});
  const tot = interpolate(x, [960, 1000], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: `rgb(${70 - 66 * tot},${130 - 124 * tot},${190 - 178 * tot})`}}>
      <div style={{position: 'absolute', left: 960 - 160, top: 540 - 160, width: 320, height: 320, borderRadius: 160, background: 'radial-gradient(circle, #fff3c0, #ffb347)', boxShadow: `0 0 ${40 + 160 * tot}px ${tot > 0.9 ? '#fff' : '#ffd27a'}`}} />
      <div style={{position: 'absolute', left: x - 162, top: 540 - 162, width: 324, height: 324, borderRadius: 162, background: '#05060a'}} />
      <Tit t="O DIA VIRA NOITE" />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const NuncaMais: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a90d0, #a8d4f4)'}}>
    <div style={{position: 'absolute', left: 800, top: 380, width: 320, height: 320, borderRadius: 160, background: 'radial-gradient(circle, #fff3c0, #ffb347)', boxShadow: '0 0 120px #ffd27a'}} />
    <Tit t="NUNCA MAIS" cor="#0b2a44" s={110} />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Anel: React.FC = () => (
  <AbsoluteFill style={{background: '#0a0a12', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{width: 360, height: 360, borderRadius: 180, background: 'radial-gradient(circle, #05060a 62%, #ffb347 64%, #ff7a1a 72%, transparent 74%)', boxShadow: '0 0 80px rgba(255,150,60,.5)'}} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><line x1={720} y1={300} x2={1200} y2={780} stroke={VERMELHO} strokeWidth={22} strokeLinecap="round" /></svg>
    <Tit t="NENHUM ANEL DE FOGO" />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Afasta: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const x = interpolate(f, [0, d], [900, 1650], clamp);
  return (
    <Ceu n={90}>
      <Terra x={300} y={580} R={170} />
      <Disco x={x} y={580} r={interpolate(f, [0, d], [60, 40], clamp)} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><line x1={x - 120} y1={700} x2={x - 30} y2={700} stroke={OURO} strokeWidth={8} /><path d={`M${x - 30} 690 L${x - 10} 700 L${x - 30} 710 Z`} fill={OURO} /></svg>
      <Tit t="ELA ESTÁ SE AFASTANDO" />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Ceu>
  );
};
const Seiscentos: React.FC = () => (
  <AbsoluteFill style={{background: '#0a0a12'}}>
    <div style={{position: 'absolute', left: 800, top: 380, width: 320, height: 320, borderRadius: 160, background: 'radial-gradient(circle, #fff3c0, #ffb347)', boxShadow: '0 0 120px #ffd27a'}} />
    <div style={{position: 'absolute', left: 840, top: 420, width: 240, height: 240, borderRadius: 120, background: '#05060a'}} />
    <Tit t="~600 MILHÕES DE ANOS" cor={OURO} />
    <Sub y={760} s={44}>PEQUENA DEMAIS PRA COBRIR O SOL INTEIRO</Sub>
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);

// ---------- milhões de anos: o eixo ----------
const Eixo: React.FC<{incl: number | ((f: number) => number); titulo: string; rot?: string; sub?: string; s?: number}> = ({incl, titulo, rot, sub, s}) => {
  const f = useCurrentFrame();
  const a = typeof incl === 'number' ? incl : incl(f);
  return (
    <Ceu n={110}>
      <Terra x={960} y={600} R={260} incl={a} eixo />
      <div style={{position: 'absolute', left: 1320, top: 520, fontFamily: FONTE, fontSize: 90, color: OURO, fontVariantNumeric: 'tabular-nums'}}>{Math.round(Math.abs(a))}°</div>
      {rot && <div style={{position: 'absolute', left: 120, top: 880, padding: '10px 24px', borderRadius: 14, background: 'rgba(0,0,0,.6)', border: `3px solid ${CIANO}`, fontFamily: FONTE, fontSize: 40, color: CIANO}}>{rot}</div>}
      <Tit t={titulo} s={s} />
      {sub && <Sub y={240}>{sub}</Sub>}
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const DePe: React.FC = () => <Eixo incl={23} titulo="A LUA SEGURA A TERRA DE PÉ?" />;
const Hoje23: React.FC = () => <Eixo incl={23} titulo="HOJE: ~23° DE INCLINAÇÃO" />;
const Estacoes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={80}>
      <div style={{position: 'absolute', left: 880, top: 460, width: 160, height: 160, borderRadius: 80, background: 'radial-gradient(circle, #fff3c0, #ffb347)', boxShadow: '0 0 80px #ffd27a'}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><ellipse cx={960} cy={540} rx={640} ry={260} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={3} /></svg>
      <Terra x={960 - 640} y={540} R={70} incl={23} eixo />
      <Terra x={960 + 640} y={540} R={70} incl={23} eixo />
      <div style={{position: 'absolute', left: 230, top: 660, fontFamily: FONTE, fontSize: 36, color: CIANO}}>INVERNO</div>
      <div style={{position: 'absolute', left: 1530, top: 660, fontFamily: FONTE, fontSize: 36, color: OURO}}>VERÃO</div>
      <Tit t="A INCLINAÇÃO CRIA AS ESTAÇÕES" s={76} />
      <Etq t="ILUSTRAÇÃO · NO HEMISFÉRIO NORTE" />
      {f < 0 && null}
    </Ceu>
  );
};
const Laskar: React.FC = () => <Card topo="NATURE · 1993" meio="LASKAR E EQUIPE" rodape="SEM A LUA, O EIXO PODIA VIRAR UM CAOS" cor={VERMELHO} />;
const Calculou: React.FC = () => <Eixo incl={(f) => 23 + 20 * Math.sin(f * 0.06)} titulo="SEM A LUA, UM CAOS?" rot="LASKAR, 1993 (0°–85°)" />;
const Caos: React.FC = () => <Eixo incl={(f) => 42 + 40 * Math.sin(f * 0.05) * Math.cos(f * 0.021)} titulo="DE QUASE 0° ATÉ 85°" rot="LASKAR, 1993 (0°–85°)" />;
const Deitado: React.FC = () => {
  const f = useCurrentFrame();
  return <Eixo incl={interpolate(f, [0, 40], [40, 85], clamp)} titulo="UM PLANETA PRATICAMENTE DEITADO" rot="LASKAR, 1993 (0°–85°)" s={76} />;
};
const Lissauer: React.FC = () => <Card topo="ICARUS · 2011" meio="LISSAUER E EQUIPE" rodape="REFIZERAM AS CONTAS POR BILHÕES DE ANOS" cor={VERDE} />;
const Balanca: React.FC = () => <Eixo incl={(f) => 22.5 + 4 * Math.sin(f * 0.09)} titulo="O EIXO BALANÇA MAIS, SIM" rot="LISSAUER, 2011 (20°–25°)" />;
const Estavel: React.FC = () => <Eixo incl={(f) => 22.5 + 2.5 * Math.sin(f * 0.07)} titulo="BALANÇA MAIS, MAS FICA ENTRE 20° E 25°" rot="LISSAUER, 2011 (20°–25°)" s={70} />;
const NaoPrecisa: React.FC = () => <Card topo="LISSAUER, 2011" meio="“UMA LUA GRANDE NÃO PARECE NECESSÁRIA”" cor={VERDE} />;
const Clima: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={60}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}, (_, i) => <line key={i} x1={1900} y1={300 + i * 80} x2={1300} y2={300 + i * 80} stroke="rgba(255,210,63,.6)" strokeWidth={6} strokeDasharray="30 20" strokeDashoffset={f * 4} />)}
      </svg>
      <Terra x={900} y={560} R={280} incl={interpolate(f, [0, 60], [23, 60], clamp)} eixo />
      <Tit t="MUDA ONDE O SOL BATE MAIS FORTE" s={76} />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const QuemCerto: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      {[['LASKAR, 1993', '0°–85°', VERMELHO, 300], ['LISSAUER, 2011', '20°–25°', VERDE, 1060]].map(([a, b, c, x]) => (
        <div key={String(a)} style={{position: 'absolute', left: Number(x), top: 360, width: 560, padding: '50px 0', borderRadius: 26, border: `4px solid ${c}`, background: 'rgba(8,14,30,.9)', textAlign: 'center', fontFamily: FONTE, opacity: s}}>
          <div style={{fontSize: 40, color: String(c)}}>{a}</div><div style={{fontSize: 110, color: '#fff', marginTop: 20}}>{b}</div>
        </div>
      ))}
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 120, color: OURO}}>?</div>
      <Tit t="AINDA NÃO EXISTE CONSENSO" />
    </AbsoluteFill>
  );
};
const Escala: React.FC = () => <Grande t="MILHÕES DE ANOS" sub="NÃO DIAS" cor={OURO} s={160} />;

// ---------- mas espera ----------
const Espera: React.FC = () => <Clip src="semlua/r128118.mp4" ini={6} etq="IMAGEM REAL · LUA" t="MAS ESPERA. OLHA PRO CÉU DE NOVO." />;
const EstaLa: React.FC = () => <Clip src="semlua/r7093.mp4" ini={2} etq="IMAGEM REAL · LUA" t="ELA ESTÁ LÁ." z={[1.1, 1.35]} />;
const NaoSumiu: React.FC = () => <Clip src="semlua/sv_fases.mp4" ini={6} etq="VISUALIZAÇÃO NASA · DADOS DO LRO" t="A LUA NÃO SUMIU" z={[1, 1.05]} />;
const Cm: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 40], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 360, top: 560, width: 1200, height: 90, background: '#e8d080', borderRadius: 8}}>
        {Array.from({length: 41}, (_, i) => <div key={i} style={{position: 'absolute', left: 20 + i * 29, top: 0, width: 3, height: i % 10 ? 30 : 60, background: '#3a2a10'}} />)}
      </div>
      <div style={{position: 'absolute', left: 380, top: 690, width: 1100 * p * 0.38 * 2.6, height: 16, borderRadius: 8, background: CIANO}} />
      <Tit t="3,8 CM POR ANO" cor={OURO} s={110} />
      <Etq t="NASA · VALOR MÉDIO" />
    </AbsoluteFill>
  );
};
const Unha: React.FC = () => {
  const f = useCurrentFrame();
  const g = interpolate(f, [0, 60], [0, 40], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2018, #080604 70%)'}}>
      <div style={{position: 'absolute', left: 700, top: 360, width: 520, height: 900, borderRadius: 220, background: '#d9a684'}} />
      <div style={{position: 'absolute', left: 800, top: 420 - g, width: 320, height: 300 + g, borderRadius: '150px 150px 60px 60px', background: '#f4d8c8', border: '4px solid #c98a6a'}} />
      <Tit t="A VELOCIDADE DA SUA UNHA" />
      <Sub y={250}>A COMPARAÇÃO É DA NASA</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Lento: React.FC = () => <Afasta />;
const Grafico: React.FC<{ate?: number}> = ({ate = 1}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 50], [0, ate], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const x0 = 260, x1 = 1660, y18 = 840, y24 = 360;
  const pts = Array.from({length: 60}, (_, i) => { const k = (i / 59) * p; return `${x0 + (x1 - x0) * k},${y18 - (y18 - y24) * Math.pow(k, 0.9)}`; }).join(' ');
  const h = 18 + 6 * Math.pow(p, 0.9);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={x0} y1={y18 + 40} x2={x1 + 40} y2={y18 + 40} stroke="rgba(255,255,255,.3)" strokeWidth={4} />
        <line x1={x0} y1={y24} x2={x1} y2={y24} stroke="rgba(255,210,63,.3)" strokeWidth={3} strokeDasharray="14 10" />
        <polyline points={pts} fill="none" stroke={OURO} strokeWidth={10} />
      </svg>
      <div style={{position: 'absolute', left: x0 - 60, top: y18 + 60, fontFamily: FONTE, fontSize: 32, color: '#9aa8c2'}}>HÁ 1,4 BILHÃO DE ANOS</div>
      <div style={{position: 'absolute', left: x1 - 60, top: y18 + 60, fontFamily: FONTE, fontSize: 32, color: '#9aa8c2'}}>HOJE</div>
      <div style={{position: 'absolute', left: x0 + (x1 - x0) * p - 80, top: y18 - (y18 - y24) * Math.pow(p, 0.9) - 110, fontFamily: FONTE, fontSize: 70, color: '#fff'}}>{h.toFixed(0)} H</div>
      <Tit t="18 H → 24 H" cor={OURO} s={110} />
      <Etq t="DURAÇÃO DO DIA · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Bilhao: React.FC = () => <Grafico ate={0.5} />;
const Esticou: React.FC = () => <Grafico />;
const Lista: React.FC = () => {
  const f = useCurrentFrame();
  const it = ['AS MARÉS', 'AS NOITES CLARAS', 'OS CORAIS', 'OS ECLIPSES', 'O TAMANHO DO SEU DIA'];
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #121a2c, ${NOITE} 70%)`}}>
      {it.map((t, i) => {
        const s = spring({frame: f - i * 14, fps: FPS, config: {damping: 12}});
        return <div key={t} style={{position: 'absolute', left: 0, right: 0, top: 200 + i * 130, textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: i === 4 ? OURO : '#fff', opacity: s, transform: `translateY(${(1 - s) * 40}px)`}}>{t}</div>;
      })}
    </AbsoluteFill>
  );
};
const Pedra: React.FC = () => <Foto src="semlua/nasa_art002e021278.jpg" etq="IMAGEM REAL · A TERRA VISTA DA ORION (ARTEMIS II) · NASA" t="ELA MOLDOU O MUNDO ONDE VOCÊ VIVE" />;
const Volta: React.FC = () => <Foto src="semlua/nasa_art002e021278.jpg" etq="IMAGEM REAL · A TERRA VISTA DA ORION (ARTEMIS II) · NASA" t="E A GENTE ESTÁ VOLTANDO PRA LÁ" z={[1.25, 1.4]} pos="top" />;
const Voltando: React.FC = () => <Foto src="semlua/nasa_SLS_MAF_20260401_ArtemisIILaunch_05.jpg" etq="IMAGEM REAL · LANÇAMENTO DA ARTEMIS II · 01/04/2026 · NASA" t="4 ASTRONAUTAS. A VOLTA NA LUA." />;
const Cinquenta: React.FC = () => <Grande t="1972 → 2026" sub="A PRIMEIRA VEZ EM MAIS DE 50 ANOS" cor={OURO} s={170} />;
const Olha: React.FC = () => <Clip src="semlua/r128118.mp4" ini={9} etq="IMAGEM REAL · LUA" t="HOJE À NOITE, OLHA PRA CIMA." z={[1.0, 1.2]} />;

const Fim: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <Disco x={960} y={420} r={90} o={s} />
      <div style={{position: 'absolute', top: 600, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena (capítulo pela ordem) ----------
const PLANO: [string, React.FC][][] = [
  [['voce olha pro ceu hoje', Some], ['e a lua nao esta la', NaoEsta], ['nao esta atras de uma nuvem', Nuvem], ['nao e lua nova', LuaNova], ['ela simplesmente sumiu', Sumiu],
    ['isso nunca vai acontecer', Imagina], ['porque o que vem depois', Nasce], ['a trezentos e oitenta', Distancia], ['algumas coisas mudam', Linha], ['e uma das coisas que todo mundo jura', Mentira]],
  [['a primeira coisa que muda', Mar], ['duas vezes por dia', Mares], ['quem puxa essa agua', Puxa], ['o sol tambem puxa', SolPuxa], ['sem a lua sobra so o sol', SoSol],
    ['e as mares ficam com cerca', Regua], ['voce vai a praia', Praia], ['a mare sobe um pouco', Lama], ['a faixa de areia e pedra', Areia], ['onde vivem caranguejos', Caranguejo],
    ['encolhe para um terco', Encolhe], ['e la embaixo no fundo do mar', Fundo], ['cientistas japoneses mostraram', Jamstec], ['ela ajuda a misturar', Mistura],
    ['e essa mistura faz parte', Esteira], ['com menos mare', Motor], ['quanto ninguem sabe', Ninguem], ['o oceano continua la', Respira]],
  [['ai o sol se poe', PorDoSol], ['uma lua cheia ilumina', LuaCheia], ['mas suficiente pra voce', Suficiente], ['sem ela longe das luzes', SoEstrelas], ['e isso e de dezenas', Lux], ['toda noite vira noite', PraSempre],
    ['e nao e so a noite', DeDia], ['ou da lua cheia nascendo', Laranja], ['acabou o ceu agora', Vazio], ['por milhares de anos', Osso], ['as fases dela', Fases],
    ['foram o calendario', Calendario], ['hoje voce olha pra cima', Parou]],
  [['mas quem mais vai sentir', Coral1], ['nos recifes de coral', Coral2], ['numa noite certa', NoiteCerta], ['milhoes de corais soltam', Soltam], ['o mar vira uma nevasca', Nevasca],
    ['e essa sincronia', Janela], ['como os corais sabem', ComoSabem], ['eles medem o tempo', Medem], ['sem a lua esse sinal', Sinal], ['e um coral que solta', HoraErrada],
    ['e uma festa marcada', Festa]],
  [['agora voce provavelmente', Post], ['a terra ia comecar a girar', Gira], ['nao e bem assim', Mito1], ['a lua funciona como um freio', Freio], ['quanto uns dois milesimos', DoisMs],
    ['tirar a lua e tirar', SemFreio], ['mas o dia nao acelera', NaoAcelera], ['amanha o seu dia', Tres], ['o dia de seis horas e historia', Mito2], ['e tem mais a lua nao deixa', Contrario], ['guarda essa informacao', Guarda]],
  [['mas tem coisas que somem', Eclipse1], ['um eclipse solar total so existe', Eclipse2], ['o sol e cerca de quatrocentas', Largo], ['mas tambem esta cerca', Longe],
    ['por isso no ceu', MesmoTamanho], ['e de vez em quando', Cobre], ['sem a lua nunca mais', NuncaMais], ['nenhum anel de fogo', Anel], ['e aqui vai uma coisa curiosa', Afasta],
    ['daqui a uns seiscentos', Seiscentos]],
  [['e ai vem a pergunta', DePe], ['hoje a terra e inclinada', Hoje23], ['e essa inclinacao que cria', Estacoes], ['em 1993 um estudo', Laskar], ['calculou que sem a lua', Calculou], ['variando de quase zero', Caos],
    ['um planeta praticamente deitado', Deitado], ['mas em 2011 outra equipe', Lissauer], ['sem a lua o eixo balanca', Balanca], ['mas costuma ficar entre', Estavel], ['pra eles uma lua grande', NaoPrecisa],
    ['e por que isso importa', Clima], ['quem esta certo', QuemCerto], ['mas os dois estudos', Escala]],
  [['mas espera olha pro ceu', Espera], ['ela esta la', EstaLa], ['a lua nao sumiu', NaoSumiu], ['tres virgula oito', Cm], ['mais ou menos a velocidade', Unha],
    ['e esse afastamento lento', Lento], ['ha um bilhao e quatrocentos', Bilhao], ['foi a lua puxando', Esticou], ['as mares as noites claras', Lista], ['aquela bola de pedra', Pedra],
    ['e a gente esta voltando', Volta], ['em abril de 2026', Voltando], ['a primeira vez em mais', Cinquenta], ['e ela ainda esta ali', Olha]],
];
const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'semlua/narracao.mp3', musica: 'semlua/musica.mp3', volta: 7, fim: Fim,
  selos: [{texto: 'HIPÓTESES', de: 'em 1993 um estudo', ate: 'mas espera olha pro ceu'}],
  hits: [{frase: 'nao e bem assim', off: 10, vol: 0.5}, {frase: 'o dia de seis horas e historia', off: 4}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail ----------
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <OffthreadVideo src={staticFile('semlua/r50784.mp4')} startFrom={60} muted style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(.7) contrast(1.25)'}} />
    <AbsoluteFill style={{background: '#1d4fb8', mixBlendMode: 'multiply'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #030a24 0%, #071a4a 30%, rgba(7,26,74,0) 34%)'}} />
    {Array.from({length: 140}, (_, i) => (
      <div key={i} style={{position: 'absolute', left: random('tx' + i) * 1920, top: random('ty' + i) * 330, width: 2 + random('ts' + i) * 4, height: 2 + random('ts' + i) * 4, borderRadius: 3, background: '#fff', opacity: 0.4 + 0.6 * random('to' + i)}} />
    ))}
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.7), transparent 55%)'}} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="h"><stop offset="0.6" stopColor="rgba(150,200,255,0)" /><stop offset="1" stopColor="rgba(150,200,255,.35)" /></radialGradient></defs>
      <circle cx={1420} cy={250} r={240} fill="url(#h)" />
      <circle cx={1420} cy={250} r={200} fill="rgba(255,255,255,.03)" stroke="#fff" strokeWidth={10} strokeDasharray="30 22" />
    </svg>
    <div style={{position: 'absolute', left: 90, top: 330, fontFamily: FONTE, fontSize: 210, lineHeight: 0.95, color: '#fff', textShadow: '0 10px 40px #000', letterSpacing: -4}}>CADÊ<br /><span style={{color: OURO}}>A LUA?</span></div>
    <div style={{position: 'absolute', left: 96, top: 150, padding: '10px 24px', borderRadius: 14, background: 'rgba(0,0,0,.6)', border: `3px solid ${OURO}`, fontFamily: FONTE, fontSize: 48, color: OURO}}>HORA 1</div>
  </AbsoluteFill>
);

// ---------- thumbnails mais apelativas (A: a Lua se desfazendo · B: céu vazio com seta) ----------
const Estrelas: React.FC<{n?: number; h?: number}> = ({n = 180, h = 1080}) => (
  <>{Array.from({length: n}, (_, i) => (
    <div key={i} style={{position: 'absolute', left: random('qx' + i) * 1920, top: random('qy' + i) * h, width: 2 + random('qs' + i) * 4, height: 2 + random('qs' + i) * 4, borderRadius: 3, background: '#fff', opacity: 0.35 + 0.65 * random('qo' + i)}} />
  ))}</>
);
const TextoThumb: React.FC<{l1: string; l2: string; x?: number; y?: number; s?: number}> = ({l1, l2, x = 80, y = 250, s = 230}) => (
  <div style={{position: 'absolute', left: x, top: y, fontFamily: FONTE, fontSize: s, lineHeight: 0.92, letterSpacing: -6, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
    <div style={{color: '#fff'}}>{l1}</div><div style={{color: OURO}}>{l2}</div>
  </div>
);
const Selo1: React.FC = () => (
  <div style={{position: 'absolute', left: 92, top: 110, padding: '12px 30px', borderRadius: 16, background: VERMELHO, fontFamily: FONTE, fontSize: 56, color: '#fff', letterSpacing: 3, transform: 'rotate(-3deg)', boxShadow: '0 10px 30px rgba(0,0,0,.6)'}}>HORA 1</div>
);
export const ThumbA: React.FC = () => {
  const R = 470, cx = 1330, cy = 540, N = 26, img = staticFile('semlua/nasa_GSFC_20171208_Archive_e000868.jpg');
  const E = (2 * R) / 0.846;  // o disco ocupa 84,8% da foto (margem preta em volta)
  const sz = (2 * R) / N;
  const tiles: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const tx = (i + 0.5) / N, ty = (j + 0.5) / N;
    const dx = tx * 2 - 1, dy = ty * 2 - 1;
    if (dx * dx + dy * dy > 0.8 || tx < 0.5) continue;
    const k = (tx - 0.5) / 0.5;
    if (random('r' + i + '-' + j) < 0.25 + k * 0.35) continue;
    const off = 40 + k * k * (260 + random('d' + i + j) * 420);
    tiles.push(<div key={i + '-' + j} style={{position: 'absolute', left: cx - R + i * sz + off, top: cy - R + j * sz + (random('v' + i + j) - 0.5) * off * 0.7, width: sz, height: sz, borderRadius: 3,
      backgroundImage: `url(${img})`, backgroundSize: `${E}px ${E}px`, backgroundPosition: `${-(i * sz) - (E - 2 * R) / 2}px ${-(j * sz) - (E - 2 * R) / 2}px`,
      opacity: 1 - k * 0.6, transform: `rotate(${(random('a' + i + j) - 0.5) * 70 * k}deg) scale(${1 - k * 0.4})`, boxShadow: '0 0 8px rgba(0,0,0,.6)'}} />);
  }
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 50%, #15306e, #03050f 65%)', overflow: 'hidden'}}>
      <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
      <Estrelas />
      <div style={{position: 'absolute', left: cx - R - 80, top: cy - R - 80, width: 2 * R + 160, height: 2 * R + 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,250,230,.3), transparent 68%)'}} />
      <Img src={img} style={{position: 'absolute', left: cx - E / 2, top: cy - E / 2, width: E, height: E, clipPath: `circle(${R}px at 50% 50%)`,
        WebkitMaskImage: 'linear-gradient(90deg, #000 52%, transparent 62%)', maskImage: 'linear-gradient(90deg, #000 52%, transparent 62%)'}} />
      {tiles}
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(3,5,15,.85) 0%, rgba(3,5,15,.35) 40%, transparent 55%)'}} />
      <TextoThumb l1="A LUA" l2="SUMIU" y={300} s={250} />
      <Selo1 />
    </AbsoluteFill>
  );
};
export const ThumbB: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <OffthreadVideo src={staticFile('semlua/r50784.mp4')} startFrom={60} muted style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(.8) contrast(1.3)'}} />
    <AbsoluteFill style={{background: '#2457d6', mixBlendMode: 'multiply'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #030a24 0%, #0a2366 30%, rgba(10,35,102,0) 34%)'}} />
    <Estrelas n={160} h={330} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="hb"><stop offset="0.55" stopColor="rgba(120,220,255,0)" /><stop offset="1" stopColor="rgba(120,220,255,.55)" /></radialGradient></defs>
      <circle cx={1430} cy={330} r={290} fill="url(#hb)" />
      <circle cx={1430} cy={330} r={230} fill="rgba(0,0,0,.25)" stroke="#fff" strokeWidth={14} strokeDasharray="36 26" />
      <text x={1430} y={430} textAnchor="middle" fontFamily={FONTE} fontSize={300} fill={VERMELHO} stroke="#000" strokeWidth={10} paintOrder="stroke">?</text>
      <path d="M930 700 Q1080 640 1170 520" stroke={VERMELHO} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M1130 470 L1215 480 L1185 565 Z" fill={VERMELHO} />
    </svg>
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.65), transparent 50%)'}} />
    <TextoThumb l1="CADÊ" l2="A LUA?" y={330} s={240} />
    <Selo1 />
  </AbsoluteFill>
);
