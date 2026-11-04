// Kit de cenas do lote "Linha dos campeões" (04/11/2026). Cada vídeo descreve um PLANO: [frase-âncora, Tipo, props].
// Regra do dono (30/10 e 04/11): nenhuma cena se repete. Cada TIPO deste kit entra no máximo uma vez por vídeo
// (checar_repeticao.py confere), e cada foto entra numa cena só. Fotos são o tipo `Foto` (uma por arquivo).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, random, Easing} from 'remotion';
import {Titulo, Texto, Etiqueta, Sombra, Pino, Real, useSpring, shake, clamp, FONTE, OURO, CIANO, VERMELHO, LAVA, VERDE, Palavra, montar, Short} from '../comum';

export {OURO, CIANO, VERMELHO, LAVA, VERDE};
const out3 = Easing.out(Easing.cubic);
type P = Record<string, any>;
export type Plano = [string, React.FC<any>, P?][];

// ---------- fundos e peças ----------
export const Fundo: React.FC<{cor?: string; children?: React.ReactNode}> = ({cor = '#10203a', children}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${cor}, #020306 78%)`}}>{children}</AbsoluteFill>
);
export const Estrelas: React.FC<{n?: number; seed?: string; v?: number; op?: number}> = ({n = 150, seed = 'e', v = 0.25, op = 1}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: op}}>
      {Array.from({length: n}, (_, i) => <circle key={i} cx={(random(seed + 'x' + i) * 1080 + f * v * random(seed + 'v' + i)) % 1080} cy={random(seed + 'y' + i) * 1920}
        r={0.7 + random(seed + 'r' + i) * 2.2} fill="#fff" opacity={0.25 + 0.75 * random(seed + 'o' + i) * (0.75 + 0.25 * Math.sin(f / 6 + i))} />)}
    </svg>
  );
};
const T: React.FC<{t?: string; y?: number; size?: number; cor?: string}> = ({t, y = 300, size = 104, cor}) => (t ? <Titulo texto={t} y={y} size={size} cor={cor} /> : null);
const E: React.FC<{etq?: string; real?: boolean}> = ({etq, real}) => (etq ? <Etiqueta texto={etq} real={real} /> : null);
export const Caixa: React.FC<{texto: string; cor?: string; y?: number; size?: number; delay?: number}> = ({texto, cor = OURO, y = 820, size = 80, delay = 3}) => {
  const s = useSpring(delay, {damping: 10, mass: 0.6});
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{padding: '18px 38px', border: `7px solid ${cor}`, borderRadius: 22, fontFamily: FONTE, fontSize: size, color: cor, textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line',
        background: 'rgba(0,0,0,.62)', opacity: s, transform: `scale(${0.75 + 0.25 * s})`, maxWidth: 940}}>{texto}</div>
    </div>
  );
};
// esfera desenhada (planeta, estrela) com bandas opcionais
export const Esfera: React.FC<{x: number; y: number; r: number; cor: string; cor2?: string; bandas?: string[]; brilho?: string; id: string; rot?: number}> = ({x, y, r, cor, cor2 = '#000', bandas, brilho, id, rot = 0}) => (
  <g>
    <defs>
      <radialGradient id={'g' + id} cx="35%" cy="35%" r="75%"><stop offset="0" stopColor={cor} /><stop offset="1" stopColor={cor2} /></radialGradient>
      <clipPath id={'c' + id}><circle cx={x} cy={y} r={r} /></clipPath>
      <radialGradient id={'s' + id} cx="38%" cy="36%" r="72%"><stop offset="0.55" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.75} /></radialGradient>
    </defs>
    {brilho && <circle cx={x} cy={y} r={r * 1.25} fill={brilho} opacity={0.25} style={{filter: `blur(${r * 0.15}px)`}} />}
    <circle cx={x} cy={y} r={r} fill={`url(#g${id})`} />
    {bandas && <g clipPath={`url(#c${id})`} transform={`rotate(${rot} ${x} ${y})`}>
      {bandas.map((b, i) => <rect key={i} x={x - r} y={y - r + (i + 0.5) * (2 * r / bandas.length) - r * 0.06} width={2 * r} height={r * (0.09 + 0.05 * Math.sin(i * 2.1))} fill={b} opacity={0.55} />)}
    </g>}
    <circle cx={x} cy={y} r={r} fill={`url(#s${id})`} />
  </g>
);

// ---------- 1. Foto real (uma cena por arquivo) ----------
export const Foto: React.FC<{src: string; etq: string; t?: string; z?: [number, number]; pos?: string; filtro?: string; pino?: [number, number]; caixa?: string; cor?: string; ty?: number; ilus?: boolean; circulo?: [number, number, number]}> = ({src, etq, t, z = [1.05, 1.18], pos = 'center', filtro, pino, caixa, cor, ty, ilus, circulo}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: filtro, transform: `scale(${interpolate(f, [0, d], z)})`}} />
      <Sombra />
      <Etiqueta texto={etq} real={!ilus} />
      {circulo && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={circulo[0]} cy={circulo[1]} r={circulo[2] + 8 * Math.sin(f / 5)} fill="rgba(0,0,0,.85)" stroke={OURO} strokeWidth={7} strokeDasharray="22 14" /></svg>}
      {pino && <Pino x={pino[0]} y={pino[1]} s={interpolate(f, [4, 14], [0, 1], clamp)} cor={OURO} />}
      <T t={t} y={ty} />
      {caixa && <Caixa texto={caixa} cor={cor} y={1180} size={60} delay={10} />}
    </AbsoluteFill>
  );
};
// ---------- 2. Montagem: uma imagem recortada em círculo sobre outra foto ----------
export const Montagem: React.FC<{fundo: string; sobre: string; etq: string; t?: string; x?: number; y?: number; r?: number; posFundo?: string}> = ({fundo, sobre, etq, t, x = 540, y = 760, r = 330, posFundo = 'center'}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 22], [0.15, 1], {...clamp, easing: Easing.out(Easing.back(1.3))});
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <Img src={staticFile(fundo)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: posFundo, transform: `scale(${1.05 + f * 0.0012})`}} />
      <div style={{position: 'absolute', left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: '50%', overflow: 'hidden', transform: `scale(${s})`,
        boxShadow: '0 0 120px rgba(255,210,150,.35)'}}>
        <Img src={staticFile(sobre)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <Sombra />
      <Etiqueta texto={etq} />
      <T t={t} y={1240} />
    </AbsoluteFill>
  );
};
// ---------- 3. Número grande contando ----------
export const Numero: React.FC<{ate: number; t?: string; pre?: string; suf?: string; sub?: string; cor?: string; fundo?: string; etq?: string; dec?: number}> = ({ate, t, pre = '', suf = '', sub, cor = OURO, fundo = '#1a1030', etq, dec = 0}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [2, 28], [0, ate], {...clamp, easing: out3});
  const txt = v.toLocaleString('pt-BR', {minimumFractionDigits: dec, maximumFractionDigits: dec});
  return (
    <Fundo cor={fundo}>
      <div style={{position: 'absolute', top: 640, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: Math.min(230, 1500 / Math.max(1, (pre + ate.toLocaleString('pt-BR') + suf).length)), color: cor, whiteSpace: 'nowrap', letterSpacing: -6,
        fontVariantNumeric: 'tabular-nums', textShadow: `0 0 60px ${cor}66`, transform: shake(f, f < 30 ? 4 : 0)}}>{pre}{txt}{suf}</div>
      {sub && <Texto y={980} size={58} cor="#fff" delay={16}>{sub}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 4. Selo / carimbo de aviso ----------
export const Selo: React.FC<{texto: string; t?: string; cor?: string; etq?: string; fundo?: string}> = ({texto, t, cor = OURO, etq, fundo = '#202020'}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 8], [2.4, 1], {...clamp, easing: out3});
  return (
    <Fundo cor={fundo}>
      <div style={{position: 'absolute', top: 960, left: 540, transform: `translate(-50%,-50%) rotate(-6deg) scale(${s})`, padding: '30px 50px', border: `12px solid ${cor}`, borderRadius: 26,
        fontFamily: FONTE, fontSize: 96, color: cor, textAlign: 'center', lineHeight: 1.08, whiteSpace: 'pre-line', width: 860, boxSizing: 'border-box', opacity: interpolate(f, [0, 4], [0, 1], clamp)}}>{texto}</div>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 5. Glitch de texto ----------
export const Glitchy: React.FC<{texto: string; cor?: string; size?: number; etq?: string}> = ({texto, cor = '#e8f4ff', size = 150, etq}) => {
  const f = useCurrentFrame();
  const g = f < 10 || f % 23 < 2;
  const dx = g ? (random('g' + f) - 0.5) * 60 : 0;
  return (
    <AbsoluteFill style={{background: '#05070c', justifyContent: 'center', alignItems: 'center'}}>
      {g && Array.from({length: 8}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 0, right: 0, top: random('gy' + f + i) * 1920, height: 18 + random('gh' + i + f) * 90,
          background: i % 2 ? 'rgba(255,90,31,.35)' : 'rgba(0,220,255,.3)', transform: `translateX(${(random('gx' + i + f) - 0.5) * 280}px)`}} />
      ))}
      {[[-6, '#ff2a6d'], [6, '#05d9e8'], [0, cor]].map(([o, c], i) => (
        <div key={i} style={{position: 'absolute', top: 760, width: '100%', fontFamily: FONTE, fontSize: size, color: c as string, textAlign: 'center', lineHeight: 1.05, padding: '0 40px', boxSizing: 'border-box',
          transform: `translateX(${dx + (g ? (o as number) * 3 : (o as number) * 0.6)}px)`, mixBlendMode: i < 2 ? 'screen' : 'normal', whiteSpace: 'pre-line'}}>{texto}</div>
      ))}
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 6. Órbita: um corpo girando em volta de outro ----------
export const Orbita: React.FC<{centro: P; sat: P; raio?: number; t?: string; etq?: string; caixa?: string; vel?: number; elipse?: number; rastro?: boolean}> = ({centro, sat, raio = 330, t, etq = 'ANIMAÇÃO', caixa, vel = 0.06, elipse = 0.55, rastro = true}) => {
  const f = useCurrentFrame();
  const a = f * vel;
  const cx = 540, cy = 900;
  const x = cx + raio * Math.cos(a), y = cy + raio * elipse * Math.sin(a);
  const atras = Math.sin(a) < 0;
  const sat_ = <Esfera x={x} y={y} r={sat.r ?? 40} cor={sat.cor ?? '#4c8cf0'} cor2={sat.cor2 ?? '#0a1f40'} id="os" />;
  return (
    <Fundo cor="#0c1630">
      <Estrelas seed="orb" n={110} v={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <ellipse cx={cx} cy={cy} rx={raio} ry={raio * elipse} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} strokeDasharray="12 12" />
        {rastro && Array.from({length: 14}, (_, i) => { const b = a - i * 0.07; return <circle key={i} cx={cx + raio * Math.cos(b)} cy={cy + raio * elipse * Math.sin(b)} r={(sat.r ?? 40) * 0.35 * (1 - i / 14)} fill={OURO} opacity={0.5 * (1 - i / 14)} />; })}
        {atras && sat_}
        <Esfera x={cx} y={cy} r={centro.r ?? 150} cor={centro.cor ?? '#e0b080'} cor2={centro.cor2 ?? '#5a3010'} bandas={centro.bandas} brilho={centro.brilho} id="oc" />
        {!atras && sat_}
        {centro.nome && <text x={cx} y={cy + (centro.r ?? 150) + 70} textAnchor="middle" fontFamily={FONTE} fontSize={44} fill="#fff">{centro.nome}</text>}
        {sat.nome && <text x={x} y={y - (sat.r ?? 40) - 20} textAnchor="middle" fontFamily={FONTE} fontSize={38} fill={OURO}>{sat.nome}</text>}
      </svg>
      <T t={t} />
      {caixa && <Caixa texto={caixa} y={1300} size={56} delay={10} />}
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 7. Régua de distâncias (vertical, do chão para o alto) ----------
export const Regua: React.FC<{marcas: {v: number; label: string; cor?: string; dy?: number}[]; max: number; t?: string; etq?: string; log?: boolean}> = ({marcas, max, t, etq = 'ESCALA · CÁLCULO', log}) => {
  const f = useCurrentFrame();
  const y0 = 1440, y1 = 520;
  const pos = (v: number) => y0 - (log ? Math.log10(1 + v) / Math.log10(1 + max) : v / max) * (y0 - y1);
  const crescer = interpolate(f, [0, 30], [y0, y1], {...clamp, easing: out3});
  return (
    <Fundo cor="#14202c">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={130} y1={y0} x2={130} y2={crescer} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        {Array.from({length: 21}, (_, i) => { const yy = y0 - i * (y0 - y1) / 20; return yy >= crescer ? <line key={i} x1={115} x2={145} y1={yy} y2={yy} stroke="#fff" strokeOpacity={0.5} strokeWidth={3} /> : null; })}
        {marcas.map((m, i) => {
          const yy = pos(m.v);
          const s = interpolate(f, [8 + i * 7, 16 + i * 7], [0, 1], clamp);
          return <g key={i} opacity={s}>
            <circle cx={130} cy={yy} r={18} fill={m.cor ?? OURO} />
            <line x1={150} x2={190} y1={yy} y2={yy} stroke={m.cor ?? OURO} strokeWidth={5} />
            <text x={205} y={yy + 15 + (m.dy ?? 0)} fontFamily={FONTE} fontSize={42} fill={m.cor ?? OURO}>{m.label}</text>
          </g>;
        })}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 8. Barras de comparação ----------
export const Barras: React.FC<{itens: {label: string; v: number; cor?: string; txt?: string}[]; t?: string; etq?: string}> = ({itens, t, etq = 'COMPARAÇÃO'}) => {
  const f = useCurrentFrame();
  const max = Math.max(...itens.map((i) => i.v));
  return (
    <Fundo cor="#1c1428">
      {itens.map((it, i) => {
        const k = interpolate(f, [4 + i * 6, 26 + i * 6], [0, it.v / max], {...clamp, easing: out3});
        return <div key={i} style={{position: 'absolute', left: 90, top: 620 + i * 210, width: 900}}>
          <div style={{fontFamily: FONTE, fontSize: 44, color: '#fff', marginBottom: 10}}>{it.label}</div>
          <div style={{height: 80, width: Math.max(14, 900 * k), background: it.cor ?? OURO, borderRadius: 14, boxShadow: `0 0 30px ${(it.cor ?? OURO)}55`}} />
          {it.txt && <div style={{position: 'absolute', right: 0, top: 0, fontFamily: FONTE, fontSize: 44, color: it.cor ?? OURO, opacity: k > 0.05 ? 1 : 0}}>{it.txt}</div>}
        </div>;
      })}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 9. Curva (gráfico de linha que sobe e cai) ----------
export const Curva: React.FC<{pontos: number[]; rotulos?: {i: number; txt: string; cor?: string}[]; t?: string; etq?: string; cor?: string; eixo?: string}> = ({pontos, rotulos = [], t, etq = 'GRÁFICO', cor = VERMELHO, eixo}) => {
  const f = useCurrentFrame();
  const n = pontos.length - 1, max = Math.max(...pontos);
  const X = (i: number) => 120 + (i / n) * 840, Y = (v: number) => 1350 - (v / max) * 650;
  const prog = interpolate(f, [0, 40], [0, n], {...clamp, easing: Easing.inOut(Easing.quad)});
  const pts: string[] = [];
  for (let i = 0; i <= Math.floor(prog); i++) pts.push(`${X(i)},${Y(pontos[i])}`);
  const fi = Math.floor(prog), fr_ = prog - fi;
  const ultimo = fi < n ? [X(fi + fr_), Y(pontos[fi] + (pontos[fi + 1] - pontos[fi]) * fr_)] : [X(n), Y(pontos[n])];
  pts.push(ultimo.join(','));
  return (
    <Fundo cor="#0e1a24">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={120} x2={960} y1={1350 - i * 162} y2={1350 - i * 162} stroke="#fff" strokeOpacity={0.12} strokeWidth={2} />)}
        <line x1={120} x2={960} y1={1350} y2={1350} stroke="#fff" strokeWidth={4} />
        <polyline points={pts.join(' ')} fill="none" stroke={cor} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" style={{filter: `drop-shadow(0 0 14px ${cor})`}} />
        <circle cx={ultimo[0]} cy={ultimo[1]} r={20} fill="#fff" />
        {rotulos.map((r, k) => prog >= r.i ? <text key={k} x={X(r.i)} y={Y(pontos[r.i]) - 40} textAnchor="middle" fontFamily={FONTE} fontSize={50} fill={r.cor ?? '#fff'}>{r.txt}</text> : null)}
        {eixo && <text x={540} y={1420} textAnchor="middle" fontFamily={FONTE} fontSize={36} fill="#9fb0c8">{eixo}</text>}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 10. Círculos de tamanho lado a lado ----------
export const Tamanhos: React.FC<{itens: {r: number; cor: string; label: string}[]; t?: string; etq?: string}> = ({itens, t, etq = 'ESCALA · ILUSTRAÇÃO'}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#201018">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {itens.map((it, i) => {
          const s = interpolate(f, [i * 8, i * 8 + 20], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
          const cx = 540 + (i - (itens.length - 1) / 2) * 0; const cy = 1400 - it.r;
          return <g key={i} opacity={0.92}>
            <circle cx={cx} cy={1400 - it.r * s} r={it.r * s} fill={it.cor} fillOpacity={0.35} stroke={it.cor} strokeWidth={6} />
            <text x={cx} y={cy - it.r + 60} textAnchor="middle" fontFamily={FONTE} fontSize={44} fill="#fff" opacity={s}>{it.label}</text>
          </g>;
        })}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 11. Fila de N itens (ex.: 40 Luas) ----------
export const Fila: React.FC<{n: number; cor?: string; t?: string; etq?: string; cols?: number; label?: string}> = ({n, cor = '#d8d8d0', t, etq = 'ANIMAÇÃO', cols = 8, label}) => {
  const f = useCurrentFrame();
  const L = Math.ceil(n / cols), tam = 900 / cols;
  return (
    <Fundo cor="#161a22">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: n}, (_, i) => {
          const s = interpolate(f, [i * 0.45, i * 0.45 + 7], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
          const cx = 90 + tam / 2 + (i % cols) * tam, cy = 960 - (L * tam) / 2 + tam / 2 + Math.floor(i / cols) * tam;
          return <Esfera key={i} x={cx} y={cy} r={tam * 0.42 * s + 0.01} cor={cor} cor2="#55554f" id={'f' + i} />;
        })}
      </svg>
      {label && <Texto y={1400} size={60} cor={OURO} delay={30}>{label}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 12. Pergunta pulsando ----------
export const Pergunta: React.FC<{t?: string; sub?: string; cor?: string; etq?: string}> = ({t, sub, cor = OURO, etq}) => {
  const f = useCurrentFrame();
  const s = 1 + 0.06 * Math.sin(f / 4);
  return (
    <Fundo cor="#2a1a08">
      <div style={{position: 'absolute', top: 520, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 620, color: cor, transform: `scale(${s}) rotate(${Math.sin(f / 9) * 6}deg)`,
        textShadow: `0 0 80px ${cor}88`, lineHeight: 1}}>?</div>
      {sub && <Texto y={1300} size={60} cor="#fff" delay={8}>{sub}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 13. Alerta vermelho piscando ----------
export const Alerta: React.FC<{texto: string; t?: string; etq?: string}> = ({texto, t, etq}) => {
  const f = useCurrentFrame();
  const on = Math.floor(f / 5) % 2 === 0;
  return (
    <AbsoluteFill style={{background: on ? '#3a0000' : '#120000', transform: shake(f, 5, 'al')}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 14}, (_, i) => <rect key={i} x={-300 + i * 120 + (f * 6) % 120} y={500} width={60} height={60} fill={on ? '#ffcc00' : '#806000'} transform="skewX(-35)" />)}
        {Array.from({length: 14}, (_, i) => <rect key={'b' + i} x={-300 + i * 120 - (f * 6) % 120} y={1360} width={60} height={60} fill={on ? '#ffcc00' : '#806000'} transform="skewX(-35)" />)}
        <polygon points="540,690 700,980 380,980" fill="none" stroke={VERMELHO} strokeWidth={22} strokeLinejoin="round" />
        <text x={540} y={950} textAnchor="middle" fontFamily={FONTE} fontSize={200} fill={VERMELHO}>!</text>
      </svg>
      <div style={{position: 'absolute', top: 1060, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 92, color: '#fff', padding: '0 50px', boxSizing: 'border-box', lineHeight: 1.05}}>{texto}</div>
      <T t={t} />
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 14. Céu estrelado com marcadores ----------
export const Ceu: React.FC<{pinos?: {x: number; y: number; txt?: string; cor?: string}[]; vazio?: [number, number]; t?: string; etq?: string; apagar?: boolean}> = ({pinos = [], vazio, t, etq = 'ILUSTRAÇÃO', apagar}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#02030a,#0a1028 70%,#121a30)'}}>
      <Estrelas seed="ceu" n={260} v={0.05} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {vazio && <>
          <circle cx={vazio[0]} cy={vazio[1]} r={150} fill="#000" />
          <circle cx={vazio[0]} cy={vazio[1]} r={150 + 8 * Math.sin(f / 5)} fill="none" stroke={OURO} strokeWidth={6} strokeDasharray="20 14" />
        </>}
        {pinos.map((p, i) => {
          const s = interpolate(f, [4 + i * 5, 12 + i * 5], [0, 1], clamp) * (apagar ? interpolate(f, [40 + i * 4, 50 + i * 4], [1, 0], clamp) : 1);
          return <g key={i} opacity={s}>
            <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={p.cor ?? VERMELHO} strokeWidth={5} />
            <circle cx={p.x} cy={p.y} r={8} fill={p.cor ?? VERMELHO} />
            {p.txt && <text x={p.x} y={p.y - 44} textAnchor="middle" fontFamily={FONTE} fontSize={38} fill={p.cor ?? VERMELHO}>{p.txt}</text>}
          </g>;
        })}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 15. Balança ----------
export const Balanca: React.FC<{esq: string; dir: string; t?: string; etq?: string; pesoEsq?: boolean}> = ({esq, dir, t, etq = 'ILUSTRAÇÃO', pesoEsq = false}) => {
  const f = useCurrentFrame();
  const ang = interpolate(f, [4, 26], [0, pesoEsq ? -14 : 14], {...clamp, easing: Easing.out(Easing.back(2))});
  const r = (ang * Math.PI) / 180;
  const p = (s: number): [number, number] => [540 + s * 330 * Math.cos(r), 820 + s * 330 * Math.sin(r)];
  const [ex, ey] = p(-1), [dx, dy] = p(1);
  return (
    <Fundo cor="#1a2a1a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polygon points="540,820 470,1300 610,1300" fill="#8a8f99" />
        <rect x={380} y={1290} width={320} height={30} rx={10} fill="#8a8f99" />
        <line x1={ex} y1={ey} x2={dx} y2={dy} stroke="#c8ccd4" strokeWidth={18} strokeLinecap="round" />
        <circle cx={540} cy={820} r={22} fill={OURO} />
        {[[ex, ey, esq], [dx, dy, dir]].map(([x, y, txt], i) => <g key={i}>
          <line x1={x as number} y1={y as number} x2={x as number} y2={(y as number) + 150} stroke="#c8ccd4" strokeWidth={5} />
          <path d={`M${(x as number) - 140} ${(y as number) + 150} Q${x} ${(y as number) + 230} ${(x as number) + 140} ${(y as number) + 150} Z`} fill="#c8ccd4" />
          <text x={x as number} y={(y as number) + 120} textAnchor="middle" fontFamily={FONTE} fontSize={50} fill={i ? CIANO : OURO}>{txt as string}</text>
        </g>)}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 16. Explosão (clarão e onda de choque) ----------
export const Explosao: React.FC<{t?: string; cor?: string; etq?: string; sub?: string}> = ({t, cor = '#ffd2a0', etq = 'ILUSTRAÇÃO', sub}) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 30], [0, 1], {...clamp, easing: out3});
  return (
    <AbsoluteFill style={{background: '#000', transform: shake(f, interpolate(f, [0, 20], [26, 2], clamp), 'ex')}}>
      <Estrelas seed="ex" n={120} v={0} op={0.6} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <defs><radialGradient id="exg"><stop offset="0" stopColor="#fff" /><stop offset="0.35" stopColor={cor} /><stop offset="1" stopColor={cor} stopOpacity={0} /></radialGradient></defs>
        <circle cx={540} cy={900} r={80 + k * 700} fill="url(#exg)" opacity={1 - k * 0.4} />
        {[0, 1, 2].map((i) => <circle key={i} cx={540} cy={900} r={k * (300 + i * 260)} fill="none" stroke={cor} strokeWidth={10 - i * 3} opacity={(1 - k) * 0.9} />)}
        {Array.from({length: 24}, (_, i) => { const a = (i / 24) * Math.PI * 2; return <line key={i} x1={540} y1={900} x2={540 + Math.cos(a) * k * 900} y2={900 + Math.sin(a) * k * 900} stroke="#fff" strokeOpacity={0.25 * (1 - k)} strokeWidth={6} />; })}
      </svg>
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(f, [0, 6], [0.9, 0], clamp)}} />
      {sub && <Texto y={1300} size={58} cor="#fff" delay={12}>{sub}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 17. Pizza de porcentagem ----------
export const Pizza: React.FC<{pct: number; t?: string; etq?: string; cor?: string; txt?: string; riscar?: boolean}> = ({pct, t, etq = 'ESTIMATIVA', cor = VERMELHO, txt, riscar}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [2, 26], [0, pct], {...clamp, easing: out3}) / 100;
  const a = p * Math.PI * 2 - Math.PI / 2;
  const R = 300, cx = 540, cy = 900;
  const d = `M${cx} ${cy} L${cx} ${cy - R} A${R} ${R} 0 ${p > 0.5 ? 1 : 0} 1 ${cx + R * Math.cos(a)} ${cy + R * Math.sin(a)} Z`;
  const risco = riscar ? interpolate(f, [30, 40], [0, 1], clamp) : 0;
  return (
    <Fundo cor="#20101a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={cx} cy={cy} r={R} fill="#2a2f3a" />
        <path d={d} fill={cor} />
        <circle cx={cx} cy={cy} r={R * 0.55} fill="#120a10" />
        <text x={cx} y={cy + 40} textAnchor="middle" fontFamily={FONTE} fontSize={120} fill="#fff">{txt ?? `${(p * 100).toFixed(1).replace('.', ',')}%`}</text>
        {risco > 0 && <line x1={cx - 330} y1={cy + 260} x2={cx - 330 + 660 * risco} y2={cy - 260 + 0 * risco} stroke={VERMELHO} strokeWidth={30} strokeLinecap="round" />}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 18. Terminal digitando ----------
export const Terminal: React.FC<{linhas: string[]; t?: string; etq?: string}> = ({linhas, t, etq = 'ILUSTRAÇÃO'}) => {
  const f = useCurrentFrame();
  const total = Math.floor(f * 1.6);
  let resto = total;
  return (
    <Fundo cor="#06140a">
      <div style={{position: 'absolute', left: 70, right: 70, top: 560, height: 820, background: '#020a04', border: '4px solid #1f6f3a', borderRadius: 24, padding: 40, boxSizing: 'border-box',
        fontFamily: 'monospace', fontSize: 44, color: '#4dff88', lineHeight: 1.45, boxShadow: '0 0 60px rgba(61,220,132,.25)'}}>
        {linhas.map((l, i) => { const n = Math.max(0, Math.min(l.length, resto)); resto -= l.length; return <div key={i} style={{whiteSpace: 'pre-wrap'}}>{l.slice(0, n)}{n > 0 && n < l.length && f % 10 < 5 ? '█' : ''}</div>; })}
      </div>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 19. Versus: tela dividida A × B ----------
export const Versus: React.FC<{a: {t: string; sub?: string; cor?: string}; b: {t: string; sub?: string; cor?: string}; t?: string; etq?: string}> = ({a, b, t, etq}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 12], [1, 0], {...clamp, easing: out3});
  const lado = (x: typeof a, i: number) => (
    <div style={{position: 'absolute', left: 0, right: 0, top: i ? 980 : 480, height: 470, transform: `translateX(${(i ? 1 : -1) * s * 1100}px)`,
      background: `linear-gradient(90deg, ${(x.cor ?? (i ? CIANO : VERMELHO))}33, transparent)`, borderLeft: `14px solid ${x.cor ?? (i ? CIANO : VERMELHO)}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 70px'}}>
      <div style={{fontFamily: FONTE, fontSize: 110, color: x.cor ?? (i ? CIANO : VERMELHO), lineHeight: 1}}>{x.t}</div>
      {x.sub && <div style={{fontFamily: FONTE, fontSize: 52, color: '#fff', marginTop: 16}}>{x.sub}</div>}
    </div>
  );
  return (
    <Fundo cor="#14141c">
      {lado(a, 0)}{lado(b, 1)}
      <div style={{position: 'absolute', top: 905, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: OURO, opacity: 1 - s}}>×</div>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 20. Carimbo "DESCARTADO" sobre uma frase ----------
export const Carimbo: React.FC<{base: string; carimbo: string; cor?: string; t?: string; etq?: string; size?: number}> = ({base, carimbo, cor = VERDE, t, etq, size = 120}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [4, 11], [3, 1], {...clamp, easing: out3});
  return (
    <Fundo cor="#1a1a24">
      <div style={{position: 'absolute', top: 700, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#fff', padding: '0 60px', boxSizing: 'border-box', lineHeight: 1.1}}>{base}</div>
      {f >= 4 && <div style={{position: 'absolute', top: 1200, left: 540, transform: `translate(-50%,-50%) rotate(-12deg) scale(${s})`, border: `14px solid ${cor}`, color: cor, padding: '10px 40px',
        fontFamily: FONTE, fontSize: size, borderRadius: 20, background: 'rgba(0,0,0,.4)', whiteSpace: 'nowrap'}}>{carimbo}</div>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 21. Túnel de estrelas (viagem) ----------
export const Tunel: React.FC<{t?: string; etq?: string; cor?: string; sub?: string}> = ({t, etq = 'ANIMAÇÃO', cor = '#9fd8ff', sub}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, #0a1430, #000 70%)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 160}, (_, i) => {
          const a = random('ta' + i) * Math.PI * 2;
          const z = ((random('tz' + i) + f * 0.025) % 1);
          const r0 = z * z * 1300, r1 = r0 + 20 + z * 120;
          return <line key={i} x1={540 + Math.cos(a) * r0} y1={960 + Math.sin(a) * r0} x2={540 + Math.cos(a) * r1} y2={960 + Math.sin(a) * r1} stroke={cor} strokeWidth={1 + z * 4} opacity={z} />;
        })}
      </svg>
      {sub && <Texto y={1300} size={58} cor="#fff" delay={8}>{sub}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 22. Bússola girando sem parar ----------
export const Bussola: React.FC<{t?: string; etq?: string}> = ({t, etq = 'ILUSTRAÇÃO'}) => {
  const f = useCurrentFrame();
  const a = f * 23 + Math.sin(f / 3) * 40;
  return (
    <Fundo cor="#1c1a10">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={900} r={330} fill="#e9e1cc" stroke="#7a6a40" strokeWidth={26} />
        {['N', 'L', 'S', 'O'].map((c, i) => <text key={c} x={540 + Math.sin(i * Math.PI / 2) * 250} y={900 - Math.cos(i * Math.PI / 2) * 250 + 22} textAnchor="middle" fontFamily={FONTE} fontSize={64} fill="#3a2f1a">{c}</text>)}
        <g transform={`rotate(${a} 540 900)`}>
          <polygon points="540,620 575,900 505,900" fill={VERMELHO} />
          <polygon points="540,1180 575,900 505,900" fill="#3a3f4a" />
        </g>
        <circle cx={540} cy={900} r={26} fill={OURO} />
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 23. Linhas de campo magnético em volta de um ponto ----------
export const Campo: React.FC<{t?: string; etq?: string; cor?: string}> = ({t, etq = 'ANIMAÇÃO', cor = CIANO}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#081830">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 9}, (_, i) => {
          const k = 70 + i * 55;
          const dash = 30 + i * 4;
          return <g key={i} stroke={cor} strokeWidth={5 - i * 0.35} fill="none" opacity={1 - i * 0.08} strokeDasharray={`${dash} ${dash * 0.6}`} strokeDashoffset={-f * (6 - i * 0.3)}>
            <path d={`M540 900 C ${540 + k * 1.6} ${900 - k * 2.2}, ${540 + k * 1.6} ${900 + k * 2.2}, 540 900`} />
            <path d={`M540 900 C ${540 - k * 1.6} ${900 - k * 2.2}, ${540 - k * 1.6} ${900 + k * 2.2}, 540 900`} />
          </g>;
        })}
        <circle cx={540} cy={900} r={46} fill="#e8f6ff" style={{filter: `drop-shadow(0 0 40px ${cor})`}} />
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 24. Planeta/estrela desenhado grande ----------
export const Astro: React.FC<{cor: string; cor2?: string; bandas?: string[]; brilho?: string; t?: string; etq?: string; r?: number; borda?: boolean; fundo?: string; caixa?: string}> = ({cor, cor2, bandas, brilho, t, etq = 'ILUSTRAÇÃO', r = 360, borda, fundo = '#080810', caixa}) => {
  const f = useCurrentFrame();
  const s = 1 + f * 0.0018;
  return (
    <Fundo cor={fundo}>
      <Estrelas seed="astro" n={140} v={0.1} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: '540px 900px'}}>
        <Esfera x={540} y={900} r={r} cor={cor} cor2={cor2} bandas={bandas} brilho={brilho} id="astro" rot={-8} />
        {borda && <circle cx={540} cy={900} r={r} fill="none" stroke="#9fd0ff" strokeWidth={6} strokeDasharray={`${r * 1.4} ${r * 5}`} strokeDashoffset={-r * 0.3} style={{filter: 'drop-shadow(0 0 16px #9fd0ff)'}} />}
      </svg>
      <T t={t} />
      {caixa && <Caixa texto={caixa} y={1330} size={56} delay={8} />}
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 25. Placa com lista de nomes ----------
export const Placa: React.FC<{itens: string[]; t?: string; etq?: string; titulo?: string}> = ({itens, t, etq = 'ILUSTRAÇÃO', titulo}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#2a2a2a">
      <div style={{position: 'absolute', left: 130, right: 130, top: 500, padding: '36px 40px', background: 'linear-gradient(135deg,#d9d9d4,#9a9a94 60%,#c8c8c2)', borderRadius: 12,
        boxShadow: '0 30px 80px rgba(0,0,0,.6), inset 0 0 20px rgba(0,0,0,.3)', transform: `perspective(1400px) rotateX(${interpolate(f, [0, 40], [18, 6], clamp)}deg)`}}>
        {titulo && <div style={{fontFamily: FONTE, fontSize: 40, color: '#2a2a28', textAlign: 'center', marginBottom: 16, letterSpacing: 2}}>{titulo}</div>}
        <div style={{columns: 2, columnGap: 40}}>
          {itens.map((n, i) => <div key={i} style={{fontFamily: FONTE, fontSize: 34, color: '#1c1c1a', opacity: interpolate(f, [i * 1.5, i * 1.5 + 6], [0, 1], clamp), lineHeight: 1.5, letterSpacing: 1}}>{n}</div>)}
        </div>
      </div>
      <T t={t} y={240} size={96} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 26. Relógio girando ----------
export const Relogio: React.FC<{t?: string; etq?: string; txt?: string; vel?: number}> = ({t, etq = 'ILUSTRAÇÃO', txt, vel = 18}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#14202a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={880} r={320} fill="#0c141c" stroke="#fff" strokeWidth={14} />
        {Array.from({length: 12}, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={540 + Math.sin(a) * 270} y1={880 - Math.cos(a) * 270} x2={540 + Math.sin(a) * 300} y2={880 - Math.cos(a) * 300} stroke="#fff" strokeWidth={10} />; })}
        <line x1={540} y1={880} x2={540 + Math.sin(f * vel * Math.PI / 180) * 250} y2={880 - Math.cos(f * vel * Math.PI / 180) * 250} stroke={OURO} strokeWidth={14} strokeLinecap="round" />
        <line x1={540} y1={880} x2={540 + Math.sin(f * vel / 12 * Math.PI / 180) * 170} y2={880 - Math.cos(f * vel / 12 * Math.PI / 180) * 170} stroke="#fff" strokeWidth={20} strokeLinecap="round" />
        <circle cx={540} cy={880} r={22} fill={OURO} />
      </svg>
      {txt && <Texto y={1260} size={70} cor={OURO} delay={6}>{txt}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 27. Curva de luz (estrela que pisca) ----------
export const Piscada: React.FC<{t?: string; etq?: string; txt?: string}> = ({t, etq = 'ANIMAÇÃO', txt}) => {
  const f = useCurrentFrame();
  const pico = Math.exp(-(((f - 30) / 7) ** 2));
  const pts = Array.from({length: Math.min(60, f + 1)}, (_, i) => `${100 + i * 15},${1420 - 40 - 220 * Math.exp(-(((i - 30) / 7) ** 2)) - 6 * random('pn' + i)}`).join(' ');
  return (
    <Fundo cor="#0a0a1a">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={760} r={40 + 120 * pico} fill="#fff6d8" opacity={0.9} style={{filter: `blur(${4 + 20 * pico}px)`}} />
        <circle cx={540} cy={760} r={22} fill="#fff" />
        <line x1={100} x2={1000} y1={1420} y2={1420} stroke="#fff" strokeOpacity={0.4} strokeWidth={3} />
        <polyline points={pts} fill="none" stroke={OURO} strokeWidth={8} />
      </svg>
      {txt && <Texto y={1080} size={64} cor={OURO} delay={30}>{txt}</Texto>}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 28. Chuva de partículas atravessando (neutrinos) ----------
export const Chuva: React.FC<{t?: string; etq?: string; cor?: string; sub?: string}> = ({t, etq = 'ANIMAÇÃO', cor = '#b388ff', sub}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#120a24">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 90}, (_, i) => {
          const x = random('cx' + i) * 1300 - 110, v = 30 + random('cv' + i) * 40;
          const y = ((random('cy' + i) * 2200 + f * v) % 2200) - 140;
          return <line key={i} x1={x} y1={y} x2={x - v * 0.6} y2={y - v * 2.4} stroke={cor} strokeWidth={3 + random('cw' + i) * 3} opacity={0.4 + 0.6 * random('co' + i)} strokeLinecap="round" />;
        })}
      </svg>
      {sub && <Caixa texto={sub} y={1240} size={58} cor={cor} delay={8} />}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 29. Calendário (meses com destaque) ----------
const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
export const Calendario: React.FC<{ruins?: number[]; bons?: number[]; t?: string; etq?: string; ano?: string}> = ({ruins = [], bons = [], t, etq, ano}) => {
  const f = useCurrentFrame();
  return (
    <Fundo cor="#161a28">
      {ano && <div style={{position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 70, color: OURO}}>{ano}</div>}
      {MESES.map((m, i) => {
        const s = interpolate(f, [i * 1.5, i * 1.5 + 8], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
        const c = ruins.includes(i) ? VERMELHO : bons.includes(i) ? VERDE : '#3a4258';
        return <div key={m} style={{position: 'absolute', left: 90 + (i % 3) * 310, top: 590 + Math.floor(i / 3) * 200, width: 280, height: 170, borderRadius: 20, background: c,
          transform: `scale(${s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTE, fontSize: 64, color: '#fff'}}>{m}</div>;
      })}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 30. Linha do tempo ----------
export const LinhaTempo: React.FC<{marcos: {ano: string; txt: string; cor?: string}[]; t?: string; etq?: string}> = ({marcos, t, etq}) => {
  const f = useCurrentFrame();
  const n = marcos.length;
  const prog = interpolate(f, [0, 30], [0, 1], {...clamp, easing: out3});
  return (
    <Fundo cor="#1e1a14">
      <div style={{position: 'absolute', left: 200, top: 560, width: 10, height: 820 * prog, background: '#fff', borderRadius: 5}} />
      {marcos.map((m, i) => {
        const y = 560 + (i / Math.max(1, n - 1)) * 800;
        const s = interpolate(f, [6 + i * 8, 14 + i * 8], [0, 1], clamp);
        return <div key={i} style={{position: 'absolute', left: 170, top: y - 34, opacity: s, display: 'flex', alignItems: 'center', transform: `translateX(${(1 - s) * 60}px)`}}>
          <div style={{width: 70, height: 70, borderRadius: 35, background: m.cor ?? OURO}} />
          <div style={{marginLeft: 30, fontFamily: FONTE}}><div style={{fontSize: 64, color: m.cor ?? OURO, lineHeight: 1}}>{m.ano}</div><div style={{fontSize: 40, color: '#fff'}}>{m.txt}</div></div>
        </div>;
      })}
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 31. Sistema Solar em escala com uma estrela crescendo no centro ----------
const PLANETAS = [{n: 'MERCÚRIO', a: 0.39, c: '#b0a090'}, {n: 'VÊNUS', a: 0.72, c: '#e8c27a'}, {n: 'TERRA', a: 1, c: '#4c8cf0'}, {n: 'MARTE', a: 1.52, c: '#d0603a'}, {n: 'JÚPITER', a: 5.2, c: '#d8b088'}, {n: 'SATURNO', a: 9.58, c: '#e8d090'}];
export const Sistema: React.FC<{ate: number; t?: string; etq?: string; cor?: string; sqrt?: boolean; caixa?: string; ini?: number}> = ({ate, t, etq = 'ESCALA · ANIMAÇÃO', cor = '#ff5a2a', sqrt = true, caixa, ini = 0.005}) => {
  const f = useCurrentFrame();
  const {durationInFrames: d} = useVideoConfig();
  const esc = (ua: number) => (sqrt ? Math.sqrt(ua / 9.58) : ua / 9.58) * 470;
  const R = esc(interpolate(f, [4, Math.max(20, d - 8)], [ini, ate], {...clamp, easing: Easing.inOut(Easing.quad)}));
  return (
    <Fundo cor="#0a0a14">
      <Estrelas seed="sis" n={100} v={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {PLANETAS.map((p, i) => {
          const r = esc(p.a), dentro = r < R;
          const a = -Math.PI / 2 + i * 0.95 + f * 0.01;
          return <g key={p.n} opacity={dentro ? 0.35 : 1}>
            <circle cx={540} cy={900} r={r} fill="none" stroke="#fff" strokeOpacity={0.25} strokeWidth={2} />
            <circle cx={540 + Math.cos(a) * r} cy={900 + Math.sin(a) * r} r={p.n === 'SATURNO' || p.n === 'JÚPITER' ? 16 : 10} fill={p.c} />
            <text x={540 + Math.cos(a) * r} y={900 + Math.sin(a) * r - 24} textAnchor="middle" fontFamily={FONTE} fontSize={26} fill={dentro ? VERMELHO : '#fff'}>{p.n}</text>
          </g>;
        })}
        <circle cx={540} cy={900} r={R} fill={cor} opacity={0.55} style={{filter: 'blur(3px)'}} />
        <circle cx={540} cy={900} r={R} fill="none" stroke={cor} strokeWidth={6} />
      </svg>
      <T t={t} y={240} size={92} />
      {caixa && <Caixa texto={caixa} y={1400} size={50} delay={10} />}
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 32. Galáxia espiral desenhada com pino ----------
export const Galaxia: React.FC<{pino?: {r: number; a: number; txt: string}; t?: string; etq?: string; pontos?: number}> = ({pino, t, etq = 'ILUSTRAÇÃO', pontos = 0}) => {
  const f = useCurrentFrame();
  const rot = f * 0.004;
  return (
    <Fundo cor="#120c20">
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <g transform={`rotate(${rot * 57} 540 900)`}>
          {Array.from({length: 900}, (_, i) => {
            const braco = i % 2, k = random('gk' + i);
            const r = 30 + k * 420, a = braco * Math.PI + k * 5 + (random('ga' + i) - 0.5) * 0.7;
            return <circle key={i} cx={540 + Math.cos(a) * r} cy={900 + Math.sin(a) * r * 0.62} r={1 + random('gr' + i) * 2.4} fill={random('gc' + i) > 0.8 ? '#ffd8b0' : '#cfe0ff'} opacity={0.35 + 0.6 * (1 - k)} />;
          })}
          <ellipse cx={540} cy={900} rx={80} ry={52} fill="#fff0d0" opacity={0.85} style={{filter: 'blur(14px)'}} />
          {Array.from({length: pontos}, (_, i) => {
            const r = 40 + random('bn' + i) * 400, a = random('ba' + i) * Math.PI * 2;
            return <circle key={'p' + i} cx={540 + Math.cos(a) * r} cy={900 + Math.sin(a) * r * 0.62} r={5} fill="#000" stroke={VERMELHO} strokeWidth={2} opacity={interpolate(f, [i * 0.3, i * 0.3 + 6], [0, 1], clamp)} />;
          })}
        </g>
        {pino && <g>
          <circle cx={540 + Math.cos(pino.a + rot) * pino.r} cy={900 + Math.sin(pino.a + rot) * pino.r * 0.62} r={20 + 6 * Math.sin(f / 4)} fill="none" stroke={OURO} strokeWidth={6} />
          <text x={540 + Math.cos(pino.a + rot) * pino.r} y={900 + Math.sin(pino.a + rot) * pino.r * 0.62 - 40} textAnchor="middle" fontFamily={FONTE} fontSize={40} fill={OURO}>{pino.txt}</text>
        </g>}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </Fundo>
  );
};
// ---------- 33. Cartão final de frase forte (tipografia em camadas) ----------
export const Frase: React.FC<{linhas: string[]; cor?: string; etq?: string; fundo?: string}> = ({linhas, cor = OURO, etq, fundo = '#000'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: fundo}}>
      {linhas.map((l, i) => {
        const s = interpolate(f, [i * 8, i * 8 + 10], [0, 1], {...clamp, easing: out3});
        return <div key={i} style={{position: 'absolute', top: 640 + i * 190, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 130, color: i % 2 ? cor : '#fff',
          opacity: s, transform: `translateY(${(1 - s) * 80}px) scale(${1 + (1 - s) * 0.4})`, letterSpacing: -2}}>{l}</div>;
      })}
      <E etq={etq} />
    </AbsoluteFill>
  );
};
// ---------- 34. Ondas do mar desenhadas ----------
export const Mar: React.FC<{t?: string; etq?: string; forte?: number}> = ({t, etq = 'ILUSTRAÇÃO', forte = 1}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg,#0a1830,#1a3a60 45%,#06223a)'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: 7}, (_, k) => {
          const y0 = 980 + k * 90, amp = (30 + k * 12) * forte;
          let d = `M0 1920 L0 ${y0}`;
          for (let x = 0; x <= 1080; x += 30) d += ` L${x} ${y0 + Math.sin(x / 90 + f / (6 - k * 0.4) + k) * amp}`;
          d += ' L1080 1920 Z';
          return <path key={k} d={d} fill={`hsl(${205 - k * 3},${60 + k * 4}%,${22 + k * 4}%)`} opacity={0.9} />;
        })}
      </svg>
      <T t={t} />
      <E etq={etq} />
    </AbsoluteFill>
  );
};

// ---------- montagem do vídeo a partir do PLANO ----------
export const criarShort = (W: Palavra[], plano: Plano, audio: string, calmaFrase: string, extra?: React.FC) => {
  const tempo = montar(W, plano.map((p) => p[0]));
  const cenas = plano.map(([, C, props]) => { const X: React.FC = () => <C {...(props ?? {})} />; return X; });
  const calma = plano.findIndex((p) => p[0] === calmaFrase);
  if (calma < 0) throw new Error('frase calma não está no plano');
  const Video: React.FC = () => (
    <AbsoluteFill>
      <Short W={W} tempo={tempo} cenas={cenas} audio={audio} calma={calma} sons={[{em: 0, src: 'sfx/boom.wav', volume: 0.3}]} />
      {extra && React.createElement(extra)}
    </AbsoluteFill>
  );
  return {Video, DURACAO: tempo.FIM, tempo};
};

// ---------- capa (thumb vertical) ----------
export const Capa: React.FC<{fundo?: string; texto: string; texto2?: string; cor?: string; children?: React.ReactNode; seta?: [number, number, number]; circulo?: [number, number, number]; filtro?: string; pos?: string}> = ({fundo, texto, texto2, cor = OURO, children, seta, circulo, filtro, pos}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    {fundo && <Img src={staticFile(fundo)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: filtro, objectPosition: pos}} />}
    {children}
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.55), transparent 30%, transparent 70%, rgba(0,0,0,.6))'}} />
    {circulo && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={circulo[0]} cy={circulo[1]} r={circulo[2]} fill="none" stroke={VERMELHO} strokeWidth={16} /></svg>}
    {seta && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><g transform={`translate(${seta[0]} ${seta[1]}) rotate(${seta[2]})`}>
      <rect x={-140} y={-22} width={200} height={44} fill={VERMELHO} stroke="#000" strokeWidth={5} /><polygon points="60,-70 160,0 60,70" fill={VERMELHO} stroke="#000" strokeWidth={5} /></g></svg>}
    <div style={{position: 'absolute', top: 1260, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 150, color: cor, lineHeight: 0.98, padding: '0 40px', boxSizing: 'border-box',
      WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 12px 40px rgba(0,0,0,.8)'}}>{texto}</div>
    {texto2 && <div style={{position: 'absolute', top: 160, width: '100%', textAlign: 'center', fontFamily: FONTE, fontSize: 96, color: '#fff', lineHeight: 1, padding: '0 40px', boxSizing: 'border-box',
      WebkitTextStroke: '8px #000', paintOrder: 'stroke fill'}}>{texto2}</div>}
  </AbsoluteFill>
);

// ---------- 35. Clipe real (vídeo) ----------
export const Clipe: React.FC<{src: string; etq: string; t?: string; ini?: number; z?: [number, number]; caixa?: string}> = ({src, etq, t, ini = 0, z = [1.05, 1.15], caixa}) => (
  <AbsoluteFill>
    <Real src={src} ini={ini} zoom={z} />
    <Sombra />
    <Etiqueta texto={etq} real />
    <T t={t} />
    {caixa && <Caixa texto={caixa} y={1180} size={60} delay={10} />}
  </AbsoluteFill>
);
