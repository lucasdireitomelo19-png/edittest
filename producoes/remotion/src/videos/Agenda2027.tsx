// Short "2027 vai ser assim… 👀": um evento do céu por vez, corte seco, sem narração e sem música
// (o dono põe um som em alta no app). O último evento emenda no primeiro para o vídeo dar loop.
// PROVISÓRIO: as datas abaixo são de molde e só saem depois da lista checada da Pesquisas.
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONTE, OURO, fr} from '../comum';

type Evento = {
  data: string;          // "6 DE FEVEREIRO"
  nome: string;          // nome do evento (amarelo)
  img: string;           // arquivo em public/ (uma imagem diferente por evento)
  tipo: 'IMAGEM REAL' | 'ILUSTRAÇÃO' | 'SIMULAÇÃO';
  aviso?: string;        // rótulo de honestidade, ex.: "PARCIAL NO BRASIL"
};

// Cada imagem e cada evento aparecem uma vez só (regra do dono, 30/10).
const EVENTOS: Evento[] = [
  {data: 'DATA A CHECAR', nome: 'EVENTO 1 (PROVISÓRIO)', img: 'bigrip/nascer_sol_iss.jpg', tipo: 'IMAGEM REAL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 2 (PROVISÓRIO)', img: 'bigrip/orion.jpg', tipo: 'IMAGEM REAL', aviso: 'PARCIAL NO BRASIL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 3 (PROVISÓRIO)', img: 'bigrip/via_lactea2.jpg', tipo: 'IMAGEM REAL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 4 (PROVISÓRIO)', img: 'bigrip/terra.jpg', tipo: 'IMAGEM REAL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 5 (PROVISÓRIO)', img: 'bigrip/carina.jpg', tipo: 'IMAGEM REAL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 6 (PROVISÓRIO)', img: 'bigrip/andromeda.jpg', tipo: 'IMAGEM REAL'},
  {data: 'DATA A CHECAR', nome: 'EVENTO 7 (PROVISÓRIO)', img: 'bigrip/blue_marble.jpg', tipo: 'IMAGEM REAL'},
];
const POR_EVENTO = fr(3.5);
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
        <Img src={staticFile(e.img)} style={{width: '100%', height: '100%', objectFit: 'cover',
          transform: `scale(${interpolate(f, [0, d], [1.12, 1.02])})`}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 70%, #000)'}} />
        <div style={{position: 'absolute', top: 22, left: 26, padding: '6px 16px', borderRadius: 20, background: 'rgba(0,0,0,.6)',
          color: '#cfd8e8', fontFamily: FONTE, fontSize: 24, letterSpacing: 3}}>{e.tipo}</div>
      </div>
      <div style={{position: 'absolute', top: 1190, width: '100%', textAlign: 'center', fontFamily: FONTE, padding: '0 50px', boxSizing: 'border-box'}}>
        <div style={{fontSize: 118, color: '#fff', fontStyle: 'italic', letterSpacing: -3, lineHeight: 1,
          transform: `scale(${1.25 - 0.25 * s})`, textShadow: '0 8px 40px rgba(0,0,0,.8)'}}>{e.data}</div>
        <div style={{marginTop: 34, fontSize: 64, color: OURO, lineHeight: 1.1, opacity: s}}>{e.nome}</div>
        <div style={{marginTop: 20, fontSize: 84, fontFamily: EMOJI}}>☠️</div>
        {e.aviso && <div style={{marginTop: 12, display: 'inline-block', padding: '6px 18px', borderRadius: 20, background: 'rgba(255,255,255,.12)',
          color: '#cfd8e8', fontSize: 28, letterSpacing: 3}}>{e.aviso}</div>}
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
