// Thumbs v2 do lote "Linha dos campeões" (lado-87 a 93), pedido do dono em 04/11: "As thumbs não estão chamativas, quero com clickbait".
// Fórmula aprovada antes (Big Rip v3, Área 51): foto real de fundo, texto gigante amarelo e branco com contorno preto, seta e círculo vermelhos, faixa amarela.
// Clickbait vende a pergunta ou o número real, nunca um fato falso (S8 "TALVEZ NÃO", S5 "IA" no passado, longos com selo "E SE").
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {FONTE, OURO, VERMELHO, VERDE} from '../comum';

const Base: React.FC<{children: React.ReactNode; fundo?: string}> = ({children, fundo = '#000'}) => (
  <AbsoluteFill style={{background: fundo, overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {children}
  </AbsoluteFill>
);
type Linha = {t: string; s: number; c?: string; rot?: number};
const Texto: React.FC<{linhas: Linha[]; x?: number; y: number; w: number; alinhar?: 'left' | 'center'}> = ({linhas, x = 0, y, w, alinhar = 'center'}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, textAlign: alinhar, fontFamily: FONTE, lineHeight: 0.92, letterSpacing: -4}}>
    {linhas.map((l, i) => <div key={i} style={{fontSize: l.s, color: l.c ?? '#fff', WebkitTextStroke: `${Math.max(10, l.s / 12)}px #000`, paintOrder: 'stroke fill',
      textShadow: '0 14px 40px rgba(0,0,0,.95)', transform: l.rot ? `rotate(${l.rot}deg)` : undefined}}>{l.t}</div>)}
  </div>
);
const Faixa: React.FC<{t: string; x: number; y: number; cor?: string; s?: number; rot?: number; txt?: string}> = ({t, x, y, cor = OURO, s = 60, rot = -2, txt = '#111'}) => (
  <div style={{position: 'absolute', left: x, top: y, padding: '14px 34px', borderRadius: 16, background: cor, fontFamily: FONTE, fontSize: s, color: txt, transform: `rotate(${rot}deg)`,
    border: '6px solid #000', boxShadow: '0 12px 34px rgba(0,0,0,.8)', whiteSpace: 'nowrap'}}>{t}</div>
);
const Seta: React.FC<{x: number; y: number; rot: number; k?: number}> = ({x, y, rot, k = 1}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
    <rect x={-230} y={-34} width={250} height={68} fill={VERMELHO} stroke="#000" strokeWidth={8} />
    <polygon points="10,-100 150,0 10,100" fill={VERMELHO} stroke="#000" strokeWidth={8} strokeLinejoin="round" />
  </g>
);
const Circ: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <g><circle cx={x} cy={y} r={r} fill="none" stroke="#000" strokeWidth={30} /><circle cx={x} cy={y} r={r} fill="none" stroke={VERMELHO} strokeWidth={16} /></g>
);
const Clarao: React.FC<{x: number; y: number; r: number; cor?: string; id: string}> = ({x, y, r, cor = '#ffb060', id}) => (
  <g>
    <defs><radialGradient id={id}><stop offset="0" stopColor="#fff" /><stop offset="0.18" stopColor="#fff" /><stop offset="0.45" stopColor={cor} stopOpacity={0.85} /><stop offset="1" stopColor={cor} stopOpacity={0} /></radialGradient></defs>
    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    {Array.from({length: 8}, (_, i) => <line key={i} x1={x - r * 1.3} x2={x + r * 1.3} y1={y} y2={y} stroke="#fff" strokeWidth={8} opacity={0.75} transform={`rotate(${i * 22.5} ${x} ${y})`} />)}
  </g>
);
const V: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{children}</svg>;
const H: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{children}</svg>;
const sombraV = <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.5), transparent 25%, transparent 45%, rgba(0,0,0,.85) 80%)'}} />;

// lado-87 · S1 Betelgeuse
export const ThumbBetelgeuse2: React.FC = () => (
  <Base>
    <Img src={staticFile('betelgeuse/orion_eso.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.3) contrast(1.2) saturate(1.3)'}} />
    {sombraV}
    <V><Clarao x={329} y={505} r={330} id="b" /><Circ x={329} y={505} r={150} /><Seta x={720} y={720} rot={-145} k={1.2} /></V>
    <Texto y={1000} w={1080} linhas={[{t: 'ESSA ESTRELA', s: 120}, {t: 'VAI', s: 150, c: OURO}, {t: 'EXPLODIR!', s: 190, c: OURO, rot: -3}]} />
    <Faixa t="E O BRASIL NÃO VAI VER" x={110} y={1600} s={64} />
  </Base>
);

// lado-88 · S5 2024 YR4
export const ThumbYr42: React.FC = () => (
  <Base>
    <Img src={staticFile('yr4/lua_ksc.jpg')} style={{position: 'absolute', left: -1824, top: -435, width: 3763, filter: 'brightness(1.15) contrast(1.2)'}} />
    {sombraV}
    <V>
      <defs><linearGradient id="fogo" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#fff2c0" /><stop offset="0.3" stopColor="#ff8a20" /><stop offset="1" stopColor="#ff2a00" stopOpacity={0} /></linearGradient></defs>
      <polygon points="300,700 330,760 -80,260 -20,230" fill="url(#fogo)" />
      <circle cx={318} cy={732} r={62} fill="#6a5a4a" stroke="#ffcf9a" strokeWidth={8} />
      <Circ x={420} y={840} r={120} />
      <Seta x={800} y={560} rot={150} k={1.1} />
    </V>
    <div style={{position: 'absolute', left: 640, top: 150, padding: '6px 26px', background: VERMELHO, border: '6px solid #000', borderRadius: 14, fontFamily: FONTE, fontSize: 110, color: '#fff', transform: 'rotate(4deg)'}}>4,3%</div>
    <Texto y={1180} w={1080} linhas={[{t: 'IA BATER', s: 170}, {t: 'NA LUA!', s: 210, c: OURO, rot: -3}]} />
    <Faixa t="A NASA RECALCULOU" x={170} y={1640} s={66} />
  </Base>
);

// lado-89 · S4 magnetar
const Cartao: React.FC = () => (
  <g transform="translate(540 1020) rotate(-10)">
    <rect x={-420} y={-260} width={840} height={520} rx={44} fill="#1a2c5a" stroke="#000" strokeWidth={10} />
    <rect x={-420} y={-170} width={840} height={110} fill="#111" />
    {Array.from({length: 9}, (_, i) => <path key={i} d={`M ${-380 + i * 95} -60 q 14 ${70 + (i % 3) * 40} 0 ${140 + (i % 3) * 60}`} stroke={i % 2 ? '#ff2a6a' : '#ffd23f'} strokeWidth={22} fill="none" strokeLinecap="round" />)}
    <rect x={-330} y={40} width={120} height={90} rx={12} fill="#d8b860" />
    <text x={-330} y={200} fontFamily={FONTE} fontSize={56} fill="#e8eeff" letterSpacing={6}>•••• •••• 4321</text>
  </g>
);
export const ThumbMagnetar2: React.FC = () => (
  <Base>
    <Img src={staticFile('magnetar/magnetar.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '68% 60%', filter: 'saturate(1.4) contrast(1.15)'}} />
    {sombraV}
    <V><Cartao /><Circ x={540} y={900} r={250} /><Seta x={300} y={560} rot={60} k={1.1} /></V>
    <Texto y={150} w={1080} linhas={[{t: 'SEU CARTÃO', s: 140}, {t: 'APAGADO!', s: 190, c: OURO, rot: -3}]} />
    <Faixa t="SE ELA CHEGAR PERTO" x={150} y={1620} s={64} />
  </Base>
);

// lado-90 · S3 planetas errantes
export const ThumbErrante2: React.FC = () => (
  <Base>
    <Img src={staticFile('errante/vialactea_eso.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) saturate(1.3)'}} />
    {sombraV}
    <V>
      <defs><radialGradient id="pn" cx="0.35" cy="0.3"><stop offset="0" stopColor="#1e2230" /><stop offset="1" stopColor="#000" /></radialGradient></defs>
      <circle cx={640} cy={780} r={430} fill="none" stroke="#9fc8ff" strokeWidth={14} opacity={0.5} style={{filter: 'blur(14px)'}} />
      <circle cx={640} cy={780} r={420} fill="url(#pn)" />
      <path d="M 560 362 A 420 420 0 0 1 1058 760" stroke="#e8f2ff" strokeWidth={14} fill="none" strokeLinecap="round" />
      <Seta x={160} y={1240} rot={-50} k={1.1} />
      <ellipse cx={880} cy={1400} rx={150} ry={50} fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />
      <circle cx={880} cy={1400} r={36} fill="#ffd860" style={{filter: 'drop-shadow(0 0 30px #ffb000)'}} />
      <text x={880} y={1490} textAnchor="middle" fontFamily={FONTE} fontSize={40} fill="#fff" stroke="#000" strokeWidth={8} paintOrder="stroke">NÓS</text>
    </V>
    <Texto y={140} w={1080} linhas={[{t: 'TRILHÕES', s: 200, c: OURO, rot: -3}, {t: 'VAGANDO NO', s: 110}, {t: 'ESCURO', s: 150}]} />
    <Faixa t="E SE UM ENTRAR AQUI?" x={130} y={1600} s={68} />
  </Base>
);

// lado-91 · S8 Sol × Terra
export const ThumbSolTerra2: React.FC = () => (
  <Base>
    <Img src={staticFile('solterra/sol_sdo.jpg')} style={{position: 'absolute', left: -640, top: 300, width: 2000, filter: 'hue-rotate(-25deg) saturate(1.8) contrast(1.2) brightness(1.1)'}} />
    {sombraV}
    <V>
      <defs><clipPath id="tc"><circle cx={870} cy={1180} r={150} /></clipPath></defs>
      <circle cx={870} cy={1180} r={160} fill="#000" />
      <image href={staticFile('solterra/terra.jpg')} x={720} y={1030} width={300} height={300} clipPath="url(#tc)" preserveAspectRatio="xMidYMid slice" />
      <Circ x={870} y={1180} r={190} />
      <Seta x={920} y={900} rot={-70} k={1} />
    </V>
    <Texto y={130} w={1080} linhas={[{t: 'O SOL VAI', s: 130}, {t: 'ENGOLIR', s: 190, c: OURO, rot: -3}, {t: 'A TERRA?', s: 150}]} />
    <Faixa t="TALVEZ NÃO!" x={330} y={1620} s={86} cor={VERDE} txt="#fff" />
  </Base>
);

// lado-92 · longo A
export const ThumbBnAno2: React.FC = () => (
  <Base>
    <Img src={staticFile('bnano/saturno.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.5) translateX(8%)', filter: 'brightness(1.25) contrast(1.15)'}} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.5) 40%, rgba(0,0,0,0) 62%)'}} />
    <H>
      <circle cx={1560} cy={330} r={260} fill="none" stroke="#ffb070" strokeWidth={14} opacity={0.6} style={{filter: 'blur(8px)'}} />
      <circle cx={1560} cy={330} r={200} fill="none" stroke="#fff" strokeWidth={8} />
      <circle cx={1560} cy={330} r={160} fill="#000" />
      <Circ x={1560} y={330} r={240} />
      <Seta x={1180} y={640} rot={-35} k={1.1} />
    </H>
    <Faixa t="365 DIAS" x={60} y={60} s={96} cor={VERMELHO} txt="#fff" rot={-3} />
    <Texto x={50} y={250} w={1150} alinhar="left" linhas={[{t: 'VOCÊ TEM', s: 150}, {t: '1 ANO!', s: 280, c: OURO, rot: -3}]} />
    <Faixa t="UM BURACO NEGRO ESTÁ VINDO" x={60} y={860} s={56} />
    <div style={{position: 'absolute', right: 50, bottom: 50, padding: '6px 22px', border: '6px solid #ff6fae', borderRadius: 14, background: 'rgba(0,0,0,.7)', fontFamily: FONTE, fontSize: 52, color: '#ff6fae'}}>E SE</div>
  </Base>
);

// lado-93 · longo B
export const ThumbSnPerto2: React.FC = () => (
  <Base>
    <Img src={staticFile('snperto/multidao.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 100%', filter: 'brightness(.75) contrast(1.25) saturate(.7)'}} />
    <AbsoluteFill style={{background: 'rgba(10,20,60,.45)'}} />
    <H><Clarao x={1500} y={300} r={480} cor="#9ab8ff" id="sn" /><Circ x={1500} y={300} r={190} /><Seta x={1300} y={700} rot={-62} k={1.1} /></H>
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.85), rgba(0,0,0,.35) 40%, rgba(0,0,0,0) 60%)'}} />
    <Texto x={50} y={90} w={1100} alinhar="left" linhas={[{t: 'ELA', s: 200, c: OURO}, {t: 'EXPLODIU!', s: 230, c: OURO, rot: -3}, {t: 'DO LADO DA TERRA', s: 96}]} />
    <Faixa t="A 30 ANOS-LUZ" x={60} y={870} s={64} cor={VERMELHO} txt="#fff" />
    <div style={{position: 'absolute', right: 50, bottom: 50, padding: '6px 22px', border: '6px solid #ff6fae', borderRadius: 14, background: 'rgba(0,0,0,.7)', fontFamily: FONTE, fontSize: 52, color: '#ff6fae'}}>E SE</div>
  </Base>
);
