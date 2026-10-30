// Longo POV "Você viu o universo se RASGAR!" (Big Rip, 1920x1080). Roteiro do Roteirista (longo_big_rip.md, v1), aprovado pelo dono em 30/10.
// Mesmo molde e mesmo motor dos longos POV (../longo.tsx). Voz edge-tts Remy Multilingual com texto_pt (tudo em português; "T menos zero" junto da frase seguinte).
// Regra do dono (30/10): NENHUMA cena se repete. Cada foto real aparece em uma cena só, e cada tipo de esquema/ilustração também.
// Todos os tempos vêm de UM modelo (Caldwell, Kamionkowski e Weinberg 2003, w = −1,5): "HIPÓTESE" em todos os capítulos de T−.
// Reais: NASA (Hubble, Webb, Spitzer, WISE, Apollo 17, LRO, ISS, Suomi NPP, DSCOVR, Voyager, Orion) e Planck (ESA/NASA). Mapa do DESI: ilustração própria.
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Palavra, ancoras, fr, useSpring, clamp, FONTE, OURO, CIANO, VERMELHO, VERDE, FPS} from '../comum';
import {NOITE, Etq, Tit, Sub, Ceu, Barra, Glitch, Card, Grande, Relogio, criarLongo, Cap} from '../longo';
import palavras from './bigrip.palavras.json';

const W = palavras as Palavra[];
const ROXO = '#a98bff';
const C = 'CENÁRIO w = −1,5';

const CAPS: Cap[] = [
  {canto: C, sat: 1},
  {canto: 'HOJE', sat: 1, titulo: 'HOJE', sub: 'O UNIVERSO ACELERA'},
  {canto: C + ' · T−20 BI', sat: 0.85, titulo: 'T−20 BILHÕES DE ANOS', sub: 'A FORÇA QUE CRESCE'},
  {canto: C + ' · T−1 BI', sat: 0.7, titulo: 'T−1 BILHÃO DE ANOS', sub: 'O CÉU ESVAZIA'},
  {canto: C + ' · T−60 MI', sat: 0.55, titulo: 'T−60 MILHÕES DE ANOS', sub: 'A NOSSA GALÁXIA'},
  {canto: C + ' · T−3 MESES', sat: 0.45, titulo: 'T−3 MESES', sub: 'A TERRA SE SOLTA DO SOL'},
  {canto: C + ' · T−30 MIN', sat: 0.35, titulo: 'T−30 MINUTOS', sub: 'A TERRA SE DESFAZ'},
  {canto: C + ' · T−10⁻¹⁹ S', sat: 0.25, titulo: 'T−10⁻¹⁹ SEGUNDO', sub: 'OS SEUS ÁTOMOS'},
  {canto: C + ' · T−0', sat: 0.15, titulo: 'T−0', sub: ''},
  {canto: 'HOJE · MEDINDO w', sat: 1, titulo: 'MAS ESPERA…', sub: ''},
];

// ---------- peças ----------
const img = (s: string) => staticFile('bigrip/' + s);
const Bola: React.FC<{x: number; y: number; r: number; bg: string; brilho?: string; o?: number}> = ({x, y, r, bg, brilho, o = 1}) => (
  <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', background: bg, opacity: o, boxShadow: brilho ? `0 0 ${r * 0.7}px ${brilho}` : undefined}} />
);
const SOL = 'radial-gradient(circle at 45% 40%, #fffbe0, #ffd34a 45%, #ff9a1a 80%)';
const AZUL = 'radial-gradient(circle at 35% 35%, #9fd4ff, #1a5ea8 60%, #0a2a50)';
const Fundo: React.FC<{c?: string; children?: React.ReactNode}> = ({c = '#12162a', children}) => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${c}, ${NOITE} 75%)`}}>{children}</AbsoluteFill>;
// foto real com zoom, filtro e véu opcionais
const F: React.FC<{src: string; etq: string; t?: string; z?: [number, number]; filtro?: string; veu?: string; fit?: 'cover' | 'contain'; pos?: string; children?: React.ReactNode; s?: number}> = ({src, etq, t, z = [1.02, 1.12], filtro, veu, fit = 'cover', pos = 'center', children, s}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img(src)} style={{width: '100%', height: '100%', objectFit: fit, objectPosition: pos, filter: filtro, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      {veu && <AbsoluteFill style={{background: veu}} />}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.5), transparent 30%, transparent 65%, rgba(0,0,0,.6))'}} />
      {children}
      <Etq t={etq} real={etq.startsWith('IMAGEM REAL')} />
      {t && <Tit t={t} s={s ?? 80} />}
    </AbsoluteFill>
  );
};
// galáxias de desenho (a semente muda o padrão): k afasta do centro, fora apaga, estica alonga
const Galaxias: React.FC<{k?: number; fora?: number; estica?: number; n?: number; sem?: string}> = ({k = 1, fora = 0, estica = 0, n = 70, sem = 'a'}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: n}, (_, i) => {
      const x0 = random(sem + 'gx' + i) * 1920 - 960, y0 = random(sem + 'gy' + i) * 1080 - 540, r = 8 + random(sem + 'gr' + i) * 20;
      if (random(sem + 'gf' + i) < fora) return null;
      const x = 960 + x0 * k, y = 540 + y0 * k, ang = (Math.atan2(y0, x0) * 180) / Math.PI;
      return <ellipse key={i} cx={x} cy={y} rx={r * (1 + estica * 3)} ry={r * 0.45} fill={random(sem + 'gc' + i) > 0.5 ? '#ffd8a0' : '#b8c8ff'} opacity={0.85}
        transform={`rotate(${estica > 0 ? ang : random(sem + 'ga' + i) * 180} ${x} ${y})`} style={{filter: 'blur(1.5px)'}} />;
    })}
  </svg>
);
// foto que se desfaz em pedaços (efeito)
const Estilhaco: React.FC<{src: string; p: number; cols?: number; rows?: number; fit?: 'cover' | 'contain'}> = ({src, p, cols = 12, rows = 7, fit = 'cover'}) => {
  const tw = 1920 / cols, th = 1080 / rows;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      {Array.from({length: cols * rows}, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const cx = c * tw + tw / 2 - 960, cy = r * th + th / 2 - 540, v = 0.6 + random('v' + i) * 1.2;
        return (
          <div key={i} style={{position: 'absolute', left: c * tw, top: r * th, width: tw + 1, height: th + 1, overflow: 'hidden', opacity: 1 - p * 0.7,
            transform: `translate(${cx * p * v * 1.4}px, ${cy * p * v * 1.4}px) rotate(${(random('rt' + i) - 0.5) * 60 * p}deg)`}}>
            <Img src={img(src)} style={{position: 'absolute', left: -c * tw, top: -r * th, width: 1920, height: 1080, objectFit: fit}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
// rachaduras de luz branca
const Rachas: React.FC<{p: number; cx?: number; cy?: number; esc?: number}> = ({p, cx = 960, cy = 540, esc = 1}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
    {Array.from({length: 9}, (_, i) => {
      const a0 = (i / 9) * Math.PI * 2 + random('ra' + i);
      const pts = Array.from({length: 7}, (_, k) => {
        const rr = k * 70 * esc * p, a = a0 + (random('rj' + i + k) - 0.5) * 0.6;
        return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`;
      }).join(' ');
      return <polyline key={i} points={pts} fill="none" stroke="#fff" strokeWidth={6 + 4 * p} style={{filter: 'drop-shadow(0 0 14px #fff) drop-shadow(0 0 30px #cfe6ff)'}} />;
    })}
  </svg>
);
const prog = (f: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], {...clamp, easing: ease});

// ---------- gancho ----------
// o céu de Carina se abrindo ao meio, com luz branca na fenda
const DataFim: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 20, 90);
  return (
    <AbsoluteFill style={{background: '#fff', overflow: 'hidden'}}>
      {[0, 1].map((k) => (
        <div key={k} style={{position: 'absolute', top: 0, height: 1080, left: k ? 960 : 0, width: 960, overflow: 'hidden', transform: `translateX(${(k ? 1 : -1) * 120 * p}px)`}}>
          <Img src={img('carina.jpg')} style={{position: 'absolute', top: 0, left: k ? -960 : 0, width: 1920, height: 1080, objectFit: 'cover'}} />
        </div>
      ))}
      <AbsoluteFill style={{background: `linear-gradient(90deg, transparent ${50 - 7 * p}%, rgba(255,255,255,${0.9 * p}) 50%, transparent ${50 + 7 * p}%)`}} />
      <Tit t="O UNIVERSO TEM UMA DATA PRA ACABAR" s={76} />
      <Etq t="IMAGEM REAL (WEBB · NASA/ESA/CSA) + EFEITO" />
    </AbsoluteFill>
  );
};
const Contagem: React.FC = () => {
  const f = useCurrentFrame();
  const n = 20000000000 - f * 7654321;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #14102a, ${NOITE} 70%)`}}>
      <div style={{position: 'absolute', top: 400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: -2}}>T−{n.toLocaleString('pt-BR')}</div>
      <Sub y={600} s={46} cor={OURO}>ANOS · CONTAGEM REGRESSIVA</Sub>
      <Etq t="CENÁRIO" />
    </AbsoluteFill>
  );
};
const GalaxiasSomem: React.FC = () => {
  const f = useCurrentFrame();
  return <F src="abell370.jpg" etq="IMAGEM REAL (AGLOMERADO ABELL 370 · HUBBLE) + EFEITO" t="AS GALÁXIAS SOMEM" z={[1.3, 0.85]} filtro={`blur(${3 * prog(f, 10, 60)}px) brightness(${1 - 0.6 * prog(f, 10, 60)})`} />;
};
const ViaSeDesfaz: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 60);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      {[0, 1, 2, 3].map((k) => <Img key={k} src={img('via_lactea.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35,
        transform: `scale(${1 + p * (0.08 + k * 0.12)}) rotate(${(k - 1.5) * 3 * p}deg)`, filter: `blur(${p * k * 2}px)`}} />)}
      <Tit t="A VIA LÁCTEA SE DESFAZ" />
      <Etq t="IMAGEM REAL (CENTRO DA VIA LÁCTEA · NASA) + EFEITO" />
    </AbsoluteFill>
  );
};
const TerraSoltaG: React.FC = () => {
  const f = useCurrentFrame();
  const s = prog(f, 6, 50, Easing.in(Easing.quad));
  return (
    <Ceu n={110}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><ellipse cx={960} cy={580} rx={420} ry={150} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={3} strokeDasharray="12 12" /></svg>
      <Bola x={960} y={580} r={90} bg={SOL} brilho="rgba(255,200,80,.6)" />
      <Bola x={1380 + s * 600} y={580 - s * 380} r={28} bg={AZUL} />
      <Tit t="A TERRA SE SOLTA DO SOL" />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </Ceu>
  );
};
const TerraRacha: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Img src={img('blue_marble.jpg')} style={{position: 'absolute', left: 960 - 470, top: 560 - 470, width: 940, height: 940}} />
      <Rachas p={prog(f, 4, 50, Easing.out(Easing.quad)) * 0.85} cy={560} />
      <Tit t="A TERRA SE DESFAZ" />
      <Etq t="IMAGEM REAL (BLUE MARBLE · NASA) + EFEITO" />
    </AbsoluteFill>
  );
};
// partículas se rasgando para fora
const Particulas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #1a0e2a, #000 70%)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 260}, (_, i) => { const a = random('pa' + i) * Math.PI * 2, v = 2 + random('pv' + i) * 9, r = 10 + f * v;
          return <circle key={i} cx={960 + Math.cos(a) * r} cy={580 + Math.sin(a) * r} r={2 + random('ps' + i) * 3} fill={i % 3 ? '#cfe6ff' : OURO} opacity={Math.max(0, 1 - r / 1100)} />; })}
      </svg>
      <Tit t="OS SEUS ÁTOMOS SE RASGAM" />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Nome: React.FC = () => {
  const f = useCurrentFrame();
  const g = f < 10;
  return (
    <AbsoluteFill style={{background: '#000', transform: `translate(${g ? (random('n' + f) - 0.5) * 30 : 0}px, 0)`}}>
      {[0, 1].map((k) => <div key={k} style={{position: 'absolute', top: 330, left: 0, right: 0, height: 230, overflow: 'hidden', clipPath: k ? 'inset(50% 0 0 0)' : 'inset(0 0 50% 0)',
        transform: `translateX(${(k ? 1 : -1) * 30 * prog(f, 14, 40)}px)`}}>
        <div style={{textAlign: 'center', fontFamily: FONTE, fontSize: 230, color: '#fff', lineHeight: 1}}>BIG RIP</div>
      </div>)}
      <Sub y={620} s={56} cor={OURO}>O GRANDE RASGO</Sub>
    </AbsoluteFill>
  );
};
// página de artigo científico (ilustração)
const Pagina: React.FC<{topo: string; titulo: string; carimbo?: string; cor?: string}> = ({topo, titulo, carimbo, cor = VERMELHO}) => {
  const s = useSpring(2);
  const c = spring({frame: useCurrentFrame() - 16, fps: FPS, config: {damping: 9, mass: 0.7}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2a2418, #07060a 75%)'}}>
      <div style={{position: 'absolute', left: 560, top: 140, width: 800, height: 900, background: '#f2eee2', borderRadius: 8, padding: 60, boxSizing: 'border-box', transform: `rotate(${-2 * s}deg) translateY(${(1 - s) * 200}px)`, boxShadow: '0 30px 80px rgba(0,0,0,.6)'}}>
        <div style={{fontFamily: FONTE, fontSize: 26, color: '#555', letterSpacing: 3}}>{topo}</div>
        <div style={{fontFamily: 'serif', fontSize: 50, color: '#111', marginTop: 24, lineHeight: 1.15}}>{titulo}</div>
        {Array.from({length: 12}, (_, i) => <div key={i} style={{height: 12, marginTop: 26, background: '#c8c2b0', width: `${70 + random('pl' + titulo + i) * 30}%`}} />)}
      </div>
      {carimbo && <div style={{position: 'absolute', left: 700, top: 560, padding: '14px 40px', border: `10px solid ${cor}`, borderRadius: 16, fontFamily: FONTE, fontSize: 70, color: cor,
        transform: `rotate(-12deg) scale(${interpolate(c, [0, 1], [2, 1])})`, opacity: c, background: 'rgba(242,238,226,.6)'}}>{carimbo}</div>}
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Estudo2003: React.FC = () => <Pagina topo="PHYSICAL REVIEW LETTERS · 2003" titulo="Energia fantasma: o fim do universo calculado" carimbo="NÃO É FICÇÃO" cor={ROXO} />;
const ONosso: React.FC = () => <F src="pale_blue_dot.jpg" etq="IMAGEM REAL · A TERRA VISTA PELA VOYAGER 1 · NASA" t="SERÁ QUE É O NOSSO?" z={[1.0, 1.3]} />;

// ---------- hoje ----------
const CeuCalmo: React.FC = () => <F src="andromeda_hubble.jpg" etq="IMAGEM REAL · ESTRELAS DE ANDRÔMEDA · HUBBLE · NASA" t="TUDO PARECE CALMO" z={[1.0, 1.08]} />;
const NaoEsta: React.FC = () => <Glitch t="MAS NÃO ESTÁ" cor={VERMELHO} s={170} />;
const Equipes: React.FC = () => <F src="supernova.jpg" etq="IMAGEM REAL · SUPERNOVA · SPITZER · NASA" t="1998: EXPLOSÕES DE ESTRELAS DISTANTES" z={[1.0, 1.15]} />;
const MaisFracas: React.FC = () => {
  const s = useSpring(10);
  return (
    <Fundo>
      <Bola x={620} y={560} r={70} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" brilho="rgba(255,230,150,.8)" />
      <Bola x={1300} y={560} r={70} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" o={1 - 0.65 * s} />
      <div style={{position: 'absolute', left: 470, top: 700, width: 300, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: '#cfd8e8'}}>ESPERADO</div>
      <div style={{position: 'absolute', left: 1150, top: 700, width: 300, textAlign: 'center', fontFamily: FONTE, fontSize: 36, color: OURO}}>OBSERVADO</div>
      <Tit t="MAIS FRACAS DO QUE DEVIAM" />
      <Etq t="ESQUEMA" />
    </Fundo>
  );
};
const MaisLonge: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [6, 50], [1100, 1650], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg, #0a1428, #000)'}}>
      <Bola x={200} y={600} r={30} bg={AZUL} />
      <div style={{position: 'absolute', left: 240, top: 596, width: x - 240, height: 8, background: OURO}} />
      <div style={{position: 'absolute', left: 600, top: 520, fontFamily: FONTE, fontSize: 36, color: OURO}}>DISTÂNCIA</div>
      <Bola x={x} y={600} r={26} bg="radial-gradient(circle, #fff, #ffe9a0 40%, rgba(255,200,80,0) 70%)" />
      <Tit t="ESTAVAM MAIS LONGE" />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const Choque: React.FC = () => {
  const f = useCurrentFrame();
  return <Ceu n={60}><Galaxias sem="choque" k={interpolate(f, [0, 120], [0.8, 1.5])} /><Tit t="O UNIVERSO ESTÁ SE EXPANDINDO" /><Etq t="ANIMAÇÃO" /></Ceu>;
};
// linhas de velocidade
const Velocidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#02030a'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 160}, (_, i) => { const a = random('va' + i) * Math.PI * 2, r0 = ((random('vr' + i) * 900 + f * (8 + f * 0.25)) % 1100), l = 20 + f * 1.4;
          return <line key={i} x1={960 + Math.cos(a) * r0} y1={540 + Math.sin(a) * r0} x2={960 + Math.cos(a) * (r0 + l)} y2={540 + Math.sin(a) * (r0 + l)} stroke={i % 4 ? '#cfe0ff' : CIANO} strokeWidth={3} opacity={0.8} />; })}
      </svg>
      <Tit t="CADA VEZ MAIS RÁPIDO" cor={CIANO} />
      <Etq t="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// medalha do Nobel (ilustração)
const Nobel: React.FC = () => {
  const s = useSpring(2, {damping: 10, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2a2008, #050402 70%)'}}>
      <div style={{position: 'absolute', left: 960 - 190, top: 300, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #fff3b0, #e0b030 45%, #8a6010 90%)',
        boxShadow: '0 0 80px rgba(255,200,60,.5)', transform: `scale(${s}) rotate(${(1 - s) * 90}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTE, fontSize: 64, color: '#5a3a00'}}>2011</div>
      <Sub y={730} s={56} cor="#fff" d={8}>NOBEL DE FÍSICA</Sub>
      <Sub y={810} s={40} cor={OURO} d={14}>PERLMUTTER · SCHMIDT · RIESS</Sub>
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const EnergiaEscura: React.FC = () => (
  <F src="udf.jpg" etq="IMAGEM REAL · CAMPO ULTRAPROFUNDO · HUBBLE · NASA" z={[1.2, 1.35]} veu="radial-gradient(circle at 50% 55%, rgba(30,10,60,.85), rgba(0,0,0,.35) 70%)">
    <div style={{position: 'absolute', top: 430, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: ROXO, textShadow: '0 10px 50px #000'}}>ENERGIA ESCURA</div>
  </F>
);
const NinguemSabe: React.FC = () => <Grande t="?" sub="NINGUÉM SABE O QUE ELA É" s={300} cor={ROXO} />;
// setas empurrando para fora, ficando maiores
const Empurrao: React.FC = () => {
  const f = useCurrentFrame();
  const g = 1 + f * 0.012;
  return (
    <Fundo c="#1a1030">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2, r1 = 140, r2 = 140 + 160 * g;
          return <g key={i}><line x1={960 + Math.cos(a) * r1} y1={560 + Math.sin(a) * r1} x2={960 + Math.cos(a) * r2} y2={560 + Math.sin(a) * r2} stroke={ROXO} strokeWidth={6 * g} />
            <circle cx={960 + Math.cos(a) * r2} cy={560 + Math.sin(a) * r2} r={9 * g} fill={ROXO} /></g>; })}
      </svg>
      <Tit t="E SE ELA FICAR MAIS FORTE?" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </Fundo>
  );
};
const ORelogio: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 55%, #121a2c, ${NOITE} 70%)`}}><Relogio x={960} y={580} r={260} h="EXISTE UM RELÓGIO" /><Etq t="ILUSTRAÇÃO" /></AbsoluteFill>;
// ampulheta escorrendo
const Ampulheta: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 150], [0, 1], clamp);
  return (
    <Fundo c="#1a1230">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M760 220 H1160 L980 560 L1160 900 H760 L940 560 Z" fill="none" stroke="#cfd8e8" strokeWidth={8} />
        <path d={`M${790 + 150 * p} ${240 + 300 * p} H${1130 - 150 * p} L960 550 Z`} fill={OURO} />
        <path d={`M960 ${880 - 260 * p} L810 880 H1110 Z`} fill={OURO} />
        <line x1={960} y1={555} x2={960} y2={880} stroke={OURO} strokeWidth={4} strokeDasharray="6 10" strokeDashoffset={-f * 4} />
      </svg>
      <Tit t="JÁ ESTARIA CORRENDO" />
      <Etq t="CENÁRIO DE 2003 · ILUSTRAÇÃO" />
    </Fundo>
  );
};

// ---------- T−20 bi ----------
const Fisicos: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0e1a14'}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,.06), transparent 60%)'}} />
      {['CALDWELL', 'KAMIONKOWSKI', 'WEINBERG'].map((n, i) => {
        const s = spring({frame: f - 6 - i * 8, fps: FPS, config: {damping: 12}});
        return <div key={n} style={{position: 'absolute', top: 360 + i * 150, width: '100%', textAlign: 'center', fontFamily: 'cursive', fontSize: 96, color: '#e8f0e8', opacity: s, transform: `translateX(${(1 - s) * -80}px)`}}>{n}</div>;
      })}
      <Tit t="2003: TRÊS FÍSICOS CALCULARAM" s={72} />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Fantasma: React.FC = () => (
  <F src="aguia.jpg" etq="IMAGEM REAL · NEBULOSA DA ÁGUIA · WISE · NASA" z={[1.15, 1.3]} filtro="hue-rotate(200deg) saturate(.9) brightness(.6)">
    <div style={{position: 'absolute', top: 400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 120, color: '#fff', textShadow: `0 0 40px ${ROXO}`}}>ENERGIA ESCURA<br /><span style={{color: ROXO}}>FANTASMA</span></div>
  </F>
);
// pontos se espalhando e apagando (o normal)
const Diluir: React.FC = () => {
  const f = useCurrentFrame();
  const k = 1 + f * 0.012;
  return (
    <AbsoluteFill style={{background: '#04101a'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 100}, (_, i) => { const x = ((i % 10) - 4.5) * 70 * k, y = (Math.floor(i / 10) - 4.5) * 60 * k;
          return <circle key={i} cx={960 + x} cy={580 + y} r={10} fill={CIANO} opacity={Math.max(0.15, 1 / k ** 2)} />; })}
      </svg>
      <Tit t="NORMAL: CADA VEZ MAIS FRACA" cor={CIANO} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
// as duas curvas no mesmo gráfico
const Curvas: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 60, Easing.linear);
  const linha = (fn: (u: number) => number) => Array.from({length: 60}, (_, i) => { const u = (i / 59) * p; return `${360 + u * 1200},${fn(u)}`; }).join(' ');
  return (
    <Fundo>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M360 260 V820 H1600" stroke="#5a6478" strokeWidth={5} fill="none" />
        <polyline points={linha((u) => 520 + 280 * u ** 0.5)} fill="none" stroke={CIANO} strokeWidth={8} opacity={0.6} />
        <polyline points={linha((u) => 520 - 260 * u ** 2)} fill="none" stroke={ROXO} strokeWidth={11} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', left: 1400, top: 790, fontFamily: FONTE, fontSize: 30, color: CIANO}}>NORMAL</div>
      <div style={{position: 'absolute', left: 1400, top: 240, fontFamily: FONTE, fontSize: 30, color: ROXO}}>FANTASMA</div>
      <div style={{position: 'absolute', left: 380, top: 840, fontFamily: FONTE, fontSize: 30, color: '#8a96aa'}}>TEMPO →</div>
      <Tit t="FANTASMA: CADA VEZ MAIS FORTE" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </Fundo>
  );
};
// barra vertical de força subindo
const Termometro: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 150], [0.2, 0.95], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a0a2a, #05030a)'}}>
      <div style={{position: 'absolute', left: 900, top: 230, width: 120, height: 700, borderRadius: 60, background: 'rgba(255,255,255,.08)', border: '4px solid #5a4a7a'}} />
      <div style={{position: 'absolute', left: 904, top: 234 + 692 * (1 - p), width: 112, height: 692 * p, borderRadius: 56, background: `linear-gradient(0deg, ${ROXO}, #ff6ad5)`, boxShadow: `0 0 50px ${ROXO}`}} />
      <div style={{position: 'absolute', left: 1080, top: 220 + 692 * (1 - p), fontFamily: FONTE, fontSize: 40, color: '#fff'}}>FORÇA ↑</div>
      <Tit t="ELA NÃO PARA DE CRESCER" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Infinito: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(6, {damping: 7, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #4a0808, #0a0000 70%)', transform: `translate(${(random('i' + f) - 0.5) * 10 * s}px, ${(random('j' + f) - 0.5) * 10 * s}px)`}}>
      <div style={{position: 'absolute', top: 240, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 460, color: VERMELHO, transform: `scale(${s})`, textShadow: '0 0 80px #ff2020'}}>∞</div>
      <Tit t="ATÉ FICAR INFINITA" />
      <Etq t="HIPÓTESE" />
    </AbsoluteFill>
  );
};
const VinteBi: React.FC = () => (
  <F src="sombrero.jpg" etq="IMAGEM REAL · GALÁXIA DO SOMBRERO · HUBBLE · NASA" z={[1.05, 1.2]} veu="rgba(0,0,0,.45)">
    <div style={{position: 'absolute', top: 380, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, textShadow: '0 10px 40px #000'}}>~20 BILHÕES DE ANOS</div>
    <Sub y={580} s={44} cor="#fff">EXEMPLO DO ESTUDO · w = −1,5</Sub>
  </F>
);
const Escada: React.FC = () => {
  const f = useCurrentFrame();
  const marcas = ['T−20 BI', 'T−1 BI', 'T−60 MI', 'T−3 MESES', 'T−30 MIN', 'T−10⁻¹⁹ S', 'T−0'];
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0a1020, ${NOITE})`}}>
      <div style={{position: 'absolute', left: 140, right: 140, top: 560, height: 8, borderRadius: 4, background: 'rgba(255,255,255,.2)'}} />
      {marcas.map((m, i) => {
        const s = spring({frame: f - 4 - i * 5, fps: FPS, config: {damping: 12}});
        const x = 140 + (i / 6) * 1640;
        return <React.Fragment key={m}>
          <div style={{position: 'absolute', left: x - 18, top: 546, width: 36, height: 36, borderRadius: 18, background: i < 6 ? ROXO : VERMELHO, transform: `scale(${s})`}} />
          <div style={{position: 'absolute', left: x - 150, width: 300, top: i % 2 ? 620 : 460, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: '#fff', opacity: s}}>{m}</div>
        </React.Fragment>;
      })}
      <Tit t="PARECE MUITO TEMPO" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// círculos encolhendo: cada capítulo mais curto
const Encolhendo: React.FC = () => {
  const f = useCurrentFrame();
  const rs = [170, 120, 88, 62, 42, 26, 12];
  let x = 220;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 30% 50%, #1a1430, #040308 70%)'}}>
      {rs.map((r, i) => {
        const s = spring({frame: f - 4 - i * 6, fps: FPS, config: {damping: 12}});
        const el = <div key={i} style={{position: 'absolute', left: x, top: 600 - r, width: 2 * r * s, height: 2 * r * s, borderRadius: '50%', border: `4px solid ${i < 6 ? ROXO : VERMELHO}`, background: 'rgba(169,139,255,.12)'}} />;
        x += 2 * r + 40;
        return el;
      })}
      <Tit t="CADA CAPÍTULO É MAIS CURTO" />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};

// ---------- T−1 bi ----------
const Familias: React.FC = () => <F src="webb_aglomerado.jpg" etq="IMAGEM REAL · AGLOMERADO SMACS 0723 · WEBB · NASA/ESA/CSA" t="AS FAMÍLIAS DE GALÁXIAS" z={[1.0, 1.2]} />;
const Coma: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 10, 110);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      {Array.from({length: 8}, (_, i) => (
        <div key={i} style={{position: 'absolute', top: 0, height: 1080, left: i * 240, width: 241, overflow: 'hidden', transform: `translate(${(i - 3.5) * 60 * p}px, ${(i % 2 ? -1 : 1) * 140 * p}px)`, opacity: 1 - 0.5 * p}}>
          <Img src={img('coma.jpg')} style={{position: 'absolute', top: 0, left: -i * 240, width: 1920, height: 1080, objectFit: 'cover'}} />
        </div>
      ))}
      <Tit t="OS AGLOMERADOS SE DESFAZEM" />
      <Etq t="IMAGEM REAL (AGLOMERADO DE COMA · NASA) + EFEITO" />
    </AbsoluteFill>
  );
};
const Afastam: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 0, 90, Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img('macs0717.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + p * 2.5})`, filter: `blur(${p * 6}px)`, opacity: 1 - p * 0.8}} />
      <Tit t="SOMEM DO CÉU" />
      <Etq t="IMAGEM REAL (MACS J0717 · HUBBLE) + EFEITO" />
    </AbsoluteFill>
  );
};
// a dupla de galáxias apagando uma de cada vez
const UmaPorUma: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Img src={img('dupla.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      {[[960, 540, 8], [1290, 270, 22], [560, 300, 34], [1500, 800, 44]].map(([x, y, d], i) => (
        <div key={i} style={{position: 'absolute', left: x - 260, top: y - 260, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, #000 50%, rgba(0,0,0,0) 70%)', opacity: prog(f, d, d + 14)}} />
      ))}
      <Tit t="UMA POR UMA" />
      <Etq t="IMAGEM REAL (HUBBLE) + EFEITO" />
    </AbsoluteFill>
  );
};
const DiaADia: React.FC = () => <F src="nascer_sol_iss.jpg" etq="IMAGEM REAL · NASCER DO SOL VISTO DA ESTAÇÃO ESPACIAL · NASA" t="NADA MUDA NO DIA A DIA" z={[1.0, 1.1]} />;
const SomeDeVista: React.FC = () => <Ceu n={25}><Tit t="O RESTO SOME DE VISTA" /><Sub y={250} s={44} cor={OURO}>PRA SEMPRE</Sub><Etq t="ILUSTRAÇÃO" /></Ceu>;
const FotosHubble: React.FC = () => <F src="xdf.jpg" etq="IMAGEM REAL · CAMPO PROFUNDO · HUBBLE · NASA" t="FOTOS COMO AS DO HUBBLE" z={[1.0, 1.15]} />;
const ViramPassado: React.FC = () => <F src="hubble_telescopio.jpg" etq="IMAGEM REAL · TELESCÓPIO HUBBLE · NASA" t="VIRAM COISA DO PASSADO" z={[1.0, 1.1]} filtro="sepia(.8) contrast(1.1)" pos="50% 40%" />;
// telescópio diante de um céu que esvazia
const Observador: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Ceu n={Math.max(6, 170 - f * 2)}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M0 900 Q500 860 960 880 T1920 870 V1080 H0 Z" fill="#000" />
        <g transform="translate(1300 880)"><rect x={-12} y={-150} width={24} height={150} fill="#222" /><rect x={-40} y={-260} width={200} height={70} rx={14} fill="#2a2a2a" transform="rotate(-30)" /></g>
      </svg>
      <Tit t="O UNIVERSO ESVAZIA" />
      <Etq t="ILUSTRAÇÃO" />
    </Ceu>
  );
};

// ---------- T−60 mi ----------
const NossaCasa: React.FC = () => <F src="via_lactea2.jpg" etq="IMAGEM REAL · CENTRO DA VIA LÁCTEA · SPITZER · NASA" t="A NOSSA CASA" z={[1.0, 1.12]} />;
const ViaDesfaz: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 130);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img('m51.jpg')} style={{position: 'absolute', left: 960 - 450, top: 0, width: 900, height: 1080, objectFit: 'cover', transform: `rotate(${p * 70}deg) scale(${1 + p * 0.9})`, filter: `blur(${p * 5}px)`, opacity: 1 - p * 0.6}} />
      <Tit t="A GALÁXIA COMEÇA A SE DESFAZER" />
      <Etq t="IMAGEM REAL (M51, ESPIRAL COMO A NOSSA · HUBBLE) + EFEITO" />
    </AbsoluteFill>
  );
};
const Soltam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 400}, (_, i) => {
          const a = random('ea' + i) * Math.PI * 2, r = random('er' + i) ** 1.5 * 380 + f * (0.5 + random('ev' + i)) * 3;
          return <circle key={i} cx={960 + Math.cos(a) * r * 1.6} cy={560 + Math.sin(a) * r * 0.7} r={1.5 + random('es' + i) * 2} fill="#e8eeff" opacity={0.85} />;
        })}
      </svg>
      <Tit t="AS ESTRELAS SE SOLTAM" />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// duas linhas do tempo: 2003 × 2004
const Divergem: React.FC = () => {
  const f = useCurrentFrame();
  const X = (mi: number) => 1700 - (mi / 200) * 1400;
  const linhas: [number, number, string, string][] = [[60, 380, '2003: T−60 MI', ROXO], [180, 620, '2004: T−180 MI', OURO]];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1a1608, #050402)'}}>
      {linhas.map(([mi, y, t, cor], i) => {
        const s = prog(f, 6 + i * 12, 30 + i * 12);
        return <React.Fragment key={i}>
          <div style={{position: 'absolute', left: X(mi), top: y, width: (1700 - X(mi)) * s, height: 50, borderRadius: 10, background: cor}} />
          <div style={{position: 'absolute', left: X(mi), top: y - 60, fontFamily: FONTE, fontSize: 40, color: '#fff', opacity: s}}>{t}</div>
        </React.Fragment>;
      })}
      <div style={{position: 'absolute', left: 1690, top: 330, width: 8, height: 420, background: VERMELHO}} />
      <div style={{position: 'absolute', left: 1650, top: 770, fontFamily: FONTE, fontSize: 34, color: VERMELHO}}>FIM</div>
      <Tit t="FONTES DIVERGEM" cor={OURO} />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </AbsoluteFill>
  );
};
// dois cientistas discordando (ilustração)
const Pessoa: React.FC<{x: number; flip: number}> = ({x, flip}) => (
  <g transform={`translate(${x} 820) scale(${flip} 1)`} fill="#cfd8e8"><circle cy={-330} r={60} /><rect x={-60} y={-260} width={120} height={260} rx={40} /></g>
);
const Discordam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#1a1a26">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><Pessoa x={620} flip={1} /><Pessoa x={1300} flip={-1} /></svg>
      <div style={{position: 'absolute', left: 700, top: 300, fontFamily: FONTE, fontSize: 64, color: ROXO, transform: `rotate(${Math.sin(f * 0.2) * 6}deg)`}}>60 MI?</div>
      <div style={{position: 'absolute', left: 1020, top: 260, fontFamily: FONTE, fontSize: 64, color: OURO, transform: `rotate(${-Math.sin(f * 0.2) * 6}deg)`}}>180 MI?</div>
      <Tit t="NEM OS CIENTISTAS CONCORDAM" />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
const Sozinhas: React.FC = () => <F src="barrada.jpg" etq="IMAGEM REAL · GALÁXIA ESPIRAL BARRADA · HUBBLE · NASA" t="CADA UMA PRO SEU LADO" z={[1.25, 1.0]} />;
// a faixa da Via Láctea sumindo de um céu noturno (ilustração)
const FaixaNoite: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #050a18, #0a1428 70%, #000)'}}>
      <div style={{position: 'absolute', left: -200, top: 200, width: 2400, height: 260, transform: 'rotate(-18deg)', background: 'radial-gradient(ellipse, rgba(220,210,255,.55), rgba(220,210,255,0) 70%)', opacity: interpolate(f, [20, 120], [1, 0], clamp), filter: 'blur(10px)'}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><path d="M0 930 L300 880 L520 910 L760 860 L1000 905 L1300 870 L1560 915 L1920 880 V1080 H0 Z" fill="#000" /></svg>
      <Tit t="A VIA LÁCTEA DEIXA DE EXISTIR" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};

// ---------- T−3 meses ----------
// rastros de estrelas acelerando
const Rastros: React.FC = () => {
  const f = useCurrentFrame();
  const a = f * f * 0.0009;
  return (
    <AbsoluteFill style={{background: '#02040c'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 90}, (_, i) => { const r = 40 + random('rr' + i) * 900, a0 = random('ra0' + i) * Math.PI * 2;
          const x1 = 960 + Math.cos(a0) * r, y1 = 1000 + Math.sin(a0) * r, x2 = 960 + Math.cos(a0 + a) * r, y2 = 1000 + Math.sin(a0 + a) * r;
          return <path key={i} d={`M${x1} ${y1} A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x2} ${y2}`} fill="none" stroke="#dfe8ff" strokeWidth={2} opacity={0.7} />; })}
      </svg>
      <Tit t="O TEMPO ACELERA" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// o Sistema Solar inteiro com órbitas se abrindo
const Sistema: React.FC = () => {
  const f = useCurrentFrame();
  const k = 1 + interpolate(f, [10, 120], [0, 1.4], clamp);
  const rs = [90, 140, 200, 270, 380, 470];
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {rs.map((r, i) => <ellipse key={i} cx={960} cy={580} rx={r * k} ry={r * k * 0.38} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth={2} />)}
        {rs.map((r, i) => { const a = (f * 0.03) / (i + 1) + i; return <circle key={'p' + i} cx={960 + Math.cos(a) * r * k} cy={580 + Math.sin(a) * r * k * 0.38} r={8 + (i % 3) * 5} fill={['#aaa', '#e8c080', '#4a9ae8', '#d06040', '#e0b080', '#d8c8a0'][i]} />; })}
      </svg>
      <Bola x={960} y={580} r={50} bg={SOL} brilho="rgba(255,200,80,.6)" />
      <Tit t="O SISTEMA SOLAR SE DESFAZ" />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Solta: React.FC = () => <F src="nascer_terra.jpg" etq="IMAGEM REAL · A TERRA VISTA DA ÓRBITA DA LUA · LRO · NASA" t="E VAI EMBORA" z={[1.0, 1.25]} />;
const Significa: React.FC = () => <F src="black_marble.jpg" etq="IMAGEM REAL · A TERRA À NOITE · SUOMI NPP · NASA" t="PENSA NO QUE ISSO SIGNIFICA" z={[1.0, 1.1]} />;
// calendário perdendo as folhas
const Calendario: React.FC = () => {
  const f = useCurrentFrame();
  const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  return (
    <Fundo c="#1a1a1a">
      {meses.map((m, i) => { const sai = prog(f, 4 + i * 3, 20 + i * 3);
        return <div key={m} style={{position: 'absolute', left: 300 + (i % 6) * 230, top: 330 + Math.floor(i / 6) * 230, width: 200, height: 200, borderRadius: 16, background: '#f0ece0', color: '#222', fontFamily: FONTE, fontSize: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - sai, transform: `translateY(${sai * 300}px) rotate(${sai * (i % 2 ? 30 : -30)}deg)`}}>{m}</div>; })}
      <Tit t="O ANO DEIXA DE EXISTIR" />
      <Etq t="ILUSTRAÇÃO" />
    </Fundo>
  );
};
const Estacoes: React.FC = () => {
  const s = useSpring(10);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg, #3a1a04, #041a2a)'}}>
      <Bola x={600} y={560} r={150} bg={SOL} brilho="rgba(255,200,80,.6)" />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 60, 120].map((a) => <line key={a} x1={1320 + Math.cos((a * Math.PI) / 180) * 150} y1={560 + Math.sin((a * Math.PI) / 180) * 150} x2={1320 - Math.cos((a * Math.PI) / 180) * 150} y2={560 - Math.sin((a * Math.PI) / 180) * 150} stroke="#dff4ff" strokeWidth={22} strokeLinecap="round" />)}
      </svg>
      {[600, 1320].map((x) => <div key={x} style={{position: 'absolute', left: x - 220 * s, top: 548, width: 440 * s, height: 26, background: VERMELHO, transform: 'rotate(-35deg)', borderRadius: 13}} />)}
      <Tit t="SEM VERÃO · SEM INVERNO" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const SolMenor: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [0, 150], [260, 40], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0c1838 0%, #3a3a6a 55%, #c07040 80%)'}}>
      <Bola x={960} y={560} r={r * 0.6} bg={SOL} brilho="rgba(255,200,80,.7)" />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}><path d="M0 860 L260 820 L520 850 L800 800 L1100 845 L1400 810 L1700 850 L1920 825 V1080 H0 Z" fill="#0a0806" /></svg>
      <Tit t="O SOL FICA MENOR NO CÉU" />
      <Etq t="ILUSTRAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Frio: React.FC = () => <F src="gelo.jpg" etq="IMAGEM REAL · GELO NA GROENLÂNDIA · NASA" t="E O FRIO CHEGA" z={[1.0, 1.15]} filtro="saturate(.6) brightness(.9)" />;
const NenhumVivo: React.FC = () => <F src="aurora.jpg" etq="IMAGEM REAL · AURORA VISTA DA ESTAÇÃO ESPACIAL · NASA" t="NENHUM SER VIVO AGUENTARIA" z={[1.0, 1.1]} />;
const NemChegou: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: VERMELHO, opacity: 0.4 + 0.6 * Math.abs(Math.sin(f * 0.12)), letterSpacing: 8}}>T−0 · LÁ NA FRENTE</div>
      <Tit t="E O FIM AINDA NEM CHEGOU" cor={OURO} />
      <Etq t="CENÁRIO" />
    </AbsoluteFill>
  );
};

// ---------- T−30 min ----------
const NaoAguenta: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{transform: `translate(${(random('sx' + f) - 0.5) * 10}px, ${(random('sy' + f) - 0.5) * 10}px)`}}>
      <F src="iss_limbo.jpg" etq="IMAGEM REAL · A TERRA VISTA DA ESTAÇÃO ESPACIAL · NASA" t="A PRÓPRIA TERRA NÃO AGUENTA" z={[1.05, 1.15]} />
    </AbsoluteFill>
  );
};
const ForcaGravidade: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Fundo c="#1a0e0e">
      <Barra x={300} y={420} w={1100} h={70} p={0.55} cor={CIANO} rot="GRAVIDADE DA TERRA" val="" />
      <Barra x={300} y={680} w={1100} h={70} p={interpolate(f, [6, 120], [0.1, 1], clamp)} cor={VERMELHO} rot="FORÇA DO RASGO" val="" />
      <Tit t="O RASGO VENCE A GRAVIDADE" />
      <Etq t="ESQUEMA · HIPÓTESE" />
    </Fundo>
  );
};
const TerraEstilhaca: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill><Estilhaco src="terra.jpg" p={interpolate(f, [4, 60], [0, 0.9], {...clamp, easing: Easing.in(Easing.quad)})} cols={14} rows={8} fit="contain" /><Tit t="E A TERRA SE DESFAZ" /><Etq t="IMAGEM REAL (APOLLO 17 · NASA) + EFEITO" /></AbsoluteFill>;
};
const Chao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a0d18, #1a1410)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 26}, (_, i) => {
          const x = (i % 13) * 150, y = 720 + Math.floor(i / 13) * 170, up = f * (0.8 + random('cu' + i) * 2.2);
          return <path key={i} d={`M${x} ${y - up} l150 ${(random('c1' + i) - 0.5) * 30} l${(random('c2' + i) - 0.5) * 30} 160 l-150 ${(random('c3' + i) - 0.5) * 30} Z`} fill="#3a2c22" stroke="#fff" strokeWidth={3}
            transform={`rotate(${(random('cr' + i) - 0.5) * f * 0.4} ${x + 75} ${y - up + 80})`} style={{filter: 'drop-shadow(0 0 8px rgba(255,255,255,.6))'}} />;
        })}
      </svg>
      <Tit t="O CHÃO SE SOLTANDO" />
      <Etq t="IMAGINAÇÃO · SEM ESTUDO" />
    </AbsoluteFill>
  );
};
const Ar: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #000, #0c2a50)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 140}, (_, i) => { const x = random('ax' + i) * 1920, y = 1080 - ((random('ay' + i) * 1080 + f * (6 + random('av' + i) * 10)) % 1200);
          return <line key={i} x1={x} y1={y} x2={x} y2={y + 40} stroke="#9fd4ff" strokeWidth={3} opacity={0.5} />; })}
      </svg>
      <Tit t="O AR ESCAPANDO PRO ESPAÇO" />
      <Etq t="IMAGINAÇÃO · SEM ESTUDO" />
    </AbsoluteFill>
  );
};
// chiado de tela: ninguém sabe como seria
const Estatica: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#111'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: 0.5}}>
        <filter id="ch"><feTurbulence type="fractalNoise" baseFrequency={0.8} numOctaves={2} seed={f % 30} /></filter>
        <rect width="100%" height="100%" filter="url(#ch)" />
      </svg>
      <div style={{position: 'absolute', top: 440, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 110, color: '#fff', textShadow: '0 0 30px #000'}}>NINGUÉM SABE COMO SERIA</div>
    </AbsoluteFill>
  );
};
const Calculos: React.FC = () => {
  const f = useCurrentFrame();
  const contas = ['w = −1,5', 'ρ ∝ a³ᐟ²', 'a(t) → ∞', 't → t₀'];
  return (
    <AbsoluteFill style={{background: '#16261c'}}>
      {contas.map((c, i) => <div key={c} style={{position: 'absolute', left: 260 + (i % 2) * 760, top: 300 + Math.floor(i / 2) * 200, fontFamily: 'cursive', fontSize: 90, color: '#e8f0e8', opacity: prog(f, i * 6, i * 6 + 12)}}>{c}</div>)}
      <Sub y={760} s={56} cor={OURO} d={20}>NESSE CENÁRIO, ACONTECE</Sub>
      <Tit t="OS CÁLCULOS SÓ DIZEM" />
      <Etq t="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const Filme: React.FC = () => {
  const s = useSpring(14);
  return (
    <Fundo>
      <div style={{position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 80, alignItems: 'center', fontFamily: FONTE}}>
        <div style={{textAlign: 'center'}}><div style={{fontSize: 130, color: CIANO}}>4,5 BI</div><div style={{fontSize: 36, color: '#fff'}}>ANOS DE TERRA</div></div>
        <div style={{fontSize: 110, color: '#fff'}}>→</div>
        <div style={{textAlign: 'center', opacity: s}}><div style={{fontSize: 130, color: VERMELHO}}>&lt; 30 MIN</div><div style={{fontSize: 36, color: '#fff'}}>MENOS QUE UM FILME</div></div>
      </div>
      <Etq t="HIPÓTESE" />
    </Fundo>
  );
};
const Faltam30: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.max(0, 1800 - Math.floor(f / 3));
  return (
    <AbsoluteFill style={{background: '#0a0000'}}>
      <div style={{position: 'absolute', top: 330, width: '100%', textAlign: 'center', fontFamily: 'monospace', fontSize: 260, color: VERMELHO, textShadow: '0 0 40px #ff2020'}}>{`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`}</div>
      <Sub y={660} s={46}>E AINDA FALTAM 30 MINUTOS</Sub>
    </AbsoluteFill>
  );
};

// ---------- T−10⁻¹⁹ s ----------
const Instante: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Bola x={960} y={560} r={6 + f * 0.6} bg="radial-gradient(circle, #fff, rgba(255,255,255,0) 70%)" />
      <Tit t="O ÚLTIMO INSTANTE" />
    </AbsoluteFill>
  );
};
const DezMenos19: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(18, Math.floor(f / 2));
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', top: 380, width: '100%', textAlign: 'center', fontFamily: 'monospace', fontSize: 92, color: OURO, letterSpacing: 2}}>0,{'0'.repeat(n)}{n >= 18 ? '1' : ''} S</div>
      <Sub y={560} s={42} cor="#fff">UM DÉCIMO DE BILIONÉSIMO DE BILIONÉSIMO DE SEGUNDO</Sub>
      <Tit t="10⁻¹⁹ SEGUNDO" />
    </AbsoluteFill>
  );
};
// o átomo inteiro; quando a fala chega em "eles se desfazem", ele se rasga (uma cena só)
const [I_ATOMOS, I_DESFAZEM] = ancoras(W, ['aos seus atomos', 'eles se desfazem']);
const RASGA_EM = fr(W[I_DESFAZEM].t - W[I_ATOMOS].t);
const Atomo: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [RASGA_EM, RASGA_EM + 30], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const flash = interpolate(f, [RASGA_EM - 2, RASGA_EM + 2, RASGA_EM + 14], [0, 0.9, 0], clamp);
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #101a2e, ${NOITE} 70%)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 60, 120].map((r, i) => (
          <g key={i} transform={`translate(${960 + (i - 1) * 500 * p} ${560 + (i % 2 ? -1 : 1) * 260 * p}) rotate(${r + f * (p > 0 ? 3 : 0.6)})`} opacity={1 - p * 0.6}>
            <ellipse rx={360} ry={110} fill="none" stroke={CIANO} strokeWidth={4} />
            <circle cx={360 * Math.cos(f * 0.12 + i * 2)} cy={110 * Math.sin(f * 0.12 + i * 2)} r={16} fill="#cfefff" />
          </g>
        ))}
        {[-1, 1].map((d) => <circle key={d} cx={960 + d * (14 + 400 * p)} cy={560} r={44} fill={OURO} style={{filter: 'drop-shadow(0 0 20px #ffb030)'}} />)}
      </svg>
      <AbsoluteFill style={{background: '#fff', opacity: flash}} />
      <Tit t={f >= RASGA_EM ? 'ELES SE DESFAZEM' : 'AOS SEUS ÁTOMOS'} s={84} />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const Regua: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, 50], [0, 1], clamp);
  const K = 16000;   // px por nm
  return (
    <Fundo c="#0e1a1a">
      <div style={{position: 'absolute', left: 300, top: 430, width: 0.053 * K, height: 50, borderRadius: 10, background: 'rgba(76,201,240,.35)', border: `3px solid ${CIANO}`}} />
      <div style={{position: 'absolute', left: 300, top: 370, fontFamily: FONTE, fontSize: 32, color: CIANO}}>RAIO DO ÁTOMO DE HIDROGÊNIO ≈ 0,053 NM</div>
      <div style={{position: 'absolute', left: 300, top: 620, width: 0.03 * K * p, height: 50, borderRadius: 10, background: OURO}} />
      <div style={{position: 'absolute', left: 300, top: 690, fontFamily: FONTE, fontSize: 32, color: OURO}}>A LUZ EM 10⁻¹⁹ S ≈ 0,03 NM</div>
      <Tit t="MENOS QUE UM ÚNICO ÁTOMO" />
      <Etq t="CONTA" />
    </Fundo>
  );
};

// ---------- T−0 ----------
const TZero: React.FC = () => <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}><div style={{fontFamily: FONTE, fontSize: 300, color: '#fff'}}>T−0</div></AbsoluteFill>;
const Rasga: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d * 0.8], [0, 1.6], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Rachas p={p} esc={2.2} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [d * 0.6, d], [0, 1], clamp)}} />
    </AbsoluteFill>
  );
};
const Branco: React.FC = () => <AbsoluteFill style={{background: '#fff'}} />;
const Preto: React.FC = () => <AbsoluteFill style={{background: '#000'}} />;

// ---------- mas espera ----------
const Espera: React.FC = () => <F src="antenas.jpg" etq="IMAGEM REAL · GALÁXIAS ANTENAS · HUBBLE · NASA" t="MAS ESPERA…" z={[1.0, 1.08]} />;
const SoCenario: React.FC = () => <Card topo="TUDO ISSO É" meio="O CENÁRIO DE UM ESTUDO" rodape="E DEPENDE DE UM NÚMERO" cor={VERDE} />;
const UmNumero: React.FC = () => (
  <F src="m87.jpg" etq="IMAGEM REAL · GALÁXIA M87 · SPITZER · NASA" z={[1.0, 1.1]} veu="rgba(0,0,0,.5)">
    <div style={{position: 'absolute', top: 260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 300, color: OURO}}>w</div>
    <Sub y={640} s={44} cor="#fff">A FORÇA COM QUE A ENERGIA ESCURA EMPURRA</Sub>
  </F>
);
// mostrador do w com a zona fantasma
const Mostrador: React.FC = () => {
  const f = useCurrentFrame();
  const ang = interpolate(f, [6, 50], [20, -55], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Fundo c="#1a1020">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M560 760 A400 400 0 0 1 960 360" stroke={VERMELHO} strokeWidth={40} fill="none" opacity={0.8} />
        <path d="M960 360 A400 400 0 0 1 1360 760" stroke={CIANO} strokeWidth={40} fill="none" opacity={0.6} />
        <line x1={960} y1={760} x2={960 + Math.sin((ang * Math.PI) / 180) * 360} y2={760 - Math.cos((ang * Math.PI) / 180) * 360} stroke="#fff" strokeWidth={12} strokeLinecap="round" />
        <circle cx={960} cy={760} r={24} fill="#fff" />
      </svg>
      <div style={{position: 'absolute', left: 430, top: 800, fontFamily: FONTE, fontSize: 32, color: VERMELHO}}>w &lt; −1 · FANTASMA</div>
      <div style={{position: 'absolute', left: 1260, top: 800, fontFamily: FONTE, fontSize: 32, color: CIANO}}>w &gt; −1</div>
      <Tit t="PRA EXISTIR BIG RIP: w MENOR QUE −1" s={70} />
      <Etq t="ESQUEMA" />
    </Fundo>
  );
};
const NaoBate: React.FC = () => {
  const s = useSpring(8);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg, #1a0e2a, #0a1a12)'}}>
      <div style={{position: 'absolute', left: 300, top: 380, fontFamily: FONTE, fontSize: 170, color: ROXO}}>−1,5</div>
      <div style={{position: 'absolute', left: 860, top: 380, fontFamily: FONTE, fontSize: 170, color: '#fff', opacity: s}}>≠</div>
      <div style={{position: 'absolute', left: 1160, top: 380, fontFamily: FONTE, fontSize: 170, color: VERDE}}>≈ −1</div>
      <Sub y={640} s={40}>CENÁRIO × MEDIDO</Sub>
      <Tit t="O NÚMERO NÃO BATE" />
    </AbsoluteFill>
  );
};
const Planck: React.FC = () => (
  <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
    <Img src={img('planck.jpg')} style={{width: 1500, marginTop: 80}} />
    <Tit t="PLANCK: ENERGIA ESCURA CONSTANTE" s={72} />
    <Etq t="IMAGEM REAL · PLANCK · ESA/NASA" real />
  </AbsoluteFill>
);
// régua do w: cenário −1,5 × Planck ≈ −1
const MuitoLonge: React.FC = () => {
  const f = useCurrentFrame();
  const X = (w: number) => 260 + ((w + 1.8) / 1.2) * 1400;
  const s1 = spring({frame: f - 4, fps: FPS, config: {damping: 12}}), s2 = spring({frame: f - 14, fps: FPS, config: {damping: 12}});
  return (
    <Fundo c="#0e1a26">
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={X(-1.8)} y1={540} x2={X(-0.6)} y2={540} stroke="#cfd8e8" strokeWidth={6} />
        <circle cx={X(-1.5)} cy={540} r={22 * s1} fill={ROXO} />
        <rect x={X(-1.06)} y={515} width={X(-1) - X(-1.06) + 8} height={50} rx={10} fill={VERDE} opacity={s2} />
        <line x1={X(-1.5)} y1={620} x2={X(-1.03)} y2={620} stroke={OURO} strokeWidth={4} strokeDasharray="12 10" opacity={s2} />
      </svg>
      <div style={{position: 'absolute', left: X(-1.5) - 160, width: 320, top: 440, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: ROXO}}>CENÁRIO: −1,5</div>
      <div style={{position: 'absolute', left: X(-1) - 160, width: 320, top: 440, textAlign: 'center', fontFamily: FONTE, fontSize: 32, color: VERDE, opacity: s2}}>PLANCK: w ≈ −1</div>
      <Tit t="MUITO LONGE DO CENÁRIO FANTASMA" s={72} />
      <Etq t="ESQUEMA" />
    </Fundo>
  );
};
const Constante: React.FC = () => <F src="par_espirais.jpg" etq="IMAGEM REAL · PAR DE GALÁXIAS · HUBBLE · NASA" t="AS DISTANTES SOMEM DO CÉU, SIM" z={[1.3, 0.95]} />;
const Inteiros: React.FC = () => <F src="epic.jpg" etq="IMAGEM REAL · A TERRA · DSCOVR · NASA" t="CONTINUAM INTEIROS" z={[1.0, 1.1]} fit="contain" />;
// mapa 3D do DESI (ilustração)
const Desi: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: NOITE}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 1400}, (_, i) => {
          const r = random('dr' + i) ** 0.6, a = -0.6 + random('da' + i) * 1.2 + Math.sin(r * 30 + i) * 0.02;
          if (r > interpolate(f, [0, 60], [0.05, 1], clamp)) return null;
          return <circle key={i} cx={260 + Math.cos(a) * r * 1450} cy={560 + Math.sin(a) * r * 1450 * 0.55} r={1.6} fill={r > 0.6 ? '#ff9a6a' : r > 0.3 ? '#ffe08a' : '#9fd4ff'} opacity={0.8} />;
        })}
        <circle cx={260} cy={560} r={10} fill={CIANO} />
      </svg>
      <Tit t="DESI · O MAIOR MAPA 3D DO UNIVERSO" s={72} />
      <Etq t="ILUSTRAÇÃO DE UM MAPA 3D" />
    </AbsoluteFill>
  );
};
// tendência: força ao longo do tempo, caindo (DESI)
const Tendencia: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 60, Easing.linear);
  const pts = Array.from({length: 50}, (_, i) => { const u = (i / 49) * p; return `${360 + u * 1200},${420 + 260 * u ** 1.6}`; }).join(' ');
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #06141e, #020608)'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M360 260 V820 H1600" stroke="#5a6478" strokeWidth={5} fill="none" />
        <line x1={360} y1={420} x2={1560} y2={420} stroke="#5a6478" strokeWidth={3} strokeDasharray="10 10" />
        <polyline points={pts} fill="none" stroke={CIANO} strokeWidth={10} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', left: 1180, top: 370, fontFamily: FONTE, fontSize: 26, color: '#8a96aa'}}>CONSTANTE</div>
      <div style={{position: 'absolute', left: 120, top: 250, width: 220, fontFamily: FONTE, fontSize: 26, color: '#8a96aa', lineHeight: 1.2}}>FORÇA DA ENERGIA ESCURA</div>
      <Tit t="DESI: PODE ESTAR FICANDO MAIS FRACA" s={72} />
      <Etq t="ESQUEMA · NÃO CONFIRMADO" />
    </AbsoluteFill>
  );
};
const NaoConfirmado: React.FC = () => {
  const f = useCurrentFrame();
  const c = spring({frame: f - 6, fps: FPS, config: {damping: 9, mass: 0.7}});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a1a24, #020608 70%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '20px 60px', border: `12px solid ${CIANO}`, borderRadius: 20, fontFamily: FONTE, fontSize: 130, color: CIANO, transform: `rotate(-8deg) scale(${interpolate(c, [0, 1], [2.2, 1])})`, opacity: c}}>NÃO CONFIRMADO</div>
      <Sub y={760} s={42} cor="#fff">RESULTADOS COMPLETOS EM 2027</Sub>
    </AbsoluteFill>
  );
};
const FimFrio: React.FC = () => <F src="eliptica.jpg" etq="IMAGEM REAL · GALÁXIA ELÍPTICA · HUBBLE · NASA" t="UM FIM FRIO E LENTO" z={[1.0, 1.1]} filtro="brightness(.8)"><Sub y={250} s={42} cor={OURO}>ESTRELAS APAGANDO POR TRILHÕES DE ANOS</Sub></F>;
const Encolher: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 90], [1.6, 0.25], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a0c0c, #0a0202 70%)'}}>
      <Galaxias sem="crunch" k={k} n={50} />
      <Bola x={960} y={540} r={40 + (1.6 - k) * 90} bg="radial-gradient(circle, #fff6e0, rgba(255,140,60,.6) 40%, rgba(255,80,30,0) 70%)" />
      <Tit t="OU VOLTAR A ENCOLHER" />
      <Etq t="ANIMAÇÃO · HIPÓTESE" />
    </AbsoluteFill>
  );
};
const NaoRasgo: React.FC = () => (
  <F src="de_lado.jpg" etq="IMAGEM REAL · GALÁXIA DE LADO · HUBBLE · NASA" z={[1.0, 1.12]}>
    <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: VERDE, textShadow: '0 10px 40px #000'}}>NÃO UM RASGO</div>
  </F>
);
const NaoDescarta: React.FC = () => <F src="espiral2.jpg" etq="IMAGEM REAL · GALÁXIA ESPIRAL · HUBBLE · NASA" t="NINGUÉM CONSEGUE DESCARTAR DE VEZ" z={[1.1, 1.0]} s={70} />;
// escudo em volta das órbitas: o mínimo que o Sistema Solar garante
// selo de "garantia mínima" (ilustração)
const Garantia: React.FC = () => {
  const f = useCurrentFrame();
  const s2 = useSpring(6, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a2418, #020806 70%)'}}>
      <div style={{position: 'absolute', left: 960 - 220, top: 280, width: 440, height: 440, borderRadius: '50%', border: `14px dashed ${VERDE}`, transform: `rotate(${f * 0.6}deg) scale(${s2})`}} />
      <div style={{position: 'absolute', left: 960 - 170, top: 330, width: 340, height: 340, borderRadius: '50%', background: 'rgba(61,220,132,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        fontFamily: FONTE, fontSize: 44, color: VERDE, lineHeight: 1.1, transform: `scale(${s2})`}}>GARANTIA<br />MÍNIMA</div>
      <Tit t="O MÍNIMO QUE O SISTEMA SOLAR GARANTE" s={70} />
      <Sub y={800} s={36} cor={ROXO}>MAIO DE 2026 · SCHERRER E TRIVEDI</Sub>
      <Etq t="ILUSTRAÇÃO · PRÉ-PUBLICAÇÃO" />
    </AbsoluteFill>
  );
};
const Estranha: React.FC = () => <F src="espiral.jpg" etq="IMAGEM REAL · GALÁXIA ESPIRAL · HUBBLE · NASA" t="EXIGIRIA UMA FÍSICA MUITO ESTRANHA" z={[1.0, 1.2]} filtro="hue-rotate(250deg) saturate(1.3)" s={72} />;
const NaoRevisado: React.FC = () => {
  const f = useCurrentFrame();
  const itens: [string, boolean][] = [['ESCRITO', true], ['PUBLICADO COMO PRÉ-PUBLICAÇÃO', true], ['REVISADO POR OUTROS CIENTISTAS', false]];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #10202a, #05080c)'}}>
      {itens.map(([t, ok], i) => {
        const s = spring({frame: f - 4 - i * 10, fps: FPS, config: {damping: 12}});
        return <div key={t} style={{position: 'absolute', left: 420, top: 360 + i * 140, display: 'flex', alignItems: 'center', gap: 40, opacity: s, fontFamily: FONTE, fontSize: 52, color: ok ? '#fff' : OURO}}>
          <div style={{width: 80, height: 80, borderRadius: 14, border: `6px solid ${ok ? VERDE : OURO}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: VERDE, fontSize: 60}}>{ok ? '✓' : ''}</div>{t}</div>;
      })}
      <Tit t="AINDA NÃO REVISADO" cor={OURO} />
      <Etq t="ESQUEMA" />
    </AbsoluteFill>
  );
};
const TresMeses: React.FC = () => <F src="orion.jpg" etq="IMAGEM REAL · TERRA E LUA VISTAS DA ORION · NASA" t="NINGUÉM SOBREVIVERIA NEM 3 MESES" z={[1.0, 1.1]} s={72} />;
const Medindo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <F src="andromeda.jpg" etq="IMAGEM REAL · ANDRÔMEDA · GALEX · NASA" z={[1.0, 1.15]} veu="rgba(0,0,0,.45)">
      <div style={{position: 'absolute', top: 400, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 160, color: OURO, opacity: 0.6 + 0.4 * Math.sin(f * 0.15)}}>w = ?</div>
      <Sub y={640} s={48} cor="#fff">UM NÚMERO QUE AINDA ESTAMOS MEDINDO</Sub>
    </F>
  );
};

const Fim: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 500, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 64, color: '#fff', opacity: s, letterSpacing: 6}}>LADO SOMBRIO DO UNIVERSO</div>
    </AbsoluteFill>
  );
};

// ---------- roteiro: frase-âncora → cena (cada cena aparece uma vez só) ----------
const PLANO: [string, React.FC][][] = [
  [['imagina que o universo', DataFim], ['e voce esta vivendo', Contagem], ['primeiro as galaxias', GalaxiasSomem], ['depois a via lactea', ViaSeDesfaz], ['tres meses antes do fim', TerraSoltaG],
    ['meia hora antes a propria', TerraRacha], ['e na ultima fracao', Particulas], ['esse fim tem nome', Nome], ['nao e ficcao', Estudo2003], ['a pergunta e se', ONosso]],
  [['hoje voce olha pro ceu', CeuCalmo], ['mas nao esta', NaoEsta], ['duas equipes de astronomos', Equipes], ['elas pareciam mais fracas', MaisFracas], ['estavam mais longe', MaisLonge],
    ['a conclusao foi um choque', Choque], ['ele esta se expandindo cada', Velocidade], ['a descoberta rendeu', Nobel], ['os cientistas chamam', EnergiaEscura], ['ninguem sabe o que', NinguemSabe],
    ['e ai vem a pergunta', Empurrao], ['se ficar existe um relogio', ORelogio], ['e no cenario de 2003', Ampulheta]],
  [['em 2003 tres fisicos', Fisicos], ['deram um nome assustador', Fantasma], ['normalmente quando o universo', Diluir], ['essa energia faria o contrario', Curvas], ['no cenario deles essa forca', Termometro],
    ['e num momento exato', Infinito], ['no exemplo que eles usaram', VinteBi], ['parece muito tempo', Escada], ['e cada capitulo e mais curto', Encolhendo]],
  [['faltando um bilhao de anos', Familias], ['os aglomerados que a gravidade', Coma], ['as galaxias vizinhas se afastam', Afastam], ['uma por uma', UmaPorUma], ['pra quem estiver vivo', DiaADia],
    ['mas o resto do universo', SomeDeVista], ['aquelas fotos do espaco', FotosHubble], ['viram coisa do passado', ViramPassado], ['se alguem estiver olhando', Observador]],
  [['depois chega a vez', NossaCasa], ['faltando sessenta milhoes', ViaDesfaz], ['as estrelas se soltam', Soltam], ['um outro calculo de 2004', Divergem], ['nem os proprios cientistas', Discordam],
    ['as centenas de bilhoes', Sozinhas], ['de um jeito ou de outro', FaixaNoite]],
  [['agora o tempo acelera', Rastros], ['faltando tres meses', Sistema], ['a terra se solta do sol e', Solta], ['pensa no que isso', Significa], ['o ano deixa de existir', Calendario],
    ['nao tem mais verao', Estacoes], ['o sol vai ficando menor', SolMenor], ['e o frio chega', Frio], ['nenhum ser vivo', NenhumVivo], ['e o fim ainda nem chegou', NemChegou]],
  [['meia hora antes do fim a propria', NaoAguenta], ['a forca que esta rasgando', ForcaGravidade], ['e a terra se desfaz', TerraEstilhaca], ['imagina o chao', Chao], ['o ar escapando', Ar],
    ['ninguem sabe exatamente', Estatica], ['os calculos so dizem', Calculos], ['um planeta que existiu', Filme], ['e ainda faltam trinta', Faltam30]],
  [['e entao chega o ultimo', Instante], ['faltando um decimo', DezMenos19], ['aos seus atomos', Atomo], ['pra ter uma ideia', Regua]],
  [['t menos zero', TZero], ['o proprio espaco se rasga', Rasga], ['e o tempo acaba', Branco], ['nao existe um depois', Preto]],
  [['mas espera', Espera], ['tudo isso e o cenario', SoCenario], ['e ele depende de um numero', UmNumero], ['pra existir big rip', Mostrador], ['quando a gente mede', NaoBate],
    ['o satelite planck', Planck], ['muito longe do cenario', MuitoLonge], ['e com uma energia constante', Constante], ['mas a via lactea o sol', Inteiros],
    ['e tem mais', Desi], ['viu sinais de que', Tendencia], ['ainda nao e uma descoberta', NaoConfirmado], ['mas se for isso', FimFrio], ['ou talvez ate um universo', Encolher],
    ['nao um rasgo', NaoRasgo], ['so que ninguem consegue', NaoDescarta], ['dois fisicos calcularam', Garantia], ['e mesmo isso exigiria', Estranha], ['o estudo ainda nao', NaoRevisado],
    ['ninguem sobreviveria', TresMeses], ['mas o que esse cenario', Medindo]],
];

const L = criarLongo({
  W, plano: PLANO, caps: CAPS, audio: 'bigrip/narracao.mp3', musica: 'bigrip/musica.mp3', volta: 9, fim: Fim,
  selos: [
    {texto: 'HIPÓTESE', de: 'primeiro as galaxias', ate: 'a pergunta e se', linha: 0},
    {texto: 'HIPÓTESE', de: 'e no cenario de 2003', ate: 'mas espera', linha: 0},
    {texto: 'FONTES DIVERGEM', de: 'faltando sessenta milhoes', ate: 'as centenas de bilhoes', linha: 1},
    {texto: 'IMAGINAÇÃO · SEM ESTUDO', de: 'imagina o chao', ate: 'ninguem sabe exatamente', linha: 1},
    {texto: 'NÃO CONFIRMADO', de: 'e tem mais', ate: 'so que ninguem consegue', linha: 0, cor: CIANO},
    {texto: 'PRÉ-PUBLICAÇÃO', de: 'dois fisicos calcularam', ate: 'ninguem sobreviveria', linha: 0, cor: ROXO},
  ],
  hits: [{frase: 'esse fim tem nome', off: 4, vol: 0.5}, {frase: 'e a terra se desfaz', off: 4}, {frase: 'aos seus atomos', off: RASGA_EM, vol: 0.5}, {frase: 't menos zero', off: 2, vol: 0.5}],
  mudo: {de: 'o proprio espaco se rasga', ate: 'mas espera'},
});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// ---------- thumbnail: Terra rachando com luz branca, galáxias esticadas ao fundo ----------
export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 70% 50%, #1a1036, #030208 70%)', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 60}, (_, i) => {
        const x = random('tx' + i) * 1920, y = random('ty' + i) * 1080, a = (Math.atan2(y - 540, x - 1250) * 180) / Math.PI;
        return <ellipse key={i} cx={x} cy={y} rx={40 + random('tr' + i) * 70} ry={4 + random('th' + i) * 6} fill={random('tc' + i) > 0.5 ? '#ffd8a0' : '#b8c8ff'} opacity={0.7} transform={`rotate(${a} ${x} ${y})`} style={{filter: 'blur(2px)'}} />;
      })}
    </svg>
    <div style={{position: 'absolute', left: 1250 - 520, top: 540 - 520, width: 1040, height: 1040, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,235,255,.45) 50%, rgba(220,235,255,0) 70%)'}} />
    <TerraFoto x={1250} y={540} R={400} filtro="contrast(1.2) brightness(.7)" />
    <Rachas p={0.85} cx={1250} cy={540} esc={0.9} />
    <Rachas p={0.85} cx={1250} cy={540} esc={0.9} />
    <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.35) 35%, rgba(0,0,0,0) 60%)'}} />
    <div style={{position: 'absolute', left: 70, top: 330, fontFamily: FONTE, fontSize: 210, lineHeight: 0.92, letterSpacing: -5, color: '#fff', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 14px 40px rgba(0,0,0,.9)'}}>
      T−30<br /><span style={{color: OURO}}>MIN</span>
    </div>
    <div style={{position: 'absolute', left: 80, top: 210, padding: '10px 26px', borderRadius: 14, border: `4px solid ${ROXO}`, background: 'rgba(0,0,0,.6)', fontFamily: FONTE, fontSize: 44, color: ROXO, letterSpacing: 4}}>CENÁRIO</div>
  </AbsoluteFill>
);
const TerraFoto: React.FC<{x: number; y: number; R: number; filtro?: string}> = ({x, y, R, filtro}) => {
  const E = (2 * R) / 0.666;   // o disco ocupa 66,6% da foto da Apollo 17
  return <Img src={img('terra.jpg')} style={{position: 'absolute', left: x - E * 0.501, top: y - E * 0.508, width: E, height: E, clipPath: `circle(${R}px at ${E * 0.501}px ${E * 0.508}px)`, filter: filtro}} />;
};
