// Short "2027 vai ser assim… 👀": um evento do céu por vez, corte seco, sem narração e sem música
// (o dono põe um som em alta no app). O último evento emenda no primeiro para o vídeo dar loop.
// Datas checadas pela Pesquisas em 31/10/2026 (fatos.md, "Céu de 2027"). Ordem cronológica.
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTE, OURO, fr, shake} from '../comum';

type Evento = {
  data: string;          // "6 DE FEVEREIRO"
  nome: string;          // nome do evento (amarelo)
  img?: string;          // arquivo em public/ (uma imagem diferente por evento)
  ilus?: React.FC;       // ou uma ilustração própria
  tipo: string;          // etiqueta honesta da imagem
  aviso?: string;        // rótulo de honestidade, ex.: "PARCIAL NO RESTO DO BRASIL"
  alerta?: string;       // aviso de segurança pequeno
};

// anel de fogo desenhado (não há foto de domínio público boa do anel)
const Anel: React.FC = () => {
  const f = useCurrentFrame();
  const g = 1 + 0.04 * Math.sin(f / 6);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #3a1404, #0a0302 60%)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', width: 640, height: 640, borderRadius: '50%', transform: `scale(${g})`,
        background: 'radial-gradient(circle, rgba(255,150,40,.55) 40%, rgba(255,90,20,.15) 60%, transparent 70%)'}} />
      <div style={{position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: '#ffd27a',
        boxShadow: '0 0 60px 20px #ff8a1e, 0 0 160px 60px rgba(255,90,20,.6)'}} />
      <div style={{position: 'absolute', width: 384, height: 384, borderRadius: '50%', background: '#050302'}} />
    </AbsoluteFill>
  );
};

// Cada imagem e cada evento aparecem uma vez só (regra do dono, 30/10).
const EVENTOS: Evento[] = [
  {data: '6 DE FEVEREIRO', nome: 'Anel de fogo no extremo sul', ilus: Anel, tipo: 'ILUSTRAÇÃO',
    aviso: 'PARCIAL NO RESTO DO BRASIL', alerta: 'Nunca olhe o Sol sem filtro ISO 12312-2'},
  {data: '10 DE FEVEREIRO', nome: 'Júpiter no auge do ano', img: 'agenda2027/jupiter.jpg', tipo: 'IMAGEM REAL · HUBBLE',
    aviso: 'VISÍVEL DE TODO O BRASIL'},
  {data: '19 DE FEVEREIRO', nome: 'Marte volta, mas longe', img: 'agenda2027/marte.jpg', tipo: 'IMAGEM REAL · HUBBLE',
    aviso: 'VISÍVEL DE TODO O BRASIL'},
  {data: '5 E 6 DE MAIO', nome: 'Estrelas cadentes sob Lua nova', img: 'agenda2027/meteoros.jpg', tipo: 'IMAGEM REAL · METEOROS DE 2021',
    aviso: 'DE MADRUGADA · MELHOR NO HEMISFÉRIO SUL'},
  {data: '2 DE AGOSTO', nome: 'Escuridão de 6 minutos no Egito', img: 'agenda2027/total.jpg', tipo: 'IMAGEM REAL · ECLIPSE DE 2017',
    aviso: 'NÃO VISÍVEL DO BRASIL'},
];
const POR_EVENTO = fr(2.6);
export const DURACAO = EVENTOS.length * POR_EVENTO;
const FAIXA = ['2027 vai ser assim… 👀', 'Marque na agenda ☠️'];
const EMOJI = 'Noto Color Emoji';

// faixa branca fixa no topo, texto preto em 2 linhas
const Faixa: React.FC = () => (
  <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 400, background: '#fff', display: 'flex', flexDirection: 'column',
    justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 46, boxSizing: 'border-box', fontFamily: `${FONTE}, ${EMOJI}`,
    color: '#000', fontSize: 70, lineHeight: 1.15, letterSpacing: -1, textAlign: 'center'}}>
    {FAIXA.map((l) => <div key={l}>{l}</div>)}
  </div>
);

// ---------- transições de edit (zoom de impacto, chicote, glitch RGB, giro, tremida) ----------
// Cada cartão entra com uma transição diferente e sai estourando em branco; o flash fica no Video.
const TRANS = ['zoom', 'chicote', 'glitch', 'giro', 'tremida'] as const;
const ENTRA = 10;    // frames da entrada
const SAI = 6;       // frames da saída
const ease = (t: number) => 1 - (1 - Math.min(Math.max(t, 0), 1)) ** 3;

// só o canal vermelho / só verde+azul, para o RGB split
const Filtros: React.FC = () => (
  <svg width={0} height={0} style={{position: 'absolute'}}>
    <filter id="soR"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" /></filter>
    <filter id="soGB"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" /></filter>
  </svg>
);

const Conteudo: React.FC<{e: Evento}> = ({e}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames: d} = useVideoConfig();
  const bate = spring({frame: f - 2, fps, config: {damping: 9, mass: 0.5}});      // data batendo
  const nome = spring({frame: f - 7, fps, config: {damping: 13, mass: 0.5}});
  const treme = f < 16 ? shake(f, 18 * (1 - f / 16), 'd' + e.data) : 'none';
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* imagem no centro, entre a faixa e os textos */}
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, height: 760, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, d], [1.22, 1.02])}) ${shake(f, 6, e.nome)}`}}>
          {e.img ? <Img src={staticFile(e.img)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : e.ilus && <e.ilus />}
        </div>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, #000)'}} />
        <div style={{position: 'absolute', top: 22, left: 26, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,0,0,.6)',
          color: '#cfd8e8', fontFamily: FONTE, fontSize: 24, letterSpacing: 3}}>{e.tipo}</div>
      </div>
      <div style={{position: 'absolute', top: 1190, width: '100%', textAlign: 'center', fontFamily: FONTE, padding: '0 50px', boxSizing: 'border-box'}}>
        <div style={{fontSize: 100, color: '#fff', fontStyle: 'italic', letterSpacing: -3, lineHeight: 1, whiteSpace: 'nowrap',
          transform: `${treme} scale(${2.2 - 1.2 * bate})`, opacity: Math.min(1, bate * 3), textShadow: '0 8px 40px rgba(0,0,0,.8)'}}>{e.data}</div>
        <div style={{marginTop: 34, fontSize: 64, color: OURO, lineHeight: 1.1, opacity: nome, transform: `translateY(${(1 - nome) * 80}px)`,
          textWrap: 'balance'} as React.CSSProperties}>{e.nome}</div>
        <div style={{marginTop: 20, fontSize: 84, fontFamily: EMOJI, transform: `scale(${spring({frame: f - 10, fps, config: {damping: 8}})}) rotate(${(1 - nome) * -30}deg)`}}>☠️</div>
        {e.aviso && <div style={{marginTop: 12, display: 'inline-block', padding: '6px 18px', borderRadius: 20, background: 'rgba(255,255,255,.12)',
          color: '#cfd8e8', fontSize: 28, letterSpacing: 3}}>{e.aviso}</div>}
        {e.alerta && <div style={{marginTop: 14, color: '#8a93a6', fontSize: 24, letterSpacing: 1}}>{e.alerta}</div>}
      </div>
    </AbsoluteFill>
  );
};

const Cartao: React.FC<{e: Evento; i: number}> = ({e, i}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const t = TRANS[i % TRANS.length];
  const en = 1 - ease(f / ENTRA);                       // 1 no corte, 0 depois da entrada
  const sx = Math.max(0, (f - (d - SAI)) / SAI) ** 2;   // 0 até a saída, 1 no último frame
  let tf = '', blur = 0, rgb = 0;
  if (t === 'zoom') { tf = `scale(${1 + 0.9 * en})`; blur = 16 * en; rgb = 30 * en; }
  if (t === 'chicote') { tf = `translateX(${1000 * en}px) skewX(${-14 * en}deg)`; blur = 24 * en; rgb = 20 * en; }
  if (t === 'glitch') { tf = f < 7 ? `translate(${(random('gx' + f) - 0.5) * 140}px, ${(random('gy' + f) - 0.5) * 60}px)` : ''; rgb = f < 7 ? 45 : 0; }
  if (t === 'giro') { tf = `rotate(${-28 * en}deg) scale(${1 + 0.6 * en})`; blur = 12 * en; rgb = 25 * en; }
  if (t === 'tremida') { tf = `scale(${1 + 0.35 * en}) ${shake(f, 70 * en, 'tr')}`; blur = 6 * en; rgb = 35 * en; }
  // soco no meio do cartão (sem respiro): zoom rápido + RGB + tremida
  const km = f - Math.round(d / 2);
  const mid = km >= 0 ? Math.exp(-km / 3) : 0;
  tf += ` scale(${1 + 0.4 * sx + 0.1 * mid}) ${mid > 0.05 ? shake(f, 22 * mid, 'm') : ''}`;
  rgb += 16 * mid;
  blur += 12 * sx; rgb += 30 * sx;
  const filtro = `blur(${blur.toFixed(1)}px) brightness(${1 + 1.6 * sx + 0.5 * en})`;
  return (
    <AbsoluteFill style={{background: '#000', transform: tf, filter: filtro}}>
      {rgb < 1 ? <Conteudo e={e} /> : (
        <>
          <AbsoluteFill style={{filter: 'url(#soGB)', transform: `translateX(${-rgb}px)`}}><Conteudo e={e} /></AbsoluteFill>
          <AbsoluteFill style={{filter: 'url(#soR)', transform: `translateX(${rgb}px)`, mixBlendMode: 'screen'}}><Conteudo e={e} /></AbsoluteFill>
        </>
      )}
      {t === 'glitch' && f < 7 && Array.from({length: 6}, (_, k) => (
        <div key={k} style={{position: 'absolute', left: 0, right: 0, top: random('st' + f + k) * 1920, height: 20 + random('sh' + k + f) * 90,
          background: k % 2 ? 'rgba(255,40,80,.4)' : 'rgba(0,230,255,.35)', transform: `translateX(${(random('sx' + k + f) - 0.5) * 300}px)`}} />
      ))}
    </AbsoluteFill>
  );
};

// flash branco em cada corte (inclusive no fim, que emenda no começo do loop)
const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const k = f % POR_EVENTO;
  const op = k < 3 ? [0.9, 0.4, 0.12][k] : k === POR_EVENTO - 1 ? 0.45 : 0;
  return <AbsoluteFill style={{background: '#fff', opacity: op, pointerEvents: 'none'}} />;
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <Filtros />
    {EVENTOS.map((e, i) => (
      <Sequence key={i} from={i * POR_EVENTO} durationInFrames={POR_EVENTO}><Cartao e={e} i={i} /></Sequence>
    ))}
    <Flash />
    <Faixa />
  </AbsoluteFill>
);
