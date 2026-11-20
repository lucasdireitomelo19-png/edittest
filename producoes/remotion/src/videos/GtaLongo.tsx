// Longo "E SE TODOS OS HOMENS DO MUNDO JOGASSEM GTA 6 POR 24 HORAS?" (aprovado pelo dono em 20/11/2026). 3ª pessoa, tom de comentarista empolgado.
// Remotion 3D colorido e cômico, sem bonequinho e sem nada do jogo (plano B genérico). Nenhuma cena do Short é reaproveitada.
// Na tela: só a legenda (40) e o relógio "HORA 0 → 24" no canto. Apito de juiz em cada capítulo (cartão 3D com apito e confete).
import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Palavra, Final, FONTE} from '../comum';
import {criarLongo, Cap} from '../longo';
import {C3, Cam, Estrelas, Luzes, Pos, Brilho, Nuvem, Terra, pr, cl, THREE} from '../lote/kit3d';
import {LAT, Tubo, Aviao, Ceu, Casa, Viva, canvasTex} from './Apophis';
import {Mostrador} from './Girando';
import {Controle, CaixaConsole, Sofa, Palma, Caminhao, Carro, Silhueta, Chao, Barra} from './GtaShort';
import palavras from './gtalongo.palavras.json';

const W = palavras as Palavra[];
type V3 = [number, number, number];
const useD = () => useVideoConfig().durationInFrames;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ROSA = '#ff3fa4', CIANO = '#22e4f0', LARANJA = '#ffa53a', ROXO = '#7b3ff7', AMAR = '#ffe23a', VERDE = '#3aff8a', VERM = '#ff2a3a';
const CORES = [ROSA, CIANO, LARANJA, ROXO, AMAR, VERDE];
const sw = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], cl);
const B = Easing.out(Easing.back(1.8));

// ---------- peças ----------
const useTxt = (w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, key: string) => useMemo(() => canvasTex(w, h, draw), [key]); // eslint-disable-line react-hooks/exhaustive-deps
const Calendario: React.FC<{pos?: V3; rot?: V3; s?: number; dia: string; mes: string; ano: string; cor?: string; papel?: string}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1, dia, mes, ano, cor = VERM, papel = '#fbfbf6'}) => {
  const t = useTxt(512, 600, (g) => { g.fillStyle = papel; g.fillRect(0, 0, 512, 600); g.fillStyle = cor; g.fillRect(0, 0, 512, 150); g.fillStyle = '#fff'; g.font = 'bold 96px sans-serif'; g.textAlign = 'center'; g.fillText(mes, 256, 110);
    g.fillStyle = '#1a1a22'; g.font = 'bold 300px sans-serif'; g.fillText(dia, 256, 440); g.font = 'bold 80px sans-serif'; g.fillStyle = '#555'; g.fillText(ano, 256, 560); }, dia + mes + ano + cor);
  return <group position={pos} rotation={rot} scale={s}><mesh><boxGeometry args={[1.7, 2, 0.12]} /><meshStandardMaterial color="#d8d8d0" /></mesh><mesh position={[0, 0, 0.065]}><planeGeometry args={[1.62, 1.92]} /><meshStandardMaterial map={t} roughness={0.8} /></mesh>
    {[-0.5, 0.5].map((x) => <mesh key={x} position={[x, 1.02, 0.07]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.08, 0.02, 8, 16]} /><meshStandardMaterial color="#888" metalness={0.8} /></mesh>)}</group>;
};
const Folha: React.FC<{pos: V3; rot?: V3; s?: number; cor?: string}> = ({pos, rot = [0, 0, 0], s = 1, cor = '#fbfbf6'}) => <mesh position={pos} rotation={rot} scale={s}><planeGeometry args={[1.62, 1.92]} /><meshStandardMaterial color={cor} side={THREE.DoubleSide} /></mesh>;
const Placar: React.FC<{pos?: V3; s?: number; a: string; b: string}> = ({pos = [0, 0, 0], s = 1, a, b}) => {
  const t = useTxt(1024, 400, (g) => { g.fillStyle = '#0a0c14'; g.fillRect(0, 0, 1024, 400); g.font = 'bold 260px monospace'; g.textAlign = 'center'; g.fillStyle = '#ffb020'; g.fillText(a, 300, 300); g.fillText(b, 724, 300); g.fillStyle = '#fff'; g.fillText('×', 512, 290); }, a + b);
  return <group position={pos} scale={s}><mesh><boxGeometry args={[4.4, 1.9, 0.3]} /><meshStandardMaterial color="#20232e" metalness={0.5} /></mesh><mesh position={[0, 0, 0.16]}><planeGeometry args={[4.1, 1.6]} /><meshBasicMaterial map={t} toneMapped={false} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 1.6, -1.8, 0]}><boxGeometry args={[0.15, 1.8, 0.15]} /><meshStandardMaterial color="#555" /></mesh>)}</group>;
};
const Apito: React.FC<{pos?: V3; rot?: V3; s?: number; cor?: string}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1, cor = '#d8dce4'}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.42, 0.42, 0.7, 40]} /><meshStandardMaterial color={cor} metalness={0.9} roughness={0.15} /></mesh>
    <mesh position={[0.65, 0.24, 0]}><boxGeometry args={[0.9, 0.36, 0.5]} /><meshStandardMaterial color={cor} metalness={0.9} roughness={0.15} /></mesh>
    <mesh position={[-0.42, 0.42, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.18, 0.05, 10, 24]} /><meshStandardMaterial color={cor} metalness={0.9} roughness={0.2} /></mesh>
    <mesh position={[-0.6, 0.6, 0]} rotation={[0, 0, 0.6]}><cylinderGeometry args={[0.03, 0.03, 0.8, 8]} /><meshStandardMaterial color={VERM} /></mesh>
  </group>
);
const Console: React.FC<{pos?: V3; rot?: V3; s?: number; tipo?: 0 | 1; luz?: string}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1, tipo = 0, luz = CIANO}) => (
  <group position={pos} rotation={rot} scale={s}>
    {tipo === 0 ? <><mesh position={[0, 1, 0]} scale={[0.35, 1, 0.9]}><boxGeometry args={[1, 2, 1]} /><meshStandardMaterial color="#1a1c24" roughness={0.3} /></mesh>
      {[-1, 1].map((l) => <mesh key={l} position={[l * 0.2, 1, 0]} scale={[0.08, 1.05, 1]} rotation={[0, 0, l * 0.06]}><boxGeometry args={[1, 2.05, 0.95]} /><meshStandardMaterial color="#f4f4f8" roughness={0.4} /></mesh>)}</>
      : <><mesh position={[0, 0.85, 0]}><boxGeometry args={[0.85, 1.7, 0.85]} /><meshStandardMaterial color="#14161c" roughness={0.5} /></mesh><mesh position={[0, 1.71, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.3, 32]} /><meshBasicMaterial color="#2a2e38" /></mesh></>}
    <mesh position={[0, 0.25, 0.47]}><boxGeometry args={[0.12, 0.03, 0.01]} /><meshBasicMaterial color={luz} toneMapped={false} /></mesh>
  </group>
);
const TV: React.FC<{pos: V3; rot?: V3; s?: number; tela?: string; luz?: number}> = ({pos, rot = [0, 0, 0], s = 1, tela = '#1a6aff', luz = 1}) => (
  <group position={pos} rotation={rot} scale={s}><mesh><boxGeometry args={[1.6, 0.95, 0.06]} /><meshStandardMaterial color="#0a0a10" /></mesh>
    <mesh position={[0, 0, 0.035]}><planeGeometry args={[1.5, 0.85]} /><meshBasicMaterial color={new THREE.Color(tela).multiplyScalar(luz)} toneMapped={false} /></mesh>
    <mesh position={[0, -0.25, 0.04]}><planeGeometry args={[1.1, 0.07]} /><meshBasicMaterial color="#0a1020" /></mesh><mesh position={[-0.53, -0.25, 0.045]}><planeGeometry args={[0.04, 0.07]} /><meshBasicMaterial color={VERDE} toneMapped={false} /></mesh>
    <mesh position={[0, -0.6, 0]}><boxGeometry args={[0.1, 0.3, 0.1]} /><meshStandardMaterial color="#222" /></mesh></group>
);
const Interrog: React.FC<{pos?: V3; rot?: V3; s?: number; cor?: string}> = ({pos = [0, 0, 0], rot = [0, 0, 0], s = 1, cor = AMAR}) => (
  <group position={pos} rotation={rot} scale={s}>
    <mesh position={[0, 0.55, 0]} rotation={[0, 0, -Math.PI * 0.45]}><torusGeometry args={[0.45, 0.13, 16, 40, Math.PI * 1.45]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.3} /></mesh>
    <mesh position={[0, -0.15, 0]}><cylinderGeometry args={[0.13, 0.13, 0.4, 20]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.3} /></mesh>
    <mesh position={[0, -0.65, 0]}><sphereGeometry args={[0.15, 20, 16]} /><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.3} /></mesh>
  </group>
);
const Moeda: React.FC<{pos: V3; rot?: V3; s?: number}> = ({pos, rot = [0, 0, 0], s = 1}) => <mesh position={pos} rotation={rot} scale={s}><cylinderGeometry args={[0.3, 0.3, 0.06, 28]} /><meshStandardMaterial color="#ffc83a" metalness={0.9} roughness={0.25} /></mesh>;
const Nota: React.FC<{pos: V3; rot?: V3; s?: number}> = ({pos, rot = [0, 0, 0], s = 1}) => <group position={pos} rotation={rot} scale={s}><mesh><boxGeometry args={[0.9, 0.08, 0.42]} /><meshStandardMaterial color="#5ad86a" /></mesh><mesh position={[0, 0, 0]}><boxGeometry args={[0.12, 0.085, 0.43]} /><meshStandardMaterial color="#f4f0d8" /></mesh></group>;
const Raio: React.FC<{pos: V3; s?: number; rot?: number; cor?: string}> = ({pos, s = 1, rot = 0, cor = AMAR}) => {
  const g = useMemo(() => { const sh = new THREE.Shape(); sh.moveTo(0.1, 0.6); sh.lineTo(-0.25, -0.05); sh.lineTo(0, -0.05); sh.lineTo(-0.12, -0.6); sh.lineTo(0.28, 0.12); sh.lineTo(0.02, 0.12); sh.lineTo(0.2, 0.6); return new THREE.ExtrudeGeometry(sh, {depth: 0.12, bevelEnabled: false}); }, []);
  return <mesh geometry={g} position={pos} scale={s} rotation={[0, 0, rot]}><meshStandardMaterial color={cor} emissive={cor} emissiveIntensity={0.6} /></mesh>;
};
const Ilha = (() => { const sh = new THREE.Shape(); LAT(40).forEach((i) => { const a = i / 40 * Math.PI * 2; const r = 1 + 0.18 * Math.sin(a * 3 + 1) + 0.12 * Math.sin(a * 5) + (i % 7 === 0 ? 0.2 : 0); const x = Math.cos(a) * r * 1.5, y = Math.sin(a) * r; if (i) sh.lineTo(x, y); else sh.moveTo(x, y); }); return new THREE.ExtrudeGeometry(sh, {depth: 0.25, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05}); })();
const Confete: React.FC<{f: number; n?: number; sem: string; area?: number}> = ({f, n = 120, sem, area = 8}) => <>{LAT(n).map((i) => { const y = 5 - ((f * (0.03 + random(sem + 'v' + i) * 0.03) + random(sem + 'y' + i) * 10) % 10); return <mesh key={i} position={[(random(sem + 'x' + i) - 0.5) * area, y, (random(sem + 'z' + i) - 0.5) * 4]} rotation={[f * 0.1 + i, f * 0.07 + i * 2, 0]}><planeGeometry args={[0.12, 0.07]} /><meshBasicMaterial color={CORES[i % 6]} side={THREE.DoubleSide} toneMapped={false} /></mesh>; })}</>;
const Gramado: React.FC<{y?: number; tam?: number}> = ({y = 0, tam = 60}) => <>{LAT(12).map((i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -tam / 2 + (i + 0.5) * tam / 12]}><planeGeometry args={[tam, tam / 12]} /><meshStandardMaterial color={i % 2 ? '#2f9a3a' : '#38ad44'} roughness={1} /></mesh>)}</>;
const Bola: React.FC<{pos: V3; rot?: V3; s?: number}> = ({pos, rot = [0, 0, 0], s = 1}) => <group position={pos} rotation={rot} scale={s}><mesh><icosahedronGeometry args={[0.3, 1]} /><meshStandardMaterial color="#f8f8f8" flatShading /></mesh>{LAT(6).map((i) => { const p = new THREE.Vector3().setFromSphericalCoords(0.29, Math.acos(1 - 2 * (i + 0.5) / 6), i * 2.4); return <mesh key={i} position={p.toArray()} scale={0.09}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#14161c" /></mesh>; })}</group>;

// ---------- cartão de capítulo: apito de juiz girando sobre o gramado com confete ----------
const Cartao: React.FC<{k: number}> = ({k}) => { const d = useD(); return <C3>{(f) => { const o = interpolate(f, [0, 6, d - 8, d], [0, 1, 1, 0], cl); const s = interpolate(f, [0, 10], [0.2, 1], {...cl, easing: B}); return <>
  <Cam pos={[0, 2.2, 6]} alvo={[0, 0.6, 0]} /><Luzes sol={[2, 5, 4]} i={2} amb={0.6} /><color attach="background" args={[['#120a24', '#0a1a2a', '#2a0a1a', '#0a2a1a'][k % 4]]} />
  <group scale={o}><Gramado y={-0.6} /></group>
  <Apito pos={[0, 0.8 + Math.sin(f * 0.3) * 0.08, 0]} rot={[0.2, f * 0.12, Math.sin(f * 0.5) * 0.15]} s={s * 1.2} cor={['#d8dce4', '#ffd23a', '#d8dce4', '#ffb0d8'][k % 4]} />
  <Confete f={f + k * 50} sem={'cc' + k} area={10} />
  <Pos bloom={0.6} /></>; }}</C3>; };

// ---------- cap. 0 · gancho ----------
const G1: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[Math.sin(f * 0.01) * 4.6, 1.4, Math.cos(f * 0.01) * 4.6]} alvo={[0, 0.5, 0]} /><Luzes sol={[-3, 3, 4]} i={2.6} amb={0.25} /><Estrelas sem="l1" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  <Controle pos={[0, 1.75, 0]} rot={[0.2, f * 0.01, 0]} s={1.6} cor={ROXO} />
  <Tubo pts={[[0, 1.45, 0.25], [0, 1.25, 0.5], [0, 1.0, 0.2]]} r={0.04} cor="#14161c" brilho={1} />
  <Pos bloom={0.8} /></>}</C3>;
const G2: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = sw(f, 6, 20); return <>
  <Cam pos={[0, 0, 5]} /><ambientLight intensity={0.6} /><directionalLight position={[2, 3, 5]} intensity={1.6} /><color attach="background" args={['#ff8a3a']} />
  <group rotation={[0, Math.sin(f * 0.05) * 0.3, 0]}>{[-0.45, 0.45].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[0.55, 2, 0.4]} /><meshStandardMaterial color="#ffffff" /></mesh>)}</group>
  {[-1, 1].map((l) => <mesh key={l} position={[0, 0, 0.5]} rotation={[0, 0, l * Math.PI / 4]} scale={[k, 1, 1]}><boxGeometry args={[3.4, 0.35, 0.2]} /><meshStandardMaterial color={VERM} emissive={VERM} emissiveIntensity={0.3} /></mesh>)}
  <Confete f={f} n={40} sem="g2" />{void d}
  <Pos bloom={0.4} /></>; }}</C3>; };
const G3: React.FC = () => { const d = useD(); const pts = useMemo(() => LAT(900).map((i) => { const y = 1 - 2 * (i + 0.5) / 900; const r = Math.sqrt(1 - y * y); const a = i * 2.39996; return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r).multiplyScalar(1.012); }), []); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.8); return <>
  <Cam pos={[0, 0.6, 3.6]} /><Luzes sol={[4, 1, -3]} i={0.4} amb={0.05} /><Estrelas sem="l3" />
  <group rotation={[0.3, f * 0.004, 0]}><Terra tex={tex} rot={[0, 0, 0]} atm={false} nuvens={false} />
    {pts.map((p, i) => random('on' + i) < k ? <mesh key={i} position={p.toArray()}><sphereGeometry args={[0.009, 6, 6]} /><meshBasicMaterial color={new THREE.Color(CORES[i % 6]).multiplyScalar(2)} toneMapped={false} /></mesh> : null)}</group>
  <Pos bloom={1.3} /></>; }}</C3>; };
const G4: React.FC = () => <C3>{(f) => { const s = interpolate(f, [0, 10], [0.3, 1], {...cl, easing: B}); return <>
  <Cam pos={[0, 0.6, 7 - f * 0.02]} alvo={[0, 0.6, 0]} tremor={f < 12 ? 0.02 : 0} /><Luzes sol={[2, 5, 4]} i={1.6} amb={0.4} /><Ceu cima="#0a1a4a" baixo="#3a2a7a" />
  <group scale={s} position={[0, 0.8, 0]}><Placar a="0" b="1" /></group>
  <Gramado y={-1.6} /><Confete f={f} n={80} sem="g4" area={12} />
  <Pos bloom={0.8} /></>; }}</C3>;
const G5: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[0, lerp(2.5, 1.6, f / d), lerp(7, 5.5, f / d)]} alvo={[0, 0, 0]} /><Luzes sol={[-4, 2, 3]} i={1.4} amb={0.3} /><Ceu cima="#04081a" baixo="#1a2a4a" /><Estrelas sem="l5" />
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}><meshStandardMaterial color="#5a6a5a" roughness={1} /></mesh>
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} scale={[0.6, 0.6, 1]}><meshStandardMaterial color="#f0f4f8" roughness={1} /></mesh>
  <Chao cor="#0a2a4a" y={-0.08} tam={60} />
  {LAT(5).map((i) => <Tubo key={i} pts={LAT(8).map((j) => [-6 + j * 1.7, 3 + i * 0.25 + Math.sin(j * 0.8 + f * 0.03 + i) * 0.4, -8] as V3)} r={0.12} cor={i % 2 ? VERDE : '#5affd0'} o={0.35} brilho={1.3} />)}
  <Pos bloom={1.1} /></>}</C3>; };

// ---------- cap. 1 · hora zero ----------
const C1a: React.FC = () => <C3>{(f) => { const s = interpolate(f, [0, 12], [0, 1], {...cl, easing: B}); return <>
  <Cam pos={[Math.sin(f * 0.01) * 1.2, 0.3, 4.4]} /><Luzes sol={[2, 4, 5]} i={1.8} amb={0.5} /><color attach="background" args={[ROSA]} />
  <Calendario pos={[0, 0, 0]} rot={[0, -0.2 + (1 - s) * 2, 0]} s={s * 1.2} dia="19" mes="NOV" ano="2026" />
  <Confete f={f} n={60} sem="c1a" />
  <Pos bloom={0.4} /></>; }}</C3>;
const C1b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.4, 6]} /><Luzes sol={[2, 4, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#2a1a5a']} />
  {[0, 1, 2].map((i) => { const s = interpolate(f, [i * 18, i * 18 + 10], [0, 1], {...cl, easing: B}); return <group key={i} position={[(i - 1) * 2.1, 0, 0]}><Calendario s={0.85 * s} rot={[0, (i - 1) * -0.2, 0]} dia={['?', '?', '19'][i]} mes={['2025', '2026', 'NOV'][i]} ano="" cor={i < 2 ? '#666' : VERM} />
    {i < 2 && [-1, 1].map((l) => <mesh key={l} position={[0, 0, 0.3]} rotation={[0, 0, l * Math.PI / 4]} scale={[interpolate(f, [i * 18 + 10, i * 18 + 16], [0, 1], cl), 1, 1]}><boxGeometry args={[1.8, 0.18, 0.05]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh>)}</group>; })}
  <Pos bloom={0.5} /></>}</C3>;
const C1c: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.012) * 2, 1.6, 5.4]} alvo={[0, 0.9, 0]} /><ambientLight intensity={0.3} /><spotLight position={[-1.4, 5, 2]} angle={0.4} intensity={40} color="#ffffff" /><spotLight position={[1.4, 5, 2]} angle={0.4} intensity={40} color="#ffffff" /><color attach="background" args={['#0a0a18']} />
  {[-1, 1].map((l) => <group key={l} position={[l * 1.3, 0, 0]} rotation={[0, f * 0.01 * l, 0]}><mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.8, 0.9, 0.4, 40]} /><meshStandardMaterial color={l < 0 ? ROXO : VERDE} metalness={0.4} /></mesh><Console pos={[0, 0.4, 0]} tipo={l < 0 ? 0 : 1} luz={l < 0 ? CIANO : VERDE} s={0.85} /></group>)}
  <Chao cor="#14102a" />
  <Pos bloom={0.8} /></>}</C3>;
const C1d: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0.3, 5]} /><Luzes sol={[2, 4, 5]} i={1.8} amb={0.5} /><color attach="background" args={['#22c4d0']} />
  <Interrog rot={[0, f * 0.06, Math.sin(f * 0.1) * 0.1]} s={1.4 + Math.sin(f * 0.2) * 0.04} cor={AMAR} />
  {LAT(10).map((i) => { const a = i / 10 * Math.PI * 2 + f * 0.03; return <Moeda key={i} pos={[Math.cos(a) * 2.2, Math.sin(a * 2) * 0.4, Math.sin(a) * 1.2]} rot={[Math.PI / 2, f * 0.05 + i, 0]} />; })}
  <Pos bloom={0.5} /></>}</C3>;
const C1e: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.75, Easing.in(Easing.cubic)); return <>
  <Cam pos={[-1, lerp(1.5, 3.6, k), 8]} alvo={[1, lerp(1, 3.2, k), 0]} /><Luzes sol={[2, 6, 5]} i={1.8} amb={0.5} /><Ceu cima="#1a0a4a" baixo="#ff6aa4" />
  {LAT(7).map((i) => { const h = 0.3 + (i < 6 ? i * 0.25 : 0) + (i === 6 ? 6.5 * k : 0); return <mesh key={i} position={[-3 + i, h / 2, 0]}><boxGeometry args={[0.7, h, 0.7]} /><meshStandardMaterial color={i === 6 ? AMAR : '#8a90c8'} emissive={i === 6 ? AMAR : '#000'} emissiveIntensity={0.3} /></mesh>; })}
  <group position={[3, 0.3 + 6.5 * k + 0.45, 0]}><mesh><coneGeometry args={[0.4, 0.8, 24]} /><meshStandardMaterial color={VERM} /></mesh></group>
  {k > 0.05 && <Nuvem n={200} sem="c1e" origem={new THREE.Vector3(3, 0.3, 0)} t={f} raio={1.2} cor="#ffffff" tam={0.25} o={0.5} />}
  <Chao cor="#2a1a4a" />
  <Pos bloom={0.6} /></>; }}</C3>; };
const C1f: React.FC = () => <C3>{(f) => { const a = Math.min(Math.floor(f / 2), 8), b = Math.min(Math.floor(f / 2), 20); return <>
  <Cam pos={[0, 2.4, 6.5]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 6, 5]} i={1.8} amb={0.5} /><color attach="background" args={['#3a1a6a']} />
  {LAT(a).map((i) => <Moeda key={'a' + i} pos={[-1.4, 0.05 + i * 0.07, 0]} rot={[0, i, 0]} s={1.6} />)}
  {LAT(b).map((i) => <Moeda key={'b' + i} pos={[1.4, 0.05 + i * 0.07, 0]} rot={[0, i, 0]} s={1.6} />)}
  <mesh position={[-1.4, -0.05, 0]}><cylinderGeometry args={[0.7, 0.7, 0.1, 32]} /><meshStandardMaterial color="#8a90a8" /></mesh><mesh position={[1.4, -0.05, 0]}><cylinderGeometry args={[0.7, 0.7, 0.1, 32]} /><meshStandardMaterial color={ROSA} /></mesh>
  {b >= 20 && <Brilho pos={[1.4, 1.6, 0.3]} s={1.6} cor={AMAR} o={0.6} />}
  <Pos bloom={0.6} /></>; }}</C3>;
const C1g: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 3, 5]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#ffd8a0']} />
  <mesh position={[0, -0.05, 0]}><boxGeometry args={[8, 0.1, 5]} /><meshStandardMaterial color="#3aa8e8" /></mesh>
  {LAT(9).map((i) => <mesh key={i} position={[(random('cg' + i) - 0.5) * 6, 0.03, (random('ch' + i) - 0.5) * 3.4]} rotation={[-Math.PI / 2, 0, random('ci' + i) * 6]} scale={[1 + random('cj' + i) * 1.4, 0.6 + random('ck' + i), 1]}><circleGeometry args={[0.5, 7]} /><meshStandardMaterial color="#5ac86a" /></mesh>)}
  {LAT(6).map((i) => <CaixaConsole key={i} i={i} pos={[0.6 + (i % 3) * 0.12, 0.2 + Math.floor(i / 3) * 0.35, 0.2]} rot={[0, 0.3, 0]} s={0.5} />)}
  <Interrog pos={[2.4, 1.2 + Math.sin(f * 0.1) * 0.1, -0.5]} s={0.5} rot={[0, f * 0.05, 0]} cor={VERM} />
  <Pos bloom={0.4} /></>}</C3>;
const MULT = LAT(420).map((i) => [(random('mx' + i) - 0.5) * 30, (random('mz' + i)) * -30] as [number, number]);
const C1h: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(2, 7, k), 6]} alvo={[0, 0, -8]} /><Luzes sol={[-3, 6, 4]} i={1.6} amb={0.6} /><Ceu cima="#3a7ae8" baixo="#ffd0a0" />
  <Chao cor="#8ac85a" tam={200} />
  {MULT.map(([x, z], i) => <Silhueta key={i} pos={[x, 0, z]} s={0.5} cor={['#3a2a5a', '#5a2a4a', '#2a3a5a'][i % 3]} />)}
  <Pos bloom={0.3} /></>; }}</C3>; };
const C1i: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 4, 2.4, Math.cos(f * 0.01) * 4]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#a8e0ff']} />
  <Chao cor="#ffe0a0" />
  <CaixaConsole i={1} pos={[0, 0.4, 0]} s={1} />
  {LAT(32).map((i) => { const a = i / 32 * Math.PI * 2; const r = 1.6 + (i % 2) * 0.3; return <Silhueta key={i} pos={[Math.cos(a) * r, Math.abs(Math.sin(f * 0.3 + i)) * 0.08, Math.sin(a) * r]} s={0.55} cor={CORES[i % 6]} />; })}
  <Pos bloom={0.3} /></>}</C3>;
const C1j: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.8); return <>
  <Cam pos={[0, 1.6, 3.6]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.2} /><Estrelas sem="c1j" />
  <Terra tex={tex} rot={[0.1, f * 0.005, 0]} />
  {LAT(Math.floor(160 * k)).map((i) => { const a = i / 160 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 1.03, 0.02 * Math.sin(i), Math.sin(a) * 1.03]}><capsuleGeometry args={[0.008, 0.02, 4, 6]} /><meshBasicMaterial color={CORES[i % 6]} toneMapped={false} /></mesh>; })}
  <Pos bloom={0.8} /></>; }}</C3>; };
const C1k: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[-3, 3, 9]} alvo={[0, 2.5, 0]} /><Luzes sol={[-3, 8, 4]} i={1.8} amb={0.6} /><Ceu cima="#2a8ae8" baixo="#c8f0ff" />
  <Aviao pos={[-6 + f * 0.06, 6.5, -2]} s={2.4} cor="#e8eaf0" />
  {LAT(16).map((i) => { const t0 = i * 6; const t = Math.max(0, f - t0); if (f < t0) return null; const x = -6 + t0 * 0.06 - 0.5, y = 6.2 - t * 0.04; return <group key={i} position={[x, Math.max(0.3, y), -2 + (random('pk' + i) - 0.5) * 2]}>
    <mesh position={[0, 0.7, 0]}><sphereGeometry args={[0.45, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={CORES[i % 6]} side={THREE.DoubleSide} /></mesh><CaixaConsole i={i} pos={[0, 0, 0]} s={0.45} /></group>; })}
  {LAT(10).map((i) => <Casa key={i} i={i} pos={[-7 + i * 1.6, 0, 1.5]} s={1.6} luz={0} />)}
  <Chao cor="#6ab85a" tam={100} />{void d}
  <Pos bloom={0.3} /></>}</C3>; };
const C1l: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 6, 6 - f * 0.01]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 8, 4]} i={1.8} amb={0.6} /><color attach="background" args={['#9ad0ff']} />
  <Chao cor="#7ac06a" tam={100} />
  {LAT(5).map((r) => LAT(7).map((c) => { const i = r * 7 + c; const t0 = random('rt' + i) * 50; const t = Math.max(0, f - t0); const y = t < 14 ? lerp(8, 0.75, (t / 14) ** 2) : 0.75 + Math.abs(Math.sin((t - 14) * 0.4)) * 0.3 * Math.exp(-(t - 14) * 0.15);
    return <group key={i} position={[(c - 3) * 1.6, 0, (r - 2) * 1.6]}><Casa i={i} pos={[0, 0, 0]} s={1.3} luz={0} />{f >= t0 && <CaixaConsole i={i} pos={[0.1, y, 0]} rot={[-Math.PI / 2, 0, random('rr' + i) * 3]} s={0.4} />}</group>; }))}
  <Pos bloom={0.3} /></>}</C3>;
const C1m: React.FC = () => <C3>{(f) => { const pis = Math.floor(f / 8) % 2; return <>
  <Cam pos={[0.8, 1.4, 3.2]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.5} color="#ffe8c8" /><pointLight position={[-2, 3, 2]} intensity={6} color="#ffd8a0" /><color attach="background" args={['#5a3a2a']} />
  <group><mesh position={[0, 0.35, 0]}><boxGeometry args={[1.3, 0.5, 1]} /><meshStandardMaterial color="#8a2a3a" roughness={1} /></mesh><mesh position={[0, 0.95, -0.42]} scale={[1, 1, 0.3]}><sphereGeometry args={[0.7, 24, 16]} /><meshStandardMaterial color="#8a2a3a" roughness={1} /></mesh>
    {[-1, 1].map((l) => <mesh key={l} position={[l * 0.7, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.15, 0.15, 1, 16]} /><meshStandardMaterial color="#8a2a3a" roughness={1} /></mesh>)}
    <mesh position={[0, 0.61, 0.05]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.42, 24]} /><meshStandardMaterial color="#f8f4e8" /></mesh></group>
  <Controle pos={[0, 0.7, 0.05]} rot={[-1.3, 0, 0.2]} s={0.45} cor="#e8e8f0" />
  <group position={[0.15, 0.8, 0.2]} rotation={[0.3, 0.4, 0]}>{[-1, 1].map((l) => <mesh key={l} position={[l * 0.08, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.06, 0.008, 8, 20]} /><meshStandardMaterial color="#c8a040" metalness={0.8} /></mesh>)}</group>
  <group position={[0, 1.6, 0]} scale={1 + pis * 0.1}><mesh><torusGeometry args={[0.25, 0.05, 10, 30, Math.PI * 1.6]} /><meshBasicMaterial color={pis ? AMAR : '#ffffff'} toneMapped={false} /></mesh><mesh position={[0, 0.22, 0]}><boxGeometry args={[0.06, 0.25, 0.06]} /><meshBasicMaterial color={pis ? AMAR : '#ffffff'} toneMapped={false} /></mesh></group>
  <Interrog pos={[0.9, 1.5, -0.3]} s={0.35} rot={[0, Math.sin(f * 0.1) * 0.4, 0]} cor={CIANO} />
  <Pos bloom={0.7} /></>; }}</C3>;
const C1n: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[lerp(-3, 0, k), 0.6, 3.5]} alvo={[lerp(-1, 0.5, k), 0.2, 0]} /><Luzes sol={[2, 6, 4]} i={1.8} amb={0.6} /><Ceu cima="#1a3a8a" baixo="#ffb0d0" />
  <Gramado /><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><ringGeometry args={[1.8, 1.9, 64]} /><meshBasicMaterial color="#fff" /></mesh><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><planeGeometry args={[0.1, 30]} /><meshBasicMaterial color="#fff" /></mesh>
  <Bola pos={[lerp(-2, 1, k), 0.3, 0]} rot={[0, 0, -lerp(-2, 1, k) / 0.3]} />
  <Confete f={f} n={60} sem="c1n" area={8} />
  <Pos bloom={0.4} /></>; }}</C3>; };

// ---------- cap. 2 · hora um ----------
const C2a: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.012) * 4, 2, Math.cos(f * 0.012) * 4 + 1]} alvo={[0, 1, 0]} /><ambientLight intensity={0.3} /><spotLight position={[0, 6, 0]} angle={0.5} intensity={60} color="#fff8e0" /><color attach="background" args={['#0a0a14']} />
  <mesh position={[0, 0.2, 0]}><boxGeometry args={[4, 0.4, 4]} /><meshStandardMaterial color="#1a4ab8" /></mesh>
  {[0.7, 1.1, 1.5].map((y, j) => [[-2, -2], [2, -2], [2, 2], [-2, 2]].map(([x, z], i, a) => { const [x2, z2] = a[(i + 1) % 4]; return <Tubo key={j + '' + i} pts={[[x, y, z], [x2, y, z2]]} r={0.025} cor={[VERM, '#fff', VERM][j]} brilho={1} />; }))}
  {[[-2, -2], [2, -2], [2, 2], [-2, 2]].map(([x, z], i) => <mesh key={i} position={[x, 0.9, z]}><cylinderGeometry args={[0.06, 0.06, 1.4, 10]} /><meshStandardMaterial color="#ccc" metalness={0.7} /></mesh>)}
  <group position={[0, 1.3 + Math.abs(Math.sin(f * 0.15)) * 0.1, 0]} rotation={[0, Math.PI / 4 + Math.sin(f * 0.05) * 0.2, 0]}><Barra pos={[0, 0, 0]} larg={1.8} k={0.04} s={0.9} /></group>
  <Pos bloom={0.6} /></>}</C3>;
const C2b: React.FC = () => { const d = useD(); return <C3>{(f) => { const n = Math.floor(pr(f, 0, d * 0.85) * 63); return <>
  <Cam pos={[2.6, 2.2, 3.6]} alvo={[0, 0.6, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#14243a']} />
  <mesh position={[0, 0.65, 0]}><boxGeometry args={[1.7, 1.4, 1.7]} /><meshPhysicalMaterial color="#c8f0ff" transparent opacity={0.18} roughness={0.05} side={THREE.DoubleSide} /></mesh>
  {LAT(n).map((i) => <mesh key={i} position={[-0.6 + (i % 4) * 0.4, 0.17 + Math.floor(i / 16) * 0.36, -0.6 + (Math.floor(i / 4) % 4) * 0.4]}><boxGeometry args={[0.36, 0.32, 0.36]} /><meshStandardMaterial color={CORES[i % 6]} emissive={CORES[i % 6]} emissiveIntensity={0.3} /></mesh>)}
  <Pos bloom={0.6} /></>; }}</C3>; };
const C2c: React.FC = () => { const d = useD(); return <C3>{(f) => { const n = Math.floor(lerp(1, 600, pr(f, 0, d * 0.9, Easing.in(Easing.cubic)))); return <>
  <Cam pos={[0, 0, lerp(4, 14, pr(f, 0, d))]} /><Luzes sol={[2, 6, 5]} i={1.4} amb={0.5} /><color attach="background" args={['#0a0a20']} />
  {LAT(n).map((i) => { const p = new THREE.Vector3().setFromSphericalCoords(Math.cbrt(i / 600) * 6, Math.acos(1 - 2 * random('dp' + i)), random('dt' + i) * 6.28); return <mesh key={i} position={p.toArray()} rotation={[i, f * 0.02, 0]}><boxGeometry args={[0.3, 0.3, 0.3]} /><meshStandardMaterial color={CORES[i % 6]} emissive={CORES[i % 6]} emissiveIntensity={0.4} /></mesh>; })}
  <Pos bloom={0.8} /></>; }}</C3>; };
const C2d: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[6, lerp(1.5, 18, k), 14]} alvo={[0, lerp(2, 20, k), 0]} /><Luzes sol={[-3, 10, 4]} i={1.6} amb={0.5} /><Ceu cima="#1a3a8a" baixo="#a8d8ff" />
  <Chao cor="#5aa85a" tam={200} />
  {LAT(30).map((i) => <mesh key={i} position={[0, 0.6 + i * 1.2, 0]} scale={interpolate(k * 30, [i - 1, i], [0, 1], cl)}><boxGeometry args={[2.4 - i * 0.03, 1.2, 2.4 - i * 0.03]} /><meshStandardMaterial color={CORES[i % 6]} emissive={CORES[i % 6]} emissiveIntensity={0.2} /></mesh>)}
  <Nuvem n={160} sem="c2d" origem={new THREE.Vector3(0, 14, -4)} t={20} raio={10} cor="#ffffff" tam={2.2} o={0.45} />
  {LAT(6).map((i) => <Casa key={i} i={i} pos={[3 + i * 0.8, 0, 2 - i * 0.5]} s={1} luz={0} />)}
  <Pos bloom={0.4} /></>; }}</C3>; };
const C2e: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 8, d * 0.8); return <>
  <Cam pos={[3, 2.4, 4.5]} alvo={[0, 0, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#2a0a3a']} />
  {k < 0.02 ? <mesh rotation={[0, f * 0.05, 0]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color={ROSA} emissive={ROSA} emissiveIntensity={0.3} /></mesh>
    : LAT(512).map((i) => { const x = (i % 8) - 3.5, y = (Math.floor(i / 8) % 8) - 3.5, z = Math.floor(i / 64) - 3.5; return <mesh key={i} position={[x * lerp(0.25, 0.42, k), y * lerp(0.25, 0.42, k), z * lerp(0.25, 0.42, k)]}><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color={CORES[i % 6]} emissive={CORES[i % 6]} emissiveIntensity={0.4} /></mesh>; })}
  <Pos bloom={0.7} /></>; }}</C3>; };
const C2f: React.FC = () => <C3>{(f) => <>
  <Cam pos={[2, 1, 5]} alvo={[0, 0, -2]} /><Luzes sol={[2, 6, 5]} i={1.4} amb={0.4} /><color attach="background" args={['#04142a']} />
  <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -6]}><cylinderGeometry args={[0.8, 0.8, 24, 40, 1, true]} /><meshPhysicalMaterial color="#8ad0ff" transparent opacity={0.2} side={THREE.DoubleSide} /></mesh>
  {LAT(90).map((i) => { const z = 6 - ((f * 0.25 + i * 0.27) % 24); return <mesh key={i} position={[Math.sin(i * 1.7) * 0.45, Math.cos(i * 2.3) * 0.45, z]}><boxGeometry args={[0.18, 0.18, 0.18]} /><meshBasicMaterial color={new THREE.Color(CORES[i % 6]).multiplyScalar(1.6)} toneMapped={false} /></mesh>; })}
  <Pos bloom={1} /></>}</C3>;
const C2g: React.FC = () => { const d = useD(); return <C3>{(f) => { const n = Math.floor(pr(f, 6, d * 0.9) * 26); return <>
  <Cam pos={[0, 0.4, 5]} alvo={[0, 0.4, 0]} /><Luzes sol={[2, 4, 5]} i={1.8} amb={0.5} /><color attach="background" args={[LARANJA]} />
  <Calendario dia={String(Math.min(26, n + 1))} mes="DIA" ano="" s={1.3} cor={ROXO} />
  {LAT(n).map((i) => { const t = (f - (6 + i * (d * 0.84 - 6) / 26)) / 20; return <Folha key={i} pos={[t * 3 + Math.sin(i) * t, t * 2 - t * t * 2.5, 0.2 + t]} rot={[t * 3, t * 4 + i, t * 2]} s={1.3} />; })}
  <Pos bloom={0.3} /></>; }}</C3>; };
const C2h: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={[0, 1.6, 6]} alvo={[0, 1, 0]} /><Luzes sol={[2, 4, 5]} i={1.8} amb={0.5} /><color attach="background" args={['#1a8a8a']} />
  {[[-1.4, 26, ROSA], [1.4, 19, CIANO]].map(([x, n, c], j) => <group key={j} position={[x as number, 0, 0]}>{LAT(Math.floor((n as number) * k)).map((i) => <mesh key={i} position={[0, 0.05 + i * 0.09, 0]} rotation={[0, (random('fh' + i + j) - 0.5) * 0.2, 0]}><boxGeometry args={[1.4, 0.07, 1]} /><meshStandardMaterial color={i % 2 ? '#fbfbf6' : c as string} /></mesh>)}</group>)}
  <Chao cor="#0f5a5a" />
  <Pos bloom={0.3} /></>; }}</C3>; };
const C2i: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 0.6, 5.5]} alvo={[0, 0.3, 0]} /><Luzes sol={[2, 4, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#3a1a5a']} />
  <group position={[-1.3, 0.4, 0]}>
    {[-1, 1].map((l) => <mesh key={l} position={[0, l * 0.75, 0]} rotation={[l < 0 ? 0 : Math.PI, 0, 0]}><coneGeometry args={[0.6, 1.3, 32, 1, true]} /><meshPhysicalMaterial color="#c8f0ff" transparent opacity={0.25} side={THREE.DoubleSide} /></mesh>)}
    <mesh position={[0, 0.75 - 0.45 * k - 0.2, 0]} scale={[1 - k, 1 - k, 1 - k]}><coneGeometry args={[0.45, 0.8, 32]} /><meshStandardMaterial color={AMAR} /></mesh>
    <mesh position={[0, -1.3 + 0.35 * k, 0]} scale={[k, k, k]}><coneGeometry args={[0.5, 0.7, 32]} /><meshStandardMaterial color={AMAR} /></mesh>
    {[-1.5, 1.5].map((y) => <mesh key={y} position={[0, y, 0]}><cylinderGeometry args={[0.75, 0.75, 0.12, 32]} /><meshStandardMaterial color="#8a5a3a" /></mesh>)}</group>
  <Barra pos={[1.4, 0.4, 0]} larg={2} k={0.038 * k} s={0.9} />
  <Pos bloom={0.5} /></>; }}</C3>; };
const C2j: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 1.5, 1.4, 3.6]} alvo={[0, 1.1, 0]} /><ambientLight intensity={0.25} /><spotLight position={[0, 5, 1]} angle={0.35} intensity={50} color="#fff4e0" /><color attach="background" args={['#120a08']} />
  <mesh position={[0, 0.5, 0]}><boxGeometry args={[0.9, 1, 0.9]} /><meshStandardMaterial color="#e8e0d0" /></mesh>
  <mesh position={[0, 1.4, 0]}><boxGeometry args={[0.85, 0.8, 0.85]} /><meshPhysicalMaterial color="#e0f4ff" transparent opacity={0.15} roughness={0} /></mesh>
  <Controle pos={[0, 1.2, 0]} rot={[0.3, f * 0.01, 0]} s={0.5} cor={ROXO} />
  {[-1.4, 1.4].map((x) => <group key={x} position={[x, 0, 0.8]}><mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.04, 0.06, 1, 10]} /><meshStandardMaterial color="#c8a040" metalness={0.9} /></mesh><mesh position={[0, 1, 0]}><sphereGeometry args={[0.07, 12, 10]} /><meshStandardMaterial color="#c8a040" metalness={0.9} /></mesh></group>)}
  <Tubo pts={[[-1.4, 0.95, 0.8], [0, 0.7, 0.9], [1.4, 0.95, 0.8]]} r={0.035} cor="#a01a2a" brilho={0.8} />
  <Chao cor="#2a1a14" />
  <Pos bloom={0.4} /></>}</C3>;
const C2k: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(6, 4, k), lerp(14, 10, k)]} alvo={[0, 2, -4]} /><ambientLight intensity={0.4} /><pointLight position={[0, 6, -6]} intensity={30} color={CIANO} distance={30} /><color attach="background" args={['#06061a']} /><Estrelas sem="c2k" />
  {LAT(6).map((r) => <mesh key={r} position={[0, 0.3 + r * 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[6 + r * 1.1, 7 + r * 1.1, 64, 1, Math.PI * 0.1, Math.PI * 0.8]} /><meshStandardMaterial color={['#3a2a6a', '#4a2a5a'][r % 2]} side={THREE.DoubleSide} /></mesh>)}
  {LAT(300).map((i) => { const a = Math.PI * (0.12 + random('sa' + i) * 0.76), r = 6.5 + Math.floor(random('sr' + i) * 6) * 1.1; const ri = Math.round((r - 6.5) / 1.1); return <mesh key={i} position={[Math.cos(a) * r, 0.42 + ri * 0.6, -Math.sin(a) * r]}><sphereGeometry args={[0.13, 6, 6]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh>; })}
  <Gramado y={0} tam={11} />
  <group position={[0, 4.2, -4]}><mesh><boxGeometry args={[6, 2.2, 0.2]} /><meshStandardMaterial color="#0a0a10" /></mesh><Barra pos={[0, 0, 0.15]} larg={5} k={0.038} s={0.9} /></group>
  <Pos bloom={0.8} /></>; }}</C3>; };
const Roteador: React.FC<{pos: V3; f: number; i: number; s?: number}> = ({pos, f, i, s = 1}) => <group position={pos} scale={s}>
  <mesh><boxGeometry args={[0.8, 0.16, 0.5]} /><meshStandardMaterial color="#f4f4f8" /></mesh>
  {[-0.3, 0.3].map((x) => <mesh key={x} position={[x, 0.3, -0.2]} rotation={[0, 0, x * 0.6]}><cylinderGeometry args={[0.025, 0.03, 0.55, 8]} /><meshStandardMaterial color="#222" /></mesh>)}
  {LAT(5).map((j) => <mesh key={j} position={[-0.25 + j * 0.12, 0, 0.255]}><circleGeometry args={[0.025, 10]} /><meshBasicMaterial color={(Math.floor(f / 3) + j + i) % 3 ? new THREE.Color(CORES[(j + i) % 6]).multiplyScalar(2) : '#111'} toneMapped={false} /></mesh>)}</group>;
const C2l: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 2.2, 6]} alvo={[0, 1.8, 0]} /><ambientLight intensity={0.35} /><pointLight position={[2, 3, 3]} intensity={4} color={ROSA} /><color attach="background" args={['#0a0a1a']} />
  {LAT(7).map((r) => LAT(r + 1).map((c) => <Roteador key={r + '-' + c} pos={[(c - r / 2) * 0.75, 3.6 - r * 0.5, 0]} f={f} i={r * 7 + c} s={0.7} />))}
  <mesh position={[0, 4.1, 0]} rotation={[0, f * 0.05, 0]}><octahedronGeometry args={[0.25]} /><meshBasicMaterial color={AMAR} toneMapped={false} /></mesh>
  <mesh position={[0, -0.2, 0]}><boxGeometry args={[0.5, 0.6, 0.5]} /><meshStandardMaterial color="#8a5a3a" /></mesh>
  <Pos bloom={1.1} /></>}</C3>;
const C2m: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 7]} /><Luzes sol={[2, 4, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#5ad8a0']} />
  {LAT(9).map((i) => { const x = (i % 3 - 1) * 2.6, y = (Math.floor(i / 3) - 1) * 1.7; const t0 = i * 7; const s = interpolate(f - t0, [0, 8], [0, 1], {...cl, easing: B}); return <group key={i} position={[x, y + Math.sin(f * 0.06 + i) * 0.08, 0]} rotation={[0, Math.sin(f * 0.03 + i) * 0.3, 0]}>
    <mesh><boxGeometry args={[0.75, 1.4, 0.08]} /><meshStandardMaterial color="#1a1c24" /></mesh><mesh position={[0, 0, 0.045]}><planeGeometry args={[0.66, 1.25]} /><meshBasicMaterial color="#e8f4ff" /></mesh>
    <group position={[0.1, 0.1, 0.1]} scale={s}><mesh><boxGeometry args={[0.5, 0.35, 0.05]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh><Interrog pos={[0, 0, 0.06]} s={0.12} cor="#ffffff" /></group></group>; })}
  <Pos bloom={0.4} /></>}</C3>;

// ---------- cap. 3 · hora três ----------
const C3a: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={[0, 7, 6]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 8, 4]} i={1.6} amb={0.6} /><color attach="background" args={['#ffe8c8']} />
  <Chao cor="#f0d8a8" tam={60} />
  {LAT(5).map((i) => <mesh key={'h' + i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, (i - 2) * 2]}><planeGeometry args={[30, 0.5]} /><meshStandardMaterial color="#3a3644" /></mesh>)}
  {LAT(5).map((i) => <mesh key={'v' + i} rotation={[-Math.PI / 2, 0, 0]} position={[(i - 2) * 2.6, 0.012, 0]}><planeGeometry args={[0.5, 30]} /><meshStandardMaterial color="#3a3644" /></mesh>)}
  {LAT(40).map((i) => { const h = i % 2 === 0; const lane = (i % 5) - 2; const v = (1 - k) * 0.08; const p = ((random('tp' + i) * 14 + f * v * (random('tv' + i) + 0.5)) % 14) - 7; return <group key={i} position={h ? [p, 0.12, lane * 2] : [lane * 2.6, 0.12, p]} rotation={[0, h ? 0 : Math.PI / 2, 0]}><mesh><boxGeometry args={[0.35, 0.18, 0.2]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh></group>; })}
  {LAT(12).map((i) => <mesh key={'b' + i} position={[((i % 4) - 1.5) * 2.6, 0.4, (Math.floor(i / 4) - 1) * 2]}><boxGeometry args={[1.6, 0.8, 1.2]} /><meshStandardMaterial color={['#ffb0c8', '#a8e0ff', '#ffe0a0'][i % 3]} /></mesh>)}
  <Pos bloom={0.3} /></>; }}</C3>; };
const C3b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[lerp(-4, 4, f / 160), 9, 6]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 8, 4]} i={1.6} amb={0.6} /><color attach="background" args={['#c8e8ff']} />
  <Chao cor="#8a8e96" tam={80} />
  {LAT(4).map((r) => LAT(9).map((c) => <Caminhao key={r + '-' + c} pos={[(c - 4) * 1.4, 0, (r - 1.5) * 3]} rot={Math.PI / 2} cor={CORES[(r * 9 + c) % 6]} s={0.6} />))}
  {LAT(4).map((r) => LAT(10).map((c) => <mesh key={'l' + r + c} rotation={[-Math.PI / 2, 0, 0]} position={[(c - 4.5) * 1.4, 0.01, (r - 1.5) * 3]}><planeGeometry args={[0.05, 2.2]} /><meshBasicMaterial color="#fff" /></mesh>))}
  <Pos bloom={0.3} /></>}</C3>;
const C3c: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.9, 1.5, 1.6]} alvo={[-0.2, 1.1, -0.5]} /><ambientLight intensity={0.6} /><directionalLight position={[3, 4, 2]} intensity={1.6} /><Ceu cima="#5aa8ff" baixo="#ffe0b0" />
  <mesh position={[0, 0.5, 0]}><boxGeometry args={[2.2, 1, 1.6]} /><meshStandardMaterial color="#3a3e4a" /></mesh>
  <mesh position={[-0.4, 1.4, -0.7]} rotation={[-0.5, 0, 0]}><torusGeometry args={[0.32, 0.04, 12, 40]} /><meshStandardMaterial color="#1a1a20" /></mesh>
  <mesh position={[-0.4, 1.1, 0.1]}><boxGeometry args={[0.6, 0.15, 0.6]} /><meshStandardMaterial color={LARANJA} /></mesh><mesh position={[-0.4, 1.45, 0.38]}><boxGeometry args={[0.6, 0.6, 0.12]} /><meshStandardMaterial color={LARANJA} /></mesh>
  <group position={[0.1, 1.2, -0.6]} rotation={[0, 0, Math.sin(f * 0.12) * 0.5]}><mesh position={[0, -0.12, 0]}><boxGeometry args={[0.02, 0.24, 0.02]} /><meshStandardMaterial color="#aaa" metalness={0.9} /></mesh><mesh position={[0, -0.28, 0]}><boxGeometry args={[0.07, 0.1, 0.02]} /><meshStandardMaterial color={AMAR} /></mesh></group>
  <mesh position={[0, 1.8, -0.9]}><planeGeometry args={[2, 0.8]} /><meshPhysicalMaterial color="#a8d8ff" transparent opacity={0.3} /></mesh>
  <Pos bloom={0.3} /></>}</C3>;
const C3d: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 10, 9, Math.cos(f * 0.01) * 10]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 8, 4]} i={1.6} amb={0.6} /><Ceu cima="#ff7aa8" baixo="#ffd08a" />
  <Chao cor="#e8c890" tam={100} />
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}><ringGeometry args={[3, 3.8, 64]} /><meshStandardMaterial color="#4a4654" /></mesh>
  {[0, Math.PI / 2].map((r) => <mesh key={r} rotation={[-Math.PI / 2, 0, r]} position={[0, 0.06, 0]}><planeGeometry args={[0.9, 40]} /><meshStandardMaterial color="#4a4654" /></mesh>)}
  {LAT(10).map((i) => <Palma key={i} pos={[Math.cos(i * 0.63) * 5, 0, Math.sin(i * 0.63) * 5]} f={f + i * 7} s={1.3} cor={i % 2 ? '#1fb86a' : ROSA} />)}
  <Carro pos={[0.2, 0.05, 6]} rot={Math.PI / 2} cor={CIANO} />
  <Pos bloom={0.4} /></>}</C3>;
const C3e: React.FC = () => <C3>{(f) => { const pao = f > 56; return <>
  <Cam pos={[3.2, 1.6, 4.2]} alvo={[0, 0.8, 0]} /><Luzes sol={[-2, 6, 4]} i={1.6} amb={0.6} /><Ceu cima="#5ab0ff" baixo="#e8f8ff" />
  <Chao cor="#9a9ea8" />
  <Caminhao pos={[0, 0, 0]} cor={pao ? LARANJA : '#3a8ae8'} s={1.2} />
  {!pao ? LAT(6).map((i) => <mesh key={i} position={[-1.5 + i * 0.5, 0.95, 0.66]}><circleGeometry args={[0.16, 20]} /><meshStandardMaterial color="#1a1a20" /></mesh>)
    : LAT(5).map((i) => <mesh key={i} position={[-1.5 + i * 0.6, 0.95, 0.62]} scale={[1, 0.6, 0.6]}><capsuleGeometry args={[0.14, 0.2, 6, 12]} /><meshStandardMaterial color="#d8963a" /></mesh>)}
  {LAT(4).map((i) => <group key={'g' + i} position={[1.8 + (i % 2) * 0.3, 0, 1.2 + Math.floor(i / 2) * 0.3]}>{pao ? <mesh position={[0, 0.08, 0]} scale={[1, 0.6, 0.6]}><capsuleGeometry args={[0.1, 0.18, 6, 12]} /><meshStandardMaterial color="#d8963a" /></mesh>
    : <><mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.08, 0.09, 0.3, 16]} /><meshStandardMaterial color="#ffffff" /></mesh><mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.04, 0.07, 0.08, 16]} /><meshStandardMaterial color="#3a8ae8" /></mesh></>}</group>)}
  <mesh position={[0, 2.3 + Math.sin(f * 0.2) * 0.05, 0]}><sphereGeometry args={[0.25, 16, 12]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh>
  <Pos bloom={0.4} /></>; }}</C3>;
const Prateleira: React.FC<{pos: V3; rot?: number; k: number; sem: string}> = ({pos, rot = 0, k, sem}) => <group position={pos} rotation={[0, rot, 0]}>
  <mesh position={[0, 1, 0]}><boxGeometry args={[0.6, 2, 6]} /><meshStandardMaterial color="#e8ecf2" /></mesh>
  {LAT(4).map((r) => LAT(12).map((c) => { const i = r * 12 + c; return random(sem + i) > k ? <mesh key={i} position={[0.35, 0.25 + r * 0.5, -2.7 + c * 0.48]}><boxGeometry args={[0.15, 0.32, 0.36]} /><meshStandardMaterial color={CORES[Math.floor(random(sem + 'c' + i) * 6)]} /></mesh> : null; }))}
</group>;
const C3f: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[0, 1.5, 4.5 - f * 0.012]} alvo={[0, 1.1, -6]} /><ambientLight intensity={0.8} />{LAT(4).map((i) => <pointLight key={i} position={[0, 3, 2 - i * 3]} intensity={3} distance={6} />)}<color attach="background" args={['#f0f4f8']} />
  <Chao cor="#e8e0d0" />
  <Prateleira pos={[-1.4, 0, -2]} k={k} sem="pa" /><Prateleira pos={[1.4, 0, -2]} rot={Math.PI} k={k} sem="pb" />
  {[[-0.3, 0.6, 0.3], [0.5, -1.4, -0.6]].map(([x, z, r], i) => <group key={i} position={[x, 0, z]} rotation={[0, r, 0]}><mesh position={[0, 0.55, 0]}><boxGeometry args={[0.5, 0.35, 0.8]} /><meshStandardMaterial color="#c8ccd4" wireframe /></mesh>{[-0.3, 0.3].map((zz) => <mesh key={zz} position={[0, 0.06, zz]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="#222" /></mesh>)}</group>)}
  <Pos bloom={0.2} /></>; }}</C3>; };
const C3g: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.85); return <>
  <Cam pos={[0, 3.4, 1.6]} alvo={[0, 0, 0]} /><ambientLight intensity={0.6} /><pointLight position={[0, 2, 0]} intensity={4} color="#c8f0ff" /><color attach="background" args={['#a8d8ff']} />
  <mesh position={[0, -0.4, 0]}><boxGeometry args={[3, 0.8, 1.6]} /><meshStandardMaterial color="#e8f0f8" /></mesh>
  <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[2.8, 1.4]} /><meshStandardMaterial color="#cfe8ff" /></mesh>
  {LAT(3).map((r) => LAT(6).map((c) => { const i = r * 6 + c; const sai = random('pz' + i) * 0.9; const e = interpolate(k, [sai, sai + 0.05], [1, 0], cl); return e > 0 ? <group key={i} position={[-1.15 + c * 0.46, 0.04 + (1 - e) * 1.5, -0.45 + r * 0.45]} rotation={[0, (1 - e) * 3, 0]}><mesh><boxGeometry args={[0.4, 0.06, 0.4]} /><meshStandardMaterial color={VERM} /></mesh><mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.14, 20]} /><meshStandardMaterial color={AMAR} /></mesh></group> : null; }))}
  <Pos bloom={0.3} /></>; }}</C3>; };
const Garrafa: React.FC<{pos: V3; cor: string; s?: number; rot?: V3}> = ({pos, cor, s = 1, rot = [0, 0, 0]}) => <group position={pos} scale={s} rotation={rot}><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.12, 0.12, 0.5, 16]} /><meshPhysicalMaterial color={cor} roughness={0.1} transparent opacity={0.85} /></mesh><mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.04, 0.11, 0.18, 16]} /><meshPhysicalMaterial color={cor} roughness={0.1} transparent opacity={0.85} /></mesh><mesh position={[0, 0.73, 0]}><cylinderGeometry args={[0.045, 0.045, 0.05, 12]} /><meshStandardMaterial color={VERM} /></mesh><mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.125, 0.125, 0.15, 16]} /><meshStandardMaterial color="#ffffff" /></mesh></group>;
const C3h: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[0, 1.6, 4.6]} alvo={[0, 1.1, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#ff6a8a']} />
  {LAT(6).map((r) => LAT(6 - r).map((c) => { const i = r * 6 + c; const sai = 1 - (r + 1) / 7 + random('gz' + i) * 0.1; const t = Math.max(0, (k - sai) * 8); return <Garrafa key={i} pos={[(c - (5 - r) / 2) * 0.32, r * 0.8 + t * 2, -t * 2]} rot={[t * 2, 0, t]} cor={[ '#5a2a1a', '#2a8a3a', '#e8c040'][i % 3]} s={0.55 * (1 - Math.min(1, t * 0.3))} />; }))}
  <Chao cor="#c84a6a" />
  <Pos bloom={0.3} /></>; }}</C3>; };
const C3i: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 3 + 1, 1.2, 3.2]} alvo={[0, 0.6, 0]} /><Luzes sol={[-2, 6, 4]} i={1.6} amb={0.6} /><Ceu cima="#3a8ae8" baixo="#ffd8b0" />
  <Chao cor="#8a8e96" />
  <group rotation={[0, 0, 0.18]} position={[0, 0.05, 0]}>
    {[-0.7, 0.7].map((x) => <mesh key={x} position={[x, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.28, 0.08, 12, 30]} /><meshStandardMaterial color="#14161c" /></mesh>)}
    <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0.1]}><boxGeometry args={[1.3, 0.22, 0.3]} /><meshStandardMaterial color={VERM} /></mesh>
    <mesh position={[0.6, 0.95, 0]} rotation={[0, 0, -0.4]}><boxGeometry args={[0.06, 0.6, 0.06]} /><meshStandardMaterial color="#555" /></mesh><mesh position={[0.72, 1.22, 0]}><boxGeometry args={[0.05, 0.05, 0.6]} /><meshStandardMaterial color="#222" /></mesh>
    <mesh position={[-0.5, 1, 0]}><boxGeometry args={[0.6, 0.55, 0.55]} /><meshStandardMaterial color={LARANJA} /></mesh></group>
  {LAT(3).map((i) => { const a = f * 0.2 + i * 2; return <mesh key={i} position={[-0.5 + Math.cos(a) * 0.5, 1.5 + Math.sin(a * 1.3) * 0.2, Math.sin(a) * 0.4]}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#111" /></mesh>; })}
  <Pos bloom={0.3} /></>}</C3>;
const C3j: React.FC = () => <C3>{(f) => <>
  <Cam pos={[1.2, 1, 2.6]} alvo={[0, 0.5, 0]} /><ambientLight intensity={0.25} /><pointLight position={[0, 2.2, 0.8]} intensity={4} color="#ffd8a0" distance={5} /><color attach="background" args={['#0a0a1e']} /><Estrelas sem="c3j" />
  <mesh position={[0, 1.2, -0.3]}><boxGeometry args={[1, 2.2, 0.1]} /><meshStandardMaterial color="#6a3a2a" /></mesh><mesh position={[0.35, 1.2, -0.2]}><sphereGeometry args={[0.04, 10, 8]} /><meshStandardMaterial color="#c8a040" metalness={0.9} /></mesh>
  <mesh position={[0, 0.02, 0.4]}><boxGeometry args={[1.4, 0.04, 0.9]} /><meshStandardMaterial color="#8a2a3a" /></mesh>
  <mesh position={[0.1, 0.22, 0.4]}><boxGeometry args={[0.5, 0.36, 0.4]} /><meshStandardMaterial color="#c89a6a" /></mesh>
  {LAT(3).map((i) => <mesh key={i} position={[0.5 + i * 0.18, 0.7 + i * 0.22 + Math.sin(f * 0.08 + i) * 0.04, 0.4]} scale={0.6 + i * 0.25}><torusGeometry args={[0.08, 0.02, 6, 4]} /><meshBasicMaterial color="#c8d8ff" toneMapped={false} /></mesh>)}
  <Pos bloom={0.6} /></>}</C3>;

// ---------- cap. 4 · hora seis ----------
const C4a: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.9); return <>
  <Cam pos={[2.4, 1.8, 4]} alvo={[0, 0.2, 0.8]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#3a2a8a']} />
  <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.35, 0.35, 1.8, 32]} /><meshStandardMaterial color="#fbfbf6" /></mesh>
  <mesh position={[0, 1.2 - 0.35 - 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.7, 0.01]} /><meshStandardMaterial color="#fbfbf6" /></mesh>
  <mesh position={[0, 0.85 - k * 0.42, k * 1.2]} rotation={[-Math.PI / 2 + 0.6 * (1 - k), 0, 0]}><planeGeometry args={[1.7, 0.2 + k * 3]} /><meshStandardMaterial color="#fbfbf6" side={THREE.DoubleSide} /></mesh>
  {LAT(Math.floor(k * 14)).map((i) => <mesh key={i} position={[(i % 2 ? 0.3 : -0.3), 0.02 + 0.001 * i, 2.6 - i * 0.2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.7, 0.05]} /><meshBasicMaterial color={i === 13 ? VERM : '#555'} /></mesh>)}
  <Raio pos={[-1.6, 1.4 + Math.sin(f * 0.1) * 0.1, 0]} s={1} rot={0.2} />
  <Chao cor="#2a1a6a" />
  <Pos bloom={0.5} /></>; }}</C3>; };
const C4b: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d * 0.7, B); return <>
  <Cam pos={[2.5, 1.8, 4]} alvo={[0, 0.9, 0]} /><ambientLight intensity={0.4} /><pointLight position={[-2, 3, 2]} intensity={6} color={CIANO} /><pointLight position={[2, 2, 2]} intensity={4} color={ROSA} /><color attach="background" args={['#0a0a18']} />
  <Console pos={[-0.6, 0, 0]} tipo={0} s={0.9} />
  <group position={[1.1, 0.5, 0.2]}><mesh><boxGeometry args={[0.6, 0.9, 0.3]} /><meshStandardMaterial color="#e8e8f0" /></mesh><mesh position={[0, 0.15, 0.16]}><planeGeometry args={[0.45, 0.3]} /><meshBasicMaterial color="#0a1a10" /></mesh>
    <mesh position={[-0.2 + 0.2 * k, 0.15, 0.17]}><planeGeometry args={[0.4 * k, 0.2]} /><meshBasicMaterial color={new THREE.Color(VERDE).multiplyScalar(1.8)} toneMapped={false} /></mesh><Raio pos={[-0.06, -0.2, 0.15]} s={0.25} /></group>
  <Tubo pts={[[-0.4, 0.3, 0], [0.3, 0.1, 0.4], [0.8, 0.3, 0.2]]} r={0.025} cor="#14161c" brilho={1} />
  <Chao cor="#14142a" />
  <Pos bloom={0.8} /></>; }}</C3>; };
const C4c: React.FC = () => { const d = useD(); return <C3>{(f) => { const n = Math.floor(lerp(1, 160, pr(f, 0, d * 0.9, Easing.in(Easing.quad)))); return <>
  <Cam pos={[0, 0, lerp(3, 12, pr(f, 0, d))]} /><Luzes sol={[2, 4, 5]} i={1.4} amb={0.5} /><color attach="background" args={['#1a0a3a']} />
  {LAT(n).map((i) => <Raio key={i} pos={i === 0 ? [0, 0, 0] : [(random('rx' + i) - 0.5) * 16, (random('ry' + i) - 0.5) * 9, (random('rz' + i) - 0.5) * 6]} s={i === 0 ? 1.4 : 0.5} rot={random('rr' + i) - 0.5} cor={CORES[i % 6]} />)}
  <Pos bloom={0.9} /></>; }}</C3>; };
const C4d: React.FC = () => { const d = useD(); return <C3>{(f, tex) => { const k = pr(f, 0, d * 0.5, Easing.out(Easing.cubic)); return <>
  <Cam pos={[1.5, 0.8, 5]} alvo={[0.6, 0, 0]} /><Luzes sol={[-3, 3, 4]} i={2.4} amb={0.25} /><Estrelas sem="c4d" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  <group position={[lerp(4, 1.65, k), 0, 0]} rotation={[0, 0, Math.PI / 2]}>
    <mesh><boxGeometry args={[0.7, 0.9, 0.7]} /><meshStandardMaterial color="#f4f4f8" /></mesh>
    {[-0.15, 0.15].map((z) => <mesh key={z} position={[0, 0.6, z]}><boxGeometry args={[0.08, 0.35, 0.04]} /><meshStandardMaterial color="#c8ccd4" metalness={0.9} /></mesh>)}</group>
  <Tubo pts={[[lerp(4, 1.65, k) + 0.4, 0, 0], [3.5, -0.6, 0], [6, -1, 0]]} r={0.07} cor="#f4f4f8" brilho={0.9} />
  {k > 0.95 && LAT(10).map((i) => { const a = i / 10 * 6.28 + f * 0.1; return <Raio key={i} pos={[1.4 + Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0.2]} s={0.18} rot={a} />; })}
  <Pos bloom={0.9} /></>; }}</C3>; };
const C4e: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 6, d * 0.6, B); return <>
  <Cam pos={[0, 3, 5]} alvo={[0, 0, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#0a2a4a']} />
  <group rotation={[0, f * 0.008, 0]}>
    <mesh position={[0, 0, 0]}><cylinderGeometry args={[1.8, 1.8, 0.5, 64, 1, false, Math.PI / 2, Math.PI * 1.5]} /><meshStandardMaterial color="#3a6ab8" /></mesh>
    <mesh position={[0.35 * k, 0.4 * k, 0.35 * k]}><cylinderGeometry args={[1.8, 1.8, 0.5, 32, 1, false, 0, Math.PI / 2]} /><meshStandardMaterial color={AMAR} emissive={AMAR} emissiveIntensity={0.4} /></mesh></group>
  <Raio pos={[1.4, 1.5 + k * 0.4, 1]} s={0.5} />
  <Pos bloom={0.6} /></>; }}</C3>; };
const C4f: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.6, 6 - f * 0.03]} alvo={[0, 1.6, -4]} /><ambientLight intensity={0.15} /><color attach="background" args={['#05050c']} />
  {LAT(5).map((r) => LAT(9).map((c) => { const i = r * 9 + c; const on = f > i * 0.9; return <TV key={i} pos={[(c - 4) * 1.75, 0.6 + r * 1.05, -2 - r * 0.4]} s={0.95} tela={CORES[i % 6]} luz={on ? 1 : 0.02} />; }))}
  <Pos bloom={0.9} /></>}</C3>;
const C4g: React.FC = () => <C3>{(f) => { const on = [0, 1, 1, 0, 1, 1, 1, 0, 1][Math.floor(f / 3) % 9]; return <>
  <Cam pos={[2, 1.4, 5]} alvo={[0, 1, 0]} /><ambientLight intensity={0.2} /><Ceu cima="#1a0a3a" baixo="#ff8a6a" />
  <Chao cor="#2a3a2a" />
  <mesh position={[0, 1, 0]}><boxGeometry args={[3, 2, 2]} /><meshStandardMaterial color="#f4d8b0" /></mesh>
  <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[2.3, 1, 4]} /><meshStandardMaterial color={VERM} /></mesh>
  {[-0.8, 0.8].map((x) => <mesh key={x} position={[x, 1.2, 1.01]}><planeGeometry args={[0.7, 0.7]} /><meshBasicMaterial color={on ? '#ffd870' : '#1a1a2a'} toneMapped={false} /></mesh>)}
  <mesh position={[0, 0.5, 1.01]}><planeGeometry args={[0.6, 1]} /><meshStandardMaterial color="#6a3a2a" /></mesh>
  <pointLight position={[0, 1.2, 1.5]} intensity={on ? 3 : 0.2} color="#ffd870" />
  <Pos bloom={0.8} /></>; }}</C3>;
const C4h: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); const ang = f * lerp(0.6, 0.05, k); return <>
  <Cam pos={[0, -0.6, 3]} alvo={[0, 1, 0]} /><ambientLight intensity={0.5} /><pointLight position={[0, 0, 2]} intensity={3} /><color attach="background" args={['#ffe0c8']} />
  <mesh position={[0, 1.8, 0]}><cylinderGeometry args={[0.03, 0.03, 0.6, 8]} /><meshStandardMaterial color="#888" /></mesh>
  <group position={[0, 1.45, 0]} rotation={[0, ang, 0]}><mesh><cylinderGeometry args={[0.2, 0.2, 0.15, 24]} /><meshStandardMaterial color="#f4f4f8" /></mesh>
    {LAT(4).map((i) => <mesh key={i} rotation={[0, i * Math.PI / 2, 0]} position={[Math.cos(i * Math.PI / 2) * 0.75, 0, -Math.sin(i * Math.PI / 2) * 0.75]}><boxGeometry args={[1.1, 0.03, 0.28]} /><meshStandardMaterial color={CORES[i]} /></mesh>)}</group>
  <mesh position={[0, 1.15, 0]}><sphereGeometry args={[0.15, 16, 12]} /><meshBasicMaterial color={new THREE.Color('#fff4c0').multiplyScalar(1 - k * 0.6)} toneMapped={false} /></mesh>
  <mesh position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[8, 8]} /><meshStandardMaterial color="#f4e8d8" side={THREE.DoubleSide} /></mesh>
  <Pos bloom={0.6} /></>; }}</C3>; };
const C4i: React.FC = () => <C3>{(f) => { const on = Math.floor(f / 4) % 5 !== 0; return <>
  <Cam pos={[0, 0.2, 2.6]} alvo={[0, 0.4, 0]} /><ambientLight intensity={0.15} /><color attach="background" args={['#0a0814']} />
  <mesh position={[0, 1.6, 0]}><cylinderGeometry args={[0.01, 0.01, 1, 6]} /><meshStandardMaterial color="#222" /></mesh>
  <mesh position={[0, 1.05, 0]}><cylinderGeometry args={[0.07, 0.07, 0.15, 16]} /><meshStandardMaterial color="#8a8a8a" metalness={0.8} /></mesh>
  <mesh position={[0, 0.82, 0]}><sphereGeometry args={[0.2, 24, 20]} /><meshBasicMaterial color={on ? '#ffe8a0' : '#3a3a30'} toneMapped={false} /></mesh>
  {on && <Brilho pos={[0, 0.82, 0]} s={1.4} cor="#ffd870" o={0.7} />}
  <mesh position={[0, -0.2, -1]}><planeGeometry args={[6, 3]} /><meshBasicMaterial color={new THREE.Color('#1a4aff').multiplyScalar(0.25 + 0.05 * Math.sin(f * 0.4))} /></mesh>
  <Pos bloom={1} /></>; }}</C3>;
const C4j: React.FC = () => <C3>{(f) => { const fa = Math.floor(f / 2) % 7; return <>
  <Cam pos={[4, 2.6, 6]} alvo={[0, 1, 0]} tremor={0.015} /><ambientLight intensity={0.35} /><Ceu cima="#0a0a2a" baixo="#3a1a4a" /><Estrelas sem="c4j" />
  <Chao cor="#5a5a62" />
  {LAT(3).map((i) => <group key={i} position={[(i - 1) * 2.2, 0, 0]}><mesh position={[0, 0.8, 0]}><boxGeometry args={[1.4, 1.6, 1]} /><meshStandardMaterial color="#8a909a" metalness={0.6} /></mesh>
    {LAT(3).map((j) => <mesh key={j} position={[-0.4 + j * 0.4, 1.9, 0]}><cylinderGeometry args={[0.06, 0.1, 0.6, 10]} /><meshStandardMaterial color="#c8ccd4" /></mesh>)}
    {fa === i * 2 && <Brilho pos={[0, 2.2, 0]} s={1.5} cor={CIANO} o={1} />}</group>)}
  {LAT(3).map((j) => <Tubo key={j} pts={[[-3, 2.2, -0.4 + j * 0.4], [0, 2.4, -0.4 + j * 0.4], [3, 2.2, -0.4 + j * 0.4]]} r={0.02} cor={CIANO} brilho={fa % 2 ? 2 : 0.4} />)}
  <Pos bloom={1.2} /></>; }}</C3>;
const C4k: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.6); return <>
  <Cam pos={[5, 2.4, 6]} alvo={[0, 2.2, 0]} /><Luzes sol={[-3, 8, 4]} i={1.6} amb={0.6} /><Ceu cima="#4a8ae8" baixo="#ffe0b8" />
  <Chao cor="#7ab06a" tam={100} />
  <group position={[-1, 0, 0]}><Caminhao pos={[0, 0, 0]} cor={AMAR} s={1.2} />
    <group position={[-0.4, 1.5, 0]} rotation={[0, 0, lerp(0.1, 0.9, k)]}><mesh position={[0, 1.4, 0]}><boxGeometry args={[0.15, 2.8, 0.15]} /><meshStandardMaterial color="#e8e8f0" /></mesh>
      <group position={[0, 2.9, 0]} rotation={[0, 0, -lerp(0.1, 0.9, k)]}><mesh position={[0, 0.25, 0]}><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color={LARANJA} /></mesh>
        <mesh position={[0, 0.62, 0]}><sphereGeometry args={[0.18, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#ffffff" /></mesh></group></group></group>
  {LAT(3).map((i) => <group key={i} position={[2.6, 0, -2 + i * 2.5]}><mesh position={[0, 2.2, 0]}><cylinderGeometry args={[0.08, 0.12, 4.4, 10]} /><meshStandardMaterial color="#6a4a3a" /></mesh><mesh position={[0, 4.2, 0]}><boxGeometry args={[1.4, 0.08, 0.08]} /><meshStandardMaterial color="#6a4a3a" /></mesh></group>)}
  <Tubo pts={[[2.6, 4.2, -3], [2.6, 4.0, 0.5], [2.6, 4.2, 4]]} r={0.02} cor="#14161c" brilho={1} />
  <Pos bloom={0.3} /></>; }}</C3>; };
const C4l: React.FC = () => <C3>{(f) => { const gira = f * 0.25; return <>
  <Cam pos={[1.2, 1.4, 3.4]} alvo={[0, 1, 0]} /><ambientLight intensity={0.2} /><color attach="background" args={['#0a0a10']} />
  <mesh position={[0, 1, -0.4]}><boxGeometry args={[3, 2, 0.4]} /><meshStandardMaterial color="#5a6070" metalness={0.5} /></mesh>
  {LAT(12).map((i) => <mesh key={i} position={[-1.2 + (i % 6) * 0.48, 1.4 - Math.floor(i / 6) * 0.6, -0.18]}><circleGeometry args={[0.1, 16]} /><meshBasicMaterial color={(i + Math.floor(f / 6)) % 4 ? '#2a0a0a' : VERM} toneMapped={false} /></mesh>)}
  <group position={[0.9, 0.55, 0]} rotation={[0, 0, Math.sin(f * 0.1) * 0.05 - 0.5]}><mesh position={[0, 0.3, 0]}><boxGeometry args={[0.08, 0.6, 0.08]} /><meshStandardMaterial color="#c8ccd4" metalness={0.9} /></mesh><mesh position={[0, 0.62, 0]}><sphereGeometry args={[0.1, 16, 12]} /><meshStandardMaterial color={VERM} /></mesh></group>
  <group position={[0, 2.3, 0]}><mesh><cylinderGeometry args={[0.2, 0.25, 0.3, 20]} /><meshStandardMaterial color={LARANJA} transparent opacity={0.8} emissive={LARANJA} emissiveIntensity={0.6} /></mesh></group>
  <pointLight position={[Math.cos(gira) * 2, 2, Math.sin(gira) * 2]} intensity={4} color={LARANJA} distance={6} />
  <Chao cor="#1a1a20" />
  <Pos bloom={0.9} /></>; }}</C3>;
const C4m: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.5, 3.4]} /><Luzes sol={[4, 1, -3]} i={0.25} amb={0.04} /><Estrelas sem="c4m" />
  <group rotation={[0.3, f * 0.005 + 2, 0]}><Terra tex={tex} rot={[0, 0, 0]} nuvens={false} atm={false} />
    {LAT(500).map((i) => { const y = 1 - 2 * (i + 0.5) / 500; const r = Math.sqrt(1 - y * y); const a = i * 2.39996; return random('cl' + i) < 0.6 ? <mesh key={i} position={[Math.cos(a) * r * 1.01, y * 1.01, Math.sin(a) * r * 1.01]}><sphereGeometry args={[0.012, 6, 6]} /><meshBasicMaterial color={new THREE.Color('#3a8aff').multiplyScalar(2 + Math.sin(f * 0.3 + i))} toneMapped={false} /></mesh> : null; })}</group>
  <mesh scale={1.06}><sphereGeometry args={[1, 48, 48]} /><meshBasicMaterial color="#2a6aff" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} /></mesh>
  <Pos bloom={1.2} /></>}</C3>;

// ---------- cap. 5 · hora doze ----------
const C5a: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.4, 8]} alvo={[0, 2.4, 0]} /><Luzes sol={[0, 10, 2]} i={2} amb={0.6} /><Ceu cima="#2a8ae8" baixo="#c8f0ff" />
  <Brilho pos={[0, 8, -20]} s={6} cor="#fff8c0" o={1} />
  <Gramado y={0} tam={40} />
  <group position={[0, 3, -4]}><Placar a="12" b="00" s={0.9} /></group>
  <Bola pos={[0, 0.3, 2]} rot={[0, f * 0.02, 0]} />
  <Pos bloom={0.5} /></>}</C3>;
const C5b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.3, 1.6]} alvo={[0, 1.2, -1]} /><ambientLight intensity={0.5} /><directionalLight position={[0, 3, -4]} intensity={1.6} /><Ceu cima="#5aa8ff" baixo="#e8f4ff" />
  <mesh position={[0, 0.9, -1.1]}><boxGeometry args={[2.6, 0.4, 0.6]} /><meshStandardMaterial color="#2a2e3a" /></mesh>
  {LAT(10).map((i) => <mesh key={i} position={[-1.1 + i * 0.24, 1.12, -0.95]}><circleGeometry args={[0.07, 16]} /><meshBasicMaterial color={(i + Math.floor(f / 10)) % 3 ? '#0a0a10' : CIANO} toneMapped={false} /></mesh>)}
  {[-0.6, 0.6].map((x) => <group key={x} position={[x, 0, 0]}><mesh position={[0, 0.55, 0]}><boxGeometry args={[0.6, 0.15, 0.6]} /><meshStandardMaterial color="#3a3e4a" /></mesh><mesh position={[0, 0.95, 0.27]}><boxGeometry args={[0.6, 0.75, 0.1]} /><meshStandardMaterial color="#3a3e4a" /></mesh></group>)}
  <group position={[-0.6, 0.7, 0]}><mesh scale={[1, 0.4, 1]}><sphereGeometry args={[0.18, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#14182a" /></mesh><mesh position={[0, 0, -0.18]} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.3, 0.02, 0.15]} /><meshStandardMaterial color="#14182a" /></mesh></group>
  <mesh position={[0, 1.6, -1.6]}><planeGeometry args={[3, 1]} /><meshPhysicalMaterial color="#a8d8ff" transparent opacity={0.25} /></mesh>
  <Pos bloom={0.5} /></>}</C3>;
const C5c: React.FC = () => <C3>{(f) => <>
  <Cam pos={[f * 0.02, 14, 4]} alvo={[f * 0.02, 0, 0]} /><Luzes sol={[-3, 10, 4]} i={1.8} amb={0.6} /><color attach="background" args={['#9aa0a8']} />
  <Chao cor="#7a7e88" tam={100} />
  {LAT(3).map((r) => LAT(7).map((c) => <Aviao key={r + '-' + c} pos={[(c - 3) * 3, 0.3, (r - 1) * 3.6]} s={1.4} rot={[0, Math.PI / 2, 0]} cor={['#f4f6fa', '#e8f0ff', '#fff0f4'][c % 3]} />))}
  {LAT(3).map((r) => <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, (r - 1) * 3.6 + 1.6]}><planeGeometry args={[30, 0.08]} /><meshBasicMaterial color={AMAR} /></mesh>)}
  <Pos bloom={0.3} /></>}</C3>;
const C5d: React.FC = () => <C3>{(f) => <>
  <Cam pos={[-2 + f * 0.02, 1.6, 4]} alvo={[0, 1.2, -2]} /><ambientLight intensity={0.7} /><directionalLight position={[2, 5, 3]} intensity={1.2} /><color attach="background" args={['#e8f0f8']} />
  <Chao cor="#d8dce4" />
  {LAT(4).map((r) => LAT(8).map((c) => <group key={r + '-' + c} position={[(c - 3.5) * 0.6, 0, -r * 1.2]}><mesh position={[0, 0.4, 0]}><boxGeometry args={[0.5, 0.08, 0.45]} /><meshStandardMaterial color="#3a6ab8" /></mesh><mesh position={[0, 0.65, -0.2]}><boxGeometry args={[0.5, 0.45, 0.06]} /><meshStandardMaterial color="#3a6ab8" /></mesh>
    {random('mala' + r + c) < 0.4 && <mesh position={[0.1, 0.62, 0.05]}><boxGeometry args={[0.3, 0.4, 0.2]} /><meshStandardMaterial color={CORES[(r + c) % 6]} /></mesh>}</group>))}
  <group position={[0, 2.6, -5]}>{LAT(3).map((i) => <mesh key={i} position={[(i - 1) * 1.9, 0, 0]}><planeGeometry args={[1.7, 1]} /><meshBasicMaterial color={(i + Math.floor(f / 8)) % 2 ? VERM : '#3a0a10'} toneMapped={false} /></mesh>)}</group>
  <mesh position={[0, 2, -5.6]}><planeGeometry args={[12, 4]} /><meshPhysicalMaterial color="#a8d8ff" transparent opacity={0.4} /></mesh>
  <Pos bloom={0.5} /></>}</C3>;
const C5e: React.FC = () => <C3>{(f) => <>
  <Cam pos={[1.5, 1.5, 5.5]} alvo={[0, 1.2, 0]} /><Luzes sol={[-3, 6, 4]} i={1.6} amb={0.6} /><Ceu cima="#4a8ae8" baixo="#ffe8c8" />
  <Chao cor="#9a9ea8" />
  <mesh position={[0, 1.6, -0.6]}><boxGeometry args={[4.4, 3.2, 2.4]} /><meshStandardMaterial color="#c83a2a" /></mesh>
  {[-1, 1].map((l) => <mesh key={l} position={[l * 1.05, 1.1, 0.61]}><planeGeometry args={[1.7, 2.2]} /><meshStandardMaterial color="#1a1014" /></mesh>)}
  <Caminhao pos={[-1.1, 0, 0.2]} rot={-Math.PI / 2} cor={VERM} s={0.7} />
  <TV pos={[1.05, 1.6, 0.3]} s={0.6} tela="#1a6aff" luz={1 + Math.sin(f * 0.3) * 0.1} />
  <mesh position={[0, 3.4, 0.62]}><circleGeometry args={[0.4, 32]} /><meshStandardMaterial color="#f4f4f8" /></mesh>
  <Pos bloom={0.7} /></>}</C3>;
const C5f: React.FC = () => <C3>{(f) => { const l = Math.floor(f / 6) % 2; return <>
  <Cam pos={[3.2, 1.4, 3.6]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.3} /><Ceu cima="#0a1030" baixo="#3a3a6a" />
  <Chao cor="#3a3a44" />
  <group><mesh position={[0, 0.42, 0]}><boxGeometry args={[2.2, 0.45, 1]} /><meshStandardMaterial color="#f4f4f8" metalness={0.3} roughness={0.3} /></mesh><mesh position={[-0.1, 0.8, 0]}><boxGeometry args={[1.1, 0.35, 0.9]} /><meshStandardMaterial color="#1a2a4a" metalness={0.6} roughness={0.1} /></mesh>
    <mesh position={[0, 0.42, 0.505]}><planeGeometry args={[1.6, 0.14]} /><meshBasicMaterial color="#1a3a8a" /></mesh>
    {[-0.7, 0.7].map((x) => [-1, 1].map((s) => <mesh key={x + '' + s} position={[x, 0.18, s * 0.48]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.12, 18]} /><meshStandardMaterial color="#111" /></mesh>))}
    {[-0.2, 0.2].map((x, j) => <mesh key={x} position={[x - 0.1, 1.02, 0]}><boxGeometry args={[0.35, 0.1, 0.18]} /><meshBasicMaterial color={(j + l) % 2 ? VERM : '#2a4aff'} toneMapped={false} /></mesh>)}</group>
  <pointLight position={[-0.3, 1.4, 0]} intensity={l ? 6 : 0} color={VERM} distance={6} /><pointLight position={[0.1, 1.4, 0]} intensity={l ? 0 : 6} color="#2a4aff" distance={6} />
  <Pos bloom={1} /></>; }}</C3>;
const C5g: React.FC = () => <C3>{(f) => <>
  <Cam pos={[1.6, 1.8, 3.4]} alvo={[0, 1.4, 0]} /><ambientLight intensity={0.3} /><pointLight position={[-1, 1.4, 0.4]} intensity={4} color={CIANO} distance={5} /><color attach="background" args={['#1a1414']} />
  <mesh position={[0.6, 2, 0]}><cylinderGeometry args={[0.05, 0.05, 4, 12]} /><meshStandardMaterial color="#e8e8f0" metalness={0.95} roughness={0.1} /></mesh>
  <mesh position={[0.6, 0.02, 0]}><cylinderGeometry args={[0.5, 0.5, 0.04, 32]} /><meshStandardMaterial color="#c83a2a" /></mesh>
  {[0, 0.9].map((y) => <group key={y} position={[-1.4, 0.4 + y, -0.6]}><mesh><boxGeometry args={[1.8, 0.12, 0.8]} /><meshStandardMaterial color="#5a5a62" /></mesh><mesh position={[0, 0.1, 0]}><boxGeometry args={[1.7, 0.08, 0.75]} /><meshStandardMaterial color="#f4f0e8" /></mesh></group>)}
  <TV pos={[-1.2, 2.3, -0.9]} s={0.7} tela="#1a6aff" />
  <mesh position={[0, 1.6, -1.1]}><planeGeometry args={[6, 3.4]} /><meshStandardMaterial color="#5a3a3a" /></mesh>
  <Chao cor="#2a2a30" />
  <Pos bloom={0.8} /></>}</C3>;
const Arq: React.FC<{k: number; cheio: number}> = ({k, cheio}) => <>{LAT(5).map((r) => <mesh key={r} position={[0, 0.3 + r * 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[7 + r * 1.1, 8 + r * 1.1, 64, 1, Math.PI * 0.05, Math.PI * 0.9]} /><meshStandardMaterial color={['#5a6a8a', '#4a5a7a'][r % 2]} side={THREE.DoubleSide} /></mesh>)}
  {LAT(cheio).map((i) => { const a = Math.PI * (0.06 + random('ta' + i) * 0.88), ri = Math.floor(random('tr' + i) * 5); const r = 7.5 + ri * 1.1; return random('tk' + i) < k ? <mesh key={i} position={[Math.cos(a) * r, 0.42 + ri * 0.6, -Math.sin(a) * r]}><sphereGeometry args={[0.15, 6, 6]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh> : null; })}</>;
const C5h: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 6, 12]} alvo={[0, 0, -2]} /><ambientLight intensity={0.5} /><directionalLight position={[3, 8, -4]} intensity={1.4} /><Ceu cima="#5a6a8a" baixo="#b8c0d0" />
  <Gramado tam={14} /><Arq k={0} cheio={0} />
  <Bola pos={[0, 0.3, 0]} rot={[0, 0, 0]} />
  {LAT(80).map((i) => <mesh key={i} position={[(random('cx' + i) - 0.5) * 20, 8 - ((f * 0.25 + random('cy' + i) * 8) % 8), (random('cz' + i) - 0.5) * 20]}><boxGeometry args={[0.01, 0.3, 0.01]} /><meshBasicMaterial color="#c8d8ff" transparent opacity={0.6} /></mesh>)}
  <Pos bloom={0.3} /></>}</C3>;
const C5i: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 4, 4, 10]} alvo={[0, 1, -4]} /><ambientLight intensity={0.6} /><directionalLight position={[3, 8, -4]} intensity={1.4} /><Ceu cima="#2a6ae8" baixo="#c8e8ff" />
  <Gramado tam={14} /><Arq k={0.5} cheio={500} />
  <Pos bloom={0.3} /></>}</C3>;
const C5j: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 1, 5.5]} alvo={[0.8, 0, 0]} /><Luzes sol={[-3, 3, 4]} i={2.2} amb={0.4} /><color attach="background" args={['#0a2a2a']} />
  <group position={[-1.6, 0.4, 0]}><Terra tex={tex} r={0.8} rot={[0.3, f * 0.006, 0]} /></group>
  <mesh position={[1.4, -0.6, 0]}><boxGeometry args={[4.4, 0.15, 0.9]} /><meshStandardMaterial color="#3a3e4a" /></mesh>
  {LAT(9).map((i) => { const x = ((f * 0.03 + i * 0.5) % 4.4) - 0.8; return <Nota key={i} pos={[x, -0.45, 0]} rot={[0, 0.3, 0]} s={0.8} />; })}
  {LAT(5).map((i) => <Moeda key={'m' + i} pos={[-0.6 + i * 0.5, 0.9 + Math.sin(f * 0.1 + i) * 0.2, 0.3]} rot={[Math.PI / 2, f * 0.08 + i, 0]} s={0.6} />)}
  <Pos bloom={0.6} /></>}</C3>;
const C5k: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.7, B); return <>
  <Cam pos={[2, 2.4, 6]} alvo={[0, 1.4, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#ffd0a0']} />
  {[[-1, 6, '#3a6ae8'], [1, 4, ROSA]].map(([x, n, c], j) => <group key={j} position={[x as number, 0, 0]}>{LAT(n as number).map((i) => <group key={i} position={[0, 0.25 + i * 0.5 * k, 0]}><mesh><boxGeometry args={[1.1, 0.45, 1.1]} /><meshStandardMaterial color={c as string} /></mesh>
    <mesh position={[0, 0.3, 0]}><sphereGeometry args={[0.25, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={AMAR} /></mesh></group>)}</group>)}
  <Chao cor="#e8a070" />
  <Pos bloom={0.3} /></>; }}</C3>; };
const C5l: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, d * 0.3, d * 0.75, Easing.in(Easing.quad)); return <>
  <Cam pos={[4, 2.6, 7]} alvo={[0, 1.4, 0]} tremor={k > 0.5 && k < 1 ? 0.02 : 0} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#3a0a2a']} />
  {LAT(14).map((i) => { const x = (i - 7) * 0.55; const tomb = interpolate(k, [i / 14 * 0.7, i / 14 * 0.7 + 0.3], [0, 1.45], cl); return <group key={i} position={[x, 0, 0]} rotation={[0, 0, -tomb]}>{LAT(10).map((j) => <Nota key={j} pos={[0, 0.05 + j * 0.09 + (j > 0 ? 0 : 0), 0]} rot={[0, 0, Math.PI / 2]} s={1} />)}</group>; })}
  {k > 0.3 && LAT(40).map((i) => { const t = (k - 0.3) * 3; return <Nota key={'v' + i} pos={[(random('vx' + i) - 0.5) * 8, 3 + t * 2 - ((t * 3 + random('vy' + i) * 3) % 3), (random('vz' + i) - 0.5) * 3]} rot={[f * 0.1 + i, i, f * 0.05]} s={0.6} />; })}
  <Chao cor="#2a0a1a" />
  <Pos bloom={0.4} /></>; }}</C3>; };
const C5m: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.015) * 2.5, 1.6, 4]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.2} /><spotLight position={[0, 5, 1]} angle={0.3} intensity={60} color="#fff4e0" /><color attach="background" args={['#0a0610']} />
  <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.6, 0.7, 0.8, 32]} /><meshStandardMaterial color="#c8a040" metalness={0.8} roughness={0.25} /></mesh>
  <Barra pos={[0, 1.2, 0]} larg={1.4} k={0.03} s={0.6} />
  {LAT(3).map((i) => <mesh key={i} position={[(i - 1) * 0.6, 0.8 + Math.max(0, Math.sin(f * 0.2 - i)) * 0.05, 0.62]}><boxGeometry args={[0.4, 0.06, 0.02]} /><meshStandardMaterial color="#e8e0c0" /></mesh>)}
  <Chao cor="#14101a" />
  <Pos bloom={0.8} /></>}</C3>;

// ---------- cap. 6 · hora dezoito ----------
const C6a: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.6, 4]} alvo={[0, 1.6, 0]} /><ambientLight intensity={0.5} color="#ffd0a0" /><directionalLight position={[3, 1, 2]} intensity={1.6} color="#ff8a4a" /><color attach="background" args={['#3a1a2a']} />
  <mesh position={[0, 1.5, -0.2]}><planeGeometry args={[8, 5]} /><meshStandardMaterial color="#e8a070" /></mesh>
  <group position={[-1.1, 1.8, 0]}><Mostrador n={12} h={Math.PI + f * 0.002} m={f * 0.02} cor={ROSA} r={0.7} fundo="#f8f4e8" aro="#5a3a2a" /></group>
  <group position={[1.4, 1.6, -0.1]}><mesh><planeGeometry args={[1.6, 1.8]} /><meshBasicMaterial color="#ff8a5a" toneMapped={false} /></mesh><mesh position={[0, -0.3, 0.01]}><circleGeometry args={[0.35, 32]} /><meshBasicMaterial color="#ffe080" toneMapped={false} /></mesh>
    {[[0, 0, 1.6, 0.06], [0, 0, 0.06, 1.8]].map(([x, y, w, h], i) => <mesh key={i} position={[x, y, 0.02]}><planeGeometry args={[w, h]} /><meshStandardMaterial color="#5a3a2a" /></mesh>)}</group>
  <Pos bloom={0.6} /></>}</C3>;
const C6b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.2, 5]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#5ad8c8']} />
  <group position={[0, 1.4, 0]}>{LAT(5).map((i) => <mesh key={i} position={[0, 0, -0.02 * i]}><circleGeometry args={[1.3 - i * 0.25, 48]} /><meshStandardMaterial color={i % 2 ? '#ffffff' : VERM} /></mesh>)}</group>
  {LAT(6).map((i) => { const t0 = i * 40; const t = Math.max(0, f - t0); if (f < t0) return null; const x = lerp(-5, 2.2 + (random('dx' + i) - 0.5) * 1.6, Math.min(1, t / 12)), y = 1.4 + (random('dy' + i) - 0.5) * 3.2; return <group key={i} position={[x, y, 0.2]} rotation={[0, 0, -Math.PI / 2]}><mesh><cylinderGeometry args={[0.03, 0.03, 0.8, 8]} /><meshStandardMaterial color="#8a5a3a" /></mesh><mesh position={[0, 0.45, 0]}><coneGeometry args={[0.06, 0.15, 8]} /><meshStandardMaterial color="#aaa" metalness={0.8} /></mesh><mesh position={[0, -0.4, 0]}><boxGeometry args={[0.15, 0.15, 0.01]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh></group>; })}
  <Pos bloom={0.3} /></>}</C3>;
const C6c: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.2, 3.4]} alvo={[0, 1, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#7b3ff7']} />
  <group position={[0, 0.9, 0]} rotation={[0, f * 0.04, Math.sin(f * 0.1) * 0.15]}><mesh position={[0, 0.3, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.45, 0.6, 32, 1, true]} /><meshPhysicalMaterial color="#e8f8ff" transparent opacity={0.4} side={THREE.DoubleSide} /></mesh><mesh position={[0, -0.25, 0]}><cylinderGeometry args={[0.03, 0.03, 0.5, 10]} /><meshPhysicalMaterial color="#e8f8ff" transparent opacity={0.5} /></mesh><mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.3, 0.3, 0.03, 32]} /><meshPhysicalMaterial color="#e8f8ff" transparent opacity={0.5} /></mesh></group>
  {LAT(5).map((i) => { const a = i / 5 * Math.PI * 2 + f * 0.12; return <group key={i} position={[Math.cos(a) * 0.9, 1.8 + Math.sin(a * 2) * 0.1, Math.sin(a) * 0.5]} rotation={[0, 0, f * 0.1]}><mesh><octahedronGeometry args={[0.12]} /><meshBasicMaterial color={AMAR} toneMapped={false} /></mesh></group>; })}
  <Pos bloom={0.9} /></>}</C3>;
const C6d: React.FC = () => <C3>{(f) => { const aperta = Math.abs(Math.sin(f * 0.6)); return <>
  <Cam pos={[0.6, 1.4, 1.6]} alvo={[0.1, 0.9, 0]} /><ambientLight intensity={0.5} /><pointLight position={[1, 2, 2]} intensity={4} color={ROSA} /><color attach="background" args={['#2a0a3a']} />
  <Controle pos={[0, 0.9, 0]} rot={[0.5, 0, 0]} s={1.2} cor="#e8e8f0" />
  <mesh position={[0.5, 1.15 - aperta * 0.03, 0.35]}><sphereGeometry args={[0.06, 14, 10]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh>
  <Nuvem n={60} sem="c6d" origem={new THREE.Vector3(0.5, 1.2, 0.35)} t={20 + f} raio={0.6} cor="#c8c8d8" tam={0.08} o={0.5} dir={new THREE.Vector3(0, 1, 0)} />
  <Pos bloom={0.7} /></>; }}</C3>;
const C6e: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, d * 0.55, d * 0.6); return <>
  <Cam pos={[-0.6, 0.2, 2.4]} alvo={[-0.6, 0, 0]} /><ambientLight intensity={0.6} /><pointLight position={[0, 1, 2]} intensity={3} /><color attach="background" args={['#0a1a2a']} />
  <Barra pos={[0, 0, 0]} larg={4} k={0.038 + 0.004 * k} s={1} />
  <group position={[-1.75 + Math.sin(f * 0.05) * 0.1, 0.05, 0.6]}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.45, 0.06, 12, 40]} /><meshStandardMaterial color="#2a2a30" metalness={0.6} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.42, 0.42, 0.02, 40]} /><meshPhysicalMaterial color="#e8f8ff" transparent opacity={0.15} /></mesh>
    <mesh position={[0.5, -0.5, 0]} rotation={[0, 0, 0.8]}><cylinderGeometry args={[0.06, 0.06, 0.7, 12]} /><meshStandardMaterial color="#8a5a3a" /></mesh></group>
  {k > 0.5 && <Confete f={f} n={30} sem="c6e" area={3} />}
  <Pos bloom={0.8} /></>; }}</C3>; };
const C6f: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 1.2, 3.2]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.5} /><directionalLight position={[2, 4, 3]} intensity={1.4} /><color attach="background" args={['#ffc8a0']} />
  <Sofa pos={[0, 0, 0]} cor="#e85a3a" />
  <mesh position={[0, 0.63 - 0.12 * k, 0.05]} scale={[1, 0.3, 0.8]}><sphereGeometry args={[0.4, 24, 16]} /><meshStandardMaterial color="#c84a2a" /></mesh>
  {LAT(3).map((i) => <mesh key={i} position={[(i - 1) * 0.25, 1.4 + ((f * 0.02 + i * 0.3) % 1) * 0.6, 0.1]}><torusGeometry args={[0.07, 0.015, 6, 12]} /><meshBasicMaterial color="#ffffff" transparent opacity={1 - ((f * 0.02 + i * 0.3) % 1)} /></mesh>)}
  <Chao cor="#d89a70" />
  <Pos bloom={0.3} /></>; }}</C3>; };
const C6g: React.FC = () => { const d = useD(); return <C3>{(f) => { const v = lerp(0.004, 0.02, pr(f, d * 0.4, d)); return <>
  <Cam pos={[0, 0, 4.4]} /><ambientLight intensity={0.6} /><color attach="background" args={['#fff0f4']} />
  <mesh rotation={[0, 0, 0]}><torusGeometry args={[1.4, 0.18, 16, 80]} /><meshPhysicalMaterial color="#ffd0dc" transparent opacity={0.45} /></mesh>
  {LAT(24).map((i) => { const a = i / 24 * Math.PI * 2 + f * v * 6; return <mesh key={i} position={[Math.cos(a) * 1.4, Math.sin(a) * 1.4, 0]} scale={[1, 0.6, 1]}><sphereGeometry args={[0.1, 14, 10]} /><meshStandardMaterial color="#e8304a" /></mesh>; })}
  <mesh><sphereGeometry args={[0.4, 24, 16]} /><meshStandardMaterial color={ROSA} emissive={ROSA} emissiveIntensity={0.2 + 0.2 * Math.abs(Math.sin(f * 0.15))} /></mesh>
  <Pos bloom={0.3} /></>; }}</C3>; };
const C6h: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 2.6, 2.6]} alvo={[0, 0, 0]} /><Luzes sol={[2, 6, 5]} i={1.4} amb={0.7} /><color attach="background" args={['#a8e8ff']} />
  <mesh position={[0, -0.02, 0]}><boxGeometry args={[5, 0.04, 3.4]} /><meshStandardMaterial color="#f4f0e8" /></mesh>
  <group position={[-0.8, 0.03, 0]} rotation={[0, 0.2, 0]}><mesh><boxGeometry args={[1, 0.04, 1.3]} /><meshStandardMaterial color="#8a5a3a" /></mesh><mesh position={[0, 0.03, 0]}><boxGeometry args={[0.85, 0.02, 1.1]} /><meshStandardMaterial color="#ffffff" /></mesh>
    {LAT(3).map((i) => <group key={i} position={[0, 0.05, -0.3 + i * 0.32]}><mesh position={[-0.3, 0, 0]}><boxGeometry args={[0.12, 0.01, 0.12]} /><meshStandardMaterial color="#ffffff" /></mesh><mesh position={[-0.3, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0.7]} scale={interpolate(f, [10 + i * 12, 18 + i * 12], [0, 1], cl)}><planeGeometry args={[0.04, 0.16]} /><meshBasicMaterial color={VERDE} /></mesh><mesh position={[0.12, 0, 0]}><boxGeometry args={[0.5, 0.01, 0.04]} /><meshStandardMaterial color="#999" /></mesh></group>)}</group>
  <Tubo pts={[[0.2, 0.05, -0.8], [0.6, 0.05, -0.2], [0.3, 0.05, 0.4], [0.8, 0.05, 0.8]]} r={0.03} cor="#2a2e3a" brilho={1} />
  <mesh position={[0.8, 0.07, 0.8]}><cylinderGeometry args={[0.12, 0.12, 0.05, 20]} /><meshStandardMaterial color="#c8ccd4" metalness={0.9} /></mesh>
  <group position={[1.5, 0.35, -0.4]}><mesh><cylinderGeometry args={[0.15, 0.15, 0.7, 20]} /><meshPhysicalMaterial color="#8ad8ff" transparent opacity={0.6} /></mesh></group>
  <Pos bloom={0.3} /></>}</C3>;
const C6i: React.FC = () => <C3>{(f) => { const y = Math.abs(Math.sin(f * 0.15)) * 0.4; return <>
  <Cam pos={[0, 1.6, 5]} alvo={[0, 1.4, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#ffe23a']} />
  <Sofa pos={[0, 0, -0.5]} cor={ROXO} />
  <group position={[0, 1.6 + y, 0]}><mesh position={[0, 0.5, 0]}><coneGeometry args={[0.6, 0.8, 4]} /><meshStandardMaterial color={VERDE} emissive={VERDE} emissiveIntensity={0.3} /></mesh><mesh position={[0, -0.2, 0]}><boxGeometry args={[0.45, 0.8, 0.3]} /><meshStandardMaterial color={VERDE} emissive={VERDE} emissiveIntensity={0.3} /></mesh></group>
  <Chao cor="#f0c020" />
  <Pos bloom={0.4} /></>; }}</C3>;
const C6j: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 4, d * 0.8); return <>
  <Cam pos={[0.8, 1, 2.2]} alvo={[0, 0.6, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.7} /><color attach="background" args={['#c8f0ff']} />
  <group position={[0.3, 1.3, 0]} rotation={[0, 0, 2.1]}><Garrafa pos={[0, 0, 0]} cor="#8ad8ff" s={1.2} /></group>
  {k < 0.98 && <mesh position={[-0.03, 0.95, 0]}><cylinderGeometry args={[0.025, 0.02, 0.6, 10]} /><meshPhysicalMaterial color="#5ac8ff" transparent opacity={0.8} /></mesh>}
  <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.28, 0.22, 0.75, 32, 1, true]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} /></mesh>
  <mesh position={[0, 0.06 + k * 0.28, 0]} scale={[1, Math.max(0.01, k), 1]}><cylinderGeometry args={[0.26, 0.22, 0.6, 32]} /><meshPhysicalMaterial color="#5ac8ff" transparent opacity={0.7} /></mesh>
  <Chao cor="#e8f4ff" />
  <Pos bloom={0.3} /></>; }}</C3>; };

// ---------- cap. 7 · hora vinte e quatro ----------
const C7a: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 1.6, 9]} alvo={[0, 3, 0]} /><ambientLight intensity={0.4} /><color attach="background" args={['#06061a']} /><Estrelas sem="c7a" />
  <group position={[0, 3, -2]}><Placar a="24" b="00" s={1} /></group>
  {LAT(5).map((i) => { const t0 = i * 14; const t = (f - t0) / 30; if (t < 0 || t > 1.2) return null; const c = new THREE.Vector3(-4 + i * 2, 4.5 + (i % 2), -4); return <Nuvem key={i} n={160} sem={'fw' + i} origem={c} t={t * 60} raio={2.2} cor={CORES[i % 6]} tam={0.12} o={1 - t * 0.8} add />; })}
  <Gramado y={0} tam={30} />
  <Pos bloom={1.2} /></>}</C3>;
const C7b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 12, 3]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 10, 4]} i={1.6} amb={0.6} /><color attach="background" args={['#ffe8c8']} />
  <Chao cor="#a8acb4" tam={60} />
  {LAT(4).map((r) => LAT(5).map((c) => <mesh key={r + '-' + c} position={[(c - 2) * 3.2, 0.6, (r - 1.5) * 3.2]}><boxGeometry args={[2.2, 1.2, 2.2]} /><meshStandardMaterial color={['#ffb0c8', '#a8e0ff', '#ffe0a0', '#c8b0ff'][(r + c) % 4]} /></mesh>))}
  {LAT(90).map((i) => { const t0 = random('ct' + i) * 40; const t = Math.max(0, f - t0) / 16; const y = Math.max(0.1, 6 - t * t * 6); const fx = Math.floor(random('cx' + i) * 6) - 2.5, fz = Math.floor(random('cz' + i) * 5) - 2;
    return f < t0 ? null : <Controle key={i} pos={[fx * 3.2 + (random('ox' + i) - 0.5) * 0.6, y, fz * 3.2 - 1.6 + (random('oz' + i) - 0.5) * 0.6]} rot={[-Math.PI / 2, 0, random('cr' + i) * 6]} s={0.35} cor={CORES[i % 6]} />; })}
  <Pos bloom={0.3} /></>}</C3>;
const C7c: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.7); return <>
  <Cam pos={[0.3, 0.4, 3.4]} alvo={[-0.6, 0, 0]} /><ambientLight intensity={0.6} /><pointLight position={[0, 1, 2]} intensity={3} color="#c8e8ff" /><color attach="background" args={['#0a1a3a']} />
  <Barra pos={[0, 0, 0]} larg={4} k={0.038} s={1} />
  {LAT(30).map((i) => <mesh key={i} position={[(random('ix' + i) - 0.5) * 4.2, (random('iy' + i) - 0.5) * 0.5, 0.12]} rotation={[0, 0, random('ir' + i) * 3]} scale={interpolate(k, [random('it' + i) * 0.8, random('it' + i) * 0.8 + 0.2], [0, 1], cl)}><octahedronGeometry args={[0.08]} /><meshPhysicalMaterial color="#e8f8ff" transparent opacity={0.8} roughness={0.05} /></mesh>)}
  <mesh position={[0, 0, 0.1]}><boxGeometry args={[4.1, 0.45, 0.02]} /><meshPhysicalMaterial color="#c8f0ff" transparent opacity={0.3 * k} /></mesh>
  <Pos bloom={0.7} /></>; }}</C3>; };
const C7d: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[0, 3, 9]} alvo={[0, 3, 0]} /><ambientLight intensity={0.5} /><directionalLight position={[-5, 3, 5]} intensity={1.6} color="#ffd0a0" /><Ceu cima="#5a8ae8" baixo="#ffb08a" />
  <mesh position={[0, 3, -0.3]}><boxGeometry args={[8, 6.4, 0.6]} /><meshStandardMaterial color="#e8d8c8" /></mesh>
  {LAT(6).map((r) => LAT(8).map((c) => { const i = r * 8 + c; const ab = interpolate(f, [random('jt' + i) * d * 0.8, random('jt' + i) * d * 0.8 + 8], [0, 1], cl); return <group key={i} position={[(c - 3.5) * 0.95, 0.6 + r * 1, 0.02]}>
    <mesh><planeGeometry args={[0.6, 0.75]} /><meshBasicMaterial color="#ffe8a0" toneMapped={false} /></mesh><mesh position={[0, 0.375 - 0.375 * (1 - ab), 0.01]} scale={[1, Math.max(0.02, 1 - ab), 1]}><planeGeometry args={[0.62, 0.75]} /><meshStandardMaterial color={CORES[i % 6]} /></mesh></group>; }))}
  <Pos bloom={0.5} /></>}</C3>; };
const C7e: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.01) * 2, 1.6, 6]} alvo={[0, 1.4, 0]} /><Luzes sol={[-3, 6, 4]} i={1.6} amb={0.6} /><Ceu cima="#7a9ac8" baixo="#f0e0d0" />
  <Chao cor="#8a8e96" />
  {LAT(30).map((i) => <CaixaConsole key={i} i={i} pos={[(random('bx' + i) - 0.5) * 8, 0.15, (random('bz' + i) - 0.5) * 4]} rot={[Math.PI / 2 * (i % 2), random('br' + i) * 6, 0]} s={0.5} />)}
  {LAT(3).map((i) => <Interrog key={'q' + i} pos={[(i - 1) * 2.2, 2.2 + Math.sin(f * 0.1 + i) * 0.15, -0.5]} rot={[0, Math.sin(f * 0.05 + i) * 0.5, 0]} s={0.7 + (i === 1 ? 0.3 : 0)} cor={[ROSA, AMAR, CIANO][i]} />)}
  <Pos bloom={0.4} /></>}</C3>;
const C7f: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[0, 0.3, 4.6]} alvo={[0.6, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2.4} amb={0.2} /><Estrelas sem="c7f" />
  <group position={[-0.8, 0, 0]}><Terra tex={tex} rot={[0.3, f * 0.004, 0]} /></group>
  <group position={[1.4, 0.2 + Math.sin(f * 0.04) * 0.1, 0.4]} rotation={[0.1, -0.4 + Math.sin(f * 0.02) * 0.1, 0.1]}><mesh><planeGeometry args={[1.1, 1.6]} /><meshStandardMaterial color="#fbfbf6" side={THREE.DoubleSide} /></mesh>
    {LAT(7).map((i) => <mesh key={i} position={[-0.1, 0.55 - i * 0.14, 0.01]}><planeGeometry args={[0.7, 0.04]} /><meshBasicMaterial color="#888" /></mesh>)}<mesh position={[0, -0.55, 0.01]}><planeGeometry args={[0.9, 0.18]} /><meshBasicMaterial color={VERM} toneMapped={false} /></mesh>
    <Raio pos={[0.35, 0.55, 0.02]} s={0.18} /></group>
  <Pos bloom={0.7} /></>}</C3>;
const C7g: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0, 0, 5]} /><ambientLight intensity={0.6} /><directionalLight position={[2, 3, 5]} intensity={1.4} /><color attach="background" args={['#14082a']} />
  <group rotation={[0, 0, f * 0.04]}>{[0, 1].map((i) => <mesh key={i} position={[-0.35 + i * 0.7 - 0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.6, 0.7, 3]} /><meshStandardMaterial color={CIANO} emissive={CIANO} emissiveIntensity={0.4} /></mesh>)}</group>
  <group position={[0, 0, -1]}><Mostrador n={12} h={-f * 0.05} m={-f * 0.6} cor={AMAR} r={2} fundo="#1a1030" /></group>
  <Pos bloom={0.8} /></>}</C3>;

// ---------- cap. 8 · Islândia, 1975 ----------
const C8a: React.FC = () => <C3>{(f) => { const s = interpolate(f, [0, 12], [0, 1], {...cl, easing: B}); return <>
  <Cam pos={[Math.sin(f * 0.01) * 1.2, 0.3, 4.4]} /><Luzes sol={[2, 4, 5]} i={1.6} amb={0.5} /><color attach="background" args={['#c87a3a']} />
  <Calendario s={s * 1.2} rot={[0, (1 - s) * 2, 0]} dia="24" mes="OUT" ano="1975" cor="#3a6a8a" papel="#f4e8c8" />
  <Pos bloom={0.3} /></>; }}</C3>;
const C8b: React.FC = () => <C3>{(f) => <>
  <Cam pos={[Math.sin(f * 0.008) * 1.5, 3.4, 3.6]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 6, 4]} i={1.6} amb={0.5} /><color attach="background" args={['#0a2a4a']} />
  <Viva n={60} tam={20} h={(x, z) => Math.sin(x * 2 + f * 0.05) * Math.cos(z * 2 + f * 0.04) * 0.03} mat={<meshStandardMaterial color="#1a5a8a" roughness={0.3} metalness={0.3} />} />
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}><meshStandardMaterial color="#6a8a5a" roughness={1} /></mesh>
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} scale={[0.5, 0.5, 1]}><meshStandardMaterial color="#f4f8fc" roughness={1} /></mesh>
  <mesh position={[-1.1, 0.4, -0.2]}><cylinderGeometry args={[0.04, 0.04, 0.6, 8]} /><meshStandardMaterial color="#555" /></mesh><mesh position={[-1.1, 0.75, -0.2]}><sphereGeometry args={[0.1, 16, 12]} /><meshBasicMaterial color={ROSA} toneMapped={false} /></mesh>
  <Pos bloom={0.5} /></>}</C3>;
const C8c: React.FC = () => <C3>{(f) => <>
  <Cam pos={[2, 2, 4]} alvo={[0, 0.8, 0]} /><ambientLight intensity={0.6} color="#ffe8c8" /><directionalLight position={[2, 5, 3]} intensity={1.2} /><color attach="background" args={['#c8a878']} />
  <Chao cor="#8a6a4a" />
  {LAT(6).map((i) => { const x = (i % 3 - 1) * 1.6, z = Math.floor(i / 3) * -1.6; const toca = i % 2 === 0 && Math.floor(f / 4) % 2; return <group key={i} position={[x, 0, z]}>
    <mesh position={[0, 0.7, 0]}><boxGeometry args={[1.2, 0.08, 0.7]} /><meshStandardMaterial color="#6a4a2a" /></mesh>
    <mesh position={[0, 0.82, 0]}><boxGeometry args={[0.5, 0.16, 0.4]} /><meshStandardMaterial color={['#3a6a5a', '#8a3a3a', '#3a4a6a'][i % 3]} /></mesh><mesh position={[0, 0.95, -0.15]} rotation={[-0.3, 0, 0]}><boxGeometry args={[0.45, 0.2, 0.02]} /><meshStandardMaterial color="#f8f4e8" /></mesh>
    <group position={[0.4, 0.8 + (toca ? 0.03 : 0), 0.1]} rotation={[0, 0, toca ? Math.sin(f * 1.5) * 0.15 : 0]}><mesh><boxGeometry args={[0.22, 0.1, 0.2]} /><meshStandardMaterial color="#1a1a1a" /></mesh><mesh position={[0, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.025, 0.2, 4, 8]} /><meshStandardMaterial color="#1a1a1a" /></mesh></group>
    <mesh position={[0, 0.35, 0.5]}><boxGeometry args={[0.45, 0.06, 0.45]} /><meshStandardMaterial color="#5a3a2a" /></mesh></group>; })}
  <Pos bloom={0.3} /></>}</C3>;
const PRACA = LAT(700).map((i) => { const a = random('qa' + i) * 6.28, r = Math.sqrt(random('qr' + i)) * 3.2; return [Math.cos(a) * r * 1.4, Math.sin(a) * r] as [number, number]; });
const C8d: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, lerp(10, 13, k), lerp(2, 5, k)]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 10, 4]} i={1.6} amb={0.6} /><color attach="background" args={['#9aa8b8']} />
  <Chao cor="#a8a8a0" tam={60} />
  {PRACA.map(([x, z], i) => <mesh key={i} position={[x, 0.15, z]}><sphereGeometry args={[0.1, 6, 6]} /><meshStandardMaterial color={['#c83a3a', '#3a5ab8', '#e8c040', '#2a2a30', '#8a5a9a'][i % 5]} /></mesh>)}
  {LAT(18).map((i) => { const a = i / 18 * Math.PI * 2; return <group key={i} position={[Math.cos(a) * 6.4, 0, Math.sin(a) * 4.8]} rotation={[0, -a, 0]}><mesh position={[0, 0.6, 0]}><boxGeometry args={[1.2, 1.2, 1.2]} /><meshStandardMaterial color={['#e84a4a', '#f4c430', '#3a8ae8', '#f4f4f0', '#3ab08a'][i % 5]} /></mesh><mesh position={[0, 1.45, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.95, 0.5, 4]} /><meshStandardMaterial color={['#2a2e3a', '#c83a2a'][i % 2]} /></mesh></group>; })}
  <Pos bloom={0.2} /></>; }}</C3>; };
const C8e: React.FC = () => <C3>{(f) => <>
  <Cam pos={[4, 2, 6]} alvo={[0, 0.6, 0]} /><Luzes sol={[-3, 4, 4]} i={1.4} amb={0.6} /><Ceu cima="#6a8ab8" baixo="#e8eef4" />
  <Viva n={50} tam={30} pos={[0, -0.1, 3]} h={(x, z) => Math.sin(x + f * 0.05) * 0.03 + Math.cos(z * 1.3 + f * 0.04) * 0.02} mat={<meshStandardMaterial color="#2a5a7a" roughness={0.3} metalness={0.3} />} />
  <mesh position={[0, 0, -3]}><boxGeometry args={[30, 0.4, 6]} /><meshStandardMaterial color="#7a7e86" /></mesh>
  {LAT(5).map((i) => <group key={i} position={[-4 + i * 2, 0, 1 + Math.sin(f * 0.04 + i) * 0.03]} rotation={[0, Math.PI / 2, Math.sin(f * 0.05 + i) * 0.03]}><mesh position={[0, 0.2, 0]} scale={[0.6, 0.4, 1.6]}><sphereGeometry args={[0.8, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial color={['#c83a3a', '#3a5ab8', '#f4f4f0', '#3ab08a', '#e8c040'][i]} side={THREE.DoubleSide} /></mesh>
    <mesh position={[0, 0.5, -0.2]}><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color="#f4f4f0" /></mesh><mesh position={[0, 1.2, 0.3]}><cylinderGeometry args={[0.03, 0.03, 1.4, 8]} /><meshStandardMaterial color="#5a4a3a" /></mesh></group>)}
  {LAT(3).map((i) => <group key={'f' + i} position={[-3 + i * 3, 0.2, -3.5]}><mesh position={[0, 1, 0]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#d8d0c0" /></mesh><mesh position={[0.6, 2.6, 0]}><cylinderGeometry args={[0.2, 0.25, 1.4, 16]} /><meshStandardMaterial color="#8a6a5a" /></mesh></group>)}
  <Pos bloom={0.3} /></>}</C3>;
const C8f: React.FC = () => { const d = useD(); return <C3>{(f) => <>
  <Cam pos={[2.4, 2, 3.6]} alvo={[0, 0.6, 0]} /><ambientLight intensity={0.6} /><directionalLight position={[2, 5, 3]} intensity={1.4} color="#ffe8c8" /><color attach="background" args={['#3a2a1a']} />
  <mesh position={[0, 0.3, 0]}><boxGeometry args={[4, 0.6, 2]} /><meshStandardMaterial color="#6a3a1a" /></mesh>
  <group position={[-0.6, 0.66, 0]} rotation={[0, 0.2, 0]}><mesh><boxGeometry args={[1.3, 0.12, 0.9]} /><meshStandardMaterial color="#1a3a6a" /></mesh><mesh position={[0, 0.07, 0]}><boxGeometry args={[1.22, 0.02, 0.85]} /><meshStandardMaterial color="#f4ecd8" /></mesh></group>
  {(() => { const t = (f % 30) / 30; const a = t < 0.3 ? lerp(0.9, 0, t / 0.3) : lerp(0, 0.9, (t - 0.3) / 0.7); return <group position={[0.9, 0.62, 0]} rotation={[0, 0, a]}><mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 1.1, 10]} /><meshStandardMaterial color="#8a5a2a" /></mesh><mesh position={[-1.1, 0.05, 0]}><cylinderGeometry args={[0.13, 0.13, 0.45, 20]} /><meshStandardMaterial color="#8a5a2a" /></mesh></group>; })()}
  {Math.floor(f / 30) > 0 && (f % 30) < 10 && <Brilho pos={[-0.6, 0.8, 0]} s={1} cor={AMAR} o={1 - (f % 30) / 10} />}{void d}
  <Pos bloom={0.6} /></>}</C3>; };
const C8g: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, d * 0.4, d * 0.6, B); return <>
  <Cam pos={[0, 1.6, 5]} alvo={[0, 1.2, 0]} /><Luzes sol={[2, 6, 5]} i={1.6} amb={0.6} /><color attach="background" args={['#3a5a8a']} />
  <mesh position={[0, 0.6, 0]}><boxGeometry args={[1.4, 1.2, 1.2]} /><meshPhysicalMaterial color="#e8f4ff" transparent opacity={0.35} roughness={0.05} /></mesh>
  <mesh position={[0, 1.22, 0]}><boxGeometry args={[1.45, 0.05, 1.25]} /><meshStandardMaterial color="#1a3a6a" /></mesh><mesh position={[0, 1.25, 0]}><boxGeometry args={[0.6, 0.02, 0.06]} /><meshStandardMaterial color="#000" /></mesh>
  {LAT(10).map((i) => { const t = ((f + i * 9) % 40) / 40; return <mesh key={i} position={[0, 2.6 - t * 2.2, 0]} rotation={[0, i, 0]}><boxGeometry args={[0.45, 0.6, 0.01]} /><meshStandardMaterial color="#fbfbf6" /></mesh>; })}
  <group position={[0, 2.9, -0.5]} scale={k}><Placar a="19" b="80" s={0.5} /></group>
  <Chao cor="#2a3a5a" />
  <Pos bloom={0.4} /></>; }}</C3>; };
const C8h: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d * 0.8); return <>
  <Cam pos={[0, 1.4, 5]} alvo={[0, 1.2, 0]} /><ambientLight intensity={0.15} /><color attach="background" args={['#0a0a14']} />
  <mesh position={[0, 1.2, -0.05]}><planeGeometry args={[1.3, 2.4]} /><meshBasicMaterial color={new THREE.Color('#fff4d0').multiplyScalar(1 + k)} toneMapped={false} /></mesh>
  <group position={[-0.65, 1.2, 0]} rotation={[0, -k * 1.6, 0]}><mesh position={[0.65, 0, 0]}><boxGeometry args={[1.3, 2.4, 0.08]} /><meshStandardMaterial color="#6a3a2a" /></mesh></group>
  <mesh position={[0, 0.01, 1.5]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, k, 1]}><planeGeometry args={[1.3, 3]} /><meshBasicMaterial color="#ffe8a0" transparent opacity={0.6} toneMapped={false} /></mesh>
  <mesh position={[0, 1.2, -0.1]}><planeGeometry args={[6, 4]} /><meshStandardMaterial color="#1a1a2a" /></mesh>
  <Pos bloom={1.4} /></>; }}</C3>; };
const C8i: React.FC = () => { const d = useD(); return <C3>{(f) => { const k = pr(f, 0, d); return <>
  <Cam pos={[0, 1.2, 6]} alvo={[0, 0.6, 0]} /><Luzes sol={[0, lerp(-1, 3, k), -10]} i={1.6} amb={0.4} /><Ceu cima="#2a3a7a" baixo="#ffb07a" />
  <Brilho pos={[0, lerp(-1, 2.5, k), -30]} s={8} cor="#ffd080" o={1} />
  <Viva n={60} tam={40} pos={[0, -0.1, -5]} h={(x, z) => Math.sin(x * 0.8 + f * 0.05) * 0.04 + Math.cos(z + f * 0.03) * 0.03} mat={<meshStandardMaterial color="#2a4a7a" roughness={0.2} metalness={0.4} />} />
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -2]} scale={[1.6, 1.6, 2]}><meshStandardMaterial color="#5a6a5a" roughness={1} /></mesh>
  <mesh geometry={Ilha} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, -2]} scale={[0.8, 0.8, 1]}><meshStandardMaterial color="#f4f8fc" roughness={1} /></mesh>
  <Pos bloom={1} /></>; }}</C3>; };
const C8j: React.FC = () => <C3>{(f, tex) => <>
  <Cam pos={[2.8, 1.2, 2.6]} alvo={[0, 0, 0]} /><Luzes sol={[-3, 2, 4]} i={2} amb={0.2} /><Estrelas sem="c8j" />
  <Terra tex={tex} rot={[0.3, f * 0.004, 0]} />
  <group position={[0, 1.35, 0]} rotation={[0, 0.8, 0]}><Barra pos={[0, 0, 0]} larg={1.6} k={0.038} s={0.5} /></group>
  {LAT(120).map((i) => { const y = 1 - 2 * (i + 0.5) / 120; const r = Math.sqrt(1 - y * y); const a = i * 2.39996 + f * 0.004; return <mesh key={i} position={[Math.cos(a) * r * 1.015, y * 1.015, -Math.sin(a) * r * 1.015]}><sphereGeometry args={[0.012, 6, 6]} /><meshBasicMaterial color={new THREE.Color('#3a8aff').multiplyScalar(2)} toneMapped={false} /></mesh>; })}
  <Pos bloom={1} /></>}</C3>;
const C8k: React.FC = () => <C3>{(f) => <>
  <Cam pos={[0.4, 1.2, 2.8 - f * 0.004]} alvo={[0, 0.7, 0]} /><ambientLight intensity={0.5} color="#ffd8b0" /><directionalLight position={[-3, 2, 1]} intensity={1.8} color="#ffb070" /><color attach="background" args={['#3a2030']} />
  <mesh position={[0, 0.45, 0]}><boxGeometry args={[2.2, 0.08, 1]} /><meshStandardMaterial color="#8a5a3a" /></mesh>
  {[[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]].map(([x, z], i) => <mesh key={i} position={[x, 0.2, z]}><boxGeometry args={[0.06, 0.45, 0.06]} /><meshStandardMaterial color="#6a3a2a" /></mesh>)}
  <Controle pos={[0.45, 0.53, 0.05]} rot={[-Math.PI / 2, 0, -0.3]} s={0.5} cor="#1c1f2a" />
  <group position={[-0.5, 0.5, 0]}><mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.15, 0.18, 0.06, 20]} /><meshStandardMaterial color="#c8a040" metalness={0.8} /></mesh><mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.02, 0.02, 0.18, 8]} /><meshStandardMaterial color="#c8a040" metalness={0.8} /></mesh>
    <mesh position={[0, 0.48, 0]} rotation={[0.4, f * 0.01, 0]}><sphereGeometry args={[0.3, 32, 24]} /><meshStandardMaterial color="#3a8ae8" roughness={0.5} /></mesh>
    <mesh position={[0, 0.48, 0]} rotation={[0, 0, 0.4]}><torusGeometry args={[0.33, 0.012, 8, 40, Math.PI]} /><meshStandardMaterial color="#c8a040" metalness={0.8} /></mesh></group>
  <mesh position={[0, 1.4, -1.2]}><planeGeometry args={[1.6, 1.2]} /><meshBasicMaterial color="#ffc890" toneMapped={false} /></mesh>
  <mesh position={[0, 1.2, -1.25]}><planeGeometry args={[8, 4]} /><meshStandardMaterial color="#5a3a4a" /></mesh>
  <Chao cor="#4a2a2a" />
  <Pos bloom={0.6} /></>}</C3>;

// ---------- canto: relógio HORA 0 → 24 + apito em cada capítulo ----------
const HORA_CAP = [0, 0, 1, 3, 6, 12, 18, 24, 24];
const Canto: React.FC<{k: number}> = ({k}) => {
  const f = useCurrentFrame(); const t0 = k === 0 ? 0 : L.INICIO_CAP[k]; const dt = f - t0;
  const h = HORA_CAP[k]; const fim = h === 24;
  const s = interpolate(dt, [0, 4, 10], [1.3, 0.94, 1], cl); const ang = (h / 24) * 720 + interpolate(dt, [0, 8], [-60, 0], cl);
  return <AbsoluteFill>
    <div style={{position: 'absolute', top: 40, right: 50, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px 10px 12px', background: fim ? '#e0180c' : 'rgba(10,10,14,.85)', border: `4px solid ${AMAR}`, borderRadius: 50, transform: `scale(${s}) rotate(${interpolate(dt, [0, 4, 10], [-6, 3, 0], cl)}deg)`, transformOrigin: 'right center', boxShadow: '0 8px 24px rgba(0,0,0,.5)'}}>
      <svg width={52} height={52} viewBox="-35 -35 70 70"><circle r={31} fill="#fff" stroke={AMAR} strokeWidth={4} />{LAT(12).map((j) => <line key={j} x1={0} y1={-26} x2={0} y2={-21} stroke="#111" strokeWidth={3} transform={`rotate(${j * 30})`} />)}
        <line x1={0} y1={0} x2={0} y2={-15} stroke="#111" strokeWidth={5} strokeLinecap="round" transform={`rotate(${ang / 2})`} /><line x1={0} y1={0} x2={0} y2={-24} stroke="#e0180c" strokeWidth={3} strokeLinecap="round" transform={`rotate(${ang * 12})`} /><circle r={4} fill="#111" /></svg>
      <div style={{fontFamily: FONTE, color: '#fff', fontSize: 42, lineHeight: 1}}>HORA <span style={{color: fim ? '#fff' : AMAR}}>{h}</span><span style={{fontSize: 22, opacity: 0.75}}> /24</span></div>
    </div>
    {L.INICIO_CAP.slice(1).map((t, j) => <Sequence key={j} from={t - L.GAP + 4} durationInFrames={30}><Audio src={staticFile('sfx/apito.wav')} volume={0.2} /></Sequence>)}
  </AbsoluteFill>;
};

const CAPS: Cap[] = LAT(9).map(() => ({canto: '', sat: 1}));
const PLANO: [string, React.FC][][] = [
  [['e se todos os', G1], ['sem parar sem', G2], ['quatro bilhoes de consoles', G3], ['spoiler tudo', G4], ['e no final voce', G5]],
  [['dezenove de novembro de', C1a], ['depois de dois adiamentos', C1b], ['so pra playstation', C1c], ['ninguem sabe ainda', C1d], ['mas empresas que', C1e], ['pra comparar o', C1f], ['so que tem um', C1g],
    ['e homens uns', C1h], ['pelas nossas contas e', C1i], ['a fila ia', C1j], ['entao pra esse experimento', C1k], ['quatro bilhoes de caixas', C1l], ['em algum lugar um', C1m], ['controle na mao', C1n]],
  [['e o primeiro adversario', C2a], ['o gta 6 ocupa', C2b], ['multiplica isso por', C2c], ['pelas nossas contas da', C2d], ['um exabyte e', C2e], ['e a internet do', C2f], ['ou seja pra todo', C2g],
    ['so pro gta', C2h], ['as vinte e quatro horas', C2i], ['resultado ninguem joga', C2j], ['quatro bilhoes de homens', C2k], ['os roteadores piscam', C2l], ['e nos grupos de', C2m]],
  [['hora tres e o', C3a], ['nos estados unidos noventa e dois', C3b], ['agora estao todos', C3c], ['as estradas esvaziam', C3d], ['o caminhao do leite', C3e], ['o supermercado comeca', C3f], ['primeiro some a pizza', C3g],
    ['depois o refrigerante', C3h], ['e o motoboy que', C3i], ['o pedido fica', C3j]],
  [['hora seis e agora', C4a], ['um playstation 5', C4b], ['parece pouco mas', C4c], ['pelas nossas contas sao', C4d], ['um quarto de toda', C4e], ['e isso sem contar', C4f], ['em algumas casas a', C4g],
    ['o ventilador perde', C4h], ['e ninguem percebe', C4i], ['a rede eletrica leva', C4j], ['e quem cuida dela', C4k], ['ou seja na hora', C4l], ['todo mundo esta olhando', C4m]],
  [['hora doze metade do', C5a], ['nos estados unidos noventa e tres', C5b], ['os avioes ficam no', C5c], ['os aeroportos viram', C5d], ['noventa e cinco por', C5e], ['oitenta e quatro por', C5f], ['os quarteis ficam', C5g],
    ['e o futebol de', C5h], ['metade da torcida', C5i], ['e a economia o', C5j], ['e os homens sao', C5k], ['pelas nossas contas numa', C5l], ['tudo isso por uma', C5m]],
  [['hora dezoito e agora', C6a], ['ficar vinte e quatro', C6b], ['bebado sem beber', C6c], ['os olhos ardem', C6d], ['e alguem em algum', C6e], ['e ficar horas parado', C6f], ['o sangue circula pior', C6g],
    ['os medicos recomendam', C6h], ['entao antes do proximo', C6i], ['bebe uma agua a', C6j]],
  [['hora vinte e quatro fim', C7a], ['quatro bilhoes de controles', C7b], ['o download parou', C7c], ['um por um eles', C7d], ['e perguntam o que', C7e], ['prateleiras vazias avioes', C7f], ['mas aqui vem a', C7g]],
  [['vinte e quatro de outubro', C8a], ['na islandia uns noventa', C8b], ['nao trabalharam nao', C8c], ['uns vinte e cinco mil', C8d], ['e o pais inteiro', C8e], ['no ano seguinte a', C8f], ['e em mil novecentos', C8g],
    ['ela mesma diz', C8h], ['um pais inteiro parou', C8i], ['ja os homens do', C8j], ['e voce largava o', C8k]],
];
const Fim: React.FC = () => <Final />;
const L = criarLongo({W, plano: PLANO, caps: CAPS, audio: 'gta_longo/narracao_cap.mp3', musica: 'gta_longo/trilha.mp3', volta: 8, fim: Fim,
  semTexto: true, legenda: 40, cartao: Cartao, canto: Canto,
  hits: [{frase: 'spoiler tudo', vol: 0.35}, {frase: 'resultado ninguem joga', vol: 0.3}, {frase: 'bebado sem beber', vol: 0.3}, {frase: 'e o futebol de', vol: 0.25}]});
export const Video = L.Video;
export const DURACAO = L.DURACAO;

// thumb "24H DE GTA 6": globo com um controle gigante encaixado e cidades apagando em volta (texto entra no PIL)
export const ThumbGta: React.FC = () => <C3>{(_, tex) => <>
  <Cam pos={[0, 0.5, 4.2]} alvo={[0, 0.35, 0]} /><Luzes sol={[-3, 3, 4]} i={2.8} amb={0.25} /><Estrelas sem="tg" />
  <group position={[0, -0.25, 0]}><Terra tex={tex} rot={[0.35, 1.8, 0]} />
    {LAT(260).map((i) => { const y = 1 - 2 * (i + 0.5) / 260; const r = Math.sqrt(1 - y * y); const a = i * 2.39996; const p = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r).multiplyScalar(1.012); return p.z > 0.2 ? <mesh key={i} position={p.toArray()}><sphereGeometry args={[0.011, 6, 6]} /><meshBasicMaterial color={random('tga' + i) < 0.5 ? new THREE.Color('#ffcf60').multiplyScalar(2) : '#202020'} toneMapped={false} /></mesh> : null; })}</group>
  <Controle pos={[0, 1.05, 0.2]} rot={[0.45, 0, -0.08]} s={1.45} cor={ROXO} />
  {LAT(10).map((i) => { const a = i / 10 * Math.PI * 2; return <Raio key={i} pos={[Math.cos(a) * 1.5, -0.25 + Math.sin(a) * 1.25, 0.4]} s={0.16} rot={a} cor={AMAR} />; })}
  <Brilho pos={[0, 1.05, -0.4]} s={2.8} cor={ROSA} o={0.55} />
  <Pos bloom={1} /></>}</C3>;
void Sofa; void Palma; void Easing;
