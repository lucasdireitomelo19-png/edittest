// Short POV "Um vulcão vai roubar o seu verão" (Tambora 1815 / ano sem verão 1816). Roteiro do Roteirista, pré-aprovado pelo dono.
// Tambora não é supervulcão. Sem números de Yellowstone ou Kikai.
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {
  Short, montar, Palavra, Titulo, Texto, Etiqueta, Real, Sombra, Glitch, Contador, Pino, proj, caminho, orto, caminhoGlobo,
  useSpring, shake, clamp, FONTE, OURO, LAVA, CIANO, VERMELHO, VERDE, FPS,
} from '../comum';
import palavras from './semverao.palavras.json';
import indonesia from './dados/indonesia.json';
import mundo from './dados/mundo.json';

const W = palavras as Palavra[];
const FRASES = [
  'um vulcao vai roubar', 'voce acorda em junho', 'e la fora esta nevando', 'no mercado', 'nao foi uma guerra', 'foi um vulcao', 'do outro lado do mundo',
  'isso aconteceu de verdade', 'em 1816', 'no ano anterior', 'o vulcao tambora', 'explodiu', 'cerca de cem mil', 'e a cinza no ceu', 'em cerca de um grau',
  'nos estados unidos', 'na europa veio a fome', 'ficou conhecido', 'agora a parte ruim', 'cientistas da universidade', 'uma chance em seis',
  'acontecer ainda neste seculo', 'hoje somos oito', 'e so uma em cada quatro', 'desde 1950', 'mas calma', 'ninguem sabe qual', 'nao existe nenhum',
  'o perigo nao e o vulcao', 'e o mundo nao estar pronto',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas calma');
export const DURACAO = TEMPO.FIM;
const GELO = '#bfefff';

const SolNeve: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [d * 0.25, d * 0.75], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const bg = `linear-gradient(180deg, rgb(${255 - p * 200},${180 - p * 60},${60 + p * 120}), rgb(${120 - p * 100},${50 + p * 20},${20 + p * 80}))`;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 1060) rotate(${f * 1.5})`}>
          <circle r={170 * (1 - p)} fill="#ffd23f" style={{filter: 'drop-shadow(0 0 60px #ffb020)'}} />
          {Array.from({length: 12}, (_, i) => <line key={i} x1={0} y1={-200 * (1 - p)} x2={0} y2={-280 * (1 - p)} stroke="#ffd23f" strokeWidth={22} strokeLinecap="round" transform={`rotate(${i * 30})`} />)}
          {Array.from({length: 6}, (_, i) => (
            <g key={'n' + i} transform={`rotate(${i * 60})`} opacity={p}>
              <line x1={0} y1={0} x2={0} y2={-260} stroke="#fff" strokeWidth={22} strokeLinecap="round" />
              <line x1={0} y1={-170} x2={-60} y2={-230} stroke="#fff" strokeWidth={16} strokeLinecap="round" />
              <line x1={0} y1={-170} x2={60} y2={-230} stroke="#fff" strokeWidth={16} strokeLinecap="round" />
            </g>
          ))}
        </g>
      </svg>
      <Titulo texto="UM VULCÃO VAI ROUBAR O SEU VERÃO" y={300} size={88} />
    </AbsoluteFill>
  );
};
const Junho: React.FC = () => {
  const s = useSpring(0, {damping: 11, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #2a3a52, #070b12 70%)'}}>
      <div style={{position: 'absolute', left: 240, top: 600, width: 600, height: 640, borderRadius: 40, background: '#f4f1ea', overflow: 'hidden',
        transform: `scale(${0.8 + 0.2 * s}) rotate(${(1 - s) * -8}deg)`, opacity: s, boxShadow: '0 30px 80px rgba(0,0,0,.6)'}}>
        <div style={{height: 180, background: VERMELHO, color: '#fff', fontFamily: FONTE, fontSize: 100, textAlign: 'center', lineHeight: '180px'}}>JUNHO</div>
        <div style={{fontFamily: FONTE, fontSize: 300, color: '#1a1a1a', textAlign: 'center', lineHeight: '440px'}}>21</div>
      </div>
      <Titulo texto="VOCÊ ACORDA EM JUNHO" y={300} size={92} />
      <Texto y={1300} size={36} delay={8}>INÍCIO DO VERÃO NO HEMISFÉRIO NORTE</Texto>
    </AbsoluteFill>
  );
};
const Nevando: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Real src="semverao/r249513.mp4" ini={1} />
      <Sombra />
      {Array.from({length: 50}, (_, i) => {
        const x = random('nx' + i) * 1080 + Math.sin(f / 20 + i) * 20, y = (f * (3 + random('nv' + i) * 4) + random('ny' + i) * 1920) % 1920;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 9, height: 9, borderRadius: 5, background: '#fff', opacity: 0.8}} />;
      })}
      <Etiqueta texto="IMAGEM REAL · ILUSTRATIVA · FLOCOS: ANIMAÇÃO" real />
      <Titulo texto="JUNHO · NEVE" y={330} size={120} cor={GELO} />
    </AbsoluteFill>
  );
};
const Mercado: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a2a30, #0e0e12)'}}>
      {[0, 1, 2, 3].map((r) => (
        <div key={r} style={{position: 'absolute', left: 100, right: 100, top: 640 + r * 230, height: 24, background: '#7a6a5a', boxShadow: '0 12px 20px rgba(0,0,0,.6)'}}>
          {r === 2 && <div style={{position: 'absolute', left: 560, top: -90, width: 70, height: 90, background: '#a86a3a', opacity: interpolate(f, [0, 20], [1, 0.5], clamp)}} />}
        </div>
      ))}
      <div style={{position: 'absolute', left: 340, top: 1260, width: 400, padding: '16px 0', borderRadius: 14, background: VERMELHO, color: '#fff', fontFamily: FONTE, fontSize: 52, textAlign: 'center',
        transform: `rotate(-4deg) scale(${spring({frame: f - 10, fps: FPS, config: {damping: 9}})})`}}>ESGOTADO</div>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="SEM COMIDA" y={300} size={130} />
    </AbsoluteFill>
  );
};
const Guerra: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [6, 16], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#0a0a0c', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'relative', fontFamily: FONTE, fontSize: 190, color: '#9aa0aa'}}>GUERRA
        <div style={{position: 'absolute', left: -20, top: '50%', height: 26, width: `${r * 110}%`, background: VERMELHO, transform: 'rotate(-6deg)', borderRadius: 13}} />
      </div>
      <Titulo texto="NÃO FOI UMA" y={600} size={90} />
    </AbsoluteFill>
  );
};
const Erupcao: React.FC = () => (
  <AbsoluteFill>
    <Real src="semverao/r152085.mp4" ini={2} />
    <Sombra />
    <Etiqueta texto="ERUPÇÃO REAL · ILUSTRATIVA (ISLÂNDIA)" real />
    <Titulo texto="FOI UM VULCÃO" y={330} size={120} cor={LAVA} />
  </AbsoluteFill>
);
const Globo: React.FC<{lon: [number, number]; lat: [number, number]; titulo?: string; cinza?: number; alvo?: boolean}> = ({lon, lat, titulo, cinza = 0, alvo}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d * 0.8], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const lo = interpolate(e, [0, 1], lon), la = interpolate(e, [0, 1], lat);
  const g = orto(lo, la, 380, 540, 1000);
  const [tx, ty, tv] = g(118, -8.25);
  const c = cinza * interpolate(f, [0, d], [0.3, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #07142a, #000 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><clipPath id="gl"><circle cx={540} cy={1000} r={380} /></clipPath></defs>
        <circle cx={540} cy={1000} r={380} fill="#0b2a44" />
        <path d={caminhoGlobo(mundo as number[][][], g)} fill="#3d6a52" />
        {c > 0 && <g clipPath="url(#gl)">
          {Array.from({length: 30}, (_, i) => <ellipse key={i} cx={160 + random('cx' + i) * 760} cy={1000 + (random('cy' + i) - 0.5) * 380 * c} rx={160} ry={50} fill="rgba(150,140,130,.5)" opacity={c} />)}
          <rect x={160} y={1000 - 200 * c} width={760} height={400 * c} fill="rgba(140,130,120,.35)" />
        </g>}
        <circle cx={540} cy={1000} r={380} fill="none" stroke="rgba(76,201,240,.4)" strokeWidth={4} />
        {alvo && tv && e > 0.7 && <circle cx={tx} cy={ty} r={16} fill={LAVA} style={{filter: 'drop-shadow(0 0 16px #ff5a1f)'}} />}
      </svg>
      {titulo && <Titulo texto={titulo} y={300} size={92} cor={cinza ? '#d8d0c8' : '#fff'} />}
      <Etiqueta texto={cinza ? 'ILUSTRAÇÃO' : 'MAPA REAL'} />
    </AbsoluteFill>
  );
};
const OutroLado: React.FC = () => <Globo lon={[-60, 118]} lat={[20, -8]} titulo="DO OUTRO LADO DO MUNDO" alvo />;
const Verdade: React.FC = () => <Glitch texto="ISSO ACONTECEU DE VERDADE." size={130} />;
const Ano: React.FC<{de: number; ate: number; sub: string}> = ({de, ate, sub}) => {
  const f = useCurrentFrame();
  const n = Math.round(interpolate(f, [0, 14], [de, ate], clamp));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1b1a24, #050508 70%)'}}>
      <div style={{position: 'absolute', top: 680, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 300, color: '#fff', letterSpacing: -8}}>{n}</div>
      <Texto y={1020} size={56} cor={OURO} delay={6}>{sub}</Texto>
    </AbsoluteFill>
  );
};
const Ano1816: React.FC = () => <Ano de={2026} ate={1816} sub="O ANO EM QUE TUDO ISSO ACONTECEU" />;
const Ano1815: React.FC = () => <Ano de={1816} ate={1815} sub="UM ANO ANTES" />;
const MapaTambora: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const e = interpolate(f, [0, d * 0.7], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const k = Math.exp(interpolate(e, [0, 1], [Math.log(14), Math.log(60)]));
  const pr = proj(interpolate(e, [0, 1], [115, 118]), interpolate(e, [0, 1], [-3, -8.25]), k);
  const [px, py] = pr(118.0, -8.25);
  const pin = spring({frame: f - Math.round(d * 0.4), fps: FPS, config: {damping: 10}});
  return (
    <AbsoluteFill style={{background: '#0b2a44'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={caminho(indonesia as number[][][], pr)} fill="#2c4a5e" stroke="#7fa3c0" strokeWidth={2} />
      </svg>
      <Pino x={px} y={py} s={pin} />
      <div style={{position: 'absolute', left: 0, right: 0, top: py - 330, textAlign: 'center', fontFamily: FONTE, opacity: pin}}>
        <div style={{fontSize: 90, color: '#fff', textShadow: '0 4px 20px #000'}}>TAMBORA · 1815</div>
        <div style={{fontSize: 44, color: OURO}}>INDONÉSIA</div>
      </div>
      <Etiqueta texto="MAPA REAL" />
    </AbsoluteFill>
  );
};
const Explodiu: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [0, d], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #160806, #3a1206 60%, #0c0503)', overflow: 'hidden', transform: shake(f, 10 * (1 - p), 'e')}}>
      {Array.from({length: 26}, (_, i) => {
        const a = random('c' + i) * Math.PI - Math.PI;
        const r = 100 + p * (300 + random('cr' + i) * 520);
        const x = 540 + Math.cos(a) * r * 0.9, y = 1220 + Math.sin(a) * r * 1.3;
        const s = 140 + random('cs' + i) * 220 * (0.5 + p);
        return <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${120 + random('cc' + i) * 60},${80 + random('cd' + i) * 40},70,.85), transparent 70%)`}} />;
      })}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M0 1460 L380 1300 L460 1230 L620 1230 L700 1300 L1080 1460 L1080 1920 L0 1920 Z" fill="#0a0503" />
        <ellipse cx={540} cy={1235} rx={90} ry={22} fill={LAVA} style={{filter: 'drop-shadow(0 0 40px #ff5a1f)'}} />
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="EXPLODIU" y={300} size={150} cor={OURO} />
      <Texto y={490} size={36} delay={8}>A MAIOR ERUPÇÃO DOS ÚLTIMOS SÉCULOS</Texto>
    </AbsoluteFill>
  );
};
const Mortos: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1614, #050403 70%)'}}>
    <Contador ate={100000} y={640} size={200} pre="≈" />
    <Texto y={900} size={72} cor="#e8e0d8" delay={6}>MORTOS NA REGIÃO</Texto>
    <Texto y={1010} size={34} cor="#9a948c" delay={14}>ESTIMATIVA</Texto>
  </AbsoluteFill>
);
const Cinza: React.FC = () => <Globo lon={[100, 20]} lat={[-5, 25]} titulo="A CINZA COBRIU O CÉU" cinza={1} />;
const Termometro: React.FC = () => {
  const f = useCurrentFrame();
  const n = interpolate(f, [4, 30], [0.7, 0.42], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1a2a, #03080e)'}}>
      <div style={{position: 'absolute', left: 470, top: 560, width: 140, height: 760, borderRadius: 70, background: 'rgba(255,255,255,.1)', border: '8px solid #cfd8e8'}}>
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, height: 700 * n, borderRadius: 50, background: `linear-gradient(0deg, ${CIANO}, #9ae6ff)`}} />
      </div>
      <div style={{position: 'absolute', left: 430, top: 1250, width: 220, height: 220, borderRadius: 110, background: CIANO, border: '8px solid #cfd8e8'}} />
      <Titulo texto="−1 °C" y={300} size={180} cor={CIANO} />
      <Texto y={500} size={40} delay={10}>O PLANETA INTEIRO ESFRIOU</Texto>
    </AbsoluteFill>
  );
};
const Geada: React.FC = () => (
  <AbsoluteFill>
    <Real src="semverao/r251496.mp4" ini={1} />
    <Sombra />
    <Etiqueta texto="IMAGEM REAL · ILUSTRATIVA" real />
    <Titulo texto="EUA: NEVOU EM JUNHO" y={330} size={100} cor={GELO} />
  </AbsoluteFill>
);
const Fome: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a2018, #080604 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: s}}>
        <ellipse cx={540} cy={1000} rx={320} ry={70} fill="#5a4a3a" />
        <path d="M220 1000 Q540 1340 860 1000 Z" fill="#8a7460" />
        <ellipse cx={540} cy={1000} rx={300} ry={58} fill="#2a2018" />
      </svg>
      <Etiqueta texto="ILUSTRAÇÃO" />
      <Titulo texto="EUROPA: FOME" y={300} size={120} />
    </AbsoluteFill>
  );
};
const SemVeraoCard: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #6a8aa8, #1a2a3a)', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, textAlign: 'center', opacity: s, transform: `scale(${0.85 + 0.15 * s})`}}>
        <div style={{fontSize: 200, color: '#fff', letterSpacing: -6}}>1816</div>
        <div style={{fontSize: 96, color: GELO, lineHeight: 1.05}}>O ANO<br />SEM VERÃO</div>
      </div>
    </AbsoluteFill>
  );
};
const Ruim: React.FC = () => <Glitch texto="AGORA, A PARTE RUIM." size={140} cor={VERMELHO} />;
const Cambridge: React.FC = () => {
  const s = useSpring(0);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #0f1e33, #03060c 75%)'}}>
      <div style={{position: 'absolute', left: 110, top: 580, width: 860, height: 520, borderRadius: 30, background: 'rgba(8,14,30,.92)',
        border: '3px solid rgba(76,201,240,.7)', opacity: s, transform: `scale(${0.9 + 0.1 * s})`, textAlign: 'center', fontFamily: FONTE}}>
        <div style={{marginTop: 60, fontSize: 40, color: CIANO, letterSpacing: 4}}>NATURE · 2022</div>
        <div style={{marginTop: 50, fontSize: 84, color: '#fff', lineHeight: 1.05}}>UNIVERSIDADE<br />DE CAMBRIDGE</div>
        <div style={{marginTop: 40, fontSize: 36, color: OURO}}>CALCULARAM A CHANCE</div>
      </div>
    </AbsoluteFill>
  );
};
const Dado: React.FC = () => {
  const f = useCurrentFrame();
  const r = spring({frame: f, fps: FPS, config: {damping: 14, mass: 1.2}});
  const dot = (x: number, y: number) => <circle cx={x} cy={y} r={28} fill="#111" />;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a0c0c, #050202 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 1000) rotate(${(1 - r) * 540}) scale(${0.5 + 0.5 * r})`}>
          <rect x={-200} y={-200} width={400} height={400} rx={60} fill="#f4f1ea" />
          {/* face 6 */}
          {[-100, 0, 100].map((y) => <React.Fragment key={y}>{dot(-90, y)}{dot(90, y)}</React.Fragment>)}
        </g>
      </svg>
      <Titulo texto="1 EM 6" y={300} size={180} cor={VERMELHO} />
      <Texto y={510} size={38} cor="#fff" delay={10}>DE UMA ERUPÇÃO DESSE TAMANHO OU MAIOR</Texto>
      <Texto y={1260} size={32} cor="#9aa0aa" delay={16}>ESTIMATIVA</Texto>
    </AbsoluteFill>
  );
};
const Seculo: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 30], [0, 0.26], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a1020, #050810)'}}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 980, height: 30, borderRadius: 15, background: 'rgba(255,255,255,.12)'}}>
        <div style={{width: `${p * 100}%`, height: '100%', borderRadius: 15, background: OURO}} />
      </div>
      <div style={{position: 'absolute', left: 100, top: 1040, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>2000</div>
      <div style={{position: 'absolute', right: 100, top: 1040, fontFamily: FONTE, fontSize: 44, color: '#fff'}}>2100</div>
      <div style={{position: 'absolute', left: 100 + 880 * p - 60, top: 900, fontFamily: FONTE, fontSize: 40, color: OURO}}>HOJE</div>
      <Titulo texto="AINDA NESTE SÉCULO" y={300} size={100} />
      <Texto y={1200} size={36} cor="#9aa0aa" delay={8}>1 EM 6 NESTE SÉCULO (ESTIMATIVA)</Texto>
    </AbsoluteFill>
  );
};
const Gente: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a1a24, #050508 70%)'}}>
      <div style={{position: 'absolute', left: 150, top: 760, width: 780, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14}}>
        {Array.from({length: 8}, (_, i) => {
          const s = spring({frame: f - 4 - i * 2.5, fps: FPS, config: {damping: 11}});
          return <svg key={i} width={80} height={180} viewBox="0 0 80 180" style={{opacity: s, transform: `scale(${s})`}}>
            <circle cx={40} cy={28} r={24} fill={i === 0 ? '#9aa0aa' : OURO} /><rect x={12} y={60} width={56} height={110} rx={24} fill={i === 0 ? '#9aa0aa' : OURO} />
          </svg>;
        })}
      </div>
      <Titulo texto="8× MAIS GENTE" y={300} size={130} cor={OURO} />
      <Texto y={1040} size={36} delay={10}>QUE EM 1815</Texto>
    </AbsoluteFill>
  );
};
const UmEmQuatro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0e0806, #050302)'}}>
      <div style={{position: 'absolute', left: 140, top: 720, width: 800, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30}}>
        {Array.from({length: 4}, (_, i) => {
          const s = spring({frame: f - 2 - i * 3, fps: FPS, config: {damping: 12}});
          return <svg key={i} width={170} height={170} viewBox="0 0 170 170" style={{opacity: s}}>
            <path d="M10 160 L70 40 L100 40 L160 160 Z" fill={i === 0 ? LAVA : '#4a3a30'} />
            {i === 0 && <circle cx={135} cy={40} r={18} fill={VERDE} />}
          </svg>;
        })}
      </div>
      <Titulo texto="SÓ 1 EM 4" y={300} size={150} cor="#fff" />
      <Texto y={1000} size={40} cor={VERDE} delay={10}>TINHA SISMÓGRAFO POR PERTO</Texto>
    </AbsoluteFill>
  );
};
const Sismografo: React.FC = () => {
  const f = useCurrentFrame();
  const pts = Array.from({length: 120}, (_, i) => `${60 + i * 8},${960 + noise(i, f) * (i > 70 && i < 90 ? 60 : 10)}`).join(' ');
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #071018, #02050a)'}}>
      <div style={{position: 'absolute', left: 50, top: 740, width: 980, height: 440, borderRadius: 24, background: '#08131e', border: '3px solid #1f3a52'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polyline points={pts} fill="none" stroke={VERDE} strokeWidth={5} />
      </svg>
      <Titulo texto="DESDE 1950" y={300} size={130} />
      <Texto y={1260} size={40} delay={8}>3 EM 4 SEM SISMÓGRAFO</Texto>
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
const noise = (i: number, f: number) => Math.sin(i * 1.7 + f * 0.6) * Math.cos(i * 0.9 - f * 0.3);
const Calma: React.FC = () => <Glitch texto="CALMA." size={210} />;
const Qual: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0a0e18, #030408)'}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 110 + i * 300, top: 900}}>
          <svg width={260} height={220} viewBox="0 0 260 220"><path d="M10 210 L100 50 L160 50 L250 210 Z" fill="#3a2e28" /></svg>
          <div style={{position: 'absolute', left: 0, right: 0, top: -170, textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: OURO, opacity: 0.5 + 0.5 * Math.sin(f * 0.25 + i)}}>?</div>
        </div>
      ))}
      <Titulo texto="QUAL? QUANDO?" y={300} size={120} />
      <Texto y={1200} size={40} delay={8}>NINGUÉM SABE</Texto>
    </AbsoluteFill>
  );
};
const Nenhum: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(4, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #062a1a, #020806 70%)'}}>
      <div style={{position: 'absolute', left: 390, top: 380, width: 300, height: 300, borderRadius: '50%', background: VERDE, opacity: s, transform: `scale(${s})`,
        display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 ${80 + 20 * Math.sin(f * 0.2)}px rgba(61,220,132,.6)`}}>
        <svg width={170} height={170} viewBox="-60 -60 120 120"><path d="M-36 0 L-10 26 L38 -26" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
      </div>
      <div style={{position: 'absolute', top: 780, left: 60, right: 60, padding: '36px 20px', borderRadius: 30, background: 'rgba(0,0,0,.5)', border: `5px solid ${VERDE}`,
        textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#fff', lineHeight: 1.05, opacity: s}}>NENHUM PRESTES<br />A EXPLODIR</div>
    </AbsoluteFill>
  );
};
const Perigo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #160806, #050202)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M200 1400 L470 980 L610 980 L880 1400 Z" fill="#2a1a12" />
        <ellipse cx={540} cy={985} rx={70} ry={16} fill={LAVA} opacity={0.4 + 0.3 * Math.sin(f * 0.3)} />
      </svg>
      <Titulo texto="O PERIGO NÃO É O VULCÃO" y={330} size={92} />
    </AbsoluteFill>
  );
};
const Pronto: React.FC = () => {
  const f = useCurrentFrame();
  const g = orto(f * 0.5, 15, 340, 540, 1060);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #07142a, #000 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1060} r={340} fill="#0b2a44" />
        <path d={caminhoGlobo(mundo as number[][][], g)} fill="#3d6a52" />
        {[0, 1, 2].map((i) => { const q = ((f * 0.03 + i / 3) % 1); return <circle key={i} cx={540} cy={1060} r={360 + q * 300} fill="none" stroke={OURO} strokeWidth={4} opacity={1 - q} />; })}
      </svg>
      <Titulo texto="É O MUNDO NÃO ESTAR PRONTO" y={300} size={86} cor={OURO} />
    </AbsoluteFill>
  );
};

const CENAS = [SolNeve, Junho, Nevando, Mercado, Guerra, Erupcao, OutroLado, Verdade, Ano1816, Ano1815, MapaTambora, Explodiu, Mortos, Cinza, Termometro,
  Geada, Fome, SemVeraoCard, Ruim, Cambridge, Dado, Seculo, Gente, UmEmQuatro, Sismografo, Calma, Qual, Nenhum, Perigo, Pronto];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const T = TEMPO.T;
const SONS = [
  {em: T[FRASES.indexOf('foi um vulcao')], src: 'sfx/boom.wav', volume: 0.45},
  {em: T[FRASES.indexOf('explodiu')], src: 'sfx/boom.wav', volume: 0.55},
];

export const Video: React.FC = () => <Short W={W} tempo={TEMPO} cenas={CENAS} audio="semverao/narracao.mp3" calma={CALMA} sons={SONS} />;
