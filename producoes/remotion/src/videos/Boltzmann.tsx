// Reel em POV "E se as suas MEMÓRIAS nunca aconteceram?" (cérebro de Boltzmann). Roteiro do Roteirista (reels_2026-11-02_03.md #2, v1), aprovado pelo dono em 29/10. Post: 03/11.
// POV de propósito: o dono quer testar POV nos Reels (a proibição vale só para os Shorts do YouTube). Entrega direta na versão final.
// "HIPÓTESE" fixo no canto do começo ao fim. A cor cai no fim do Universo e volta na virada do Sean Carroll. Tudo animação própria.
import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Glitch, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import palavras from './boltzmann.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'e se tudo o que', 'voce acorda', 'lembra da sua infancia', 'do que comeu ontem', 'parece tudo real', 'agora imagina o futuro', 'as estrelas se apagaram', 'sobrou um vazio frio',
  'na fisica quando', 'ate o absurdamente improvavel', 'inclusive por puro acaso', 'formarem um cerebro', 'ja com memorias', 'os fisicos deram', 'e aqui vem o susto',
  'em algumas teorias', 'e ai vem a pergunta', 'calma o fisico', 'uma teoria assim', 'se ela fosse verdade', 'nem na propria teoria', 'por isso os fisicos', 'nao pra dizer',
  'ninguem acha que voce', 'o problema e que',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('calma o fisico');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const Estrelas: React.FC<{n?: number; apaga?: number}> = ({n = 180, apaga = 0}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => { const o = (0.3 + random('so' + i) * 0.7) * (random('sa' + i) < apaga ? 0 : 1);
      return <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.8 + random('sr' + i) * 2.4} fill="#fff" opacity={o} />; })}
  </svg>
);
// quarto ao amanhecer visto da cama (POV): teto, janela com luz, pé da cama
const Quarto: React.FC<{luz?: number}> = ({luz = 1}) => {
  const f = useCurrentFrame();
  const l = luz * interpolate(f, [0, 40], [0.6, 1], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #2a2a38, #4a3a3a 60%, #2a1e1a)`, overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><linearGradient id="sol" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd9a0" stopOpacity={0.75 * l} /><stop offset="1" stopColor="#ffd9a0" stopOpacity={0} /></linearGradient></defs>
        <rect x={580} y={360} width={380} height={560} rx={8} fill={`rgba(255,200,140,${0.85 * l})`} />
        <line x1={770} y1={360} x2={770} y2={920} stroke="#3a2a24" strokeWidth={14} /><line x1={580} y1={640} x2={960} y2={640} stroke="#3a2a24" strokeWidth={14} />
        <path d={`M580 920 L960 920 L700 1900 L-100 1900 Z`} fill="url(#sol)" />
        <rect x={0} y={1450} width={1080} height={470} fill="#d8cfc4" />
        <path d="M0 1450 Q540 1380 1080 1450 L1080 1520 Q540 1460 0 1520 Z" fill="#c4b8aa" />
        <rect x={60} y={500} width={260} height={340} rx={6} fill="#5a4a44" /><rect x={84} y={524} width={212} height={292} fill="#8a7a6a" />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,.55))'}} />
    </AbsoluteFill>
  );
};
// fotos genéricas (silhuetas) que podem se desfazer em partículas
const Fotos: React.FC<{some?: number; legenda?: string[]}> = ({some = 0, legenda = []}) => {
  const f = useCurrentFrame();
  const fotos = [{x: 140, y: 650, r: -8}, {x: 560, y: 760, r: 6}, {x: 300, y: 1130, r: 3}];
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {fotos.map((p, i) => {
        const k = Math.max(0, some * 1.4 - i * 0.2);
        return <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
          {k < 1 && <g opacity={1 - k}>
            <rect width={380} height={440} rx={6} fill="#f2ece0" />
            <rect x={20} y={20} width={340} height={330} fill={['#c89a6a', '#7aa0c0', '#9ab07a'][i]} />
            {[0, 1, 2].slice(0, i + 1).map((j) => <g key={j} transform={`translate(${110 + j * 80} 200)`}><circle cy={-50} r={34} fill="#3a2a24" /><rect x={-34} y={-14} width={68} height={140} rx={24} fill="#3a2a24" /></g>)}
            {legenda[i] && <text x={190} y={405} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill="#3a2a24">{legenda[i]}</text>}
          </g>}
          {k > 0 && Array.from({length: 40}, (_, j) => { const a = random('fa' + i + j) * Math.PI * 2, r = k * (60 + random('fr' + i + j) * 400);
            return <rect key={j} x={random('fx' + i + j) * 380 + Math.cos(a) * r} y={random('fy' + i + j) * 440 + Math.sin(a) * r - k * 200} width={12} height={12} fill={['#c89a6a', '#f2ece0', '#3a2a24'][j % 3]} opacity={Math.max(0, 1 - k * 0.8)} />; })}
        </g>;
      })}
      {f < 0 && null}
    </svg>
  );
};
// cérebro luminoso que se forma a partir de partículas (p = 0 espalhadas, 1 formado)
const Cerebro: React.FC<{p: number; y?: number; s?: number; cor?: string}> = ({p, y = 1000, s = 1, cor = '#bfe8ff'}) => {
  const f = useCurrentFrame();
  const pts = React.useMemo(() => Array.from({length: 260}, (_, i) => {
    const t = random('bt' + i) * Math.PI * 2, rr = Math.sqrt(random('br' + i));
    const lado = i % 2 ? 1 : -1;
    return {x: lado * (30 + 190 * rr * Math.abs(Math.cos(t))) , y: -150 * rr * Math.sin(t) + (rr * Math.sin(t) < 0 ? 30 : 0), sx: (random('bx' + i) - 0.5) * 1400, sy: (random('by' + i) - 0.5) * 1800};
  }), []);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 12px #4cc9f0)'}}>
      <g transform={`translate(540 ${y}) scale(${s})`}>
        {pts.map((q, i) => <circle key={i} cx={q.sx + (q.x - q.sx) * p} cy={q.sy + (q.y - q.sy) * p} r={4 + 2 * Math.sin(f * 0.2 + i)} fill={cor} opacity={0.4 + 0.5 * p} />)}
        {p > 0.95 && <path d="M0 -150 Q-10 -60 0 0 Q10 60 0 120" stroke={cor} strokeWidth={4} fill="none" opacity={0.6} />}
      </g>
    </svg>
  );
};
const Cinza: React.FC<{children: React.ReactNode}> = ({children}) => <AbsoluteFill style={{filter: 'saturate(.3)'}}>{children}</AbsoluteFill>;
const Vazio: React.FC<{children?: React.ReactNode; apaga?: number}> = ({children, apaga = 0}) => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a0c18, #000 70%)'}}><Estrelas apaga={apaga} />{children}</AbsoluteFill>
);

// ---------- cenas ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2420, #080606 70%)'}}>
      <Fotos some={interpolate(f, [8, 50], [0, 1], clamp)} />
      <Titulo texto="E SE NADA DISSO ACONTECEU?" y={300} size={96} />
      <Etiqueta texto="EFEITO" />
    </AbsoluteFill>
  );
};
const Acorda: React.FC = () => <AbsoluteFill><Quarto /><Titulo texto="VOCÊ ACORDA" y={260} size={120} /><Etiqueta texto="ILUSTRAÇÃO · POV" /></AbsoluteFill>;
const Infancia: React.FC = () => <AbsoluteFill><Quarto luz={0.6} /><Fotos legenda={['INFÂNCIA', 'FAMÍLIA', 'AMIGOS']} /><Titulo texto="SUA INFÂNCIA, SUA FAMÍLIA" y={260} size={92} /><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;
const Ontem: React.FC = () => (
  <AbsoluteFill><Quarto luz={0.6} />
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><ellipse cx={540} cy={1100} rx={300} ry={120} fill="#f4f0ea" /><ellipse cx={540} cy={1090} rx={200} ry={70} fill="#e8a050" /></svg>
    <Titulo texto="O QUE COMEU ONTEM" y={260} size={104} /><Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Real: React.FC = () => <AbsoluteFill><Quarto luz={1.2} /><Titulo texto="PARECE TUDO REAL" y={260} size={120} cor={OURO} /><Etiqueta texto="ILUSTRAÇÃO · POV" /></AbsoluteFill>;
const Futuro: React.FC = () => <Cinza><Vazio><Titulo texto="O FUTURO MAIS DISTANTE DO UNIVERSO" y={300} size={90} /><Etiqueta texto="ANIMAÇÃO" /></Vazio></Cinza>;
const Apagam: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return <Cinza><Vazio apaga={interpolate(f, [0, d], [0, 0.95], clamp)}><Titulo texto="AS ESTRELAS SE APAGARAM" y={300} size={100} /><Etiqueta texto="ANIMAÇÃO" /></Vazio></Cinza>;
};
const Frio: React.FC = () => (
  <Cinza><AbsoluteFill style={{background: '#000'}}>
    <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 340, color: '#3a4a5a'}}>∞</div>
    <Titulo texto="UM VAZIO FRIO" y={300} size={120} cor="#9ab0c8" />
    <Texto y={1150} size={50} cor="#9ab0c8" delay={10}>POR UM TEMPO QUASE INFINITO</Texto>
  </AbsoluteFill></Cinza>
);
const TempoLongo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Cinza><AbsoluteFill style={{background: '#04050a'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={260} fill="none" stroke="#cfd8e8" strokeWidth={10} />
        <line x1={540} y1={1000} x2={540 + Math.cos(f * 0.5) * 200} y2={1000 + Math.sin(f * 0.5) * 200} stroke={OURO} strokeWidth={10} strokeLinecap="round" />
        <line x1={540} y1={1000} x2={540 + Math.cos(f * 0.05) * 140} y2={1000 + Math.sin(f * 0.05) * 140} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
      </svg>
      <Titulo texto="COM TEMPO LONGO O BASTANTE…" y={300} size={92} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill></Cinza>
  );
};
const Improvavel: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Cinza><AbsoluteFill style={{background: '#04050a'}}>
      {Array.from({length: 6}, (_, i) => <div key={i} style={{position: 'absolute', left: 120 + (i % 3) * 300, top: 760 + Math.floor(i / 3) * 300, width: 220, height: 220, borderRadius: 30, background: '#e8e8ee',
        transform: `rotate(${f * (4 + i) % 360}deg)`, fontFamily: FONTE, fontSize: 130, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>6</div>)}
      <Titulo texto="ATÉ O ABSURDAMENTE IMPROVÁVEL ACONTECE" y={280} size={84} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill></Cinza>
  );
};
const Acaso: React.FC = () => {
  const f = useCurrentFrame();
  return <Cinza><Vazio apaga={0.9}><Cerebro p={interpolate(f, [0, 60], [0, 0.35], clamp)} /><Titulo texto="POR PURO ACASO, PARTÍCULAS SE JUNTAM" y={280} size={84} /><Etiqueta texto="ANIMAÇÃO" /></Vazio></Cinza>;
};
const Forma: React.FC = () => {
  const f = useCurrentFrame();
  return <Cinza><Vazio apaga={0.9}><Cerebro p={interpolate(f, [0, 40], [0.35, 1], {...clamp, easing: Easing.out(Easing.cubic)})} /><Titulo texto="E FORMAM UM CÉREBRO INTEIRO" y={280} size={92} cor={CIANO} /><Etiqueta texto="ANIMAÇÃO" /></Vazio></Cinza>;
};
const Memorias: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Cinza><Vazio apaga={0.9}>
      <Cerebro p={1} y={1050} s={0.9} />
      {['INFÂNCIA', 'FAMÍLIA', 'ONTEM'].map((t, i) => { const a = f * 0.04 + (i * Math.PI * 2) / 3;
        return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * 380 - 110, top: 1050 + Math.sin(a) * 260 - 70, width: 220, padding: '30px 0', background: '#f2ece0', transform: `rotate(${Math.sin(a) * 10}deg)`, textAlign: 'center', fontFamily: FONTE, fontSize: 30, color: '#3a2a24'}}>{t}</div>; })}
      <Titulo texto="MEMÓRIAS DE UMA VIDA QUE NUNCA EXISTIU" y={260} size={84} />
      <Etiqueta texto="ANIMAÇÃO" />
    </Vazio></Cinza>
  );
};
const Nome: React.FC = () => {
  const s = useSpring(2);
  return (
    <Cinza><Vazio apaga={0.9}>
      <Cerebro p={1} y={1250} s={0.7} />
      <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', fontFamily: FONTE, opacity: s, transform: `scale(${0.85 + 0.15 * s})`}}>
        <div style={{fontSize: 90, color: '#fff'}}>CÉREBRO DE</div><div style={{fontSize: 150, color: CIANO}}>BOLTZMANN</div>
      </div>
    </Vazio></Cinza>
  );
};
const Susto: React.FC = () => <Cinza><Glitch texto="E AQUI VEM O SUSTO" size={140} /></Cinza>;
const Mais: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [2, 50], [0, 48], clamp));
  return (
    <Cinza><Vazio apaga={0.9}>
      {Array.from({length: n}, (_, i) => <div key={i} style={{position: 'absolute', left: 120 + (i % 8) * 108, top: 620 + Math.floor(i / 8) * 108, width: 70, height: 56, borderRadius: '50% 50% 40% 40%', background: '#bfe8ff', opacity: 0.8, boxShadow: '0 0 14px #4cc9f0'}} />)}
      <div style={{position: 'absolute', left: 500, top: 1320, width: 80, height: 150, borderRadius: 36, background: OURO}} /><div style={{position: 'absolute', left: 505, top: 1240, width: 70, height: 70, borderRadius: 35, background: OURO}} />
      <Titulo texto="MUITO MAIS CÉREBROS DO QUE PESSOAS?" y={260} size={86} />
      <Texto y={540} size={44} cor={OURO} delay={10}>EM ALGUMAS TEORIAS</Texto>
      <Etiqueta texto="ESQUEMA" />
    </Vazio></Cinza>
  );
};
const QualDos: React.FC = () => {
  const s = useSpring(4);
  return (
    <Cinza><Vazio apaga={0.9}>
      <div style={{position: 'absolute', left: 80, top: 760, width: 420, padding: '50px 0', borderRadius: 30, border: `6px solid ${CIANO}`, textAlign: 'center', fontFamily: FONTE, fontSize: 56, color: CIANO, opacity: s}}>CÉREBRO<br />NO VAZIO</div>
      <div style={{position: 'absolute', right: 80, top: 760, width: 420, padding: '50px 0', borderRadius: 30, border: `6px solid ${OURO}`, textAlign: 'center', fontFamily: FONTE, fontSize: 56, color: OURO, opacity: s}}>PESSOA DE<br />VERDADE</div>
      <Titulo texto="QUAL DOS DOIS É VOCÊ?" y={300} size={110} />
    </Vazio></Cinza>
  );
};
const Carroll: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill><Quarto luz={1.2} />
      <AbsoluteFill style={{background: 'rgba(0,0,0,.45)'}} />
      <div style={{position: 'absolute', left: 110, right: 110, top: 760, padding: '50px 0', borderRadius: 30, background: 'rgba(8,14,30,.92)', border: `4px solid ${VERDE}`, textAlign: 'center', fontFamily: FONTE, opacity: s, transform: `scale(${0.9 + 0.1 * s})`}}>
        <div style={{fontSize: 40, color: VERDE, letterSpacing: 4}}>O FÍSICO</div><div style={{fontSize: 100, color: '#fff', marginTop: 10}}>SEAN CARROLL</div>
      </div>
      <Titulo texto="CALMA." y={330} size={150} cor={VERDE} />
    </AbsoluteFill>
  );
};
const Instavel: React.FC = () => {
  const s = useSpring(6, {damping: 9});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1a12, #020604 70%)'}}>
      <Titulo texto="UMA TEORIA ASSIM SE DESTRÓI SOZINHA" y={280} size={86} />
      <div style={{position: 'absolute', top: 820, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '24px 40px', border: `8px solid ${VERDE}`, borderRadius: 20, fontFamily: FONTE, fontSize: 70, color: VERDE, textAlign: 'center', transform: `rotate(-5deg) scale(${interpolate(s, [0, 1], [1.8, 1])})`, opacity: s}}>“COGNITIVAMENTE<br />INSTÁVEL”</div>
      </div>
      <Texto y={1200} size={40} delay={14}>SEAN CARROLL, 2017</Texto>
    </AbsoluteFill>
  );
};
const Confiar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill><Quarto luz={0.9} />
      <Fotos some={interpolate(f, [10, 60], [0, 0.6], clamp)} legenda={['INFÂNCIA', 'FAMÍLIA', 'ONTEM']} />
      <Titulo texto="VOCÊ NÃO PODERIA CONFIAR EM NADA QUE LEMBRA" y={240} size={80} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const PropriaTeoria: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04050a'}}>
      <div style={{position: 'absolute', top: 820, width: '100%', textAlign: 'center', fontFamily: 'serif', fontSize: 110, color: '#cfd8e8', transform: shake(f, 6), opacity: interpolate(f, [20, 40], [1, 0.2], clamp)}}>S = k log W</div>
      <Titulo texto="NEM NA PRÓPRIA TEORIA" y={330} size={104} cor={VERMELHO} />
    </AbsoluteFill>
  );
};
const Descartar: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [8, 20], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1a12, #020604 70%)'}}>
      <div style={{position: 'absolute', left: 240, top: 760, width: 600, height: 380, borderRadius: 20, background: '#e8eef4', fontFamily: FONTE, fontSize: 60, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>TEORIA<br />DO UNIVERSO</div>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={220} y1={740} x2={220 + 640 * r} y2={740 + 420 * r} stroke={VERMELHO} strokeWidth={30} strokeLinecap="round" />
        <line x1={860} y1={740} x2={860 - 640 * r} y2={740 + 420 * r} stroke={VERMELHO} strokeWidth={30} strokeLinecap="round" />
      </svg>
      <Titulo texto="O PARADOXO SERVE PRA DESCARTAR TEORIAS" y={260} size={84} cor={VERDE} />
    </AbsoluteFill>
  );
};
const NaoVoce: React.FC = () => <AbsoluteFill><Quarto luz={1.2} /><Titulo texto="NÃO PRA DIZER QUE VOCÊ É UM CÉREBRO NO VAZIO" y={240} size={80} /><Etiqueta texto="ILUSTRAÇÃO · POV" /></AbsoluteFill>;
const Ninguem: React.FC = () => <AbsoluteFill><Quarto luz={1.3} /><Titulo texto="NINGUÉM ACHA QUE VOCÊ É UM" y={260} size={100} cor={VERDE} /><Etiqueta texto="ILUSTRAÇÃO · POV" /></AbsoluteFill>;
const Problema: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill><Quarto luz={1} />
      <AbsoluteFill style={{opacity: 0.35 + 0.25 * Math.sin(f * 0.3)}}><Cerebro p={1} y={1100} s={0.8} /></AbsoluteFill>
      <Titulo texto="O PROBLEMA: ALGUMAS TEORIAS DIZEM QUE SERIA O MAIS PROVÁVEL" y={220} size={74} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// selo fixo no canto do começo ao fim
const Hipotese: React.FC = () => (
  <div style={{position: 'absolute', right: 40, top: 110, padding: '8px 18px', borderRadius: 14, border: `4px solid ${OURO}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 30, color: OURO, letterSpacing: 3}}>HIPÓTESE</div>
);

const CENAS = [Gancho, Acorda, Infancia, Ontem, Real, Futuro, Apagam, Frio, TempoLongo, Improvavel, Acaso, Forma, Memorias, Nome, Susto,
  Mais, QualDos, Carroll, Instavel, Confiar, PropriaTeoria, Descartar, NaoVoce, Ninguem, Problema];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/hit.wav', volume: 0.3}];
export const Video: React.FC = () => (
  <AbsoluteFill>
    <Short W={W} tempo={TEMPO} cenas={CENAS} audio="boltzmann/narracao.mp3" calma={CALMA} sons={SONS} />
    <Sequence from={0} durationInFrames={TEMPO.FALA}><Hipotese /></Sequence>
  </AbsoluteFill>
);
