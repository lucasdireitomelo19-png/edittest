// Short S9 "O CARRO do Elon Musk está no espaço há 8 anos. Olha onde ele está AGORA". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Distância recalculada no JPL Horizons (alvo −143205) em 04/11/2026: 0,755 UA ≈ 113 milhões de km, afastando-se a ~9 km/s
// (o roteiro dizia 112, de 03/11). No dia de publicar, conferir de novo.
// Reais (NASA/KSC, 06/02/2018): decolagem e pouso dos propulsores do Falcon Heavy e Musk na coletiva; Terra (NASA Blue Marble); Marte (NASA/Viking).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './tesla.palavras.json';

const W = palavras as Palavra[];

// carro esportivo vermelho girando devagar no espaço
const Carro: React.FC<{x: number; y: number; s: number; rot: number}> = ({x, y, s, rot}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-260 30 L-250 -10 Q-200 -30 -120 -40 L-60 -90 Q0 -110 70 -90 L140 -40 Q230 -32 262 0 L265 30 Z" fill="#d81e2c" stroke="#5a0008" strokeWidth={6} />
    <path d="M-50 -82 L60 -84 L118 -42 L-100 -40 Z" fill="#1a2a3a" opacity={0.85} />
    <circle cx={-150} cy={36} r={42} fill="#111" stroke="#666" strokeWidth={8} />
    <circle cx={160} cy={36} r={42} fill="#111" stroke="#666" strokeWidth={8} />
    <rect x={-250} y={4} width={510} height={8} fill="#ff6070" opacity={0.6} />
  </g>
);
const NoEspaco: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <K.Fundo cor="#06101e">
      <K.Estrelas seed="car" n={200} v={0.4} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <K.Esfera x={540} y={2350} r={1000} cor="#5aa0ff" cor2="#04122a" brilho="#7ab8ff" id="tt" />
        <Carro x={540 + Math.sin(f / 30) * 30} y={880} s={1.5} rot={-8 + f * 0.6} />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff'}}>UM CARRO DE VERDADE</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['tem um carro', NoEspaco],
  ['dando voltas no sol', K.Orbita, {centro: {r: 120, cor: '#fff4b0', cor2: '#e86a10', brilho: '#ffb030', nome: 'SOL'}, sat: {r: 22, cor: '#ff3040', cor2: '#600010', nome: 'O CARRO'}, raio: 400, elipse: 0.7, t: 'DANDO VOLTAS NO SOL', vel: 0.08}],
  ['e ele esta a uns', K.Numero, {ate: 113, suf: ' MI KM', sub: 'DE VOCÊ · JPL, 04/11/2026', t: 'AGORA', etq: 'CÁLCULO · JPL HORIZONS'}],
  ['e o tesla roadster', K.Foto, {src: 'tesla/coletiva.jpg', etq: 'IMAGEM REAL · ELON MUSK, 06/02/2018 · NASA/KSC', t: 'O CARRO DO ELON MUSK', pos: '30% 50%'}],
  ['em fevereiro de 2018', K.Foto, {src: 'tesla/decolagem.jpg', etq: 'IMAGEM REAL · FALCON HEAVY · NASA/KSC', t: '06/02/2018', pos: '48% 50%', z: [1.0, 1.2]}],
  ['no primeiro voo', K.Foto, {src: 'tesla/pouso.jpg', etq: 'IMAGEM REAL · PROPULSORES VOLTANDO · NASA/KSC', t: '1º VOO DO FALCON HEAVY', pos: '40% 40%'}],
  ['musk disse que', K.Selo, {texto: '"ATÉ O CINTURÃO\nDE ASTEROIDES"', etq: 'O QUE MUSK DISSE', cor: K.CIANO}],
  ['nao foi', K.Carimbo, {base: 'CINTURÃO DE ASTEROIDES', carimbo: 'NÃO FOI', cor: K.VERMELHO}],
  ['ele vai no maximo', K.Foto, {src: 'tesla/marte.jpg', etq: 'IMAGEM REAL · MARTE · NASA/VIKING', t: 'ATÉ PERTO DE MARTE', caixa: 'PONTO MAIS LONGE: ~1,66 UA', z: [1.0, 1.15]}],
  ['uma volta completa', K.Relogio, {t: '1 VOLTA NO SOL', txt: '557 DIAS', vel: 40}],
  ['desde o lancamento', K.Pizza, {pct: 70, txt: '5,7', t: 'VOLTAS DESDE 2018', etq: 'CONTA · A 6ª VOLTA ESTÁ EM 70%', cor: K.OURO}],
  ['e agora ele esta se afastando', K.Foto, {src: 'tesla/terra.jpg', etq: 'IMAGEM REAL · TERRA · NASA', t: 'SE AFASTANDO DA TERRA', caixa: '~9 KM POR SEGUNDO', z: [1.3, 0.85]}],
  ['quando ele volta', K.Pergunta, {sub: 'QUANDO ELE VOLTA?'}],
  ['a proxima passagem', K.LinhaTempo, {marcos: [{ano: '2018', txt: 'LANÇAMENTO'}, {ano: '2026', txt: 'HOJE: SE AFASTANDO', cor: K.CIANO}, {ano: '2091', txt: 'PRÓXIMA PASSAGEM PERTO', cor: K.VERDE}], t: 'SÓ EM 2091'}],
  ['e existe uma chance', K.Alerta, {texto: '~6% DE CHANCE DE BATER NA TERRA', etq: 'ESTIMATIVA'}],
  ['em um milhao de anos', K.Tunel, {t: 'EM 1 MILHÃO DE ANOS', sub: 'REIN ET AL. · ESTIMATIVA'}],
  ['mas tem um detalhe', K.Glitchy, {texto: 'MAS TEM UM\nDETALHE'}],
  ['o carro nao manda', K.Ceu, {vazio: [540, 900], t: 'NENHUM SINAL', etq: 'ILUSTRAÇÃO · O CARRO NÃO TEM TRANSMISSOR'}],
  ['a posicao dele', K.Terminal, {linhas: ['> alvo: -143205', '> distância: 0,755 UA', '> fonte: CÁLCULO', '> medição direta: NENHUMA'], t: 'POSIÇÃO CALCULADA', etq: 'ILUSTRAÇÃO · DADOS DO JPL HORIZONS'}],
  ['ninguem esta medindo', K.Frase, {linhas: ['NINGUÉM', 'ESTÁ', 'MEDINDO']}],
];
const S = K.criarShort(W, PLANO, 'tesla/narracao.mp3', 'nao foi');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <K.Capa texto="ONDE ELE ESTÁ?" texto2="O CARRO DO MUSK NO ESPAÇO" seta={[620, 1110, 50]} circulo={[800, 1210, 70]}>
    <K.Fundo cor="#06101e">
      <K.Estrelas seed="tc" n={220} v={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <Carro x={470} y={720} s={1.7} rot={-14} />
        <circle cx={800} cy={1210} r={16} fill="#ff4050" style={{filter: 'drop-shadow(0 0 16px #ff4050)'}} />
      </svg>
    </K.Fundo>
  </K.Capa>
);
