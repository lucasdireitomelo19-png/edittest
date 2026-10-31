// Short POV "Você viajou 1 ano. A Terra envelheceu 70." Roteiro do Roteirista (roteiros/lote_2026-10-31_paradoxos.md #1, v1), aprovado pelo dono em 31/10.
// Voz edge-tts Antonio. Reais (NASA): relógio atômico (DSAC, JPL), Boeing 747 em voo (Ames), Terra Blue Marble (Suomi NPP).
// O resto é ilustração/animação própria. Nenhuma cena nem imagem se repete (regra do dono, 30/10).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO} from '../comum';
import palavras from './gemeos.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce volta de uma viagem', 'de um ano e todo', 'e todo mundo', 'ja morreu', 'imagina uma nave', 'quase de imediato', 'a noventa e nove', 'pra voce a ida', 'na terra passam',
  'os seus pais', 'os seus amigos', 'acabou', 'isso nao e ficcao', 'em 1971', 'cientistas levaram', 'e eles voltaram', 'por bilionesimos', 'exatamente como',
  'o problema e chegar', 'uma nave de mil', 'setenta vezes maior', 'hoje e impossivel', 'mas se fosse', 'e e uma viagem', 'pro futuro',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('isso nao e ficcao');
export const DURACAO = TEMPO.FIM;
const PELE = '#e8d2c0';
const AZUL = '#7aa7ff';

// ---------- peças ----------
const img = (s: string) => staticFile('gemeos/' + s);
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; filtro?: string; contain?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.18], pos = 'center', filtro, contain, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: contain ?? '#000', overflow: 'hidden'}}>
      <Img src={img(src)} style={{width: contain ? 940 : '100%', height: contain ? 'auto' : '100%', position: contain ? 'absolute' : undefined, top: contain ? 720 : undefined, left: contain ? 70 : undefined, borderRadius: contain ? 28 : undefined,
        objectFit: 'cover', objectPosition: pos, filter: filtro, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      {!contain && <Sombra />}
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '20px 40px', margin: '0 50px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Pessoa: React.FC<{x: number; y: number; h: number; cor?: string; op?: number}> = ({x, y, h, cor = PELE, op = 1}) => (
  <g transform={`translate(${x} ${y})`} fill={cor} opacity={op}>
    <circle cy={-h * 0.86} r={h * 0.12} />
    <path d={`M${-h * 0.2} 0 L${-h * 0.22} ${-h * 0.5} Q${-h * 0.2} ${-h * 0.72} 0 ${-h * 0.72} Q${h * 0.2} ${-h * 0.72} ${h * 0.22} ${-h * 0.5} L${h * 0.2} 0 Z`} />
  </g>
);
const Nave: React.FC<{s?: number; chama?: number}> = ({s = 1, chama = 0}) => (
  <g transform={`scale(${s})`}>
    {chama > 0 && <path d={`M-40 150 Q0 ${150 + 260 * chama} 40 150 Z`} fill={OURO} opacity={0.9} />}
    {chama > 0 && <path d={`M-22 150 Q0 ${150 + 170 * chama} 22 150 Z`} fill="#fff" />}
    <path d="M0 -230 C 60 -150 70 -40 70 120 L -70 120 C -70 -40 -60 -150 0 -230 Z" fill="#dfe6f2" stroke="#8090a8" strokeWidth={6} />
    <circle cy={-90} r={30} fill={CIANO} stroke="#405070" strokeWidth={6} />
    <path d="M-70 40 L-130 150 L-70 130 Z M70 40 L130 150 L70 130 Z" fill={VERMELHO} />
    <rect x={-50} y={120} width={100} height={30} fill="#55607a" />
  </g>
);

// ---------- cenas ----------
// 1. gancho: a porta de casa abre e entra luz fria e poeira
const Porta: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 30], [0, 70], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#050608', transform: shake(f, f < 8 ? 10 : 2)}}>
      <div style={{position: 'absolute', left: 290, top: 520, width: 500, height: 960, background: 'linear-gradient(180deg,#cfe0ff,#6c7f9e)', boxShadow: '0 0 200px rgba(180,210,255,.6)'}} />
      <div style={{position: 'absolute', left: 290, top: 520, width: 500, height: 960, background: '#3a2416', border: '10px solid #1a0f08', transformOrigin: '0 50%',
        transform: `perspective(1400px) rotateY(${-a}deg)`}}>
        <div style={{position: 'absolute', right: 40, top: 470, width: 34, height: 34, borderRadius: 17, background: OURO}} />
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 50}, (_, i) => <circle key={i} cx={300 + random('px' + i) * 600 + Math.sin(f * 0.05 + i) * 20} cy={560 + random('py' + i) * 900 - f * 0.8 * random('pv' + i)} r={2 + random('pr' + i) * 4} fill="#fff" opacity={0.5} />)}
      </svg>
      <Titulo texto="VOCÊ VOLTOU PRA CASA" y={260} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 2. uma mala com a etiqueta "1 ANO"
const Mala: React.FC = () => {
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #2a2014, #050403 70%)'}}>
      <div style={{position: 'absolute', left: 440, top: 640, width: 200, height: 90, border: '22px solid #2a2a2a', borderBottom: 'none', borderRadius: '40px 40px 0 0'}} />
      <div style={{position: 'absolute', left: 240, top: 720, width: 600, height: 620, borderRadius: 40, background: 'linear-gradient(135deg,#8a4b22,#4a240e)', boxShadow: '0 40px 80px rgba(0,0,0,.7)'}}>
        {[150, 450].map((x) => <div key={x} style={{position: 'absolute', left: x - 12, top: 0, width: 24, height: '100%', background: '#2a160a'}} />)}
      </div>
      <div style={{position: 'absolute', left: 560, top: 980, padding: '20px 36px', background: '#f4efe6', borderRadius: 12, fontFamily: FONTE, fontSize: 96, color: '#1a1a1a',
        transform: `rotate(${-10 + 6 * s}deg) scale(${s})`, boxShadow: '0 20px 40px rgba(0,0,0,.6)'}}>1 ANO</div>
      <Titulo texto="UMA VIAGEM DE 1 ANO" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 3. a mesa de jantar vazia, cadeiras com poeira
const Mesa: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#1a1712,#060504)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={540} cy={1060} rx={380} ry={120} fill="#4a3424" />
        {[-1, 1].map((l) => [0, 1, 2].map((k) => (
          <g key={l + '-' + k} transform={`translate(${540 + l * (430 - k * 40)} ${930 + k * 130})`}>
            <rect x={-40} y={-200} width={80} height={200} rx={10} fill="#2c1e14" stroke="#5a4636" strokeWidth={4} />
            <rect x={-60} y={0} width={120} height={24} fill="#2c1e14" />
          </g>
        )))}
        {Array.from({length: 70}, (_, i) => <circle key={i} cx={random('dx' + i) * 1080} cy={(random('dy' + i) * 1920 + f * 1.5) % 1920} r={2 + random('dr' + i) * 3} fill="#d8c8a8" opacity={0.35} />)}
      </svg>
      <Titulo texto="TODO MUNDO QUE VOCÊ AMAVA" y={300} size={96} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 4. retrato com a faixa preta de luto
const Luto: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 8], [1.3, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', left: 290, top: 600, width: 500, height: 640, border: '24px solid #6a5232', background: '#2a2a2a', transform: `scale(${s})`, overflow: 'hidden'}}>
        <svg width={452} height={592}><Pessoa x={226} y={620} h={560} cor="#777" /></svg>
        <div style={{position: 'absolute', right: -80, top: 40, width: 360, height: 60, background: '#000', transform: 'rotate(45deg)'}} />
      </div>
      <Titulo texto="JÁ MORREU" y={300} size={150} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 5. a nave parada no espaço
const NaveParada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a1430, #010208 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 160}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.8 + random('sr' + i) * 2.2} fill="#fff" opacity={0.3 + 0.7 * random('so' + i)} />)}
        <g transform={`translate(540 ${1020 + Math.sin(f * 0.1) * 10})`}><Nave s={1.6} /></g>
      </svg>
      <Titulo texto="IMAGINA UMA NAVE" y={300} size={120} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 6. ela dispara: estrelas viram riscos
const Dobra: React.FC = () => {
  const f = useCurrentFrame();
  const v = interpolate(f, [0, 25], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#01030a', overflow: 'hidden', transform: shake(f, 4 + 10 * v)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 150}, (_, i) => {
          const x = random('wx' + i) * 1080, y0 = (random('wy' + i) * 1920 + f * 60 * v * (0.5 + random('wv' + i))) % 1920;
          return <line key={i} x1={x} y1={y0} x2={x} y2={y0 - 6 - 600 * v * random('wl' + i)} stroke={i % 5 ? '#fff' : CIANO} strokeWidth={2 + 2 * random('ww' + i)} opacity={0.8} />;
        })}
        <g transform="translate(540 1000)"><Nave s={1.4} chama={0.4 + v} /></g>
      </svg>
      <Titulo texto="QUASE DE IMEDIATO" y={300} size={120} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 7. velocímetro chegando a 99,99% da luz
const Velocimetro: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const ang = -210 + 240 * p;
  const pct = (99.99 * p).toFixed(2).replace('.', ',');
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1030, #030108 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(540 980)">
          <circle r={360} fill="#0a0a14" stroke="#333a50" strokeWidth={16} />
          {Array.from({length: 25}, (_, i) => { const a = (-210 + i * 10) * Math.PI / 180; return <line key={i} x1={Math.cos(a) * 300} y1={Math.sin(a) * 300} x2={Math.cos(a) * 340} y2={Math.sin(a) * 340} stroke={i > 20 ? VERMELHO : '#8890a8'} strokeWidth={8} />; })}
          <line x1={0} y1={0} x2={Math.cos(ang * Math.PI / 180) * 290} y2={Math.sin(ang * Math.PI / 180) * 290} stroke={OURO} strokeWidth={14} strokeLinecap="round" />
          <circle r={30} fill={OURO} />
        </g>
      </svg>
      <div style={{position: 'absolute', top: 1080, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 110, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{pct}%</div>
      <Selo texto={'99,99% DA LUZ\nSE A NAVE CHEGASSE A ESSA\nVELOCIDADE QUASE DE IMEDIATO'} y={250} size={46} cor={OURO} delay={0} />
      <Etiqueta texto="ANIMAÇÃO · CÁLCULO" />
    </AbsoluteFill>
  );
};
// 8. relógio de pulso de bordo: 1 ano
const RelogioPulso: React.FC = () => {
  const f = useCurrentFrame();
  const meses = Math.min(12, Math.floor(f / 5));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0c1220,#05070c)'}}>
      <div style={{position: 'absolute', left: 390, top: 400, width: 300, height: 1200, background: '#1c1c22', borderRadius: 40}} />
      <div style={{position: 'absolute', left: 240, top: 700, width: 600, height: 600, borderRadius: 300, background: '#0b0f18', border: '24px solid #8a96ac', boxShadow: `0 0 80px ${CIANO}55`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{fontFamily: FONTE, fontSize: 44, color: CIANO, letterSpacing: 4}}>A BORDO</div>
        <div style={{fontFamily: FONTE, fontSize: 150, color: '#fff', fontVariantNumeric: 'tabular-nums'}}>{meses === 12 ? '1 ANO' : `${meses} M`}</div>
      </div>
      <Titulo texto="PRA VOCÊ: 1 ANO" y={260} size={120} cor={CIANO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 9. o calendário da Terra voando em décadas
const Calendario: React.FC = () => {
  const f = useCurrentFrame();
  const anos = Math.round(interpolate(f, [0, 40], [0, 70], {...clamp, easing: Easing.in(Easing.quad)}));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#1a0806,#3a1208)', transform: shake(f, 3)}}>
      {Array.from({length: 8}, (_, i) => {
        const t = (f * 0.18 + i / 8) % 1;
        return <div key={i} style={{position: 'absolute', left: 300 + Math.sin(i * 2.1) * 260, top: 1200 - t * 900, width: 160, height: 190, background: '#f4efe6', borderTop: `30px solid ${VERMELHO}`,
          opacity: 1 - t, transform: `rotate(${(t - 0.5) * 120 * (i % 2 ? 1 : -1)}deg)`, fontFamily: FONTE, fontSize: 60, color: '#333', textAlign: 'center', lineHeight: '160px'}}>{2026 + i * 10}</div>;
      })}
      <div style={{position: 'absolute', top: 820, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 300, color: OURO, fontVariantNumeric: 'tabular-nums', textShadow: '0 10px 50px #000'}}>{anos}</div>
      <Texto y={1150} size={70} cor="#fff">ANOS NA TERRA</Texto>
      <Selo texto={'VOCÊ: 1 ANO  ×  TERRA: 70 ANOS\n(CÁLCULO)'} y={250} size={50} cor={OURO} delay={0} />
    </AbsoluteFill>
  );
};
// 10. a foto dos pais desbotando
const Pais: React.FC = () => {
  const f = useCurrentFrame();
  const d = interpolate(f, [0, 30], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#0d0b09'}}>
      <div style={{position: 'absolute', left: 190, top: 620, width: 700, height: 760, padding: 30, background: '#f1e8d6', transform: 'rotate(-4deg)', boxShadow: '0 30px 60px rgba(0,0,0,.7)',
        filter: `sepia(${d}) brightness(${1 + d * 0.7}) contrast(${1 - d * 0.6})`}}>
        <svg width={640} height={600} style={{background: 'linear-gradient(180deg,#5a7ab0,#c0a070)'}}>
          <Pessoa x={220} y={620} h={520} cor="#3a2a22" /><Pessoa x={420} y={620} h={480} cor="#5a3a2c" />
        </svg>
      </div>
      <Titulo texto="OS SEUS PAIS" y={300} size={130} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 11. os amigos virando pó
const Amigos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 60%, #1c2430, #040507 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3].map((k) => <Pessoa key={k} x={200 + k * 230} y={1380} h={560 - (k % 2) * 60} cor="#8da0b8" op={interpolate(f, [k * 5, k * 5 + 20], [1, 0], clamp)} />)}
        {Array.from({length: 220}, (_, i) => {
          const k = i % 4, t = interpolate(f, [k * 5, k * 5 + 30], [0, 1], clamp);
          return <circle key={i} cx={200 + k * 230 + (random('ax' + i) - 0.5) * 220 + t * 300 * random('av' + i)} cy={900 + random('ay' + i) * 480 - t * 400 * random('aw' + i)} r={3 + random('ar' + i) * 4} fill="#8da0b8" opacity={t > 0 ? 1 - t * 0.9 : 0} />;
        })}
      </svg>
      <Titulo texto="OS SEUS AMIGOS" y={300} size={130} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 12. acabou: a linha do monitor cardíaco fica reta
const Acabou: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 20], [0, 1080], clamp);
  const pts = Array.from({length: 109}, (_, i) => { const px = i * 10; const y = px < 520 && (px % 260 > 180 && px % 260 < 220) ? (px % 260 < 200 ? 800 : 1100) : 960; return `${px},${y}`; }).join(' ');
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><clipPath id="ac"><rect x={0} y={0} width={x} height={1920} /></clipPath></defs>
        <polyline points={pts} fill="none" stroke="#3ddc84" strokeWidth={8} clipPath="url(#ac)" />
      </svg>
      <Titulo texto="ACABOU" y={300} size={170} cor="#fff" />
    </AbsoluteFill>
  );
};
// 13. virada
const NaoFiccao: React.FC = () => <Glitch texto={'NÃO É\nFICÇÃO'} size={210} cor={OURO} fundo="#05050a" />;
// 14. 1971: cartão de arquivo do experimento
const Ano1971: React.FC = () => {
  const s = useSpring(3);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#1e1608,#0a0703)'}}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 700, height: 460, background: '#e8dcc0', borderRadius: 10, boxShadow: '0 30px 60px rgba(0,0,0,.6)', opacity: s, transform: `translateY(${(1 - s) * 200}px) rotate(-2deg)`}}>
        <div style={{height: 70, background: '#b8a37a'}} />
        <div style={{padding: '50px 50px', fontFamily: FONTE, fontSize: 86, color: '#2a1e10', lineHeight: 1.1}}>HAFELE–KEATING<br /><span style={{color: VERMELHO}}>· 1971</span></div>
      </div>
      <Titulo texto="O TESTE DE VERDADE" y={300} size={110} />
      <Etiqueta texto="FATO · SCIENCE, 1972" />
    </AbsoluteFill>
  );
};
// 15. real: um relógio atômico
const Atomico: React.FC = () => (
  <Foto src="relogio_atomico.jpg" etq="IMAGEM REAL · UM RELÓGIO ATÔMICO · NASA" z={[1.0, 1.1]} contain="radial-gradient(circle at 50% 50%, #1c2230, #04060a 75%)">
    <Titulo texto="RELÓGIOS ATÔMICOS EM AVIÕES" y={300} size={92} />
  </Foto>
);
// 16. real: avião de linha em voo, com os dois relógios se separando
const Aviao: React.FC = () => {
  const f = useCurrentFrame();
  const dif = Math.round(interpolate(f, [10, 70], [0, 59], clamp));
  return (
    <Foto src="aviao_747.jpg" etq="IMAGEM REAL · BOEING 747 EM VOO · NASA" z={[1.15, 1.3]} pos="40% 60%">
      <div style={{position: 'absolute', top: 1090, left: 120, right: 120, display: 'flex', flexDirection: 'column', gap: 18}}>
        {[['NO AVIÃO', dif, OURO], ['NO CHÃO', 0, CIANO]].map(([t, n, c]) => (
          <div key={t as string} style={{padding: '14px 26px', background: 'rgba(0,0,0,.78)', borderRadius: 16, fontFamily: FONTE, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontSize: 32, color: c as string}}>{t}</span>
            <span style={{fontSize: 46, fontVariantNumeric: 'tabular-nums'}}>12:00:00,{String(n).padStart(9, '0')}</span>
          </div>
        ))}
      </div>
      <Titulo texto="VOLTARAM FORA DE SINCRONIA" y={300} size={96} />
    </Foto>
  );
};
// 17. bilionésimos de segundo: zoom num ponteiro
const Nano: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 45], [1, 3], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#06080e', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff', transform: `scale(${z})`, letterSpacing: 2}}>
        0,00000000<span style={{color: OURO}}>1</span> s
      </div>
      <Texto y={1180} size={60} cor={OURO} delay={6}>NANOSSEGUNDOS</Texto>
      <Titulo texto="BILIONÉSIMOS DE SEGUNDO" y={300} size={100} />
      <Etiqueta texto="FATO" />
    </AbsoluteFill>
  );
};
// 18. previsto: carimbo de confere sobre a relatividade
const Previsto: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [4, 10], [2.2, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c2418, #020604 70%)'}}>
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff'}}>RELATIVIDADE</div>
      <div style={{position: 'absolute', top: 920, width: '100%', display: 'flex', justifyContent: 'center', opacity: f >= 4 ? 1 : 0}}>
        <div style={{padding: '20px 40px', border: '10px solid #3ddc84', borderRadius: 18, fontFamily: FONTE, fontSize: 100, color: '#3ddc84', transform: `rotate(-6deg) scale(${s})`}}>✔ PREVISTO</div>
      </div>
      <Titulo texto="EXATAMENTE COMO PREVIA" y={300} size={100} />
    </AbsoluteFill>
  );
};
// 19. o problema: a barra de velocidade emperra
const Problema: React.FC = () => {
  const f = useCurrentFrame();
  const p = Math.min(0.62, interpolate(f, [0, 30], [0, 0.7], clamp)) + (f > 30 ? Math.sin(f * 2) * 0.006 : 0);
  return (
    <AbsoluteFill style={{background: '#0a0a12'}}>
      <div style={{position: 'absolute', left: 120, right: 120, top: 920, height: 110, borderRadius: 55, background: '#1e2030', overflow: 'hidden', border: '6px solid #444a60'}}>
        <div style={{width: `${p * 100}%`, height: '100%', background: `linear-gradient(90deg, ${CIANO}, ${VERMELHO})`}} />
      </div>
      <div style={{position: 'absolute', left: 120 + 840 * 0.9999 - 10, top: 880, width: 10, height: 190, background: OURO}} />
      <Texto y={1100} size={48} cor={OURO}>99,99% DA LUZ</Texto>
      <Titulo texto="O PROBLEMA É CHEGAR LÁ" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 20. uma nave de mil toneladas, ao lado de uma pessoa minúscula
const MilToneladas: React.FC = () => {
  const s = useSpring(2, {damping: 14, mass: 1});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#05070e,#141a2a)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(560 1080) scale(${0.4 + 0.6 * s})`}><Nave s={2.6} /></g>
        <Pessoa x={180} y={1400} h={70} cor={OURO} />
        <line x1={0} y1={1402} x2={1080} y2={1402} stroke="#334" strokeWidth={4} />
      </svg>
      <Selo texto="1.000 TONELADAS" y={1380} size={64} cor="#fff" delay={6} />
      <Titulo texto="UMA NAVE DE MIL TONELADAS" y={260} size={96} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 21. a régua de energia estoura
const Energia: React.FC = () => {
  const f = useCurrentFrame();
  const h = interpolate(f, [0, 45], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const estourou = f > 45;
  return (
    <AbsoluteFill style={{background: '#08040a', transform: estourou ? shake(f, 12) : undefined}}>
      <div style={{position: 'absolute', left: 200, bottom: 700, width: 160, height: 160, background: CIANO, borderRadius: 12}} />
      <div style={{position: 'absolute', left: 200, bottom: 650, width: 160, textAlign: 'center', fontFamily: FONTE, fontSize: 30, color: CIANO}}>×1</div>
      <div style={{position: 'absolute', left: 620, bottom: 700, width: 260, height: Math.min(900, 900 * h), background: `linear-gradient(0deg, ${OURO}, ${VERMELHO})`, borderRadius: 12,
        boxShadow: estourou ? `0 0 120px ${VERMELHO}` : undefined}} />
      <div style={{position: 'absolute', left: 620, bottom: 650, width: 260, textAlign: 'center', fontFamily: FONTE, fontSize: 30, color: OURO}}>≈ ×70</div>
      <Texto y={1300} size={34} cor="#cfd8e8">ENERGIA DA MASSA DA NAVE · ENERGIA PRA ACELERAR</Texto>
      <Selo texto={'≈ 70× A ENERGIA DA PRÓPRIA MASSA\n(CÁLCULO)'} y={250} size={48} cor={OURO} delay={0} />
      <Etiqueta texto="FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
// 22. carimbo: impossível, sobre a planta da nave
const Impossivel: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [3, 9], [2.4, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#0b2a55', backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.12) 2px, transparent 2px)', backgroundSize: '60px 60px'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(540 1050) scale(2.2)" fill="none" stroke="#cfe0ff" strokeWidth={2}>
          <path d="M0 -230 C 60 -150 70 -40 70 120 L -70 120 C -70 -40 -60 -150 0 -230 Z" /><circle cy={-90} r={30} /><path d="M-70 40 L-130 150 L-70 130 Z M70 40 L130 150 L70 130 Z" />
        </g>
      </svg>
      <div style={{position: 'absolute', top: 900, width: '100%', display: 'flex', justifyContent: 'center', opacity: f >= 3 ? 1 : 0}}>
        <div style={{padding: '24px 44px', border: `12px solid ${VERMELHO}`, borderRadius: 18, fontFamily: FONTE, fontSize: 120, color: VERMELHO, background: 'rgba(0,0,0,.4)', transform: `rotate(-10deg) scale(${s})`}}>IMPOSSÍVEL</div>
      </div>
      <Titulo texto="HOJE" y={300} size={150} />
    </AbsoluteFill>
  );
};
// 23. o preço: ampulheta escorrendo
const Ampulheta: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 80], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a1c06, #050300 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform="translate(540 1000)">
          <defs><clipPath id="ampc"><path d="M-260 -420 L260 -420 L20 0 L260 420 L-260 420 L-20 0 Z" /></clipPath></defs>
          <g clipPath="url(#ampc)">
            <rect x={-300} y={-420 + 400 * t} width={600} height={420 - 400 * t} fill={OURO} />
            <rect x={-300} y={420 - 400 * t} width={600} height={400 * t} fill={OURO} />
            <rect x={-6} y={-20} width={12} height={440} fill={OURO} opacity={t < 1 ? 1 : 0} />
          </g>
          <path d="M-260 -420 L260 -420 L20 0 L260 420 L-260 420 L-20 0 Z" fill="none" stroke="#e8e0cc" strokeWidth={10} />
          <rect x={-320} y={-470} width={640} height={50} rx={10} fill="#5a3a1a" /><rect x={-320} y={420} width={640} height={50} rx={10} fill="#5a3a1a" />
        </g>
      </svg>
      <Titulo texto="O TEMPO COBRA O PREÇO" y={260} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 24. placa: só ida
const SoIda: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(2, {damping: 8, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#14181f,#050608)'}}>
      <div style={{position: 'absolute', left: 525, top: 1100, width: 30, height: 700, background: '#777'}} />
      <div style={{position: 'absolute', left: 140, top: 780, width: 800, height: 320, background: '#1f6fd0', border: '14px solid #fff', borderRadius: 24, transform: `scale(${s}) rotate(${Math.sin(f * 0.2) * 1.5}deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, fontFamily: FONTE, fontSize: 110, color: '#fff'}}>SÓ IDA <span style={{fontSize: 150}}>➜</span></div>
      <Titulo texto="UMA VIAGEM SÓ DE IDA" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 25. real: a Terra vista de longe, seta para o futuro
const Futuro: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [6, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Foto src="terra.jpg" etq="IMAGEM REAL · TERRA · NASA" z={[1.0, 0.8]}>
      <div style={{position: 'absolute', top: 1340, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: OURO, opacity: x, transform: `translateX(${(1 - x) * -300}px)`, textShadow: '0 8px 40px #000'}}>→ FUTURO</div>
      <Titulo texto="PRO FUTURO" y={300} size={130} />
    </Foto>
  );
};

const CENAS = [Porta, Mala, Mesa, Luto, NaveParada, Dobra, Velocimetro, RelogioPulso, Calendario, Pais, Amigos, Acabou, NaoFiccao, Ano1971, Atomico, Aviao, Nano, Previsto,
  Problema, MilToneladas, Energia, Impossivel, Ampulheta, SoIda, Futuro];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="gemeos/narracao.mp3" calma={CALMA} sons={SONS} />;
