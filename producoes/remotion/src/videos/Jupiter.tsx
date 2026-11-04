// Short S7 "E se JÚPITER estivesse no lugar da Lua? O céu ficaria ASSIM". Lote Linha dos campeões (roteiros/lote_2026-11-04_campeoes_shorts.md), aprovado em 04/11.
// Voz Brian (ElevenLabs). Não é POV. Reais: Lua cheia no Kennedy (NASA/KSC), Moonrise em Washington (NASA/HQ), Júpiter da Cassini (NASA/JPL), praia do KSC (NASA), Júpiter da Juno (NASA/JPL-Caltech/SwRI/MSSS).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE} from '../comum';
import * as K from '../lote/kit';
import palavras from './jupiter.palavras.json';

const W = palavras as Palavra[];
const LISTRAS = ['#a0643a', '#f0dcc0', '#c08050', '#e8d0b0', '#8a5030', '#f4e4cc', '#b07048', '#e0c8a8', '#a86a40'];

// o anel de destroços que NÃO se forma (riscado)
const SemAnel: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [16, 26], [0, 1], clamp);
  return (
    <K.Fundo cor="#1a1020">
      <K.Estrelas seed="anel" n={90} v={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={540} cy={900} rx={420} ry={110} fill="none" stroke="#c8b8a0" strokeWidth={34} strokeDasharray="4 10" opacity={0.8} />
        <K.Esfera x={540} y={900} r={210} cor="#e8c8a0" cor2="#5a3018" bandas={LISTRAS} id="sa" />
        <path d="M 120 890 A 420 110 0 0 0 960 890" fill="none" stroke="#c8b8a0" strokeWidth={34} strokeDasharray="4 10" opacity={0.8} />
        <line x1={260} y1={620} x2={260 + 560 * x} y2={620 + 560 * x} stroke={K.VERMELHO} strokeWidth={36} strokeLinecap="round" />
        <line x1={820} y1={620} x2={820 - 560 * x} y2={620 + 560 * x} stroke={K.VERMELHO} strokeWidth={36} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: '#fff'}}>SEM VIRAR ANEL</div>
      <K.Caixa texto="FORA DO LIMITE DE ROCHE" y={1300} size={56} cor={K.VERDE} delay={20} />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['a lua ocupa', K.Foto, {src: 'jupiter/lua_ksc.jpg', etq: 'IMAGEM REAL · LUA CHEIA · NASA/KSC', t: 'E SE FOSSE JÚPITER?', caixa: 'LUA: 0,5° NO CÉU', pos: '70% 50%', z: [1.25, 1.05]}],
  ['se jupiter estivesse', K.Montagem, {fundo: 'jupiter/cidade_lua.jpg', sobre: 'jupiter/jupiter_cassini.jpg', etq: 'MONTAGEM · ILUSTRAÇÃO', t: 'NO LUGAR DA LUA', posFundo: '60% 50%', r: 380}],
  ['ocuparia vinte', K.Tamanhos, {itens: [{r: 440, cor: '#e0a870', label: 'JÚPITER: 21°'}, {r: 22, cor: '#ffffff', label: ''}], t: '21° NO CÉU', etq: 'CÁLCULO · LUA = PONTINHO BRANCO'}],
  ['seriam quarenta', K.Fila, {n: 40, t: 'LADO A LADO', label: '≈ 40 LUAS'}],
  ['um planeta listrado', K.Astro, {cor: '#f0d8b8', cor2: '#6a3818', bandas: LISTRAS, r: 430, t: 'TOMANDO O CÉU', fundo: '#101828'}],
  ['mas tem um detalhe', K.Glitchy, {texto: 'MAS TEM UM\nDETALHE'}],
  ['jupiter e muito mais', K.Balanca, {esq: 'JÚPITER', dir: 'TERRA', pesoEsq: true, t: 'MUITO MAIS PESADO'}],
  ['entao nao seria', K.Carimbo, {base: 'JÚPITER GIRANDO EM VOLTA DA TERRA', carimbo: 'NÃO', cor: K.VERMELHO}],
  ['seria a terra girando', K.Orbita, {centro: {r: 190, cor: '#f0d8b8', cor2: '#6a3818', bandas: LISTRAS, nome: 'JÚPITER'}, sat: {r: 34, nome: 'TERRA'}, raio: 380, t: 'A TERRA EM VOLTA DELE', vel: 0.09}],
  ['uma volta a cada', K.Relogio, {t: '1 VOLTA', txt: '≈ 37 H (CÁLCULO)', vel: 30}],
  ['e as mares', K.Foto, {src: 'jupiter/mar.jpg', etq: 'IMAGEM REAL · PRAIA DO KENNEDY · NASA', t: 'E AS MARÉS?', pos: '50% 50%'}],
  ['pelas contas', K.Numero, {ate: 26000, suf: '×', t: 'FORÇA DE MARÉ', sub: 'MAIOR QUE A DA LUA · ESTIMATIVA', etq: 'CÁLCULO'}],
  ['ninguem sabe dizer', K.Pergunta, {t: 'NOS OCEANOS', sub: 'NINGUÉM SABE DIZER'}],
  ['mas nao seria nada', K.Mar, {t: 'NADA CALMO', forte: 2.4}],
  ['a boa noticia', K.Regua, {marcas: [{v: 109, label: 'LIMITE DE ROCHE ~109 MIL KM', cor: K.VERMELHO}, {v: 384, label: 'A TERRA: 384 MIL KM', cor: K.VERDE}], max: 400, t: 'LONGE O BASTANTE', etq: 'CÁLCULO'}],
  ['a gente nao viraria', SemAnel],
  ['claro e um', K.Selo, {texto: '"E SE"\nIMPOSSÍVEL', cor: K.CIANO}],
  ['jupiter esta a centenas', K.Foto, {src: 'jupiter/jupiter_juno.jpg', etq: 'IMAGEM REAL · JÚPITER · NASA/JUNO', t: 'CENTENAS DE MILHÕES DE KM', z: [1.3, 1.0]}],
  ['e e bom que', K.Frase, {linhas: ['E É BOM', 'QUE FIQUE', 'LÁ']}],
];
const S = K.criarShort(W, PLANO, 'jupiter/narracao.mp3', 'mas tem um detalhe');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <K.Capa fundo="jupiter/cidade_lua.jpg" texto="40× MAIOR" texto2="E SE FOSSE JÚPITER?" pos="60% 50%" seta={[300, 1120, -40]}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <K.Esfera x={600} y={640} r={430} cor="#f0d8b8" cor2="#6a3818" bandas={LISTRAS} brilho="#ffd8a0" id="th" rot={-12} />
      <circle cx={140} cy={1030} r={12} fill="#fff" style={{filter: 'drop-shadow(0 0 10px #fff)'}} />
    </svg>
  </K.Capa>
);
