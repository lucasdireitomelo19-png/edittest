// Longo "Você chegou na cerca da ÁREA 51!" (1920x1080). Roteiro do Roteirista (longo_area51.md, v1), aprovado pelo dono em 28/10. Publicação: sexta 30/10.
// Narração com o edge-tts (Antonio), decisão do dono em 28/10 porque o ElevenLabs não tinha caracteres: "narra com o edge, paciência".
// Molde "verdade × mito": selo colorido por capítulo (LENDA vermelho, NÃO PROVADO amarelo, DOCUMENTADO verde), cor caindo e voltando no "Mas espera…".
// Nunca afirmar alienígenas. Reais: U-2 (NASA, 1973) e ER-2 da NASA (derivado do U-2). Mapas: Natural Earth. O resto é ilustração/esquema próprio.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, Texto, proj, caminho, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, LAVA, FPS} from '../comum';
import {NOITE, Etq, Tit, Sub, Escuro, Foto, Ceu, Glitch, Card, Grande, Carimbo, criarLongo, Cap} from '../longo';
import palavras from './area51.palavras.json';
import eua from './dados/eua.json';

const W = palavras as Palavra[];
const CINZA = '#cfd2da';

const CAPS: Cap[] = [
  {canto: 'ÁREA 51 · A CERCA', sat: 1},
  {canto: 'CAP. 1 · O LUGAR QUE NÃO EXISTIA', sat: 0.9, titulo: 'CAPÍTULO 1', sub: 'O LUGAR QUE NÃO EXISTIA'},
  {canto: 'CAP. 2 · ROSWELL NÃO É AQUI', sat: 0.8, titulo: 'CAPÍTULO 2', sub: 'ROSWELL NÃO É AQUI'},
  {canto: 'CAP. 3 · BOB LAZAR E O 115', sat: 0.7, titulo: 'CAPÍTULO 3', sub: 'BOB LAZAR E O ELEMENTO 115'},
  {canto: 'CAP. 4 · O DISCO ERA UM ESPIÃO', sat: 0.6, titulo: 'CAPÍTULO 4', sub: 'O DISCO VOADOR ERA UM ESPIÃO'},
  {canto: 'CAP. 5 · 2013, A CIA ADMITE', sat: 0.5, titulo: 'CAPÍTULO 5', sub: '2013: A CIA ADMITE'},
  {canto: 'CAP. 6 · A CERCA E O PORTÃO', sat: 0.42, titulo: 'CAPÍTULO 6', sub: 'A CERCA E O PORTÃO'},
  {canto: 'CAP. 7 · O SEGREDO QUE FERIU GENTE', sat: 0.35, titulo: 'CAPÍTULO 7', sub: 'O SEGREDO QUE FERIU GENTE'},
  {canto: 'E OS OVNIS DE HOJE?', sat: 1, titulo: 'MAS ESPERA…', sub: 'E OS OVNIS DE HOJE?'},
];

// ---------- peças ----------
const DESERTO = 'linear-gradient(180deg, #02030a 0%, #0a0f22 45%, #1a1410 46%, #0a0806 100%)';
const Estrelas: React.FC<{n?: number; h?: number}> = ({n = 140, h = 480}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => <circle key={i} cx={random('ax' + i) * 1920} cy={random('ay' + i) * h} r={0.8 + random('ar' + i) * 2} fill="#fff" opacity={0.3 + random('ao' + i) * 0.6} />)}
  </svg>
);
// estrada de terra em perspectiva, à noite, iluminada por um farol
const Estrada: React.FC<{farol?: number; cerca?: number}> = ({farol = 1, cerca = 0}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: DESERTO, overflow: 'hidden'}}>
      <Estrelas />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M0 500 L300 470 L520 490 L760 455 L1000 480 L1300 450 L1560 485 L1920 460 L1920 500 Z" fill="#06070c" />
        <defs><radialGradient id="farol" cx="50%" cy="100%" r="70%"><stop offset="0" stopColor="#fff6d0" stopOpacity={0.55 * farol} /><stop offset="1" stopColor="#fff6d0" stopOpacity={0} /></radialGradient></defs>
        <path d="M940 497 L980 497 L1500 1080 L420 1080 Z" fill="#2a2016" />
        <path d="M940 497 L980 497 L1500 1080 L420 1080 Z" fill="url(#farol)" />
        {Array.from({length: 8}, (_, i) => { const k = ((i + f * 0.03) % 8) / 8; const y = 500 + k * k * 600; return <circle key={i} cx={960 + (random('pd' + i) - 0.5) * 900 * k} cy={y} r={2 + k * 4} fill="#5a4a36" />; })}
        {cerca > 0 && <g opacity={cerca}>
          {Array.from({length: 13}, (_, i) => <line key={i} x1={720 + i * 40} y1={455} x2={720 + i * 40} y2={500} stroke="#9aa0aa" strokeWidth={3} />)}
          <line x1={700} y1={462} x2={1220} y2={462} stroke="#9aa0aa" strokeWidth={2} /><line x1={700} y1={478} x2={1220} y2={478} stroke="#9aa0aa" strokeWidth={2} />
        </g>}
      </svg>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// cerca de perto com a placa
const Cerca: React.FC<{t?: string; placa?: boolean}> = ({t, placa = true}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 4, fps: FPS, config: {damping: 14}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 75%, #3a3020, #0a0806 60%)', overflow: 'hidden'}}>
      <Estrelas h={300} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <rect y={720} width={1920} height={360} fill="#1a140c" />
        {Array.from({length: 9}, (_, i) => <rect key={i} x={60 + i * 230} y={330} width={16} height={460} fill="#6a6e76" />)}
        {Array.from({length: 40}, (_, i) => <line key={'a' + i} x1={-200 + i * 60} y1={360} x2={-200 + i * 60 + 300} y2={770} stroke="#8a8e96" strokeWidth={2} opacity={0.6} />)}
        {Array.from({length: 40}, (_, i) => <line key={'b' + i} x1={-200 + i * 60 + 300} y1={360} x2={-200 + i * 60} y2={770} stroke="#8a8e96" strokeWidth={2} opacity={0.6} />)}
        {[340, 355, 370].map((y) => <path key={y} d={`M0 ${y} ${Array.from({length: 48}, (_, k) => `L${k * 42} ${y + (k % 2 ? -10 : 10)}`).join(' ')}`} stroke="#b0b4ba" strokeWidth={3} fill="none" />)}
      </svg>
      {placa && <div style={{position: 'absolute', left: 660, top: 380, width: 600, padding: '24px 30px', boxSizing: 'border-box', background: '#f0ebe0', border: '8px solid #b01818', borderRadius: 8,
        textAlign: 'center', fontFamily: FONTE, transform: `scale(${0.85 + 0.15 * s})`, opacity: s, boxShadow: '0 20px 60px rgba(0,0,0,.7)'}}>
        <div style={{fontSize: 46, color: '#b01818'}}>ÁREA RESTRITA</div>
        <div style={{fontSize: 30, color: '#222', marginTop: 12, lineHeight: 1.2}}>PROIBIDO ENTRAR<br />USO DE FORÇA LETAL AUTORIZADO</div>
      </div>}
      <Escuro />
      <Etq t="ILUSTRAÇÃO" />
      {t && <Tit t={t} />}
    </AbsoluteFill>
  );
};
const Disco: React.FC<{x?: number; y?: number; s?: number; luz?: boolean}> = ({x = 960, y = 520, s = 1, luz = true}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {luz && <path d={`M${x - 60 * s} ${y + 20 * s} L${x - 260 * s} ${y + 560} L${x + 260 * s} ${y + 560} L${x + 60 * s} ${y + 20 * s} Z`} fill="#bfefff" opacity={0.12 + 0.05 * Math.sin(f * 0.3)} />}
      <ellipse cx={x} cy={y} rx={220 * s} ry={50 * s} fill="#8a96a8" stroke="#cfd8e8" strokeWidth={4} />
      <ellipse cx={x} cy={y - 34 * s} rx={90 * s} ry={58 * s} fill="#a8d8e8" opacity={0.8} />
      {Array.from({length: 7}, (_, i) => <circle key={i} cx={x - 150 * s + i * 50 * s} cy={y + 12 * s} r={9 * s} fill={(Math.floor(f / 5) + i) % 3 ? '#ffd23f' : '#fff'} />)}
    </svg>
  );
};
// documento genérico: papel com linhas, título, trechos tarjados e carimbo opcional
const Doc: React.FC<{cab: string; destaque?: string; tarja?: boolean; carimbo?: string; rot?: number; cor?: string; t?: string}> = ({cab, destaque, tarja, carimbo, rot = -2, cor = VERMELHO, t}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 2, fps: FPS, config: {damping: 14}});
  const c = spring({frame: f - 16, fps: FPS, config: {damping: 9}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1c1f28, #05060a 70%)'}}>
      <div style={{position: 'absolute', left: 560, top: 260, width: 800, height: 690, background: '#ece5d2', borderRadius: 6, transform: `rotate(${rot}deg) translateY(${(1 - s) * 120}px)`, opacity: s, boxShadow: '0 30px 90px rgba(0,0,0,.8)'}}>
        <div style={{position: 'absolute', left: 60, top: 50, right: 60, fontFamily: FONTE, fontSize: 34, color: '#222', letterSpacing: 2}}>{cab}</div>
        {Array.from({length: 10}, (_, i) => <div key={i} style={{position: 'absolute', left: 60, top: 130 + i * 48, height: 14, width: 560 + ((i * 53) % 110), borderRadius: 3,
          background: tarja && i % 3 === 1 ? '#111' : '#b8b09c'}} />)}
        {destaque && <div style={{position: 'absolute', left: 50, top: 300, padding: '6px 18px', background: 'rgba(255,210,63,.75)', fontFamily: FONTE, fontSize: 54, color: '#111', whiteSpace: 'nowrap', transform: `scale(${c})`}}>{destaque}</div>}
        {carimbo && <div style={{position: 'absolute', right: 40, bottom: 60, padding: '10px 26px', border: `8px solid ${cor}`, borderRadius: 10, color: cor, fontFamily: FONTE, fontSize: 44, whiteSpace: 'nowrap',
          transform: `rotate(-10deg) scale(${interpolate(c, [0, 1], [2, 1])})`, opacity: c}}>{carimbo}</div>}
      </div>
      {t && <Tit t={t} y={120} s={70} />}
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// silhuetas de avião (vista de cima), para os aviões sem foto livre disponível
const SILH: Record<string, string> = {
  u2: 'M0 -60 L8 -20 L330 -6 L330 6 L8 10 L6 50 L40 62 L40 70 L0 66 L-40 70 L-40 62 L-6 50 L-8 10 L-330 6 L-330 -6 L-8 -20 Z',
  a12: 'M0 -200 L20 -60 L60 -20 L150 60 L150 90 L40 80 L30 120 L-30 120 L-40 80 L-150 90 L-150 60 L-60 -20 L-20 -60 Z',
  f117: 'M0 -170 L190 100 L120 100 L80 70 L40 110 L-40 110 L-80 70 L-120 100 L-190 100 Z',
  mig: 'M0 -190 L14 -60 L120 60 L120 80 L16 60 L14 120 L60 150 L60 162 L0 152 L-60 162 L-60 150 L-14 120 L-16 60 L-120 80 L-120 60 L-14 -60 Z',
};
const Aviao: React.FC<{tipo: keyof typeof SILH; nome: string; ano?: string; cor?: string}> = ({tipo, nome, ano, cor = CIANO}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 2, fps: FPS, config: {damping: 14}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #10182a, #03050a 70%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 13}, (_, i) => <line key={i} x1={0} y1={i * 90} x2={1920} y2={i * 90} stroke="rgba(76,201,240,.08)" />)}
        {Array.from({length: 22}, (_, i) => <line key={'v' + i} x1={i * 90} y1={0} x2={i * 90} y2={1080} stroke="rgba(76,201,240,.08)" />)}
        <g transform={`translate(960 ${560 - f * 0.6}) scale(${1.3 * s})`}><path d={SILH[tipo]} fill="#1c2a3e" stroke={cor} strokeWidth={3} /></g>
      </svg>
      <div style={{position: 'absolute', left: 120, top: 380, fontFamily: FONTE, opacity: s}}>
        <div style={{fontSize: 110, color: '#fff'}}>{nome}</div>
        {ano && <div style={{fontSize: 56, color: cor}}>{ano}</div>}
      </div>
      <Etq t="ILUSTRAÇÃO · SILHUETA" />
    </AbsoluteFill>
  );
};
// mapa real do oeste dos EUA (Natural Earth 50m)
const GROOM: [number, number] = [-115.8, 37.25], TESTES: [number, number] = [-116.05, 37.0], ROSWELL: [number, number] = [-104.52, 33.39];
const Mapa: React.FC<{pinos: {p: [number, number]; nome: string; cor?: string; lado?: 1 | -1}[]; linha?: boolean; zoom?: [number, number]; centro?: [number, number]; t?: string; aviso?: boolean}> = ({pinos, linha, zoom = [40, 70], centro = [-113, 36.5], t, aviso}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const k = interpolate(e, [0, 1], zoom);
  const pr = proj(centro[0], centro[1], k, 560);
  const pr2 = (lo: number, la: number): [number, number] => { const [x, y] = pr(lo, la); return [x + 420, y]; };
  const p = interpolate(f, [8, 36], [0, 1], clamp);
  const [ax, ay] = pr2(...pinos[0].p);
  const [bx, by] = pinos[1] ? pr2(...pinos[1].p) : [ax, ay];
  return (
    <AbsoluteFill style={{background: '#08121e'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d={caminho(eua as number[][][], pr2)} fill="#3a3326" stroke="#7a6a4a" strokeWidth={2} />
        {linha && <line x1={ax} y1={ay} x2={ax + (bx - ax) * p} y2={ay + (by - ay) * p} stroke={OURO} strokeWidth={6} strokeDasharray="18 12" />}
        {aviso && <circle cx={ax} cy={ay} r={70 + (f % 30) * 3} fill="none" stroke={VERMELHO} strokeWidth={5} opacity={1 - (f % 30) / 30} />}
        {pinos.map((q, i) => { const [x, y] = pr2(...q.p); const s = spring({frame: f - 4 - i * 8, fps: FPS, config: {damping: 10}});
          return <g key={i}><circle cx={x} cy={y} r={16 * s} fill={q.cor ?? VERMELHO} /><circle cx={x} cy={y} r={6 * s} fill="#fff" /></g>; })}
      </svg>
      {pinos.map((q, i) => { const [x, y] = pr2(...q.p); const lado = q.lado ?? 1;
        return <div key={i} style={{position: 'absolute', left: lado > 0 ? x + 30 : x - 630, width: 600, textAlign: lado > 0 ? 'left' : 'right', top: y - 30, fontFamily: FONTE, fontSize: 40, color: '#fff', textShadow: '0 4px 16px #000'}}>{q.nome}</div>; })}
      {linha && <div style={{position: 'absolute', left: (ax + bx) / 2 - 200, width: 400, top: (ay + by) / 2 - 90, textAlign: 'center', fontFamily: FONTE, fontSize: 60, color: OURO, opacity: p}}>&gt; 1.000 KM</div>}
      <Etq t="MAPA REAL · NATURAL EARTH" />
      {t && <Tit t={t} y={120} s={70} />}
    </AbsoluteFill>
  );
};
const Num: React.FC<{de?: number; ate: number; pre?: string; suf?: string; t?: string; sub?: string; cor?: string; s?: number}> = ({de = 0, ate, pre = '', suf = '', t, sub, cor = '#fff', s = 220}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [2, 34], [de, ate], {...clamp, easing: Easing.out(Easing.cubic)}));
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
      {t && <Tit t={t} y={130} s={70} />}
      <div style={{position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: s, color: cor, fontVariantNumeric: 'tabular-nums', letterSpacing: -4}}>{pre}{n.toLocaleString('pt-BR')}{suf}</div>
      {sub && <Sub y={400 + s} s={50}>{sub}</Sub>}
    </AbsoluteFill>
  );
};
const Lista: React.FC<{itens: [string, boolean][]; t?: string}> = ({itens, t}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
      {t && <Tit t={t} y={100} s={76} />}
      {itens.map(([txt, ok], i) => { const s = spring({frame: f - 4 - i * 10, fps: FPS, config: {damping: 12}});
        return <div key={i} style={{position: 'absolute', left: 380, top: 290 + i * 130, fontFamily: FONTE, fontSize: 64, whiteSpace: 'nowrap', color: '#fff', opacity: s, transform: `translateX(${(1 - s) * -80}px)`}}>
          <span style={{color: ok ? VERDE : VERMELHO, marginRight: 30}}>{ok ? '✔' : '✘'}</span>{txt}</div>; })}
    </AbsoluteFill>
  );
};
const Fogo: React.FC<{t?: string; escuro?: boolean}> = ({t, escuro}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: escuro ? '#050302' : 'linear-gradient(180deg, #08060a, #1a0e06 60%, #0a0604)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((v) => <g key={v}>
          <rect x={200 + v * 560} y={720} width={420} height={60} rx={10} fill="#0a0604" />
          {Array.from({length: 14}, (_, i) => { const h = 80 + 90 * Math.abs(Math.sin(f * 0.25 + i * 1.7 + v)); const x = 220 + v * 560 + i * 28;
            return <path key={i} d={`M${x} 730 Q${x + 14} ${730 - h} ${x + 28} 730 Z`} fill={i % 2 ? '#ff8a1f' : '#ffcf4a'} opacity={escuro ? 0.35 : 0.85} />; })}
          {Array.from({length: 6}, (_, i) => <circle key={'f' + i} cx={240 + v * 560 + i * 60} cy={600 - ((f * 2 + i * 40) % 300)} r={18 + i * 3} fill="#2a2420" opacity={0.5} />)}
        </g>)}
      </svg>
      <Etq t="ILUSTRAÇÃO · ALEGAÇÃO DOS TRABALHADORES" />
      {t && <Tit t={t} />}
    </AbsoluteFill>
  );
};
const Bloco: React.FC<{t: string; cor?: string; fundo?: string; s?: number; sub?: string}> = ({t, cor = '#fff', fundo, s = 120, sub}) => <Grande t={t} cor={cor} s={s} sub={sub} fundo={fundo} />;

// ---------- cenas: abertura ----------
const Noite: React.FC = () => <AbsoluteFill><Estrada /><Tit t="É NOITE. NEVADA." y={140} s={90} /></AbsoluteFill>;
const Nada: React.FC = () => <AbsoluteFill><Estrada farol={0.6} /><Sub y={190} s={60} cor={CINZA}>NENHUM CARRO · NENHUMA CASA · NENHUMA LUZ</Sub></AbsoluteFill>;
const FimEstrada: React.FC = () => <AbsoluteFill><Estrada cerca={1} /><Tit t="NO FIM DA ESTRADA, UMA CERCA" y={140} s={80} /></AbsoluteFill>;
const Placa: React.FC = () => <Cerca />;
const OutroLado: React.FC = () => {
  const s = useSpring(4, {damping: 11});
  return (
    <AbsoluteFill><Cerca placa={false} />
      <div style={{position: 'absolute', top: 360, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 260, color: '#fff', opacity: s, transform: `scale(${0.8 + 0.2 * s})`, textShadow: '0 10px 60px #000', letterSpacing: 6}}>ÁREA 51</div>
    </AbsoluteFill>
  );
};
const NaoReconhecia: React.FC = () => <Doc cab="GOVERNO DOS EUA" tarja destaque="ÁREA ██" t="POR DÉCADAS, ESSE NOME NÃO EXISTIA EM PÚBLICO" />;
const DiscoVoador: React.FC = () => <Ceu><Disco /><Tit t="DISCO VOADOR. ALIENÍGENAS." /><Etq t="ILUSTRAÇÃO" /></Ceu>;
const Corpos: React.FC = () => <Doc cab="BOATO" tarja carimbo="??" cor={OURO} t="CORPOS ESCONDIDOS NUM HANGAR?" />;
const JaOuviu: React.FC = () => <Bloco t="VOCÊ JÁ OUVIU TUDO ISSO" s={110} />;
const Separar: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 960, height: 1080, background: '#2a0a0a', opacity: s}} />
      <div style={{position: 'absolute', left: 960, top: 0, width: 960, height: 1080, background: '#0a2a14', opacity: s}} />
      <div style={{position: 'absolute', left: 0, width: 960, top: 440, textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: VERMELHO}}>LENDA</div>
      <div style={{position: 'absolute', left: 960, width: 960, top: 440, textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: VERDE}}>DOCUMENTO</div>
      <div style={{position: 'absolute', left: 930, top: 380, fontFamily: FONTE, fontSize: 90, color: '#fff'}}>×</div>
    </AbsoluteFill>
  );
};
const SegredoReal: React.FC = () => <Glitch t="O SEGREDO REAL É MAIS SOMBRIO" cor={OURO} s={120} />;

// ---------- cap. 1 ----------
const Ano1955: React.FC = () => <Bloco t="1955" sub="GUERRA FRIA" cor={OURO} s={260} />;
const LugarEscondido: React.FC = () => <Doc cab="CIA · 1955" destaque="LUGAR ESCONDIDO" t="A CIA PRECISA ESCONDER UM AVIÃO" />;
const U2: React.FC = () => <Foto src="area51/u2_1973.jpg" etq="IMAGEM REAL · U-2 DA NASA, 1973" t="O U-2: AVIÃO ESPIÃO" z={[1.05, 1.15]} />;
const GroomLake: React.FC = () => <Mapa pinos={[{p: GROOM, nome: 'GROOM LAKE'}]} zoom={[30, 90]} centro={[-115.8, 37.2]} t="UM LAGO SECO EM NEVADA" />;
const CampoTestes: React.FC = () => <Mapa pinos={[{p: GROOM, nome: 'GROOM LAKE'}, {p: TESTES, nome: 'CAMPO DE TESTES ATÔMICOS', cor: OURO, lado: -1}]} zoom={[160, 200]} centro={[-115.9, 37.1]} t="AO LADO DOS TESTES ATÔMICOS" />;
const Eisenhower: React.FC = () => <Card topo="1955 · CASA BRANCA" meio="AVAL DO PRESIDENTE EISENHOWER" cor={OURO} />;
const Acidente: React.FC = () => <Glitch t="O PRIMEIRO VOO FOI UM ACIDENTE" cor={VERMELHO} s={110} />;
const LeVier: React.FC = () => <Card topo="01/08/1955 · GROOM LAKE" meio="PILOTO: TONY LEVIER" rodape="SÓ UM TESTE EM ALTA VELOCIDADE NA PISTA" cor={CIANO} />;
const Decola: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 60], [200, 1500], {...clamp, easing: Easing.in(Easing.quad)});
  const y = interpolate(f, [30, 60], [0, -160], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a3a5a, #c8a878 70%, #8a6a44 71%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <rect x={0} y={790} width={1920} height={60} fill="#6a5a44" />
        <g transform={`translate(${x} ${760 + y}) rotate(${y / 20})`}><path d="M-160 0 L140 -6 L170 0 L140 10 L-160 8 Z" fill="#2a2e36" /><path d="M-30 0 L-10 -8 L60 -8 L40 0 Z" fill="#2a2e36" /><path d="M-150 -2 L-130 -50 L-115 -2 Z" fill="#2a2e36" /></g>
      </svg>
      <Tit t="E O U-2 SAIU DO CHÃO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Nasceu: React.FC = () => <Foto src="area51/er2_voo.jpg" etq="IMAGEM REAL · ER-2 DA NASA, DERIVADO DO U-2" t="A ÁREA 51 NASCEU ASSIM" z={[1.05, 1.18]} />;

// ---------- cap. 2 ----------
const PrimeiraLenda: React.FC = () => <Carimbo alvo="A PRIMEIRA LENDA" />;
const Roswell: React.FC = () => <Ceu><Disco s={0.8} /><Tit t="ROSWELL" s={130} /><Etq t="ILUSTRAÇÃO" /></Ceu>;
const Jornal: React.FC<{manchete: string; data: string}> = ({manchete, data}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 2, fps: FPS, config: {damping: 12}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1c1a16, #050404 70%)'}}>
      <div style={{position: 'absolute', left: 460, top: 160, width: 1000, height: 780, background: '#e8e0c8', transform: `rotate(${(1 - s) * 20 - 2}deg) scale(${s})`, boxShadow: '0 30px 90px rgba(0,0,0,.8)'}}>
        <div style={{margin: '40px 60px 0', borderBottom: '6px double #222', fontFamily: 'serif', fontSize: 70, color: '#222', textAlign: 'center', paddingBottom: 10}}>JORNAL DA ÉPOCA</div>
        <div style={{margin: '10px 60px', fontFamily: FONTE, fontSize: 30, color: '#444'}}>{data}</div>
        <div style={{margin: '30px 60px', fontFamily: FONTE, fontSize: 92, color: '#111', lineHeight: 1.05}}>{manchete}</div>
        {Array.from({length: 6}, (_, i) => <div key={i} style={{margin: '18px 60px 0', height: 12, background: '#b8b09c', width: 700 + (i % 2) * 120}} />)}
      </div>
      <Etq t="ILUSTRAÇÃO · RECONSTITUIÇÃO" />
    </AbsoluteFill>
  );
};
const Jul1947: React.FC = () => <Jornal data="JULHO DE 1947 · ROSWELL, NOVO MÉXICO" manchete="BASE ANUNCIA “DISCO VOADOR”" />;
const Balao: React.FC = () => <Jornal data="LOGO DEPOIS" manchete="CORREÇÃO: ERA UM BALÃO" />;
const MapaRoswell: React.FC = () => <Mapa pinos={[{p: GROOM, nome: 'ÁREA 51 (NEVADA)'}, {p: ROSWELL, nome: 'ROSWELL (NOVO MÉXICO)', cor: OURO, lado: -1}]} linha zoom={[48, 52]} centro={[-110.5, 35.5]} />;
const NenhumDoc: React.FC = () => <Card topo="ROSWELL × ÁREA 51" meio="NENHUM DOCUMENTO LIGA OS DOIS" cor={VERMELHO} />;
const Relatorios: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1c1f28, #05060a 70%)'}}>
      {[['1994', 'RELATÓRIO DA FORÇA AÉREA'], ['1997', 'RELATÓRIO DA FORÇA AÉREA']].map(([a, b], i) => { const s = spring({frame: f - 2 - i * 10, fps: FPS, config: {damping: 13}});
        return <div key={i} style={{position: 'absolute', left: 380 + i * 620, top: 220, width: 520, height: 680, background: '#dfe4ea', borderRadius: 6, transform: `rotate(${i ? 3 : -3}deg) translateY(${(1 - s) * 200}px)`, opacity: s, boxShadow: '0 30px 80px rgba(0,0,0,.7)', fontFamily: FONTE, textAlign: 'center'}}>
          <div style={{marginTop: 120, fontSize: 140, color: '#1c2a4a'}}>{a}</div><div style={{marginTop: 40, fontSize: 34, color: '#333', padding: '0 40px'}}>{b}</div></div>; })}
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Mogul: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #4a6a9a, #c8d8e8)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(0 ${-f * 0.8})`}>
          <line x1={1300} y1={100} x2={1300} y2={1000} stroke="#555" strokeWidth={2} />
          {Array.from({length: 7}, (_, i) => <ellipse key={i} cx={1300} cy={160 + i * 120} rx={40} ry={50} fill="#f0f0f0" stroke="#999" strokeWidth={2} />)}
          {[0, 1, 2].map((i) => <rect key={'r' + i} x={1280} y={260 + i * 240} width={40} height={30} fill="#c0a060" />)}
        </g>
      </svg>
      <div style={{position: 'absolute', left: 140, top: 380, fontFamily: FONTE}}>
        <div style={{fontSize: 44, color: '#0b2a44'}}>EXPLICAÇÃO OFICIAL</div>
        <div style={{fontSize: 120, color: '#0b2a44'}}>PROJETO<br />MOGUL</div>
        <div style={{fontSize: 40, color: '#2a3a5a'}}>BALÕES SECRETOS</div>
      </div>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const NaoAcredita: React.FC = () => <Bloco t="MUITA GENTE NÃO ACREDITA" s={110} />;
const SoNosFilmes: React.FC = () => <Carimbo alvo="ROSWELL = ÁREA 51" />;

// ---------- cap. 3 ----------
const TV: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a0a0e'}}>
      <div style={{position: 'absolute', left: 520, top: 180, width: 880, height: 660, borderRadius: 60, background: '#3a2e24', boxShadow: '0 30px 80px rgba(0,0,0,.8)'}}>
        <div style={{position: 'absolute', left: 60, top: 60, width: 640, height: 500, borderRadius: 40, background: `radial-gradient(circle, #6a7a8a, #1a2028)`, overflow: 'hidden'}}>
          {Array.from({length: 40}, (_, i) => <div key={i} style={{position: 'absolute', left: 0, right: 0, top: i * 13, height: 2, background: 'rgba(0,0,0,.3)'}} />)}
          <div style={{position: 'absolute', left: 250, top: 140, width: 140, height: 140, borderRadius: 70, background: '#111', opacity: 0.85}} />
          <div style={{position: 'absolute', left: 190, top: 290, width: 260, height: 260, borderRadius: 120, background: '#111', opacity: 0.85}} />
          <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: 0.05 + 0.05 * random('tv' + f)}} />
        </div>
      </div>
      <Tit t="1989 · UM HOMEM NA TV" y={120} s={76} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const S4: React.FC = () => <Card topo="SEGUNDO BOB LAZAR" meio="“S-4”, PERTO DA ÁREA 51" rodape="NUNCA FOI MOSTRADO" cor={OURO} />;
const Elemento115: React.FC = () => <Ceu><Disco s={0.9} /><Tit t="MOVIDOS A “ELEMENTO 115”?" cor={OURO} /><Etq t="ILUSTRAÇÃO · ALEGAÇÃO" /></Ceu>;
const Tabela: React.FC<{tem: boolean; t: string}> = ({tem, t}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 10, fps: FPS, config: {damping: 9}});
  const cols = 18;
  return (
    <AbsoluteFill style={{background: NOITE}}>
      {Array.from({length: 7 * cols}, (_, i) => { const r = Math.floor(i / cols), c = i % cols;
        if (r === 0 && c > 0 && c < 17) return null; if ((r === 1 || r === 2) && c > 1 && c < 12) return null;
        const alvo = r === 6 && c === 14;
        return <div key={i} style={{position: 'absolute', left: 240 + c * 80, top: 250 + r * 86, width: 72, height: 78, borderRadius: 6,
          background: alvo ? (tem ? `rgba(255,210,63,${0.3 + 0.6 * s})` : 'transparent') : 'rgba(76,201,240,.16)', border: alvo ? `3px ${tem ? 'solid' : 'dashed'} ${OURO}` : '1px solid rgba(76,201,240,.3)',
          fontFamily: FONTE, fontSize: 24, color: alvo ? '#fff' : 'rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: alvo && tem ? `scale(${1 + 0.4 * s})` : undefined}}>{alvo ? (tem ? '115' : '?') : ''}</div>; })}
      <Tit t={t} y={120} s={74} />
      <Etq t="ESQUEMA · TABELA PERIÓDICA" />
    </AbsoluteFill>
  );
};
const NemExistia: React.FC = () => <Tabela tem={false} t="EM 1989, O 115 NEM ESTAVA NA TABELA" />;
const Criado: React.FC = () => <Tabela tem t="2003: CRIADO EM LABORATÓRIO" />;
const Moscovio: React.FC = () => <Card topo="ELEMENTO 115 · DESDE 2016" meio="Mc · MOSCÓVIO" cor={OURO} />;
const Fracoes: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [14, 22], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 24}, (_, i) => { const a = (i / 24) * Math.PI * 2; const r = 40 + p * (200 + random('fr' + i) * 400);
          return <circle key={i} cx={960 + Math.cos(a) * r * (0.3 + random('q' + i))} cy={560 + Math.sin(a) * r * (0.3 + random('w' + i))} r={22} fill={i % 2 ? CIANO : OURO} opacity={1 - p * 0.7} />; })}
      </svg>
      <Tit t="DURA FRAÇÕES DE SEGUNDO" y={110} s={84} />
      <Sub y={900} s={44} cor={CINZA}>NADA PARECIDO COM UM COMBUSTÍVEL ESTÁVEL</Sub>
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const Diplomas: React.FC = () => <Doc cab="DIPLOMAS ALEGADOS: MIT · CALTECH" carimbo="SEM REGISTRO" cor={OURO} t="E OS DIPLOMAS?" />;
const NinguemProvou: React.FC = () => {
  const s = useSpring(4, {damping: 9});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1806, #050402 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '24px 70px', border: `12px solid ${OURO}`, borderRadius: 20, fontFamily: FONTE, fontSize: 150, color: OURO, transform: `rotate(-6deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`, opacity: s}}>NÃO PROVADO</div>
      <Sub y={800} s={44} cor={CINZA}>NINGUÉM PROVOU QUE MENTIU · NINGUÉM PROVOU O QUE CONTOU</Sub>
    </AbsoluteFill>
  );
};

// ---------- cap. 4 ----------
const CIAEscreveu: React.FC = () => <Doc cab="CIA · DOCUMENTO INTERNO" destaque="A PRÓPRIA CIA" t="AGORA, O QUE A CIA ESCREVEU" />;
const Altitude: React.FC<{t: string; u2?: boolean; obj?: boolean}> = ({t, u2, obj}) => {
  const f = useCurrentFrame();
  const s = spring({frame: f - 4, fps: FPS, config: {damping: 14}});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #02030a, #0a1a3a 60%, #2a4a7a)'}}>
      <Estrelas n={90} h={300} />
      <div style={{position: 'absolute', left: 300, top: 780, width: 1300, height: 4, background: 'rgba(255,255,255,.4)'}} />
      <div style={{position: 'absolute', left: 300, top: 300, width: 1300, height: 4, background: `rgba(255,210,63,${u2 ? 0.8 : 0})`}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(${700 + f * 2} 780)`}><path d="M-90 0 L80 -4 L100 0 L80 6 L-90 5 Z" fill="#cfd8e8" /><path d="M-10 0 L10 -40 L40 -40 L20 0 Z" fill="#cfd8e8" /></g>
        {(u2 || obj) && <g transform={`translate(${1100 - f * 1.5} 300) scale(${s})`}>{u2 ? <path d="M-130 0 L120 -3 L140 0 L120 5 L-130 4 Z M-20 0 L-10 -60 L10 -60 L0 0 Z" fill={OURO} /> : <circle r={14} fill="#fff" style={{filter: 'drop-shadow(0 0 16px #fff)'}} />}</g>}
      </svg>
      <div style={{position: 'absolute', left: 120, top: 760, fontFamily: FONTE, fontSize: 32, color: '#fff'}}>AVIÃO DE<br />PASSAGEIROS</div>
      {u2 && <div style={{position: 'absolute', left: 120, top: 270, fontFamily: FONTE, fontSize: 40, color: OURO}}>U-2<br />~18 KM</div>}
      {obj && !u2 && <div style={{position: 'absolute', left: 120, top: 270, fontFamily: FONTE, fontSize: 60, color: '#fff'}}>???</div>}
      <Tit t={t} y={120} s={72} />
      <Etq t="ESQUEMA · FORA DE ESCALA" />
    </AbsoluteFill>
  );
};
const Pilotos: React.FC = () => <Altitude t="PILOTOS RELATAVAM OBJETOS LÁ EM CIMA" obj />;
const LaEmCima: React.FC = () => <Altitude t="ONDE NENHUM AVIÃO DEVERIA ESTAR" obj />;
const Estudo1997: React.FC = () => <Card topo="1997 · HISTORIADOR DA CIA" meio="ESTUDO INTERNO SOBRE OVNIS" rodape="PUBLICADO PELA PRÓPRIA AGÊNCIA" cor={CIANO} />;
const Metade: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 40], [0, 0.55], {...clamp, easing: Easing.out(Easing.cubic)});
  const a = p * Math.PI * 2;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <circle cx={620} cy={580} r={280} fill="#2a3a5a" />
        <path d={`M620 580 L620 300 A280 280 0 ${a > Math.PI ? 1 : 0} 1 ${620 + Math.sin(a) * 280} ${580 - Math.cos(a) * 280} Z`} fill={OURO} />
      </svg>
      <div style={{position: 'absolute', left: 1000, top: 360, fontFamily: FONTE, width: 820}}>
        <div style={{fontSize: 90, color: OURO, lineHeight: 1}}>MAIS DA METADE</div>
        <div style={{fontSize: 46, color: '#fff', marginTop: 20}}>DOS RELATOS DE OVNI (FIM DOS ANOS 1950 AOS 1960)</div>
        <div style={{fontSize: 46, color: CIANO, marginTop: 20}}>= AVIÕES ESPIÕES AMERICANOS</div>
        <div style={{fontSize: 32, color: CINZA, marginTop: 30}}>ESTIMATIVA DE OFICIAIS DA CIA</div>
      </div>
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Dezoito: React.FC = () => <Altitude t="O U-2 VOAVA BEM MAIS ALTO" u2 />;
const Enganosas: React.FC = () => <Doc cab="FORÇA AÉREA · AO PÚBLICO" tarja carimbo="ENGANOSO" t="A FORÇA AÉREA SABIA" />;
const EramReais: React.FC = () => <Foto src="area51/u2_1973.jpg" etq="IMAGEM REAL · U-2 DA NASA, 1973" t="MUITOS “DISCOS VOADORES” ERAM REAIS" z={[1.2, 1.35]} pos="40% 55%" />;
const NaoAlien: React.FC = () => <Bloco t="SÓ NÃO ERAM ALIENÍGENAS" cor={VERDE} s={120} />;

// ---------- cap. 5 ----------
const Ago2013: React.FC = () => <Bloco t="AGOSTO DE 2013" cor={OURO} s={170} sub="LEI DE ACESSO À INFORMAÇÃO" />;
const Historico: React.FC = () => <Doc cab="CIA · HISTÓRICO INTERNO DE 1992" tarja carimbo="LIBERADO" cor={VERDE} t="UNIVERSIDADE GEORGE WASHINGTON OBTÉM" />;
const PrimeiraVez: React.FC = () => <Doc cab="CIA · HISTÓRICO INTERNO DE 1992" destaque="ÁREA 51" t="PELA PRIMEIRA VEZ, O NOME NUM DOCUMENTO PÚBLICO" />;
const TinhaMapa: React.FC = () => <Mapa pinos={[{p: GROOM, nome: 'ÁREA 51'}]} zoom={[120, 150]} centro={[-115.8, 37.25]} t="TINHA ATÉ MAPA" />;
const ZeroOvni: React.FC = () => <Num ate={0} de={99} t="QUANTAS VEZES APARECE “OVNI”?" cor={VERMELHO} s={300} />;
const FalaAvioes: React.FC = () => <Foto src="area51/u2_1973.jpg" etq="IMAGEM REAL · U-2 DA NASA, 1973" t="O DOCUMENTO FALA DE AVIÕES" z={[1.1, 1.2]} pos="60% 50%" />;
const A12: React.FC = () => <Aviao tipo="a12" nome="A-12" ano="1º VOO ALI EM 1962" />;
const F117: React.FC = () => <Aviao tipo="f117" nome="F-117" ano="INVISÍVEL AO RADAR · 1981" cor={OURO} />;
const MiG: React.FC = () => <Aviao tipo="mig" nome="CAÇA SOVIÉTICO" ano="CAPTURADO E TESTADO ALI" cor={VERMELHO} />;
const Cogumelo: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 50], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #3a2a20, #c89a68 70%, #6a4a2a 71%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d={`M920 770 L${940 - 10 * p} ${770 - 420 * p} L${980 + 10 * p} ${770 - 420 * p} L1000 770 Z`} fill="#d8b890" opacity={0.9} />
        <ellipse cx={960} cy={770 - 450 * p} rx={60 + 230 * p} ry={40 + 120 * p} fill="#f0d0a0" />
        <ellipse cx={960} cy={770 - 450 * p} rx={40 + 150 * p} ry={25 + 70 * p} fill="#fff4d8" opacity={0.7} />
        <ellipse cx={960} cy={780} rx={100 + 400 * p} ry={20 + 30 * p} fill="#a88860" opacity={0.7} />
      </svg>
      <Tit t="E TINHA UM VIZINHO PERIGOSO" y={120} s={72} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const CemBombas: React.FC = () => <Num ate={100} t="BOMBAS ATÔMICAS A CÉU ABERTO" sub="NO CAMPO VIZINHO · ATÉ 1962" cor={OURO} s={300} />;
const Evacuada: React.FC = () => <Mapa pinos={[{p: GROOM, nome: 'GROOM LAKE: EVACUADA'}, {p: TESTES, nome: 'TESTES', cor: OURO, lado: -1}]} zoom={[180, 220]} centro={[-115.9, 37.1]} aviso t="GROOM LAKE CHEGOU A SER EVACUADA" />;

// ---------- cap. 6 ----------
const Evento: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
      <div style={{position: 'absolute', left: 760, top: 120, width: 400, height: 820, borderRadius: 50, background: '#111', border: '10px solid #333', opacity: s, transform: `translateY(${(1 - s) * 100}px)`}}>
        <div style={{margin: '80px 26px 0', padding: 24, borderRadius: 20, background: '#1e2a44', fontFamily: FONTE, color: '#fff'}}>
          <div style={{fontSize: 22, color: CIANO}}>EVENTO · 20/09/2019</div>
          <div style={{fontSize: 44, marginTop: 14, lineHeight: 1.05}}>INVADIR A ÁREA 51</div>
          <div style={{fontSize: 22, color: CINZA, marginTop: 14}}>(DE BRINCADEIRA)</div>
        </div>
        <div style={{margin: '30px 26px', padding: '18px 0', borderRadius: 16, background: CIANO, textAlign: 'center', fontFamily: FONTE, fontSize: 30, color: '#04060d'}}>VOU</div>
      </div>
      <Tit t="2019: UM EVENTO NA INTERNET" y={120} s={72} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const MilhaoMeio: React.FC = () => <Num ate={1500000} suf="+" t="DISSERAM QUE IAM" cor={CIANO} s={200} />;
const DiaMarcado: React.FC = () => <Bloco t="20/09/2019" cor={OURO} s={220} sub="O DIA MARCADO" />;
const Setenta: React.FC = () => <Num de={1500000} ate={75} pre="~" t="APARECERAM NO PORTÃO" cor={VERMELHO} s={300} />;
const Festivais: React.FC = () => <Num ate={1500} pre="~" t="FORAM PROS FESTIVAIS DA REGIÃO" cor={OURO} s={260} />;
const SeFosseVoce: React.FC = () => <AbsoluteFill><Estrada cerca={1} /><Tit t="E SE FOSSE VOCÊ?" y={140} s={90} /></AbsoluteFill>;
const Placas: React.FC = () => <Cerca t="VOCÊ PARARIA ALI" />;
const NinguemMostrou: React.FC = () => <Glitch t="DEPOIS DO PORTÃO: NADA FOI MOSTRADO" s={100} />;
const Tribunais: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #1c1f28, ${NOITE} 70%)`}}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      <path d="M560 380 L960 200 L1360 380 Z" fill="#cfd2da" />
      {Array.from({length: 6}, (_, i) => <rect key={i} x={600 + i * 140} y={410} width={60} height={360} fill="#cfd2da" />)}
      <rect x={540} y={780} width={840} height={50} fill="#cfd2da" />
    </svg>
    <Tit t="UMA HISTÓRIA QUE ESTÁ NOS TRIBUNAIS" y={120} s={72} cor={OURO} />
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);

// ---------- cap. 7 ----------
const Ano1994: React.FC = () => <Bloco t="1994" cor={OURO} s={260} sub="EX-TRABALHADORES E VIÚVAS VÃO À JUSTIÇA" />;
const Turley: React.FC = () => <Card topo="ADVOGADO DOS CASOS" meio="JONATHAN TURLEY" cor={CIANO} />;
const Valas: React.FC = () => <Fogo t="LIXO TÓXICO QUEIMADO EM VALAS?" />;
const Doentes: React.FC = () => (
  <AbsoluteFill style={{background: '#0a0806'}}>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 7}, (_, i) => <g key={i} transform={`translate(${380 + i * 200} 640)`} opacity={i % 3 === 1 ? 0.35 : 0.8}><circle cy={-120} r={46} fill="#5a5a62" /><rect x={-50} y={-70} width={100} height={200} rx={40} fill="#5a5a62" /></g>)}
    </svg>
    <Tit t="“ISSO DEIXOU GENTE DOENTE”" y={120} s={84} />
    <Sub y={900} s={40} cor={OURO}>AFIRMAÇÃO DOS TRABALHADORES</Sub>
    <Etq t="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
const SegredoEstado: React.FC = () => <Doc cab="CASO NA JUSTIÇA" tarja carimbo="SEGREDO DE ESTADO" t="NUNCA FOI JULGADO DE VERDADE" />;
const Data1995: React.FC = () => <Bloco t="29/09/1995" cor={OURO} s={220} />;
const Decreto: React.FC = () => <Doc cab="REGISTRO FEDERAL DOS EUA" destaque="DETERMINAÇÃO 95-45" carimbo="BILL CLINTON" cor={'#1c2a6a'} t="UM DECRETO DO PRESIDENTE" />;
const Arquivou: React.FC = () => <Doc cab="TRIBUNAL" carimbo="ARQUIVADO" t="O JUIZ ARQUIVOU" />;
const Negado: React.FC = () => <Doc cab="TRIBUNAL DE APELAÇÃO" tarja carimbo="ACESSO NEGADO" t="AS INFORMAÇÕES CONTINUARAM FECHADAS" />;
const OQueQueimava: React.FC = () => <Fogo escuro t="O QUE QUEIMAVA NAQUELE DESERTO?" />;

// ---------- mas espera ----------
const Espera: React.FC = () => <Glitch t="MAS ESPERA… E OS OVNIS DE HOJE?" cor={VERDE} s={110} />;
const Congresso: React.FC = () => <Card topo="2023 · CONGRESSO DOS EUA" meio="“RESTOS DE SERES NÃO HUMANOS”" rodape="DISSE UM EX-OFICIAL, DAVID GRUSCH" cor={OURO} />;
const SegundaMao: React.FC = () => <Card topo="O PRÓPRIO GRUSCH" meio="NUNCA VIU NADA" rodape="REPETIU O QUE OUTROS TERIAM CONTADO" cor={VERMELHO} />;
const Aaro2024: React.FC = () => <Card topo="2024 · ESCRITÓRIO DO PENTÁGONO (AARO)" meio="NENHUMA TECNOLOGIA EXTRATERRESTRE CONFIRMADA" cor={VERDE} />;
const Relatorio2026: React.FC = () => {
  const f = useCurrentFrame();
  const b = (v: number, max: number, d: number) => interpolate(f, [d, d + 26], [0, v / max], {...clamp, easing: Easing.out(Easing.cubic)});
  const L: [string, number, string][] = [['RELATOS NOVOS', 319, CIANO], ['EXPLICADOS', 114, VERDE], ['TECNOLOGIA AVANÇADA', 0, VERMELHO]];
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 45%, #121a2c, ${NOITE} 70%)`}}>
      <Tit t="JULHO DE 2026 · RELATÓRIO MAIS RECENTE" y={120} s={66} />
      {L.map(([r, v, c], i) => <React.Fragment key={i}>
        <div style={{position: 'absolute', left: 260, top: 300 + i * 200, fontFamily: FONTE, fontSize: 40, color: '#fff'}}>{r}</div>
        <div style={{position: 'absolute', left: 260, top: 360 + i * 200, width: 1100, height: 70, borderRadius: 14, background: 'rgba(255,255,255,.08)'}} />
        <div style={{position: 'absolute', left: 260, top: 360 + i * 200, width: 1100 * b(v, 319, 4 + i * 10), height: 70, borderRadius: 14, background: c}} />
        <div style={{position: 'absolute', left: 1400, top: 352 + i * 200, fontFamily: FONTE, fontSize: 70, color: c}}>{v}</div>
      </React.Fragment>)}
      <Etq t="ESQUEMA · DADOS DA AARO" />
    </AbsoluteFill>
  );
};
const SemDados: React.FC = () => <Card topo="O RESTO" meio="SEM EXPLICAÇÃO POR FALTA DE DADOS" cor={CINZA} />;
const AVerdade: React.FC = () => <Bloco t="ENTÃO, A VERDADE" cor={VERDE} s={150} />;
const Existe: React.FC = () => <Lista t="DOCUMENTADO" itens={[['A ÁREA 51 EXISTE', true], ['É SECRETA', true], ['ESPIONAGEM E AVIÕES IMPOSSÍVEIS', true], ['AO LADO DE BOMBAS ATÔMICAS', true]]} />;
const SemProva: React.FC = () => <Lista t="SEM PROVA PÚBLICA" itens={[['NAVE ALIENÍGENA', false], ['ALIENÍGENAS', false], ['NEM LÁ, NEM EM LUGAR NENHUM', false]]} />;
const MisterioReal: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill><Fogo escuro />
      <div style={{position: 'absolute', left: 160, right: 160, top: 300, textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#fff', lineHeight: 1.15, opacity: s, textShadow: '0 8px 40px #000'}}>
        POR QUE FOI PRECISO UM <span style={{color: OURO}}>DECRETO PRESIDENCIAL</span> PRA NÃO RESPONDER A TRABALHADORES DOENTES?</div>
    </AbsoluteFill>
  );
};
const Fim: React.FC = () => {
  const s = useSpring(2);
  return (
    <AbsoluteFill style={{background: NOITE, justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena ----------
const PLANO: [string, React.FC][][] = [
  [['e noite voce esta', Noite], ['nenhum carro', Nada], ['no fim da estrada', FimEstrada], ['e uma placa avisando', Placa], ['do outro lado esta a area 51', OutroLado],
    ['por decadas o governo', NaoReconhecia], ['disco voador alienigenas', DiscoVoador], ['corpos escondidos', Corpos], ['voce ja ouviu tudo isso', JaOuviu],
    ['hoje vamos separar', Separar], ['e o segredo real', SegredoReal]],
  [['tudo comeca em 1955', Ano1955], ['a cia precisa de um lugar', LugarEscondido], ['o u 2 feito', U2], ['o lugar escolhido', GroomLake], ['bem ao lado do campo', CampoTestes],
    ['com o aval do presidente', Eisenhower], ['e o primeiro voo foi um acidente', Acidente], ['em primeiro de agosto', LeVier], ['e o u 2 saiu do chao', Decola], ['a area 51 nasceu assim', Nasceu]],
  [['agora a primeira lenda', PrimeiraLenda], ['quase toda historia', Roswell], ['julho de 1947', Jul1947], ['logo depois corrige', Balao], ['so que roswell fica', MapaRoswell],
    ['e nao existe nenhum documento', NenhumDoc], ['em 1994 e 1997', Relatorios], ['a explicacao oficial', Mogul], ['muita gente nao acredita', NaoAcredita], ['mas o fato e que roswell', SoNosFilmes]],
  [['em 1989 um homem', TV], ['chamado s 4', S4], ['la segundo ele', Elemento115], ['na epoca o elemento 115', NemExistia], ['em 2003 cientistas', Criado],
    ['hoje ele se chama', Moscovio], ['e dura fracoes', Fracoes], ['lazar tambem disse', Diplomas], ['ninguem provou que ele mentiu', NinguemProvou]],
  [['agora vem a parte', CIAEscreveu], ['nos anos 1950 pilotos', Pilotos], ['la em cima onde nenhum', LaEmCima], ['em 1997 um historiador', Estudo1997], ['e a conclusao surpreende', Metade],
    ['o u 2 voava', Dezoito], ['e a forca aerea sabia', Enganosas], ['ou seja muitos discos', EramReais], ['so nao eram alienigenas', NaoAlien]],
  [['em agosto de 2013', Ago2013], ['um historico interno', Historico], ['pela primeira vez a cia', PrimeiraVez], ['tinha ate mapa', TinhaMapa], ['e sabe quantas vezes', ZeroOvni],
    ['o documento fala de avioes', FalaAvioes], ['e do a 12', A12], ['depois vieram outros', F117], ['e ate um caca sovietico', MiG], ['e tinha um vizinho perigoso', Cogumelo],
    ['do lado da base', CemBombas], ['groom lake chegou a ser evacuada', Evacuada]],
  [['em 2019 um rapaz', Evento], ['mais de um milhao', MilhaoMeio], ['no dia marcado', DiaMarcado], ['cerca de setenta e cinco', Setenta], ['umas mil e quinhentas', Festivais],
    ['e se fosse voce', SeFosseVoce], ['veria as placas', Placas], ['tudo o que alguem diz', NinguemMostrou], ['mas existe uma historia', Tribunais]],
  [['em 1994 ex trabalhadores', Ano1994], ['o advogado jonathan turley', Turley], ['os trabalhadores afirmaram', Valas], ['e que isso deixou gente doente', Doentes],
    ['esse caso nunca foi julgado', SegredoEstado], ['em vinte e nove de setembro', Data1995], ['ele isentava a base', Decreto], ['o juiz arquivou', Arquivou],
    ['o tribunal de apelacao', Negado], ['ate hoje ninguem sabe', OQueQueimava]],
  [['mas espera e os ovnis', Espera], ['em 2023 um ex oficial', Congresso], ['ele mesmo disse', SegundaMao], ['em 2024 o escritorio', Aaro2024], ['e em julho de 2026', Relatorio2026],
    ['os outros seguem', SemDados], ['entao a verdade', AVerdade], ['a area 51 existe', Existe], ['mas nao existe nenhuma prova', SemProva], ['o misterio real e outro', MisterioReal]],
];
const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'area51/narracao.mp3', musica: 'area51/musica.mp3', volta: 8, fim: Fim,
  selos: [
    {texto: 'DOCUMENTADO', cor: VERDE, de: 'tudo comeca em 1955', ate: 'agora a primeira lenda'},
    {texto: 'LENDA', cor: VERMELHO, de: 'agora a primeira lenda', ate: 'em 1989 um homem'},
    {texto: 'NÃO PROVADO', cor: OURO, de: 'em 1989 um homem', ate: 'agora vem a parte'},
    {texto: 'DOCUMENTADO', cor: VERDE, de: 'agora vem a parte', ate: 'em 1994 ex trabalhadores'},
    {texto: 'DOCUMENTADO', cor: VERDE, de: 'em 1994 ex trabalhadores', ate: 'mas espera e os ovnis'},
    {texto: 'ALEGAÇÃO', cor: LAVA, de: 'os trabalhadores afirmaram', ate: 'mas espera e os ovnis', linha: 1},
    {texto: 'DOCUMENTADO', cor: VERDE, de: 'em 2024 o escritorio', ate: 'o misterio real e outro'},
    {texto: 'NÃO PROVADO', cor: OURO, de: 'em 2023 um ex oficial', ate: 'em 2024 o escritorio', linha: 1},
  ],
  hits: [{frase: 'e o segredo real', vol: 0.5}, {frase: 'e sabe quantas vezes', off: 30, vol: 0.5}, {frase: 'o juiz arquivou', off: 8}],
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail: cerca e placa à noite, farol, "O SEGREDO REAL" ----------
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 70% 85%, #fff2c0 0%, #b08a40 18%, #2a2010 45%, #050403 75%)'}} />
    <Estrelas n={120} h={360} />
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 9}, (_, i) => <rect key={i} x={20 + i * 240} y={300} width={20} height={600} fill="#2a2a2e" />)}
      {Array.from({length: 46}, (_, i) => <line key={'a' + i} x1={-300 + i * 55} y1={330} x2={-300 + i * 55 + 330} y2={900} stroke="#3a3a40" strokeWidth={3} />)}
      {Array.from({length: 46}, (_, i) => <line key={'b' + i} x1={-300 + i * 55 + 330} y1={330} x2={-300 + i * 55} y2={900} stroke="#3a3a40" strokeWidth={3} />)}
      {[310, 325, 340].map((y) => <path key={y} d={`M0 ${y} ${Array.from({length: 48}, (_, k) => `L${k * 42} ${y + (k % 2 ? -12 : 12)}`).join(' ')}`} stroke="#5a5a62" strokeWidth={4} fill="none" />)}
    </svg>
    <div style={{position: 'absolute', left: 1250, top: 600, width: 580, padding: '22px 26px', boxSizing: 'border-box', background: '#f0ebe0', border: '10px solid #b01818', borderRadius: 8, textAlign: 'center', fontFamily: FONTE, transform: 'rotate(3deg)', boxShadow: '0 20px 60px rgba(0,0,0,.8)'}}>
      <div style={{fontSize: 64, color: '#b01818'}}>ÁREA 51</div>
      <div style={{fontSize: 34, color: '#222', marginTop: 8}}>FORÇA LETAL AUTORIZADA</div>
    </div>
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.85), rgba(0,0,0,.3) 50%, transparent 65%)'}} />
    <div style={{position: 'absolute', left: 80, top: 300, fontFamily: FONTE, fontSize: 210, lineHeight: 0.92, letterSpacing: -6, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
      <div style={{color: '#fff'}}>O SEGREDO</div><div style={{color: OURO}}>REAL</div>
    </div>
    <div style={{position: 'absolute', left: 92, top: 130, padding: '12px 30px', borderRadius: 16, background: VERMELHO, fontFamily: FONTE, fontSize: 54, color: '#fff', letterSpacing: 3, transform: 'rotate(-3deg)', boxShadow: '0 10px 30px rgba(0,0,0,.6)'}}>DOCUMENTOS DA CIA</div>
  </AbsoluteFill>
);
