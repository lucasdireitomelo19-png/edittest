// Reel POV "Você nasceu em MARTE". Roteiro do Roteirista (reels_pov_2026-10-30_11-03.md #6, v1), aprovado pelo dono em 29/10. Post: terça 03/11.
// Voz edge-tts (Antonio), decisão do dono em 29/10. "LIMITE DA NASA (ADULTOS)"; 234 mSv/ano marcado como CONTA; hipóteses com "TALVEZ"; sem SpaceX/Musk.
// Reais: a Terra vista de Marte (Curiosity), Marte (Viking), cratera Gale (Curiosity) e pôr do sol em Gale (Curiosity), todas NASA/JPL. Esquemas: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Contador, Pino, useSpring, shake, clamp, FONTE, OURO, LAVA, CIANO, VERMELHO, VERDE} from '../comum';
import palavras from './nascimarte.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce nunca viu a terra', 'e o seu corpo', 'nunca sentiu a gravidade', 'voce nasceu em marte', 'aqui voce pesa', 'trinta e oito por cento do', 'la fora o ar',
  'quase tudo e gas', 'sem traje voce', 'a temperatura media', 'o dia e quase', 'mas o ano dura', 'quando voce faz', 'e tem o que voce', 'na superficie seriam',
  'so pra comparar', 'voce passaria dele', 'talvez por isso', 'e ninguem sabe se', 'talvez o seu corpo', 'ninguem nunca testou',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('e ninguem sabe se');
export const DURACAO = TEMPO.FIM;
const FERRUGEM = '#e0703a';

// ---------- peças ----------
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; origem?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.15], pos = 'center', origem = 'center', children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('nascimarte/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transformOrigin: origem, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
// panorama largo numa faixa (as panorâmicas da NASA são finas demais pra tela cheia)
const Faixa: React.FC<{src: string; etq: string; children?: React.ReactNode}> = ({src, etq, children}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a1408, #120804)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 640, left: 0, right: 0, height: 700, overflow: 'hidden'}}>
        <Img src={staticFile('nascimarte/' + src)} style={{height: 700, transform: `translateX(${-f * 3}px)`}} />
      </div>
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
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Fundo: React.FC<{children?: React.ReactNode}> = ({children}) => <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a1a0c, #0c0402 75%)'}}>{children}</AbsoluteFill>;
// boneco simples (criança ou adulto)
const Pessoa: React.FC<{x: number; y: number; h: number; cor?: string; peso?: number}> = ({x, y, h, cor = '#fff', peso = 0}) => (
  <g transform={`translate(${x} ${y}) scale(1 ${1 - 0.25 * peso})`} fill={cor}>
    <circle cy={-h * 0.88} r={h * 0.1} />
    <rect x={-h * 0.09} y={-h * 0.76} width={h * 0.18} height={h * 0.4} rx={h * 0.06} />
    <rect x={-h * 0.08} y={-h * 0.38} width={h * 0.06} height={h * 0.38} rx={h * 0.03} /><rect x={h * 0.02} y={-h * 0.38} width={h * 0.06} height={h * 0.38} rx={h * 0.03} />
  </g>
);

// ---------- cenas ----------
const NuncaViu: React.FC = () => (
  <Foto src="terra_de_marte.jpg" etq="IMAGEM REAL · A TERRA VISTA DE MARTE · CURIOSITY · NASA" z={[1.0, 1.25]} origem="50% 39.6%">
    <Pino x={540} y={761} s={1} cor={CIANO} />
    <Texto y={850} size={44} cor={CIANO}>TERRA</Texto>
    <Titulo texto="VOCÊ NUNCA VIU A TERRA" y={300} size={110} />
  </Foto>
);
const SeuCorpo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Pessoa x={540} y={1400} h={620} cor="#f0d8c0" /></svg>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.25 + 0.15 * Math.sin(f * 0.3)}}><circle cx={540} cy={1100} r={420} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="12 16" /></svg>
      <Titulo texto="E O SEU CORPO…" y={300} size={120} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
const Gravidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[300, 540, 780].map((x, i) => { const y = 620 + ((f * 6 + i * 60) % 360); return <path key={i} d={`M${x} ${y} v120 m-40 -50 l40 50 l40 -50`} stroke={CIANO} strokeWidth={14} fill="none" opacity={0.25} />; })}
      </svg>
      <Titulo texto="NUNCA SENTIU A GRAVIDADE DA TERRA" y={300} size={92} />
      <Selo texto="NUNCA" y={1100} size={110} cor={VERMELHO} delay={4} />
    </Fundo>
  );
};
const EmMarte: React.FC = () => (
  <Foto src="marte.jpg" etq="IMAGEM REAL · MARTE · VIKING · NASA" z={[1.3, 1.1]}>
    <Titulo texto="VOCÊ NASCEU EM MARTE" y={300} size={110} cor={FERRUGEM} />
  </Foto>
);
const Balanca: React.FC<{v: number}> = ({v}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <rect x={290} y={1240} width={500} height={160} rx={30} fill="#2a2e36" stroke="#5a606c" strokeWidth={6} />
    <rect x={390} y={1270} width={300} height={90} rx={12} fill="#06120a" />
    <text x={540} y={1340} textAnchor="middle" fontFamily={FONTE} fontSize={64} fill={VERDE}>{v} kg</text>
    <Pessoa x={540} y={1240} h={520} cor="#f0d8c0" />
  </svg>
);
const Pesa: React.FC = () => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [4, 34], [30, 11], {...clamp, easing: Easing.out(Easing.cubic)}));
  return <Fundo><Balanca v={v} /><Titulo texto="AQUI, VOCÊ PESA SÓ…" y={300} size={110} /><Etiqueta texto="EXEMPLO · CRIANÇA DE 30 KG NA TERRA" /></Fundo>;
};
const Porcento38: React.FC = () => (
  <Fundo>
    <Contador ate={38} y={600} size={340} suf="%" cor={OURO} dur={20} />
    <Texto y={1000} size={64} cor="#fff" delay={4}>DO SEU PESO NA TERRA</Texto>
    <Selo texto="GRAVIDADE: 38%" y={1160} size={64} cor={CIANO} delay={12} />
  </Fundo>
);
const ArLaFora: React.FC = () => (
  <Faixa src="gale.jpg" etq="IMAGEM REAL · CRATERA GALE · CURIOSITY · NASA">
    <Titulo texto="LÁ FORA, O AR…" y={300} size={110} />
    <Selo texto="PRESSÃO < 1% DA TERRA" y={1420} size={66} cor={OURO} delay={6} />
  </Faixa>
);
const Composicao: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Fundo>
      <div style={{position: 'absolute', top: 640, left: 120, right: 120}}>
        <div style={{fontFamily: FONTE, fontSize: 64, color: '#fff'}}>GÁS CARBÔNICO</div>
        <div style={{height: 90, marginTop: 10, borderRadius: 14, background: '#222'}}><div style={{width: `${95 * p}%`, height: '100%', borderRadius: 14, background: LAVA}} /></div>
        <div style={{fontFamily: FONTE, fontSize: 90, color: LAVA}}>95%</div>
        <div style={{fontFamily: FONTE, fontSize: 64, color: '#fff', marginTop: 50}}>OXIGÊNIO</div>
        <div style={{height: 90, marginTop: 10, borderRadius: 14, background: '#222'}}><div style={{width: `${1.2 * p}%`, height: '100%', borderRadius: 14, background: CIANO}} /></div>
        <div style={{fontFamily: FONTE, fontSize: 90, color: CIANO}}>0,16%</div>
      </div>
      <Titulo texto="QUASE TUDO É GÁS CARBÔNICO" y={300} size={92} />
      <Etiqueta texto="DADOS DA NASA" />
    </Fundo>
  );
};
const SemTraje: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 4)}}>
      <Faixa src="gale.jpg" etq="IMAGEM REAL · CRATERA GALE · CURIOSITY · NASA">
        <AbsoluteFill style={{background: 'rgba(120,0,0,.35)'}} />
        <Selo texto={'SEM TRAJE,\nVOCÊ NÃO SOBREVIVE'} y={820} size={90} cor={VERMELHO} delay={0} />
      </Faixa>
    </AbsoluteFill>
  );
};
const Frio: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [2, 30], [0, -59], {...clamp, easing: (t) => 1 - (1 - t) ** 3}));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c2a40, #02080e 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 50}, (_, i) => <circle key={i} cx={random('fx' + i) * 1080} cy={(random('fy' + i) * 1920 + f * (2 + random('fv' + i) * 4)) % 1920} r={3 + random('fr' + i) * 5} fill="#dff4ff" opacity={0.6} />)}
      </svg>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 280, color: CIANO, letterSpacing: -6}}>{n.toString().replace('-', '−')} °C</div>
      <Texto y={980} size={64} cor="#fff" delay={4}>TEMPERATURA MÉDIA</Texto>
    </AbsoluteFill>
  );
};
const Dia: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 6;
  return (
    <Fundo>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={260} fill="#1a0e08" stroke={OURO} strokeWidth={10} />
        <line x1={540} y1={1000} x2={540 + 200 * Math.sin((a * Math.PI) / 180)} y2={1000 - 200 * Math.cos((a * Math.PI) / 180)} stroke="#fff" strokeWidth={12} strokeLinecap="round" />
        <line x1={540} y1={1000} x2={540 + 130 * Math.sin((a * Math.PI) / 2160)} y2={1000 - 130 * Math.cos((a * Math.PI) / 2160)} stroke={OURO} strokeWidth={16} strokeLinecap="round" />
      </svg>
      <Titulo texto="O DIA DURA" y={300} size={120} />
      <Selo texto="24 H 40 MIN" y={1340} size={100} cor={OURO} delay={6} />
    </Fundo>
  );
};
const Ano: React.FC = () => (
  <Fundo>
    <Titulo texto="MAS O ANO DURA" y={300} size={120} />
    <Contador ate={687} y={620} size={300} cor={FERRUGEM} dur={30} />
    <Texto y={980} size={80} cor="#fff" delay={6}>DIAS</Texto>
  </Fundo>
);
const DezAnos: React.FC = () => {
  const s = useSpring(14);
  return (
    <Fundo>
      <div style={{position: 'absolute', top: 620, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', fontFamily: FONTE, textAlign: 'center'}}>
        <div><div style={{fontSize: 220, color: FERRUGEM}}>10</div><div style={{fontSize: 48, color: '#fff'}}>ANOS<br />MARCIANOS</div></div>
        <div style={{fontSize: 140, color: '#fff', marginTop: 40}}>≈</div>
        <div style={{opacity: s, transform: `scale(${0.7 + 0.3 * s})`}}><div style={{fontSize: 220, color: CIANO}}>18,8</div><div style={{fontSize: 48, color: '#fff'}}>ANOS<br />NA TERRA</div></div>
      </div>
      <Titulo texto="SEU ANIVERSÁRIO DE 10 ANOS" y={300} size={96} />
      <Etiqueta texto="CONTA" />
    </Fundo>
  );
};
const Radiacao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Faixa src="gale.jpg" etq="IMAGEM REAL · CRATERA GALE · CURIOSITY · NASA">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 30}, (_, i) => { const x = random('rx' + i) * 1080, k = ((f * 0.05 + random('rk' + i)) % 1);
          return <line key={i} x1={x + 200 * (1 - k)} y1={-100 + 1500 * k} x2={x + 200 * (1 - k) - 30} y2={-100 + 1500 * k + 120} stroke="#d0ff40" strokeWidth={5} opacity={0.8} />; })}
      </svg>
      <Titulo texto="O QUE VOCÊ NÃO VÊ: RADIAÇÃO" y={300} size={96} cor="#d0ff40" />
    </Faixa>
  );
};
const Dose: React.FC = () => (
  <Fundo>
    <Titulo texto="NA SUPERFÍCIE" y={300} size={110} />
    <Contador ate={234} y={620} size={260} pre="~" cor="#d0ff40" dur={28} />
    <Texto y={930} size={70} cor="#fff" delay={4}>mSv POR ANO</Texto>
    <Selo texto="CONTA" y={1080} size={56} cor="#cfd8e8" delay={12} />
  </Fundo>
);
const Limite: React.FC = () => (
  <Fundo>
    <Titulo texto="SÓ PRA COMPARAR" y={300} size={110} />
    <Selo texto={'LIMITE DA NASA (ADULTOS):\n600 mSv NA CARREIRA'} y={700} size={72} cor={OURO} delay={6} />
    <Texto y={1050} size={46} cor="#aab4cc" delay={16}>NÃO EXISTE LIMITE PARA CRIANÇAS</Texto>
  </Fundo>
);
const Passaria: React.FC = () => {
  const f = useCurrentFrame();
  const anos = interpolate(f, [4, 70], [0, 3], clamp);
  const dose = anos * 234;
  return (
    <Fundo>
      <div style={{position: 'absolute', top: 760, left: 120, right: 120, height: 120, borderRadius: 20, background: '#222', overflow: 'hidden'}}>
        <div style={{width: `${(dose / 702) * 100}%`, height: '100%', background: dose > 600 ? VERMELHO : '#d0ff40'}} />
      </div>
      <div style={{position: 'absolute', top: 700, left: 120 + (600 / 702) * 840, width: 8, height: 240, background: OURO}} />
      <div style={{position: 'absolute', top: 950, left: 120 + (600 / 702) * 840 - 100, width: 200, textAlign: 'center', fontFamily: FONTE, fontSize: 40, color: OURO}}>600</div>
      <div style={{position: 'absolute', top: 1060, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 120, color: '#fff'}}>{anos.toFixed(1).replace('.', ',')} ANOS</div>
      <Titulo texto="VOCÊ PASSARIA EM MENOS DE 3 ANOS" y={300} size={92} />
      <Etiqueta texto="CONTA" />
    </Fundo>
  );
};
const Subsolo: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #c8703a 0%, #a8582a 30%, #4a2410 31%, #2a1408 100%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <rect x={200} y={980} width={680} height={360} rx={180} fill="#d8e0ea" stroke="#8a96a4" strokeWidth={8} />
      <rect x={260} y={1060} width={560} height={200} rx={100} fill="#ffe8b0" opacity={0.6} />
      <Pessoa x={420} y={1250} h={170} cor="#4a3020" /><Pessoa x={620} y={1250} h={120} cor="#4a3020" />
      <rect x={520} y={590} width={40} height={390} fill="#8a96a4" />
    </svg>
    <Titulo texto="CRESCER DEBAIXO DO SOLO" y={260} size={100} />
    <Selo texto="TALVEZ" y={1360} size={60} cor={OURO} delay={6} />
    <Etiqueta texto="ILUSTRAÇÃO · HIPÓTESE" />
  </AbsoluteFill>
);
const Crescer: React.FC = () => {
  const f = useCurrentFrame();
  const h = interpolate(f, [0, 120], [260, 620], clamp);
  return (
    <Fundo>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Pessoa x={540} y={1450} h={h} cor="#f0d8c0" /></svg>
      <div style={{position: 'absolute', top: 640, left: 720, fontFamily: FONTE, fontSize: 260, color: OURO, opacity: 0.85}}>?</div>
      <Titulo texto="38% DA GRAVIDADE BASTA PRA CRESCER?" y={260} size={88} />
      <Selo texto="NINGUÉM SABE" y={480} size={56} cor={VERMELHO} delay={10} />
    </Fundo>
  );
};
const Pesada: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [10, 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0c2440, #02060c 75%)', transform: shake(f, 3 * p)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[340, 540, 740].map((x, i) => <path key={i} d={`M${x} ${700 + 60 * p} v200 m-60 -80 l60 80 l60 -80`} stroke={CIANO} strokeWidth={22} fill="none" opacity={p} />)}
        <Pessoa x={540} y={1450} h={480} cor="#f0d8c0" peso={p} />
      </svg>
      <Titulo texto="A TERRA SERIA PESADA DEMAIS?" y={280} size={96} cor={CIANO} />
      <Selo texto="TALVEZ" y={520} size={60} cor={OURO} delay={6} />
      <Etiqueta texto="ILUSTRAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const NuncaTestou: React.FC = () => (
  <Foto src="por_do_sol.jpg" etq="IMAGEM REAL · PÔR DO SOL EM MARTE · CURIOSITY · NASA" z={[1.0, 1.12]}>
    <Titulo texto="NINGUÉM NUNCA TESTOU" y={300} size={110} />
  </Foto>
);

const CENAS = [NuncaViu, SeuCorpo, Gravidade, EmMarte, Pesa, Porcento38, ArLaFora, Composicao, SemTraje, Frio, Dia, Ano, DezAnos, Radiacao, Dose,
  Limite, Passaria, Subsolo, Crescer, Pesada, NuncaTestou];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="nascimarte/narracao.mp3" calma={CALMA} sons={SONS} />;
