// Short "Em algum lugar existe uma CÓPIA EXATA de você". Roteiro do Roteirista (roteiros/multiverso.md #1, v1), aprovado pelo dono em 31/10.
// Não é POV. Selo fixo "MODELO". Voz edge-tts Remy (sem ElevenLabs). Publicar a partir de 05–06/11 (depois do Reel do Boltzmann).
// Reais: luzes de cidades (Suomi NPP, NASA), Via Láctea vista da ISS (NASA), Hubble eXtreme Deep Field (NASA/ESA), céu noturno no Kennedy (NASA).
// O resto é ilustração/animação própria. Nenhuma cena nem imagem se repete (regra do dono, 30/10).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Short, montar, Palavra, Titulo, Texto, Etiqueta, Sombra, Glitch, Pino, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO} from '../comum';
import palavras from './copia.palavras.json';

const W = palavras as Palavra[];
const FRASES = [
  'em algum lugar', 'alguem identico', 'vendo este video', 'mesmo rosto', 'mesmas lembrancas', 'o mesmo celular', 'a conta e de max', 'em 2003', 'a logica e esta',
  'se o espaco for infinito', 'e a materia', 'tudo o que e possivel', 'inclusive voce', 'e quao longe', 'pela estimativa', 'a dez elevado', 'pra ter uma ideia', 'tem menos de',
  'a distancia ate', 'cem octilhoes', 'mas calma', 'ninguem nunca viu', 'nem copia nenhuma', 'e o espaco ser', 'ninguem mediu', 'tudo depende dela',
];
const TEMPO = montar(W, FRASES);
const CALMA = FRASES.indexOf('mas calma');
export const DURACAO = TEMPO.FIM;
const ROXO = '#9b7bff';
const PELE = '#e8d2c0';

// ---------- peças ----------
const img = (s: string) => staticFile('copia/' + s);
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
const Estrelas: React.FC<{n?: number; seed?: string; v?: number}> = ({n = 140, seed = 'e', v = 0.3}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: n}, (_, i) => <circle key={i} cx={(random(seed + 'x' + i) * 1080 + f * v * random(seed + 'v' + i)) % 1080} cy={random(seed + 'y' + i) * 1920}
        r={0.8 + random(seed + 'r' + i) * 2.4} fill="#fff" opacity={0.3 + 0.7 * random(seed + 'o' + i)} />)}
    </svg>
  );
};
const Selo: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 84, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '20px 40px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.6)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`}}>{texto}</div>
    </div>
  );
};
// silhueta de cabeça e ombros (de frente)
const Busto: React.FC<{x: number; y: number; h: number; cor?: string; op?: number}> = ({x, y, h, cor = PELE, op = 1}) => (
  <g transform={`translate(${x} ${y})`} fill={cor} opacity={op}>
    <ellipse cy={-h * 0.72} rx={h * 0.19} ry={h * 0.24} />
    <rect x={-h * 0.08} y={-h * 0.52} width={h * 0.16} height={h * 0.12} />
    <path d={`M${-h * 0.42} 0 Q${-h * 0.42} ${-h * 0.42} 0 ${-h * 0.42} Q${h * 0.42} ${-h * 0.42} ${h * 0.42} 0 Z`} />
  </g>
);
// 10 elevado a 10 elevado a 29
const Torre: React.FC<{size: number; cor?: string}> = ({size, cor = OURO}) => (
  <span style={{fontFamily: FONTE, fontSize: size, color: cor, whiteSpace: 'nowrap'}}>10<sup style={{fontSize: '0.55em', verticalAlign: '0.9em'}}>10<sup style={{fontSize: '0.6em', verticalAlign: '0.8em'}}>29</sup></sup></span>
);
const SELO_FIXO: React.FC = () => (
  <div style={{position: 'absolute', top: 70, right: 50, padding: '10px 22px', border: `4px solid ${ROXO}`, borderRadius: 14, fontFamily: FONTE, fontSize: 34, color: ROXO, background: 'rgba(0,0,0,.55)', letterSpacing: 3}}>MODELO</div>
);

// ---------- cenas ----------
// 1. gancho: você e o seu reflexo, com glitch
const Espelho: React.FC = () => {
  const f = useCurrentFrame();
  const g = f % 11 < 2;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #20184a, #030208 70%)', transform: shake(f, g ? 14 : 3)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={540} y1={520} x2={540} y2={1420} stroke="#fff" strokeWidth={4} opacity={0.5} strokeDasharray="10 14" />
        <Busto x={310} y={1350} h={720} cor={PELE} />
        <g style={{transform: g ? 'translateX(30px)' : undefined}}><Busto x={770} y={1350} h={720} cor={g ? CIANO : PELE} op={0.92} /></g>
      </svg>
      <Titulo texto="VOCÊ TEM UMA CÓPIA?" y={300} size={104} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 2. real: a Terra à noite, um ponto qualquer
const Alguem: React.FC = () => (
  <Foto src="luzes_cidade.jpg" etq="IMAGEM REAL · LUZES DA AMÉRICA DO SUL · NASA" z={[1.6, 1.25]} pos="62% 50%">
    <Pino x={600} y={1000} s={1} cor={CIANO} />
    <Titulo texto="ALGUÉM IDÊNTICO A VOCÊ" y={300} size={100} />
  </Foto>
);
// 3. um celular passando este mesmo vídeo, dentro dele outro, dentro dele outro
const Celular: React.FC = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 45], [1, 1.5], clamp);
  return (
    <Fundo cor="#102040">
      <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%,-50%) scale(${k})`}}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 0, top: 0, width: 420 * 0.55 ** i, height: 820 * 0.55 ** i, transform: 'translate(-50%,-50%)', borderRadius: 50 * 0.55 ** i,
            border: `${10 * 0.6 ** i}px solid #2a2e36`, background: i === 3 ? '#4cc9f0' : 'linear-gradient(180deg,#0b1830,#1b0b30)', boxShadow: '0 0 80px rgba(76,201,240,.35)'}} />
        ))}
      </div>
      <Titulo texto="VENDO ESTE VÍDEO" y={300} size={110} />
      <Selo texto="AGORA" y={1340} size={70} cor={CIANO} delay={8} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 4. dois rostos de perfil, frente a frente
const Rosto: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 20], [120, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  const perfil = 'M0 0 C 40 -60 60 -140 40 -220 C 30 -260 70 -270 80 -300 C 90 -330 60 -340 70 -360 C 80 -400 60 -470 0 -520 C -60 -560 -180 -560 -240 -500 C -320 -420 -320 -280 -250 -200 C -220 -160 -210 -90 -220 0 Z';
  return (
    <Fundo cor="#2a1030">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={perfil} transform={`translate(${430 - p} 1350)`} fill={PELE} />
        <path d={perfil} transform={`translate(${650 + p} 1350) scale(-1 1)`} fill={PELE} opacity={0.9} />
      </svg>
      <Titulo texto="MESMO ROSTO" y={300} size={130} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 5. lembranças: fotos instantâneas caindo em pares idênticos
const Lembrancas: React.FC = () => {
  const f = useCurrentFrame();
  const cores = ['#ff9f43', '#4cc9f0', '#3ddc84', '#ff3b3b'];
  return (
    <Fundo cor="#302010">
      {cores.map((c, i) => {
        const s = interpolate(f, [i * 5, i * 5 + 12], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.6))});
        return [0, 1].map((lado) => (
          <div key={i + '-' + lado} style={{position: 'absolute', left: lado ? 570 : 110, top: 560 + i * 200, width: 400, height: 180, padding: 14, background: '#f4efe6', borderRadius: 8,
            transform: `rotate(${(lado ? 1 : -1) * (4 + i * 2)}deg) scale(${s})`, boxShadow: '0 20px 40px rgba(0,0,0,.6)'}}>
            <div style={{width: '100%', height: '100%', background: `linear-gradient(135deg, ${c}, #222)`, borderRadius: 4}} />
          </div>
        ));
      })}
      <Titulo texto="MESMAS LEMBRANÇAS" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </Fundo>
  );
};
// 6. duas mãos, o mesmo celular
const Maos: React.FC = () => {
  const f = useCurrentFrame();
  const brilho = 0.6 + 0.4 * Math.sin(f * 0.4);
  const Mao = ({x, flip}: {x: number; flip?: boolean}) => (
    <g transform={`translate(${x} 1000) ${flip ? 'scale(-1 1)' : ''}`}>
      <rect x={-120} y={-260} width={240} height={460} rx={34} fill="#14161c" stroke="#3a3e48" strokeWidth={8} />
      <rect x={-100} y={-235} width={200} height={410} rx={20} fill={CIANO} opacity={0.35 * brilho} />
      <path d="M-150 120 Q-170 260 -60 360 L120 360 Q170 260 140 140 L140 60 Q120 20 100 60 L100 120 Z" fill={PELE} />
      <rect x={-170} y={-60} width={70} height={36} rx={18} fill={PELE} /><rect x={-170} y={0} width={70} height={36} rx={18} fill={PELE} /><rect x={-170} y={60} width={70} height={36} rx={18} fill={PELE} />
    </g>
  );
  return (
    <AbsoluteFill style={{background: '#06070b'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Mao x={290} /><Mao x={790} flip /></svg>
      <Titulo texto="O MESMO CELULAR NA MÃO" y={300} size={100} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 7. quem fez a conta (sem retrato: só o nome, sobre estrelas)
const Tegmark: React.FC = () => {
  const s = useSpring(4);
  return (
    <AbsoluteFill style={{background: '#020308'}}>
      <Estrelas seed="tg" v={1.2} />
      <div style={{position: 'absolute', top: 760, left: 90, right: 90, padding: '50px 40px', borderLeft: `14px solid ${ROXO}`, background: 'rgba(20,14,50,.75)',
        opacity: s, transform: `translateX(${(1 - s) * -200}px)`}}>
        <div style={{fontFamily: FONTE, fontSize: 110, color: '#fff', lineHeight: 1}}>MAX TEGMARK</div>
        <div style={{fontFamily: FONTE, fontSize: 56, color: ROXO, marginTop: 20}}>COSMÓLOGO · MIT · 2003</div>
      </div>
      <Titulo texto="A CONTA É DELE" y={300} size={110} />
    </AbsoluteFill>
  );
};
// 8. a lógica: três passos
const Logica: React.FC = () => {
  const passos = ['ESPAÇO INFINITO', '+ MATÉRIA AO ACASO', '= REPETIÇÕES'];
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a0a18,#18082a)'}}>
      {passos.map((p, i) => {
        const s = useSpring(4 + i * 7);
        return <div key={i} style={{position: 'absolute', top: 640 + i * 220, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 84, color: i === 2 ? OURO : '#fff',
          opacity: s, transform: `scale(${0.6 + 0.4 * s})`}}>{p}</div>;
      })}
      <Titulo texto="A LÓGICA É ESTA" y={300} size={110} />
    </AbsoluteFill>
  );
};
// 9. grade infinita em perspectiva
const Infinito: React.FC = () => {
  const f = useCurrentFrame();
  const off = (f * 6) % 120;
  return (
    <AbsoluteFill style={{background: '#020208', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -1500, right: -1500, top: 900, height: 2400, transform: 'perspective(600px) rotateX(72deg)', transformOrigin: '50% 0',
        backgroundImage: `linear-gradient(${ROXO} 3px, transparent 3px), linear-gradient(90deg, ${ROXO} 3px, transparent 3px)`, backgroundSize: '120px 120px', backgroundPosition: `0 ${off}px`, opacity: 0.8}} />
      <div style={{position: 'absolute', left: -1500, right: -1500, bottom: 1020, height: 2400, transform: 'perspective(600px) rotateX(-72deg)', transformOrigin: '50% 100%',
        backgroundImage: `linear-gradient(${CIANO} 3px, transparent 3px), linear-gradient(90deg, ${CIANO} 3px, transparent 3px)`, backgroundSize: '120px 120px', backgroundPosition: `0 ${-off}px`, opacity: 0.5}} />
      <div style={{position: 'absolute', top: 820, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 260, color: '#fff', textShadow: `0 0 60px ${ROXO}`}}>∞</div>
      <Selo texto="SE O ESPAÇO FOR INFINITO" y={300} size={70} cor={OURO} delay={0} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 10. partículas espalhadas ao acaso
const Acaso: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0e1a2a, #010204 75%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 260}, (_, i) => {
          const x = 540 + (random('ax' + i) - 0.5) * 1100 * interpolate(f, [0, 30], [0.05, 1], clamp) + Math.sin(f * 0.1 + i) * 8;
          const y = 1000 + (random('ay' + i) - 0.5) * 1000 * interpolate(f, [0, 30], [0.05, 1], clamp) + Math.cos(f * 0.1 + i) * 8;
          return <circle key={i} cx={x} cy={y} r={4 + random('ar' + i) * 8} fill={[CIANO, OURO, '#ff6b6b', '#fff'][i % 4]} opacity={0.85} />;
        })}
      </svg>
      <Titulo texto="MATÉRIA ESPALHADA AO ACASO" y={300} size={96} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 11. "tijolos" de partículas: o mesmo padrão se repetindo sem fim
const Tijolos: React.FC = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 70], [1.6, 0.55], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const bloco = Array.from({length: 12}, (_, i) => ({x: random('tx' + i) * 200, y: random('ty' + i) * 200, c: [CIANO, OURO, '#ff6b6b'][i % 3]}));
  return (
    <AbsoluteFill style={{background: '#04040a', overflow: 'hidden'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`translate(540 1000) scale(${z}) translate(-1100 -1300)`}>
          {Array.from({length: 11 * 13}, (_, k) => {
            const cx = (k % 11) * 200, cy = Math.floor(k / 11) * 200;
            return <g key={k} transform={`translate(${cx} ${cy})`}>
              <rect width={200} height={200} fill="none" stroke="#2a2a44" strokeWidth={2} />
              {bloco.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r={9} fill={b.c} />)}
            </g>;
          })}
        </g>
      </svg>
      <Titulo texto="TUDO ACABA SE REPETINDO" y={300} size={100} />
      <Etiqueta texto="ANIMAÇÃO · MODELO" />
    </AbsoluteFill>
  );
};
// 12. uma silhueta de pontos, copiada; uma delas acende
const Inclusive: React.FC = () => {
  const f = useCurrentFrame();
  const pts = React.useMemo(() => Array.from({length: 600}, (_, i) => {
    const t = random('px' + i) * Math.PI * 2, r = Math.sqrt(random('pr' + i));
    if (i < 200) return [Math.cos(t) * r * 34, -150 + Math.sin(t) * r * 42];
    return [(random('bx' + i) - 0.5) * 140 * (1 - 0.3 * random('bb' + i)), -100 + random('by' + i) * 200];
  }), []);
  return (
    <AbsoluteFill style={{background: '#030308'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => {
          const alvo = r === 1 && c === 2;
          const on = alvo && f > 15;
          return <g key={r + '-' + c} transform={`translate(${170 + c * 250} ${780 + r * 320})`}>
            {pts.map(([x, y], i) => i % 3 === 0 && <circle key={i} cx={x} cy={y} r={3.5} fill={on ? OURO : '#6c7090'} opacity={on ? 1 : 0.6} />)}
          </g>;
        }))}
      </svg>
      <Titulo texto="INCLUSIVE VOCÊ" y={300} size={120} cor={OURO} />
      <Etiqueta texto="ANIMAÇÃO" />
    </AbsoluteFill>
  );
};
// 13. quão longe? seta saindo da tela
const QuaoLonge: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 40], [140, 1500], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(90deg,#0a0618,#1a0a30)', transform: shake(f, 2)}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={140} y1={1000} x2={x - 60} y2={1000} stroke={OURO} strokeWidth={18} strokeDasharray="40 20" />
        <path d={`M${x} 1000 l-90 -60 v120 Z`} fill={OURO} />
        <circle cx={140} cy={1000} r={30} fill={CIANO} />
        <text x={140} y={1090} textAnchor="middle" fontFamily={FONTE} fontSize={40} fill={CIANO}>VOCÊ</text>
      </svg>
      <Titulo texto="QUÃO LONGE?" y={300} size={150} />
    </AbsoluteFill>
  );
};
// 14. o número: 10^(10^29) crescendo
const Numero: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 70], [0.4, 1.15], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #2a1a00, #050300 70%)'}}>
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', transform: `scale(${s})`}}><Torre size={300} /></div>
      <Texto y={1150} size={70} cor="#fff" delay={10}>METROS</Texto>
      <Selo texto="~10^(10^29) M (ESTIMATIVA)" y={1300} size={52} cor="#cfd8e8" delay={20} />
      <Titulo texto="DEZ ELEVADO A DEZ ELEVADO A 29" y={280} size={84} />
    </AbsoluteFill>
  );
};
// 15. Ufa: só pra comparar
const PraComparar: React.FC = () => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 20], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={140} y={900} width={800 * a} height={60} rx={30} fill={OURO} />
        <rect x={140} y={1060} width={8} height={60} rx={4} fill={CIANO} />
      </svg>
      <Texto y={820} size={44} cor={OURO}>A DISTÂNCIA ATÉ A CÓPIA</Texto>
      <Texto y={1140} size={44} cor={CIANO}>O UNIVERSO VISÍVEL INTEIRO</Texto>
      <Selo texto="UNIVERSO VISÍVEL: < 10^27 M" y={1220} size={54} cor={CIANO} delay={4} />
      <Titulo texto="QUASE NADA PERTO DA CÓPIA" y={300} size={100} />
      <Etiqueta texto="FORA DE ESCALA (A DE VERDADE NEM CABE)" />
    </AbsoluteFill>
  );
};
// 16. real: Hubble eXtreme Deep Field com o contorno do universo visível e uma seta saindo
const Visivel: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [6, 30], [0, 1], clamp);
  return (
    <Foto src="udf.jpg" etq="IMAGEM REAL · HUBBLE XDF · NASA/ESA" z={[1.15, 1.0]}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={1000} r={380} fill="none" stroke={CIANO} strokeWidth={8} strokeDasharray={`${2400 * s} 2400`} />
        <path d={`M920 1000 L${920 + 140 * s} 1000`} stroke={OURO} strokeWidth={14} />
        <path d={`M${1060 * s + 920 * (1 - s) + 10} 1000 l-50 -36 v72 Z`} fill={OURO} opacity={s} />
      </svg>
      <Titulo texto="PRA TER UMA IDEIA: TUDO O QUE A GENTE VÊ" y={280} size={84} />
    </Foto>
  );
};
// 17. fita de zeros sem fim
const Zeros: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#0b0b0b', overflow: 'hidden'}}>
      {Array.from({length: 7}, (_, r) => (
        <div key={r} style={{position: 'absolute', top: 640 + r * 120, left: 0, whiteSpace: 'nowrap', fontFamily: FONTE, fontSize: 96, color: r === 0 ? '#fff' : '#7a7a7a',
          transform: `translateX(${(r === 0 ? 40 : 0) - ((f * (10 + r * 3)) % 400)}px)`}}>{r === 0 ? <><span style={{color: OURO}}>1</span>{'0'.repeat(40)}</> : '0'.repeat(48)}</div>
      ))}
            <Titulo texto="O NÚMERO 1 SEGUIDO DE…" y={300} size={100} />
      <Etiqueta texto="CONTA" />
    </AbsoluteFill>
  );
};
// 18. mas calma: tudo congela
const Calma: React.FC = () => <Glitch texto={'MAS\nCALMA'} size={230} cor={OURO} fundo="#05050a" />;
// 19. real: céu noturno sem nada de outro universo
const NinguemViu: React.FC = () => (
  <Foto src="ceu_ksc.jpg" etq="IMAGEM REAL · CÉU NOTURNO · KENNEDY · NASA" z={[1.0, 1.12]} pos="50% 30%">
    <Selo texto={'NENHUM OUTRO\nUNIVERSO OBSERVADO'} y={760} size={74} cor={VERMELHO} delay={4} />
  </Foto>
);
// 20. o espelho vazio: só você
const SemCopia: React.FC = () => {
  const f = useCurrentFrame();
  const sumir = interpolate(f, [4, 26], [0.9, 0], clamp);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, #141428, #020204 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <rect x={570} y={560} width={420} height={860} rx={20} fill="#0c1220" stroke="#556" strokeWidth={8} />
        <Busto x={300} y={1350} h={680} />
        <Busto x={780} y={1350} h={600} cor="#9aa" op={sumir} />
      </svg>
      <Titulo texto="NEM CÓPIA NENHUMA" y={300} size={110} />
      <Etiqueta texto="ILUSTRAÇÃO" />
    </AbsoluteFill>
  );
};
// 21. infinito com interrogação
const Suposicao: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(10, {damping: 8, mass: 0.6});
  return (
    <Fundo cor="#2a0a20">
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 320, color: '#fff', opacity: 0.85, transform: `rotate(${Math.sin(f * 0.15) * 4}deg)`}}>∞</div>
      <div style={{position: 'absolute', top: 640, left: 700, fontFamily: FONTE, fontSize: 300, color: VERMELHO, opacity: s, transform: `scale(${s})`}}>?</div>
      <Titulo texto="ESPAÇO INFINITO É UMA SUPOSIÇÃO" y={280} size={90} />
    </Fundo>
  );
};
// 22. real: a Via Láctea vista da ISS, ninguém mediu
const Mediu: React.FC = () => (
  <Foto src="via_lactea_iss2.jpg" etq="IMAGEM REAL · VIA LÁCTEA VISTA DA ISS · NASA" z={[1.25, 1.05]} pos="40% 50%">
    <Selo texto="NINGUÉM MEDIU" y={820} size={100} cor={OURO} delay={3} />
  </Foto>
);
// 23. tela preta: SUPOSIÇÃO
const Depende: React.FC = () => {
  const f = useCurrentFrame();
  const s = useSpring(2, {damping: 14, mass: 0.8});
  return (
    <AbsoluteFill style={{background: '#000', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{fontFamily: FONTE, fontSize: 150, color: '#fff', letterSpacing: 6 + f * 0.15, opacity: s}}>SUPOSIÇÃO</div>
      <Texto y={1150} size={50} cor="#aab4cc" delay={12}>TUDO DEPENDE DELA</Texto>
    </AbsoluteFill>
  );
};

// 7b. 2003: folhinha de calendário caindo
const Ano2003: React.FC = () => {
  const f = useCurrentFrame();
  const anos = [1998, 1999, 2000, 2001, 2002, 2003];
  const i = Math.min(5, Math.floor(f / 4));
  const s = useSpring(22, {damping: 9, mass: 0.6});
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#140a04,#2a1608)'}}>
      <div style={{position: 'absolute', left: 190, top: 640, width: 700, height: 620, borderRadius: 30, background: '#f4efe6', boxShadow: '0 30px 60px rgba(0,0,0,.6)', overflow: 'hidden'}}>
        <div style={{height: 150, background: VERMELHO}} />
        <div style={{position: 'absolute', top: 210, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 230, color: '#1a1a1a', transform: i < 5 ? `translateY(${(f % 4) * 12}px)` : `scale(${0.9 + 0.1 * s})`}}>{anos[i]}</div>
      </div>
      <Titulo texto="O ARTIGO SAIU EM" y={300} size={110} />
      <Texto y={1330} size={46} cor="#cfd8e8" delay={20}>“PARALLEL UNIVERSES” · SCIENTIFIC AMERICAN</Texto>
    </AbsoluteFill>
  );
};
// 13b. carimbo: estimativa grosseira (palavra do próprio Tegmark: "crude")
const Grosseira: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [3, 9], [2.4, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: '#e9e2d0', transform: f > 9 && f < 14 ? shake(f, 10) : undefined}}>
      {Array.from({length: 16}, (_, i) => <div key={i} style={{position: 'absolute', top: 560 + i * 52, left: 120, right: 120, height: 3, background: '#b8b0a0'}} />)}
      <div style={{position: 'absolute', top: 820, width: '100%', display: 'flex', justifyContent: 'center', opacity: f >= 3 ? 1 : 0}}>
        <div style={{padding: '24px 44px', border: `10px solid ${VERMELHO}`, borderRadius: 18, fontFamily: FONTE, fontSize: 96, color: VERMELHO, transform: `rotate(-8deg) scale(${s})`, textAlign: 'center', lineHeight: 1.05}}>ESTIMATIVA<br />GROSSEIRA</div>
      </div>
      <Titulo texto="PELA CONTA DELE" y={300} size={110} cor="#1a1a1a" />
      <Etiqueta texto="PALAVRA DO PRÓPRIO TEGMARK" />
    </AbsoluteFill>
  );
};
// 16b. octilhões: o contador de zeros
const Octilhoes: React.FC = () => {
  const f = useCurrentFrame();
  const g = '100.000.000.000.000.000.000.000.000.000';
  const n = Math.round(interpolate(f, [0, 30], [3, g.length], clamp));
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #1a0e2a, #020104 75%)'}}>
      <div style={{position: 'absolute', top: 700, left: 60, right: 60, textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: OURO, lineHeight: 1.15, wordBreak: 'break-all'}}>{g.slice(0, n)}</div>
      <Texto y={1180} size={64} cor="#fff" delay={24}>DE ZEROS</Texto>
      <Titulo texto="CEM OCTILHÕES" y={300} size={120} />
      <Etiqueta texto="CONTA · 10^29 = CEM OCTILHÕES" />
    </AbsoluteFill>
  );
};

const CENAS = [Espelho, Alguem, Celular, Rosto, Lembrancas, Maos, Tegmark, Ano2003, Logica, Infinito, Acaso, Tijolos, Inclusive, QuaoLonge, Grosseira, Numero, Visivel, PraComparar,
  Zeros, Octilhoes, Calma, NinguemViu, SemCopia, Suposicao, Mediu, Depende];
if (CENAS.length !== FRASES.length) throw new Error('cenas ≠ frases');
const SONS = [{em: 0, src: 'sfx/boom.wav', volume: 0.3}];
export const Video: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Short W={W} tempo={TEMPO} cenas={CENAS} audio="copia/narracao.mp3" calma={CALMA} sons={SONS} />
      {f < TEMPO.FALA && <SELO_FIXO />}
    </AbsoluteFill>
  );
};
