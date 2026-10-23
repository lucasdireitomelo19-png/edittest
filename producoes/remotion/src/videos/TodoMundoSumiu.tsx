// Modelo de referência (teste aprovado pelo dono em 23/10/2026): primeiros ~21 s do Short
// "E se você acordasse e todo mundo tivesse sumido?" (lado-50), 100% motion graphics, narração edge-tts.
import React from 'react';
import {
  AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random, Easing,
} from 'remotion';
import {noise2D} from '@remotion/noise';
import palavras from './todo_mundo_sumiu.palavras.json';

const FPS = 30;
const W = palavras as {t: number; d: number; w: string}[];
const fr = (s: number) => Math.round(s * FPS);
const FIM = fr(W[W.length - 1].t + W[W.length - 1].d + 0.9);
// índices das palavras onde cada cena começa
const CORTES = [0, 2, 8, 10, 15, 25, 28, 39, 44, 49, 54, 62, 65];
const T = CORTES.map((i) => (i === 0 ? 0 : fr(W[i].t) - 1));
const MAS = T[8];
const DIA2 = T[11];
export const DURACAO = FIM;

const OURO = '#FFD23F';
const LARANJA = '#FF7A1A';
const FONTE = 'Monts';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const useSpring = (delay = 0, cfg = {damping: 12, mass: 0.6}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: cfg});
};

// tremor de câmera suave (ruído contínuo, não aleatório quadro a quadro)
const shake = (f: number, amp: number, seed = 'a') =>
  `translate(${noise2D(seed + 'x', f / 9, 0) * amp}px, ${noise2D(seed + 'y', 0, f / 9) * amp}px)`;

const Titulo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({
  texto, cor = '#fff', y = 260, size = 110, delay = 0,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', top: y, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: size,
      color: cor, letterSpacing: -2, textShadow: '0 8px 40px rgba(0,0,0,.7)'}}>
      {texto.split('').map((c, i) => {
        const s = spring({frame: f - delay - i * 1.2, fps, config: {damping: 11, mass: 0.5}});
        return (
          <span key={i} style={{display: 'inline-block', whiteSpace: 'pre', opacity: s,
            transform: `translateY(${(1 - s) * 70}px) scale(${0.6 + 0.4 * s})`}}>{c}</span>
        );
      })}
    </div>
  );
};

// ---------- globo de pontos em 3D (cada ponto = gente) ----------
const PONTOS = Array.from({length: 700}, (_, i) => {
  const y = 1 - (i / 699) * 2;
  const r = Math.sqrt(1 - y * y);
  const th = i * 2.399963;
  return {x: Math.cos(th) * r, y, z: Math.sin(th) * r, k: random('p' + i)};
});
const Globo: React.FC<{some?: number; ouro?: boolean; R?: number}> = ({some = 0, ouro = false, R = 360}) => {
  const f = useCurrentFrame();
  const a = f * 0.018 + 0.6;
  const tilt = 0.38;
  return (
    <div style={{position: 'absolute', left: 540 - R, top: 760 - R, width: R * 2, height: R * 2}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%',
        background: ouro
          ? 'radial-gradient(circle at 35% 30%, #5a3a10, #1b0f02 65%, #000)'
          : 'radial-gradient(circle at 35% 30%, #12345a, #061426 62%, #01040a)',
        boxShadow: ouro ? `0 0 120px 20px rgba(255,170,40,.35)` : '0 0 120px 10px rgba(60,140,255,.25)'}} />
      <svg width={R * 2} height={R * 2} style={{position: 'absolute', inset: 0}}>
        {PONTOS.map((p, i) => {
          const x1 = p.x * Math.cos(a) + p.z * Math.sin(a);
          const z1 = -p.x * Math.sin(a) + p.z * Math.cos(a);
          const y2 = p.y * Math.cos(tilt) - z1 * Math.sin(tilt);
          const z2 = p.y * Math.sin(tilt) + z1 * Math.cos(tilt);
          if (z2 < 0) return null;
          const vivo = p.k >= some || i === 350;
          if (!vivo) return null;
          const voce = i === 350 && some > 0.5;
          return (
            <circle key={i} cx={R + x1 * R * 0.97} cy={R + y2 * R * 0.97} r={voce ? 9 : 2 + z2 * 2.4}
              fill={voce ? LARANJA : ouro ? OURO : '#ffe9a8'} opacity={voce ? 1 : 0.35 + z2 * 0.65}
              style={voce ? {filter: 'drop-shadow(0 0 14px #ff7a1a)'} : undefined} />
          );
        })}
      </svg>
    </div>
  );
};


// estrada em perspectiva desenhada à mão (horizonte em y=H, ponto de fuga no centro)
const Estrada: React.FC<{H: number; vel: number; cor?: string}> = ({H, vel, cor = '#18161b'}) => {
  const f = useCurrentFrame();
  const yz = (z: number) => H + (1920 - H) / z;
  const meia = (z: number) => 900 / z;
  const desl = (f * vel) % 2;
  const faixas = [];
  for (let k = 0; k < 40; k++) {
    const z0 = 0.6 + k * 2 - desl;
    if (z0 <= 0.35) continue;
    const z1 = z0 + 1;
    const y0 = yz(z0), y1 = yz(z1);
    const w0 = 26 / z0, w1 = 26 / z1;
    faixas.push(<polygon key={k} points={`${540 - w0},${y0} ${540 + w0},${y0} ${540 + w1},${y1} ${540 - w1},${y1}`} fill="#efe6c4" />);
  }
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <polygon points={`540,${H} 540,${H} ${540 + meia(0.4)},${yz(0.4)} ${540 - meia(0.4)},${yz(0.4)}`} fill={cor} />
      <line x1={540} y1={H} x2={540 + meia(0.4)} y2={yz(0.4)} stroke="#6b6458" strokeWidth={6} />
      <line x1={540} y1={H} x2={540 - meia(0.4)} y2={yz(0.4)} stroke="#6b6458" strokeWidth={6} />
      {faixas}
    </svg>
  );
};

// ---------- cenas ----------
const Acorda: React.FC = () => {
  const f = useCurrentFrame();
  const olho = interpolate(f, [0, 10, 14, 22], [0, 0.55, 0.4, 1], clamp);
  const tela = useSpring(6);
  const card = useSpring(14);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #1a2233, #04060a 70%)',
      transform: `scale(${1 + f * 0.0025})`}}>
      <div style={{position: 'absolute', left: 230, top: 330, width: 620, height: 1180, borderRadius: 70,
        background: '#0b0d12', border: '6px solid #2a2f3a', boxShadow: `0 0 ${200 * tela}px rgba(120,170,255,${0.35 * tela})`}}>
        <div style={{position: 'absolute', inset: 22, borderRadius: 52, opacity: tela,
          background: 'linear-gradient(180deg, #1d3557, #0a1324)'}}>
          <div style={{marginTop: 150, textAlign: 'center', color: '#fff', fontFamily: FONTE, fontSize: 190, letterSpacing: -6}}>07:00</div>
          <div style={{textAlign: 'center', color: '#bcd', fontFamily: FONTE, fontSize: 38}}>SEGUNDA-FEIRA</div>
          <div style={{margin: '120px 40px 0', padding: '34px 30px', borderRadius: 34, background: 'rgba(255,255,255,.12)',
            backdropFilter: 'blur(10px)', transform: `translateY(${(1 - card) * 80}px)`, opacity: card,
            fontFamily: FONTE, color: '#fff', fontSize: 44}}>
            0 mensagens<br /><span style={{color: '#9ab', fontSize: 34}}>0 chamadas · 0 notificações</span>
          </div>
        </div>
      </div>
      {/* pálpebras abrindo (POV) */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 960 * (1 - olho), background: '#000', borderRadius: '0 0 50% 50%'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 960 * (1 - olho), background: '#000', borderRadius: '50% 50% 0 0'}} />
    </AbsoluteFill>
  );
};

const Sumiu: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const p = interpolate(f, [3, d - 6], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const n = Math.max(1, Math.round(8e9 * Math.pow(1 - p, 3)));
  const zoom = interpolate(f, [0, d], [1.15, 1], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #07142a, #000 70%)', transform: `scale(${zoom})`}}>
      <Globo some={p * 0.999} />
      <div style={{position: 'absolute', top: 1180, width: '100%', textAlign: 'center', fontFamily: FONTE,
        fontSize: 120, color: p > 0.98 ? LARANJA : '#fff', letterSpacing: -3, fontVariantNumeric: 'tabular-nums'}}>
        {n.toLocaleString('pt-BR')}
      </div>
      <div style={{position: 'absolute', top: 1320, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 38, color: '#8aa', letterSpacing: 6}}>
        PESSOAS NA TERRA
      </div>
    </AbsoluteFill>
  );
};

const SoVoce: React.FC = () => {
  const f = useCurrentFrame();
  const back = interpolate(f, [0, 26], [2.2, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #1b2a4a 0%, #e0875a 48%, #2a1a1a 52%, #0b0b0e 100%)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${back})`, transformOrigin: '50% 52%'}}>
        {/* prédios no horizonte */}
        {Array.from({length: 22}, (_, i) => {
          const h = 80 + random('b' + i) * 260;
          return <div key={i} style={{position: 'absolute', left: i * 50 - 10, top: 998 - h, width: 46, height: h, background: '#151018'}} />;
        })}
        <Estrada H={1000} vel={0.03} />
        {/* você */}
        <div style={{position: 'absolute', left: 528, top: 1040, width: 24, height: 60, borderRadius: 12, background: '#000',
          boxShadow: `0 0 30px 8px rgba(255,122,26,.7)`}} />
        <div style={{position: 'absolute', left: 529, top: 1012, width: 22, height: 22, borderRadius: 11, background: '#000'}} />
      </div>
    </AbsoluteFill>
  );
};

const Sonho: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #ffcf6a, #ff7a1a 35%, #6a1f2b 75%, #1a0710)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -660, top: -380, width: 2400, height: 2400, transform: `rotate(${f * 0.8}deg)`,
        background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.16) 0deg 6deg, transparent 6deg 18deg)'}} />
      {Array.from({length: 40}, (_, i) => {
        const x = random('sx' + i) * 1080;
        const y = 1920 - ((f * (3 + random('sv' + i) * 7) + random('sy' + i) * 1920) % 2100);
        const s = 4 + random('ss' + i) * 10;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: s,
          background: '#fff8d8', boxShadow: '0 0 12px #fff2b0', opacity: 0.8}} />;
      })}
      <Titulo texto="É UM" y={620} size={150} />
      <Titulo texto="SONHO" y={780} size={230} cor={OURO} delay={6} />
    </AbsoluteFill>
  );
};

const CORES = ['#ff5d5d', '#ffb13b', '#4cd37a', '#3fb7ff', '#a26bff', '#ff7ad1', '#ffe14d'];
const Loja: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pan = interpolate(f, [0, 66], [-60, 60]);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2a1306, #120804)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, perspective: 1200}}>
        <div style={{position: 'absolute', left: 90 + pan, top: 260, width: 900, transform: 'rotateY(-14deg)'}}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} style={{position: 'relative', height: 200}}>
              {Array.from({length: 8}, (_, c) => {
                const idx = row * 8 + c;
                const voa = (idx * 7) % 32 < 12; // alguns itens vão pro carrinho
                const ini = ((idx * 5) % 12) * 4 + 4;
                const s = voa ? spring({frame: f - ini, fps, config: {damping: 14, mass: 0.7}}) : 0;
                const tx = s * (450 - (c * 105 + 40));
                const ty = s * (1150 - row * 200) - Math.sin(s * Math.PI) * 300;
                return (
                  <div key={c} style={{position: 'absolute', left: c * 105 + 10, top: 40, width: 80, height: 120, borderRadius: 14,
                    background: CORES[idx % CORES.length], boxShadow: 'inset 0 -14px 0 rgba(0,0,0,.2)',
                    transform: `translate(${tx}px, ${ty}px) scale(${1 - s * 0.45}) rotate(${s * 40}deg)`, opacity: s > 0.98 ? 0 : 1}} />
                );
              })}
              <div style={{position: 'absolute', left: 0, right: 0, top: 165, height: 18, background: '#5b3a1e', borderRadius: 4}} />
            </div>
          ))}
        </div>
      </div>
      {[0, 1, 2].map((i) => {
        const s = spring({frame: f - 8 - i * 14, fps, config: {damping: 9}});
        return (
          <div key={i} style={{position: 'absolute', left: [120, 640, 380][i], top: [250, 420, 660][i], padding: '14px 30px',
            borderRadius: 40, background: LARANJA, color: '#2a1306', fontFamily: FONTE, fontSize: 52,
            transform: `scale(${s}) rotate(${[-8, 7, -4][i]}deg)`}}>GRÁTIS</div>
        );
      })}
      {/* carrinho */}
      <svg width={420} height={260} style={{position: 'absolute', left: 330, top: 1110}}>
        <path d="M20 20 L70 20 L110 190 L360 190 L400 60 L90 60" stroke="#fff" strokeWidth={14} fill="none" strokeLinejoin="round" />
        <circle cx={140} cy={235} r={20} fill="#fff" /><circle cx={330} cy={235} r={20} fill="#fff" />
      </svg>
      <div style={{position: 'absolute', top: 1420, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 60, color: OURO}}>
        TOTAL: R$ 0,00
      </div>
    </AbsoluteFill>
  );
};

const Mansao: React.FC = () => {
  const f = useCurrentFrame();
  const sobe = useSpring(0, {damping: 14, mass: 0.8});
  const chave = useSpring(4, {damping: 8, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #2b1b4a, #b54a6a 55%, #f0a060)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 900, transform: `translateY(${(1 - sobe) * 600}px)`}}>
        <svg width={1080} height={900} viewBox="0 0 1080 900">
          <path d="M100 900 L100 420 L540 160 L980 420 L980 900 Z" fill="#160d22" />
          <path d="M380 900 L380 300 L700 300 L700 900 Z" fill="#1d1230" />
          {Array.from({length: 18}, (_, i) => {
            const c = i % 6, r = Math.floor(i / 6);
            const on = f > 6 + ((i * 7) % 18) * 1.6;
            return <rect key={i} x={160 + c * 135} y={480 + r * 130} width={70} height={90} rx={6}
              fill={on ? '#ffd56b' : '#2a1d3d'} style={on ? {filter: 'drop-shadow(0 0 16px #ffb13b)'} : undefined} />;
          })}
        </svg>
      </div>
      <svg width={220} height={420} viewBox="0 0 220 420" style={{position: 'absolute', left: 430, top: 250,
        transform: `rotate(${(1 - chave) * 540}deg) scale(${chave})`, filter: 'drop-shadow(0 0 30px #ffd23f)'}}>
        <circle cx={110} cy={80} r={62} stroke={OURO} strokeWidth={26} fill="none" />
        <rect x={98} y={140} width={26} height={250} fill={OURO} />
        <rect x={124} y={300} width={60} height={24} fill={OURO} /><rect x={124} y={350} width={44} height={24} fill={OURO} />
      </svg>
      <Titulo texto="SUA MANSÃO" y={110} size={96} cor="#fff" delay={2} />
    </AbsoluteFill>
  );
};

const Ferrari: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const tDuzentos = fr(W[32].t) - T[6];
  const vel = interpolate(f, [0, tDuzentos, tDuzentos + 14], [0, 120, 200], {...clamp, easing: Easing.out(Easing.quad)});
  const k = vel / 200;
  const ang = -120 + 240 * k;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #120a24, #5a2340 45%, #0d0a10 50%)', overflow: 'hidden',
      transform: shake(f, 4 + k * 14, 'fe')}}>
      <Estrada H={960} vel={0.08 + k * 0.5} cor="#141217" />
      {/* riscos de velocidade */}
      {Array.from({length: 26}, (_, i) => {
        const y = random('ry' + i) * 1920;
        const len = 200 + random('rl' + i) * 500;
        const x = ((f * (40 + k * 120) + random('rx' + i) * 3000) % 3000) - 1000;
        const lado = random('rs' + i) > 0.5 ? 1 : -1;
        return <div key={i} style={{position: 'absolute', top: y, left: lado > 0 ? 540 + x * 0.4 : 540 - x * 0.4 - len,
          width: len, height: 3, background: 'rgba(255,220,180,.5)', opacity: k * 0.9}} />;
      })}
      {/* carro visto de trás */}
      <svg width={640} height={300} viewBox="0 0 640 300" style={{position: 'absolute', left: 220, top: 1020}}>
        <path d="M40 240 Q40 150 140 130 L200 70 Q320 40 440 70 L500 130 Q600 150 600 240 Z" fill="#c4121c" />
        <path d="M215 80 Q320 58 425 80 L470 128 L170 128 Z" fill="#26121a" />
        <rect x={60} y={170} width={140} height={26} rx={10} fill="#ff3030" style={{filter: 'drop-shadow(0 0 22px #ff2020)'}} />
        <rect x={440} y={170} width={140} height={26} rx={10} fill="#ff3030" style={{filter: 'drop-shadow(0 0 22px #ff2020)'}} />
        <rect x={60} y={235} width={90} height={55} rx={14} fill="#0b0b0b" /><rect x={490} y={235} width={90} height={55} rx={14} fill="#0b0b0b" />
      </svg>
      {/* velocímetro */}
      <svg width={620} height={520} viewBox="-310 -310 620 520" style={{position: 'absolute', left: 230, top: 230}}>
        <path d="M-260 0 A260 260 0 1 1 260 0" stroke="rgba(255,255,255,.15)" strokeWidth={26} fill="none"
          transform="rotate(-30)" />
        <path d="M-260 0 A260 260 0 1 1 260 0" stroke={k > 0.8 ? '#ff3b3b' : OURO} strokeWidth={26} fill="none"
          transform="rotate(-30)" pathLength={1} strokeDasharray={`${k} 1`} strokeLinecap="round" />
        <line x1={0} y1={0} x2={0} y2={-230} stroke="#fff" strokeWidth={10} strokeLinecap="round" transform={`rotate(${ang})`} />
        <circle r={22} fill="#fff" />
        <text y={170} textAnchor="middle" fill="#fff" fontFamily={FONTE} fontSize={120}>{Math.round(vel)}</text>
      </svg>
      <div style={{position: 'absolute', top: 770, width: "100%", textAlign: "center", fontFamily: FONTE, fontSize: 40, color: "#ccb", letterSpacing: 6}}>KM/H</div>
    </AbsoluteFill>
  );
};

const MundoSeu: React.FC = () => {
  const f = useCurrentFrame();
  const coroa = useSpring(4, {damping: 9, mass: 0.7});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 40%, #3a2208, #000 70%)'}}>
      <Globo ouro R={340} />
      <svg width={360} height={220} viewBox="0 0 360 220" style={{position: 'absolute', left: 360, top: 200 + (1 - coroa) * -400,
        filter: 'drop-shadow(0 0 40px #ffd23f)', transform: `rotate(${(1 - coroa) * -20}deg)`}}>
        <path d="M20 200 L40 50 L120 130 L180 20 L240 130 L320 50 L340 200 Z" fill={OURO} />
      </svg>
      {Array.from({length: 60}, (_, i) => {
        const t0 = 4;
        const g = Math.max(0, f - t0);
        const vx = (random('cx' + i) - 0.5) * 34;
        const vy = -18 - random('cy' + i) * 20;
        return <div key={i} style={{position: 'absolute', left: 540 + vx * g, top: 760 + vy * g + 0.9 * g * g, width: 18, height: 10,
          background: CORES[i % CORES.length], transform: `rotate(${g * 20 + i * 30}deg)`, opacity: f > t0 ? 1 : 0}} />;
      })}
      <Titulo texto="O MUNDO É SEU" y={1180} size={104} cor={OURO} delay={2} />
    </AbsoluteFill>
  );
};

const Mas: React.FC = () => {
  const f = useCurrentFrame();
  const g = f < 10;
  const dx = g ? (random('g' + f) - 0.5) * 60 : 0;
  return (
    <AbsoluteFill style={{background: '#050505', justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 7}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('gy' + f + i) * 1920, height: 20 + random('gh' + i + f) * 90,
          background: i % 2 ? 'rgba(255,0,60,.35)' : 'rgba(0,220,255,.3)', transform: `translateX(${(random('gx' + i + f) - 0.5) * 300}px)`}} />
      ))}
      <div style={{position: 'relative', fontFamily: FONTE, fontSize: 300, color: '#fff', transform: `translateX(${dx}px) ${shake(f, 6, 'm')}`}}>
        <span style={{position: 'absolute', left: g ? -14 : -4, color: 'rgba(255,0,60,.8)', mixBlendMode: 'screen'}}>MAS…</span>
        <span style={{position: 'absolute', left: g ? 14 : 4, color: 'rgba(0,220,255,.8)', mixBlendMode: 'screen'}}>MAS…</span>
        <span style={{position: 'relative'}}>MAS…</span>
      </div>
    </AbsoluteFill>
  );
};

const Usinas: React.FC = () => {
  const f = useCurrentFrame();
  const pisca = Math.floor(f / 6) % 2 === 0;
  return (
    <AbsoluteFill style={{background: '#0a0c10', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,0,0,${pisca ? 0.35 : 0.12}))`}} />
      <div style={{position: 'absolute', left: 90, top: 300, width: 900, height: 900, borderRadius: 30, background: '#151a22', border: '4px solid #2a3240',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30, padding: 50, boxSizing: 'border-box'}}>
        {Array.from({length: 12}, (_, i) => {
          const queda = interpolate(f, [5 + i * 2, 30 + i * 2], [70, -60], clamp);
          return (
            <div key={i} style={{background: '#0c1016', borderRadius: 20, position: 'relative', overflow: 'hidden'}}>
              <svg viewBox="-60 -60 120 90" style={{width: '100%', height: '70%'}}>
                <path d="M-45 0 A45 45 0 0 1 45 0" stroke="#2c3644" strokeWidth={8} fill="none" />
                <line x1={0} y1={0} x2={0} y2={-40} stroke={queda < 0 ? '#ff3b3b' : '#6cf'} strokeWidth={5} transform={`rotate(${queda})`} />
              </svg>
              <div style={{position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
                <div style={{width: 26, height: 26, borderRadius: 13, background: (i + Math.floor(f / 6)) % 3 === 0 ? '#ff3b3b' : '#3a1414',
                  boxShadow: (i + Math.floor(f / 6)) % 3 === 0 ? '0 0 20px #ff3b3b' : 'none'}} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', top: 1260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: pisca ? '#ff4b4b' : '#a33'}}>
        ⚠ OPERADORES: 0
      </div>
    </AbsoluteFill>
  );
};

const PREDIOS = Array.from({length: 14}, (_, i) => ({x: i * 80 - 20, w: 70 + random('pw' + i) * 30, h: 380 + random('ph' + i) * 700}));
const Apagando: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const onda = interpolate(f, [4, d - 4], [-0.15, 1.15], clamp);
  const zoom = interpolate(f, [0, d], [1.05, 1.18]);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #02030a, #0a1022)', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, transformOrigin: '50% 70%'}}>
        {PREDIOS.map((b, i) => (
          <div key={i} style={{position: 'absolute', left: b.x, bottom: 0, width: b.w, height: b.h, background: '#0b0d14',
            display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: 8, padding: 10, boxSizing: 'border-box'}}>
            {Array.from({length: Math.floor(b.h / 34) * 3}, (_, j) => {
              const on = random('w' + i + '-' + j) * 0.3 + b.x / 1080 > onda;
              return <div key={j} style={{width: (b.w - 36) / 3, height: 22, background: on ? '#ffd88a' : '#141826',
                boxShadow: on ? '0 0 10px rgba(255,200,100,.6)' : 'none'}} />;
            })}
          </div>
        ))}
      </div>
      <Titulo texto="EM POUCAS HORAS" y={240} size={86} cor="#cfd8e8" />
    </AbsoluteFill>
  );
};

const Wifi: React.FC = () => {
  const f = useCurrentFrame();
  const corte = useSpring(16, {damping: 16});
  const barras = [0, 1, 2, 3].map((i) => (f > 3 + (3 - i) * 4 ? 0.12 : 1));
  return (
    <AbsoluteFill style={{background: '#07090d', justifyContent: 'center', alignItems: 'center'}}>
      <svg width={600} height={500} viewBox="-300 -420 600 500">
        {[340, 250, 160].map((r, i) => (
          <path key={i} d={`M${-r * 0.75} ${-r * 0.66} A${r} ${r} 0 0 1 ${r * 0.75} ${-r * 0.66}`} stroke="#fff" strokeWidth={42}
            strokeLinecap="round" fill="none" opacity={barras[3 - i]} />
        ))}
        <circle cx={0} cy={-20} r={34} fill="#fff" opacity={barras[0]} />
        <line x1={-260} y1={-380} x2={-260 + 520 * corte} y2={-380 + 440 * corte} stroke="#ff3b3b" strokeWidth={30} strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', top: 1180, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 80, color: '#ff4b4b', opacity: corte}}>
        SEM SINAL
      </div>
    </AbsoluteFill>
  );
};

const Celular: React.FC = () => {
  const f = useCurrentFrame();
  const cai = useSpring(0, {damping: 7, mass: 1, stiffness: 140});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0c0d10 0%, #0c0d10 62%, #2a2018 62%, #15100b 100%)', overflow: 'hidden'}}>
      {/* pilha de papéis */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{position: 'absolute', left: 230 + i * 6, top: 1280 - i * 14, width: 620, height: 40, background: i % 2 ? '#e8e2d4' : '#f4efe4',
          transform: `rotate(${(i - 2) * 1.5}deg)`, boxShadow: '0 4px 8px rgba(0,0,0,.4)'}} />
      ))}
      <div style={{position: 'absolute', left: 300, top: 1240 - 760 + cai * 0 - (1 - cai) * 900, width: 480, height: 760, borderRadius: 60,
        background: '#050506', border: '6px solid #2b2e36', transform: `perspective(1200px) rotateX(${(1 - cai) * 30}deg)`, transformOrigin: '50% 100%'}}>
        <div style={{position: 'absolute', inset: 20, borderRadius: 44, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontFamily: FONTE, fontSize: 40, color: '#2a2a30'}}>SEM SINAL</div>
      </div>
      <Titulo texto="PESO DE PAPEL" y={220} size={110} cor="#ddd" delay={fr(W[70].t) - T[12]} />
    </AbsoluteFill>
  );
};

// ---------- camadas fixas ----------
const BLOCOS = (() => {
  const out: {ini: number; fim: number; ws: number[]}[] = [];
  let cur: number[] = [];
  W.forEach((w, i) => {
    const novaCena = CORTES.includes(i) && cur.length;
    if (novaCena || cur.length === 3) { out.push({ini: 0, fim: 0, ws: cur}); cur = []; }
    cur.push(i);
  });
  if (cur.length) out.push({ini: 0, fim: 0, ws: cur});
  out.forEach((b, k) => {
    b.ini = fr(W[b.ws[0]].t);
    b.fim = k < out.length - 1 ? fr(W[out[k + 1].ws[0]].t) : FIM;
  });
  return out;
})();

const Legenda: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = BLOCOS.find((x) => f >= x.ini && f < x.fim);
  if (!b) return null;
  return (
    <div style={{position: 'absolute', top: 1540, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 76, lineHeight: 1.1,
      textTransform: 'uppercase', padding: '0 60px', boxSizing: 'border-box'}}>
      {b.ws.map((i) => {
        const ini = fr(W[i].t);
        const ativo = f >= ini && f < ini + Math.max(fr(W[i].d), 6);
        const pop = spring({frame: f - ini, fps, config: {damping: 10, mass: 0.4}});
        return (
          <span key={i} style={{display: 'inline-block', margin: '0 12px', color: ativo ? OURO : '#fff',
            transform: `scale(${f >= ini ? 0.85 + 0.15 * pop + (ativo ? 0.08 : 0) : 0.85})`, opacity: f >= ini ? 1 : 0.35,
            textShadow: '0 0 6px #000, 0 6px 0 #000, 0 0 30px rgba(0,0,0,.9)', WebkitTextStroke: '3px #000', paintOrder: 'stroke fill'}}>
            {W[i].w.replace(/[.,]/g, '')}
          </span>
        );
      })}
    </div>
  );
};

const Dia: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - DIA2, fps, config: {damping: 12}});
  const flip = f >= DIA2 ? Math.sin(Math.min(1, s) * Math.PI) : 0;
  return (
    <div style={{position: 'absolute', right: 50, top: 70, padding: '12px 26px', borderRadius: 14, background: 'rgba(0,0,0,.55)',
      border: `3px solid ${LARANJA}`, fontFamily: FONTE, fontSize: 46, color: LARANJA, transform: `scaleY(${1 - flip * 0.9})`}}>
      DIA {f >= DIA2 + 3 ? 2 : 1}
    </div>
  );
};

const Grao: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={f % 12} /></filter>
      <rect width="100%" height="100%" filter="url(#n)" />
    </svg>
  );
};

const CENAS = [Acorda, Sumiu, SoVoce, Sonho, Loja, Mansao, Ferrari, MundoSeu, Mas, Usinas, Apagando, Wifi, Celular];

export const Video: React.FC = () => {
  const f = useCurrentFrame();
  const sat = f < MAS ? 1.15 : interpolate(f, [MAS, MAS + 20], [0.15, 0.5], clamp);
  const fundoVol = (x: number) => (x >= MAS && x < MAS + 14 ? 0 : 0.35);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
      <AbsoluteFill style={{filter: `saturate(${sat})`}}>
        {CENAS.map((C, i) => {
          const ini = T[i];
          const fim = i < CENAS.length - 1 ? T[i + 1] : FIM;
          return (
            <Sequence key={i} from={ini} durationInFrames={fim - ini}>
              <Entrada><C /></Entrada>
            </Sequence>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,.65))', pointerEvents: 'none'}} />
      <Grao />
      <Dia />
      <Legenda />
      <Flash />
      <Audio src={staticFile('todo_mundo_sumiu/narracao.mp3')} />
      <Audio src={staticFile('todo_mundo_sumiu/fundo.mp3')} volume={fundoVol} />
      {T.slice(1).map((t, i) => (i + 1 === 8 ? null : (
        <Sequence key={i} from={Math.max(0, t - 6)} durationInFrames={21}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.22} /></Sequence>
      )))}
      <Sequence from={MAS}><Audio src={staticFile('sfx/hit.wav')} volume={0.8} /></Sequence>
      <Sequence from={T[1]} durationInFrames={T[2] - T[1]}><Audio src={staticFile('sfx/tick.wav')} volume={0.25} loop /></Sequence>
      <Sequence from={fr(W[32].t) - 2}><Audio src={staticFile('sfx/boom.wav')} volume={0.35} /></Sequence>
      <Sequence from={T[12] + 10}><Audio src={staticFile('sfx/hit.wav')} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};

// entrada de cada cena: pequeno zoom + desfoque que some em 5 quadros
const Entrada: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 5], [1, 0], clamp);
  return <AbsoluteFill style={{transform: `scale(${1 + k * 0.08})`, filter: k > 0 ? `blur(${k * 10}px)` : undefined}}>{children}</AbsoluteFill>;
};

const Flash: React.FC = () => {
  const f = useCurrentFrame();
  const o = f >= MAS && f < MAS + 3 ? 0.9 - (f - MAS) * 0.3 : 0;
  return <AbsoluteFill style={{background: '#fff', opacity: o, pointerEvents: 'none'}} />;
};
