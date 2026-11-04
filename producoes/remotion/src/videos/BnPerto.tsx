// Short S2 "Pode existir um BURACO NEGRO bem mais perto do que a gente conhece". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Publicar perto de 02/12/2026 (Gaia DR4, data da TU Dresden; a fala diz "deve liberar"). Nunca "há um a 20 anos-luz": nenhum confirmado.
// Real: Via Láctea 360° (ESO/S. Brunier, eso0932a, CC BY 4.0). Ilustração: Gaia BH1 (NOIRLab/NSF/AURA/J. da Silva/Spaceengine, CC BY 4.0).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Palavra, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './bnperto.palavras.json';

const W = palavras as Palavra[];

// o satélite Gaia em ilustração (cilindro e escudo solar)
const Satelite: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <K.Fundo cor="#0a1426">
      <K.Estrelas seed="gaia" n={180} v={0.15} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 960) rotate(${-12 + Math.sin(f / 20) * 4})`}>
          <ellipse cx={0} cy={140} rx={420} ry={90} fill="#1d3f7a" stroke="#6ea8ff" strokeWidth={6} />
          {Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={140} x2={Math.cos(i * Math.PI / 6) * 420} y2={140 + Math.sin(i * Math.PI / 6) * 90} stroke="#6ea8ff" strokeOpacity={0.5} strokeWidth={3} />)}
          <rect x={-150} y={-160} width={300} height={300} rx={20} fill="#c8a040" stroke="#7a5a10" strokeWidth={6} />
          <ellipse cx={0} cy={-160} rx={150} ry={36} fill="#e8c860" />
          <rect x={-60} y={-230} width={120} height={70} fill="#9aa0a8" />
        </g>
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 104, color: '#fff'}}>SATÉLITE GAIA</div>
      <Etiqueta texto="ILUSTRAÇÃO · MISSÃO DA ESA" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['o buraco negro mais perto', K.Foto, {src: 'bnperto/eso0932a.jpg', etq: 'IMAGEM REAL · VIA LÁCTEA · ESO/S. BRUNIER', t: 'O MAIS PERTO?', circulo: [540, 980, 130], z: [1.15, 1.0]}],
  ['esta a mil quinhentos', K.Numero, {ate: 1560, suf: ' ANOS-LUZ', t: 'O MAIS PERTO CONHECIDO', sub: 'GAIA BH1'}],
  ['mas as contas dizem', K.Glitchy, {texto: 'PODE TER UM\nMAIS PERTO'}],
  ['o conhecido se chama', K.Foto, {src: 'bnperto/noirlab2227a.jpg', etq: 'ILUSTRAÇÃO · NOIRLAB/NSF/AURA/J. DA SILVA', ilus: true, t: 'GAIA BH1', pos: '75% 50%'}],
  ['tem quase dez', K.Balanca, {esq: 'GAIA BH1', dir: 'SOL', pesoEsq: true, t: '9,6 SÓIS DE MASSA'}],
  ['e foi achado', K.Orbita, {centro: {r: 70, cor: '#000000', cor2: '#000000', brilho: '#5a3aff', nome: '???'}, sat: {r: 46, cor: '#fff2b0', cor2: '#e08a20', nome: 'ESTRELA'}, raio: 340, t: 'GIRANDO EM VOLTA DE NADA', elipse: 0.6}],
  ['so que a nossa galaxia', K.Galaxia, {pontos: 140, t: '~100 MILHÕES', etq: 'ILUSTRAÇÃO · ESTIMATIVA PARA A VIA LÁCTEA'}],
  ['e quase todos sao', K.Selo, {texto: 'INVISÍVEIS', cor: K.CIANO, t: 'QUASE TODOS'}],
  ['sem uma estrela', K.Versus, {a: {t: 'COM ESTRELA', sub: 'DÁ PRA ACHAR', cor: K.VERDE}, b: {t: 'SOZINHO', sub: 'NÃO DÁ PRA VER', cor: K.VERMELHO}}],
  ['em 2026 uma equipe', K.Regua, {marcas: [{v: 49, label: 'ATÉ ~49 ANOS-LUZ', cor: K.OURO}, {v: 1560, label: 'GAIA BH1: 1.560 ANOS-LUZ', cor: K.CIANO}], max: 1600, log: true, t: 'PODE HAVER ALGUNS', etq: 'ESTIMATIVA · NOSIROV, BAMBI ET AL. 2026 · ESCALA LOG'}],
  ['eles ate apontaram', K.Ceu, {pinos: [{x: 240, y: 700, txt: '1'}, {x: 760, y: 640, txt: '2'}, {x: 520, y: 950, txt: '3'}, {x: 300, y: 1200, txt: '4'}, {x: 820, y: 1150, txt: '5'}], t: '5 CANDIDATOS', apagar: true}],
  ['mas provavelmente nenhum', K.Carimbo, {base: 'OS 5 CANDIDATOS', carimbo: 'PROVÁVEIS FALSOS', cor: K.VERMELHO, size: 80}],
  ['ou seja e estatistica', K.Curva, {pontos: [0, 1, 3, 7, 10, 7, 3, 1, 0], t: 'É ESTATÍSTICA', etq: 'ILUSTRAÇÃO', cor: K.CIANO, eixo: 'PROBABILIDADE × DISTÂNCIA'}],
  ['ninguem encontrou', K.Terminal, {linhas: ['> busca: buraco negro < 50 anos-luz', '> confirmados: 0'], t: 'NINGUÉM ACHOU AINDA'}],
  ['e em dezembro', K.Calendario, {bons: [11], ano: '2026', t: 'GAIA DR4', etq: 'PREVISTO PARA 02/12/2026'}],
  ['um novo pacote', Satelite],
  ['e la que os cientistas', K.Chuva, {cor: K.CIANO, t: 'VÃO PROCURAR AQUI', sub: 'UM PACOTE ENORME DE DADOS'}],
  ['pode ter um buraco negro', K.Astro, {cor: '#000000', cor2: '#000000', brilho: '#7a5aff', borda: true, r: 260, t: 'ESCONDIDO AQUI DO LADO?', fundo: '#0a0614'}],
  ['so ninguem viu', K.Frase, {linhas: ['SÓ NINGUÉM', 'VIU AINDA']}],
];
const S = K.criarShort(W, PLANO, 'bnperto/narracao.mp3', 'mas as contas dizem');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

export const Thumb: React.FC = () => (
  <K.Capa fundo="bnperto/eso0932a.jpg" texto="ESTÁ MAIS PERTO?" texto2="BURACO NEGRO ESCONDIDO" circulo={[540, 860, 200]}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <circle cx={540} cy={860} r={190} fill="#000" />
      <text x={540} y={940} textAnchor="middle" fontFamily={FONTE} fontSize={260} fill={K.OURO} stroke="#000" strokeWidth={10} paintOrder="stroke">?</text>
    </svg>
  </K.Capa>
);
