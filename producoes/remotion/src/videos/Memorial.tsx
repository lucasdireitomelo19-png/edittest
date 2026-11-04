// Short S10 "Deixaram uma ESTÁTUA e 14 NOMES na Lua. Quase ninguém sabe por quê". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Reais (NASA, domínio público): placa e estatueta (AS15-88-11894), David Scott (AS15-88-11863), foto da família de Duke (AS16-117-18841, via LPI),
// Shepard (AS14-68-9414), Earthrise do LRO (NASA/GSFC/ASU). A placa com os nomes é ilustração (regra de 30/10: não recortar a foto real de novo).
// Gagarin sem retrato (sem licença confirmada): só o nome.
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './memorial.palavras.json';

const W = palavras as Palavra[];
const NOMES = ['CHARLES A. BASSETT II', 'PAVEL I. BELYAYEV', 'ROGER B. CHAFFEE', 'GEORGI DOBROVOLSKY', 'THEODORE C. FREEMAN', 'YURI A. GAGARIN', 'EDWARD G. GIVENS JR.',
  'VIRGIL I. GRISSOM', 'VLADIMIR KOMAROV', 'VIKTOR I. PATSAYEV', 'ELLIOT M. SEE JR.', 'VLADISLAV N. VOLKOV', 'EDWARD H. WHITE II', 'C. C. WILLIAMS JR.'];

// a estatueta em ilustração, de lado, deitada no chão lunar
const Estatueta: React.FC = () => {
  const f = useCurrentFrame();
  const luz = interpolate(f, [0, 40], [-200, 300], clamp);
  return (
    <K.Fundo cor="#202024">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><linearGradient id="al" x1="0" x2="1"><stop offset="0" stopColor="#7a7f88" /><stop offset={0.5} stopColor="#f0f4fa" /><stop offset="1" stopColor="#8a8f98" /></linearGradient></defs>
        <rect x={0} y={1080} width={1080} height={840} fill="#6a6a66" />
        <ellipse cx={560} cy={1090} rx={330} ry={26} fill="#000" opacity={0.5} />
        <g transform="translate(540 1040) rotate(-4)">
          <ellipse cx={-230} cy={-20} rx={60} ry={48} fill="url(#al)" />
          <rect x={-180} y={-60} width={260} height={90} rx={30} fill="url(#al)" />
          <rect x={60} y={-50} width={220} height={36} rx={18} fill="url(#al)" />
          <rect x={60} y={-6} width={210} height={36} rx={18} fill="url(#al)" />
          <rect x={-140} y={-90} width={160} height={30} rx={15} fill="url(#al)" transform="rotate(-20 -60 -75)" />
        </g>
        <rect x={luz} y={900} width={120} height={300} fill="#fff" opacity={0.15} transform="skewX(-20)" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: '#fff', lineHeight: 1.05}}>O ASTRONAUTA<br />CAÍDO</div>
      <K.Caixa texto="FALLEN ASTRONAUT" y={1300} size={58} cor={K.OURO} delay={10} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </K.Fundo>
  );
};
// a foto real da família de Duke, num quadro (o arquivo tem só 450 px)
const FotoFamilia: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 16], [0.7, 1], {...clamp});
  return (
    <K.Fundo cor="#2a2418">
      <div style={{position: 'absolute', left: 540, top: 900, width: 760, padding: '30px 30px 110px', background: '#f4efe4', transform: `translate(-50%,-50%) rotate(${-4 + f * 0.05}deg) scale(${s})`,
        boxShadow: '0 40px 90px rgba(0,0,0,.7)'}}>
        <Img src={staticFile('memorial/duke.jpg')} style={{width: '100%', display: 'block'}} />
      </div>
      <div style={{position: 'absolute', top: 290, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>CHARLIE DUKE<br /><span style={{color: K.OURO, fontSize: 54}}>APOLLO 16 · FOTO DA FAMÍLIA</span></div>
      <Etiqueta texto="IMAGEM REAL · NA LUA · NASA" real />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['na lua tem', K.Foto, {src: 'memorial/placa_real.jpg', etq: 'IMAGEM REAL · NA LUA · NASA/APOLLO 15', t: 'UMA ESTATUETA NA LUA', z: [1.0, 1.3], pos: '55% 45%'}],
  ['e do lado dela', K.Placa, {itens: NOMES, titulo: 'IN MEMORIAM', t: '14 NOMES', etq: 'ILUSTRAÇÃO DA PLACA'}],
  ['foi deixada em 1971', K.LinhaTempo, {marcos: [{ano: '1961', txt: 'GAGARIN NO ESPAÇO'}, {ano: '1967', txt: 'APOLLO 1 E SOYUZ 1', cor: K.VERMELHO}, {ano: '1971', txt: 'SOYUZ 11 · APOLLO 15', cor: K.CIANO}], t: '02/08/1971'}],
  ['pelo astronauta david', K.Foto, {src: 'memorial/scott.jpg', etq: 'IMAGEM REAL · APOLLO 15 · NASA', t: 'DAVID SCOTT', pos: '45% 50%'}],
  ['os nomes sao de', K.Tunel, {t: 'QUEM MORREU', sub: 'ASTRONAUTAS E COSMONAUTAS', cor: '#ffffff'}],
  ['oito americanos', K.Versus, {a: {t: '8 EUA', sub: 'ASTRONAUTAS', cor: K.CIANO}, b: {t: '6 URSS', sub: 'COSMONAUTAS', cor: K.VERMELHO}}],
  ['em plena guerra fria', K.Carimbo, {base: 'RIVAIS NA GUERRA FRIA', carimbo: 'LADO A LADO', cor: K.OURO}],
  ['estao la iuri', K.Selo, {texto: 'IURI\nGAGARIN', t: '1º HUMANO NO ESPAÇO', cor: K.VERMELHO}],
  ['vladimir komarov', K.Glitchy, {texto: 'VLADIMIR\nKOMAROV', size: 130}],
  ['os tres da apollo 1', K.Fila, {n: 3, cols: 3, cor: '#e8eef8', t: 'APOLLO 1', label: 'GRISSOM · WHITE · CHAFFEE'}],
  ['e os tres da soyuz', K.Ceu, {pinos: [{x: 260, y: 800, txt: 'DOBROVOLSKY'}, {x: 760, y: 700, txt: 'VOLKOV'}, {x: 560, y: 1100, txt: 'PATSAYEV'}], t: 'SOYUZ 11', etq: 'ILUSTRAÇÃO · MORRERAM NA VOLTA'}],
  ['a estatueta se chama', Estatueta],
  ['e nao foi a unica', K.Pergunta, {sub: 'O QUE MAIS FICOU LÁ?'}],
  ['charlie duke', FotoFamilia],
  ['alan shepard', K.Foto, {src: 'memorial/shepard.jpg', etq: 'IMAGEM REAL · APOLLO 14 · NASA', t: 'ALAN SHEPARD', caixa: '2 BOLAS DE GOLFE', pos: '30% 50%'}],
  ['sem vento e sem chuva', K.Foto, {src: 'memorial/horizonte_lro.jpg', etq: 'IMAGEM REAL · A TERRA VISTA DA LUA · NASA/LRO', t: 'SEM VENTO, SEM CHUVA', z: [1.6, 1.3], pos: '50% 70%'}],
  ['um memorial fora', K.Frase, {linhas: ['UM MEMORIAL', 'FORA DA TERRA']}],
  ['pra quem nunca', K.Astro, {cor: '#e8e8e2', cor2: '#3a3a38', brilho: '#ffffff', r: 300, t: 'PRA QUEM NUNCA VOLTOU', fundo: '#04060c'}],
];
const S = K.criarShort(W, PLANO, 'memorial/narracao.mp3', 'e nao foi a unica');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <K.Capa fundo="memorial/placa_real.jpg" texto="14 NOMES NA LUA" texto2="QUASE NINGUÉM SABE" circulo={[600, 860, 190]} pos="55% 45%" />
);
