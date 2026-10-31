// Longo POV "Você encontrou outra VERSÃO de você!" (multiverso, 1920x1080). Roteiro do Roteirista (roteiros/multiverso.md #2, v1), aprovado pelo dono em 31/10.
// POV como espinha + os 4 níveis de Tegmark como capítulos. Selo de rótulo (MODELO / FATO / INTERPRETAÇÃO / HIPÓTESE CONTESTADA / HIPÓTESE) e contador
// "DISTÂNCIA DA SUA CÓPIA". A cor some a cada nível e volta no "Mas espera…". Regra de ouro: nenhum outro universo foi observado; nunca "provado".
// Regra do dono (30/10): NENHUMA cena se repete. Cada foto real aparece em uma cena só, e cada tipo de esquema/ilustração também.
// Reais: NASA (Hubble, Webb, ISS, Orion, LRO) e mapas da radiação cósmica de fundo do WMAP (NASA) e do Planck (ESA/NASA). Retratos: nenhum (só nomes).
// Chip Willow: ilustração própria (sem foto do Google). Voz edge-tts Remy Multilingual (sem ElevenLabs).
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import {NOITE, Etq, Tit, Sub, criarLongo, Cap} from '../longo';
import palavras from './multiverso.palavras.json';

const W = palavras as Palavra[];
const ROXO = '#a98bff';
const PELE = '#e8d2c0';
const ROSA = '#ff6fae';

const CAPS: Cap[] = [
  {canto: 'POV · MULTIVERSO', sat: 1},
  {canto: 'NÍVEL I · MODELO', sat: 0.85, titulo: 'NÍVEL I', sub: 'O ESPAÇO INFINITO'},
  {canto: 'NÍVEL I · FATO', sat: 0.85, titulo: 'LONGE DEMAIS', sub: 'O QUE A GENTE CONSEGUE VER'},
  {canto: 'NÍVEL II · MODELO', sat: 0.65, titulo: 'NÍVEL II', sub: 'BOLHAS COM OUTRAS LEIS'},
  {canto: 'NÍVEL II · FATO', sat: 0.65, titulo: 'ALGUÉM JÁ VIU UMA BOLHA?', sub: ''},
  {canto: 'NÍVEL III · INTERPRETAÇÃO', sat: 0.45, titulo: 'NÍVEL III', sub: 'VOCÊ SE DIVIDE'},
  {canto: 'NÍVEL III · HIPÓTESE CONTESTADA', sat: 0.45, titulo: 'O CHIP DO GOOGLE', sub: ''},
  {canto: 'NÍVEL IV · HIPÓTESE', sat: 0.22, titulo: 'NÍVEL IV', sub: 'TUDO QUE É MATEMÁTICA EXISTE'},
  {canto: 'MAS ESPERA…', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const img = (s: string) => staticFile('multiverso/' + s);
const prog = (f: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});
const Fundo: React.FC<{c?: string; children?: React.ReactNode}> = ({c = '#141a30', children}) => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${c}, ${NOITE} 75%)`}}>{children}</AbsoluteFill>;
const F: React.FC<{src: string; etq: string; t?: string; z?: [number, number]; filtro?: string; veu?: string; fit?: 'cover' | 'contain'; pos?: string; origem?: string; children?: React.ReactNode; s?: number}> = ({src, etq, t, z = [1.02, 1.12], filtro, veu, fit = 'cover', pos = 'center', origem = 'center', children, s}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img(src)} style={{width: '100%', height: '100%', objectFit: fit, objectPosition: pos, filter: filtro, transformOrigin: origem, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      {veu && <AbsoluteFill style={{background: veu}} />}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.55), transparent 30%, transparent 65%, rgba(0,0,0,.6))'}} />
      {children}
      <Etq t={etq} real={etq.startsWith('IMAGEM REAL')} />
      {t && <Tit t={t} s={s ?? 80} />}
    </AbsoluteFill>
  );
};
const Estrelas: React.FC<{n?: number; sem?: string; v?: number; o?: number}> = ({n = 180, sem = 's', v = 0, o = 1}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: o}}>
      {Array.from({length: n}, (_, i) => <circle key={i} cx={(random(sem + 'x' + i) * 1920 + f * v * (0.3 + random(sem + 'v' + i))) % 1920} cy={random(sem + 'y' + i) * 1080}
        r={0.8 + random(sem + 'r' + i) * 2.2} fill="#fff" opacity={(0.3 + 0.7 * random(sem + 'o' + i)) * (0.75 + 0.25 * Math.sin(f * 0.08 + i))} />)}
    </svg>
  );
};
// pessoa de corpo inteiro (silhueta)
const Pessoa: React.FC<{x: number; y: number; h: number; cor?: string; op?: number; flip?: boolean}> = ({x, y, h, cor = PELE, op = 1, flip}) => (
  <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`} fill={cor} opacity={op}>
    <circle cy={-h * 0.89} r={h * 0.095} />
    <path d={`M${-h * 0.15} ${-h * 0.76} Q0 ${-h * 0.8} ${h * 0.15} ${-h * 0.76} L${h * 0.17} ${-h * 0.42} L${h * 0.1} ${-h * 0.42} L${h * 0.09} 0 L${h * 0.02} 0 L0 ${-h * 0.36} L${-h * 0.02} 0 L${-h * 0.09} 0 L${-h * 0.1} ${-h * 0.42} L${-h * 0.17} ${-h * 0.42} Z`} />
  </g>
);
// busto (cabeça e ombros)
const Busto: React.FC<{x: number; y: number; h: number; cor?: string; op?: number}> = ({x, y, h, cor = PELE, op = 1}) => (
  <g transform={`translate(${x} ${y})`} fill={cor} opacity={op}>
    <ellipse cy={-h * 0.72} rx={h * 0.19} ry={h * 0.24} />
    <rect x={-h * 0.08} y={-h * 0.52} width={h * 0.16} height={h * 0.12} />
    <path d={`M${-h * 0.42} 0 Q${-h * 0.42} ${-h * 0.42} 0 ${-h * 0.42} Q${h * 0.42} ${-h * 0.42} ${h * 0.42} 0 Z`} />
  </g>
);
const Torre: React.FC<{size: number; cor?: string; exp?: string}> = ({size, cor = OURO, exp = '29'}) => (
  <span style={{fontFamily: FONTE, fontSize: size, color: cor, whiteSpace: 'nowrap'}}>10<sup style={{fontSize: '0.55em', verticalAlign: '0.9em'}}>10<sup style={{fontSize: '0.6em', verticalAlign: '0.8em'}}>{exp}</sup></sup></span>
);
const Caixa: React.FC<{t: string; cor?: string; x?: number; y: number; s?: number; d?: number; rot?: number}> = ({t, cor = OURO, x, y, s = 60, d = 6, rot = 0}) => {
  const p = useSpring(d, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, left: x ?? 0, width: x === undefined ? '100%' : undefined, display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '14px 34px', border: `6px solid ${cor}`, borderRadius: 18, fontFamily: FONTE, fontSize: s, color: cor, background: 'rgba(0,0,0,.6)', whiteSpace: 'pre-line', textAlign: 'center',
        lineHeight: 1.1, opacity: p, transform: `rotate(${rot}deg) scale(${0.7 + 0.3 * p})`}}>{t}</div>
    </div>
  );
};
const Porta: React.FC<{x: number; y: number; w: number; h: number; ab: number; luz?: string; dentro?: React.ReactNode}> = ({x, y, w, h, ab, luz = '#fff6dc', dentro}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, perspective: 1400}}>
    <div style={{position: 'absolute', inset: 0, background: luz, overflow: 'hidden', boxShadow: `0 0 ${120 * ab}px ${luz}`}}>{dentro}</div>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#3a2414,#5a3a20)', transformOrigin: '0 50%', transform: `rotateY(${-ab * 100}deg)`, border: '6px solid #2a180c'}}>
      <div style={{position: 'absolute', right: 24, top: h / 2, width: 22, height: 22, borderRadius: 11, background: OURO}} />
    </div>
    <div style={{position: 'absolute', left: -20, right: -20, top: -20, bottom: -4, border: '20px solid #1a1008', borderBottom: 'none', pointerEvents: 'none'}} />
  </div>
);
const Bolha: React.FC<{x: number; y: number; r: number; cor: string; o?: number; brilho?: boolean}> = ({x, y, r, cor, o = 1, brilho = true}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', opacity: o,
    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.55), ${cor}55 35%, ${cor}22 65%, ${cor}88 100%)`, border: `3px solid ${cor}`, boxShadow: brilho ? `0 0 ${r * 0.4}px ${cor}88` : undefined}} />
);

// ================= GANCHO (POV) =================
// 1. você abre a porta (luz do outro lado)
const AbrePorta: React.FC = () => {
  const f = useCurrentFrame();
  const ab = prog(f, 0, 40);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0c0a10,#18120c)', transform: `scale(${1 + 0.1 * ab})`}}>
      <Porta x={700} y={170} w={520} h={860} ab={ab} />
      <Etq t="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};
// 2. do outro lado está você
const OutroLado: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(4, {damping: 14, mass: 0.6});
  const g = f > 30 && f % 13 < 2;
  return (
    <AbsoluteFill style={{background: '#fff6dc', overflow: 'hidden', transform: g ? shake(f, 18) : undefined}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #fffaf0, #e8d8b8 80%)'}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><Pessoa x={960} y={1080 + 60} h={1000 * (0.9 + 0.1 * s)} cor={g ? CIANO : '#20160e'} /></svg>
      <Tit t="DO OUTRO LADO ESTÁ VOCÊ" cor="#20160e" s={84} />
      <Etq t="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};
// 3. mesmo rosto: dois perfis frente a frente
const Rosto: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 18], [160, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  const perfil = 'M0 0 C 40 -60 60 -140 40 -220 C 30 -260 70 -270 80 -300 C 90 -330 60 -340 70 -360 C 80 -400 60 -470 0 -520 C -60 -560 -180 -560 -240 -500 C -320 -420 -320 -280 -250 -200 C -220 -160 -210 -90 -220 0 Z';
  return (
    <Fundo c="#2a1030">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d={perfil} transform={`translate(${860 - p} 1000) scale(1.3)`} fill={PELE} />
        <path d={perfil} transform={`translate(${1060 + p} 1000) scale(-1.3 1.3)`} fill={PELE} opacity={0.9} />
      </svg>
      <Tit t="MESMO ROSTO" s={96} />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 4. mesma voz: duas ondas iguais
const Voz: React.FC = () => {
  const f = useCurrentFrame();
  const onda = (y: number, cor: string) => {
    const pts = Array.from({length: 200}, (_, i) => { const x = 160 + i * 8; const a = Math.sin(i * 0.31 + f * 0.4) * Math.sin(i * 0.05 + f * 0.1) * 90 * (0.5 + 0.5 * Math.sin(i * 0.11)); return `${x},${y + a}`; }).join(' ');
    return <polyline points={pts} fill="none" stroke={cor} strokeWidth={6} />;
  };
  return (
    <Fundo c="#0c2030">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{onda(450, CIANO)}{onda(720, OURO)}</svg>
      <div style={{position: 'absolute', left: 60, top: 420, fontFamily: FONTE, fontSize: 34, color: CIANO}}>VOCÊ</div>
      <div style={{position: 'absolute', left: 60, top: 690, fontFamily: FONTE, fontSize: 34, color: OURO}}>ELE</div>
      <Tit t="MESMA VOZ" s={96} />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 5. a mesma cicatriz no joelho (desenho de traço)
const Cicatriz: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 6, 30);
  const Perna = ({x}: {x: number}) => (
    <g transform={`translate(${x} 0)`}>
      <path d="M-90 250 Q-110 520 -70 620 Q-60 700 -80 980 L80 980 Q60 700 80 620 Q120 520 90 250 Z" fill="#d9bfa8" stroke="#8a6a50" strokeWidth={5} />
      <ellipse cx={0} cy={630} rx={70} ry={40} fill="none" stroke="#8a6a50" strokeWidth={3} opacity={0.5} />
      <path d="M-40 600 L40 650" stroke={VERMELHO} strokeWidth={7} strokeDasharray={`${100 * p} 100`} strokeLinecap="round" />
      {[0, 1, 2, 3].map((k) => <line key={k} x1={-30 + k * 22} y1={598 + k * 14} x2={-18 + k * 22} y2={622 + k * 14} stroke={VERMELHO} strokeWidth={3} opacity={p} />)}
    </g>
  );
  return (
    <AbsoluteFill style={{background: '#f2ead8'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><Perna x={700} /><Perna x={1220} /></svg>
      <Tit t="A MESMA CICATRIZ NO JOELHO" cor="#2a1a10" s={76} />
      <Etq t="ILUSTRAÇÃO · DETALHE DE CENA" />
    </AbsoluteFill>
  );
};
// 6. parece filme: película correndo
const Filme: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a0a0a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 330, left: -400 - ((f * 14) % 460), height: 420, display: 'flex', gap: 40, background: '#1a1a1a', padding: '50px 20px', width: 3600}}>
        {Array.from({length: 8}, (_, i) => <div key={i} style={{width: 420, height: 320, background: `linear-gradient(135deg, #3a3020, #0c0a08)`, border: '4px solid #333', position: 'relative'}}>
          <svg width={420} height={320}><Pessoa x={i % 2 ? 260 : 160} y={320} h={260} cor={'#c8b090'} /></svg>
        </div>)}
      </div>
      <Tit t="PARECE FILME" s={96} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 7. alguns físicos levam a sério: caderno de contas
const Serio: React.FC = () => {
  const f = useCurrentFrame();
  const linhas = ['N ≈ 2^(10^115)', 'V → ∞', 'P(repetição) → 1', 'd ≈ 10^(10^29) m'];
  return (
    <AbsoluteFill style={{background: '#f4f0e4'}}>
      {Array.from({length: 18}, (_, i) => <div key={i} style={{position: 'absolute', top: 280 + i * 44, left: 300, right: 300, height: 2, background: '#b8c8e0'}} />)}
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 380, width: 3, background: '#e8a0a0'}} />
      {linhas.map((l, i) => <div key={i} style={{position: 'absolute', top: 330 + i * 140, left: 440, fontFamily: 'serif', fontStyle: 'italic', fontSize: 70, color: '#1a2a5a',
        clipPath: `inset(0 ${100 - 100 * prog(f, i * 10, i * 10 + 14)}% 0 0)`}}>{l}</div>)}
      <Tit t="ALGUNS FÍSICOS LEVAM A SÉRIO" cor="#1a1a2a" s={76} />
      <Etq t="ILUSTRAÇÃO · CONTAS DO ARTIGO DE 2003" />
    </AbsoluteFill>
  );
};
// 8. quatro jeitos: quatro portas
const QuatroJeitos: React.FC = () => {
  const f = useCurrentFrame();
  const cores = [CIANO, ROXO, VERDE, ROSA];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#08060e,#140c1c)'}}>
      {cores.map((c, i) => {
        const ab = prog(f, 8 + i * 6, 22 + i * 6);
        return <React.Fragment key={i}>
          <Porta x={250 + i * 380} y={300} w={280} h={520} ab={ab} luz={c} />
          <div style={{position: 'absolute', left: 250 + i * 380, width: 280, top: 860, textAlign: 'center', fontFamily: FONTE, fontSize: 60, color: c, opacity: ab}}>{['I', 'II', 'III', 'IV'][i]}</div>
        </React.Fragment>;
      })}
      <Tit t="PELO MENOS 4 JEITOS" s={84} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 9. real: céu visto da ISS, nenhum outro universo visto
const NadaVisto: React.FC = () => (
  <F src="via_lactea_iss.jpg" etq="IMAGEM REAL · VIA LÁCTEA VISTA DA ISS · NASA" z={[1.0, 1.1]}>
    <Caixa t="NENHUM OUTRO UNIVERSO OBSERVADO" cor={VERMELHO} y={470} s={64} d={6} />
  </F>
);
// 10. mas as contas já foram feitas: calculadora
const Calculadora: React.FC = () => {
  const f = useCurrentFrame();
  const dig = Array.from({length: 14}, (_, i) => Math.floor(random('cd' + i + Math.floor(f / 3)) * 10)).join('');
  return (
    <Fundo c="#1a1a10">
      <div style={{position: 'absolute', left: 660, top: 230, width: 600, height: 760, borderRadius: 40, background: '#22242a', border: '6px solid #3a3e48'}}>
        <div style={{margin: 40, height: 140, borderRadius: 16, background: '#0c1a10', fontFamily: 'monospace', fontSize: 70, color: VERDE, textAlign: 'right', padding: '30px 24px', boxSizing: 'border-box', overflow: 'hidden'}}>{f > 50 ? 'FEITO' : dig}</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, margin: '0 40px'}}>
          {Array.from({length: 16}, (_, i) => <div key={i} style={{height: 90, borderRadius: 16, background: Math.floor(f / 4) % 16 === i ? OURO : '#3a3e48'}} />)}
        </div>
      </div>
      <Tit t="MAS AS CONTAS JÁ FORAM FEITAS" s={76} />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 11. a cada jeito, a cópia fica mais estranha: quatro silhuetas cada vez mais distorcidas
const MaisEstranha: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg,#10141c,#1a0a24)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3].map((i) => {
          const s = prog(f, i * 8, i * 8 + 14);
          const ond = i * 6 * Math.sin(f * 0.3 + i);
          return <g key={i} opacity={s} transform={`translate(${360 + i * 400} 900) skewX(${ond}) scale(${1 + i * 0.05} ${1 - i * 0.08})`}>
            <Pessoa x={0} y={0} h={560} cor={[PELE, '#c8b0e8', '#80e0c8', '#ff80c0'][i]} op={1 - i * 0.18} />
          </g>;
        })}
      </svg>
      <Tit t="A CÓPIA FICA MAIS ESTRANHA" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 12. vamos atrás dela: lanterna no escuro
const Lanterna: React.FC = () => {
  const f = useCurrentFrame();
  const x = 960 + Math.sin(f * 0.06) * 620, y = 560 + Math.cos(f * 0.09) * 180;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Estrelas sem="lan" n={120} o={0.4} />
      <AbsoluteFill style={{background: `radial-gradient(circle 260px at ${x}px ${y}px, rgba(255,240,200,.35), rgba(0,0,0,.96) 100%)`}} />
      <Tit t="VAMOS ATRÁS DELA" s={96} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ================= NÍVEL I =================
// 13. o jeito mais simples: um cubo de espaço
const Simples: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 1.2;
  return (
    <Fundo c="#101830">
      <div style={{position: 'absolute', left: 960 - 160, top: 560 - 160, width: 320, height: 320, transformStyle: 'preserve-3d', transform: `perspective(1200px) rotateX(-20deg) rotateY(${a}deg)`}}>
        {[[0, 0], [90, 0], [180, 0], [270, 0], [0, 90], [0, -90]].map(([ry, rx], i) => (
          <div key={i} style={{position: 'absolute', inset: 0, border: `4px solid ${CIANO}`, background: 'rgba(76,201,240,.08)', transform: `rotateY(${ry}deg) rotateX(${rx}deg) translateZ(160px)`}} />
        ))}
      </div>
      <Tit t="O JEITO MAIS SIMPLES" s={84} />
      <Sub y={860} s={40} cor="#cfd8e8">UM PEDAÇO DE ESPAÇO</Sub>
      <Etq t="ANIMAÇÃO" />
    </Fundo>
  );
};
// 14. Max Tegmark: crachá
const Tegmark: React.FC = () => {
  const s = useSpring(3);
  return (
    <AbsoluteFill style={{background: '#020308'}}>
      <Estrelas sem="tg" v={1} />
      <div style={{position: 'absolute', left: 560, top: 300, width: 800, height: 470, borderRadius: 30, background: 'linear-gradient(135deg,#f4f4f8,#d8dce8)', boxShadow: '0 30px 80px rgba(0,0,0,.7)',
        opacity: s, transform: `rotate(${-4 + 4 * s}deg) scale(${0.8 + 0.2 * s})`}}>
        <div style={{height: 90, borderRadius: '30px 30px 0 0', background: '#8a1a2a', color: '#fff', fontFamily: FONTE, fontSize: 44, padding: '18px 40px', letterSpacing: 6}}>MIT</div>
        <svg width={220} height={260} style={{position: 'absolute', left: 50, top: 140}}><rect width={220} height={260} rx={14} fill="#b8bcc8" /><Busto x={110} y={260} h={230} cor="#7a7e8a" /></svg>
        <div style={{position: 'absolute', left: 320, top: 170, fontFamily: FONTE, fontSize: 70, color: '#111', lineHeight: 1}}>MAX<br />TEGMARK</div>
        <div style={{position: 'absolute', left: 320, top: 340, fontFamily: FONTE, fontSize: 36, color: '#8a1a2a'}}>COSMÓLOGO</div>
      </div>
      <Tit t="EM 2003, UMA CONTA" s={80} />
      <Etq t="ILUSTRAÇÃO · SEM RETRATO" />
    </AbsoluteFill>
  );
};
// 15. se o espaço for infinito: cubos de espaço até o horizonte
const CubosInfinitos: React.FC = () => {
  const f = useCurrentFrame();
  const off = (f * 5) % 160;
  return (
    <AbsoluteFill style={{background: '#02030a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -2000, right: -2000, top: 520, height: 3000, transform: 'perspective(700px) rotateX(70deg)', transformOrigin: '50% 0',
        backgroundImage: `linear-gradient(${CIANO} 3px, transparent 3px), linear-gradient(90deg, ${CIANO} 3px, transparent 3px)`, backgroundSize: '160px 160px', backgroundPosition: `0 ${off}px`, opacity: 0.7}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #02030a 40%, transparent 60%)'}} />
      <Caixa t="SE O ESPAÇO FOR INFINITO" cor={OURO} y={300} s={66} d={2} />
      <Etq t="ANIMAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 16. o número de jeitos de arrumar as partículas: pontos se rearranjando
const Arranjos: React.FC = () => {
  const f = useCurrentFrame();
  const k = Math.floor(f / 10);
  return (
    <Fundo c="#0e1a2a">
      {Array.from({length: 6}, (_, b) => (
        <svg key={b} width={260} height={260} style={{position: 'absolute', left: 230 + (b % 3) * 520, top: 280 + Math.floor(b / 3) * 330}}>
          <rect width={260} height={260} fill="none" stroke="#3a4a66" strokeWidth={4} />
          {Array.from({length: 9}, (_, i) => <circle key={i} cx={20 + random('ar' + b + i + k) * 220} cy={20 + random('ay' + b + i + k) * 220} r={12} fill={[CIANO, OURO, ROSA][i % 3]} />)}
        </svg>
      ))}
      <Tit t="JEITOS DE ARRUMAR AS PARTÍCULAS" s={74} />
      <Etq t="ANIMAÇÃO" />
    </Fundo>
  );
};
// 17. gigantesco, mas tem limite: contador batendo num teto
const Limite: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 40, Easing.out(Easing.cubic));
  return (
    <Fundo c="#201010">
      <div style={{position: 'absolute', left: 300, top: 440, width: 1320, height: 120, borderRadius: 20, background: 'rgba(255,255,255,.08)'}} />
      <div style={{position: 'absolute', left: 300, top: 440, width: 1320 * 0.92 * p, height: 120, borderRadius: 20, background: `linear-gradient(90deg, ${CIANO}, ${OURO})`}} />
      <div style={{position: 'absolute', left: 300 + 1320 * 0.92, top: 380, width: 14, height: 240, background: VERMELHO, transform: f > 38 ? shake(f, 6) : undefined}} />
      <div style={{position: 'absolute', left: 300 + 1320 * 0.92 - 100, width: 214, top: 640, textAlign: 'center', fontFamily: FONTE, fontSize: 44, color: VERMELHO}}>LIMITE</div>
      <Tit t="GIGANTESCO, MAS TEM LIMITE" s={80} />
      <Etq t="ESQUEMA" />
    </Fundo>
  );
};
// 18. num espaço sem fim, o mesmo padrão aparece longe (zoom out)
const PadraoLonge: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 80], [2.2, 0.35], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const bloco = Array.from({length: 10}, (_, i) => ({x: random('px' + i) * 180, y: random('py' + i) * 180}));
  return (
    <AbsoluteFill style={{background: '#04040a', overflow: 'hidden'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(960 540) scale(${z}) translate(-90 -90)`}>
          {Array.from({length: 21 * 13}, (_, k) => {
            const cx = (k % 21 - 10) * 180, cy = (Math.floor(k / 21) - 6) * 180;
            const igual = (k % 21 - 10) % 7 === 0 && (Math.floor(k / 21) - 6) % 4 === 0;
            return <g key={k} transform={`translate(${cx} ${cy})`}>
              <rect width={180} height={180} fill={igual ? 'rgba(255,210,63,.15)' : 'none'} stroke={igual ? OURO : '#1e2238'} strokeWidth={igual ? 6 : 2} />
              {bloco.map((b, i) => <circle key={i} cx={igual ? b.x : random('q' + k + i) * 180} cy={igual ? b.y : random('w' + k + i) * 180} r={8} fill={igual ? OURO : '#4a5070'} />)}
            </g>;
          })}
        </g>
      </svg>
      <Tit t="UM DIA O MESMO ARRANJO SE REPETE" s={74} />
      <Etq t="ANIMAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 19. de novo e de novo: carimbo repetido
const DeNovo: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(12, Math.floor(f / 4) + 1);
  return (
    <AbsoluteFill style={{background: '#efe8d8'}}>
      {Array.from({length: n}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 140 + (i % 4) * 420, top: 260 + Math.floor(i / 4) * 240, padding: '14px 28px', border: `7px solid ${VERMELHO}`, borderRadius: 14,
          fontFamily: FONTE, fontSize: 54, color: VERMELHO, transform: `rotate(${(random('dn' + i) - 0.5) * 16}deg)`, opacity: 0.85}}>DE NOVO</div>
      ))}
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 20. o arranjo que forma você: silhueta feita de pontos
const ArranjoVoce: React.FC = () => {
  const f = useCurrentFrame();
  const pts = React.useMemo(() => Array.from({length: 900}, (_, i) => {
    const t = random('vx' + i) * Math.PI * 2, r = Math.sqrt(random('vr' + i));
    if (i < 250) return [Math.cos(t) * r * 70, -420 + Math.sin(t) * r * 82];
    return [(random('vb' + i) - 0.5) * 300 * (1 - 0.4 * random('vc' + i)), -320 + random('vy' + i) * 640];
  }), []);
  const p = prog(f, 0, 36);
  return (
    <AbsoluteFill style={{background: '#030308'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {pts.map(([x, y], i) => <circle key={i} cx={960 + x * p + (random('sx' + i) - 0.5) * 1800 * (1 - p)} cy={680 + y * p + (random('sy' + i) - 0.5) * 900 * (1 - p)} r={3.5} fill={OURO} />)}
      </svg>
      <Tit t="INCLUSIVE O ARRANJO QUE FORMA VOCÊ" s={70} />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 21. quão longe? régua que não acaba
const Regua: React.FC = () => {
  const f = useCurrentFrame();
  const off = f * 40;
  return (
    <AbsoluteFill style={{background: '#14100a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 470, left: 0, right: 0, height: 160, background: '#e8c050'}}>
        {Array.from({length: 60}, (_, i) => { const x = ((i * 60 - off) % 3600 + 3600) % 3600 - 100; return <div key={i} style={{position: 'absolute', left: x, top: 0, width: 4, height: i % 5 ? 50 : 100, background: '#2a1a08'}} />; })}
      </div>
      <Tit t="QUÃO LONGE?" s={130} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 22. a estimativa: 10^(10^29) metros, "grosseira"
const Estimativa: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 60], [0.5, 1.1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a1a00, #050300 70%)'}}>
      <div style={{position: 'absolute', top: 290, width: '100%', textAlign: 'center', transform: `scale(${s})`}}><Torre size={260} /></div>
      <Sub y={640} s={60} cor="#fff">METROS</Sub>
      <Caixa t="ESTIMATIVA GROSSEIRA (PALAVRA DELE)" cor="#cfd8e8" y={760} s={44} d={30} />
      <Etq t="TEGMARK, 2003" />
    </AbsoluteFill>
  );
};
// 23. a sua cópia exata: igual a você, "="
const CopiaIgual: React.FC = () => {
  const s = useSpring(8);
  return (
    <Fundo c="#1a1430">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <Pessoa x={620} y={950} h={620} /><Pessoa x={1300} y={950} h={620} />
      </svg>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 200, color: OURO, opacity: s, transform: `scale(${s})`}}>=</div>
      <Tit t="A SUA CÓPIA EXATA" s={84} />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 24. os vocês quase iguais: fila de variações
const QuaseIguais: React.FC = () => {
  const f = useCurrentFrame();
  const cores = [PELE, '#e0c8b0', '#d8d0c0', '#f0d0c8', '#d0c0b8', '#e8d8c8', '#c8b8a8'];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#141020,#0a0810)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {cores.map((c, i) => <g key={i} opacity={prog(f, i * 4, i * 4 + 10)}>
          <Pessoa x={220 + i * 250} y={940} h={480 + (i % 3) * 30} cor={c} />
          {i % 2 === 1 && <rect x={220 + i * 250 - 60} y={940 - 520} width={120} height={24} rx={8} fill={[CIANO, ROSA, VERDE][i % 3]} />}
        </g>)}
      </svg>
      <Tit t="E OS VOCÊS QUASE IGUAIS" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 25. o que mudou de cidade: dois horizontes de cidade
const Cidades: React.FC = () => {
  const f = useCurrentFrame();
  const predios = (sem: string, x0: number, cor: string) => Array.from({length: 12}, (_, i) => {
    const h = 120 + random(sem + i) * 300; return <rect key={sem + i} x={x0 + i * 62} y={900 - h} width={56} height={h} fill={cor} />;
  });
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#1a1036,#3a1a40 60%,#0a0610)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {predios('ca', 120, '#0c0a18')}{predios('cb', 1060, '#0c0a18')}
        <line x1={960} y1={300} x2={960} y2={1000} stroke="#fff" strokeWidth={3} strokeDasharray="10 12" opacity={0.4} />
        <Pessoa x={480} y={980} h={160} cor={CIANO} /><Pessoa x={1420 + Math.sin(f * 0.1) * 10} y={980} h={160} cor={OURO} />
      </svg>
      <Tit t="UM QUE MUDOU DE CIDADE" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 26. o que nunca conheceu os seus amigos: foto de grupo com um vazio
const Amigos: React.FC = () => {
  const f = useCurrentFrame();
  const some = interpolate(f, [10, 30], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#1a1410'}}>
      <div style={{position: 'absolute', left: 460, top: 260, width: 1000, height: 640, background: '#f4efe6', padding: 30, boxSizing: 'border-box', transform: 'rotate(-2deg)', boxShadow: '0 30px 60px rgba(0,0,0,.6)'}}>
        <svg width={940} height={500} style={{background: 'linear-gradient(180deg,#8ab0d0,#d0c0a0)'}}>
          {[0, 1, 2, 3, 4].map((i) => <Busto key={i} x={120 + i * 175} y={500} h={300} cor={i === 2 ? '#3a2a20' : '#4a3a30'} op={i === 2 ? some : 1} />)}
          {some < 0.5 && <ellipse cx={470} cy={350} rx={90} ry={150} fill="none" stroke={VERMELHO} strokeWidth={6} strokeDasharray="14 10" />}
        </svg>
      </div>
      <Tit t="UM QUE NUNCA CONHECEU OS SEUS AMIGOS" s={66} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 27. irmão gêmeo que viveu outra história
const Gemeo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg,#0c1a2a 50%,#2a0c1a 50%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <Pessoa x={760} y={980} h={640} cor={PELE} />
        <Pessoa x={1160} y={980} h={640} cor={PELE} flip />
        <rect x={1160 - 70} y={980 - 470} width={140} height={200} rx={20} fill={ROSA} opacity={0.8} />
        <rect x={760 - 70} y={980 - 470} width={140} height={200} rx={20} fill={CIANO} opacity={0.8} />
      </svg>
      <div style={{position: 'absolute', left: 120, top: 520, fontFamily: FONTE, fontSize: 40, color: CIANO, opacity: prog(f, 10, 24)}}>A SUA HISTÓRIA</div>
      <div style={{position: 'absolute', right: 120, top: 520, fontFamily: FONTE, fontSize: 40, color: ROSA, opacity: prog(f, 18, 32)}}>OUTRA HISTÓRIA</div>
      <Tit t="UM IRMÃO GÊMEO" s={90} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ================= LONGE DEMAIS (FATO) =================
// 28. você nunca vai chegar lá: foguete e barra de progresso
const NuncaChega: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#05060c'}}>
      <Estrelas sem="nc" v={3} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(${300 + Math.sin(f * 0.2) * 4} 520)`}>
          <path d="M0 -40 L120 0 L0 40 Z" fill="#dfe6f0" /><rect x={-60} y={-24} width={70} height={48} fill="#b0b8c8" />
          <path d={`M-60 -16 L${-120 - 20 * Math.sin(f)} 0 L-60 16 Z`} fill={OURO} />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 200, right: 200, top: 700, height: 40, borderRadius: 20, background: 'rgba(255,255,255,.1)'}} />
      <div style={{position: 'absolute', left: 200, top: 700, width: 6, height: 40, borderRadius: 20, background: OURO}} />
      <Sub y={770} s={40} cor="#cfd8e8">PROGRESSO DA VIAGEM: 0,000…%</Sub>
      <Tit t="VOCÊ NUNCA VAI CHEGAR LÁ" s={84} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 29. real: o eXtreme Deep Field e o tamanho do universo visível
const Visivel: React.FC = () => (
  <F src="xdf.jpg" etq="IMAGEM REAL · HUBBLE EXTREME DEEP FIELD · NASA/ESA" z={[1.15, 1.0]}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><circle cx={960} cy={560} r={360} fill="none" stroke={CIANO} strokeWidth={7} strokeDasharray="20 14" /></svg>
    <Caixa t="~93 BILHÕES DE ANOS-LUZ" cor={CIANO} y={790} s={50} d={10} />
    <Tit t="TUDO O QUE A GENTE CONSEGUE VER" s={74} />
  </F>
);
// 30. a luz ainda não chegou: raios vindo de longe, parados no caminho
const LuzNaoChegou: React.FC = () => (
  <F src="abell2744.jpg" etq="IMAGEM REAL · AGLOMERADO ABELL 2744 · HUBBLE · NASA" z={[1.0, 1.15]} veu="rgba(0,0,10,.35)">
    <Sub y={790} s={44} cor={OURO}>DE MAIS LONGE, A LUZ AINDA NÃO TEVE TEMPO DE CHEGAR</Sub>
    <Tit t="ALÉM DISSO: NADA" s={84} />
  </F>
);
// 31. fita de zeros
const Zeros: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0b0b0b', overflow: 'hidden'}}>
      {Array.from({length: 6}, (_, r) => (
        <div key={r} style={{position: 'absolute', top: 290 + r * 110, left: 0, whiteSpace: 'nowrap', fontFamily: FONTE, fontSize: 90, color: r === 0 ? '#fff' : '#6a6a6a',
          transform: `translateX(${(r === 0 ? 60 : 0) - ((f * (12 + r * 3)) % 400)}px)`}}>{r === 0 ? <><span style={{color: OURO}}>1</span>{'0'.repeat(50)}</> : '0'.repeat(60)}</div>
      ))}
      <Caixa t="1 SEGUIDO DE 100 OCTILHÕES DE ZEROS" cor={OURO} y={690} s={48} d={8} />
      <Tit t="ESCRITA, A DISTÂNCIA SERIA…" s={76} />
      <Etq t="CONTA" />
    </AbsoluteFill>
  );
};
// 32. real: ela pode existir
const PodeExistir: React.FC = () => (
  <F src="hdf.jpg" etq="IMAGEM REAL · HUBBLE DEEP FIELD · NASA" z={[1.0, 1.2]} origem="70% 40%" t="ELA PODE EXISTIR" />
);
// 33. real: nunca vai saber de você
const NuncaSabe: React.FC = () => (
  <F src="legiao.jpg" etq="IMAGEM REAL · GALÁXIAS DISTANTES · HUBBLE · NASA" z={[1.2, 1.0]} filtro="brightness(.8)" t="NUNCA VAI SABER DE VOCÊ" />
);
// 34. real: a Terra pequena vista de longe, nem você dela
const NemVoce: React.FC = () => (
  <F src="orion_terra.jpg" etq="IMAGEM REAL · A TERRA VISTA DA ORION · NASA" z={[1.0, 1.1]} t="E VOCÊ NUNCA VAI SABER DELA" />
);

// ================= NÍVEL II =================
// 35. outro universo: a nossa bolha e as outras
const OutraBolha: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#140c24">
      <Bolha x={620} y={580} r={260} cor={CIANO} />
      <Bolha x={1380} y={520} r={220 * prog(f, 6, 30, Easing.out(Easing.back(1.4)))} cor={ROSA} />
      <div style={{position: 'absolute', left: 620 - 200, width: 400, top: 860, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: CIANO}}>O NOSSO</div>
      <div style={{position: 'absolute', left: 1380 - 200, width: 400, top: 800, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: ROSA, opacity: prog(f, 20, 30)}}>OUTRO UNIVERSO</div>
      <Tit t="AGORA ELA ESTÁ EM OUTRO UNIVERSO" s={74} />
      <Etq t="ANIMAÇÃO · MODELO" />
    </Fundo>
  );
};
// 36. Vilenkin, Steinhardt e Linde: três colunas com o ano
const TresNomes: React.FC = () => {
  const nomes: [string, string][] = [['ALEXANDER VILENKIN', '1983'], ['PAUL STEINHARDT', '1983'], ['ANDREI LINDE', '1986']];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0e0a1a,#1a1030)'}}>
      {nomes.map(([n, a], i) => {
        const s = useSpring(4 + i * 6);
        return <div key={i} style={{position: 'absolute', left: 180 + i * 540, top: 330, width: 480, height: 440, borderTop: `10px solid ${[CIANO, OURO, ROSA][i]}`, background: 'rgba(255,255,255,.05)',
          opacity: s, transform: `translateY(${(1 - s) * 80}px)`, textAlign: 'center', fontFamily: FONTE}}>
          <div style={{marginTop: 60, fontSize: 120, color: [CIANO, OURO, ROSA][i]}}>{a}</div>
          <div style={{marginTop: 50, fontSize: 46, color: '#fff', padding: '0 20px', lineHeight: 1.15}}>{n}</div>
        </div>;
      })}
      <Tit t="INFLAÇÃO ETERNA" s={90} />
      <Etq t="SEM RETRATOS" />
    </AbsoluteFill>
  );
};
// 37. o nascimento não aconteceu uma vez só: vários clarões
const Nascimentos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {Array.from({length: 9}, (_, i) => {
        const t0 = i * 9, k = f - t0;
        if (k < 0) return null;
        const r = 30 + k * 9, o = Math.max(0, 1 - k / 50);
        return <div key={i} style={{position: 'absolute', left: 200 + random('nx' + i) * 1500 - r, top: 250 + random('ny' + i) * 650 - r, width: 2 * r, height: 2 * r, borderRadius: '50%',
          background: `radial-gradient(circle, #fff, ${[OURO, CIANO, ROSA][i % 3]} 30%, transparent 70%)`, opacity: o}} />;
      })}
      <Tit t="NÃO UMA VEZ SÓ" s={100} />
      <Etq t="ANIMAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 38. espuma de bolhas crescendo sem parar
const Espuma: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a0a30, #040208 75%)', overflow: 'hidden'}}>
      {Array.from({length: 40}, (_, i) => {
        const t0 = random('et' + i) * 24, k = Math.max(0, f - t0 + 3);
        const r = Math.min(40 + random('er' + i) * 130, k * 7);
        return r > 0 ? <Bolha key={i} x={random('ex' + i) * 1920} y={random('ey' + i) * 1080} r={r} cor={[CIANO, ROXO, ROSA, VERDE, OURO][i % 5]} brilho={false} /> : null;
      })}
      <Tit t="CRIANDO BOLHAS SEM PARAR" s={86} />
      <Etq t="ANIMAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 39. real: a Nebulosa da Bolha (só pra comparar a forma)
const NebulosaBolha: React.FC = () => (
  <F src="bolha_nebulosa.jpg" etq="IMAGEM REAL · NEBULOSA DA BOLHA · HUBBLE · NASA" z={[1.25, 1.0]} pos="50% 55%" t="CADA BOLHA, UM UNIVERSO">
    <Sub y={230} s={34} cor="#cfd8e8">(ESTA É SÓ UMA NEBULOSA DA NOSSA GALÁXIA. NENHUMA BOLHA-UNIVERSO FOI VISTA)</Sub>
  </F>
);
// 40. cada uma com leis diferentes: painel de controles
const Leis: React.FC = () => {
  const f = useCurrentFrame();
  const nomes = ['GRAVIDADE', 'ELETRICIDADE', 'MASSA DO ELÉTRON', 'FORÇA NUCLEAR'];
  return (
    <AbsoluteFill style={{background: '#121418'}}>
      {nomes.map((n, i) => {
        const v = 0.5 + 0.42 * Math.sin(f * 0.07 * (i + 1) + i * 2);
        return <div key={i} style={{position: 'absolute', left: 300, right: 300, top: 300 + i * 160}}>
          <div style={{fontFamily: FONTE, fontSize: 38, color: '#cfd8e8'}}>{n}</div>
          <div style={{marginTop: 14, height: 14, borderRadius: 7, background: '#33363e'}} />
          <div style={{position: 'absolute', top: 44, left: `calc(${v * 100}% - 22px)`, width: 44, height: 44, borderRadius: 22, background: [CIANO, OURO, ROSA, VERDE][i]}} />
        </div>;
      })}
      <Tit t="LEIS DA FÍSICA DIFERENTES" s={80} />
      <Etq t="ILUSTRAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 41. bolha sem átomos (vazia)
const SemAtomos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#0a0a0a">
      <Bolha x={960} y={570} r={330} cor="#8a8a9a" brilho={false} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => <ellipse key={i} cx={960} cy={570} rx={90} ry={30} fill="none" stroke="#fff" strokeWidth={3} opacity={0.5 * (1 - prog(f, 6, 30))} transform={`rotate(${i * 60 + f * 3} 960 570)`} />)}
        <line x1={760} y1={370} x2={1160} y2={770} stroke={VERMELHO} strokeWidth={14} opacity={prog(f, 26, 32)} />
      </svg>
      <Tit t="EM ALGUMAS, NEM ÁTOMOS" s={84} />
      <Etq t="ANIMAÇÃO" />
    </Fundo>
  );
};
// 42. real: outro mundo, completamente diferente (penhascos de Carina, Webb)
const MundoDiferente: React.FC = () => (
  <F src="penhascos.jpg" etq="IMAGEM REAL · PENHASCOS CÓSMICOS · WEBB · NASA/ESA/CSA" z={[1.0, 1.14]} filtro="hue-rotate(140deg) saturate(1.3)" t="NUM MUNDO COMPLETAMENTE DIFERENTE">
    <Sub y={790} s={36} cor="#cfd8e8">(CORES ALTERADAS PRA ILUSTRAR)</Sub>
  </F>
);
// 43. abrir a porta e dar de cara com um você de outro universo (estrelas de outra cor)
const PortaOutroUniverso: React.FC = () => {
  const f = useCurrentFrame();
  const ab = prog(f, 0, 30);
  const dentro = (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, #3aff9a, #0a3a2a 60%, #021008)'}}>
      {Array.from({length: 30}, (_, i) => <div key={i} style={{position: 'absolute', left: random('pu' + i) * 520, top: random('pv' + i) * 400, width: 8, height: 8, borderRadius: 4, background: ROSA, boxShadow: `0 0 12px ${ROSA}`}} />)}
      <svg width={520} height={860} style={{position: 'absolute', inset: 0}}><Pessoa x={260} y={860} h={520} cor="#0a1a10" /></svg>
    </AbsoluteFill>
  );
  return (
    <AbsoluteFill style={{background: '#0a0808'}}>
      <Porta x={700} y={170} w={520} h={860} ab={ab} luz="#3aff9a" dentro={dentro} />
      <Sub y={60} s={44} cor="#3aff9a">ONDE AS ESTRELAS QUEIMAM DE OUTRO JEITO</Sub>
      <Etq t="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};
// 44. seria você? interrogação com glitch
const SeriaVoce: React.FC = () => {
  const f = useCurrentFrame();
  const g = f % 9 < 2;
  return (
    <AbsoluteFill style={{background: '#06040a', transform: g ? shake(f, 20) : undefined}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <Busto x={g ? 980 : 960} y={1000} h={760} cor={g ? '#3aff9a' : '#2a2a3a'} />
      </svg>
      <div style={{position: 'absolute', top: 260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 380, color: OURO, textShadow: '0 0 40px #000'}}>?</div>
      <Tit t="SERIA VOCÊ?" s={96} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 45. teoria das cordas: cordas vibrando e 10^500
const Cordas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #102018, #020604 75%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}, (_, i) => {
          const pts = Array.from({length: 120}, (_, k) => `${200 + k * 13.5},${300 + i * 80 + Math.sin(k * (0.1 + i * 0.03) + f * 0.25) * (20 + i * 4)}`).join(' ');
          return <polyline key={i} points={pts} fill="none" stroke={VERDE} strokeWidth={4} opacity={0.35 + i * 0.08} />;
        })}
      </svg>
      <div style={{position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 220, color: '#fff', textShadow: '0 0 40px #000'}}>10<sup style={{fontSize: '0.5em'}}>500</sup></div>
      <Tit t="TIPOS DE UNIVERSO POSSÍVEIS" s={76} />
      <Etq t="TEORIA DAS CORDAS · ORDEM DE GRANDEZA" />
    </AbsoluteFill>
  );
};
// 46. estimativa discutida: balões de debate
const Discutida: React.FC = () => {
  const balao = (x: number, y: number, t: string, c: string, d: number) => {
    const s = useSpring(d);
    return <div style={{position: 'absolute', left: x, top: y, padding: '30px 44px', borderRadius: 40, background: c, fontFamily: FONTE, fontSize: 50, color: '#111', opacity: s, transform: `scale(${s})`}}>{t}</div>;
  };
  return (
    <AbsoluteFill style={{background: '#20242c'}}>
      {balao(260, 340, 'SÃO 10^500!', CIANO, 2)}
      {balao(1060, 450, 'DE ONDE SAIU ISSO?', OURO, 10)}
      {balao(420, 620, 'É SÓ UMA ESTIMATIVA', ROSA, 18)}
      <Tit t="ESTIMATIVA DISCUTIDA" s={86} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 47. possível ≠ existe
const PossivelExiste: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(10, {damping: 8, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#f2f2f2'}}>
      <div style={{position: 'absolute', top: 430, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: '#111'}}>
        POSSÍVEL <span style={{color: VERMELHO, display: 'inline-block', transform: `scale(${s}) rotate(${(1 - s) * 90}deg)`}}>≠</span> EXISTE
      </div>
      <Etq t="ESQUEMA" />
      <div style={{position: 'absolute', bottom: 0, left: 0, height: 10, width: `${prog(f, 0, 60) * 100}%`, background: VERMELHO}} />
    </AbsoluteFill>
  );
};
// 48. Alan Guth: as bolhas não dá pra observar (telescópio diante de um muro)
const Guth: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a0c14,#14101c)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(420 760) rotate(-18)"><rect x={0} y={-50} width={420} height={100} rx={20} fill="#c8ccd8" /><rect x={400} y={-70} width={60} height={140} rx={10} fill="#8a8e9a" /></g>
        <line x1={420} y1={760} x2={360} y2={960} stroke="#8a8e9a" strokeWidth={14} /><line x1={420} y1={760} x2={500} y2={960} stroke="#8a8e9a" strokeWidth={14} />
        <rect x={1100} y={260} width={70} height={760} fill="#3a3040" />
        {Array.from({length: 5}, (_, i) => <circle key={i} cx={1400 + (i % 2) * 220} cy={360 + i * 140} r={70 + Math.sin(f * 0.1 + i) * 8} fill="none" stroke={ROSA} strokeWidth={4} opacity={0.35} />)}
      </svg>
      <div style={{position: 'absolute', left: 140, top: 270, width: 880, fontFamily: FONTE}}>
        <div style={{fontSize: 40, color: OURO}}>ALAN GUTH · CRIADOR DA INFLAÇÃO</div>
        <div style={{fontSize: 64, color: '#fff', marginTop: 16, lineHeight: 1.1}}>“ESSAS BOLHAS NÃO DÁ PRA OBSERVAR”</div>
      </div>
      <Etq t="ILUSTRAÇÃO · SEM RETRATO" />
    </AbsoluteFill>
  );
};

// ================= ALGUÉM JÁ VIU UMA BOLHA? (FATO) =================
// 49. e se uma bolha batesse na nossa
const Colisao: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 40], [1700, 1270], {...clamp, easing: Easing.in(Easing.quad)});
  const toque = f > 40;
  return (
    <AbsoluteFill style={{background: '#04040c', transform: toque && f < 52 ? shake(f, 14) : undefined}}>
      <Bolha x={760} y={560} r={360} cor={CIANO} />
      <Bolha x={x} y={500} r={180} cor={ROSA} />
      {toque && <div style={{position: 'absolute', left: 1100 - 80, top: 520 - 80, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,#fff,transparent 70%)', opacity: interpolate(f, [40, 60], [1, 0.3], clamp)}} />}
      <Tit t="E SE UMA BOLHA BATESSE NA NOSSA?" s={76} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// 50. real: a luz mais antiga (mapa do Planck)
const LuzAntiga: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img('planck.jpg')} style={{position: 'absolute', left: 0, top: 60, width: 1920, height: 1080, objectFit: 'contain', transform: `scale(${interpolate(f, [0, 120], [1.0, 1.08], clamp)})`}} />
      <Tit t="A LUZ MAIS ANTIGA DO UNIVERSO" s={74} />
      <Sub y={820} s={34} cor="#cfd8e8">RADIAÇÃO CÓSMICA DE FUNDO · O QUE SOBROU DO COMEÇO</Sub>
      <Etq t="IMAGEM REAL · MAPA DO PLANCK · ESA/NASA" real />
    </AbsoluteFill>
  );
};
// 51. o satélite WMAP (concepção artística da NASA)
const SondaWmap: React.FC = () => (
  <F src="wmap_sonda.jpg" etq="ILUSTRAÇÃO DA NASA · SATÉLITE WMAP" z={[1.0, 1.15]} t="EM 2011: OS DADOS DO WMAP">
    <Sub y={790} s={40} cor={OURO}>UMA EQUIPE PROCUROU MARCAS DE BATIDAS</Sub>
  </F>
);
// 52. real: o mapa do WMAP com a busca por círculos
const BuscaWmap: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Img src={img('wmap_mapa.jpg')} style={{position: 'absolute', left: 560, top: 140, width: 800, height: 800}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 5}, (_, i) => { const k = Math.floor(f / 14) + i; return <circle key={i} cx={620 + random('bx' + k) * 680} cy={200 + random('by' + k) * 680} r={60 + random('br' + k) * 50}
          fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="10 8" opacity={0.8} />; })}
      </svg>
      <Caixa t="NÃO ENCONTROU NENHUMA" cor={VERMELHO} x={1400} y={480} s={40} d={20} />
      <div style={{position: 'absolute', left: 60, top: 470, width: 460, fontFamily: FONTE, fontSize: 34, color: '#cfd8e8'}}>FEENEY E OUTROS, 2011</div>
      <Etq t="IMAGEM REAL · DADOS DO WMAP · NASA (CORTE)" real />
    </AbsoluteFill>
  );
};
// 53. real: a Mancha Fria no mapa do Planck
const ManchaFria: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 90], [0.82, 0.92], clamp);
  const cx = 0.75 * 1920, cy = 0.83 * (1920 * 966 / 1852);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: -90, width: 1920, height: 1001, transformOrigin: '50% 50%', transform: `scale(${z})`}}>
        <Img src={img('planck_anomalias.jpg')} style={{width: 1920, height: 1001}} />
        <svg width={1920} height={1001} style={{position: 'absolute', inset: 0}}><circle cx={cx} cy={cy} r={70} fill="none" stroke="#fff" strokeWidth={5} opacity={prog(f, 30, 45)} /></svg>
      </div>
      <Caixa t="MANCHA FRIA" cor="#fff" x={1480} y={540} s={46} d={34} />
      <Etq t="IMAGEM REAL · PLANCK (ESCALAS GRANDES) · ESA/NASA" real />
    </AbsoluteFill>
  );
};
// 54. ninguém explicou direito: termômetro com interrogação
const SemExplicacao: React.FC = () => {
  const f = useCurrentFrame();
  const n = interpolate(f, [0, 40], [0.8, 0.3], clamp);
  return (
    <Fundo c="#0a1a2a">
      <div style={{position: 'absolute', left: 900, top: 240, width: 120, height: 600, borderRadius: 60, background: '#e8eef4', border: '8px solid #8a96a4'}}>
        <div style={{position: 'absolute', bottom: 20, left: 30, width: 44, height: 560 * n, borderRadius: 22, background: CIANO}} />
      </div>
      <div style={{position: 'absolute', left: 1120, top: 330, fontFamily: FONTE, fontSize: 280, color: OURO}}>?</div>
      <Tit t="ATÉ HOJE, NINGUÉM EXPLICOU DIREITO" s={70} />
      <Sub y={790} s={36} cor="#cfd8e8">UM “SUPERVAZIO” EXPLICA SÓ UMA PARTE</Sub>
      <Etq t="ESQUEMA" />
    </Fundo>
  );
};
// 55. a cicatriz de uma batida: amassado numa esfera
const CicatrizBatida: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 30);
  return (
    <Fundo c="#101830">
      <div style={{position: 'absolute', left: 560, top: 180, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #ffd8a0, #e07a30 45%, #4a90c0 80%)'}} />
      <div style={{position: 'absolute', left: 1080, top: 560, width: 220 * p, height: 220 * p, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, #1a4aa0, #4a90c0 60%, transparent 72%)', boxShadow: 'inset 0 0 30px #002'}} />
      <Tit t="A CICATRIZ DE OUTRO UNIVERSO?" s={78} />
      <Etq t="ANIMAÇÃO · HIPÓTESE DE POUCOS" />
    </Fundo>
  );
};
// 56. hipótese de poucos: uma multidão de pontos, poucos acesos
const DePoucos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0c0c10'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 24 * 10}, (_, i) => {
          const poucos = [37, 122, 201].includes(i);
          return <circle key={i} cx={180 + (i % 24) * 68} cy={330 + Math.floor(i / 24) * 66} r={16} fill={poucos && f > 10 ? OURO : '#3a3e4a'} />;
        })}
      </svg>
      <Tit t="UMA HIPÓTESE DE POUCOS" s={86} />
      <Etq t="ESQUEMA (FORA DE ESCALA)" />
    </AbsoluteFill>
  );
};
// 57. a mancha continua sem explicação (ilustração da NASA da história do universo)
const Continua: React.FC = () => (
  <F src="wmap_evolui.jpg" etq="ILUSTRAÇÃO DA NASA · LINHA DO TEMPO DO UNIVERSO" z={[1.15, 1.0]} t="A MANCHA CONTINUA SEM EXPLICAÇÃO" s={72} />
);

// ================= NÍVEL III (INTERPRETAÇÃO) =================
// 58. aqui, no mesmo lugar: duas silhuetas sobrepostas
const Sobreposta: React.FC = () => {
  const f = useCurrentFrame();
  const d = 30 * Math.sin(f * 0.08);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a0a14,#14141e)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, mixBlendMode: 'screen'}}>
        <Pessoa x={960 - d} y={1000} h={700} cor="#30a0ff" op={0.7} /><Pessoa x={960 + d} y={1000} h={700} cor="#ff6040" op={0.7} />
      </svg>
      <Tit t="ESTÁ AQUI. NO MESMO LUGAR" s={84} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 59. você nunca vai conseguir ver: estática
const Estatica: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <filter id="est"><feTurbulence type="fractalNoise" baseFrequency={0.8} numOctaves={2} seed={f % 20} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#est)" opacity={0.5} />
      </svg>
      <div style={{position: 'absolute', top: 460, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 110, color: '#fff', textShadow: '0 0 30px #000'}}>SINAL NÃO ENCONTRADO</div>
      <Tit t="SÓ QUE VOCÊ NUNCA VAI VER" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 60. Everett, 1957: máquina de escrever
const Everett: React.FC = () => {
  const f = useCurrentFrame();
  const txt = 'HUGH EVERETT · 1957 · REVIEWS OF MODERN PHYSICS';
  const n = Math.floor(interpolate(f, [4, 60], [0, txt.length], clamp));
  return (
    <AbsoluteFill style={{background: '#2a2018'}}>
      <div style={{position: 'absolute', left: 360, top: 200, width: 1200, height: 700, background: '#f4ecd8', boxShadow: '0 30px 60px rgba(0,0,0,.6)', padding: 80, boxSizing: 'border-box'}}>
        <div style={{fontFamily: 'Courier New, monospace', fontSize: 52, color: '#1a1a1a', lineHeight: 1.4}}>{txt.slice(0, n)}<span style={{opacity: f % 16 < 8 ? 1 : 0}}>▌</span></div>
        <div style={{fontFamily: 'Courier New, monospace', fontSize: 34, color: '#5a5040', marginTop: 50, opacity: prog(f, 60, 70)}}>UM JOVEM FÍSICO, AINDA NO DOUTORADO</div>
      </div>
      <Etq t="ILUSTRAÇÃO · SEM RETRATO" />
    </AbsoluteFill>
  );
};
// 61. uma partícula em dois estados
const DoisEstados: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#101830">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={960} y1={300} x2={660} y2={760} stroke="#3a4a66" strokeWidth={4} strokeDasharray="10 10" /><line x1={960} y1={300} x2={1260} y2={760} stroke="#3a4a66" strokeWidth={4} strokeDasharray="10 10" />
        <circle cx={660} cy={760} r={46} fill={CIANO} opacity={0.5 + 0.5 * Math.sin(f * 0.3)} style={{filter: `drop-shadow(0 0 20px ${CIANO})`}} />
        <circle cx={1260} cy={760} r={46} fill={OURO} opacity={0.5 + 0.5 * Math.cos(f * 0.3)} style={{filter: `drop-shadow(0 0 20px ${OURO})`}} />
        <circle cx={960} cy={300} r={22} fill="#fff" />
      </svg>
      <div style={{position: 'absolute', left: 560, width: 200, top: 840, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: CIANO}}>ESTADO A</div>
      <div style={{position: 'absolute', left: 1160, width: 200, top: 840, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: OURO}}>ESTADO B</div>
      <Tit t="ELA NÃO ESCOLHE UM" s={84} />
      <Etq t="ANIMAÇÃO" />
    </Fundo>
  );
};
// 62. a realidade se divide em ramos: 1 → 2 → 4
const Ramos: React.FC = () => {
  const f = useCurrentFrame();
  const n1 = prog(f, 4, 20), n2 = prog(f, 20, 40);
  const L = (x1: number, y1: number, x2: number, y2: number, p: number, c: string) => <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={c} strokeWidth={14} strokeLinecap="round" />;
  return (
    <AbsoluteFill style={{background: '#06080e'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {L(200, 600, 700, 600, 1, '#fff')}
        {L(700, 600, 1200, 380, n1, CIANO)}{L(700, 600, 1200, 820, n1, OURO)}
        {L(1200, 380, 1720, 280, n2, CIANO)}{L(1200, 380, 1720, 480, n2, '#7ad8ff')}{L(1200, 820, 1720, 720, n2, OURO)}{L(1200, 820, 1720, 920, n2, '#ffb84a')}
      </svg>
      <Tit t="A REALIDADE SE DIVIDE EM RAMOS" s={78} />
      <Etq t="ANIMAÇÃO · INTERPRETAÇÃO" />
    </AbsoluteFill>
  );
};
// 63. quase ninguém deu atenção: pasta na gaveta
const Gaveta: React.FC = () => {
  const f = useCurrentFrame();
  const y = interpolate(f, [10, 40], [0, 360], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#1a140e'}}>
      <div style={{position: 'absolute', left: 660, top: 200 + y, width: 600, height: 400, background: '#d8b870', borderRadius: '0 20px 8px 8px', boxShadow: '0 20px 40px rgba(0,0,0,.6)', zIndex: 1}}>
        <div style={{margin: 50, fontFamily: FONTE, fontSize: 44, color: '#3a2a10'}}>EVERETT, 1957</div>
      </div>
      <div style={{position: 'absolute', left: 560, top: 640, width: 800, height: 440, background: '#3a2a1a', border: '10px solid #2a1a0e', zIndex: 2}}>
        <div style={{margin: '60px auto', width: 160, height: 30, borderRadius: 15, background: '#8a7a5a'}} />
      </div>
      <Tit t="QUASE NINGUÉM DEU ATENÇÃO" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 64. 1970: o nome "muitos mundos" vira manchete
const Manchete1970: React.FC = () => {
  const s = useSpring(4, {damping: 10, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#202020'}}>
      <div style={{position: 'absolute', left: 300, top: 180, width: 1320, height: 760, background: '#efe9dc', transform: `rotate(${(1 - s) * 30}deg) scale(${0.3 + 0.7 * s})`, padding: 60, boxSizing: 'border-box'}}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 40, color: '#333', borderBottom: '4px solid #333', paddingBottom: 14}}>1970</div>
        <div style={{fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: 120, color: '#111', marginTop: 40, lineHeight: 1}}>MUITOS MUNDOS</div>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 40, color: '#444', marginTop: 40}}>O nome popularizado por Bryce DeWitt</div>
      </div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 65. Sean Carroll: capa de livro genérica
const Carroll: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2a40, #08080e 75%)'}}>
      <div style={{position: 'absolute', left: 760, top: 160, width: 400, height: 600, background: 'linear-gradient(160deg,#0a2a4a,#04101e)', borderRadius: 8, boxShadow: '30px 30px 60px rgba(0,0,0,.6)',
        transform: `perspective(1200px) rotateY(${-25 + Math.sin(f * 0.03) * 8}deg)`, padding: 40, boxSizing: 'border-box', fontFamily: FONTE}}>
        <div style={{fontSize: 40, color: OURO}}>SEAN CARROLL</div>
        <div style={{fontSize: 34, color: '#fff', marginTop: 260, lineHeight: 1.15}}>ALGO PROFUNDAMENTE ESCONDIDO</div>
        <div style={{fontSize: 26, color: '#9ab', marginTop: 20}}>2019</div>
      </div>
      <Sub y={790} s={44} cor="#fff">“TODOS OS RESULTADOS ACONTECEM, CADA UM NO SEU RAMO”</Sub>
      <Etq t="ILUSTRAÇÃO · SEM CAPA REAL" />
    </AbsoluteFill>
  );
};
// 66. cada vez que uma partícula tem dois caminhos: árvore que não para de ramificar
const Arvore: React.FC = () => {
  const f = useCurrentFrame();
  const nivel = Math.min(7, Math.floor(f / 8) + 1);
  const linhas: React.ReactNode[] = [];
  const ramo = (x: number, y: number, a: number, len: number, d: number, id: string) => {
    if (d > nivel) return;
    const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
    linhas.push(<line key={id} x1={x} y1={y} x2={x2} y2={y2} stroke={d % 2 ? CIANO : OURO} strokeWidth={Math.max(2, 12 - d * 1.5)} strokeLinecap="round" />);
    ramo(x2, y2, a - 0.42, len * 0.75, d + 1, id + 'a'); ramo(x2, y2, a + 0.42, len * 0.75, d + 1, id + 'b');
  };
  ramo(960, 1040, -Math.PI / 2, 230, 1, 'r');
  return (
    <AbsoluteFill style={{background: '#04060a'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{linhas}</svg>
      <Tit t="DOIS CAMINHOS, DOIS RAMOS" s={80} />
      <Etq t="ANIMAÇÃO · INTERPRETAÇÃO" />
    </AbsoluteFill>
  );
};
// 67. um você que viu a outra possibilidade: moeda que cai cara e coroa
const Moeda: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 30, Easing.out(Easing.cubic));
  const M = ({x, t, c}: {x: number; t: string; c: string}) => (
    <div style={{position: 'absolute', left: x - 140, top: 380 - 200 * (1 - p), width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff6c0, ${c})`,
      border: '10px solid #a07a20', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: FONTE, fontSize: 60, color: '#3a2a00', transform: `rotateX(${(1 - p) * 720}deg)`}}>{t}</div>
  );
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg,#0c1a2a 50%,#2a1a0c 50%)'}}>
      <M x={560} t="CARA" c={OURO} /><M x={1360} t="COROA" c="#e0b040" />
      <Sub y={760} s={44} cor="#fff">UM VOCÊ VÊ CARA. OUTRO VOCÊ VÊ COROA.</Sub>
      <Etq t="ILUSTRAÇÃO · INTERPRETAÇÃO" />
    </AbsoluteFill>
  );
};
// 68. não é cada decisão: frase riscada
const NaoDecisao: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 12, 26);
  return (
    <AbsoluteFill style={{background: '#16121a'}}>
      <div style={{position: 'absolute', top: 400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 84, color: '#cfd2da'}}>
        <span style={{position: 'relative'}}>CADA DECISÃO SUA CRIA UM UNIVERSO
          <span style={{position: 'absolute', left: 0, top: '50%', height: 14, width: `${p * 100}%`, background: VERMELHO, transform: 'rotate(-2deg)'}} /></span>
      </div>
      <Caixa t="NÃO É ASSIM" cor={VERMELHO} y={600} s={70} d={26} rot={-4} />
      <Tit t="MAS ATENÇÃO" s={84} />
      <Etq t="ERRO COMUM" />
    </AbsoluteFill>
  );
};
// 69. a divisão vem das interações entre partículas
const Interacoes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#0c1420">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 26}, (_, i) => {
          const a = random('ia' + i) * Math.PI * 2, v = 2 + random('iv' + i) * 5;
          const x = 960 + Math.cos(a) * ((f * v + random('id' + i) * 600) % 700), y = 560 + Math.sin(a) * ((f * v + random('id' + i) * 600) % 400);
          return <circle key={i} cx={x} cy={y} r={14} fill={i % 2 ? CIANO : OURO} />;
        })}
        <circle cx={960} cy={560} r={60 + 10 * Math.sin(f * 0.4)} fill="none" stroke="#fff" strokeWidth={4} />
      </svg>
      <Tit t="VEM DAS INTERAÇÕES ENTRE PARTÍCULAS" s={70} />
      <Sub y={800} s={40} cor={OURO}>NÃO DA SUA ESCOLHA</Sub>
      <Etq t="ANIMAÇÃO" />
    </Fundo>
  );
};
// 70. é uma interpretação: lupa
const Lupa: React.FC = () => {
  const f = useCurrentFrame();
  const x = 700 + Math.sin(f * 0.05) * 300;
  return (
    <AbsoluteFill style={{background: '#efe9dc'}}>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#2a2a2a'}}>INTERPRETAÇÃO</div>
      <div style={{position: 'absolute', left: x, top: 330, width: 340, height: 340, borderRadius: '50%', border: '22px solid #3a2a1a', background: 'rgba(200,230,255,.25)', boxShadow: 'inset 0 0 30px rgba(255,255,255,.6)'}} />
      <div style={{position: 'absolute', left: x + 280, top: 640, width: 50, height: 260, background: '#3a2a1a', borderRadius: 20, transform: 'rotate(-45deg)', transformOrigin: 'top'}} />
      <Tit t="E TEM UM DETALHE" cor="#1a1a1a" s={84} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 71. as mesmas previsões: dois gráficos idênticos
const Previsoes: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 40);
  const G = ({x, c, t}: {x: number; c: string; t: string}) => {
    const pts = Array.from({length: 60}, (_, i) => `${x + i * 11},${760 - Math.exp(-((i - 30) ** 2) / 90) * 380}`).slice(0, Math.max(2, Math.floor(60 * p))).join(' ');
    return <g><rect x={x - 30} y={300} width={720} height={520} fill="rgba(255,255,255,.04)" stroke="#3a4050" strokeWidth={3} /><polyline points={pts} fill="none" stroke={c} strokeWidth={8} />
      <text x={x + 330} y={870} textAnchor="middle" fontFamily={FONTE} fontSize={36} fill={c}>{t}</text></g>;
  };
  return (
    <AbsoluteFill style={{background: '#0c0e14'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><G x={190} c={CIANO} t="MUITOS MUNDOS" /><G x={1050} c={OURO} t="OUTRAS INTERPRETAÇÕES" /></svg>
      <Tit t="AS MESMAS PREVISÕES" s={86} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
// 72. nenhum teste separa: balança equilibrada
const NenhumTeste: React.FC = () => {
  const f = useCurrentFrame();
  const a = Math.sin(f * 0.12) * 3 * Math.exp(-f / 60);
  return (
    <Fundo c="#1a1a10">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <rect x={950} y={360} width={20} height={520} fill="#c8a040" /><rect x={820} y={870} width={280} height={30} rx={10} fill="#c8a040" />
        <g transform={`rotate(${a} 960 380)`}>
          <rect x={520} y={370} width={880} height={18} fill="#e0c060" />
          <path d="M560 388 L480 600 L720 600 L640 388" fill="none" stroke="#e0c060" strokeWidth={4} /><ellipse cx={600} cy={600} rx={130} ry={24} fill="#e0c060" />
          <path d="M1280 388 L1200 600 L1440 600 L1360 388" fill="none" stroke="#e0c060" strokeWidth={4} /><ellipse cx={1320} cy={600} rx={130} ry={24} fill="#e0c060" />
          <text x={600} y={560} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill={CIANO}>MUITOS MUNDOS</text>
          <text x={1320} y={560} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill={OURO}>AS OUTRAS</text>
        </g>
      </svg>
      <Tit t="NENHUM TESTE SEPARA UMA DA OUTRA" s={74} />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};

// ================= O CHIP DO GOOGLE (HIPÓTESE CONTESTADA) =================
// 73. o chip Willow (ilustração)
const Chip: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #102030, #020408 75%)'}}>
      <div style={{position: 'absolute', left: 660, top: 220, width: 600, height: 600, borderRadius: 30, background: 'linear-gradient(135deg,#2a3a4a,#0e161e)', border: '6px solid #6a8aa0',
        transform: `perspective(1400px) rotateX(${20 + Math.sin(f * 0.03) * 6}deg) rotateZ(${f * 0.2}deg)`}}>
        {Array.from({length: 64}, (_, i) => <div key={i} style={{position: 'absolute', left: 60 + (i % 8) * 62, top: 60 + Math.floor(i / 8) * 62, width: 30, height: 30, borderRadius: 6,
          background: (i + Math.floor(f / 6)) % 7 === 0 ? CIANO : '#3a5060', boxShadow: (i + Math.floor(f / 6)) % 7 === 0 ? `0 0 16px ${CIANO}` : undefined}} />)}
      </div>
      <Tit t="DEZEMBRO DE 2024: WILLOW" s={80} />
      <Sub y={800} s={40} cor="#cfd8e8">CHIP QUÂNTICO DO GOOGLE</Sub>
      <Etq t="ILUSTRAÇÃO · NÃO É FOTO DO CHIP" />
    </AbsoluteFill>
  );
};
// 74. o post do chefe do projeto
const Post: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: '#e8eaee'}}>
      <div style={{position: 'absolute', left: 400, top: 230, width: 1120, padding: 60, borderRadius: 24, background: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,.15)', opacity: s, transform: `translateY(${(1 - s) * 60}px)`}}>
        <div style={{fontFamily: FONTE, fontSize: 32, color: '#5a6070'}}>HARTMUT NEVEN · BLOG DO GOOGLE · 09/12/2024</div>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 54, color: '#111', marginTop: 30, lineHeight: 1.3}}>“…dá força à ideia de que a computação quântica acontece em <span style={{background: '#ffe680'}}>muitos universos paralelos</span>”</div>
      </div>
      <Etq t="ILUSTRAÇÃO · CITAÇÃO TRADUZIDA" />
    </AbsoluteFill>
  );
};
// 75. a internet explodiu: notificações voando
const Explodiu: React.FC = () => {
  const f = useCurrentFrame();
  const txt = ['UNIVERSOS PARALELOS?!', 'GOOGLE PROVA MULTIVERSO?', 'O CHIP DOS MUNDOS', 'COMPARTILHE!!!', 'É O FIM DA FÍSICA?', 'MULTIVERSO REAL?'];
  return (
    <AbsoluteFill style={{background: '#101014', overflow: 'hidden'}}>
      {Array.from({length: 14}, (_, i) => {
        const k = f - i * 3; if (k < 0) return null;
        return <div key={i} style={{position: 'absolute', left: random('ex' + i) * 1400, top: 220 + random('ey' + i) * 700, padding: '18px 30px', borderRadius: 18, background: '#2a2c34',
          fontFamily: FONTE, fontSize: 36, color: '#fff', filter: 'blur(2px)', transform: `scale(${Math.min(1, k / 6)})`, opacity: 0.9}}>🔔 {txt[i % txt.length]}</div>;
      })}
      <Tit t="A INTERNET EXPLODIU" s={96} />
      <Etq t="ILUSTRAÇÃO · MANCHETES INVENTADAS" />
    </AbsoluteFill>
  );
};
// 76. o feito real: correção de erros
const CorrecaoErros: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#06120a'}}>
      {Array.from({length: 10 * 6}, (_, i) => {
        const erro = random('er' + i) < 0.18;
        const ok = f > 14 + random('eo' + i) * 30;
        return <div key={i} style={{position: 'absolute', left: 360 + (i % 10) * 124, top: 300 + Math.floor(i / 10) * 100, width: 80, height: 70, borderRadius: 10,
          background: erro && !ok ? VERMELHO : VERDE, opacity: 0.85, fontFamily: FONTE, fontSize: 40, color: '#04120a', textAlign: 'center', lineHeight: '70px'}}>{erro && !ok ? '✕' : '✓'}</div>;
      })}
      <Tit t="O FEITO REAL: CORRIGIR ERROS" s={80} />
      <Etq t="ESQUEMA · PUBLICADO NA NATURE" />
    </AbsoluteFill>
  );
};
// 77. vários físicos responderam: microfones
const Responderam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#1a1012'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => <g key={i} transform={`translate(${520 + i * 440} ${700 - Math.max(0, Math.sin(f * 0.3 + i * 2)) * 20})`}>
          <rect x={-50} y={-260} width={100} height={170} rx={50} fill="#4a4e5a" /><rect x={-8} y={-90} width={16} height={260} fill="#2a2e3a" />
        </g>)}
      </svg>
      <Caixa t="“NÃO É BEM ASSIM”" cor={OURO} y={330} s={72} d={8} />
      <Tit t="VÁRIOS FÍSICOS RESPONDERAM" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 78. espaço da matemática ≠ universos de verdade
const EspacoMat: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a0a12'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(520 640)">
          <line x1={0} y1={0} x2={300} y2={0} stroke="#fff" strokeWidth={5} /><line x1={0} y1={0} x2={0} y2={-300} stroke="#fff" strokeWidth={5} /><line x1={0} y1={0} x2={-200} y2={160} stroke="#fff" strokeWidth={5} />
          <line x1={0} y1={0} x2={220 * Math.cos(f * 0.05)} y2={-220 * Math.abs(Math.sin(f * 0.05)) - 40} stroke={CIANO} strokeWidth={8} />
        </g>
      </svg>
      <Bolha x={1400} y={560} r={180} cor={ROSA} brilho={false} />
      <div style={{position: 'absolute', left: 860, top: 470, fontFamily: FONTE, fontSize: 160, color: VERMELHO}}>≠</div>
      <div style={{position: 'absolute', left: 300, top: 860, width: 500, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: CIANO}}>ESPAÇO DA MATEMÁTICA</div>
      <div style={{position: 'absolute', left: 1150, top: 860, width: 500, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: ROSA}}>UNIVERSOS DE VERDADE</div>
      <Tit t="ELE CONFUNDIU AS DUAS COISAS" s={80} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
// 79. Tegmark: o nível III não acrescenta nada de novo
const NadaNovo: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: '#1a1408'}}>
      <div style={{position: 'absolute', left: 260, top: 300, fontFamily: 'Georgia, serif', fontSize: 340, color: OURO, opacity: 0.4, lineHeight: 1}}>“</div>
      <div style={{position: 'absolute', left: 400, right: 300, top: 380, fontFamily: 'Georgia, serif', fontSize: 64, color: '#fff', lineHeight: 1.3, opacity: s}}>O nível III não acrescenta nada de novo além dos níveis I e II.</div>
      <div style={{position: 'absolute', left: 400, top: 720, fontFamily: FONTE, fontSize: 40, color: OURO, opacity: s}}>— MAX TEGMARK, 2003</div>
      <Tit t="ATÉ TEGMARK" s={84} />
      <Etq t="CITAÇÃO TRADUZIDA" />
    </AbsoluteFill>
  );
};

// ================= NÍVEL IV (HIPÓTESE) =================
// 80. o mais radical: texto distorcido
const Radical: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      {[VERMELHO, CIANO, '#fff'].map((c, i) => <div key={i} style={{position: 'absolute', fontFamily: FONTE, fontSize: 170, color: c, mixBlendMode: i < 2 ? 'screen' : 'normal',
        transform: `translate(${i < 2 ? (i ? 1 : -1) * (6 + 6 * Math.sin(f * 0.7)) : 0}px, 0) skewX(${Math.sin(f * 0.2) * 6}deg)`}}>O MAIS RADICAL</div>)}
      <Etq t="NÍVEL IV" />
    </AbsoluteFill>
  );
};
// 81. toda estrutura matemática existe: equações flutuando que viram mundos
const EquacoesMundos: React.FC = () => {
  const f = useCurrentFrame();
  const eqs = ['E = mc²', 'x² + y² = 1', 'eⁱᵖ + 1 = 0', '∇·E = ρ/ε₀', 'F = ma', 'a² + b² = c²', 'ψ(x, t)', 'Σ 1/n²'];
  return (
    <AbsoluteFill style={{background: '#06060c'}}>
      {eqs.map((e, i) => {
        const k = prog(f, 10 + i * 5, 30 + i * 5);
        const x = 160 + (i % 4) * 430, y = 300 + Math.floor(i / 4) * 330 + Math.sin(f * 0.05 + i) * 20;
        return <React.Fragment key={i}>
          <div style={{position: 'absolute', left: x, top: y, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 52, color: '#fff', opacity: 1 - k}}>{e}</div>
          <Bolha x={x + 120} y={y + 30} r={90 * k} cor={[CIANO, OURO, ROSA, VERDE][i % 4]} brilho={false} />
        </React.Fragment>;
      })}
      <Tit t="TODA MATEMÁTICA SERIA UM UNIVERSO" s={74} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// 82. sem distância, nem espaço: vazio branco
const VazioBranco: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#fafafa'}}>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 60, color: '#bbb', letterSpacing: 20 + f * 0.6}}>SEM DISTÂNCIA · SEM ESPAÇO</div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 83. a cópia feita de outra matemática: silhueta de símbolos
const SilhuetaSimbolos: React.FC = () => {
  const f = useCurrentFrame();
  const simb = '∫∑∂√π∞≈≠∇λψΩθ';
  return (
    <AbsoluteFill style={{background: '#0a0612'}}>
      {Array.from({length: 260}, (_, i) => {
        const t = random('sa' + i) * Math.PI * 2, r = Math.sqrt(random('sr' + i));
        const [x, y] = i < 70 ? [Math.cos(t) * r * 75, -330 + Math.sin(t) * r * 90] : [(random('sb' + i) - 0.5) * 320 * (1 - 0.4 * random('sc' + i)), -230 + random('sy' + i) * 560];
        return <div key={i} style={{position: 'absolute', left: 960 + x, top: 640 + y, fontFamily: 'Georgia, serif', fontSize: 30, color: i % 3 ? ROXO : CIANO, opacity: 0.6 + 0.4 * Math.sin(f * 0.2 + i)}}>{simb[(i + Math.floor(f / 5)) % simb.length]}</div>;
      })}
      <Tit t="UMA CÓPIA FEITA DE OUTRA MATEMÁTICA" s={70} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// 84. o nosso universo seria uma equação: equação → planeta
const EquacaoPlaneta: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 10, 50);
  return (
    <Fundo c="#101830">
      <div style={{position: 'absolute', top: 440, width: '100%', textAlign: 'center', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 110, color: '#fff', opacity: 1 - p, filter: `blur(${p * 10}px)`}}>
        G<sub>μν</sub> + Λg<sub>μν</sub> = 8πG T<sub>μν</sub></div>
      <div style={{position: 'absolute', left: 960 - 220, top: 300, width: 440, height: 440, borderRadius: '50%', opacity: p, transform: `scale(${0.4 + 0.6 * p})`,
        background: 'radial-gradient(circle at 35% 35%, #9fd4ff, #1a5ea8 60%, #0a2a50)', boxShadow: '0 0 80px rgba(120,190,255,.5)'}} />
      <Tit t="O NOSSO UNIVERSO SERIA UMA EQUAÇÃO" s={72} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </Fundo>
  );
};
// 85. e toda outra equação, um lugar real: galeria de mundos
const Galeria: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0e0e12'}}>
      {Array.from({length: 12}, (_, i) => {
        const s = prog(f, i * 3, i * 3 + 12, Easing.out(Easing.back(1.5)));
        const c1 = [CIANO, OURO, ROSA, VERDE, ROXO, '#ff9f43'][i % 6], c2 = [ROXO, VERDE, CIANO, ROSA, OURO, '#4a9fff'][i % 6];
        return <div key={i} style={{position: 'absolute', left: 190 + (i % 6) * 260, top: 320 + Math.floor(i / 6) * 300, width: 220, height: 260, background: '#1a1a22', border: '4px solid #3a3a48', transform: `scale(${s})`}}>
          <div style={{margin: '30px auto', width: 150, height: 150, borderRadius: i % 3 === 0 ? '20%' : '50%', background: `radial-gradient(circle at 35% 30%, ${c1}, ${c2})`}} />
          <div style={{textAlign: 'center', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 22, color: '#aaa'}}>{['x³ = 2', 'y = eˣ', 'n! ', 'φ = 1,618', 'sin θ', 'i² = −1'][i % 6]}</div>
        </div>;
      })}
      <Tit t="E TODA OUTRA EQUAÇÃO, UM LUGAR REAL" s={70} />
      <Etq t="ILUSTRAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// 86. sem teste: é filosofia (coluna grega)
const Filosofia: React.FC = () => {
  const s = useSpring(14, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#d8d0c0,#b0a890)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[560, 1360].map((x) => <g key={x}><rect x={x - 70} y={260} width={140} height={680} fill="#efe8da" />{[0, 1, 2, 3].map((k) => <line key={k} x1={x - 45 + k * 30} y1={280} x2={x - 45 + k * 30} y2={920} stroke="#c8c0b0" strokeWidth={6} />)}
          <rect x={x - 100} y={230} width={200} height={40} fill="#e0d8c8" /><rect x={x - 100} y={930} width={200} height={40} fill="#e0d8c8" /></g>)}
      </svg>
      <div style={{position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#5a4a30'}}>SEM TESTE NENHUM</div>
      <div style={{position: 'absolute', top: 520, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 140, color: '#2a1a0a', opacity: s, transform: `scale(${0.7 + 0.3 * s})`}}>FILOSOFIA</div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ================= MAS ESPERA… (a cor volta) =================
const MasEspera: React.FC = () => {
  const f = useCurrentFrame();
  const g = f < 9;
  return (
    <AbsoluteFill style={{background: NOITE, justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 7}, (_, i) => <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('my' + f + i) * 1080, height: 14 + random('mh' + i + f) * 50,
        background: i % 2 ? 'rgba(61,220,132,.35)' : 'rgba(255,210,63,.3)', transform: `translateX(${(random('mx' + i + f) - 0.5) * 300}px)`}} />)}
      <div style={{fontFamily: FONTE, fontSize: 190, color: VERDE}}>MAS ESPERA…</div>
    </AbsoluteFill>
  );
};
// 88. real: astronauta olhando pela janela da ISS (desconfiança)
const Desconfianca: React.FC = () => (
  <F src="janela_iss.jpg" etq="IMAGEM REAL · ASTRONAUTA NA CUPOLA DA ISS · NASA" z={[1.0, 1.1]} t="MUITOS CIENTISTAS DESCONFIAM" s={76} />
);
// 89. George Ellis: recorte de revista
const Ellis: React.FC = () => {
  const s = useSpring(2, {damping: 11, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#2a2a30'}}>
      <div style={{position: 'absolute', left: 340, top: 200, width: 1240, padding: '60px 70px', background: '#f6f2e8', transform: `rotate(${2 - 2 * s}deg) scale(${0.9 + 0.1 * s})`, boxShadow: '0 30px 70px rgba(0,0,0,.6)',
        clipPath: 'polygon(0 2%, 4% 0, 30% 2%, 60% 0, 96% 2%, 100% 0, 99% 96%, 100% 100%, 70% 98%, 30% 100%, 2% 98%, 0 100%)'}}>
        <div style={{fontFamily: FONTE, fontSize: 32, color: '#8a1a2a', letterSpacing: 4}}>GEORGE ELLIS · COSMÓLOGO · 2011</div>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 62, color: '#111', marginTop: 30, lineHeight: 1.25}}>“O multiverso não é realmente testável. É especulação filosófica, com base científica.”</div>
      </div>
      <Etq t="CITAÇÃO TRADUZIDA · SEM RETRATO" />
    </AbsoluteFill>
  );
};
// 90. Steinhardt: bilhete escrito à mão
const Steinhardt: React.FC = () => {
  const f = useCurrentFrame();
  const txt = 'Se uma teoria permite tudo, nenhum teste consegue derrubar.';
  const n = Math.floor(interpolate(f, [6, 70], [0, txt.length], clamp));
  return (
    <AbsoluteFill style={{background: '#3a3020'}}>
      <div style={{position: 'absolute', left: 460, top: 220, width: 1000, height: 640, background: '#fff8a8', transform: 'rotate(-3deg)', boxShadow: '0 20px 50px rgba(0,0,0,.5)', padding: 70, boxSizing: 'border-box'}}>
        <div style={{fontFamily: 'Comic Sans MS, cursive', fontSize: 64, color: '#1a2a6a', lineHeight: 1.3}}>{txt.slice(0, n)}</div>
        <div style={{position: 'absolute', bottom: 50, right: 60, fontFamily: FONTE, fontSize: 32, color: '#5a4a10'}}>PAUL STEINHARDT · UM DOS CRIADORES DA INFLAÇÃO</div>
      </div>
      <Etq t="ILUSTRAÇÃO · CITAÇÃO TRADUZIDA" />
    </AbsoluteFill>
  );
};
// 91. algumas versões podem ser testadas: checklist
const Testavel: React.FC = () => {
  const f = useCurrentFrame();
  const itens: [string, boolean][] = [['NÍVEL I · SÓ SE O ESPAÇO FOR INFINITO', false], ['NÍVEL II · BATIDA DE BOLHAS', true], ['NÍVEL III · MESMAS PREVISÕES', false], ['NÍVEL IV · SEM TESTE', false]];
  return (
    <AbsoluteFill style={{background: '#0c1410'}}>
      {itens.map(([t, ok], i) => {
        const s = prog(f, 4 + i * 6, 14 + i * 6);
        return <div key={i} style={{position: 'absolute', left: 340, top: 290 + i * 140, display: 'flex', alignItems: 'center', gap: 40, opacity: s, fontFamily: FONTE}}>
          <div style={{width: 80, height: 80, borderRadius: 14, border: `6px solid ${ok ? VERDE : '#5a6070'}`, color: VERDE, fontSize: 60, textAlign: 'center', lineHeight: '74px'}}>{ok && f > 40 ? '✓' : ''}</div>
          <div style={{fontSize: 48, color: ok ? VERDE : '#8a90a0'}}>{t}</div>
        </div>;
      })}
      <Tit t="TESTÁVEL, PELO MENOS EM PRINCÍPIO" s={74} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
// 92. uma batida deixaria marca no céu (marca circular hipotética)
const MarcaNoCeu: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1426, #02040a 75%)'}}>
      <Estrelas sem="mc" n={260} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => <circle key={i} cx={1180} cy={480} r={140 + i * 40 + Math.sin(f * 0.1) * 6} fill="none" stroke={OURO} strokeWidth={6 - i * 2} opacity={0.6 * prog(f, 4 + i * 6, 20 + i * 6)} />)}
      </svg>
      <Caixa t="SE EXISTIR" cor={OURO} x={1080} y={720} s={44} d={18} />
      <Tit t="UMA BATIDA DEIXARIA MARCA NO CÉU" s={74} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// 93. real: a fronteira (a Terra nascendo no horizonte da Lua)
const Fronteira: React.FC = () => (
  <F src="terra_nascer.jpg" etq="IMAGEM REAL · A TERRA NO HORIZONTE DA LUA · LRO · NASA" z={[1.0, 1.15]} pos="50% 40%" t="A FRONTEIRA ENTRE CIÊNCIA E IMAGINAÇÃO" s={68} />
);
// 94. a resposta honesta: duas colunas
const Honesta: React.FC = () => {
  const a = useSpring(6), b = useSpring(18);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg,#1a0a0a 50%,#0a1a0e 50%)'}}>
      <div style={{position: 'absolute', left: 0, width: 960, top: 420, textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: VERMELHO, opacity: a, transform: `scale(${0.7 + 0.3 * a})`}}>NINGUÉM VIU</div>
      <div style={{position: 'absolute', left: 960, width: 960, top: 420, textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: VERDE, opacity: b, transform: `scale(${0.7 + 0.3 * b})`}}>NINGUÉM DESCARTOU</div>
      <Tit t="A RESPOSTA HONESTA" s={86} />
    </AbsoluteFill>
  );
};
// 95. real: horizonte da Terra visto da ISS
const NinguemProvou: React.FC = () => (
  <F src="horizonte_iss.jpg" etq="IMAGEM REAL · HORIZONTE DA TERRA VISTO DA ISS · NASA" z={[1.12, 1.0]} t="NINGUÉM PROVOU QUE NÃO EXISTE" s={76} />
);
// 96. alguém bate na sua porta: a porta do gancho, agora fechada e vista de fora
const Batida: React.FC = () => {
  const f = useCurrentFrame();
  const bate = [10, 18, 26].some((t) => f >= t && f < t + 4);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0c0a10,#1a140e)'}}>
      <div style={{position: 'absolute', left: 500, top: 140, width: 440, height: 880, background: 'linear-gradient(90deg,#4a2e18,#5e3a1e)', border: '16px solid #1a1008', transform: bate ? shake(f, 8) : undefined}}>
        <div style={{position: 'absolute', left: 30, top: 440, width: 24, height: 24, borderRadius: 12, background: OURO}} />
      </div>
      <div style={{position: 'absolute', left: 500, top: 1010, width: 440, height: 10, background: '#fff6dc', boxShadow: '0 0 40px #fff6dc'}} />
      <div style={{position: 'absolute', left: 1080, top: 300, fontFamily: FONTE, fontSize: 56, color: '#fff', lineHeight: 1.3}}>DE QUAL NÍVEL<br />ELE VEIO?</div>
      <div style={{position: 'absolute', left: 1080, top: 500, display: 'flex', gap: 24}}>
        {['I', 'II', 'III', 'IV'].map((n, i) => <div key={n} style={{width: 120, height: 120, borderRadius: 20, border: `5px solid ${[CIANO, ROXO, VERDE, ROSA][i]}`, color: [CIANO, ROXO, VERDE, ROSA][i],
          fontFamily: FONTE, fontSize: 56, textAlign: 'center', lineHeight: '110px', opacity: prog(f, 30 + i * 8, 40 + i * 8)}}>{n}</div>)}
      </div>
      {bate && <div style={{position: 'absolute', left: 560, top: 380, fontFamily: FONTE, fontSize: 60, color: OURO, transform: 'rotate(-12deg)'}}>TOC</div>}
      <Etq t="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};

const Fim: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 110, color: '#fff', opacity: s, textAlign: 'center'}}>INSCREVA-SE</div>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 54, color: OURO, opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena (cada cena aparece uma vez só) ----------
const PLANO: [string, React.FC][][] = [
  [['voce abre a porta', AbrePorta], ['e do outro lado', OutroLado], ['mesmo rosto', Rosto], ['mesma voz', Voz], ['a mesma cicatriz', Cicatriz], ['parece filme', Filme],
    ['mas alguns fisicos', Serio], ['e dizem que esse outro', QuatroJeitos], ['nenhum outro universo foi visto', NadaVisto], ['mas as contas ja', Calculadora],
    ['e a cada jeito', MaisEstranha], ['vamos atras dela', Lanterna]],
  [['nivel um o jeito', Simples], ['em 2003 o cosmologo', Tegmark], ['se o espaco for infinito', CubosInfinitos], ['o numero de jeitos', Arranjos], ['mas tem limite', Limite],
    ['e num espaco sem fim', PadraoLonge], ['de novo e de novo', DeNovo], ['inclusive o arranjo', ArranjoVoce], ['quao longe', Regua], ['a estimativa dele', Estimativa],
    ['e la nao estaria', CopiaIgual], ['estariam tambem', QuaseIguais], ['o que mudou de cidade', Cidades], ['o que nunca conheceu', Amigos], ['se voce encontrasse', Gemeo]],
  [['so que voce nunca vai chegar', NuncaChega], ['tudo o que a gente consegue ver', Visivel], ['alem disso a luz', LuzNaoChegou], ['e a sua copia estaria', Zeros],
    ['ela pode existir', PodeExistir], ['mas se existir nunca', NuncaSabe], ['e voce nunca vai saber dela', NemVoce]],
  [['nivel dois aqui', OutraBolha], ['nos anos 1980', TresNomes], ['o nascimento do universo', Nascimentos], ['ele continuaria acontecendo', Espuma], ['cada bolha um universo', NebulosaBolha],
    ['e cada uma poderia', Leis], ['em algumas nem existiriam', SemAtomos], ['em outras poderia existir', MundoDiferente], ['imagina abrir a porta', PortaOutroUniverso],
    ['seria voce', SeriaVoce], ['a teoria das cordas', Cordas], ['e uma estimativa discutida', Discutida], ['e possivel nao quer', PossivelExiste], ['o proprio alan guth', Guth]],
  [['mas e se uma bolha', Colisao], ['ela deixaria uma marca', LuzAntiga], ['em 2011 uma equipe', SondaWmap], ['nao encontrou nenhuma', BuscaWmap], ['e existe uma mancha', ManchaFria],
    ['ate hoje ninguem', SemExplicacao], ['alguns sugeriram', CicatrizBatida], ['mas e uma hipotese de poucos', DePoucos], ['a mancha continua', Continua]],
  [['nivel tres agora', Sobreposta], ['so que voce nunca vai conseguir', Estatica], ['em 1957 um jovem', Everett], ['quando uma particula', DoisEstados], ['os dois acontecem', Ramos],
    ['quase ninguem deu', Gaveta], ['so em 1970', Manchete1970], ['hoje fisicos como', Carroll], ['se isso estiver certo', Arvore], ['e em alguns deles', Moeda],
    ['mas atencao', NaoDecisao], ['a divisao vem', Interacoes], ['e tem um detalhe', Lupa], ['faz as mesmas previsoes', Previsoes], ['ate hoje nenhum teste', NenhumTeste]],
  [['em dezembro de 2024', Chip], ['e um dos chefes', Post], ['a internet explodiu', Explodiu], ['mas o feito real', CorrecaoErros], ['e varios fisicos', Responderam],
    ['ele confundiu', EspacoMat], ['ate tegmark escreveu', NadaNovo]],
  [['nivel quatro o mais', Radical], ['tegmark propos', EquacoesMundos], ['aqui nao existe distancia', VazioBranco], ['a sua copia estaria numa', SilhuetaSimbolos],
    ['e como se o nosso', EquacaoPlaneta], ['e toda outra equacao', Galeria], ['e aqui ja nao existe', Filosofia]],
  [['mas espera muitos', MasEspera], ['muitos cientistas olham', Desconfianca], ['o cosmologo george', Ellis], ['e paul steinhardt', Steinhardt], ['por outro lado', Testavel],
    ['uma batida de bolhas', MarcaNoCeu], ['e por isso que o tema', Fronteira], ['entao a resposta honesta', Honesta], ['mas ninguem provou', NinguemProvou], ['e se um dia alguem', Batida]],
];

const D = 'DISTÂNCIA DA SUA CÓPIA: ';
const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'multiverso/narracao.mp3', musica: 'multiverso/musica.mp3', volta: 8, fim: Fim,
  selos: [
    {texto: 'NENHUM OUTRO UNIVERSO FOI OBSERVADO', de: 'nenhum outro universo foi visto', ate: 'nivel um o jeito', linha: 0, cor: VERMELHO},
    {texto: 'MODELO', de: 'nivel um o jeito', ate: 'so que voce nunca vai chegar', linha: 0, cor: ROXO},
    {texto: D + '10^(10^29) M', de: 'a estimativa dele', ate: 'nivel dois aqui', linha: 1},
    {texto: 'FATO', de: 'so que voce nunca vai chegar', ate: 'nivel dois aqui', linha: 0, cor: CIANO},
    {texto: 'MODELO', de: 'nivel dois aqui', ate: 'mas e se uma bolha', linha: 0, cor: ROXO},
    {texto: D + 'OUTRA BOLHA', de: 'nivel dois aqui', ate: 'nivel tres agora', linha: 1},
    {texto: 'FATO', de: 'mas e se uma bolha', ate: 'alguns sugeriram', linha: 0, cor: CIANO},
    {texto: 'HIPÓTESE DE POUCOS', de: 'alguns sugeriram', ate: 'a mancha continua', linha: 0, cor: ROSA},
    {texto: 'INTERPRETAÇÃO', de: 'nivel tres agora', ate: 'em dezembro de 2024', linha: 0, cor: VERDE},
    {texto: D + 'AQUI, EM OUTRO RAMO', de: 'nivel tres agora', ate: 'nivel quatro o mais', linha: 1},
    {texto: 'HIPÓTESE CONTESTADA', de: 'em dezembro de 2024', ate: 'nivel quatro o mais', linha: 0, cor: VERMELHO},
    {texto: 'HIPÓTESE', de: 'nivel quatro o mais', ate: 'mas espera muitos', linha: 0, cor: ROSA},
    {texto: D + 'NEM EXISTE ESPAÇO', de: 'nivel quatro o mais', ate: 'mas espera muitos', linha: 1},
  ],
  hits: [{frase: 'e do outro lado', off: 2, vol: 0.5}, {frase: 'a estimativa dele', off: 4}, {frase: 'nao encontrou nenhuma', off: 6}, {frase: 'a internet explodiu', off: 2}, {frase: 'nivel quatro o mais', off: 2, vol: 0.5}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail: porta aberta, a mesma pessoa dos dois lados, bolhas de universos lá dentro ----------
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 62% 50%, #2a1050, #05020c 70%)', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', left: 980, top: 90, width: 470, height: 900, background: 'radial-gradient(circle at 50% 40%, #6a2aff, #1a0640 70%)', overflow: 'hidden', boxShadow: '0 0 160px #8a4aff'}}>
      {[[120, 160, 90, CIANO], [330, 260, 70, ROSA], [200, 420, 110, VERDE], [380, 560, 60, OURO], [110, 640, 80, '#ff9f43'], [300, 760, 90, CIANO]].map(([x, y, r, c], i) => (
        <div key={i} style={{position: 'absolute', left: (x as number) - (r as number), top: (y as number) - (r as number), width: 2 * (r as number), height: 2 * (r as number), borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.7), ${c}88 40%, ${c}33 70%, ${c} 100%)`, border: `3px solid ${c}`}} />
      ))}
      <svg width={470} height={900} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 30px #c8a0ff)'}}><Pessoa x={235} y={940} h={760} cor="#e8d2c0" flip /></svg>
    </div>
    <div style={{position: 'absolute', left: 860, top: 40, width: 120, height: 1000, background: 'linear-gradient(90deg,#2a180c,#5a3a20)', clipPath: 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)'}} />
    <div style={{position: 'absolute', left: 950, top: 60, width: 530, height: 960, border: '30px solid #1a1008', borderBottom: 'none'}} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><Pessoa x={1720} y={1120} h={900} cor="#e8d2c0" flip /></svg>
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.8), rgba(0,0,0,.4) 40%, rgba(0,0,0,0) 55%)'}} />
    <div style={{position: 'absolute', left: 70, top: 300, fontFamily: FONTE, fontSize: 330, lineHeight: 0.85, letterSpacing: -6, color: '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
      <span style={{color: OURO}}>4</span><br /><span style={{fontSize: 150}}>MULTIVERSOS</span>
    </div>
    <div style={{position: 'absolute', left: 80, top: 190, padding: '10px 26px', borderRadius: 14, border: `4px solid ${ROSA}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 48, color: ROSA, letterSpacing: 4}}>HIPÓTESE</div>
  </AbsoluteFill>
);
