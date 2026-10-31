// Short "2027 vai ser assim… 👀": um evento do céu por vez, corte seco, sem narração e sem música
// (o dono põe um som em alta no app). O último evento emenda no primeiro para o vídeo dar loop.
// Datas checadas pela Pesquisas em 31/10/2026 (fatos.md, "Céu de 2027"). Ordem cronológica.
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTE, OURO, fr} from '../comum';

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
const POR_EVENTO = fr(4);
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

const Cartao: React.FC<{e: Evento}> = ({e}) => {
  const f = useCurrentFrame();
  const {fps, durationInFrames: d} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 14, mass: 0.5}});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {/* imagem no centro, entre a faixa e os textos */}
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, height: 760, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, transform: `scale(${interpolate(f, [0, d], [1.12, 1.02])})`}}>
          {e.img ? <Img src={staticFile(e.img)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : e.ilus && <e.ilus />}
        </div>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, #000)'}} />
        <div style={{position: 'absolute', top: 22, left: 26, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,0,0,.6)',
          color: '#cfd8e8', fontFamily: FONTE, fontSize: 24, letterSpacing: 3}}>{e.tipo}</div>
      </div>
      <div style={{position: 'absolute', top: 1190, width: '100%', textAlign: 'center', fontFamily: FONTE, padding: '0 50px', boxSizing: 'border-box'}}>
        <div style={{fontSize: 100, color: '#fff', fontStyle: 'italic', letterSpacing: -3, lineHeight: 1, whiteSpace: 'nowrap',
          transform: `scale(${1.25 - 0.25 * s})`, textShadow: '0 8px 40px rgba(0,0,0,.8)'}}>{e.data}</div>
        <div style={{marginTop: 34, fontSize: 64, color: OURO, lineHeight: 1.1, opacity: s, textWrap: 'balance'} as React.CSSProperties}>{e.nome}</div>
        <div style={{marginTop: 20, fontSize: 84, fontFamily: EMOJI}}>☠️</div>
        {e.aviso && <div style={{marginTop: 12, display: 'inline-block', padding: '6px 18px', borderRadius: 20, background: 'rgba(255,255,255,.12)',
          color: '#cfd8e8', fontSize: 28, letterSpacing: 3}}>{e.aviso}</div>}
        {e.alerta && <div style={{marginTop: 14, color: '#8a93a6', fontSize: 24, letterSpacing: 1}}>{e.alerta}</div>}
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {EVENTOS.map((e, i) => (
      <Sequence key={i} from={i * POR_EVENTO} durationInFrames={POR_EVENTO}><Cartao e={e} /></Sequence>
    ))}
    <Faixa />
  </AbsoluteFill>
);
