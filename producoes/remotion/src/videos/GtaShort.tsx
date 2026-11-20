// Short "E SE TODOS OS HOMENS DO MUNDO JOGASSEM GTA 6 POR 24 HORAS?" (aprovado pelo dono em 20/11/2026, v2).
// Tom animado e engraçado; Remotion 3D colorido e cômico, sem bonequinho e sem nada do jogo (plano B: rua estilo Miami, controle, TV, carro genéricos).
// Na tela: só o relógio "HORA 0 → 24" no canto e a legenda (56). Trilha animada sintetizada, apito de juiz na hora 0 e na hora 24.
import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, FONTE} from '../comum';
import * as K from '../lote/kit';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Terra, pr, cl, THREE} from '../lote/kit3d';
import {LAT, Tubo, Aviao, Ceu, canvasTex} from './Apophis';
import {Mostrador} from './Girando';
import palavras from './gtashort.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ROSA = '#ff3fa4', CIANO = '#22e4f0', LARANJA = '#ffa53a', ROXO = '#7b3ff7', AMAR = '#ffe23a', VERDE = '#3aff8a';

// ---------- peças ----------
export const Controle: React.FC<{pos?: V3; rot?: V3; s?: number; cor?: string}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1, cor = '#1c1f2a'}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh scale={[1, 0.42, 0.62]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.36, 0.55, 12, 24]} /><meshStandardMaterial color={cor} roughness={0.35} metalness={0.1} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.52, -0.2, 0.02]} rotation={[0.35, 0, l * 0.5]}><capsuleGeometry args={[0.17, 0.32, 10, 18]} /><meshStandardMaterial color={cor} roughness={0.35} /></mesh>)}
    {[[-0.2, -0.08], [0.2, -0.08]].map(([x, y], i) => <group key={i} position={[x, y, 0.13]}><mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.08, 0.06, 20]} /><meshStandardMaterial color="#0b0c10" /></mesh><mesh position={[0, 0, 0.05]}><sphereGeometry args={[0.075, 16, 12]} /><meshStandardMaterial color="#2a2e3a" roughness={0.8} /></mesh></group>)}
    {[[0.42, 0.14, AMAR], [0.52, 0.04, ROSA], [0.32, 0.04, CIANO], [0.42, -0.06, VERDE]].map(([x, y, c], i) => <mesh key={i} position={[x as number, y as number, 0.17]}><sphereGeometry args={[0.042, 14, 10]} /><meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={0.5} /></mesh>)}
    {[0, Math.PI / 2].map((r) => <mesh key={r} position={[-0.42, 0.04, 0.17]} rotation={[0, 0, r]}><boxGeometry args={[0.16, 0.05, 0.03]} /><meshStandardMaterial color="#0b0c10" /></mesh>)}
    <mesh position={[0, 0.1, 0.19]}><boxGeometry args={[0.16, 0.025, 0.01]} /><meshBasicMaterial color={CIANO} toneMapped={false} /></mesh>
  </group>
);
export const CaixaConsole: React.FC<{pos: V3; rot?: V3; s?: number; i: number}> = ({pos, rot = [0, 0, 0], s = 1, i}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh><boxGeometry args={[0.5, 0.7, 0.22]} /><meshStandardMaterial color="#f4f4f8" roughness={0.6} /></mesh>
    <mesh position={[0, 0.18, 0.112]}><planeGeometry args={[0.5, 0.16]} /><meshBasicMaterial color={[ROSA, CIANO, LARANJA, ROXO][i % 4]} toneMapped={false} /></mesh>
    <mesh position={[0, -0.1, 0.112]}><planeGeometry args={[0.3, 0.2]} /><meshBasicMaterial color="#1c1f2a" /></mesh>
  </group>
);
export const Sofa: React.FC<{pos?: V3; rot?: V3; cor?: string; s?: number}> = ({pos = [0, 0, 0], rot = [0, 0, 0], cor = ROXO, s = 1}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh position={[0, 0.25, 0]}><boxGeometry args={[2.2, 0.5, 0.9]} /><meshStandardMaterial color={cor} roughness={0.9} /></mesh>
    <mesh position={[0, 0.7, -0.38]}><boxGeometry args={[2.2, 0.7, 0.22]} /><meshStandardMaterial color={cor} roughness={0.9} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 1.12, 0.45, 0]}><boxGeometry args={[0.22, 0.6, 0.9]} /><meshStandardMaterial color={cor} roughness={0.9} /></mesh>)}
    {[-0.52, 0.52].map((x) => <mesh key={x} position={[x, 0.55, 0.02]}><boxGeometry args={[1, 0.14, 0.8]} /><meshStandardMaterial color={new THREE.Color(cor).offsetHSL(0, 0, 0.08).getStyle()} roughness={1} /></mesh>)}
  </group>
);
export const Palma: React.FC<{pos: V3; s?: number; f: number; cor?: string}> = ({pos, s = 1, f, cor = '#1fb86a'}) => (
  <group position={pos} scale={s}>
    <mesh position={[0.08, 1, 0]} rotation={[0, 0, -0.1]}><cylinderGeometry args={[0.05, 0.09, 2, 8]} /><meshStandardMaterial color="#8a5a3a" /></mesh>
    {LAT(8).map((i) => <group key={i} position={[0.18, 2, 0]} rotation={[0, i / 8 * Math.PI * 2, 0]}><mesh position={[0.45, -0.12, 0]} rotation={[0, 0, -0.45 + Math.sin(f * 0.06 + i) * 0.06]}><boxGeometry args={[0.95, 0.02, 0.2]} /><meshStandardMaterial color={cor} /></mesh></group>)}
  </group>
);
export const Caminhao: React.FC<{pos: V3; rot?: number; cor?: string; s?: number}> = ({pos, rot = 0, cor = LARANJA, s = 1}) => (
  <group position={pos} rotation={[0, rot, 0]} scale={s}>
    <mesh position={[-0.4, 0.75, 0]}><boxGeometry args={[2.2, 1.1, 0.95]} /><meshStandardMaterial color="#eef0f4" roughness={0.5} /></mesh>
    <mesh position={[-0.4, 0.75, 0.48]}><planeGeometry args={[2.1, 0.25]} /><meshBasicMaterial color={cor} toneMapped={false} /></mesh>
    <mesh position={[1.05, 0.6, 0]}><boxGeometry args={[0.7, 0.8, 0.9]} /><meshStandardMaterial color={cor} roughness={0.4} /></mesh>
    <mesh position={[1.41, 0.75, 0]}><boxGeometry args={[0.02, 0.3, 0.75]} /><meshStandardMaterial color="#1a2a3a" metalness={0.6} roughness={0.1} /></mesh>
    {[-1.1, 0.1, 1.05].map((x) => [-1, 1].map((l) => <mesh key={x + '' + l} position={[x, 0.2, l * 0.46]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.12, 18]} /><meshStandardMaterial color="#14161c" /></mesh>))}
  </group>
);
export const Carro: React.FC<{pos: V3; rot?: number; cor?: string}> = ({pos, rot = 0, cor = ROSA}) => (
  <group position={pos} rotation={[0, rot, 0]}>
    <mesh position={[0, 0.28, 0]}><boxGeometry args={[1.8, 0.28, 0.8]} /><meshStandardMaterial color={cor} metalness={0.5} roughness={0.25} /></mesh>
    <mesh position={[-0.15, 0.5, 0]} scale={[1, 0.6, 1]}><boxGeometry args={[0.8, 0.3, 0.7]} /><meshStandardMaterial color="#1a2a3a" metalness={0.7} roughness={0.1} /></mesh>
    {[-0.6, 0.6].map((x) => [-1, 1].map((l) => <mesh key={x + '' + l} position={[x, 0.15, l * 0.4]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.15, 0.15, 0.1, 16]} /><meshStandardMaterial color="#111" /></mesh>))}
  </group>
);
// pessoa sem rosto (só silhueta escura e distante)
export const Silhueta: React.FC<{pos: V3; s?: number; cor?: string}> = ({pos, s = 1, cor = '#2a1f3a'}) => (
  <group position={pos} scale={s}><mesh position={[0, 0.55, 0]}><capsuleGeometry args={[0.16, 0.6, 6, 12]} /><meshStandardMaterial color={cor} roughness={1} /></mesh><mesh position={[0, 1.08, 0]}><sphereGeometry args={[0.13, 12, 10]} /><meshStandardMaterial color={cor} roughness={1} /></mesh></group>
);
export const Chao: React.FC<{cor: string; y?: number; tam?: number}> = ({cor, y = 0, tam = 80}) => <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}><planeGeometry args={[tam, tam]} /><meshStandardMaterial color={cor} roughness={1} /></mesh>;
// barra de download 3D (k = fração cheia)
export const Barra: React.FC<{pos: V3; larg: number; k: number; s?: number}> = ({pos, larg, k, s = 1}) => (
  <group position={pos} scale={s}>
    <mesh><boxGeometry args={[larg + 0.12, 0.42, 0.16]} /><meshStandardMaterial color="#141826" roughness={0.4} /></mesh>
    <mesh position={[-larg / 2 + (larg * k) / 2, 0, 0.06]}><boxGeometry args={[Math.max(0.001, larg * k), 0.28, 0.1]} /><meshBasicMaterial color={new THREE.Color(VERDE).multiplyScalar(1.6)} toneMapped={false} /></mesh>
  </group>
);

// ---------- cenas ----------
// 1. Controle vibrando no sofá, TV acendendo com "carregando"
const S1: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, 18); const v = f > 6 ? Math.sin(f * 2.1) * 0.03 : 0; return <>
  <Cam pos={[lerp(0.8, 0.2, f / d), 1.5, lerp(4.6, 3.8, f / d)]} alvo={[0, 1.05, -0.5]} /><ambientLight intensity={0.25} color="#b0a0ff" /><pointLight position={[0, 1.6, -1.6]} intensity={6 * k} color={CIANO} distance={6} /><pointLight position={[2, 3, 2]} intensity={2} color={ROSA} />
  <color attach="background" args={['#120a24']} /><Chao cor="#2a1840" />
  <mesh position={[0, 1.6, -2.2]}><boxGeometry args={[2.6, 1.5, 0.08]} /><meshStandardMaterial color="#0a0a10" /></mesh>
  <mesh position={[0, 1.6, -2.15]}><planeGeometry args={[2.45, 1.35]} /><meshBasicMaterial color={new THREE.Color('#0d2a5a').lerp(new THREE.Color('#ff7a4a'), 0.3).multiplyScalar(k)} toneMapped={false} /></mesh>
  {LAT(8).map((i) => { const a = i / 8 * Math.PI * 2 + f * 0.25; return <mesh key={i} position={[Math.cos(a) * 0.22, 1.7 + Math.sin(a) * 0.22, -2.1]}><sphereGeometry args={[0.035, 8, 8]} /><meshBasicMaterial color="#ffffff" transparent opacity={k * (0.3 + 0.7 * ((i + Math.floor(f * 0.25 * 8 / 6.28)) % 8) / 8)} /></mesh>; })}
  <mesh position={[0, 1.6, -2.3]}><boxGeometry args={[0.2, 3, 0.05]} /><meshStandardMaterial color="#1a1028" /></mesh>
  <Sofa pos={[0, 0, 0.6]} cor={ROXO} s={0.9} />
  <Controle pos={[v, 0.68 + Math.abs(v) * 2, 0.75]} rot={[-1.2, 0, v * 4]} s={0.55} />
  <Pos bloom={0.9} /></>; }}</C3>; };
// 2. Chuva de caixas de console caindo no globo
const S2: React.FC = () => { const d = useD(); return <C3>{(f, tex) => <>
  <Cam pos={[Math.sin(f * 0.006) * 5.6, 1.2, Math.cos(f * 0.006) * 5.6]} /><Luzes sol={[-3, 2, 4]} i={2.6} amb={0.25} /><Estrelas sem="g2" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  {LAT(140).map((i) => { const t0 = random('ct' + i) * d * 0.7; const u = Math.max(0, f - t0) / 22; if (f < t0) return null; const th = random('ca' + i) * Math.PI * 2, ph = Math.acos(random('cb' + i) * 2 - 1); const dir = new THREE.Vector3(Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)); const r = Math.max(1.03, 3.2 - u * 2.2);
    return <CaixaConsole key={i} i={i} pos={dir.multiplyScalar(r).toArray() as V3} rot={[th, ph, random('cr' + i) * 3]} s={0.1} />; })}
  <Pos bloom={0.7} /></>}</C3>; };
// 3. Globo com cabos de internet piscando e a barra de download por cima
const S3: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(0.4, 0.9, k), lerp(5, 6.2, k)]} alvo={[0, 0.5, 0]} /><Luzes sol={[-3, 2, 4]} i={2.2} amb={0.1} /><Estrelas sem="g3" />
  <Terra tex={tex} rot={[0.3, f * 0.005, 0]} />
  {LAT(10).map((i) => { const a = random('la' + i) * 6.28, b = a + 1 + random('lb' + i) * 2, la = (random('lc' + i) - 0.5) * 1.4; const P = (x: number, h: number): V3 => [Math.cos(x) * h * Math.cos(la), Math.sin(la) * h, Math.sin(x) * h * Math.cos(la)];
    return <Tubo key={i} pts={LAT(9).map((j) => P(lerp(a, b, j / 8), 1.02 + Math.sin(j / 8 * Math.PI) * 0.25))} r={0.008} cor={[CIANO, ROSA, AMAR][i % 3]} brilho={(Math.floor(f / 4) + i) % 3 ? 1.8 : 0.4} />; })}
  <Barra pos={[0, 1.5, 0.6]} larg={2.6} k={0.038 * k} s={0.55} />
  <Pos bloom={1} /></>; }}</C3>; };
// 4. Barra gigante parada em 3,8% e o mostrador de 24 h fechando
const S4: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[lerp(-0.8, 0.8, k), 0.1, 7]} alvo={[0, 0, 0]} tremor={k > 0.85 ? 0.01 : 0} /><ambientLight intensity={0.5} /><directionalLight position={[2, 4, 5]} intensity={1.5} /><color attach="background" args={['#170b30']} />
  <Barra pos={[0, -1.3, 0]} larg={2.4} k={0.038} />
  <group position={[0, 0.7, -0.5]} rotation={[0, 0, 0]}><Mostrador n={24} h={k * Math.PI * 2} m={k * Math.PI * 48} cor={ROSA} r={1} fundo="#0b0e14" /></group>
  <mesh position={[-1.2 + 2.4 * 0.038 + 0.15, -1.3, 0.2]} rotation={[0, 0, Math.sin(f * 0.3) * 0.05]}><coneGeometry args={[0.1, 0.25, 4]} /><meshBasicMaterial color={AMAR} toneMapped={false} /></mesh>
  <Pos bloom={1} /></>; }}</C3>; };
// 5. Cidade de noite: toda janela azul com a barrinha
const S5: React.FC = () => { const d = useD(); const tex = useMemo(() => canvasTex(128, 96, (g) => { g.fillStyle = '#1a6aff'; g.fillRect(0, 0, 128, 96); g.fillStyle = '#0a1430'; g.fillRect(16, 56, 96, 14); g.fillStyle = '#3aff8a'; g.fillRect(16, 56, 6, 14); }), []); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[lerp(-1, 1, k), lerp(1.4, 2.2, k), lerp(5, 9, k)]} alvo={[0, 2.4, -2]} /><ambientLight intensity={0.2} color="#8070ff" /><color attach="background" args={['#0a0418']} /><Estrelas sem="g5" />
  {[-3.2, 0, 3.2].map((x, b) => <group key={b} position={[x, 0, -2 - (b % 2)]}><mesh position={[0, 3, 0]}><boxGeometry args={[2.8, 6, 1.5]} /><meshStandardMaterial color={['#3a1a5a', '#1a2a5a', '#4a1a3a'][b]} /></mesh>
    {LAT(30).map((j) => <mesh key={j} position={[-1 + (j % 5) * 0.5, 0.6 + Math.floor(j / 5) * 0.9, 0.76]}><planeGeometry args={[0.36, 0.5]} /><meshBasicMaterial map={tex} toneMapped={false} color={new THREE.Color(1, 1, 1).multiplyScalar(0.9 + 0.3 * random('jw' + b + j))} /></mesh>)}</group>)}
  <Chao cor="#140a24" />
  <Pos bloom={1.1} /></>; }}</C3>; };
// 6. Estrada estilo Miami no pôr do sol, caminhões parados no acostamento
const S6: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.6, 0.55, 6 - f * 0.05]} alvo={[0, 0.5, -20]} /><Luzes sol={[0, 3, -20]} i={1.6} amb={0.55} /><Ceu cima="#3a1a7a" baixo="#ff8a5a" />
  <Brilho pos={[0, 2.5, -60]} s={14} cor="#ffb060" o={1} />
  <Chao cor="#e8c890" y={-0.01} tam={200} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -30]}><planeGeometry args={[4, 120]} /><meshStandardMaterial color="#3a3644" /></mesh>
  {LAT(30).map((i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 4 - i * 4]}><planeGeometry args={[0.1, 1.6]} /><meshBasicMaterial color={AMAR} /></mesh>)}
  {LAT(8).map((i) => <Caminhao key={i} pos={[2.8, 0, 2 - i * 6]} rot={Math.PI / 2 + 0.15} cor={[LARANJA, ROSA, CIANO, ROXO][i % 4]} s={0.9} />)}
  {LAT(14).map((i) => <Palma key={'p' + i} pos={[i % 2 ? -3 : 4.6, 0, 3 - i * 4]} f={f + i * 9} s={1.2} cor={i % 3 ? '#1fb86a' : '#16a05a'} />)}
  <Pos bloom={0.7} /></>}</C3>;
// 7. Prateleira do supermercado esvaziando
const S7: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[lerp(-2.5, 2.5, k), 1.2, 4.2]} alvo={[lerp(-1.5, 1.5, k), 1.1, 0]} /><ambientLight intensity={0.7} /><directionalLight position={[1, 5, 4]} intensity={1.5} /><color attach="background" args={['#e8f4ff']} />
  <Chao cor="#d8e0ea" />
  {LAT(4).map((r) => <mesh key={r} position={[0, 0.2 + r * 0.6, 0]}><boxGeometry args={[7, 0.05, 0.8]} /><meshStandardMaterial color="#c8ccd4" metalness={0.5} roughness={0.4} /></mesh>)}
  <mesh position={[0, 1.2, -0.42]}><boxGeometry args={[7, 2.5, 0.05]} /><meshStandardMaterial color="#f4f6f8" /></mesh>
  {LAT(4).map((r) => LAT(22).map((c) => { const i = r * 22 + c; const sai = 0.1 + random('sx' + i) * 0.8; const e = interpolate(k, [sai, sai + 0.06], [1, 0], cl); if (e <= 0) return null;
    return <mesh key={i} position={[-3.3 + c * 0.31, 0.43 + r * 0.6, 0.1 - (1 - e) * 0.5]} scale={e}><boxGeometry args={[0.24, 0.4, 0.3]} /><meshStandardMaterial color={[ROSA, CIANO, LARANJA, AMAR, VERDE, ROXO][Math.floor(random('sc' + i) * 6)]} roughness={0.5} /></mesh>; }))}
  <Pos bloom={0.3} /></>; }}</C3>; };
// 8. Medidor da eletricidade do mundo subindo até um quarto
const S8: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d * 0.8, Easing.out(Easing.back(2))); const ang = Math.PI / 2 - k * Math.PI * 0.5; return <>
  <Cam pos={[0, 0.1, lerp(8, 7.2, f / d)]} alvo={[0, 0.1, 0]} tremor={k > 0.9 ? 0.008 : 0} /><ambientLight intensity={0.5} /><directionalLight position={[2, 3, 5]} intensity={1.4} /><color attach="background" args={['#0a1a2a']} />
  <mesh position={[0, 0, -0.1]}><circleGeometry args={[1.7, 64]} /><meshStandardMaterial color="#141c28" /></mesh>
  <mesh rotation={[0, 0, 0]}><torusGeometry args={[1.5, 0.05, 8, 64, Math.PI]} /><meshStandardMaterial color="#3a4458" /></mesh>
  <mesh rotation={[0, 0, Math.PI / 2 - Math.PI * 0.25]}><torusGeometry args={[1.5, 0.09, 8, 48, Math.PI * 0.25 * k]} /><meshBasicMaterial color={new THREE.Color(AMAR).multiplyScalar(1.8)} toneMapped={false} /></mesh>
  {LAT(9).map((i) => { const a = Math.PI - i / 8 * Math.PI; return <mesh key={i} position={[Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0]} rotation={[0, 0, a]}><boxGeometry args={[0.18, 0.03, 0.02]} /><meshBasicMaterial color="#c8d0e0" /></mesh>; })}
  <group rotation={[0, 0, ang]}><mesh position={[0, 0.65, 0.05]}><boxGeometry args={[0.06, 1.3, 0.04]} /><meshBasicMaterial color={ROSA} toneMapped={false} /></mesh></group>
  <mesh position={[0, 0, 0.08]}><sphereGeometry args={[0.12, 20, 16]} /><meshStandardMaterial color="#e8ecf4" metalness={0.6} /></mesh>
  {LAT(3).map((i) => { const z = interpolate(f, [8 + i * 6, 14 + i * 6], [0, 1], cl); return <mesh key={i} position={[-1.6 + i * 1.6, -1.1, 0.2]} scale={z}><octahedronGeometry args={[0.18]} /><meshBasicMaterial color={AMAR} toneMapped={false} /></mesh>; })}
  <Pos bloom={1} /></>; }}</C3>; };
// 9. Torres de energia com os cabos piscando (a rede leva um baque)
const S9: React.FC = () => <C3>{(f) => { const pisca = Math.floor(f / 3) % 3 === 0 ? 0.2 : 1.6; return <>
  <Cam pos={[3, 1.8, 6 - f * 0.03]} alvo={[0, 2, -6]} tremor={0.02} /><ambientLight intensity={0.3} /><Ceu cima="#1a0a3a" baixo="#ff6a6a" /><Estrelas sem="g9" />
  <Chao cor="#2a1a2a" tam={200} />
  {LAT(5).map((i) => <group key={i} position={[0, 0, -i * 5]}>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.5, 2, 0]} rotation={[0, 0, -l * 0.12]}><boxGeometry args={[0.08, 4, 0.08]} /><meshStandardMaterial color="#8a90a0" metalness={0.7} /></mesh>)}
    <mesh position={[0, 3.6, 0]}><boxGeometry args={[2.6, 0.08, 0.08]} /><meshStandardMaterial color="#8a90a0" metalness={0.7} /></mesh>
    {i === 1 && <Brilho pos={[1.2, 3.6, 0]} s={1.4 * (Math.floor(f / 2) % 2)} cor={CIANO} o={1} />}</group>)}
  {[-1.2, 0, 1.2].map((x) => <Tubo key={x} pts={LAT(5).map((i) => [x, 3.55 - (i % 1) * 0.3, -i * 5] as V3)} r={0.015} cor={CIANO} brilho={pisca} />)}
  <Pos bloom={1.1} /></>; }}</C3>;
// 10. Sala de controle: cadeira vazia girando e alertas piscando
const S10: React.FC = () => <C3>{(f) => { const al = Math.floor(f / 5) % 2; return <>
  <Cam pos={[lerp(1.2, -0.4, f / 120), 1.7, 4.6]} alvo={[0, 1, -0.2]} /><ambientLight intensity={0.55} /><pointLight position={[0, 2.8, 1]} intensity={al ? 6 : 1} color="#ff2a2a" distance={8} /><color attach="background" args={['#0a0a12']} />
  <Chao cor="#1a1c24" />
  {LAT(5).map((i) => <group key={i} position={[(i - 2) * 1.05, 1.5, -1.2]} rotation={[0, (2 - i) * 0.18, 0]}><mesh><boxGeometry args={[1, 0.65, 0.05]} /><meshStandardMaterial color="#0a0a10" /></mesh>
    <mesh position={[0, 0, 0.03]}><planeGeometry args={[0.92, 0.57]} /><meshBasicMaterial color={(i + al) % 2 ? '#ff2a3a' : '#2a0a14'} toneMapped={false} /></mesh>
    <mesh position={[0, -0.15, 0.04]}><planeGeometry args={[0.7, 0.08]} /><meshBasicMaterial color="#0a1430" /></mesh><mesh position={[-0.33, -0.15, 0.045]}><planeGeometry args={[0.04, 0.08]} /><meshBasicMaterial color={VERDE} toneMapped={false} /></mesh></group>)}
  <mesh position={[0, 0.75, -0.6]}><boxGeometry args={[5, 0.08, 0.8]} /><meshStandardMaterial color="#2a2e3a" /></mesh>
  <group position={[0.2, 0, 0.4]} rotation={[0, f * 0.12, 0]}><mesh position={[0, 0.5, 0]}><boxGeometry args={[0.55, 0.08, 0.55]} /><meshStandardMaterial color="#3a3e4a" /></mesh><mesh position={[0, 0.85, -0.25]}><boxGeometry args={[0.55, 0.65, 0.07]} /><meshStandardMaterial color="#3a3e4a" /></mesh><mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5, 8]} /><meshStandardMaterial color="#888" metalness={0.8} /></mesh></group>
  <Pos bloom={1} /></>; }}</C3>;
// 11. Aeroporto: aviões parados, painel todo vermelho, caminhão de bombeiro estacionado
const S11: React.FC = () => <C3>{(f) => <>
  <Cam pos={[4 - f * 0.05, 1.4, 5]} alvo={[0 - f * 0.03, 1, -2]} /><Luzes sol={[-3, 6, 4]} i={1.8} amb={0.5} /><Ceu cima="#3a8ae8" baixo="#c8e8ff" />
  <Chao cor="#8a8e96" tam={200} />
  {LAT(4).map((i) => <Aviao key={i} pos={[-6 + i * 4, 0.5, -5]} s={1.6} rot={[0, -Math.PI / 2, 0]} cor="#f4f6fa" />)}
  <group position={[-1, 2.2, -1.2]}><mesh><boxGeometry args={[3.2, 1.9, 0.12]} /><meshStandardMaterial color="#14161c" /></mesh>
    {LAT(6).map((r) => <group key={r} position={[0, 0.7 - r * 0.28, 0.07]}><mesh position={[-0.6, 0, 0]}><planeGeometry args={[1.6, 0.18]} /><meshBasicMaterial color="#2a2e3a" /></mesh>
      {[-1, 1].map((l) => <mesh key={l} position={[1, 0, 0.01]} rotation={[0, 0, l * Math.PI / 4]} scale={(Math.floor(f / 4) + r) % 4 ? 1 : 0.6}><planeGeometry args={[0.2, 0.05]} /><meshBasicMaterial color="#ff2a3a" toneMapped={false} /></mesh>)}</group>)}</group>
  <mesh position={[-1, 0.6, -1.2]}><boxGeometry args={[0.1, 1.2, 0.1]} /><meshStandardMaterial color="#444" /></mesh>
  <group position={[2.6, 0, 0.8]} rotation={[0, -0.4, 0]}><Caminhao pos={[0, 0, 0]} cor="#e8202a" />
    <mesh position={[-0.4, 1.4, 0]} rotation={[0, 0, 0.12]}><boxGeometry args={[2.2, 0.08, 0.3]} /><meshStandardMaterial color="#c8ccd4" metalness={0.6} /></mesh></group>
  <Pos bloom={0.8} /></>}</C3>;
// 12. Gráfico de dinheiro despencando como montanha-russa
const PTS: V3[] = LAT(40).map((i) => { const x = i * 0.5; return [x, 3.5 - i * 0.09 + Math.sin(i * 0.7) * 0.6, 0]; });
const S12: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d, Easing.in(Easing.quad)); const c = new THREE.CatmullRomCurve3(PTS.map((p) => new THREE.Vector3(...p))); const p = c.getPoint(Math.min(0.999, k * 0.95)); return <>
  <Cam pos={[p.x - 2.5, p.y + 1.2, 4]} alvo={[p.x + 1, p.y - 0.4, 0]} /><ambientLight intensity={0.6} /><directionalLight position={[2, 6, 4]} intensity={1.4} /><Ceu cima="#2a1a5a" baixo="#ff5a8a" />
  <Tubo pts={PTS} r={0.06} cor="#ff2a3a" brilho={1.6} />
  {LAT(40).map((i) => <mesh key={i} position={[PTS[i][0], (PTS[i][1] - 3) / 2 + 0.2, 0]}><boxGeometry args={[0.04, Math.max(0.05, PTS[i][1] + 3), 0.04]} /><meshStandardMaterial color="#8a90a8" /></mesh>)}
  <mesh position={[p.x, p.y + 0.2, 0]}><boxGeometry args={[0.5, 0.3, 0.4]} /><meshStandardMaterial color={AMAR} /></mesh>
  {LAT(60).map((i) => { const x = p.x - 2 + random('mx' + i) * 6, y = p.y + 3 - ((f * 0.06 + random('my' + i) * 6) % 6); return <mesh key={i} position={[x, y, (random('mz' + i) - 0.5) * 3]} rotation={[f * 0.1 + i, i, 0]}><boxGeometry args={[0.3, 0.15, 0.005]} /><meshStandardMaterial color="#5ad86a" side={THREE.DoubleSide} /></mesh>; })}
  <Pos bloom={0.6} /></>; }}</C3>; };
// 13. Vista de cima do sofá de madrugada, relógio de parede disparando
const S13: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.3, 8, 1.6]} alvo={[0, 0, -0.2]} /><ambientLight intensity={0.15} /><pointLight position={[0, 1.5, -1.6]} intensity={5} color={CIANO} distance={6} /><color attach="background" args={['#080412']} />
  <Chao cor="#24183a" />
  <Sofa pos={[0, 0, 0.4]} cor="#5a2fb0" />
  {LAT(6).map((i) => <mesh key={i} position={[(random('lx' + i) - 0.5) * 3, 0.03, 1.5 + random('lz' + i)]} rotation={[-Math.PI / 2, 0, i]}><cylinderGeometry args={[0.07, 0.07, 0.2, 16]} /><meshStandardMaterial color={[ROSA, LARANJA, CIANO][i % 3]} /></mesh>)}
  <Controle pos={[0.3, 0.65, 0.6]} rot={[-Math.PI / 2, 0, 0.3]} s={0.5} />
  <group position={[0, 0.4, -1.5]} rotation={[-Math.PI / 2, 0, 0]}><Mostrador n={12} h={f * 0.04} m={f * 0.5} cor={AMAR} r={0.6} /></group>
  <Pos bloom={0.8} /></>}</C3>;
// 14. "Bêbado sem beber": a sala gira e o controle aparece em dobro
const S14: React.FC = () => <C3>{(f) => { const w = Math.sin(f * 0.12); return <>
  <Cam pos={[Math.sin(f * 0.08) * 0.6, 1.2 + w * 0.15, 3.6]} alvo={[w * 0.3, 0.8, 0]} /><ambientLight intensity={0.45} /><pointLight position={[1, 2, 2]} intensity={3} color={ROSA} /><color attach="background" args={['#1a0a2a']} />
  <group rotation={[0, 0, w * 0.18]}>
    {[-1, 1].map((l) => <group key={l} position={[l * (0.12 + 0.08 * Math.abs(w)), 0, 0]}><Controle pos={[0, 0.9, 0]} rot={[0.2, f * 0.03, 0]} s={0.55} cor={l < 0 ? '#3a2a5a' : '#1c1f2a'} /></group>)}
    {LAT(10).map((i) => { const a = i / 10 * Math.PI * 2 + f * 0.1; return <mesh key={i} position={[Math.cos(a) * 0.9, 1.5 + Math.sin(f * 0.2 + i) * 0.1, Math.sin(a) * 0.6 - 0.5]}><sphereGeometry args={[0.06, 10, 8]} /><meshBasicMaterial color={[AMAR, CIANO, ROSA][i % 3]} toneMapped={false} /></mesh>; })}</group>
  <Pos bloom={1} /></>; }}</C3>;
// 15. Copo d'água gigante caindo do céu ao lado do sofá
const S15: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.4, Easing.in(Easing.quad)); const pul = f > d * 0.4 ? interpolate(f, [d * 0.4, d * 0.4 + 6, d * 0.4 + 12], [1, 0.9, 1], cl) : 1; return <>
  <Cam pos={[2.8, 4.5, 4.5]} alvo={[0.4, 0.8, 0]} tremor={f > d * 0.4 && f < d * 0.4 + 10 ? 0.03 : 0} /><Luzes sol={[-2, 6, 4]} i={1.8} amb={0.6} /><color attach="background" args={['#ffd8f0']} />
  <Chao cor="#f0c8e0" />
  <Sofa pos={[-1.4, 0, 0]} cor={CIANO} />
  <group position={[1.4, lerp(12, 0, k), 0]} scale={[1, pul, 1]}>
    <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.75, 0.6, 2.4, 40, 1, true]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.35} roughness={0.05} side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, 0.95, 0]}><cylinderGeometry args={[0.7, 0.6, 1.8, 40]} /><meshPhysicalMaterial color="#5ac8ff" transparent opacity={0.7} roughness={0.05} /></mesh>
    <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.6, 0.6, 0.04, 40]} /><meshStandardMaterial color="#e8f4ff" /></mesh></group>
  {f > d * 0.4 && LAT(30).map((i) => { const t = (f - d * 0.4) / 14; const a = random('ga' + i) * 6.28; return <mesh key={i} position={[1.4 + Math.cos(a) * t * (0.8 + random('gr' + i)), 0.2 + t * 2 * random('gy' + i) - t * t * 0.9, Math.sin(a) * t * (0.8 + random('gr' + i))]}><sphereGeometry args={[0.07, 10, 8]} /><meshPhysicalMaterial color="#5ac8ff" transparent opacity={Math.max(0, 1 - t * 0.5)} /></mesh>; })}
  <Pos bloom={0.4} /></>; }}</C3>; };
// 16. Hora 24: controles caindo no chão e quicando
const S16: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 2.2, 5]} alvo={[0, 0.6, 0]} /><Luzes sol={[2, 6, 4]} i={1.8} amb={0.5} /><color attach="background" args={['#ffb347']} />
  <Chao cor="#ff8a3a" />
  {LAT(14).map((i) => { const t0 = random('dt' + i) * 30; const t = Math.max(0, f - t0) / 30; const y = t < 0.6 ? lerp(5, 0.15, (t / 0.6) ** 2) : 0.15 + Math.abs(Math.sin((t - 0.6) * 9)) * 0.6 * Math.exp(-(t - 0.6) * 4);
    return <Controle key={i} pos={[(random('dx' + i) - 0.5) * 6, y, (random('dz' + i) - 0.5) * 3]} rot={[-Math.PI / 2 + (t < 0.6 ? f * 0.1 : 0), random('dr' + i) * 6, 0]} s={0.6} cor={[ROXO, '#1c1f2a', ROSA, '#1a4a8a'][i % 4]} />; })}
  <Pos bloom={0.4} /></>}</C3>;
// 17. Praça estilizada de Reykjavík, 1975, cheia de silhuetas sem rosto
const S17: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(2, 5, k), lerp(5, 11, k)]} alvo={[0, 1.4, -4]} /><Luzes sol={[-4, 4, 3]} i={1.4} amb={0.6} /><Ceu cima="#7a9ac8" baixo="#e8eef8" />
  <Chao cor="#9aa0a8" tam={120} />
  {LAT(9).map((i) => { const x = -8 + i * 2; const h = 1.6 + random('hh' + i) * 1.2; return <group key={i} position={[x, 0, -7]}><mesh position={[0, h / 2, 0]}><boxGeometry args={[1.8, h, 1.6]} /><meshStandardMaterial color={['#e84a4a', '#f4c430', '#3a8ae8', '#f4f4f0', '#3ab08a'][i % 5]} /></mesh>
    <mesh position={[0, h + 0.35, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[1.35, 0.7, 4]} /><meshStandardMaterial color={['#2a2e3a', '#c83a2a', '#3a4a3a'][i % 3]} /></mesh></group>; })}
  <group position={[0, 0, -11]}>{LAT(6).map((i) => <mesh key={i} position={[0, 0.6 + i * 1.1, 0]}><boxGeometry args={[2.2 - i * 0.3, 1.2, 1.2]} /><meshStandardMaterial color="#d8d8d0" /></mesh>)}<mesh position={[0, 7.4, 0]}><coneGeometry args={[0.4, 1.4, 4]} /><meshStandardMaterial color="#d8d8d0" /></mesh></group>
  {LAT(260).map((i) => <Silhueta key={i} pos={[(random('px' + i) - 0.5) * 12, 0, -5.5 + random('pz' + i) * 6]} s={0.55 + random('ps' + i) * 0.1} cor={['#2a1f3a', '#3a2030', '#1f2a3a'][i % 3]} />)}
  <Pos bloom={0.3} /></>; }}</C3>; };
// 18. Controle e globo lado a lado, a pergunta final
const S18: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.2, 5.6 - f * 0.006]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.3} /><Estrelas sem="g18" />
  <group position={[0, 0.85, 0]}><Terra tex={tex} r={0.8} rot={[0.3, f * 0.006, 0]} /></group>
  <Controle pos={[0, -1.05 + Math.sin(f * 0.06) * 0.06, 0.3]} rot={[0.35, Math.sin(f * 0.03) * 0.25, 0.08]} s={1} cor={ROXO} />
  <Pos bloom={0.8} /></>}</C3>;

const PLANO: K.Plano = [
  ['e se todos os', S1], ['hora zero a gente', S2], ['hora um pelas', S3], ['o dia acaba e', S4], ['ninguem joga mas', S5],
  ['hora tres os', S6], ['e o supermercado esvazia', S7], ['hora seis pelas', S8], ['a rede leva', S9], ['e quem cuida', S10],
  ['hora doze sem', S11], ['o mundo perde', S12], ['hora dezoito um', S13], ['bebado sem beber', S14], ['levanta e bebe', S15],
  ['hora vinte e', S16], ['em mil novecentos', S17], ['largava o controle', S18],
];
// relógio do canto: a hora muda quando o narrador fala
const HORAS: [string, number][] = [['hora zero a gente', 0], ['hora um pelas', 1], ['hora tres os', 3], ['hora seis pelas', 6], ['hora doze sem', 12], ['hora dezoito um', 18], ['hora vinte e', 24]];
const Extra: React.FC = () => {
  const f = useCurrentFrame(); const T = TEMPO.T; const at = (fr: string) => T[PLANO.findIndex((p) => p[0] === fr)];
  const i = HORAS.reduce((acc, [fr], j) => (f >= at(fr) ? j : acc), 0);
  const h = HORAS[i][1], dt = f - at(HORAS[i][0]);
  const s = i === 0 && f < at(HORAS[0][0]) ? interpolate(f, [0, 8], [0, 1], cl) : interpolate(dt, [0, 4, 10], [1.35, 0.92, 1], cl);
  const ang = (h / 24) * 360 * 2 + interpolate(dt, [0, 8], [-60, 0], cl);
  const fim = h === 24;
  return <AbsoluteFill>
    <style>{`@font-face{font-family:'${FONTE}';src:url('${staticFile('fontes/Montserrat-ExtraBold.ttf')}');}`}</style>
    <div style={{position: 'absolute', top: 120, right: 40, display: 'flex', alignItems: 'center', gap: 16, padding: '14px 26px 14px 16px', background: fim ? '#e0180c' : '#111', border: `5px solid ${AMAR}`, borderRadius: 60, transform: `scale(${s}) rotate(${interpolate(dt, [0, 4, 10], [-6, 3, 0], cl)}deg)`, transformOrigin: 'right center', boxShadow: '0 10px 30px rgba(0,0,0,.55)'}}>
      <svg width={70} height={70} viewBox="-35 -35 70 70"><circle r={31} fill="#fff" stroke={AMAR} strokeWidth={4} />{LAT(12).map((j) => <line key={j} x1={0} y1={-26} x2={0} y2={-21} stroke="#111" strokeWidth={3} transform={`rotate(${j * 30})`} />)}
        <line x1={0} y1={0} x2={0} y2={-15} stroke="#111" strokeWidth={5} strokeLinecap="round" transform={`rotate(${ang / 2})`} /><line x1={0} y1={0} x2={0} y2={-24} stroke="#e0180c" strokeWidth={3} strokeLinecap="round" transform={`rotate(${ang * 12})`} /><circle r={4} fill="#111" /></svg>
      <div style={{fontFamily: FONTE, color: '#fff', fontSize: 58, lineHeight: 1}}>HORA <span style={{color: fim ? '#fff' : AMAR}}>{h}</span><span style={{fontSize: 30, opacity: 0.75}}> /24</span></div>
    </div>
    <Audio src={staticFile('gta_short/trilha.mp3')} volume={0.13} />
    {HORAS.map(([fr], j) => <Sequence key={j} from={at(fr)} durationInFrames={30}><Audio src={staticFile(j === 0 || j === HORAS.length - 1 ? 'sfx/apito.wav' : 'sfx/hit.wav')} volume={j === 0 || j === HORAS.length - 1 ? 0.22 : 0.25} /></Sequence>)}
  </AbsoluteFill>;
};
const S = K.criarShort(W, PLANO, 'gta_short/narracao.mp3', 'em mil novecentos', Extra, {legenda: 56});
const TEMPO = S.tempo;
export const Video = S.Video; export const DURACAO = S.DURACAO;
void random;
