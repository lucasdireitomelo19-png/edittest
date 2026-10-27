// Longo POV "A Terra vai morrer DUAS vezes, e o final é diferente do que te contaram" (1920x1080).
// Roteiro do Roteirista, aprovado pelo dono (27/10, v1). Mesmo molde e mesmo motor do longo da Lua (../longo.tsx).
// Tudo depois de ~1 bilhão de anos leva ESTIMATIVA; 10¹⁵ anos e o número de 1.100 zeros levam HIPÓTESE.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, Titulo, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import {NOITE, Etq, Tit, Sub, Clip, Foto, Ceu, Terra, Barra, Glitch, Card, Grande, criarLongo, Cap} from '../longo';
import palavras from './fimsol.palavras.json';

const W = palavras as Palavra[];
const SOL = 'radial-gradient(circle at 45% 40%, #fffbe0, #ffd34a 45%, #ff9a1a 80%)';
const GIGANTE = 'radial-gradient(circle at 45% 40%, #ffb070, #e2401c 50%, #7a1206 90%)';
const ANA = 'radial-gradient(circle, #ffffff, #cfe6ff 45%, rgba(150,200,255,0) 70%)';
const TORRADA = {mar: '#5a2a12', chao: '#c0602a', borda: 'rgba(255,140,60,.6)'};
const MORTA = {mar: '#3a3a40', chao: '#8a6a4a', borda: 'rgba(200,180,150,.4)'};

const CAPS: Cap[] = [
  {canto: 'HOJE', sat: 1},
  {canto: 'HOJE', sat: 1, titulo: 'HOJE', sub: 'O SOL ESTÁ MUDANDO'},
  {canto: '+1 BILHÃO DE ANOS', sat: 0.85, titulo: '+1 BILHÃO DE ANOS', sub: 'O ÚLTIMO AR'},
  {canto: '+2 BILHÕES DE ANOS', sat: 0.7, titulo: '+2 BILHÕES DE ANOS', sub: 'A ÚLTIMA PLANTA'},
  {canto: '+4–5 BILHÕES DE ANOS', sat: 0.55, titulo: '+4 A 5 BILHÕES', sub: 'O CÉU AGITADO'},
  {canto: '+5 BILHÕES DE ANOS', sat: 0.45, titulo: '+5 BILHÕES DE ANOS', sub: 'O SOL INCHA'},
  {canto: '+7,6 BILHÕES DE ANOS', sat: 0.35, titulo: '+7,6 BILHÕES DE ANOS', sub: 'A SEGUNDA MORTE'},
  {canto: 'FIM DO SOL', sat: 0.25, titulo: 'O FIM DO SOL', sub: ''},
  {canto: '+100 BILHÕES DE ANOS', sat: 0.25, titulo: '+100 BILHÕES → 10¹⁵ ANOS', sub: 'O ÚLTIMO ÁTOMO'},
  {canto: 'HOJE · 80 ANOS-LUZ DAQUI', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const Bola: React.FC<{x: number; y: number; r: number; bg: string; brilho?: string; o?: number}> = ({x, y, r, bg, brilho, o = 1}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: bg, opacity: o, boxShadow: brilho ? `0 0 ${r * 0.7}px ${brilho}` : undefined}} />
);
const Sol: React.FC<{x: number; y: number; r: number; o?: number}> = ({x, y, r, o}) => <Bola x={x} y={y} r={r} bg={SOL} brilho="rgba(255,200,80,.6)" o={o} />;
const Gigante: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => {
  const f = useCurrentFrame();
  return <Bola x={x} y={y} r={r * (1 + 0.01 * Math.sin(f * 0.1))} bg={GIGANTE} brilho="rgba(255,80,30,.55)" />;
};
const Ana: React.FC<{x: number; y: number; r: number; cor?: string}> = ({x, y, r, cor}) => <Bola x={x} y={y} r={r} bg={cor ?? ANA} />;
const Orbita: React.FC<{cx: number; cy: number; r: number; cor?: string; ry?: number}> = ({cx, cy, r, cor = 'rgba(255,255,255,.2)', ry}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><ellipse cx={cx} cy={cy} rx={r} ry={ry ?? r * 0.34} fill="none" stroke={cor} strokeWidth={3} /></svg>
);
const Planeta: React.FC<{cx: number; cy: number; r: number; a: number; tam: number; cor: string; ry?: number}> = ({cx, cy, r, a, tam, cor, ry}) => (
  <Bola x={cx + Math.cos(a) * r} y={cy + Math.sin(a) * (ry ?? r * 0.34)} r={tam} bg={cor} />
);
const Selo2: React.FC<{t: string; cor?: string}> = ({t, cor = OURO}) => (
  <div style={{position: 'absolute', top: 44, right: 50, padding: '7px 18px', borderRadius: 24, border: `2px solid ${cor}`, background: 'rgba(0,0,0,.55)', color: cor, fontFamily: FONTE, fontSize: 22, letterSpacing: 3}}>{t}</div>
);
const Linha: React.FC<{marcas: string[]; titulo: string}> = ({marcas, titulo}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 140, right: 140, top: 560, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.2)'}} />
      {marcas.map((m, i) => {
        const s = spring({frame: f - 4 - i * 5, fps: FPS, config: {damping: 12}});
        const x = 140 + (i / (marcas.length - 1)) * 1640;
        return <React.Fragment key={m}>
          <div style={{position: 'absolute', left: x - 18, top: 546, width: 36, height: 36, borderRadius: 18, background: i < marcas.length - 1 ? OURO : VERMELHO, transform: `scale(${s})`}} />
          <div style={{position: 'absolute', left: x - 150, width: 300, top: i % 2 ? 620 : 460, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: '#fff', opacity: s}}>{m}</div>
        </React.Fragment>;
      })}
      <Tit t={titulo} s={76} />
    </AbsoluteFill>
  );
};

// ---------- gancho ----------
const Duas: React.FC = () => {
  const s = useSpring(10, {damping: 9, mass: 0.6});
  return (
    <Ceu>
      <Terra x={960} y={600} R={260} />
      <div style={{position: 'absolute', left: 1250, top: 420, fontFamily: FONTE, fontSize: 220, color: VERMELHO, transform: `scale(${s})`, textShadow: '0 10px 40px #000'}}>×2</div>
      <Tit t="A TERRA VAI MORRER DUAS VEZES" s={80} />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const Junho: React.FC = () => <Card topo="JUNHO · 2026" meio="UM ESTUDO MUDOU O FINAL" rodape="A SEGUNDA MORTE DA TERRA" cor={VERMELHO} />;
const Escapa: React.FC<{torra?: boolean; titulo: string; sub?: string}> = ({torra, titulo, sub}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 60], [1180, 1480], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Ceu n={80}>
      <Gigante x={-200} y={560} r={1150} />
      <Terra x={x} y={560} R={120} {...(torra ? TORRADA : {})} />
      <Tit t={titulo} s={80} />
      {sub && <Sub y={240}>{sub}</Sub>}
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const PodeEscapar: React.FC = () => <Escapa titulo="ELA PODE ESCAPAR DO SOL" />;
const NaoDoJeito: React.FC = () => <Escapa torra titulo="SÓ QUE NÃO DO JEITO QUE VOCÊ ESPERA" />;
const VerTudo: React.FC = () => <Clip src="fimsol/r2093.mp4" etq="IMAGEM REAL · CÉU" t="VOCÊ VAI VER TUDO" />;
const UltimoAr: React.FC = () => <Clip src="fimsol/r2093.mp4" ini={6} etq="IMAGEM REAL · CÉU" t="O ÚLTIMO AR" />;
const UltimaPlanta: React.FC = () => <Clip src="fimsol/r123289.mp4" etq="IMAGEM REAL · MILHARAL" t="A ÚLTIMA PLANTA" />;
const Inchando: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 90], [140, 520], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return <Ceu n={90}><Bola x={960} y={600} r={r} bg={f < 30 ? SOL : GIGANTE} brilho="rgba(255,90,30,.5)" /><Tit t="O SOL INCHANDO" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const Desfazendo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={200} cor={`radial-gradient(circle at 50% 50%, #0a0d18, #000 70%)`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Bola key={i} x={960 + Math.cos(i * 1.3) * (200 + i * 140 + f * (1 + i * 0.6))} y={560 + Math.sin(i * 1.3) * (120 + i * 60 + f * 0.5)} r={10 + i * 4} bg={['#9a8a7a', '#c08050', '#4a7ab0', '#d0a070', '#7ab0d0'][i]} o={1 - f / 200} />
      ))}
      <Ana x={960} y={560} r={18} />
      <Tit t="O SISTEMA SOLAR SE DESFAZENDO" s={76} />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const Relogio: React.FC = () => <Linha marcas={['HOJE', '+1 BI', '+2 BI', '+5 BI', '+7,6 BI', '+100 BI', '10¹⁵']} titulo="VAMOS AVANÇAR O RELÓGIO" />;
const SemNome: React.FC = () => <Grande t="10¹⁵ … 10¹¹⁰⁰" sub="NÚMEROS QUE NEM TÊM NOME" cor={OURO} s={180} />;
const NoFim: React.FC = () => <Glitch t="E NO FIM, TEM UMA COISA QUE QUASE NINGUÉM CONTA" s={96} />;

// ---------- hoje ----------
const OlhaSol: React.FC = () => <Clip src="fimsol/sv_sdo.mp4" etq="IMAGEM REAL · SOL VISTO PELO SDO · NASA" t="ELE PARECE IGUAL TODO DIA" z={[1, 1.08]} />;
const Metade: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 36], [0, 0.48], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 260, right: 260, top: 520, height: 70, borderRadius: 35, background: 'rgba(255,255,255,.1)'}} />
      <div style={{position: 'absolute', left: 260, width: 1400 * p, top: 520, height: 70, borderRadius: 35, background: 'linear-gradient(90deg, #ff9a1a, #ffd34a)'}} />
      <div style={{position: 'absolute', left: 260 + 1400 * 0.48 - 60, top: 610, fontFamily: FONTE, fontSize: 40, color: OURO}}>HOJE</div>
      <div style={{position: 'absolute', left: 240, top: 610, fontFamily: FONTE, fontSize: 30, color: '#9aa8c2'}}>NASCEU</div>
      <div style={{position: 'absolute', right: 240, top: 610, fontFamily: FONTE, fontSize: 30, color: '#9aa8c2'}}>FIM</div>
      <Tit t="~4,6 BILHÕES DE ANOS" cor={OURO} />
      <Sub y={260}>MAIS OU MENOS NA METADE DA VIDA</Sub>
    </AbsoluteFill>
  );
};
const MaisForte: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      {[0, 1, 2, 3].map((i) => {
        const s = spring({frame: f - 4 - i * 8, fps: FPS, config: {damping: 12}});
        return <React.Fragment key={i}>
          <Sol x={360 + i * 400} y={560} r={(110 + i * 14) * s} />
          <div style={{position: 'absolute', left: 360 + i * 400 - 150, width: 300, top: 760, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: '#fff', opacity: s}}>{['HOJE', '+1 BI', '+2 BI', '+3 BI'][i]}</div>
        </React.Fragment>;
      })}
      <Tit t="~10% MAIS BRILHO POR BILHÃO DE ANOS" s={70} cor={OURO} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const NaoSente: React.FC = () => <Clip src="fimsol/sv_sdo.mp4" ini={8} etq="IMAGEM REAL · SOL VISTO PELO SDO · NASA" t="VOCÊ NÃO SENTE" z={[1.1, 1.2]} />;
const VaiMatar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={80}>
      <Sol x={-80} y={560} r={420} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 8}, (_, i) => <line key={i} x1={380} y1={300 + i * 70} x2={1300} y2={300 + i * 70} stroke="rgba(255,200,80,.45)" strokeWidth={6} strokeDasharray="40 30" strokeDashoffset={-f * 6} />)}
      </svg>
      <Terra x={1450} y={560} R={180} />
      <Tit t="É ISSO QUE VAI MATAR A TERRA" s={80} cor={OURO} />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const DuasMortes: React.FC = () => {
  const a = useSpring(2), b = useSpring(16);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #1a1014, ${NOITE} 70%)`}}>
      <div style={{position: 'absolute', left: 160, top: 360, width: 760, textAlign: 'center', fontFamily: FONTE, opacity: a}}>
        <div style={{fontSize: 46, color: OURO}}>1ª MORTE</div><div style={{fontSize: 120, color: '#fff'}}>A VIDA</div>
      </div>
      <div style={{position: 'absolute', left: 1000, top: 360, width: 760, textAlign: 'center', fontFamily: FONTE, opacity: b}}>
        <div style={{fontSize: 46, color: VERMELHO}}>2ª MORTE</div><div style={{fontSize: 120, color: '#fff'}}>O PLANETA</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- +1 bilhão ----------
const Respira: React.FC = () => <Clip src="fimsol/r2093.mp4" ini={2} etq="IMAGEM REAL · CÉU DE HOJE" t="VOCÊ RESPIRA FUNDO…" />;
const SemAr: React.FC = () => <Grande t="E NÃO TEM AR." cor={VERMELHO} s={170} />;
const Ozaki: React.FC = () => <Card topo="NATURE GEOSCIENCE · 2021" meio="OZAKI E REINHARD" rodape="QUANTO DURA O OXIGÊNIO DO AR?" />;
const UmBilhao: React.FC = () => <Grande t="~1 BILHÃO DE ANOS" sub="DE OXIGÊNIO NO AR (ESTIMATIVA)" cor={CIANO} s={160} />;
const Metano: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={60}>
      <div style={{position: 'absolute', left: 960 - 330, top: 560 - 330, width: 660, height: 660, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,160,60,0) 62%, rgba(230,160,60,.6) 70%, rgba(230,160,60,0) 78%)'}} />
      <Terra x={960} y={560} R={270} mar="#2a3a4a" chao="#7a6a3a" />
      <div style={{position: 'absolute', left: 960 - 270, top: 560 - 270, width: 540, height: 540, borderRadius: '50%', background: `rgba(200,140,60,${0.25 + 0.05 * Math.sin(f * 0.1)})`}} />
      <Tit t="UM MUNDO DE METANO" cor={OURO} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Ozonio: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [4, 30], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1030, #3a2a40 60%, #6a4a30)'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 330, height: 40, background: `rgba(120,200,255,${0.6 * o})`}} />
      <div style={{position: 'absolute', left: 60, top: 280, fontFamily: FONTE, fontSize: 30, color: CIANO, opacity: o}}>CAMADA DE OZÔNIO</div>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 9}, (_, i) => { const y = ((f * 14 + i * 120) % 900); return <line key={i} x1={200 + i * 190} y1={y - 120} x2={200 + i * 190 - 40} y2={y} stroke="#c07aff" strokeWidth={8} opacity={y > 350 ? 1 : o} />; })}
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 900, bottom: 0, background: '#3a2a1a'}} />
      <Tit t="ULTRAVIOLETA DIRETO NO CHÃO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Curva: React.FC<{fim?: boolean; parcial?: boolean}> = ({fim, parcial}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 50], [0, parcial ? 0.7 : 1], clamp);
  const x0 = 220, x1 = 1700, yA = 360, yB = 820, q = 0.72;
  const pts = Array.from({length: 80}, (_, i) => {
    const k = (i / 79) * p; const x = x0 + (x1 - x0) * k;
    const y = k < q ? yA + Math.sin(k * 40) * 6 : yA + (yB - yA) * Math.min(1, (k - q) / 0.07);
    return `${x},${y}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={x0} y1={yB + 40} x2={x1} y2={yB + 40} stroke="rgba(255,255,255,.3)" strokeWidth={4} />
        <polyline points={pts} fill="none" stroke={CIANO} strokeWidth={10} />
      </svg>
      <div style={{position: 'absolute', left: x0, top: yA - 60, fontFamily: FONTE, fontSize: 32, color: CIANO}}>OXIGÊNIO NO AR</div>
      {fim && <div style={{position: 'absolute', left: 1250, top: yB - 90, fontFamily: FONTE, fontSize: 32, color: OURO, width: 520}}>NÍVEIS DE ANTES DA VIDA COMPLEXA</div>}
      <Tit t={fim ? 'DE VOLTA AO COMEÇO' : parcial ? 'NÃO É AOS POUCOS' : 'O OXIGÊNIO DESPENCA'} />
      <Etq t="ESQUEMA · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Despenca: React.FC = () => <Curva />;
const Niveis: React.FC = () => <Curva fim />;
const Vapor: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Clip src="fimsol/r31377.mp4" etq="IMAGEM REAL · VAPOR: EFEITO" t="A ÁGUA ESCAPANDO PRO ESPAÇO" sub="SEGUNDO ALGUNS MODELOS" />
      {Array.from({length: 40}, (_, i) => {
        const y = 1080 - ((f * (3 + random('vy' + i) * 3) + random('vo' + i) * 900) % 1000);
        return <div key={i} style={{position: 'absolute', left: random('vx' + i) * 1920, top: y, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)'}} />;
      })}
    </AbsoluteFill>
  );
};
const Lembranca: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const k = interpolate(f, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Clip src="fimsol/r2093.mp4" ini={9} etq="IMAGEM REAL · EFEITO" t="O CÉU AZUL VAI SER SÓ LEMBRANÇA" />
      <AbsoluteFill style={{background: `rgba(190,110,40,${0.65 * k})`, mixBlendMode: 'multiply'}} />
    </AbsoluteFill>
  );
};

// ---------- +2 bilhões ----------
const Resistir: React.FC = () => <Clip src="fimsol/r111512.mp4" etq="IMAGEM REAL · PLANTAS" t="AS PLANTAS TENTAM RESISTIR" />;
const Co2: React.FC = () => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [4, 50], [420, 10], clamp));
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1a14, ${NOITE})`}}>
      <div style={{position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 220, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{v} ppm</div>
      <Tit t="AS ROCHAS SUGAM O GÁS CARBÔNICO" s={76} />
      <Sub y={640} s={44} cor={VERDE}>E AS PLANTAS VIVEM DESSE GÁS</Sub>
      <Etq t="ESQUEMA · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Comuns: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1a14, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 460, top: 300, width: 1000, display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 8}}>
        {Array.from({length: 100}, (_, i) => {
          const morre = i < 95 && f > 10 + (i % 20) * 1.2;
          return <div key={i} style={{height: 40, borderRadius: '50% 50% 10% 10%', background: morre ? '#7a6a3a' : VERDE, opacity: morre ? 0.5 : 1}} />;
        })}
      </div>
      <Tit t="AS PLANTAS COMUNS MORREM PRIMEIRO" s={76} />
      <Sub y={620} s={40}>QUASE TODA A VEGETAÇÃO DO PLANETA</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Milho: React.FC = () => <Clip src="fimsol/r123289.mp4" ini={5} etq="IMAGEM REAL · MILHARAL" t="MILHO E CANA AGUENTAM MAIS" />;
const Fotossintese: React.FC = () => <Grande t="~1,35 BILHÃO DE ANOS" sub="NEM ELAS FAZEM MAIS FOTOSSÍNTESE (ESTIMATIVA)" cor={OURO} s={150} />;
const Calor: React.FC = () => {
  const f = useCurrentFrame();
  const n = interpolate(f, [4, 40], [0.3, 0.95], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a1206, #120402)'}}>
      <div style={{position: 'absolute', left: 900, top: 300, width: 120, height: 560, borderRadius: 60, background: 'rgba(255,255,255,.1)', border: '8px solid #e8d8c8'}}>
        <div style={{position: 'absolute', left: 18, right: 18, bottom: 18, height: 500 * n, borderRadius: 40, background: 'linear-gradient(0deg, #ff3b1a, #ffb04a)'}} />
      </div>
      <Tit t="CALOR DEMAIS PRA QUALQUER PLANTA" s={76} />
      <Sub y={900} s={40} cor={OURO}>ANTES DOS 2 BILHÕES DE ANOS (ESTIMATIVA)</Sub>
    </AbsoluteFill>
  );
};
const Folha: React.FC = () => <Clip src="fimsol/r53963.mp4" etq="IMAGEM REAL · ILUSTRATIVA" t="A ÚLTIMA FOLHA SECA" />;
const Nada: React.FC = () => <Clip src="fimsol/r328726.mp4" etq="IMAGEM REAL · DESERTO DE HOJE" t="NADA PRA COMER, RESPIRAR, VIVER" />;
const Primeira: React.FC = () => {
  const s = spring({frame: useCurrentFrame() - 6, fps: FPS, config: {damping: 9, mass: 0.7}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1010, #050303 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '20px 70px', border: `12px solid ${VERMELHO}`, borderRadius: 20, fontFamily: FONTE, fontSize: 170, color: VERMELHO, transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`, opacity: s}}>1ª MORTE</div>
    </AbsoluteFill>
  );
};
const Morto: React.FC = () => <Ceu n={110}><Terra x={960} y={580} R={300} {...MORTA} /><Tit t="GIRANDO. MAS MORTO." /><Etq t="ILUSTRAÇÃO" /></Ceu>;

// ---------- +4 a 5 bilhões ----------
const Orrery: React.FC<{titulo: string; louco?: boolean; puxa?: boolean; estrela?: boolean}> = ({titulo, louco, puxa, estrela}) => {
  const f = useCurrentFrame();
  const cx = 960, cy = 600;
  const P = [{r: 160, t: 9, c: '#9a8a7a', v: 0.05}, {r: 260, t: 13, c: '#d0a070', v: 0.035}, {r: 370, t: 14, c: '#4a7ab0', v: 0.028}, {r: 480, t: 11, c: '#c0603a', v: 0.022}];
  return (
    <Ceu n={140}>
      {P.map((p, i) => <Orbita key={i} cx={cx} cy={cy} r={p.r} />)}
      {louco && <Orbita cx={cx + 60} cy={cy} r={230} ry={110} cor="rgba(255,59,59,.7)" />}
      <Sol x={cx} y={cy} r={60} />
      {P.map((p, i) => {
        const a = f * p.v + i * 1.7;
        if (louco && i === 0) return <Bola key={i} x={cx + 60 + Math.cos(f * 0.06) * 230} y={cy + Math.sin(f * 0.06) * 110} r={p.t} bg={VERMELHO} />;
        return <Planeta key={i} cx={cx} cy={cy} r={p.r} a={a} tam={p.t} cor={p.c} />;
      })}
      {puxa && <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{[0, 1, 2].map((i) => {
        const a1 = f * P[i].v + i * 1.7, a2 = f * P[i + 1].v + (i + 1) * 1.7;
        return <line key={i} x1={cx + Math.cos(a1) * P[i].r} y1={cy + Math.sin(a1) * P[i].r * 0.34} x2={cx + Math.cos(a2) * P[i + 1].r} y2={cy + Math.sin(a2) * P[i + 1].r * 0.34} stroke="rgba(255,210,63,.5)" strokeWidth={3} strokeDasharray="10 8" />;
      })}</svg>}
      {estrela && <Bola x={interpolate(f, [0, 120], [2100, -200])} y={200} r={30} bg={SOL} brilho="rgba(255,255,255,.6)" />}
      <Tit t={titulo} s={76} />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Ceu>
  );
};
const RelogioPerfeito: React.FC = () => <Orrery titulo="UM RELÓGIO PERFEITO?" />;
const Puxam: React.FC = () => <Orrery titulo="ELES SE PUXAM O TEMPO TODO" puxa />;
const Laskar: React.FC = () => <Card topo="NATURE · 2009" meio="LASKAR E GASTINEAU" rodape="O FUTURO SIMULADO MILHARES DE VEZES" />;
const Grade: React.FC<{titulo: string; verde?: boolean; sub?: string}> = ({titulo, verde, sub}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 560, top: 270, width: 800, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 14}}>
        {Array.from({length: 100}, (_, i) => {
          const s = spring({frame: f - i * 0.3, fps: FPS, config: {damping: 14}});
          const ruim = i === 57;
          return <div key={i} style={{height: 52, borderRadius: 26, transform: `scale(${s})`, background: ruim ? VERMELHO : verde ? VERDE : 'rgba(255,255,255,.18)', boxShadow: ruim ? `0 0 20px ${VERMELHO}` : undefined}} />;
        })}
      </div>
      <Tit t={titulo} cor={verde ? VERDE : VERMELHO} />
      {sub && <Sub y={960 - 100} s={40}>{sub}</Sub>}
      <Etq t="SIMULAÇÕES · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const UmEm100: React.FC = () => <Grade titulo="1 EM 100 SIMULAÇÕES" sub="MERCÚRIO SAI DA LINHA" />;
const Chocar: React.FC = () => <Orrery titulo="PODEM ATÉ SE CHOCAR" louco />;
const Passam: React.FC = () => <Orrery titulo="ESTRELAS QUE PASSAM PERTO" estrela />;
const Maioria: React.FC = () => <Grade titulo="NA MAIORIA, NADA ACONTECE" verde />;
const Andromeda: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={200}>
      <div style={{position: 'absolute', left: 560, top: 300, width: 800, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, #fff8e0, rgba(200,180,255,.5) 25%, rgba(120,110,200,.15) 55%, transparent 70%)', transform: `rotate(-20deg) scale(${1 + f * 0.002})`}} />
      <Tit t="ANDRÔMEDA" />
      <Sub y={800} s={40} cor={OURO}>ESSA JÁ TEM VÍDEO NO CANAL</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const NaoAguenta: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={80}><Sol x={960} y={580} r={220 + 10 * Math.sin(f * 0.3)} /><Tit t="O QUE NÃO AGUENTA É O SOL" cor={OURO} /><Etq t="ILUSTRAÇÃO" /></Ceu>;
};

// ---------- +5 bilhões ----------
const Combustivel: React.FC = () => {
  const f = useCurrentFrame();
  const n = interpolate(f, [4, 40], [0.6, 0.02], clamp);
  return (
    <Ceu n={60}>
      <Sol x={700} y={580} r={300} />
      <div style={{position: 'absolute', left: 700 - 90, top: 580 - 90, width: 180, height: 180, borderRadius: '50%', background: `rgba(255,255,255,${n})`, boxShadow: `0 0 60px rgba(255,255,255,${n})`}} />
      <div style={{position: 'absolute', left: 1180, top: 420, width: 520, height: 70, borderRadius: 35, background: 'rgba(255,255,255,.12)'}}>
        <div style={{width: `${n * 160}%`, maxWidth: '100%', height: '100%', borderRadius: 35, background: n > 0.2 ? OURO : VERMELHO}} />
      </div>
      <div style={{position: 'absolute', left: 1180, top: 360, fontFamily: FONTE, fontSize: 34, color: '#fff'}}>HIDROGÊNIO DO CENTRO</div>
      <Tit t="O COMBUSTÍVEL DO CENTRO ACABA" s={76} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Incha: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 80], [200, 470], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const k = interpolate(f, [0, 80], [0, 1], clamp);
  return <Ceu n={60}><Bola x={960} y={600} r={r} bg={k < 0.4 ? SOL : GIGANTE} brilho="rgba(255,90,30,.5)" /><Tit t="E ELE COMEÇA A INCHAR" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
const GiganteV: React.FC = () => <Ceu n={60}><Gigante x={960} y={640} r={560} /><Tit t="UMA GIGANTE VERMELHA" cor="#ffb070" /><Sub y={250}>FRIA POR FORA, FURIOSA POR DENTRO</Sub><Etq t="ANIMAÇÃO" /></Ceu>;
const Engole: React.FC<{alvo: string; cor: string; r0: number; r1: number; orbita: number; titulo: string}> = ({alvo, cor, r0, r1, orbita, titulo}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const r = interpolate(f, [0, d * 0.8], [r0, r1], clamp);
  const x = 300 + orbita;
  const dentro = r > orbita;
  return (
    <Ceu n={80}>
      <Orbita cx={300} cy={560} r={orbita} ry={orbita} />
      <Gigante x={300} y={560} r={r} />
      {!dentro && <Bola x={x} y={560} r={16} bg={cor} />}
      <div style={{position: 'absolute', left: x - 120, top: 600, width: 240, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: '#fff', opacity: dentro ? 0.3 : 1}}>{alvo}</div>
      <Tit t={titulo} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Mercurio: React.FC = () => <Engole alvo="MERCÚRIO" cor="#9a8a7a" r0={300} r1={420} orbita={380} titulo="MERCÚRIO É O PRIMEIRO" />;
const Parede: React.FC<{cresce?: boolean; titulo: string}> = ({cresce, titulo}) => {
  const f = useCurrentFrame();
  const r = cresce ? interpolate(f, [0, 90], [900, 1300], clamp) : 900;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a0804, #5a1a08)', overflow: 'hidden'}}>
      <Gigante x={960} y={860 + r * 0.55} r={r} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><path d="M0 860 Q400 820 800 850 T1600 840 T1920 850 L1920 1080 L0 1080 Z" fill="#120604" /></svg>
      <Tit t={titulo} cor="#ffd0a0" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const ParedeV: React.FC = () => <Parede titulo="UMA PAREDE VERMELHA NO CÉU" />;
const Cresce: React.FC = () => <Parede cresce titulo="E O SOL NÃO PARA DE CRESCER" />;

// ---------- +7,6 bilhões: a segunda morte ----------
const Auge: React.FC = () => <Grande t="> 200× MAIOR" sub="DO QUE O SOL DE HOJE (ESTIMATIVA)" cor="#ff7a4a" s={190} fundo="radial-gradient(circle at 50% 45%, #2a0804, #050202 70%)" />;
const Borda: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 0.02;
  return (
    <Ceu n={60}>
      <Orbita cx={200} cy={560} r={1180} ry={1180} cor="rgba(76,201,240,.6)" />
      <Gigante x={200} y={560} r={1100} />
      <Terra x={200 + Math.cos(a - 0.2) * 1180} y={560 + Math.sin(a - 0.2) * 1180} R={40} {...TORRADA} />
      <div style={{position: 'absolute', left: 1440, top: 640, fontFamily: FONTE, fontSize: 34, color: CIANO}}>ÓRBITA DA TERRA</div>
      <Tit t="A BORDA CHEGA PERTO DA TERRA" s={76} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Venus: React.FC = () => <Engole alvo="VÊNUS" cor="#d0a070" r0={560} r1={760} orbita={700} titulo="VÊNUS É ENGOLIDO" />;
const EATerra: React.FC = () => <Glitch t="E A TERRA? A CIÊNCIA SE DIVIDE." s={120} />;
const Lado: React.FC<{q: 0 | 1; ativo: boolean}> = ({q, ativo}) => (
  <div style={{position: 'absolute', left: q * 960, top: 0, width: 960, height: 1080, overflow: 'hidden', opacity: ativo ? 1 : 0.35, borderRight: q === 0 ? '4px solid rgba(255,255,255,.4)' : undefined}}>
    {q === 0 ? <Bola x={480} y={1180} r={720} bg={GIGANTE} brilho="rgba(255,80,30,.5)" /> : <Bola x={-200} y={620} r={620} bg={GIGANTE} brilho="rgba(255,80,30,.5)" />}
    {q === 1 && <Terra x={720} y={600} R={90} {...TORRADA} />}
    {q === 0 && <div style={{position: 'absolute', left: 430, top: 440, width: 100, height: 100, borderRadius: 50, border: '5px dashed rgba(255,255,255,.7)'}} />}
    <div style={{position: 'absolute', top: 160, width: 960, textAlign: 'center', fontFamily: FONTE}}>
      <div style={{fontSize: 90, color: '#fff'}}>{q === 0 ? '2008' : '2026'}</div>
      <div style={{fontSize: 64, color: q === 0 ? '#ff7a4a' : OURO}}>{q === 0 ? 'ENGOLIDA' : 'ESCAPA, TORRADA'}</div>
    </div>
  </div>
);
const Dividida: React.FC<{lado: 0 | 1 | 2}> = ({lado}) => (
  <AbsoluteFill style={{background: NOITE}}>
    <Lado q={0} ativo={lado !== 1} />
    <Lado q={1} ativo={lado !== 0} />
    <Etq t="ILUSTRAÇÃO · ESTIMATIVAS" />
  </AbsoluteFill>
);
const Em2008: React.FC = () => <Dividida lado={0} />;
const Em2026: React.FC = () => <Dividida lado={1} />;
const Puppis: React.FC = () => <Card topo="A&A · 2026" meio="DADOS DE UMA ESTRELA VELHA" rodape="L2 PUPPIS: PERDENDO MASSA AGORA" cor={OURO} />;
const Mudou: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 60], [1060, 1240], clamp);
  const g = interpolate(f, [0, 60], [1120, 1020], clamp);
  return (
    <Ceu n={60}>
      <Orbita cx={150} cy={560} r={r} ry={r} cor="rgba(76,201,240,.6)" />
      <Gigante x={150} y={560} r={g} />
      <Terra x={150 + r * 0.9} y={560 - r * 0.43} R={44} {...TORRADA} />
      <Tit t="A TERRA PROVAVELMENTE ESCAPA" s={80} cor={OURO} />
      <Sub y={240}>O SOL PERDE MASSA E A ÓRBITA SE ABRE</Sub>
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Torrada: React.FC = () => <Ceu n={100}><Bola x={-300} y={560} r={900} bg={GIGANTE} brilho="rgba(255,80,30,.5)" /><Terra x={1250} y={580} R={300} {...TORRADA} /><Tit t="UMA ROCHA TORRADA" cor="#ffb070" /><Sub y={240}>SEM AR, SEM ÁGUA, SEM NADA</Sub><Etq t="ILUSTRAÇÃO" /></Ceu>;
const Autores: React.FC = () => <Card topo="OS PRÓPRIOS AUTORES AVISAM" meio="“DEPENDE DE DETALHES”" rodape="QUE A GENTE AINDA NÃO CONHECE BEM" cor={OURO} />;
const OuTorrada: React.FC = () => <Dividida lado={2} />;
const Marte: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={100}><Gigante x={-100} y={560} r={800} /><Bola x={interpolate(f, [0, 60], [1300, 1600], clamp)} y={560} r={60} bg="radial-gradient(circle at 40% 35%, #f0a070, #b04a20)" /><Tit t="MARTE, MAIS LONGE, ESCAPA" /><Etq t="ILUSTRAÇÃO · ESTIMATIVA" /></Ceu>;
};

// ---------- o fim do Sol ----------
const Camadas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={100}>
      {[0, 1, 2, 3].map((i) => { const r = ((f * 4 + i * 120) % 520) + 120; return <div key={i} style={{position: 'absolute', left: 960 - r, top: 560 - r, width: 2 * r, height: 2 * r, borderRadius: '50%', border: `${24 - i * 3}px solid rgba(255,110,60,${0.6 * (1 - r / 640)})`}} />; })}
      <Gigante x={960} y={560} r={interpolate(f, [0, 90], [260, 120], clamp)} />
      <Tit t="O SOL SOLTA AS CAMADAS DE FORA" s={76} />
      <Etq t="ANIMAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Nebulosa: React.FC = () => (
  <AbsoluteFill>
    <Foto src="fimsol/nasa_southern_ring_nebula.jpg" etq="IMAGEM REAL · NEBULOSA DO ANEL DO SUL (EXEMPLO) · WEBB/NASA" pos="22% center" z={[1.15, 1.25]} />
    <div style={{position: 'absolute', left: 80, top: 130, padding: '10px 30px', borderRadius: 14, background: 'rgba(0,0,0,.6)', border: `4px solid ${OURO}`, fontFamily: FONTE, fontSize: 70, color: OURO}}>TALVEZ</div>
  </AbsoluteFill>
);
const Gesicki: React.FC = () => <Card topo="NATURE ASTRONOMY · 2018" meio="QUASE NO LIMITE" rodape="UMA NEBULOSA BEM FRAQUINHA" cor={CIANO} />;
const Nenhuma: React.FC = () => <Card topo="OUTRO ESTUDO (2008)" meio="NENHUMA NEBULOSA" rodape="AS FONTES DIVERGEM" cor={VERMELHO} />;
const Nucleo: React.FC = () => <Ceu n={140}><Ana x={960} y={560} r={70} /><Tit t="SOBRA O NÚCLEO: UMA ANÃ BRANCA" s={76} /><Etq t="ILUSTRAÇÃO" /></Ceu>;
const Tamanho: React.FC = () => (
  <Ceu n={100}>
    <Ana x={640} y={600} r={150} />
    <Terra x={1280} y={600} R={110} />
    <div style={{position: 'absolute', left: 440, top: 780, width: 400, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: '#cfe6ff'}}>ANÃ BRANCA</div>
    <div style={{position: 'absolute', left: 1080, top: 780, width: 400, textAlign: 'center', fontFamily: FONTE, fontSize: 34, color: '#fff'}}>TERRA</div>
    <Tit t="MEIO SOL NO TAMANHO DA TERRA" s={76} />
    <Sub y={240}>UM POUCO MAIS DA METADE DA MASSA DO SOL DE HOJE</Sub>
    <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
  </Ceu>
);

// ---------- o último átomo ----------
const Continua: React.FC = () => {
  const f = useCurrentFrame();
  const anos = Math.round(interpolate(f, [0, 60], [8, 100], clamp));
  return <Grande t={`+${anos} BILHÕES`} sub="E O RELÓGIO CONTINUA" cor={OURO} s={170} />;
};
const Gigantes: React.FC = () => {
  const f = useCurrentFrame();
  const cx = 960, cy = 600;
  return (
    <Ceu n={160}>
      <Orbita cx={cx} cy={cy} r={330} /><Orbita cx={cx} cy={cy} r={520} />
      <Ana x={cx} y={cy} r={14} />
      <Planeta cx={cx} cy={cy} r={330} a={f * 0.02} tam={34} cor="radial-gradient(circle, #e8c090, #a07040)" />
      <Planeta cx={cx} cy={cy} r={520} a={f * 0.014 + 2} tam={28} cor="radial-gradient(circle, #f0dca0, #b09060)" />
      <Bola x={interpolate(f, [0, 120], [2000, -100])} y={interpolate(f, [0, 120], [300, 520])} r={26} bg={SOL} brilho="rgba(255,255,255,.6)" />
      <Tit t="ESTRELAS BAGUNÇAM JÚPITER E SATURNO" s={72} />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const Perdidos: React.FC = () => <Desfazendo2 />;
const Desfazendo2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={220} cor="#000">
      {[0, 1, 2, 3].map((i) => <Bola key={i} x={960 + (i - 1.5) * (200 + f * 6)} y={560 + Math.sin(i * 2) * (80 + f * 2)} r={14 + i * 6} bg={['#8a6a4a', '#c08050', '#e8c090', '#a0c0e0'][i]} o={interpolate(f, [0, 120], [1, 0.3], clamp)} />)}
      <Tit t="PLANETAS PERDIDOS NO ESCURO" />
      <Sub y={240}>SEM ESTRELA, SEM LUZ</Sub>
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Ceu>
  );
};
const SemEstrelas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {Array.from({length: 220}, (_, i) => <div key={i} style={{position: 'absolute', left: random('sx' + i) * 1920, top: random('sy' + i) * 1080, width: 4, height: 4, borderRadius: 2, background: '#fff', opacity: f > random('so' + i) * 90 ? 0 : 0.9}} />)}
      <Tit t="O UNIVERSO PARA DE FAZER ESTRELAS" s={76} />
      <Sub y={240}>EM TRILHÕES DE ANOS (ESTIMATIVA)</Sub>
    </AbsoluteFill>
  );
};
const Esfria: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 90], [0, 1], clamp);
  const cor = `radial-gradient(circle, rgb(${255 - k * 230},${255 - k * 240},${255 - k * 240}), rgb(${200 - k * 190},${120 - k * 115},${80 - k * 75}) 55%, transparent 70%)`;
  return <Ceu n={120}><Ana x={960} y={560} r={180} cor={cor} /><Tit t="ANÃ NEGRA: FRIA, ESCURA, INVISÍVEL" s={76} /><Etq t="ILUSTRAÇÃO · HIPÓTESE" /></Ceu>;
};
const MilTrilhoes: React.FC = () => <Grande t="10¹⁵ ANOS" sub="MIL TRILHÕES DE ANOS (HIPÓTESE)" cor="#9aa8c2" s={200} fundo="#000" />;
const Nenhuma2: React.FC = () => <Grande t="NENHUMA EXISTE HOJE" sub="O UNIVERSO É JOVEM DEMAIS" s={120} fundo="#000" />;
const MilZeros: React.FC = () => {
  const f = useCurrentFrame();
  const zeros = '0'.repeat(1100);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 260 - f * 3, fontFamily: 'monospace', fontSize: 34, color: 'rgba(200,210,230,.5)', wordBreak: 'break-all', lineHeight: 1.2}}>1{zeros}</div>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, #000 18%, transparent 35%, transparent 70%, #000 85%)'}} />
      <Tit t="10¹¹⁰⁰ ANOS" cor={OURO} s={110} />
      <Sub y={250}>SÓ PARA ANÃS NEGRAS BEM MAIS PESADAS QUE A DO SOL</Sub>
    </AbsoluteFill>
  );
};

// ---------- mas espera ----------
const Espera: React.FC = () => <Clip src="fimsol/sv_sdo.mp4" ini={3} etq="IMAGEM REAL · SOL VISTO PELO SDO · NASA" t="MAS ESPERA." z={[1, 1.06]} />;
const Humanidade: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <Barra x={200} y={420} w={1150} h={70} p={p} cor={OURO} rot="O FIM DO SOL" val="BILHÕES DE ANOS" />
      <Barra x={200} y={660} w={1150} h={70} p={0.004 + 0 * p} cor={CIANO} rot="A HUMANIDADE" val="~300 MIL ANOS" />
      <Tit t="TUDO ISSO LEVA BILHÕES DE ANOS" s={76} />
    </AbsoluteFill>
  );
};
const Sobrevivem: React.FC = () => <Grande t="PLANETAS SOBREVIVEM" sub="À MORTE DAS ESTRELAS" cor={VERDE} s={124} />;
const Wd1856: React.FC = () => <Clip src="fimsol/sv_wd1856.mp4" etq="ILUSTRAÇÃO · WD 1856 b · NASA" t="A 80 ANOS-LUZ DAQUI" z={[1, 1.08]} sub="UM PLANETA DO TAMANHO DE JÚPITER EM VOLTA DE UMA ANÃ BRANCA" />;
const Horas34: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={140}>
      <Orbita cx={960} cy={600} r={300} ry={300} />
      <Ana x={960} y={600} r={30} />
      <Bola x={960 + Math.cos(f * 0.05) * 300} y={600 + Math.sin(f * 0.05) * 300} r={70} bg="radial-gradient(circle at 40% 35%, #f0d0e0, #a06a8a)" />
      <Tit t="UMA VOLTA A CADA 34 HORAS" cor={OURO} />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Ceu>
  );
};
const Webb: React.FC = () => <Card topo="TELESCÓPIO WEBB · 2026" meio="ATMOSFERA DETECTADA" rodape="NO PLANETA WD 1856 b" cor={OURO} />;
const Kmt: React.FC = () => (
  <Ceu n={120}>
    <Ana x={760} y={600} r={50} />
    <Terra x={1240} y={600} R={110} {...MORTA} />
    <Tit t="A 4.000 ANOS-LUZ" />
    <Sub y={240}>QUASE O DOBRO DA MASSA DA TERRA, EM VOLTA DE OUTRA ANÃ BRANCA</Sub>
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const Retrato: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={120}>
      <Orbita cx={960} cy={600} r={380} />
      <Ana x={960} y={600} r={30} />
      <Terra x={960 + Math.cos(f * 0.015 + 1) * 380} y={600 + Math.sin(f * 0.015 + 1) * 380 * 0.34} R={70} {...TORRADA} />
      <Tit t="UM RETRATO DO NOSSO FUTURO?" />
      <Etq t="ILUSTRAÇÃO · ANALOGIA" />
    </Ceu>
  );
};
const NaoRaro: React.FC = () => <Clip src="fimsol/sv_restos.mp4" etq="ANIMAÇÃO · NASA" t="E NÃO É RARO" sub="1/4 A 1/2 DAS ANÃS BRANCAS PRÓXIMAS TÊM RESTOS DE PLANETAS" z={[1, 1.06]} />;
const Espectro: React.FC = () => {
  const linhas = [340, 520, 610, 880, 1130, 1290, 1480];
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <div style={{position: 'absolute', left: 200, right: 200, top: 440, height: 200, background: 'linear-gradient(90deg, #6a2aff, #2a8aff, #2aff8a, #ffff4a, #ff9a2a, #ff2a2a)'}} />
      {linhas.map((x, i) => <div key={i} style={{position: 'absolute', left: x, top: 440, width: 10, height: 200, background: '#000'}} />)}
      <Tit t="A POEIRA DOS MUNDOS NA LUZ DA ESTRELA" s={72} />
      <Sub y={700} s={40}>METAIS PESADOS NO ESPECTRO DA ANÃ BRANCA</Sub>
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Helix: React.FC = () => <Foto src="fimsol/nasa_PIA15658.jpg" etq="IMAGEM REAL · NEBULOSA DA HÉLICE (EXEMPLO) · NASA" t="O GÁS VOLTA PRA GALÁXIA" />;
const Novos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={120}>
      <div style={{position: 'absolute', left: 960 - 520, top: 600 - 150, width: 1040, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,200,120,.6), rgba(200,120,80,.2) 50%, transparent 70%)', transform: `rotate(${f * 0.05}deg)`}} />
      <Sol x={960} y={600} r={60} />
      {[0, 1, 2].map((i) => <Planeta key={i} cx={960} cy={600} r={200 + i * 130} a={f * (0.03 - i * 0.007) + i * 2} tam={10 + i * 4} cor={['#c08050', '#4a7ab0', '#d0a070'][i]} />)}
      <Tit t="NOVAS ESTRELAS. E NOVOS PLANETAS." s={80} cor={OURO} />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};
const OutroCeu: React.FC<{alguem?: boolean}> = ({alguem}) => (
  <Ceu n={160} cor="linear-gradient(180deg, #0a0820, #3a1a40 60%, #a05a40)">
    <Sol x={1300} y={700} r={90} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <path d="M0 800 Q500 740 960 790 T1920 770 L1920 1080 L0 1080 Z" fill="#140a14" />
      {alguem && <><circle cx={560} cy={700} r={26} fill="#05030a" /><rect x={536} y={724} width={48} height={90} rx={20} fill="#05030a" /></>}
    </svg>
    <Tit t={alguem ? 'OLHADO POR ALGUÉM.' : 'UM PEDAÇO DO SOL EM OUTRO CÉU'} s={80} />
    <Etq t="ILUSTRAÇÃO" />
  </Ceu>
);
const Pedaco: React.FC = () => <OutroCeu />;
const Alguem: React.FC = () => <OutroCeu alguem />;

const Devagar: React.FC = () => <Grande t="DEVAGAR. SEM PARAR." cor={OURO} s={150} />;
const Estavel: React.FC = () => <Curva parcial />;
const CalorSobe: React.FC = () => <Grande t="E O CALOR CONTINUA SUBINDO" cor="#ff7a4a" s={130} fundo="radial-gradient(circle at 50% 45%, #2a0c06, #050202 70%)" />;
const AlguemNaTerra: React.FC = () => <Clip src="fimsol/r328726.mp4" ini={6} etq="IMAGEM REAL · ILUSTRATIVA" t="SE ALGUÉM AINDA ESTIVESSE AQUI…" />;
const Ordem: React.FC = () => <Grande t="JÚPITER E SATURNO" sub="OS GIGANTES QUE MANTINHAM TUDO EM ORDEM" cor={OURO} s={150} />;
const CemBi: React.FC = () => <Grande t="~100 BILHÕES DE ANOS" sub="O SISTEMA SOLAR JÁ SE DESFEZ (ESTIMATIVA)" cor="#9aa8c2" s={130} fundo="#000" />;
const EsfriandoBranca: React.FC = () => <Ceu n={120}><Ana x={960} y={560} r={150} /><Tit t="A ANÃ BRANCA VAI ESFRIANDO" /><Etq t="ILUSTRAÇÃO" /></Ceu>;
const Absurdo: React.FC = () => <Grande t="UM NÚMERO ABSURDO?" cor={OURO} s={150} fundo="#000" />;
const Calculos: React.FC = () => <Card topo="ALGUNS CÁLCULOS · HIPÓTESE" meio="ANÃS NEGRAS MAIS PESADAS" rodape="BEM MAIORES QUE A DO SOL" cor={OURO} />;
const ESol: React.FC = () => <Grande t="E O SOL?" sub="NEM ELE ACABA DE VERDADE" cor={OURO} s={180} />;

const Fim: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <Sol x={960} y={420} r={80} o={s} />
      <div style={{position: 'absolute', top: 600, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena ----------
const PLANO: [string, React.FC][][] = [
  [['a terra vai morrer duas vezes', Duas], ['e em junho de 2026', Junho], ['a terra pode escapar', PodeEscapar], ['so que nao do jeito', NaoDoJeito], ['voce vai ver tudo', VerTudo],
    ['o ultimo ar', UltimoAr], ['a ultima planta', UltimaPlanta], ['o sol inchando', Inchando], ['e o sistema solar inteiro', Desfazendo], ['vamos avancar o relogio', Relogio],
    ['depois em numeros que nem', SemNome], ['e no fim tem uma coisa', NoFim]],
  [['olha pro sol', OlhaSol], ['ele tem uns quatro bilhoes', Metade], ['ele esta ficando mais forte', MaisForte], ['devagar sem parar', Devagar], ['voce nao sente', NaoSente], ['mas e exatamente isso', VaiMatar],
    ['primeiro a vida', DuasMortes]],
  [['daqui a cerca de um bilhao', Respira], ['e nao tem ar', SemAr], ['um estudo publicado em 2021', Ozaki], ['a resposta mais ou menos', UmBilhao], ['depois disso a terra vira', Metano],
    ['sem camada de ozonio', Ozonio], ['e nao e aos poucos', Estavel], ['o oxigenio despenca', Despenca], ['de volta a niveis', Niveis], ['e o calor continua subindo', CalorSobe], ['alguns modelos mostram', Vapor], ['o ceu azul que voce conhece', Lembranca]],
  [['as plantas tentam resistir', Resistir], ['com o sol mais quente', Co2], ['as plantas comuns', Comuns], ['as mais resistentes', Milho], ['ate que por volta de', Fotossintese],
    ['depois disso e o calor', Calor], ['a ultima folha verde', Folha], ['e sem plantas', Nada], ['essa e a primeira morte', Primeira], ['o planeta continua la', Morto]],
  [['enquanto isso la em cima', RelogioPerfeito], ['eles se puxam', Puxam], ['em 2009 cientistas simularam', Laskar], ['em cerca de uma em cada cem', UmEm100], ['e os planetas podem ate', Chocar],
    ['estrelas que passam perto', Passam], ['mas na enorme maioria', Maioria], ['e no meio disso tudo', Andromeda], ['o que nao aguenta mesmo', NaoAguenta]],
  [['daqui a uns cinco bilhoes', Combustivel], ['e ele comeca a inchar', Incha], ['vira uma gigante vermelha', GiganteV], ['mercurio vai ser o primeiro', Mercurio],
    ['se alguem ainda estivesse', AlguemNaTerra], ['seria uma parede vermelha', ParedeV], ['e o sol nao para de crescer', Cresce]],
  [['no auge o sol fica', Auge], ['a borda dele chega', Borda], ['venus e engolido', Venus], ['e a terra aqui a ciencia', EATerra], ['em 2008 um estudo', Em2008],
    ['mas em junho de 2026', Em2026], ['usou dados novos', Puppis], ['e a resposta mudou', Mudou], ['so que escapar nao e', Torrada], ['e os proprios autores', Autores],
    ['engolida ou torrada', OuTorrada], ['marte mais longe', Marte]],
  [['depois do auge', Camadas], ['talvez forme uma nebulosa', Nebulosa], ['um estudo de 2018', Gesicki], ['outro diz que nao', Nenhuma], ['o que sobra e o nucleo', Nucleo],
    ['um pouco mais da metade', Tamanho]],
  [['e o relogio continua', Continua], ['daqui a uns trinta bilhoes', Gigantes], ['os gigantes que mantinham', Ordem], ['em uns cem bilhoes', CemBi], ['os planetas que sobraram', Perdidos], ['em trilhoes de anos', SemEstrelas], ['e a ana branca que um dia', EsfriandoBranca], ['ate virar uma ana negra', Esfria],
    ['daqui a uns mil trilhoes', MilTrilhoes], ['nenhuma ana negra existe', Nenhuma2], ['e se voce quiser um numero', Absurdo], ['alguns calculos dizem', Calculos], ['podem explodir depois', MilZeros]],
  [['mas espera', Espera], ['tudo isso leva bilhoes', Humanidade], ['e tem uma coisa que quase', Sobrevivem], ['a oitenta anos luz daqui', Wd1856], ['uma volta a cada trinta', Horas34],
    ['este ano o telescopio webb', Webb], ['e a quatro mil anos luz', Kmt], ['pode ser um retrato', Retrato], ['e nao e raro', NaoRaro], ['os cientistas conseguem ver', Espectro],
    ['e o sol nem ele acaba', ESol], ['o gas que ele soltar', Helix], ['e novos planetas', Novos], ['talvez um dia um pedaco', Pedaco], ['olhado por alguem', Alguem]],
];

const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'fimsol/narracao.mp3', musica: 'fimsol/musica.mp3', volta: 9, fim: Fim,
  selos: [
    {texto: 'ESTIMATIVA', de: 'daqui a cerca de um bilhao', ate: 'daqui a uns mil trilhoes', linha: 0},
    {texto: 'FONTES DIVERGEM', de: 'e a terra aqui a ciencia', ate: 'marte mais longe', linha: 1},
    {texto: 'FONTES DIVERGEM', de: 'um estudo de 2018', ate: 'o que sobra e o nucleo', linha: 1},
    {texto: 'HIPÓTESE', de: 'daqui a uns mil trilhoes', ate: 'mas espera', linha: 0},
  ],
  cantos: [{frase: 'daqui a uns mil trilhoes', texto: '+10¹⁵ ANOS'}],
  hits: [{frase: 'essa e a primeira morte', off: 6, vol: 0.5}, {frase: 'engolida ou torrada', off: 4}, {frase: 'e nao tem ar', off: 2}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail: Terra torrada (foto real da Apollo 17 com filtro) na frente de um Sol vermelho gigante ----------
const TerraFoto: React.FC<{x: number; y: number; R: number}> = ({x, y, R}) => {
  const E = (2 * R) / 0.666;   // o disco ocupa 66,6% da foto
  return (
    <>
      <Img src={staticFile('fimsol/nasa_as17-148-22727.jpg')} style={{position: 'absolute', left: x - E * 0.501, top: y - E * 0.508, width: E, height: E,
        clipPath: `circle(${R}px at ${E * 0.501}px ${E * 0.508}px)`, filter: 'sepia(1) saturate(3.2) hue-rotate(-32deg) brightness(.72) contrast(1.35)'}} />
      <div style={{position: 'absolute', left: x - R, top: y - R, width: 2 * R, height: 2 * R, borderRadius: '50%',
        background: 'radial-gradient(circle at 80% 45%, rgba(255,150,60,.35), transparent 45%), radial-gradient(circle at 20% 55%, transparent 35%, rgba(0,0,0,.75) 75%)',
        boxShadow: '0 0 60px rgba(255,90,30,.6), inset -18px 0 40px rgba(255,140,60,.5)'}} />
    </>
  );
};
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 80% 50%, #3a0a04, #050102 70%)', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {Array.from({length: 120}, (_, i) => <div key={i} style={{position: 'absolute', left: random('tx' + i) * 900, top: random('ty' + i) * 1080, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.3 + 0.5 * random('to' + i)}} />)}
    <div style={{position: 'absolute', left: 1700 - 1100, top: 540 - 1100, width: 2200, height: 2200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,80,30,.55) 60%, rgba(255,80,30,0) 72%)'}} />
    <Bola x={1700} y={540} r={760} bg={GIGANTE} />
    <TerraFoto x={1130} y={600} R={260} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.7), rgba(0,0,0,.3) 32%, rgba(0,0,0,0) 62%)'}} />
    <div style={{position: 'absolute', left: 70, top: 300, fontFamily: FONTE, fontSize: 200, lineHeight: 0.92, letterSpacing: -5, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
      <div style={{color: '#fff'}}>MORRE</div><div style={{color: OURO}}>2 VEZES</div>
    </div>
    <div style={{position: 'absolute', left: 80, top: 150, padding: '12px 30px', borderRadius: 16, background: VERMELHO, fontFamily: FONTE, fontSize: 56, color: '#fff', letterSpacing: 3, transform: 'rotate(-3deg)', boxShadow: '0 10px 30px rgba(0,0,0,.6)'}}>2026</div>
  </AbsoluteFill>
);
