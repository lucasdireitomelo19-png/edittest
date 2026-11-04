// Short S3 "Existem TRILHÕES de planetas vagando no escuro. E se um entrasse aqui?". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Fatos: ~21 por estrela (Sumi et al., AJ 2023, estimativa); trilhões = conta com 100 bi de estrelas; OGLE-2016-BLG-1928 ~41 min;
// 1 em 9.000 (Brown, Malhotra e Rein, arXiv 2412.04583, HIPÓTESE); < 100 UA ~1 vez a cada 16 bi de anos (cálculo). Sem "a Terra seria ejetada".
// Reais: Via Láctea (ESO/S. Brunier, eso0932a, recorte vertical, CC BY 4.0) e Terra (NASA/NOAA/GSFC/Suomi NPP, Blue Marble 2012).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './errante.palavras.json';

const W = palavras as Palavra[];

// planeta negro com a borda acesa, atravessando o escuro
const PlanetaNegro: React.FC<{x?: number; y?: number; r?: number; f: number}> = ({x = 540, y = 960, r = 330, f}) => (
  <g transform={`translate(${x} ${y})`}>
    <defs>
      <radialGradient id="pn_corpo" cx="0.35" cy="0.3"><stop offset="0" stopColor="#1a1e2a" /><stop offset="1" stopColor="#020205" /></radialGradient>
    </defs>
    <circle r={r + 14} fill="none" stroke="#9fc8ff" strokeWidth={6} opacity={0.35} style={{filter: 'blur(10px)'}} />
    <circle r={r} fill="url(#pn_corpo)" />
    <path d={`M ${-r * 0.2} ${-r} A ${r} ${r} 0 0 1 ${r} ${r * 0.2}`} stroke="#cfe4ff" strokeWidth={8} fill="none" opacity={0.75 + 0.15 * Math.sin(f / 6)} strokeLinecap="round" />
  </g>
);
const Escuro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <K.Fundo cor="#05070e">
      <K.Estrelas seed="err" n={220} v={0.4} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><PlanetaNegro f={f} x={interpolate(f, [0, 60], [700, 470])} y={1000} r={interpolate(f, [0, 60], [300, 380])} /></svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: '#fff', lineHeight: 1.05}}>SEM ESTRELA.<br /><span style={{color: '#9fc8ff'}}>SEM LUZ.</span></div>
      <Etiqueta texto="ILUSTRAÇÃO · PLANETA ERRANTE" />
    </K.Fundo>
  );
};
// microlente: o planeta passa na frente de uma estrela distante e ela aumenta de brilho
const Microlente: React.FC = () => {
  const f = useCurrentFrame();
  const px = interpolate(f, [0, 70], [-150, 1230]);
  const perto = Math.exp(-(((px - 540) / 160) ** 2));
  return (
    <K.Fundo cor="#0a0c18">
      <K.Estrelas seed="micro" n={150} v={0} op={0.7} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={900} r={18 + 50 * perto} fill="#fff6d8" style={{filter: `blur(${3 + 16 * perto}px)`}} />
        <circle cx={540} cy={900} r={12} fill="#fff" />
        <circle cx={540} cy={900} r={140} fill="none" stroke="#fff" strokeOpacity={0.5 * perto} strokeWidth={4} strokeDasharray="10 10" />
        <circle cx={px} cy={1000} r={40} fill="#05060a" stroke="#9fc8ff" strokeWidth={4} />
        <text x={px} y={1080} textAnchor="middle" fontFamily={FONTE} fontSize={36} fill="#9fc8ff">PLANETA</text>
        <text x={540} y={840} textAnchor="middle" fontFamily={FONTE} fontSize={36} fill="#fff6d8">ESTRELA DISTANTE</text>
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>PASSA NA FRENTE<br /><span style={{color: K.OURO}}>DE UMA ESTRELA</span></div>
      <Etiqueta texto="ANIMAÇÃO · MICROLENTE" />
    </K.Fundo>
  );
};
// órbitas dos planetas gigantes balançando quando um objeto passa (hipótese)
const ORB = [{n: 'JÚPITER', a: 150, c: '#d8b088'}, {n: 'SATURNO', a: 240, c: '#e8d090'}, {n: 'URANO', a: 330, c: '#9ad8e0'}, {n: 'NETUNO', a: 410, c: '#5a7ae8'}];
const Orbitas: React.FC = () => {
  const f = useCurrentFrame();
  const ox = interpolate(f, [0, 90], [1200, -200]), oy = interpolate(f, [0, 90], [400, 1500]);
  const forca = Math.exp(-(((f - 45) / 18) ** 2));
  return (
    <K.Fundo cor="#0c1020">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={980} r={40} fill="#ffd860" style={{filter: 'drop-shadow(0 0 30px #ffb000)'}} />
        {ORB.map((o, i) => {
          const e = forca * (0.12 + i * 0.05);
          const ang = f * (0.05 - i * 0.008) + i;
          return <g key={o.n}>
            <ellipse cx={540 + e * 120} cy={980} rx={o.a * (1 + e)} ry={o.a * 0.55 * (1 - e)} fill="none" stroke={o.c} strokeOpacity={0.6} strokeWidth={3} transform={`rotate(${e * 40} 540 980)`} />
            <circle cx={540 + Math.cos(ang) * o.a * (1 + e)} cy={980 + Math.sin(ang) * o.a * 0.55} r={12 + (3 - i) * 3} fill={o.c} />
          </g>;
        })}
        <circle cx={ox} cy={oy} r={30} fill="#05060a" stroke="#9fc8ff" strokeWidth={5} />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>MEXEU NAS<br /><span style={{color: K.OURO}}>ÓRBITAS?</span></div>
      <K.Caixa texto="NO PASSADO DISTANTE" y={1320} size={56} cor="#9fc8ff" delay={8} />
      <Etiqueta texto="ANIMAÇÃO · HIPÓTESE" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['existem planetas sem', Escuro],
  ['sem luz vagando', K.Ceu, {vazio: [540, 1000], t: 'VAGANDO NO ESCURO'}],
  ['e pode ter trilhoes', K.Foto, {src: 'errante/vialactea_eso.jpg', etq: 'IMAGEM REAL · VIA LÁCTEA · ESO/S. BRUNIER', t: 'TRILHÕES?', caixa: 'SÓ NA NOSSA GALÁXIA', z: [1.0, 1.2]}],
  ['uma pesquisa de nove', K.Selo, {texto: '9 ANOS', t: 'UMA PESQUISA DE', cor: K.CIANO}],
  ['cerca de vinte', K.Fila, {n: 21, cols: 7, cor: '#2a3048', t: '~21 POR ESTRELA', label: 'ESTIMATIVA · SUMI ET AL. 2023'}],
  ['com uns cem bilhoes', K.Numero, {ate: 100, suf: ' BILHÕES', t: 'DE ESTRELAS', sub: 'NA VIA LÁCTEA'}],
  ['a conta da trilhoes', K.Galaxia, {pontos: 160, t: 'TRILHÕES', etq: 'CONTA · ILUSTRAÇÃO'}],
  ['o unico jeito', K.Pergunta, {sub: 'COMO ACHAR UM?'}],
  ['quando ele passa', Microlente],
  ['e a luz dela', K.Piscada, {t: 'UMA PISCADA', txt: 'A LUZ DA ESTRELA', etq: 'ANIMAÇÃO · CURVA DE LUZ'}],
  ['um desses candidatos', K.Relogio, {t: 'SÓ ~41 MINUTOS', txt: 'OGLE-2016-BLG-1928', vel: 40}],
  ['e se um entrasse', K.Glitchy, {texto: 'E SE UM\nENTRASSE AQUI?', size: 120}],
  ['um estudo recente', K.Terminal, {linhas: ['> estudo: Brown, Malhotra e Rein', '> um objeto assim passou perto?', '> status: HIPÓTESE'], t: 'UM ESTUDO SUGERE'}],
  ['um objeto assim', Orbitas],
  ['uma chance de uma', K.Carimbo, {base: '1 EM 9.000', carimbo: 'HIPÓTESE', cor: K.OURO}],
  ['hoje a chance', K.Regua, {marcas: [{v: 30, label: 'NETUNO: 30 UA', cor: '#5a7ae8'}, {v: 100, label: 'LIMITE: 100 UA', cor: K.VERMELHO}], max: 120, t: 'CHANCE MINÚSCULA', etq: 'DISTÂNCIA DO SOL · UA'}],
  ['pelas contas', K.Versus, {a: {t: '1 VEZ A CADA', sub: '~16 BI DE ANOS', cor: K.CIANO}, b: {t: 'IDADE DO UNIVERSO', sub: '~13,8 BI DE ANOS', cor: K.OURO}, etq: 'CÁLCULO · A MENOS DE 100 UA'}],
  ['e mesmo se passasse', K.Foto, {src: 'errante/terra.jpg', etq: 'IMAGEM REAL · TERRA · NASA', t: 'MAL MEXERIA NA ÓRBITA', caixa: 'SE FOSSE DO TAMANHO DA TERRA', z: [1.2, 1.0]}],
  ['mas eles estao', K.Frase, {linhas: ['LÁ FORA', 'NO ESCURO'], cor: '#9fc8ff'}],
];
const S = K.criarShort(W, PLANO, 'errante/narracao.mp3', 'e se um entrasse');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: planeta negro de borda acesa vindo na direção do Sistema Solar
export const Thumb: React.FC = () => (
  <K.Capa texto="VINDO NO ESCURO" texto2="TRILHÕES DELES" seta={[400, 930, 147]}>
    <K.Fundo cor="#05070e"><K.Estrelas seed="thumbE" n={260} v={0} /></K.Fundo>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <PlanetaNegro f={0} x={620} y={760} r={360} />
      <circle cx={170} cy={1060} r={46} fill="#ffd860" style={{filter: 'drop-shadow(0 0 40px #ffb000)'}} />
      <ellipse cx={170} cy={1060} rx={150} ry={60} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={4} />
    </svg>
  </K.Capa>
);
