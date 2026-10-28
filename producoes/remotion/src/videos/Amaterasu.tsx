// Short "Uma partícula de ORIGEM desconhecida atingiu a Terra" (raio cósmico Amaterasu, Telescope Array, 2021). Roteiro do Roteirista (lote radiação #3, v2), aprovado pelo dono em 28/10.
// Entrega direta na versão final. Estratégia de 28/10: chuva de partículas sobre o deserto no 1º quadro, cortes de até 2 s nos primeiros 10 s.
// Hipóteses (campos magnéticos, física nova) sempre com selo HIPÓTESE. Deserto: imagem real de satélite (Canyonlands, Utah, NASA).
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, FPS} from '../comum';
import palavras from './amaterasu.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'uma particula acertou', 'vinda da direcao do nada', 'e os cientistas', 'maio de 2021', 'utah nos estados', 'ela bateu na atmosfera', 'energia dezenas de milhoes',
  'a de qualquer acelerador', 'a chuva que ela', 'vinte e tres detectores', 'espalhados por quase', 'os cientistas deram', 'a deusa do sol', 'e a segunda',
  'mas o assustador', 'e de onde ela veio', 'o caminho dela', 'um dos cientistas', 'talvez campos magneticos', 'talvez seja fisica', 'ela nao e ameaca', 'o que assusta',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas o assustador');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const Estrelas: React.FC<{n?: number}> = ({n = 140}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => <circle key={i} cx={random('ex' + i) * 1080} cy={random('ey' + i) * 1920} r={0.8 + random('er' + i) * 2.2} fill="#fff" opacity={0.3 + random('eo' + i) * 0.6} />)}
  </svg>
);
// chuva de partículas: o primário cai até `yTopo` e se ramifica em cascata até o chão
const Chuva: React.FC<{em?: number; yTopo?: number; chao?: number; forca?: number}> = ({em = 0, yTopo = 620, chao = 1500, forca = 1}) => {
  const f = useCurrentFrame() - em;
  if (f < 0) return null;
  const queda = interpolate(f, [0, 6], [0, 1], clamp);
  const p = interpolate(f, [5, 30], [0, 1], {...clamp, easing: Easing.out(Easing.quad)});
  const linhas = Array.from({length: 70}, (_, i) => {
    const ang = (random('ca' + i) - 0.5) * 1.1, comp = (chao - yTopo) * (0.6 + random('cl' + i) * 0.45);
    return {x2: 540 + Math.sin(ang) * comp * p, y2: yTopo + Math.cos(ang) * comp * p, o: 0.35 + random('co' + i) * 0.6, c: i % 3 ? CIANO : '#e8f4ff'};
  });
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 8px #4cc9f0)'}}>
      <line x1={540} y1={-40} x2={540} y2={-40 + (yTopo + 40) * queda} stroke="#fff" strokeWidth={8 * forca} />
      <circle cx={540} cy={-40 + (yTopo + 40) * queda} r={16 * forca} fill="#fff" />
      {p > 0 && linhas.map((l, i) => <line key={i} x1={540} y1={yTopo} x2={l.x2} y2={l.y2} stroke={l.c} strokeWidth={2.5} opacity={l.o * forca} />)}
      {p > 0.9 && Array.from({length: 26}, (_, i) => <circle key={'d' + i} cx={540 + (random('dx' + i) - 0.5) * 900} cy={chao + (random('dy' + i) - 0.5) * 60} r={6} fill="#fff" opacity={interpolate(f, [28, 34, 50], [0, 1, 0.4], clamp)} />)}
    </svg>
  );
};
const Deserto: React.FC<{z?: [number, number]; children?: React.ReactNode; etq?: string}> = ({z = [1.1, 1.2], children, etq = 'IMAGEM REAL · DESERTO DE UTAH VISTO DO ESPAÇO · NASA'}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('amaterasu/utah.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(f, [0, d], z)})`, filter: 'brightness(.75)'}} />
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
        background: 'rgba(0,0,0,.55)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
// mapa do céu com a seta apontando para a região vazia (Local Void)
const Ceu: React.FC<{vazio?: number; curva?: number}> = ({vazio = 1, curva = 0}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const vx = 760, vy = 760;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 220}, (_, i) => {
        const x = random('gx' + i) * 1080, y = 380 + random('gy' + i) * 1100;
        if (Math.hypot(x - vx, y - vy) < 230 * vazio) return null;
        return <circle key={i} cx={x} cy={y} r={1 + random('gr' + i) * 3} fill={i % 7 ? '#cfd8e8' : '#ffd9a0'} opacity={0.5 + random('go' + i) * 0.5} />;
      })}
      <circle cx={vx} cy={vy} r={230} fill="none" stroke={OURO} strokeWidth={4} strokeDasharray="14 12" opacity={p} />
      <path d={`M300 1400 Q${300 + curva * 600} ${1100 - curva * 100} ${300 + (vx - 300) * p} ${1400 + (vy - 1400) * p}`} fill="none" stroke={VERMELHO} strokeWidth={9} strokeLinecap="round" />
      <circle cx={300} cy={1400} r={22} fill={CIANO} />
    </svg>
  );
};

// ---------- cenas ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Deserto z={[1.25, 1.3]} etq="IMAGEM REAL · UTAH · NASA · PARTÍCULAS: ANIMAÇÃO">
      <AbsoluteFill style={{transform: shake(f, f < 10 ? 10 : 2)}}><Chuva /></AbsoluteFill>
      <Titulo texto="UMA PARTÍCULA ATINGIU A TERRA" y={260} size={92} cor={OURO} />
    </Deserto>
  );
};
const DoNada: React.FC = () => (
  <AbsoluteFill style={{background: '#02030a'}}>
    <Ceu />
    <Titulo texto="VINDA DA DIREÇÃO DO NADA" y={260} size={96} />
    <Etiqueta texto="ANIMAÇÃO" />
  </AbsoluteFill>
);
const Cientistas: React.FC = () => {
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#02030a'}}>
      <Estrelas />
      <div style={{position: 'absolute', top: 620, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 380, color: OURO, transform: `scale(${s})`}}>?</div>
      <Titulo texto="NINGUÉM CONSEGUE EXPLICAR" y={300} size={96} />
    </AbsoluteFill>
  );
};
const Data: React.FC = () => <AbsoluteFill><Glitch texto="27/05/2021" size={170} fundo="#05060c" /><Texto y={1130} size={64} cor={OURO} delay={6}>EUA</Texto></AbsoluteFill>;
const Utah: React.FC = () => (
  <Deserto z={[1, 1.15]}>
    <Titulo texto="UTAH · EUA" y={330} size={130} cor={OURO} />
  </Deserto>
);
const Atmosfera: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#02030a'}}>
      <Estrelas />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="atm" cx="50%" cy="100%" r="80%"><stop offset=".75" stopColor="#1d4a8a" /><stop offset=".86" stopColor="#4cc9f0" stopOpacity={0.45} /><stop offset="1" stopColor="#4cc9f0" stopOpacity={0} /></radialGradient></defs>
        <ellipse cx={540} cy={2500} rx={1500} ry={1500} fill="url(#atm)" />
        <ellipse cx={540} cy={2550} rx={1380} ry={1380} fill="#0e2a4a" />
      </svg>
      <Chuva yTopo={1060} chao={1700} forca={1.2} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [5, 7, 12], [0, 0.6, 0], clamp)}} />
      <Titulo texto="BATEU NA ATMOSFERA" y={330} size={110} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Energia: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0e1a2e, #02030a 70%)'}}>
    <Titulo texto="UMA ENERGIA" y={330} size={110} />
    <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, lineHeight: 1}}>DEZENAS<br />DE MILHÕES</div>
    <Texto y={1080} size={70} cor="#fff" delay={8}>DE VEZES MAIOR</Texto>
  </AbsoluteFill>
);
const Acelerador: React.FC = () => {
  const f = useCurrentFrame();
  const g = interpolate(f, [6, 34], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#03050a'}}>
      <div style={{position: 'absolute', left: 200, bottom: 600, width: 160, height: 10, background: CIANO, borderRadius: 4}} />
      <div style={{position: 'absolute', left: 140, width: 280, bottom: 500, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: CIANO}}>MELHOR<br />ACELERADOR</div>
      <div style={{position: 'absolute', left: 660, bottom: 600, width: 220, height: 860 * g, background: `linear-gradient(${OURO}, #ff6a1f)`, borderRadius: 8, boxShadow: '0 0 60px rgba(255,180,60,.6)'}} />
      <div style={{position: 'absolute', left: 620, width: 300, bottom: 530, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: OURO}}>AMATERASU</div>
      <Titulo texto="QUE QUALQUER ACELERADOR" y={260} size={90} />
      <Etiqueta texto="ESQUEMA · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const ChuvaDeserto: React.FC = () => (
  <Deserto z={[1.15, 1.25]} etq="IMAGEM REAL · UTAH · NASA · PARTÍCULAS: ANIMAÇÃO">
    <Chuva yTopo={560} chao={1450} />
    <Titulo texto="UMA CHUVA DE PARTÍCULAS" y={260} size={96} cor={CIANO} />
  </Deserto>
);
const Detectores: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({length: 49}, (_, i) => ({x: 180 + (i % 7) * 120 + (Math.floor(i / 7) % 2) * 60, y: 700 + Math.floor(i / 7) * 120, d: Math.hypot((i % 7) - 3, Math.floor(i / 7) - 3)}));
  const acesos = [...pts].sort((a, b) => a.d - b.d).slice(0, 23);
  const n = Math.round(interpolate(f, [2, 30], [0, 23], clamp));
  return (
    <AbsoluteFill style={{background: '#0c0a08'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {pts.map((p, i) => { const k = acesos.indexOf(p); const on = k >= 0 && k < n;
          return <g key={i}><rect x={p.x - 22} y={p.y - 14} width={44} height={28} rx={4} fill={on ? OURO : '#3a3630'} />{on && <circle cx={p.x} cy={p.y} r={40} fill={OURO} opacity={0.25} />}</g>; })}
      </svg>
      <div style={{position: 'absolute', top: 1340, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, fontVariantNumeric: 'tabular-nums'}}>{n}</div>
      <Titulo texto="DETECTORES ACIONADOS" y={330} size={100} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Area: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Deserto z={[1.2, 1.1]}>
      <div style={{position: 'absolute', left: 540 - 300 * p, top: 1000 - 300 * p, width: 600 * p, height: 600 * p, border: `6px solid ${OURO}`, background: 'rgba(255,210,63,.12)'}} />
      <Contador ate={48} y={600} size={170} cor="#fff" pre="~" suf=" KM²" ini={2} dur={22} />
      <Titulo texto="DE DESERTO" y={330} size={110} />
    </Deserto>
  );
};
// arte estilizada da deusa do Sol (sem imagem de domínio público disponível agora)
const Deusa: React.FC<{sub?: boolean}> = ({sub}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 52%, #3a1206, #0a0302 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 24}, (_, i) => { const a = (i / 24) * Math.PI * 2 + f * 0.004;
          return <path key={i} d={`M540 1000 L${540 + Math.cos(a - 0.06) * 900} ${1000 + Math.sin(a - 0.06) * 900} L${540 + Math.cos(a + 0.06) * 900} ${1000 + Math.sin(a + 0.06) * 900} Z`} fill={i % 2 ? '#c8401a' : '#e8a020'} opacity={0.35} />; })}
        <circle cx={540} cy={1000} r={250} fill="#e8401a" /><circle cx={540} cy={1000} r={250} fill="none" stroke={OURO} strokeWidth={8} />
      </svg>
      <div style={{position: 'absolute', top: 870, width: '100%', textAlign: 'center', fontSize: 190, color: '#fff3d0', fontFamily: "'WenQuanYi Zen Hei', serif", letterSpacing: 10}}>天照</div>
      <Titulo texto="AMATERASU" y={330} size={140} cor={OURO} />
      {sub && <Texto y={1330} size={60} cor="#fff" delay={4}>DEUSA DO SOL · JAPÃO</Texto>}
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Nome: React.FC = () => <Deusa />;
const DeusaSol: React.FC = () => <Deusa sub />;
const Segunda: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0e1a2e, #02030a 70%)'}}>
    <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: '#fff'}}>2,4 × 10<sup style={{fontSize: 80}}>20</sup> eV</div>
    <Selo texto="2ª MAIS ENERGÉTICA JÁ REGISTRADA" y={920} size={60} delay={8} />
    <Titulo texto="A SEGUNDA MAIOR" y={330} size={110} cor={OURO} />
  </AbsoluteFill>
);
const Assustador: React.FC = () => <Glitch texto="MAS O ASSUSTADOR NÃO É A ENERGIA" size={110} cor="#e8f4ff" />;
const DeOnde: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: '#02030a'}}>
      <Estrelas />
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: VERMELHO, opacity: s, transform: `scale(${0.8 + 0.2 * s})`, lineHeight: 1.05}}>É DE ONDE<br />ELA VEIO</div>
    </AbsoluteFill>
  );
};
const Caminho: React.FC = () => (
  <AbsoluteFill style={{background: '#02030a'}}>
    <Ceu />
    <div style={{position: 'absolute', left: 560, top: 1020, fontFamily: FONTE, fontSize: 46, color: OURO}}>LOCAL VOID</div>
    <Titulo texto="UMA REGIÃO QUASE VAZIA" y={260} size={96} />
    <Etiqueta texto="ANIMAÇÃO" />
  </AbsoluteFill>
);
const Citacao: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #141a26, #03050a 70%)'}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 640, fontFamily: FONTE, fontSize: 82, color: '#fff', lineHeight: 1.15, opacity: s, textAlign: 'center'}}>
        <span style={{color: OURO, fontSize: 160, lineHeight: 0.5}}>“</span><br />LÁ NÃO EXISTE NADA COM ENERGIA SUFICIENTE PRA TER PRODUZIDO ISSO
      </div>
      <Texto y={1330} size={40} cor={CIANO} delay={10}>JOHN MATTHEWS · TELESCOPE ARRAY</Texto>
      <Titulo texto="UM DOS CIENTISTAS" y={330} size={96} />
    </AbsoluteFill>
  );
};
const Hipotese: React.FC<{n: number; texto: string; curva?: number}> = ({n, texto, curva = 0}) => (
  <AbsoluteFill style={{background: '#02030a'}}>
    <Ceu curva={curva} />
    <Selo texto={`HIPÓTESE ${n}`} y={470} size={64} />
    <Titulo texto={texto} y={220} size={96} cor={CIANO} />
    <Etiqueta texto="ANIMAÇÃO" />
  </AbsoluteFill>
);
const Campos: React.FC = () => <Hipotese n={1} texto="CAMPOS MAGNÉTICOS?" curva={0.8} />;
const Fisica: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#02030a'}}>
      <Estrelas />
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: 'serif', fontSize: 120, color: '#cfd8e8', opacity: 0.85, transform: shake(f, 4)}}>E = ? · ∇ × ? · ħ ?</div>
      <Selo texto="HIPÓTESE 2" y={470} size={64} />
      <Titulo texto="FÍSICA DESCONHECIDA?" y={220} size={96} cor={CIANO} />
    </AbsoluteFill>
  );
};
const Ameaca: React.FC = () => (
  <AbsoluteFill style={{background: '#02030a'}}>
    <Estrelas />
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <ellipse cx={540} cy={2500} rx={1500} ry={1500} fill="#4cc9f0" opacity={0.25} />
      <ellipse cx={540} cy={2550} rx={1380} ry={1380} fill="#0e2a4a" />
    </svg>
    <Chuva yTopo={1060} chao={1180} forca={0.8} />
    <Titulo texto="NÃO É AMEAÇA" y={330} size={120} cor={OURO} />
    <Texto y={620} size={56} delay={6}>A ATMOSFERA ABSORVE TUDO</Texto>
    <Etiqueta texto="ANIMAÇÃO" />
  </AbsoluteFill>
);
const Desconhecida: React.FC = () => (
  <AbsoluteFill style={{background: '#02030a'}}>
    <Ceu />
    <Selo texto={'ORIGEM:\nDESCONHECIDA'} y={700} size={100} cor={VERMELHO} />
  </AbsoluteFill>
);

const CENAS = [Gancho, DoNada, Cientistas, Data, Utah, Atmosfera, Energia, Acelerador, ChuvaDeserto, Detectores, Area, Nome, DeusaSol, Segunda,
  Assustador, DeOnde, Caminho, Citacao, Campos, Fisica, Ameaca, Desconhecida];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/hit.wav', volume: 0.45}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="amaterasu/narracao.mp3" calma={CALMA} sons={SONS} />;
