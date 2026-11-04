// Short S6 "A MAIOR estrela já vista ENGOLIRIA o Sistema Solar até Saturno". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// "MAIOR estrela JÁ VISTA", nunca "do universo". Reais: vídeo ESO eso2417b (ESO, CC BY 4.0), imagem eso2417a (ESO/K. Ohnaka et al.),
// Nuvens de Magalhães vistas da ISS (NASA, iss071e418742), Sol do SDO (NASA/SDO).
import React from 'react';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './maiorestrela.palavras.json';

const W = palavras as Palavra[];

// Terras caindo dentro do Sol
const TerrasNoSol: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [0, 40], [0, 1300000], {...clamp, easing: (t) => t * t}));
  return (
    <K.Fundo cor="#2a1606">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <K.Esfera x={540} y={1000} r={330} cor="#fff2a0" cor2="#e86a10" brilho="#ffb030" id="ts" />
        {Array.from({length: 60}, (_, i) => {
          const t0 = i * 0.7, k = interpolate(f, [t0, t0 + 14], [0, 1], clamp);
          const x0 = 100 + random('tx' + i) * 880, xa = 540 + (random('ta' + i) - 0.5) * 300;
          return k > 0 && k < 1 ? <circle key={i} cx={x0 + (xa - x0) * k} cy={480 + 520 * k} r={9} fill="#4c8cf0" stroke="#bfe0ff" strokeWidth={2} /> : null;
        })}
      </svg>
      <div style={{position: 'absolute', top: 1380, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: K.OURO}}>{n.toLocaleString('pt-BR')} TERRAS</div>
      <div style={{position: 'absolute', top: 290, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#fff'}}>DENTRO DO SOL</div>
    </K.Fundo>
  );
};
// bolha de gás rala, tremendo
const Bolha: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({length: 48}, (_, i) => {
    const a = (i / 48) * Math.PI * 2, r = 360 + 26 * Math.sin(a * 5 + f / 5) + 18 * Math.sin(a * 3 - f / 7);
    return `${540 + Math.cos(a) * r},${920 + Math.sin(a) * r}`;
  }).join(' ');
  return (
    <K.Fundo cor="#1a0808">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polygon points={pts} fill="#ff5a2a" fillOpacity={0.18} stroke="#ff8a50" strokeWidth={8} style={{filter: 'blur(1px)'}} />
        {Array.from({length: 70}, (_, i) => <circle key={i} cx={540 + (random('bx' + i) - 0.5) * 560} cy={920 + (random('by' + i) - 0.5) * 560 + Math.sin(f / 8 + i) * 8} r={3 + random('br' + i) * 6} fill="#ffb080" opacity={0.35} />)}
      </svg>
      <div style={{position: 'absolute', top: 290, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 100, color: '#fff'}}>BOLHA DE GÁS</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['se voce colocasse', K.Clipe, {src: 'maiorestrela/zoom_woh.mp4', ini: 36, etq: 'VÍDEO REAL · ZOOM ATÉ WOH G64 · ESO', t: 'A MAIOR ESTRELA JÁ VISTA'}],
  ['no lugar do sol', K.Foto, {src: 'maiorestrela/sol_sdo.jpg', etq: 'IMAGEM REAL · O SOL · NASA/SDO', t: 'NO LUGAR DO SOL', z: [1.0, 1.2]}],
  ['a superficie dela', K.Sistema, {ate: 9.3, t: 'A SUPERFÍCIE DELA', caixa: 'ESCALA EM RAIZ PARA CABER NA TELA'}],
  ['e chegaria quase', K.Regua, {marcas: [{v: 9.3, label: 'ESTRELA: ~9,3 UA', cor: '#ff5a2a', dy: 40}, {v: 9.58, label: 'SATURNO: 9,6 UA', cor: K.OURO, dy: -30}, {v: 1, label: 'TERRA: 1 UA', cor: K.CIANO}], max: 10, t: 'QUASE EM SATURNO', etq: 'CÁLCULO'}],
  ['ela se chama', K.Foto, {src: 'maiorestrela/woh_eso.jpg', etq: 'IMAGEM REAL · ESO/K. OHNAKA ET AL.', t: 'WOH G64', z: [1.0, 1.25]}],
  ['fica numa galaxia', K.Foto, {src: 'maiorestrela/nuvens_iss.jpg', etq: 'IMAGEM REAL · VISTA DA ISS · NASA', t: 'GRANDE NUVEM DE MAGALHÃES', ty: 1150, pos: '40% 50%'}],
  ['a cento e sessenta', K.Numero, {ate: 160, suf: ' MIL', sub: 'ANOS-LUZ DAQUI', t: 'GALÁXIA VIZINHA'}],
  ['segundo o observatorio', K.Selo, {texto: '~2.000×\nO SOL', etq: 'ESO, 2024', t: 'TAMANHO'}],
  ['e o sol ja e absurdo', K.Astro, {cor: '#fff4b0', cor2: '#e05a00', brilho: '#ffb030', r: 330, t: 'E O SOL JÁ É ABSURDO', fundo: '#201004'}],
  ['dentro dele caberiam', TerrasNoSol],
  ['mas ela tem rivais', K.Glitchy, {texto: 'ELA TEM\nRIVAIS', cor: '#ff8a50'}],
  ['outras supergigantes', K.Barras, {itens: [{label: 'WOH G64', v: 2000, cor: '#ff5a2a', txt: '~2.000 SÓIS'}, {label: 'STEPHENSON 2-18', v: 1950, cor: '#ff9a40', txt: 'PARECIDO'}, {label: 'SOL', v: 1, cor: K.OURO, txt: '1'}], t: 'DEPENDE DA MEDIÇÃO', etq: 'ESTIMATIVAS · RAIO'}],
  ['ninguem crava', K.Pergunta, {sub: 'QUAL É A MAIOR?', t: 'NINGUÉM CRAVA'}],
  ['e tem uma surpresa', K.Versus, {a: {t: 'ENORMES', sub: 'POR FORA', cor: '#ff5a2a'}, b: {t: 'RALAS', sub: 'POR DENTRO', cor: K.CIANO}}],
  ['sao bolhas de gas', Bolha],
  ['em massa nem chegam', K.Balanca, {esq: 'TAMANHO', dir: 'MASSA', pesoEsq: true, t: 'MENOS DE 100 SÓIS'}],
  ['gigantes por fora', K.Frase, {linhas: ['GIGANTES', 'POR FORA', 'QUASE OCAS', 'POR DENTRO']}],
];
const S = K.criarShort(W, PLANO, 'maiorestrela/narracao.mp3', 'mas ela tem rivais');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <K.Capa texto="ENGOLE ATÉ SATURNO" texto2="A MAIOR ESTRELA JÁ VISTA" circulo={[540, 900, 0]}>
    <K.Fundo cor="#1a0604">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <K.Esfera x={540} y={880} r={470} cor="#ffb060" cor2="#8a1400" brilho="#ff4010" id="cap" />
        {[0.39, 0.72, 1, 1.52, 5.2].map((a, i) => <g key={i}><circle cx={540} cy={880} r={Math.sqrt(a / 9.58) * 480} fill="none" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} /></g>)}
        <circle cx={540} cy={880} r={480 * 1.0} fill="none" stroke={K.OURO} strokeWidth={6} strokeDasharray="14 10" />
        <circle cx={540 + 480 * Math.cos(-0.6)} cy={880 + 480 * Math.sin(-0.6)} r={30} fill="#e8d090" />
        <ellipse cx={540 + 480 * Math.cos(-0.6)} cy={880 + 480 * Math.sin(-0.6)} rx={58} ry={14} fill="none" stroke="#e8d090" strokeWidth={6} />
        <text x={540 + 480 * Math.cos(-0.6) - 40} y={880 + 480 * Math.sin(-0.6) - 50} textAnchor="middle" fontFamily={FONTE} fontSize={48} fill="#fff" stroke="#000" strokeWidth={8} paintOrder="stroke">SATURNO</text>
      </svg>
    </K.Fundo>
  </K.Capa>
);
