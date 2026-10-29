// Reel POV "Você acorda numa nave a caminho de MARTE, e é o único acordado" (torpor/hipotermia, NASA NIAC 2014). Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #1, v1), aprovado pelo dono em 29/10. Post: sexta 30/10.
// POV de propósito (teste do dono nos Reels). Cena original, sem copiar filme. Nunca dizer que a hibernação humana já existe: selo "CONCEITO · NASA NIAC 2014" e massas com "ESTIMATIVA".
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import palavras from './navemarte.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce abre os olhos', 'a nave esta em silencio', 'e todos os outros', 'voce nao sabe ha', 'o seu corpo foi', 'assim voce gasta', 'isso nao e ficcao', 'a ideia vem',
  'um estudo financiado', 'que com a tripulacao', 'mas tem um problema', 'nos hospitais isso', 'ninguem nunca dormiu', 'os testes com humanos', 'e numa emergencia',
  'voce tenta pedir ajuda', 'a sua mensagem', 'e a resposta', 'voce esta sozinho', 'no meio do nada', 'hoje isso ainda', 'mas alguem ja calculou',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('voce esta sozinho');
export const DURACAO = TEMPO.FIM;

// ---------- peças ----------
const AZUL = '#5ab8ff';
const Estrelas: React.FC<{n?: number}> = ({n = 150}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => <circle key={i} cx={random('sx' + i) * 1080} cy={random('sy' + i) * 1920} r={0.8 + random('sr' + i) * 2.2} fill="#fff" opacity={0.3 + random('so' + i) * 0.6} />)}
  </svg>
);
// corredor da nave com cápsulas de sono (luz azul); `aberta` = índice da cápsula vazia
const Capsulas: React.FC<{alarme?: boolean; aberta?: number}> = ({alarme, aberta = -1}) => {
  const f = useCurrentFrame();
  const pisca = alarme ? 0.5 + 0.5 * Math.sin(f * 0.6) : 0;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #05080e, #0c1420 50%, #05080e)', overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 0 L380 700 L700 700 L1080 0 Z" fill="#0e1826" /><path d="M0 1920 L380 1220 L700 1220 L1080 1920 Z" fill="#0a121c" />
        <rect x={380} y={700} width={320} height={520} fill="#060a10" />
        {[0, 1, 2, 3].map((i) => {
          const k = 1 - i * 0.22, x = i % 2 ? 540 + 300 * k : 540 - 300 * k, y = 960, w = 210 * k, h = 640 * k;
          return <g key={i}>
            <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={w / 2} fill="#1a2636" stroke="#3a4a5e" strokeWidth={4} />
            <rect x={x - w / 2 + 14 * k} y={y - h / 2 + 14 * k} width={w - 28 * k} height={h - 28 * k} rx={(w - 28 * k) / 2} fill={i === aberta ? '#0a0e14' : AZUL} opacity={i === aberta ? 1 : 0.35 + 0.08 * Math.sin(f * 0.1 + i)} />
            {i !== aberta && <ellipse cx={x} cy={y - h * 0.3} rx={w * 0.18} ry={w * 0.2} fill="#0a1a2a" opacity={0.7} />}
          </g>;
        })}
      </svg>
      {alarme && <AbsoluteFill style={{background: VERMELHO, opacity: pisca * 0.35}} />}
    </AbsoluteFill>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '22px 44px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Barras: React.FC<{itens: {rot: string; v: number; cor: string; val: string}[]; max: number; t: string; nota?: string}> = ({itens, max, t, nota}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1426, #02040a 70%)'}}>
      <Titulo texto={t} y={300} size={90} />
      {itens.map((b, i) => { const p = interpolate(f, [4 + i * 10, 30 + i * 10], [0, b.v / max], {...clamp, easing: Easing.out(Easing.cubic)});
        return <React.Fragment key={i}>
          <div style={{position: 'absolute', left: 100, top: 700 + i * 260, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>{b.rot}</div>
          <div style={{position: 'absolute', left: 100, top: 770 + i * 260, width: 880, height: 90, borderRadius: 16, background: 'rgba(255,255,255,.08)'}} />
          <div style={{position: 'absolute', left: 100, top: 770 + i * 260, width: 880 * p, height: 90, borderRadius: 16, background: b.cor}} />
          <div style={{position: 'absolute', left: 100, width: 880, top: 880 + i * 260, textAlign: 'right', fontFamily: FONTE, fontSize: 46, color: b.cor}}>{b.val}</div>
        </React.Fragment>; })}
      {nota && <Texto y={1320} size={40} cor={OURO} delay={20}>{nota}</Texto>}
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};

// ---------- cenas ----------
const Olhos: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 8, 12, 22], [0, 0.35, 0.1, 1], clamp);
  return (
    <AbsoluteFill>
      <Capsulas aberta={0} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 960 * (1 - a), background: '#000'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 960 * (1 - a), background: '#000'}} />
      <AbsoluteFill style={{backdropFilter: `blur(${(1 - a) * 12}px)`}} />
      <Titulo texto="VOCÊ ABRE OS OLHOS" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO · POV" />
    </AbsoluteFill>
  );
};
const Silencio: React.FC = () => <AbsoluteFill><Capsulas aberta={0} /><Titulo texto="A NAVE ESTÁ EM SILÊNCIO" y={300} size={100} /><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;
const Dormindo: React.FC = () => <AbsoluteFill><Capsulas aberta={0} /><Titulo texto="TODOS OS OUTROS CONTINUAM DORMINDO" y={260} size={92} cor={AZUL} /><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;
const Dias: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04070c'}}>
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 220, color: AZUL, fontVariantNumeric: 'tabular-nums', opacity: 0.5 + 0.5 * Math.sin(f * 0.5)}}>DIA ??</div>
      <Titulo texto="HÁ QUANTOS DIAS VOCÊ DORMIU?" y={300} size={96} />
    </AbsoluteFill>
  );
};
const Esfriado: React.FC = () => {
  const f = useCurrentFrame();
  const h = interpolate(f, [2, 40], [0.8, 0.35], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #0a1a2e, #02040a 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={490} y={620} width={100} height={700} rx={50} fill="#1a2636" stroke="#cfd8e8" strokeWidth={6} />
        <rect x={510} y={620 + 680 * (1 - h)} width={60} height={680 * h} rx={30} fill={AZUL} /><circle cx={540} cy={1360} r={90} fill={AZUL} />
      </svg>
      <Titulo texto="SEU CORPO FOI ESFRIADO DE PROPÓSITO" y={260} size={88} cor={AZUL} />
      <Etiqueta texto="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Menos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c1426, #02040a 70%)'}}>
      {[['O₂', AZUL], ['COMIDA', OURO]].map(([t, c], i) => { const p = interpolate(f, [4 + i * 8, 40], [1, 0.4], clamp);
        return <div key={i} style={{position: 'absolute', left: 140 + i * 440, top: 760, width: 360, textAlign: 'center', fontFamily: FONTE}}>
          <div style={{margin: '0 auto', width: 300 * p, height: 300 * p, borderRadius: '50%', border: `8px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70 * p, color: c as string}}>{t}</div>
          <div style={{fontSize: 60, color: c as string, marginTop: 30}}>↓</div></div>; })}
      <Titulo texto="MENOS OXIGÊNIO. MENOS COMIDA." y={300} size={92} />
    </AbsoluteFill>
  );
};
const NaoFiccao: React.FC = () => <Glitch texto="ISSO NÃO É FICÇÃO" size={140} cor={OURO} />;
const Hospital: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #dfe8ee, #a8b8c4)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <rect x={140} y={1000} width={800} height={60} rx={20} fill="#e8eef4" stroke="#7a8a96" strokeWidth={4} /><rect x={180} y={1060} width={20} height={300} fill="#7a8a96" /><rect x={880} y={1060} width={20} height={300} fill="#7a8a96" />
      <rect x={240} y={940} width={600} height={70} rx={30} fill={AZUL} opacity={0.6} /><circle cx={230} cy={960} r={50} fill="#d8c0a8" />
      <rect x={760} y={560} width={180} height={240} rx={16} fill="#2a3a4a" /><path d="M780 700 L820 700 L840 650 L870 740 L890 700 L920 700" stroke={VERDE} strokeWidth={5} fill="none" />
    </svg>
    <Titulo texto="HIPOTERMIA TERAPÊUTICA" y={300} size={100} cor="#0b2a44" />
    <Texto y={520} size={50} cor="#0b2a44" delay={8}>JÁ USADA EM HOSPITAIS</Texto>
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Estudo: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #0f1e33, #03060c 75%)'}}><Selo texto={'ESTUDO FINANCIADO\nPELA NASA · 2014'} y={720} size={74} cor={CIANO} /><Titulo texto="UM ESTUDO CALCULOU" y={300} size={100} /></AbsoluteFill>;
const MaisLeve: React.FC = () => <Barras t="A NAVE FICARIA MUITAS VEZES MAIS LEVE" max={50} itens={[{rot: 'HABITAT ACORDADO', v: 50, cor: VERMELHO, val: '20–50 T'}, {rot: 'HABITAT EM TORPOR', v: 7, cor: AZUL, val: '5–7 T'}]} nota="ESTIMATIVA DOS AUTORES" />;
const Problema: React.FC = () => <Glitch texto="MAS TEM UM PROBLEMA" size={130} cor={VERMELHO} />;
const Semana: React.FC = () => <Barras t="HOSPITAL × MARTE" max={180} itens={[{rot: 'NO HOSPITAL', v: 7, cor: VERDE, val: '~1 SEMANA'}, {rot: 'ATÉ MARTE', v: 180, cor: OURO, val: '90–180 DIAS'}]} />;
const Nunca: React.FC = () => <AbsoluteFill><Capsulas aberta={0} /><AbsoluteFill style={{background: 'rgba(0,0,0,.4)'}} /><Titulo texto="NINGUÉM NUNCA DORMIU MESES ASSIM" y={300} size={96} cor={OURO} /><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;
const Testes: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #121a2c, #03050a 70%)'}}>
    <div style={{position: 'absolute', top: 680, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: '#fff', whiteSpace: 'nowrap'}}>ANOS 2030?</div>
    <Selo texto="SE HOUVER VERBA" y={1000} size={70} delay={10} />
    <Titulo texto="TESTES COM HUMANOS" y={300} size={110} />
  </AbsoluteFill>
);
const Emergencia: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{transform: shake(f, 6)}}><Capsulas alarme aberta={0} /><Titulo texto="E NUMA EMERGÊNCIA?" y={300} size={120} cor={VERMELHO} /><Texto y={1300} size={50} delay={20}>ACORDAR RÁPIDO: PROBLEMA SEM SOLUÇÃO</Texto><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;
};
const Ajuda: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04070c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={140} y={760} width={800} height={500} rx={30} fill="#1a2636" stroke="#3a4a5e" strokeWidth={6} />
        <rect x={200} y={820} width={680} height={260} rx={14} fill="#0a141e" />
        <path d={`M220 950 ${Array.from({length: 33}, (_, k) => `L${220 + k * 20} ${950 + Math.sin(k * 0.9 + f * 0.6) * 60 * Math.abs(Math.sin(k * 0.3))}`).join(' ')}`} stroke={VERDE} strokeWidth={5} fill="none" />
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={260 + i * 180} cy={1170} r={34} fill={i === 0 ? VERMELHO : '#3a4a5e'} />)}
      </svg>
      <Titulo texto="VOCÊ TENTA PEDIR AJUDA" y={300} size={100} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Sinal: React.FC<{volta?: boolean}> = ({volta}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], clamp);
  const [a, b] = volta ? [[880, 1200], [200, 900]] : [[200, 900], [880, 1200]];
  return (
    <AbsoluteFill style={{background: '#02040a'}}>
      <Estrelas />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={200} cy={900} r={70} fill="#2a6ab0" /><circle cx={880} cy={1200} r={46} fill="#c1440e" />
        <line x1={a[0]} y1={a[1]} x2={a[0] + (b[0] - a[0]) * p} y2={a[1] + (b[1] - a[1]) * p} stroke={volta ? VERDE : OURO} strokeWidth={6} strokeDasharray="16 12" />
        <circle cx={a[0] + (b[0] - a[0]) * p} cy={a[1] + (b[1] - a[1]) * p} r={14} fill="#fff" />
      </svg>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: volta ? VERDE : OURO}}>{volta ? '+ ' : ''}13–22 MIN</div>
      <Titulo texto={volta ? 'E A RESPOSTA, O MESMO TANTO' : 'SUA MENSAGEM ATÉ A TERRA'} y={300} size={92} />
      <Etiqueta texto="ESQUEMA · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const Ida: React.FC = () => <Sinal />;
const Volta: React.FC = () => <Sinal volta />;
const Sozinho: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Estrelas />
      <div style={{position: 'absolute', left: 140, top: 560, width: 800, height: 800, borderRadius: '50%', overflow: 'hidden', border: '30px solid #1a2636', boxShadow: '0 0 0 12px #3a4a5e'}}>
        <Img src={staticFile('navemarte/marte_viking.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(f, [0, d], [0.5, 0.62])})`}} />
      </div>
      <Titulo texto="VOCÊ ESTÁ SOZINHO. ACORDADO." y={260} size={92} />
      <Etiqueta texto="IMAGEM REAL · MARTE · VIKING · NASA" real />
    </AbsoluteFill>
  );
};
const Nada: React.FC = () => <AbsoluteFill style={{background: '#000'}}><Estrelas n={90} /><Titulo texto="NO MEIO DO NADA" y={820} size={130} cor="#9ab0c8" /></AbsoluteFill>;
const SoEstudo: React.FC = () => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #0f1e33, #03060c 75%)'}}><Selo texto={'HOJE: SÓ ESTUDO'} y={700} size={100} cor={VERDE} /><Texto y={960} size={54} delay={10}>NENHUMA TRIPULAÇÃO DORME ASSIM</Texto></AbsoluteFill>;
const Calculou: React.FC = () => <AbsoluteFill><Capsulas /><AbsoluteFill style={{background: 'rgba(0,0,0,.35)'}} /><Titulo texto="MAIS LEVE DO QUE FICAR ACORDADO" y={300} size={96} cor={OURO} /><Etiqueta texto="ILUSTRAÇÃO" /></AbsoluteFill>;

const Conceito: React.FC = () => (
  <div style={{position: 'absolute', right: 40, top: 110, padding: '8px 18px', borderRadius: 14, border: `4px solid ${OURO}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 26, color: OURO, letterSpacing: 2}}>CONCEITO · NASA NIAC 2014</div>
);
const CENAS = [Olhos, Silencio, Dormindo, Dias, Esfriado, Menos, NaoFiccao, Hospital, Estudo, MaisLeve, Problema, Semana, Nunca, Testes, Emergencia,
  Ajuda, Ida, Volta, Sozinho, Nada, SoEstudo, Calculou];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const C0 = T[FRASES.indexOf('um estudo financiado')];
const SONS = [{em: 0, src: 'sfx/hit.wav', volume: 0.3}];
export const Video: React.FC = () => (
  <AbsoluteFill>
    <Short W={W} tempo={TEMPO} cenas={CENAS} audio="navemarte/narracao.mp3" calma={CALMA} sons={SONS} />
    <Sequence from={C0} durationInFrames={TEMPO.FALA - C0}><Conceito /></Sequence>
  </AbsoluteFill>
);
