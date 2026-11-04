// Short S1 "Essa estrela vai EXPLODIR… e tem um mês em que o Brasil INTEIRO não vai ver". Lote Linha dos campeões, aprovado em 04/11. Voz Brian. Não é POV.
// Cuidados: brilho com fontes divergentes (só "aparece até de dia"); "~100 mil anos" é estimativa; "~20/06: Sol na frente" é cálculo.
// Reais: Órion sobre o ALMA (ESO/B. Tafreshi, potw1513a), Órion (ESO, P. Kervella, Digitized Sky Survey 2 and A. Fujii, eso0927c, recorte do painel esquerdo), Betelgeuse pelo SPHERE (ESO/M. Montargès et al., eso2003a),
// Órion sobre o Paranal (ESO/P. Horálek, potw2009a), SN 1987A (NASA/ESA/Hubble), Betelgeuse pelo Herschel (ESA/Herschel/PACS/L. Decin et al., PIA16680).
// Mapa: ESO, IAU and Sky & Telescope (eso1121b). ESO em CC BY 4.0, com crédito.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Palavra, clamp, FONTE, Etiqueta} from '../comum';
import * as K from '../lote/kit';
import palavras from './betelgeuse.palavras.json';

const W = palavras as Palavra[];

// céu azul de dia com o Sol e a supernova brilhando como um ponto forte
const DeDia: React.FC = () => {
  const f = useCurrentFrame();
  const b = interpolate(f, [4, 20], [0, 1], clamp);
  return (
    <K.Fundo cor="#3d8fe0">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="ceuDia" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a5fc0" /><stop offset="1" stopColor="#9fd0ff" /></linearGradient>
          <radialGradient id="solDia"><stop offset="0" stopColor="#fff" /><stop offset="0.4" stopColor="#fff8d0" /><stop offset="1" stopColor="#fff8d0" stopOpacity={0} /></radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#ceuDia)" />
        <circle cx={880} cy={560} r={260} fill="url(#solDia)" />
        <circle cx={300} cy={980} r={30 + 70 * b + 6 * Math.sin(f / 3)} fill="#ffe0c0" opacity={0.5 * b} style={{filter: 'blur(18px)'}} />
        <circle cx={300} cy={980} r={16 * b} fill="#fff" />
        {[0, 1, 2, 3].map((i) => <line key={i} x1={300 - 120 * b} y1={980} x2={300 + 120 * b} y2={980} stroke="#fff" strokeWidth={4} opacity={0.8 * b} transform={`rotate(${i * 45} 300 980)`} />)}
        <path d="M0 1560 Q 260 1480 540 1540 T 1080 1500 L 1080 1920 L 0 1920 Z" fill="#1f5a2a" />
        <path d="M0 1640 Q 300 1580 600 1640 T 1080 1620 L 1080 1920 L 0 1920 Z" fill="#163f1e" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#fff', lineHeight: 1.05, textShadow: '0 6px 24px rgba(0,0,0,.6)'}}>VISÍVEL<br />ATÉ DE DIA</div>
      <K.Caixa texto="BETELGEUSE" y={1110} size={58} cor={K.OURO} delay={14} />
      <Etiqueta texto="ILUSTRAÇÃO · BRILHO: FONTES DIVERGEM" />
    </K.Fundo>
  );
};

// a faixa do céu por onde o Sol anda no ano, com o Sol indo de maio a agosto até Órion
const MES = ['MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET'];
const SolAndando: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 50], [120, 560], {...clamp});
  return (
    <K.Fundo cor="#0c1630">
      <K.Estrelas seed="faixa" n={160} v={0.05} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={0} y={880} width={1080} height={160} fill="#ffffff" opacity={0.06} />
        <line x1={0} x2={1080} y1={960} y2={960} stroke="#fff" strokeOpacity={0.35} strokeWidth={4} strokeDasharray="18 12" />
        {MES.map((m, i) => <text key={m} x={60 + i * 160} y={1120} textAnchor="middle" fontFamily={FONTE} fontSize={42} fill={i >= 2 && i <= 5 ? K.VERMELHO : '#8a93a8'}>{m}</text>)}
        <rect x={60 + 2 * 160 - 70} y={1070} width={3 * 160 + 140} height={70} rx={14} fill="none" stroke={K.VERMELHO} strokeWidth={5} />
        <circle cx={600} cy={900} r={18} fill="#ff8a50" />
        <text x={600} y={850} textAnchor="middle" fontFamily={FONTE} fontSize={40} fill="#ff8a50">BETELGEUSE</text>
        <circle cx={x} cy={960} r={60} fill="#fff4b0" style={{filter: 'blur(3px)'}} />
        <circle cx={x} cy={960} r={120} fill="#fff4b0" opacity={0.25} style={{filter: 'blur(20px)'}} />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>MAIO–AGO:<br /><span style={{color: K.VERMELHO}}>PERTO DO SOL</span></div>
      <Etiqueta texto="ANIMAÇÃO · CAMINHO DO SOL NO CÉU · CÁLCULO" />
    </K.Fundo>
  );
};

// o clarão do Sol crescendo até engolir a estrela
const Clarao: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 40], [0, 1], {...clamp});
  return (
    <K.Fundo cor="#101828">
      <K.Estrelas seed="clarao" n={200} v={0} op={1 - k} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="glare"><stop offset="0" stopColor="#fff" /><stop offset="0.3" stopColor="#fffbe0" /><stop offset="1" stopColor="#ffe9a0" stopOpacity={0} /></radialGradient></defs>
        <circle cx={540} cy={980} r={14} fill="#ff8a50" opacity={1 - k * 0.9} />
        <circle cx={interpolate(k, [0, 1], [260, 520])} cy={980} r={160 + k * 900} fill="url(#glare)" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: k > 0.5 ? '#3a2a00' : '#fff', lineHeight: 1.05}}>~20/06:<br />SOL NA FRENTE</div>
      <Etiqueta texto="ANIMAÇÃO · CÁLCULO" />
    </K.Fundo>
  );
};

// detector de neutrinos: tanque de água com sensores na parede, e um flash quando um neutrino passa
const Detector: React.FC = () => {
  const f = useCurrentFrame();
  const flash = Math.exp(-(((f - 18) / 4) ** 2));
  return (
    <K.Fundo cor="#0a1a2a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={120} y={620} width={840} height={760} rx={30} fill="#06304a" stroke="#4aa8d8" strokeWidth={8} />
        {Array.from({length: 7 * 6}, (_, i) => {
          const cx = 190 + (i % 7) * 117, cy = 690 + Math.floor(i / 7) * 125;
          const d = Math.hypot(cx - 540, cy - 1000);
          return <circle key={i} cx={cx} cy={cy} r={40} fill="#c89a30" stroke="#5a4010" strokeWidth={4} opacity={0.5 + 0.5 * (d < 360 ? flash : 0)} />;
        })}
        <circle cx={540} cy={1000} r={340 * Math.min(1, Math.max(0, (f - 14) / 10))} fill="none" stroke="#7af0ff" strokeWidth={10} opacity={flash} />
        <line x1={540} y1={200 + f * 30} x2={540} y2={120 + f * 30} stroke="#b388ff" strokeWidth={8} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', top: 300, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', lineHeight: 1.05}}>DETECTOR DE<br /><span style={{color: K.CIANO}}>NEUTRINOS</span></div>
      <K.Caixa texto="CHEGAM ANTES DA LUZ" y={1460} size={58} cor={K.CIANO} delay={20} />
      <Etiqueta texto="ILUSTRAÇÃO · TANQUE DE ÁGUA COM SENSORES" />
    </K.Fundo>
  );
};

const PLANO: K.Plano = [
  ['quando betelgeuse explodir', K.Foto, {src: 'betelgeuse/potw1513a.jpg', etq: 'IMAGEM REAL · ÓRION SOBRE O ALMA · ESO/B. TAFRESHI', t: 'ELA VAI EXPLODIR', pos: '73% 30%', z: [1.25, 1.05]}],
  ['existe uma epoca', K.Selo, {texto: 'INVISÍVEL\nNO BRASIL', t: 'UMA ÉPOCA DO ANO', cor: K.VERMELHO}],
  ['betelgeuse e aquela', K.Foto, {src: 'betelgeuse/orion_eso.jpg', etq: 'IMAGEM REAL · ÓRION · ESO, P. KERVELLA, DSS2 AND A. FUJII', t: 'ÓRION', z: [1, 1], pino: [329, 505]}],
  ['avermelhada no ombro', K.Foto, {src: 'betelgeuse/eso1121b.jpg', etq: 'MAPA · ESO, IAU AND SKY & TELESCOPE', ilus: true, t: 'O OMBRO DE ÓRION', z: [1, 1], pino: [387, 835]}],
  ['um dia ela vai virar', K.Foto, {src: 'betelgeuse/eso2003a.jpg', etq: 'IMAGEM REAL · BETELGEUSE · ESO/M. MONTARGÈS ET AL.', t: 'VAI VIRAR SUPERNOVA', z: [1.0, 1.25]}],
  ['pode ser amanha', K.Numero, {ate: 100000, pre: '~', suf: ' ANOS', t: 'AMANHÃ? OU DAQUI A', etq: 'ESTIMATIVA'}],
  ['quando acontecer', DeDia],
  ['mas tem um problema', K.Glitchy, {texto: 'MAS TEM\nUM PROBLEMA', size: 130}],
  ['entre maio e agosto', SolAndando],
  ['e por volta do fim', Clarao],
  ['se ela explodir nessa', K.Explosao, {t: 'SE EXPLODIR AÍ', sub: 'ESCONDIDA NO CLARÃO'}],
  ['voce teria que esperar', K.Carimbo, {base: 'ESPERE O SOL', carimbo: 'SAIR DA FRENTE', cor: K.OURO, size: 90}],
  ['a melhor epoca', K.Foto, {src: 'betelgeuse/potw2009a.jpg', etq: 'IMAGEM REAL · ÓRION SOBRE O PARANAL · ESO/P. HORÁLEK', t: 'MELHOR: SET–MAR', caixa: 'ÓRION ALTO NO CÉU', pos: '50% 20%', z: [1.0, 1.12]}],
  ['e tem um aviso', K.Chuva, {t: 'UM AVISO ANTES', sub: 'NEUTRINOS'}],
  ['saem da explosao', Detector],
  ['em 1987 numa outra', K.Foto, {src: 'betelgeuse/sn1987a.jpg', etq: 'IMAGEM REAL · SN 1987A · NASA/ESA/HUBBLE', t: 'SN 1987A', z: [1.0, 1.3]}],
  ['chegaram umas tres', K.LinhaTempo, {marcos: [{ano: '0 H', txt: 'CHEGAM OS NEUTRINOS', cor: K.CIANO}, {ano: '~3 H', txt: 'CHEGA A LUZ', cor: K.OURO}], t: '1987'}],
  ['e calma ela esta', K.Regua, {marcas: [{v: 4.2, label: 'PRÓXIMA CENTAURI: 4,2', cor: K.CIANO}, {v: 550, label: 'BETELGEUSE: ~550 ANOS-LUZ', cor: K.OURO}], max: 1000, log: true, t: 'BEM LONGE', etq: 'ESCALA LOG · ANOS-LUZ'}],
  ['longe demais', K.Foto, {src: 'betelgeuse/herschel.jpg', etq: 'IMAGEM REAL · BETELGEUSE · ESA/HERSCHEL/PACS/L. DECIN ET AL.', t: 'NÃO FAZ MAL', z: [1.3, 1.0]}],
];
const S = K.criarShort(W, PLANO, 'betelgeuse/narracao.mp3', 'mas tem um problema');
export const Video = S.Video;
export const DURACAO = S.DURACAO;

// thumb: Órion real com Betelgeuse marcada e o clarão do Sol cobrindo metade
export const Thumb: React.FC = () => (
  <K.Capa fundo="betelgeuse/orion_eso.jpg" texto="EXPLODIU. E SUMIU?" texto2="BETELGEUSE" circulo={[329, 505, 120]}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <defs><radialGradient id="tg"><stop offset="0" stopColor="#fff" /><stop offset="0.35" stopColor="#fff6c8" /><stop offset="1" stopColor="#ffd860" stopOpacity={0} /></radialGradient></defs>
      <circle cx={329} cy={505} r={90} fill="#ff7a30" opacity={0.85} style={{filter: 'blur(14px)'}} />
      <circle cx={329} cy={505} r={34} fill="#fff" />
      <circle cx={1080} cy={900} r={760} fill="url(#tg)" />
    </svg>
  </K.Capa>
);
