// Short S4 "Se ESSA estrela chegasse perto, seu cartão de crédito seria APAGADO". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Fatos: até 10^15 gauss; NASA: magnetar a ~metade da distância da Lua apagaria cartões; cartão comum ~150 mil km e resistente ~63 mil km (cálculo da Pesquisas);
// XTE J1810-197 a ~8.100 anos-luz (OzGrav); ~1.000× uma estrela de nêutrons comum. Sem efeitos no corpo humano e sem SGR 1806-20.
// Ilustrações NASA: magnetar perdendo massa (PIA26274, NASA/JPL-Caltech), pulsar (PIA21085, NASA). Real: Lua nascendo em Washington (201202070005HQ, NASA/Bill Ingalls).
// Cartão e carteira são ilustração própria.
import React from 'react';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './magnetar.palavras.json';

const W = palavras as Palavra[];

// cartão de crédito ilustrado com a tarja magnética "se apagando"
const CartaoSvg: React.FC<{apaga: number; x?: number; y?: number; s?: number; rot?: number}> = ({apaga, x = 540, y = 980, s = 1, rot = -8}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-400} y={-250} width={800} height={500} rx={44} fill="#1a2c5a" stroke="#8fb0ff" strokeWidth={6} />
    <rect x={-400} y={-250} width={800} height={500} rx={44} fill="url(#brilhoCartao)" />
    <rect x={-400} y={-160} width={800} height={110} fill="#111" />
    {Array.from({length: 40}, (_, i) => random('tj' + i) < apaga
      ? <rect key={i} x={-400 + i * 20} y={-160 + random('ty' + i) * 80} width={20} height={30} fill={random('tc' + i) > 0.5 ? '#ff2a6a' : '#2affd0'} opacity={0.8} />
      : null)}
    <rect x={-320} y={10} width={110} height={84} rx={12} fill="#d8b860" />
    <text x={-320} y={180} fontFamily={FONTE} fontSize={52} fill="#e8eeff" letterSpacing={6}>•••• •••• •••• 4321</text>
  </g>
);
const Cartao: React.FC = () => {
  const f = useCurrentFrame();
  const apaga = interpolate(f, [8, 40], [0, 1], clamp);
  return (
    <K.Fundo cor="#2a1040">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><linearGradient id="brilhoCartao" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity={0} /><stop offset={0.5} stopColor="#fff" stopOpacity={0.18} /><stop offset="1" stopColor="#fff" stopOpacity={0} /></linearGradient></defs>
        <g transform={`translate(${(random('sx' + f) - 0.5) * 14 * apaga} 0)`}><CartaoSvg apaga={apaga} s={interpolate(f, [0, 12], [1.25, 1], clamp)} /></g>
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff', lineHeight: 1.05}}>SEU CARTÃO<br /><span style={{color: K.VERMELHO}}>APAGADO</span></div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </K.Fundo>
  );
};
// fim: carteira fechada, a salvo
const Carteira: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 14], [0.6, 1], clamp);
  return (
    <K.Fundo cor="#14261a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 980) scale(${s})`}>
          <rect x={-380} y={-240} width={760} height={480} rx={50} fill="#6a3e1e" stroke="#2a1608" strokeWidth={10} />
          <rect x={-380} y={-240} width={760} height={120} rx={40} fill="#7e4a24" />
          <rect x={120} y={-60} width={260} height={130} rx={30} fill="#5a3216" stroke="#2a1608" strokeWidth={8} />
          <circle cx={300} cy={5} r={22} fill="#d8b860" />
          <path d="M -340 200 L 340 200" stroke="#c8935a" strokeWidth={6} strokeDasharray="20 14" />
        </g>
        <g transform={`translate(540 1420) scale(${interpolate(f, [10, 22], [0, 1], clamp)})`}>
          <circle r={90} fill={K.VERDE} />
          <path d="M -40 0 L -10 32 L 46 -34" stroke="#fff" strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff', lineHeight: 1.05}}>SEUS CARTÕES<br /><span style={{color: K.VERDE}}>A SALVO</span></div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['a nasa diz', Cartao],
  ['meia distancia da lua', K.Orbita, {centro: {r: 90, cor: '#3a7ae0', cor2: '#0a2a60', nome: 'TERRA'}, sat: {r: 30, cor: '#e8f6ff', cor2: '#6ab0ff', brilho: '#7ad8ff', nome: 'MAGNETAR'}, raio: 220, t: 'NA METADE DA DISTÂNCIA DA LUA', elipse: 0.6, vel: 0.1}],
  ['os seus cartoes', K.Alerta, {texto: 'CARTÕES DE CRÉDITO APAGADOS', t: 'SEGUNDO A NASA'}],
  ['magnetar e o que', K.Selo, {texto: 'MAGNETAR', t: 'O QUE É?', cor: K.CIANO}],
  ['estrela gigante que', K.Explosao, {t: 'O QUE SOBRA', sub: 'DE UMA ESTRELA GIGANTE QUE EXPLODIU', cor: '#b0d8ff'}],
  ['uma bola do tamanho', K.Foto, {src: 'magnetar/magnetar.jpg', etq: 'ILUSTRAÇÃO · MAGNETAR · NASA/JPL-CALTECH', ilus: true, t: 'DO TAMANHO DE UMA CIDADE', caixa: '~20 KM', pos: '68% 70%', z: [1.0, 1.25]}],
  ['com o campo magnetico', K.Campo, {t: 'O CAMPO MAGNÉTICO MAIS FORTE', etq: 'ANIMAÇÃO · ATÉ 10¹⁵ GAUSS'}],
  ['ate mil vezes', K.Numero, {ate: 1000, pre: 'ATÉ ', suf: '×', t: 'MAIS FORTE', sub: 'QUE UMA ESTRELA DE NÊUTRONS COMUM', cor: K.CIANO}],
  ['estrela de neutrons comum', K.Foto, {src: 'magnetar/pulsar.jpg', etq: 'ILUSTRAÇÃO · PULSAR · NASA', ilus: true, t: 'ESTRELA DE NÊUTRONS COMUM', pos: '58% 50%', z: [1.1, 1.3]}],
  ['pelas contas', K.Terminal, {linhas: ['> cálculo: cartão comum', '> apagado a ~150.000 km'], t: 'PELAS CONTAS', etq: 'CÁLCULO'}],
  ['um cartao mais resistente', K.Regua, {marcas: [{v: 63000, label: 'RESISTENTE: ~63 MIL KM', cor: K.OURO}, {v: 150000, label: 'COMUM: ~150 MIL KM', cor: K.VERMELHO}], max: 400000, t: 'CARTÃO RESISTENTE', etq: 'DISTÂNCIA DO MAGNETAR · CÁLCULO'}],
  ['pra comparar', K.Foto, {src: 'magnetar/lua.jpg', etq: 'IMAGEM REAL · LUA · NASA/BILL INGALLS', t: 'LUA: ~400 MIL KM', pos: '0% 0%', z: [1.0, 1.08], ty: 760}],
  ['e um campo tao forte', K.Bussola, {t: 'MEXE COM QUALQUER ÍMÃ'}],
  ['num raio de milhares', K.Tunel, {t: 'MILHARES DE KM', sub: 'DE RAIO', cor: K.CIANO}],
  ['a boa noticia', K.Galaxia, {pino: {r: 200, a: 0.2, txt: 'XTE J1810-197'}, t: 'O MAIS PERTO CONHECIDO', etq: 'ILUSTRAÇÃO · VIA LÁCTEA'}],
  ['esta a uns oito', K.Carimbo, {base: '~8.100 ANOS-LUZ', carimbo: 'BEM LONGE', cor: K.VERDE}],
  ['os seus cartoes estao', Carteira],
];
const S = K.criarShort(W, PLANO, 'magnetar/narracao.mp3', 'magnetar e o que');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: a estrela azul em cima e o cartão com a tarja derretendo
export const Thumb: React.FC = () => (
  <K.Capa fundo="magnetar/magnetar.jpg" pos="68% 60%" texto="CARTÃO APAGADO" texto2="SE ELA CHEGAR PERTO">
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><linearGradient id="brilhoCartao" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity={0} /><stop offset={0.5} stopColor="#fff" stopOpacity={0.18} /><stop offset="1" stopColor="#fff" stopOpacity={0} /></linearGradient></defs>
      <CartaoSvg apaga={0.7} x={540} y={1000} s={0.95} rot={-12} />
      {Array.from({length: 7}, (_, i) => <path key={i} d={`M ${200 + i * 110} ${820} q 10 ${60 + (i % 3) * 30} 0 ${120 + (i % 3) * 50}`} stroke="#ff2a6a" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.85} />)}
    </svg>
  </K.Capa>
);
