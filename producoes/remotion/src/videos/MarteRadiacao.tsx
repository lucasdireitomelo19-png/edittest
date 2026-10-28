// Short "Ir a MARTE já estoura o limite de radiação da NASA" (dose medida pelo Curiosity no cruzeiro). Roteiro do Roteirista (lote radiação #4, v2), aprovado pelo dono em 28/10.
// Entrega direta na versão final. Estratégia de 28/10: barra de dose estourando no 1º quadro, cortes de até 2 s nos primeiros 10 s.
// Números: ~1,84 mSv/dia (Zeitlin 2013), ida+volta ≈ 660 mSv (conta nossa), limite de carreira 600 mSv (NASA 2022), missão ≈ 1.000 mSv (PIA17601). Nave e humanos em Marte: ILUSTRAÇÃO.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE} from '../comum';
import palavras from './marte.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'quem for a marte', 'vai tomar quase o dobro', 'na carreira inteira', 'e so a viagem', 'antes de alguem pisar', 'no caminho ate marte', 'o robo curiosity',
  'quase dois milisieverts', 'parece pouco', 'mas a viagem leva', 'e outros seis', 'so a ida e a volta', 'astronauta seiscentos', 'somando a estadia', 'a missao chega perto',
  'o risco nao e', 'e cancer anos depois', 'o limite existe', 'e esses numeros', 'num momento do ciclo', 'pode ser mais', 'da pra resolver', 'blindagem melhor', 'mas essa solucao',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('o risco nao e');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const MAX = 1150;   // topo da escala da barra, em mSv
// barra de dose (mSv) com a linha do limite de carreira da NASA (600 mSv)
const Barra: React.FC<{de: number; ate: number; dur?: number; rotulo?: boolean}> = ({de, ate, dur = 30, rotulo = true}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [2, 2 + dur], [de, ate], {...clamp, easing: Easing.out(Easing.cubic)});
  const H = 1000, base = 1520, y = (m: number) => base - (m / MAX) * H;
  const passou = v > 600;
  return (
    <>
      <div style={{position: 'absolute', left: 390, top: y(MAX), width: 300, height: H, background: 'rgba(255,255,255,.06)', border: '4px solid rgba(255,255,255,.25)', borderRadius: 18}} />
      <div style={{position: 'absolute', left: 394, top: y(v), width: 292, height: base - y(v), borderRadius: 14,
        background: passou ? `linear-gradient(${VERMELHO}, #a01818)` : `linear-gradient(${OURO}, #d08a10)`, boxShadow: passou ? `0 0 ${50 + (f % 8) * 6}px ${VERMELHO}` : 'none'}} />
      <div style={{position: 'absolute', left: 300, width: 480, top: y(600) - 4, height: 8, background: '#fff'}} />
      <div style={{position: 'absolute', left: 710, top: y(600) - 30, fontFamily: FONTE, fontSize: 40, color: '#fff'}}>LIMITE<br /><span style={{fontSize: 32, color: CIANO}}>600 mSv</span></div>
      {rotulo && <div style={{position: 'absolute', left: 60, width: 320, top: y(v) - 30, textAlign: 'right', fontFamily: FONTE, fontSize: 56, color: passou ? VERMELHO : OURO, fontVariantNumeric: 'tabular-nums'}}>{Math.round(v)}<span style={{fontSize: 30}}> mSv</span></div>}
    </>
  );
};
const Foto: React.FC<{src: string; etq: string; real?: boolean; z?: [number, number]; pos?: string; children?: React.ReactNode}> = ({src, etq, real, z = [1.05, 1.15], pos = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('marte/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real={real} />
      {children}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number; rot?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3, rot = 0}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '22px 44px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.55)', opacity: s, transform: `rotate(${rot}deg) scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Fundo: React.FC<{children: React.ReactNode; cor?: string}> = ({children, cor = '#1a0806'}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, ${cor}, #040202 70%)`}}>{children}</AbsoluteFill>
);

// ---------- cenas ----------
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #2a0606, #040202 70%)', transform: shake(f, f > 14 ? 9 : 2)}}>
      <Barra de={0} ate={1000} dur={22} />
      <AbsoluteFill style={{background: VERMELHO, opacity: f > 14 ? 0.12 + 0.1 * Math.sin(f * 0.9) : 0}} />
      <Titulo texto="IR A MARTE ESTOURA O LIMITE" y={200} size={90} cor={VERMELHO} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Dobro: React.FC = () => (
  <Fundo>
    <Barra de={1000} ate={1000} rotulo={false} />
    <Contador ate={2} y={440} size={170} cor={VERMELHO} pre="QUASE " suf="×" ini={2} dur={12} />
    <Titulo texto="O QUE A NASA PERMITE" y={220} size={90} />
  </Fundo>
);
const Carreira: React.FC = () => (
  <Fundo cor="#0c1220">
    <Titulo texto="NA CARREIRA INTEIRA" y={330} size={110} cor={OURO} />
    <Selo texto={'LIMITE DE UMA\nVIDA INTEIRA'} y={820} size={80} cor={CIANO} />
  </Fundo>
);
const SoViagem: React.FC = () => (
  <Foto src="msl_cruzeiro.jpg" etq="ILUSTRAÇÃO · NAVE DO CURIOSITY A CAMINHO DE MARTE · NASA" z={[1.1, 1.25]} pos="64% 50%">
    <Titulo texto="SÓ A VIAGEM JÁ ESTOURA" y={330} size={100} cor={VERMELHO} />
  </Foto>
);
const AntesPisar: React.FC = () => (
  <Foto src="solo.jpg" etq="IMAGEM REAL · SUPERFÍCIE DE MARTE · CURIOSITY · NASA" real z={[1.05, 1.15]} pos="50% 60%">
    <Titulo texto="ANTES DE ALGUÉM PISAR LÁ" y={330} size={100} />
  </Foto>
);
const Rota: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 0.6], clamp);
  const a = Math.PI * (1 - p * 1.2);
  return (
    <AbsoluteFill style={{background: '#03040a'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 120}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={1 + random('sr' + i) * 2} fill="#fff" opacity={0.5} />)}
        <circle cx={540} cy={1000} r={60} fill="#ffb347" /><circle cx={540} cy={1000} r={90} fill="#ffb347" opacity={0.2} />
        <circle cx={540} cy={1000} r={220} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={2} />
        <circle cx={540} cy={1000} r={380} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={2} />
        <path d="M320 1000 A300 300 0 0 1 920 1000" fill="none" stroke={OURO} strokeWidth={5} strokeDasharray="16 12" />
        <circle cx={320} cy={1000} r={26} fill="#2a6ab0" /><circle cx={920} cy={1000} r={22} fill="#c1440e" />
        <circle cx={540 + Math.cos(a) * 300} cy={1000 - Math.sin(a) * 300} r={12} fill="#fff" />
      </svg>
      <Titulo texto="NO CAMINHO ATÉ MARTE" y={330} size={100} />
      <Etiqueta texto="ANIMAÇÃO · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const Curiosity: React.FC = () => (
  <Foto src="msl_cruzeiro.jpg" etq="ILUSTRAÇÃO · NAVE DO CURIOSITY A CAMINHO DE MARTE · NASA" z={[1.3, 1.1]} pos="62% 45%">
    <Titulo texto="O CURIOSITY MEDIU A RADIAÇÃO" y={300} size={90} cor={OURO} />
    <Texto y={1300} size={44} delay={10}>DENTRO DA NAVE · 2011–2012</Texto>
  </Foto>
);
const PorDia: React.FC = () => (
  <Fundo cor="#14100a">
    <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 200, color: OURO}}>~1,84</div>
    <Texto y={950} size={80} cor="#fff" delay={6}>mSv POR DIA</Texto>
    <Titulo texto="QUASE 2 MILISIEVERTS" y={330} size={100} />
  </Fundo>
);
const Pouco: React.FC = () => <Glitch texto="PARECE POUCO…" size={130} />;
const Meses: React.FC<{n: number}> = ({n}) => {
  const f = useCurrentFrame();
  const k = Math.round(interpolate(f, [2, 26], [n === 6 ? 0 : 6, n], clamp));
  return (
    <Fundo cor="#0c1220">
      <div style={{position: 'absolute', left: 120, right: 120, top: 760, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center'}}>
        {Array.from({length: 12}, (_, i) => <div key={i} style={{width: 180, height: 150, borderRadius: 16, border: `5px solid ${i < 6 ? CIANO : OURO}`,
          background: i < k ? (i < 6 ? 'rgba(76,201,240,.35)' : 'rgba(255,210,63,.35)') : 'transparent', fontFamily: FONTE, fontSize: 44, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i < k ? (i < 6 ? 'IDA' : 'VOLTA') : ''}</div>)}
      </div>
      <Titulo texto={n === 6 ? '~6 MESES PRA IR' : '+ 6 PRA VOLTAR'} y={330} size={110} cor={n === 6 ? CIANO : OURO} />
    </Fundo>
  );
};
const Seis: React.FC = () => <Meses n={6} />;
const Doze: React.FC = () => <Meses n={12} />;
const IdaVolta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo>
      <AbsoluteFill style={{transform: shake(f, f > 22 ? 6 : 0)}}><Barra de={0} ate={660} dur={26} /></AbsoluteFill>
      <Titulo texto="IDA + VOLTA ≈ 660 mSv" y={260} size={96} cor={OURO} />
      <Etiqueta texto="ESQUEMA" />
    </Fundo>
  );
};
const Limite: React.FC = () => (
  <Fundo cor="#0c1220">
    <Titulo texto="LIMITE DA NASA" y={330} size={110} cor={CIANO} />
    <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 210, color: '#fff'}}>600</div>
    <Texto y={960} size={70} cor={CIANO} delay={4}>mSv NA CARREIRA</Texto>
  </Fundo>
);
const Estadia: React.FC = () => (
  <Foto src="solo.jpg" etq="IMAGEM REAL · SUPERFÍCIE DE MARTE · CURIOSITY · NASA" real z={[1.2, 1.1]} pos="20% 60%">
    <Titulo texto="+ A ESTADIA NA SUPERFÍCIE" y={330} size={96} cor={OURO} />
  </Foto>
);
const Mil: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo>
      <AbsoluteFill style={{transform: shake(f, f > 18 ? 8 : 0)}}><Barra de={660} ate={1000} dur={22} /></AbsoluteFill>
      <Titulo texto="MISSÃO COMPLETA ≈ 1.000 mSv" y={260} size={88} cor={VERMELHO} />
      <Etiqueta texto="ESQUEMA" />
    </Fundo>
  );
};
const Risco: React.FC = () => <Glitch texto="O RISCO NÃO É CAIR MORTO" size={120} />;
const Cancer: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#1a0606">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 40}, (_, i) => { const x = random('cx' + i) * 1080, y = 600 + random('cy' + i) * 900, r = 10 + random('cr' + i) * 26;
          const on = f > random('ct' + i) * 30; return <circle key={i} cx={x} cy={y} r={r} fill={on && i % 5 === 0 ? VERMELHO : '#5a2a2a'} opacity={0.6} />; })}
      </svg>
      <Titulo texto="É CÂNCER, ANOS DEPOIS" y={330} size={110} cor={VERMELHO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
const ExisteLimite: React.FC = () => (
  <Fundo cor="#0c1220">
    <Titulo texto="O LIMITE MANTÉM ESSE RISCO BAIXO" y={300} size={90} cor={CIANO} />
    <Selo texto="≈ 3% DE RISCO EXTRA" y={820} size={80} cor={CIANO} />
    <Texto y={1040} size={38} delay={8}>DE MORTE POR CÂNCER · PESSOA MAIS SENSÍVEL</Texto>
  </Fundo>
);
const Medicao: React.FC = () => (
  <Fundo cor="#14100a">
    <Titulo texto="UMA MEDIÇÃO SÓ" y={330} size={120} cor={OURO} />
    <Selo texto={'CURIOSITY\n2011–2012'} y={800} size={80} />
  </Fundo>
);
const Ciclo: React.FC = () => {
  const f = useCurrentFrame();
  const d = Array.from({length: 61}, (_, k) => `${90 + k * 15},${1000 - Math.sin(k / 60 * Math.PI * 2.2 + 0.4) * 240}`).join(' L');
  const px = 90 + Math.min(60, f) * 15;
  return (
    <Fundo cor="#14100a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={'M' + d} fill="none" stroke={OURO} strokeWidth={8} />
        <line x1={px} y1={700} x2={px} y2={1300} stroke="#fff" strokeWidth={3} strokeDasharray="10 8" />
      </svg>
      <Titulo texto="NUM MOMENTO DO CICLO DO SOL" y={300} size={90} />
      <Texto y={1360} size={40} delay={6}>ATIVIDADE SOLAR · ~11 ANOS</Texto>
      <Etiqueta texto="ESQUEMA" />
    </Fundo>
  );
};
const MaisMenos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 300, color: '#fff', transform: `translateY(${Math.sin(f * 0.4) * 30}px)`}}>±</div>
      <Titulo texto="PODE SER MAIS, OU MENOS" y={330} size={100} />
    </Fundo>
  );
};
const Resolver: React.FC = () => (
  <Fundo cor="#0c1a12">
    <Titulo texto="DÁ PRA RESOLVER?" y={330} size={120} />
    <Selo texto="DÁ." y={800} size={140} cor={VERDE} delay={10} />
  </Fundo>
);
const Blindagem: React.FC = () => (
  <Foto src="humanos.jpg" etq="ILUSTRAÇÃO · NASA" z={[1.05, 1.2]} pos="45% 50%">
    <Titulo texto="BLINDAGEM MELHOR · VIAGENS MAIS CURTAS" y={300} size={84} cor={VERDE} />
  </Foto>
);
const NaoPronta: React.FC = () => (
  <Foto src="humanos.jpg" etq="ILUSTRAÇÃO · NASA" z={[1.25, 1.35]} pos="60% 50%">
    <AbsoluteFill style={{background: 'rgba(0,0,0,.45)'}} />
    <Selo texto={'AINDA NÃO\nESTÁ PRONTA'} y={760} size={110} cor={VERMELHO} rot={-6} />
  </Foto>
);

const CENAS = [Gancho, Dobro, Carreira, SoViagem, AntesPisar, Rota, Curiosity, PorDia, Pouco, Seis, Doze, IdaVolta, Limite, Estadia, Mil,
  Risco, Cancer, ExisteLimite, Medicao, Ciclo, MaisMenos, Resolver, Blindagem, NaoPronta];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 14, src: 'sfx/boom.wav', volume: 0.45}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="marte/narracao.mp3" calma={CALMA} sons={SONS} />;
