// Short S8 "O SOL vai ENGOLIR a Terra? Um estudo novo diz que TALVEZ NÃO". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Fatos: Esseldeurs, Mathis e Decin (A&A, jun/2026): a Terra sobrevive, Mercúrio e Vênus são engolidos, resultado "depende criticamente" de maré e perda de massa.
// Schröder e Smith (2008): Terra engolida. Oceanos evaporados em ~1–2 bi de anos. Sempre "TALVEZ NÃO" (modelo, não fato).
// Reais: Sol (NASA/SDO, PIA26681) e Terra (NASA, Blue Marble). O resto é animação/ilustração.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './solterra.palavras.json';

const W = palavras as Palavra[];

const Terra: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 30}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#3a7ae0" stroke="#9fd0ff" strokeWidth={4} />
    <path d={`M ${x - r * 0.5} ${y - r * 0.2} q ${r * 0.3} ${-r * 0.5} ${r * 0.7} ${-r * 0.1} q ${r * 0.1} ${r * 0.5} ${-r * 0.4} ${r * 0.6} z`} fill="#3aa860" />
  </g>
);
// o Sol inchando até virar gigante vermelha, com a Terra perto
const Inchar: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 50], [0, 1], clamp);
  const r = interpolate(k, [0, 1], [90, 520]);
  const cor = `rgb(255, ${Math.round(interpolate(k, [0, 1], [220, 90]))}, ${Math.round(interpolate(k, [0, 1], [90, 40]))})`;
  return (
    <K.Fundo cor="#160808">
      <K.Estrelas seed="inch" n={120} v={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={360} cy={1000} r={r} fill={cor} style={{filter: `drop-shadow(0 0 60px ${cor})`}} />
        <Terra x={920} y={1000} r={26} />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: '#fff', lineHeight: 1.05}}>O SOL VAI<br /><span style={{color: K.LAVA}}>INCHAR</span></div>
      <Etiqueta texto="ANIMAÇÃO" />
    </K.Fundo>
  );
};
// versão 2008: a Terra puxada em espiral pra dentro do Sol
const Puxada: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 55], [0, 1], clamp);
  const ang = k * Math.PI * 3, raio = interpolate(k, [0, 1], [420, 200]);
  return (
    <K.Fundo cor="#200a06">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={220} fill="#ff5a2a" style={{filter: 'drop-shadow(0 0 70px #ff3a10)'}} />
        <path d={Array.from({length: 60}, (_, i) => { const kk = i / 59 * k; const a = kk * Math.PI * 3; const rr = interpolate(kk, [0, 1], [420, 200]); return `${i ? 'L' : 'M'} ${540 + Math.cos(a) * rr} ${1000 + Math.sin(a) * rr * 0.6}`; }).join(' ')} stroke="#9fd0ff" strokeWidth={4} fill="none" strokeDasharray="12 10" opacity={0.7} />
        {k < 0.98 && <Terra x={540 + Math.cos(ang) * raio} y={1000 + Math.sin(ang) * raio * 0.6} r={26} />}
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#fff', lineHeight: 1.05}}>PUXADA<br /><span style={{color: K.VERMELHO}}>PRA DENTRO</span></div>
      <K.Caixa texto="VERSÃO DE 2008" y={1420} size={56} cor={K.VERMELHO} delay={6} />
      <Etiqueta texto="ANIMAÇÃO · MODELO" />
    </K.Fundo>
  );
};
// versão 2026: a órbita da Terra se abre e ela escapa
const Escapa: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 60], [0, 1], clamp);
  const ang = f * 0.07, raio = interpolate(k, [0, 1], [300, 430]);
  return (
    <K.Fundo cor="#101a14">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={240} fill="#ff6a3a" style={{filter: 'drop-shadow(0 0 60px #ff4a10)'}} />
        <ellipse cx={540} cy={1000} rx={raio} ry={raio * 0.6} fill="none" stroke={K.VERDE} strokeWidth={4} strokeDasharray="14 10" />
        <Terra x={540 + Math.cos(ang) * raio} y={1000 + Math.sin(ang) * raio * 0.6} r={28} />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>A TERRA<br /><span style={{color: K.VERDE}}>PROVAVELMENTE ESCAPA</span></div>
      <K.Caixa texto="VERSÃO DE 2026" y={1420} size={56} cor={K.VERDE} delay={6} />
      <Etiqueta texto="ANIMAÇÃO · MODELO, NÃO FATO" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['durante anos', K.Foto, {src: 'solterra/sol_sdo.jpg', etq: 'IMAGEM REAL · O SOL · NASA/SDO', t: 'VAI ENGOLIR A TERRA?', z: [1.3, 1.05]}],
  ['o sol vai inchar', Inchar],
  ['em junho de 2026', K.Calendario, {bons: [5], t: 'JUNHO DE 2026', etq: 'ESSELDEURS, MATHIS E DECIN · A&A'}],
  ['um estudo novo disse', K.Carimbo, {base: 'A TERRA SERÁ ENGOLIDA?', carimbo: 'TALVEZ NÃO', cor: K.VERDE}],
  ['daqui a uns cinco', K.Numero, {ate: 5, pre: '~', suf: ' BI DE ANOS', t: 'DAQUI A', fundo: '#201008'}],
  ['o sol comeca', K.Tamanhos, {itens: [{r: 40, cor: '#ffd860', label: 'SOL HOJE'}, {r: 300, cor: '#ff5a2a', label: 'GIGANTE VERMELHA'}], t: 'VIRA GIGANTE VERMELHA'}],
  ['ele cresce tanto', K.Sistema, {ate: 0.85, t: 'ENGOLE MERCÚRIO E VÊNUS'}],
  ['em 2008 um estudo', K.Terminal, {linhas: ['> estudo de 2008', '> Schröder e Smith', '> Terra: ENGOLIDA'], t: '2008'}],
  ['a terra tambem seria', Puxada],
  ['mas em 2026', K.Glitchy, {texto: 'MAS EM\n2026…', size: 150}],
  ['outra equipe refez', K.Selo, {texto: 'CONTAS\nREFEITAS', t: 'OUTRA EQUIPE', cor: K.CIANO}],
  ['usou modelos novos', K.Curva, {pontos: [10, 9.6, 9, 8, 6.5, 5, 4, 3.4, 3], t: 'O SOL PERDENDO MASSA', etq: 'GRÁFICO · MODELO, NÃO FATO', cor: K.LAVA, eixo: 'MASSA DO SOL × TEMPO'}],
  ['e de como a gravidade', K.Balanca, {esq: 'SOL', dir: 'TERRA', pesoEsq: true, t: 'O PUXÃO NA TERRA'}],
  ['e o resultado mudou', Escapa],
  ['so que tem um porem', K.Alerta, {texto: 'TEM UM PORÉM', t: 'OS PRÓPRIOS AUTORES'}],
  ['o resultado depende', K.Versus, {a: {t: '2008', sub: 'ENGOLIDA', cor: K.VERMELHO}, b: {t: '2026', sub: 'TALVEZ ESCAPE', cor: K.VERDE}, etq: 'DEPENDE DE DETALHES AINDA INCERTOS'}],
  ['e mesmo escapando', K.Foto, {src: 'solterra/terra.jpg', etq: 'IMAGEM REAL · TERRA · NASA', t: 'NÃO VAI SER A MESMA', z: [1.0, 1.3]}],
  ['os oceanos ja', K.Mar, {t: 'OCEANOS EVAPORADOS', etq: 'ILUSTRAÇÃO · EM ~1–2 BI DE ANOS', forte: 0.6}],
  ['ela vira uma rocha', K.Astro, {cor: '#8a5a3a', cor2: '#2a1408', brilho: '#ff7a30', r: 320, t: 'ROCHA TORRADA', fundo: '#100804', etq: 'ILUSTRAÇÃO'}],
  ['a resposta mudou', K.Frase, {linhas: ['MUDOU.', 'PODE MUDAR DE NOVO'], cor: K.OURO}],
];
const S = K.criarShort(W, PLANO, 'solterra/narracao.mp3', 'mas em 2026');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: Sol gigante vermelho com a Terra na borda e seta pra fora
export const Thumb: React.FC = () => (
  <K.Capa texto="A TERRA ESCAPA?" texto2="TALVEZ NÃO SEJA ENGOLIDA" seta={[820, 860, -40]}>
    <K.Fundo cor="#200804"><K.Estrelas seed="thS" n={140} v={0} /></K.Fundo>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <circle cx={260} cy={980} r={620} fill="#ff4a1a" style={{filter: 'drop-shadow(0 0 90px #ff3a10)'}} />
      <Terra x={880} y={980} r={70} />
    </svg>
  </K.Capa>
);
