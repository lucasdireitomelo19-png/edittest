// Short S5 "Esse asteroide tinha chance de ATINGIR A LUA. A NASA recalculou". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Cuidados: "recalculou" (é de 05/03/2026), nunca "vai bater". Terra 3,1% em 18/02/2025, descartado em 23/02/2025; Lua ~4,3% → descartado; passa a ~21.200 km em 22/12/2032.
// Reais (NASA, domínio público): Lua sobre o KSC (KSC-20170809-PH_KLS02_0009), espelhos do Webb (GSFC_20171208_Archive_e000355).
// Ilustração: telescópios infravermelhos da NASA (PIA25790, NASA/JPL-Caltech).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './yr4.palavras.json';

const W = palavras as Palavra[];

// gancho: a Lua real com um asteroide animado vindo na direção dela
const LuaAlvo: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 46], [0, 1], clamp);
  const x = interpolate(k, [0, 1], [-80, 470]), y = interpolate(k, [0, 1], [1700, 1060]);
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile('yr4/lua_ksc.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '63% 30%', transform: `scale(${interpolate(f, [0, 46], [1.6, 1.9])})`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={x} y1={y} x2={x - 260} y2={y + 300} stroke="#ffb070" strokeWidth={14} strokeLinecap="round" opacity={0.5} />
        <circle cx={x} cy={y} r={26} fill="#8a7a6a" stroke="#ffcf9a" strokeWidth={6} />
        <circle cx={540} cy={960} r={300 + 10 * Math.sin(f / 4)} fill="none" stroke={K.VERMELHO} strokeWidth={8} strokeDasharray="26 16" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff', lineHeight: 1.05, textShadow: '0 6px 24px #000'}}>IA BATER<br /><span style={{color: K.OURO}}>NA LUA?</span></div>
      <K.Caixa texto="MAIS DE 4% DE CHANCE" y={1500} size={60} cor={K.VERMELHO} delay={12} />
      <Etiqueta texto="IMAGEM REAL DA LUA · NASA · ASTEROIDE EM ANIMAÇÃO" real />
    </AbsoluteFill>
  );
};

const PLANO: K.Plano = [
  ['esse asteroide tinha', LuaAlvo],
  ['de chance de bater', K.Pizza, {pct: 4.3, t: 'MAIS DE 4%', txt: 'CHANCE NA LUA', cor: K.VERMELHO}],
  ['ate o telescopio webb', K.Foto, {src: 'yr4/espelhos.jpg', etq: 'IMAGEM REAL · ESPELHOS DO WEBB · NASA', t: 'ATÉ O WEBB OLHAR', z: [1.0, 1.2], pos: '45% 50%'}],
  ['o nome dele', K.Selo, {texto: '2024 YR4', t: 'O NOME DELE', cor: K.OURO}],
  ['uns sessenta metros', K.Barras, {itens: [{label: 'CRISTO REDENTOR', v: 38, txt: '38 M', cor: '#9aa4b8'}, {label: '2024 YR4', v: 60, txt: '~60 M', cor: K.OURO}], t: 'UNS 60 METROS', etq: 'COMPARAÇÃO DE TAMANHO'}],
  ['primeiro o susto', K.Alerta, {texto: 'O PRIMEIRO SUSTO'}],
  ['em fevereiro de 2025', K.Astro, {cor: '#3a7ae0', cor2: '#0a2a60', brilho: '#7ab8ff', r: 300, t: 'ALVO: A TERRA', caixa: 'FEVEREIRO DE 2025', fundo: '#04060c'}],
  ['chegou a tres', K.Numero, {ate: 3.1, dec: 1, suf: '%', t: 'CHANCE DE ATINGIR A TERRA', sub: '18/02/2025', cor: K.VERMELHO}],
  ['um recorde pro', K.Carimbo, {base: '3,1% PRA UM ASTEROIDE DESSE TAMANHO', carimbo: 'RECORDE', cor: K.VERMELHO, size: 110}],
  ['poucos dias depois', K.Curva, {pontos: [0.2, 0.5, 1.2, 1.8, 2.6, 3.1, 0.1, 0, 0], rotulos: [{i: 5, txt: '3,1%', cor: K.VERMELHO}, {i: 7, txt: '0%', cor: K.VERDE}], t: 'DESCARTADO', etq: 'GRÁFICO · CHANCE CONTRA A TERRA · ILUSTRAÇÃO', cor: K.VERMELHO, eixo: 'DEZ/2024 → 23/02/2025'}],
  ['mas ai sobrou', K.Glitchy, {texto: 'SOBROU\nA LUA', size: 150}],
  ['a chance de ele bater', K.Orbita, {centro: {r: 120, cor: '#d8d8d0', cor2: '#5a5a58', nome: 'LUA'}, sat: {r: 22, cor: '#b09a80', cor2: '#4a3a2a', nome: '2024 YR4'}, raio: 360, t: 'DEZEMBRO DE 2032', elipse: 0.45, vel: 0.09}],
  ['ficou em torno', K.Versus, {a: {t: 'TERRA', sub: 'DESCARTADO', cor: K.VERDE}, b: {t: 'LUA', sub: '~4,3%', cor: K.VERMELHO}}],
  ['e ele estava fraco', K.Ceu, {vazio: [600, 980], t: 'FRACO DEMAIS', etq: 'ILUSTRAÇÃO · QUASE INVISÍVEL DAQUI'}],
  ['sem o webb', K.LinhaTempo, {marcos: [{ano: '2026', txt: 'COM O WEBB', cor: K.VERDE}, {ano: '2028', txt: 'SEM O WEBB', cor: K.VERMELHO}], t: 'QUANDO SAIRIA A RESPOSTA'}],
  ['em fevereiro de 2026', K.Calendario, {bons: [1], t: 'WEBB OLHOU 2×', etq: '18 E 26/02/2026'}],
  ['e em marco', K.Terminal, {linhas: ['> NASA · 05/03/2026', '> 2024 YR4 × LUA', '> IMPACTO NA LUA: NÃO'], t: 'A NASA RECALCULOU'}],
  ['vai passar a uns', K.Regua, {marcas: [{v: 21200, label: 'YR4: ~21.200 KM', cor: K.OURO}, {v: 384400, label: 'TERRA: ~384 MIL KM', cor: K.CIANO}], max: 400000, t: 'PASSA PERTO', etq: 'DISTÂNCIA DA LUA · 22/12/2032 · CÁLCULO'}],
  ['foi por pouco', K.Foto, {src: 'yr4/infra.jpg', etq: 'ILUSTRAÇÃO · WEBB · NASA/JPL-CALTECH', ilus: true, t: 'FOI POR POUCO', caixa: 'UM TELESCÓPIO NO ESPAÇO RESOLVEU', pos: '84% 25%', z: [1.0, 1.15]}],
];
const S = K.criarShort(W, PLANO, 'yr4/narracao.mp3', 'mas ai sobrou');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: a Lua real, o asteroide vindo e o "4,3%" riscado
export const Thumb: React.FC = () => (
  <K.Capa fundo="yr4/lua_ksc.jpg" pos="63% 30%" texto="IA BATER NA LUA" texto2="A NASA RECALCULOU">
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <line x1={250} y1={880} x2={30} y2={1120} stroke="#ffb070" strokeWidth={22} strokeLinecap="round" opacity={0.6} />
      <circle cx={250} cy={880} r={44} fill="#8a7a6a" stroke="#ffcf9a" strokeWidth={8} />
      <text x={780} y={600} textAnchor="middle" fontFamily={FONTE} fontSize={170} fill={K.VERMELHO} stroke="#000" strokeWidth={10} paintOrder="stroke">4,3%</text>
      <line x1={560} y1={620} x2={1000} y2={480} stroke="#fff" strokeWidth={18} strokeLinecap="round" />
    </svg>
  </K.Capa>
);
