// Short POV "Você impediu o próprio nascimento. Quem voltou no tempo?" Roteiro do Roteirista (roteiros/lote_2026-10-31_paradoxos.md #2, v1), aprovado pelo dono em 31/10.
// Voz edge-tts Antonio. Reais (NASA): Stephen Hawking na palestra dos 50 anos da NASA (2008, NASA/Paul E. Alers) e o aglomerado Abell 2744 (Hubble, NASA/ESA).
// Gödel sem retrato (só o nome). O resto é ilustração/animação própria. Nenhuma cena nem imagem se repete (regra do dono, 30/10).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO} from '../comum';
import palavras from './avo.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'voce volta ao passado', 'e impede o seu', 'entao quem voltou', 'se voce nunca nasceu', 'ninguem entrou na maquina', 'mas se ninguem entrou', 'voce nasceu e ai', 'e ai entrou',
  'e o paradoxo do avo', 'um escritor frances', 'e a fisica nao proibe', 'em 1949', 'com caminhos que voltam', 'mas o nosso universo', 'stephen hawking apostou', 'ninguem provou',
  'outros dizem', 'tudo o que voce fizesse', 'voce tentaria', 'e falharia', 'em 2020', 'mas e so matematica', 'ninguem construiu', 'ninguem nunca voltou', 'o paradoxo continua',
  'e talvez seja',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('e a fisica nao proibe');
const AVISO = FRASES.indexOf('ninguem nunca voltou');
export const DURACAO = TEMPO.FIM;
const ROXO = '#9b7bff';
const PELE = '#e8d2c0';

// ---------- peças ----------
const img = (s: string) => staticFile('avo/' + s);
const Foto: React.FC<{src: string; etq: string; z?: [number, number]; pos?: string; filtro?: string; children?: React.ReactNode}> = ({src, etq, z = [1.05, 1.18], pos = 'center', filtro, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={img(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: filtro, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real />
      {children}
    </AbsoluteFill>
  );
};
const Fundo: React.FC<{cor?: string; children?: React.ReactNode}> = ({cor = '#1a1040', children}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${cor}, #030208 75%)`}}>{children}</AbsoluteFill>
);
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '20px 40px', margin: '0 50px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
const Carimbo: React.FC<{texto: string; cor?: string; y?: number; size?: number; rot?: number}> = ({texto, cor = VERMELHO, y = 900, size = 110, rot = -8}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [3, 9], [2.4, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center', opacity: f >= 3 ? 1 : 0}}>
      <div style={{padding: '22px 42px', border: `11px solid ${cor}`, borderRadius: 18, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.05, whiteSpace: 'pre-line',
        transform: `rotate(${rot}deg) scale(${s})`}}>{texto}</div>
    </div>
  );
};
const Pessoa: React.FC<{x: number; y: number; h: number; cor?: string; op?: number}> = ({x, y, h, cor = PELE, op = 1}) => (
  <g transform={`translate(${x} ${y})`} fill={cor} opacity={op}>
    <circle cy={-h * 0.86} r={h * 0.12} />
    <path d={`M${-h * 0.2} 0 L${-h * 0.22} ${-h * 0.5} Q${-h * 0.2} ${-h * 0.72} 0 ${-h * 0.72} Q${h * 0.2} ${-h * 0.72} ${h * 0.22} ${-h * 0.5} L${h * 0.2} 0 Z`} />
  </g>
);
// cartão de nome (sem retrato)
const Cartao: React.FC<{nome: string; info: string; cor?: string}> = ({nome, info, cor = ROXO}) => {
  const s = useSpring(3);
  return (
    <div style={{position: 'absolute', top: 1060, left: 80, right: 80, padding: '36px 40px', borderLeft: `14px solid ${cor}`, background: 'rgba(14,10,36,.85)', opacity: s, transform: `translateX(${(1 - s) * -200}px)`}}>
      <div style={{fontFamily: FONTE, fontSize: 84, color: '#fff', lineHeight: 1}}>{nome}</div>
      <div style={{fontFamily: FONTE, fontSize: 44, color: cor, marginTop: 16}}>{info}</div>
    </div>
  );
};

// ---------- cenas ----------
// 1. gancho: a máquina do tempo pulsando numa sala escura
const Maquina: React.FC = () => {
  const f = useCurrentFrame();
  const p = 0.5 + 0.5 * Math.sin(f * 0.6);
  return (
    <AbsoluteFill style={{background: '#020205', transform: shake(f, f < 10 ? 12 : 3)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="mq"><stop offset="0" stopColor="#fff" /><stop offset="0.3" stopColor={CIANO} /><stop offset="1" stopColor={CIANO} stopOpacity={0} /></radialGradient></defs>
        <circle cx={540} cy={1000} r={500 + 80 * p} fill="url(#mq)" opacity={0.35 + 0.3 * p} />
        {[0, 1, 2].map((k) => <ellipse key={k} cx={540} cy={1000} rx={330 - k * 60} ry={420 - k * 70} fill="none" stroke={k === 1 ? OURO : CIANO} strokeWidth={14}
          transform={`rotate(${f * (k % 2 ? -6 : 6) + k * 40} 540 1000)`} opacity={0.9} />)}
        <Pessoa x={540} y={1260} h={420} cor="#05060a" />
      </svg>
      <Titulo texto="VOCÊ VOLTA AO PASSADO" y={260} size={104} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 2. a certidão de nascimento se apagando
const Certidao: React.FC = () => {
  const f = useCurrentFrame();
  const apaga = interpolate(f, [8, 40], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#1a140a,#060402)'}}>
      <div style={{position: 'absolute', left: 140, right: 140, top: 600, height: 760, background: '#efe6cf', borderRadius: 8, padding: 50, boxShadow: '0 30px 60px rgba(0,0,0,.7)', transform: 'rotate(2deg)'}}>
        <div style={{fontFamily: FONTE, fontSize: 58, color: '#3a2a10', textAlign: 'center'}}>CERTIDÃO DE NASCIMENTO</div>
        {Array.from({length: 7}, (_, i) => <div key={i} style={{height: 18, margin: '44px 0', background: '#8a7a5a', borderRadius: 9, width: `${60 + 40 * random('cl' + i)}%`, opacity: 1 - apaga * (1 + random('ca' + i))}} />)}
      </div>
      <Titulo texto="E IMPEDE O SEU NASCIMENTO" y={280} size={96} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 3. quem voltou? silhueta com interrogação
const QuemVoltou: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(4, {damping: 8, mass: 0.6});
  return (
    <Fundo cor="#2a0a20">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Pessoa x={540} y={1450} h={760} cor="#0a0a10" /></svg>
      <div style={{position: 'absolute', top: 720, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 340, color: VERMELHO, opacity: s, transform: `scale(${s}) rotate(${Math.sin(f * 0.3) * 5}deg)`}}>?</div>
      <Titulo texto="ENTÃO, QUEM VOLTOU?" y={280} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 4. o berço vazio
const Berco: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 60%, #1a2030, #040507 70%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <rect x={200} y={1100} width={680} height={40} fill="#c8b08a" />
      <rect x={200} y={1300} width={680} height={40} fill="#c8b08a" />
      {Array.from({length: 11}, (_, i) => <rect key={i} x={210 + i * 64} y={1100} width={18} height={240} fill="#c8b08a" />)}
      <rect x={180} y={1000} width={40} height={460} rx={10} fill="#a88a62" /><rect x={860} y={1000} width={40} height={460} rx={10} fill="#a88a62" />
    </svg>
    <Titulo texto="VOCÊ NUNCA NASCEU" y={300} size={120} />
    <Etiqueta texto="ILUSTRAÇÃO" />
  </AbsoluteFill>
);
// 5. a cabine da máquina, vazia
const Cabine: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#04060a'}}>
      <div style={{position: 'absolute', left: 290, top: 560, width: 500, height: 900, borderRadius: '250px 250px 30px 30px', border: '16px solid #5a6a84', background: 'linear-gradient(180deg,#0a1a2a,#061018)',
        boxShadow: `inset 0 0 ${80 + 40 * Math.sin(f * 0.4)}px ${CIANO}66`}} />
      <div style={{position: 'absolute', top: 960, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: '#5a6a84', letterSpacing: 6}}>VAZIA</div>
      <Titulo texto="NINGUÉM ENTROU NA MÁQUINA" y={260} size={96} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 6. "mas se ninguém entrou": a chave vira
const Chave: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [6, 14], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#0e0e14'}}>
      <div style={{position: 'absolute', left: 290, top: 820, width: 500, height: 240, borderRadius: 120, background: t > 0.5 ? '#3ddc84' : '#444a5a', transition: 'none'}} />
      <div style={{position: 'absolute', left: 310 + 260 * t, top: 840, width: 200, height: 200, borderRadius: 100, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,.5)'}} />
      <Titulo texto="MAS SE NINGUÉM ENTROU…" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 7. você nasceu: o bebê acende
const Nasceu: React.FC = () => {
  const s = useSpring(2, {damping: 10, mass: 0.5});
  return (
    <Fundo cor="#3a2a08">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 1060) scale(${0.6 + 0.4 * s})`} fill={OURO}>
          <circle cx={0} cy={-120} r={110} /><ellipse cx={0} cy={110} rx={150} ry={170} />
        </g>
      </svg>
      <Titulo texto="VOCÊ NASCEU" y={300} size={140} cor={OURO} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 8. e aí, entrou: o laço infinito girando
const Laco: React.FC = () => {
  const f = useCurrentFrame();
  const t = f * 0.12;
  const px = 540 + 360 * Math.cos(t) / (1 + Math.sin(t) ** 2), py = 1000 + 360 * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) ** 2);
  const d = Array.from({length: 121}, (_, i) => { const a = (i / 120) * Math.PI * 2; const k = 1 + Math.sin(a) ** 2; return `${i ? 'L' : 'M'}${540 + 360 * Math.cos(a) / k} ${1000 + 360 * Math.sin(a) * Math.cos(a) / k}`; }).join(' ');
  return (
    <AbsoluteFill style={{background: '#05040c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={d} fill="none" stroke={ROXO} strokeWidth={22} opacity={0.8} />
        <circle cx={px} cy={py} r={36} fill={OURO} />
      </svg>
      <Titulo texto="E AÍ, ENTROU" y={300} size={130} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 9. o retrato do avô, rachando
const Avo: React.FC = () => {
  const f = useCurrentFrame();
  const r = interpolate(f, [10, 20], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#0c0a08'}}>
      <div style={{position: 'absolute', left: 240, top: 620, width: 600, height: 740, border: '30px solid #7a5a2a', borderRadius: 300, background: 'radial-gradient(circle at 50% 40%, #a08a6a, #3a2e22)', overflow: 'hidden', filter: 'sepia(.8)'}}>
        <svg width={540} height={680}>
          <Pessoa x={270} y={760} h={640} cor="#3a2a1c" />
          <path d={`M270 0 L240 140 L300 260 L230 400 L290 520 L250 680`} stroke="#fff" strokeWidth={6} fill="none" strokeDasharray="900" strokeDashoffset={900 * (1 - r)} />
        </svg>
      </div>
      <Selo texto="PARADOXO DO AVÔ" y={280} size={92} cor={OURO} delay={0} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 10. folhetim antigo (Barjavel)
const Folhetim: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#14100a'}}>
      <div style={{position: 'absolute', left: 100, right: 100, top: 560, height: 880, background: '#e6dcc2', padding: 40, transform: `rotate(-3deg) scale(${interpolate(f, [0, 90], [1, 1.08])})`, boxShadow: '0 30px 60px rgba(0,0,0,.7)', filter: 'sepia(.5)'}}>
        <div style={{fontFamily: 'serif', fontSize: 84, color: '#1a120a', textAlign: 'center', fontWeight: 900, borderBottom: '6px double #1a120a', paddingBottom: 14}}>LE VOYAGEUR</div>
        <div style={{display: 'flex', gap: 26, marginTop: 30}}>
          {[0, 1, 2].map((c) => <div key={c} style={{flex: 1}}>{Array.from({length: 16}, (_, i) => <div key={i} style={{height: 10, margin: '22px 0', background: '#5a4a32', width: `${70 + 30 * random('fl' + c + i)}%`}} />)}</div>)}
        </div>
      </div>
      <Selo texto="BARJAVEL · 1943" y={1300} size={76} cor={VERMELHO} delay={8} />
      <Titulo texto="UM ESCRITOR FRANCÊS" y={280} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO · FATO HISTÓRICO" />
    </AbsoluteFill>
  );
};
// 11. virada
const NoPapel: React.FC = () => <Glitch texto={'NO PAPEL,\nPODE'} size={190} cor={OURO} fundo="#05050a" />;
// 12. Gödel, 1949 (só o nome) sobre as equações de Einstein em neon
const Godel: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg,#06050e,#120a24)'}}>
    <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic', fontSize: 110, color: CIANO, textShadow: `0 0 30px ${CIANO}`}}>G<sub>μν</sub> = 8πT<sub>μν</sub></div>
    <Texto y={830} size={40} cor="#8aa">AS EQUAÇÕES DE EINSTEIN</Texto>
    <Cartao nome="KURT GÖDEL" info="1949 · HIPÓTESE MATEMÁTICA" />
    <Titulo texto="O MATEMÁTICO ACHOU UMA SAÍDA" y={260} size={92} />
  </AbsoluteFill>
);
// 13. o cone de luz se dobrando num laço
const Cone: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 50], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#020208'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 8}, (_, i) => {
          const a = (i / 8) * Math.PI * 2 * t, cx = 540 + Math.sin(a) * 300, cy = 1300 - (1 - Math.cos(a)) * 300 - i * (1 - t) * 90, rot = (a * 180) / Math.PI;
          return <g key={i} transform={`translate(${cx} ${cy}) rotate(${-rot})`} opacity={0.4 + 0.6 * (i / 7)}>
            <path d="M0 0 L-70 -110 L70 -110 Z" fill={OURO} opacity={0.35} stroke={OURO} strokeWidth={4} />
          </g>;
        })}
      </svg>
      <Titulo texto="CAMINHOS QUE VOLTAM NO TEMPO" y={260} size={92} />
      <Etiqueta texto="ANIMAÇÃO · CONES DE LUZ" />
    </AbsoluteFill>
  );
};
// 14. real: Abell 2744 (Hubble), "o nosso universo não é assim"
const NossoUniverso: React.FC = () => (
  <Foto src="abell2744.jpg" etq="IMAGEM REAL · ABELL 2744 · HUBBLE · NASA/ESA" z={[1.3, 1.1]}>
    <Selo texto={'O NOSSO UNIVERSO\nNÃO É ASSIM'} y={820} size={84} cor="#fff" delay={4} />
  </Foto>
);
// 15. real: Stephen Hawking (NASA, 2008)
const Hawking: React.FC = () => (
  <Foto src="hawking.jpg" etq="IMAGEM REAL · STEPHEN HAWKING · NASA, 2008" z={[1.0, 1.1]} pos="72% 50%">
    <Selo texto="HAWKING · 1992 · CONJECTURA" y={1240} size={56} cor={OURO} delay={6} />
    <Titulo texto="A NATUREZA DÁ UM JEITO?" y={300} size={100} />
  </Foto>
);
// 16. carimbo: não provado
const NaoProvado: React.FC = () => (
  <AbsoluteFill style={{background: '#e9e2d0'}}>
    {Array.from({length: 16}, (_, i) => <div key={i} style={{position: 'absolute', top: 560 + i * 52, left: 120, right: 120, height: 3, background: '#b8b0a0'}} />)}
    <Carimbo texto={'NINGUÉM\nPROVOU'} y={780} size={120} />
    <Etiqueta texto="CONJECTURA" />
  </AbsoluteFill>
);
// 17. a linha do tempo se fecha num círculo (Novikov)
const Circulo: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, 45], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const R = 330, L = 2 * Math.PI * R;
  // reta virando círculo: interpolo pontos
  const d = Array.from({length: 61}, (_, i) => {
    const u = i / 60, ang = -Math.PI / 2 + u * Math.PI * 2;
    const xl = 540 - L / 2 * 0.35 + u * L * 0.35, yl = 980;
    const xc = 540 + Math.cos(ang) * R, yc = 980 + R + Math.sin(ang) * R - R;
    return `${i ? 'L' : 'M'}${xl + (xc - xl) * t} ${yl + (yc - yl) * t}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{background: '#06040c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d={d} fill="none" stroke={CIANO} strokeWidth={16} /></svg>
      <Selo texto="NOVIKOV · 1990 · HIPÓTESE" y={1420} size={56} cor={CIANO} delay={10} />
      <Titulo texto="O PASSADO JÁ INCLUI VOCÊ" y={260} size={100} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 18. fita de filme já revelada: você está em todos os quadros
const Filme: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0a0a0a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 290, top: -400 + ((f * 8) % 380), width: 500, background: '#151515', padding: '0 60px'}}>
        {Array.from({length: 8}, (_, i) => (
          <div key={i} style={{height: 340, margin: '40px 0', background: 'linear-gradient(180deg,#6a5a40,#3a3020)', position: 'relative', filter: 'sepia(.7)'}}>
            <svg width={380} height={340}><Pessoa x={190} y={360} h={300} cor="#20180e" /></svg>
          </div>
        ))}
      </div>
      <Titulo texto="TUDO JÁ ACONTECEU" y={280} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 19. você tenta sair do círculo
const Tentaria: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 25], [540, 760], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#06040c'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1060} r={300} fill="none" stroke={CIANO} strokeWidth={12} strokeDasharray="30 18" transform={`rotate(${f * 2} 540 1060)`} />
        <Pessoa x={x} y={1200} h={260} cor={OURO} />
      </svg>
      <Titulo texto="VOCÊ TENTARIA" y={300} size={130} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 20. e falharia: bate na borda e volta
const Falharia: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#100406', transform: f < 8 ? shake(f, 14) : undefined}}>
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 420, color: VERMELHO, lineHeight: 1}}>✕</div>
      <Titulo texto="E FALHARIA" y={300} size={140} cor={VERMELHO} />
      <Etiqueta texto="LEITURA DA HIPÓTESE DE NOVIKOV" />
    </AbsoluteFill>
  );
};
// 21. quadro-negro com equações (Tobar e Costa, 2020)
const Quadro: React.FC = () => {
  const f = useCurrentFrame();
  const linhas = ['ψ(t) → ψ(t₀)', 'Σ Pᵢ = 1', '∮ U dt = 𝟙', 'sem contradição'];
  return (
    <AbsoluteFill style={{background: '#0a0806'}}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 560, height: 700, background: '#1f3a2c', border: '24px solid #6a4a2a', borderRadius: 8}}>
        {linhas.map((l, i) => <div key={i} style={{position: 'absolute', left: 60, top: 60 + i * 150, fontFamily: 'serif', fontStyle: 'italic', fontSize: 76, color: '#e8f0e8',
          clipPath: `inset(0 ${100 - interpolate(f, [i * 10, i * 10 + 14], [0, 100], clamp)}% 0 0)`}}>{l}</div>)}
      </div>
      <Selo texto={'TOBAR E COSTA · 2020\nHIPÓTESE MATEMÁTICA'} y={1300} size={52} cor={OURO} delay={20} />
      <Titulo texto="UM ESTUDO DE 2020" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 22. carimbo verde-escuro: só matemática, sobre papel quadriculado
const SoMatematica: React.FC = () => (
  <AbsoluteFill style={{background: '#f2f2ec', backgroundImage: 'linear-gradient(#cfd8e8 2px, transparent 2px), linear-gradient(90deg, #cfd8e8 2px, transparent 2px)', backgroundSize: '50px 50px'}}>
    <Carimbo texto={'SÓ\nMATEMÁTICA'} cor="#1f6fd0" y={780} size={84} rot={6} />
  </AbsoluteFill>
);
// 23. contador de máquinas: zero
const ZeroMaquinas: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a1a1a, #000 70%)'}}>
      <div style={{position: 'absolute', top: 620, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 520, color: '#fff', lineHeight: 1, opacity: f % 20 < 2 ? 0.4 : 1}}>0</div>
      <Texto y={1200} size={70} cor="#aab4cc">MÁQUINAS DO TEMPO</Texto>
      <Titulo texto="NINGUÉM CONSTRUIU" y={300} size={120} />
    </AbsoluteFill>
  );
};
// 24. o relógio tenta girar pra trás e trava
const Relogio: React.FC = () => {
  const f = useCurrentFrame();
  const a = f < 20 ? -f * 9 : -180 + Math.sin(f * 3) * 4;
  return (
    <AbsoluteFill style={{background: '#08080e'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={340} fill="#f4efe6" stroke="#333" strokeWidth={20} />
        {Array.from({length: 12}, (_, i) => { const r = (i * 30 * Math.PI) / 180; return <line key={i} x1={540 + Math.sin(r) * 290} y1={1000 - Math.cos(r) * 290} x2={540 + Math.sin(r) * 320} y2={1000 - Math.cos(r) * 320} stroke="#333" strokeWidth={10} />; })}
        <line x1={540} y1={1000} x2={540 + Math.sin(a * Math.PI / 180) * 260} y2={1000 - Math.cos(a * Math.PI / 180) * 260} stroke={VERMELHO} strokeWidth={14} strokeLinecap="round" />
        <circle cx={540} cy={1000} r={24} fill="#333" />
      </svg>
      <Titulo texto="NINGUÉM NUNCA VOLTOU" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 25. o papel queimando nas bordas
const Queima: React.FC = () => {
  const f = useCurrentFrame();
  const q = interpolate(f, [0, 60], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#050302'}}>
      <div style={{position: 'absolute', left: 160, right: 160, top: 640, height: 640, background: '#e6dcc2', boxShadow: `inset 0 0 ${60 + 140 * q}px ${20 + 40 * q}px #3a1a06, 0 0 ${60 * q}px ${LARANJA}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', fontStyle: 'italic', fontSize: 64, color: '#2a1a0a', textAlign: 'center'}}>o paradoxo<br />do avô</div>
      <Titulo texto="SÓ NO PAPEL" y={300} size={140} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 26. a porta fechada com luz vazando, e depois o preto
const Fresta: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const apaga = interpolate(f, [d - 20, d], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{opacity: apaga}}>
        <div style={{position: 'absolute', left: 260, top: 520, width: 560, height: 1000, background: '#1a1410', border: '14px solid #2a2016'}} />
        <div style={{position: 'absolute', left: 260, top: 1520, width: 560, height: 14, background: '#fff6d8', boxShadow: '0 0 60px 20px #ffe6a0'}} />
        <div style={{position: 'absolute', left: 806, top: 520, width: 10, height: 1000, background: '#fff6d8', boxShadow: '0 0 40px 10px #ffe6a0', opacity: 0.7 + 0.3 * Math.sin(f * 0.3)}} />
      </div>
      <Titulo texto="O QUE O UNIVERSO PROTEGE" y={280} size={100} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
const LARANJA = '#ff7a1a';

const AvisoFixo: React.FC = () => (
  <div style={{position: 'absolute', top: 1400, width: '100%', display: 'flex', justifyContent: 'center'}}>
    <div style={{padding: '10px 26px', border: `4px solid ${ROXO}`, borderRadius: 14, fontFamily: FONTE, fontSize: 40, color: ROXO, background: 'rgba(0,0,0,.7)', letterSpacing: 2}}>HIPÓTESE, NÃO EXPERIMENTO</div>
  </div>
);

const CENAS = [Maquina, Certidao, QuemVoltou, Berco, Cabine, Chave, Nasceu, Laco, Avo, Folhetim, NoPapel, Godel, Cone, NossoUniverso, Hawking, NaoProvado, Circulo, Filme, Tentaria,
  Falharia, Quadro, SoMatematica, ZeroMaquinas, Relogio, Queima, Fresta];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Short W={W} tempo={TEMPO} cenas={CENAS} audio="avo/narracao.mp3" calma={CALMA} sons={SONS} />
      {f >= TEMPO.T[AVISO] && f < TEMPO.FIM && <AvisoFixo />}
    </AbsoluteFill>
  );
};
