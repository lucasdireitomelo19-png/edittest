// Short "O SOL explodiu minas no Vietnã em 1972" (tempestade solar de agosto de 1972). Roteiro do Roteirista (lote radiação #2, v2), aprovado pelo dono em 28/10.
// Entrega direta na versão final. Estratégia de 28/10: explosão no mar no 1º quadro, cortes de até 2 s nos primeiros 10 s.
// As imagens do Sol são de OUTRA erupção (SDO, 2014): etiqueta "IMAGEM DE OUTRA ERUPÇÃO". O "~16×" é estimativa (Cucinotta ÷ limite atual). Não dizer "teria morrido".
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, Pino, Glitch, Contador, useSpring, shake, proj, caminho, clamp, FONTE, OURO, LAVA, CIANO, VERMELHO, FPS} from '../comum';
import palavras from './minas.palavras.json';
import vietna from './dados/vietna.json';

const W = palavras as Palavra[];
const FRASES = [
  'o sol ja fez minas', 'explodirem aqui na terra', 'e quase pegou', 'na lua', 'agosto de 1972', 'dezenas de minas', 'no mar do vietna', 'explodiram sozinhas',
  'para a marinha americana', 'o culpado era o sol', 'uma regiao gigante', 'por uns dez dias', 'uma dessas erupcoes', 'em cerca de quinze horas', 'uma das mais rapidas',
  'a perturbacao magnetica', 'acionou as minas', 'a apollo 16', 'a apollo 17', 'em agosto nao tinha', 'um cientista da nasa', 'um astronauta caminhando',
  'umas dezesseis vezes', 'ninguem se feriu', 'a pergunta e',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('um cientista da nasa');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const Mar: React.FC<{noite?: boolean}> = ({noite}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={noite ? '#04060c' : '#1a1410'} /><stop offset="1" stopColor={noite ? '#0c1626' : '#3a2416'} /></linearGradient>
        <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d2230" /><stop offset="1" stopColor="#02070c" /></linearGradient>
      </defs>
      <rect width={1080} height={1100} fill="url(#ceu)" />
      <rect y={1080} width={1080} height={840} fill="url(#agua)" />
      {Array.from({length: 9}, (_, i) => {
        const y = 1100 + i * i * 10, a = 6 + i * 2.5;
        const d = Array.from({length: 23}, (_, k) => `${k * 50 - 25},${y + Math.sin(k * 0.8 + f * 0.12 + i) * a}`).join(' L');
        return <path key={i} d={'M' + d} fill="none" stroke="#2d5a72" strokeWidth={2 + i * 0.6} opacity={0.35 + i * 0.05} />;
      })}
    </svg>
  );
};
// explosão de mina na linha d'água (coluna de água + bola de fogo)
const Explosao: React.FC<{x: number; em: number; s?: number}> = ({x, em, s = 1}) => {
  const f = useCurrentFrame();
  const t = f - em;
  if (t < 0) return null;
  const p = interpolate(t, [0, 22], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const fogo = interpolate(t, [0, 3, 16], [0, 1, 0], clamp);
  const y = 1110;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id={'fx' + x}><stop offset="0" stopColor="#fff" /><stop offset=".3" stopColor="#ffd27a" /><stop offset=".65" stopColor="#ff5a1f" /><stop offset="1" stopColor="#ff5a1f" stopOpacity={0} /></radialGradient></defs>
      <path d={`M${x - 70 * s} ${y} Q${x - 40 * s} ${y - 520 * s * p} ${x} ${y - 640 * s * p} Q${x + 40 * s} ${y - 520 * s * p} ${x + 70 * s} ${y} Z`} fill="#cfe2ee" opacity={0.85 * (1 - p * 0.5)} />
      {Array.from({length: 14}, (_, i) => { const a = -Math.PI * (0.1 + 0.8 * random('a' + x + i)), r = p * s * (200 + random('r' + x + i) * 300);
        return <circle key={i} cx={x + Math.cos(a) * r} cy={y + Math.sin(a) * r + p * p * 160} r={6 * s} fill="#dfeef8" opacity={1 - p} />; })}
      <circle cx={x} cy={y - 60 * s} r={260 * s * (0.4 + p)} fill={`url(#fx${x})`} opacity={fogo} />
    </svg>
  );
};
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('minas/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number}> = ({texto, cor = OURO, y = 820, size = 84}) => {
  const s = useSpring(3, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '22px 44px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.55)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};

// ---------- cenas ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, f < 14 ? 16 : 4)}}>
      <Mar />
      <Explosao x={540} em={0} s={1.3} />
      <Explosao x={230} em={22} s={0.8} />
      <Titulo texto="O SOL EXPLODIU MINAS" y={330} size={110} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const AquiNaTerra: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 8, 'b')}}>
      <Mar />
      <Explosao x={820} em={0} s={1} /><Explosao x={330} em={10} s={1.1} />
      <Titulo texto="AQUI NA TERRA" y={330} size={120} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const QuasePegou: React.FC = () => (
  <Foto src="as17-147-22526.jpg" etq="IMAGEM REAL · APOLLO 17 · NASA" z={[1.15, 1.3]}>
    <Titulo texto="E QUASE PEGOU ASTRONAUTAS" y={330} size={96} cor={OURO} />
  </Foto>
);
const NaLua: React.FC = () => (
  <Foto src="as17-140-21497.jpg" etq="IMAGEM REAL · APOLLO 17 · NASA" z={[1.3, 1.15]} pos="70% 50%">
    <Titulo texto="NA LUA" y={330} size={150} />
  </Foto>
);
const Data: React.FC = () => <AbsoluteFill><Glitch texto="04/08/1972" size={170} fundo="#08060a" /><Texto y={1130} size={64} cor={OURO} delay={6}>VIETNÃ</Texto></AbsoluteFill>;
const Dezenas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04080c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 24}, (_, i) => {
          const x = 140 + (i % 6) * 160, y = 640 + Math.floor(i / 6) * 190, em = Math.floor(random('m' + i) * 40);
          const boom = f >= em ? interpolate(f - em, [0, 10], [1, 0], clamp) : 0;
          return <g key={i} transform={`translate(${x} ${y})`} opacity={f >= em + 10 ? 0.15 : 1}>
            {Array.from({length: 8}, (_, k) => <line key={k} x1={0} y1={0} x2={Math.cos(k * Math.PI / 4) * 52} y2={Math.sin(k * Math.PI / 4) * 52} stroke="#5a6470" strokeWidth={7} />)}
            <circle r={38} fill="#2a3038" stroke="#5a6470" strokeWidth={4} />
            {boom > 0 && <circle r={40 + (1 - boom) * 80} fill="#ffb347" opacity={boom} />}
          </g>;
        })}
      </svg>
      <Titulo texto="DEZENAS DE MINAS" y={330} size={120} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Mapa: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d * 0.8], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const k = Math.exp(interpolate(e, [0, 1], [Math.log(55), Math.log(115)]));
  const pr = proj(interpolate(e, [0, 1], [106, 106.8]), interpolate(e, [0, 1], [15.5, 20]), k);
  const [px, py] = pr(106.8, 20.75);
  const pin = spring({frame: f - 8, fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: '#0a1a28'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={caminho(vietna as number[][][], pr)} fill="#2c4a3e" stroke="#7fa3a0" strokeWidth={2} />
      </svg>
      <Pino x={px} y={py} s={pin} />
      <div style={{position: 'absolute', left: px + 40, top: py + 30, fontFamily: FONTE, opacity: pin}}>
        <div style={{fontSize: 68, color: '#fff', textShadow: '0 4px 20px #000'}}>HAIPHONG</div>
        <div style={{fontSize: 40, color: OURO}}>VIETNÃ DO NORTE</div>
      </div>
      <Titulo texto="NO MAR DO VIETNÃ" y={330} size={110} />
      <Etiqueta texto="MAPA REAL" />
    </AbsoluteFill>
  );
};
const Sozinhas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 6, 'c')}}>
      <Mar noite />
      <Explosao x={260} em={2} s={0.7} /><Explosao x={700} em={9} s={0.9} /><Explosao x={480} em={17} s={0.6} /><Explosao x={900} em={24} s={0.7} />
      <Titulo texto="EXPLODIRAM SOZINHAS" y={330} size={110} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Marinha: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1c2230, #05070c 70%)'}}>
      <div style={{position: 'absolute', left: 150, top: 640, width: 780, height: 680, background: '#e9e2cf', borderRadius: 8, transform: `rotate(-3deg) scale(${0.9 + 0.1 * s})`, opacity: s, boxShadow: '0 30px 80px rgba(0,0,0,.7)'}}>
        {Array.from({length: 9}, (_, i) => <div key={i} style={{position: 'absolute', left: 60, top: 150 + i * 52, width: 520 + (i % 3) * 60, height: 16, background: '#b8b09c', borderRadius: 4}} />)}
        <div style={{position: 'absolute', left: 60, top: 50, fontFamily: FONTE, fontSize: 46, color: '#2a2a2a'}}>U.S. NAVY · 1972</div>
        <div style={{position: 'absolute', right: 40, bottom: 50, padding: '10px 26px', border: `6px solid ${VERMELHO}`, color: VERMELHO, fontFamily: FONTE, fontSize: 54, transform: `rotate(-8deg) scale(${spring({frame: f - 14, fps: FPS, config: {damping: 9}})})`}}>CULPADO: O SOL</div>
      </div>
      <Titulo texto="MARINHA DOS EUA" y={330} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Culpado: React.FC = () => (
  <AbsoluteFill>
    <Real src="minas/sdo1.mp4" zoom={[1, 1.1]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · SDO/NASA · IMAGEM DE OUTRA ERUPÇÃO" real />
    <Titulo texto="O CULPADO ERA O SOL" y={330} size={110} cor={OURO} />
  </AbsoluteFill>
);
const SolDisco: React.FC<{manchas: number; pulso?: number}> = ({manchas, pulso = 0}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <defs><radialGradient id="sol"><stop offset="0" stopColor="#fff3c4" /><stop offset=".7" stopColor="#ffb347" /><stop offset="1" stopColor="#ff6a1f" /></radialGradient></defs>
    <circle cx={540} cy={1000} r={430} fill="#ff6a1f" opacity={0.15 + pulso * 0.4} />
    <circle cx={540} cy={1000} r={380} fill="url(#sol)" />
    {Array.from({length: 12}, (_, i) => { const a = random('sa' + i) * Math.PI * 2, r = random('sr' + i) * 110, sz = (14 + random('sz' + i) * 34) * manchas;
      return sz > 1 ? <circle key={i} cx={620 + Math.cos(a) * r} cy={930 + Math.sin(a) * r} r={sz} fill="#3a1606" opacity={0.85} /> : null; })}
    {pulso > 0 && <circle cx={620} cy={930} r={120 + pulso * 120} fill="#fff" opacity={pulso * 0.8} />}
  </svg>
);
const Regiao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#050304'}}>
      <SolDisco manchas={interpolate(f, [0, 30], [0, 1], clamp)} />
      <Titulo texto="UMA REGIÃO GIGANTE DE MANCHAS" y={300} size={90} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const DezDias: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const dia = Math.min(10, 1 + Math.floor(interpolate(f, [0, d * 0.85], [0, 10], clamp)));
  const pulso = interpolate((f % 11), [0, 2, 9], [0, 1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#050304'}}>
      <SolDisco manchas={1} pulso={pulso} />
      <Titulo texto="EXPLODIU DE NOVO E DE NOVO" y={300} size={90} />
      <div style={{position: 'absolute', top: 520, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 90, color: OURO, fontVariantNumeric: 'tabular-nums'}}>DIA {dia}</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Erupcao: React.FC = () => (
  <AbsoluteFill>
    <Real src="minas/sdo2.mp4" zoom={[1.05, 1.15]} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · SDO/NASA · IMAGEM DE OUTRA ERUPÇÃO" real />
    <Titulo texto="UMA ERUPÇÃO RUMO À TERRA" y={330} size={96} cor={OURO} />
  </AbsoluteFill>
);
const Quinze: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d * 0.9], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const h = Math.round(p * 15);
  return (
    <AbsoluteFill style={{background: '#03050a'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={-120} cy={1050} r={300} fill="#ffb347" /><circle cx={-120} cy={1050} r={340} fill="#ff6a1f" opacity={0.2} />
        <circle cx={950} cy={1050} r={60} fill="#2a6ab0" /><circle cx={950} cy={1050} r={60} fill="none" stroke={CIANO} strokeWidth={3} />
        <path d={`M180 1050 Q${180 + 300 * p} ${1050 - 140 * p} ${180 + 700 * p} 1050 Q${180 + 300 * p} ${1050 + 140 * p} 180 1050 Z`} fill="#ff8a3d" opacity={0.55} />
      </svg>
      <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 200, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>~{h}h</div>
      <Titulo texto="ATÉ A TERRA EM" y={330} size={100} />
      <Texto y={1310} size={44} cor="#cfd8e8">DO SOL ATÉ A TERRA · FORA DE ESCALA</Texto>
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Rapidas: React.FC = () => <Glitch texto="UMA DAS MAIS RÁPIDAS JÁ VISTAS" size={110} cor={OURO} />;
const Magnetica: React.FC = () => {
  const f = useCurrentFrame();
  const amp = interpolate(f, [0, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#03050a'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}, (_, i) => {
          const r = 160 + i * 55, ds = Array.from({length: 61}, (_, k) => { const a = (k / 60) * Math.PI * 2; const w = 1 + 0.25 * amp * Math.sin(a * 3 + f * 0.3 + i);
            return `${540 + Math.cos(a) * r * 1.5 * w},${1000 + Math.sin(a) * r * w}`; }).join(' L');
          return <path key={i} d={'M' + ds + ' Z'} fill="none" stroke={CIANO} strokeWidth={3} opacity={0.6 - i * 0.06} />;
        })}
        <circle cx={540} cy={1000} r={110} fill="#2a6ab0" />
      </svg>
      <Titulo texto="A PERTURBAÇÃO MAGNÉTICA" y={330} size={96} cor={CIANO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Acionou: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 10, 'd')}}>
      <Mar noite />
      <Explosao x={540} em={0} s={1.2} /><Explosao x={200} em={6} s={0.7} /><Explosao x={880} em={12} s={0.8} />
      <Titulo texto="ACIONOU AS MINAS" y={330} size={120} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Linha: React.FC<{ate: number}> = ({ate}) => {
  const f = useCurrentFrame();
  const MARCOS = [{m: 'ABR', t: 'APOLLO 16\nVOLTA', c: CIANO, x: 200}, {m: 'AGO', t: 'TEMPESTADE', c: VERMELHO, x: 540}, {m: 'DEZ', t: 'APOLLO 17\nVAI', c: CIANO, x: 880}];
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #12161f, #04050a 70%)'}}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 990, height: 8, background: 'rgba(255,255,255,.3)', borderRadius: 4}} />
      {MARCOS.slice(0, ate).map((mk, i) => {
        const s = spring({frame: f - 2 - i * 4, fps: FPS, config: {damping: 10}});
        return <React.Fragment key={i}>
          <div style={{position: 'absolute', left: mk.x - 26, top: 968, width: 52, height: 52, borderRadius: 26, background: mk.c, transform: `scale(${s})`}} />
          <div style={{position: 'absolute', left: mk.x - 160, width: 320, top: 860, textAlign: 'center', fontFamily: FONTE, fontSize: 56, color: '#fff', opacity: s}}>{mk.m}</div>
          <div style={{position: 'absolute', left: mk.x - 170, width: 340, top: 1060, textAlign: 'center', fontFamily: FONTE, fontSize: 42, color: mk.c, whiteSpace: 'pre-line', opacity: s}}>{mk.t}</div>
        </React.Fragment>;
      })}
      <Titulo texto="1972" y={330} size={150} cor={OURO} />
    </AbsoluteFill>
  );
};
const Apollo16: React.FC = () => <Linha ate={2} />;
const Apollo17: React.FC = () => <Linha ate={3} />;
const Ninguem: React.FC = () => (
  <Foto src="as17-140-21497.jpg" etq="IMAGEM REAL · SUPERFÍCIE DA LUA · APOLLO 17 · NASA" z={[1.25, 1.35]} pos="85% 40%">
    <Titulo texto="EM AGOSTO: NINGUÉM NA LUA" y={330} size={96} />
  </Foto>
);
const Calculo: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1414, #050404 70%)'}}>
    <Titulo texto="UM CIENTISTA DA NASA CALCULOU" y={330} size={90} />
    <Selo texto={'ESTIMATIVA\nFEITA DEPOIS'} />
  </AbsoluteFill>
);
const Caminhando: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Foto src="as17-147-22526.jpg" etq="IMAGEM REAL · APOLLO 17 · NASA · PARTÍCULAS: ANIMAÇÃO" z={[1.1, 1.25]} pos="55% 50%">
      {Array.from({length: 10}, (_, i) => { const p = ((f * 1.6 + i * 37) % 120) / 120;
        return <div key={i} style={{position: 'absolute', left: 1080 - p * 1300 + random('x' + i) * 300, top: -100 + p * 2100 + random('y' + i) * 200, width: 5, height: 90, background: 'linear-gradient(#fff0, #ffd27a)', transform: 'rotate(30deg)', opacity: 0.8}} />; })}
      <Titulo texto="NA LUA, NAQUELA TEMPESTADE" y={330} size={92} cor={OURO} />
    </Foto>
  );
};
const Dezesseis: React.FC = () => {
  const f = useCurrentFrame();
  const h = interpolate(f, [4, 40], [0.3, 16], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 60%, #2a0a0a, #050303 70%)'}}>
      <div style={{position: 'absolute', left: 250, bottom: 520, width: 200, height: 36, background: CIANO, borderRadius: 8}} />
      <div style={{position: 'absolute', left: 250, width: 200, bottom: 450, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: CIANO}}>LIMITE</div>
      <div style={{position: 'absolute', left: 630, bottom: 520, width: 200, height: 36 * h, background: VERMELHO, borderRadius: 8, boxShadow: `0 0 60px ${VERMELHO}`}} />
      <div style={{position: 'absolute', left: 630, width: 200, bottom: 450, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: VERMELHO}}>NA LUA</div>
      <Contador ate={16} y={570} size={170} cor="#fff" pre="~" suf="×" ini={4} dur={36} />
      <Titulo texto="O LIMITE ATUAL DA NASA" y={290} size={90} />
      <Texto y={505} size={36} cor={OURO} delay={20}>ESTIMATIVA · LIMITE POR TEMPESTADE SOLAR</Texto>
    </AbsoluteFill>
  );
};
const NinguemFeriu: React.FC = () => (
  <AbsoluteFill>
    <Mar noite />
    <Titulo texto="NINGUÉM SE FERIU EM 1972" y={330} size={96} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Marte: React.FC = () => (
  <Foto src="humanos.jpg" etq="ILUSTRAÇÃO · NASA" z={[1.05, 1.2]} pos="45% 50%">
    <Titulo texto="E A CAMINHO DE MARTE?" y={330} size={110} cor={VERMELHO} />
  </Foto>
);

const CENAS = [Gancho, AquiNaTerra, QuasePegou, NaLua, Data, Dezenas, Mapa, Sozinhas, Marinha, Culpado, Regiao, DezDias, Erupcao, Quinze, Rapidas,
  Magnetica, Acionou, Apollo16, Apollo17, Ninguem, Calculo, Caminhando, Dezesseis, NinguemFeriu, Marte];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.5}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="minas/narracao.mp3" calma={CALMA} sons={SONS} />;
