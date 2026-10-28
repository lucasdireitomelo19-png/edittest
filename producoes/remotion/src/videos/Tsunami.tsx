// Short "Em 1755, um TSUNAMI pode ter chegado ao Brasil" (Lisboa 1755). Roteiro do Roteirista (lote POV catástrofes #3), v4 sem POV, aprovado pelo dono em 28/10.
// Texto v4 (cartas de 1756 + Dourado et al., J. South Am. Earth Sci. 2022). Entrega direta na versão final, voz Brian.
// "HIPÓTESE" fica fixo no canto durante o trecho do Brasil. Gravuras de 1755: Rijksmuseum (domínio público). Praias: ilustração própria (sem clipe real disponível).
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {
  Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Pino, proj, caminho,
  useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS,
} from '../comum';
import palavras from './tsunami.palavras.json';
import atlantico from './dados/atlantico.json';

const W = palavras as Palavra[];
const FRASES = [
  'em 1755 o mar', 'invadiu pernambuco', 'e a culpa foi', 'de um terremoto em portugal', 'primeiro de novembro', 'de 1755 um terremoto', 'destruiu lisboa',
  'e empurrou uma onda', 'que atravessou o atlantico', 'ela chegou mesmo aqui', 'cartas da epoca contam', 'em lucena na paraiba', 'o mar entrou uma legua',
  'varios quilometros', 'e em 2022 cientistas', 'camadas de areia do mar', 'ainda nao e prova', 'os cientistas chamam', 'mas e uma pista seria',
  'e pode acontecer de novo', 'o atlantico pode mandar', 'mas o brasil fica longe', 'que criam os tsunamis gigantes', 'nao e o mega tsunami',
  'mas numa praia lotada', 'o mar entrando sem aviso', 'ja e o bastante',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas o brasil fica longe');
export const DURACAO = TEMPO.FIM;
const MAR = '#0b2a44';
const LISBOA: [number, number] = [-9.14, 38.72];
const TAMANDARE: [number, number] = [-35.1, -8.76];
const LUCENA: [number, number] = [-34.87, -6.9];

// praia do Nordeste ilustrada: mar no alto, areia embaixo; `agua` 0..1 = quanto o mar já avançou na areia
const PraiaMG: React.FC<{agua: number; pessoas?: boolean}> = ({agua, pessoas}) => {
  const f = useCurrentFrame();
  const y = 980 + agua * 760;
  const borda = Array.from({length: 28}, (_, k) => `L${k * 40} ${y + Math.sin(k * 0.7 + f * 0.25) * 14}`).join(' ');
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="pceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a7ab8" /><stop offset="1" stopColor="#bfe0f0" /></linearGradient>
        <linearGradient id="pmar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1c6a8a" /><stop offset="1" stopColor="#3aa0b8" /></linearGradient>
      </defs>
      <rect width={1080} height={760} fill="url(#pceu)" />
      <circle cx={820} cy={300} r={90} fill="#fff4c0" />
      <rect y={760} width={1080} height={1160} fill="#e6d2a0" />
      {Array.from({length: 5}, (_, i) => <path key={'c' + i} d={`M${60 + i * 230} 760 q 20 -160 70 -230`} stroke="#3a5a2a" strokeWidth={10} fill="none" />)}
      {Array.from({length: 5}, (_, i) => <circle key={'f' + i} cx={130 + i * 230} cy={530} r={46} fill="#2f6a2a" />)}
      {pessoas && Array.from({length: 14}, (_, i) => { const x = 60 + random('px' + i) * 960, yy = 1150 + random('py' + i) * 600, cor = ['#e8401a', '#ffd23f', '#4cc9f0', '#3ddc84'][i % 4];
        return <g key={'p' + i} opacity={yy < y ? 0.15 : 1}>{i % 3 === 0 ? <><line x1={x} y1={yy} x2={x} y2={yy - 110} stroke="#555" strokeWidth={5} /><path d={`M${x - 70} ${yy - 100} Q${x} ${yy - 170} ${x + 70} ${yy - 100} Z`} fill={cor} /></> : <><circle cx={x} cy={yy - 60} r={14} fill="#7a4a2a" /><rect x={x - 12} y={yy - 46} width={24} height={46} rx={8} fill={cor} /></>}</g>; })}
      <path d={`M0 760 L1080 760 L1080 ${y} ${borda} L0 ${y} Z`} fill="url(#pmar)" />
      <path d={`M0 ${y} ${borda}`} stroke="rgba(255,255,255,.9)" strokeWidth={10} fill="none" />
    </svg>
  );
};
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: shake(f, 6)}}>
      <PraiaMG agua={interpolate(f, [0, 50], [0.1, 0.55], {...clamp, easing: Easing.out(Easing.quad)})} />
      <Titulo texto="1755: O MAR INVADIU" y={300} size={100} cor="#0b2a44" />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Pernambuco: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(2, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{transform: shake(f, 8, 'p')}}>
      <PraiaMG agua={interpolate(f, [0, 30], [0.5, 0.85], clamp)} />
      <div style={{position: 'absolute', top: 320, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 118, color: '#fff', transform: `scale(${0.6 + 0.4 * s})`, opacity: s,
        WebkitTextStroke: '5px #0b2a44', paintOrder: 'stroke fill', textShadow: `0 10px 0 ${VERDE}, 0 0 40px rgba(0,0,0,.6)`}}>PERNAMBUCO</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Culpa: React.FC = () => <Glitch texto="E A CULPA FOI…" size={140} cor={OURO} />;
const Portugal: React.FC = () => <Mapa titulo="UM TERREMOTO EM PORTUGAL" />;
const Gravura: React.FC<{src: string; etq: string; titulo: string; z?: [number, number]; pos?: string; cor?: string}> = ({src, etq, titulo, z = [1.05, 1.15], pos = 'center', cor = '#fff'}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('tsunami/' + src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, d], z)})`, filter: 'sepia(.35) contrast(1.1)'}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      <Titulo texto={titulo} y={330} size={96} cor={cor} />
    </AbsoluteFill>
  );
};
const Data: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 640, width: 900, padding: '60px 0', borderRadius: 30, background: 'rgba(30,20,8,.9)',
        border: `4px solid ${OURO}`, opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 160, color: '#fff', letterSpacing: -4}}>01/11/1755</div>
      </div>
    </AbsoluteFill>
  );
};
// mapa real do Atlântico: Lisboa → Nordeste
const Mapa: React.FC<{onda?: boolean; pinos?: boolean; falhas?: boolean; titulo?: string; zoomNE?: boolean}> = ({onda, pinos, falhas, titulo, zoomNE}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = zoomNE ? interpolate(f, [0, d * 0.7], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)}) : 0;
  const k = Math.exp(interpolate(e, [0, 1], [Math.log(14), Math.log(120)]));
  const pr = proj(interpolate(e, [0, 1], [-22, -35.5]), interpolate(e, [0, 1], [18, -7.8]), k, 960);
  const [lx, ly] = pr(...LISBOA);
  const [tx, ty] = pr(...TAMANDARE);
  const [cx, cy] = pr(...LUCENA);
  const p = onda ? interpolate(f, [4, d - 4], [0, 1], clamp) : 0;
  const s = spring({frame: f - 6, fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: MAR}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={caminho(atlantico as number[][][], pr)} fill="#2c4a5e" stroke="#7fa3c0" strokeWidth={2} />
        {falhas && <path d={`M${pr(-30, 38.5).join(' ')} L${pr(-20, 37.5).join(' ')} L${pr(-12, 36.5).join(' ')} L${pr(-6, 36).join(' ')}`} stroke={VERMELHO} strokeWidth={10} strokeDasharray="20 10" fill="none" opacity={s} />}
        {onda && <>
          <path d={`M${lx} ${ly} Q${pr(-30, 20).join(' ')} ${tx} ${ty}`} stroke={CIANO} strokeWidth={8} fill="none" strokeDasharray="2400" strokeDashoffset={2400 * (1 - p)} />
          {[0, 1, 2].map((i) => { const q = Math.max(0, p - i * 0.12); return <circle key={i} cx={lx} cy={ly} r={q * 1400} fill="none" stroke="rgba(76,201,240,.5)" strokeWidth={5} opacity={1 - q} />; })}
        </>}
      </svg>
      {!zoomNE && <Pino x={lx} y={ly} s={s} cor={VERMELHO} />}
      {!zoomNE && <div style={{position: 'absolute', left: lx - 330, top: ly - 60, fontFamily: FONTE, fontSize: 60, color: '#fff', opacity: s, textShadow: '0 4px 20px #000'}}>LISBOA</div>}
      {falhas && <Texto y={pr(-18, 41)[1] - 80} size={36} cor={VERMELHO} delay={10}>GRANDES FALHAS</Texto>}
      {(onda || pinos) && <Pino x={tx} y={ty} s={pinos ? s : p} cor={CIANO} />}
      {pinos && <Pino x={cx} y={cy} s={s} cor={CIANO} />}
      {pinos && <>
        <div style={{position: 'absolute', left: tx - 470, top: ty - 40, fontFamily: FONTE, fontSize: 46, color: '#fff', opacity: s, textShadow: '0 4px 20px #000', textAlign: 'right', width: 420}}>TAMANDARÉ (PE)</div>
        <div style={{position: 'absolute', left: cx - 470, top: cy - 40, fontFamily: FONTE, fontSize: 46, color: '#fff', opacity: s, textShadow: '0 4px 20px #000', textAlign: 'right', width: 420}}>LUCENA (PB)</div>
      </>}
      <Etiqueta texto={onda ? 'MAPA REAL · ONDA: ILUSTRAÇÃO' : 'MAPA REAL'} />
      {titulo && <Titulo texto={titulo} y={300} size={88} />}
    </AbsoluteFill>
  );
};
const Ano: React.FC = () => <Gravura src="lisboa_1755.jpg" etq="GRAVURA DA ÉPOCA · LISBOA EM 1755 · RIJKSMUSEUM" titulo="LISBOA" z={[1.1, 1.2]} pos="70% 50%" cor={OURO} />;
const Lisboa: React.FC = () => <Gravura src="ruinas_1755.jpg" etq="GRAVURA DE 1757 · RUÍNAS DA CATEDRAL DE LISBOA · RIJKSMUSEUM" titulo="TERREMOTO DESTRÓI LISBOA" z={[1.15, 1.3]} pos="45% 50%" cor={OURO} />;
const Empurrou: React.FC = () => <Gravura src="lisboa_1755.jpg" etq="GRAVURA DA ÉPOCA · LISBOA EM 1755 · RIJKSMUSEUM" titulo="E EMPURROU UMA ONDA" z={[1.3, 1.5]} pos="30% 60%" cor={CIANO} />;
const Travessia: React.FC = () => <Mapa onda titulo="ATRAVESSOU O ATLÂNTICO" />;
const Chegou: React.FC = () => <Glitch texto="CHEGOU MESMO AQUI?" size={140} cor={CIANO} />;
const Areia: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [6, 26], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#120c08'}}>
      {[['#5a3e2a', 0], ['#6a4a30', 1], ['#e6d2a0', 2], ['#5a3e2a', 3], ['#4a3222', 4]].map(([c, i]) => (
        <div key={String(i)} style={{position: 'absolute', left: 0, right: 0, top: 620 + Number(i) * 200, height: Number(i) === 2 ? 120 : 200, background: String(c),
          boxShadow: Number(i) === 2 ? `0 0 ${40 * s}px rgba(255,230,160,${s})` : undefined}} />
      ))}
      <div style={{position: 'absolute', left: 60, top: 1050, fontFamily: FONTE, fontSize: 40, color: '#1a120c', opacity: s}}>← AREIA DO MAR</div>
      <Etiqueta texto="ILUSTRAÇÃO · CAMADAS DO SOLO" />
      <Titulo texto="AREIA DO MAR ONDE NÃO DEVIA" y={300} size={84} cor={OURO} />
      <Texto y={500} size={38} delay={6}>PONTINHAS (PE)</Texto>
    </AbsoluteFill>
  );
};
const Pontinhas: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #1a1206, #050302 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 640, width: 900, padding: '50px 0', borderRadius: 30, background: 'rgba(30,20,8,.9)',
        border: `4px solid ${OURO}`, opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 44, color: CIANO, letterSpacing: 4}}>2022 · CIENTISTAS</div>
        <div style={{fontSize: 110, color: '#fff', marginTop: 20}}>PONTINHAS</div>
        <div style={{fontSize: 56, color: OURO, marginTop: 10}}>PERNAMBUCO</div>
      </div>
    </AbsoluteFill>
  );
};
const Pinos: React.FC = () => <Mapa pinos zoomNE titulo="LUCENA E TAMANDARÉ" />;
const Cartas: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2a2014, #080604 75%)'}}>
      {[0, 1].map((i) => (
        <div key={i} style={{position: 'absolute', left: 200 + i * 90, top: 640 + i * 60, width: 600, height: 760, borderRadius: 8, background: '#e8dcc0',
          transform: `rotate(${i ? 4 : -5}deg) translateY(${(1 - s) * 200}px)`, opacity: s, boxShadow: '0 20px 60px rgba(0,0,0,.6)'}}>
          {Array.from({length: 12}, (_, k) => <div key={k} style={{margin: '44px 50px 0', height: 10, borderRadius: 5, background: '#8a7a5a', opacity: 0.5, width: 380 + ((k * 37) % 120)}} />)}
        </div>
      ))}
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="CARTAS DA ÉPOCA" y={300} size={110} cor={OURO} />
    </AbsoluteFill>
  );
};
const Legua: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2a2014, #080604 75%)'}}>
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, padding: '60px 50px', boxSizing: 'border-box', borderRadius: 10, background: '#e8dcc0',
        opacity: s, transform: `scale(${0.9 + 0.1 * s}) rotate(-2deg)`, textAlign: 'center', fontFamily: FONTE, boxShadow: '0 20px 60px rgba(0,0,0,.6)'}}>
        <div style={{fontSize: 52, color: '#7a3a1a', letterSpacing: 3}}>CARTA DE 1756</div>
        <div style={{fontSize: 92, color: '#2a1a0a', marginTop: 30, lineHeight: 1.05}}>“1 LÉGUA<br />TERRA ADENTRO”</div>
      </div>
      <Texto y={1180} size={38} delay={10}>LUCENA (PB) E TAMANDARÉ (PE)</Texto>
    </AbsoluteFill>
  );
};
const Km: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1626, #050a12)'}}>
      <div style={{position: 'absolute', left: 0, top: 900, width: 1080, height: 220, background: '#3d5a48'}} />
      <div style={{position: 'absolute', left: 0, top: 900, width: 120, height: 220, background: '#1c5a7a'}} />
      <div style={{position: 'absolute', left: 120, top: 900, width: 840 * p, height: 220, background: 'rgba(76,201,240,.6)'}} />
      <div style={{position: 'absolute', left: 120, top: 1150, width: 840, height: 6, background: OURO}} />
      <div style={{position: 'absolute', left: 40, top: 1180, fontFamily: FONTE, fontSize: 34, color: '#fff'}}>MAR</div>
      <div style={{position: 'absolute', right: 100, top: 1180, fontFamily: FONTE, fontSize: 34, color: OURO}}>1 LÉGUA</div>
      <Etiqueta texto="ILUSTRAÇÃO · ESCALA APROXIMADA" />
      <Titulo texto="VÁRIOS QUILÔMETROS" y={300} size={104} cor={CIANO} />
    </AbsoluteFill>
  );
};
const Prova: React.FC = () => <Glitch texto="AINDA NÃO É PROVA." size={140} />;
const Possivel: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      <div style={{position: 'absolute', left: 110, top: 600, width: 860, padding: '60px 0', borderRadius: 30, background: 'rgba(8,14,30,.92)',
        border: '3px solid rgba(76,201,240,.7)', opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 40, color: CIANO, letterSpacing: 4}}>DOURADO ET AL. · 2022</div>
        <div style={{marginTop: 40, fontSize: 92, color: '#fff', lineHeight: 1.05}}>“POSSÍVEL<br />EVIDÊNCIA”</div>
      </div>
      <Titulo texto="OS CIENTISTAS DIZEM:" y={300} size={84} />
    </AbsoluteFill>
  );
};
const Pista: React.FC = () => {
  const s = useSpring(4, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: '#0a0a0c', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '30px 60px', border: `8px solid ${OURO}`, borderRadius: 24, fontFamily: FONTE, fontSize: 120, color: OURO, transform: `scale(${0.7 + 0.3 * s}) rotate(-3deg)`, opacity: s, textAlign: 'center', lineHeight: 1.05}}>UMA PISTA<br />SÉRIA</div>
    </AbsoluteFill>
  );
};
const DeNovo: React.FC = () => <Glitch texto="E PODE ACONTECER DE NOVO?" size={120} cor={VERMELHO} />;
const Manda: React.FC = () => <Mapa onda titulo="O ATLÂNTICO PODE MANDAR ONDAS" />;
const Longe: React.FC = () => <Mapa falhas titulo="LONGE DAS GRANDES FALHAS" />;
const Onda: React.FC<{cruza?: boolean; titulo: string}> = ({cruza, titulo}) => {
  const f = useCurrentFrame();
  const r = cruza ? interpolate(f, [8, 18], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{background: '#06101c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1500 L0 900 Q200 500 520 560 Q700 600 640 760 Q560 700 520 820 Q700 1000 1080 1100 L1080 1500 Z" fill="#1c5a7a" opacity={0.8} />
        {cruza && <>
        <line x1={120} y1={600} x2={120 + 840 * r} y2={600 + 900 * r} stroke={VERMELHO} strokeWidth={36} strokeLinecap="round" />
        <line x1={960} y1={600} x2={960 - 840 * r} y2={600 + 900 * r} stroke={VERMELHO} strokeWidth={36} strokeLinecap="round" />
        </>}
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto={titulo} y={300} size={80} />
    </AbsoluteFill>
  );
};
const Gigantes: React.FC = () => <Onda titulo="OS TSUNAMIS GIGANTES" />;
const Filmes: React.FC = () => <Onda cruza titulo="NÃO É O MEGA-TSUNAMI DOS FILMES" />;
const Lotada: React.FC = () => (
  <AbsoluteFill>
    <PraiaMG agua={0.05} pessoas />
    <Titulo texto="NUMA PRAIA LOTADA" y={300} size={104} cor="#0b2a44" />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Entrando: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{transform: shake(f, 5, 'e')}}>
      <PraiaMG agua={interpolate(f, [0, d], [0.05, 0.6], {...clamp, easing: Easing.in(Easing.quad)})} pessoas />
      <Titulo texto="O MAR ENTRANDO SEM AVISO" y={300} size={96} cor="#0b2a44" />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Bastante: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a1626, #000 70%)', justifyContent: 'center', alignItems: 'center'}}>
    <Titulo texto="JÁ É O BASTANTE." y={820} size={120} cor={OURO} />
  </AbsoluteFill>
);

// selo fixo no canto durante o trecho do Brasil
const Selo: React.FC = () => (
  <div style={{position: 'absolute', right: 40, top: 200, padding: '8px 18px', borderRadius: 14, border: `4px solid ${OURO}`, background: 'rgba(0,0,0,.6)',
    fontFamily: FONTE, fontSize: 30, color: OURO, letterSpacing: 3}}>HIPÓTESE</div>
);

const CENAS = [Gancho, Pernambuco, Culpa, Portugal, Data, Ano, Lisboa, Empurrou, Travessia, Chegou, Cartas, Pinos, Legua, Km, Pontinhas, Areia, Prova, Possivel, Pista,
  DeNovo, Manda, Longe, Gigantes, Filmes, Lotada, Entrando, Bastante];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const SELO_INI = T[FRASES.indexOf('ela chegou mesmo aqui')], SELO_FIM = T[FRASES.indexOf('e pode acontecer de novo')];

export const Video: React.FC = () => (
  <AbsoluteFill>
    <Short W={W} tempo={TEMPO} cenas={CENAS} calma={CALMA} audio="tsunami/narracao.mp3" />
    <Sequence from={SELO_INI} durationInFrames={SELO_FIM - SELO_INI}><Selo /></Sequence>
  </AbsoluteFill>
);
