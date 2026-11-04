// Longo POV B "Uma ESTRELA EXPLODIU do lado da Terra!" (1920x1080). Lote Linha dos campeões, roteiro longo_supernova_perto.md (v1), aprovado pelo dono em 04/11.
// Voz Brian (ElevenLabs, --vel 1.1 --pausa 0.45) com capítulos de 2,2 s. Física: Gehrels et al. 2003, Brunton et al. 2023, Thomas e Yelland 2023, Fields et al. 2020 + contas da Pesquisas.
// Regra do dono: NENHUMA cena se repete (cada foto uma vez, cada desenho animado próprio). Tela dividida "FONTES DIVERGEM" no ozônio; Devoniano como HIPÓTESE.
// Reais: NASA/ESA (SN 1987A), NASA (Lua, Sol/SDO, limbo da Terra, buraco de ozônio de 2009, névoa sobre a China, plâncton, satélite de clima, sala de controle, STS-135),
// NASA/CXC/JPL (Cassiopeia A, Tycho), ESO/M. Montargès et al. (Betelgeuse em março de 2020, eso2109c).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, useSpring} from '../comum';
import {NOITE, Etq, Tit, Sub, Glitch, Grande, criarLongo, Cap} from '../longo';
import palavras from './snperto.palavras.json';

const W = palavras as Palavra[];
const ROSA = '#ff6fae';
const ROXO = '#b388ff';
const UV = '#c77dff';

const CAPS: Cap[] = [
  {canto: 'E SE · A 30 ANOS-LUZ', sat: 1},
  {canto: 'E SE · HORA −3', sat: 0.9, titulo: 'HORA −3', sub: 'O AVISO INVISÍVEL'},
  {canto: 'E SE · HORA 0', sat: 0.8, titulo: 'HORA 0', sub: 'UMA NOVA ESTRELA'},
  {canto: 'E SE · DIA 1–30', sat: 0.7, titulo: 'DIA 1 A 30', sub: 'NÃO ESQUENTA NADA'},
  {canto: 'E SE · SEMANAS', sat: 0.6, titulo: 'SEMANAS', sub: 'A PARTE INVISÍVEL'},
  {canto: 'E SE · MESES', sat: 0.5, titulo: 'MESES', sub: 'O CÉU MUDA'},
  {canto: 'E SE · ANOS', sat: 0.4, titulo: 'ANOS 2 A 100', sub: 'O OZÔNIO VOLTA?'},
  {canto: 'E SE · SÉCULOS', sat: 0.3, titulo: 'SÉCULOS', sub: 'A TERCEIRA ONDA'},
  {canto: 'E SE · ~900 ANOS', sat: 0.25, titulo: '~900 ANOS', sub: 'O QUE SOBROU DA ESTRELA'},
  {canto: 'MAS ESPERA…', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const img = (s: string) => staticFile('snperto/' + s);
const pr = (f: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...clamp, easing: e});
const Fd: React.FC<{c?: string; children?: React.ReactNode}> = ({c = '#141a30', children}) => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${c}, ${NOITE} 75%)`}}>{children}</AbsoluteFill>;
const Svg: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>{children}</svg>;
const Est: React.FC<{n?: number; sem: string; o?: number}> = ({n = 160, sem, o = 1}) => (
  <Svg>{Array.from({length: n}, (_, i) => <circle key={i} cx={random(sem + 'x' + i) * 1920} cy={random(sem + 'y' + i) * 1080} r={0.8 + random(sem + 'r' + i) * 2.2} fill="#fff" opacity={o * (0.3 + 0.7 * random(sem + 'o' + i))} />)}</Svg>
);
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
const Brilho: React.FC<{x: number; y: number; r: number; o?: number}> = ({x, y, r, o = 1}) => (
  <g opacity={o}><circle cx={x} cy={y} r={r * 3} fill="#fff6e0" opacity={0.15} style={{filter: 'blur(30px)'}} /><circle cx={x} cy={y} r={r} fill="#fff" style={{filter: 'blur(4px)'}} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={x - r * 4} x2={x + r * 4} y1={y} y2={y} stroke="#fff" strokeWidth={3} opacity={0.6} transform={`rotate(${i * 45} ${x} ${y})`} />)}</g>
);
const Cidade: React.FC<{y?: number; cor?: string}> = ({y = 860, cor = '#05070c'}) => (
  <path d={`M0 ${y} ${Array.from({length: 24}, (_, i) => { const h = 60 + random('cd' + i) * 200; return `L${i * 80} ${y - h} L${i * 80 + 80} ${y - h}`; }).join(' ')} L1920 ${y} L1920 1080 L0 1080 Z`} fill={cor} />
);

// ---------- 0 · gancho ----------
const AlertaTela: React.FC = () => {
  const f = useCurrentFrame();
  const on = Math.floor(f / 8) % 2 === 0;
  return (
    <AbsoluteFill style={{background: '#06080c'}}>
      <div style={{position: 'absolute', left: 260, top: 130, width: 1400, height: 760, borderRadius: 20, background: on ? '#2a0808' : '#140404', border: `8px solid ${VERMELHO}`}}>
        <div style={{position: 'absolute', left: 60, top: 50, fontFamily: 'monospace', fontSize: 44, color: '#ff8a8a'}}>DETECTOR DE NEUTRINOS · {String(Math.floor(f * 37) % 100000).padStart(5, '0')} EVENTOS</div>
        <svg width={1400} height={500} style={{position: 'absolute', top: 160}}><polyline points={Array.from({length: 120}, (_, i) => `${i * 11.6},${400 - (i > 60 ? 320 * Math.exp(-(((i - 66) / 6) ** 2)) : 0) - random('al' + i) * 20}`).join(' ')} fill="none" stroke={VERMELHO} strokeWidth={6} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 50, textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#fff'}}>ALERTA: SUPERNOVA</div>
      </div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const GiganteApaga: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 20, 60, Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{background: '#050208'}}>
      <Est sem="ga" n={120} o={0.6} />
      <Svg>
        <circle cx={960} cy={540} r={interpolate(k, [0, 1], [320, 20])} fill="#ff5a2a" style={{filter: 'drop-shadow(0 0 60px #ff3a10)'}} />
        {k > 0.95 && <circle cx={960} cy={540} r={(f - 58) * 40} fill="#fff" opacity={Math.max(0, 1 - (f - 58) / 12)} />}
      </Svg>
      <Tit t="A ~30 ANOS-LUZ DAQUI" />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const FrenteLuz: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 60], [-200, 1500]);
  return (
    <AbsoluteFill style={{background: '#03040a'}}>
      <Est sem="fl" n={160} />
      <Svg>
        <defs><linearGradient id="fl" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity={0} /><stop offset="1" stopColor="#fff" stopOpacity={0.9} /></linearGradient></defs>
        <rect x={x - 400} y={0} width={400} height={1080} fill="url(#fl)" />
        <circle cx={1700} cy={560} r={30} fill="#4a9ae8" />
        <text x={1700} y={640} textAnchor="middle" fontFamily={FONTE} fontSize={34} fill="#cfe0ff">TERRA</text>
      </Svg>
      <Tit t="A LUZ AINDA ESTÁ A CAMINHO" />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const CarimboES: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [6, 16], [2.4, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1e1420, #050408 70%)'}}>
      <div style={{position: 'absolute', top: 220, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: '#cfd2da'}}>NÃO EXISTE NENHUMA ESTRELA ASSIM TÃO PERTO</div>
      <div style={{position: 'absolute', left: 660, top: 420, padding: '20px 70px', border: `14px solid ${ROSA}`, borderRadius: 24, fontFamily: FONTE, fontSize: 200, color: ROSA, transform: `rotate(-8deg) scale(${s})`, opacity: f > 6 ? 1 : 0}}>E SE</div>
    </AbsoluteFill>
  );
};
const HoraAHora: React.FC = () => {
  const f = useCurrentFrame();
  const h = Math.floor(f / 6) % 24;
  return (
    <Fd c="#101a26">
      <Svg>
        <circle cx={960} cy={560} r={300} fill="#0c141c" stroke="#fff" strokeWidth={12} />
        {Array.from({length: 24}, (_, i) => <line key={i} x1={960 + Math.sin(i * Math.PI / 12) * 260} y1={560 - Math.cos(i * Math.PI / 12) * 260} x2={960 + Math.sin(i * Math.PI / 12) * 290} y2={560 - Math.cos(i * Math.PI / 12) * 290} stroke={i === h ? OURO : '#fff'} strokeWidth={i === h ? 14 : 6} />)}
        <line x1={960} y1={560} x2={960 + Math.sin(h * Math.PI / 12) * 240} y2={560 - Math.cos(h * Math.PI / 12) * 240} stroke={OURO} strokeWidth={14} strokeLinecap="round" />
      </Svg>
      <Tit t="A CIÊNCIA JÁ CALCULOU, HORA A HORA" s={70} />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};

// ---------- 1 · hora −3 ----------
const Colapso: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 40, Easing.in(Easing.quad));
  return (
    <AbsoluteFill style={{background: '#080408'}}>
      <Svg>
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={960} cy={560} r={interpolate(k, [0, 1], [420 - i * 90, 40 - i * 8])} fill="none" stroke={['#ff5a2a', '#ff8a3a', '#ffc860', '#fff'][i]} strokeWidth={14} />)}
        {f > 40 && Array.from({length: 80}, (_, i) => { const a = random('cp' + i) * Math.PI * 2, r = (f - 40) * (20 + random('cv' + i) * 30); return <line key={i} x1={960 + Math.cos(a) * r} y1={560 + Math.sin(a) * r} x2={960 + Math.cos(a) * (r + 40)} y2={560 + Math.sin(a) * (r + 40)} stroke={ROXO} strokeWidth={3} />; })}
      </Svg>
      <Tit t="O CENTRO DA ESTRELA DESABA" />
      <Sub y={900} s={42} cor={ROXO}>E DISPARA NEUTRINOS</Sub>
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Atravessa: React.FC = () => {
  const f = useCurrentFrame();
  const ls = ['TUDO', 'PLANETAS', 'PESSOAS', 'VOCÊ'];
  const i = Math.min(3, Math.floor(f / 46 * 1.1));
  return (
    <Fd c="#120a24">
      <Svg>
        <circle cx={960} cy={560} r={260} fill="#2a5aa8" />
        {Array.from({length: 60}, (_, j) => { const y = 200 + random('ay' + j) * 700, x = ((random('ax' + j) * 2200 + f * (30 + random('aw' + j) * 30)) % 2200) - 140; return <line key={j} x1={x} y1={y} x2={x - 80} y2={y} stroke={ROXO} strokeWidth={3} opacity={0.8} />; })}
      </Svg>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: '#fff', textShadow: '0 6px 30px #000'}}>{ls[i]}</div>
      <Tit t="ELES ATRAVESSAM" />
      <Etq t="ANIMAÇÃO · NEUTRINOS" />
    </Fd>
  );
};
const Corrida: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#101418">
      <Svg>
        <line x1={160} x2={1760} y1={420} y2={420} stroke="#fff" strokeOpacity={0.3} strokeWidth={4} strokeDasharray="20 14" />
        <line x1={160} x2={1760} y1={700} y2={700} stroke="#fff" strokeOpacity={0.3} strokeWidth={4} strokeDasharray="20 14" />
        <circle cx={160 + pr(f, 0, 40) * 1500} cy={420} r={34} fill={ROXO} />
        <circle cx={160 + pr(f, 10, 60) * 1100} cy={700} r={34} fill="#fff6d8" />
        <text x={160} y={370} fontFamily={FONTE} fontSize={40} fill={ROXO}>NEUTRINOS</text>
        <text x={160} y={650} fontFamily={FONTE} fontSize={40} fill="#fff6d8">LUZ</text>
      </Svg>
      <Tit t="SAEM ANTES DA LUZ" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const TresHoras: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#141020">
      <div style={{position: 'absolute', left: 200, top: 520, width: 1520 * pr(f, 4, 40), height: 12, background: '#fff', borderRadius: 6}} />
      {[{x: 200, t: '0 H', s: 'NEUTRINOS', c: ROXO, d: 4}, {x: 1720, t: '~3 H', s: 'CLARÃO', c: OURO, d: 36}].map((m) => (
        <div key={m.t} style={{position: 'absolute', left: m.x - 150, top: 380, width: 300, textAlign: 'center', opacity: pr(f, m.d, m.d + 8), fontFamily: FONTE}}>
          <div style={{fontSize: 70, color: m.c}}>{m.t}</div><div style={{width: 50, height: 50, margin: '30px auto', borderRadius: 25, background: m.c}} /><div style={{fontSize: 40, color: '#fff'}}>{m.s}</div></div>))}
      <Tit t="SN 1987A: ~3 HORAS ANTES" />
      <Etq t="LINHA DO TEMPO" />
    </Fd>
  );
};
const Feed: React.FC = () => {
  const f = useCurrentFrame();
  const ps = ['alguém sabe o que é esse alerta?', 'detectaram alguma coisa no Japão??', 'NEUTRINOS?? o que é isso', 'olhem pro céu daqui a pouco'];
  return (
    <AbsoluteFill style={{background: '#0c0f14'}}>
      {ps.map((p, i) => { const s = pr(f, i * 14, i * 14 + 8); return <div key={i} style={{position: 'absolute', left: 520, top: 120 + i * 220, width: 880, padding: '30px 40px', borderRadius: 24, background: '#1a2030', opacity: s, transform: `translateY(${(1 - s) * 40}px)`,
        fontFamily: FONTE, color: '#fff', fontSize: 40}}><span style={{color: CIANO, fontSize: 28}}>@usuario{i + 1} · agora</span><br />{p}</div>; })}
      <Etq t="ILUSTRAÇÃO · POSTS FICTÍCIOS" />
    </AbsoluteFill>
  );
};
const Duvida: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#1e1608">
      {Array.from({length: 9}, (_, i) => <div key={i} style={{position: 'absolute', left: 120 + (i % 3) * 600 + random('dq' + i) * 200, top: 80 + Math.floor(i / 3) * 320, fontFamily: FONTE, fontSize: 160 + random('ds' + i) * 120, color: OURO,
        opacity: pr(f, i * 3, i * 3 + 6) * 0.8, transform: `rotate(${(random('dr' + i) - 0.5) * 40 + Math.sin(f / 8 + i) * 6}deg)`}}>?</div>)}
      <Tit t="NINGUÉM ENTENDE DIREITO" />
    </Fd>
  );
};
const Tanque: React.FC = () => {
  const f = useCurrentFrame();
  const flash = Math.exp(-((((f % 60) - 30) / 5) ** 2));
  return (
    <AbsoluteFill style={{background: '#020812'}}>
      <Svg>
        <defs><radialGradient id="tq"><stop offset="0" stopColor="#0a3a5a" /><stop offset="1" stopColor="#020812" /></radialGradient></defs>
        <rect x={0} y={0} width={1920} height={1080} fill="url(#tq)" />
        {Array.from({length: 12 * 20}, (_, i) => { const c = i % 20, r = Math.floor(i / 20); const x = 60 + c * 96 + (r % 2) * 48, y = 120 + r * 76; const d = Math.hypot(x - 960, y - 560);
          return <circle key={i} cx={x} cy={y} r={30} fill="#c89a30" stroke="#5a4010" strokeWidth={3} opacity={0.45 + 0.55 * (d < 300 ? flash : 0)} />; })}
        <circle cx={960} cy={560} r={300 * flash} fill="none" stroke="#7af0ff" strokeWidth={8} opacity={flash} />
      </Svg>
      <Tit t="SUPER-KAMIOKANDE, NO JAPÃO" />
      <Etq t="ILUSTRAÇÃO · DETECTOR COM MILHARES DE SENSORES" />
    </AbsoluteFill>
  );
};
const OlhemCeu: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#02030a,#101a34)'}}>
      <Svg>{[0, 1, 2, 3, 4].map((i) => <polygon key={i} points={`${260 + i * 350},${700 - (f * 6 + i * 40) % 300} ${310 + i * 350},${780 - (f * 6 + i * 40) % 300} ${210 + i * 350},${780 - (f * 6 + i * 40) % 300}`} fill={OURO} opacity={0.8} />)}</Svg>
      <div style={{position: 'absolute', top: 820, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 110, color: '#fff'}}>OLHEM PRO CÉU</div>
    </AbsoluteFill>
  );
};

// ---------- 2 · hora 0 ----------
const NovaEstrela: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 4, 20);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#02030a,#0a1028 70%,#121a30)'}}>
      <Est sem="ne" n={240} o={1 - k * 0.6} />
      <Svg><Brilho x={1200} y={330} r={10 + 30 * k} /><Cidade /></Svg>
      <Tit t="UMA NOVA ESTRELA ACENDE" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Luas: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(100, Math.floor(f * 1.2));
  return (
    <Fd c="#121620">
      <Svg>{Array.from({length: n}, (_, i) => <circle key={i} cx={260 + (i % 20) * 72} cy={300 + Math.floor(i / 20) * 110} r={28} fill="#e8e4da" />)}</Svg>
      <Tit t="DEZENAS A CENTENAS DE LUAS CHEIAS" s={70} />
      <Sub y={900} s={42} cor={OURO}>ESTIMATIVA</Sub>
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </Fd>
  );
};
const DeDia: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#2a6ad0,#9fd0ff)'}}>
    <Svg><circle cx={300} cy={260} r={110} fill="#fffbe0" style={{filter: 'drop-shadow(0 0 80px #fff8c0)'}} /><Brilho x={1400} y={360} r={14} /><path d="M0 900 Q 500 820 960 880 T 1920 860 L1920 1080 L0 1080 Z" fill="#2a6a30" /></Svg>
    <Tit t="DARIA PRA VER DE DIA" cor="#06204a" />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Sombra: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a1028,#1a2440 60%,#2a3040)'}}>
      <Svg>
        <Brilho x={1500} y={160} r={22} />
        <rect x={0} y={820} width={1920} height={260} fill="#3a3a44" />
        <g transform="translate(760 560)"><circle cx={0} cy={0} r={46} fill="#05060a" /><rect x={-40} y={50} width={80} height={200} rx={30} fill="#05060a" /><rect x={-34} y={240} width={26} height={90} fill="#05060a" /><rect x={8} y={240} width={26} height={90} fill="#05060a" /></g>
        <path d={`M 740 890 L 760 890 L ${400 - f} 1080 L ${200 - f} 1080 Z`} fill="#000" opacity={0.55} />
      </Svg>
      <Tit t="À NOITE, ELA FARIA SOMBRA" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const SemTelescopio: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#18141e">
      <Svg>
        <g transform="translate(960 560) rotate(-25)"><rect x={-300} y={-60} width={520} height={120} rx={20} fill="#cfd2da" /><rect x={220} y={-80} width={90} height={160} rx={14} fill="#9aa4b8" /><line x1={-60} y1={60} x2={-160} y2={300} stroke="#9aa4b8" strokeWidth={18} /><line x1={-60} y1={60} x2={40} y2={300} stroke="#9aa4b8" strokeWidth={18} /></g>
        <line x1={600} y1={250} x2={600 + 720 * pr(f, 6, 16)} y2={250 + 620 * pr(f, 6, 16)} stroke={VERMELHO} strokeWidth={28} strokeLinecap="round" />
      </Svg>
      <Tit t="NÃO PRECISA DE TELESCÓPIO" />
      <Sub y={930} s={42} cor={OURO}>BASTA OLHAR PRA CIMA</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Celulares: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04060c'}}>
      <Svg>
        <Brilho x={960} y={160} r={18} />
        {[0, 1, 2, 3, 4].map((i) => { const x = 260 + i * 350, fl = Math.floor(f / 7 + i * 3) % 9 === 0; return <g key={i} transform={`translate(${x} ${640 + (i % 2) * 60}) rotate(${(i - 2) * 6})`}>
          <rect x={-70} y={-130} width={140} height={260} rx={22} fill="#111" stroke="#666" strokeWidth={5} /><rect x={-58} y={-110} width={116} height={210} rx={10} fill={fl ? '#fff' : '#1a2440'} />
          <circle cx={0} cy={-30} r={8} fill="#fff" opacity={fl ? 0 : 0.9} /><rect x={-60} y={150} width={120} height={200} rx={40} fill="#2a1a14" /></g>; })}
      </Svg>
      <Tit t="TODO MUNDO TIRA FOTOS" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 3 · dia 1–30 ----------
const Trinta: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(30, Math.floor(f / 2));
  return (
    <Fd c="#161a26">
      {Array.from({length: 30}, (_, i) => <div key={i} style={{position: 'absolute', left: 300 + (i % 10) * 135, top: 330 + Math.floor(i / 10) * 135, width: 110, height: 110, borderRadius: 14, background: i < n ? OURO : '#2a3040',
        fontFamily: FONTE, fontSize: 40, color: i < n ? '#000' : '#8a93a8', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>)}
      <Tit t="ELA CONTINUA LÁ" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Termometro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#101822">
      <Svg><rect x={900} y={200} width={120} height={600} rx={60} fill="#e8eef8" /><circle cx={960} cy={840} r={100} fill={VERMELHO} /><rect x={930} y={560 + Math.sin(f / 6) * 3} width={60} height={280} fill={VERMELHO} />
        {Array.from({length: 9}, (_, i) => <line key={i} x1={1030} x2={1080} y1={260 + i * 60} y2={260 + i * 60} stroke="#e8eef8" strokeWidth={4} />)}</Svg>
      <div style={{position: 'absolute', left: 1160, top: 520, fontFamily: FONTE, fontSize: 90, color: '#fff'}}>+0 °C</div>
      <Tit t="NÃO ESQUENTA NADA" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const UmPorCento: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#1a1608">
      <div style={{position: 'absolute', left: 260, top: 360, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>UM DIA DE SOL</div>
      <div style={{position: 'absolute', left: 260, top: 430, width: 1400 * pr(f, 4, 30), height: 110, borderRadius: 16, background: '#ffd860'}} />
      <div style={{position: 'absolute', left: 260, top: 620, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>TODA A LUZ DA SUPERNOVA</div>
      <div style={{position: 'absolute', left: 260, top: 690, width: 14 * pr(f, 20, 30) + 2, height: 110, borderRadius: 6, background: '#fff'}} />
      <div style={{position: 'absolute', left: 320, top: 700, fontFamily: FONTE, fontSize: 80, color: OURO, opacity: pr(f, 24, 32)}}>~1%</div>
      <Etq t="ESTIMATIVA · CÁLCULO" />
    </Fd>
  );
};
const TVPonto: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#1a140e'}}>
      <div style={{position: 'absolute', left: 360, top: 140, width: 1200, height: 700, borderRadius: 30, background: '#0a1028', border: '22px solid #222', overflow: 'hidden'}}>
        <Svg><Brilho x={600} y={300} r={14 + Math.sin(f / 5) * 2} /></Svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 110, background: '#1f4fa0', fontFamily: FONTE, fontSize: 46, color: '#fff', padding: '28px 40px'}}>AO VIVO · DIA {Math.min(30, 1 + Math.floor(f / 10))} · A NOVA ESTRELA</div>
      </div>
      <Etq t="ILUSTRAÇÃO · TELEJORNAL FICTÍCIO" />
    </AbsoluteFill>
  );
};
const Sorvete: React.FC = () => (
  <Fd c="#20142a">
    <Svg><polygon points="900,560 1020,560 960,860" fill="#d8a060" />{[0, 1, 2].map((i) => <circle key={i} cx={930 + i * 30} cy={520 - i * 50} r={80} fill={['#ffb0c8', '#fff0d0', '#b0e0ff'][i]} />)}</Svg>
    <Tit t="NINGUÉM SENTE CALOR. NADA DERRETE." s={70} />
    <Etq t="ILUSTRAÇÃO" />
  </Fd>
);
const Espetaculo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#050308'}}>
      <Svg>
        <polygon points="960,-50 640,900 1280,900" fill="#fff6d8" opacity={0.12 + 0.03 * Math.sin(f / 5)} />
        <Brilho x={960} y={300} r={20} />
        <path d="M0 1080 L0 920 Q 960 860 1920 920 L1920 1080 Z" fill="#6a0a1a" />
        {Array.from({length: 18}, (_, i) => <circle key={i} cx={60 + i * 110} cy={1000} r={40} fill="#000" />)}
      </Svg>
      <Tit t="AQUI EMBAIXO, SÓ UM ESPETÁCULO" s={70} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const ParteFacil: React.FC = () => {
  const f = useCurrentFrame();
  const it = [{t: 'A LUZ', ok: true}, {t: 'O QUE VEM DEPOIS', ok: false}];
  return (
    <AbsoluteFill style={{background: '#f2efe6'}}>
      {it.map((x, i) => <div key={i} style={{position: 'absolute', left: 560, top: 320 + i * 200, display: 'flex', alignItems: 'center', opacity: pr(f, i * 18, i * 18 + 8), fontFamily: FONTE}}>
        <div style={{width: 110, height: 110, borderRadius: 16, border: '8px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: x.ok ? VERDE : VERMELHO}}>{x.ok ? '✓' : '!'}</div>
        <div style={{marginLeft: 40, fontSize: 80, color: '#222'}}>{x.t}</div></div>)}
      <Tit t="O ESPETÁCULO É A PARTE FÁCIL" cor="#222" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 4 · semanas ----------
const CamadaO3: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#000 0%,#0a1440 35%,#2a6ad0 75%,#8ac8f0 100%)'}}>
      <Svg>
        <rect x={0} y={330} width={1920} height={60} fill={UV} opacity={0.55 + 0.1 * Math.sin(f / 6)} />
        <text x={80} y={310} fontFamily={FONTE} fontSize={44} fill={UV}>OZÔNIO</text>
        {[0, 1, 2, 3, 4, 5].map((i) => <g key={i}><line x1={300 + i * 260} y1={0} x2={300 + i * 260} y2={330} stroke="#fff3a0" strokeWidth={8} /><line x1={300 + i * 260} y1={390} x2={300 + i * 260} y2={520} stroke="#fff3a0" strokeWidth={8} opacity={0.25} /></g>)}
        <path d="M0 1000 Q 600 940 1200 990 T 1920 970 L1920 1080 L0 1080 Z" fill="#2a5a30" />
      </Svg>
      <Tit t="UMA CAMADA FINA QUE FILTRA O ULTRAVIOLETA" s={64} y={560} />
      <Etq t="ILUSTRAÇÃO · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const Protetor: React.FC = () => (
  <Fd c="#20180c">
    <Svg><rect x={820} y={300} width={280} height={520} rx={60} fill="#ffb030" /><rect x={880} y={220} width={160} height={100} rx={20} fill="#fff" /><rect x={840} y={460} width={240} height={180} fill="#fff" /></Svg>
    <div style={{position: 'absolute', left: 840, top: 500, width: 240, textAlign: 'center', fontFamily: FONTE, fontSize: 46, color: '#e07010'}}>FPS<br />PLANETA</div>
    <Tit t="O PROTETOR SOLAR DO PLANETA" />
    <Etq t="ILUSTRAÇÃO" />
  </Fd>
);
const Raios: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04040a'}}>
      <Svg>
        <path d="M -100 1200 A 1400 1400 0 0 1 2020 1200" fill="#1a4aa0" />
        <path d="M -100 1200 A 1400 1400 0 0 1 2020 1200" fill="none" stroke={UV} strokeWidth={40} opacity={0.6} />
        {Array.from({length: 20}, (_, i) => { const x = 100 + i * 90, y = ((f * 14 + i * 37) % 500); return <line key={i} x1={x} y1={y - 120} x2={x} y2={y} stroke={i % 2 ? UV : CIANO} strokeWidth={6} />; })}
      </Svg>
      <div style={{position: 'absolute', left: 120, top: 120, fontFamily: FONTE, fontSize: 60, color: UV}}>ULTRAVIOLETA</div>
      <div style={{position: 'absolute', right: 120, top: 120, fontFamily: FONTE, fontSize: 60, color: CIANO}}>RAIOS X</div>
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Escudo: React.FC = () => {
  const f = useCurrentFrame();
  const g = pr(f, 20, 90);
  return (
    <Fd c="#0c1430">
      <Svg>
        <path d="M 960 220 L 1260 320 L 1240 640 Q 1180 820 960 900 Q 740 820 680 640 L 660 320 Z" fill={UV} opacity={1 - g * 0.6} stroke="#fff" strokeWidth={8} />
        {Array.from({length: 8}, (_, i) => <line key={i} x1={400 + i * 160} y1={60} x2={700 + i * 70} y2={300} stroke="#fff3a0" strokeWidth={5} opacity={0.7} />)}
      </Svg>
      <div style={{position: 'absolute', top: 480, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: '#fff'}}>OZÔNIO {Math.round(100 - g * 30)}%</div>
      <Tit t="A ATMOSFERA SEGURA, MAS GASTA" s={70} />
      <Etq t="ILUSTRAÇÃO · NÚMERO ILUSTRATIVO" />
    </Fd>
  );
};
const Discordam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0e0e14'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: '#10243a', transform: `translateX(${-40 * pr(f, 0, 20)}px)`}} />
      <div style={{position: 'absolute', left: 960, top: 0, width: 960, height: 1080, background: '#3a1010', transform: `translateX(${40 * pr(f, 0, 20)}px)`}} />
      <div style={{position: 'absolute', top: 460, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 110, color: '#fff'}}>OS CIENTISTAS DISCORDAM</div>
    </AbsoluteFill>
  );
};
const Divide: React.FC = () => {
  const f = useCurrentFrame();
  const b = pr(f, 350, 366);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 955, height: 1080, background: '#0c2038', opacity: 1 - b * 0.5}} />
      <div style={{position: 'absolute', left: 965, top: 0, width: 955, height: 1080, background: '#3a0c10', opacity: 0.35 + b * 0.65}} />
      <div style={{position: 'absolute', left: 0, width: 955, top: 280, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{fontSize: 50, color: CIANO}}>2003 · GEHRELS ET AL.</div><div style={{fontSize: 120, color: '#fff', marginTop: 30}}>&lt; 26</div><div style={{fontSize: 46, color: '#fff'}}>ANOS-LUZ</div>
        <div style={{fontSize: 34, color: '#cfe0ff', marginTop: 30}}>UV NO CHÃO SÓ DOBRA<br />E TALVEZ O EFEITO SEJA MENOR</div></div>
      <div style={{position: 'absolute', left: 965, width: 955, top: 280, textAlign: 'center', fontFamily: FONTE, opacity: 0.2 + b * 0.8}}>
        <div style={{fontSize: 50, color: '#ff8a8a'}}>2023 · BRUNTON ET AL.</div><div style={{fontSize: 120, color: '#fff', marginTop: 30}}>ATÉ ~160</div><div style={{fontSize: 46, color: '#fff'}}>ANOS-LUZ</div>
        <div style={{fontSize: 34, color: '#ffd0d0', marginTop: 30}}>CONTANDO OS RAIOS X</div></div>
      <div style={{position: 'absolute', left: 660, top: 90, padding: '10px 30px', border: `5px solid ${OURO}`, borderRadius: 14, background: '#000', fontFamily: FONTE, fontSize: 52, color: OURO}}>FONTES DIVERGEM</div>
    </AbsoluteFill>
  );
};
const NoMeio: React.FC = () => {
  const f = useCurrentFrame();
  const x = (al: number) => 200 + al / 170 * 1520;
  return (
    <Fd c="#14141c">
      <Svg>
        <rect x={x(0)} y={560} width={x(26) - x(0)} height={40} fill={CIANO} opacity={0.7} />
        <rect x={x(0)} y={620} width={(x(160) - x(0)) * pr(f, 0, 20)} height={40} fill={VERMELHO} opacity={0.7} />
        <line x1={x(30)} x2={x(30)} y1={460} y2={720} stroke={OURO} strokeWidth={8} />
        <text x={x(30)} y={430} textAnchor="middle" fontFamily={FONTE} fontSize={46} fill={OURO}>30</text>
        {[0, 50, 100, 150].map((v) => <text key={v} x={x(v)} y={780} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill="#9aa4b8">{v}</text>)}
      </Svg>
      <Tit t="BEM NO MEIO DA DISCUSSÃO" />
      <Etq t="ESCALA · ANOS-LUZ" />
    </Fd>
  );
};

// ---------- 5 · meses ----------
const IndiceUV: React.FC = () => {
  const f = useCurrentFrame();
  const v = interpolate(f, [4, 60], [6, 14], clamp);
  return (
    <Fd c="#1a0c24">
      {Array.from({length: 14}, (_, i) => <div key={i} style={{position: 'absolute', left: 260 + i * 100, top: 700 - i * 26, width: 80, height: 120 + i * 26, borderRadius: 10,
        background: i < v ? ['#3ac860', '#3ac860', '#9ad830', '#e8d020', '#e8d020', '#f0a020', '#f07020', '#e04020', '#e04020', '#c02060', '#a020a0', '#8020c0', '#6020d0', '#5010e0'][i] : '#2a2a34'}} />)}
      <div style={{position: 'absolute', left: 260, top: 250, fontFamily: FONTE, fontSize: 80, color: '#fff'}}>ÍNDICE UV {Math.round(v)}</div>
      <Etq t="ILUSTRAÇÃO · NÚMERO ILUSTRATIVO" />
    </Fd>
  );
};
const Queima: React.FC = () => {
  const f = useCurrentFrame();
  const m = Math.round(interpolate(f, [0, 60], [30, 10], clamp));
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#f8c070,#f08040)'}}>
      <div style={{position: 'absolute', top: 250, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 240, color: '#3a0a00', fontVariantNumeric: 'tabular-nums'}}>{m} MIN</div>
      <Tit t="QUEIMA MAIS RÁPIDO" cor="#3a0a00" y={640} />
      <Etq t="ILUSTRAÇÃO · NÚMEROS ILUSTRATIVOS" />
    </AbsoluteFill>
  );
};
const ChuvaAcida: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#3a3a30,#5a5a48)'}}>
      <Svg>{Array.from({length: 120}, (_, i) => { const x = random('ra' + i) * 1920, y = (random('rb' + i) * 1080 + f * 30) % 1180 - 100; return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 50} stroke="#c8e860" strokeWidth={3} opacity={0.6} />; })}</Svg>
      <div style={{position: 'absolute', left: 1300, top: 380, padding: '30px 50px', background: '#000c', borderRadius: 20, fontFamily: FONTE, fontSize: 80, color: '#c8e860'}}>pH ↓</div>
      <Tit t="CHUVA MAIS ÁCIDA" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Devagar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#141a14">
      <div style={{position: 'absolute', left: 260, top: 520, width: 1400, height: 60, borderRadius: 30, background: '#2a3030'}} />
      <div style={{position: 'absolute', left: 260, top: 520, width: 1400 * (0.05 + f * 0.0012), height: 60, borderRadius: 30, background: VERMELHO}} />
      <Tit t="NADA É IMEDIATO. É DEVAGAR." />
      <Sub y={660} s={44} cor={OURO}>É ASSIM QUE A EXPLOSÃO COBRA O PREÇO</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};

// ---------- 6 · anos ----------
const CurvasO3: React.FC = () => {
  const f = useCurrentFrame();
  const k = pr(f, 0, 60, Easing.linear);
  const curva = (t: number) => Array.from({length: 60}, (_, i) => `${200 + i * 25},${380 + 360 * Math.exp(-i / t)}`).slice(0, Math.max(2, Math.round(60 * k))).join(' ');
  return (
    <Fd c="#0e1420">
      <Svg>
        <line x1={200} x2={1700} y1={380} y2={380} stroke={VERDE} strokeWidth={3} strokeDasharray="14 10" />
        {[3, 10, 30].map((t, i) => <polyline key={t} points={curva(t)} fill="none" stroke={[CIANO, OURO, VERMELHO][i]} strokeWidth={6} />)}
        <text x={1710} y={370} fontFamily={FONTE} fontSize={30} fill={VERDE}>NORMAL</text>
      </Svg>
      <Tit t="O OZÔNIO SE REFAZ… A QUE VELOCIDADE?" s={66} />
      <Etq t="GRÁFICO · ILUSTRAÇÃO · CENÁRIOS" />
    </Fd>
  );
};
const Depende: React.FC = () => {
  const f = useCurrentFrame();
  const ss = ['DISTÂNCIA', 'TIPO DE ESTRELA', 'RADIAÇÃO'];
  return (
    <Fd c="#18141e">
      {ss.map((s, i) => <React.Fragment key={s}>
        <div style={{position: 'absolute', left: 300, top: 300 + i * 200, fontFamily: FONTE, fontSize: 48, color: '#fff'}}>{s}</div>
        <div style={{position: 'absolute', left: 900, top: 320 + i * 200, width: 700, height: 14, borderRadius: 7, background: '#3a3a4a'}} />
        <div style={{position: 'absolute', left: 900 + 650 * (0.5 + 0.45 * Math.sin(f / (10 + i * 4) + i)), top: 300 + i * 200, width: 54, height: 54, borderRadius: 27, background: OURO}} /></React.Fragment>)}
      <Tit t="NINGUÉM SABE AO CERTO. DEPENDE." />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Faixa: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#141418">
      <div style={{position: 'absolute', left: 200, top: 480, width: 1520, height: 90, borderRadius: 45, background: `linear-gradient(90deg, ${OURO}, ${VERMELHO})`}} />
      <div style={{position: 'absolute', left: 200 + 1460 * (0.5 + 0.5 * Math.sin(f / 14)), top: 460, width: 60, height: 130, borderRadius: 12, background: '#fff'}} />
      <div style={{position: 'absolute', left: 200, top: 620, fontFamily: FONTE, fontSize: 44, color: OURO}}>UM SUSTO PASSAGEIRO</div>
      <div style={{position: 'absolute', right: 200, top: 620, fontFamily: FONTE, fontSize: 44, color: VERMELHO}}>DÉCADAS DE CÉU AGRESSIVO</div>
      <Etq t="CENÁRIOS · ESTIMATIVA" />
    </Fd>
  );
};

// ---------- 7 · séculos ----------
const TresOndas: React.FC = () => {
  const f = useCurrentFrame();
  const os = [{t: 'LUZ', c: '#fff6d8'}, {t: 'RADIAÇÃO', c: UV}, {t: 'RAIOS CÓSMICOS', c: VERMELHO}];
  return (
    <Fd c="#0e0c18">
      <Svg>{os.map((o, i) => <path key={i} d={Array.from({length: 97}, (_, j) => `${j ? 'L' : 'M'} ${j * 20} ${300 + i * 220 + Math.sin(j / 6 - f / 6 + i) * 40}`).join(' ')} fill="none" stroke={o.c} strokeWidth={i === 2 ? 12 : 5} opacity={i === 2 ? 1 : 0.35} />)}</Svg>
      {os.map((o, i) => <div key={o.t} style={{position: 'absolute', left: 60, top: 220 + i * 220, fontFamily: FONTE, fontSize: 44, color: o.c, opacity: i === 2 ? 1 : 0.5}}>{i + 1}ª · {o.t}</div>)}
      <Tit t="A TERCEIRA ONDA" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Lentas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#06040a'}}>
      <Svg>{Array.from({length: 70}, (_, i) => { const x = (random('lx' + i) * 1800 + f * (1 + random('lv' + i) * 3)) % 2000 - 40, y = random('ly' + i) * 1080; return <circle key={i} cx={x} cy={y} r={5 + random('lr' + i) * 6} fill={VERMELHO} opacity={0.5 + 0.5 * random('lo' + i)} />; })}
        <circle cx={1820} cy={560} r={40} fill="#4a9ae8" /></Svg>
      <Tit t="CHEGAM AOS POUCOS, MAIS DEVAGAR QUE A LUZ" s={64} />
      <Etq t="ANIMAÇÃO · RAIOS CÓSMICOS" />
    </AbsoluteFill>
  );
};
const Geracoes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#1a160e">
      <Svg>{Array.from({length: 6}, (_, i) => { const x = 220 + i * 300, s = pr(f, i * 8, i * 8 + 10); return <g key={i} opacity={s}><circle cx={x} cy={500} r={50} fill={['#e8c8a8', '#d8b090', '#c89878', '#b88060', '#a87050', '#986040'][i]} /><rect x={x - 50} y={560} width={100} height={200} rx={40} fill="#3a4a6a" />
        <text x={x} y={830} textAnchor="middle" fontFamily={FONTE} fontSize={30} fill="#fff">{['VOCÊ', 'FILHOS', 'NETOS', 'BISNETOS', 'TATARANETOS', '…'][i]}</text></g>; })}</Svg>
      <Tit t="SERÃO OS BISNETOS DOS BISNETOS" />
      <Etq t="ILUSTRAÇÃO" />
    </Fd>
  );
};
const Bolha65: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04060e'}}>
      <Est sem="b65" n={200} o={0.7} />
      <Svg><circle cx={960} cy={560} r={380 * pr(f, 0, 30)} fill="rgba(255,70,70,.12)" stroke={VERMELHO} strokeWidth={6} strokeDasharray="20 12" /><circle cx={960} cy={560} r={12} fill="#ffd860" /></Svg>
      <div style={{position: 'absolute', left: 1360, top: 300, fontFamily: FONTE, fontSize: 70, color: VERMELHO}}>~65 ANOS-LUZ</div>
      <div style={{position: 'absolute', left: 1360, top: 390, fontFamily: FONTE, fontSize: 34, color: '#fff'}}>THOMAS E YELLAND, 2023</div>
      <Tit t="SÓ PELOS RAIOS CÓSMICOS" />
      <Etq t="ILUSTRAÇÃO · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Fossil: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [20, 30], [2.4, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  return (
    <AbsoluteFill style={{background: '#8a7a60'}}>
      <Svg>
        <ellipse cx={960} cy={560} rx={420} ry={240} fill="#6a5a44" />
        <g transform="translate(960 560)" stroke="#d8c8a8" strokeWidth={10} fill="none"><ellipse rx={260} ry={120} />{Array.from({length: 9}, (_, i) => <line key={i} x1={-200 + i * 50} y1={-110} x2={-200 + i * 50} y2={110} />)}<path d="M 260 0 L 360 -80 L 360 80 Z" /></g>
      </Svg>
      <div style={{position: 'absolute', left: 1220, top: 700, padding: '10px 40px', border: `10px solid ${ROSA}`, borderRadius: 16, fontFamily: FONTE, fontSize: 90, color: ROSA, transform: `rotate(-8deg) scale(${s})`, opacity: f > 20 ? 1 : 0}}>HIPÓTESE</div>
      <Tit t="UMA EXTINÇÃO EM MASSA?" />
      <Etq t="ILUSTRAÇÃO · FÓSSIL DO DEVONIANO" />
    </AbsoluteFill>
  );
};
const Devoniano: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#1a140c">
      <div style={{position: 'absolute', left: 200, top: 540, width: 1520, height: 10, background: '#cfd2da'}} />
      {[{x: 200, t: '~360 MI DE ANOS', s: 'FIM DO DEVONIANO', c: ROSA}, {x: 1720, t: 'HOJE', s: '', c: '#fff'}].map((m) => <div key={m.t} style={{position: 'absolute', left: m.x - 200, top: 440, width: 400, textAlign: 'center', fontFamily: FONTE}}><div style={{fontSize: 50, color: m.c}}>{m.t}</div><div style={{width: 40, height: 40, borderRadius: 20, background: m.c, margin: '24px auto'}} /><div style={{fontSize: 34, color: '#fff'}}>{m.s}</div></div>)}
      <div style={{position: 'absolute', left: 200 + 1520 * ((f * 7) % 1000) / 1000, top: 520, width: 6, height: 50, background: OURO}} />
      <Tit t="É UMA HIPÓTESE" cor={ROSA} />
      <Etq t="LINHA DO TEMPO · FIELDS ET AL. 2020 · HIPÓTESE" />
    </Fd>
  );
};

// ---------- 8 · ~900 anos ----------
const CascaFe: React.FC = () => {
  const f = useCurrentFrame();
  const r = 100 + f * 6;
  return (
    <AbsoluteFill style={{background: '#06040a'}}>
      <Svg>
        <circle cx={960} cy={560} r={r} fill="none" stroke="#ff8a5a" strokeWidth={30} opacity={0.4} />
        {Array.from({length: 24}, (_, i) => { const a = i / 24 * Math.PI * 2; return <g key={i}><circle cx={960 + Math.cos(a) * r} cy={560 + Math.sin(a) * r} r={18} fill="#c0c8d8" /><text x={960 + Math.cos(a) * r} y={560 + Math.sin(a) * r + 6} textAnchor="middle" fontFamily={FONTE} fontSize={14} fill="#222">Fe</text></g>; })}
      </Svg>
      <Tit t="UMA CASCA DE GÁS COM FERRO-60" />
      <Etq t="ANIMAÇÃO · ESTIMATIVA" />
    </AbsoluteFill>
  );
};
const Testemunho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a2a4a,#04101c)'}}>
      <Svg>
        {Array.from({length: 12}, (_, i) => <rect key={i} x={760} y={140 + i * 64} width={400} height={64} fill={['#8a7a5a', '#7a6a4a', '#9a8a6a', '#6a5a3a'][i % 4]} />)}
        <rect x={760} y={140 + 7 * 64} width={400} height={64} fill={VERMELHO} opacity={0.4 + 0.3 * Math.sin(f / 5)} />
        <line x1={1160} x2={1260} y1={140 + 7.5 * 64} y2={140 + 7.5 * 64} stroke="#fff" strokeWidth={4} />
      </Svg>
      <div style={{position: 'absolute', left: 1280, top: 560, fontFamily: FONTE, fontSize: 56, color: '#fff'}}>FERRO-60</div>
      <div style={{position: 'absolute', left: 1280, top: 630, fontFamily: FONTE, fontSize: 36, color: OURO}}>2 A 3 MILHÕES DE ANOS</div>
      <Tit t="ACHADO NO FUNDO DO MAR" />
      <Etq t="ILUSTRAÇÃO · CAMADAS DO FUNDO DO MAR · FATO" />
    </AbsoluteFill>
  );
};
const TerraGira: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#02040a'}}>
      <Est sem="tg" n={150} />
      <Svg>
        <defs><clipPath id="tgc"><circle cx={960} cy={560} r={300} /></clipPath></defs>
        <circle cx={960} cy={560} r={300} fill="#1a5ab0" />
        <g clipPath="url(#tgc)">{Array.from({length: 6}, (_, i) => <ellipse key={i} cx={((i * 260 + f * 4) % 1300) + 400} cy={460 + (i % 3) * 110} rx={110} ry={70} fill="#3aa860" />)}</g>
      </Svg>
      <Tit t="E A TERRA CONTINUOU AQUI" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- 9 · mas espera ----------
const Bolha50: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #0a2a18, ${NOITE} 70%)`}}>
      <Est sem="b50" n={220} o={0.8} />
      <Svg><circle cx={960} cy={560} r={330} fill="#000" stroke={VERDE} strokeWidth={6} strokeDasharray="18 12" strokeDashoffset={-f} /><circle cx={960} cy={560} r={12} fill="#ffd860" /></Svg>
      <div style={{position: 'absolute', top: 540, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 50, color: VERDE}}>NENHUMA A MENOS DE 50 ANOS-LUZ</div>
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [0, 8], [0.8, 0], clamp)}} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const MapaIK: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fd c="#0e1420">
      <Svg>
        {[50, 100, 150].map((r) => <g key={r}><circle cx={760} cy={560} r={r * 2.6} fill="none" stroke="#fff" strokeOpacity={0.2} strokeWidth={2} /><text x={760 + r * 2.6 + 10} y={555} fontFamily={FONTE} fontSize={26} fill="#9aa4b8">{r}</text></g>)}
        <circle cx={760} cy={560} r={10} fill="#ffd860" />
        <circle cx={760 + Math.cos(-0.7) * 154 * 2.6} cy={560 + Math.sin(-0.7) * 154 * 2.6} r={18 + 4 * Math.sin(f / 4)} fill="none" stroke={OURO} strokeWidth={5} />
      </Svg>
      <div style={{position: 'absolute', left: 1240, top: 330, fontFamily: FONTE, fontSize: 64, color: OURO}}>IK PEGASI</div>
      <div style={{position: 'absolute', left: 1240, top: 420, fontFamily: FONTE, fontSize: 38, color: '#fff'}}>~150 ANOS-LUZ</div>
      <Tit t="A CANDIDATA MAIS PERTO" />
      <Etq t="MAPA ILUSTRATIVO · ANOS-LUZ" />
    </Fd>
  );
};
const DoisBi: React.FC = () => (
  <Grande t="~2 BILHÕES DE ANOS" sub="ATÉ ELA EXPLODIR (ESTIMATIVA: ~1,9 BI)" cor={VERDE} s={150} fundo={`radial-gradient(circle at 50% 45%, #10241a, ${NOITE} 70%)`} />
);
const CeuCalmo: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#02030a,#0a1430 70%,#1a2448)'}}>
    <Est sem="cc" n={260} />
    <Svg><circle cx={1400} cy={260} r={8} fill="#ff9a6a" /><Cidade y={900} /></Svg>
    <Tit t="SÓ UM ESPETÁCULO, LÁ LONGE" />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const Final: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 120, color: '#fff', opacity: pr(f, 0, 10)}}>O PERIGO É REAL.</div>
      <div style={{fontFamily: FONTE, fontSize: 120, color: VERDE, opacity: pr(f, 30, 40)}}>MAS ESTÁ LONGE.</div>
    </AbsoluteFill>
  );
};

// ---------- plano ----------
const PLANO: [string, React.FC][][] = [
  [
    ['tres horas antes', AlertaTela],
    ['uma estrela gigante a uns', GiganteApaga],
    ['e a luz dela ainda', FrenteLuz],
    ['esta e uma situacao', CarimboES],
    ['mas a ciencia ja calculou', HoraAHora],
    ['e a parte mais perigosa', () => <Glitch t={'A LUZ NÃO É O PERIGO.\nÉ O QUE CHEGA DEPOIS.'} s={100} />],
  ],
  [
    ['hora menos tres', () => <Grande t="HORA −3" sub="ANTES DE QUALQUER LUZ" cor={ROXO} />],
    ['quando o centro de uma', Colapso],
    ['elas atravessam tudo', Atravessa],
    ['e saem antes da luz', Corrida],
    ['em 1987 quando', () => <F src="sn1987a.jpg" etq="IMAGEM REAL · SN 1987A · NASA/ESA (HUBBLE)" t="SN 1987A, NUMA GALÁXIA VIZINHA" z={[1.0, 1.3]} />],
    ['os neutrinos chegaram', TresHoras],
    ['nas redes os primeiros', Feed],
    ['ninguem entende direito', Duvida],
    ['hoje detectores gigantes', Tanque],
    ['quando eles disparam', () => <F src="controle.jpg" etq="IMAGEM REAL · SALA DE CONTROLE · NASA" t="O AVISO CORRE O MUNDO" />],
    ['olhem pro ceu', OlhemCeu],
  ],
  [
    ['hora zero', NovaEstrela],
    ['pelas contas a trinta', Luas],
    ['daria pra ver de dia', DeDia],
    ['a noite ela faria', Sombra],
    ['pela primeira vez na', SemTelescopio],
    ['as pessoas saem na rua', () => <F src="multidao.jpg" etq="IMAGEM REAL · MULTIDÃO OLHANDO O CÉU · NASA" t="AS PESSOAS SAEM NA RUA" pos="50% 90%" />],
    ['tiram fotos', Celulares],
  ],
  [
    ['dias um a trinta', Trinta],
    ['mais brilhante que a lua', () => <F src="lua.jpg" etq="IMAGEM REAL · LUA CHEIA · NASA" t="MAIS BRILHANTE QUE A LUA" z={[1.0, 1.2]} />],
    ['mas nao esquenta nada', Termometro],
    ['mesmo no auge o sol', () => <F src="sol.jpg" etq="IMAGEM REAL · O SOL · NASA/SDO" t="O SOL: MILHARES DE VEZES MAIS FORTE" sub="~7.600× (CÁLCULO)" z={[1.0, 1.15]} />],
    ['somando toda a luz', UmPorCento],
    ['os noticiarios mostram', TVPonto],
    ['ninguem sente calor', Sorvete],
    ['aqui embaixo e so', Espetaculo],
    ['mas os cientistas ja sabem', ParteFacil],
  ],
  [
    ['semanas depois chega', () => <F src="limbo.jpg" etq="IMAGEM REAL · ATMOSFERA VISTA DO ESPAÇO · NASA" t="A PARTE QUE NINGUÉM VÊ" />],
    ['pra entender pensa', CamadaO3],
    ['e o protetor solar', Protetor],
    ['junto com a luz vem', Raios],
    ['a atmosfera segura', Escudo],
    ['os satelites que medem', () => <F src="ozonio.jpg" etq="IMAGEM REAL · MAPA DO OZÔNIO EM 2009 (OUTRA CAUSA) · NASA" t="SATÉLITES REGISTRAM A QUEDA" z={[1.0, 1.15]} />],
    ['e aqui os cientistas', Discordam],
    ['um estudo de 2003', Divide],
    ['a nossa estrela esta a trinta', NoMeio],
  ],
  [
    ['nos meses seguintes', IndiceUV],
    ['ficar no sol sem', Queima],
    ['o ceu pode ganhar', () => <F src="nevoa.jpg" etq="IMAGEM REAL · NÉVOA SOBRE A CHINA (OUTRA CAUSA) · NASA · ILUSTRATIVO" t="UMA NÉVOA MARROM" />],
    ['e a chuva pode', ChuvaAcida],
    ['no mar o plancton', () => <F src="plancton.jpg" etq="IMAGEM REAL · FLORAÇÃO DE PLÂNCTON VISTA DO ESPAÇO · NASA" t="O PLÂNCTON PODE SOFRER" />],
    ['nada disso e imediato', Devagar],
  ],
  [
    ['anos dois a cem', CurvasO3],
    ['ninguem sabe ao certo', Depende],
    ['as contas vao de', Faixa],
    ['os paises passariam', () => <F src="tempestade.jpg" etq="IMAGEM REAL · SATÉLITE DE CLIMA · NASA" t="MEDIR O OZÔNIO TODO DIA" />],
  ],
  [
    ['seculos depois chega', TresOndas],
    ['particulas aceleradas', Lentas],
    ['quando elas chegarem', Geracoes],
    ['um estudo de 2023 calculou', Bolha65],
    ['e alguns cientistas suspeitam', Fossil],
    ['ha uns trezentos', Devoniano],
  ],
  [
    ['e uns novecentos', () => <F src="cassiopeia.jpg" etq="IMAGEM REAL · CASSIOPEIA A, RESTO DE SUPERNOVA · NASA/CXC/JPL" t="O RESTO DA PRÓPRIA ESTRELA" sub="~900 ANOS DEPOIS (ESTIMATIVA)" />],
    ['uma casca de gas', CascaFe],
    ['e isso nao e imaginacao', Testemunho],
    ['e a prova de que', () => <F src="tycho.jpg" etq="IMAGEM REAL · RESTO DA SUPERNOVA DE TYCHO · NASA/CXC" t="ESTRELAS JÁ EXPLODIRAM PERTO" z={[1.0, 1.2]} />],
    ['e a terra continuou', TerraGira],
  ],
  [
    ['mas espera', Bolha50],
    ['a candidata mais perto', MapaIK],
    ['e so deve explodir', DoisBi],
    ['e betelgeuse', () => <F src="eso2109c.jpg" etq="IMAGEM REAL · BETELGEUSE (MARÇO DE 2020) · ESO/M. MONTARGÈS ET AL." t="BETELGEUSE: ~550 ANOS-LUZ" sub="LONGE DEMAIS PRA NOS MACHUCAR" z={[1.0, 1.25]} />],
    ['quando ela explodir vai', CeuCalmo],
    ['o perigo e real', Final],
  ],
];

const Fim: React.FC = () => {
  const s = useSpring(4);
  return <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}><div style={{fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div></AbsoluteFill>;
};

const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'snperto/narracao_cap.mp3', musica: 'snperto/musica.mp3', volta: 9, fim: Fim,
  selos: [
    {texto: 'E SE', de: 'tres horas antes', ate: 'mas espera', linha: 0, cor: ROSA},
    {texto: 'ESTIMATIVA', de: 'pelas contas a trinta', ate: 'os noticiarios mostram', linha: 1, cor: OURO},
    {texto: 'HIPÓTESE', de: 'e alguns cientistas suspeitam', ate: 'e uns novecentos', linha: 1, cor: ROSA},
  ],
  hits: [{frase: 'hora zero', off: 4, vol: 0.5}, {frase: 'e aqui os cientistas', off: 2}, {frase: 'e isso nao e imaginacao', off: 2}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb: clarão branco enorme sobre a cidade à noite, com gente olhando pra cima
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a0c20,#1a2448)'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="th"><stop offset="0" stopColor="#fff" /><stop offset="0.25" stopColor="#fff6e0" /><stop offset="1" stopColor="#8ab0ff" stopOpacity={0} /></radialGradient></defs>
      {Array.from({length: 200}, (_, i) => <circle key={i} cx={random('ts' + i) * 1920} cy={random('tt' + i) * 700} r={1.5} fill="#fff" opacity={0.6} />)}
      <circle cx={1300} cy={300} r={520} fill="url(#th)" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={700} x2={1900} y1={300} y2={300} stroke="#fff" strokeWidth={6} opacity={0.7} transform={`rotate(${i * 45} 1300 300)`} />)}
      <Cidade y={900} cor="#1c2640" />
      {Array.from({length: 9}, (_, i) => { const x = 120 + i * 200; return <g key={i}><circle cx={x} cy={930} r={30} fill="#000" /><rect x={x - 34} y={960} width={68} height={140} rx={24} fill="#000" /><line x1={x + 10} y1={975} x2={x + 50} y2={900} stroke="#000" strokeWidth={14} /></g>; })}
    </svg>
    <div style={{position: 'absolute', left: 60, top: 70, fontFamily: FONTE, fontSize: 180, color: OURO, lineHeight: 0.95, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill'}}>ELA<br />EXPLODIU</div>
    <div style={{position: 'absolute', left: 70, top: 470, padding: '8px 24px', border: `6px solid ${ROSA}`, borderRadius: 14, fontFamily: FONTE, fontSize: 60, color: ROSA, background: 'rgba(0,0,0,.6)'}}>E SE</div>
  </AbsoluteFill>
);
