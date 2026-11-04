// Longo POV A "Um BURACO NEGRO está vindo e você tem 1 ANO!" (1920x1080). Lote Linha dos campeões, roteiro longo_buraco_negro_1ano.md (v1), aprovado pelo dono em 04/11.
// Voz Brian (ElevenLabs, --vel 1.1 --pausa 0.45) com capítulos de 2,2 s. Física: Pavlík e Shore 2021 (A&A 648 L2) + contas da Pesquisas (fatos.md, 03/11).
// Regra do dono: NENHUMA cena se repete. Cada foto entra uma vez só, e cada cena animada é um desenho próprio (nenhum molde usado duas vezes).
// Reais: NASA/JPL (Netuno, Urano, Saturno da Cassini, Voyager), NASA (Hubble, Terra, ISS: cidade, nascer do sol, cúpula; STS-135; Controle da Missão; praia do KSC),
// NASA/ESA (lente gravitacional), EHT (M87*, eso1907a), ESO (potw1038a). Ilustrações: NASA/JPL-Caltech (buraco negro com jato), NOIRLab/NSF/AURA/J. da Silva (Gaia BH1).
// Gravura: Le Verrier no Bilder-Magazin de 1846 (Rijksmuseum, domínio público).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, useSpring} from '../comum';
import {NOITE, Etq, Tit, Sub, Glitch, Grande, criarLongo, Cap} from '../longo';
import palavras from './bnano.palavras.json';

const W = palavras as Palavra[];
const ROSA = '#ff6fae';
const ROXO = '#a98bff';
const LAR = '#ff9a3c';

const CAPS: Cap[] = [
  {canto: 'E SE · O AVISO', sat: 1},
  {canto: 'E SE · FALTAM 365 DIAS', sat: 0.9, titulo: 'FALTAM 365 DIAS', sub: 'NA REGIÃO DE URANO'},
  {canto: 'E SE · FALTAM 300 DIAS', sat: 0.8, titulo: 'FALTAM 300 DIAS', sub: 'COMO SOUBERAM'},
  {canto: 'E SE · FALTAM 240 DIAS', sat: 0.7, titulo: 'FALTAM 240 DIAS', sub: 'O CÉU ENTORTA'},
  {canto: 'E SE · FALTAM 180 DIAS', sat: 0.6, titulo: 'FALTAM 180 DIAS', sub: 'POR ONDE ELE PASSA?'},
  {canto: 'E SE · FALTAM 90 DIAS', sat: 0.5, titulo: 'FALTAM 90 DIAS', sub: 'OS GIGANTES'},
  {canto: 'E SE · FALTAM 30 DIAS', sat: 0.4, titulo: 'FALTAM 30 DIAS', sub: 'E A TERRA?'},
  {canto: 'E SE · DIA 0', sat: 0.3, titulo: 'DIA 0', sub: 'A PASSAGEM'},
  {canto: 'E SE · DEPOIS', sat: 0.25, titulo: 'DEPOIS', sub: 'O RASTRO'},
  {canto: 'MAS ESPERA…', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const img = (s: string) => staticFile('bnano/' + s);
const pr = (f: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...clamp, easing: e});
const Fd: React.FC<{c?: string; children?: React.ReactNode}> = ({c = '#141a30', children}) => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${c}, ${NOITE} 75%)`}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{children}</svg>;
const Est: React.FC<{n?: number; sem: string; o?: number; v?: number}> = ({n = 160, sem, o = 1, v = 0}) => {
  const f = useCurrentFrame();
  return <Svg>{Array.from({length: n}, (_, i) => <circle key={i} cx={(random(sem + 'x' + i) * 1920 + f * v * (0.3 + random(sem + 'v' + i))) % 1920} cy={random(sem + 'y' + i) * 1080} r={0.8 + random(sem + 'r' + i) * 2.2} fill="#fff" opacity={o * (0.3 + 0.7 * random(sem + 'o' + i))} />)}</Svg>;
};
const F: React.FC<{src: string; etq: string; t?: string; z?: [number, number]; pos?: string; sub?: string; filtro?: string}> = ({src, etq, t, z = [1.02, 1.12], pos = 'center', sub, filtro}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: filtro, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.55), transparent 30%, transparent 65%, rgba(0,0,0,.6))'}} />
      <Etq t={etq} real={etq.startsWith('IMAGEM REAL')} />
      {t && <Tit t={t} />}
      {sub && <Sub y={250} s={42} cor={OURO}>{sub}</Sub>}
    </AbsoluteFill>
  );
};
const Bn: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 34}) => (
  <g><circle cx={x} cy={y} r={r * 1.9} fill="none" stroke={LAR} strokeWidth={3} opacity={0.35} /><circle cx={x} cy={y} r={r} fill="#000" stroke="#ffb070" strokeWidth={3} /></g>
);
const Esf: React.FC<{x: number; y: number; r: number; c: string; c2?: string; id: string}> = ({x, y, r, c, c2 = '#000', id}) => (
  <g><defs><radialGradient id={id} cx="0.35" cy="0.3"><stop offset="0" stopColor={c} /><stop offset="1" stopColor={c2} /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#${id})`} /></g>
);
const PL = [{n: 'MERCÚRIO', a: 0.39}, {n: 'VÊNUS', a: 0.72}, {n: 'TERRA', a: 1}, {n: 'MARTE', a: 1.52}, {n: 'JÚPITER', a: 5.2}, {n: 'SATURNO', a: 9.58}, {n: 'URANO', a: 19.2}, {n: 'NETUNO', a: 30}];
const raiz = (ua: number, k = 80) => Math.sqrt(ua) * k;

// ---------- 0 · gancho ----------
const Telejornal: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#10203c">
      <div style={{position: 'absolute', left: 160, top: 150, width: 1600, height: 760, borderRadius: 24, background: 'linear-gradient(160deg,#0b2850,#04101f)', border: '6px solid #24467a', overflow: 'hidden'}}>
        <Est sem="tv" n={80} o={0.6} />
        <svg width={1600} height={760} style={{position: 'absolute', inset: 0}}><Bn x={1150} y={330} r={70} /></svg>
        <div style={{position: 'absolute', left: 60, top: 80, fontFamily: FONTE, fontSize: 40, color: '#ff3a3a', letterSpacing: 4, opacity: Math.floor(f / 10) % 2 ? 1 : 0.4}}>● AO VIVO</div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 190, background: VERMELHO}}>
          <div style={{position: 'absolute', left: 50, top: 26, fontFamily: FONTE, fontSize: 40, color: '#fff', letterSpacing: 3}}>URGENTE</div>
          <div style={{position: 'absolute', left: 50, top: 80, fontFamily: FONTE, fontSize: 54, color: '#fff'}}>BURACO NEGRO A CAMINHO DO SISTEMA SOLAR</div>
        </div>
      </div>
      <Etq t="ILUSTRAÇÃO · TELEJORNAL FICTÍCIO" />
    </Fd>
  );
};
const Contador365: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(0, {damping: 10, mass: 0.7});
  return (
    <AbsoluteFill style={{background: '#120404', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 380, color: VERMELHO, letterSpacing: -10, transform: `scale(${0.7 + 0.3 * s})`, textShadow: `0 0 ${60 + 20 * Math.sin(f / 4)}px #ff202088`}}>365</div>
      <div style={{position: 'absolute', top: 760, fontFamily: FONTE, fontSize: 70, color: '#fff', letterSpacing: 12}}>DIAS</div>
    </AbsoluteFill>
  );
};
const PassaReto: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 90], [-100, 2020]);
  return (
    <Fd c="#0c1426">
      <Est sem="pr" n={140} />
      <Svg>
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={960} cy={560} r={120 + i * 110} fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={2} />)}
        <circle cx={960} cy={560} r={34} fill="#ffd860" />
        <line x1={-100} y1={160} x2={x} y2={160} stroke={LAR} strokeWidth={3} strokeDasharray="14 10" opacity={0.6} />
        <Bn x={x} y={160} r={30} />
      </Svg>
      <Tit t="ELE NÃO BATE EM NADA. SÓ PASSA." y={900} s={70} />
      <Etq t="ANIMAÇÃO" />
    </Fd>
  );
};
const DezSois: React.FC = () => {
  const f = useCurrentFrame();
  const ang = interpolate(f, [6, 30], [0, -14], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <Fd c="#201808">
      <Svg>
        <g transform={`rotate(${ang} 960 560)`}>
          <rect x={360} y={552} width={1200} height={16} rx={8} fill="#cfd2da" />
          <Bn x={520} y={470} r={60} />
          {Array.from({length: 10}, (_, i) => <circle key={i} cx={1260 + (i % 5) * 60} cy={440 + Math.floor(i / 5) * 64} r={26} fill="#ffd860" opacity={0.25} />)}
          <circle cx={1380} cy={490} r={50} fill="#ffd860" />
        </g>
        <polygon points="960,568 900,760 1020,760" fill="#8a8f9a" />
      </Svg>
      <Tit t="10× A MASSA DO SOL" />
      <Sub y={850} s={44} cor={OURO}>NÃO PRECISA BATER PRA MUDAR TUDO</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const CarimboES: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [8, 18], [2.4, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1420, #050408 70%)'}}>
      <div style={{position: 'absolute', top: 230, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 90, color: '#cfd2da'}}>ESTA HISTÓRIA É IMAGINÁRIA</div>
      <div style={{position: 'absolute', left: 560, top: 440, padding: '20px 60px', border: `12px solid ${ROSA}`, borderRadius: 20, fontFamily: FONTE, fontSize: 120, color: ROSA,
        transform: `rotate(-8deg) scale(${s})`, opacity: f > 8 ? 1 : 0}}>E SE · CONTAS REAIS</div>
    </AbsoluteFill>
  );
};

// ---------- 1 · 365 ----------
const MapaSS: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0a1224">
      <Svg>
        {PL.map((p, i) => <g key={p.n}><circle cx={960} cy={560} r={raiz(p.a, 92)} fill="none" stroke="#fff" strokeOpacity={p.n === 'URANO' ? 0.6 : 0.18} strokeWidth={p.n === 'URANO' ? 4 : 2} />
          <circle cx={960 + Math.cos(i * 1.3 + f * 0.01) * raiz(p.a, 92)} cy={560 + Math.sin(i * 1.3 + f * 0.01) * raiz(p.a, 92)} r={7} fill="#cfe0ff" /></g>)}
        <circle cx={960} cy={560} r={16} fill="#ffd860" />
        <Bn x={960 + raiz(22, 92) * Math.cos(-0.5)} y={560 + raiz(22, 92) * Math.sin(-0.5)} r={18} />
        <text x={960 + raiz(22, 92) * Math.cos(-0.5) + 40} y={560 + raiz(22, 92) * Math.sin(-0.5) - 30} fontFamily={FONTE} fontSize={36} fill={LAR}>AQUI</text>
      </Svg>
      <Tit t="NA REGIÃO DE URANO" />
      <Etq t="ANIMAÇÃO · ESCALA DE RAIZ QUADRADA" />
    </Fd>
  );
};
const Velocimetro: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [4, 34], [-120, 75], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Fd c="#1a1010">
      <Svg>
        <path d="M 610 700 A 350 350 0 1 1 1310 700" fill="none" stroke="#3a3f4a" strokeWidth={40} />
        <path d="M 610 700 A 350 350 0 1 1 1310 700" fill="none" stroke={VERMELHO} strokeWidth={40} strokeDasharray={`${pr(f, 4, 34) * 1650} 2000`} />
        <line x1={960} y1={700} x2={960 + Math.sin(a * Math.PI / 180) * 300} y2={700 - Math.cos(a * Math.PI / 180) * 300} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
        <circle cx={960} cy={700} r={26} fill="#fff" />
      </Svg>
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 120, color: '#fff'}}>50 KM/S</div>
      <Etq t="ILUSTRAÇÃO · CÁLCULO" />
    </Fd>
  );
};
const ReguaUA: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 4, 50);
  return (
    <Fd c="#0e1a24">
      <Svg>
        <line x1={200} x2={1720} y1={600} y2={600} stroke="#fff" strokeOpacity={0.4} strokeWidth={4} />
        {Array.from({length: 11}, (_, i) => <g key={i}><line x1={200 + i * 152} x2={200 + i * 152} y1={580} y2={620} stroke="#fff" strokeWidth={4} /><text x={200 + i * 152} y={680} textAnchor="middle" fontFamily={FONTE} fontSize={34} fill="#cfd2da">{i}</text></g>)}
        <rect x={200} y={585} width={1520 * k} height={30} rx={15} fill={CIANO} opacity={0.8} />
        <Bn x={200 + 1520 * k} y={520} r={22} />
      </Svg>
      <Tit t="~10 VEZES TERRA–SOL EM 1 ANO" s={72} />
      <Sub y={760} s={40} cor={OURO}>UNIDADES ASTRONÔMICAS (UA) · CÁLCULO</Sub>
      <Etq t="ESCALA · CÁLCULO" />
    </Fd>
  );
};
const Manchetes: React.FC = () => {
  const f = useCurrentFrame();
  const ls = ['BURACO NEGRO: O QUE SE SABE', 'CIENTISTAS FAZEM CÁLCULOS', 'FALTA UM ANO', 'ONDE ELE ESTÁ AGORA?'];
  return (
    <AbsoluteFill style={{background: '#e8e2d4'}}>
      {ls.map((l, i) => {
        const s = pr(f, i * 6, i * 6 + 10, Easing.out(Easing.back(1.6)));
        return <div key={l} style={{position: 'absolute', left: 260 + (i % 2) * 120, top: 140 + i * 210, width: 1300, padding: '26px 40px', background: '#fff', boxShadow: '0 12px 40px rgba(0,0,0,.25)',
          transform: `rotate(${(i % 2 ? 2 : -2)}deg) scale(${s})`, fontFamily: 'Georgia, serif', fontSize: 62, fontWeight: 700, color: '#111'}}>{l}</div>;
      })}
      <Etq t="ILUSTRAÇÃO · JORNAIS FICTÍCIOS" />
    </AbsoluteFill>
  );
};
const Chat: React.FC = () => {
  const f = useCurrentFrame();
  const msgs = [{q: 'MÃE', t: 'viram o jornal???'}, {q: 'TIO', t: 'é verdade isso do buraco negro?'}, {q: 'PRIMA', t: 'na escola só falam disso'}, {q: 'VOCÊ', t: 'a gente vai morrer?', eu: true}];
  return (
    <AbsoluteFill style={{background: '#0b1418'}}>
      <div style={{position: 'absolute', left: 610, top: 40, width: 700, height: 1000, borderRadius: 50, background: '#e6ddd4', border: '14px solid #111', overflow: 'hidden'}}>
        <div style={{height: 110, background: '#1f6f5c', color: '#fff', fontFamily: FONTE, fontSize: 38, padding: '34px 40px'}}>FAMÍLIA</div>
        {msgs.map((m, i) => {
          const s = pr(f, 8 + i * 22, 14 + i * 22);
          return <div key={i} style={{margin: '26px 30px', marginLeft: m.eu ? 180 : 30, padding: '18px 26px', borderRadius: 22, background: m.eu ? '#d6f5c4' : '#fff', opacity: s, transform: `translateY(${(1 - s) * 30}px)`,
            fontFamily: FONTE, fontSize: 34, color: '#222'}}><div style={{fontSize: 24, color: '#1f6f5c'}}>{m.q}</div>{m.t}</div>;
        })}
      </div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const CeuNoite: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#02040c,#0a1430 75%,#182444)'}}>
    <Est sem="cn" n={260} />
    <Svg><path d="M0 900 L120 900 L120 820 L220 820 L220 870 L340 870 L340 760 L420 760 L420 880 L560 880 L560 800 L700 800 L700 900 L860 900 L860 740 L940 740 L940 900 L1100 900 L1100 840 L1240 840 L1240 780 L1320 780 L1320 900 L1500 900 L1500 820 L1640 820 L1640 900 L1920 900 L1920 1080 L0 1080 Z" fill="#05070c" /></Svg>
    <Tit t="VOCÊ OLHA PRO CÉU… E NÃO VÊ NADA" s={70} />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const TresNao: React.FC = () => {
  const f = useCurrentFrame();
  const ls = ['NÃO BRILHA', 'NÃO REFLETE', 'NÃO EMITE LUZ'];
  return (
    <Fd c="#101010">
      {ls.map((l, i) => {
        const s = pr(f, i * 26, i * 26 + 8);
        return <div key={l} style={{position: 'absolute', left: 520, top: 260 + i * 200, display: 'flex', alignItems: 'center', opacity: 0.3 + 0.7 * s}}>
          <div style={{width: 110, height: 110, borderRadius: 18, border: `8px solid ${VERMELHO}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTE, fontSize: 80, color: VERMELHO}}>{s > 0.5 ? '✕' : ''}</div>
          <div style={{marginLeft: 50, fontFamily: FONTE, fontSize: 96, color: '#fff'}}>{l}</div>
        </div>;
      })}
    </Fd>
  );
};
const CirculoCidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#1c2026'}}>
      <Svg>
        {Array.from({length: 26}, (_, i) => <line key={'h' + i} x1={0} x2={1920} y1={i * 44 + (random('ch' + i) - 0.5) * 20} y2={i * 44 + (random('ch2' + i) - 0.5) * 40} stroke="#3a404a" strokeWidth={3 + random('cw' + i) * 4} />)}
        {Array.from({length: 46}, (_, i) => <line key={'v' + i} x1={i * 44} x2={i * 44 + (random('cv' + i) - 0.5) * 60} y1={0} y2={1080} stroke="#3a404a" strokeWidth={3 + random('cz' + i) * 4} />)}
        <circle cx={960} cy={560} r={360 * pr(f, 0, 24)} fill="rgba(255,150,60,.12)" stroke={LAR} strokeWidth={8} strokeDasharray="30 16" />
        <line x1={600} x2={1320} y1={560} y2={560} stroke="#fff" strokeWidth={4} opacity={pr(f, 20, 30)} />
      </Svg>
      <div style={{position: 'absolute', top: 480, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#fff', opacity: pr(f, 20, 30)}}>~30 KM</div>
      <Tit t="DO TAMANHO DE UMA CIDADE" />
      <Etq t="ILUSTRAÇÃO · HORIZONTE DE EVENTOS · CÁLCULO" />
    </AbsoluteFill>
  );
};
const DezEmUm: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 4, 30);
  return (
    <Fd c="#1a1206">
      <Svg>
        {Array.from({length: 10}, (_, i) => { const x0 = 300 + i * 147; return <circle key={i} cx={interpolate(k, [0, 1], [x0, 960])} cy={560} r={interpolate(k, [0, 1], [56, 6])} fill="#ffd860" opacity={1 - k * 0.8} />; })}
        {k > 0.85 && <Bn x={960} y={560} r={40} />}
      </Svg>
      <Tit t="MAS PESA 10 SÓIS" />
      <Etq t="ANIMAÇÃO" />
    </Fd>
  );
};

// ---------- 2 · 300 ----------
const Folhas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#18202a">
      {[365, 340, 320, 300].map((n, i) => {
        const sai = i < 3 ? pr(f, 4 + i * 8, 14 + i * 8) : 0;
        return <div key={n} style={{position: 'absolute', left: 710, top: 220, width: 500, height: 620, borderRadius: 24, background: '#f4f1ea', boxShadow: '0 20px 60px rgba(0,0,0,.5)', zIndex: 10 - i,
          transform: `translate(${sai * 900}px, ${-sai * 300}px) rotate(${sai * 40}deg)`, opacity: 1 - sai * 0.6, textAlign: 'center', fontFamily: FONTE}}>
          <div style={{height: 120, background: VERMELHO, borderRadius: '24px 24px 0 0', color: '#fff', fontSize: 48, paddingTop: 36}}>FALTAM</div>
          <div style={{fontSize: 230, color: '#222', marginTop: 60}}>{n}</div></div>;
      })}
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Interrogacao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#2a1a08">
      <div style={{position: 'absolute', left: 200, top: 140, fontFamily: FONTE, fontSize: 700, color: OURO, lineHeight: 1, transform: `rotate(${Math.sin(f / 9) * 6}deg)`, textShadow: `0 0 80px ${OURO}88`}}>?</div>
      <div style={{position: 'absolute', left: 760, top: 360, width: 1000, fontFamily: FONTE, fontSize: 84, color: '#fff', lineHeight: 1.1}}>COMO ACHAR ALGO QUE <span style={{color: OURO}}>NÃO BRILHA?</span></div>
    </Fd>
  );
};
const Ampulheta: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 70, Easing.linear);
  return (
    <Fd c="#1e1a12">
      <Svg>
        <path d="M 760 200 L 1160 200 L 980 540 L 1160 880 L 760 880 L 940 540 Z" fill="none" stroke="#d8c8a0" strokeWidth={10} />
        <path d={`M ${780 + k * 160} ${220 + k * 300} L ${1140 - k * 160} ${220 + k * 300} L 960 530 Z`} fill="#e8c070" />
        <path d={`M ${960 - k * 180} 860 L ${960 + k * 180} 860 L 960 ${860 - k * 220} Z`} fill="#e8c070" />
        <line x1={960} y1={530} x2={960} y2={860} stroke="#e8c070" strokeWidth={4} opacity={k < 1 ? 1 : 0} />
      </Svg>
      <div style={{position: 'absolute', left: 1240, top: 380, fontFamily: FONTE, fontSize: 76, color: '#fff', lineHeight: 1.1}}>EM CIMA<br />DA HORA?<br /><span style={{color: VERMELHO}}>NÃO.</span></div>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Desvio: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 4, 60, Easing.linear);
  const pts = (dv: number) => Array.from({length: 40}, (_, i) => `${260 + i * 36},${700 - i * 9 - (i > 15 ? (i - 15) ** 1.6 * dv : 0)}`).slice(0, Math.max(2, Math.round(40 * k))).join(' ');
  return (
    <Fd c="#0c1a20">
      <Svg>
        <line x1={240} x2={1700} y1={760} y2={760} stroke="#fff" strokeOpacity={0.4} strokeWidth={3} />
        <polyline points={pts(0)} fill="none" stroke="#9aa4b8" strokeWidth={6} strokeDasharray="16 10" />
        <polyline points={pts(4)} fill="none" stroke={VERMELHO} strokeWidth={8} />
        <text x={1500} y={340} fontFamily={FONTE} fontSize={36} fill="#9aa4b8">PREVISTA</text>
        <text x={1350} y={180} fontFamily={FONTE} fontSize={36} fill={VERMELHO}>OBSERVADA</text>
      </Svg>
      <Tit t="PLANETAS FORA DO LUGAR" />
      <Etq t="GRÁFICO · ILUSTRAÇÃO" />
    </Fd>
  );
};
const Calculos: React.FC = () => {
  const f = useCurrentFrame();
  const eq = ['F = G·M·m / r²', 'a = 19,2 UA → 19,2004 UA', 'Δθ = 0,0003°', 'r(t) = r₀ + v·t', 'M ≈ 10 M☉ ?', 'erro: 0,01%'];
  return (
    <AbsoluteFill style={{background: '#0d1f17'}}>
      {eq.map((e, i) => <div key={i} style={{position: 'absolute', left: 200 + (i % 2) * 760, top: 900 - ((f * 4 + i * 120) % 650), fontFamily: 'monospace', fontSize: 72, color: '#e8fff0'}}>{e}</div>)}
      <Tit t="ANOS MEDINDO E RECALCULANDO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const PuxaoUrano: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 0.03;
  const ux = 960 + Math.cos(a) * 300, uy = 560 + Math.sin(a) * 180;
  return (
    <Fd c="#0e1630">
      <Svg>
        <ellipse cx={960} cy={560} rx={300} ry={180} fill="none" stroke="#9ad8e0" strokeOpacity={0.4} strokeWidth={3} />
        <ellipse cx={960} cy={560} rx={520} ry={300} fill="none" stroke="#5a7ae8" strokeOpacity={0.3} strokeWidth={3} strokeDasharray="10 10" />
        <circle cx={960} cy={560} r={20} fill="#ffd860" />
        <Esf x={ux} y={uy} r={26} c="#bfeef0" c2="#3a7a80" id="ur" />
        <circle cx={960 + Math.cos(a + 0.4) * 520} cy={560 + Math.sin(a + 0.4) * 300} r={22} fill="none" stroke="#5a7ae8" strokeWidth={4} strokeDasharray="6 6" />
        <text x={960 + Math.cos(a + 0.4) * 520} y={560 + Math.sin(a + 0.4) * 300 - 40} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill="#8aa4ff">???</text>
        <line x1={ux} y1={uy} x2={ux + (Math.cos(a + 0.4) * 520 - Math.cos(a) * 300) * 0.3} y2={uy + (Math.sin(a + 0.4) * 300 - Math.sin(a) * 180) * 0.3} stroke={VERMELHO} strokeWidth={8} markerEnd="url(#seta)" />
        <defs><marker id="seta" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={VERMELHO} /></marker></defs>
      </Svg>
      <Tit t="UM PUXÃO ESTRANHO EM URANO" />
      <Etq t="ANIMAÇÃO · COMO NETUNO FOI ACHADO" />
    </Fd>
  );
};
const Claquete: React.FC = () => {
  const f = useCurrentFrame();
  const ab = interpolate(f, [0, 8, 12], [-24, -24, 0], clamp);
  return (
    <Fd c="#1a1a1a">
      <Svg>
        <g transform="translate(560 380)">
          <rect x={0} y={60} width={800} height={460} rx={20} fill="#111" stroke="#fff" strokeWidth={6} />
          <g transform={`rotate(${ab} 0 60)`}><rect x={0} y={0} width={800} height={60} fill="#fff" />{Array.from({length: 6}, (_, i) => <polygon key={i} points={`${i * 140 + 20},0 ${i * 140 + 90},0 ${i * 140 + 60},60 ${i * 140 - 10},60`} fill="#111" />)}</g>
          <text x={400} y={260} textAnchor="middle" fontFamily={FONTE} fontSize={70} fill="#fff">"1 ANO"</text>
          <text x={400} y={360} textAnchor="middle" fontFamily={FONTE} fontSize={44} fill={OURO}>É SÓ PRA HISTÓRIA</text>
        </g>
      </Svg>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Decadas: React.FC = () => {
  const f = useCurrentFrame();
  const ano = Math.round(interpolate(f, [0, 50], [1990, 2026], clamp));
  return (
    <Fd c="#101a2a">
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 240, color: CIANO, fontVariantNumeric: 'tabular-nums'}}>{ano}</div>
      <Tit t="O AVISO VIRIA DÉCADAS ANTES" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};

// ---------- 3 · 240 ----------
const LenteAnim: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 40);
  return (
    <AbsoluteFill style={{background: '#03050c'}}>
      <Svg>
        {Array.from({length: 220}, (_, i) => {
          const x = random('lx' + i) * 1920, y = random('ly' + i) * 1080;
          const dx = x - 960, dy = y - 560, d = Math.hypot(dx, dy) + 1;
          const em = k * 9000 / d;
          return <circle key={i} cx={x + dx / d * em} cy={y + dy / d * em} r={1 + random('lr' + i) * 2.2} fill="#fff" opacity={0.4 + 0.6 * random('lo' + i)} />;
        })}
        <circle cx={960} cy={560} r={95 * k} fill="none" stroke={LAR} strokeWidth={2} opacity={0.4} strokeDasharray="6 8" />
      </Svg>
      <Tit t="AS ESTRELAS SAEM DO LUGAR" />
      <Etq t="ANIMAÇÃO · EFEITO EXAGERADO" />
    </AbsoluteFill>
  );
};
const Angulo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#141820">
      <Svg>
        <path d="M 360 820 A 1200 1200 0 0 1 1560 820" fill="none" stroke="#cfd2da" strokeWidth={6} />
        <line x1={960} y1={820} x2={960} y2={200} stroke="#fff" strokeWidth={5} />
        <line x1={960} y1={820} x2={960 + 4 * pr(f, 6, 30)} y2={200} stroke={VERMELHO} strokeWidth={5} />
        <circle cx={960} cy={820} r={16} fill="#fff" />
      </Svg>
      <div style={{position: 'absolute', left: 1050, top: 380, fontFamily: FONTE, fontSize: 80, color: VERMELHO}}>~41″</div>
      <div style={{position: 'absolute', left: 1050, top: 490, fontFamily: FONTE, fontSize: 40, color: '#fff'}}>FRAÇÃO MÍNIMA DE GRAU</div>
      <Etq t="ILUSTRAÇÃO · CÁLCULO (A ~10 UA)" />
    </Fd>
  );
};
const CopoDagua: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04060e'}}>
      <Svg>
        <defs><clipPath id="copo"><path d="M 760 180 L 1160 180 L 1110 920 L 810 920 Z" /></clipPath></defs>
        {Array.from({length: 160}, (_, i) => { const x = random('cx' + i) * 1920, y = random('cy' + i) * 1080; return <circle key={i} cx={x} cy={y} r={1.6} fill="#fff" opacity={0.6} />; })}
        <g clipPath="url(#copo)">
          <rect x={700} y={150} width={520} height={800} fill="#0a1a30" />
          {Array.from({length: 160}, (_, i) => { const x = random('cx' + i) * 1920, y = random('cy' + i) * 1080; return <circle key={i} cx={x + Math.sin(y / 40 + f / 8) * 30} cy={y + Math.cos(x / 50 + f / 10) * 16} r={2.4} fill="#cfe8ff" />; })}
        </g>
        <path d="M 760 180 L 1160 180 L 1110 920 L 810 920 Z" fill="rgba(180,220,255,.08)" stroke="#cfe8ff" strokeWidth={5} />
      </Svg>
      <Tit t="COMO UM COPO D'ÁGUA" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const OlhoNu: React.FC = () => {
  const f = useCurrentFrame();
  const pisca = Math.abs(Math.sin(f / 18)) < 0.12 ? 0.1 : 1;
  return (
    <Fd c="#101820">
      <Svg>
        <path d="M 560 540 Q 960 200 1360 540 Q 960 880 560 540 Z" fill="#f4f1ea" transform={`translate(0 ${540 * (1 - pisca)}) scale(1 ${pisca})`} />
        <circle cx={960} cy={540} r={150 * pisca} fill="#3a6a9a" /><circle cx={960} cy={540} r={70 * pisca} fill="#000" />
      </Svg>
      <Tit t="A OLHO NU, O CÉU CONTINUA IGUAL" s={70} />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Rua: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#8ac8f0,#d8eefa 60%)'}}>
      <Svg>
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={i * 400 - 40} y={300 + (i % 2) * 80} width={340} height={600} fill={['#c8a888', '#a8b8c8', '#d8c0a0', '#b8a8b8', '#c0c8a8'][i]} />)}
        <rect x={0} y={880} width={1920} height={200} fill="#5a5a60" />
        {[0, 1, 2, 3].map((i) => { const x = (i * 520 + f * (3 + i)) % 2100 - 90; return <g key={i}><circle cx={x} cy={760} r={26} fill="#3a2a20" /><rect x={x - 26} y={790} width={52} height={110} rx={20} fill={['#d0402a', '#2a60d0', '#2aa060', '#e0a020'][i]} /></g>; })}
      </Svg>
      <Tit t="NINGUÉM NA RUA PERCEBE NADA" cor="#111" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 4 · 180 ----------
const Rota: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0e1424">
      <Est sem="rota" n={120} o={0.6} />
      <Svg>
        <circle cx={1300} cy={600} r={24} fill="#ffd860" />
        {[0, 1, 2].map((i) => <path key={i} d={`M -50 ${200 + i * 60} Q 900 ${300 + i * 220} 2000 ${100 + i * 380}`} fill="none" stroke={[VERDE, OURO, VERMELHO][i]} strokeWidth={5} strokeDasharray="18 12" strokeDashoffset={-f * 4} opacity={0.8} />)}
      </Svg>
      <Tit t="POR ONDE ELE VAI PASSAR?" />
      <Etq t="ANIMAÇÃO" />
    </Fd>
  );
};
const Empurrar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#101010">
      <Svg>
        <Bn x={1200} y={560} r={150} />
        <g transform={`translate(${880 + Math.sin(f / 2) * 4} 560)`}><rect x={-120} y={-24} width={160} height={48} rx={20} fill="#e8eef8" /><polygon points="40,-24 90,0 40,24" fill="#e8eef8" />
          <polygon points={`-120,-14 ${-160 - 20 * random('fg' + f)},0 -120,14`} fill={LAR} /></g>
      </Svg>
      <Tit t="NÃO DÁ PRA EMPURRAR" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Artigo: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: '#20262e'}}>
      <div style={{position: 'absolute', left: 560, top: 110, width: 800, height: 900, background: '#fbfaf6', boxShadow: '0 30px 80px rgba(0,0,0,.6)', transform: `scale(${0.85 + 0.15 * s}) rotate(-2deg)`, padding: 60, boxSizing: 'border-box', fontFamily: 'Georgia, serif', color: '#222'}}>
        <div style={{fontSize: 22, letterSpacing: 2, color: '#666'}}>ASTRONOMY & ASTROPHYSICS · 648, L2 · 2021</div>
        <div style={{fontSize: 44, fontWeight: 700, marginTop: 30, lineHeight: 1.2}}>Um buraco negro de 10 massas solares atravessando o Sistema Solar</div>
        <div style={{fontSize: 32, marginTop: 30, color: '#444'}}>V. Pavlík &amp; S. N. Shore</div>
        {Array.from({length: 14}, (_, i) => <div key={i} style={{height: 14, marginTop: 22, width: `${70 + random('ar' + i) * 30}%`, background: '#d8d4ca'}} />)}
      </div>
      <Etq t="ILUSTRAÇÃO · TÍTULO TRADUZIDO" />
    </AbsoluteFill>
  );
};
const Trajetorias: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0c1020">
      <Svg>
        <circle cx={960} cy={560} r={18} fill="#ffd860" />
        {Array.from({length: 40}, (_, i) => { const a = random('ta' + i) * Math.PI, off = (random('tb' + i) - 0.5) * 900; const k = pr(f, i * 1.2, i * 1.2 + 20);
          const x1 = 960 - Math.cos(a) * 1200 - Math.sin(a) * off, y1 = 560 - Math.sin(a) * 1200 + Math.cos(a) * off;
          return <line key={i} x1={x1} y1={y1} x2={x1 + Math.cos(a) * 2400 * k} y2={y1 + Math.sin(a) * 2400 * k} stroke={ROXO} strokeWidth={2} opacity={0.5} />; })}
      </Svg>
      <Tit t="CENTENAS DE SIMULAÇÕES" />
      <Sub y={250} s={40} cor={OURO}>330 POR CASO</Sub>
      <Etq t="ANIMAÇÃO · SIMULAÇÃO" />
    </Fd>
  );
};
const Cenarios: React.FC = () => {
  const f = useCurrentFrame();
  const c1 = pr(f, 0, 16), c2 = pr(f, 205, 225), c3 = pr(f, 378, 398);
  return (
    <Fd c="#0a0e1a">
      <Svg>
        <circle cx={700} cy={560} r={440 * c1} fill="rgba(46,204,113,.12)" stroke={VERDE} strokeWidth={5} />
        <circle cx={700} cy={560} r={260 * c2} fill="rgba(255,210,63,.14)" stroke={OURO} strokeWidth={5} />
        <circle cx={700} cy={560} r={110 * c3} fill="rgba(255,70,70,.2)" stroke={VERMELHO} strokeWidth={5} />
        <circle cx={700} cy={560} r={10} fill="#ffd860" />
      </Svg>
      {[{t: '> ~2.000 UA', s: 'NADA ACONTECE', c: VERDE, o: c1}, {t: '~200 A ~2.000 UA', s: 'O SOL SEGURA OS PLANETAS', c: OURO, o: c2}, {t: '< ~200 UA', s: 'BASTANTE BAGUNÇADO', c: VERMELHO, o: c3}].map((x, i) => (
        <div key={i} style={{position: 'absolute', left: 1220, top: 250 + i * 210, opacity: x.o, fontFamily: FONTE}}><div style={{fontSize: 56, color: x.c}}>{x.t}</div><div style={{fontSize: 36, color: '#fff'}}>{x.s}</div></div>))}
      <Etq t="SIMULAÇÃO · PAVLÍK E SHORE 2021 · FORA DE ESCALA" />
    </Fd>
  );
};
const Passagem20: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 90, Easing.linear);
  return (
    <Fd c="#0e1426">
      <Svg>
        {[1, 5.2, 9.58, 19.2, 30].map((a, i) => <ellipse key={i} cx={760} cy={560} rx={raiz(a, 110)} ry={raiz(a, 110) * 0.35} fill="none" stroke={a === 19.2 ? '#9ad8e0' : '#fff'} strokeOpacity={a === 19.2 ? 0.7 : 0.2} strokeWidth={a === 19.2 ? 4 : 2} />)}
        <circle cx={760} cy={560} r={16} fill="#ffd860" />
        <line x1={760 + raiz(20, 110)} y1={-50} x2={760 + raiz(20, 110)} y2={1130} stroke={LAR} strokeWidth={3} strokeDasharray="14 10" />
        <Bn x={760 + raiz(20, 110)} y={interpolate(k, [0, 1], [0, 1080])} r={20} />
      </Svg>
      <div style={{position: 'absolute', left: 1320, top: 420, fontFamily: FONTE, fontSize: 70, color: LAR}}>~20 UA</div>
      <div style={{position: 'absolute', left: 1320, top: 510, fontFamily: FONTE, fontSize: 38, color: '#fff'}}>PERTO DE URANO</div>
      <Tit t="E O NOSSO?" />
      <Etq t="ANIMAÇÃO · CÁLCULO" />
    </Fd>
  );
};

// ---------- 5 · 90 ----------
const Trio: React.FC = () => {
  const f = useCurrentFrame();
  const ns = [{n: 'NETUNO', c: '#5a7ae8'}, {n: 'URANO', c: '#9ad8e0'}, {n: 'SATURNO', c: '#e8d090'}];
  const i = Math.min(2, Math.floor(f / 30));
  return (
    <AbsoluteFill style={{background: ns[i].c, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 260, color: '#05070c', transform: `scale(${1 + 0.15 * Math.exp(-(f % 30) / 4)})`}}>{ns[i].n}</div>
    </AbsoluteFill>
  );
};
const Deformam: React.FC = () => {
  const f = useCurrentFrame();
  const e = pr(f, 0, 70) * 0.35;
  return (
    <Fd c="#0c1020">
      <Svg>
        {[{a: 9.58, c: '#e8d090'}, {a: 19.2, c: '#9ad8e0'}, {a: 30, c: '#5a7ae8'}].map((p, i) => <ellipse key={i} cx={960 + e * 200 * (i + 1)} cy={560} rx={raiz(p.a, 75) * (1 + e)} ry={raiz(p.a, 75) * 0.6 * (1 - e * 0.5)} fill="none" stroke={p.c} strokeWidth={4}
          transform={`rotate(${e * 30 * (i + 1)} 960 560)`} />)}
        <circle cx={960} cy={560} r={16} fill="#ffd860" />
        <Bn x={1700} y={200 + f * 3} r={22} />
      </Svg>
      <Tit t="AS ÓRBITAS SE DEFORMAM" />
      <Etq t="ANIMAÇÃO · SIMULAÇÃO" />
    </Fd>
  );
};
const Pizza55: React.FC = () => {
  const f = useCurrentFrame();
  const p = pr(f, 4, 40) * 0.55;
  const a = p * Math.PI * 2;
  return (
    <Fd c="#1a0c10">
      <Svg>
        <circle cx={620} cy={560} r={280} fill="#2a3040" />
        <path d={`M 620 560 L 620 280 A 280 280 0 ${p > 0.5 ? 1 : 0} 1 ${620 + Math.sin(a) * 280} ${560 - Math.cos(a) * 280} Z`} fill={VERMELHO} />
      </Svg>
      <div style={{position: 'absolute', left: 1040, top: 300, fontFamily: FONTE, fontSize: 200, color: VERMELHO}}>55%+</div>
      <div style={{position: 'absolute', left: 1040, top: 540, width: 760, fontFamily: FONTE, fontSize: 52, color: '#fff', lineHeight: 1.1}}>DAS SIMULAÇÕES: UM PLANETA ARREMESSADO PRA FORA. PRA SEMPRE.</div>
      <Etq t="SIMULAÇÃO · PASSAGEM A ~21 UA OU MENOS" />
    </Fd>
  );
};
const NoiteNoite: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.floor(f / 12);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {Array.from({length: 6}, (_, i) => <div key={i} style={{position: 'absolute', left: 120 + (i % 3) * 580, top: 160 + Math.floor(i / 3) * 420, width: 520, height: 360, background: '#03050c', border: '3px solid #2a3040', opacity: i <= n ? 1 : 0.15}}>
        <svg width={520} height={360}>{Array.from({length: 30}, (_, j) => <circle key={j} cx={random('nn' + j) * 520} cy={random('nm' + j) * 360} r={1.6} fill="#fff" opacity={0.6} />)}
          <circle cx={120 + i * 55} cy={180 - i * 8 - i * i * 3} r={8} fill="#7aa4ff" /></svg>
        <div style={{position: 'absolute', left: 14, top: 10, fontFamily: 'monospace', fontSize: 24, color: '#9aa4b8'}}>NOITE {i + 1}</div></div>)}
      <Etq t="ILUSTRAÇÃO · NETUNO NOITE APÓS NOITE" />
    </AbsoluteFill>
  );
};
const CurvaAberta: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 80, Easing.linear);
  const pts = Array.from({length: 120}, (_, i) => { const t = (i / 119) * 4 - 2; return `${960 + Math.sinh(t) * 260},${560 - Math.cosh(t) * 120 + 300}`; }).slice(0, Math.max(2, Math.round(120 * k))).join(' ');
  return (
    <Fd c="#081428">
      <Svg><polyline points={pts} fill="none" stroke="#5a7ae8" strokeWidth={6} /><circle cx={960} cy={560} r={14} fill="#ffd860" /></Svg>
      <Tit t="UMA CURVA QUE NUNCA MAIS SE FECHA" s={70} />
      <Etq t="ANIMAÇÃO" />
    </Fd>
  );
};
const NetunoEmbora: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 140, Easing.in(Easing.quad));
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Est sem="emb" n={180} o={0.7} />
      <Svg><Esf x={interpolate(k, [0, 1], [700, 1500])} y={interpolate(k, [0, 1], [560, 420])} r={interpolate(k, [0, 1], [260, 6])} c="#7aa4ff" c2="#0a1440" id="ne" /></Svg>
      <Tit t="UM PLANETA ERRANTE" />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 6 · 30 ----------
const TerraPerg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0a1830">
      <Svg><Esf x={760} y={560} r={260} c="#4a9ae8" c2="#082040" id="tp" />
        <path d="M 640 470 q 60 -80 140 -20 q 40 60 -40 110 q -60 40 -100 -90 z" fill="#3aa860" opacity={0.85} /></Svg>
      <div style={{position: 'absolute', left: 1150, top: 260, fontFamily: FONTE, fontSize: 420, color: OURO, transform: `rotate(${Math.sin(f / 8) * 8}deg)`}}>?</div>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Distancias: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0e1420">
      <Svg>
        <circle cx={200} cy={560} r={70} fill="#ffd860" />
        <circle cx={200 + 70 * pr(f, 0, 14)} cy={560} r={14} fill="#4a9ae8" />
        <line x1={200} x2={1700} y1={660} y2={660} stroke="#fff" strokeOpacity={0.3} strokeWidth={3} />
        <text x={235} y={720} fontFamily={FONTE} fontSize={30} fill="#4a9ae8">1 UA</text>
        <Bn x={200 + 1400 * pr(f, 6, 30)} y={560} r={40} />
        <text x={1600} y={720} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill={LAR}>~20 UA</text>
      </Svg>
      <Tit t="A TERRA ESTÁ BEM MAIS PERTO DO SOL" s={70} />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </Fd>
  );
};
const Atracao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#141418">
      {[{l: 'ATRAÇÃO DO SOL', p: 1, c: '#ffd860', v: '100%'}, {l: 'ATRAÇÃO DO BURACO NEGRO', p: 0.025, c: LAR, v: '~2,5%'}].map((b, i) => (
        <React.Fragment key={i}>
          <div style={{position: 'absolute', left: 260, top: 330 + i * 260, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>{b.l}</div>
          <div style={{position: 'absolute', left: 260, top: 400 + i * 260, width: 1200 * b.p * pr(f, 4, 30), minWidth: 12, height: 90, borderRadius: 16, background: b.c}} />
          <div style={{position: 'absolute', left: 260 + Math.max(1200 * b.p, 12) + 40, top: 410 + i * 260, fontFamily: FONTE, fontSize: 64, color: b.c}}>{b.v}</div>
        </React.Fragment>))}
      <Etq t="CÁLCULO · NA TERRA, NO DIA 0" />
    </Fd>
  );
};
const ReguaLog: React.FC = () => {
  const f = useCurrentFrame();
  const x = (km: number) => 200 + (Math.log10(km) - 5) / 5 * 1520;
  return (
    <Fd c="#101820">
      <Svg>
        <line x1={200} x2={1720} y1={600} y2={600} stroke="#fff" strokeOpacity={0.5} strokeWidth={4} />
        {[1e5, 1e6, 1e7, 1e8, 1e9, 1e10].map((v, i) => <g key={i}><line x1={x(v)} x2={x(v)} y1={585} y2={615} stroke="#fff" strokeWidth={3} /></g>)}
        <circle cx={x(1.2e6)} cy={600} r={22 * pr(f, 4, 12)} fill={VERMELHO} />
        <circle cx={x(3e9)} cy={600} r={22 * pr(f, 20, 28)} fill={VERDE} />
        <text x={x(1.2e6)} y={540} textAnchor="middle" fontFamily={FONTE} fontSize={36} fill={VERMELHO} opacity={pr(f, 4, 12)}>PRA ARRANCAR A TERRA: ~1,2 MILHÃO DE KM</text>
        <text x={x(3e9) - 40} y={690} textAnchor="end" fontFamily={FONTE} fontSize={36} fill={VERDE} opacity={pr(f, 20, 28)}>ELE PASSA A ~3 BILHÕES DE KM</text>
      </Svg>
      <Etq t="ESCALA LOG · CÁLCULO" />
    </Fd>
  );
};

// ---------- 7 · dia 0 ----------
const PontoVazio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#02030a,#0a1028 70%,#121a30)'}}>
      <Est sem="pv" n={240} />
      <Svg><circle cx={1100} cy={420} r={110} fill="#000" /><circle cx={1100} cy={420} r={110 + 8 * Math.sin(f / 5)} fill="none" stroke={OURO} strokeWidth={6} strokeDasharray="20 14" /></Svg>
      <Tit t="NEM UM BRILHO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const ZoomInvisivel: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 120], [1, 30], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${z})`, transformOrigin: '960px 560px'}}><Est sem="zi" n={200} /></div>
      <Svg><rect x={960 - 220 / Math.sqrt(z)} y={560 - 140 / Math.sqrt(z)} width={440 / Math.sqrt(z)} height={280 / Math.sqrt(z)} fill="none" stroke={OURO} strokeWidth={3} /></Svg>
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center', fontFamily: 'monospace', fontSize: 44, color: OURO}}>ZOOM ×{Math.round(z * 1000).toLocaleString('pt-BR')}</div>
      <Tit t="30 KM, A BILHÕES DE KM: INVISÍVEL" s={66} />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Quintal: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#040814,#0c1830)'}}>
      <Svg>
        <rect x={0} y={860} width={1920} height={220} fill="#0a1a0e" />
        {Array.from({length: 40}, (_, i) => <rect key={i} x={i * 50} y={820} width={10} height={60} fill="#3a2a1a" />)}
        <rect x={0} y={830} width={1920} height={10} fill="#3a2a1a" />
        {[120, 220, 320].map((r, i) => <ellipse key={i} cx={960} cy={420} rx={r * 2} ry={r * 0.6} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />)}
        <circle cx={960} cy={420} r={18} fill="#ffd860" />
        <Bn x={200 + f * 8} y={260} r={16} />
      </Svg>
      <Tit t="NO SEU QUINTAL CÓSMICO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 8 · depois ----------
const VaiEmbora: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 100], [900, 2100]);
  return (
    <Fd c="#0c0e1a">
      <Est sem="ve" n={120} o={0.6} />
      <Svg>
        <path d={`M 0 900 Q 500 500 ${x} 300`} fill="none" stroke={LAR} strokeWidth={4} strokeDasharray="14 10" opacity={0.6} />
        <Bn x={x} y={300} r={28} />
        {[1, 2, 3].map((i) => <circle key={i} cx={500} cy={700} r={i * 90} fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={2} />)}
        <circle cx={500} cy={700} r={16} fill="#ffd860" />
      </Svg>
      <Tit t="ELE VAI EMBORA" />
      <Etq t="ANIMAÇÃO" />
    </Fd>
  );
};
const AntesDepois: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 10, 50);
  const Lado: React.FC<{x: number; e: number; t: string; c: string}> = ({x, e, t, c}) => (
    <g>{[1, 2, 3].map((i) => <ellipse key={i} cx={x + e * 60 * i} cy={600} rx={i * 110 * (1 + e)} ry={i * 70 * (1 - e * 0.4)} fill="none" stroke={c} strokeWidth={3} transform={`rotate(${e * 25 * i} ${x} 600)`} />)}
      <circle cx={x} cy={600} r={12} fill="#ffd860" /><text x={x} y={220} textAnchor="middle" fontFamily={FONTE} fontSize={48} fill={c}>{t}</text></g>
  );
  return (
    <Fd c="#0e1018">
      <Svg><Lado x={500} e={0} t="ANTES" c="#9aa4b8" /><Lado x={1420} e={0.3 * k} t="DEPOIS" c={LAR} /><line x1={960} x2={960} y1={160} y2={1000} stroke="#fff" strokeOpacity={0.2} strokeWidth={3} /></Svg>
      <Etq t="ANIMAÇÃO · NUNCA MAIS NO MESMO LUGAR" />
    </Fd>
  );
};
const OrbitaOval: React.FC = () => {
  const f = useCurrentFrame();
  const e = pr(f, 0, 50) * 0.18;
  const a = f * 0.05;
  return (
    <Fd c="#0a1626">
      <Svg>
        <ellipse cx={960} cy={560} rx={420} ry={420} fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={3} strokeDasharray="10 10" />
        <ellipse cx={960 + 420 * e} cy={560} rx={420} ry={420 * Math.sqrt(1 - e * e * 4)} fill="none" stroke="#4a9ae8" strokeWidth={5} />
        <circle cx={960} cy={560} r={40} fill="#ffd860" />
        <circle cx={960 + 420 * e + Math.cos(a) * 420} cy={560 + Math.sin(a) * 420 * Math.sqrt(1 - e * e * 4)} r={18} fill="#4a9ae8" />
      </Svg>
      <div style={{position: 'absolute', left: 1440, top: 520, fontFamily: FONTE, fontSize: 34, color: '#cfe0ff', opacity: pr(f, 30, 40)}}>MAIS LONGE</div>
      <div style={{position: 'absolute', left: 380, top: 520, fontFamily: FONTE, fontSize: 34, color: '#ffd860', opacity: pr(f, 30, 40)}}>MAIS PERTO</div>
      <Tit t="TALVEZ UM POUCO MAIS ESTICADA" />
      <Etq t="ANIMAÇÃO · ESTIMATIVA · EXAGERADO" />
    </Fd>
  );
};
const NovoMapa: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0b2a4a'}}>
      <Svg>
        {Array.from({length: 49}, (_, i) => <line key={'g' + i} x1={i * 40} x2={i * 40} y1={0} y2={1080} stroke="#fff" strokeOpacity={0.06} />)}
        {Array.from({length: 28}, (_, i) => <line key={'h' + i} x1={0} x2={1920} y1={i * 40} y2={i * 40} stroke="#fff" strokeOpacity={0.06} />)}
        {PL.map((p, i) => <circle key={p.n} cx={960} cy={560} r={raiz(p.a, 85)} fill="none" stroke="#e8f4ff" strokeWidth={2} strokeDasharray={`${pr(f, i * 8, i * 8 + 30) * 3000} 3000`} />)}
      </Svg>
      <Tit t="O NOVO MAPA DO SISTEMA SOLAR" />
      <Sub y={860} s={44} cor={OURO}>PEQUENO. MAS PRA SEMPRE.</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 9 · mas espera ----------
const Trilhao: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(10, {damping: 12, mass: 0.7});
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #10301c, ${NOITE} 70%)`}}>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 220, color: VERDE, transform: `scale(${0.8 + 0.2 * s})`}}>10¹² ANOS</div>
      <Sub y={560} s={52}>1 PASSAGEM ASSIM A CADA ~1 TRILHÃO DE ANOS</Sub>
      <Etq t="CÁLCULO" />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [0, 8], [0.8, 0], clamp)}} />
    </AbsoluteFill>
  );
};
const IdadeUniverso: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#101a14">
      <div style={{position: 'absolute', left: 200, top: 420, width: 1520, height: 70, borderRadius: 35, background: 'rgba(255,255,255,.1)'}} />
      <div style={{position: 'absolute', left: 200, top: 420, width: 1520 * pr(f, 4, 40), height: 70, borderRadius: 35, background: VERDE, opacity: 0.6}} />
      <div style={{position: 'absolute', left: 200, top: 420, width: 1520 * 0.0138 * 1 + 8, height: 70, borderRadius: 35, background: OURO}} />
      <div style={{position: 'absolute', left: 200, top: 520, fontFamily: FONTE, fontSize: 40, color: OURO}}>IDADE DO UNIVERSO: ~14 BILHÕES</div>
      <div style={{position: 'absolute', right: 200, top: 330, fontFamily: FONTE, fontSize: 40, color: VERDE}}>~1 TRILHÃO</div>
      <Etq t="ESCALA" />
    </Fd>
  );
};
const Radar: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * 0.08;
  return (
    <AbsoluteFill style={{background: '#021208'}}>
      <Svg>
        {[1, 2, 3, 4].map((i) => <circle key={i} cx={960} cy={560} r={i * 110} fill="none" stroke="#2aff7a" strokeOpacity={0.3} strokeWidth={2} />)}
        <line x1={960} y1={560} x2={960 + Math.cos(a) * 440} y2={560 + Math.sin(a) * 440} stroke="#2aff7a" strokeWidth={4} />
        <circle cx={1260} cy={380} r={12} fill="#2aff7a" opacity={0.4 + 0.6 * Math.max(0, Math.cos(a - Math.atan2(-180, 300)))} />
      </Svg>
      <Tit t="SINAIS DÉCADAS ANTES" cor="#2aff7a" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const NaoTem: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a140e', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 300, color: '#5a6a60'}}>365</div>
      <Svg><line x1={560} y1={760} x2={560 + 800 * pr(f, 6, 16)} y2={760 - 460 * pr(f, 6, 16)} stroke={VERMELHO} strokeWidth={26} strokeLinecap="round" /></Svg>
      <div style={{position: 'absolute', top: 780, fontFamily: FONTE, fontSize: 72, color: VERDE}}>VOCÊ NÃO TEM UM ANO</div>
    </AbsoluteFill>
  );
};

// ---------- plano ----------
const PLANO: [string, React.FC][][] = [
  [
    ['hoje de manha os', Telejornal],
    ['um buraco negro esta vindo', () => <F src="bn_jato.jpg" etq="ILUSTRAÇÃO · BURACO NEGRO · NASA/JPL-CALTECH" t="UM BURACO NEGRO ESTÁ VINDO" z={[1.15, 1.0]} />],
    ['e voce tem um ano', Contador365],
    ['ele nao vai bater', PassaReto],
    ['mas um buraco negro com dez', DezSois],
    ['esta historia e imaginaria', CarimboES],
    ['e de um estudo que simulou', () => <F src="tour.jpg" etq="IMAGEM REAL · MONTAGEM DOS PLANETAS · NASA/JPL (VOYAGER)" t="UM ESTUDO SIMULOU ISSO" />],
  ],
  [
    ['faltam trezentos e sessenta', () => <Grande t="365 DIAS" sub="E CONTANDO" cor={OURO} />],
    ['o buraco negro ja esta', MapaSS],
    ['a uns tres bilhoes', () => <F src="urano.jpg" etq="IMAGEM REAL · URANO · NASA/JPL (VOYAGER 2)" t="~3 BILHÕES DE KM DO SOL" z={[1.0, 1.15]} />],
    ['e vem a cinquenta', Velocimetro],
    ['nessa velocidade em um ano', ReguaUA],
    ['os jornais nao falam', Manchetes],
    ['na escola no trabalho', Chat],
    ['voce olha pro ceu', CeuNoite],
    ['ele nao brilha', TresNao],
    ['o horizonte dele a borda', () => <F src="eso1907a.jpg" etq="IMAGEM REAL · M87*, OUTRO BURACO NEGRO, GIGANTE · EHT COLLABORATION" t="A BORDA DE ONDE NADA ESCAPA" z={[1.0, 1.2]} />],
    ['do tamanho de uma cidade', CirculoCidade],
    ['mas pesa dez sois', DezEmUm],
  ],
  [
    ['faltam trezentos dias', Folhas],
    ['voce deve estar se', Interrogacao],
    ['na vida real ninguem', Ampulheta],
    ['a gravidade dele teria tirado', () => <F src="netuno.jpg" etq="IMAGEM REAL · NETUNO · NASA/JPL (VOYAGER 2)" t="NETUNO FORA DO LUGAR" z={[1.0, 1.2]} />],
    ['os astronomos veriam', Desvio],
    ['e passariam anos medindo', Calculos],
    ['foi assim alias', () => <F src="leverrier.jpg" etq="GRAVURA · LE VERRIER · BILDER-MAGAZIN, 1846 · RIJKSMUSEUM" t="1846: ACHARAM NETUNO" pos="50% 40%" z={[1.0, 1.15]} />],
    ['por causa de um puxao', PuxaoUrano],
    ['entao o um ano desta', Claquete],
    ['o aviso de verdade', Decadas],
  ],
  [
    ['faltam duzentos e quarenta', () => <F src="potw1038a.jpg" etq="IMAGEM REAL · TELESCÓPIO NO PARANAL · ESO" t="OS GRANDES TELESCÓPIOS VEEM ALGO" />],
    ['nao o buraco negro', () => <Glitch t={'NÃO O BURACO NEGRO.\nO QUE ELE FAZ COM A LUZ.'} s={100} />],
    ['as estrelas que estao atras', LenteAnim],
    ['a gravidade dele dobra', () => <F src="lente.jpg" etq="IMAGEM REAL · LENTE GRAVITACIONAL · NASA/ESA (HUBBLE)" t="A GRAVIDADE DOBRA A LUZ" z={[1.0, 1.25]} />],
    ['mas dessa distancia o desvio', Angulo],
    ['so um telescopio ve', () => <F src="hubble.jpg" etq="IMAGEM REAL · HUBBLE EM ÓRBITA · NASA" t="SÓ UM TELESCÓPIO VÊ" />],
    ['no noticiario aparecem', CopoDagua],
    ['a olho nu o ceu', OlhoNu],
    ['voce vai trabalhar ninguem', Rua],
  ],
  [
    ['faltam cento e oitenta', Rota],
    ['os governos fazem reunioes', () => <F src="controle.jpg" etq="IMAGEM REAL · SALA DE CONTROLE · NASA" t="REUNIÕES" sub="MAS NINGUÉM PODE FAZER NADA" />],
    ['nao da pra empurrar', Empurrar],
    ['em 2021 dois cientistas', Artigo],
    ['um buraco negro de dez sois cruzando', Trajetorias],
    ['se ele passar a mais', Cenarios],
    ['e o nosso', Passagem20],
  ],
  [
    ['faltam noventa dias', () => <F src="saturno.jpg" etq="IMAGEM REAL · SATURNO · NASA/JPL-CALTECH/SSI (CASSINI)" t="OS PLANETAS DE FORA SENTEM" />],
    ['netuno urano', Trio],
    ['as orbitas deles comecam', Deformam],
    ['nas simulacoes quando', Pizza55],
    ['os telescopios acompanham', NoiteNoite],
    ['a orbita dele vai virando', CurvaAberta],
    ['imagina perder netuno', NetunoEmbora],
  ],
  [
    ['faltam trinta dias', TerraPerg],
    ['aqui vem a surpresa', Distancias],
    ['aqui a atracao dele', Atracao],
    ['pra arrancar a terra', ReguaLog],
    ['entao na sua rua', () => <F src="nascer.jpg" etq="IMAGEM REAL · NASCER DO SOL VISTO DA ISS · NASA" t="NA SUA RUA, NADA ACONTECE" />],
    ['as mares seguem', () => <F src="praia.jpg" etq="IMAGEM REAL · PRAIA NO KSC · NASA" t="AS MARÉS SEGUEM" />],
    ['aos poucos as pessoas', () => <F src="cupula.jpg" etq="IMAGEM REAL · CÚPULA DA ISS · NASA" t="O PERIGO ESTÁ MUITO LONGE" />],
  ],
  [
    ['dia zero', () => <F src="multidao.jpg" etq="IMAGEM REAL · MULTIDÃO OLHANDO O CÉU · NASA" t="DIA 0" sub="GENTE NAS PRAÇAS, OLHANDO PRA CIMA" />],
    ['voce olha pro ponto', PontoVazio],
    ['o horizonte de eventos de trinta', ZoomInvisivel],
    ['um dos objetos mais extremos', Quintal],
    ['e ninguem na terra', () => <F src="cidade.jpg" etq="IMAGEM REAL · CIDADES À NOITE VISTAS DA ISS · NASA" t="NINGUÉM NA TERRA CONSEGUE VER" />],
  ],
  [
    ['e depois', VaiEmbora],
    ['mas deixa um rastro', AntesDepois],
    ['e a orbita da terra', OrbitaOval],
    ['nos anos seguintes', NovoMapa],
  ],
  [
    ['mas espera', Trilhao],
    ['o universo inteiro tem', IdadeUniverso],
    ['e o buraco negro mais perto', () => <F src="gaiabh1.jpg" etq="ILUSTRAÇÃO · GAIA BH1 · NOIRLAB/NSF/AURA/J. DA SILVA" t="GAIA BH1: ~1.560 ANOS-LUZ" pos="88% 50%" />],
    ['e se um dia acontecesse', Radar],
    ['entao nao', NaoTem],
    ['mas se um dia tiver', () => <F src="terra.jpg" etq="IMAGEM REAL · TERRA · NASA" t="A TERRA PROVAVELMENTE AGUENTARIA" z={[1.0, 1.15]} />],
  ],
];

const Fim: React.FC = () => {
  const s = useSpring(4);
  return <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}><div style={{fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div></AbsoluteFill>;
};

const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'bnano/narracao_cap.mp3', musica: 'bnano/musica.mp3', volta: 9, fim: Fim,
  selos: [
    {texto: 'E SE', de: 'hoje de manha os', ate: 'mas espera', linha: 0, cor: ROSA},
    {texto: 'SIMULAÇÃO', de: 'em 2021 dois cientistas', ate: 'os telescopios acompanham', linha: 1, cor: ROXO},
  ],
  hits: [{frase: 'e voce tem um ano', off: 2, vol: 0.5}, {frase: 'nas simulacoes quando', off: 4}, {frase: 'entao na sua rua', off: 2}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb: Saturno em silhueta, buraco negro entortando as estrelas e um contador vermelho
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <Img src={img('saturno.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%', transform: 'scale(1.5)', filter: 'brightness(1.2)'}} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <circle cx={1480} cy={380} r={250} fill="none" stroke="#ffb070" strokeWidth={10} opacity={0.5} style={{filter: 'blur(6px)'}} />
      <circle cx={1480} cy={380} r={190} fill="none" stroke="#fff" strokeWidth={6} opacity={0.8} />
      <circle cx={1480} cy={380} r={150} fill="#000" />
    </svg>
    <div style={{position: 'absolute', left: 60, top: 60, padding: '10px 30px', background: VERMELHO, borderRadius: 16, fontFamily: FONTE, fontSize: 120, color: '#fff', border: '6px solid #000'}}>365 DIAS</div>
    <div style={{position: 'absolute', left: 60, bottom: 60, fontFamily: FONTE, fontSize: 170, color: OURO, lineHeight: 0.95, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill'}}>VOCÊ TEM<br />1 ANO</div>
    <div style={{position: 'absolute', right: 60, bottom: 70, padding: '8px 24px', border: `6px solid ${ROSA}`, borderRadius: 14, fontFamily: FONTE, fontSize: 60, color: ROSA, background: 'rgba(0,0,0,.6)'}}>E SE</div>
  </AbsoluteFill>
);
